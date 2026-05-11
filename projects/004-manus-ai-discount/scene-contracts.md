# Scene Contracts

Owner: `hype-scene-planner` with `hype-creative-director` and `hype-motion-designer`

## Contract Rules

- Missing required fields return to planning.
- Only use listed visual elements.
- Do not add generic filler.
- Captions are bottom safe-zone text-only from ElevenLabs SRT with no progress bar.

## Scene 01

- Narration Clause: 여러분, 지금 마누스에서 일명 마쫀쿠 대란이 떴습니다.
- Primary Screen Object: giant price flip from "연간 삼만이천 원" to "월 삼천 원도 안 됨"
- Viewer Must Understand: 이슈의 핵심은 가격 체감이다.
- Primary Visual Source: hyperframes
- Capture Role: not_required
- Capture Mode: not_required
- Imagegen Role: support
- Video-use Role: not_required
- HTML Motion Role: primary
- Allowed Visual Elements: price flip, urgency badge, three-step alert strip, small Manus wordmark text
- Forbidden Fillers: random dots, decorative source stamp, floating connector line, caption progress bar, generic CardGrid
- Motion Beats: price appears -> monthly equivalent snaps under it -> urgency badge locks
- Required State Change: annual price turns into monthly price
- Hold Rule: price stays visible until the final urgency line
- Exit Rule: price compresses into top-left tag for the next scene
- Implementation Markers: `data-scene="01"`, `data-contract-scene="01"`, `data-primary-object="price-flip"`
- Evidence Frame Requirement: motion-peak frame must show annual price and monthly equivalent together
- Fallback Policy: If price flip cannot be built, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not replace with a title card or decorative glass panel

## Scene 02

- Narration Clause: 공식 도움말 기준 가격과 커뮤니티 제보 가격을 분리해서 봐야 합니다.
- Primary Screen Object: half-frame official Manus pricing capture plus community price comparison board
- Viewer Must Understand: 공식가와 제보 가격은 다른 층위다.
- Primary Visual Source: capture
- Capture Role: primary_evidence
- Capture Mode: split_half
- Imagegen Role: not_required
- Video-use Role: not_required
- HTML Motion Role: support
- Allowed Visual Elements: official pricing capture, comparison board, verified/not-official badges
- Forbidden Fillers: tiny source stamp, unreadable full-page capture, decorative highlight rectangle, caption progress bar, generic CardGrid
- Motion Beats: official capture settles left -> report price appears right -> "제보 기준" badge locks
- Required State Change: viewer sees official context and report context separated
- Hold Rule: capture remains at least half-side while narration explains it
- Exit Rule: comparison board dims and the method steps enter
- Implementation Markers: `data-scene="02"`, `data-contract-scene="02"`, `data-primary-object="official-price-capture"`
- Evidence Frame Requirement: mid frame must show readable official help capture at half-frame scale
- Fallback Policy: If readable capture cannot be used, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not use an unreadable source stamp

## Scene 03

- Narration Clause: 확인 순서는 안드로이드에서 Manus 앱을 열고 업그레이드 화면의 실제 금액을 보는 겁니다.
- Primary Screen Object: Android upgrade flow with four sequential steps
- Viewer Must Understand: 조건 나열보다 실제 확인 순서가 중요하다.
- Primary Visual Source: hyperframes
- Capture Role: not_required
- Capture Mode: not_required
- Imagegen Role: not_required
- Video-use Role: not_required
- HTML Motion Role: primary
- Allowed Visual Elements: phone frame, Google Play badge, upgrade step cards, amount check gate
- Forbidden Fillers: all steps visible at once, decorative dots, floating connector line, caption progress bar
- Motion Beats: phone appears -> app step lights -> annual option lights -> amount check gate locks
- Required State Change: viewer sees the exact sequence, not just conditions
- Hold Rule: completed steps stay dim as context
- Exit Rule: amount check gate remains for Scene 04
- Implementation Markers: `data-scene="03"`, `data-contract-scene="03"`, `data-primary-object="android-upgrade-flow"`
- Evidence Frame Requirement: motion-peak frame must show the active amount check step
- Fallback Policy: If step sequence cannot be built, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not replace the flow with bullet cards

## Scene 04

