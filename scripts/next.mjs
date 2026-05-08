import {
  ROLE_BY_GATE,
  inferGate,
  loadProject,
  parseArgs,
  rel,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const projectArg = args._[0];
if (!projectArg) {
  console.error("Usage: npm run factory:next -- <project-path>");
  process.exit(1);
}

const { project, projectPath } = await loadProject(projectArg);
const gate = inferGate(project);
const route = ROLE_BY_GATE[gate] || ROLE_BY_GATE.blocked;
const localRead = route.read.map((file) => (file === "project.json" ? `${rel(projectPath)}/project.json` : file));
const localWrite = route.write.map((file) => (file.startsWith("project.json") ? `${rel(projectPath)}/project.json` : `${rel(projectPath)}/${file}`));

console.log(`Project: ${rel(projectPath)}`);
console.log(`Current gate: ${project.currentGate}`);
console.log(`Suggested gate: ${gate}`);
console.log(`Role: ${route.roles.join(", ") || "none"}`);
console.log("Read:");
for (const file of localRead) console.log(`- ${file}`);
console.log("Write:");
for (const file of localWrite) console.log(`- ${file}`);
console.log("Note:");
console.log(`- ${route.note}`);
console.log("");
console.log("Prompt:");
console.log("```text");
console.log(`작업 위치: ${rel(projectPath)}`);
console.log("");
console.log("한국어로 답해라.");
console.log("youtube-scene-director는 사용하지 마라.");
console.log("FACTORY_AUTOMATION_ROADMAP.md와 AGENTS.md의 공장 규칙을 따른다.");
console.log("project.json이 canonical state이고 status.md는 사람이 보는 체크리스트다.");
console.log(`현재 게이트는 ${gate}다.`);
console.log(`이번 역할: ${route.roles.join(", ") || "없음"}`);
console.log("");
console.log("읽을 파일:");
for (const file of localRead) console.log(`- ${file}`);
console.log("");
console.log("작성/수정할 파일:");
for (const file of localWrite) console.log(`- ${file}`);
console.log("");
console.log("완료 조건:");
console.log("- 필요한 산출물을 작성한다.");
console.log("- project.json의 currentGate/status/artifacts/approved/routes를 실제 완료 상태에 맞게 갱신한다.");
console.log("- 다음 단계로 넘어갈 수 있는지 factory:status와 factory:next 기준으로 확인한다.");
console.log("```");
