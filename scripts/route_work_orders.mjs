import { join } from "node:path";
import {
  ensureDir,
  findRowsWithToolRoute,
  loadProject,
  normalizeRoute,
  parseArgs,
  readText,
  rel,
  routeStateKey,
  saveProject,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:route -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const timedRows = findRowsWithToolRoute(await readText(join(projectPath, "timed-scene-packets.md")));
const assetRows = findRowsWithToolRoute(await readText(join(projectPath, "asset-plan.md")));
const allRows = [...timedRows, ...assetRows].map((row, index) => ({
  sourceIndex: index + 1,
  scene: row.Scene || row["#"] || row.scene || "unknown",
  time: row["Time Range"] || row.Time || "",
  route: normalizeRoute(row.ToolRoute),
  action: row["Processing Needed"] || row["Motion Beat"] || row["Narration Beat"] || row["Core Message"] || "review task",
  input: row["Link / File / Candidate"] || row["Primary Asset"] || row.Assets || "",
  status: row.Status || "todo",
}));

const groups = {
  "video-use": [],
  imagegen: [],
  capture: [],
  hyperframes: [],
  "script/ffmpeg": [],
  manual: [],
};
for (const row of allRows) {
  const key = groups[row.route] ? row.route : "manual";
  groups[key].push(row);
}

const workDir = join(projectPath, "work-orders");
await ensureDir(workDir);

function render(title, rows) {
  const lines = [`# ${title}`, "", "| Scene | Time | Route | Input | Action | Status |", "|---|---|---|---|---|---|"];
  if (!rows.length) {
    lines.push("| - | - | not_required | - | - | not_required |");
  } else {
    for (const row of rows) {
      lines.push(`| ${row.scene} | ${row.time} | ${row.route} | ${String(row.input).replaceAll("|", "/")} | ${String(row.action).replaceAll("|", "/")} | ${row.status} |`);
    }
  }
  return `${lines.join("\n")}\n`;
}

await writeText(join(workDir, "route-work-orders.md"), render("Route Work Orders", allRows));
await writeText(join(workDir, "video-use.md"), render("video-use Work Orders", groups["video-use"]));
await writeText(join(workDir, "imagegen.md"), render("imagegen Work Orders", groups.imagegen));
await writeText(join(workDir, "capture.md"), render("capture Work Orders", groups.capture));
await writeText(join(workDir, "hyperframes.md"), render("Hyperframes Work Orders", groups.hyperframes));

project.routes.workOrders = "done";
for (const route of ["video-use", "imagegen", "capture", "hyperframes"]) {
  const key = routeStateKey(route);
  if (!key) continue;
  project.routes[key] = groups[route]?.length ? "required" : "not_required";
}
if (groups.hyperframes.length || project.routes.hyperframes === "not_required") {
  project.routes.hyperframes = groups.hyperframes.length ? "planned" : "planned";
}
project.status = "assets";
project.currentGate = "assets";
await saveProject(projectPath, project);

console.log(`Generated: ${rel(workDir)}`);
console.log(`Routes: video-use=${project.routes.videoUse}, imagegen=${project.routes.imagegen}, capture=${project.routes.capture}, hyperframes=${project.routes.hyperframes}`);
