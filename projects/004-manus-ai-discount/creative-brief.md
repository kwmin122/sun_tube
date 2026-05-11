# Creative Brief

Owner: `hype-showrunner` and `hype-creative-director`

## Decision Summary

- Chosen angle: “마쫀쿠 대란”을 빠르게 이해시키고, 안드로이드에서 금액과 기간을 확인하는 방법을 알려준다.
- Viewer promise: 지금 결제 화면에서 봐야 할 순서와 자동결제 확인 위치를 1-2분 안에 정리한다.
- Target viewer: Manus를 써볼 생각은 있었지만 가격 때문에 망설였던 AI/개발툴 사용자.
- Length decision: 60s | 3min | 5min+ | 8min+
- Format: 1920x1080 horizontal
- Tone: 빠른 제보형 정보 전달, 과장되지만 공식 확인 여부는 분리.
- Primary content pattern: claim -> official context -> how-to -> caution
- Secondary pattern, if any: product / proof
- Primary content type: product
- Secondary content types: proof, tutorial
- Primary visual strategy: 큰 숫자 대비, 공식 가격 캡처, 결제 순서 UI 모션, 자동결제 캡처.
- Motion grammar: technical-grid | product-demo | kinetic-type
- Capture role: primary
- Capture mode: split_half
- Imagegen role: support
- Video-use role: not_required
- HTML motion role: primary
- Evidence role: support
- Why these visual routes: 실제 가격/구독/도움말 화면은 캡처가 신뢰를 주고, 결제 순서와 주의점은 HTML 모션이 더 빠르게 설명한다.
- Why not the other routes: 인터뷰 영상은 필요 없고, imagegen은 사실 화면을 대체하면 오히려 약해진다.
- Renderer targets: hyperframes
- Preferred final renderer: hyperframes
- Renderer candidate policy: Remotion 비교본은 만들지 않는다. 이 영상은 빠른 정보 전달이며 Hyperframes 디자인이 더 맞다.
- Review rubric: 화면이 한 번에 너무 많이 뜨면 실패. 캡처는 최소 한쪽 면 절반. 자막 진행바 없음. 공식 확인과 제보를 구분.

## Why This Video Should Exist

- Viewer problem or curiosity: 지금 결제해야 하는지, 어디서 확인해야 하는지 모른다.
- Why now: 2026년 5월 11일 오전 기준 커뮤니티에서 결제 인증과 방법이 빠르게 공유되고 있다.
- What should the viewer remember: 안드로이드에서 금액과 기간을 직접 확인하고, 자동결제는 Google Play에서 바로 확인한다.

## Structure

```text
open
-> 가격 대비
-> 안드로이드 확인 순서
-> 추가 업그레이드 주의
-> 활용 가능성
-> 자동결제 확인
-> close
```

## Pacing

- Hook target: 첫 5초에 “마쫀쿠 대란”과 “월 삼천 원도 안 됨”을 말한다.
- Scene count target: 7
- Density: 한 장면에 하나의 설명 단위.
- Where the biggest turn happens: 공식가와 제보가가 갈라지는 장면.

## Visual Direction Seed

- Visual mood: dark grid, product alert, large price typography, clean capture panels.
- Imagegen direction: body에는 사용하지 않음. 썸네일 후보나 배경 텍스처용 support만.
- Motion personality: 빠른 숫자 강조, 한 단계씩 켜지는 결제 플로우, 마지막 자동결제 경고.
- Reference pattern used only as inspiration: 한 화면에 한 설명 단위만 등장하는 정보형 쇼츠 리듬.
- Scene recipe candidates: proof/document-zoom-highlight, product/before-after-demo, explain/mechanism-state-machine
- Motion primitive candidates: documentZoom, packetFlow, scan-fill, step focus, price flip
- Liquid Glass use, if any: 버튼/선택 상태에만 제한.
- Forbidden motion patterns: 전체 카드 동시 등장, 의미 없는 점, 떠다니는 긴 선, 캡션 진행바, 작은 source stamp.

## Non-Goals

- Do not: 공식 확정 할인처럼 말하지 않는다.
- Do not: 결제 성공을 보장하지 않는다.
- Do not: source/right/privacy 검수 게이트를 되살리지 않는다.
- Deferred: 실제 사용자 결제 화면 캡처가 제공되면 별도 업데이트 영상에서 사용.

## Approval Notes

- Script approval: pending
- Scene contract approval: pending
- Risky asset approval, if any: none
- Renderer comparison approval: not_required

