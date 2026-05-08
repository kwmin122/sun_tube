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
- [ ] Evidence/screenshots/interview asset pass complete
- [x] Script drafted
- [x] Scene table drafted
- [ ] User approved script and scene table
- [ ] ElevenLabs TTS generated
- [ ] ElevenLabs SRT generated
- [ ] `timed-scene-packets.md` created
- [x] Scene tool routes assigned from `TOOL_ROUTING_PIPELINE.md`
- [ ] Final audio mix generated
- [x] `video-use` processing complete if raw/interview/demo video is routed
- [ ] Composition implemented
- [ ] Hyperframes lint passed
- [ ] Hyperframes inspect passed
- [ ] Snapshot/pre-render QA passed
- [ ] MP4 rendered
- [ ] ffprobe checked
- [ ] Final QA passed
- [ ] Packaging directions drafted

## Optional Compatibility

- [ ] `source-notes.md` used if this project needs legacy source notes

## Current Gate

`review`

## Open Questions

- Approve the 3min information-delivery direction, script, and scene table?
- TTS is blocked until `project.json.approved.plan` is true.

## Commands

```bash
cd composition
npm run dev
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
