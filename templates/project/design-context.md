# Design Context

## Project

- Project name:
- Collection date:
- Output purpose:
- Format:
- Target viewer:
- Viewing situation:
- Primary content type:
- Secondary content types:
- Renderer targets:

## Sources And Assets

- Official source links:
- Logo path:
- Product image path:
- UI screenshot path:
- Reference path:

## Visual System

- Color tokens:
- Font choices:
- Visual mood:
- Motion personality:
- Caption safe zone:
- Primary visual strategy:
- Motion grammar:
- Liquid Glass use:
- Reference anti-patterns:

## Scene Visual Density

Use this table before Hyperframes implementation. It prevents large empty panels and makes imagegen decisions explicit.

| Scene | Scene Recipe | Primary Visual Route | Visual Density | Reveal Mode | Motion Layer | Imagegen Role | Renderer Targets | Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | | capture | standard | one-at-a-time | source highlight, card reveal | not_required | hyperframes | |
| 02 | | hyperframes | rich | one-at-a-time | path draw, route pulse, row reveal | support | both | |
| 03 | | hyperframes | rich | one-at-a-time | diagram build, row reveal | not_required | hyperframes | |

Guidance:

- `rich` scenes need visible information rows and at least one motion primitive such as path draw, route pulse, count-up, scan fill, or liquid sheen.
- Complex scenes with three or more independent cards, nodes, modules, cases, or steps must use `one-at-a-time` reveal. Do not show the whole board before the narration reaches it.
- Imagegen can be `primary`, `support`, or `not_required` by scene. Use `primary` only when the generated image carries the explanation, emotion, metaphor, reenactment, future scenario, or visual hook.
- Use capture, interview, data, or HTML/SVG for factual evidence, exact UI, exact text, and text-heavy diagrams.
- A capture route must be large enough to explain the narration, usually one half-side or larger. If it would be a tiny source stamp, mark it `support` or reroute to HTML/SVG/imagegen.
- Keep caption-critical content above the bottom caption safe zone.
- Do not use large decorative connector paths. Any route path must be anchored to concrete nodes and tied to the narration verb.
- Do not use Liquid Glass as a global card style. Use it only for selected state, focus lens, floating control, or transition boundary.

## Scene Visual Thesis

No scene should reach render without a visual thesis.

| Scene | Visual Thesis | Viewer Must Understand | Primary Visual Mechanism | Narration Verb | Motion Must Show | Primary Asset | Failure If |
|---|---|---|---|---|---|---|---|
| 01 | | | | | | | |
| 02 | | | | | | | |
| 03 | | | | | | | |

## Scene Motion Blueprint

No scene should reach composition with only `Visual Concept` or `Motion Notes`. Define the concrete screen objects and state changes first.

| Scene | Primary Screen Object | Supporting Objects | Initial State | Active State | End State | Motion Beat Ladder | Hold / Carryover Rule | Snapshot Evidence |
|---|---|---|---|---|---|---|---|---|
| 01 | | | | | | | | |
| 02 | | | | | | | | |
| 03 | | | | | | | | |

Guidance:

- `Primary Screen Object` is what the viewer's eye should follow.
- `Motion Beat Ladder` should be ordered, for example `title -> object appears -> state changes -> result locks`.
- `Hold / Carryover Rule` prevents everything from disappearing between beats and helps the viewer retain context.
- A scene fails direction if the motion beat can be replaced by `fade in cards` without losing meaning.

## Motion Implementation Contract

Use this before writing HTML/CSS/SVG/GSAP or Remotion code.

| Scene | Required DOM / Data Markers | Required Primitive | Timing Driver | Safe Zone Rule | QA Must See |
|---|---|---|---|---|---|
| 01 | `data-scene="01"` | | SRT cue / scene local time | bottom captions only, no progress bar | |
| 02 | `data-scene="02"` | | SRT cue / scene local time | bottom captions only, no progress bar | |
| 03 | `data-scene="03"` | | SRT cue / scene local time | bottom captions only, no progress bar | |

## Constraints

- Forbidden styles:
- Unknowns:
