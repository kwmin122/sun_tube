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

| Scene | Time | Pattern Role | Tool Route | Narration Beat | Asset Type | Link / File / Candidate | Speaker / Role | Timestamp | Processing Needed | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:13.4 | direct hook | capture + hyperframes | Four updates | webpage screenshot + HTML motion | https://claude.com/blog/new-in-claude-managed-agents | | | captured official source page, placed screenshot in composition, built 4 feature cards | qa_passed |
| 02 | 0:13.4-0:22.4 | reframe | hyperframes | Smarter model -> better operating system | HTML/SVG diagram | generated | | | model card replaced by system card | qa_passed |
| 03 | 0:22.4-0:50.9 | feature/what | capture + hyperframes | Dreaming: what it does | official screenshot + generated visual | https://claude.com/blog/new-in-claude-managed-agents | | | captured official page, placed source screenshot with memory sorting cards | qa_passed |
| 04 | 0:50.9-1:19.4 | feature/when useful | hyperframes | Dreaming: when useful | diagram/data | Harvey section from Anthropic blog | | | rich memory stream, progress rail, context cards, scan fill | qa_passed |
| 05 | 1:19.4-1:55.9 | feature/what | hyperframes | Outcomes: what it does | diagram/data | generated from official blog facts | | | rubric gate + revision loop | qa_passed |
| 06 | 1:55.9-2:15.9 | feature/when useful | hyperframes | Outcomes: when useful | checklist diagram | generated from official blog facts | | | judge loop, rubric scan, status ticks | qa_passed |
| 07 | 2:15.9-2:55.9 | feature/what | hyperframes | Multiagent orchestration: what it does | network diagram | generated from official blog examples | | | lead/subagent routing graph with SVG paths | qa_passed |
| 08 | 2:55.9-3:17.4 | feature/when useful | hyperframes | Multiagent orchestration: when useful | parallel work diagram | Netflix section from Anthropic blog | | | fan-out/fan-in paths, route tokens, filled information rows | qa_passed |
| 09 | 3:17.4-3:45.4 | feature/what | hyperframes | Webhooks: what it does | callback diagram | https://platform.claude.com/docs/en/managed-agents/webhooks | | | event -> trigger -> action route pulse and particles | qa_passed |
| 10 | 3:45.4-4:08.0 | feature/when useful | hyperframes | Webhooks: when useful | event-chain diagram | generated from webhook docs | | | pipeline path draw, status ticks, scan fills | qa_passed |
| 11 | 4:08.0-4:34.9 | synthesis/diagram | hyperframes | Four-axis system | HTML/SVG diagram | generated | | | 4-axis lock-in animation | qa_passed |
| 12 | 4:34.9-5:11.4 | case/data | capture + hyperframes | Team examples | case cards | https://claude.com/blog/new-in-claude-managed-agents | | | captured official case section, placed screenshot with case cards | qa_passed |
| 13 | 5:11.4-5:33.9 | takeaway | hyperframes | Model -> system | kinetic typography | generated | | | text replacement animation | qa_passed |

## Material Rules

- Prefer useful product pages, docs, GitHub README, release notes, app store images, screenshots, public talks, and user-provided material.
- Keep useful links and candidates in `research-pack.md` or this file.
- For interviews or platform posts, keep clips short and use them only when they improve the scene.
- For interview clips, note speaker, role, and timestamp when available.
- Route raw/reference/interview/demo video through `video-use` when it needs analysis, trimming, transcript, subtitles, crop, or export.
- Route final HTML motion, captions, diagrams, and composition through Hyperframes.
- This project currently has no `video-use` scene because no raw/interview/demo video material is selected.
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
