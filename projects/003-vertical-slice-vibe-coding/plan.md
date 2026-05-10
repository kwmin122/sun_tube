# 버티컬 슬라이스 아키텍처를 사용해야하는 이유

## Overview

- **Goal**: 바이브코딩에서 버티컬 슬라이스 아키텍처가 필요한 이유를 약 3분 안팎으로 설명하는 한국어 정보 전달 영상
- **Target viewer**: AI 코딩 도구로 앱을 만드는 개발자, 1인 빌더, 팀 리드
- **Duration**: 약 3분 8초 예상
- **Format**: 1920x1080 horizontal
- **Tone**: direct, practical, technical explainer
- **Visual style**: `../../shared/DESIGN.md`
- **Motion design guide**: `../../skills/hyperframes-motion-design-guide/SKILL.md`
- **Content factory**: `../../CONTENT_FACTORY_PIPELINE.md`
- **Production roles**: `../../PRODUCTION_ROLES.md`
- **Creative pipeline**: `../../CREATIVE_DEVELOPMENT_PIPELINE.md`
- **Tool routing**: `../../TOOL_ROUTING_PIPELINE.md`
- **Primary content pattern**: problem -> named method -> workflow -> before/after -> takeaway
- **Research pack**: `research-pack.md`
- **Creative brief**: `creative-brief.md`
- **Draft scene packets**: `draft-scene-packets.md`
- **Timed scene packets**: `timed-scene-packets.md`
- **Source notes**: `source-notes.md` optional compatibility notes
- **Design context**: `design-context.md`
- **Asset plan**: `asset-plan.md`
- **Approval state**: approved by `factory:approve-plan`

## Current Production Gate

- `project.json.approved.plan` passed the approval gate.
- ElevenLabs TTS may run only after this approval gate has passed.
- If this script or `scene-contracts.md` feels too shallow, return to planning. Do not compensate in implementation with extra cards, dots, lines, glass panels, or generic fades.

## Latest Visual Rules

- Body scenes use Hyperframes diagrams only. No body source capture unless the capture is the primary explanation object and takes at least half of one side of the frame.
- Captions are text-only from ElevenLabs forced-alignment SRT. No caption progress bar.
- Show one explanation unit at a time. Do not reveal every layer/card/lane at once.
- Once an element is introduced, keep it as stable context unless the scene contract explicitly exits it.
- No random dots, decorative connector lines, broad glass panels, static gradient capsules, or generic card-grid filler.
- Motion must prove the narration verb: split, jump, gather, scan, shrink, lock, select.

## Research Pack Summary

- Best angle lead: 기존 레이어 구조는 장점이 있지만, 바이브코딩에서는 AI가 기능 맥락을 한 번에 참고하기 쉬운 버티컬 슬라이스가 더 유리하다.
- Strongest material: layer/module structure vs feature-slice structure comparison.
- Interview/image/demo candidates: no interview, no body imagegen, Hyperframes diagram animation.
- Open question: 사용자가 TTS 전 대본 길이를 3분보다 짧게 줄일지 여부.

## Creative Brief Summary

- Chosen angle: AI가 참고하고 수정하기 쉬운 구조는 기술 레이어보다 기능 흐름을 가까이 묶는 버티컬 슬라이스다.
- Length decision: 3min
- Structure: 기존 구조의 장점 -> AI 코딩에서 생기는 맥락 문제 -> 버티컬 슬라이스 정의 -> AI에게 좋은 이유 -> 적용 규칙
- Tone: 바로 본론, 실전형

## Voiceover Script

Write spoken Korean lines here. Use one idea per line. Use TTS-friendly Korean pronunciations.

