---
name: hype-scene-planner
description: "Use in the hype_tuber workspace to create draft-scene-packets.md before script writing and timed-scene-packets.md after ElevenLabs SRT, mapping each scene to purpose, material direction, timing, captions, motion beats, and handoffs."
---

# Hype Scene Planner

Own scene packets.

## Draft Scene Packets

Create before `hype-writer-room`.

Inputs:

- `research-pack.md`
- `creative-brief.md`

Output:

- `draft-scene-packets.md`

Include:

- estimated duration
- pattern role
- scene purpose
- material direction
- expected visual
- writer guidance

Do not invent exact seconds.

## Timed Scene Packets

Create after approved script and ElevenLabs SRT.

Inputs:

- `plan.md`
- `voiceover/solo/voiceover-solo-elevenlabs.srt`
- `draft-scene-packets.md`

Optional references:

- `asset-plan.md`, if already drafted
- `design-context.md`, if already drafted

If optional references are missing, create `timed-scene-packets.md` from the approved plan, SRT, and draft scene packets first. Asset, visual, motion, and audio roles can expand their files afterward.

Output:

- `timed-scene-packets.md`

Include:

- exact time range
- SRT line mapping
- tool route from `TOOL_ROUTING_PIPELINE.md`
- caption behavior
- asset timing
- motion beats
- audio/SFX notes
- snapshot timestamp

## Do Not

- Write final narration.
- Start production before user approval and SRT.
- Perform source or rights review.
