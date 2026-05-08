# Claude Managed Agents 업데이트

## Overview

- **Goal**: Claude Managed Agents 업데이트를 "모델보다 시스템"이라는 각도로 설명하는 3분 한국어 정보 전달 영상
- **Target viewer**: AI 코딩/자동화/콘텐츠 제작에 에이전트를 쓰는 개발자와 빌더
- **Duration**: 약 3분
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
- Open question: 3분 영상으로 갈지, 사례를 더 살려 5분+로 늘릴지.

## Creative Brief Summary

- Chosen angle: Claude Managed Agents 업데이트의 본질은 "더 좋은 모델"이 아니라 "더 나은 에이전트 운영 시스템"이다.
- Length decision: 3min
- Structure: 바로 발표 내용 진입 -> 네 가지 업데이트 -> 사례 -> 시스템 설계 결론
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

AI 에이전트를 그냥 더 똑똑하게 만드는 게 아니라,
더 일 잘하는 구조로 바꾸는 업데이트입니다.

첫 번째, 드리밍.

드리밍은 정말 저희가 자러 갈 때 벌어지는 기능에 가깝습니다.

에이전트가 비활성 시간에,
과거 세션과 메모리를 다시 훑어봅니다.

반복된 실수,
자주 성공한 워크플로,
팀 전체의 선호 패턴을 찾아내고,
메모리를 더 쓸모 있게 정리합니다.

작업 중에 배우는 게 메모리라면,
드리밍은 세션 사이에 배우는 기능입니다.

두 번째, 아웃컴.

아웃컴은 에이전트에게,
좋은 결과가 뭔지 기준을 주는 기능입니다.

개발자가 루브릭을 만들면,
별도의 채점 모델이 최종 산출물을 평가합니다.

기준에 못 미치면,
에이전트가 다시 고칩니다.

중요한 건 작업자와 검수자가 분리됐다는 점입니다.

세 번째, 멀티에이전트 오케스트레이션.

하나의 에이전트가 모든 걸 혼자 하는 대신,
리드 에이전트가 일을 쪼개고,
전문 서브에이전트들이 병렬로 처리하는 구조입니다.

로그는 로그 담당에게,
문서는 문서 담당에게,
메트릭은 메트릭 담당에게 나눠주는 식입니다.

즉 Claude Managed Agents는 단순한 챗봇보다,
작은 팀처럼 움직이는 방향에 가깝습니다.

네 번째, 웹훅.

이건 에이전트 일을 시켜놓고,
계속 화면 앞에서 기다리지 않아도 되게 해주는 연결 고리입니다.

작업이 끝나면,
정해둔 곳으로 알림을 보내고,
다음 워크플로를 이어갈 수 있습니다.

길게 돌아가는 에이전트 작업에는,
이게 꽤 중요합니다.

드리밍은 시간 축에서 에이전트를 개선하고,
아웃컴은 품질 축에서 결과물을 검증하고,
멀티에이전트는 복잡도 축에서 일을 분산하고,
웹훅은 작업 흐름을 밖으로 연결합니다.

이 네 개가 합쳐지면,
에이전트는 "혼자 똑똑한 모델"이 아니라,
학습하고,
검수하고,
분업하고,
연결되는 시스템이 됩니다.

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
검수 구조를 배치하는 겁니다.

그래서 이번 업데이트의 핵심은 이 한 문장입니다.

에이전트 경쟁은 이제 어떤 모델을 쓰느냐에서,
어떤 시스템으로 운영하느냐로 넘어가고 있습니다.

그러니까 앞으로 질문은 이겁니다.

