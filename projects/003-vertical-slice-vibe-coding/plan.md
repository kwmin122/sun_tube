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

- Best angle lead: 기존 레이어 구조는 장점이 있지만, 바이브코딩에서는 AI가 기능 맥락을 한 번에 참고하기 쉬운 버티컬 슬라이스가 더 유리하다.
- Strongest material: layer/module structure vs feature-slice structure comparison.
- Interview/image/demo candidates: no interview, no body imagegen, Hyperframes diagram animation.
- Open question: 사용자가 TTS 전 대본 길이를 3분보다 짧게 줄일지 여부.

## Creative Brief Summary

- Chosen angle: AI가 참고하고 수정하기 쉬운 구조는 기술 레이어보다 기능 흐름을 가까이 묶는 버티컬 슬라이스다.
- Length decision: 3min
- Structure: 기존 구조의 장점 -> AI 코딩에서 생기는 맥락 문제 -> 버티컬 슬라이스 정의 -> AI에게 좋은 이유 -> 적용 규칙
- Tone: 바로 본론, 실전형

## Voiceover Script

Write spoken Korean lines here. Use one idea per line. Use TTS-friendly Korean pronunciations.

```text
예전에는 앱을 보통 레이어로 나눴습니다.

유아이는 유아이 폴더.
에이피아이는 에이피아이 폴더.
서비스는 서비스 폴더.
디비는 디비 폴더.

이 구조가 틀렸다는 말은 아닙니다.

역할이 분명하고,
규칙을 잡기 쉽고,
큰 팀이 관리하기 좋습니다.

사람이 전체 설계를 오래 들고 갈 때는,
이런 구조가 꽤 안정적입니다.

그런데 바이브코딩에서는,
문제가 조금 다르게 생깁니다.

에이아이에게 회원가입을 고치라고 했는데,
관련 코드가 여러 레이어에 흩어져 있다고 해보세요.

화면은 페이지 폴더에 있고,
에이피아이는 라우트 폴더에 있고,
검증 로직은 유틸 폴더에 있고,
디비 스키마는 또 다른 곳에 있습니다.

그러면 에이아이는 한 기능을 이해하려고,
계속 폴더를 왔다 갔다 해야 합니다.

컨텍스트는 길어지고,
참고해야 할 파일은 늘어나고,
한쪽만 고치고 다른 쪽을 놓치기 쉬워집니다.

여기서 버티컬 슬라이스가 강해집니다.

버티컬 슬라이스는,
기술 레이어 기준이 아니라,
사용자 기능 기준으로 코드를 묶는 방식입니다.

예를 들어 회원가입 슬라이스라면,
회원가입 화면,
입력 검증,
에이피아이,
저장 로직,
성공 화면,
테스트까지,
한 기능의 흐름을 가까운 곳에 둡니다.

그러면 에이아이가 보기 좋습니다.

왜냐하면 한 폴더 안에서,
이 기능이 무엇을 받고,
무엇을 처리하고,
무엇을 보여주는지,
맥락을 한 번에 따라갈 수 있기 때문입니다.

바이브코딩에서 중요한 건,
파일을 예쁘게 나누는 게 아닙니다.

에이아이가 지금 바꾸는 기능의 의도를,
헷갈리지 않게 만드는 겁니다.

레이어 구조에서는,
작은 수정도 여러 폴더를 건드립니다.

버티컬 슬라이스에서는,
수정 범위가 기능 단위로 좁아집니다.

회원가입을 고치면 회원가입 슬라이스를 보고,
파일 업로드를 고치면 업로드 슬라이스를 보고,
결제를 고치면 결제 슬라이스를 보는 식입니다.

이게 좋은 이유는 세 가지입니다.

첫 번째,
에이아이에게 줄 컨텍스트가 짧아집니다.

두 번째,
관련 파일을 같이 읽기 쉬워집니다.

세 번째,
수정이 다른 기능으로 번질 확률이 줄어듭니다.

그래서 프롬프트도 달라져야 합니다.

앱 전체를 정리해줘.
이렇게 말하는 대신,
회원가입 슬라이스 안에서만 수정해줘.

화면,
에이피아이,
검증,
저장,
테스트를 같이 보고,
이 기능 흐름만 끝내줘.

이렇게 말하는 게 훨씬 낫습니다.

물론 모든 프로젝트를 무조건 이렇게 해야 한다는 뜻은 아닙니다.

공통 인증,
공통 디자인 시스템,
공통 데이터베이스 설정처럼,
공유 레이어가 필요한 부분은 남겨야 합니다.

다만 기능을 만들고 고치는 단위는,
가능하면 세로로 잡는 게 좋습니다.

바이브코딩에서 좋은 구조는,
사람이 보기 좋은 폴더 구조만이 아닙니다.

에이아이가 기능의 맥락을 잃지 않고,
참고하고,
수정하고,
다시 이어갈 수 있는 구조입니다.

한 줄로 정리하면 이겁니다.

공통은 공유하고,
기능은 세로로 묶고,
에이아이에게는 슬라이스 단위로 맡기세요.
```

## Scene Summary

