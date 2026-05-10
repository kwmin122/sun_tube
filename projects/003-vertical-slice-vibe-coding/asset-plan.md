# Asset Plan

## Purpose

This file maps the script to real visual evidence, screenshots, B-roll, interview clips, diagrams, and processed Hyperframes assets.

Use `../../CONTENT_FACTORY_PIPELINE.md` first. This file is the per-project asset map, not a fixed edit template.

This MVP asset plan is not a rights, privacy, citation, or quote-accuracy review.

## Content Pattern

- Primary pattern: existing structure -> AI context limitation -> vertical slice reframe -> prompt rule -> balanced takeaway
- Secondary pattern, if any: tutorial rule
- Primary content type: explain
- Secondary content types: tutorial, product
- Primary visual strategy: Hyperframes diagrams; no source screenshot required
- Renderer targets: hyperframes
- Why this pattern fits the topic: 버티컬 슬라이스는 폴더 구조와 기능 맥락을 도식으로 보여줄 때 가장 빠르게 이해된다.
- Reference patterns used only as inspiration: vertical slide, one active idea at a time
- Research pack: `research-pack.md`
- Timed scene packets: `timed-scene-packets.md`
- Tool routing rules: `../../TOOL_ROUTING_PIPELINE.md`

## Asset Directories

- `assets/evidence/`: not required for current body
- `assets/screenshots/`: not required for current body
- `assets/broll/`: optional thumbnail/mood only
- `assets/interviews/`: not required
- `assets/interviews/originals/`: not required
- `assets/interviews/processed/`: not required
- `assets/demos/`: not required
- `assets/data/`: not required
- `assets/processed/`: generated render-side overlays if needed

## Scene Asset Map

Status values:

- `planned`: route and visual role are known, but inputs are not ready.
- `inputs_ready`: files, links, script beats, or design notes are ready for implementation.
- `implemented`: composition or processed asset has been created.
- `qa_passed`: pre-render QA has confirmed the row and matching work order.
- `blocked`: input, implementation, or QA problem must be resolved first.

| Scene | Time | Pattern Role | Scene Recipe | Tool Route | Capture Role | Useful Crop | Viewer Reads What | Reroute If Weak | Primary Visual | Support Visual | Visual Density | Motion Layer | Imagegen Role | Evidence Needed | Narration Beat | Asset Type | Link / File / Candidate | Speaker / Role | Timestamp | Processing Needed | Implementation Status | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:15 | setup | product/before-after-demo | hyperframes | not_required | no | 기존 UI/API/Service/DB 구조 | not_required | layer stack | role badges | standard | layer labels | not_required | no | 기존에는 앱을 레이어로 나눔 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 02 | 0:15-0:35 | balance | product/before-after-demo | hyperframes | not_required | no | 역할 분리, 규칙, 큰 팀 | not_required | benefit cards | layer anchor | standard | benefit reveal | not_required | no | 기존 구조의 장점 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 03 | 0:35-1:00 | problem | explain/mechanism-state-machine | hyperframes | not_required | no | 한 기능 관련 파일이 흩어짐 | not_required | scattered file map | missed warning | rich | context path jumps | not_required | no | AI가 여러 폴더를 오감 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 04 | 1:00-1:25 | definition | explain/mechanism-state-machine | hyperframes | not_required | no | feature slice groups related modules | not_required | feature slice folder | boundary lock | rich | module grouping | not_required | no | 기능 흐름 기준으로 묶음 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 05 | 1:25-1:55 | ai-fit | explain/fan-out-fan-in | hyperframes | not_required | no | AI can inspect one feature context | not_required | module cluster | focus lens | rich | lens scan | not_required | no | AI가 한 기능 맥락을 따라감 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 06 | 1:55-2:18 | benefits | product/before-after-demo | hyperframes | not_required | no | 짧은 컨텍스트 / 가까운 파일 / 좁은 수정 | not_required | three benefit lanes | before/after ticks | standard | lane activation | not_required | no | 세 가지 장점 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 07 | 2:18-2:43 | prompt-rule | explain/mechanism-state-machine | hyperframes | not_required | no | 이 슬라이스 안에서만 수정 | not_required | prompt card | scope fence | standard | type-in, lock checks | not_required | no | 프롬프트 규칙 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 08 | 2:43-3:05 | caveat | explain/mechanism-state-machine | hyperframes | not_required | no | 공통은 공유, 기능은 세로 | not_required | shared base + feature slices | base lock | rich | shared base and slice rise | not_required | no | 공유 레이어는 남김 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 09 | 3:05-3:20 | payoff | visual-essay/imagegen-cinematic-sequence | hyperframes | not_required | no | 공통은 공유하고 기능은 세로로 | not_required | final architecture lock | thumbnail candidate optional | standard | kinetic phrase | support | no | 결론 문장 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |

## Material Rules

- Body scenes use Hyperframes diagrams, not screenshots.
- Do not add official source capture labels unless the captured page explains the narration and occupies at least one half-side.
- Classify imagegen as `support` only for thumbnail or atmosphere; it is not required for body scenes.
- Dense explainer scenes should not be large empty panels. Use rows, packets, state badges, active nodes, or before/after contrast.
- A route is not complete until the selected renderer shows it in actual frame evidence.
- Captions are text-only from ElevenLabs SRT with no progress bar.

## Processing Checklist

- [x] Body route decided: Hyperframes
- [x] Capture not required for body
- [x] Imagegen body role not required
- [x] Caption safe zone protected in design context
- [ ] Composition implemented
- [ ] Pre-render QA passed
- [ ] Rendered frame evidence checked

## Interview Clip Checklist

- [x] Not required for this project
