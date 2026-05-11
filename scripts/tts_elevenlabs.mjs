import { Buffer } from "node:buffer";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ensureDir,
  extractVoiceoverScript,
  loadProject,
  parseSrt,
  parseArgs,
  readElevenLabsKeyFromEnv,
  readText,
  rel,
  run,
  saveProject,
  secondsToSrtTime,
  writeBinary,
  writeJson,
  writeText,
} from "./lib/factory_common.mjs";

const VOICE_ID = "WzMnDIgiICcj1oXbUBO0";
const MODEL = "eleven_flash_v2_5";
const OUTPUT_FORMAT = "mp3_44100_128";

function audioDurationSeconds(audioPath) {
  const result = run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audioPath], { timeout: 30_000 });
  if (result.status !== 0) return null;
  const value = Number(result.stdout.trim());
  return Number.isFinite(value) && value > 0 ? value : null;
}

function normalizeCuesToDuration(cues, targetDuration) {
  if (!targetDuration || !cues.length) return cues;
  const lastEnd = cues.at(-1)?.end || 0;
  if (!lastEnd) return cues;
  if (Math.abs(lastEnd - targetDuration) / targetDuration <= 0.08) return cues;
  const scale = targetDuration / lastEnd;
  return cues.map((cue) => ({
    ...cue,
    start: cue.start * scale,
    end: Math.max(cue.end * scale, cue.start * scale + 0.4),
  }));
}

function nonSpaceCharCount(text) {
  return [...String(text || "")].filter((char) => !/\s/.test(char)).length;
}

function alignmentToSrt(alignment, fallbackText, targetDuration = null) {
  const chars = alignment?.chars || [];
  const starts = alignment?.char_start_times_seconds || [];
  const ends = alignment?.char_end_times_seconds || [];
  if (!chars.length || !starts.length || !ends.length) return roughSrt(fallbackText, targetDuration);

  const lines = scriptLines(fallbackText);
  const speechCharIndexes = [];
  for (let i = 0; i < chars.length; i += 1) {
    if (!/\s/.test(chars[i] || "")) speechCharIndexes.push(i);
  }

  if (lines.length && speechCharIndexes.length) {
    const cues = [];
    let speechCursor = 0;
    for (const line of lines) {
      const units = nonSpaceCharCount(line);
      if (!units) continue;
      const startSpeech = speechCursor;
      const endSpeech = Math.min(speechCursor + units - 1, speechCharIndexes.length - 1);
      const startIndex = speechCharIndexes[startSpeech];
      const endIndex = speechCharIndexes[endSpeech];
      if (startIndex === undefined || endIndex === undefined) break;
      cues.push({
        start: starts[startIndex] || 0,
        end: Math.max(ends[endIndex] || starts[startIndex] || 0, (starts[startIndex] || 0) + 0.4),
        text: line,
      });
      speechCursor += units;
    }
    if (cues.length === lines.length) return cuesToSrt(normalizeCuesToDuration(cues, targetDuration));
  }

  const cues = [];
  let text = "";
  let start = starts[0] || 0;
  let end = ends[0] || 0;
  for (let i = 0; i < chars.length; i += 1) {
    const char = chars[i];
    text += char;
    end = ends[i] || end;
    const shouldBreak = /[.!?。！？\n]/.test(char) || text.trim().length >= 38 || end - start >= 4.2;
    if (shouldBreak && text.trim()) {
      cues.push({ start, end: Math.max(end, start + 0.6), text: text.replace(/\s+/g, " ").trim() });
      text = "";
      start = starts[i + 1] || end;
    }
  }
  if (text.trim()) cues.push({ start, end: Math.max(end, start + 0.6), text: text.replace(/\s+/g, " ").trim() });
  return cuesToSrt(normalizeCuesToDuration(cues, targetDuration));
}

function roughSrt(text, targetDuration = null) {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const weights = lines.map((line) => Math.max(1.8, Math.min(5.2, line.length / 7)));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0) || 1;
  const target = targetDuration || totalWeight;
  let cursor = 0;
  const cues = lines.map((line, index) => {
    const duration = Math.max(0.8, (weights[index] / totalWeight) * target);
    const start = cursor;
    const end = index === lines.length - 1 ? target : Math.min(target, start + duration);
    cursor = end;
    return { start, end: Math.max(end, start + 0.4), text: line };
  });
  return cuesToSrt(cues);
}

