# Renderer Comparison

Verdict: PASS

Selected renderer: hyperframes

## Inputs

- Hyperframes render: `projects/002-claude-managed-agents/renders/final-hyperframes.mp4`
- Remotion render: `projects/002-claude-managed-agents/renders/final-remotion.mp4`
- Hyperframes review: `projects/002-claude-managed-agents/review/video-review/hyperframes-review.md`
- Remotion review: `projects/002-claude-managed-agents/review/video-review/remotion-review.md`
- Hyperframes contact sheet: `projects/002-claude-managed-agents/review/video-review/contact-sheet-hyperframes.jpg`
- Hyperframes frame manifest: `projects/002-claude-managed-agents/review/video-review/frame-manifest-hyperframes.json`

## Comparison Table

| Renderer | Status | Machine Verdict | Key Evidence | Decision |
|---|---|---|---|---|
| hyperframes | rendered V2 | PASS | 52 extracted frames, 13 motion-peak frames, no floating connector issues, capture downgraded to support where weak | selected |
| remotion | rendered V2 | PASS | smoother frame-based transitions, but weaker project design identity and less preferred final look | candidate only |

## Why Hyperframes Wins

- The user prefers the Hyperframes visual language for this project after the line/capture issues are removed.
- Full-width decorative connector paths were removed from the problem scenes; `line-quality-report-hyperframes.json` reports `pathDrawCount: 0` and no issues.
- Scene 03 no longer treats the source capture as the main explanation. The capture is a small support stamp; the Korean before/after memory board carries the actual concept.
- Scene 08, Scene 09, and Scene 13 now avoid the earlier broad crossing-line failure and use contained boards, lanes, tokens, and final messaging.
- Remotion remains useful as a candidate renderer and timing lab, but it is not promoted to the global default from this comparison.

## Non-Blocking Limitations

- Caption sync currently uses SRT duration and characters-per-second checks. It does not yet include Whisper or forced-alignment word timestamps.
- Hyperframes is still a recovery-quality final, not the ceiling for future premium motion graphics. Future work should split the large HTML composition and add stronger per-scene camera choreography.
- Remotion artifacts are kept for comparison, but `renders/final.mp4` must match the selected Hyperframes render.
