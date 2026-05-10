# Asset Plan

## Purpose

This file maps the script to real visual evidence, screenshots, B-roll, interview clips, diagrams, and processed Hyperframes assets.

Use `../../CONTENT_FACTORY_PIPELINE.md` first. This file is the per-project asset map, not a fixed edit template.

This MVP asset plan is not a rights, privacy, citation, or quote-accuracy review.

## Content Pattern

- Primary pattern: problem -> named method -> workflow -> before/after -> takeaway
- Secondary pattern, if any: tutorial checklist
- Primary content type: explain
- Secondary content types: tutorial, product
- Primary visual strategy: Hyperframes diagrams and motion primitives; no source screenshot required
- Renderer targets: hyperframes
- Why this pattern fits the topic: 버티컬 슬라이스는 말보다 도식과 흐름 애니메이션으로 이해가 빠르다.
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
| 01 | 0:00-0:13 | hook/problem | product/before-after-demo | hyperframes | not_required | no | 코드 양보다 검증 단위 | not_required | code mass -> slice cut | failed run badge | standard | title slam, slice cut | not_required | no | 코드가 너무 많아지는 위험 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 02 | 0:13-0:35 | problem/context | product/before-after-demo | hyperframes | not_required | no | UI/API/DB/Test partial | not_required | horizontal layer stack | failed run state | rich | layer reveal, partial badge | not_required | no | 레이어별 개발의 함정 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 03 | 0:35-0:55 | definition | explain/mechanism-state-machine | hyperframes | not_required | no | vertical slice through stack | not_required | vertical slice bar | layer lights | rich | slice pass, check marks | not_required | no | 사용자 흐름 하나를 끝까지 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 04 | 0:55-1:18 | demo | explain/mechanism-state-machine | hyperframes | not_required | no | Button -> API -> DB -> Success | not_required | signup packet route | active nodes | rich | packetFlow | not_required | no | 작은 흐름이 실제로 작동 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 05 | 1:18-1:43 | ai-fit | explain/fan-out-fan-in | hyperframes | not_required | no | narrow scope, short feedback | not_required | wide scatter vs scoped lane | scope fence | rich | scatter/loop contrast | not_required | no | AI는 좁은 목표에서 강함 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 06 | 1:43-2:05 | workflow | explain/mechanism-state-machine | hyperframes | not_required | no | Pick -> Define -> Build -> Run -> Lock | not_required | five-step loop | active lens | standard | stepper reveal | not_required | no | 실전 순서 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 07 | 2:05-2:27 | contrast | product/before-after-demo | hyperframes | not_required | no | many files vs working flow | not_required | before/after split | success path | rich | file pile, path pulse | not_required | no | 결과 차이 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 08 | 2:27-2:50 | action rule | explain/mechanism-state-machine | hyperframes | not_required | no | "이 흐름 하나만 끝까지" | not_required | prompt card | acceptance checks | standard | type-in, lock checks | not_required | no | AI 프롬프트 규칙 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |
| 09 | 2:50-3:08 | payoff | visual-essay/imagegen-cinematic-sequence | hyperframes | not_required | no | 작게 잘라서 끝까지 | not_required | final slice lock | thumbnail candidate optional | standard | kinetic phrase | support | no | 결론 문장 | HTML/SVG | composition | n/a | n/a | implement in Hyperframes | inputs_ready | inputs_ready |

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