내 AI가 얼마나 똑똑한가보다,
내 AI가 어떻게 배우고,
어떻게 검수하고,
어떻게 팀으로 일하고,
어떻게 다음 작업으로 연결되는가.
```

## Scene Summary

| # | Time | Pattern Role | Tool Route | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:10 | direct hook | capture + hyperframes | 네 가지 업데이트 발표 | Wikidocs/Anthropic 발표 화면 + 4개 기능 카드 | title slam + 4-card pop | Wikidocs/Anthropic 발표 화면 후보 |
| 02 | 0:10-0:24 | reframe | hyperframes | 더 똑똑한 모델이 아니라 더 일 잘하는 구조 | 모델 카드 -> 운영 시스템 카드 | replace + lock | HTML/SVG 다이어그램 |
| 03 | 0:24-0:48 | feature/explanation | capture + hyperframes | 드리밍은 세션 사이 학습 | 메모리 조각 정리 장면 | noise -> signal 정리 | 공식 블로그 소재 |
| 04 | 0:48-1:10 | feature/explanation | hyperframes | 아웃컴은 기준과 별도 채점기 | 산출물 -> grader -> pass/fail | loop animation | 루브릭/품질 게이트 그래픽 |
| 05 | 1:10-1:34 | feature/explanation | hyperframes | 멀티에이전트는 분업과 병렬 처리 | 리드 노드가 서브 노드에 라우팅 | fan-out/fan-in | Netflix/Spiral 소재 |
| 06 | 1:34-1:52 | feature/explanation | hyperframes | 웹훅은 완료 알림과 워크플로 연결 | 에이전트 완료 -> webhook -> next system | pulse line + callback | webhook diagram |
| 07 | 1:52-2:18 | synthesis/diagram | hyperframes | 학습/검증/분업/연결 시스템 | 4축 시스템 다이어그램 | four-axis lock-in | HTML/SVG |
| 08 | 2:18-2:46 | case/data | capture + hyperframes | 실제 팀 사례 | Harvey/Netflix/Spiral/Wisedocs 카드 | card stack + counters | 공식 사례 소재 |
| 09 | 2:46-3:00 | takeaway | hyperframes | 모델 경쟁에서 시스템 설계 경쟁으로 | "어떤 모델?" -> "어떤 시스템?" | text replace + hold | 타이포그래피 |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:10
- Pattern role: direct hook
- Narration: "앤스로픽이 따끈따끈한 기능 네 가지를 발표했습니다."
- On-screen phrase: 따끈따끈한 네 가지 업데이트
- Tool route: capture + hyperframes
- Layout: 발표 화면 후보 위에 4개 기능 카드
- Primary motion: title slam
- Secondary motion: four-card pop
- Caption: bottom, fixed
- SFX: low impact hit
- Verification frame: 0:06

### Scene 02

- Time: 0:10-0:24
- Pattern role: reframe
- Narration: "AI 에이전트를 그냥 더 똑똑하게 만드는 게 아니라..."
- On-screen phrase: 더 똑똑하게? 아니, 더 일 잘하게
- Tool route: hyperframes
- Layout: model card replaced by operating system card
- Primary motion: text replace
- Secondary motion: system frame locks in
- Caption: bottom, fixed
- SFX: short lock
- Verification frame: 0:18

### Scene 03

- Time: 0:24-0:48
- Pattern role: fix/explanation
- Narration: "첫 번째, 드리밍."
- On-screen phrase: 세션 사이에 배우는 구조
- Tool route: capture + hyperframes
- Layout: memory store with cards
- Primary motion: messy cards sort into clean lanes
- Secondary motion: duplicate cards fade
- Caption: bottom, fixed
- SFX: soft sweep
- Verification frame: 0:38

### Scene 04

- Time: 0:48-1:10
- Pattern role: fix/explanation
- Narration: "두 번째, 아웃컴."
- On-screen phrase: 작업자와 검수자를 분리한다
- Tool route: hyperframes
- Layout: output card, grader gate, revision loop
- Primary motion: fail -> revise -> pass loop
- Secondary motion: rubric checklist checkmarks
- Caption: bottom, fixed
- SFX: pass chime
- Verification frame: 1:02

### Scene 05

- Time: 1:10-1:34
- Pattern role: fix/explanation
- Narration: "세 번째, 멀티에이전트 오케스트레이션."
- On-screen phrase: 혼자 하는 AI에서 팀으로 움직이는 AI로
- Tool route: hyperframes
- Layout: lead node center, specialist nodes around
- Primary motion: fan-out and fan-in routing lines
- Secondary motion: node labels flash by task
- Caption: bottom, fixed
- SFX: routing blips
- Verification frame: 1:24

### Scene 06

- Time: 1:34-1:52
- Pattern role: feature/explanation
- Narration: "네 번째, 웹훅."
- On-screen phrase: 완료되면 다음으로 연결
- Tool route: hyperframes
- Layout: completed agent task sends callback to next workflow
- Primary motion: pulse line to webhook node
- Secondary motion: next workflow card turns on
- Caption: bottom, fixed
- SFX: callback ping
- Verification frame: 1:44

### Scene 07

- Time: 1:52-2:18
- Pattern role: synthesis/diagram
- Narration: "드리밍은 시간 축에서..."
- On-screen phrase: 학습 x 검증 x 분업 x 연결
- Tool route: hyperframes
- Layout: four-axis system diagram
- Primary motion: four axes draw in sequence
- Secondary motion: center node glows
- Caption: bottom, fixed
- SFX: rising pulse
- Verification frame: 2:06

### Scene 08

- Time: 2:18-2:46
- Pattern role: case/data
- Narration: "실제 사례도 이 방향을 보여줍니다."
- On-screen phrase: 하비 / 넷플릭스 / 스파이럴 / 와이즈닥스
- Tool route: capture + hyperframes
- Layout: four case cards
- Primary motion: card stack spread
- Secondary motion: numeric counters
- Caption: bottom, fixed
- SFX: fast card hits
- Verification frame: 2:32

### Scene 09

- Time: 2:46-3:00
- Pattern role: takeaway
- Narration: "에이전트 경쟁은 이제..."
- On-screen phrase: 어떤 모델? -> 어떤 시스템?
- Tool route: hyperframes
- Layout: full-screen kinetic typography
- Primary motion: first phrase erases, second phrase locks
- Secondary motion: subtle grid lines converge
- Caption: bottom, fixed
- SFX: final low hit
- Verification frame: 2:52

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
