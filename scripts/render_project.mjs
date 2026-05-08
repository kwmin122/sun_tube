import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ensureDir,
  loadProject,
  parseArgs,
  rel,
  run,
  saveProject,
  writeJson,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:render -- <project-path> [--dry-run] [--force]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const composition = join(projectPath, "composition");
const output = join(projectPath, "renders/final.mp4");

if (project.approved?.render !== true && !args.force) {
  console.error("Render blocked: pre-render QA must set project.json.approved.render=true. Use --force only as an explicit override.");
  process.exit(1);
}

const commands = [
  { label: "check", cmd: "npm", args: ["run", "check"], cwd: composition },
  { label: "snapshot", cmd: "npm", args: ["run", "snapshot", "--", ".", "--at", "0", "--output", "snapshots"], cwd: composition },
  { label: "render", cmd: "npm", args: ["run", "render", "--", "-o", "../renders/final.mp4", "-q", "high", "-f", "30"], cwd: composition },
];

console.log(`Render target: ${rel(output)}`);
for (const item of commands) console.log(`- ${item.label}: ${item.cmd} ${item.args.join(" ")}`);
if (args["dry-run"]) {
  console.log("Dry run: render commands not executed.");
  process.exit(0);
}

if (!existsSync(join(composition, "package.json"))) {
  console.error(`Render blocked: missing ${rel(join(composition, "package.json"))}`);
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
    await writeJson(join(projectPath, "renders/render_manifest.json"), { output: rel(output), steps: manifest });
    console.error(`${item.label} failed.`);
    console.error(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }
}

const probe = run("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height,avg_frame_rate", "-of", "json", output], { timeout: 30_000 });
manifest.push({ step: "ffprobe", status: probe.status, stdout: probe.stdout, stderr: probe.stderr });
await writeJson(join(projectPath, "renders/render_manifest.json"), {
  output: rel(output),
  generatedAt: new Date().toISOString(),
  steps: manifest,
});

if (!existsSync(output) || probe.status !== 0) {
  console.error("Render failed validation; see renders/render_manifest.json.");
  process.exit(1);
}

project.artifacts.render = true;
project.status = "render";
project.currentGate = "final_qa";
await saveProject(projectPath, project);
console.log(`Rendered: ${rel(output)}`);
