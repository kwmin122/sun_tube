# Renderer Comparison

Verdict: PASS

Selected renderer: remotion

## Inputs

- Hyperframes render: `projects/002-claude-managed-agents/renders/final-hyperframes.mp4`
- Remotion render: `projects/002-claude-managed-agents/renders/final-remotion.mp4`
- Hyperframes review: `projects/002-claude-managed-agents/review/video-review/hyperframes-review.md`
- Remotion review: `projects/002-claude-managed-agents/review/video-review/remotion-review.md`
- Remotion contact sheet: `projects/002-claude-managed-agents/review/video-review/contact-sheet-remotion.jpg`
- Remotion frame manifest: `projects/002-claude-managed-agents/review/video-review/frame-manifest-remotion.json`
- Synthetic DOM report: `projects/002-claude-managed-agents/review/video-review/synthetic-dom-report-remotion.json`

Note: MP4s, contact sheets, and scene frames are local delivery artifacts and are intentionally ignored by git. Finished files are copied to `~/Downloads`.

## Comparison Table

| Renderer | Status | Machine Verdict | Key Evidence | Decision |
|---|---|---|---|---|
| hyperframes | rendered | FAIL | `unanchored_path_draw`; legacy connector paths still lack anchor metadata | rejected |
| remotion | rendered V2 | PASS | 52 extracted frames, 13 scene motion-peak frames, synthetic DOM report clean, director evidence-backed PASS | selected |

## Why Remotion V2 Wins

- It uses scene-specific components instead of the previous generic `Synthesis`-style card fallback.
- It maps scene thesis to visible mechanisms: OS assembly, document zoom/highlight, rubric loop, fan-out/fan-in, event pipeline, and final convergence.
- It no longer relies on `prepare.mjs` visual-density proxy DOM. The review HTML is metadata-only and final QA checks the extracted MP4 frames.
- It keeps the previous subtitle lead adjustment and passes current SRT duration/CPS checks.

## Non-Blocking Limitations

- Caption sync currently uses SRT duration and characters-per-second checks. It does not yet include Whisper or forced-alignment word timestamps.
- Remotion is still a candidate renderer, not the default factory renderer. Future projects should compare again before changing defaults.
- V2 is a recovery-quality delivery candidate. Future premium work should strengthen camera choreography, kinetic typography, and scene-specific transition language.
