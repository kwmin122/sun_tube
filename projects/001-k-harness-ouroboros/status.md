# Status

## Checklist

- [x] Topic received
- [x] `source-notes.md` created
- [x] `design-context.md` created
- [x] Research complete
- [x] Script drafted
- [x] Scene table drafted
- [x] User approved script and scene table by "끝까지 해라" instruction
- [x] ElevenLabs TTS generated
- [x] ElevenLabs SRT generated
- [x] Glass Horizon BGM copied to `assets/bgm/default-bgm.mp3`
- [x] Final audio mix generated with BGM volume `0.16` and ducking
- [x] Composition implemented
- [x] Hyperframes lint passed
- [x] Hyperframes inspect passed
- [x] Snapshot frames reviewed
- [x] MP4 rendered
- [x] ffprobe checked
- [x] Final review complete
- [x] Optional evidence/interview upgrade plan added in `asset-plan.md`
- [x] Universal content factory pattern selected for next upgrade pass

## Current Gate

`done`

## Open Questions

- None. Render complete at `renders/k-harness-ouroboros-final.mp4`.

## Post-Render Upgrade Notes

- Current render stays complete.
- `asset-plan.md` now defines the next upgrade pass: README screenshots, proof highlights, and one optional interview/quote beat if a source directly supports the thesis.

## Commands

```bash
python ~/.codex/skills/elevenlabs-tts/scripts/generate_elevenlabs_tts.py \
  --file voiceover.txt \
  --out-dir voiceover/solo \
  --audio voiceover-solo-elevenlabs.mp3 \
  --srt voiceover-solo-elevenlabs.srt

ffmpeg -y \
  -i voiceover/solo/voiceover-solo-elevenlabs.mp3 \
  -stream_loop -1 -i assets/bgm/default-bgm.mp3 \
  -filter_complex "[1:a]volume=0.16,atrim=0:81.827,afade=t=out:st=80.227:d=1.4[bgm];[bgm][0:a]sidechaincompress=threshold=0.025:ratio=8:attack=60:release=700[ducked];[0:a]volume=1.0[voice];[voice][ducked]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:LRA=11:TP=-1.5[out]" \
  -map "[out]" -c:a aac -b:a 192k \
  voiceover/solo/voiceover-solo-final-mix.m4a

cd composition
npm run check
npm run render -- -o ../renders/final.mp4 -q high -f 30

ffmpeg -y \
  -i renders/k-harness-ouroboros-final-no-bgm.mp4 \
  -i voiceover/solo/voiceover-solo-final-mix.m4a \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy \
  renders/k-harness-ouroboros-final.mp4
```
