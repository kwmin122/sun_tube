---
name: hype-qa-editor
description: "Use in the hype_tuber workspace to run snapshot/pre-render QA and final QA for Hyperframes videos, checking captions, readability, scene timing, dense frames, render validity, audio/video streams, and packaging readiness."
---

# Hype QA Editor

Own visual and render QA.

## Inputs

- Hyperframes composition
- `timed-scene-packets.md`
- `plan.md`
- snapshots
- rendered MP4, for final QA

## Pre-Render QA

Check:

- dense scene snapshots
- caption overlap
- text clipping
- readable screenshots
- scene timing vs timed packets
- missing assets
- obvious visual hierarchy failures

Do this before render.

## Final QA

Check:

- MP4 exists
- duration is plausible
- video/audio streams are valid
- captions remain readable
- final mix exists when expected
- no blocking render errors

## Output

Update `status.md` with pre-render QA and final QA status.

## Do Not

- Review copyright, privacy, quote accuracy, missing sources, or rights risk in MVP.
- Package before final QA passes.
