import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, "..", "..");

export const STATUS_VALUES = [
  "idea",
  "research",
  "creative",
  "script",
  "review",
  "tts",
  "timing",
  "assets",
  "motion",
  "pre_render_qa",
  "render",
  "video_review",
  "final_qa",
  "package",
  "done",
  "blocked",
];

export const GATE_VALUES = [
  "topic_intake",
  "research",
  "creative",
  "draft_scenes",
  "script",
  "review",
  "tts",
  "timing",
  "assets",
  "motion",
  "pre_render_qa",
  "render",
  "video_review",
  "final_qa",
  "package",
  "done",
  "blocked",
];

export const ROUTE_VALUES = [
  "not_required",
  "required",
  "planned",
  "in_progress",
  "done",
  "blocked",
];

export const REQUIRED_MARKDOWN = [
  "research-pack.md",
  "creative-brief.md",
  "draft-scene-packets.md",
  "plan.md",
  "timed-scene-packets.md",
  "status.md",
  "asset-plan.md",
  "design-context.md",
  "source-notes.md",
  "scene-packet.md",
];

export const ARTIFACT_FILES = {
  researchPack: "research-pack.md",
  creativeBrief: "creative-brief.md",
  draftScenePackets: "draft-scene-packets.md",
  plan: "plan.md",
  tts: "voiceover/solo/voiceover-solo-elevenlabs.mp3",
  audioMix: "voiceover/solo/voiceover-solo-final-mix.m4a",
  timedScenePackets: "timed-scene-packets.md",
  assetPlan: "asset-plan.md",
  designContext: "design-context.md",
  composition: "composition",
  render: "renders/final.mp4",
  videoReview: "review/video-review/video-review.md",
  directorReview: "review/video-review/director-review.md",
};