```text
예전에는 앱을 보통 레이어로 나눴습니다.

컨트롤러는 컨트롤러 폴더.
서비스는 서비스 폴더.
레포지토리는 레포지토리 폴더.
엔티티와 디티오는 또 따로 둡니다.

이 구조가 틀렸다는 말은 아닙니다.

역할이 분명하고,
규칙을 잡기 쉽고,
큰 팀이 관리하기 좋습니다.

사람이 전체 설계를 오래 들고 갈 때는,
이런 구조가 꽤 안정적입니다.

그런데 바이브코딩에서는,
문제가 조금 다르게 생깁니다.

에이아이에게 회원가입을 고치라고 했는데,
관련 코드가 여러 레이어에 흩어져 있다고 해보세요.

요청을 받는 컨트롤러가 있고,
비즈니스 로직은 서비스에 있고,
데이터 접근은 레포지토리에 있고,
엔티티와 디티오는 또 다른 곳에 있습니다.

그러면 에이아이는 한 기능을 이해하려고,
계속 폴더를 왔다 갔다 해야 합니다.

컨텍스트는 길어지고,
참고해야 할 파일은 늘어나고,
한쪽만 고치고 다른 쪽을 놓치기 쉬워집니다.

여기서 버티컬 슬라이스가 강해집니다.

버티컬 슬라이스는,
기술 레이어 기준이 아니라,
사용자 기능 기준으로 코드를 묶는 방식입니다.

예를 들어 회원가입 슬라이스라면,
회원가입 컨트롤러,
서비스 로직,
레포지토리,
엔티티와 디티오,
검증 규칙,
테스트까지,
한 기능의 흐름을 가까운 곳에 둡니다.

그러면 에이아이가 보기 좋습니다.

왜냐하면 한 폴더 안에서,
이 기능이 무엇을 받고,
무엇을 처리하고,
무엇을 저장하고,
어떻게 검증되는지,
맥락을 한 번에 따라갈 수 있기 때문입니다.

바이브코딩에서 중요한 건,
파일을 예쁘게 나누는 게 아닙니다.

에이아이가 지금 바꾸는 기능의 의도를,
헷갈리지 않게 만드는 겁니다.

레이어 구조에서는,
작은 수정도 여러 폴더를 건드립니다.

버티컬 슬라이스에서는,
수정 범위가 기능 단위로 좁아집니다.

회원가입을 고치면 회원가입 슬라이스를 보고,
파일 업로드를 고치면 업로드 슬라이스를 보고,
결제를 고치면 결제 슬라이스를 보는 식입니다.

이게 좋은 이유는 세 가지입니다.

첫 번째,
에이아이에게 줄 컨텍스트가 짧아집니다.

두 번째,
관련 파일을 같이 읽기 쉬워집니다.

세 번째,
수정이 다른 기능으로 번질 확률이 줄어듭니다.

그래서 프롬프트도 달라져야 합니다.

앱 전체를 정리해줘.
이렇게 말하는 대신,
회원가입 슬라이스 안에서만 수정해줘.

컨트롤러,
서비스,
레포지토리,
엔티티와 디티오,
테스트를 같이 보고,
이 기능 흐름만 끝내줘.

이렇게 말하는 게 훨씬 낫습니다.

물론 모든 프로젝트를 무조건 이렇게 해야 한다는 뜻은 아닙니다.

공통 인증,
공통 디자인 시스템,
공통 데이터베이스 설정처럼,
공유 레이어가 필요한 부분은 남겨야 합니다.

다만 기능을 만들고 고치는 단위는,
가능하면 세로로 잡는 게 좋습니다.

바이브코딩에서 좋은 구조는,
사람이 보기 좋은 폴더 구조만이 아닙니다.

에이아이가 기능의 맥락을 잃지 않고,
참고하고,
수정하고,
다시 이어갈 수 있는 구조입니다.

한 줄로 정리하면 이겁니다.

공통은 공유하고,
기능은 세로로 묶고,
에이아이에게는 슬라이스 단위로 맡기세요.
```

## Scene Summary

