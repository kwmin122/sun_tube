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
| asset-plan has no blocking pending | PASS |  |
| timed-scene-packets has no blocking pending | PASS |  |
| Hyperframes check | PASS | npm run check passed |
| snapshots exist | PASS | projects/002-claude-managed-agents/composition/snapshots |
