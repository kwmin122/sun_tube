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
| 01 | 0:00-0:12 | hook/problem | 에이전트의 한계를 모델 성능이 아니라 구조 문제로 재정의한다. | Wikidocs/Anthropic 발표 소재 | 혼자 일하는 AI 카드가 과부하로 흔들림 | 첫 문장은 짧고 강하게. |
| 02 | 0:12-0:30 | context/cause | 기존 에이전트의 세 가지 병목을 보여준다. | 백지 세션, 자기검증 부재, 혼자 처리 | 3개 빨간 경고 패널 | 문제를 시청자 경험과 연결. |
| 03 | 0:30-0:52 | fix/explanation | 드리밍은 세션 사이에 메모리를 정리하는 축이다. | Anthropic dreaming 설명, Harvey 사례 | 밤에 정리되는 메모리 저장소 | "잠자는 동안 정리" 비유 사용. |
| 04 | 0:52-1:15 | fix/explanation | 아웃컴은 결과물에 품질 기준을 붙이는 축이다. | rubric, grader, docx/pptx 수치 | 산출물 -> 채점기 -> 재작업 루프 | 검수자 분리 구조를 강조. |
| 05 | 1:15-1:38 | fix/explanation | 멀티에이전트는 일을 쪼개 병렬 처리하는 축이다. | Netflix 로그 분석, Spiral 라우팅 | 리드 에이전트가 서브에이전트로 라우팅 | 회사/팀 비유로 쉽게. |
| 06 | 1:38-2:05 | synthesis/diagram | 세 기능이 합쳐져 하나의 운영체계가 된다. | 3축 시스템 | 학습축, 검증축, 분업축이 삼각형으로 연결 | 가장 중요한 전환점. |
| 07 | 2:05-2:35 | case/data | 실제 팀 사례로 추상 개념을 구체화한다. | Harvey, Netflix, Spiral, Wisedocs | 4개 케이스 카드와 숫자 카운터 | 숫자는 빠르게, 의미는 크게. |
| 08 | 2:35-3:00 | takeaway | 이제 질문은 모델 선택보다 운영 구조 설계다. | 핵심통찰 | "모델이 아니라 시스템" 큰 문장 | 마지막 한 문장으로 닫기. |

## Scene Details

### Scene 01

- Purpose: 주제의 프레임을 바꾼다.
- Viewer should understand: 에이전트 실패의 이유가 모델 지능만은 아니다.
- Pattern role: hook/problem
- Material direction: Wikidocs 제목, Anthropic 발표 카드
- Visual idea: 단독 AI 카드가 업무 더미에 눌리다가 "구조"라는 단어로 화면 전환
- Motion idea: 빠른 push-in, 경고 라벨 3개 팝업
- Writer guidance: "AI 에이전트의 진짜 한계는..."으로 시작

### Scene 02

- Purpose: 왜 구조가 필요한지 병목을 보여준다.
- Viewer should understand: 백지 시작, 자기검증 부재, 단독 처리 병목이 있다.
- Pattern role: cause/context
- Material direction: 추상 다이어그램
- Visual idea: 세 개의 실패 패널
- Motion idea: 하나씩 빨간 점등 후 회색으로 밀려남
- Writer guidance: 시청자가 이미 겪는 불편처럼 말하기

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

- Purpose: 세 기능을 하나의 시스템으로 합친다.
- Viewer should understand: 학습, 검증, 분업이 에이전트 운영체계의 세 축이다.
- Pattern role: synthesis/diagram
- Material direction: 자체 다이어그램
- Visual idea: 3축 삼각형, 중앙에 Managed Agents
- Motion idea: 세 축이 차례로 연결되고 중앙이 점등
- Writer guidance: 영상의 핵심 문장을 여기에 배치

### Scene 07

- Purpose: 실제 팀 사례로 신뢰감을 준다.
- Viewer should understand: 추상 기능이 실제 운영 문제에 쓰이고 있다.
- Pattern role: case/data
- Material direction: Harvey, Netflix, Spiral, Wisedocs
- Visual idea: 4개 케이스 카드, 숫자 강조
- Motion idea: 카드 스택이 빠르게 펼쳐짐
- Writer guidance: 숫자 나열보다 의미를 강조

### Scene 08

- Purpose: 결론을 남긴다.
- Viewer should understand: 앞으로 에이전트 설계 질문이 바뀐다.
- Pattern role: takeaway
- Material direction: 핵심통찰
- Visual idea: "어떤 모델?"이 지워지고 "어떤 시스템?"이 남음
- Motion idea: 텍스트 교체, 최종 hold
- Writer guidance: 강한 마지막 문장

## Handoff To Writer Room

- Main claim: Claude Managed Agents 업데이트의 본질은 모델 성능이 아니라 에이전트 운영 시스템이다.
- Lines that must be short: 오프닝, Scene 06 핵심 전환, 마지막 문장.
- Lines that need visual payoff: 드리밍/아웃컴/멀티에이전트 3축 설명.
- Lines to avoid: 기능명을 길게 반복하는 제품 소개식 문장.
