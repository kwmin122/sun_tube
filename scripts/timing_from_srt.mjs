import { join } from "node:path";
import {
  loadProject,
  parseArgs,
  parseSrt,
  readText,
  rel,
  saveProject,
  secondsToTimestamp,
  tableRows,
  writeText,
} from "./lib/factory_common.mjs";

function sceneRowsFromPlan(markdown) {
  const summaryTable = tableRows(markdown).find((table) =>
    table.headers.includes("#") &&
    table.headers.includes("Time") &&
    table.headers.includes("Pattern Role") &&
    table.headers.includes("Core Message")
  );
  const rows = summaryTable?.rows || [];
  const sceneRows = rows.filter((row) => row["#"] || row.Scene || row.scene);
  if (sceneRows.length) return sceneRows;
  return Array.from({ length: 6 }, (_, index) => ({ "#": String(index + 1).padStart(2, "0"), "Pattern Role": "", "Core Message": "" }));
}

function parseRange(value) {
  const match = String(value || "").match(/(\d+):(\d+(?:\.\d+)?)\s*-\s*(\d+):(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return {
    start: Number(match[1]) * 60 + Number(match[2]),
    end: Number(match[3]) * 60 + Number(match[4]),
  };
}

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:timing -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (project.artifacts?.tts !== true) {
  console.error("Timing blocked: project.json.artifacts.tts must be true.");
  process.exit(1);
}

const srtPath = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.srt");
const planPath = join(projectPath, "plan.md");
const srt = parseSrt(await readText(srtPath));
if (!srt.length) {
  console.error(`Timing blocked: no SRT cues found in ${rel(srtPath)}`);
  process.exit(1);
}

const plan = await readText(planPath);
const scenes = sceneRowsFromPlan(plan);
const totalEnd = srt.at(-1)?.end || scenes.length * 5;

const lines = [];
lines.push("# Timed Scene Packets");
lines.push("");
lines.push("Owner: `hype-scene-planner`");
lines.push("");
lines.push("Generated from ElevenLabs SRT. Review `pending` fields before approving timed scene packets.");
lines.push("");
lines.push("## Timing Table");
lines.push("");
lines.push("| Scene | Time Range | SRT Lines | Tool Route | Caption Behavior | Primary Asset | Motion Beat | Audio/SFX | Snapshot Time | Status |");
lines.push("|---|---|---|---|---|---|---|---|---|---|");

for (let i = 0; i < scenes.length; i += 1) {
  const row = scenes[i];
  const sceneId = row["#"] || row.Scene || String(i + 1).padStart(2, "0");
  const plannedRange = parseRange(row.Time);
  const start = plannedRange?.start ?? (totalEnd / scenes.length) * i;
  const end = plannedRange?.end ?? (i === scenes.length - 1 ? totalEnd : (totalEnd / scenes.length) * (i + 1));
  const srtLines = srt.filter((cue) => cue.start < end && cue.end > start).map((cue) => cue.index).filter(Boolean);
  const route = row["Tool Route"] || ((row["Visual Concept"] || "").toLowerCase().includes("screenshot") ? "capture" : "hyperframes");
  const timeRange = `${secondsToTimestamp(start)}-${secondsToTimestamp(end)}`;
  const snapshot = secondsToTimestamp(start + Math.max(0.5, (end - start) / 2));
  lines.push(`| ${sceneId} | ${timeRange} | ${srtLines.join(", ") || "pending"} | ${route} | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | ${row.Assets || "pending"} | ${row["Motion Notes"] || "pending"} | pending | ${snapshot} | pending review |`);
}

lines.push("");
lines.push("## Review Notes");
lines.push("");
lines.push("- [ ] Human reviewed scene boundaries");
lines.push("- [ ] Caption safe zones assigned");
lines.push("- [ ] Tool routes confirmed");
lines.push("- [ ] Clip trims and asset timings confirmed where needed");

await writeText(join(projectPath, "timed-scene-packets.md"), `${lines.join("\n")}\n`);
project.artifacts.timedScenePackets = true;
project.status = "timing";
project.currentGate = "assets";
await saveProject(projectPath, project);

console.log(`Generated: ${rel(join(projectPath, "timed-scene-packets.md"))}`);
console.log("Timed packet contains pending review markers; approve in project.json before pre-render QA.");
