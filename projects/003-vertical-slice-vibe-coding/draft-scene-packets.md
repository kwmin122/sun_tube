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
| 01 | 0:00-0:13 | hook | explain | product/before-after-demo | hyperframes | | kinetic-type | not_required | 바이브코딩 실패 원인을 "검증 단위"로 재정의 | 큰 코드 뭉치 vs 작은 검증 흐름 | 깨지는 앱 실루엣이 하나의 얇은 slice로 잘림 | 추상 구호처럼 보일 수 있음 | 바로 본론, "코드 양"으로 시작 |
| 02 | 0:13-0:35 | problem | explain | product/before-after-demo | hyperframes | | technical-grid | not_required | 레이어별 개발이 왜 위험한지 보여줌 | UI/API/DB/Test 가로 레이어 | 네 레이어가 모두 incomplete 상태로 쌓임 | 요소를 한꺼번에 띄우면 산만함 | "다 있는데 되는 건 없다"를 반복 |
| 03 | 0:35-0:55 | definition | explain | explain/mechanism-state-machine | hyperframes | | technical-grid | not_required | 버티컬 슬라이스 정의 | 한 사용자 행동이 UI->API->DB->검증까지 연결 | 한 줄 slice가 레이어를 세로로 통과 | 정의가 길면 지루함 | 한 문장 정의 후 바로 예시 |
| 04 | 0:55-1:18 | mechanism | explain | explain/mechanism-state-machine | hyperframes | | product-demo | not_required | 예: 회원가입/업로드 같은 작은 흐름 | button, request, validation, save, success | 하나의 user story packet이 끝까지 이동 | 실제 서비스 같지 않으면 약함 | 구체 예시 하나만 사용 |
| 05 | 1:18-1:43 | ai-fit | explain | explain/fan-out-fan-in | hyperframes | | technical-grid | not_required | 바이브코딩에서 왜 특히 잘 맞는지 설명 | AI 작업 단위를 작은 slice로 제한 | AI prompt가 한 slice 안에서만 작업 | AI 찬양처럼 보일 수 있음 | "AI는 좁은 목표에서 강하다"로 표현 |
| 06 | 1:43-2:05 | workflow | tutorial | explain/mechanism-state-machine | hyperframes | | product-demo | not_required | 실제 진행 순서 제시 | pick flow -> implement -> run -> inspect -> lock | 5단계 작업 루프가 순차 점등 | 체크리스트만 되면 약함 | 각 단계는 짧고 명령형 |
| 07 | 2:05-2:27 | contrast | product | product/before-after-demo | hyperframes | | technical-grid | not_required | horizontal vs vertical 결과 비교 | before: many files, after: one working flow | 왼쪽 파일 폭발, 오른쪽 실행 성공 | 너무 많은 텍스트 | 결과 차이를 크게 |
| 08 | 2:27-2:50 | rule | tutorial | explain/mechanism-state-machine | hyperframes | | kinetic-type | not_required | 다음 작업 규칙으로 압축 | prompt template: "이 slice만 끝내라" | 프롬프트 카드가 scope fence 안에 잠김 | 문구가 추상적일 수 있음 | 복붙 가능한 말로 끝내기 |
| 09 | 2:50-3:08 | payoff | explain | visual-essay/imagegen-cinematic-sequence | hyperframes | imagegen support optional | kinetic-type | support | 최종 메시지 각인 | 큰 앱보다 작게 완성된 흐름 | "작게 잘라서 끝까지" 타이포 결론 | 일반론처럼 끝날 수 있음 | 반복 가능한 한 문장 |

## Scene Details

### Scene 01

