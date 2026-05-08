# K-harness Ouroboros

## Overview

- **Goal**: Ouroboros를 "코드 쓰기 전 막연한 아이디어를 검증된 명세로 바꾸는 워크플로우 엔진"으로 설명한다.
- **Target viewer**: AI 코딩을 쓰지만 결과가 자꾸 산으로 가는 개발자/빌더.
- **Duration**: ElevenLabs TTS 기준 약 70-90초.
- **Format**: 1920x1080 horizontal.
- **Tone**: calm hype, technical explainer.
- **Visual style**: `../../shared/DESIGN.md`
- **Approval state**: production-run by user instruction.

## Research Notes

- Source: `source/README.ko.md`
- Product claim: "프롬프트를 멈추세요. 명세를 시작하세요."
- Definition: AI가 코드를 쓰기 전에 막연한 아이디어를 검증된 명세로 바꿔주는 명세 우선 워크플로우 엔진.
- Core diagnosis: AI 코딩은 출력보다 입력 단계에서 실패한다.
- Core flow: `ooo interview` -> `ooo seed` -> `ooo run` -> `ooo evaluate`.
- Gate: `Ambiguity <= 0.2` before Seed.
- Convergence: `Similarity >= 0.95`.
- Runtime support: Claude Code, Codex CLI, Kiro CLI.

## Voiceover Script

```text
AI가 코드를 못 쓰는 게 아닙니다.
우리가 뭘 만들지 덜 정한 겁니다.
그래서 결과가 자꾸 흔들립니다.
오늘 볼 건 우로보로스입니다.
K-harness로 설명하면,
코드 전에 명세를 고정하는 엔진입니다.
아이디어가 막연하면,
바로 구현하지 않습니다.
먼저 질문합니다.
무엇을 만들 건가.
제약은 뭔가.
성공 기준은 뭔가.
이게 소크라테스식 인터뷰입니다.
그 다음 Seed로 바꿉니다.
대답을 그냥 저장하는 게 아니라,
실행 가능한 스펙으로 압축합니다.
핵심 숫자도 있습니다.
모호성이 0.2 밑으로 내려가야,
비로소 만들 준비가 됩니다.
그 전에는 코딩이 아닙니다.
그건 추측입니다.
그 다음은 실행입니다.
Double Diamond로 넓히고,
다시 좁혀서 설계합니다.
마지막은 평가입니다.
Mechanical,
Semantic,
Consensus.
세 단계로 결과를 걸러냅니다.
그리고 끝나면 다시 돌아옵니다.
평가 결과가 다음 명세의 입력이 됩니다.
그래서 우로보로스는 반복이 아니라,
진화 루프입니다.
좋은 AI 코딩은,
프롬프트를 잘 치는 게 아닙니다.
코드 전에 명세를 통과시키는 겁니다.
아이디어가 흐리면,
AI는 빠르게 틀립니다.
명세가 선명하면,
AI는 빠르게 맞춥니다.
이게 우로보로스의 핵심입니다.
프롬프트를 멈추고,
명세부터 시작하세요.
```

## Scene Summary

| # | Time | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|
| 01 | 0:00-0:08 | AI 문제가 아니라 입력 문제 | title cascade + broken prompt | text pop, red X flicker | TTS |
| 02 | 0:08-0:18 | Ouroboros 정의 | spec-first engine card | camera push, product card reveal | README |
| 03 | 0:18-0:31 | 인터뷰가 숨은 가정을 드러냄 | 3-question stack | question cards stagger | README |
| 04 | 0:31-0:43 | Seed와 Ambiguity gate | ambiguity meter | gauge drops to <=0.2 | README |
| 05 | 0:43-0:57 | Double Diamond 실행 | diamond workflow diagram | wide canvas pan | README |
| 06 | 0:57-1:09 | 3단계 평가 | Mechanical/Semantic/Consensus gates | three gates light up | README |
| 07 | 1:09-end | 진화 루프와 takeaway | loop diagram + final line | loop stroke + final fade | README |

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
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
