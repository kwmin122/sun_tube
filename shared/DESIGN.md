# Motion Design System

This file defines the default visual identity for `hype_tuber` motion-animation videos.

## Target Style

High-quality Korean kinetic typography with HTML/SVG motion graphics.

Reference traits:

- Dark cinematic background.
- Soft cyan, yellow, green, and purple highlights.
- Large readable Korean typography.
- Sparse scenes: one idea per screen.
- Icons, cards, charts, and comparison diagrams instead of face footage.
- Smooth camera movement across a larger virtual canvas.
- Fixed readable subtitle or caption layer when needed.

## Canvas

Default:

- 1920 x 1080 for YouTube horizontal.
- 1080 x 1920 for Shorts only when the project explicitly says vertical.
- 30 fps default render.

The composition should be built as a larger stage when camera motion is needed:

- Logical stage: 2600 x 1400 or wider.
- Camera viewport: 1920 x 1080.
- Move the stage with `translate3d`, not by moving every element separately.

## Palette

```text
Background: #071018, #0A111D, #101827
Panel:      rgba(19, 30, 49, 0.72)
Border:     rgba(140, 211, 255, 0.18)
Text:       #F3F7FB
Muted:      #8B98A8
Cyan:       #68E1F5
Yellow:     #FFD935
Green:      #66F095
Purple:     #B46CFF
Danger:     #FF4E8A
```

Use cyan/yellow/green/purple as accents, not as full-screen color washes.

## Type

Preferred stack:

```css
font-family: Pretendard, SUIT, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif;
```

Sizing:

- Hero title: 76-112px.
- Scene headline: 58-82px.
- Card title: 34-48px.
- Body/caption: 26-36px.
- Subtitle bar: 42-54px.

Rules:

- Korean line length should stay short.
- Do not put long paragraphs on screen.
- Highlight only 1-3 words per scene.
- Avoid tiny labels unless they are decorative.

## Scene Types

Use these reusable scene components:

1. `TitleCascade`: hook/title with staggered text reveal.
2. `CompareDiagram`: left/right comparison or old/new distinction.
3. `GridCards`: 3-4 cards appearing in stagger.
4. `MetricReveal`: counter, percent, bar chart, or proof number.
5. `ProblemList`: red X list or failure checklist.
6. `ProcessSteps`: numbered workflow or step diagram.
7. `QuotePunch`: one-line quote or principle.
8. `CTAEnd`: final takeaway and action.

## Motion Presets

Use a small preset set consistently.

```text
popIn:        scale 0.86 -> 1.04 -> 1.0, opacity 0 -> 1, 0.35-0.55s
slideUp:      y 34 -> 0, opacity 0 -> 1, 0.45-0.65s
slideSide:    x +/-90 -> 0, opacity 0 -> 1, 0.45-0.75s
dimOut:       opacity 1 -> 0.18, blur 0 -> 2px, 0.35-0.55s
cameraPan:    stage x/y movement, 1.2-3.5s
keywordPulse: scale 1 -> 1.055 -> 1, glow pulse, 0.25-0.45s
barGrow:      scaleX 0 -> 1, 0.6-1.0s
numberCount:  integer count up, 0.8-1.4s
```

Motion rule:

- Every spoken beat should trigger only one primary visual change.
- Avoid animating every object at the same time.
- Keep most motion bursts under 2 seconds.

## Reference Notes

`/Users/a0000/Downloads/이지.mov`:

- 44.1 seconds.
- 2164 x 1260 source recording.
- Dark UI, cyan/purple glow, card grids, number/stat reveals, bar charts.
- Good reference for clean HTML dashboard-like motion.

Prior frame sequence analysis:

- 5367 frames.
- Strong scene cuts around frames 778, 1532, 2492, 3567, 3640, 4287.
- Most motion was short bursts: text/icon/card/camera transitions, not complex character animation.
