# Tool Routing Pipeline

This document defines when `hype_tuber` uses Hyperframes, `video-use`, image generation, manual capture, and simple media scripts.

The default final video is still a TTS-driven Hyperframes motion composition. `video-use` is used when a scene needs raw/source video handling before that footage becomes an asset.

Renderer selection is a creative decision, not a technical default.

- Use Hyperframes when the target style is an editorial explainer, technical diagram, Korean narration, dark grid, glass panel, or YouTube information video.
- Use Remotion when frame-perfect sequence timing, React-driven captions, or a comparison render is explicitly needed.
- Remotion may be a candidate or timing lab, but it is not the default final aesthetic unless rendered-frame review selects it.

## Pipeline Diagram

```text
topic / user material
-> research-pack.md
-> creative-brief.md
-> draft-scene-packets.md
-> plan.md user approval
-> ElevenLabs TTS/SRT/final mix
-> timed-scene-packets.md
-> scene tool routing
   |-- raw video / interview / talk / demo clip -> video-use -> processed clip
   |-- HTML motion / diagram / kinetic type ------> Hyperframes
   |-- generated metaphor / style frame ----------> imagegen
   |-- docs / web / UI screenshot ----------------> manual capture or browser capture
   |-- audio mix / probe / simple trim -----------> scripts or ffmpeg
-> asset-plan.md / design-context.md updates
-> Hyperframes assembly
-> snapshot / pre-render QA
-> render
-> video review / frame evidence
-> final QA
-> packaging
```

## Tool Roles

| Tool | Use It For | Output Goes To |
|---|---|---|
| Hyperframes | Main face-free composition, HTML/CSS/SVG/GSAP motion, kinetic typography, diagrams, captions, final render. | `composition/`, `renders/` |
| `video-use` | Reference-video analysis, raw video inventory, transcript, contact sheets, clip trim, interview/talk/demo processing, burned subtitles on source clips. | `assets/**/processed/` or the source video's `edit/` output, then referenced in `asset-plan.md` |
| imagegen | Generated style frames, metaphor visuals, backgrounds, thumbnails, non-factual illustrations. | `assets/generated/` or `assets/processed/` |
| Manual/browser capture | Official docs, GitHub README, web pages, UI screenshots, platform captures. | `assets/screenshots/`, `assets/evidence/` |
| scripts/ffmpeg | Audio mix, ffprobe checks, format conversion, simple extraction, normalization. | `voiceover/`, `assets/processed/`, `renders/` |

## Capture Utility Contract

A capture route is `qa_passed` only when all are true:

- The capture is from the intended page or source.
- The visible crop is relevant to the exact narration beat.
- The important region occupies enough screen area to read or recognize.
- Highlight/zoom points to a meaningful source detail, not a decorative rectangle.
- The scene overlays Korean interpretation, labels, or comparison structure.

If a capture is technically correct but visually unhelpful, downgrade it:

```text
primary_evidence -> support_texture -> not_required -> reroute_to_diagram
```

Capture route must be downgraded to `support_texture` or rerouted to Hyperframes diagram when:

- the page is mostly English text and the viewer cannot quickly understand it;
- the highlighted box does not identify a specific claim or UI affordance;
- the capture is used as background texture;
- the narration can be explained better by a diagram, flow, or typed evidence card.

## When To Use `video-use`

Use `video-use` when a video file itself is the material:

- A user gives a reference clip and asks for frame-level analysis.
- A raw video, talk, interview, demo, or screen recording must be trimmed.
- A spoken source clip needs transcript, quote selection, or burned subtitles.
- A b-roll or interview segment needs crop, normalization, or edit-ready export.
- The requested final output is primarily an edited footage/montage video rather than a TTS motion explainer.

Do not use `video-use` by default when the scene is only:

- Korean TTS with animated typography.
- HTML/SVG diagram motion.
- Generated image or style-frame work.
- Static screenshot or document capture.
- Final Hyperframes render.

## Scene Tool Routes

Every production scene should carry one primary route and optional support routes.

| Route | Meaning |
|---|---|
| `hyperframes` | Build the scene directly in HTML/CSS/SVG/GSAP. |
| `video-use` | Prepare a raw/source video segment before importing it into Hyperframes. |
| `imagegen` | Generate a visual asset before importing it into Hyperframes. |
| `capture` | Capture docs/web/UI/screenshots manually or with browser tools. |
| `script/ffmpeg` | Run simple media conversion, probing, trimming, or audio work. |
| `manual` | User-supplied or hand-prepared asset; no special tool needed. |

