# Timed Scene Packets

Owner: `hype-scene-planner`

Generated from ElevenLabs SRT. Timings have been reviewed for the current composition.

## Timing Table

| Scene | Time Range | SRT Lines | Tool Route | Caption Behavior | Primary Asset | Motion Beat | Audio/SFX | Snapshot Time | Status |
|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00.0-0:13.4 | 1, 2, 3, 4, 5, 6, 7 | capture + hyperframes | bottom safe-zone caption, 0.9s lead | Wikidocs/Anthropic 발표 화면 후보 | title slam + 4-card pop | final mix, reduced BGM | 0:06.7 | done |
| 02 | 0:13.4-0:22.4 | 7, 8, 9, 10 | hyperframes | bottom safe-zone caption, 0.9s lead | HTML/SVG 다이어그램 | replace + lock | final mix, reduced BGM | 0:17.9 | done |
| 03 | 0:22.4-0:50.9 | 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 | capture + hyperframes | bottom safe-zone caption, 0.9s lead | 공식 블로그 소재 | noise -> signal 정리 | final mix, reduced BGM | 0:36.6 | done |
| 04 | 0:50.9-1:19.4 | 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 | hyperframes | bottom safe-zone caption, 0.9s lead | Harvey 소재 | pattern highlight | final mix, reduced BGM | 1:05.2 | done |
| 05 | 1:19.4-1:55.9 | 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 | hyperframes | bottom safe-zone caption, 0.9s lead | 루브릭/품질 게이트 그래픽 | loop animation | final mix, reduced BGM | 1:37.7 | done |
| 06 | 1:55.9-2:15.9 | 47, 48, 49, 50, 51, 52, 53, 54, 55, 56 | hyperframes | bottom safe-zone caption, 0.9s lead | benchmark 소재 | checklist scan | final mix, reduced BGM | 2:05.9 | done |
| 07 | 2:15.9-2:55.9 | 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72 | hyperframes | bottom safe-zone caption, 0.9s lead | Netflix/Spiral 소재 | fan-out/fan-in | final mix, reduced BGM | 2:35.9 | done |
| 08 | 2:55.9-3:17.4 | 72, 73, 74, 75, 76, 77, 78, 79, 80 | hyperframes | bottom safe-zone caption, 0.9s lead | Netflix 소재 | parallel sweep | final mix, reduced BGM | 3:06.7 | done |
| 09 | 3:17.4-3:45.4 | 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93 | hyperframes | bottom safe-zone caption, 0.9s lead | webhook diagram | pulse line + callback | final mix, reduced BGM | 3:31.4 | done |
| 10 | 3:45.4-4:08.0 | 93, 94, 95, 96, 97, 98, 99, 100, 101 | hyperframes | bottom safe-zone caption, 0.9s lead | webhook docs | event chain | final mix, reduced BGM | 3:56.7 | done |
| 11 | 4:08.0-4:34.9 | 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112 | hyperframes | bottom safe-zone caption, 0.9s lead | HTML/SVG | four-axis lock-in | final mix, reduced BGM | 4:21.4 | done |
| 12 | 4:34.9-5:11.4 | 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124 | capture + hyperframes | bottom safe-zone caption, 0.9s lead | 공식 사례 소재 | card stack + counters | final mix, reduced BGM | 4:53.1 | done |
| 13 | 5:11.4-5:33.9 | 124, 125, 126, 127, 128, 129, 130, 131, 132, 133 | hyperframes | bottom safe-zone caption, 0.9s lead | 타이포그래피 | text replace + hold | final mix, reduced BGM | 5:22.6 | done |

## Review Notes

- [ ] Human reviewed scene boundaries
- [ ] Caption safe zones assigned
- [ ] Tool routes confirmed
- [ ] Clip trims and asset timings confirmed where needed

## Visual Thesis Contracts

