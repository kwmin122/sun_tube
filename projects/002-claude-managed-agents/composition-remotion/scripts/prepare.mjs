import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  parseSrt,
  readText,
  tableRows,
} from "../../../../scripts/lib/factory_common.mjs";

const ROOT = join(import.meta.dirname, "..");
const PROJECT = join(ROOT, "..");
const GENERATED = join(ROOT, "src/generated");

function clean(value) {
  return String(value || "").trim();
}

function timeToSeconds(value) {
  const [min, sec] = clean(value).split(":");
  const minutes = Number(min);
  const seconds = Number(sec);
  return Number.isFinite(minutes) && Number.isFinite(seconds) ? minutes * 60 + seconds : 0;
}

function parseRange(value) {
  const [start, end] = clean(value).split("-");
  return { start: timeToSeconds(start), end: timeToSeconds(end) };
}

function classifyRecipe(scene, motionBeat = "") {
  const id = String(scene).padStart(2, "0");
  if (id === "02") return "product/before-after-demo";
  if (["05", "06"].includes(id)) return "explain/mechanism-state-machine";
  if (["07", "08"].includes(id)) return "explain/fan-out-fan-in";
  if (["09", "10"].includes(id)) return "explain/mechanism-state-machine";
  if (["03", "12"].includes(id)) return "proof/document-zoom-highlight";
  if (["11", "13"].includes(id)) return "visual-essay/imagegen-cinematic-sequence";
  if (/fan/i.test(motionBeat)) return "explain/fan-out-fan-in";
  if (/loop|gate|scan/i.test(motionBeat)) return "explain/mechanism-state-machine";
  return "explain/mechanism-state-machine";
}

function sceneTitle(id) {
  const titles = {
    "01": "Claude Managed Agents",
    "02": "챗봇이 아니라 운영 시스템입니다",
    "03": "드리밍은 세션 사이에 배웁니다",
    "04": "긴 프로젝트일수록 메모리가 힘을 냅니다",
    "05": "아웃컴은 좋은 결과의 기준입니다",
    "06": "정답보다 기준이 중요한 작업에서 강합니다",
    "07": "멀티에이전트는 일을 나눕니다",
    "08": "복잡한 작업일수록 한 명이 끝까지 붙잡는 방식이 느려집니다",
    "09": "이벤트 트리거는 일이 시작되게 합니다",
    "10": "자동화는 호출보다 흐름을 봅니다",
    "11": "네 기능은 하나의 운영 방식으로 합쳐집니다",
    "12": "사례들은 같은 방향을 가리킵니다",
    "13": "경쟁은 모델이 아니라 운영체제로 갑니다"
  };
  return titles[id] || `Scene ${id}`;
}

function sceneKicker(id) {
  const kickers = {
    "01": "FOUR UPDATES",
    "02": "REFRAME",
    "03": "DREAMING",
    "04": "WHEN TO USE DREAMING",
    "05": "OUTCOME",
    "06": "WHEN TO USE OUTCOME",
    "07": "MULTI AGENT",
    "08": "PARALLEL WORK",
    "09": "EVENT TRIGGERS",
    "10": "AUTOMATION FLOW",
    "11": "OPERATING SYSTEM",
    "12": "REAL CASES",
    "13": "FINAL TAKEAWAY"
  };
  return kickers[id] || "SCENE";
}

function sceneItems(id) {
  const items = {
    "01": ["Dreaming", "Outcome", "Multi-agent", "Event triggers"],
    "02": ["답변 생성", "메모리", "평가 기준", "후속 작업"],
    "03": ["과거 세션", "반복 실수", "성공 패턴", "팀 선호"],
    "04": ["어제의 판단", "오늘의 요청", "팀 규칙", "다음 세션"],
    "05": ["기준 작성", "별도 모델 채점", "수정 루프", "재검수"],
    "06": ["문서 품질", "지원 답변 톤", "코드 리뷰 체크", "정해진 합격선"],
    "07": ["리드 에이전트", "로그 담당", "문서 담당", "코드 담당"],
    "08": ["빌드 로그", "문서 변경", "코드 경로", "통합 판단"],
    "09": ["문서 업로드", "조건 감지", "담당 에이전트", "후속 작업"],
    "10": ["이벤트", "큐", "실행", "알림"],
    "11": ["기억", "기준", "분업", "트리거"],
    "12": ["Harvey", "Netflix", "Spiral", "Wisedocs"],
    "13": ["어떤 모델인가", "어떻게 배우나", "어떻게 검수하나", "어떻게 팀으로 일하나"]
  };
  return items[id] || ["입력", "처리", "결과"];
}