export const ROLE_BY_GATE = {
  topic_intake: {
    roles: ["hype-topic-producer"],
    read: ["AGENTS.md", "PRODUCTION_ROLES.md", "CREATIVE_DEVELOPMENT_PIPELINE.md", "project.json"],
    write: ["project.json", "status.md"],
    note: "주제 타입, 시청자, 길이, 콘텐츠 패턴 후보를 정리하고 research로 넘긴다.",
  },
  research: {
    roles: ["hype-research-desk"],
    read: ["AGENTS.md", "project.json", "creative-brief.md"],
    write: ["research-pack.md", "project.json", "status.md"],
    note: "검증팀이 아니라 소재 개발팀이다. 링크, 장면감, 인터뷰/이미지/문서 후보를 모은다.",
  },
  creative: {
    roles: ["hype-showrunner", "hype-creative-director"],
    read: ["project.json", "research-pack.md"],
    write: ["creative-brief.md", "project.json", "status.md"],
    note: "핵심 각도, 길이, 톤, 전체 구조를 하나로 고정한다.",
  },
  draft_scenes: {
    roles: ["hype-scene-planner"],
    read: ["project.json", "research-pack.md", "creative-brief.md"],
    write: ["draft-scene-packets.md", "project.json", "status.md"],
    note: "대본 전 씬 목적, 역할, 자료 방향을 잡는다.",
  },
  script: {
    roles: ["hype-writer-room"],
    read: ["project.json", "creative-brief.md", "draft-scene-packets.md"],
    write: ["plan.md", "project.json", "status.md"],
    note: "한국어 대본과 승인용 씬 계약서를 작성한다.",
  },
  review: {
    roles: ["user approval"],
    read: ["plan.md", "project.json"],
    write: ["project.json.approved.plan", "status.md"],
    note: "사용자가 대본과 씬 계약서를 승인해야 TTS가 열린다.",
  },
  tts: {
    roles: ["hype-audio-producer"],
    read: ["project.json", "plan.md"],
    write: ["voiceover/solo/voiceover-solo-elevenlabs.mp3", "voiceover/solo/voiceover-solo-elevenlabs.srt", "voiceover/solo/voiceover-solo-final-mix.m4a"],
    note: "승인된 plan만 ElevenLabs TTS와 믹스로 넘긴다.",
  },
  timing: {
    roles: ["hype-scene-planner"],
    read: ["project.json", "plan.md", "voiceover/solo/voiceover-solo-elevenlabs.srt", "draft-scene-packets.md"],
    write: ["timed-scene-packets.md", "project.json", "status.md"],
    note: "SRT 기준으로 초 단위 제작 지시서를 만든다.",
  },
  assets: {
    roles: ["hype-asset-producer", "hype-visual-director"],
    read: ["project.json", "timed-scene-packets.md", "asset-plan.md", "design-context.md", "TOOL_ROUTING_PIPELINE.md"],
    write: ["work-orders/*.md", "asset-plan.md", "design-context.md", "project.json"],
    note: "Tool Route 기준으로 work order를 만들고 필요한 외부 작업을 분기한다.",
  },
  motion: {
    roles: ["hype-motion-designer"],
    read: ["project.json", "timed-scene-packets.md", "asset-plan.md", "design-context.md", "voiceover/solo/voiceover-solo-final-mix.m4a"],
    write: ["composition/src/*.json", "composition/"],
    note: "Hyperframes 조립용 데이터와 모션 구현을 준비한다.",
  },
  pre_render_qa: {
    roles: ["hype-qa-editor"],
    read: ["project.json", "composition/", "timed-scene-packets.md", "asset-plan.md"],
    write: ["review/qa-pre-render.md"],
    note: "렌더 전에 승인, 오디오, pending, 스냅샷, Hyperframes check를 본다.",
  },
  render: {
    roles: ["render command"],
    read: ["project.json", "review/qa-pre-render.md", "composition/"],
    write: ["renders/final.mp4", "renders/render_manifest.json"],
    note: "pre-render QA 이후에만 렌더한다. 필요하면 --force로 명시 우회한다.",
  },
  video_review: {
    roles: ["hype-video-reviewer"],
    read: ["project.json", "renders/final.mp4", "voiceover/solo/voiceover-solo-elevenlabs.srt", "timed-scene-packets.md", "asset-plan.md", "work-orders/*.md", "composition/"],
    write: ["review/video-review/video-review.md", "review/video-review/scene-frame-notes.md", "review/video-review/director-review.md", "review/video-review/*.json", "review/video-review/fix-list.md"],
    note: "렌더된 MP4에서 프레임 증거를 만들고, 디렉터가 director-review.md에 PASS/FAIL 판단을 남긴다.",
  },
  final_qa: {
    roles: ["hype-qa-editor"],
    read: ["project.json", "renders/final.mp4", "review/video-review/video-review.md", "review/video-review/director-review.md"],
    write: ["review/qa-final.md"],
    note: "디렉터 리뷰 PASS와 최종 MP4의 오디오/비디오 스트림, duration을 확인한다.",
  },
  package: {
    roles: ["hype-packaging-editor"],
    read: ["project.json", "plan.md", "review/qa-final.md"],
    write: ["package/title-options.md", "package/description.md", "package/pinned-comment.md", "package/thumbnail-prompts.md", "package/upload-checklist.md"],
    note: "업로드 패키지를 만든다.",
  },
  done: {
    roles: [],
    read: ["project.json"],
    write: [],
    note: "완료 상태다.",
  },
  blocked: {
    roles: ["human decision"],
    read: ["project.json", "status.md"],
    write: ["project.json", "status.md"],
    note: "차단 사유를 해결해야 한다.",
  },
};

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--") continue;
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const raw = token.slice(2);
    const eq = raw.indexOf("=");
    if (eq !== -1) {
      args[raw.slice(0, eq)] = raw.slice(eq + 1);
      continue;
    }
    const next = argv[i + 1];
    if (next && next !== "--" && !next.startsWith("--")) {
      args[raw] = next;
      i += 1;
    } else {
      args[raw] = true;
    }
  }
  return args;
}