function cuesToSrt(cues) {
  return cues
    .map((cue, index) => `${index + 1}\n${secondsToSrtTime(cue.start)} --> ${secondsToSrtTime(cue.end)}\n${cue.text}\n`)
    .join("\n");
}

function scriptLines(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function ensureMatchingLineCounts(displayText, spokenText) {
  const displayLines = scriptLines(displayText);
  const spokenLines = scriptLines(spokenText);
  if (displayLines.length !== spokenLines.length) {
    console.error("TTS blocked: display and spoken scripts must have the same line count.");
    console.error(`Display lines: ${displayLines.length}`);
    console.error(`Spoken lines: ${spokenLines.length}`);
    console.error("Fix voiceover/solo/voiceover.txt and voiceover/solo/voiceover_elevenlabs_sam.txt so each display cue maps to one spoken cue.");
    process.exit(1);
  }
}

function displaySrtFromTiming(timingSrt, displayText) {
  const cues = parseSrt(timingSrt);
  const displayLines = scriptLines(displayText);
  const exactLineMatch = displayLines.length === cues.length;
  if (!exactLineMatch) {
    throw new Error(`Display SRT blocked: timing cues (${cues.length}) and display lines (${displayLines.length}) differ.`);
  }
  const displayCues = cues.map((cue, index) => ({
    start: cue.start,
    end: cue.end,
    text: displayLines[index],
  }));
  return {
    srt: cuesToSrt(displayCues),
    exactLineMatch,
    cueCount: cues.length,
    displayLineCount: displayLines.length,
  };
}

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:tts -- <project-path> [--dry-run]");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if (project.approved?.plan !== true) {
  console.error("TTS blocked: project.json.approved.plan must be true.");
  process.exit(1);
}

const planPath = join(projectPath, "plan.md");
const planScript = extractVoiceoverScript(await readText(planPath));
if (!planScript) {
  console.error(`TTS blocked: no voiceover script found in ${rel(planPath)}`);
  process.exit(1);
}

const outDir = join(projectPath, "voiceover/solo");
const displayTextPath = join(outDir, "voiceover.txt");
const spokenTextPath = join(outDir, "voiceover_elevenlabs_sam.txt");
const audioPath = join(outDir, "voiceover-solo-elevenlabs.mp3");
const srtPath = join(outDir, "voiceover-solo-elevenlabs.srt");
const displaySrtPath = join(outDir, "voiceover-display.srt");
const assetDisplaySrtPath = join(projectPath, "assets/audio/voiceover-display.srt");
const manifestPath = join(outDir, "elevenlabs_manifest.json");
const existingDisplayScript = (await readText(displayTextPath, "")).trim();
const existingSpokenScript = (await readText(spokenTextPath, "")).trim();
const displayScript = existingDisplayScript || planScript;
const spokenScript = existingSpokenScript || displayScript;
ensureMatchingLineCounts(displayScript, spokenScript);

async function writeVoiceoverTextFiles() {
  await writeText(displayTextPath, `${displayScript.trim()}\n`);
  await writeText(spokenTextPath, `${spokenScript.trim()}\n`);
}

async function writeDisplaySrtFromElevenLabsSrt() {
  const timingSrt = await readText(srtPath);
  const display = displaySrtFromTiming(timingSrt, displayScript);
  await writeText(displaySrtPath, display.srt);
  await writeText(assetDisplaySrtPath, display.srt);
  return display;
}

async function updateManifestWithDisplaySrt(display) {
  let manifest = {};
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(await readText(manifestPath));
    } catch {
      manifest = {};
    }
  }
  await writeJson(manifestPath, {
    ...manifest,
    displayText: rel(displayTextPath),
    spokenText: rel(spokenTextPath),
    displaySrt: rel(assetDisplaySrtPath),
    syncMethod: "elevenlabs_forced_alignment_timing_with_display_text",
    displayCueCount: display.cueCount,
    displayLineCount: display.displayLineCount,
    displayExactLineMatch: display.exactLineMatch,
    updatedAt: new Date().toISOString(),
  });
}

