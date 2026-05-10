# Draft Scene Packets

Owner: `hype-scene-planner`

Created before `hype-writer-room` writes the approval script.

Purpose: define what each scene must do, what material direction it needs, and what kind of visual language the writer should write into.

## Inputs

- `research-pack.md`
- `creative-brief.md`

## Scene Table

| Scene | Estimated Duration | Scene Role | Scene Content Type | Scene Recipe | Primary Visual Route | Secondary Visual Route | Motion Grammar | Imagegen Role | Scene Purpose | Material Direction | Expected Visual | Review Risk | Writer Guidance |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:15 | setup | explain | product/before-after-demo | hyperframes | | technical-grid | not_required | 기존 레이어 구조를 먼저 인정한다 | UI/API/Service/DB 레이어 | 레이어 라벨이 하나씩 등장 | 기존 구조를 까는 느낌이 나면 안 됨 | "틀린 게 아니다"로 시작 |
| 02 | 0:15-0:35 | balance | explain | product/before-after-demo | hyperframes | | technical-grid | not_required | 기존 구조의 장점을 짚는다 | 역할 분리, 규칙, 큰 팀 | 장점 카드가 레이어에 붙음 | 장점 설명이 길어지면 지루함 | 짧게 인정하고 다음 문제로 이동 |
| 03 | 0:35-1:00 | problem | explain | explain/mechanism-state-machine | hyperframes | | technical-grid | not_required | AI가 기능 맥락을 찾기 위해 여러 폴더를 오가는 문제를 보여준다 | scattered related files | 한 기능 관련 파일들이 흩어져 있고 path가 점프 | 너무 복잡한 파일트리 금지 | 기능 하나의 맥락이 흩어진다고 말하기 |
| 04 | 1:00-1:25 | definition | explain | explain/mechanism-state-machine | hyperframes | | technical-grid | not_required | 버티컬 슬라이스를 기능 기준 묶음으로 정의한다 | feature slice folder | UI/API/validation/storage/test가 한 슬라이스로 묶임 | 레이어 구조를 완전히 부정하면 안 됨 | 기술 레이어가 아니라 기능 흐름 기준 |
| 05 | 1:25-1:55 | ai-fit | explain | explain/fan-out-fan-in | hyperframes | | technical-grid | not_required | AI가 한 기능 맥락을 따라가기 쉬운 이유를 설명한다 | module cluster map | focus lens가 한 슬라이스 내부 모듈을 순서대로 훑음 | AI 찬양처럼 보이면 안 됨 | "참고하기 쉽다"를 중심으로 |
| 06 | 1:55-2:18 | benefits | explain | product/before-after-demo | hyperframes | | product-demo | not_required | 세 가지 이점을 구조적으로 보여준다 | short context, close files, narrow edits | 세 benefit lane이 순차 점등 | 체크리스트만 되면 약함 | 각 장점을 실제 AI 수정 상황과 연결 |
| 07 | 2:18-2:43 | prompt-rule | tutorial | explain/mechanism-state-machine | hyperframes | | kinetic-type | not_required | AI에게 슬라이스 단위로 맡기는 프롬프트 규칙을 제시한다 | prompt card, scope fence | "이 슬라이스 안에서만" prompt가 잠김 | 문구가 길면 자막과 충돌 | 복붙 가능한 요청 문장으로 |
| 08 | 2:43-3:05 | caveat | explain | explain/mechanism-state-machine | hyperframes | | technical-grid | not_required | 공통 레이어는 남기고 기능만 세로로 묶는 균형을 설명한다 | shared core + feature slices | shared base는 고정, feature slices가 위로 올라옴 | 모든 걸 feature 폴더에 넣으라는 오해 | 공통은 공유, 기능은 세로 |
| 09 | 3:05-3:20 | payoff | explain | visual-essay/imagegen-cinematic-sequence | hyperframes | imagegen support optional | kinetic-type | support | 최종 문장을 각인한다 | final architecture lock | 공통 베이스와 세로 기능 슬라이스가 안정적으로 잠김 | 일반론처럼 끝나면 약함 | 반복 가능한 한 문장 |

