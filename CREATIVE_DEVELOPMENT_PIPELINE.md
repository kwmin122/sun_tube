# Creative Development Pipeline

This is the MVP topic-to-render pipeline for `hype_tuber`.

Use this with `PRODUCTION_ROLES.md`. The factory is role-based, but the orchestrator runs only the roles needed for the current gate.

## Principle

Research is a material-development function in MVP.

It finds angle, scene material, links, interview candidates, image candidates, comparisons, and visual hooks. It is not a legal, privacy, quote-accuracy, or citation gate.

## Phase 1: Development

```text
topic input
-> hype-topic-producer
-> hype-research-desk
-> hype-showrunner
-> hype-creative-director
-> hype-scene-planner
-> draft-scene-packets
-> hype-writer-room
-> user approval
```

Required outputs:

- `research-pack.md`
- `creative-brief.md`
- `draft-scene-packets.md`
- `plan.md`
- `status.md`

Development pass conditions:

- Topic type, target viewer, and likely length band are clear.
- `research-pack.md` contains enough material to shape scenes.
- `creative-brief.md` chooses one main angle and structure.
- `draft-scene-packets.md` defines scene purpose before script writing.
- `plan.md` contains approval-ready narration and scene contract.
- User approval is recorded before TTS.

## Phase 2: Production

```text
hype-audio-producer
-> ElevenLabs TTS/SRT
-> hype-scene-planner
-> timed-scene-packets
-> scene tool routing
-> hype-asset-producer / hype-visual-director / hype-motion-designer / hype-audio-producer in parallel
```

Required outputs:

- `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- `voiceover/solo/voiceover-solo-elevenlabs.srt`
- `voiceover/solo/voiceover-solo-final-mix.m4a`
- `timed-scene-packets.md`
- `asset-plan.md`
- `design-context.md`
- Hyperframes composition changes

Production pass conditions:

- ElevenLabs SRT exists before exact timing decisions.
- `timed-scene-packets.md` maps each scene to actual SRT timing.
- Each scene has a primary tool route from `TOOL_ROUTING_PIPELINE.md`.
- Asset, visual, motion, and audio work can proceed in parallel by scene.
- All scene work points back to the approved `plan.md`.

## Phase 3: Finish

```text
hype-motion-designer assembly
-> hype-qa-editor snapshot/pre-render QA
-> render
-> hype-qa-editor final QA
-> hype-packaging-editor
```

Required outputs:

- snapshot frames
- render output in `renders/`
- final QA notes in `status.md`
- title, thumbnail, description, and pinned comment direction

Finish pass conditions:

- Dense scenes are snapshotted before final render.
- Captions are readable and do not collide with important visuals.
- Rendered MP4 has valid audio/video streams.
- Final QA passes before packaging.

## Scene Packet Split

Use two scene-packet layers.

### Draft Scene Packets

Created before script writing.

Purpose:

- define scene purpose
- choose content role
- identify material direction
- estimate visual approach
- give `writer-room` a structure to write into

Do not use draft packets for exact seconds, clip trims, or final animation timing.

### Timed Scene Packets

Created after ElevenLabs TTS/SRT.

Purpose:

- lock exact scene timing
- place captions and safe zones
- assign motion beats to spoken timing
- define clip trims and asset durations
- give production roles a scene-by-scene build instruction

Do not create timed packets without SRT.

## TTS/BGM Standard

- ElevenLabs Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output: `mp3_44100_128`
- Secrets: `~/.codex/secrets/elevenlabs.env`
- Original voice: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- Subtitle: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`
- BGM: Glass Horizon, loudsquaredance310, `assets/bgm/default-bgm.mp3`
- BGM volume: default `0.08`, voice-first ducking

Do not put the ElevenLabs API key in a project `.env`.

## MVP Exclusions

The following are deliberately out of scope:

- copyright risk review
- privacy review
- quote accuracy review
- missing-source review
- rights/risk columns
- `source-notes.md` as a required gate
- `hype-source-editor`

Keep `source-notes.md` only as an optional compatibility file for older projects.
