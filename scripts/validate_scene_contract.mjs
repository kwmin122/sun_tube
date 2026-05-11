import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import {
  loadProject,
  parseArgs,
  readText,
  rel,
  resolveInsideRoot,
  rootPath,
  tableRows,
  writeText,
} from "./lib/factory_common.mjs";

const REQUIRED_FIELDS = [
  "Narration Clause",
  "Primary Screen Object",
  "Viewer Must Understand",
  "Primary Visual Source",
  "Capture Role",
  "Capture Mode",
  "Imagegen Role",
  "Video-use Role",
  "HTML Motion Role",
  "Allowed Visual Elements",
  "Forbidden Fillers",
  "Motion Beats",
  "Required State Change",
  "Hold Rule",
  "Exit Rule",
  "Implementation Markers",
  "Evidence Frame Requirement",
  "Fallback Policy",
  "Generic Component Ban",
  "If Missing, Do Not",
];

const GENERIC_FALLBACK_PATTERNS = [
  /\bSynthesis\b/,
  /\bCardGrid\b/,
  /\bStatPanel\b/,
  /\bGenericScene\b/,
  /\bFallbackScene\b/,
  /\bTemplateScene\b/,
];

const FORBIDDEN_FILLER_PATTERNS = [
  /random-dot/i,
  /decorative-dot/i,
  /source-stamp/i,
  /caption-progress/i,
  /progress-bar/i,
];

const IMPLEMENTATION_DIRS = [
  "composition",
  "composition-hyperframes",
  "composition-remotion",
];

const IMPLEMENTATION_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
]);

function clean(value) {
  return String(value || "").trim();
}

function normalizeSceneId(value) {
  const match = String(value || "").match(/\d+/);
  return match ? match[0].padStart(2, "0") : "";
}

function isBlank(value) {
  const text = clean(value).replace(/\s+/g, " ");
  return !text || /^(tbd|todo|n\/a|none|-|\?)$/i.test(text);
}

function countMotionBeats(value) {
  return clean(value)
    .split(/\s*(?:->|→|,|;|\n)\s*/g)
    .map((part) => part.trim())
    .filter(Boolean)
    .length;
}

