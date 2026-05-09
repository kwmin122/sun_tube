# Status

## Checklist

- [ ] Topic received
- [ ] `research-pack.md` created
- [ ] `creative-brief.md` created
- [ ] `draft-scene-packets.md` created
- [ ] `design-context.md` created
- [ ] `asset-plan.md` created
- [ ] Content pattern selected
- [ ] Material research complete
- [ ] Evidence/screenshots/interview asset pass complete
- [ ] Script drafted
- [ ] Scene table drafted
- [ ] User approved script and scene table
- [ ] ElevenLabs TTS generated
- [ ] ElevenLabs SRT generated
- [ ] `timed-scene-packets.md` created
- [ ] Scene tool routes assigned from `TOOL_ROUTING_PIPELINE.md`
- [ ] Final audio mix generated
- [ ] `video-use` processing complete if raw/interview/demo video is routed
- [ ] Composition implemented
- [ ] Hyperframes lint passed
- [ ] Hyperframes inspect passed
- [ ] Snapshot/pre-render QA passed
- [ ] MP4 rendered
- [ ] Frame/video machine review generated
- [ ] Director review passed
- [ ] ffprobe checked
- [ ] Final QA passed
- [ ] Packaging directions drafted

## Optional Compatibility

- [ ] `source-notes.md` used if this project needs legacy source notes

## Canonical Artifact Keys

These keys are completion flags in `project.json.artifacts`, not file-existence checks.

- `researchPack`
- `creativeBrief`
- `draftScenePackets`
- `plan`
- `tts`
- `audioMix`
- `timedScenePackets`
- `assetPlan`
- `designContext`
- `composition`
- `render`
- `videoReview`
- `directorReview`

## Current Gate

`idea`

## Open Questions

- None yet.

## Commands

```bash
cd composition
npm run dev
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