| Scene | Visual Thesis | Viewer Must Understand | Primary Visual Mechanism | Narration Verb | Motion Must Show | Primary Asset | Failure If |
|---|---|---|---|---|---|---|---|
| 01 | Managed Agents는 네 기능이 합쳐진 운영 시스템이다 | 네 기능은 따로 나열된 카드가 아니라 하나의 작업 루프로 연결된다 | 네 모듈이 중앙 OS 레이어로 조립 | combine | 모듈들이 한 중심으로 연결되고 상태가 잠긴다 | Remotion system diagram | 기능명 카드 네 개만 보인다 |
| 02 | 챗봇 경쟁이 아니라 운영 시스템 경쟁이다 | 답변 생성보다 기억, 기준, 역할, 후속 작업이 중요하다 | old question vs new frame 비교 | reframe | 단발 답변이 운영 모듈로 전환된다 | HTML diagram | 단순 before/after 텍스트만 보인다 |
| 03 | 드리밍은 세션 사이에 맥락을 정리한다 | 과거 세션, 반복 실수, 성공 패턴이 메모리로 정리된다 | source zoom + memory sorting | remember | 노이즈가 메모리 항목으로 정리된다 | official capture + memory cards | 캡처가 배경처럼만 보인다 |
| 04 | 긴 프로젝트에서 메모리는 세션을 이어준다 | 어제의 판단이 오늘의 요청과 다음 세션으로 이어진다 | timeline continuity | carry | 시간축을 따라 맥락이 이동한다 | Remotion timeline | 추상 카드만 반복된다 |
| 05 | 아웃컴은 좋은 결과를 기준표로 만든다 | 결과를 느낌이 아니라 기준으로 평가한다 | rubric table build | define | 기준, 가중치, 통과선이 생성된다 | rubric diagram | 진행바나 카드만 보인다 |
| 06 | 아웃컴은 기준, 채점, 수정, 재검수를 루프로 만든다 | 작업자와 검수자가 분리되고 기준 미달이면 돌아온다 | revision loop | revise | 실패 출력이 수정 루프로 되돌아간다 | loop diagram | 원형 장식만 돈다 |
| 07 | 멀티에이전트는 리드가 일을 나누는 구조다 | 하나의 에이전트가 모든 일을 하지 않는다 | lead-to-workers split | split | 작업 패킷이 여러 담당으로 나뉜다 | worker network | 담당자 카드만 나열된다 |
| 08 | 복잡한 작업은 병렬 lane으로 나누면 빨라진다 | 로그, 문서, 코드, 통합 판단이 동시에 진행된다 | fan-out/fan-in lanes | merge | 패킷이 분산 처리 후 다시 합쳐진다 | lane graph | 큰 빈 카드 네 개가 보인다 |
| 09 | 이벤트 트리거는 조건이 맞으면 일을 시작시킨다 | 사람이 다시 호출하지 않아도 조건 감지 후 후속 작업이 생긴다 | event packet through gate | trigger | 이벤트가 gate를 통과해 action을 만든다 | trigger pipeline | event/action 카드만 보인다 |
| 10 | 자동화는 호출이 아니라 큐와 상태 흐름이다 | 이벤트가 큐에 들어가 실행되고 알림으로 끝난다 | action queue | enqueue | 큐 상태가 waiting/running/done으로 변한다 | queue diagram | 진행바만 보인다 |
| 11 | 네 기능은 하나의 에이전트 운영체제로 수렴한다 | 기억, 기준, 분업, 트리거가 함께 작동한다 | system convergence | converge | 네 축이 중앙 OS로 수렴한다 | convergence diagram | 요약 카드만 보인다 |
| 12 | 실제 사례들은 같은 운영 방향을 보여준다 | Harvey, Netflix, Spiral, Wisedocs가 모두 시스템화 방향이다 | source capture + case evidence cards | prove | 캡처와 사례 카드가 같은 주장을 지지한다 | official capture | 캡처가 작거나 의미 없이 배경화된다 |
| 13 | 경쟁 질문은 모델에서 운영 방식으로 바뀐다 | 중요한 질문은 똑똑함보다 학습, 검수, 분업 방식이다 | question replacement | replace | old question이 new question으로 교체된다 | kinetic typography | 마지막 질문이 기억에 남지 않는다 |
