import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  copyDir,
  nextProjectId,
  nowIso,
  parseArgs,
  readJson,
  readText,
  rel,
  resolveInsideRoot,
  rootPath,
  slugify,
  writeJson,
  writeText,
} from "./lib/factory_common.mjs";

const args = parseArgs();
const topic = args._.join(" ").trim();
if (!topic) {
  console.error('Usage: npm run factory:new -- "주제" [--id 999] [--slug custom-slug] [--projects-dir projects] [--dry-run]');
  process.exit(1);
}

const projectsDir = args["projects-dir"] ? resolveInsideRoot(args["projects-dir"]) : rootPath("projects");
const id = String(args.id || (await nextProjectId(projectsDir))).padStart(3, "0");
const explicitSlug = args.slug !== undefined;
const generatedSlug = slugify(explicitSlug ? args.slug : topic);
if (explicitSlug && (!generatedSlug || (generatedSlug === "topic" && !/[a-z0-9]/i.test(String(args.slug))))) {
  console.error("Slug is empty after normalization. Use an ASCII slug like --slug actual-topic.");
  process.exit(1);
}
const slug = explicitSlug || /[a-z0-9]/i.test(topic) ? generatedSlug : `project-${id}`;
const projectDir = join(projectsDir, `${id}-${slug}`);
const templateDir = rootPath("templates/project");

if (existsSync(projectDir)) {
  console.error(`Target already exists: ${rel(projectDir)}`);
  console.error("Use a different topic/ID or remove the existing test project intentionally.");
  process.exit(1);
}
if (existsSync(projectsDir)) {
  const duplicate = (await readdir(projectsDir)).find((entry) => entry.match(/^\d{3}-/) && entry.replace(/^\d{3}-/, "") === slug);
  if (duplicate) {
    console.error(`Slug already exists: ${duplicate}`);
    console.error("Use --slug with a unique ASCII slug or choose a different topic.");
    process.exit(1);
  }
}

const now = nowIso();
const project = await readJson(join(templateDir, "project.json"));
project.id = id;
project.slug = slug;
project.title = topic;
project.status = "idea";
project.currentGate = "topic_intake";
project.createdAt = now;
project.updatedAt = now;

if (args["dry-run"]) {
  console.log(`Dry run: would create ${rel(projectDir)}`);
  console.log(`Project ID: ${id}`);
  console.log(`Slug: ${slug}`);
  console.log(`Next: npm run factory:next -- ${rel(projectDir)}`);
  process.exit(0);
}

await copyDir(templateDir, projectDir);
await writeJson(join(projectDir, "project.json"), project);

const statusPath = join(projectDir, "status.md");
const status = await readText(statusPath);
await writeText(
  statusPath,
  status
    .replace("- [ ] Topic received", "- [x] Topic received")
    .replace("`idea`", "`topic_intake`")
);

const projectsPath = rootPath("PROJECTS.md");
const row = `| ${id} | ${slug} | idea | topic_intake | Topic: ${topic.replaceAll("|", "/")} |`;
let projects = await readText(projectsPath, "# PROJECTS\n\n| ID | Project | Status | Current Gate | Notes |\n|---|---|---|---|---|\n");
if (projectsDir === rootPath("projects") && !projects.includes(row)) {
  projects = /\n+## Status Values/.test(projects)
    ? projects.replace(/\n+## Status Values/, `\n${row}\n\n## Status Values`)
    : `${projects.trimEnd()}\n${row}\n`;
  const nextId = String(Number(id) + 1).padStart(3, "0");
  projects = projects.replace(/Use `\d{3}-\{short-slug\}` for the next real video project\./, `Use \`${nextId}-{short-slug}\` for the next real video project.`);
  await writeText(projectsPath, projects);
}

console.log("Changed project.json fields: created project.json");
console.log(`Created: ${rel(projectDir)}`);
console.log(`Next: npm run factory:next -- ${rel(projectDir)}`);
