# Hype Tuber Production Roles

This document defines the MVP role-skill production factory for `hype_tuber`.

The goal is speed and production clarity. This is not a rights, legal, privacy, or citation-audit system.

## MVP Scope

Build a role-based production line that turns a topic into:

- a material research pack
- a creative brief
- draft scene packets before scripting
- an approval-ready script and scene contract
- timed scene packets after ElevenLabs TTS/SRT
- scene-level tool routing for Hyperframes, `video-use`, imagegen, capture, or scripts
- parallel asset, visual, motion, and audio work
- snapshot, render, final QA, and packaging

## Explicitly Excluded From MVP

Do not create or require:

- copyright risk review
- privacy review
- quote accuracy review
- missing-source review
- rights/risk columns
- `source-notes.md` as a required gate
- `hype-source-editor`

`source-notes.md` can remain for legacy projects or optional notes, but it is not a required MVP gate.

## Deferred Role

`hype-source-editor` is deferred.

Add it later only when the channel needs a dedicated review pass for citations, quote accuracy, privacy, copyright, platform risk, or external clip risk.

## Execution Bundles

The role skills are role manuals, not a command to run every role every time.

`hype-production-orchestrator` chooses the smallest useful bundle based on topic type and current project gate.

```text
Development
hype-topic-producer
-> hype-research-desk
-> hype-showrunner
-> hype-creative-director
-> hype-scene-planner
-> draft-scene-packets
-> hype-writer-room
-> user approval

Production
hype-audio-producer
-> ElevenLabs TTS/SRT
-> hype-scene-planner
-> timed-scene-packets
-> scene tool routing
-> hype-asset-producer / hype-visual-director / hype-motion-designer / hype-audio-producer in parallel

Finish
hype-motion-designer assembly
-> hype-qa-editor snapshot/pre-render QA
-> render
-> hype-qa-editor final QA
-> hype-packaging-editor
```

## Document Owners

| Document | Owner |
|---|---|
| `research-pack.md` | `hype-research-desk` |
| `creative-brief.md` | `hype-showrunner`, `hype-creative-director` |
| `draft-scene-packets.md` | `hype-scene-planner` |
| `plan.md` | `hype-writer-room`, `hype-scene-planner` |
| `timed-scene-packets.md` | `hype-scene-planner` |
| `asset-plan.md` | `hype-asset-producer` |
| `design-context.md` | `hype-visual-director` |
| `status.md` | `hype-production-orchestrator` |
| `TOOL_ROUTING_PIPELINE.md` | workspace-level routing contract |

## Role Contracts

### hype-production-orchestrator

- Input: user topic, project folder, current status.
- Output: active phase, role bundle, next required artifacts, current gate in `status.md`, and whether scenes need `video-use`, Hyperframes, imagegen, capture, or scripts.
- Handoff condition: the next role has explicit input files and expected outputs.
- Do not: run all roles by default or start TTS/render before approval gates.

### hype-topic-producer

- Input: raw topic.
- Output: topic type, target viewer, likely duration band, content pattern candidates.
- Handoff condition: `research-desk` knows what to collect and why.
- Do not: write the final script.

### hype-research-desk

- Input: topic classification and user notes.
- Output: `research-pack.md` with material leads, links, interview candidates, image candidates, scene sparks, and unanswered questions.
- Handoff condition: `showrunner` has enough material to decide the video angle.
- Do not: perform citation, rights, privacy, or quote-accuracy review.

### hype-showrunner

- Input: `research-pack.md`.
- Output: angle, promise, length decision, primary structure, and audience fit in `creative-brief.md`.
- Handoff condition: `creative-director` has a clear editorial target.
- Do not: over-expand into multiple unrelated video concepts.

### hype-creative-director

- Input: `creative-brief.md`, research material.
- Output: intro/body/payoff shape, pacing model, pattern mix, and visual rhythm.
- Handoff condition: `scene-planner` can break the video into scenes.
- Do not: copy a reference video as a fixed template.

### hype-scene-planner

- Input: `creative-brief.md` before scripting; SRT after TTS.
- Output: `draft-scene-packets.md` before scripting and `timed-scene-packets.md` after TTS/SRT.
- Handoff condition: `writer-room` has scene intent before script; production roles have timed scene instructions after SRT.
- Do not: invent exact timings before TTS/SRT.

### hype-writer-room

- Input: `creative-brief.md`, `draft-scene-packets.md`.
- Output: approval-ready Korean narration and scene contract in `plan.md`.
- Handoff condition: user can approve or request changes.
- Do not: start TTS without user approval.

### hype-asset-producer

- Input: `timed-scene-packets.md`, `research-pack.md`.
- Output: `asset-plan.md` and asset tasks for screenshots, b-roll, interview candidates, demos, images, processed media, and tool route per asset.
- Handoff condition: motion and visual roles know what to use per scene.
- Do not: add rights/risk review columns in MVP.

### hype-visual-director

- Input: `creative-brief.md`, `draft-scene-packets.md`, references.
- Output: `design-context.md`, imagegen directions, style frames, layout tone, color, typography, and composition rules.
- Handoff condition: motion-designer can implement a coherent visual system.
- Do not: make generic decorative visuals that do not serve scene intent.

### hype-motion-designer

- Input: `timed-scene-packets.md`, `design-context.md`, `asset-plan.md`, SRT/audio.
- Output: Hyperframes/HTML/CSS/SVG/GSAP composition and pre-render assembly.
- Handoff condition: QA can inspect snapshots and render readiness.
- Do not: animate before approved plan and timing packet exist, or use Hyperframes as the raw-video trimming/transcription tool.

### hype-audio-producer

- Input: approved script; later timed scene packets for mix notes.
- Output: ElevenLabs MP3/SRT, final mix, BGM/SFX notes.
- Handoff condition: scene-planner has real SRT timing; motion-designer has final audio paths.
- Do not: store API keys in project `.env`.

### hype-qa-editor

- Input: composition, snapshots, render output.
- Output: pre-render QA notes, final QA result, blocking fixes.
- Handoff condition: render is valid and packaging can proceed.
- Do not: review copyright, privacy, missing sources, or quote accuracy in MVP.

### hype-packaging-editor

- Input: final video direction, `plan.md`, final QA result.
- Output: title options, thumbnail direction, description, pinned comment direction.
- Handoff condition: upload package is ready.
- Do not: change the approved video argument without routing back to creative roles.
