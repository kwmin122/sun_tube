import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import { join } from "node:path";
import {
  ensureDir,
  loadProject,
  parseArgs,
  rel,
  run,
  saveProject,
  tableRows,
  readText,
  writeJson,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:capture -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (!["required", "planned", "in_progress"].includes(project.routes?.capture)) {
  console.log(`Capture not required: routes.capture=${project.routes?.capture}`);
  process.exit(0);
}

const workOrderPath = join(projectPath, "work-orders/capture.md");
const rows = tableRows(await readText(workOrderPath)).flatMap((table) => table.rows);
const tasks = rows.filter((row) => row.Route !== "not_required" && row.Input && /^https?:\/\//.test(row.Input));

if (!tasks.length) {
  console.log(`No executable capture URLs found in ${rel(workOrderPath)}`);
  project.routes.capture = "done";
  await saveProject(projectPath, project);
  process.exit(0);
}

console.log(`Capture tasks: ${tasks.length}`);
for (const [index, task] of tasks.entries()) {
  const out = join(projectPath, "assets/screenshots", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  console.log(`- ${task.Input} -> ${rel(out)}`);
}

if (args["dry-run"]) {
  console.log("Dry run: browser capture not executed.");
  process.exit(0);
}

await ensureDir(join(projectPath, "assets/screenshots"));
await ensureDir(join(projectPath, "assets/evidence"));
const manifest = [];
for (const [index, task] of tasks.entries()) {
  const out = join(projectPath, "assets/screenshots", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  const evidence = join(projectPath, "assets/evidence", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  const result = run("npx", ["--yes", "playwright@latest", "screenshot", task.Input, out], {
    cwd: projectPath,
    timeout: 120_000,
  });
  if (result.status === 0 && existsSync(out)) await copyFile(out, evidence);
  manifest.push({
    scene: task.Scene,
    input: task.Input,
    output: rel(out),
    evidence: rel(evidence),
    ok: result.status === 0 && existsSync(out) && existsSync(evidence),
    stderr: result.status === 0 ? "" : (result.stderr || result.stdout || "").slice(0, 1000),
  });
}

await writeJson(join(projectPath, "assets/screenshots/capture_manifest.json"), {
  generatedAt: new Date().toISOString(),
  tasks: manifest,
});

const ok = manifest.every((item) => item.ok);
project.routes.capture = ok ? "done" : "blocked";
await saveProject(projectPath, project);
console.log(ok ? "Capture complete" : "Capture blocked; see capture_manifest.json");
process.exit(ok ? 0 : 1);
