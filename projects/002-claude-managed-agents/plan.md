# Claude Managed Agents 업데이트

## Overview

- **Goal**: Claude Managed Agents 업데이트를 "모델보다 시스템"이라는 각도로 설명하는 약 6분 한국어 정보 전달 영상
- **Target viewer**: AI 코딩/자동화/콘텐츠 제작에 에이전트를 쓰는 개발자와 빌더
- **Duration**: 약 6분
- **Format**: 1920x1080 horizontal
- **Tone**: clear information delivery + technical explainer
- **Visual style**: `../../shared/DESIGN.md`
- **Motion design guide**: `../../skills/hyperframes-motion-design-guide/SKILL.md`
- **Content factory**: `../../CONTENT_FACTORY_PIPELINE.md`
- **Production roles**: `../../PRODUCTION_ROLES.md`
- **Creative pipeline**: `../../CREATIVE_DEVELOPMENT_PIPELINE.md`
- **Tool routing**: `../../TOOL_ROUTING_PIPELINE.md`
- **Primary content pattern**: Problem -> Cause -> Fix
- **Research pack**: `research-pack.md`
- **Creative brief**: `creative-brief.md`
- **Draft scene packets**: `draft-scene-packets.md`
- **Timed scene packets**: `timed-scene-packets.md`
- **Source notes**: `source-notes.md` optional compatibility notes
- **Design context**: `design-context.md`
- **Asset plan**: `asset-plan.md`
- **Approval state**: draft

## Research Pack Summary

- Best angle lead: 에이전트 경쟁력은 모델 성능보다 학습, 검증, 분업 구조로 이동한다.
- Strongest material: Anthropic 공식 발표의 dreaming/outcomes/multiagent orchestration/webhooks 설명과 Harvey, Netflix, Spiral, Wisedocs 사례.
- Interview/image/demo candidates: 인터뷰 없음. 공식 블로그 화면, 시스템 다이어그램, 케이스 카드, 숫자 카운터.
- Open question: TTS/SRT 후 각 기능 설명 길이를 50-70초 범위로 미세 조정할지.

## Creative Brief Summary

- Chosen angle: Claude Managed Agents 업데이트의 본질은 "더 좋은 모델"이 아니라 "더 나은 에이전트 운영 시스템"이다.
- Length decision: about 6min
- Structure: 바로 발표 내용 진입 -> 네 가지 업데이트 각각 설명 -> 언제 좋은지 -> 사례 -> 시스템 설계 결론
- Tone: 빠르고 선명한 기술 해설

## Voiceover Script

Write spoken Korean lines here. Use one idea per line. Use TTS-friendly Korean pronunciations.

