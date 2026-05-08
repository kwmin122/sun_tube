# QA pre-render

Result: PASS

| Check | Result | Detail |
|---|---|---|
| project.json schema | PASS |  |
| plan approved | PASS | project.json.approved.plan must be true |
| timed scene packets approved | PASS | use --waive-timed-approval only for explicit test runs |
| SRT exists | PASS | projects/002-claude-managed-agents/voiceover/solo/voiceover-solo-elevenlabs.srt |
| audioMix artifact complete | PASS |  |
| final mix exists | PASS | projects/002-claude-managed-agents/voiceover/solo/voiceover-solo-final-mix.m4a |
| route work orders done | PASS | done |
| route videoUse resolved | PASS | not_required |
| route imagegen resolved | PASS | not_required |
| route capture resolved | PASS | done |
| asset-plan rows complete | PASS | all rows done/not_required |
| timed-scene-packets rows resolved | PASS | caption/audio/status resolved |
| asset-plan has no blocking pending | PASS |  |
| timed-scene-packets has no blocking pending | PASS |  |
| capture manifest exists | PASS | projects/002-claude-managed-agents/assets/screenshots/capture_manifest.json |
| capture tasks exist | PASS | 3 task(s) |
| capture files exist | PASS | all captured files present |
| captured assets used in composition | PASS | all captured screenshots referenced |
| Hyperframes check | PASS | npm run check passed |
| scene snapshots refreshed | PASS | 6.7s, 17.9s, 36.6s, 65.2s, 97.7s, 125.9s, 155.9s, 186.7s, 211.4s, 236.7s, 261.4s, 293.1s |
| dense snapshots exist | PASS | 26 png files in projects/002-claude-managed-agents/composition/snapshots |
