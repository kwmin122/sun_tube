# Asset Plan

## Purpose

This file maps the script to real visual evidence, screenshots, B-roll, interview clips, diagrams, and processed Hyperframes assets.

Use `../../CONTENT_FACTORY_PIPELINE.md` first. This file is the per-project asset map, not a fixed edit template.

This MVP asset plan is not a rights, privacy, citation, or quote-accuracy review.

## Content Pattern

- Primary pattern: Problem -> Cause -> Fix
- Secondary pattern, if any: Claim -> Proof -> Explanation, Comparison / Versus
- Why this pattern fits the topic: The topic reframes agent reliability as a system-design problem rather than a feature list.
- Reference patterns used only as inspiration: claim -> diagram -> case cards -> takeaway
- Research pack: `research-pack.md`
- Timed scene packets: `timed-scene-packets.md`
- Tool routing rules: `../../TOOL_ROUTING_PIPELINE.md`

## Asset Directories

- `assets/evidence/`: official pages, articles, README screenshots, source documents
- `assets/screenshots/`: browser screenshots, UI screenshots, platform posts
- `assets/broll/`: metaphor or atmosphere clips
- `assets/interviews/`: short interview or talk clips
- `assets/interviews/originals/`: untouched downloaded interview/talk files
- `assets/interviews/processed/`: trimmed, cropped, subtitled interview clips
- `assets/demos/`: screen recordings, UI walkthroughs, CLI captures
- `assets/data/`: source charts, tables, rebuilt data visuals
- `assets/processed/`: crop-ready images, normalized clips, overlays, subtitle files

## Scene Asset Map

| Scene | Time | Pattern Role | Tool Route | Capture Role | Useful Crop | Viewer Reads What | Reroute If Weak | Narration Beat | Asset Type | Link / File / Candidate | Speaker / Role | Timestamp | Processing Needed | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:13.4 | direct hook | capture + hyperframes | primary_evidence | yes | official announcement context plus four Korean feature cards | hyperframes summary card | Four updates | webpage screenshot + HTML motion | https://claude.com/blog/new-in-claude-managed-agents | | | half-width source page capture plus 4 feature cards | qa_passed |
| 02 | 0:13.4-0:22.4 | reframe | hyperframes | not_required | no | operating-system reframe | not_required | Smarter model -> better operating system | HTML/SVG diagram | generated | | | model card replaced by system card | qa_passed |
| 03 | 0:22.4-0:50.9 | feature/what | hyperframes | not_required | no | Korean memory board explains the concept | not_required | Dreaming: what it does | HTML motion diagram | generated | | | official capture removed; Korean memory sorting board is primary | qa_passed |
| 04 | 0:50.9-1:19.4 | feature/when useful | hyperframes | not_required | no | memory stream diagram | not_required | Dreaming: when useful | diagram/data | Harvey section from Anthropic blog | | | rich memory stream, progress rail, context cards, scan fill | qa_passed |
| 05 | 1:19.4-1:55.9 | feature/what | hyperframes | not_required | no | rubric gate and judge split | not_required | Outcomes: what it does | diagram/data | generated from official blog facts | | | rubric gate + revision loop | qa_passed |
| 06 | 1:55.9-2:15.9 | feature/when useful | hyperframes | not_required | no | criteria -> score -> revision loop | not_required | Outcomes: when useful | checklist diagram | generated from official blog facts | | | judge loop, rubric scan, status ticks | qa_passed |
| 07 | 2:15.9-2:55.9 | feature/what | hyperframes | not_required | no | lead/subagent delegation | not_required | Multiagent orchestration: what it does | network diagram | generated from official blog examples | | | lead/subagent routing graph with packet motion | qa_passed |
| 08 | 2:55.9-3:17.4 | feature/when useful | hyperframes | not_required | no | fan-out/fan-in worker lanes | not_required | Multiagent orchestration: when useful | parallel work diagram | Netflix section from Anthropic blog | | | fan-out/fan-in lanes, route tokens, filled information rows | qa_passed |
| 09 | 3:17.4-3:45.4 | feature/what | hyperframes | not_required | no | event -> trigger -> action state rail | not_required | Webhooks: what it does | callback diagram | https://platform.claude.com/docs/en/managed-agents/webhooks | | | event -> trigger -> action rail and packets | qa_passed |
| 10 | 3:45.4-4:08.0 | feature/when useful | hyperframes | not_required | no | automation workflow cards | not_required | Webhooks: when useful | event-chain diagram | generated from webhook docs | | | status ticks, scan fills | qa_passed |
| 11 | 4:08.0-4:34.9 | synthesis/diagram | hyperframes | not_required | no | four capabilities converge into one OS | not_required | Four-axis system | HTML/SVG diagram | generated | | | 4-axis convergence rails | qa_passed |
| 12 | 4:34.9-5:11.4 | case/data | capture + hyperframes | primary_evidence | yes | official case section plus named case cards | case cards only | Team examples | case cards | https://claude.com/blog/new-in-claude-managed-agents | | | captured official case section, placed screenshot with case cards | qa_passed |
| 13 | 5:11.4-5:33.9 | takeaway | hyperframes | not_required | no | final question and four operating levers | not_required | Model -> system | kinetic typography | generated | | | final question with operating levers | qa_passed |

## Material Rules

- Prefer useful product pages, docs, GitHub README, release notes, app store images, screenshots, public talks, and user-provided material.
- Keep useful links and candidates in `research-pack.md` or this file.
- For interviews or platform posts, keep clips short and use them only when they improve the scene.
- For interview clips, note speaker, role, and timestamp when available.
- Route raw/reference/interview/demo video through `video-use` when it needs analysis, trimming, transcript, subtitles, crop, or export.
- Route final HTML motion, captions, diagrams, and composition through Hyperframes.
- This project currently has no `video-use` scene because no raw/interview/demo video material is selected.
- Capture role values: `primary_evidence`, `support_texture`, `not_required`, `reroute_to_diagram`.
- Scene 03 intentionally removes the official capture route; the primary explanation is the Korean Hyperframes memory-sorting board.
- If a capture route is selected, it must be primary evidence with a useful crop and at least half-side visual presence in the composition. Small source stamps are not a valid capture route.
- Do not force a reference video's edit order onto an unrelated topic.

## Processing Checklist

- [x] Downloaded or captured source
- [x] Stored original under the correct asset folder
- [x] Added useful link/file/candidate in `research-pack.md` or this file
- [x] Cropped or normalized to project format
- [x] Added highlight/callout if needed
- [x] Added subtitle if spoken clip is used
- [x] Checked caption safe zone
- [x] Referenced from scene table in `plan.md`
- [x] Confirmed this asset role fits the selected content pattern

## Interview Clip Checklist

- [ ] Speaker and role are clear
- [ ] Original URL is logged
- [ ] Timestamp range is logged
- [ ] Clip is short enough for commentary use
- [ ] Korean subtitle is burned or synced
- [ ] Key quote highlight does not collide with global captions
