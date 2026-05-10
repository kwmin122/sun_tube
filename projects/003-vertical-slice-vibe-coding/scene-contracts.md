# Scene Contracts

Owner: `hype-scene-planner` with `hype-creative-director` and `hype-motion-designer`

Purpose: prevent generic filler implementation. The renderer may only build the visual elements and motion beats listed here.

## Contract Rules

- If a field is missing, stop implementation and return to planning.
- Do not fill empty space with cards, decorative paths, dots, chips, glass panels, or generic progress bars unless explicitly listed.
- Captions are bottom safe-zone text-only from ElevenLabs SRT. No caption progress bar.
- Evidence frames must show the primary screen object without needing the narration to explain it.

## Scene 01

- Narration Clause: 예전에는 앱을 보통 레이어로 나눴습니다. 컨트롤러, 서비스, 레포지토리, 엔티티, 디티오가 각각 따로 있습니다.
- Primary Screen Object: neutral backend layer stack with Controller, Service, Repository, Entity, DTO.
- Viewer Must Understand: the old structure is a familiar layer-based baseline, not yet the villain.
- Allowed Visual Elements: horizontal layer bands, role badges, folder rail, section label `기존 레이어 구조`.
- Forbidden Fillers: random dots, floating lines, large glass cards, source captures, generic card grid.
- Motion Beats: title appears -> layer bands appear one by one -> role badges attach -> complete stack holds.
- Required State Change: empty grid becomes a readable layered architecture.
- Hold Rule: keep the full stack visible for Scene 02.
- Exit Rule: no hard exit; dim only when the benefit board becomes active.
- Implementation Markers: `data-scene="01"`, `data-layer-name`, `data-role-badge`, `data-progressive-disclosure="one-at-a-time"`.
- Evidence Frame Requirement: a snapshot must show all five layer names readable and calm.
- Fallback Policy: if the layer stack cannot be built, stop and return to planning; do not replace it with generic cards.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not add decorative motion or extra panels to make the scene feel full.

## Scene 02

- Narration Clause: 이 구조가 틀렸다는 말은 아닙니다. 역할이 분명하고, 규칙을 잡기 쉽고, 큰 팀이 관리하기 좋습니다.
- Primary Screen Object: benefit board anchored to the existing layer stack.
- Viewer Must Understand: layered architecture has real human/team benefits.
- Allowed Visual Elements: three benefit chips, check marks, dimmed layer stack, small role anchors.
- Forbidden Fillers: unrelated icons, new card columns, source captures, random chips, decorative connector lines.
- Motion Beats: 역할 분리 expands -> 규칙 expands -> 큰 팀 expands -> all benefits compress into badges.
- Required State Change: neutral layer stack gains concrete benefits one at a time.
- Hold Rule: previous benefits stay dimmed as context.
- Exit Rule: compress benefits before moving to the AI-context problem.
- Implementation Markers: `data-scene="02"`, `data-benefit`, `data-focus-item`, `data-layer-anchor`.
- Evidence Frame Requirement: one benefit is active and old architecture still reads as useful.
- Fallback Policy: if benefit anchoring is unclear, return to planning; do not make three standalone cards.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not imply layer architecture is bad before the AI-specific problem appears.

## Scene 03

- Narration Clause: 그런데 바이브코딩에서는 에이아이가 한 기능을 이해하려고 여러 폴더를 왔다 갔다 해야 합니다.
- Primary Screen Object: scattered signup feature file map.
- Viewer Must Understand: one feature can be spread across controller, service, repository, entity, DTO, and test folders.
- Allowed Visual Elements: file cards, folder zones, AI lens/cursor, context trail, missed DTO/test warning.
- Forbidden Fillers: long decorative paths, random network lines, glass panels, generic progress bars, source captures.
- Motion Beats: feature request appears -> related files highlight in different folders -> AI lens jumps 4-5 times -> context trail grows -> missed-file warning appears once.
- Required State Change: calm layer structure becomes a scattered feature-context problem.
- Hold Rule: visited files remain faintly lit so context growth is visible.
- Exit Rule: freeze the scattered map long enough to motivate the next grouping scene.
- Implementation Markers: `data-scene="03"`, `data-file-card`, `data-folder-zone`, `data-ai-lens`, `data-context-trail`.
- Evidence Frame Requirement: snapshot must show one feature split across several folders.
- Fallback Policy: if the scattered map cannot be built, return to planning; do not replace it with an abstract warning card.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not draw broad connector lines across the whole frame.

