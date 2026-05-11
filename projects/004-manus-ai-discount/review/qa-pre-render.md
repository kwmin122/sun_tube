# QA pre-render

Result: PASS

| Check | Result | Detail |
|---|---|---|
| project.json schema | PASS |  |
| plan approved | PASS | project.json.approved.plan must be true |
| timed scene packets approved | PASS | use --waive-timed-approval only for explicit test runs |
| display SRT exists | PASS | projects/004-manus-ai-discount/assets/audio/voiceover-display.srt |
| audioMix artifact complete | PASS |  |
| final mix exists | PASS | projects/004-manus-ai-discount/voiceover/solo/voiceover-solo-final-mix.m4a |
| route work orders done | PASS | done |
| route videoUse resolved | PASS | not_required |
| route imagegen resolved | PASS | not_required |
| route capture resolved | PASS | done |
| route hyperframes resolved | PASS | done |
| asset-plan rows complete | PASS | all rows done/implemented/qa_passed/not_required |
| timed-scene-packets rows resolved | PASS | caption/audio/status resolved |
| scene contract implementation validated | PASS | scene-contracts.md fields and implementation markers valid |
| work-orders rows complete | PASS | all work-orders implemented/qa_passed/not_required |
| work-orders required inputs present | PASS | route inputs present or not required |
| asset-plan/work-orders status aligned | PASS | completed asset rows have completed route work |
| hyperframes route done matches work-orders | PASS | hyperframes work-orders complete |
| rich visual density | PASS | rich scenes have rows and motion primitives |
| asset-plan has no blocking pending | PASS |  |
| timed-scene-packets has no blocking pending | PASS |  |
| capture manifest exists | PASS | projects/004-manus-ai-discount/assets/screenshots/capture_manifest.json |
| capture tasks exist | PASS | 2 task(s) |
| capture files exist | PASS | all captured files present |
| captured assets used in composition | PASS | all captured screenshots referenced |
| Hyperframes check | PASS | npm run check passed |
| scene snapshots refreshed | PASS | 20.0s, 33.0s, 45.0s, 62.0s, 78.0s, 90.0s, 102.0s |
| dense snapshots exist | PASS | 12 png files in projects/004-manus-ai-discount/composition/snapshots |
