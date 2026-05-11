# Visual Source Routing System

This system decides what a scene is made of before the writer writes the line and before the motion designer opens Hyperframes.

## Core Rule

Every scene must explicitly consider four visual source families:

| Source | Can Be Primary When | Can Be Support When | Not Required When |
|---|---|---|---|
| `capture` | news, official page, product page, community post, app screen, docs, article, UI, payment screen | provenance, context, background reference | a diagram or generated metaphor explains better |
| `imagegen` | story, metaphor, reenactment, future scenario, emotional hook, intro, transition, thumbnail | atmosphere, texture, non-factual mood layer | exact UI, docs, data, or text must be shown |
| `video-use` | interview, talk, demo clip, user-supplied footage, reference clip, screen recording | short b-roll or quote support | no raw/source video is needed |
| `hyperframes` | mechanism, architecture, comparison, state change, captioned explainer, kinetic type | labels, overlays, diagram on top of another asset | the scene is purely footage/image-led |

## Required Scene Fields

Use these fields in `draft-scene-packets.md`, `timed-scene-packets.md`, `asset-plan.md`, `design-context.md`, and `scene-contracts.md` where applicable:

```markdown
Primary Visual Source:
Capture Role:
Capture Mode:
Imagegen Role:
Video-use Role:
HTML Motion Role:
Why This Route:
Why Not The Other Routes:
```

## Capture Rule

Capture is often more useful than imagegen for news, products, tools, and community reports, but it must be visually useful.

- Primary capture must take a large readable area: normally one side of the frame or at least half of a vertical composition region.
- Small source stamps do not complete a capture route.
- Zoom, highlight, and Korean interpretation labels are optional.
- If narration/subtitles explain the screen clearly, extra labels are not required.
- A capture-led script must be written after the route is known, so the voiceover can say what the viewer is seeing.

## Imagegen Rule

Imagegen is not just decoration, and it is not globally required.

- `primary`: the generated image carries the explanation, emotion, metaphor, reenactment, future scenario, visual hook, or thumbnail.
- `support`: the generated image is mood, texture, transition, atmosphere, or background behind another primary source.
- `not_required`: capture, interview, demo, data, exact text, or HTML/SVG explains better.

## Writer Rule

The writer must write into the chosen visual source.

Bad:

```text
마누스 가격이 이상하게 떴습니다.
```

Better for a capture-led scene:

```text
지금 보이는 결제 화면에서 봐야 할 건 가격보다 조건입니다.
```

Better for a Hyperframes-led scene:

```text
핵심은 결제 버튼 하나가 아니라, 조건과 갱신일이 같이 움직인다는 겁니다.
```

## Validator

Run before plan approval:

```bash
npm run factory:validate-scene-contract -- <project-path>
npm run factory:validate-visual-routing -- <project-path>
```

`factory:approve-plan` also runs both checks and refuses to set `approved.plan=true` if either fails.

