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
- `review/video-review/video-review.md`, for final QA

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

- video review has passed
- MP4 exists
- duration is plausible
- video/audio streams are valid
- captions remain readable
- final mix exists when expected
- no blocking render errors
- `director-review.md` includes evidence frames and has no unresolved critical findings
- `review/video-review/issue-log.md` has no unresolved blocker

## Failure Learning

If QA previously passed a result that should have failed, treat that as a production-system bug.

After the fix is verified:

- mark the issue as resolved in `review/video-review/issue-log.md`
- if recurrence risk exists, run `/ce-compound`
- promote the prevention into QA rules, a role skill, or project instructions

Do not run `/ce-compound` for unresolved problems, simple typos, or one-off edits.

## Output

Update `status.md` with pre-render QA and final QA status.

## Do Not

- Review copyright, privacy, quote accuracy, missing sources, or rights risk in MVP.
- Replace `hype-video-reviewer`; rendered-frame editorial review must happen before final QA.
- Package before final QA passes.
