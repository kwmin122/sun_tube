import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  loadProject,
  parseArgs,
  readText,
  rel,
  run,
  saveProject,
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

  add(checks, project.approved?.plan === true, "plan approved", "project.json.approved.plan must be true");
  add(checks, project.approved?.timedScenePackets === true || Boolean(args["waive-timed-approval"]), "timed scene packets approved", "use --waive-timed-approval only for explicit test runs");
  add(checks, existsSync(srt), "SRT exists", rel(srt));
  add(checks, project.artifacts?.audioMix === true, "audioMix artifact complete");
  add(checks, existsSync(mix), "final mix exists", rel(mix));
  add(checks, ["done", "not_required"].includes(project.routes?.workOrders), "route work orders done", project.routes?.workOrders);
  for (const key of ["videoUse", "imagegen", "capture"]) {
    add(checks, ["done", "not_required"].includes(project.routes?.[key]), `route ${key} resolved`, project.routes?.[key]);
  }
  add(checks, !/\b(blocked|blocking pending)\b/i.test(asset), "asset-plan has no blocking pending");
  add(checks, !/\b(blocked|blocking pending)\b/i.test(timed), "timed-scene-packets has no blocking pending");
  if (existsSync(join(composition, "package.json"))) {
    const result = run("npm", ["run", "check"], { cwd: composition, timeout: 180_000 });
    add(checks, result.status === 0, "Hyperframes check", result.status === 0 ? "npm run check passed" : (result.stderr || result.stdout || "").slice(0, 800));
  } else {
    add(checks, false, "Hyperframes check", "composition/package.json missing");
  }
  let snapshotOk = existsSync(snapshots) && readdirSync(snapshots).some((file) => file.endsWith(".png"));
  if (!snapshotOk && existsSync(join(composition, "package.json"))) {
    const snapshot = run("npm", ["run", "snapshot", "--", ".", "--at", "0", "--output", "snapshots"], { cwd: composition, timeout: 180_000 });
    snapshotOk = snapshot.status === 0 && existsSync(snapshots) && readdirSync(snapshots).some((file) => file.endsWith(".png"));
  }
  add(checks, snapshotOk, "snapshots exist", rel(snapshots));

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
