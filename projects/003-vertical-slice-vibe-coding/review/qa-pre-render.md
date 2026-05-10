# QA pre-render

Result: PASS

| Check | Result | Detail |
|---|---|---|
| project.json schema | PASS |  |
| plan approved | PASS | project.json.approved.plan must be true |
| timed scene packets approved | PASS | use --waive-timed-approval only for explicit test runs |
| SRT exists | PASS | projects/003-vertical-slice-vibe-coding/voiceover/solo/voiceover-solo-elevenlabs.srt |
| audioMix artifact complete | PASS |  |
| final mix exists | PASS | projects/003-vertical-slice-vibe-coding/voiceover/solo/voiceover-solo-final-mix.m4a |
| route work orders done | PASS | done |
| route videoUse resolved | PASS | not_required |
| route imagegen resolved | PASS | not_required |
| route capture resolved | PASS | not_required |
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
| Hyperframes check | PASS | npm run check passed |
| scene snapshots refreshed | PASS | 7.5s, 25.0s, 47.5s, 72.5s, 100.0s, 126.5s, 150.5s, 174.0s, 192.5s |
| dense snapshots exist | PASS | 14 png files in projects/003-vertical-slice-vibe-coding/composition/snapshots |
