import { copyFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import {
  ensureDir,
  loadProject,
  parseArgs,
  rel,
  run,
  saveProject,
  writeJson,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:render -- <project-path> [--renderer hyperframes|remotion] [--dry-run] [--force]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const renderer = String(args.renderer || "default").trim().toLowerCase();
const validRenderers = ["default", "hyperframes", "remotion"];
if (!validRenderers.includes(renderer)) {
  console.error(`Render blocked: --renderer must be one of ${validRenderers.join(", ")}`);
  process.exit(1);
}

function rendererCompositionPath() {
  if (renderer === "hyperframes") {
    const preferred = join(projectPath, "composition-hyperframes");
    return existsSync(join(preferred, "package.json")) ? preferred : join(projectPath, "composition");
  }
  if (renderer === "remotion") return join(projectPath, "composition-remotion");
  return join(projectPath, "composition");
}

function rendererOutputName() {
  if (renderer === "hyperframes") return "final-hyperframes.mp4";
  if (renderer === "remotion") return "final-remotion.mp4";
  return "final.mp4";
}

async function writeRendererBlocker(message, manifest = []) {
  const reviewDir = join(projectPath, "review/video-review");
  await ensureDir(reviewDir);
  const detail = [
    "# Renderer Comparison",
    "",
    "Verdict: BLOCKED",
    "",
    "| Renderer | Status | Detail |",
    "|---|---|---|",
    `| remotion | blocked | ${String(message).replaceAll("|", "/").slice(0, 900)} |`,
    "",
    "Hyperframes should continue as the fallback final renderer. Do not create a fake `final-remotion.mp4`.",
    "",
  ].join("\n");
  await writeJson(join(projectPath, "renders", "render_manifest-remotion.json"), {
    output: rel(output),
    renderer,
    blocked: true,
    generatedAt: new Date().toISOString(),
    steps: manifest,
  });
  await writeText(join(reviewDir, "renderer-comparison.md"), detail);
}

const composition = rendererCompositionPath();
const outputName = rendererOutputName();
const output = join(projectPath, "renders", outputName);
const downloadsDir = join(homedir(), "Downloads");
const downloadsSuffix = renderer === "default" ? "final" : renderer;
const downloadsOutput = join(downloadsDir, `${project.id}-${project.slug}-${downloadsSuffix}.mp4`);

if (project.approved?.render !== true && !args.force) {
  console.error("Render blocked: pre-render QA must set project.json.approved.render=true. Use --force only as an explicit override.");
  process.exit(1);
}

const commands = [
  { label: "check", cmd: "npm", args: ["run", "check"], cwd: composition },
  { label: "snapshot", cmd: "npm", args: ["run", "snapshot", "--", ".", "--at", "0", "--output", "snapshots"], cwd: composition },
  { label: "render", cmd: "npm", args: ["run", "render", "--", "-o", `../renders/${outputName}`, "-q", "high", "-f", "30"], cwd: composition },
];

console.log(`Renderer: ${renderer}`);
console.log(`Composition: ${rel(composition)}`);
console.log(`Render target: ${rel(output)}`);
for (const item of commands) console.log(`- ${item.label}: ${item.cmd} ${item.args.join(" ")}`);
if (args["dry-run"]) {
  console.log("Dry run: render commands not executed.");
  process.exit(0);
}

if (!existsSync(join(composition, "package.json"))) {
  console.error(`Render blocked: missing ${rel(join(composition, "package.json"))}`);
  if (renderer === "remotion") {
    await ensureDir(join(projectPath, "renders"));
    await writeRendererBlocker(`missing ${rel(join(composition, "package.json"))}`);
  }
  process.exit(1);
}

await ensureDir(join(projectPath, "renders"));
const manifest = [];
for (const item of commands) {
  const result = run(item.cmd, item.args, { cwd: item.cwd, timeout: item.label === "render" ? 900_000 : 240_000 });
  manifest.push({
    step: item.label,
    status: result.status,
    stdout: (result.stdout || "").slice(0, 1000),
    stderr: (result.stderr || "").slice(0, 1000),
  });
  if (result.status !== 0) {
    const manifestName = renderer === "default" ? "render_manifest.json" : `render_manifest-${renderer}.json`;
    await writeJson(join(projectPath, "renders", manifestName), { output: rel(output), renderer, steps: manifest });
    console.error(`${item.label} failed.`);
    console.error(result.stderr || result.stdout);
    if (renderer === "remotion") await writeRendererBlocker(result.stderr || result.stdout || `${item.label} failed`, manifest);
    process.exit(result.status || 1);
  }
}

const probe = run("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height,avg_frame_rate", "-of", "json", output], { timeout: 30_000 });
manifest.push({ step: "ffprobe", status: probe.status, stdout: probe.stdout, stderr: probe.stderr });
const manifestName = renderer === "default" ? "render_manifest.json" : `render_manifest-${renderer}.json`;
await writeJson(join(projectPath, "renders", manifestName), {
  output: rel(output),
  renderer,
  downloadsOutput,
  generatedAt: new Date().toISOString(),
  steps: manifest,
});

if (!existsSync(output) || probe.status !== 0) {
  console.error("Render failed validation; see renders/render_manifest.json.");
  if (renderer === "remotion") await writeRendererBlocker(probe.stderr || "ffprobe failed", manifest);
  process.exit(1);
}

if (renderer === "default") {
  await ensureDir(downloadsDir);
  copyFileSync(output, downloadsOutput);
}

if (renderer === "default") project.artifacts.render = true;
if (renderer === "hyperframes" || renderer === "remotion") {
  project.artifacts.render = existsSync(join(projectPath, "renders/final.mp4")) || project.artifacts.render === true;
}
project.status = "render";
project.artifacts.videoReview = false;
project.artifacts.directorReview = false;
project.currentGate = "video_review";
await saveProject(projectPath, project);
console.log(`Rendered: ${rel(output)}`);
if (renderer === "default") console.log(`Copied to Downloads: ${downloadsOutput}`);
