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
4. Finish: composition assembly, snapshot QA, render, video review, final QA, packaging.

Run only the roles needed for that gate.

During production, ensure every scene has a route: `hyperframes`, `video-use`, `imagegen`, `capture`, `script/ffmpeg`, or `manual`.

Route selection happens before the writer room. Do not let the writer produce generic lines first and ask the motion designer to decorate them later.

State ownership:

- `project.json` is canonical state and must be updated by the orchestrator/main process only.
- Parallel workers may write their owned artifacts, work-orders, manifests, and review files, but they must not save competing `project.json` snapshots.
- After parallel work finishes, merge route/artifact status into `project.json` sequentially.
- If two commands need to update `project.json`, run them in order or re-read the latest file immediately before saving.

Renderer policy:

- Treat Hyperframes as the default canonical design renderer for the final delivery unless the brief explicitly selects another renderer.
- Treat Remotion as a candidate/timing-lab renderer until a frame-reviewed comparison selects it.
- Do not let renderer candidates reinterpret the script, scene recipe, or visual thesis.

## Outputs

- Updated `status.md`
- Next role bundle
- Required input/output files for the next role
- Blocker list, if any

## Gates

- Do not start script writing before `draft-scene-packets.md`.
- Do not approve a plan unless `factory:validate-scene-contract` and `factory:validate-visual-routing` pass.
- Do not start TTS before user approval.
- Do not create `timed-scene-packets.md` before ElevenLabs SRT exists.
- Do not route every project through `video-use`; use it only for raw/source video analysis or processing.
- Do not render before snapshot/pre-render QA.
- Do not run final QA before `factory:review-video` passes.
- Do not copy a renderer candidate to `renders/final.mp4` unless `renderer-comparison.md` names that same renderer as selected.
- Do not package before final QA.
- Do not treat a solved recurring failure as finished until the prevention path is recorded. Use `review/video-review/issue-log.md` during production and run `/ce-compound` after the fix is verified when recurrence risk exists.

## MVP Boundary

Do not create or call `hype-source-editor`. Source, rights, privacy, quote-accuracy, and copyright review are deferred.
