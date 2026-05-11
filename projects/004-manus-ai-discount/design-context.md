# Design Context

## Project

- Project name: Manus AI Discount Alert
- Collection date: 2026-05-11
- Output purpose: 빠른 정보 전달형 YouTube explainer
- Format: 1920x1080 horizontal
- Target viewer: AI/개발툴 사용자
- Viewing situation: 빠르게 보고 안드로이드 결제 화면을 확인해야 하는 상황
- Primary content type: product
- Secondary content types: proof, tutorial
- Renderer targets: hyperframes

## Sources And Assets

- Official source links:
  - https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus
  - https://support.google.com/googleplay/answer/7018481
- Logo path: none
- Product image path: none
- UI screenshot path: `assets/screenshots/`
- Reference path: user-provided chat report in prompt

## Visual System

- Color tokens: near-black grid, warm orange urgency, cyan confirmation, muted gray panels
- Font choices: Pretendard / Apple SD Gothic Neo / Noto Sans KR fallback
- Visual mood: urgent but clean product alert
- Motion personality: one active object at a time, fast numeric emphasis, large readable captures
- Caption safe zone: bottom 160px, text-only, no progress bar
- Primary visual strategy: capture where source matters, Hyperframes where process matters
- Motion grammar: product-demo + technical-grid + kinetic-type
- Liquid Glass use: selected state only, not full panels
- Reference anti-patterns: empty glass panels, all cards at once, tiny capture stamp, floating connector lines

## Scene Visual Density

| Scene | Scene Recipe | Primary Visual Route | Capture Role | Capture Mode | Visual Density | Reveal Mode | Motion Layer | Imagegen Role | Video-use Role | HTML Motion Role | Renderer Targets | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | product/before-after-demo | hyperframes | not_required | not_required | rich | one-at-a-time | price flip, urgency lock | support | not_required | primary | hyperframes | giant price |
| 02 | proof/document-zoom-highlight | capture | primary_evidence | split_half | rich | one-at-a-time | capture settle, report reveal | not_required | not_required | support | hyperframes | official vs report |
| 03 | product/before-after-demo | hyperframes | not_required | not_required | rich | one-at-a-time | phone step focus | not_required | not_required | primary | hyperframes | how-to |
| 04 | explain/mechanism-state-machine | hyperframes | not_required | not_required | rich | one-at-a-time | verification gate | not_required | not_required | primary | hyperframes | period caution |
| 05 | explain/fan-out-fan-in | hyperframes | not_required | not_required | rich | one-at-a-time | use-case lane activation | support | not_required | primary | hyperframes | usefulness |
| 06 | proof/document-zoom-highlight | capture | primary_evidence | split_half | rich | one-at-a-time | capture settle, checks | not_required | not_required | support | hyperframes | auto-renew |
| 07 | explain/mechanism-state-machine | hyperframes | not_required | not_required | standard | one-at-a-time | check lock | not_required | not_required | primary | hyperframes | close |

## Scene Visual Thesis

| Scene | Visual Thesis | Viewer Must Understand | Primary Visual Mechanism | Narration Verb | Motion Must Show | Primary Asset | Failure If |
|---|---|---|---|---|---|---|---|
| 01 | 마쫀쿠 대란은 가격 체감이 핵심이다 | 월 삼천 원도 안 되는 가격감 | price flip | 떴습니다 | annual to monthly conversion | none | title card only |
| 02 | 공식가와 제보가는 분리해서 봐야 한다 | 공식 할인 확정이 아니다 | official capture + report card | 분리해서 봐야 합니다 | two evidence layers separated | Manus pricing help capture | capture too small |
| 03 | 방법은 조건보다 순서다 | 안드로이드 앱에서 금액을 직접 확인한다 | phone flow | 봅니다 | step-by-step activation | none | bullet list only |
| 04 | 추가 업그레이드는 기간 확인이 핵심이다 | 가격만 보지 말고 기간을 봐야 한다 | verification gate | 확인해야 합니다 | charge and period checks | user report text | guaranteed two-year claim |
| 05 | 싸게 산 뒤 쓸 곳은 반복 작업이다 | 웹훅/슬랙/크롤링/데이터 수집 등 | use-case lanes | 쓸 여지가 있습니다 | lanes activate into workflow | none | empty feature cards |
| 06 | 자동결제 확인이 마지막 안전장치다 | Google Play 구독 관리를 봐야 한다 | Google help capture + checks | 확인하세요 | subscription safety checks | Google help capture | no capture |
| 07 | 최종 체크는 세 가지다 | 금액/기간/자동결제 | final check lock | 보세요 | three checks lock | none | vague CTA |

## Scene Motion Blueprint

| Scene | Primary Screen Object | Supporting Objects | Initial State | Active State | End State | Motion Beat Ladder | Hold / Carryover Rule | Snapshot Evidence |
|---|---|---|---|---|---|---|---|---|
| 01 | price flip | urgency badge | dark grid | price flips and monthly equivalent appears | urgency badge locks | title -> annual price -> monthly equivalent -> badge | price stays visible | 0:04 |
| 02 | official capture | report board | compressed price tag | capture half-side, report price appears | not official badge remains | capture -> report -> badge | capture remains | 0:16 |
| 03 | phone flow | step labels | phone outline | each step activates | amount gate locks | app -> store -> annual -> amount | previous steps dim | 0:31 |
| 04 | upgrade gate | warning strip | amount gate | points/charge/period checks appear | amber caution | points -> charge -> period | report tag stays | 0:49 |
| 05 | use-case lanes | trigger token | empty lanes | lanes activate one by one | routine loop closes | trigger -> crawl -> data -> image/video -> loop | lanes stay visible | 1:05 |
| 06 | subscription capture | safety checks | caution title | capture half-side, checks appear | three safety checks hold | capture -> renewal -> manage -> account | capture remains | 1:22 |
| 07 | final checks | caution bar | blank checklist | checks lock one by one | final message | amount -> period -> subscription | checks remain | 1:36 |

## Motion Implementation Contract

| Scene | Required DOM / Data Markers | Required Primitive | Timing Driver | Safe Zone Rule | QA Must See |
|---|---|---|---|---|---|
| 01 | `data-scene="01"` | price-flip | SRT cue / scene local time | bottom captions only, no progress bar | annual and monthly price |
| 02 | `data-scene="02"` | documentZoom | SRT cue / scene local time | bottom captions only, no progress bar | readable Manus capture |
| 03 | `data-scene="03"` | step-focus | SRT cue / scene local time | bottom captions only, no progress bar | active amount check |
| 04 | `data-scene="04"` | verification-gate | SRT cue / scene local time | bottom captions only, no progress bar | charge and period checks |
| 05 | `data-scene="05"` | packetFlow | SRT cue / scene local time | bottom captions only, no progress bar | use-case lanes |
| 06 | `data-scene="06"` | documentZoom | SRT cue / scene local time | bottom captions only, no progress bar | readable Google capture |
| 07 | `data-scene="07"` | check-lock | SRT cue / scene local time | bottom captions only, no progress bar | final three checks |

## Constraints

- Forbidden styles: all cards at once, decorative dots, floating long connector line, caption progress bar, source stamp.
- Unknowns: actual Android payment availability may change; do not claim guaranteed purchase.
