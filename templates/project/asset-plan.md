# Asset Plan

## Purpose

This file maps the script to real visual evidence, screenshots, B-roll, interview clips, diagrams, and processed Hyperframes assets.

Use `../../CONTENT_FACTORY_PIPELINE.md` first. This file is the per-project asset map, not a fixed edit template.

This MVP asset plan is not a rights, privacy, citation, or quote-accuracy review.

## Content Pattern

- Primary pattern:
- Secondary pattern, if any:
- Primary content type:
- Secondary content types:
- Primary visual strategy:
- Renderer targets:
- Why this pattern fits the topic:
- Reference patterns used only as inspiration:
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

Status values:

- `planned`: route and visual role are known, but inputs are not ready.
- `inputs_ready`: files, links, script beats, or design notes are ready for implementation.
- `implemented`: composition or processed asset has been created.
- `qa_passed`: pre-render QA has confirmed the row and matching work order.
- `blocked`: input, implementation, or QA problem must be resolved first.

| Scene | Time | Pattern Role | Scene Recipe | Tool Route | Capture Role | Useful Crop | Viewer Reads What | Reroute If Weak | Primary Visual | Support Visual | Visual Density | Motion Layer | Imagegen Role | Evidence Needed | Narration Beat | Asset Type | Link / File / Candidate | Speaker / Role | Timestamp | Processing Needed | Implementation Status | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | | claim/proof/context | | capture | primary_evidence | yes | exact source detail | diagram if unreadable | proof screenshot | HTML highlight | standard | screenshot highlight | not_required | yes | | proof screenshot | | | | crop, highlight | planned | planned |
| 02 | | diagram/demo/data | | hyperframes | not_required | no | diagram explains the idea | not_required | diagram | texture/styleframe | rich | path draw, row reveal | support | no | | diagram | | | | HTML/SVG build | planned | planned |
| 03 | | quote/context | | video-use | not_required | no | interview quote | not_required | interview clip | lower third | standard | clip trim, subtitle | not_required | no | | interview clip | | | | trim, subtitle, crop | planned | planned |

## Material Rules

- Prefer useful product pages, docs, GitHub README, release notes, app store images, screenshots, public talks, and user-provided material.
- Keep useful links and candidates in `research-pack.md` or this file.
- For interviews or platform posts, keep clips short and use them only when they improve the scene.
- For interview clips, note speaker, role, and timestamp when available.
- Route raw/reference/interview/demo video through `video-use` when it needs analysis, trimming, transcript, subtitles, crop, or export.
- Route final HTML motion, captions, diagrams, and composition through Hyperframes.
- Classify imagegen per scene as `primary`, `support`, or `not_required`.
- `primary`: generated image carries the scene's core explanation, emotion, reenactment, future scenario, metaphor, or visual hook.
- `support`: generated image provides mood texture, abstract style frame, thumbnail, transition, or non-factual atmosphere around another primary visual.
- `not_required`: official UI/docs/interview/data, exact text, or HTML/SVG/capture is clearer than a generated image.
- Do not use imagegen for official UI evidence or precise text-heavy diagrams that should be HTML/SVG/capture.
- Dense explainer scenes should not be large empty panels. If `Visual Density` is `rich`, include information rows, tokens, paths, counters, scan fills, or other visible state changes.
- A route is not complete until the selected renderer shows it in actual frame evidence. File existence, work-order status, and synthetic DOM markers are not enough.
- Capture routes must crop/highlight a narrated concept; otherwise reroute the scene to diagram, imagegen support, or another primary route.
- Capture role values: `primary_evidence`, `support_texture`, `not_required`, `reroute_to_diagram`.
- If a capture is technically correct but visually unhelpful, downgrade it: `primary_evidence -> support_texture -> not_required -> reroute_to_diagram`.
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
