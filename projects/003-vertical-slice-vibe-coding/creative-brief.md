# Creative Brief

Owner: `hype-showrunner` and `hype-creative-director`

## Decision Summary

- Chosen angle: 바이브코딩에서는 큰 앱을 한 번에 만들지 말고, 사용자 흐름 하나를 끝까지 자르는 버티컬 슬라이스로 진행해야 한다.
- Viewer promise: 이 영상을 보고 나면 AI에게 어떤 단위로 일을 맡겨야 덜 망하는지 안다.
- Target viewer: AI 코딩 도구로 제품을 만드는 개발자, 1인 빌더, 팀 리드
- Length decision: 3min
- Format: 1920x1080 horizontal
- Tone: direct, practical, technical but easy
- Primary content pattern: problem -> reframe -> method -> before/after -> action rule
- Secondary pattern, if any: tutorial checklist
- Primary content type: explain
- Secondary content types: tutorial, product
- Primary visual strategy: Hyperframes diagram-driven explainer with one active idea per scene
- Motion grammar: technical-grid + product-demo
- Imagegen role: not_required for body, support for thumbnail only
- Evidence role: not_required
- Renderer targets: hyperframes
- Preferred final renderer: hyperframes
- Renderer candidate policy: use Hyperframes as final; Remotion is not needed unless caption/frame timing becomes the blocker.
- Review rubric:
  - Can the viewer see the difference between horizontal layers and a vertical slice?
  - Does each scene explain one action instead of showing many boxes at once?
  - Does motion show the narration verb: split, connect, run, inspect, lock?
  - Are captions text-only and synced to ElevenLabs SRT with no progress bar?

## Why This Video Should Exist

- Viewer problem or curiosity: AI가 만든 코드가 많아질수록 오히려 어디서 망가졌는지 모르는 상황이 자주 생긴다.
- Why now: 바이브코딩은 속도가 빠르기 때문에 작업 단위가 잘못되면 실패도 빠르게 커진다.
- What should the viewer remember: AI에게 앱 전체가 아니라 검증 가능한 사용자 흐름 하나를 맡겨라.

## Structure

```text
open
-> layer-first failure
-> vertical slice definition
-> why it fits AI coding
-> concrete workflow
-> before/after
-> close
```

## Pacing

- Hook target: first 5 seconds, "코드를 많이 받는 것"이 위험하다고 바로 말한다.
- Scene count target: 9 scenes
- Density: medium; one large visual idea per scene
- Where the biggest turn happens: Scene 04, horizontal layers are cut into one vertical user flow.

## Visual Direction Seed

- Visual mood: dark technical board, warm/cyan accents, clean animated slices
- Imagegen direction: not required for body
- Motion personality: sequential reveal, slice cut, packet flow, run loop, lock state
- Reference pattern used only as inspiration: vertical slide style; one visible idea at a time
- Scene recipe candidates:
  - explain/mechanism-state-machine
  - product/before-after-demo
  - explain/fan-out-fan-in
- Motion primitive candidates:
  - packetFlow
  - anchoredPath
  - documentZoom not required
  - liquidLens only for selected slice focus
- Liquid Glass use, if any: focus lens on the active vertical slice only; not as a full-card decoration.
- Forbidden motion patterns:
  - all cards visible from start
  - random dots
  - decorative long connector lines
  - tiny unreadable captures
  - caption progress bar

## Non-Goals

- Do not: make a generic architecture lecture.
- Do not: use source screenshots as decorative proof.
- Deferred: Remotion comparison, external interviews, imagegen body visuals.

## Approval Notes

- Script approval: prepared in `plan.md`
- Scene contract approval: prepared in `draft-scene-packets.md`
- Risky asset approval, if any: none
- Renderer comparison approval: not required for this project