function sceneDescription(id) {
  const descriptions = {
    "02": "사용자는 더 똑똑한 답변을 기대하지만, 실제 변화는 기억, 기준, 역할, 후속 작업을 함께 묶는 운영 방식입니다.",
    "04": "드리밍은 작업이 멈춘 시간에 이전 맥락을 다시 정리해서, 다음 세션이 빈손으로 시작하지 않게 만듭니다.",
    "06": "아웃컴은 정답 하나보다 합격 기준이 중요한 반복 업무에서, 작업자와 검수자를 분리하는 효과가 큽니다.",
    "08": "멀티에이전트는 한 화면 안에서 일을 분산하고, 결과를 다시 합치는 구조를 보여줘야 이해됩니다.",
    "09": "트리거는 사람이 다시 호출하지 않아도 조건이 맞으면 작업 흐름이 시작되는 장치입니다.",
    "13": "핵심은 모델 이름이 아니라, 학습하고 검수하고 분업하는 시스템을 어떻게 설계하느냐입니다."
  };
  return descriptions[id] || "";
}

async function main() {
  await mkdir(GENERATED, { recursive: true });
  await mkdir(join(ROOT, "public/audio"), { recursive: true });
  await mkdir(join(ROOT, "public/captures"), { recursive: true });

  const timed = await readText(join(PROJECT, "timed-scene-packets.md"));
  const rows = tableRows(timed).flatMap((table) => table.rows).filter((row) => row.Scene && row["Time Range"]);
  const scenes = rows.map((row) => {
    const id = clean(row.Scene).padStart(2, "0");
    const range = parseRange(row["Time Range"]);
    return {
      id,
      start: range.start,
      end: range.end,
      duration: Math.max(0, range.end - range.start),
      title: sceneTitle(id),
      kicker: sceneKicker(id),
      recipe: classifyRecipe(id, row["Motion Beat"]),
      route: clean(row["Tool Route"]),
      motionBeat: clean(row["Motion Beat"]),
      snapshot: clean(row["Snapshot Time"]),
      items: sceneItems(id),
      description: sceneDescription(id)
    };
  });

  const srtPath = join(PROJECT, "voiceover/solo/voiceover-solo-elevenlabs.srt");
  const captions = existsSync(srtPath) ? parseSrt(await readText(srtPath)) : [];
  const audioSrc = join(PROJECT, "voiceover/solo/voiceover-solo-final-mix.m4a");
  if (existsSync(audioSrc)) {
    await copyFile(audioSrc, join(ROOT, "public/audio/voiceover-solo-final-mix.m4a"));
  }

  const captureFiles = [
    ["scene-01-capture-2.png", "scene-01-capture-2.png"],
    ["scene-03-capture-3.png", "scene-03-capture-3.png"],
    ["scene-12-capture-4.png", "scene-12-capture-4.png"]
  ];
  for (const [source, target] of captureFiles) {
    const src = join(PROJECT, "assets/screenshots", source);
    if (existsSync(src)) await copyFile(src, join(ROOT, "public/captures", target));
  }

  const moduleText = [
    "export const FPS = 30;",
    "export const WIDTH = 2048;",
    "export const HEIGHT = 1152;",
    `export const scenes = ${JSON.stringify(scenes, null, 2)};`,
    `export const captions = ${JSON.stringify(captions, null, 2)};`,
    ""
  ].join("\n");
  await writeFile(join(GENERATED, "data.js"), moduleText, "utf8");

  const metadata = {
    renderer: "remotion",
    qualityEvidence: "metadata_only",
    note: "This file supports review scripts with timing/caption config only. It must not be used as visual density proof.",
    scenes: scenes.map((scene) => ({
      id: scene.id,
      recipe: scene.recipe,
      route: scene.route,
      motionBeat: scene.motionBeat,
    })),
  };
  await writeFile(join(ROOT, "index.html"), [
    "<!doctype html>",
    "<html>",
    "<body>",
    "<script>const CAPTION_LEAD_SECONDS = 1.15;</script>",
    `<script type="application/json" id="review-metadata">${JSON.stringify(metadata)}</script>`,
    "</body>",
    "</html>",
    "",
  ].join("\n"), "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
