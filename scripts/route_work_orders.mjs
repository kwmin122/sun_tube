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
  console.error("Usage: npm run factory:route -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (project.artifacts?.timedScenePackets !== true || project.artifacts?.assetPlan !== true) {
  console.error("Route blocked: project.json artifacts timedScenePackets and assetPlan must both be true.");
  console.error(`Current: timedScenePackets=${project.artifacts?.timedScenePackets}, assetPlan=${project.artifacts?.assetPlan}`);
  process.exit(1);
}

function clean(value) {
  return String(value || "").trim();
}

function emptyLike(value) {
  return !clean(value) || ["-", "pending", "todo", "n/a"].includes(clean(value).toLowerCase());
}

function placeholderRow(row) {
  const time = row["Time Range"] || row.Time || "";
  const input = row["Link / File / Candidate"] || row["Primary Asset"] || row.Assets || "";
  const action = row["Processing Needed"] || row["Motion Beat"] || row["Narration Beat"] || row["Core Message"] || "";
  const actionText = clean(action).toLowerCase();
  return emptyLike(time) && emptyLike(input) && (!actionText || ["crop, highlight", "html/svg build", "trim, subtitle, crop", "review task"].includes(actionText));
}

function blockedReason(row, source) {
  const route = normalizeRoute(row.ToolRoute);
  const input = clean(row["Link / File / Candidate"] || row["Primary Asset"] || row.Assets || "");
  const action = clean(row["Processing Needed"] || row["Motion Beat"] || row["Narration Beat"] || row["Core Message"] || "");
  if (source === "asset" && ["capture", "video-use", "imagegen"].includes(route)) {
    if (emptyLike(input)) return "blocked: missing input";
    if (emptyLike(action)) return "blocked: missing action";
    if (route === "capture" && !/https?:\/\//.test(input)) return "blocked: missing capture URL";
  }
  if (route === "hyperframes" && emptyLike(action)) return "blocked: missing motion/action";
  return "";
}

function completeStatus(value) {
  return ["done", "not_required"].includes(clean(value).toLowerCase());
}

const timedRows = findRowsWithToolRoute(await readText(join(projectPath, "timed-scene-packets.md")))
  .filter((row) => !placeholderRow(row))
  .map((row) => ({ ...row, source: "timed" }));
const assetRows = findRowsWithToolRoute(await readText(join(projectPath, "asset-plan.md")))
  .filter((row) => !placeholderRow(row))
  .map((row) => ({ ...row, source: "asset" }));
const allRows = [...timedRows, ...assetRows].map((row, index) => {
  const route = normalizeRoute(row.ToolRoute);
  const reason = blockedReason(row, row.source);
  return {
    sourceIndex: index + 1,
    source: row.source,
    scene: clean(row.Scene || row["#"] || row.scene || "unknown"),
    time: clean(row["Time Range"] || row.Time || ""),
    route,
    action: clean(row["Processing Needed"] || row["Motion Beat"] || row["Narration Beat"] || row["Core Message"] || ""),
    input: clean(row["Link / File / Candidate"] || row["Primary Asset"] || row.Assets || ""),
    status: reason || clean(row.Status || "todo"),
    blocked: Boolean(reason),
  };
});

const groups = {
  "video-use": [],
  imagegen: [],
  capture: [],
  hyperframes: [],
  "script/ffmpeg": [],
  manual: [],
};
for (const row of allRows) {
  if (["capture", "video-use", "imagegen"].includes(row.route) && row.source !== "asset") continue;
  const key = groups[row.route] ? row.route : "manual";
  groups[key].push(row);
}

const workDir = join(projectPath, "work-orders");

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

const nextRoutes = { ...project.routes };
nextRoutes.workOrders = allRows.some((row) => row.blocked) ? "blocked" : "done";
for (const route of ["video-use", "imagegen", "capture", "hyperframes"]) {
  const key = routeStateKey(route);
  if (!key) continue;
  const rows = groups[route] || [];
  const timedWantsRoute = allRows.some((row) => row.source === "timed" && row.route === route);
  const rowsComplete = rows.length > 0 && rows.every((row) => completeStatus(row.status));
  if (!rows.length) {
    nextRoutes[key] = timedWantsRoute && route !== "hyperframes" ? "blocked" : route === "hyperframes" ? "planned" : "not_required";
  } else if (rows.some((row) => row.blocked)) {
    nextRoutes[key] = "blocked";
  } else if (rowsComplete) {
    nextRoutes[key] = "done";
  } else {
    nextRoutes[key] = route === "hyperframes" ? "planned" : "required";
  }
}

const missingAssetRoutes = ["video-use", "imagegen", "capture"].filter((route) => {
  return allRows.some((row) => row.source === "timed" && row.route === route) && !(groups[route] || []).length;
});
if (missingAssetRoutes.length) nextRoutes.workOrders = "blocked";

console.log(`Route rows: ${allRows.length}`);
console.log(`Routes: video-use=${nextRoutes.videoUse}, imagegen=${nextRoutes.imagegen}, capture=${nextRoutes.capture}, hyperframes=${nextRoutes.hyperframes}, workOrders=${nextRoutes.workOrders}`);

if (allRows.some((row) => row.blocked) || missingAssetRoutes.length) {
  console.log("Blocked rows:");
  for (const row of allRows.filter((item) => item.blocked)) console.log(`- scene ${row.scene} ${row.route}: ${row.status}`);
  for (const route of missingAssetRoutes) console.log(`- ${route}: timed scene requests route but asset-plan has no executable row`);
}

if (args["dry-run"]) {
  console.log("Dry run: work orders and project.json not modified.");
  process.exit(nextRoutes.workOrders === "blocked" ? 1 : 0);
}

await ensureDir(workDir);
await writeText(join(workDir, "route-work-orders.md"), render("Route Work Orders", allRows));
await writeText(join(workDir, "video-use.md"), render("video-use Work Orders", groups["video-use"]));
await writeText(join(workDir, "imagegen.md"), render("imagegen Work Orders", groups.imagegen));
await writeText(join(workDir, "capture.md"), render("capture Work Orders", groups.capture));
await writeText(join(workDir, "hyperframes.md"), render("Hyperframes Work Orders", groups.hyperframes));

project.routes = nextRoutes;
const wasDone = project.status === "done" || project.currentGate === "done";
if (nextRoutes.workOrders === "blocked") {
  project.status = "blocked";
  project.currentGate = "blocked";
} else if (!wasDone) {
  project.status = "assets";
  project.currentGate = "assets";
}
await saveProject(projectPath, project);

console.log(`Generated: ${rel(workDir)}`);
process.exit(nextRoutes.workOrders === "blocked" ? 1 : 0);
