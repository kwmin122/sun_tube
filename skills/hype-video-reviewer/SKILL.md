---
name: hype-video-reviewer
description: "Review a rendered hype_tuber MP4 before final QA by checking frames, captions, scene intent, asset presence, empty panels, and motion variety."
---

# Hype Video Reviewer

Use after Hyperframes render and before final QA/package.

## Inputs

- `project.json`
- `renders/final.mp4`
- `voiceover/solo/voiceover-solo-elevenlabs.srt`
- `timed-scene-packets.md`
- `asset-plan.md`
- `work-orders/*.md`
- `composition/index.html`

## Command

```bash
npm run factory:review-video -- <project-path>
```

## Review Standard

Check the finished video like an editing director, not just a file validator.

- Captions: SRT exists, timing is plausible, captions do not linger too short/long, and final caption duration matches the MP4.
- Scene contract: each scene visually supports the purpose in `timed-scene-packets.md`.
- Asset presence: routes marked complete in `asset-plan.md` and `work-orders/*.md` appear in the composition or rendered frames.
- Visual density: rich scenes must avoid empty panels and include readable rows, route lines, tokens, counters, scans, or comparable information.
- Motion quality: avoid repeated static cards or identical fade/stagger scenes; diagrams should use path draw, pulse, scan, count-up, or sequential reveals where useful.
- YouTube pacing: flag long dead zones, weak hook frames, caption overlap, and visuals that feel like unfinished slides.

## Output

Write under `review/video-review/`:

- `video-review.md`
- `fix-list.md`
- `frame-manifest.json`
- `caption-sync-report.json`
- `motion-density-report.json`
- `asset-presence-report.json`
- `frames/`
- `contact-sheets/`

`video-review.md` must be `PASS` before final QA and packaging. This role does not review source rights, privacy, or copyright risk.
