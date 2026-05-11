---
name: hype-writer-room
description: "Use in the hype_tuber workspace after creative-brief.md and draft-scene-packets.md to write approval-ready Korean narration and a scene contract in plan.md without starting TTS."
---

# Hype Writer Room

Write into the scene plan.

## Inputs

- `creative-brief.md`
- `draft-scene-packets.md`
- `research-pack.md`
- User tone constraints

## Output

Create or update `plan.md` with:

- overview
- voiceover script
- scene summary
- detailed scene plan
- approval gate

## Writing Rules

- Use Korean narration.
- Keep one idea per line.
- Match the chosen length band.
- Write lines that can support motion beats.
- Write into the selected scene route. If a scene is capture-led, the line should explain what the viewer is seeing. If a scene is imagegen-led, the line should carry the metaphor/emotion. If a scene is Hyperframes-led, the line should name the state change or mechanism.
- Preserve strong YouTube hooks and copy when useful.

## Handoff

Stop at user approval. TTS starts only after approval.

## Do Not

- Rewrite the angle unless the brief is incoherent.
- Write generic narration first and leave visual routing to implementation.
- Start ElevenLabs TTS.
- Review rights, privacy, quote accuracy, or source completeness.
