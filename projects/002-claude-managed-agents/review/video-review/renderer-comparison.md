# Renderer Comparison

Verdict: PASS

Selected renderer: remotion

## Inputs

- Hyperframes render: `projects/002-claude-managed-agents/renders/final-hyperframes.mp4`
- Remotion render: `projects/002-claude-managed-agents/renders/final-remotion.mp4`
- Hyperframes review: `projects/002-claude-managed-agents/review/video-review/hyperframes-review.md`
- Remotion review: `projects/002-claude-managed-agents/review/video-review/remotion-review.md`
- Remotion contact sheet: `projects/002-claude-managed-agents/review/video-review/contact-sheet-remotion.jpg`

Note: MP4s, contact sheets, and scene frames are local delivery artifacts and are intentionally ignored by git. The finished files are copied to `~/Downloads`.

## Comparison Table

| Renderer | Status | Machine Verdict | Key Evidence | Decision |
|---|---|---|---|---|
| hyperframes | rendered | FAIL | `unanchored_path_draw`; legacy connector paths still lack anchor metadata | rejected |
| remotion | rendered | PASS | caption config OK, no floating connector issues, rich scenes have metadata rows and motion markers | selected |

## Why Remotion Won

- It renders from the same timed scene contract but uses scene-local frame control.
- Scene 07-10 route motion is represented as lane/rail flow instead of free-floating decorative curves.
- The review gate generated renderer-specific evidence without overwriting the other renderer.
- It has `CAPTION_LEAD_SECONDS = 1.15`, while the Hyperframes candidate still carries legacy path problems.

## Non-Blocking Limitations

- Caption sync currently uses SRT duration and characters-per-second checks. It does not yet include Whisper or forced-alignment word timestamps.
- Remotion is still a candidate renderer, not the default factory renderer. Future projects should compare again before changing defaults.
