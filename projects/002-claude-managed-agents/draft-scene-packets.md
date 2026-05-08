# Draft Scene Packets

Owner: `hype-scene-planner`

Created before `hype-writer-room` writes the approval script.

Purpose: define what each scene must do, what material direction it needs, and what kind of visual language the writer should write into.

## Inputs

- `research-pack.md`
- `creative-brief.md`

## Scene Table

| Scene | Estimated Duration | Pattern Role | Scene Purpose | Material Direction | Expected Visual | Writer Guidance |
|---|---:|---|---|---|---|---|
| 01 | 0:00-0:10 | direct hook | 앤스로픽의 네 가지 업데이트를 바로 제시한다. | Wikidocs/Anthropic 발표 소재 | 4개 기능 카드가 빠르게 뜸 | 첫 문장은 주제명으로 바로 시작. |
| 02 | 0:10-0:24 | reframe | 업데이트의 본질을 모델 성능이 아니라 운영 구조로 재정의한다. | 추상 시스템 다이어그램 | 모델 카드가 운영 시스템 카드로 바뀜 | "이게 뭐냐면요" 식으로 바로 풀기. |
| 03 | 0:24-0:48 | feature/explanation | 드리밍은 세션 사이에 메모리를 정리하는 축이다. | Anthropic dreaming 설명, Harvey 사례 | 밤에 정리되는 메모리 저장소 | "자러 갈 때 벌어지는 기능" 비유 사용. |
| 04 | 0:48-1:10 | feature/explanation | 아웃컴은 결과물에 품질 기준을 붙이는 축이다. | rubric, grader, docx/pptx 수치 | 산출물 -> 채점기 -> 재작업 루프 | 작업자와 검수자를 분리했다는 표현 사용. |
| 05 | 1:10-1:34 | feature/explanation | 멀티에이전트는 일을 쪼개 병렬 처리하는 축이다. | Netflix 로그 분석, Spiral 라우팅 | 리드 에이전트가 서브에이전트로 라우팅 | 회사/팀 비유로 쉽게. |
| 06 | 1:34-1:52 | feature/explanation | 웹훅은 완료된 에이전트 작업을 다음 워크플로로 연결한다. | webhook callback 흐름 | 완료 이벤트가 다음 시스템을 켬 | 대기하지 않아도 된다는 실무 장점 강조. |
| 07 | 1:52-2:18 | synthesis/diagram | 네 기능이 합쳐져 하나의 운영 시스템이 된다. | 4축 시스템 | 학습축, 검증축, 분업축, 연결축이 중앙으로 합류 | 가장 중요한 전환점. |
| 08 | 2:18-2:46 | case/data | 실제 팀 사례로 추상 개념을 구체화한다. | Harvey, Netflix, Spiral, Wisedocs | 4개 케이스 카드와 숫자 카운터 | 숫자는 말로 읽히게 쓰고, 의미는 크게. |
| 09 | 2:46-3:00 | takeaway | 이제 질문은 모델 선택보다 운영 구조 설계다. | 핵심통찰 | "어떤 모델?"이 "어떤 시스템?"으로 바뀜 | 마지막 질문형 문장으로 닫기. |

## Scene Details

### Scene 01

- Purpose: 네 가지 업데이트를 바로 제시한다.
- Viewer should understand: 이번 영상은 드리밍, 아웃컴, 멀티에이전트, 웹훅을 다룬다.
- Pattern role: direct hook
- Material direction: Wikidocs 제목, Anthropic 발표 카드
- Visual idea: 발표 화면 후보 위에 4개 기능 카드가 뜸
- Motion idea: 빠른 title slam, 4-card pop
- Writer guidance: "앤스로픽이..."로 바로 시작

### Scene 02

- Purpose: 네 기능의 의미를 "더 일 잘하는 구조"로 재정의한다.
- Viewer should understand: 이 업데이트는 모델을 똑똑하게 만드는 것보다 운영 방식을 바꾸는 쪽에 가깝다.
- Pattern role: reframe
- Material direction: 추상 다이어그램
- Visual idea: 모델 카드가 운영 시스템 카드로 교체됨
- Motion idea: text replace, system frame lock-in
- Writer guidance: "이게 뭐냐면요" 다음에 한 문장으로 풀기

