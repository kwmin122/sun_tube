# 버티컬 슬라이스 아키텍처를 사용해야하는 이유

## Overview

- **Goal**: 바이브코딩에서 버티컬 슬라이스 아키텍처가 필요한 이유를 약 3분 안팎으로 설명하는 한국어 정보 전달 영상
- **Target viewer**: AI 코딩 도구로 앱을 만드는 개발자, 1인 빌더, 팀 리드
- **Duration**: 약 3분 8초 예상
- **Format**: 1920x1080 horizontal
- **Tone**: direct, practical, technical explainer
- **Visual style**: `../../shared/DESIGN.md`
- **Motion design guide**: `../../skills/hyperframes-motion-design-guide/SKILL.md`
- **Content factory**: `../../CONTENT_FACTORY_PIPELINE.md`
- **Production roles**: `../../PRODUCTION_ROLES.md`
- **Creative pipeline**: `../../CREATIVE_DEVELOPMENT_PIPELINE.md`
- **Tool routing**: `../../TOOL_ROUTING_PIPELINE.md`
- **Primary content pattern**: problem -> named method -> workflow -> before/after -> takeaway
- **Research pack**: `research-pack.md`
- **Creative brief**: `creative-brief.md`
- **Draft scene packets**: `draft-scene-packets.md`
- **Timed scene packets**: `timed-scene-packets.md`
- **Source notes**: `source-notes.md` optional compatibility notes
- **Design context**: `design-context.md`
- **Asset plan**: `asset-plan.md`
- **Approval state**: draft

## Research Pack Summary

- Best angle lead: 바이브코딩이 망하는 이유는 코드 양이 아니라 검증 단위가 너무 크기 때문이다.
- Strongest material: horizontal layer build vs vertical user-flow slice comparison.
- Interview/image/demo candidates: no interview, no body imagegen, Hyperframes diagram animation.
- Open question: 사용자가 TTS 전 대본 길이를 3분보다 짧게 줄일지 여부.

## Creative Brief Summary

- Chosen angle: AI에게 앱 전체가 아니라 사용자 흐름 하나를 끝까지 맡겨야 한다.
- Length decision: 3min
- Structure: 실패 패턴 -> 버티컬 슬라이스 정의 -> AI 코딩에 좋은 이유 -> 실행 루프 -> 결론
- Tone: 바로 본론, 실전형

## Voiceover Script

Write spoken Korean lines here. Use one idea per line. Use TTS-friendly Korean pronunciations.

```text
바이브코딩할 때 제일 위험한 건,
코드를 너무 많이 받는 겁니다.

한 번에 로그인도 만들고,
대시보드도 만들고,
디비도 만들고,
관리자 페이지도 만들면,
뭔가 엄청 진행된 것처럼 보이죠.

그런데 막상 실행해보면,
되는 기능은 하나도 없을 때가 많습니다.

문제는 코드 양이 아닙니다.

검증 단위가 너무 큰 겁니다.

그래서 필요한 게,
버티컬 슬라이스입니다.

버티컬 슬라이스는,
앱을 레이어별로 자르는 게 아니라,
사용자 흐름 하나를 끝까지 자르는 방식입니다.

예를 들어 회원가입을 만든다면,
유아이만 만드는 게 아닙니다.

버튼,
입력 검증,
에이피아이,
디비 저장,
성공 화면,
실패 처리까지,
한 줄로 끝까지 연결합니다.

작지만 실제로 되는 기능 하나를 만드는 겁니다.

반대로 레이어별로 만들면 이렇게 됩니다.

오늘은 유아이.
내일은 에이피아이.
그다음은 디비.
마지막에 테스트.

이 방식은 사람이 꼼꼼히 설계할 때는 괜찮을 수 있습니다.

하지만 바이브코딩에서는 위험합니다.

에이아이는 속도가 빠르기 때문에,
미완성 레이어도 빠르게 늘어납니다.

파일은 많아지고,
컨텍스트는 커지고,
어디서 깨졌는지 찾기 어려워집니다.

버티컬 슬라이스는 이걸 막아줍니다.

에이아이에게 이렇게 맡기는 겁니다.

이번에는 회원가입 플로우 하나만 끝내.

화면에서 입력하고,
서버로 보내고,
저장하고,
성공 메시지까지 보여줘.

그리고 그 흐름이 실제로 실행되는지 확인해.

이렇게 범위를 좁히면,
에이아이가 고칠 위치도 좁아집니다.

사용자도 바로 확인할 수 있습니다.

버튼을 눌렀을 때 되는지,
에러가 보이는지,
데이터가 남는지,
다음 화면으로 가는지.

검증이 쉬워집니다.

실전에서는 이 순서로 하면 됩니다.

첫 번째,
사용자 행동 하나를 고릅니다.

회원가입,
파일 업로드,
결제 시작,
댓글 작성처럼요.

두 번째,
성공 조건을 먼저 씁니다.

사용자가 뭘 누르면,
어떤 데이터가 저장되고,
어떤 화면이 보여야 하는지 정합니다.

세 번째,
에이아이에게 그 슬라이스만 구현하라고 시킵니다.

네 번째,
바로 실행해서 확인합니다.

다섯 번째,
통과하면 그 슬라이스를 잠그고,
다음 슬라이스로 넘어갑니다.

이게 핵심입니다.

앱 전체를 한 번에 완성하려고 하지 마세요.

작은 기능 하나를,
유아이부터 데이터까지,
끝까지 살아있게 만드세요.

바이브코딩에서 좋은 아키텍처는,
멋진 폴더 구조가 먼저가 아닙니다.

검증 가능한 작업 단위를 만드는 겁니다.

한 줄로 정리하면 이겁니다.

크게 만들지 말고,
작게 잘라서,
끝까지 실행하세요.
```

