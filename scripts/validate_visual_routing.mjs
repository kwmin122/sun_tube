import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  findRowsWithToolRoute,
  loadProject,
  normalizeRoutes,
  parseArgs,
  readText,
  rel,
  tableRows,
  writeText,
} from "./lib/factory_common.mjs";

const VISUAL_ROUTES = ["capture", "imagegen", "video-use", "hyperframes"];
const VISUAL_ROLES = ["primary", "support", "not_required"];
const CAPTURE_ROLES = ["primary_evidence", "support_texture", "not_required", "reroute_to_diagram", "primary", "support"];
const CAPTURE_MODES = ["full_side", "split_half", "zoom_optional", "highlight_optional", "not_required", "half", "large", "full"];

function clean(value) {
  return String(value || "").trim();
}

function sceneId(value) {
  const match = clean(value).match(/\d+/);
  return match ? match[0].padStart(2, "0") : "";
}

function isBlank(value) {
  const text = clean(value).toLowerCase();
  return !text || ["-", "todo", "tbd", "pending", "n/a", "none"].includes(text);
}

function roleValue(row, keys) {
  for (const key of keys) {
    if (row[key] != null && clean(row[key])) return clean(row[key]).toLowerCase();
  }
  return "";
}

function routeSet(row) {
  return new Set(normalizeRoutes(row.ToolRoute || row["Tool Route"] || row["Primary Visual Route"] || row["Likely tool route"]));
}

function tableData(markdown) {
  return tableRows(markdown).flatMap((table) => table.rows);
}

function assetRowsByScene(markdown) {
  const map = new Map();
  for (const row of tableData(markdown)) {
    const id = sceneId(row.Scene || row["#"]);
    if (!id) continue;
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(row);
  }
  return map;
}

function contractSections(markdown) {
  const map = new Map();
  const headingRegex = /^##\s+Scene\s+(\d+)\s*$/gim;
  const matches = [...markdown.matchAll(headingRegex)];
  for (let i = 0; i < matches.length; i += 1) {
    const id = sceneId(matches[i][1]);
    const start = matches[i].index + matches[i][0].length;
    const end = matches[i + 1]?.index ?? markdown.length;
    map.set(id, markdown.slice(start, end));
  }
  return map;
}

function contractField(section, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = section.match(new RegExp(`^\\s*-\\s+${escaped}\\s*:\\s*(.*)$`, "im"));
  return match ? clean(match[1]) : "";
}

function routeStatusDone(row) {
  return ["implemented", "qa_passed", "done", "not_required"].includes(clean(row.Status || row["Implementation Status"]).toLowerCase());
}

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:validate-visual-routing -- <project-path>");
  process.exit(1);
}

const { projectPath } = await loadProject(projectArg);
const draftPath = join(projectPath, "draft-scene-packets.md");
const timedPath = join(projectPath, "timed-scene-packets.md");
const assetPath = join(projectPath, "asset-plan.md");
const designPath = join(projectPath, "design-context.md");
const contractPath = join(projectPath, "scene-contracts.md");

const errors = [];
const warnings = [];
for (const path of [draftPath, timedPath, assetPath, designPath, contractPath]) {
  if (!existsSync(path)) errors.push(`missing ${rel(path)}`);
}

const draft = await readText(draftPath, "");
const timed = await readText(timedPath, "");
const asset = await readText(assetPath, "");
const design = await readText(designPath, "");
const contracts = contractSections(await readText(contractPath, ""));
const assetsByScene = assetRowsByScene(asset);
const draftRows = tableData(draft);
const timedRows = findRowsWithToolRoute(timed);
const designRows = tableData(design);

const sceneIds = new Set([
  ...draftRows.map((row) => sceneId(row.Scene || row["#"])).filter(Boolean),
  ...timedRows.map((row) => sceneId(row.Scene || row["#"])).filter(Boolean),
  ...contracts.keys(),
]);

