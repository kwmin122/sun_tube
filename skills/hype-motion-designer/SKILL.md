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
- Keep captions text-only from ElevenLabs SRT by default; do not add caption progress bars unless the user explicitly asks.
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
- Classify imagegen per scene as `primary`, `support`, or `not_required`. Use `primary` when a generated image carries the explanation/emotion/metaphor; use `support` for mood/styleframe/background/thumbnail; use `not_required` when capture, interview, data, or HTML/SVG explains the scene better.
- If a capture is selected as a route, it must be large enough to function as primary evidence, generally one half-side or larger. Tiny official-source stamps should be removed or rerouted to a diagram.
- Do not use full-width decorative connector SVGs that float across the canvas or pass over card titles. Lines must be anchored to concrete nodes, clipped inside their container, or replaced with short arrows/tokens.

## Renderer Comparison

If both `composition-hyperframes/` and `composition-remotion/` exist, both must implement the same scene recipe and narration verb. Do not create renderer-specific meanings.

Use Hyperframes as the canonical design implementation unless `creative-brief.md` explicitly selects another final renderer. Remotion can be a candidate comparison, but a smoother transition is not enough to win if scene clarity, visual thesis, or brand consistency is weaker.

Quality rules:

- Use anchored paths or lane/rail flow; never let route lines cross text or float through cards.
- If a connector line cannot be anchored cleanly, remove it and express the relationship with row order, token motion, short arrows, or contained rails.
- Use Liquid Glass only as focus, state, or transition layer, not as a global card style.
- Prefer scene-local timelines or frame-local control over one global animation blob.
- Leave metadata or DOM markers that `factory:review-video` can inspect.

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
