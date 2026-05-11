import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  extractVoiceoverScript,
  inferGate,
  loadProject,
  parseArgs,
  readText,
  rel,
  run,
  saveProject,
  statusForGate,
  tableRows,
  validateProjectShape,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:approve-plan -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const planPath = join(projectPath, "plan.md");
const contractPath = join(projectPath, "scene-contracts.md");
const statusPath = join(projectPath, "status.md");
const draftPath = join(projectPath, "draft-scene-packets.md");

const errors = [];
const warnings = [];

function requireFile(pathLike) {
  if (!existsSync(pathLike)) errors.push(`missing ${rel(pathLike)}`);
}

function planSceneIds(markdown) {
  const ids = [];
  for (const table of tableRows(markdown)) {
    if (!table.headers.includes("#") || !table.headers.includes("Time")) continue;
    for (const row of table.rows) {
      const id = String(row["#"] || "").match(/\d+/)?.[0];
      if (id) ids.push(id.padStart(2, "0"));
    }
  }
  return [...new Set(ids)];
}

function validatePlanText(markdown) {
  const script = extractVoiceoverScript(markdown);
  const spokenLines = script.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (spokenLines.length < 20) errors.push("plan.md voiceover script is too short or missing");
  if (!/##\s+Latest Visual Rules\b/.test(markdown)) errors.push("plan.md missing Latest Visual Rules");
  if (!/No caption progress bar/i.test(markdown)) errors.push("plan.md must explicitly ban caption progress bars");
  if (!/one explanation unit at a time/i.test(markdown)) errors.push("plan.md must require one explanation unit at a time");
  if (!/Body scenes use Hyperframes diagrams only/i.test(markdown)) warnings.push("plan.md should clarify body scenes use Hyperframes diagrams only for this project");

  const scenes = planSceneIds(markdown);
  if (scenes.length < 5) errors.push("plan.md scene summary has too few scenes");
  return scenes;
}

function validateDraftScenePackets(markdown) {
  if (!markdown.trim()) {
    errors.push("draft-scene-packets.md is empty");
    return;
  }
  if (/imagegen[^|\n]*support optional/i.test(markdown)) {
    errors.push("draft-scene-packets.md still routes body scene imagegen as optional support");
  }
}

function updatePlanApprovalText(markdown) {
  return markdown
    .replace("- **Approval state**: needs user approval", "- **Approval state**: approved by `factory:approve-plan`")
    .replace("- `project.json.approved.plan` is intentionally `false`.", "- `project.json.approved.plan` passed the approval gate.")
    .replace("- Do not run ElevenLabs TTS, SRT timing, Hyperframes render, or packaging until the user approves this script and scene contract.", "- ElevenLabs TTS may run only after this approval gate has passed.");
}

function updateStatusText(markdown) {
  return markdown
    .replace("- [ ] User approved script and scene table", "- [x] User approved script and scene table")
    .replace("`review`", "`tts`")
    .replace("- User must approve the refreshed script and `scene-contracts.md` before TTS.", "- Script and `scene-contracts.md` approved by `factory:approve-plan`.");
}

requireFile(planPath);
requireFile(contractPath);
requireFile(statusPath);
requireFile(draftPath);

const planText = await readText(planPath, "");
const draftText = await readText(draftPath, "");
const statusText = await readText(statusPath, "");
const sceneIds = validatePlanText(planText);
validateDraftScenePackets(draftText);

const inferredGate = inferGate(project);
if (inferredGate !== "review" && project.approved?.plan !== true) {
  errors.push(`project is not ready for plan approval; inferred gate is ${inferredGate}`);
}

const contractCheck = run("node", ["scripts/validate_scene_contract.mjs", rel(projectPath)], { timeout: 120_000 });
if (contractCheck.status !== 0) {
  errors.push("scene contract validation failed");
  if (contractCheck.stderr) errors.push(contractCheck.stderr.trim().slice(0, 1000));
}
const routingCheck = run("node", ["scripts/validate_visual_routing.mjs", rel(projectPath)], { timeout: 120_000 });
if (routingCheck.status !== 0) {
  errors.push("visual routing validation failed");
  if (routingCheck.stderr) errors.push(routingCheck.stderr.trim().slice(0, 1000));
}

for (const issue of validateProjectShape(project)) errors.push(`project.json: ${issue}`);

if (errors.length) {
  console.error("Plan approval blocked; project.json was not changed.");
  for (const error of errors) console.error(`FAIL ${error}`);
  for (const warning of warnings) console.log(`WARN ${warning}`);
  process.exit(1);
}

project.approved.plan = true;
project.currentGate = "tts";
project.status = statusForGate("tts");

for (const issue of validateProjectShape(project)) {
  errors.push(`project.json after approval: ${issue}`);
}
if (errors.length) {
  console.error("Plan approval blocked after project shape check; project.json was not changed.");
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}

await saveProject(projectPath, project);
await writeText(planPath, updatePlanApprovalText(planText));
await writeText(statusPath, updateStatusText(statusText));

console.log("Plan approval gate");
for (const warning of warnings) console.log(`WARN ${warning}`);
console.log(`PASS approved plan for ${rel(projectPath)}`);
console.log(`Scenes: ${sceneIds.join(", ")}`);
console.log("Next: npm run factory:tts -- " + rel(projectPath));