export function rootPath(...parts) {
  return join(ROOT, ...parts);
}

export function resolveInsideRoot(pathLike) {
  return isAbsolute(pathLike) ? pathLike : resolve(ROOT, pathLike);
}

export function rel(pathLike) {
  return relative(ROOT, pathLike) || ".";
}

export async function ensureDir(pathLike) {
  await mkdir(pathLike, { recursive: true });
}

export async function readText(pathLike, fallback = "") {
  try {
    return await readFile(pathLike, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

export async function writeText(pathLike, value) {
  await ensureDir(dirname(pathLike));
  await writeFile(pathLike, value, "utf8");
}

export async function writeBinary(pathLike, value) {
  await ensureDir(dirname(pathLike));
  await writeFile(pathLike, value);
}

export async function readJson(pathLike) {
  return JSON.parse(await readText(pathLike));
}

export async function writeJson(pathLike, value) {
  await writeText(pathLike, `${JSON.stringify(value, null, 2)}\n`);
}

export async function copyDir(src, dest) {
  await cp(src, dest, { recursive: true, errorOnExist: true, force: false });
}

function flattenProject(value, prefix = "", out = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flattenProject(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out[prefix] = value;
  return out;
}

export function changedProjectFields(before, after) {
  if (!before) return ["created project.json"];
  const left = flattenProject(before);
  const right = flattenProject(after);
  const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
  return keys.filter((key) => JSON.stringify(left[key]) !== JSON.stringify(right[key]));
}

export function printChangedProjectFields(before, after) {
  const changed = changedProjectFields(before, after);
  console.log(`Changed project.json fields: ${changed.length ? changed.join(", ") : "none"}`);
  return changed;
}

export function nowIso() {
  return new Date().toISOString();
}

export function slugify(input) {
  const replacements = new Map([
    ["테스트", "test"],
    ["주제", "topic"],
    ["클로드", "claude"],
    ["코덱스", "codex"],
    ["유튜브", "youtube"],
    ["영상", "video"],
    ["하이프", "hype"],
  ]);
  let value = String(input || "").trim();
  for (const [from, to] of replacements) {
    value = value.replaceAll(from, ` ${to} `);
  }
  value = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return value || "topic";
}

export async function nextProjectId(projectsDir = rootPath("projects")) {
  if (!existsSync(projectsDir)) return "001";
  const entries = await readdir(projectsDir);
  const max = entries.reduce((acc, entry) => {
    const match = entry.match(/^(\d{3})-/);
    return match ? Math.max(acc, Number(match[1])) : acc;
  }, 0);
  return String(max + 1).padStart(3, "0");
}

export function projectPathFromArg(arg) {
  if (!arg) throw new Error("Project path is required.");
  return resolveInsideRoot(arg);
}

export async function loadProject(projectPath) {
  const full = projectPathFromArg(projectPath);
  const jsonPath = join(full, "project.json");
  if (!existsSync(jsonPath)) {
    throw new Error(`Missing project.json: ${rel(jsonPath)}`);
  }
  const project = await readJson(jsonPath);
  return { project, projectPath: full, jsonPath };
}

export async function saveProject(projectPath, project) {
  const full = projectPathFromArg(projectPath);
  const jsonPath = join(full, "project.json");
  const before = existsSync(jsonPath) ? await readJson(jsonPath) : null;
  project.updatedAt = nowIso();
  await writeJson(jsonPath, project);
  printChangedProjectFields(before, project);
}

export async function updateProject(projectPath, updater) {
  const loaded = await loadProject(projectPath);
  const next = await updater(loaded.project, loaded);
  await saveProject(loaded.projectPath, next || loaded.project);
}

export function artifactPath(projectPath, artifactKey) {
  const file = ARTIFACT_FILES[artifactKey];
  if (!file) return null;
  return join(projectPath, file);
}

export function validateProjectShape(project) {
  const issues = [];
  if (project.schemaVersion !== 1) issues.push("schemaVersion must be 1");
  if (!project.id) issues.push("id is required");
  if (!project.slug) issues.push("slug is required");
  if (!project.title) issues.push("title is required");
  if (!STATUS_VALUES.includes(project.status)) issues.push(`invalid status: ${project.status}`);
  if (!GATE_VALUES.includes(project.currentGate)) issues.push(`invalid currentGate: ${project.currentGate}`);
  for (const key of ["creativeBrief", "plan", "tts", "timedScenePackets", "render"]) {
    if (typeof project.approved?.[key] !== "boolean") issues.push(`approved.${key} must be boolean`);
  }
  for (const key of Object.keys(ARTIFACT_FILES)) {
    if (typeof project.artifacts?.[key] !== "boolean") issues.push(`artifacts.${key} must be boolean`);
  }
  for (const key of ["workOrders", "videoUse", "imagegen", "capture", "hyperframes"]) {
    if (!ROUTE_VALUES.includes(project.routes?.[key])) issues.push(`routes.${key} must be route enum string`);
  }
  return issues;
}

export function inferGate(project) {
  if (project.currentGate === "blocked" || project.status === "blocked") return "blocked";
  if (
    (project.currentGate === "done" || project.status === "done") &&
    project.artifacts?.render &&
    project.artifacts?.videoReview &&
    project.artifacts?.directorReview
  ) return "done";
  if (!project.artifacts?.researchPack) return project.currentGate === "topic_intake" ? "topic_intake" : "research";
  if (!project.artifacts?.creativeBrief || !project.approved?.creativeBrief) return "creative";
  if (!project.artifacts?.draftScenePackets) return "draft_scenes";
  if (!project.artifacts?.plan) return "script";
  if (!project.approved?.plan) return "review";
  if (!project.artifacts?.tts || !project.artifacts?.audioMix) return "tts";
  if (!project.artifacts?.timedScenePackets) return "timing";
  if (
    !project.artifacts?.assetPlan ||
    !project.artifacts?.designContext ||
    project.routes?.workOrders !== "done" ||
    ["required", "planned", "in_progress", "blocked"].includes(project.routes?.videoUse) ||
    ["required", "planned", "in_progress", "blocked"].includes(project.routes?.imagegen) ||
    ["required", "planned", "in_progress", "blocked"].includes(project.routes?.capture)
  ) return "assets";
  if (!project.artifacts?.composition) return "motion";
  if (!project.approved?.render) return "pre_render_qa";
  if (!project.artifacts?.render) return "render";
  if (!project.artifacts?.videoReview) return "video_review";
  if (!project.artifacts?.directorReview) return "video_review";
  if (project.currentGate === "final_qa") return "final_qa";
  if (project.currentGate === "package") return "package";
  return project.currentGate || "topic_intake";
}

export function statusForGate(gate) {
  if (gate === "topic_intake") return "idea";
  if (gate === "draft_scenes") return "creative";
  if (gate === "pre_render_qa") return "pre_render_qa";
  if (gate === "video_review") return "video_review";
  if (gate === "final_qa") return "final_qa";
  if (gate === "package") return "package";
  if (gate === "done") return "done";
  if (gate === "blocked") return "blocked";
  if (["research", "creative", "script", "review", "tts", "timing", "assets", "motion", "render"].includes(gate)) return gate;
  return "idea";
}

export function tableRows(markdown) {
  const lines = markdown.split(/\r?\n/);
  const tables = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const next = lines[i + 1];
    if (!line?.trim().startsWith("|") || !next?.includes("---")) continue;
    const headers = splitTableLine(line);
    const rows = [];
    i += 2;
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      const cells = splitTableLine(lines[i]);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = cells[index] || "";
      });
      rows.push(row);
      i += 1;
    }
    tables.push({ headers, rows });
  }
  return tables;
}