## Scene Details

### Scene 01

- Purpose: 기존 레이어 구조가 흔했고 나름의 이유가 있다는 전제를 만든다.
- Viewer should understand: UI/API/Service/DB로 나누는 구조 자체가 틀린 것은 아니다.
- Pattern role: setup
- Scene content type: explain
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: layer stack
- Visual idea: `UI`, `API`, `Service`, `DB` 레이어가 하나씩 안정적으로 쌓인다.
- Narration verb: 나누다, 분리하다
- Motion purpose: 기존 구조를 먼저 명확히 보여준다.
- Review risk: 기존 구조를 비난하는 인상 금지.
- Motion idea: layer labels appear one by one with calm ticks
- Writer guidance: "틀린 게 아니다"를 초반에 분명히 말한다.

### Scene 02

- Purpose: 기존 구조의 장점을 짧게 인정한다.
- Viewer should understand: 사람과 큰 팀에게는 역할 분리와 규칙이 장점이다.
- Pattern role: balance
- Scene content type: explain
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: benefit cards anchored to layers
- Visual idea: `역할`, `규칙`, `큰 팀` 세 카드가 레이어 구조 옆에 붙는다.
- Narration verb: 분명하다, 잡기 쉽다, 관리하다
- Motion purpose: 균형 잡힌 논리로 신뢰를 만든다.
- Review risk: 장점 설명이 길면 핵심이 늦어진다.
- Motion idea: benefit cards reveal one at a time
- Writer guidance: 인정은 짧게, 곧바로 AI 문제로 전환.

### Scene 03

- Purpose: 바이브코딩에서 기존 구조가 불편해지는 지점을 보여준다.
- Viewer should understand: AI는 한 기능을 이해하기 위해 여러 폴더를 계속 오가야 한다.
- Pattern role: problem
- Scene content type: explain
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: scattered files for one feature
- Visual idea: `signup` 기능 라벨에서 page, route, util, schema 파일로 path가 점프한다.
- Narration verb: 오가다, 놓치다, 흩어지다
- Motion purpose: 기능 맥락이 흩어지는 감각을 보여준다.
- Review risk: 파일트리가 너무 복잡하면 안 보임.
- Motion idea: path jumps between folders; missed file warning flashes once
- Writer guidance: "AI가 참고해야 할 맥락이 흩어진다"로 말한다.

### Scene 04

- Purpose: 버티컬 슬라이스를 기능 기준 묶음으로 정의한다.
- Viewer should understand: 한 기능의 화면, API, 검증, 저장, 테스트를 가까이 둔다.
- Pattern role: definition
- Scene content type: explain
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: feature slice folder
- Visual idea: 흩어진 signup 관련 모듈들이 하나의 `signup slice` 안으로 모인다.
- Narration verb: 묶다, 가까이 두다
- Motion purpose: 슬라이스가 "세로로 묶인 기능 단위"임을 보여준다.
- Review risk: 레이어 구조를 완전히 폐기하라는 오해.
- Motion idea: modules group into a glowing slice boundary
- Writer guidance: 기술 레이어보다 기능 흐름 기준이라고 설명한다.

### Scene 05

- Purpose: AI가 버티컬 슬라이스를 참고하기 좋은 이유를 보여준다.
- Viewer should understand: AI는 한 슬라이스 안에서 입력, 처리, 출력의 맥락을 따라갈 수 있다.
- Pattern role: ai-fit
- Scene content type: explain
- Scene recipe: explain/fan-out-fan-in
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: focused module cluster
- Visual idea: focus lens가 slice 내부의 UI -> API -> validation -> DB -> test를 순서대로 훑는다.
- Narration verb: 참고하다, 따라가다, 이해하다
- Motion purpose: AI가 한 기능 맥락을 한 번에 읽는 느낌을 만든다.
- Review risk: 단순 카드 나열 금지.
- Motion idea: lens scan with one active module at a time
- Writer guidance: "AI가 보기 좋다"를 구체화한다.

