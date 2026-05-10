# Design Context

## Project

- Project name: 버티컬 슬라이스 아키텍처를 사용해야하는 이유
- Collection date: 2026-05-10
- Output purpose: 바이브코딩에서 AI가 기능 맥락을 참고하기 쉬운 구조로 버티컬 슬라이스를 설명하는 약 3분 한국어 기술 해설 영상
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

- Color tokens: near-black background, warm orange slice accent, cyan focus/flow accent, muted gray layers, white Korean text
- Font choices: Korean sans-serif, bold display for section claims
- Visual mood: focused technical board, clean architecture diagram, no decorative screenshots
- Motion personality: one active idea at a time, previous context remains dimmed
- Caption safe zone: bottom safe-zone text-only captions from ElevenLabs SRT, no progress bar
- Primary visual strategy: HTML/SVG/GSAP diagrams comparing layer folders, scattered feature context, and feature slices
- Motion grammar: technical-grid + product-demo
- Liquid Glass use: focus lens on selected slice or active module only
- Reference anti-patterns: empty glass panels, random dots, decorative connector lines, tiny unreadable captures, all elements visible from start

## Scene Visual Density

Use this table before Hyperframes implementation. It prevents large empty panels and makes imagegen decisions explicit.

| Scene | Scene Recipe | Primary Visual Route | Visual Density | Reveal Mode | Motion Layer | Imagegen Role | Renderer Targets | Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | product/before-after-demo | hyperframes | standard | one-at-a-time | layer labels, role badges | not_required | hyperframes | existing layer structure, calm and neutral |
| 02 | product/before-after-demo | hyperframes | standard | one-at-a-time | benefit card reveal | not_required | hyperframes | acknowledge role separation benefits |
| 03 | explain/mechanism-state-machine | hyperframes | rich | one-at-a-time | context path jumps, missed file warning | not_required | hyperframes | related feature files are scattered |
| 04 | explain/mechanism-state-machine | hyperframes | rich | one-at-a-time | module grouping, slice boundary lock | not_required | hyperframes | feature slice groups related modules |
| 05 | explain/fan-out-fan-in | hyperframes | rich | one-at-a-time | focus lens scans modules | not_required | hyperframes | AI follows feature context inside one slice |
| 06 | product/before-after-demo | hyperframes | standard | one-at-a-time | benefit lanes, before/after ticks | not_required | hyperframes | three benefits appear sequentially |
| 07 | explain/mechanism-state-machine | hyperframes | standard | one-at-a-time | prompt type-in, scope lock | not_required | hyperframes | prompt rule must be readable |
| 08 | explain/mechanism-state-machine | hyperframes | rich | one-at-a-time | shared base lock, feature slices rise | not_required | hyperframes | common stays shared, features vertical |
| 09 | visual-essay/imagegen-cinematic-sequence | hyperframes | standard | one-at-a-time | final architecture lock | support | hyperframes | imagegen support only for thumbnail |

## Scene Visual Thesis

No scene should reach render without a visual thesis.

| Scene | Visual Thesis | Viewer Must Understand | Primary Visual Mechanism | Narration Verb | Motion Must Show | Primary Asset | Failure If |
|---|---|---|---|---|---|---|---|
| 01 | Layered structure is the familiar baseline. | The video is not saying old structures are simply wrong. | horizontal layer stack | divide | Controller/Service/Repository/Entity/DTO appear as roles | Hyperframes diagram | starts by attacking layers |
| 02 | Existing structures have real benefits. | Role separation helps humans and large teams. | benefit cards anchored to layers | clarify | benefits appear one at a time | Hyperframes diagram | no balanced setup |
| 03 | AI loses context when one feature is scattered. | A single feature can span many folders. | scattered file map | jump | context path jumps across folders | Hyperframes diagram | static file list only |
| 04 | Vertical slice groups one feature's flow. | Controller, service, repository, entity, DTO, and tests can sit near the feature. | module grouping into slice | group | related modules move into one boundary | Hyperframes diagram | definition only |
| 05 | A feature slice is easier for AI to inspect. | AI can follow the feature's input/process/output in one area. | focus lens scanning modules | inspect | lens moves through slice internals | Hyperframes diagram | cards only |
| 06 | The benefit is operational. | Short context, nearby files, narrow edits. | three benefit lanes | shorten/narrow | lanes activate sequentially | Hyperframes diagram | checklist all visible from start |
| 07 | Prompting should name the slice boundary. | Ask AI to work inside one feature slice. | prompt card with scope fence | limit | prompt locks inside boundary | Hyperframes diagram | prompt unreadable |
| 08 | Common layers still exist. | Shared auth/design/db config can remain shared. | shared base plus vertical slices | share/group | base remains, slices rise | Hyperframes diagram | implies everything goes into feature folders |
| 09 | Final rule is balanced. | Share common code, group features vertically, assign AI by slice. | final architecture lock | assign | whole structure locks | Hyperframes diagram | generic slogan |

## Constraints

- Forbidden styles: source stamps, tiny captures, random teal dots, broad decorative lines, global glassmorphism cards, caption progress bars
- Unknowns: exact TTS duration until ElevenLabs generation
