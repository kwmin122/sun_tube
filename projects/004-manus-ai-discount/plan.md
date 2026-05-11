# 마누스 AI 할인 대란

## Overview

- **Goal**: Manus AI 안드로이드 연간 결제 할인 제보를 빠르게 전달하고, 결제 전 확인 순서와 자동결제 확인 방법을 알려준다.
- **Target viewer**: Manus를 써볼지 고민하던 AI/개발툴 사용자.
- **Duration**: 1-2분
- **Format**: 1920x1080 horizontal
- **Tone**: 빠른 정보 전달, 제보와 공식 기준 분리.
- **Primary content pattern**: claim -> official context -> how-to -> caution
- **Research pack**: `research-pack.md`
- **Creative brief**: `creative-brief.md`
- **Draft scene packets**: `draft-scene-packets.md`
- **Scene contracts**: `scene-contracts.md`
- **Timed scene packets**: `timed-scene-packets.md`
- **Design context**: `design-context.md`
- **Asset plan**: `asset-plan.md`
- **Approval state**: approved by `factory:approve-plan`

## Latest Visual Rules

- No caption progress bar.
- Show one explanation unit at a time.
- Body scenes use Hyperframes diagrams only where capture is not the primary visual.
- Primary capture scenes must use a large half-side capture, not a small source stamp.
- Capture zoom, highlight, and Korean labels are optional.
- Script lines must be written into the chosen visual source.

## Voiceover Script

```text
여러분, 지금 마누스에서
일명 마쫀쿠 대란이 떴습니다.

핵심만 말하면,
안드로이드에서 마누스 연간 결제가
삼만이천 원대로 된다는 제보가 돌고 있습니다.

한국시간 이천이십육년 오월 십일일
오전 아홉 시 기준입니다.

원래 월 육만 원대라고 알려진 플랜이
구십육 퍼센트 할인처럼 보이는 상황입니다.

일 년에 삼만이천 원이면,
월 삼천 원도 안 됩니다.

마누스를 써볼 생각이 있었다면,
고민하는 시간이 더 아까운 가격입니다.

다만 이건 공식 할인 공지가 아니라,
커뮤니티 결제 인증 기준입니다.

방법은 간단합니다.

먼저 안드로이드에서
마누스 앱을 엽니다.

구글 플레이스토어 결제로
업그레이드 화면에 들어갑니다.

연간 결제를 켰을 때,
금액이 삼만이천 원대로 뜨는지 확인합니다.

결제 이력이 없는 계정에서
성공했다는 제보가 많습니다.

여기서 끝이 아닙니다.

제보 기준으로는,
프로 업그레이드 뒤에 추가 업그레이드로 들어가고,
이만 포인트를 선택했을 때
추가 기간이 붙는 사례도 있습니다.

다만 이 부분은 제보가 갈립니다.

그러니까 결제 버튼을 누르기 전에
실제 청구 금액과 기간을 꼭 보세요.

마누스를 어디에 쓰냐면,
반복 작업에 쓸 여지가 있습니다.

웹훅,
슬랙 트리거,
크롤링,
정기 데이터 수집,
이미지 생성,
비디오 생성 쪽입니다.

마지막으로 제일 중요한 것.

자동결제는 꼭 확인하세요.

구글 플레이에서
결제 및 정기 결제,
구독 관리로 들어가서
마누스 구독이 어떻게 잡혀 있는지 봐야 합니다.

오늘 확인할 건 세 가지입니다.

금액.
기간.
그리고 자동결제.

이 세 개가 맞으면 진행하고,
하나라도 이상하면 멈추세요.
```

## Scene Summary

| # | Time | Pattern Role | Core Message | Visual Concept | Motion Notes | Assets | Tool Route |
|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:29.6 | hook | 마쫀쿠 대란, 월 삼천 원도 안 됨 | giant price flip | annual price -> monthly equivalent -> urgency lock | none | hyperframes |
| 02 | 0:29.6-0:36.1 | official/context | 공식 공지와 커뮤니티 제보 분리 | large official capture + report badge | capture settles, report badge locks | Manus pricing help capture | capture + hyperframes |
| 03 | 0:36.1-0:51.6 | how-to | 안드로이드 확인 순서 | phone upgrade flow | app -> Google Play -> annual -> amount gate | none | hyperframes |
| 04 | 0:51.6-1:10.1 | how-to/warning | 추가 업그레이드는 금액/기간 확인 | upgrade period gate | points -> charge -> period check | user report text | hyperframes |
| 05 | 1:10.1-1:24.1 | application | 반복 작업 활용 후보 | workflow lanes | trigger token moves through use cases | none | hyperframes |
| 06 | 1:24.1-1:36.3 | caution | 자동결제는 Google Play에서 확인 | Google subscription capture + safety checks | capture settles, checks appear one by one | Google Play help capture | capture + hyperframes |
| 07 | 1:36.3-1:47.5 | close | 금액, 기간, 자동결제 | final action checklist | three checks lock | none | hyperframes |

## Motion Blueprint Summary

| # | Primary Screen Object | State Change | Motion Beat Ladder | Hold / Exit Rule | Snapshot Evidence |
|---|---|---|---|---|---|
| 01 | price flip | annual price becomes monthly equivalent | title -> annual price -> monthly price -> urgency badge | hold price, compress to tag | annual and monthly price visible |
| 02 | official pricing capture | official context separated from community report | capture -> report board -> not official badge | hold capture half-side | official capture readable |
| 03 | Android upgrade flow | viewer sees sequence | phone -> app -> Google Play -> annual -> amount gate | completed steps dim | active amount check |
| 04 | upgrade period gate | excitement becomes verification | points -> charge -> period -> warning | hold 제보 기준 tag | charge/period visible |
| 05 | use-case lanes | tool becomes workflow | trigger -> crawling -> data -> image/video -> loop | lanes stay visible | active lanes |
| 06 | Google Play subscription capture | purchase becomes renewal safety | capture -> renewal -> manage -> account | hold capture half-side | Google help capture readable |
| 07 | final action checks | issue becomes action list | amount -> period -> subscription | all checks hold | three checks visible |

## Approval Gate

- Draft scene packets complete: yes
- User approved narration: yes, via `factory:approve-plan`
- User approved scene contract: yes, validators passed
- TTS allowed: yes, generated from ElevenLabs forced alignment

## TTS Notes

- Provider: ElevenLabs
- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output format: `mp3_44100_128`
- Timing subtitle: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Display text: `voiceover/solo/voiceover.txt`
- Spoken TTS text: `voiceover/solo/voiceover_elevenlabs_sam.txt`
- Display subtitle: `assets/audio/voiceover-display.srt`
- Sync: send `voiceover_elevenlabs_sam.txt` to ElevenLabs, create timing from ElevenLabs forced alignment, then replace only the SRT cue text with `voiceover.txt`. Display and spoken files must have the same line count. Captions are text-only with no progress bar
