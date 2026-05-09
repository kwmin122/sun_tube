import { join } from "node:path";
import {
  ensureDir,
  extractVoiceoverScript,
  loadProject,
  parseArgs,
  readText,
  rel,
  saveProject,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:package -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
if ((project.currentGate !== "package" || project.artifacts?.render !== true || project.artifacts?.videoReview !== true || project.artifacts?.directorReview !== true) && !args.force) {
  console.error("Package blocked: machine video review, director review, final QA, and render artifact must pass. Use --force only as an explicit override.");
  process.exit(1);
}
const outDir = join(projectPath, "package");
await ensureDir(outDir);

const plan = await readText(join(projectPath, "plan.md"));
const script = extractVoiceoverScript(plan);
const title = project.title;

await writeText(join(outDir, "title-options.md"), [
  "# Title Options",
  "",
  `1. ${title}`,
  `2. ${title}: 핵심만 빠르게 보기`,
  `3. 지금 ${title}을 봐야 하는 이유`,
  "",
].join("\n"));

await writeText(join(outDir, "description.md"), [
  "# Description",
  "",
  `${title}에 대한 짧은 모션 설명 영상입니다.`,
  "",
  "## Video",
  "",
  "- Render: `renders/final.mp4`",
  "- Script: `plan.md`",
  "",
].join("\n"));

await writeText(join(outDir, "pinned-comment.md"), [
  "# Pinned Comment",
  "",
  `이 주제에서 가장 중요한 포인트는 무엇이라고 보시나요?`,
  "",
].join("\n"));

await writeText(join(outDir, "thumbnail-prompts.md"), [
  "# Thumbnail Prompts",
  "",
  `- Big text: ${title}`,
  "- Visual: one sharp object/metaphor from the strongest scene, clean animated editorial style",
  "- Avoid: factual screenshot fabrication, cluttered small text",
  "",
].join("\n"));

await writeText(join(outDir, "upload-checklist.md"), [
  "# Upload Checklist",
  "",
  "- [ ] Video review passed",
  "- [ ] Director review passed",
  "- [ ] Final QA passed",
  "- [ ] `renders/final.mp4` exists",
  "- [ ] Title selected",
  "- [ ] Thumbnail selected",
  "- [ ] Description reviewed",
  "- [ ] Pinned comment reviewed",
  script ? "- [ ] Script matches approved `plan.md`" : "- [ ] Script missing in `plan.md`",
  "",
].join("\n"));

project.status = "done";
project.currentGate = "done";
await saveProject(projectPath, project);

console.log(`Generated upload package under ${rel(outDir)}`);
