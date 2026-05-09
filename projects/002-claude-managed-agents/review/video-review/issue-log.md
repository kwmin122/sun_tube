# Video Issue Log

## Issues

| ID | Status | Severity | Scene/Area | Symptom | Root Cause | Fix | Verification Evidence | Compound Needed |
|---|---|---|---|---|---|---|---|---|
| VQA-001 | resolved | blocker | Hyperframes line quality | Final-looking render still had ugly free-floating connector lines | QA allowed `path-draw` without anchor metadata | Added review gate for unanchored paths and rejected Hyperframes candidate | `review/video-review/hyperframes-review.md` reports FAIL | yes |
| VQA-002 | resolved | blocker | Remotion review proxy | Remotion screen looked populated but machine review first reported one row per rich scene | Review HTML proxy did not describe actual visual rows | Added three `info-row` markers per scene in Remotion `prepare.mjs` output | `review/video-review/remotion-review.md` reports PASS | no |
| VQA-003 | resolved | warning | Caption sync | User reported captions felt late in previous render | Old candidate used legacy caption timing and no renderer-specific comparison | Remotion candidate declares `CAPTION_LEAD_SECONDS = 1.15`; caption report has no duration/CPS issues | `caption-sync-report-remotion.json` | yes |

## Compound Follow-Up

Run `/ce-compound` after the final package is verified if the team wants to preserve VQA-001 and VQA-003 as reusable prevention docs.
