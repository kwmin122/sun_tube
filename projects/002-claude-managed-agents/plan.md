# Claude Managed Agents 업데이트

## Overview

- **Goal**: Claude Managed Agents 업데이트를 "모델보다 시스템"이라는 각도로 설명하는 3분 한국어 모션 영상
- **Target viewer**: AI 코딩/자동화/콘텐츠 제작에 에이전트를 쓰는 개발자와 빌더
- **Duration**: 약 3분
- **Format**: 1920x1080 horizontal
- **Tone**: hype + technical explainer
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
- Strongest material: Anthropic 공식 발표의 dreaming/outcomes/multiagent orchestration 설명과 Harvey, Netflix, Spiral, Wisedocs 사례.
- Interview/image/demo candidates: 인터뷰 없음. 공식 블로그 화면, 시스템 다이어그램, 케이스 카드, 숫자 카운터.
- Open question: 3분 영상으로 갈지, 사례를 더 살려 5분+로 늘릴지.

## Creative Brief Summary

- Chosen angle: Claude Managed Agents 업데이트의 본질은 "더 좋은 모델"이 아니라 "더 나은 에이전트 운영 시스템"이다.
- Length decision: 3min
- Structure: 문제 제기 -> 세 가지 구조적 해결책 -> 사례 -> 시스템 설계 결론
- Tone: 빠르고 선명한 기술 해설

## Voiceover Script

Write spoken Korean lines here. Use one idea per line.

```text
AI 에이전트의 진짜 한계는, 모델이 덜 똑똑해서가 아닐 수 있습니다.

문제는 구조입니다.

매번 백지에서 시작하고,
자기 결과물이 충분히 좋은지 스스로 판단하지 못하고,
복잡한 일을 혼자서 다 처리하려고 하면,
아무리 좋은 모델이어도 실무에서는 불안정해집니다.

Anthropic이 Claude Managed Agents에 새로 넣은 업데이트는,
바로 이 구조 문제를 정면으로 건드립니다.

핵심은 세 가지입니다.

첫 번째, 드리밍.

이건 에이전트가 쉬는 시간에 과거 세션과 메모리를 다시 훑어보는 기능입니다.

반복된 실수,
자주 성공한 워크플로,
팀 전체가 선호한 패턴을 찾아내고,
메모리를 더 쓸모 있게 정리합니다.

작업 중에 배우는 게 메모리라면,
드리밍은 세션 사이에 배우는 구조입니다.

두 번째, 아웃컴.

이건 에이전트에게 "좋은 결과가 무엇인지" 기준을 주는 기능입니다.

개발자가 루브릭을 만들면,
별도의 채점 모델이 최종 산출물을 평가합니다.

기준에 못 미치면,
에이전트가 다시 고칩니다.

중요한 건 작업자와 검수자가 분리됐다는 점입니다.

에이전트가 자기 생각에 취해서 "이 정도면 됐겠지" 하고 끝내는 게 아니라,
별도 평가자가 품질 기준을 들이댑니다.

세 번째, 멀티에이전트 오케스트레이션.

이건 하나의 에이전트가 모든 걸 혼자 하는 대신,
리드 에이전트가 일을 쪼개고,
전문 서브에이전트들이 병렬로 처리하는 구조입니다.

로그는 로그 담당에게,
문서는 문서 담당에게,
메트릭은 메트릭 담당에게 나눠주는 식입니다.

즉 Claude Managed Agents는 이제 단순한 챗봇이 아니라,
작은 팀처럼 움직이는 방향으로 가고 있습니다.

드리밍은 시간 축에서 에이전트를 개선하고,
아웃컴은 품질 축에서 결과물을 검증하고,
멀티에이전트는 복잡도 축에서 일을 분산합니다.

이 세 개가 합쳐지면,
에이전트는 "혼자 똑똑한 모델"이 아니라,
학습하고, 검수하고, 분업하는 시스템이 됩니다.

실제 사례도 이 방향을 보여줍니다.

Harvey는 드리밍으로 작업 완료율이 크게 올랐고,
Netflix는 수백 개 빌드 로그를 병렬 분석하는 에이전트를 만들었고,
Spiral은 가벼운 모델로 요청을 라우팅하고,
고품질 글쓰기에는 더 강한 모델을 투입합니다.

Wisedocs는 아웃컴으로 문서 검수 속도를 줄였습니다.

여기서 중요한 건,
모든 단계에 가장 비싼 모델을 넣는 게 아니라는 점입니다.

각 단계에 맞는 역할,
기준,
기억,
검수 구조를 배치하는 겁니다.

그래서 이번 업데이트의 핵심은 이 한 문장입니다.

에이전트 경쟁은 이제 "어떤 모델을 쓰냐"에서,
"어떤 시스템으로 운영하냐"로 넘어가고 있습니다.

앞으로 진짜 질문은 이겁니다.

내 AI는 얼마나 똑똑한가?

그보다 먼저,
내 AI는 어떻게 배우고,
어떻게 검수하고,
어떻게 팀으로 일하는가?
```

## Scene Summary