| # | Time | Pattern Role | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|
| 01 | 0:00-0:15 | setup | 기존에는 레이어로 나누는 구조가 흔했다 | Controller/Service/Repository/Entity/DTO layer stack | layer labels appear one by one | none |
| 02 | 0:15-0:35 | balance | 기존 구조도 장점이 있다 | role clarity board | benefit cards reveal | none |
| 03 | 0:35-1:00 | problem | AI는 한 기능을 이해하려고 여러 폴더를 오가야 한다 | scattered related files | context path jumps | none |
| 04 | 1:00-1:25 | definition | 버티컬 슬라이스는 기능 흐름 기준으로 묶는다 | feature slice folder | slice groups related modules | none |
| 05 | 1:25-1:55 | ai-fit | AI가 한 기능의 맥락을 한 번에 따라가기 쉽다 | module cluster map | focus lens over one slice | none |
| 06 | 1:55-2:18 | benefits | 컨텍스트 짧음, 관련 파일 가까움, 수정 범위 좁음 | three benefit lanes | one benefit at a time | none |
| 07 | 2:18-2:43 | prompt rule | AI에게 슬라이스 단위로 맡긴다 | prompt card + scope fence | type-in + scope lock | none |
| 08 | 2:43-3:05 | caveat | 공통 레이어는 남기고 기능만 세로로 묶는다 | shared core + feature slices | shared base stays, slices rise | none |
| 09 | 3:05-3:20 | payoff | 공통은 공유하고 기능은 세로로 묶는다 | final architecture lock | kinetic phrase, final check | thumbnail imagegen optional outside body |

## Motion Blueprint Summary

이 표가 렌더러 계약입니다. `Motion Notes`만 보고 카드 템플릿을 만들지 말고, 아래 오브젝트와 상태 변화가 실제 화면에 보여야 합니다.

| # | Primary Screen Object | State Change | Motion Beat Ladder | Hold / Exit Rule | Snapshot Evidence |
|---|---|---|---|---|---|
| 01 | Controller/Service/Repository/Entity/DTO 레이어 스택 | 빈 그리드에서 중립적 레이어 구조로 정렬 | 제목 -> 레이어 순차 등장 -> 역할 배지 부착 -> 스택 유지 | 장점 설명을 위해 Scene 02까지 구조를 유지 | 다섯 레이어가 읽히고, 아직 문제처럼 보이지 않음 |
| 02 | 기존 레이어 구조 위 benefit board | 구조 비판 전, 장점이 하나씩 붙음 | 역할 분리 -> 규칙 -> 큰 팀 순서로 확장 | 이전 장점은 dim 상태로 남김 | 현재 장점 하나가 중심이고 균형 잡힌 톤 |
| 03 | 흩어진 회원가입 관련 파일 지도 | 한 기능이 여러 레이어 폴더로 분산됨 | 요청 등장 -> 파일 카드 점등 -> AI 렌즈 점프 -> context trail 증가 -> missed warning | 방문한 파일은 흐리게 남겨 맥락 증가를 보여줌 | 한 기능이 여러 폴더를 오가는 문제가 보임 |
| 04 | `features/signup/` 슬라이스 경계 | 흩어진 파일들이 기능 단위 컨테이너로 모임 | 파일 수집 -> 미니 트리 생성 -> 경계선 닫힘 -> lock tick | 뒤에 old layer ghost를 흐리게 남김 | 같은 파일들이 한 기능 흐름으로 가까워짐 |
| 05 | 한 슬라이스 안의 AI focus lens | AI가 한 폴더 안에서 입력/처리/저장/검증 흐름을 따라감 | lens 진입 -> controller -> service -> repository -> entity/DTO -> test scan | scan된 모듈은 계속 visible, 바깥은 dim | 렌즈가 한 슬라이스 내부에서만 이동 |
| 06 | 세 benefit lane | 추상 장점이 수치/거리/범위 변화로 바뀜 | context bar shrink -> file distance shortens -> blast radius contracts -> result badges align | 이전 결과는 작은 locked chip으로 유지 | 짧아짐/가까워짐/좁아짐이 실제 변화로 보임 |
| 07 | scope-fenced prompt editor | 넓은 프롬프트가 슬라이스 한정 프롬프트로 교체됨 | bad prompt flash -> collapse -> good prompt type-in -> scope fence close -> checklist ticks | bad prompt는 사라지고 good prompt만 남김 | 사용자가 복사할 수 있는 문장이 읽힘 |
| 08 | shared base + vertical feature columns | 공통 레이어는 고정되고 기능 슬라이스만 위로 올라옴 | base reveal -> common lock -> signup/upload/payment rise -> contrast labels | shared base는 끝까지 visible | 공통은 공유, 기능은 세로 구조가 동시에 보임 |
| 09 | final architecture lock + AI task cursor | AI 작업 단위가 하나의 슬라이스로 지정됨 | base select -> feature select -> cursor lands -> final rule locks | Scene 08 구조를 dim 배경으로 carryover | 마지막 규칙이 한눈에 읽힘 |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:15
- Pattern role: setup
- Narration: 예전에는 앱을 보통 레이어로 나눴습니다.
- On-screen phrase: 기존 구조: Controller / Service / Repository / Entity
- Layout: four horizontal architecture layers
- Primary screen object: neutral backend layer stack
- Supporting objects: role badges, layer folder rail
- Initial state: title only on dark grid
- Active state: each layer band appears with a readable label
- End state: all layers stay visible for the balance scene
- Motion beat ladder: title -> layer bands -> role badges -> hold
- Hold / exit rule: no exit; carry the neutral stack into Scene 02
- Primary motion: layer labels appear one by one
- Secondary motion: subtle role badges attach to each layer
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: soft layer ticks
- Verification frame: layer labels readable, not all elements overfilled

