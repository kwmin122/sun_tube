# Scene Packet Format

Owner: `hype-scene-planner`

Use this as the common schema for `draft-scene-packets.md` and `timed-scene-packets.md`.

## Draft Scene Packet

Created before script writing.

Use for:

- scene purpose
- content role
- material direction
- expected visual idea
- writer-room guidance

Do not use for:

- exact seconds
- final clip trim
- final motion timing

## Timed Scene Packet

Created after ElevenLabs TTS/SRT.

Use for:

- exact scene time range
- SRT line mapping
- caption placement
- asset duration
- motion beat timing
- clip trim instructions
- snapshot timestamp

Do not create without SRT.

## Common Fields

```text
Scene:
Purpose:
Pattern role:
Narration function:
Viewer should understand:
Primary visual:
Asset role:
Motion verb:
Caption behavior:
Audio/SFX:
Handoff:
```
