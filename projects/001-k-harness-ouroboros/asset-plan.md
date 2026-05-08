# Asset Plan

## Purpose

This maps the current K-harness Ouroboros script to visual evidence. The already-rendered version is motion/README-led; this file defines how to upgrade the next pass with screenshots and optional interview-style evidence.

This follows the universal factory model in `../../CONTENT_FACTORY_PIPELINE.md`. The selected primary pattern is `Claim -> Proof -> Explanation`, not the Dalbi rebuttal/interview pattern.

## Content Pattern

- Primary pattern: `Claim -> Proof -> Explanation`
- Secondary pattern: `Problem -> Cause -> Fix`
- Why this pattern fits: the topic is an open-source workflow engine, so README proof and animated process diagrams are stronger than commentary clips.
- Reference patterns used only as inspiration: evidence screenshot rhythm, caption-safe asset placement, short quote/authority beat if a direct source exists.

## Asset Directories

- `assets/evidence/`: official pages, articles, README screenshots, source documents
- `assets/screenshots/`: browser screenshots, UI screenshots, platform posts
- `assets/broll/`: metaphor or atmosphere clips
- `assets/interviews/originals/`: untouched downloaded interview/talk files
- `assets/interviews/processed/`: trimmed, cropped, subtitled interview clips
- `assets/demos/`: screen recordings, UI walkthroughs, CLI captures
- `assets/data/`: source charts, tables, rebuilt data visuals
- `assets/processed/`: crop-ready images, normalized clips, overlays, subtitle files

## Scene Asset Map

| Scene | Time | Pattern Role | Narration Beat | Asset Type | Source URL / File | Speaker / Role | Timestamp | Processing Needed | Rights / Risk | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:08 | hook/claim | AI 문제가 아니라 입력 문제 | metaphor + kinetic type | generated/owned motion | | | broken prompt, red X, caption safe zone | low | done in current render |
| 02 | 0:08-0:18 | proof/definition | Ouroboros 정의 | README proof screenshot | `source/README.ko.md` | | | crop README title/definition and highlight "명세 우선" | low | planned for evidence pass |
| 03 | 0:18-0:31 | explanation/diagram | 소크라테스식 인터뷰 | diagram | `source/README.ko.md` | | | question stack + interview node | low | done in current render |
| 04 | 0:31-0:43 | proof/data | Ambiguity gate | README proof screenshot + gauge | `source/README.ko.md` | | | crop threshold line, animate gauge to `<=0.2` | low | planned for evidence pass |
| 05 | 0:43-0:57 | process/diagram | Double Diamond 실행 | diagram | `source/README.ko.md` | | | Double Diamond flow reveal | low | done in current render |
| 06 | 0:57-1:09 | proof/evaluation | Mechanical/Semantic/Consensus 평가 | README proof screenshot + gates | `source/README.ko.md` | | | crop evaluation list, light three gates | low | planned for evidence pass |
| 07 | 1:09-end | takeaway | 진화 루프와 takeaway | loop diagram | `source/README.ko.md` | | | loop stroke + final quote | low | done in current render |

## Optional Quote / Interview-Style Upgrade

No interview clip is currently approved for this video. If we add one, it is only an optional quote asset inside the selected pattern. It should not turn the video into a rebuttal/commentary structure.

The quote must support the exact thesis: "AI coding fails when the input/spec is vague."

Candidate types to research before download:

- a public talk/interview from the Ouroboros/K-harness maintainer, if one exists
- a public software-engineering or AI-coding talk where the speaker explicitly says specifications, requirements, or evaluation gates matter before code generation
- a short maintainer quote from GitHub README/issues/discussions, if no real video interview exists

Use only a `2-6s` clip or quote card. Put it after Scene 01 or Scene 04, where the viewer already understands the problem.

## Interview Clip Checklist

- [ ] Speaker and role are clear
- [ ] Original URL is logged
- [ ] Timestamp range is logged
- [ ] Exact quote or paraphrase is logged
- [ ] Clip is short enough for commentary use
- [ ] Korean subtitle is burned or synced
- [ ] Key quote highlight does not collide with global captions
- [ ] Rights / platform risk is marked

## Current Status

The current final MP4 can stay as-is. This plan is for the next upgrade pass where we mix real README screenshots, proof highlights, and one optional interview/quote beat into the existing Hyperframes motion style.
