import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

function argValue(flag, fallback) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : process.argv[index + 1] || fallback;
}

const outDir = resolve(argValue("--output", "snapshots"));
await mkdir(outDir, { recursive: true });
const at = String(argValue("--at", "0")).split(",").map((value) => Number(value)).filter(Number.isFinite);
const frames = at.length ? at : [0];

for (const seconds of frames.slice(0, 8)) {
  const frame = Math.max(0, Math.round(seconds * 30));
  const output = join(outDir, `frame-at-${seconds.toFixed(1)}s.png`);
  const result = spawnSync("npx", [
    "remotion",
    "still",
    "src/index.jsx",
    "ClaudeManagedAgents",
    output,
    "--frame",
    String(frame)
  ], {
    cwd: join(import.meta.dirname, ".."),
    stdio: "inherit"
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
