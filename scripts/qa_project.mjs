import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import {
  loadProject,
  normalizeRoute,
  normalizeRoutes,
  parseArgs,
  readText,
  rel,
  resolveInsideRoot,
  run,
  saveProject,
  tableRows,
  validateProjectShape,
  writeText,
} from "./lib/factory_common.mjs";

function add(checks, ok, label, detail = "") {
  checks.push({ ok, label, detail });
}

function report(stage, checks) {
  const blocking = checks.filter((check) => !check.ok);
  const lines = [`# QA ${stage}`, "", `Result: ${blocking.length ? "FAIL" : "PASS"}`, ""];
  lines.push("| Check | Result | Detail |");
  lines.push("|---|---|---|");
  for (const check of checks) {
    lines.push(`| ${check.label.replaceAll("|", "/")} | ${check.ok ? "PASS" : "FAIL"} | ${String(check.detail).replaceAll("|", "/")} |`);
  }
  return { ok: blocking.length === 0, markdown: `${lines.join("\n")}\n` };
}

function timestampToSeconds(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d+):(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function snapshotTimesFromTimedPackets(markdown) {
  const times = tableRows(markdown)
    .flatMap((table) => table.rows)
    .map((row) => timestampToSeconds(row["Snapshot Time"]))
    .filter((value) => Number.isFinite(value));
  const unique = [...new Set(times.map((value) => Number(value.toFixed(1))))];
  if (!unique.length) return [0];
  return unique.slice(0, 12);
}

function tableDataRows(markdown) {
  return tableRows(markdown).flatMap((table) => table.rows);
}

function unresolvedStatusRows(rows) {
  return rows.filter((row) => {
    const status = String(row.Status || "").trim().toLowerCase();
    return !status || /\b(todo|pending|planned|inputs_ready|blocked)\b/.test(status);
  });
}

function unresolvedTimedRows(rows) {
  return rows.filter((row) => {
    if (!("Status" in row) && !("Caption Behavior" in row) && !("Audio/SFX" in row)) return false;
    const values = [row["Caption Behavior"], row["Audio/SFX"], row.Status].map((value) => String(value || "").trim().toLowerCase());
    return values.some((value) => !value || /\b(todo|pending|planned|inputs_ready|blocked)\b/.test(value));
  });
}

function detailRows(rows) {
  return rows.slice(0, 6).map((row) => `scene ${row.Scene || row["#"] || "?"}: ${row.Status || "empty"}`).join("; ");
}

function clean(value) {
  return String(value || "").trim();
}

function statusValue(row) {
  return clean(row.Status).toLowerCase();
}

function isNotRequiredRow(row) {
  return statusValue(row) === "not_required" || normalizeRoute(row.Route || row["Tool Route"]) === "not_required";
}

function workOrderRows(markdown, source) {
  return tableDataRows(markdown)
    .map((row) => ({ ...row, source, route: normalizeRoute(row.Route || row["Tool Route"]) }))
    .filter((row) => !isNotRequiredRow(row));
}

function unresolvedWorkOrderRows(rows) {
  return rows.filter((row) => {
    const status = statusValue(row);
    return !status || /\b(todo|pending|planned|inputs_ready|blocked)\b/.test(status);
  });
}

function emptyInputWorkOrderRows(rows) {
  return rows.filter((row) => {
    const input = clean(row.Input || row["Link / File / Candidate"] || row["Primary Asset"]);
    if (row.route === "hyperframes" || row.route === "manual") return false;
    return !input || input === "-";
  });
}

function sceneRouteKey(scene, route) {
  return `${clean(scene).padStart(2, "0")}::${normalizeRoute(route)}`;
}

function workOrderMap(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = sceneRouteKey(row.Scene, row.route);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return map;
}

function assetWorkOrderMismatches(assetRows, workRows) {
  const bySceneRoute = workOrderMap(workRows);
  return assetRows.filter((row) => {
    const status = statusValue(row);
    if (!["done", "implemented", "qa_passed"].includes(status)) return false;
    const routes = normalizeRoutes(row["Tool Route"]).filter((route) => !["not_required", "manual", "script/ffmpeg"].includes(route));
    return routes.some((route) => {
      const matches = bySceneRoute.get(sceneRouteKey(row.Scene, route)) || [];
      return matches.length === 0 || matches.some((workRow) => unresolvedWorkOrderRows([workRow]).length > 0);
    });
  });
}

function visualDensityIssues(compositionHtml, assetRows = []) {
  const issues = [];
  const richSceneIds = new Set();
  for (const row of assetRows) {
    if (clean(row["Visual Density"]).toLowerCase() === "rich") {
      richSceneIds.add(`scene-${clean(row.Scene).padStart(2, "0")}`);
    }
  }
  const sections = new Map();
  const sceneRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/g;
  for (const match of compositionHtml.matchAll(sceneRegex)) {
    const attrs = match[1] || "";
    const body = match[2] || "";
    const id = attrs.match(/id=["']([^"']+)["']/)?.[1] || "unknown";
    sections.set(id, { attrs, body });
    if (/data-visual-density=["']rich["']/.test(attrs)) richSceneIds.add(id);
  }
  for (const id of richSceneIds) {
    const body = sections.get(id)?.body || "";
    if (!body) {
      issues.push(`${id}: missing section for rich visual density`);
      continue;
    }
    const rowCount = (body.match(/class=["'][^"']*(?:info-row|event-detail|signal-list|flow-token|metric-tick|item)[^"']*["']/g) || []).length;
    const motionCount = (body.match(/class=["'][^"']*(?:route-pulse|flow-token|scan-fill|liquid-sheen|metric-tick|path-draw|reveal-mask)[^"']*["']/g) || []).length;
    const hasMotionPrimitive = /(?:route-pulse|flow-token|scan-fill|liquid-sheen|metric-tick|path-draw|reveal-mask|<path\b)/.test(body);
    if (rowCount < 3) issues.push(`${id}: visual rows ${rowCount} < 3`);
    if (motionCount < 1 || !hasMotionPrimitive) issues.push(`${id}: missing rich motion primitive`);
  }
  return issues;
}

function directorVerdict(markdown) {
  const inline = markdown.match(/^Verdict:\s*(PASS|FAIL)\b/im);
  if (inline) return inline[1].toUpperCase();
  const section = markdown.match(/^##\s+Verdict\s*\n+([^\n]+)/im);
  return section ? section[1].trim().toUpperCase() : "";
}

function selectedRenderer(markdown) {
  const direct = markdown.match(/Selected renderer:\s*\**([a-z_-]+)/i);
  if (direct) return direct[1].toLowerCase();
  const tableRowsFound = tableRows(markdown).flatMap((table) => table.rows);
  const selected = tableRowsFound.find((row) => /selected|winner|final/i.test(clean(row.Status || row.Decision || row.Result || "")));
  return clean(selected?.Renderer || selected?.render || "").toLowerCase();
}

function comparisonHasRemotionBlocked(markdown) {
  return /remotion\s*\|\s*blocked/i.test(markdown) || /Remotion blocked/i.test(markdown);
}

function unresolvedCriticalFindings(markdown) {
  const rows = tableRows(markdown).flatMap((table) => table.rows);
  const unresolved = [];
  for (const row of rows) {
    const severity = clean(row.Severity || row.Priority || row.Level || "");
    if (!/\b(critical|blocker)\b/i.test(severity)) continue;
    const state = clean(row.Resolved || row.Status || row.Done || "");
    if (!/^(yes|true|pass|resolved|done|fixed)$/i.test(state)) unresolved.push(row);
  }
  const uncheckedCritical = markdown
    .split(/\r?\n/)
    .filter((line) => /-\s+\[\s\]/.test(line) && /\b(critical|blocker)\b/i.test(line));
  return [...unresolved, ...uncheckedCritical.map((line) => ({ Issue: line }))];
}

function machineVerdict(markdown) {
  const match = markdown.match(/^## Machine Verdict\s*\n+([A-Z]+)/im);
  return match ? match[1].toUpperCase() : "";
}

function comparisonVerdict(markdown) {
  const match = markdown.match(/^Verdict:\s*(PASS|FAIL)\b/im);
  return match ? match[1].toUpperCase() : "";
}

function directorEvidenceFrameCount(markdown, selected = "") {
  const renderer = selected ? `(?:${selected}|final)` : "(?:remotion|hyperframes|final)";
  const regex = new RegExp(`scene-frames-${renderer}/scene-[0-9]{2}-(?:start|mid|motion-peak|end)\\.png`, "gi");
  return (markdown.match(regex) || []).length;
}

async function readJsonIfExists(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(await readText(path));
  } catch {
    return fallback;
  }
}

async function frameManifestStats(projectPath, selected) {
  const suffix = selected ? `-${selected}` : "";
  const manifestPath = join(projectPath, "review/video-review", `frame-manifest${suffix}.json`);
  const manifest = await readJsonIfExists(manifestPath, { frames: [] });
  const frames = Array.isArray(manifest.frames) ? manifest.frames : [];
  const okFrames = frames.filter((frame) => frame.ok !== false);
  const motionPeaks = okFrames.filter((frame) => frame.label === "motion-peak");
  return { manifestPath, frames, okFrames, motionPeaks };
}

async function syntheticDomStats(projectPath, selected) {
  const suffix = selected ? `-${selected}` : "";
  const reportPath = join(projectPath, "review/video-review", `synthetic-dom-report${suffix}.json`);
  const report = await readJsonIfExists(reportPath, { issues: [{ issue: "missing_synthetic_dom_report" }] });
  return { reportPath, issues: Array.isArray(report.issues) ? report.issues : [] };
}

function hasSyntheticQualityDom(html) {
  return /<section\b|class=["'][^"']*(?:info-row|flow-token|scan-fill|metric-tick|path-draw)[^"']*["']/.test(html);
}

function hyperframesCompositionPath(projectPath) {
  const preferred = join(projectPath, "composition-hyperframes");
  return existsSync(join(preferred, "package.json")) ? preferred : join(projectPath, "composition");
}

async function readWorkOrders(projectPath) {
  const files = ["video-use", "imagegen", "capture", "hyperframes"];
  const rows = [];
  for (const name of files) {
    const source = `${name}.md`;
    rows.push(...workOrderRows(await readText(join(projectPath, "work-orders", source), ""), source));
  }
  return rows;
}

const args = parseArgs();
const projectArg = args._[0];
const stage = args.stage || "pre-render";
if (!projectArg) {
  console.error("Usage: npm run factory:qa -- <project-path> -- --stage pre-render|final");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const checks = [];
for (const issue of validateProjectShape(project)) add(checks, false, "project.json schema", issue);
if (!validateProjectShape(project).length) add(checks, true, "project.json schema");

if (stage === "pre-render") {
  const srt = join(projectPath, "voiceover/solo/voiceover-solo-elevenlabs.srt");
  const mix = join(projectPath, "voiceover/solo/voiceover-solo-final-mix.m4a");
  const timed = await readText(join(projectPath, "timed-scene-packets.md"));
  const asset = await readText(join(projectPath, "asset-plan.md"));
  const composition = hyperframesCompositionPath(projectPath);
  const snapshots = join(composition, "snapshots");
  const compositionHtmlPath = join(composition, "index.html");
  const compositionHtml = await readText(compositionHtmlPath, "");
  const assetRows = tableDataRows(asset);
  const timedRows = tableDataRows(timed);
  const workRows = await readWorkOrders(projectPath);

  add(checks, project.approved?.plan === true, "plan approved", "project.json.approved.plan must be true");
  add(checks, project.approved?.timedScenePackets === true || Boolean(args["waive-timed-approval"]), "timed scene packets approved", "use --waive-timed-approval only for explicit test runs");
  add(checks, existsSync(srt), "SRT exists", rel(srt));
  add(checks, project.artifacts?.audioMix === true, "audioMix artifact complete");
  add(checks, existsSync(mix), "final mix exists", rel(mix));
  add(checks, ["done", "not_required"].includes(project.routes?.workOrders), "route work orders done", project.routes?.workOrders);
  for (const key of ["videoUse", "imagegen", "capture", "hyperframes"]) {
    add(checks, ["done", "not_required"].includes(project.routes?.[key]), `route ${key} resolved`, project.routes?.[key]);
  }
  const unfinishedAssetRows = unresolvedStatusRows(assetRows);
  const unfinishedTimedRows = unresolvedTimedRows(timedRows);
  const unfinishedWorkRows = unresolvedWorkOrderRows(workRows);
  const missingWorkInputs = emptyInputWorkOrderRows(workRows);
  const statusMismatches = assetWorkOrderMismatches(assetRows, workRows);
  const unfinishedHyperframesRows = unresolvedWorkOrderRows(workRows.filter((row) => row.route === "hyperframes"));
  const densityIssues = visualDensityIssues(compositionHtml, assetRows);
  add(checks, unfinishedAssetRows.length === 0, "asset-plan rows complete", unfinishedAssetRows.length ? detailRows(unfinishedAssetRows) : "all rows done/implemented/qa_passed/not_required");
  add(checks, unfinishedTimedRows.length === 0, "timed-scene-packets rows resolved", unfinishedTimedRows.length ? detailRows(unfinishedTimedRows) : "caption/audio/status resolved");
  add(checks, unfinishedWorkRows.length === 0, "work-orders rows complete", unfinishedWorkRows.length ? detailRows(unfinishedWorkRows) : "all work-orders implemented/qa_passed/not_required");
  add(checks, missingWorkInputs.length === 0, "work-orders required inputs present", missingWorkInputs.length ? detailRows(missingWorkInputs) : "route inputs present or not required");
  add(checks, statusMismatches.length === 0, "asset-plan/work-orders status aligned", statusMismatches.length ? detailRows(statusMismatches) : "completed asset rows have completed route work");
  if (["done", "ready", "qa_passed"].includes(project.routes?.hyperframes)) {
    add(checks, unfinishedHyperframesRows.length === 0, "hyperframes route done matches work-orders", unfinishedHyperframesRows.length ? detailRows(unfinishedHyperframesRows) : "hyperframes work-orders complete");
  }
  add(checks, densityIssues.length === 0, "rich visual density", densityIssues.length ? densityIssues.slice(0, 6).join("; ") : "rich scenes have rows and motion primitives");
  add(checks, !/\b(blocked|blocking pending)\b/i.test(asset), "asset-plan has no blocking pending");
  add(checks, !/\b(blocked|blocking pending)\b/i.test(timed), "timed-scene-packets has no blocking pending");
  if (project.routes?.capture === "done") {
    const captureManifestPath = join(projectPath, "assets/screenshots/capture_manifest.json");
    const captureManifest = existsSync(captureManifestPath) ? JSON.parse(await readText(captureManifestPath)) : { tasks: [] };
    const captureTasks = captureManifest.tasks || [];
    const missingCaptureFiles = captureTasks.filter((task) => !task.ok || !task.output || !existsSync(resolveInsideRoot(task.output)));
    const unusedCaptures = captureTasks
      .filter((task) => task.ok && task.output)
      .map((task) => basename(task.output))
      .filter((file) => !compositionHtml.includes(file));
    add(checks, existsSync(captureManifestPath), "capture manifest exists", rel(captureManifestPath));
    add(checks, captureTasks.length > 0, "capture tasks exist", `${captureTasks.length} task(s)`);
    add(checks, missingCaptureFiles.length === 0, "capture files exist", missingCaptureFiles.length ? `${missingCaptureFiles.length} missing/failed` : "all captured files present");
    add(checks, unusedCaptures.length === 0, "captured assets used in composition", unusedCaptures.length ? unusedCaptures.join(", ") : "all captured screenshots referenced");
  }
  if (project.routes?.imagegen === "done") {
    const imageManifestPath = join(projectPath, "assets/generated/imagegen_manifest.json");
    add(checks, existsSync(imageManifestPath), "imagegen manifest exists", rel(imageManifestPath));
  }
  if (existsSync(join(composition, "package.json"))) {
    const result = run("npm", ["run", "check"], { cwd: composition, timeout: 180_000 });
    add(checks, result.status === 0, "Hyperframes check", result.status === 0 ? "npm run check passed" : (result.stderr || result.stdout || "").slice(0, 800));
  } else {
    add(checks, false, "Hyperframes check", "composition/package.json missing");
  }
  const snapshotTimes = snapshotTimesFromTimedPackets(timed);
  let snapshotResult = null;
  if (existsSync(join(composition, "package.json"))) {
    snapshotResult = run("npm", ["run", "snapshot", "--", ".", "--at", snapshotTimes.join(","), "--output", "snapshots"], { cwd: composition, timeout: 240_000 });
  }
  const snapshotFiles = existsSync(snapshots) ? readdirSync(snapshots).filter((file) => file.endsWith(".png")) : [];
  add(checks, snapshotResult?.status === 0, "scene snapshots refreshed", snapshotTimes.map((time) => `${time.toFixed(1)}s`).join(", "));
  add(checks, snapshotFiles.length >= Math.min(snapshotTimes.length, 4), "dense snapshots exist", `${snapshotFiles.length} png files in ${rel(snapshots)}`);

  const result = report("pre-render", checks);
  await writeText(join(projectPath, "review/qa-pre-render.md"), result.markdown);
  if (result.ok) {
    project.approved.render = true;
    project.status = "pre_render_qa";
    project.currentGate = "render";
    await saveProject(projectPath, project);
  }
  console.log(`Wrote: ${rel(join(projectPath, "review/qa-pre-render.md"))}`);
  console.log(`Result: ${result.ok ? "PASS" : "FAIL"}`);
  process.exit(result.ok ? 0 : 1);
}

if (stage === "final") {
  const render = join(projectPath, "renders/final.mp4");
  const hyperframesRender = join(projectPath, "renders/final-hyperframes.mp4");
  const remotionRender = join(projectPath, "renders/final-remotion.mp4");
  const videoReview = join(projectPath, "review/video-review/video-review.md");
  const hyperframesReview = join(projectPath, "review/video-review/hyperframes-review.md");
  const remotionReview = join(projectPath, "review/video-review/remotion-review.md");
  const rendererComparison = join(projectPath, "review/video-review/renderer-comparison.md");
  const directorReview = join(projectPath, "review/video-review/director-review.md");
  const directorText = await readText(directorReview, "");
  const comparisonText = await readText(rendererComparison, "");
  const hyperframesReviewText = await readText(hyperframesReview, "");
  const remotionReviewText = await readText(remotionReview, "");
  const criticalOpen = unresolvedCriticalFindings(directorText);
  const verdict = directorVerdict(directorText);
  const selected = selectedRenderer(`${directorText}\n${comparisonText}`);
  const remotionBlocked = comparisonHasRemotionBlocked(comparisonText);
  const comparisonResult = comparisonVerdict(comparisonText);
  const evidenceCount = directorEvidenceFrameCount(directorText, selected);
  const frameStats = selected ? await frameManifestStats(projectPath, selected) : { manifestPath: "", frames: [], okFrames: [], motionPeaks: [] };
  const syntheticStats = selected ? await syntheticDomStats(projectPath, selected) : { reportPath: "", issues: [] };
  const selectedCompositionHtml = selected === "remotion"
    ? await readText(join(projectPath, "composition-remotion/index.html"), "")
    : "";
  add(checks, project.artifacts?.videoReview === true || existsSync(hyperframesReview) || existsSync(videoReview), "video review evidence exists", "factory:review-video must create frame evidence before final QA");
  add(checks, existsSync(videoReview) || existsSync(hyperframesReview), "video review report exists", existsSync(videoReview) ? rel(videoReview) : rel(hyperframesReview));
  add(checks, existsSync(rendererComparison), "renderer comparison exists", rel(rendererComparison));
  add(checks, comparisonResult === "PASS", "renderer comparison verdict PASS", comparisonResult || "missing Verdict: PASS");
  add(checks, Boolean(selected), "selected renderer stated", selected || "missing Selected renderer");
  add(checks, selected !== "none", "selected renderer is not none", selected || "missing Selected renderer");
  add(checks, existsSync(hyperframesRender), "hyperframes render exists", rel(hyperframesRender));
  add(checks, existsSync(remotionRender) || remotionBlocked, "remotion render or blocker recorded", existsSync(remotionRender) ? rel(remotionRender) : (remotionBlocked ? "Remotion blocked recorded" : "missing remotion render/blocker"));
  if (existsSync(remotionRender)) add(checks, existsSync(remotionReview), "remotion review exists", rel(remotionReview));
  add(checks, existsSync(hyperframesReview) || existsSync(videoReview), "hyperframes review exists", existsSync(hyperframesReview) ? rel(hyperframesReview) : rel(videoReview));
  if (selected === "hyperframes") {
    add(checks, machineVerdict(hyperframesReviewText || await readText(videoReview, "")) === "PASS", "selected hyperframes machine review PASS", machineVerdict(hyperframesReviewText || await readText(videoReview, "")) || "missing machine verdict");
  }
  if (selected === "remotion") {
    add(checks, machineVerdict(remotionReviewText) === "PASS", "selected remotion machine review PASS", machineVerdict(remotionReviewText) || "missing machine verdict");
  }
  add(checks, existsSync(directorReview), "director review exists", rel(directorReview));
  add(checks, verdict === "PASS", "director review verdict PASS", verdict || "missing Verdict: PASS");
  add(checks, evidenceCount >= 8, "director review cites rendered evidence frames", `${evidenceCount} frame reference(s)`);
  add(checks, criticalOpen.length === 0, "director critical findings resolved", criticalOpen.length ? `${criticalOpen.length} unresolved critical finding(s)` : "no unresolved critical findings");
  add(checks, frameStats.okFrames.length >= 40, "selected renderer frame evidence exists", `${frameStats.okFrames.length} extracted frame(s) in ${rel(frameStats.manifestPath)}`);
  add(checks, frameStats.motionPeaks.length >= 10, "selected renderer motion-peak frames exist", `${frameStats.motionPeaks.length} motion peak frame(s)`);
  add(checks, syntheticStats.issues.length === 0, "synthetic DOM false-positive report clean", syntheticStats.issues.length ? JSON.stringify(syntheticStats.issues.slice(0, 3)) : rel(syntheticStats.reportPath));
  if (selected === "remotion") {
    add(checks, !hasSyntheticQualityDom(selectedCompositionHtml), "remotion review HTML has no synthetic quality DOM", hasSyntheticQualityDom(selectedCompositionHtml) ? "remove prepare.mjs section/class proxy markers" : "metadata-only review HTML");
  }
  add(checks, existsSync(render), "render exists", rel(render));
  if (existsSync(render)) {
    const probe = run("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height,avg_frame_rate", "-of", "json", render], { timeout: 30_000 });
    add(checks, probe.status === 0, "ffprobe", probe.status === 0 ? probe.stdout.slice(0, 500) : probe.stderr);
  }
  const result = report("final", checks);
  await writeText(join(projectPath, "review/qa-final.md"), result.markdown);
  if (result.ok) {
    project.artifacts.render = true;
    project.artifacts.videoReview = true;
    project.artifacts.directorReview = true;
    project.status = "final_qa";
    project.currentGate = "package";
    await saveProject(projectPath, project);
  }
  console.log(`Wrote: ${rel(join(projectPath, "review/qa-final.md"))}`);
  console.log(`Result: ${result.ok ? "PASS" : "FAIL"}`);
  process.exit(result.ok ? 0 : 1);
}

console.error(`Unknown QA stage: ${stage}`);
process.exit(1);
