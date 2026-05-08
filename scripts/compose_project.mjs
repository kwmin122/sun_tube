import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ensureDir,
  findRowsWithToolRoute,
  loadProject,
  parseArgs,
  parseSrt,
  readText,
  rel,
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

const srtPath = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.srt");
const mixPath = join(projectPath, "voiceover/solo/voiceover-solo-final-mix.m4a");
const timed = await readText(join(projectPath, "timed-scene-packets.md"));
const assetPlan = await readText(join(projectPath, "asset-plan.md"));
const designContext = await readText(join(projectPath, "design-context.md"));
const captions = existsSync(srtPath) ? parseSrt(await readText(srtPath)) : [];
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
  audio: existsSync(mixPath) ? rel(mixPath) : "",
  generatedAt: new Date().toISOString(),
});
await writeJson(join(src, "scenes.json"), scenes);
await writeJson(join(src, "captions.json"), captions);
await writeJson(join(src, "assets.json"), assets);
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