| # | Time | Pattern Role | Tool Route | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:12 | hook/problem | capture + hyperframes | 한계는 모델이 아니라 구조다 | 발표 화면 후보 + 단독 AI 카드 과부하 | push-in + 경고 라벨 | Wikidocs/Anthropic 발표 화면 후보 |
| 02 | 0:12-0:30 | context/cause | hyperframes | 기존 에이전트의 세 병목 | 백지 시작/검수 부재/단독 처리 3패널 | sequential reveal | HTML/SVG 다이어그램 |
| 03 | 0:30-0:52 | fix/explanation | capture + hyperframes | 드리밍은 세션 사이 학습 | 메모리 조각 정리 장면 | noise -> signal 정리 | 공식 블로그 소재 |
| 04 | 0:52-1:15 | fix/explanation | hyperframes | 아웃컴은 품질 기준과 재작업 루프 | 산출물 -> grader -> pass/fail | loop animation | 루브릭/품질 게이트 그래픽 |
| 05 | 1:15-1:38 | fix/explanation | hyperframes | 멀티에이전트는 분업과 병렬 처리 | 리드 노드가 서브 노드에 라우팅 | fan-out/fan-in | Netflix/Spiral 소재 |
| 06 | 1:38-2:05 | synthesis/diagram | hyperframes | 학습/검증/분업 3축 시스템 | 삼각형 시스템 다이어그램 | three-axis lock-in | HTML/SVG |
| 07 | 2:05-2:35 | case/data | capture + hyperframes | 실제 팀 사례 | Harvey/Netflix/Spiral/Wisedocs 카드 | card stack + counters | 공식 사례 소재 |
| 08 | 2:35-3:00 | takeaway | hyperframes | 모델 경쟁에서 시스템 설계 경쟁으로 | "어떤 모델?" -> "어떤 시스템?" | text replace + hold | 타이포그래피 |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:12
- Pattern role: hook/problem
- Narration: "AI 에이전트의 진짜 한계는, 모델이 덜 똑똑해서가 아닐 수 있습니다."
- On-screen phrase: 모델 문제가 아니라 구조 문제
- Tool route: capture + hyperframes
- Layout: 중앙 AI 카드, 주변 업무 카드 과부하
- Primary motion: 카메라 push-in
- Secondary motion: 경고 라벨 3개 점등
- Caption: bottom, fixed
- SFX: low impact hit
- Verification frame: 0:08

### Scene 02

- Time: 0:12-0:30
- Pattern role: context/cause
- Narration: "매번 백지에서 시작하고..."
- On-screen phrase: 백지 시작 / 자기검증 부재 / 단독 처리
- Tool route: hyperframes
- Layout: 3-column failure board
- Primary motion: left-to-right panel reveal
- Secondary motion: red outline pulse
- Caption: bottom, fixed
- SFX: three short ticks
- Verification frame: 0:24

### Scene 03

- Time: 0:30-0:52
- Pattern role: fix/explanation
- Narration: "첫 번째, 드리밍."
- On-screen phrase: 세션 사이에 배우는 구조
- Tool route: capture + hyperframes
- Layout: memory store with cards
- Primary motion: messy cards sort into clean lanes
- Secondary motion: duplicate cards fade
- Caption: bottom, fixed
- SFX: soft sweep
- Verification frame: 0:44

### Scene 04

- Time: 0:52-1:15
- Pattern role: fix/explanation
- Narration: "두 번째, 아웃컴."
- On-screen phrase: 작업자와 검수자를 분리한다
- Tool route: hyperframes
- Layout: output card, grader gate, revision loop
- Primary motion: fail -> revise -> pass loop
- Secondary motion: rubric checklist checkmarks
- Caption: bottom, fixed
- SFX: pass chime
- Verification frame: 1:08

### Scene 05

- Time: 1:15-1:38
- Pattern role: fix/explanation
- Narration: "세 번째, 멀티에이전트 오케스트레이션."
- On-screen phrase: 혼자 하는 AI에서 팀으로 움직이는 AI로
- Tool route: hyperframes
- Layout: lead node center, specialist nodes around
- Primary motion: fan-out and fan-in routing lines
- Secondary motion: node labels flash by task
- Caption: bottom, fixed
- SFX: routing blips
- Verification frame: 1:28

### Scene 06

- Time: 1:38-2:05
- Pattern role: synthesis/diagram
- Narration: "드리밍은 시간 축에서..."
- On-screen phrase: 학습 x 검증 x 분업
- Tool route: hyperframes
- Layout: triangle system diagram
- Primary motion: three axes draw in sequence
- Secondary motion: center node glows
- Caption: bottom, fixed
- SFX: rising pulse
- Verification frame: 1:56

### Scene 07

- Time: 2:05-2:35
- Pattern role: case/data
- Narration: "실제 사례도 이 방향을 보여줍니다."
- On-screen phrase: Harvey / Netflix / Spiral / Wisedocs
- Tool route: capture + hyperframes
- Layout: four case cards
- Primary motion: card stack spread
- Secondary motion: numeric counters
- Caption: bottom, fixed
- SFX: fast card hits
- Verification frame: 2:22

### Scene 08

- Time: 2:35-3:00
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