### Scene 02

- Time: 0:15-0:35
- Pattern role: balance
- Narration: 이 구조도 장점이 있습니다.
- On-screen phrase: 역할 분리 / 규칙 / 큰 팀
- Layout: three benefit cards anchored to the layer stack
- Primary screen object: benefit board attached to existing layer stack
- Supporting objects: three benefit chips and check marks
- Initial state: Scene 01 layer stack dimmed
- Active state: one benefit expands at a time
- End state: benefits compress into small context badges
- Motion beat ladder: 역할 분리 -> 규칙 -> 큰 팀 -> compact badges
- Hold / exit rule: previous benefits dim, not disappear
- Primary motion: one benefit card appears at a time
- Secondary motion: previous benefit remains dimmed as context
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: clean ticks
- Verification frame: current benefit dominates

### Scene 03

- Time: 0:35-1:00
- Pattern role: problem
- Narration: 그런데 AI는 한 기능을 이해하려고 여러 폴더를 왔다 갔다 해야 합니다.
- On-screen phrase: 기능 맥락이 흩어집니다
- Layout: scattered files connected to one feature label
- Primary screen object: scattered signup feature file map
- Supporting objects: AI lens, context trail, missed DTO/test warning
- Initial state: a single `회원가입 수정` request card
- Active state: lens jumps across Controller, Service, Repository, Entity, DTO, Test folders
- End state: context trail freezes with warning
- Motion beat ladder: request -> file highlights -> lens jumps -> trail grows -> missed warning
- Hold / exit rule: visited files remain faintly lit
- Primary motion: context path jumps across folders
- Secondary motion: missed-file warning appears once
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: short jump ticks
- Verification frame: scattered related files are visible but not cluttered

### Scene 04

- Time: 1:00-1:25
- Pattern role: definition
- Narration: 버티컬 슬라이스는 기술 레이어가 아니라 기능 흐름 기준으로 묶는 방식입니다.
- On-screen phrase: feature slice
- Layout: one feature slice containing controller, service, repository, entity, DTO, test
- Primary screen object: `features/signup/` slice boundary
- Supporting objects: mini tree, boundary lock, old-layer ghost
- Initial state: scattered cards from Scene 03
- Active state: related files gather into one vertical slice
- End state: slice folder locks
- Motion beat ladder: cards gather -> tree forms -> boundary closes -> lock tick
- Hold / exit rule: old layer ghost remains dim as contrast
- Primary motion: related modules group into one vertical slice
- Secondary motion: slice boundary locks
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: grouping chime
- Verification frame: the slice grouping is obvious

### Scene 05

- Time: 1:25-1:55
- Pattern role: ai-fit
- Narration: 그러면 AI가 한 기능의 맥락을 한 번에 따라갈 수 있습니다.
- On-screen phrase: AI가 참고하기 쉬운 구조
- Layout: focused module cluster with one active lens
- Primary screen object: AI focus lens inside one feature slice
- Supporting objects: input/process/output rail and module chips
- Initial state: locked slice from Scene 04
- Active state: lens scans module flow inside the slice only
- End state: connected route remains highlighted
- Motion beat ladder: lens enters -> controller -> service -> repository -> entity/DTO -> test -> `맥락 한 번에`
- Hold / exit rule: scanned modules remain visible; outside features stay dimmed
- Primary motion: lens scans controller -> service -> repository -> entity -> test inside the slice
- Secondary motion: outside modules stay dimmed
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: scan ticks
- Verification frame: active lens is inside one slice only

