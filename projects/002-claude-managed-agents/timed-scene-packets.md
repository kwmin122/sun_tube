# Timed Scene Packets

Owner: `hype-scene-planner`

Status: pending user approval and ElevenLabs SRT.

Do not use this file for production yet. Exact timing, SRT line mapping, caption behavior, and final tool routes must be filled after:

- `plan.md` is approved by the user
- `voiceover/solo/voiceover-solo-elevenlabs.srt` exists
- `voiceover/solo/voiceover-solo-final-mix.m4a` exists

## Required Inputs After Approval

- `plan.md`
- `voiceover/solo/voiceover-solo-elevenlabs.srt`
- `voiceover/solo/voiceover-solo-final-mix.m4a`
- `draft-scene-packets.md`

Optional references:

- `asset-plan.md`
- `design-context.md`
- `../../TOOL_ROUTING_PIPELINE.md`

## Timing Table

| Scene | Time Range | SRT Lines | Tool Route | Caption Behavior | Primary Asset | Motion Beat | Audio/SFX | Snapshot Time |
|---|---|---|---|---|---|---|---|---|
| 01 | pending | pending | capture + hyperframes | pending | Wikidocs/Anthropic screenshot candidate | pending | pending | pending |
| 02 | pending | pending | hyperframes | pending | model-to-system reframe diagram | pending | pending | pending |
| 03 | pending | pending | capture + hyperframes | pending | dreaming section screenshot + memory diagram | pending | pending | pending |
| 04 | pending | pending | hyperframes | pending | outcomes quality gate diagram | pending | pending | pending |
| 05 | pending | pending | hyperframes | pending | multiagent routing graph | pending | pending | pending |
| 06 | pending | pending | hyperframes | pending | webhook callback diagram | pending | pending | pending |
| 07 | pending | pending | hyperframes | pending | 4-axis system diagram | pending | pending | pending |
| 08 | pending | pending | capture + hyperframes | pending | team case cards | pending | pending | pending |
| 09 | pending | pending | hyperframes | pending | kinetic typography | pending | pending | pending |

## Current Routing Note

No scene currently requires `video-use` because no raw, interview, talk, demo, or reference video clip is selected. If a raw video source is added later, route only that source clip through `video-use` before importing the processed asset into Hyperframes.
