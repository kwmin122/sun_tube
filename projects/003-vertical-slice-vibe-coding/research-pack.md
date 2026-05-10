# Research Pack

Owner: `hype-research-desk`

This is a material-development file. It is not a citation audit, rights review, privacy review, or quote-accuracy gate.

## Topic

- Raw topic: 버티컬 슬라이스 아키텍처를 사용해야하는 이유 (바이브코딩시)
- Topic type: explain / tutorial / product-thinking
- Target viewer: AI 코딩 도구로 앱을 만드는 개발자, 1인 빌더, 팀 리드
- Likely length band: 3min
- Initial content pattern candidates:
  - problem -> named method -> before/after -> concrete workflow -> takeaway
  - layer-first failure -> vertical slice recovery -> one-slice operating loop

## Angle Leads

| Lead | Why It Might Work | Viewer Tension | Possible Payoff |
|---|---|---|---|
| 1. 기존 레이어 구조는 사람에게 좋았지만 AI에게는 맥락이 흩어진다 | 기존 구조를 무작정 까지 않고 균형 있게 시작할 수 있다 | 왜 익숙한 구조가 바이브코딩에서 답답한지 궁금함 | 버티컬 슬라이스를 AI 친화적 구조로 이해 |
| 2. 한 기능 관련 모듈을 가까이 두면 AI가 참고하기 쉽다 | 사용자가 말한 "AI가 모듈끼리 참고하기 좋은 구조"와 맞다 | AI가 한쪽만 고치는 문제 | feature slice as context boundary |
| 3. 공통은 공유하고 기능은 세로로 묶어라 | 실전 적용 규칙이 명확하다 | 모든 걸 feature 폴더에 넣어도 되는지 헷갈림 | 균형 잡힌 적용 원칙 |

## Material Leads

| Type | Candidate | Link / File | Why It Is Useful | Scene Potential |
|---|---|---|---|---|
| concept | Vertical slice architecture | internal concept | 기능 하나를 UI/API/data/test까지 끝내는 방식 | layer stack vs slice cut diagram |
| workflow | AI coding iteration loop | internal concept | prompt -> code -> run -> inspect -> fix 루프와 잘 맞음 | one slice loop animation |
| failure pattern | horizontal layer build | internal concept | 많은 파일이 생기지만 사용자 가치는 검증 안 됨 | "다 있음 / 되는 건 없음" comparison |
| demo | login flow / upload flow / checkout flow | internal concept | 실제 예시로 설명 가능 | feature lane from button to database |
| image | not required for body | n/a | 개념 설명은 생성 이미지보다 도식이 명확함 | thumbnail/support only |

## Scene Sparks

- Hook image or line: "예전 구조가 틀린 건 아닙니다. 다만 AI가 참고하기엔 흩어져 있습니다."
- Strong comparison: layer folders vs feature slice folders
- Useful contradiction: 사람에게는 역할이 분명하지만 AI에게는 기능 맥락이 흩어진다
- Demo moment: 회원가입 관련 화면, API, 검증, 저장, 테스트가 한 슬라이스 안에 가까이 있는 구조
- Interview or quote candidate: not required
- B-roll or metaphor candidate: 케이크 층을 가로로 쌓는 대신 한 조각을 끝까지 자르는 비유
- Data or timeline candidate: one slice loop: prompt -> implement -> run -> inspect -> fix -> lock

## Open Questions For Creative Roles

- 쇼츠형 60초보다 3분 설명형이 적절하다. 각 핵심을 30-40초씩 설명해야 한다.
- 화면은 한 번에 많은 박스를 띄우지 말고, 설명하는 요소만 순차 등장해야 한다.
- 자막은 ElevenLabs forced-alignment SRT 기준, 진행바 없음.

## Not In MVP Scope

- rights/risk review
- privacy review
- quote accuracy review
- missing-source review