for (const id of sceneIds) {
  const draftRow = draftRows.find((row) => sceneId(row.Scene || row["#"]) === id) || {};
  const timedRow = timedRows.find((row) => sceneId(row.Scene || row["#"]) === id) || {};
  const sceneAssetRows = assetsByScene.get(id) || [];
  const designRow = designRows.find((row) => sceneId(row.Scene || row["#"]) === id) || {};
  const contract = contracts.get(id) || "";
  const routes = new Set([
    ...routeSet(draftRow),
    ...routeSet(timedRow),
    ...sceneAssetRows.flatMap((row) => [...routeSet(row)]),
  ]);

  const primarySource = contractField(contract, "Primary Visual Source") || clean(draftRow["Primary Visual Route"]) || clean(timedRow["Tool Route"]);
  if (isBlank(primarySource)) errors.push(`Scene ${id}: missing Primary Visual Source / Primary Visual Route`);

  const imagegenRole = roleValue(draftRow, ["Imagegen Role"]) || roleValue(designRow, ["Imagegen Role"]) || contractField(contract, "Imagegen Role").toLowerCase();
  if (isBlank(imagegenRole)) errors.push(`Scene ${id}: missing Imagegen Role`);
  if (imagegenRole && !VISUAL_ROLES.includes(imagegenRole)) errors.push(`Scene ${id}: invalid Imagegen Role ${imagegenRole}`);

  const captureRole = roleValue(sceneAssetRows[0] || {}, ["Capture Role"]) || contractField(contract, "Capture Role").toLowerCase();
  if (routes.has("capture")) {
    if (isBlank(captureRole)) errors.push(`Scene ${id}: capture route missing Capture Role`);
    if (captureRole && !CAPTURE_ROLES.includes(captureRole)) errors.push(`Scene ${id}: invalid Capture Role ${captureRole}`);
    const captureMode = contractField(contract, "Capture Mode").toLowerCase() || roleValue(sceneAssetRows[0] || {}, ["Capture Mode"]);
    if (isBlank(captureMode)) errors.push(`Scene ${id}: capture route missing Capture Mode`);
    if (captureMode && !CAPTURE_MODES.includes(captureMode)) errors.push(`Scene ${id}: invalid Capture Mode ${captureMode}`);
    if (/primary/.test(captureRole) && !/(full_side|split_half|half|large|full)/.test(captureMode)) {
      errors.push(`Scene ${id}: primary capture must use full_side, split_half, half, large, or full mode`);
    }
  }

  for (const route of VISUAL_ROUTES) {
    if (!routes.has(route)) continue;
    const hasAssetRow = route === "hyperframes" || sceneAssetRows.some((row) => routeSet(row).has(route));
    if (!hasAssetRow) errors.push(`Scene ${id}: ${route} route selected but asset-plan has no matching row`);
  }

  const imagegenRows = sceneAssetRows.filter((row) => routeSet(row).has("imagegen"));
  if (imagegenRole === "primary" && !imagegenRows.length) errors.push(`Scene ${id}: imagegen primary requires asset-plan imagegen row`);
  for (const row of imagegenRows) {
    if (isBlank(row["Processing Needed"]) && isBlank(row["Link / File / Candidate"])) {
      errors.push(`Scene ${id}: imagegen row needs prompt direction or candidate`);
    }
  }

  const doneRows = sceneAssetRows.filter((row) => routeStatusDone(row));
  if (doneRows.length && !/Evidence Frame Requirement/im.test(contract)) {
    errors.push(`Scene ${id}: completed route rows require Evidence Frame Requirement in scene contract`);
  }
}

const report = [
  "# Visual Routing Validation",
  "",
  `Project: ${rel(projectPath)}`,
  `Result: ${errors.length ? "FAIL" : "PASS"}`,
  "",
  errors.length ? "## Errors" : "## Errors",
  "",
  ...(errors.length ? errors.map((error) => `- ${error}`) : ["- none"]),
  "",
  "## Warnings",
  "",
  ...(warnings.length ? warnings.map((warning) => `- ${warning}`) : ["- none"]),
  "",
].join("\n");

await writeText(join(projectPath, "review/visual-routing-validation.md"), report);
console.log("Visual routing validation");
for (const warning of warnings) console.log(`WARN ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}
console.log("PASS visual routing is valid");
