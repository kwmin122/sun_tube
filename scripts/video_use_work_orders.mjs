import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ensureDir,
  loadProject,
  parseArgs,
  readText,
  rel,
  run,
  saveProject,
  tableRows,
  writeJson,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:video-use -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (!["required", "planned", "in_progress"].includes(project.routes?.videoUse)) {
  console.log(`video-use not required: routes.videoUse=${project.routes?.videoUse}`);
  process.exit(0);
}

const rows = tableRows(await readText(join(projectPath, "work-orders/video-use.md"))).flatMap((table) => table.rows);
const tasks = rows.filter((row) => row.Route !== "not_required");
if (!tasks.length) {
  console.log("No video-use tasks found.");
  if (args["dry-run"]) {
    console.log("Dry run: project.json not modified.");
    process.exit(0);
  }
  project.routes.videoUse = "not_required";
  await saveProject(projectPath, project);
  process.exit(0);
}

const invalid = tasks.filter((task) => !String(task.Input || "").trim() || !String(task.Action || "").trim());
if (invalid.length) {
  console.error(`video-use blocked: ${invalid.length} row(s) are missing input or action.`);
  for (const task of invalid) console.error(`- scene ${task.Scene || "unknown"} input=${task.Input || "(empty)"} action=${task.Action || "(empty)"}`);
  if (!args["dry-run"]) {
    project.routes.videoUse = "blocked";
    await saveProject(projectPath, project);
  } else {
    console.log("Dry run: project.json not modified.");
  }
  process.exit(1);
}

const command = process.env.VIDEO_USE_COMMAND || "";
const manifest = [];
console.log(`video-use tasks: ${tasks.length}`);

for (const [index, task] of tasks.entries()) {
  const scene = String(task.Scene || index + 1).padStart(2, "0");
  const input = task.Input || "";
  const instruction = task.Action || "trim/crop/subtitle as specified by work order";
  const routingText = `${input} ${instruction}`.toLowerCase();
  const bucket = routingText.includes("demo") ? "demos" : routingText.includes("broll") || routingText.includes("b-roll") ? "broll" : "interviews";
  const output = join(projectPath, `assets/${bucket}/processed`, `scene-${scene}-video-use.mp4`);
  console.log(`- scene ${scene}: ${input || "input pending"} -> ${rel(output)}`);
  manifest.push({ scene, input, instruction, output: rel(output), dryRun: Boolean(args["dry-run"]) });

  if (!args["dry-run"]) {
    if (!command) {
      console.error("video-use blocked: set VIDEO_USE_COMMAND with optional {input}, {output}, and {instruction} placeholders.");
      process.exit(1);
    }
    const shellCommand = command.includes("{input}") || command.includes("{output}") || command.includes("{instruction}")
      ? command
          .replaceAll("{input}", JSON.stringify(input))
          .replaceAll("{output}", JSON.stringify(output))
          .replaceAll("{instruction}", JSON.stringify(instruction))
      : `${command} ${JSON.stringify(input)} ${JSON.stringify(output)} ${JSON.stringify(instruction)}`;
    const result = run("sh", ["-c", shellCommand], { cwd: projectPath, timeout: 600_000 });
    manifest.at(-1).ok = result.status === 0 && existsSync(output);
    manifest.at(-1).stderr = result.status === 0 ? "" : (result.stderr || result.stdout || "").slice(0, 1000);
  }
}

await writeJson(join(projectPath, "assets/interviews/processed/video_use_manifest.json"), {
  generatedAt: new Date().toISOString(),
  commandConfigured: Boolean(command),
  tasks: manifest,
});

if (args["dry-run"]) {
  console.log("Dry run: video-use not executed.");
  console.log("Dry run: project.json not modified.");
  process.exit(0);
}

await ensureDir(join(projectPath, "assets/interviews/processed"));
await ensureDir(join(projectPath, "assets/broll/processed"));
await ensureDir(join(projectPath, "assets/demos/processed"));

const ok = manifest.every((item) => item.ok);
project.routes.videoUse = ok ? "done" : "blocked";
await saveProject(projectPath, project);
console.log(ok ? "video-use complete" : "video-use blocked; see video_use_manifest.json");
process.exit(ok ? 0 : 1);
