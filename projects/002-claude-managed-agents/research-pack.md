# Research Pack

Owner: `hype-research-desk`

This is a material-development file. It is not a citation audit, rights review, privacy review, or quote-accuracy gate.

## Topic

- Raw topic: https://wikidocs.net/blog/@jaehong/12977/
- Working title: Claude Managed Agents 업데이트
- Topic type: AI agent product update / system-design explainer
- Target viewer: AI 코딩 도구와 에이전트 워크플로를 쓰는 개발자, 기획자, 자동화 빌더
- Likely length band: 5min+
- Initial content pattern candidates: Claim -> Proof -> Explanation, Problem -> Cause -> Fix, Comparison / Versus

## Material Summary

Wikidocs 글은 Anthropic의 Claude Managed Agents 업데이트를 한국어로 요약한다. 핵심은 드리밍, 아웃컴, 멀티에이전트 오케스트레이션, 웹훅이 각각 에이전트의 세션 간 학습, 결과물 자기검증, 복잡한 작업 분산, 비동기 워크플로 연결을 맡는다는 점이다.

Anthropic 원문은 2026년 5월 6일 발표된 제품 공지다. Dreaming은 research preview, outcomes와 multiagent orchestration과 webhooks는 Managed Agents에서 개발자에게 제공되는 기능으로 설명된다.

## Source Snapshot

- User-provided topic source: Wikidocs article published 2026년 5월 7일 6:11 오전.
- Official source: Anthropic Claude blog product announcement dated May 6, 2026.
- Working production mode: 정보 전달형 약 5분 34초 기술 해설. 핵심 기능을 뉴스처럼 나열하지 않고, 각 기능이 무엇을 하고 언제 좋은지까지 설명한다.

## Angle Leads

| Lead | Why It Might Work | Viewer Tension | Possible Payoff |
|---|---|---|---|
| 1. 모델보다 시스템 | 단순 기능 소개보다 큰 흐름이 선명하다. | 왜 좋은 모델만으로 에이전트가 불안정했나? | 에이전트 경쟁력은 학습, 검증, 분업, 연결 구조로 간다. |
| 2. 혼자 일하는 AI의 한계 | 시청자가 이미 겪는 문제와 연결된다. | 매번 백지에서 시작하고, 자기 결과를 못 믿고, 모든 일을 혼자 하고, 끝난 뒤 다음 작업과 끊긴다. | 드리밍, 아웃컴, 멀티에이전트, 웹훅이 각각 한계를 보완한다. |
| 3. 에이전트도 회사처럼 변한다 | 제작 공장/팀 구조 비유와 잘 맞는다. | AI가 하나의 만능 직원이면 병목이 생긴다. | 리드, 전문 역할, QA, 메모리 체계가 필요하다. |

## Material Leads

| Type | Candidate | Link / File | Why It Is Useful | Scene Potential |
|---|---|---|---|---|
| web | 박재홍의 실리콘밸리 한국어 요약 | https://wikidocs.net/blog/@jaehong/12977/ | 한국어 시청자용 용어와 요약 흐름이 좋다. | 오프닝 소재, 핵심 업데이트 요약 |
| docs | Anthropic 공식 블로그 | https://claude.com/blog/new-in-claude-managed-agents | 제품 발표의 원문 소재다. | 공식 페이지 스크린샷, 기능 카드 |
| docs | Anthropic webhook docs | https://platform.claude.com/docs/en/managed-agents/webhooks | 완료 알림과 외부 워크플로 연결 장면에 쓸 수 있다. | webhook callback diagram |
| case | Harvey | Anthropic blog section, What teams are building | 드리밍 효과 사례로 강하다. | "6배" 숫자 카운터 |
| case | Netflix | Anthropic blog section, What teams are building | 멀티에이전트 병렬 분석을 보여준다. | 수백 개 로그가 병렬로 갈라지는 장면 |
| case | Spiral by Every | Anthropic blog section, What teams are building | 모델 라우팅과 품질 검수 조합 사례다. | Haiku 라우터 -> Opus 작성 서브에이전트 |
| case | Wisedocs | Anthropic blog section, What teams are building | outcomes가 QA 시간을 줄이는 장면에 맞다. | 문서 검수 속도 50% 단축 카운터 |
| image | Claude/Anthropic product page screenshot candidate | claude.com | 실제 제품 발표 느낌을 준다. | 배경 카드, 출처 화면 |
| diagram | 4축 시스템 다이어그램 | generated HTML/SVG | 영상의 핵심 구조를 전달한다. | 학습축, 검증축, 분업축, 연결축 4분할 |

## Scene Sparks

- Hook image or line: "AI 에이전트의 문제는 똑똑함이 아니라 회사 구조가 없다는 겁니다."
- Strong comparison: 챗봇 1명 vs 작은 제작팀/회사형 에이전트 시스템
- Useful contradiction: 더 좋은 모델을 넣어도 매번 백지에서 시작하면 실무 신뢰가 쌓이지 않는다.
- Demo moment: 리드 에이전트가 로그, 문서, 메트릭, 티켓을 서브에이전트에게 분배하고, 완료 후 웹훅으로 다음 시스템에 알리는 흐름도
- Interview or quote candidate: 없음. MVP에서는 인터뷰 클립 불필요.
- B-roll or metaphor candidate: 야간에 정리되는 메모리 저장소, 품질 게이트를 통과하는 문서, 여러 작업자로 쪼개지는 로그 더미, 완료 알림이 다음 워크플로를 켜는 콜백 라인
- Data or timeline candidate: 10포인트 개선, docx +8.4%, pptx +10.1%, Harvey 약 6배, Wisedocs 50%

## Open Questions For Creative Roles

- 이 영상은 Anthropic 기능 소개보다 "에이전트 설계의 방향 변화"에 초점을 둔다.
- 길이는 정보 전달형 약 5분 34초로 잡는다. 네 기능은 각각 "무엇인가 / 언제 좋은가"로 설명하고, 사례는 Harvey, Netflix, Spiral, Wisedocs를 짧은 카드로 사용한다.
- Claude 제품명 노출은 정보 중심 카드로 갈지, 추상적인 시스템 다이어그램 중심으로 갈지?

## Not In MVP Scope

- rights/risk review
- privacy review
- quote accuracy review
- missing-source review