```text
앤스로픽이 따끈따끈한 기능 네 가지를 발표했습니다.

클로드 매니지드 에이전트에 들어가는,
드리밍,
아웃컴,
멀티에이전트 오케스트레이션,
그리고 웹훅입니다.

이게 뭐냐면요.

에이아이 에이전트를 그냥 더 똑똑하게 만드는 게 아니라,
더 일 잘하는 구조로 바꾸는 업데이트입니다.

첫 번째, 드리밍.

드리밍은 에이전트가 쉬는 시간에,
자기 작업 기록을 다시 보는 기능입니다.

우리가 일을 끝내고 나서,
어떤 부분에서 자꾸 막혔는지,
어떤 순서로 했을 때 잘 풀렸는지,
나중에 정리하잖아요.

드리밍은 그걸 에이전트가 하는 겁니다.

과거 세션,
메모리 저장소,
반복된 실수,
자주 성공한 워크플로를 다시 훑고,
쓸모 있는 기억만 더 선명하게 정리합니다.

그래서 이 기능이 좋은 때는,
한 번 쓰고 끝나는 질문이 아닙니다.

팀이 비슷한 작업을 계속 반복할 때,
장기 프로젝트를 여러 날 이어갈 때,
여러 에이전트가 같은 팀 취향을 공유해야 할 때 좋습니다.

예를 들어 매번 같은 파일 형식에서 막히거나,
항상 같은 검토 순서를 반복한다면,
드리밍은 그 패턴을 다음 세션에 남깁니다.

작업 중에 배우는 게 메모리라면,
드리밍은 세션 사이에 배우는 구조입니다.

두 번째, 아웃컴.

아웃컴은 에이전트에게,
"잘했다"의 기준을 먼저 주는 기능입니다.

그냥 잘 만들어줘,
이렇게 시키는 게 아니라,
좋은 결과가 뭔지 루브릭으로 적어주는 겁니다.

그러면 에이전트가 산출물을 만들고,
별도의 채점 모델이 그 결과를 평가합니다.

중요한 건,
작업자와 검수자가 분리됐다는 점입니다.

작업한 에이전트가 스스로 자기합리화를 하는 게 아니라,
다른 컨텍스트의 채점기가 최종 결과만 보고 판단합니다.

부족하면,
뭐가 부족한지 짚어주고,
에이전트가 다시 고칩니다.

이 기능은 기준이 분명한 작업에 좋습니다.

요구사항을 빠뜨리면 안 되는 보고서,
형식이 중요한 문서,
브랜드 톤을 맞춰야 하는 글,
디자인 가이드를 따라야 하는 슬라이드처럼요.

반대로 기준이 흐리면 효과가 약합니다.

좋은 결과를 말로 정의할 수 있을수록,
아웃컴은 강해집니다.

세 번째, 멀티에이전트 오케스트레이션.

이건 하나의 에이전트가 모든 걸 혼자 하는 대신,
리드 에이전트가 일을 쪼개고,
전문 서브에이전트에게 나눠주는 구조입니다.

각 서브에이전트는,
자기 모델,
자기 프롬프트,
자기 도구를 가질 수 있습니다.

그리고 같은 파일 시스템 위에서 병렬로 일합니다.

예를 들어 장애 원인을 찾는다고 해보면,
한 에이전트는 배포 이력을 보고,
한 에이전트는 에러 로그를 보고,
한 에이전트는 메트릭을 보고,
한 에이전트는 고객 문의를 볼 수 있습니다.

리드 에이전트는 그 결과를 다시 모아서,
전체 판단을 내립니다.

이 기능은 일이 넓고 복잡할 때 좋습니다.

로그가 수백 개 있거나,
자료 출처가 여러 군데 있거나,
리서치와 분석과 문서화가 동시에 필요한 작업처럼요.

작은 질문 하나에는 과할 수 있습니다.

하지만 큰 작업에서는,
한 명이 오래 붙잡는 방식보다,
작은 팀이 병렬로 움직이는 방식이 훨씬 자연스럽습니다.

네 번째, 웹훅.

웹훅은 에이전트 작업이 끝났을 때,
밖으로 신호를 보내는 연결 고리입니다.

쉽게 말하면,
에이전트를 실행해놓고,
계속 화면 앞에서 기다리지 않아도 되는 기능입니다.

작업이 시작됐는지,
대기 상태가 됐는지,
끝났는지,
문제가 생겼는지,
정해둔 주소로 알려줄 수 있습니다.

그리고 알림을 받은 시스템은,
그 다음 작업을 이어갈 수 있습니다.

이건 긴 작업에 특히 좋습니다.

문서 생성이 끝나면 검수 큐로 보내고,
분석이 끝나면 슬랙에 알리고,
렌더가 끝나면 다음 품질 검사를 돌리는 식입니다.

사람이 계속 새로고침하지 않아도,
에이전트 작업이 다른 업무 시스템과 이어지는 겁니다.

짧은 채팅에는 필요 없지만,
운영 자동화를 만들 때는 꽤 핵심적인 부품입니다.

이 네 가지를 합치면 그림이 보입니다.

드리밍은 시간 축에서 에이전트를 개선하고,
아웃컴은 품질 축에서 결과물을 검증하고,
멀티에이전트는 복잡도 축에서 일을 분산하고,
웹훅은 작업 흐름을 밖으로 연결합니다.

그러니까 클로드 매니지드 에이전트는,
그냥 더 똑똑한 챗봇이 아닙니다.

학습하고,
검수하고,
분업하고,
연결되는 시스템에 가깝습니다.

실제 사례도 이 방향을 보여줍니다.

하비는 드리밍으로 작업 완료율이 여섯 배 가까이 올랐고,
넷플릭스는 수백 개 빌드 로그를 병렬 분석하는 에이전트를 만들었습니다.

스파이럴은 하이쿠로 요청을 라우팅하고,
고품질 글쓰기에는 오퍼스를 투입합니다.

와이즈닥스는 아웃컴으로 문서 검수 속도를 오십 퍼센트 줄였습니다.

여기서 중요한 건,
모든 단계에 가장 비싼 모델을 넣는 게 아니라는 점입니다.

각 단계에 맞는 역할,
기준,
기억,
검수,
연결 방식을 배치하는 겁니다.

그래서 이번 업데이트의 핵심은 이 한 문장입니다.

에이전트 경쟁은 이제 어떤 모델을 쓰느냐에서,
어떤 시스템으로 운영하느냐로 넘어가고 있습니다.

앞으로 질문은 이겁니다.

내 에이아이가 얼마나 똑똑한가보다,
내 에이아이가 어떻게 배우고,
어떻게 검수하고,
어떻게 팀으로 일하고,
어떻게 다음 작업으로 연결되는가.
```