## Scene 04

- Narration Clause: 버티컬 슬라이스는 기술 레이어 기준이 아니라 사용자 기능 기준으로 코드를 묶는 방식입니다.
- Primary Screen Object: `features/signup/` vertical slice boundary.
- Viewer Must Understand: the same feature-related files can be placed near one feature flow.
- Allowed Visual Elements: slice boundary, mini folder tree, grouped module chips, lock tick, dim old-layer ghost.
- Forbidden Fillers: new unrelated feature cards, decorative glass panel, source capture, random particles.
- Motion Beats: scattered files gather -> mini tree forms -> slice boundary closes -> lock tick appears.
- Required State Change: scattered file cards become one feature slice.
- Hold Rule: keep a dim old-layer ghost behind the slice for contrast.
- Exit Rule: carry the locked slice into Scene 05.
- Implementation Markers: `data-scene="04"`, `data-slice-boundary`, `data-slice-file`, `data-boundary-lock`.
- Evidence Frame Requirement: snapshot must show related modules inside one slice folder.
- Fallback Policy: if grouping cannot be shown, return to planning; do not use a definition-only text card.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not present vertical slice as just another folder label.

## Scene 05

- Narration Clause: 그러면 에이아이가 한 폴더 안에서 무엇을 받고, 처리하고, 저장하고, 검증하는지 한 번에 따라갈 수 있습니다.
- Primary Screen Object: AI focus lens moving inside one feature slice.
- Viewer Must Understand: AI can inspect the feature flow without jumping across the whole app.
- Allowed Visual Elements: focus lens, input/process/output rail, module chips, `읽는 순서` indicator, dim outside modules.
- Forbidden Fillers: global glassmorphism, random teal dots, decorative scan overlay, unrelated cards.
- Motion Beats: lens enters slice -> controller highlights -> service highlights -> repository highlights -> entity/DTO highlights -> test highlights -> `맥락 한 번에` badge locks.
- Required State Change: disconnected modules become a visible local reading path.
- Hold Rule: scanned modules remain visible as a connected route.
- Exit Rule: dim the route after the final badge, not before.
- Implementation Markers: `data-scene="05"`, `data-focus-lens`, `data-slice-module`, `data-route-rail`.
- Evidence Frame Requirement: snapshot must show the lens and route inside only one slice.
- Fallback Policy: if the focus route cannot be built, stop; do not use a generic shine or blur effect.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not use liquid glass unless it is the actual focus lens.

## Scene 06

- Narration Clause: 컨텍스트는 짧아지고, 관련 파일은 가까워지고, 수정 범위는 좁아집니다.
- Primary Screen Object: three operational benefit lanes.
- Viewer Must Understand: the benefit is measurable operational narrowing, not a slogan.
- Allowed Visual Elements: token budget bar, file-distance ruler, blast-radius ring, locked result chips.
- Forbidden Fillers: three static cards, decorative lines, unrelated icons, broad glass panels.
- Motion Beats: context bar shrinks -> file distance ruler shortens -> blast-radius ring contracts -> result badges align.
- Required State Change: long/wide/far states visually become short/near/narrow states.
- Hold Rule: previous result locks as a small chip while the next lane activates.
- Exit Rule: all three result chips remain for the prompt-rule transition.
- Implementation Markers: `data-scene="06"`, `data-benefit-lane`, `data-before-after`, `data-metric-change`.
- Evidence Frame Requirement: snapshot must show at least one before/after metric change.
- Fallback Policy: if metrics cannot be represented, return to planning; do not use plain checklist cards.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not show all benefit lanes active from the start.

