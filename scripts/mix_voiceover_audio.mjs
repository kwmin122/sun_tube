import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  commandOk,
  ensureDir,
  loadProject,
  parseArgs,
  rel,
  run,
  saveProject,
  writeJson,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:mix -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const voice = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.mp3");
const bgm = join(projectPath, "assets/bgm/default-bgm.mp3");
const out = join(projectPath, "voiceover/solo/voiceover-solo-final-mix.m4a");
const manifest = join(projectPath, "voiceover/solo/audio_mix_manifest.json");

if (!existsSync(voice)) {
  console.error(`Mix blocked: missing ${rel(voice)}`);
  process.exit(1);
}
if (!existsSync(bgm)) {
  console.error(`Mix blocked: missing ${rel(bgm)}`);
  console.error("Expected BGM: Glass Horizon by loudsquaredance310 at assets/bgm/default-bgm.mp3");
  process.exit(1);
}

const ffmpegOk = commandOk("ffmpeg", ["-version"]);
if (!ffmpegOk) {
  console.error("Mix blocked: ffmpeg is not available.");
  process.exit(1);
}

const command = [
  "-y",
  "-i",
  voice,
  "-stream_loop",
  "-1",
  "-i",
  bgm,
  "-filter_complex",
  "[1:a]volume=0.16[bgm];[bgm][0:a]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=250[ducked];[0:a][ducked]amix=inputs=2:duration=first:dropout_transition=2[a]",
  "-map",
  "[a]",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  out,
];

if (args["dry-run"]) {
  console.log(`Dry run: ffmpeg ${command.map((part) => JSON.stringify(part)).join(" ")}`);
  process.exit(0);
}

await ensureDir(join(projectPath, "voiceover/solo"));
const result = run("ffmpeg", command, { cwd: projectPath, timeout: 300_000 });
if (result.status !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.status || 1);
}

project.artifacts.audioMix = existsSync(out);
project.status = "tts";
project.currentGate = project.artifacts.tts ? "timing" : "tts";
await saveProject(projectPath, project);
await writeJson(manifest, {
  voiceover: rel(voice),
  bgm: rel(bgm),
  output: rel(out),
  bgmVolume: 0.16,
  ducking: true,
  generatedAt: new Date().toISOString(),
});
console.log(`Generated: ${rel(out)}`);
