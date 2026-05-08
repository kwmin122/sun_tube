import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
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
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:imagegen -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (!["required", "planned", "in_progress"].includes(project.routes?.imagegen)) {
  console.log(`Imagegen not required: routes.imagegen=${project.routes?.imagegen}`);
  process.exit(0);
}

const rows = tableRows(await readText(join(projectPath, "work-orders/imagegen.md"))).flatMap((table) => table.rows);
const tasks = rows.filter((row) => row.Route !== "not_required");
if (!tasks.length) {
  console.log("No imagegen tasks found.");
  if (args["dry-run"]) {
    console.log("Dry run: project.json not modified.");
    process.exit(0);
  }
  project.routes.imagegen = "not_required";
  await saveProject(projectPath, project);
  process.exit(0);
}

const invalid = tasks.filter((task) => !String(task.Input || "").trim() || !String(task.Action || "").trim());
if (invalid.length) {
  console.error(`Imagegen blocked: ${invalid.length} row(s) are missing input or action.`);
  for (const task of invalid) console.error(`- scene ${task.Scene || "unknown"} input=${task.Input || "(empty)"} action=${task.Action || "(empty)"}`);
  if (!args["dry-run"]) {
    project.routes.imagegen = "blocked";
    await saveProject(projectPath, project);
  } else {
    console.log("Dry run: project.json not modified.");
  }
  process.exit(1);
}

const command = process.env.IMAGEGEN_COMMAND || "";
const manifest = [];

for (const [index, task] of tasks.entries()) {
  const scene = String(task.Scene || index + 1).padStart(2, "0");
  const prompt = [
    `Scene: ${task.Scene}`,
    `Input: ${task.Input}`,
    `Action: ${task.Action}`,
    "",
    "Use image generation only for metaphor, style frame, background, thumbnail, or non-factual support visuals.",
    "Do not fabricate factual evidence screenshots.",
  ].join("\n");
  const promptPath = join(projectPath, "assets/generated", `scene-${scene}-imagegen.prompt.txt`);
  const outputPath = join(projectPath, "assets/generated", `scene-${scene}-imagegen.png`);
  const processedPath = join(projectPath, "assets/processed", `scene-${scene}-imagegen.png`);
  manifest.push({ scene, prompt: rel(promptPath), output: rel(outputPath), processed: rel(processedPath), dryRun: Boolean(args["dry-run"]) });
  console.log(`- ${rel(promptPath)} -> ${rel(outputPath)}`);

  if (!args["dry-run"]) {
    await ensureDir(join(projectPath, "assets/generated"));
    await ensureDir(join(projectPath, "assets/processed"));
    await writeText(promptPath, prompt);
    if (!command) {
      console.error("Imagegen blocked: set IMAGEGEN_COMMAND with optional {prompt} and {output} placeholders.");
      process.exit(1);
    }
    const shellCommand = command.includes("{prompt}") || command.includes("{output}")
      ? command.replaceAll("{prompt}", JSON.stringify(promptPath)).replaceAll("{output}", JSON.stringify(outputPath))
      : `${command} ${JSON.stringify(promptPath)} ${JSON.stringify(outputPath)}`;
    const result = run("sh", ["-c", shellCommand], { cwd: projectPath, timeout: 300_000 });
    if (result.status === 0 && existsSync(outputPath)) await copyFile(outputPath, processedPath);
    manifest.at(-1).ok = result.status === 0 && existsSync(outputPath) && existsSync(processedPath);
    manifest.at(-1).stderr = result.status === 0 ? "" : (result.stderr || result.stdout || "").slice(0, 1000);
  }
}

await writeJson(join(projectPath, "assets/generated/imagegen_manifest.json"), {
  generatedAt: new Date().toISOString(),
  commandConfigured: Boolean(command),
  tasks: manifest,
});

if (args["dry-run"]) {
  console.log("Dry run: image generation not executed.");
  console.log("Dry run: project.json not modified.");
  process.exit(0);
}

const ok = manifest.every((item) => item.ok);
project.routes.imagegen = ok ? "done" : "blocked";
await saveProject(projectPath, project);
console.log(ok ? "Imagegen complete" : "Imagegen blocked; see imagegen_manifest.json");
process.exit(ok ? 0 : 1);
