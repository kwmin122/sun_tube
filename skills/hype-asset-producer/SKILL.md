---
name: hype-asset-producer
description: "Use in the hype_tuber workspace after timed-scene-packets.md to plan and gather scene assets such as screenshots, b-roll, interview candidates, demos, data, generated images, processed media, and asset-plan.md tasks."
---

# Hype Asset Producer

Turn timed scenes into asset work.

## Inputs

- `timed-scene-packets.md`
- `research-pack.md`
- `plan.md`
- `design-context.md`, if present

## Output

Create or update `asset-plan.md`.

For each scene, specify:

- asset type
- tool route: `hyperframes`, `video-use`, `imagegen`, `capture`, `script/ffmpeg`, or `manual`
- link, file, or candidate
- processing needed
- storage path
- status
- handoff notes

## Asset Types

- screenshot
- b-roll
- interview or quote candidate
- demo recording
- data/table/chart
- generated image
- processed overlay
- HTML/SVG diagram input

## Tool Routing

Read `TOOL_ROUTING_PIPELINE.md`.

Use `video-use` when the asset starts as raw/reference/interview/talk/demo video and needs analysis, transcript, trimming, subtitles, crop, or export. Put the processed result in the relevant `assets/**/processed/` folder or reference the `video-use` `edit/` output path in `asset-plan.md`.

Use Hyperframes for final motion scenes, diagrams, kinetic type, caption timing, and composition assembly. Do not send static screenshots or generated images through `video-use` unless they are inside a source video clip.

## Do Not

- Add rights/risk columns in MVP.
- Block production on missing source audit.
- Use assets as decoration when the scene needs explanation.
