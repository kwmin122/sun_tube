# Tool Routing Pipeline

This document defines when `hype_tuber` uses Hyperframes, `video-use`, image generation, manual capture, and simple media scripts.

The default final video is still a TTS-driven Hyperframes motion composition. `video-use` is used when a scene needs raw/source video handling before that footage becomes an asset.

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

## Non-Goals

- Do not turn this into a legal/source review gate.
- Do not force every topic through `video-use`.
- Do not let reference-video patterns become a fixed script structure.
- Do not replace Hyperframes as the default final composition tool unless the user asks for a footage-first edit.
