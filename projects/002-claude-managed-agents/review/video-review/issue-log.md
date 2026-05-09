# Video Issue Log

## Issues

| ID | Status | Severity | Scene/Area | Symptom | Root Cause | Fix | Verification Evidence | Compound Needed |
|---|---|---|---|---|---|---|---|---|
| VQA-001 | resolved | blocker | Hyperframes line quality | Final-looking render still had ugly free-floating connector lines | QA allowed `path-draw` without anchor metadata | Added review gate for unanchored paths and rejected Hyperframes candidate | `review/video-review/hyperframes-review.md` reports FAIL | yes |
| VQA-002 | superseded | blocker | Remotion review proxy | Remotion screen looked populated but machine review first reported one row per rich scene | Review HTML proxy did not describe actual visual rows | Superseded by VQA-004; synthetic visual-density proxy markers are no longer valid QA evidence | `composition-remotion/index.html` is metadata-only and `synthetic-dom-report-remotion.json` is clean | yes |
| VQA-003 | resolved | warning | Caption sync | User reported captions felt late in previous render | Old candidate used legacy caption timing and no renderer-specific comparison | Remotion candidate declares `CAPTION_LEAD_SECONDS = 1.15`; caption report has no duration/CPS issues | `caption-sync-report-remotion.json` | yes |
| VQA-004 | resolved | blocker | Review gate / Remotion V2 | User identified that the selected final still had empty-looking panels, unclear scene meaning, weak capture use, and generic motion | PASS relied partly on synthetic QA DOM markers from `prepare.mjs` and generic scene templates instead of rendered-frame quality evidence | Revoked PASS, blocked synthetic DOM false positives, rebuilt Remotion V2 with scene-specific visual-thesis compositions | `director-review.md` PASS cites Remotion V2 rendered frames; `renderer-comparison.md` selects Remotion V2 | yes |

## Compound Follow-Up

Run `/ce-compound` after the final package is verified if the team wants to preserve VQA-001, VQA-003, and VQA-004 as reusable prevention docs.