## Handoff Rule

`timed-scene-packets.md` chooses the route per scene. `asset-plan.md` turns that route into concrete file work. `design-context.md` controls how the routed assets are visually integrated. Hyperframes receives only approved or processed assets, not unresolved raw material.

A routed asset is not complete just because the file exists. It is complete only when the work order is complete, the `asset-plan.md` row is `implemented` or `qa_passed`, and the final composition references the processed file or implements the scene contract. Capture routes must use real page captures with stable local paths under `composition/assets/screenshots/`; blank verification pages or unused screenshots must stay blocked until replaced or removed from the route.

## Truth Layers

Use these layers in this order:

| Layer | Responsibility |
|---|---|
| `project.json` | Large canonical project state and route state. |
| `asset-plan.md` | Scene-level asset, visual, imagegen, and implementation-readiness state. |
| `work-orders/*.md` | Route-level executable task state. |
| `composition/index.html` and composition data | Actual implemented result. |
| `review/video-review/*` | Rendered-frame evidence, caption sync, asset presence, and motion variety review. |
| QA reports | Compare the project layers and block inconsistent state. |

`work-orders/*.md` does not replace `project.json`, but it is the truth for whether route work is actually complete. If `project.routes.hyperframes` is `done` while `work-orders/hyperframes.md` still has `todo`, `pending`, `planned`, `inputs_ready`, or `blocked`, pre-render QA must fail.

## Route Status Values

Use the same row-level status language in `asset-plan.md` and `work-orders/*.md`.

| Status | Meaning |
|---|---|
| `planned` | Route and visual role are known, but implementation inputs are not ready. |
| `inputs_ready` | Required links/files/design notes are available for implementation. |
| `implemented` | The processed asset or Hyperframes implementation exists. |
| `qa_passed` | QA has checked the row against work orders and composition output. |
| `blocked` | A missing input, implementation gap, or QA issue prevents progress. |
| `not_required` | The route is not needed for this scene/project. |

Pre-render QA treats `planned`, `inputs_ready`, `todo`, `pending`, and `blocked` as incomplete. Legacy `done` may be accepted for older projects, but new work should use `implemented` or `qa_passed`.

## Visual Density And Imagegen

For information explainer scenes, prefer HTML/SVG/GSAP over generated images when the viewer needs to read labels, compare steps, or understand a system diagram. Do not make that a global ban: imagegen can be a scene's primary visual when the topic is emotional, metaphorical, reenacted, speculative, or thumbnail-driven.

Classify imagegen per scene:

- `primary`: generated image carries the scene's core explanation, emotion, reenactment, future scenario, metaphor, or visual hook.
- `support`: generated image provides mood texture, abstract background, opening styleframe, thumbnail candidate, transition, or non-factual atmosphere layer.
- `not_required`: capture, interview, data, exact text, or HTML/SVG diagram is clearer.

Do not use imagegen for:

- text-heavy information graphics
- official docs, UI, or product evidence
- precise system diagrams that should be implemented in HTML/SVG
- screenshots that should come from capture

If `imagegen` is not used, make that explicit in `project.json.routes.imagegen`, `work-orders/imagegen.md`, and the video review route transparency report. A missing generated image is acceptable only when the route is intentionally `not_required`; otherwise it is a production gap.

If a scene is marked `data-visual-density="rich"`, the composition must include enough visible structure: information rows, route tokens, SVG paths, progress rails, scan fills, count/tick states, or equivalent motion primitives. Large empty glass panels fail pre-render QA.

## Director Review Gate

`factory:review-video` extracts contact sheets, scene frames, suspicious frames, and machine reports. It does not give final creative approval. `review/video-review/director-review.md` must say `Verdict: PASS` and have no unresolved critical findings before final QA and package are allowed.

## Connector Line Quality

Avoid full-width decorative connector paths that float over cards, cross titles, or fail to attach to concrete nodes. Use short card-anchored arrows, row transitions, flow tokens, scan fills, or clipped micro-lines instead. `factory:review-video` fails if it finds broad floating connector classes such as `route-svg`, `event-route-svg`, `pipeline-svg`, or `network-lines`.

## Non-Goals

- Do not turn this into a legal/source review gate.
- Do not force every topic through `video-use`.
- Do not let reference-video patterns become a fixed script structure.
- Do not replace Hyperframes as the default final composition tool unless the user asks for a footage-first edit.
