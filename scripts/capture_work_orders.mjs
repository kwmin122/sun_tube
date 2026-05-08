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
const routeRows = rows.filter((row) => row.Route !== "not_required");
const invalidRows = routeRows.filter((row) => {
  const urls = String(row.Input || "").match(/https?:\/\/[^\s,|)]+/g) || [];
  return urls.length === 0;
});
const tasks = routeRows.flatMap((row) => {
  const urls = String(row.Input).match(/https?:\/\/[^\s,|)]+/g) || [];
  return urls.map((url, urlIndex) => ({ ...row, Input: url, urlIndex }));
});

if (!routeRows.length) {
  console.log(`No capture rows found in ${rel(workOrderPath)}`);
  if (args["dry-run"]) {
    console.log("Dry run: project.json not modified.");
    process.exit(0);
  }
  project.routes.capture = "not_required";
  await saveProject(projectPath, project);
  process.exit(0);
}

if (invalidRows.length) {
  console.error(`Capture blocked: ${invalidRows.length} row(s) have no executable URL.`);
  for (const row of invalidRows) console.error(`- scene ${row.Scene || "unknown"} input=${row.Input || "(empty)"}`);
  if (!args["dry-run"]) {
    project.routes.capture = "blocked";
    await saveProject(projectPath, project);
  } else {
    console.log("Dry run: project.json not modified.");
  }
  process.exit(1);
}

console.log(`Capture tasks: ${tasks.length}`);
for (const [index, task] of tasks.entries()) {
  const out = join(projectPath, "assets/screenshots", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  console.log(`- ${task.Input} -> ${rel(out)}`);
}

if (args["dry-run"]) {
  console.log("Dry run: browser capture not executed.");
  console.log("Dry run: project.json not modified.");
  process.exit(0);
}

await ensureDir(join(projectPath, "assets/screenshots"));
await ensureDir(join(projectPath, "assets/evidence"));
const manifest = [];
for (const [index, task] of tasks.entries()) {
  const out = join(projectPath, "assets/screenshots", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  const evidence = join(projectPath, "assets/evidence", `scene-${String(task.Scene).padStart(2, "0")}-capture-${index + 1}.png`);
  const result = run("npx", [
    "--yes",
    "playwright@latest",
    "screenshot",
    "--wait-for-timeout",
    "5000",
    "--viewport-size",
    "1440,1200",
    "--full-page",
    task.Input,
    out,
  ], {
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
