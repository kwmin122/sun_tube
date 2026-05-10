# AGENTS.md

## Workspace Rule

This workspace is for TTS-driven motion-animation YouTube production with Hyperframes.

Default workflow:

1. User gives a topic.
2. Agent uses the MVP role pipeline in `PRODUCTION_ROLES.md`, `CREATIVE_DEVELOPMENT_PIPELINE.md`, and `TOOL_ROUTING_PIPELINE.md`.
3. Research creates `research-pack.md` for material development, not legal/source review.
4. Creative roles create `creative-brief.md`, `draft-scene-packets.md`, and an approval-ready `plan.md`.
5. User reviews and approves the script and scene contract.
6. TTS is generated after approval.
7. Agent creates `timed-scene-packets.md` from ElevenLabs SRT, then creates and validates `scene-contracts.md` before assigning routes and running asset, visual, motion, and audio work by scene.
8. Agent assembles the Hyperframes composition, runs snapshot/pre-render QA, renders, runs video review, runs final QA, then prepares packaging.

Do not treat the production phase as editing a supplied talking-head video unless the user explicitly asks for that.

## Skill Rule

Do not apply `youtube-scene-director` in this workspace unless the user explicitly asks for that skill by name.

For short-form Korean scriptwriting, use the global `hype-shorts-script-style` skill.
Start scripts from the topic directly. Avoid broad essay-style prefaces unless the user asks for them.
When the user provides a reference Shorts video or transcript, analyze its caption cadence and reuse only the structure, not the wording or persona.
Write TTS-friendly pronunciations in the script, for example `GPT 5.5` as `지피티 오쩜오`, `500,000` as `오십만`, `50%` as `오십 퍼센트`, `6x` as `여섯 배`, `Claude` as `클로드`, and `Anthropic` as `앤스로픽`.

For TTS, use the global `elevenlabs-tts` skill.

For role-based topic-to-render orchestration, use the local `hype-*` role skills as needed. Do not run every role by default; `hype-production-orchestrator` chooses the smallest useful bundle for the current gate.

For tool routing, read `TOOL_ROUTING_PIPELINE.md`. Hyperframes is the default final composition/render path. Use `video-use` only when a scene needs raw/source video analysis, trimming, transcript, clip processing, or burned subtitles before importing the processed result into Hyperframes.

Renderer comparison uses one shared scene contract and separate `composition-hyperframes/` and `composition-remotion/` folders. Do not split interpretation by renderer-specific agents.

`scene-contracts.md` is the implementation authority. If it does not define primary screen object, allowed visual elements, forbidden fillers, motion beats, required state change, implementation markers, and evidence frame, do not fill the scene with generic cards, fades, dots, lines, glass panels, or fallback components. Return the scene to planning and run `npm run factory:validate-scene-contract -- <project-path>` before implementation.

`factory:review-video` produces frame evidence and machine reports only. Final PASS requires `director-review.md` with evidence and, when comparing renderers, `renderer-comparison.md`.

If a recurring failure is fixed and verified, consider `/ce-compound`; do not run it during unresolved debugging.

For motion design, animation, visual polish, Hyperframes composition, HTML/CSS/SVG/GSAP layout, or design review, read and apply the local workspace skill:

```text
skills/hyperframes-motion-design-guide/SKILL.md
```

For coding, folder scaffolding, implementation, debugging, review, and refactoring tasks, apply the global `karpathy-guidelines` skill.

## Quality Bar

Target output is high-quality kinetic typography and HTML/SVG motion graphics, comparable to the saved references:

- `/Users/a0000/Downloads/temp 3/1-janrdyonlnmvgdjmrqtg`
- `/Users/a0000/Downloads/이지.mov`

The preferred implementation style is:

- HTML/CSS/SVG/GSAP composition.
- Hyperframes for preview, inspect, snapshot, and MP4 rendering.
- `video-use` for raw/reference/source video analysis and clip preparation, not as the default final renderer.
- ElevenLabs TTS/SRT timestamps as the timing source.
- No exposed face footage in the final video by default. Exception: short public interviews, talks, or quote clips may be used only when approved in `asset-plan.md`.

## ElevenLabs TTS Standard

Read API credentials from:

```text
~/.codex/secrets/elevenlabs.env
```

Do not place ElevenLabs API keys in project `.env` files.

Current TTS standard:

- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output: `mp3_44100_128`
- Sync: ElevenLabs SRT, forced_alignment preferred
- Captions: text-only bottom safe-zone captions from SRT cue start/end; do not add caption progress bars unless the user explicitly asks.
- Motion reveal: do not reveal independent explanation elements in parallel. Complex scenes should show one active card/node/module at a time, with future items hidden and revealed items kept as lower-emphasis context.
- Original voice: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- Subtitle: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`

## Required Workspace And Project Files

Each project under `projects/{NNN-slug}/` should keep:

- `research-pack.md`: material leads, links, interview candidates, image candidates, and scene sparks.
- `creative-brief.md`: angle, length, tone, structure, and creative direction.
- `draft-scene-packets.md`: pre-script scene purpose, role, material direction, and visual intent.
- `plan.md`: approved script, scene table, visual direction, and motion notes.
- `timed-scene-packets.md`: post-TTS/SRT scene timing, captions, motion beats, and production instructions.
- `scene-contracts.md`: per-scene implementation contract that blocks generic filler and defines required markers/evidence.
- `status.md`: checklist and current production state.
- `source-notes.md`: optional compatibility notes for older source-focused projects; not an MVP gate.
- `design-context.md`: visual system, assets, references, caption safe zone, and uncertainty.
- `asset-plan.md`: scene-by-scene screenshots, B-roll, interview candidates, demos, data, generated visuals, and processing status.
- `source/`: user notes, research notes, and approved copy.
- `assets/`: audio, transcript, generated images, icons, and references.
- `composition/`: Hyperframes composition project.
- `renders/`: exported MP4/WebM/snapshots.

At the workspace root, keep `TOOL_ROUTING_PIPELINE.md` as the routing rulebook for Hyperframes, `video-use`, imagegen, capture, and media scripts.
