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
- `scene-contracts.md`
- `asset-plan.md`
- `work-orders/*.md`
- `composition/index.html`

## Command

```bash
npm run factory:review-video -- <project-path>
```

This command extracts evidence and runs machine checks. It does not grant final approval.

## Review Standard

Check the finished video like an editing director, not just a file validator.

- Captions: SRT exists, timing is plausible, captions do not linger too short/long, and final caption duration matches the MP4.
- Scene contract: each scene visually supports the purpose in `timed-scene-packets.md`.
- Scene contract compliance: rendered frames should match the primary screen object, allowed elements, motion beats, state change, and evidence requirement in `scene-contracts.md`.
- Forbidden fillers: flag any visual that appears to fill empty space but is not allowed by the scene contract.
- Generic fallback: fail scenes that use generic card/grid/stat/fallback compositions when the contract requires a custom primary object.
- Asset presence: routes marked complete in `asset-plan.md` and `work-orders/*.md` appear in the composition or rendered frames.
- Capture fit: a capture route must be primary evidence, use a useful crop, and take at least one half-side of the frame. Small source stamps are treated as weak support, not a completed capture route.
- Visual density: rich scenes must avoid empty panels and include readable rows, route lines, tokens, counters, scans, or comparable information.
- Motion quality: avoid repeated static cards or identical fade/stagger scenes; diagrams should use path draw, pulse, scan, count-up, or sequential reveals where useful.
- Line quality: block full-width decorative connector SVGs that float across panels, cross labels, or do not anchor to specific cards. Prefer short card-anchored arrows, rows, tokens, or contained micro-lines.
- Route transparency: state whether `imagegen`, `capture`, `video-use`, and Hyperframes were required or not. Missing imagegen is fine only when the route is explicitly `not_required`.
- YouTube pacing: flag long dead zones, weak hook frames, caption overlap, and visuals that feel like unfinished slides.

## Director Review Gate

After running `factory:review-video`, inspect the contact sheet and start/mid/end scene frames before writing `director-review.md`.

`director-review.md` is the packaging gate:

- `Verdict: PASS` means the video can proceed to final QA.
- `Verdict: FAIL` means package must stay blocked.
- Critical rows must have `Resolved` set to `yes`, `pass`, `resolved`, `done`, or `fixed`.

Never change `director-review.md` to PASS just because `video-review.md` has a machine PASS. PASS requires visual judgment across the axes below:

- Scene Intent
- Visual Thesis
- Motion Purpose
- Motion Variety
- Asset Fit
- Empty Feel
- YouTube Rhythm
- Caption Sync
- Capture Utility

## Imagegen Role

Judge imagegen per scene. Do not globally force it on or off.

- `primary`: generated image is the scene's core explanation, emotion, reenactment, future scenario, metaphor, or visual hook.
- `support`: generated image is mood, texture, atmosphere, transition, opening styleframe, or thumbnail candidate.
- `not_required`: official docs, UI capture, interview, data, exact text, or HTML/SVG diagram is clearer.

For the current Claude Managed Agents video, most body scenes are HTML/SVG/GSAP first, so imagegen is usually `support` or `not_required`. Other topics may legitimately use imagegen as `primary`.

## Output

Write under `review/video-review/`:

- `video-review.md`
- `fix-list.md`
- `director-review.md`
- `scene-frame-notes.md`
- `frame-manifest.json`
- `caption-sync-report.json`
- `caption-config-report.json`
- `capture-utility-report.json`
- `motion-density-report.json`
- `asset-presence-report.json`
- `line-quality-report.json`
- `route-transparency-report.json`
- `frames/`
- `scene-frames/`
- `suspicious-frames/`
- `contact-sheet.jpg`

`video-review.md` and `director-review.md` must both pass before final QA and packaging. This role does not review source rights, privacy, or copyright risk.

## Renderer Comparison Review

When both Hyperframes and Remotion candidates exist:

- inspect `contact-sheet-hyperframes.jpg` and `contact-sheet-remotion.jpg`
- compare `hyperframes-review.md` and `remotion-review.md`
- write `renderer-comparison.md`
- select exactly one renderer for `renders/final.mp4`
- record any blocked renderer honestly

Selection rule: default to Hyperframes when it has clearer scene identity, stronger design consistency, and no line/capture blockers. Select Remotion only when the rendered frames are visibly better, not merely smoother.

Never give PASS just because a render exists. PASS requires evidence frames and no unresolved critical findings.
