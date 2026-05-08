---
name: hype-audio-producer
description: "Use in the hype_tuber workspace after user approval to generate ElevenLabs Korean TTS/SRT with the fixed Sam Hottman voice, prepare the final mix with Glass Horizon BGM, ducking, and SFX notes for Hyperframes timing."
---

# Hype Audio Producer

Own TTS, SRT, and mix notes.

## Inputs

- Approved `plan.md`
- `voiceover.txt`, if created from the approved script
- `timed-scene-packets.md`, for later mix/SFX notes

## TTS Standard

- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output: `mp3_44100_128`
- Secrets: `~/.codex/secrets/elevenlabs.env`
- Audio: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- SRT: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`

## BGM

- Track: Glass Horizon
- Artist: loudsquaredance310
- Path: `assets/bgm/default-bgm.mp3`
- Volume: default `0.08`, voice-first ducking
- Use ducking under narration.

## Handoff

After MP3/SRT generation, hand off to `hype-scene-planner` for `timed-scene-packets.md`.

After timed packets, update audio/SFX and mix notes as needed.

## Do Not

- Put API keys in project `.env`.
- Generate TTS before user approval.
- Treat mock audio as final.
