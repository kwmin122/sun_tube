import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import {
  loadProject,
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
    return !status || /\b(todo|pending|blocked)\b/.test(status);
  });
}

function unresolvedTimedRows(rows) {
  return rows.filter((row) => {
    const values = [row["Caption Behavior"], row["Audio/SFX"], row.Status].map((value) => String(value || "").trim().toLowerCase());
    return values.some((value) => !value || /\b(todo|pending|blocked)\b/.test(value));
  });
}

function detailRows(rows) {
  return rows.slice(0, 6).map((row) => `scene ${row.Scene || row["#"] || "?"}: ${row.Status || "empty"}`).join("; ");
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
  const composition = join(projectPath, "composition");
  const snapshots = join(composition, "snapshots");
  const compositionHtmlPath = join(composition, "index.html");
  const compositionHtml = await readText(compositionHtmlPath, "");
  const assetRows = tableDataRows(asset);
  const timedRows = tableDataRows(timed);

  add(checks, project.approved?.plan === true, "plan approved", "project.json.approved.plan must be true");
  add(checks, project.approved?.timedScenePackets === true || Boolean(args["waive-timed-approval"]), "timed scene packets approved", "use --waive-timed-approval only for explicit test runs");
  add(checks, existsSync(srt), "SRT exists", rel(srt));
  add(checks, project.artifacts?.audioMix === true, "audioMix artifact complete");
  add(checks, existsSync(mix), "final mix exists", rel(mix));
  add(checks, ["done", "not_required"].includes(project.routes?.workOrders), "route work orders done", project.routes?.workOrders);
  for (const key of ["videoUse", "imagegen", "capture"]) {
    add(checks, ["done", "not_required"].includes(project.routes?.[key]), `route ${key} resolved`, project.routes?.[key]);
  }
  const unfinishedAssetRows = unresolvedStatusRows(assetRows);
  const unfinishedTimedRows = unresolvedTimedRows(timedRows);
  add(checks, unfinishedAssetRows.length === 0, "asset-plan rows complete", unfinishedAssetRows.length ? detailRows(unfinishedAssetRows) : "all rows done/not_required");
  add(checks, unfinishedTimedRows.length === 0, "timed-scene-packets rows resolved", unfinishedTimedRows.length ? detailRows(unfinishedTimedRows) : "caption/audio/status resolved");
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
  add(checks, existsSync(render), "render exists", rel(render));
  if (existsSync(render)) {
    const probe = run("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height,avg_frame_rate", "-of", "json", render], { timeout: 30_000 });
    add(checks, probe.status === 0, "ffprobe", probe.status === 0 ? probe.stdout.slice(0, 500) : probe.stderr);
  }
  const result = report("final", checks);
  await writeText(join(projectPath, "review/qa-final.md"), result.markdown);
  if (result.ok) {
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
