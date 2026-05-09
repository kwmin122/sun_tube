import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { basename, join } from "node:path";
import {
  ensureDir,
  loadProject,
  normalizeRoutes,
  parseArgs,
  parseSrt,
  readText,
  rel,
  run,
  saveProject,
  tableRows,
  writeJson,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:review-video -- <project-path> [--render final.mp4|final-hyperframes.mp4|final-remotion.mp4] [--force]");
  process.exit(1);
}

function clean(value) {
  return String(value || "").trim();
}

function timestampToSeconds(value) {
  const parts = clean(value).split(":").map(Number);
  if (parts.length === 2 && parts.every(Number.isFinite)) return parts[0] * 60 + parts[1];
  if (parts.length === 3 && parts.every(Number.isFinite)) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

function parseRange(value) {
  const [startRaw, endRaw] = clean(value).split("-");
  const start = timestampToSeconds(startRaw);
  const end = timestampToSeconds(endRaw);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
  return { start, end };
}

function dataRows(markdown) {
  return tableRows(markdown).flatMap((table) => table.rows);
}

function statusDone(status) {
  return ["done", "implemented", "qa_passed", "not_required"].includes(clean(status).toLowerCase());
}

function sceneRows(markdown) {
  return dataRows(markdown)
    .filter((row) => row.Scene && row["Time Range"])
    .map((row) => ({ ...row, id: clean(row.Scene).padStart(2, "0"), range: parseRange(row["Time Range"]) }))
    .filter((row) => row.range);
}

function extractFrame(render, atSeconds, output, scale = "960:-1") {
  return run("ffmpeg", [
    "-y",
    "-ss",
    atSeconds.toFixed(2),
    "-i",
    render,
    "-frames:v",
    "1",
    "-vf",
    `scale=${scale}`,
    output,
  ], { timeout: 60_000 });
}

function sectionMetrics(html) {
  const metrics = new Map();
  const sceneRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/g;
  for (const match of html.matchAll(sceneRegex)) {
    const attrs = match[1] || "";
    const body = match[2] || "";
    const id = attrs.match(/id=["']scene-([^"']+)["']/)?.[1];
    if (!id) continue;
    const classes = {
      rows: (body.match(/class=["'][^"']*(?:info-row|event-detail|signal-list|item)[^"']*["']/g) || []).length,
      tokens: (body.match(/class=["'][^"']*flow-token[^"']*["']/g) || []).length,
      paths: (body.match(/class=["'][^"']*path-draw[^"']*["']/g) || []).length,
      scans: (body.match(/class=["'][^"']*scan-fill[^"']*["']/g) || []).length,
      sheens: (body.match(/class=["'][^"']*liquid-sheen[^"']*["']/g) || []).length,
      ticks: (body.match(/class=["'][^"']*metric-tick[^"']*["']/g) || []).length,
    };
    const signature = Object.entries(classes).filter(([, count]) => count > 0).map(([key]) => key).join("+") || "static";
    metrics.set(id.padStart(2, "0"), { id: id.padStart(2, "0"), rich: /data-visual-density=["']rich["']/.test(attrs), ...classes, signature });
  }
  return metrics;
}

function sectionBodies(html) {
  const bodies = new Map();
  const sceneRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/g;
  for (const match of html.matchAll(sceneRegex)) {
    const attrs = match[1] || "";
    const body = match[2] || "";
    const id = attrs.match(/id=["']scene-([^"']+)["']/)?.[1];
    if (id) bodies.set(id.padStart(2, "0"), body);
  }
  return bodies;
}

function syntheticQualityDomAudit(html, renderer) {
  if (renderer !== "remotion") return { issues: [] };
  const markerPattern = /<section\b|class=["'][^"']*(?:info-row|flow-token|scan-fill|metric-tick|path-draw)[^"']*["']/;
  if (!markerPattern.test(html)) return { issues: [] };
  return {
    issues: [{
      issue: "synthetic_quality_dom_present",
      detail: "Remotion review HTML contains section/visual marker proxies. Real MP4 frames, not prepare.mjs proxy DOM, must be used as visual quality evidence.",
    }],
  };
}

function captionAudit(captions, duration) {
  const issues = [];
  for (const cue of captions) {
    const cueDuration = cue.end - cue.start;
    const cps = cue.text.length / Math.max(cueDuration, 0.1);
    if (cueDuration < 0.7) issues.push({ time: cue.start, issue: "caption_too_short", detail: `${cueDuration.toFixed(2)}s` });
    if (cueDuration > 7.0) issues.push({ time: cue.start, issue: "caption_too_long", detail: `${cueDuration.toFixed(2)}s` });
    if (cps > 18) issues.push({ time: cue.start, issue: "caption_too_fast", detail: `${cps.toFixed(1)} chars/sec` });
  }
  if (captions.length && duration && Math.abs(captions.at(-1).end - duration) > 8) {
    issues.push({ time: captions.at(-1).end, issue: "caption_duration_mismatch", detail: `last caption ${captions.at(-1).end.toFixed(1)}s vs video ${duration.toFixed(1)}s` });
  }
  return { cueCount: captions.length, issues };
}

function motionAudit(scenes, assets, metrics) {
  const issues = [];
  const rows = [];
  for (const scene of scenes) {
    const asset = assets.find((row) => clean(row.Scene).padStart(2, "0") === scene.id) || {};
    const rich = clean(asset["Visual Density"]).toLowerCase() === "rich" || metrics.get(scene.id)?.rich;
    const metric = metrics.get(scene.id) || { rows: 0, tokens: 0, paths: 0, scans: 0, sheens: 0, ticks: 0, signature: "missing" };
    const primitiveCount = metric.tokens + metric.paths + metric.scans + metric.sheens + metric.ticks;
    if (rich && metric.rows < 3) issues.push({ scene: scene.id, issue: "rich_scene_low_rows", detail: `${metric.rows} visual rows` });
    if (rich && primitiveCount < 3) issues.push({ scene: scene.id, issue: "rich_scene_low_motion", detail: `${primitiveCount} motion primitives` });
    rows.push({ scene: scene.id, rich, ...metric });
  }
  const staticScenes = rows.filter((row) => row.signature === "static").map((row) => row.scene);
  if (staticScenes.length >= 3) issues.push({ scene: staticScenes.join(", "), issue: "too_many_static_scenes", detail: "three or more scenes have no motion primitive markers" });
  return { rows, issues, metadataOnly: true, note: "HTML metrics are metadata-only. Director review must inspect rendered frames before PASS." };
}

function assetAudit(assets, workRows) {
  const issues = [];
  const workKeys = new Set(workRows.map((row) => `${clean(row.Scene).padStart(2, "0")}::${clean(row.Route)}`));
  for (const row of assets) {
    const scene = clean(row.Scene).padStart(2, "0");
    const routes = normalizeRoutes(row["Tool Route"]).filter((route) => !["manual", "script/ffmpeg", "not_required"].includes(route));
    if (!statusDone(row.Status)) issues.push({ scene, issue: "asset_row_not_complete", detail: row.Status || "empty status" });
    for (const route of routes) {
      if (!workKeys.has(`${scene}::${route}`)) issues.push({ scene, issue: "missing_work_order", detail: route });
    }
  }
  for (const row of workRows) {
    if (!statusDone(row.Status)) {
      issues.push({ scene: clean(row.Scene).padStart(2, "0"), issue: "work_order_not_complete", detail: `${row.Route}: ${row.Status}` });
    }
  }
  return { issues };
}

function captureUtilityAudit(assets, html) {
  const issues = [];
  const bodies = sectionBodies(html || "");
  for (const row of assets) {
    const scene = clean(row.Scene).padStart(2, "0");
    const routes = normalizeRoutes(row["Tool Route"]);
    if (!routes.includes("capture")) continue;

    const role = clean(row["Capture Role"]).toLowerCase();
    const usefulCrop = clean(row["Useful Crop"]).toLowerCase();
    const viewerReads = clean(row["Viewer Reads What"]);
    const body = bodies.get(scene) || "";

    if (role !== "primary_evidence") {
      issues.push({ scene, issue: "capture_not_primary_evidence", detail: `Capture Role=${row["Capture Role"] || "empty"}; reroute weak captures to hyperframes` });
    }
    if (usefulCrop !== "yes") {
      issues.push({ scene, issue: "capture_not_useful_crop", detail: `Useful Crop=${row["Useful Crop"] || "empty"}` });
    }
    if (/\b(weak|source context only|background|texture|decorative)\b/i.test(viewerReads)) {
      issues.push({ scene, issue: "capture_visual_purpose_weak", detail: viewerReads });
    }
    if (!body) {
      issues.push({ scene, issue: "capture_scene_missing_html", detail: "capture route has no matching rendered scene section" });
      continue;
    }
    if (/source-stamp|data-capture-role=["']support_texture["']/.test(body)) {
      issues.push({ scene, issue: "capture_too_small", detail: "capture route cannot be a small source stamp or support texture" });
    }
    if (!/data-capture-size=["'](?:half|large|full)["']/.test(body)) {
      issues.push({ scene, issue: "capture_size_marker_missing", detail: "capture route must mark data-capture-size=\"half\", \"large\", or \"full\"" });
    }
  }
  return { issues };
}

function lineQualityAudit(html) {
  const bannedClasses = ["route-svg", "event-route-svg", "pipeline-svg", "network-lines"];
  const issues = bannedClasses
    .filter((className) => html.includes(className))
    .map((className) => ({
      issue: "floating_connector_line",
      detail: `${className} creates unanchored decorative connector lines; use card-anchored arrows, rows, tokens, or contained micro-lines instead`,
    }));
  const pathDraws = [...html.matchAll(/<path\b([^>]*)class=["'][^"']*path-draw[^"']*["'][^>]*>/g)];
  for (const path of pathDraws) {
    const attrs = path[1] || "";
    if (!/data-anchor-from=/.test(attrs) || !/data-anchor-to=/.test(attrs)) {
      issues.push({
        issue: "unanchored_path_draw",
        detail: "path-draw must declare data-anchor-from and data-anchor-to so route lines are tied to scene elements",
      });
      break;
    }
  }
  return { bannedClasses, pathDrawCount: pathDraws.length, issues };
}

function captionConfigAudit(html) {
  const match = html.match(/CAPTION_LEAD_SECONDS\s*=\s*([0-9.]+)/);
  const leadSeconds = match ? Number(match[1]) : null;
  const issues = [];
  if (/caption-progress|subtitle-progress|captionProgress|subtitleProgress|data-caption-progress/.test(html)) {
    issues.push({ issue: "caption_progress_bar_present", detail: "captions must be text-only by default; remove subtitle progress bars unless explicitly requested" });
  }
  if (!Number.isFinite(leadSeconds)) {
    issues.push({ issue: "caption_lead_missing", detail: "composition must declare CAPTION_LEAD_SECONDS" });
  } else if (leadSeconds < 1.05) {
    issues.push({ issue: "caption_lead_too_low", detail: `CAPTION_LEAD_SECONDS=${leadSeconds}; use at least 1.05s for this TTS/caption style` });
  }
  return { leadSeconds, issues };
}

function routeTransparency(project, assets, workRows) {
  const routes = project.routes || {};
  const routeCounts = {};
  for (const row of workRows) {
    const route = clean(row.Route || "unknown");
    routeCounts[route] = (routeCounts[route] || 0) + 1;
  }
  const assetRoutes = {};
  for (const row of assets) {
    for (const route of normalizeRoutes(row["Tool Route"])) {
      assetRoutes[route] = (assetRoutes[route] || 0) + 1;
    }
  }
  return { routes, routeCounts, assetRoutes };
}

function renderKeyFromName(name) {
  if (name.includes("hyperframes")) return "hyperframes";
  if (name.includes("remotion")) return "remotion";
  return "final";
}

function rendererCompositionHtml(projectPath, key) {
  if (key === "hyperframes") {
    const preferred = join(projectPath, "composition-hyperframes/index.html");
    return existsSync(preferred) ? preferred : join(projectPath, "composition/index.html");
  }
  if (key === "remotion") return join(projectPath, "composition-remotion/index.html");
  const selectedHyperframes = join(projectPath, "composition-hyperframes/index.html");
  if (existsSync(selectedHyperframes)) return selectedHyperframes;
  return join(projectPath, "composition/index.html");
}

const { project, projectPath } = await loadProject(projectArg);
const renderFile = basename(String(args.render || "final.mp4"));
const reviewKey = renderKeyFromName(renderFile);
const comparisonMode = Boolean(args.render);
const suffix = comparisonMode ? `-${reviewKey}` : "";
const render = join(projectPath, "renders", renderFile);
const srtPath = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.srt");
const timedPath = join(projectPath, "timed-scene-packets.md");
const assetPath = join(projectPath, "asset-plan.md");
const compositionPath = rendererCompositionHtml(projectPath, reviewKey);
const reviewDir = join(projectPath, "review/video-review");
const framesRoot = join(reviewDir, `frames${suffix}`);
const framesDir = join(reviewDir, `scene-frames${suffix}`);
const suspiciousDir = join(reviewDir, `suspicious-frames${suffix}`);
const contactDir = join(reviewDir, `contact-sheets${suffix}`);
const contactSheet = join(reviewDir, `contact-sheet${suffix}.jpg`);
const reviewReport = join(reviewDir, comparisonMode ? `${reviewKey}-review.md` : "video-review.md");
const sceneNotesPath = join(reviewDir, comparisonMode ? `scene-frame-notes-${reviewKey}.md` : "scene-frame-notes.md");
const fixListPath = join(reviewDir, comparisonMode ? `fix-list-${reviewKey}.md` : "fix-list.md");

if (!existsSync(render)) {
  console.error(`Review blocked: missing ${rel(render)}`);
  process.exit(1);
}
if (!comparisonMode && project.artifacts?.render !== true && !args.force) {
  console.error("Review blocked: render artifact must be complete. Use --force only as an explicit override.");
  process.exit(1);
}

await rm(framesRoot, { recursive: true, force: true });
await rm(framesDir, { recursive: true, force: true });
await rm(suspiciousDir, { recursive: true, force: true });
await rm(contactDir, { recursive: true, force: true });
await rm(contactSheet, { force: true });
await ensureDir(framesRoot);
await ensureDir(framesDir);
await ensureDir(suspiciousDir);
await ensureDir(contactDir);

const timed = await readText(timedPath);
const asset = await readText(assetPath);
const composition = await readText(compositionPath);
const hasCompositionHtml = Boolean(composition.trim());
const scenes = sceneRows(timed);
const assets = dataRows(asset).filter((row) => row.Scene);
const workMarkdowns = await Promise.all(
  ["capture", "hyperframes", "imagegen", "video-use"].map((name) => readText(join(projectPath, "work-orders", `${name}.md`), "")),
);
const workRows = workMarkdowns.flatMap(dataRows);
const captions = existsSync(srtPath) ? parseSrt(await readText(srtPath)) : [];
const probe = run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", render], { timeout: 30_000 });
const duration = probe.status === 0 ? Number(probe.stdout.trim()) : 0;

const contact = run("ffmpeg", ["-y", "-i", render, "-vf", "fps=1/10,scale=320:-1,tile=6x6", "-frames:v", "1", contactSheet], { timeout: 120_000 });
const frameManifest = [];
for (const scene of scenes) {
  const points = [
    ["start", scene.range.start + 0.4],
    ["mid", (scene.range.start + scene.range.end) / 2],
    ["motion-peak", scene.range.start + (scene.range.end - scene.range.start) * 0.68],
    ["end", Math.max(scene.range.start, scene.range.end - 0.4)],
  ];
  for (const [label, at] of points) {
    const out = join(framesDir, `scene-${scene.id}-${label}.png`);
    const result = extractFrame(render, at, out);
    frameManifest.push({ scene: scene.id, label, at, output: rel(out), ok: result.status === 0 });
  }
}

const captionReport = { ...captionAudit(captions, duration), method: "elevenlabs-forced-alignment-srt-duration-and-cps", limitation: "uses ElevenLabs forced-alignment SRT cue timings; does not yet compare against ASR word timestamps" };
const motionReport = hasCompositionHtml
  ? motionAudit(scenes, assets, sectionMetrics(composition))
  : { rows: [], issues: [], limitations: [`HTML audit skipped for ${reviewKey}; no ${rel(compositionPath)} found`] };
const assetReport = assetAudit(assets, workRows);
const lineReport = hasCompositionHtml ? lineQualityAudit(composition) : { bannedClasses: [], issues: [], limitations: [`Line audit skipped for ${reviewKey}; no ${rel(compositionPath)} found`] };
const captionConfigReport = hasCompositionHtml ? captionConfigAudit(composition) : { leadSeconds: null, issues: [], limitations: [`Caption config audit skipped for ${reviewKey}; no ${rel(compositionPath)} found`] };
const captureUtilityReport = hasCompositionHtml ? captureUtilityAudit(assets, composition) : { issues: [], limitations: [`Capture utility audit skipped for ${reviewKey}; no ${rel(compositionPath)} found`] };
const syntheticDomReport = hasCompositionHtml ? syntheticQualityDomAudit(composition, reviewKey) : { issues: [] };
const routeReport = routeTransparency(project, assets, workRows);
const frameFailures = frameManifest.filter((frame) => !frame.ok);
const inputIssues = [];
if (!scenes.length) inputIssues.push({ issue: "missing_timed_scene_rows", detail: rel(timedPath) });
if (!captions.length) inputIssues.push({ issue: "missing_srt_captions", detail: rel(srtPath) });
if (!assets.length) inputIssues.push({ issue: "missing_asset_plan_rows", detail: rel(assetPath) });
if (!hasCompositionHtml && reviewKey !== "remotion") inputIssues.push({ issue: "missing_composition_html", detail: rel(compositionPath) });
const blockers = [
  ...inputIssues,
  ...syntheticDomReport.issues,
  ...lineReport.issues,
  ...captionConfigReport.issues,
  ...(contact.status === 0 ? [] : [{ issue: "contact_sheet_failed", detail: contact.stderr || contact.stdout || "ffmpeg failed" }]),
  ...captionReport.issues.filter((issue) => issue.issue === "caption_duration_mismatch"),
  ...motionReport.issues,
  ...assetReport.issues,
  ...captureUtilityReport.issues,
  ...frameFailures.map((frame) => ({ scene: frame.scene, issue: "frame_extract_failed", detail: frame.label })),
];

for (const issue of blockers.slice(0, 12)) {
  const scene = clean(issue.scene).padStart(2, "0");
  const target = join(suspiciousDir, `scene-${scene}-${issue.issue}.png`);
  const row = scenes.find((item) => item.id === scene);
  if (row) extractFrame(render, (row.range.start + row.range.end) / 2, target, "1280:-1");
}

await writeJson(join(reviewDir, `frame-manifest${suffix}.json`), { renderer: reviewKey, render: rel(render), contactSheet: rel(contactSheet), contactSheetOk: contact.status === 0, frames: frameManifest });
await writeJson(join(reviewDir, `caption-sync-report${suffix}.json`), captionReport);
await writeJson(join(reviewDir, `caption-config-report${suffix}.json`), captionConfigReport);
await writeJson(join(reviewDir, `motion-density-report${suffix}.json`), motionReport);
await writeJson(join(reviewDir, `asset-presence-report${suffix}.json`), assetReport);
await writeJson(join(reviewDir, `capture-utility-report${suffix}.json`), captureUtilityReport);
await writeJson(join(reviewDir, `line-quality-report${suffix}.json`), lineReport);
await writeJson(join(reviewDir, `synthetic-dom-report${suffix}.json`), syntheticDomReport);
await writeJson(join(reviewDir, `route-transparency-report${suffix}.json`), routeReport);

const verdict = blockers.length ? "FAIL" : "PASS";
const sceneFindings = blockers.length
  ? blockers.map((issue) => `| ${issue.scene || "-"} | ${issue.issue} | ${String(issue.detail || "").replaceAll("|", "/")} |`).join("\n")
  : "| - | none | - |";

const sceneFrameNotes = scenes.length
  ? scenes.map((scene) => {
      const frames = frameManifest
        .filter((frame) => frame.scene === scene.id)
        .map((frame) => `${frame.label}: \`${frame.output}\``)
        .join("<br>");
      return `| ${scene.id} | ${scene["Purpose"] || scene["Scene Purpose"] || "-"} | ${frames} |  |  |  |`;
    }).join("\n")
  : "| - | - | - | - | - | - |";

await writeText(sceneNotesPath, [
  "# Scene Frame Notes",
  "",
  "프레임을 직접 보고 디렉터 리뷰를 작성하기 위한 작업지입니다.",
  "",
  `- Contact sheet: \`${rel(contactSheet)}\``,
  `- Scene frames: \`${rel(framesDir)}\``,
  `- Suspicious frames: \`${rel(suspiciousDir)}\``,
  "",
  "| Scene | Intended Point | Evidence Frames | What Works | Problem | Required Fix |",
  "|---|---|---|---|---|---|",
  sceneFrameNotes,
  "",
].join("\n"));

if (!comparisonMode) {
  await writeText(join(reviewDir, "director-review.md"), [
    "# Director Review",
    "",
    "Verdict: FAIL",
    "",
    "> `factory:review-video` only extracts evidence and runs machine checks. A human or `hype-video-reviewer` must inspect the frames and change this to `Verdict: PASS` only after the rendered video works as a YouTube/motion piece.",
    "",
    "## Evidence To Inspect",
    "",
    `- Contact sheet: \`${rel(contactSheet)}\``,
    `- Scene frames: \`${rel(framesDir)}\``,
    `- Scene notes: \`${rel(sceneNotesPath)}\``,
    `- Machine review: \`${rel(reviewReport)}\``,
    "- Renderer comparison: `review/video-review/renderer-comparison.md`",
    "",
    "## Critical Findings",
    "",
    "| Severity | Scene | Issue | Evidence Frame | Required Fix | Resolved |",
    "|---|---|---|---|---|---|",
    blockers.length
      ? blockers.map((issue) => `| Critical | ${issue.scene || "-"} | ${issue.issue} | ${String(issue.detail || "").replaceAll("|", "/")} | Fix before package | no |`).join("\n")
      : "| Critical | all | Director review not completed yet | contact sheet + scene frames | Inspect frames and confirm captions, rhythm, motion, assets, and empty-feel | no |",
    "",
    "## Renderer Decision",
    "",
    "- Selected renderer:",
    "- Hyperframes evidence:",
    "- Remotion evidence or blocker:",
    "- Why selected:",
    "",
    "## Review Axes",
    "",
    "- Scene Intent: 화면이 지금 말하는 내용을 이해시키는가.",
    "- Visual Thesis: 한눈에 보이는 핵심 구조가 있는가.",
    "- Motion Purpose: 움직임이 설명을 돕는가.",
    "- Motion Variety: 같은 카드/페이드 반복이 아닌가.",
    "- Asset Fit: capture/imagegen/HTML/interview가 적절한 역할로 쓰였는가.",
    "- Empty Feel: 채웠지만 비어 보이는 장면은 없는가.",
    "- YouTube Rhythm: 5-10초마다 볼 이유가 생기는가.",
    "- Caption Sync: 말과 자막이 맞고 중요한 화면을 가리지 않는가.",
    "- Renderer Fit: 선택된 렌더러가 motion purpose, caption sync, static gap, scene uniqueness, and line quality 기준에서 더 나은가.",
    "",
    "## Scene Notes",
    "",
    "| Scene | Intent | Evidence Frame | Visual Thesis | Motion Purpose | Caption/Asset Fit | Decision |",
    "|---|---|---|---|---|---|---|",
    scenes.length ? scenes.map((scene) => `| ${scene.id} |  |  |  |  |  | review |`).join("\n") : "| - |  |  |  |  |  | review |",
    "",
  ].join("\n"));
}

await writeText(fixListPath, [
  "# Video Review Fix List",
  "",
  blockers.length ? blockers.map((issue) => `- Scene ${issue.scene || "-"}: ${issue.issue} - ${issue.detail || ""}`).join("\n") : "- No blocking fixes.",
  "",
].join("\n"));

await writeText(reviewReport, [
  "# Video Review",
  "",
  `Renderer: ${reviewKey}`,
  `Render: \`${rel(render)}\``,
  "",
  "## Machine Verdict",
  verdict,
  "",
  "This is not final aesthetic approval. `review/video-review/director-review.md` must be `Verdict: PASS` before final QA/package.",
  "",
  "## Evidence",
  "",
  `- Contact sheet: \`${rel(contactSheet)}\``,
  `- Scene frames: \`${rel(framesDir)}\``,
  `- Suspicious frames: \`${rel(suspiciousDir)}\``,
  "",
  "## Scene Findings",
  "",
  "| Scene | Issue | Detail |",
  "|---|---|---|",
  sceneFindings,
  "",
  "## Caption Sync",
  "",
  `- Cues: ${captionReport.cueCount}`,
  `- Issues: ${captionReport.issues.length}`,
  `- Method: ${captionReport.method}`,
  `- Caption lead: ${captionConfigReport.leadSeconds ?? "missing"}s`,
  `- Caption config issues: ${captionConfigReport.issues.length}`,
  captionReport.limitation ? `- Limitation: ${captionReport.limitation}` : "",
  "",
  "## Motion Variety",
  "",
  `- Motion issues: ${motionReport.issues.length}`,
  `- Metadata-only: ${motionReport.metadataOnly === true ? "yes" : "no"}`,
  "- Rich scenes require rows plus path/token/scan/sheen/tick motion primitives.",
  "",
  "## Asset Match",
  "",
  `- Asset issues: ${assetReport.issues.length}`,
  "",
  "## Capture Utility",
  "",
  `- Capture utility issues: ${captureUtilityReport.issues.length}`,
  captureUtilityReport.limitations?.length ? `- Limitation: ${captureUtilityReport.limitations.join("; ")}` : "",
  "",
  "## Line Quality",
  "",
  `- Floating connector issues: ${lineReport.issues.length}`,
  lineReport.limitations?.length ? `- Limitation: ${lineReport.limitations.join("; ")}` : "",
  "",
  "## Route Transparency",
  "",
  `- Project routes: \`${JSON.stringify(routeReport.routes)}\``,
  `- Work-order route counts: \`${JSON.stringify(routeReport.routeCounts)}\``,
  `- Asset route counts: \`${JSON.stringify(routeReport.assetRoutes)}\``,
  "",
  "## Editor Notes",
  "",
  "- Review the contact sheet and scene frames before upload.",
  "- Package is allowed only when the machine review and director review both pass.",
  "",
].join("\n"));

if (!comparisonMode) {
  project.artifacts.videoReview = verdict === "PASS";
  project.artifacts.directorReview = false;
  if (verdict === "PASS") {
    project.status = "video_review";
    project.currentGate = "video_review";
  } else {
    project.status = "blocked";
    project.currentGate = "blocked";
  }
}
await saveProject(projectPath, project);

console.log(`Wrote: ${rel(reviewReport)}`);
console.log(`Result: ${verdict}`);
process.exit(verdict === "PASS" ? 0 : 1);
