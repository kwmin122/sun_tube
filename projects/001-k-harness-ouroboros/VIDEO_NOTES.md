# VIDEO_NOTES

## Topic

K-harness Ouroboros: spec-first workflow engine before AI writes code.

## Sources

- GitHub README Korean: `source/README.ko.md`
- GitHub README English: `source/README.en.md`
- Original URL: `https://github.com/Q00/ouroboros/blob/main/README.ko.md`

## TTS

- Provider: ElevenLabs
- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output: `mp3_44100_128`
- Sync: ElevenLabs SRT, forced_alignment
- Secret source: `~/.codex/secrets/elevenlabs.env`

Generated files:

- `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- `voiceover/solo/voiceover-solo-elevenlabs.srt`
- `voiceover/solo/voiceover-solo-final-mix.m4a`
- `voiceover/solo/voiceover-solo-final-mix-no-bgm.m4a`
- `voiceover/solo/elevenlabs_manifest.json`

## Music

- BGM: `assets/bgm/default-bgm.mp3`
- Title: Glass Horizon
- Artist: loudsquaredance310
- Metadata note: made with suno
- Source format: MP3, 48kHz stereo, about 198s
- Method: mixed from `scripts/mix_voiceover_audio.mjs` rules
  - BGM volume: `0.16`
  - Ducking: `sidechaincompress` under narration
  - Loudness: `loudnorm=I=-16:LRA=11:TP=-1.5`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`
- No-BGM backup: `voiceover/solo/voiceover-solo-final-mix-no-bgm.m4a`

## Render

- Composition: `composition/index.html`
- Final MP4: `renders/k-harness-ouroboros-final.mp4`
- Snapshots: `composition/snapshots/`

## Verification

```bash
cd composition
npm run check
```

Result:

```text
lint: 0 errors, 3 structural warnings
inspect: 0 layout issues across 9 samples
```

The remaining warnings are maintainability warnings:

- `composition_file_too_large`
- `timeline_track_too_dense` for scene track
- `timeline_track_too_dense` for caption track

They do not block this render. For the next production iteration, split scenes and captions into sub-compositions.

```bash
npm run render -- -o ../renders/k-harness-ouroboros-final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration,size:stream=index,codec_type,codec_name,width,height,avg_frame_rate,sample_rate,channels -of json renders/k-harness-ouroboros-final.mp4
ffmpeg -y -i renders/k-harness-ouroboros-final.mp4 -af volumedetect -f null -
```

Verified:

```text
duration: 82.021s
video: h264, 1920x1080, 30fps
audio: aac, 48000 Hz, stereo
max_volume: -3.5 dB
```