| # | Time | Pattern Role | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|
| 01 | 0:00-0:15 | setup | 기존에는 레이어로 나누는 구조가 흔했다 | UI/API/Service/DB layer stack | layer labels appear one by one | none |
| 02 | 0:15-0:35 | balance | 기존 구조도 장점이 있다 | role clarity board | benefit cards reveal | none |
| 03 | 0:35-1:00 | problem | AI는 한 기능을 이해하려고 여러 폴더를 오가야 한다 | scattered related files | context path jumps | none |
| 04 | 1:00-1:25 | definition | 버티컬 슬라이스는 기능 흐름 기준으로 묶는다 | feature slice folder | slice groups related modules | none |
| 05 | 1:25-1:55 | ai-fit | AI가 한 기능의 맥락을 한 번에 따라가기 쉽다 | module cluster map | focus lens over one slice | none |
| 06 | 1:55-2:18 | benefits | 컨텍스트 짧음, 관련 파일 가까움, 수정 범위 좁음 | three benefit lanes | one benefit at a time | none |
| 07 | 2:18-2:43 | prompt rule | AI에게 슬라이스 단위로 맡긴다 | prompt card + scope fence | type-in + scope lock | none |
| 08 | 2:43-3:05 | caveat | 공통 레이어는 남기고 기능만 세로로 묶는다 | shared core + feature slices | shared base stays, slices rise | none |
| 09 | 3:05-3:20 | payoff | 공통은 공유하고 기능은 세로로 묶는다 | final architecture lock | kinetic phrase, final check | thumbnail imagegen optional |

## Detailed Scene Plan

### Scene 01

- Time: 0:00-0:15
- Pattern role: setup
- Narration: 예전에는 앱을 보통 레이어로 나눴습니다.
- On-screen phrase: 기존 구조: UI / API / Service / DB
- Layout: four horizontal architecture layers
- Primary motion: layer labels appear one by one
- Secondary motion: subtle role badges attach to each layer
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: soft layer ticks
- Verification frame: layer labels readable, not all elements overfilled

### Scene 02

- Time: 0:15-0:35
- Pattern role: balance
- Narration: 이 구조도 장점이 있습니다.
- On-screen phrase: 역할 분리 / 규칙 / 큰 팀
- Layout: three benefit cards anchored to the layer stack
- Primary motion: one benefit card appears at a time
- Secondary motion: previous benefit remains dimmed as context
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: clean ticks
- Verification frame: current benefit dominates

### Scene 03

- Time: 0:35-1:00
- Pattern role: problem
- Narration: 그런데 AI는 한 기능을 이해하려고 여러 폴더를 왔다 갔다 해야 합니다.
- On-screen phrase: 기능 맥락이 흩어집니다
- Layout: scattered files connected to one feature label
- Primary motion: context path jumps across folders
- Secondary motion: missed-file warning appears once
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: short jump ticks
- Verification frame: scattered related files are visible but not cluttered

### Scene 04

- Time: 1:00-1:25
- Pattern role: definition
- Narration: 버티컬 슬라이스는 기술 레이어가 아니라 기능 흐름 기준으로 묶는 방식입니다.
- On-screen phrase: feature slice
- Layout: one feature folder containing UI, API, validation, storage, test
- Primary motion: related modules group into one vertical slice
- Secondary motion: slice boundary locks
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: grouping chime
- Verification frame: the slice grouping is obvious

### Scene 05

- Time: 1:25-1:55
- Pattern role: ai-fit
- Narration: 그러면 AI가 한 기능의 맥락을 한 번에 따라갈 수 있습니다.
- On-screen phrase: AI가 참고하기 쉬운 구조
- Layout: focused module cluster with one active lens
- Primary motion: lens scans UI -> API -> validation -> DB -> test inside the slice
- Secondary motion: outside modules stay dimmed
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: scan ticks
- Verification frame: active lens is inside one slice only

### Scene 06

- Time: 1:55-2:18
- Pattern role: benefits
- Narration: 컨텍스트는 짧아지고, 관련 파일은 가까워지고, 수정 범위는 좁아집니다.
- On-screen phrase: 짧은 컨텍스트 / 가까운 파일 / 좁은 수정
- Layout: three benefit lanes
- Primary motion: one lane activates at a time
- Secondary motion: before/after metric ticks
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: step ticks
- Verification frame: only one benefit lane is active

### Scene 07

- Time: 2:18-2:43
- Pattern role: prompt rule
- Narration: AI에게는 회원가입 슬라이스 안에서만 수정해달라고 말해야 합니다.
- On-screen phrase: 이 슬라이스 안에서만 수정
- Layout: prompt card inside scope boundary
- Primary motion: prompt line types in, scope boundary locks
- Secondary motion: acceptance checks appear one by one
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: type + lock
- Verification frame: prompt rule is readable

### Scene 08

- Time: 2:43-3:05
- Pattern role: caveat
- Narration: 공통 인증, 디자인 시스템, 데이터베이스 설정처럼 공유 레이어는 남겨야 합니다.
- On-screen phrase: 공통은 공유, 기능은 세로로
- Layout: shared base layer with vertical feature slices above it
- Primary motion: shared core stays fixed while feature slices rise
- Secondary motion: do-not-move badge on shared layer
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX: base lock
- Verification frame: shared layer and feature slices are visually distinct

### Scene 09

- Time: 3:05-3:20
- Pattern role: payoff
- Narration: 공통은 공유하고, 기능은 세로로 묶고, AI에게는 슬라이스 단위로 맡기세요.
- On-screen phrase: 공통은 공유하고 기능은 세로로
- Layout: final architecture diagram locks into a stable shape
- Primary motion: shared base + feature slices align, final phrase locks
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