- Purpose: 바이브코딩 실패를 "너무 많은 코드"보다 "검증 단위가 너무 큼"으로 잡는다.
- Viewer should understand: 큰 앱 전체를 맡기면 AI 출력은 많아지지만 검증은 어려워진다.
- Pattern role: hook/problem
- Scene content type: explain
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: kinetic-type
- Imagegen role: not_required
- Material direction: code mass, broken run state, slice cut
- Visual idea: 화면 전체를 덮는 코드 블록이 얇은 vertical slice 하나로 잘린다.
- Narration verb: 위험하다, 커진다, 잘라야 한다
- Motion purpose: 큰 덩어리에서 작은 검증 단위로 시선을 이동시킨다.
- Review risk: 빈 배경에 큰 글자만 남으면 약함.
- Motion idea: text slam -> code mass blur -> vertical cut line -> slice glow
- Writer guidance: 첫 문장은 바로 문제로 시작한다.

### Scene 02

- Purpose: horizontal layer build가 왜 바이브코딩에서 흔한 함정인지 설명한다.
- Viewer should understand: UI, API, DB, 테스트를 따로 만들면 모든 레이어가 동시에 미완성일 수 있다.
- Pattern role: cost/context
- Scene content type: explain
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: UI/API/DB/Test layer stack
- Visual idea: 한 레이어씩 등장하지만 모두 `partial` badge를 달고 실행 버튼은 실패한다.
- Narration verb: 쌓다, 남다, 깨지다
- Motion purpose: "많이 만들었는데 아직 안 된다"를 보이게 한다.
- Review risk: 네 박스가 처음부터 다 보이면 산만함.
- Motion idea: layer reveal one by one -> run pulse -> red failed state
- Writer guidance: "다 있는데 되는 건 없음"을 짧게 친다.

### Scene 03

- Purpose: 버티컬 슬라이스를 한 문장으로 정의한다.
- Viewer should understand: 기능 하나를 사용자 흐름 기준으로 UI부터 데이터까지 끝낸다.
- Pattern role: named method
- Scene content type: explain
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: single user story through layers
- Visual idea: `회원가입` slice가 UI/API/DB/Test 레이어를 세로로 통과한다.
- Narration verb: 통과하다, 연결하다, 끝내다
- Motion purpose: slice가 레이어를 관통하는 메커니즘을 보여준다.
- Review risk: 정의만 읽으면 지루함.
- Motion idea: vertical slice bar descends -> each layer lights up -> success check
- Writer guidance: 정의는 짧고 예시는 바로 붙인다.

### Scene 04

- Purpose: 실제 예시로 작동 방식을 보여준다.
- Viewer should understand: 작은 기능 하나도 버튼, 요청, 저장, 성공 화면까지 닫혀야 한다.
- Pattern role: example/demo
- Scene content type: tutorial
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: product-demo
- Imagegen role: not_required
- Material direction: signup/upload flow
- Visual idea: user action packet travels through UI -> API -> validation -> database -> success.
- Narration verb: 누르다, 보내다, 저장하다, 확인하다
- Motion purpose: 실제 한 흐름이 끝까지 살아있는 것을 보여준다.
- Review risk: 추상 노드만 있으면 또 PPT 같음.
- Motion idea: packetFlow with labeled nodes; only current node is bright
- Writer guidance: 예시는 하나만 고정한다.

### Scene 05

- Purpose: 왜 AI 코딩과 궁합이 좋은지 설명한다.
- Viewer should understand: AI는 좁고 검증 가능한 목표에서 강하고, 넓은 목표에서 산만해진다.
- Pattern role: ai-fit
- Scene content type: explain
- Scene recipe: explain/fan-out-fan-in
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: prompt scope fence, file set, run feedback
- Visual idea: 큰 prompt는 많은 파일로 퍼지고, slice prompt는 좁은 lane 안에서 통과한다.
- Narration verb: 좁히다, 검증하다, 되돌리다
- Motion purpose: AI 작업 범위가 줄어들수록 피드백 루프가 짧아지는 것을 보여준다.
- Review risk: 멀티에이전트처럼 오해될 수 있음.
- Motion idea: wide scatter fails -> fenced slice loops cleanly
- Writer guidance: AI를 똑똑하게 만드는 게 아니라 일을 작게 맡기는 것.