if (args["repair-srt"]) {
  if (!existsSync(audioPath)) {
    console.error(`SRT repair blocked: missing ${rel(audioPath)}`);
    process.exit(1);
  }
  const duration = audioDurationSeconds(audioPath);
  await writeVoiceoverTextFiles();
  await writeText(srtPath, roughSrt(spokenScript, duration));
  const display = await writeDisplaySrtFromElevenLabsSrt();
  await updateManifestWithDisplaySrt(display);
  project.artifacts.tts = existsSync(audioPath) && existsSync(srtPath);
  project.status = "tts";
  project.currentGate = "timing";
  await saveProject(projectPath, project);
  console.log(`Repaired: ${rel(srtPath)}`);
  console.log(`Repaired: ${rel(assetDisplaySrtPath)} (${display.cueCount} cues, display lines: ${display.displayLineCount})`);
  console.log(`Duration: ${duration?.toFixed(3) || "unknown"}s`);
  process.exit(0);
}

if (args["repair-display-srt"]) {
  if (!existsSync(srtPath)) {
    console.error(`Display SRT repair blocked: missing ${rel(srtPath)}`);
    process.exit(1);
  }
  await writeVoiceoverTextFiles();
  const display = await writeDisplaySrtFromElevenLabsSrt();
  await updateManifestWithDisplaySrt(display);
  console.log(`Repaired: ${rel(displaySrtPath)}`);
  console.log(`Repaired: ${rel(assetDisplaySrtPath)}`);
  console.log(`Cues: ${display.cueCount}; display lines: ${display.displayLineCount}; exact line match: ${display.exactLineMatch ? "yes" : "no"}`);
  process.exit(display.exactLineMatch ? 0 : 2);
}

if (args["dry-run"]) {
  console.log(`Dry run: would generate ElevenLabs TTS for ${rel(projectPath)}`);
  console.log(`Voice ID: ${VOICE_ID}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Output: ${rel(audioPath)}`);
  console.log(`SRT: ${rel(srtPath)}`);
  console.log(`Display text: ${rel(displayTextPath)}`);
  console.log(`Spoken text: ${rel(spokenTextPath)}`);
  console.log(`Display SRT: ${rel(assetDisplaySrtPath)}`);
  console.log(`Spoken script chars: ${spokenScript.length}`);
  process.exit(0);
}

const key = readElevenLabsKeyFromEnv();
if (!key) {
  console.error("TTS blocked: missing ELEVENLABS_API_KEY or ~/.codex/secrets/elevenlabs.env");
  process.exit(1);
}

await ensureDir(outDir);
await writeVoiceoverTextFiles();
const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=${OUTPUT_FORMAT}`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "xi-api-key": key,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: JSON.stringify({
    text: spokenScript,
    model_id: MODEL,
    voice_settings: {
      stability: 0.48,
      similarity_boost: 0.75,
    },
  }),
});

if (!response.ok) {
  const body = await response.text();
  console.error(`ElevenLabs request failed: ${response.status} ${response.statusText}`);
  console.error(body.slice(0, 1000));
  process.exit(1);
}

const data = await response.json();
if (!data.audio_base64) {
  console.error("ElevenLabs response did not include audio_base64.");
  process.exit(1);
}

await writeBinary(audioPath, Buffer.from(data.audio_base64, "base64"));
const alignment = data.normalized_alignment || data.alignment;
const alignmentReady = Boolean(alignment?.chars?.length && alignment?.char_start_times_seconds?.length && alignment?.char_end_times_seconds?.length);
const duration = audioDurationSeconds(audioPath);
await writeText(srtPath, alignmentToSrt(alignment, spokenScript, duration));
const display = await writeDisplaySrtFromElevenLabsSrt();
await writeJson(manifestPath, {
  provider: "ElevenLabs",
  voice: "Sam Hottman",
  voiceId: VOICE_ID,
  model: MODEL,
  language: "ko",
  outputFormat: OUTPUT_FORMAT,
  audio: rel(audioPath),
  srt: rel(srtPath),
  displayText: rel(displayTextPath),
  spokenText: rel(spokenTextPath),
  displaySrt: rel(assetDisplaySrtPath),
  syncMethod: "elevenlabs_forced_alignment_timing_with_display_text",
  displayCueCount: display.cueCount,
  displayLineCount: display.displayLineCount,
  displayExactLineMatch: display.exactLineMatch,
  alignment: alignmentReady,
  durationSeconds: duration,
  generatedAt: new Date().toISOString(),
});

project.artifacts.tts = existsSync(audioPath) && existsSync(srtPath);
project.status = "tts";
project.currentGate = "tts";
await saveProject(projectPath, project);

console.log(`Generated: ${rel(audioPath)}`);
console.log(`Generated: ${rel(srtPath)}`);
console.log(`Generated: ${rel(assetDisplaySrtPath)}`);
