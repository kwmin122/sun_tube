import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  REQUIRED_MARKDOWN,
  ROUTE_VALUES,
  ROOT,
  readJson,
  readText,
  rel,
  rootPath,
  run,
  tableRows,
  validateProjectShape,
} from "./lib/factory_common.mjs";

const errors = [];
const warnings = [];

function requireFile(pathLike, label = rel(pathLike)) {
  if (!existsSync(pathLike)) errors.push(`missing ${label}`);
}

requireFile(rootPath("schemas/project.schema.json"));
requireFile(rootPath("templates/project/project.json"));

let schema = {};
let template = {};
try {
  schema = await readJson(rootPath("schemas/project.schema.json"));
} catch (error) {
  errors.push(`schema json parse failed: ${error.message}`);
}
try {
  template = await readJson(rootPath("templates/project/project.json"));
} catch (error) {
  errors.push(`template project json parse failed: ${error.message}`);
}

if (schema.properties?.status?.enum === schema.properties?.currentGate?.enum) {
  errors.push("schema must define separate status and currentGate enums");
}

for (const issue of validateProjectShape(template)) errors.push(`template project.json: ${issue}`);

for (const file of REQUIRED_MARKDOWN) requireFile(rootPath("templates/project", file));

const timed = await readText(rootPath("templates/project/timed-scene-packets.md"));
const asset = await readText(rootPath("templates/project/asset-plan.md"));
const timedHasRoute = tableRows(timed).some((table) => table.headers.includes("Tool Route"));
const assetHasRoute = tableRows(asset).some((table) => table.headers.includes("Tool Route"));
if (!timedHasRoute) errors.push("timed-scene-packets.md must have a Tool Route column");
if (!assetHasRoute) errors.push("asset-plan.md must have a Tool Route column");

for (const [key, value] of Object.entries(template.routes || {})) {
  if (typeof value !== "string") errors.push(`routes.${key} must be a string enum, not ${typeof value}`);
  if (!ROUTE_VALUES.includes(value)) errors.push(`routes.${key} invalid route state: ${value}`);
}

const status = await readText(rootPath("templates/project/status.md"));
for (const artifact of Object.keys(template.artifacts || {})) {
  if (!status.includes(artifact) && !status.includes(artifact.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`))) {
    warnings.push(`status.md does not explicitly mention artifact key ${artifact}; this is allowed if checklist wording is human-friendly`);
  }
}

const skillList = run("sh", ["-c", "find skills -maxdepth 2 -name SKILL.md | sort"], { cwd: ROOT });
const skills = skillList.stdout.trim().split("\n").filter(Boolean);
if (skills.length < 13) errors.push(`expected role skills plus motion guide; found ${skills.length}`);
for (const skill of skills) {
  const body = await readText(join(ROOT, skill));
  const match = body.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    errors.push(`${skill}: missing YAML frontmatter`);
    continue;
  }
  const frontmatter = match[1];
  if (!/^name:\s*.+$/m.test(frontmatter)) errors.push(`${skill}: missing name`);
  if (!/^description:\s*.+$/m.test(frontmatter)) errors.push(`${skill}: missing description`);
  if (frontmatter.includes("\t")) errors.push(`${skill}: frontmatter contains tab`);
}

console.log("Template validation");
for (const warning of warnings) console.log(`WARN ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}
console.log("PASS templates and skill frontmatter are valid");