function parseContracts(markdown) {
  const sections = new Map();
  const headingRegex = /^##\s+Scene\s+(\d+)\s*$/gim;
  const matches = [...markdown.matchAll(headingRegex)];
  for (let index = 0; index < matches.length; index += 1) {
    const id = normalizeSceneId(matches[index][1]);
    const start = matches[index].index + matches[index][0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const body = markdown.slice(start, end);
    sections.set(id, parseFields(body));
  }
  return sections;
}

function parseFields(sectionBody) {
  const fields = {};
  let current = "";
  const fieldMatcher = new RegExp(`^\\s*-\\s+(${REQUIRED_FIELDS.map(escapeRegExp).join("|")})\\s*:\\s*(.*)$`, "i");
  for (const rawLine of sectionBody.split(/\r?\n/)) {
    const match = rawLine.match(fieldMatcher);
    if (match) {
      current = REQUIRED_FIELDS.find((field) => field.toLowerCase() === match[1].toLowerCase()) || match[1];
      fields[current] = match[2] || "";
      continue;
    }
    if (current && rawLine.trim()) {
      fields[current] = `${fields[current]}\n${rawLine.trim()}`.trim();
    }
  }
  return fields;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function expectedScenesFromPlan(planMarkdown) {
  const ids = [];
  for (const table of tableRows(planMarkdown)) {
    if (!table.headers.includes("#") || !table.headers.includes("Time")) continue;
    for (const row of table.rows) {
      const id = normalizeSceneId(row["#"]);
      if (id) ids.push(id);
    }
  }
  return [...new Set(ids)];
}

function markerStrings(value) {
  const markers = new Set();
  for (const match of String(value || "").matchAll(/`([^`]+)`/g)) {
    markers.add(match[1].trim());
  }
  if (!markers.size) {
    for (const part of String(value || "").split(",")) {
      const marker = part.trim();
      if (marker.startsWith("data-") || marker.startsWith(".")) markers.add(marker);
    }
  }
  return [...markers].filter(Boolean);
}

async function readImplementationText(projectPath) {
  const chunks = [];
  for (const dir of IMPLEMENTATION_DIRS) {
    const full = join(projectPath, dir);
    if (!existsSync(full)) continue;
    await collectFiles(full, chunks);
  }
  return chunks.join("\n");
}

async function collectFiles(dir, chunks) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === "renders") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(full, chunks);
      continue;
    }
    if (!IMPLEMENTATION_EXTENSIONS.has(extname(entry.name))) continue;
    chunks.push(`\n/* ${basename(full)} */\n${await readFile(full, "utf8")}`);
  }
}

function validateContracts({ contracts, expectedScenes, templateMode = false }) {
  const errors = [];
  const warnings = [];
  const ids = expectedScenes.length ? expectedScenes : [...contracts.keys()];
  for (const id of ids) {
    const fields = contracts.get(id);
    if (!fields) {
      errors.push(`Scene ${id}: missing contract section`);
      continue;
    }
    for (const field of REQUIRED_FIELDS) {
      if (!(field in fields)) {
        errors.push(`Scene ${id}: missing field ${field}`);
        continue;
      }
      if (!templateMode && isBlank(fields[field])) {
        errors.push(`Scene ${id}: empty field ${field}`);
      }
    }
    if (templateMode) continue;
    if (countMotionBeats(fields["Motion Beats"]) < 3) {
      errors.push(`Scene ${id}: Motion Beats must contain at least 3 ordered beats`);
    }
    const markers = markerStrings(fields["Implementation Markers"]);
    if (!markers.some((marker) => marker.startsWith("data-scene"))) {
      errors.push(`Scene ${id}: Implementation Markers must include data-scene`);
    }
    if (fields["Capture Role"].toLowerCase().includes("primary") && !/\b(full_side|split_half|half|large|full)\b/i.test(fields["Capture Mode"])) {
      errors.push(`Scene ${id}: primary capture must use full_side, split_half, half, large, or full Capture Mode`);
    }
    if (!/\b(primary|support|not_required)\b/i.test(fields["Imagegen Role"])) {
      errors.push(`Scene ${id}: Imagegen Role must be primary, support, or not_required`);
    }
    if (!/\b(stop|return|planning|기획|멈추|되돌)/i.test(fields["Fallback Policy"])) {
      warnings.push(`Scene ${id}: Fallback Policy should explicitly stop and return to planning`);
    }
  }
  return { errors, warnings };
}

function validateImplementation({ contracts, implementationText }) {
  const errors = [];
  const warnings = [];
  if (!implementationText.trim()) {
    errors.push("implementation files not found for marker checks");
    return { errors, warnings };
  }
  for (const [id, fields] of contracts) {
    for (const marker of markerStrings(fields["Implementation Markers"])) {
      if (!implementationText.includes(marker)) {
        errors.push(`Scene ${id}: implementation missing marker ${marker}`);
      }
    }
  }
  for (const pattern of GENERIC_FALLBACK_PATTERNS) {
    if (pattern.test(implementationText)) errors.push(`generic fallback component detected: ${pattern}`);
  }
  for (const pattern of FORBIDDEN_FILLER_PATTERNS) {
    if (pattern.test(implementationText)) errors.push(`forbidden filler marker detected: ${pattern}`);
  }
  return { errors, warnings };
}

function report({ projectLabel, checkImplementation, errors, warnings }) {
  const lines = [
    "# Scene Contract Validation",
    "",
    `Project: ${projectLabel}`,
    `Implementation check: ${checkImplementation ? "yes" : "no"}`,
    `Result: ${errors.length ? "FAIL" : "PASS"}`,
    "",
  ];
  if (errors.length) {
    lines.push("## Errors", "");
    for (const error of errors) lines.push(`- ${error}`);
    lines.push("");
  }
  if (warnings.length) {
    lines.push("## Warnings", "");
    for (const warning of warnings) lines.push(`- ${warning}`);
    lines.push("");
  }
  if (!errors.length && !warnings.length) lines.push("No issues found.", "");
  return `${lines.join("\n")}\n`;
}

const args = parseArgs();
const targetArg = args._[0];
if (!targetArg) {
  console.error("Usage: npm run factory:validate-scene-contract -- <project-path> [-- --template] [-- --check-implementation]");
  process.exit(1);
}

const templateMode = Boolean(args.template);
const checkImplementation = Boolean(args["check-implementation"]);
const targetPath = resolveInsideRoot(targetArg);
const projectPath = templateMode ? targetPath : (await loadProject(targetArg)).projectPath;
const contractPath = join(projectPath, "scene-contracts.md");
const planPath = join(projectPath, "plan.md");

const errors = [];
const warnings = [];
if (!existsSync(contractPath)) errors.push(`missing ${rel(contractPath)}`);
const contractText = await readText(contractPath, "");
const planText = await readText(planPath, "");
const contracts = parseContracts(contractText);
if (!contracts.size) errors.push("scene-contracts.md has no Scene sections");

const expectedScenes = templateMode ? [] : expectedScenesFromPlan(planText);
if (!templateMode && !expectedScenes.length) warnings.push("could not infer expected scenes from plan.md");

const contractResult = validateContracts({ contracts, expectedScenes, templateMode });
errors.push(...contractResult.errors);
warnings.push(...contractResult.warnings);

if (checkImplementation && !errors.length) {
  const implementationText = await readImplementationText(projectPath);
  const implementationResult = validateImplementation({ contracts, implementationText });
  errors.push(...implementationResult.errors);
  warnings.push(...implementationResult.warnings);
}

const markdown = report({
  projectLabel: templateMode ? rel(projectPath) : rel(projectPath),
  checkImplementation,
  errors,
  warnings,
});

if (!templateMode) {
  const reportName = checkImplementation ? "scene-contract-implementation-validation.md" : "scene-contract-validation.md";
  await writeText(join(projectPath, "review", reportName), markdown);
}

console.log("Scene contract validation");
for (const warning of warnings) console.log(`WARN ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`FAIL ${error}`);
  process.exit(1);
}
console.log("PASS scene contracts are valid");