- Narration Clause: 추가 업그레이드와 2만 포인트 제보는 금액과 기간을 다시 확인해야 합니다.
- Primary Screen Object: upgrade gate showing 2만 포인트, actual charge, and period confirmation
- Viewer Must Understand: 이 단계는 제보 기준이며 기간 표시가 핵심이다.
- Primary Visual Source: hyperframes
- Capture Role: not_required
- Capture Mode: not_required
- Imagegen Role: not_required
- Video-use Role: not_required
- HTML Motion Role: primary
- Allowed Visual Elements: three-part gate, warning strip, "제보 기준" tag, period check toggle
- Forbidden Fillers: certainty badge, fake payment receipt, decorative source stamp, caption progress bar
- Motion Beats: 2만 포인트 choice appears -> actual charge check opens -> period check turns amber
- Required State Change: price-only excitement turns into price-plus-period verification
- Hold Rule: "제보 기준" tag stays visible
- Exit Rule: warning strip slides into use-case scene
- Implementation Markers: `data-scene="04"`, `data-contract-scene="04"`, `data-primary-object="upgrade-period-gate"`
- Evidence Frame Requirement: motion-peak frame must show charge and period checks
- Fallback Policy: If verification gate cannot be built, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not claim guaranteed two years

## Scene 05

- Narration Clause: 써먹는다면 웹훅, 슬랙 트리거, 크롤링, 정기 데이터 수집, 이미지와 비디오 생성 쪽입니다.
- Primary Screen Object: use-case lanes that turn on one by one
- Viewer Must Understand: 싸다고 끝이 아니라 반복 작업 자동화에 쓸 여지가 있다.
- Primary Visual Source: hyperframes
- Capture Role: not_required
- Capture Mode: not_required
- Imagegen Role: support
- Video-use Role: not_required
- HTML Motion Role: primary
- Allowed Visual Elements: workflow lanes, trigger tokens, use-case chips, credit meter
- Forbidden Fillers: random dots, broad connector line, empty glass panel, caption progress bar
- Motion Beats: trigger token enters -> data lane lights -> image/video lane lights -> routine loop closes
- Required State Change: isolated tool becomes repeatable workflow
- Hold Rule: each lane stays visible after activation
- Exit Rule: lanes collapse into caution checklist
- Implementation Markers: `data-scene="05"`, `data-contract-scene="05"`, `data-primary-object="use-case-lanes"`
- Evidence Frame Requirement: motion-peak frame must show at least four active use-case lanes
- Fallback Policy: If lanes cannot be built, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not list feature words in empty cards

## Scene 06

- Narration Clause: 자동결제는 꼭 구글 플레이 구독 관리에서 확인해야 합니다.
- Primary Screen Object: half-frame Google Play subscription help capture plus three safety checks
- Viewer Must Understand: 싸게 결제하는 것보다 갱신일과 자동결제를 확인하는 것이 중요하다.
- Primary Visual Source: capture
- Capture Role: primary_evidence
- Capture Mode: split_half
- Imagegen Role: not_required
- Video-use Role: not_required
- HTML Motion Role: support
- Allowed Visual Elements: Google Play help capture, renewal date check, cancellation check, account check
- Forbidden Fillers: small help-page stamp, unreadable capture, decorative highlight rectangle, caption progress bar
- Motion Beats: help capture settles left -> renewal check appears -> cancel/manage check appears
- Required State Change: viewer moves from purchase excitement to subscription safety
- Hold Rule: capture remains half-side while checks appear
- Exit Rule: safety checks become final checklist
- Implementation Markers: `data-scene="06"`, `data-contract-scene="06"`, `data-primary-object="google-play-subscription-capture"`
- Evidence Frame Requirement: mid frame must show readable Google Play subscription help capture
- Fallback Policy: If readable capture cannot be used, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not mention automatic renewal without showing the management route

## Scene 07

- Narration Clause: 지금 볼 것은 금액, 기간, 구독 관리, 이 세 가지입니다.
- Primary Screen Object: final three-check lock list
- Viewer Must Understand: 빠르게 확인하되 마지막 안전장치를 놓치면 안 된다.
- Primary Visual Source: hyperframes
- Capture Role: not_required
- Capture Mode: not_required
- Imagegen Role: not_required
- Video-use Role: not_required
- HTML Motion Role: primary
- Allowed Visual Elements: three large checks, final caution bar, fast closing title
- Forbidden Fillers: decorative dots, floating line, extra fourth checklist, caption progress bar
- Motion Beats: amount check locks -> period check locks -> subscription check locks
- Required State Change: open issue becomes viewer action list
- Hold Rule: all three checks stay visible for final line
- Exit Rule: final title fades after voiceover ends
- Implementation Markers: `data-scene="07"`, `data-contract-scene="07"`, `data-primary-object="final-action-checks"`
- Evidence Frame Requirement: end frame must show three checks together
- Fallback Policy: If final action list cannot be built, stop and return to planning.
- Generic Component Ban: Synthesis/CardGrid/StatPanel/FallbackScene are banned.
- If Missing, Do Not: do not end on a vague CTA