## Scene 07

- Narration Clause: 그래서 프롬프트도 앱 전체가 아니라 회원가입 슬라이스 안에서만 수정해달라고 말하는 게 낫습니다.
- Primary Screen Object: prompt editor inside a scope fence.
- Viewer Must Understand: prompt quality improves when the work boundary is a feature slice.
- Allowed Visual Elements: bad prompt line, good prompt line, scope fence, accepted file checklist, lock state.
- Forbidden Fillers: extra code blocks, random editor tabs, decorative progress bar, source capture.
- Motion Beats: broad prompt flashes -> broad prompt collapses -> good prompt types in -> scope fence closes -> checklist ticks.
- Required State Change: vague app-wide request becomes a slice-scoped task.
- Hold Rule: keep the good prompt dominant and readable.
- Exit Rule: remove or minimize the bad prompt after contrast is clear.
- Implementation Markers: `data-scene="07"`, `data-prompt-line`, `data-scope-fence`, `data-check-item`.
- Evidence Frame Requirement: snapshot must show the good prompt and the scope fence.
- Fallback Policy: if the prompt text cannot stay readable, stop and simplify; do not add more panels.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not keep both bad and good prompts equally prominent.

## Scene 08

- Narration Clause: 공통 인증, 공통 디자인 시스템, 데이터베이스 설정처럼 공유 레이어가 필요한 부분은 남겨야 합니다.
- Primary Screen Object: shared base plus vertical feature columns.
- Viewer Must Understand: vertical slice does not mean everything goes into feature folders.
- Allowed Visual Elements: shared base chips, signup/upload/payment slice columns, common lock marker, contrast labels.
- Forbidden Fillers: isolated feature cards without shared base, source capture, decorative grid overlay, random particles.
- Motion Beats: shared base appears -> common lock marker appears -> feature slices rise -> `공통은 공유` label appears -> `기능은 세로` label appears.
- Required State Change: shared infrastructure stays fixed while feature slices organize above it.
- Hold Rule: keep shared base visible through the whole scene.
- Exit Rule: carry this architecture into final payoff.
- Implementation Markers: `data-scene="08"`, `data-shared-base`, `data-feature-slice`, `data-common-lock`.
- Evidence Frame Requirement: snapshot must show shared base and feature slices at the same time.
- Fallback Policy: if the shared-base distinction is unclear, return to planning; do not render only feature columns.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not imply common auth/design/db config should be duplicated per slice.

## Scene 09

- Narration Clause: 공통은 공유하고, 기능은 세로로 묶고, 에이아이에게는 슬라이스 단위로 맡기세요.
- Primary Screen Object: final architecture lock with AI task cursor.
- Viewer Must Understand: the final operating rule is balanced: shared common core, vertical features, AI task by slice.
- Allowed Visual Elements: common base, feature slices, AI task cursor, three-beat final phrase, selected slice highlight.
- Forbidden Fillers: new summary card grid, random dots, decorative connector lines, generic final slogan screen.
- Motion Beats: common base selects -> feature slice selects -> AI cursor lands on one slice -> final phrase locks.
- Required State Change: architecture becomes an actionable AI work boundary.
- Hold Rule: keep Scene 08 architecture as dim background context.
- Exit Rule: hold final frame cleanly for end beat.
- Implementation Markers: `data-scene="09"`, `data-final-rule`, `data-ai-task-cursor`, `data-architecture-lock`.
- Evidence Frame Requirement: final frame must be understandable without narration.
- Fallback Policy: if final architecture lock cannot be built, stop; do not end with typography only.
- Generic Component Ban: Synthesis, CardGrid, StatPanel, GenericScene, FallbackScene, and TemplateScene are not allowed.
- If Missing, Do Not: do not add a generic CTA or unrelated imagegen background.