### Scene 06

- Purpose: 이점 세 가지를 실전적으로 정리한다.
- Viewer should understand: 컨텍스트가 짧고, 관련 파일이 가깝고, 수정 범위가 좁다.
- Pattern role: benefits
- Scene content type: explain
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: product-demo
- Imagegen role: not_required
- Material direction: three benefit lanes
- Visual idea: `짧은 컨텍스트`, `가까운 파일`, `좁은 수정` lane이 순서대로 활성화된다.
- Narration verb: 짧아지다, 가까워지다, 좁아지다
- Motion purpose: 장점이 추상 문장이 아니라 구조 변화로 보이게 한다.
- Review risk: 체크리스트처럼 정적이면 약함.
- Motion idea: lane activates, mini before/after tick appears
- Writer guidance: 세 가지 장점은 짧게 반복한다.

### Scene 07

- Purpose: AI에게 줄 요청 문장을 바꾼다.
- Viewer should understand: "앱 전체"가 아니라 "이 슬라이스 안에서만"이라고 제한해야 한다.
- Pattern role: prompt rule
- Scene content type: tutorial
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: kinetic-type
- Imagegen role: not_required
- Material direction: prompt card, scope fence
- Visual idea: 긴 범용 요청은 흐려지고, 슬라이스 제한 요청이 scope boundary 안에 잠긴다.
- Narration verb: 말하다, 제한하다, 맡기다
- Motion purpose: 다음 작업에서 그대로 쓸 문장으로 고정한다.
- Review risk: 프롬프트 카드가 너무 길면 자막과 충돌.
- Motion idea: type-in prompt + lock checks
- Writer guidance: 복붙 가능한 형태로 말한다.

### Scene 08

- Purpose: 버티컬 슬라이스를 과하게 적용하지 않도록 균형점을 준다.
- Viewer should understand: 공통 인증, 디자인 시스템, DB 설정 같은 공유 레이어는 남긴다.
- Pattern role: caveat
- Scene content type: explain
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: shared core and feature slices
- Visual idea: shared base layer는 고정되고 signup/upload/payment slices가 위로 세워진다.
- Narration verb: 공유하다, 남기다, 묶다
- Motion purpose: "공통은 공유, 기능은 세로"를 시각적으로 구분한다.
- Review risk: 모든 파일을 feature 폴더에 넣으라는 오해.
- Motion idea: shared base locks; vertical slices rise above it
- Writer guidance: 균형 잡힌 적용 규칙을 준다.

### Scene 09

- Purpose: 최종 문장을 각인한다.
- Viewer should understand: AI에게는 슬라이스 단위로 일을 맡기는 것이 핵심이다.
- Pattern role: payoff
- Scene content type: explain
- Scene recipe: visual-essay/imagegen-cinematic-sequence
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: imagegen optional for thumbnail only
- Motion grammar: kinetic-type
- Imagegen role: support
- Material direction: final phrase
- Visual idea: 공통 베이스와 세로 기능 슬라이스가 하나의 안정된 구조로 잠긴다.
- Narration verb: 공유하다, 묶다, 맡기다
- Motion purpose: 기억할 문장을 남긴다.
- Review risk: 일반론처럼 끝날 수 있음.
- Motion idea: final architecture lock + phrase slam
- Writer guidance: 마지막 문장은 "공통은 공유하고, 기능은 세로로" 유지.

## Handoff To Writer Room

- Main claim: 기존 레이어 구조는 장점이 있지만, 바이브코딩에서는 AI가 기능 맥락을 참고하기 쉬운 버티컬 슬라이스가 더 실용적이다.
- Lines that must be short: opening balance, vertical slice definition, final takeaway
- Lines that need visual payoff: scattered related files, feature slice grouping, AI focus lens, shared core plus feature slices
- Lines to avoid: "검증 단위가 전부다", "기존 구조는 틀렸다", "무조건 feature 폴더만 써라"
