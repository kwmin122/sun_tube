---
name: hype-audio-producer
description: "Use in the hype_tuber workspace after user approval to generate ElevenLabs Korean TTS/SRT with the fixed Sam Hottman voice, prepare the final mix with Glass Horizon BGM, ducking, and SFX notes for Hyperframes timing."
---

# Hype Audio Producer

Own TTS, SRT, and mix notes.

## Inputs

- Approved `plan.md`
- `voiceover/solo/voiceover.txt`, display subtitle text, if created from the approved script
- `voiceover/solo/voiceover_elevenlabs_sam.txt`, spoken TTS text, if pronunciation differs from display text
- `timed-scene-packets.md`, for later mix/SFX notes

## TTS Standard

- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output: `mp3_44100_128`
- Secrets: `~/.codex/secrets/elevenlabs.env`
- Display text: `voiceover/solo/voiceover.txt`
- Spoken TTS text: `voiceover/solo/voiceover_elevenlabs_sam.txt`
- Audio: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- Timing SRT: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Display SRT: `voiceover/solo/voiceover-display.srt` and `assets/audio/voiceover-display.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`

## Subtitle Sync Standard

- Send `voiceover_elevenlabs_sam.txt` to ElevenLabs when pronunciation needs Korean-friendly readings such as "에이아이" or "코덱스 씨엘아이".
- Keep `voiceover.txt` as the on-screen subtitle text, such as "AI" or "Codex CLI".
- Display and spoken files must have the same non-empty line count; one line maps to one caption cue.
- Use ElevenLabs forced-alignment timing from the spoken audio, then replace only the cue text with `voiceover.txt`.
- Hyperframes/HTML must read `assets/audio/voiceover-display.srt`.
- Captions are text-only by default. Do not add caption progress bars.

## BGM

- Track: Glass Horizon
- Artist: loudsquaredance310
- Path: `assets/bgm/default-bgm.mp3`
- Volume: default `0.05`, voice-first ducking
- Use ducking under narration.

## Handoff

After MP3/SRT/display-SRT generation, hand off to `hype-scene-planner` for `timed-scene-packets.md`.

After timed packets, update audio/SFX and mix notes as needed.

## Do Not

- Put API keys in project `.env`.
- Generate TTS before user approval.
- Treat mock audio as final.
