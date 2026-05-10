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
| 1. 바이브코딩이 망하는 이유는 코드 양이 아니라 검증 단위다 | 사용자가 이미 겪는 실패를 바로 건드린다 | AI가 많이 만들었는데 어디서 깨졌는지 모름 | 버티컬 슬라이스가 왜 필요한지 한 문장으로 각인 |
| 2. 레이어별로 만들면 모든 게 동시에 미완성된다 | 아키텍처 선택을 화면 구조로 설명하기 쉽다 | DB, API, UI가 다 있는데 실제 기능은 안 됨 | "한 기능을 끝까지"라는 행동 지침 |
| 3. AI에게 큰 앱을 맡기지 말고 작은 사용자 흐름을 맡겨라 | 바이브코딩 실전 팁으로 바로 적용 가능 | 프롬프트는 큰데 결과는 산만함 | 다음 프로젝트에서 바로 쓸 체크리스트 |

## Material Leads

| Type | Candidate | Link / File | Why It Is Useful | Scene Potential |
|---|---|---|---|---|
| concept | Vertical slice architecture | internal concept | 기능 하나를 UI/API/data/test까지 끝내는 방식 | layer stack vs slice cut diagram |
| workflow | AI coding iteration loop | internal concept | prompt -> code -> run -> inspect -> fix 루프와 잘 맞음 | one slice loop animation |
| failure pattern | horizontal layer build | internal concept | 많은 파일이 생기지만 사용자 가치는 검증 안 됨 | "다 있음 / 되는 건 없음" comparison |
| demo | login flow / upload flow / checkout flow | internal concept | 실제 예시로 설명 가능 | feature lane from button to database |
| image | not required for body | n/a | 개념 설명은 생성 이미지보다 도식이 명확함 | thumbnail/support only |

## Scene Sparks

- Hook image or line: "바이브코딩할 때 제일 위험한 건, 코드를 너무 많이 받는 겁니다."
- Strong comparison: horizontal layer build vs vertical user-flow slice
- Useful contradiction: 파일은 많은데 실행 가능한 기능은 없다
- Demo moment: "회원가입 버튼 하나"가 UI, API, DB, 에러 처리, 테스트까지 통과하는 흐름
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
