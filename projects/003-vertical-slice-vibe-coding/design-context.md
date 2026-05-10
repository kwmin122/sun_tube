# Design Context

## Project

- Project name: 버티컬 슬라이스 아키텍처를 사용해야하는 이유
- Collection date: 2026-05-10
- Output purpose: 바이브코딩에서 검증 가능한 작업 단위를 설명하는 약 3분 한국어 기술 해설 영상
- Format: 1920x1080 horizontal
- Target viewer: AI 코딩 도구로 앱을 만드는 개발자, 1인 빌더, 팀 리드
- Viewing situation: YouTube desktop/mobile horizontal playback
- Primary content type: explain
- Secondary content types: tutorial, product
- Renderer targets: hyperframes

## Sources And Assets

- Official source links: not required
- Logo path: not required
- Product image path: not required
- UI screenshot path: not required
- Reference path: internal vertical-slide style and existing Hyperframes motion primitives

## Visual System

- Color tokens: near-black background, warm orange slice accent, cyan success/flow accent, muted gray layers, white Korean text
- Font choices: Korean sans-serif, bold display for section claims
- Visual mood: focused technical board, clean diagram, no decorative screenshots
- Motion personality: one active idea at a time, previous context remains dimmed
- Caption safe zone: bottom safe-zone text-only captions from ElevenLabs SRT, no progress bar
- Primary visual strategy: HTML/SVG/GSAP diagrams showing slice, flow, loop, and before/after
- Motion grammar: technical-grid + product-demo
- Liquid Glass use: focus lens on selected slice or active step only
- Reference anti-patterns: empty glass panels, random dots, decorative connector lines, tiny unreadable captures, all elements visible from start

## Scene Visual Density

Use this table before Hyperframes implementation. It prevents large empty panels and makes imagegen decisions explicit.

| Scene | Scene Recipe | Primary Visual Route | Visual Density | Reveal Mode | Motion Layer | Imagegen Role | Renderer Targets | Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | product/before-after-demo | hyperframes | standard | one-at-a-time | title slam, slice cut | not_required | hyperframes | code mass should collapse into one slice |
| 02 | product/before-after-demo | hyperframes | rich | one-at-a-time | layer reveal, failed run state | not_required | hyperframes | show UI/API/DB/Test as partial layers |
| 03 | explain/mechanism-state-machine | hyperframes | rich | one-at-a-time | vertical slice through layers | not_required | hyperframes | definition plus immediate mechanism |
| 04 | explain/mechanism-state-machine | hyperframes | rich | one-at-a-time | packetFlow, active node | not_required | hyperframes | signup flow packet moves end-to-end |
| 05 | explain/fan-out-fan-in | hyperframes | rich | one-at-a-time | scope fence, scatter vs loop | not_required | hyperframes | compare wide prompt with scoped slice |
| 06 | explain/mechanism-state-machine | hyperframes | standard | one-at-a-time | active lens stepper | not_required | hyperframes | five-step workflow |
| 07 | product/before-after-demo | hyperframes | rich | one-at-a-time | before/after split, path pulse | not_required | hyperframes | many files vs working flow |
| 08 | explain/mechanism-state-machine | hyperframes | standard | one-at-a-time | type-in prompt, lock checks | not_required | hyperframes | prompt rule must be readable |
| 09 | visual-essay/imagegen-cinematic-sequence | hyperframes | standard | one-at-a-time | final phrase lock | support | hyperframes | imagegen support only for thumbnail |

## Scene Visual Thesis

No scene should reach render without a visual thesis.

| Scene | Visual Thesis | Viewer Must Understand | Primary Visual Mechanism | Narration Verb | Motion Must Show | Primary Asset | Failure If |
|---|---|---|---|---|---|---|---|
| 01 | Too much AI code makes verification harder. | More generated code is not automatically progress. | code mass cut into a thin slice | cut | huge scope becomes one slice | Hyperframes diagram | big text only |
| 02 | Horizontal layers create many partials. | Layer-by-layer work can leave every layer unfinished. | stacked layer board | stack/fail | each layer appears as partial, run fails | Hyperframes diagram | all layers appear at once |
| 03 | A vertical slice cuts through the stack. | One user flow should reach UI/API/DB/Test. | vertical slice bar | connect | slice passes through all layers | Hyperframes diagram | definition only |
| 04 | A small flow must actually run. | Button to success is one connected path. | packet route through nodes | send/save/confirm | packet reaches success | Hyperframes diagram | nodes are static |
| 05 | AI performs better with narrow scope. | Smaller slice means shorter feedback loop. | wide scatter vs fenced lane | narrow/loop | scatter fails, scoped loop succeeds | Hyperframes diagram | AI hype without mechanism |
| 06 | The method is repeatable. | Pick, define, implement, run, lock. | active stepper | choose/run/lock | one step active at a time | Hyperframes diagram | checklist all visible from start |
| 07 | File count is not working value. | One working flow beats many unfinished files. | before/after split | compare | file pile vs green runnable path | Hyperframes diagram | contrast too small |
| 08 | Prompt scope must be explicit. | Ask AI to finish this one slice only. | prompt card and checks | limit/verify | scope boundary locks | Hyperframes diagram | prompt unreadable |
| 09 | The takeaway is operational. | Build small, finish end-to-end, repeat. | final slice lock | finish | slice closes and check locks | Hyperframes diagram | generic slogan |

## Constraints

- Forbidden styles: source stamps, tiny captures, random teal dots, broad decorative lines, global glassmorphism cards, caption progress bars
- Unknowns: exact TTS duration until ElevenLabs generation
