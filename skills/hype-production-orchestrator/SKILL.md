---
name: hype-production-orchestrator
description: "Use in the hype_tuber workspace to route a topic or project through the MVP YouTube/Hyperframes production pipeline, choose the smallest useful role bundle, update status.md, and prevent premature TTS, timing, render, or packaging work."
---

# Hype Production Orchestrator

Route the project. Do not act as every role.

## Inputs

- User topic or current project folder
- `status.md`, if present
- `PRODUCTION_ROLES.md`
- `CREATIVE_DEVELOPMENT_PIPELINE.md`
- `TOOL_ROUTING_PIPELINE.md`

## Workflow

Choose the current gate:

1. Development: topic, material research, creative brief, draft scene packets, script.
2. Approval: user approves `plan.md`.
3. Production: TTS/SRT, timed scene packets, parallel asset/visual/motion/audio work.
4. Finish: composition assembly, snapshot QA, render, final QA, packaging.

Run only the roles needed for that gate.

During production, ensure every scene has a route: `hyperframes`, `video-use`, `imagegen`, `capture`, `script/ffmpeg`, or `manual`.

## Outputs

- Updated `status.md`
- Next role bundle
- Required input/output files for the next role
- Blocker list, if any

## Gates

- Do not start script writing before `draft-scene-packets.md`.
- Do not start TTS before user approval.
- Do not create `timed-scene-packets.md` before ElevenLabs SRT exists.
- Do not route every project through `video-use`; use it only for raw/source video analysis or processing.
- Do not render before snapshot/pre-render QA.
- Do not package before final QA.

## MVP Boundary

Do not create or call `hype-source-editor`. Source, rights, privacy, quote-accuracy, and copyright review are deferred.