export function splitTableLine(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function findRowsWithToolRoute(markdown) {
  return tableRows(markdown).flatMap((table) => {
    const routeHeader = table.headers.find((header) => header.toLowerCase() === "tool route");
    if (!routeHeader) return [];
    return table.rows.map((row) => ({ ...row, ToolRoute: row[routeHeader] }));
  });
}

export function normalizeRoute(route) {
  return normalizeRoutes(route)[0] || "manual";
}

export function normalizeRoutes(route) {
  const value = String(route || "").trim().toLowerCase();
  const routes = [];
  if (value.includes("video")) routes.push("video-use");
  if (value.includes("image")) routes.push("imagegen");
  if (value.includes("capture") || value.includes("screenshot")) routes.push("capture");
  if (value.includes("ffmpeg") || value.includes("script")) routes.push("script/ffmpeg");
  if (value.includes("manual")) routes.push("manual");
  if (value.includes("hyper")) routes.push("hyperframes");
  if (!routes.length) routes.push(value || "manual");
  return [...new Set(routes)];
}

export function routeStateKey(route) {
  const normalized = normalizeRoute(route);
  if (normalized === "video-use") return "videoUse";
  if (normalized === "imagegen") return "imagegen";
  if (normalized === "capture") return "capture";
  if (normalized === "hyperframes") return "hyperframes";
  return null;
}

export function extractVoiceoverScript(planMarkdown) {
  const section = planMarkdown.split(/^## Voiceover Script\s*$/m)[1] || "";
  const fence = section.match(/```(?:text)?\s*([\s\S]*?)```/);
  if (fence?.[1]?.trim()) return fence[1].trim();
  return section
    .split(/^##\s+/m)[0]
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export function parseSrt(srt) {
  return srt
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n").filter(Boolean);
      const timingIndex = lines.findIndex((line) => line.includes("-->"));
      if (timingIndex === -1) return null;
      const [startRaw, endRaw] = lines[timingIndex].split("-->").map((part) => part.trim());
      return {
        index: Number(lines[0]) || null,
        start: srtTimeToSeconds(startRaw),
        end: srtTimeToSeconds(endRaw),
        text: lines.slice(timingIndex + 1).join(" ").trim(),
      };
    })
    .filter(Boolean);
}

export function srtTimeToSeconds(value) {
  const match = String(value).match(/(\d+):(\d+):(\d+),(\d+)/);
  if (!match) return 0;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
}

export function secondsToTimestamp(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safe / 60);
  const rest = safe - minutes * 60;
  return `${minutes}:${rest.toFixed(1).padStart(4, "0")}`;
}

export function secondsToSrtTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = Math.floor(safe % 60);
  const ms = Math.round((safe - Math.floor(safe)) * 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function projectLabel(project) {
  return `${project.id}-${project.slug}`;
}

export function run(command, args = [], options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd || ROOT,
    encoding: "utf8",
    shell: false,
    timeout: options.timeout || 120_000,
    stdio: options.stdio || "pipe",
  });
}

export function commandOk(command, args = ["--version"], timeout = 10_000) {
  const result = run(command, args, { timeout });
  return result.status === 0;
}

export function readElevenLabsKeyFromEnv() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const secretPath = join(homedir(), ".codex", "secrets", "elevenlabs.env");
  if (!existsSync(secretPath)) return "";
  const text = spawnSync("sh", ["-c", `. "${secretPath.replaceAll("'", "'\\''")}"; printf %s "$ELEVENLABS_API_KEY"`], {
    encoding: "utf8",
    shell: false,
  });
  if (text.status === 0 && text.stdout.trim()) return text.stdout.trim();
  const raw = existsSync(secretPath) ? spawnSync("cat", [secretPath], { encoding: "utf8" }).stdout : "";
  const match = raw.match(/ELEVENLABS_API_KEY\s*=\s*["']?([^"'\n]+)["']?/);
  return match?.[1]?.trim() || "";
}

export async function pathKind(pathLike) {
  try {
    const info = await stat(pathLike);
    return info.isDirectory() ? "dir" : "file";
  } catch {
    return "missing";
  }
}

export function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}
