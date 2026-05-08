import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import {
  readText,
  rel,
  rootPath,
  run,
} from "./lib/factory_common.mjs";

const tmpRoot = rootPath(".factory-tmp/factory-smoke");
const tmpProjects = ".factory-tmp/factory-smoke/projects";
const projectArg = `${tmpProjects}/997-smoke-test`;
const projectJson = rootPath(projectArg, "project.json");

function step(label, command, args, options = {}) {
  const expectFailure = Boolean(options.expectFailure);
  const result = run(command, args, { timeout: options.timeout || 120_000 });
  const ok = expectFailure ? result.status !== 0 : result.status === 0;
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) {
    console.error(result.stderr || result.stdout || `status=${result.status}`);
    process.exit(1);
  }
  return result;
}

async function assertUnchanged(label, before) {
  const after = await readText(projectJson);
  if (after !== before) {
    console.error(`FAIL ${label}: project.json changed`);
    process.exit(1);
  }
  console.log(`PASS ${label}: project.json unchanged`);
}

await rm(tmpRoot, { recursive: true, force: true });

step("doctor", "node", ["scripts/doctor.mjs"], { timeout: 180_000 });
step("validate templates", "node", ["scripts/validate_templates.mjs"]);

step("factory:new dry-run", "node", [
  "scripts/new_project.mjs",
  "한글 주제 테스트",
  "--id",
  "997",
  "--slug",
  "smoke-test",
  "--projects-dir",
  tmpProjects,
  "--dry-run",
]);
if (existsSync(projectJson)) {
  console.error(`FAIL factory:new dry-run created ${rel(projectJson)}`);
  process.exit(1);
}
console.log("PASS factory:new dry-run did not create files");

step("factory:new temp project", "node", [
  "scripts/new_project.mjs",
  "한글 주제 테스트",
  "--id",
  "997",
  "--slug",
  "smoke-test",
  "--projects-dir",
  tmpProjects,
]);
if (!existsSync(projectJson)) {
  console.error(`FAIL temp project missing ${rel(projectJson)}`);
  process.exit(1);
}
console.log(`PASS temp project created: ${projectArg}`);

let before = await readText(projectJson);
step("status read-only", "node", ["scripts/status.mjs", projectArg]);
await assertUnchanged("status read-only", before);

before = await readText(projectJson);
step("next read-only", "node", ["scripts/next.mjs", projectArg]);
await assertUnchanged("next read-only", before);

before = await readText(projectJson);
step("TTS blocked without approval", "node", ["scripts/tts_elevenlabs.mjs", projectArg], { expectFailure: true });
await assertUnchanged("TTS blocked without approval", before);

before = await readText(projectJson);
step("render blocked without approval", "node", ["scripts/render_project.mjs", projectArg], { expectFailure: true });
await assertUnchanged("render blocked without approval", before);

before = await readText(projectJson);
step("route blocked before timed packets and asset plan complete", "node", ["scripts/route_work_orders.mjs", projectArg], { expectFailure: true });
await assertUnchanged("route blocked before timed packets and asset plan complete", before);

console.log("Factory smoke: PASS control panel is safe");