### Scene 06

- Purpose: 실전 작업 순서를 준다.
- Viewer should understand: slice 선택, 구현, 실행, 검사, 고정 순서로 진행한다.
- Pattern role: method
- Scene content type: tutorial
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: product-demo
- Imagegen role: not_required
- Material direction: five-step loop
- Visual idea: one active step at a time; previous steps remain dimmed as context.
- Narration verb: 고르다, 만들다, 실행하다, 고치다, 잠그다
- Motion purpose: 사용자가 바로 따라 할 수 있게 한다.
- Review risk: 체크리스트가 많아 보일 수 있음.
- Motion idea: stepper with moving active lens
- Writer guidance: 각 단계는 명령문처럼.

### Scene 07

- Purpose: before/after 결과 차이를 보여준다.
- Viewer should understand: horizontal은 파일 수가 늘고, vertical은 작지만 작동하는 흐름이 생긴다.
- Pattern role: proof/contrast
- Scene content type: product
- Scene recipe: product/before-after-demo
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: technical-grid
- Imagegen role: not_required
- Material direction: files vs working flow
- Visual idea: left side has many gray files; right side has one green runnable path.
- Narration verb: 늘다, 된다, 좁아진다
- Motion purpose: 시청자가 차이를 한눈에 보게 한다.
- Review risk: left/right가 작으면 안 보임.
- Motion idea: files pile on left; working path pulses on right
- Writer guidance: "파일 많은 것"과 "기능 되는 것"을 분리.

### Scene 08

- Purpose: AI에게 줄 구체적인 프롬프트 규칙을 제공한다.
- Viewer should understand: 요청을 "이 slice만 끝내라"로 제한해야 한다.
- Pattern role: action rule
- Scene content type: tutorial
- Scene recipe: explain/mechanism-state-machine
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: none
- Motion grammar: kinetic-type
- Imagegen role: not_required
- Material direction: prompt card, scope fence, acceptance checks
- Visual idea: prompt card inside a boundary, with "done means" checks appearing one by one.
- Narration verb: 말하다, 제한하다, 확인하다
- Motion purpose: 다음 작업에서 그대로 쓸 문장으로 고정한다.
- Review risk: 텍스트가 너무 길면 자막과 충돌.
- Motion idea: prompt line types in; acceptance checks lock
- Writer guidance: 복붙 가능한 문장 포함.

### Scene 09

- Purpose: 결론을 짧게 각인한다.
- Viewer should understand: 바이브코딩의 핵심은 빠르게 많이 만드는 게 아니라 작게 끝까지 검증하는 것이다.
- Pattern role: payoff
- Scene content type: explain
- Scene recipe: visual-essay/imagegen-cinematic-sequence
- Likely tool route: hyperframes
- Primary visual route: hyperframes
- Secondary visual route: imagegen optional for thumbnail only
- Motion grammar: kinetic-type
- Imagegen role: support
- Material direction: final phrase
- Visual idea: "작게 잘라서 끝까지"가 vertical slice graphic과 합쳐진다.
- Narration verb: 자르다, 끝내다, 반복하다
- Motion purpose: 기억할 문장을 남긴다.
- Review risk: 일반론처럼 끝날 수 있음.
- Motion idea: slice closes, check appears, final phrase locks
- Writer guidance: 마지막 한 문장은 반복 가능해야 한다.

## Handoff To Writer Room

- Main claim: 바이브코딩에서는 아키텍처보다 먼저 검증 단위를 줄여야 하고, 버티컬 슬라이스가 그 단위다.
- Lines that must be short: hook, definition, final takeaway
- Lines that need visual payoff: horizontal failure, slice definition, five-step loop, prompt rule
- Lines to avoid: "MSA", "DDD", "클린 아키텍처" 같은 범위 확장 용어