## Scene Summary

| # | Time | Pattern Role | Tool Route | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:16 | direct hook | capture + hyperframes | 네 가지 업데이트 발표 | Wikidocs/Anthropic 발표 화면 + 4개 기능 카드 | title slam + 4-card pop | Wikidocs/Anthropic 발표 화면 후보 |
| 02 | 0:16-0:35 | reframe | hyperframes | 더 똑똑한 모델이 아니라 더 일 잘하는 구조 | 모델 카드 -> 운영 시스템 카드 | replace + lock | HTML/SVG 다이어그램 |
| 03 | 0:35-1:12 | feature/what | capture + hyperframes | 드리밍은 작업 기록을 다시 보는 기능 | 메모리 조각 정리 장면 | noise -> signal 정리 | 공식 블로그 소재 |
| 04 | 1:12-1:42 | feature/when useful | hyperframes | 드리밍은 반복 작업과 장기 프로젝트에 좋다 | 반복 업무 패턴과 팀 선호 카드 | pattern highlight | Harvey 소재 |
| 05 | 1:42-2:18 | feature/what | hyperframes | 아웃컴은 좋은 결과의 기준과 별도 채점기 | 산출물 -> grader -> pass/fail | loop animation | 루브릭/품질 게이트 그래픽 |
| 06 | 2:18-2:49 | feature/when useful | hyperframes | 아웃컴은 기준이 분명한 문서/디자인 작업에 좋다 | 요구사항/브랜드/가이드 체크리스트 | checklist scan | benchmark 소재 |
| 07 | 2:49-3:27 | feature/what | hyperframes | 멀티에이전트는 리드가 일을 쪼개 전문가에게 나눈다 | 리드 노드가 서브 노드에 라우팅 | fan-out/fan-in | Netflix/Spiral 소재 |
| 08 | 3:27-3:56 | feature/when useful | hyperframes | 멀티에이전트는 넓고 복잡한 병렬 작업에 좋다 | 로그/메트릭/문서/고객문의 병렬 패널 | parallel sweep | Netflix 소재 |
| 09 | 3:56-4:30 | feature/what | hyperframes | 웹훅은 작업 완료를 외부 시스템에 알린다 | 에이전트 완료 -> webhook -> next system | pulse line + callback | webhook diagram |
| 10 | 4:30-4:58 | feature/when useful | hyperframes | 웹훅은 긴 작업과 운영 자동화에 좋다 | 문서 검수 큐, 슬랙 알림, QA 자동 실행 | event chain | webhook docs |
| 11 | 4:58-5:22 | synthesis/diagram | hyperframes | 학습/검증/분업/연결 시스템 | 4축 시스템 다이어그램 | four-axis lock-in | HTML/SVG |
| 12 | 5:22-5:48 | case/data | capture + hyperframes | 실제 팀 사례 | Harvey/Netflix/Spiral/Wisedocs 카드 | card stack + counters | 공식 사례 소재 |
| 13 | 5:48-6:05 | takeaway | hyperframes | 모델 경쟁에서 시스템 설계 경쟁으로 | "어떤 모델?" -> "어떤 시스템?" | text replace + hold | 타이포그래피 |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:16
- Pattern role: direct hook
- Narration: "앤스로픽이 따끈따끈한 기능 네 가지를 발표했습니다."
- On-screen phrase: 따끈따끈한 네 가지 업데이트
- Tool route: capture + hyperframes
- Layout: 발표 화면 후보 위에 4개 기능 카드
- Primary motion: title slam
- Secondary motion: four-card pop
- Caption: bottom, fixed
- SFX: low impact hit
- Verification frame: 0:08

### Scene 02

- Time: 0:16-0:35
- Pattern role: reframe
- Narration: "에이아이 에이전트를 그냥 더 똑똑하게 만드는 게 아니라..."
- On-screen phrase: 더 똑똑하게? 아니, 더 일 잘하게
- Tool route: hyperframes
- Layout: model card replaced by operating system card
- Primary motion: text replace
- Secondary motion: system frame locks in
- Caption: bottom, fixed
- SFX: short lock
- Verification frame: 0:26

### Scene 03

- Time: 0:35-1:12
- Pattern role: feature/what
- Narration: "첫 번째, 드리밍."
- On-screen phrase: 쉬는 시간에 작업 기록을 다시 본다
- Tool route: capture + hyperframes
- Layout: memory store with cards
- Primary motion: messy cards sort into clean lanes
- Secondary motion: duplicate cards fade
- Caption: bottom, fixed
- SFX: soft sweep
- Verification frame: 0:52

### Scene 04