### Scene 06

- Time: 1:55-2:18
- Pattern role: benefits
- Narration: 컨텍스트는 짧아지고, 관련 파일은 가까워지고, 수정 범위는 좁아집니다.
- On-screen phrase: 짧은 컨텍스트 / 가까운 파일 / 좁은 수정
- Layout: three benefit lanes
- Primary screen object: three operational benefit lanes
- Supporting objects: token bar, file distance ruler, blast radius ring
- Initial state: lane titles only
- Active state: one metric changes per narration clause
- End state: three compact result badges align
- Motion beat ladder: context bar shrinks -> file distance shortens -> blast radius contracts -> badges align
- Hold / exit rule: previous metric result locks as a small chip
- Primary motion: one lane activates at a time
- Secondary motion: before/after metric ticks
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: step ticks
- Verification frame: only one benefit lane is active

### Scene 07

- Time: 2:18-2:43
- Pattern role: prompt rule
- Narration: AI에게는 회원가입 슬라이스 안에서만 수정해달라고 말해야 합니다.
- On-screen phrase: 이 슬라이스 안에서만 수정
- Layout: prompt card inside scope boundary
- Primary screen object: prompt editor inside a scope fence
- Supporting objects: bad prompt line, good prompt line, accepted file checklist
- Initial state: empty editor with cursor
- Active state: broad prompt collapses and slice-scoped prompt types in
- End state: scope fence locks around the feature files
- Motion beat ladder: bad prompt flash -> collapse -> good prompt type-in -> fence closes -> checklist ticks
- Hold / exit rule: keep only the good prompt dominant
- Primary motion: prompt line types in, scope boundary locks
- Secondary motion: acceptance checks appear one by one
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: type + lock
- Verification frame: prompt rule is readable

### Scene 08

- Time: 2:43-3:05
- Pattern role: caveat
- Narration: 공통 인증, 디자인 시스템, 데이터베이스 설정처럼 공유 레이어는 남겨야 합니다.
- On-screen phrase: 공통은 공유, 기능은 세로로
- Layout: shared base layer with vertical feature slices above it
- Primary screen object: shared base plus vertical feature columns
- Supporting objects: auth/design-system/db-config base chips and signup/upload/payment slices
- Initial state: shared base appears first
- Active state: base locks, feature slices rise above it
- End state: common and feature areas remain distinct
- Motion beat ladder: base reveal -> lock marker -> slice columns rise -> labels appear -> hold
- Hold / exit rule: shared base remains visible to prevent wrong takeaway
- Primary motion: shared core stays fixed while feature slices rise
- Secondary motion: do-not-move badge on shared layer
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: base lock
- Verification frame: shared layer and feature slices are visually distinct

### Scene 09

- Time: 3:05-3:20
- Pattern role: payoff
- Narration: 공통은 공유하고, 기능은 세로로 묶고, AI에게는 슬라이스 단위로 맡기세요.
- On-screen phrase: 공통은 공유하고 기능은 세로로
- Layout: final architecture diagram locks into a stable shape
- Primary screen object: final architecture lock with AI task cursor
- Supporting objects: common base, feature slices, final phrase
- Initial state: Scene 08 architecture dimmed
- Active state: AI cursor selects one feature slice as the task boundary
- End state: final rule locks with selected slice highlighted
- Motion beat ladder: common base select -> feature slice select -> AI cursor lands -> phrase locks
- Hold / exit rule: end on stable final structure, not a new card board
- Primary motion: shared base + feature slices align, final phrase locks
- Secondary motion: subtle grid fade
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: final hit
- Verification frame: final phrase is clear

## Approval Gate

- Draft scene packets complete: yes
- User approved narration: no
- User approved scene contract: no
- TTS allowed: no

## TTS Notes

- Provider: ElevenLabs
- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output format: `mp3_44100_128`
- Original voice: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- Subtitle: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`
- Sync: ElevenLabs SRT, forced_alignment preferred; captions are text-only with no progress bar

## Render Checks

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
