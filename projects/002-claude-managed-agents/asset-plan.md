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
| 01 | 0:00-0:12 | hook/problem | capture + hyperframes | Model vs system problem | webpage screenshot + HTML motion | https://wikidocs.net/blog/@jaehong/12977/, https://claude.com/blog/new-in-claude-managed-agents | | | capture/crop headline, build overload card | todo |
| 02 | 0:12-0:30 | context/cause | hyperframes | Three bottlenecks | HTML/SVG diagram | generated | | | build 3-panel failure board | todo |
| 03 | 0:30-0:52 | fix/explanation | capture + hyperframes | Dreaming | official screenshot + generated visual | https://claude.com/blog/new-in-claude-managed-agents | | | capture dreaming section, memory-card sorting animation | todo |
| 04 | 0:52-1:15 | fix/explanation | hyperframes | Outcomes | diagram/data | generated from official blog facts | | | rubric gate + benchmark counters | todo |
| 05 | 1:15-1:38 | fix/explanation | hyperframes | Multiagent orchestration | network diagram | generated from official blog examples | | | lead/subagent routing graph | todo |
| 06 | 1:38-2:05 | synthesis/diagram | hyperframes | Three-axis system | HTML/SVG diagram | generated | | | 3-axis lock-in animation | todo |
| 07 | 2:05-2:35 | case/data | capture + hyperframes | Team examples | case cards | Harvey, Netflix, Spiral, Wisedocs sections from Anthropic blog | | | card stack + counters | todo |
| 08 | 2:35-3:00 | takeaway | hyperframes | Model -> system | kinetic typography | generated | | | text replacement animation | todo |

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

- [ ] Downloaded or captured source
- [ ] Stored original under the correct asset folder
- [ ] Added useful link/file/candidate in `research-pack.md` or this file
- [ ] Cropped or normalized to project format
- [ ] Added highlight/callout if needed
- [ ] Added subtitle if spoken clip is used
- [ ] Checked caption safe zone
- [ ] Referenced from scene table in `plan.md`
- [ ] Confirmed this asset role fits the selected content pattern

## Interview Clip Checklist

- [ ] Speaker and role are clear
- [ ] Original URL is logged
- [ ] Timestamp range is logged
- [ ] Clip is short enough for commentary use
- [ ] Korean subtitle is burned or synced
- [ ] Key quote highlight does not collide with global captions
