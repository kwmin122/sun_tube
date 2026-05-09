---
name: hype-motion-designer
description: "Use in the hype_tuber workspace to implement or assemble Hyperframes HTML/CSS/SVG/GSAP motion compositions from timed-scene-packets.md, design-context.md, asset-plan.md, ElevenLabs SRT, and final audio."
---

# Hype Motion Designer

Build the Hyperframes composition.

## Inputs

- `timed-scene-packets.md`
- `design-context.md`
- `asset-plan.md`
- `plan.md`
- ElevenLabs SRT and final mix
- `skills/hyperframes-motion-design-guide/SKILL.md`

## Output

- Hyperframes composition files under `composition/`
- Scene timing aligned to SRT
- Snapshot-ready dense frames
- Render-ready assembly

## Rules

- Follow the local Hyperframes motion design guide.
- Read `TOOL_ROUTING_PIPELINE.md` before assembling routed assets.
- Use SRT timing as the timing source.
- Keep captions readable and protected.
- Use motion to explain the scene purpose.
- Import processed clips from `asset-plan.md`; do not use Hyperframes as the raw-video trim/transcript/subtitle preparation tool.
- Treat `work-orders/*.md` as the executable task truth for route completion.
- Do not mark a Hyperframes route complete while work-order rows are still `todo`, `pending`, `planned`, `inputs_ready`, or `blocked`.

## Visual Density Checklist

Use this before pre-render QA:

- `rich` scenes must include at least three visible information rows or equivalent data marks.
- Add at least one real motion primitive: path draw, route pulse, scan fill, count-up, sequential row reveal, or liquid sheen.
- Avoid large empty cards or panels. A panel needs an information role, not just a title.
- Keep primary labels and moving tokens above the caption safe zone.
- Use imagegen only for mood/styleframe/background/thumbnail assets. Build text-heavy diagrams in HTML/SVG/GSAP.

## Motion Primitives

Prefer small, inspectable primitives that can be reused across scenes:

- `.glass-panel`
- `.liquid-sheen`
- `.scan-fill`
- `.route-pulse`
- `.metric-tick`
- `.flow-token`
- `.path-draw`

Useful GSAP patterns:

- blur to sharpen
- stroke-dashoffset path draw
- border or scan sweep
- row sequential reveal
- token route movement
- status tick pop

## Finish Handoff

After assembly, hand off to `hype-qa-editor` for snapshot/pre-render QA.

## Do Not

- Start exact timing before `timed-scene-packets.md`.
- Process raw/reference/interview video that should be routed through `video-use`.
- Render before snapshot/pre-render QA.
- Replace the approved scene contract.
