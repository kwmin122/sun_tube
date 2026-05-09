# Route Work Orders

| Scene | Time | Route | Input | Action | Status |
|---|---|---|---|---|---|
| 01 | 0:00-0:13.4 | capture | https://claude.com/blog/new-in-claude-managed-agents | captured official source page, placed screenshot in composition, built 4 feature cards | qa_passed |
| 01 | 0:00-0:13.4 | hyperframes | https://claude.com/blog/new-in-claude-managed-agents | captured official source page, placed screenshot in composition, built 4 feature cards | qa_passed |
| 02 | 0:13.4-0:22.4 | hyperframes | generated | model card replaced by system card | qa_passed |
| 03 | 0:22.4-0:50.9 | capture | https://claude.com/blog/new-in-claude-managed-agents | captured official page, placed source screenshot with memory sorting cards | qa_passed |
| 03 | 0:22.4-0:50.9 | hyperframes | https://claude.com/blog/new-in-claude-managed-agents | captured official page, placed source screenshot with memory sorting cards | qa_passed |
| 04 | 0:50.9-1:19.4 | hyperframes | Harvey section from Anthropic blog | rich memory stream, progress rail, context cards, scan fill | qa_passed |
| 05 | 1:19.4-1:55.9 | hyperframes | generated from official blog facts | rubric gate + revision loop | qa_passed |
| 06 | 1:55.9-2:15.9 | hyperframes | generated from official blog facts | judge loop, rubric scan, status ticks | qa_passed |
| 07 | 2:15.9-2:55.9 | hyperframes | generated from official blog examples | lead/subagent routing graph with SVG paths | qa_passed |
| 08 | 2:55.9-3:17.4 | hyperframes | Netflix section from Anthropic blog | fan-out/fan-in paths, route tokens, filled information rows | qa_passed |
| 09 | 3:17.4-3:45.4 | hyperframes | https://platform.claude.com/docs/en/managed-agents/webhooks | event -> trigger -> action route pulse and particles | qa_passed |
| 10 | 3:45.4-4:08.0 | hyperframes | generated from webhook docs | pipeline path draw, status ticks, scan fills | qa_passed |
| 11 | 4:08.0-4:34.9 | hyperframes | generated | 4-axis lock-in animation | qa_passed |
| 12 | 4:34.9-5:11.4 | capture | https://claude.com/blog/new-in-claude-managed-agents | captured official case section, placed screenshot with case cards | qa_passed |
| 12 | 4:34.9-5:11.4 | hyperframes | https://claude.com/blog/new-in-claude-managed-agents | captured official case section, placed screenshot with case cards | qa_passed |
| 13 | 5:11.4-5:33.9 | hyperframes | generated | text replacement animation | qa_passed |