- Time: 1:12-1:42
- Pattern role: feature/when useful
- Narration: "그래서 이 기능이 좋은 때는..."
- On-screen phrase: 반복 작업 / 장기 프로젝트 / 팀 취향
- Tool route: hyperframes
- Layout: repeated task cards, long-running timeline, shared team memory
- Primary motion: pattern cards highlight
- Secondary motion: memory card saved to next session
- Caption: bottom, fixed
- SFX: soft save
- Verification frame: 1:28

### Scene 05

- Time: 1:42-2:18
- Pattern role: feature/what
- Narration: "두 번째, 아웃컴."
- On-screen phrase: 작업자와 검수자를 분리한다
- Tool route: hyperframes
- Layout: output card, grader gate, revision loop
- Primary motion: fail -> revise -> pass loop
- Secondary motion: rubric checklist checkmarks
- Caption: bottom, fixed
- SFX: pass chime
- Verification frame: 2:00

### Scene 06

- Time: 2:18-2:49
- Pattern role: feature/when useful
- Narration: "이 기능은 기준이 분명한 작업에 좋습니다."
- On-screen phrase: 기준이 말로 정의될수록 강하다
- Tool route: hyperframes
- Layout: requirements, brand tone, design guide checklist
- Primary motion: checklist scan
- Secondary motion: vague criteria fades out
- Caption: bottom, fixed
- SFX: checklist ticks
- Verification frame: 2:34

### Scene 07

- Time: 2:49-3:27
- Pattern role: feature/what
- Narration: "세 번째, 멀티에이전트 오케스트레이션."
- On-screen phrase: 혼자 하는 AI에서 팀으로 움직이는 AI로
- Tool route: hyperframes
- Layout: lead node center, specialist nodes around
- Primary motion: fan-out and fan-in routing lines
- Secondary motion: node labels flash by task
- Caption: bottom, fixed
- SFX: routing blips
- Verification frame: 3:08

### Scene 08

- Time: 3:27-3:56
- Pattern role: feature/when useful
- Narration: "이 기능은 일이 넓고 복잡할 때 좋습니다."
- On-screen phrase: 로그 / 자료 / 메트릭 / 고객문의
- Tool route: hyperframes
- Layout: four parallel panels feeding one lead agent
- Primary motion: parallel sweep
- Secondary motion: duplicate noise filtered out
- Caption: bottom, fixed
- SFX: parallel ticks
- Verification frame: 3:42

### Scene 09

- Time: 3:56-4:30
- Pattern role: feature/what
- Narration: "네 번째, 웹훅."
- On-screen phrase: 완료되면 다음으로 연결
- Tool route: hyperframes
- Layout: completed agent task sends callback to next workflow
- Primary motion: pulse line to webhook node
- Secondary motion: next workflow card turns on
- Caption: bottom, fixed
- SFX: callback ping
- Verification frame: 4:14

### Scene 10

- Time: 4:30-4:58
- Pattern role: feature/when useful
- Narration: "이건 긴 작업에 특히 좋습니다."
- On-screen phrase: 기다리지 않고 이어붙인다
- Tool route: hyperframes
- Layout: document done -> review queue, render done -> QA, failure -> retry
- Primary motion: event chain
- Secondary motion: waiting cursor disappears
- Caption: bottom, fixed
- SFX: event relay
- Verification frame: 4:44

### Scene 11

- Time: 4:58-5:22
- Pattern role: synthesis/diagram
- Narration: "드리밍은 시간 축에서..."
- On-screen phrase: 학습 x 검증 x 분업 x 연결
- Tool route: hyperframes
- Layout: four-axis system diagram
- Primary motion: four axes draw in sequence
- Secondary motion: center node glows
- Caption: bottom, fixed
- SFX: rising pulse
- Verification frame: 5:10

### Scene 12

- Time: 5:22-5:48
- Pattern role: case/data
- Narration: "실제 사례도 이 방향을 보여줍니다."
- On-screen phrase: 하비 / 넷플릭스 / 스파이럴 / 와이즈닥스
- Tool route: capture + hyperframes
- Layout: four case cards
- Primary motion: card stack spread
- Secondary motion: numeric counters
- Caption: bottom, fixed
- SFX: fast card hits
- Verification frame: 5:35

### Scene 13

- Time: 5:48-6:05
- Pattern role: takeaway
- Narration: "에이전트 경쟁은 이제..."
- On-screen phrase: 어떤 모델? -> 어떤 시스템?
- Tool route: hyperframes
- Layout: full-screen kinetic typography
- Primary motion: first phrase erases, second phrase locks
- Secondary motion: subtle grid lines converge
- Caption: bottom, fixed
- SFX: final low hit
- Verification frame: 5:56

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
- Sync: ElevenLabs SRT, forced_alignment preferred

## Render Checks

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
