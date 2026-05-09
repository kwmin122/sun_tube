import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

function argValue(flag, fallback) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : process.argv[index + 1] || fallback;
}

const out = resolve(argValue("-o", "../renders/final-remotion.mp4"));
await mkdir(dirname(out), { recursive: true });

const result = spawnSync("npx", [
  "remotion",
  "render",
  "src/index.jsx",
  "ClaudeManagedAgents",
  out,
  "--codec",
  "h264",
  "--pixel-format",
  "yuv420p",
  "--audio-codec",
  "aac",
  "--concurrency",
  "2"
], {
  cwd: join(import.meta.dirname, ".."),
  stdio: "inherit"
});

process.exit(result.status || 0);
