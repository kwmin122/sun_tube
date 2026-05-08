import { existsSync } from "node:fs";
import {
  ARTIFACT_FILES,
  artifactPath,
  inferGate,
  loadProject,
  parseArgs,
  rel,
  validateProjectShape,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:status -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const issues = validateProjectShape(project);
const suggestedGate = inferGate(project);

console.log(`Project: ${rel(projectPath)}`);
console.log(`Title: ${project.title}`);
console.log(`Status: ${project.status}`);
console.log(`Current gate: ${project.currentGate}`);
console.log(`Suggested gate: ${suggestedGate}`);
console.log("Canonical state: project.json");

if (issues.length) {
  console.log("State issues:");
  for (const issue of issues) console.log(`- ${issue}`);
}

console.log("Artifacts:");
const mismatches = [];
for (const [key] of Object.entries(ARTIFACT_FILES)) {
  const path = artifactPath(projectPath, key);
  const fileExists = path && existsSync(path);
  const fileState = fileExists ? "exists" : "missing";
  const artifactComplete = project.artifacts?.[key] === true;
  const artifactState = artifactComplete ? "complete" : "pending";
  if (artifactComplete && !fileExists) mismatches.push(`${key}: artifact complete but file is missing`);
  if (!artifactComplete && fileExists) mismatches.push(`${key}: file exists but artifact is pending`);
  console.log(`- ${key}: file ${fileState}, artifact ${artifactState}`);
}

if (mismatches.length) {
  console.log("State mismatches:");
  for (const mismatch of mismatches) console.log(`- ${mismatch}`);
}

const pending = Object.entries(project.artifacts || {})
  .filter(([, value]) => !value)
  .map(([key]) => key);

console.log("Missing or pending:");
if (!pending.length && !issues.length) {
  console.log("- none");
} else {
  for (const key of pending) console.log(`- artifact ${key} is not complete`);
}

console.log("Next:");
console.log(`- npm run factory:next -- ${rel(projectPath)}`);