## Scene Summary

| # | Time | Pattern Role | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|
| 01 | 0:00-0:13 | hook/problem | 코드가 너무 많아지는 게 위험하다 | code mass -> vertical cut | title slam + slice cut | none |
| 02 | 0:13-0:35 | problem/context | 레이어별 진행은 모두 미완성일 수 있다 | UI/API/DB/Test layer stack | one layer at a time + failed run | none |
| 03 | 0:35-0:55 | definition | 사용자 흐름 하나를 끝까지 자른다 | vertical slice through stack | slice descends through layers | none |
| 04 | 0:55-1:18 | demo | 회원가입 흐름 예시 | button -> API -> DB -> success | packetFlow, active node only | none |
| 05 | 1:18-1:43 | ai-fit | AI는 좁은 목표에서 더 잘 고친다 | wide scatter vs scoped lane | scope fence, clean loop | none |
| 06 | 1:43-2:05 | workflow | 5단계 실행 루프 | choose -> define -> implement -> run -> lock | active lens stepper | none |
| 07 | 2:05-2:27 | contrast | 파일 많은 것과 기능 되는 것은 다르다 | many files vs one working path | left pile, right path pulse | none |
| 08 | 2:27-2:50 | action rule | 프롬프트를 slice 단위로 제한한다 | prompt card + acceptance checks | type-in + lock checks | none |
| 09 | 2:50-3:08 | payoff | 작게 잘라 끝까지 실행하라 | final vertical slice lock | kinetic phrase, final check | thumbnail imagegen optional |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:13
- Pattern role: hook/problem
- Narration: 바이브코딩할 때 제일 위험한 건, 코드를 너무 많이 받는 겁니다.
- On-screen phrase: 코드가 많아질수록 검증은 어려워집니다
- Layout: large headline, blurred code mass, single vertical cut
- Primary motion: text slam, code mass grows, cut line slices through
- Secondary motion: failed run badge flashes once
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: subtle hit
- Verification frame: slice line visible, no caption overlap

### Scene 02

- Time: 0:13-0:35
- Pattern role: problem/context
- Narration: 레이어별로 만들면 파일은 많은데 되는 기능이 없을 수 있다.
- On-screen phrase: UI / API / DB / Test 모두 partial
- Layout: four horizontal layers, one active layer at a time
- Primary motion: layer reveal, partial badge, run fail
- Secondary motion: dim previous layers as context
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: soft error tick
- Verification frame: only current layer bright

### Scene 03

- Time: 0:35-0:55
- Pattern role: named method
- Narration: 버티컬 슬라이스는 사용자 흐름 하나를 끝까지 자르는 방식이다.
- On-screen phrase: one user flow, end to end
- Layout: stack of layers crossed by one vertical slice
- Primary motion: vertical slice descends through layers
- Secondary motion: each layer lights only when crossed
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: lock chime
- Verification frame: vertical slice clearly crosses all layers

### Scene 04

- Time: 0:55-1:18
- Pattern role: demo
- Narration: 회원가입 예시는 버튼부터 저장과 성공 화면까지 한 줄로 연결된다.
- On-screen phrase: signup slice
- Layout: node rail: Button -> Validate -> API -> DB -> Success
- Primary motion: labeled packet moves through nodes
- Secondary motion: completed nodes remain dimly checked
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: short packet ticks
- Verification frame: current node active, packet visible

### Scene 05

- Time: 1:18-1:43
- Pattern role: ai-fit
- Narration: AI에게 작은 범위를 주면 고칠 위치도 작아진다.
- On-screen phrase: scope smaller, feedback faster
- Layout: left wide scatter, right fenced slice loop
- Primary motion: wide prompt scatters; slice prompt loops cleanly
- Secondary motion: scope fence tightens
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: scatter then clean tick
- Verification frame: right side more legible than left

### Scene 06

- Time: 1:43-2:05
- Pattern role: workflow
- Narration: 고르고, 기준을 쓰고, 구현하고, 실행하고, 잠근다.
- On-screen phrase: five-step slice loop
- Layout: large vertical stepper
- Primary motion: one active lens moves step by step
- Secondary motion: previous steps stay visible but dim
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: step ticks
- Verification frame: active step dominates

### Scene 07

- Time: 2:05-2:27
- Pattern role: contrast
- Narration: 파일 많은 것과 기능 되는 것은 다르다.
- On-screen phrase: many files vs working flow
- Layout: before/after split
- Primary motion: left file pile grows, right working path pulses
- Secondary motion: final success marker on right
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: low fail, clean success
- Verification frame: contrast readable at a glance

### Scene 08

- Time: 2:27-2:50
- Pattern role: action rule
- Narration: AI에게는 이 슬라이스만 끝내라고 말해야 한다.
- On-screen phrase: "이 흐름 하나만 끝까지"
- Layout: prompt card inside scope boundary
- Primary motion: prompt line types in, acceptance checks lock
- Secondary motion: scope boundary glows briefly
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: type + lock
- Verification frame: prompt readable, not covered by captions

### Scene 09

- Time: 2:50-3:08
- Pattern role: payoff
- Narration: 크게 만들지 말고, 작게 잘라서, 끝까지 실행하세요.
- On-screen phrase: 작게 잘라서 끝까지
- Layout: final kinetic typography over one completed slice
- Primary motion: slice closes, check appears, final phrase locks
- Secondary motion: subtle grid fade
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: final hit
- Verification frame: final phrase is clear

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
- Sync: ElevenLabs SRT, forced_alignment preferred; captions are text-only with no progress bar

## Render Checks

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
