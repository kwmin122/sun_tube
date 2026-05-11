import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import { basename, join } from "node:path";
import {
  ensureDir,
  findRowsWithToolRoute,
  loadProject,
  parseArgs,
  parseSrt,
  readText,
  rel,
  resolveInsideRoot,
  saveProject,
  tableRows,
  writeJson,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:compose -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const composition = join(projectPath, "composition");
const src = join(composition, "src");
await ensureDir(src);

const displaySrtPath = join(projectPath, "assets/audio/voiceover-display.srt");
const soloDisplaySrtPath = join(projectPath, "voiceover/solo/voiceover-display.srt");
const legacySrtPath = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.srt");
const srtPath = existsSync(displaySrtPath) ? displaySrtPath : (existsSync(soloDisplaySrtPath) ? soloDisplaySrtPath : legacySrtPath);
const mixPath = join(projectPath, "voiceover/solo/voiceover-solo-final-mix.m4a");
const timed = await readText(join(projectPath, "timed-scene-packets.md"));
const assetPlan = await readText(join(projectPath, "asset-plan.md"));
const designContext = await readText(join(projectPath, "design-context.md"));
const captions = existsSync(srtPath) ? parseSrt(await readText(srtPath)) : [];
const compositionAudio = join(composition, "assets/audio/voiceover-solo-final-mix.m4a");
const compositionDisplaySrt = join(composition, "assets/audio/voiceover-display.srt");
const captureManifestPath = join(projectPath, "assets/screenshots/capture_manifest.json");
const captures = [];

if (existsSync(mixPath)) {
  await ensureDir(join(composition, "assets/audio"));
  await copyFile(mixPath, compositionAudio);
}

if (existsSync(srtPath)) {
  await ensureDir(join(composition, "assets/audio"));
  await copyFile(srtPath, compositionDisplaySrt);
}

if (existsSync(captureManifestPath)) {
  const manifest = JSON.parse(await readText(captureManifestPath));
  await ensureDir(join(composition, "assets/screenshots"));
  for (const task of manifest.tasks || []) {
    if (!task.ok || !task.output) continue;
    const sourcePath = resolveInsideRoot(task.output);
    if (!existsSync(sourcePath)) continue;
    const file = basename(sourcePath);
    const dest = join(composition, "assets/screenshots", file);
    await copyFile(sourcePath, dest);
    captures.push({
      scene: String(task.scene || "").padStart(2, "0"),
      source: task.input || "",
      path: `assets/screenshots/${file}`,
    });
  }
}

const scenes = findRowsWithToolRoute(timed).map((row, index) => ({
  id: String(row.Scene || row["#"] || index + 1).padStart(2, "0"),
  timeRange: row["Time Range"] || "",
  srtLines: row["SRT Lines"] || "",
  toolRoute: row.ToolRoute || "hyperframes",
  captionBehavior: row["Caption Behavior"] || "",
  primaryAsset: row["Primary Asset"] || "",
  motionBeat: row["Motion Beat"] || "",
  audioSfx: row["Audio/SFX"] || "",
  snapshotTime: row["Snapshot Time"] || "",
}));
const assets = tableRows(assetPlan).flatMap((table) => table.rows).map((row) => ({
  scene: row.Scene || "",
  route: row["Tool Route"] || "",
  type: row["Asset Type"] || "",
  candidate: row["Link / File / Candidate"] || "",
  processing: row["Processing Needed"] || "",
  status: row.Status || "",
}));

await writeJson(join(src, "project-data.json"), {
  id: project.id,
  slug: project.slug,
  title: project.title,
  status: project.status,
  currentGate: project.currentGate,
  audio: existsSync(compositionAudio) ? "assets/audio/voiceover-solo-final-mix.m4a" : "",
  captions: existsSync(compositionDisplaySrt) ? "assets/audio/voiceover-display.srt" : "",
  generatedAt: new Date().toISOString(),
});
await writeJson(join(src, "scenes.json"), scenes);
await writeJson(join(src, "captions.json"), captions);
await writeJson(join(src, "assets.json"), assets);
await writeJson(join(src, "captures.json"), captures);
await writeJson(join(src, "design-context.json"), {
  source: rel(join(projectPath, "design-context.md")),
  markdown: designContext,
});

project.artifacts.composition = true;
project.status = "motion";
project.currentGate = "pre_render_qa";
await saveProject(projectPath, project);

console.log(`Generated composition data under ${rel(src)}`);
console.log("Motion implementation can now consume composition/src/*.json.");