### Scene 03

- Purpose: 드리밍을 설명한다.
- Viewer should understand: 메모리는 작업 중 학습, 드리밍은 세션 사이 정리다.
- Pattern role: fix/explanation
- Material direction: Anthropic dreaming 설명, Harvey 사례
- Visual idea: 메모리 조각이 자동 분류되고 중복이 사라짐
- Motion idea: 노이즈 점들이 정리되어 선명한 카드로 변환
- Writer guidance: "에이전트가 쉬는 시간에..." 식으로 쉽게

### Scene 04

- Purpose: 아웃컴을 설명한다.
- Viewer should understand: 별도 채점기가 기준에 맞춰 산출물을 평가하고 재작업시킨다.
- Pattern role: fix/explanation
- Material direction: outcomes, grader, benchmark 수치
- Visual idea: 산출물 카드가 품질 게이트를 통과하거나 반려됨
- Motion idea: fail -> fix -> pass 루프
- Writer guidance: 작업자와 검수자를 분리했다는 표현 사용

### Scene 05

- Purpose: 멀티에이전트 오케스트레이션을 설명한다.
- Viewer should understand: 리드 에이전트가 일을 쪼개 전문가에게 나눠준다.
- Pattern role: fix/explanation
- Material direction: Netflix, Spiral 사례
- Visual idea: 중앙 리드 노드에서 여러 서브 노드로 라인이 뻗음
- Motion idea: fan-out 후 결과가 다시 합류
- Writer guidance: "혼자 다 하는 AI"와 "팀으로 움직이는 AI" 대비

### Scene 06

- Purpose: 웹훅을 설명한다.
- Viewer should understand: 완료된 에이전트 작업이 외부 알림과 다음 워크플로로 이어질 수 있다.
- Pattern role: feature/explanation
- Material direction: webhook callback 흐름
- Visual idea: completed agent task -> webhook -> next workflow
- Motion idea: pulse line, next card turns on
- Writer guidance: 기다리지 않아도 된다는 실무 느낌으로 설명

### Scene 07

- Purpose: 네 기능을 하나의 시스템으로 합친다.
- Viewer should understand: 학습, 검증, 분업, 연결이 에이전트 운영 시스템의 네 축이다.
- Pattern role: synthesis/diagram
- Material direction: 자체 다이어그램
- Visual idea: 4축 다이어그램, 중앙에 Managed Agents
- Motion idea: 네 축이 차례로 연결되고 중앙이 점등
- Writer guidance: 영상의 핵심 문장을 여기에 배치

### Scene 08

- Purpose: 실제 팀 사례로 신뢰감을 준다.
- Viewer should understand: 추상 기능이 실제 운영 문제에 쓰이고 있다.
- Pattern role: case/data
- Material direction: Harvey, Netflix, Spiral, Wisedocs
- Visual idea: 4개 케이스 카드, 숫자 강조
- Motion idea: 카드 스택이 빠르게 펼쳐짐
- Writer guidance: 숫자 나열보다 의미를 강조

### Scene 09

- Purpose: 결론을 남긴다.
- Viewer should understand: 앞으로 에이전트 설계 질문이 바뀐다.
- Pattern role: takeaway
- Material direction: 핵심통찰
- Visual idea: "어떤 모델?"이 지워지고 "어떤 시스템?"이 남음
- Motion idea: 텍스트 교체, 최종 hold
- Writer guidance: 강한 마지막 문장

## Handoff To Writer Room

- Main claim: Claude Managed Agents 업데이트의 본질은 모델 성능이 아니라 에이전트 운영 시스템이다.
- Lines that must be short: 오프닝, Scene 07 핵심 전환, 마지막 문장.
- Lines that need visual payoff: 드리밍/아웃컴/멀티에이전트/웹훅 4축 설명.
- Lines to avoid: 기능명을 길게 반복하는 제품 소개식 문장.
