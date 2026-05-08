import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ROOT,
  commandOk,
  readElevenLabsKeyFromEnv,
  rel,
  rootPath,
  run,
} from "./lib/factory_common.mjs";

function mark(ok, label, detail = "") {
  return { ok, label, detail };
}

function printGroup(title, checks, warnOnly = false) {
  const allOk = checks.every((check) => check.ok);
  console.log(`${title}: ${allOk ? "PASS" : warnOnly ? "WARN" : "FAIL"}`);
  for (const check of checks) {
    console.log(`- ${check.ok ? "OK" : warnOnly ? "WARN" : "FAIL"} ${check.label}${check.detail ? ` - ${check.detail}` : ""}`);
  }
  return allOk;
}

const required = [
  mark(commandOk("node"), "Node available"),
  mark(commandOk("npm"), "npm available"),
  mark(existsSync(rootPath("package.json")), "package.json exists"),
  mark(existsSync(rootPath("scripts")), "scripts folder exists"),
  mark(existsSync(rootPath("templates/project")), "templates/project exists"),
  mark(existsSync(rootPath("templates/project/project.json")), "templates/project/project.json exists"),
  mark(existsSync(rootPath("AGENTS.md")), "AGENTS.md exists"),
  mark(existsSync(rootPath("CLAUDE.md")), "CLAUDE.md exists"),
];

const skillFiles = run("sh", ["-c", "find skills -maxdepth 2 -name SKILL.md | wc -l"], { cwd: ROOT });
const skillCount = Number(skillFiles.stdout.trim()) || 0;
required.push(mark(skillCount >= 13, "role skills exist", `${skillCount} SKILL.md files`));

const hyperframes = run("npx", ["--yes", "hyperframes@0.5.3", "--help"], { cwd: ROOT, timeout: 20_000 });
const production = [
  mark(commandOk("ffmpeg", ["-version"]), "ffmpeg available"),
  mark(commandOk("ffprobe", ["-version"]), "ffprobe available"),
  mark(hyperframes.status === 0, "Hyperframes runnable through npx", hyperframes.status === 0 ? "" : "npx --yes hyperframes@0.5.3 --help failed"),
];

const optional = [
  mark(Boolean(readElevenLabsKeyFromEnv()), "ElevenLabs key configured", "ELEVENLABS_API_KEY or ~/.codex/secrets/elevenlabs.env"),
  mark(existsSync("/Users/a0000/Developer/video-use/SKILL.md") || Boolean(process.env.VIDEO_USE_COMMAND), "video-use capability configured", "local skill or VIDEO_USE_COMMAND"),
  mark(Boolean(process.env.IMAGEGEN_COMMAND), "imagegen command configured", "IMAGEGEN_COMMAND optional executor"),
  mark(commandOk("npx", ["playwright", "--version"], 15_000), "browser capture capability", "Playwright through npx"),
];

console.log(`Factory doctor: ${rel(ROOT)}`);
const requiredOk = printGroup("Required", required);
printGroup("Production Required", production, true);
printGroup("Optional / Late", optional, true);
console.log(`Overall: ${requiredOk ? "PASS_FOR_PHASE_1" : "FAIL_REQUIRED"}`);

process.exit(requiredOk ? 0 : 1);
