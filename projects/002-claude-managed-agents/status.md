# Status

## Checklist

- [x] Topic received
- [x] `research-pack.md` created
- [x] `creative-brief.md` created
- [x] `draft-scene-packets.md` created
- [x] `design-context.md` created
- [x] `asset-plan.md` created
- [x] Content pattern selected
- [x] Material research complete
- [x] Evidence/screenshots/interview asset pass complete
- [x] Script drafted
- [x] Scene table drafted
- [x] User approved script and scene table
- [x] ElevenLabs TTS generated
- [x] ElevenLabs SRT generated
- [x] `timed-scene-packets.md` created
- [x] Scene tool routes assigned from `TOOL_ROUTING_PIPELINE.md`
- [x] Final audio mix generated
- [x] `video-use` processing complete if raw/interview/demo video is routed
- [x] Composition implemented
- [x] Hyperframes lint passed
- [x] Hyperframes inspect passed
- [x] Snapshot/pre-render QA passed
- [x] MP4 rendered
- [x] ffprobe checked
- [x] Final QA passed
- [x] Packaging directions drafted

## Optional Compatibility

- [ ] `source-notes.md` used if this project needs legacy source notes

## Current Gate

`done`

## Open Questions

- Final render completed at about 5min34s.
- Packaging directions generated.

## Commands

```bash
cd composition
npm run dev
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
