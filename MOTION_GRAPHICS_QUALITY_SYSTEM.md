# Motion Graphics Quality System

This project treats motion as explanation, not decoration.

The old failure mode was easy to identify: card grids, decorative paths, weak glass sheen, and repeated fade/stagger animations passed because QA counted class names instead of judging whether motion explained the narration.

## Motion Rule

Every scene must expose a `narrationVerb`.

Examples:

| Narration Verb | Required Visual Motion |
|---|---|
| split | visible fan-out from one node to multiple targets |
| merge | multiple results converge into one decision |
| score | rubric or gauge evaluates an output |
| revise | output loops back through a correction path |
| trigger | event packet passes through a condition gate |
| zoom | document area enlarges and gains highlight |
| compare | before/after or A/B state changes in-place |
| remember | fragments sort into persistent memory lanes |

If the motion does not make the verb visible, the scene fails director review.

## Banned Patterns

- Same `fade + y + stagger` as the dominant animation across scenes.
- Long decorative connector paths floating across cards or text.
- `path-draw` without node anchors, purpose, and safe-zone checks.
- Source captures that are tiny stamps, background texture, or decorative rectangles instead of readable primary evidence.
- Large empty glass panels.
- Liquid Glass as a global theme.
- Repeated card-only layouts for three or more scenes.
- Sheen or glow that does not change meaning.
- Dense text panels with no visual thesis.

## Hyperframes Canonical Design Rules

Hyperframes is the preferred final renderer for editorial explainers in this factory. Its strengths are atmosphere, typography, glass-panel composition, and HTML/SVG/GSAP diagrams. Preserve those strengths, but block the common failures:

- Prefer lanes, packets, rails, and state bars over decorative sweeping lines.
- If a connector is necessary, it must attach to named node anchors and avoid readable text.
- A source capture route must be a half-side-or-larger evidence panel with a useful crop. If the capture would be a small source stamp, remove the route and explain the scene with diagram, typography, imagegen, or another primary visual.
- Every rich scene needs a visible Korean explanatory structure: rows, chips, gates, loops, before/after states, or a diagram.
- Motion must show the narration verb, not just make elements appear.
- Captions are text-only from ElevenLabs forced-alignment SRT cue timing by default; do not add subtitle progress bars unless explicitly requested.

## Primitive Contract

Every primitive under `motion-primitives/` must define:

- purpose
- use cases
- avoid cases
- Hyperframes/GSAP notes
- Remotion notes
- required metadata
- QA checks
- failure examples

## Liquid Glass Use

Liquid Glass is allowed only as a controlled state/focus layer.

Allowed:

- selected state
- floating control
- focus lens
- packet crossing a surface
- before/after boundary transition

Not allowed:

- every card uses glass
- blur reduces text legibility
- huge information panels are glass by default
- decorative sheen repeats without state change

## Review Signals

Machine review should flag:

- static rich scene longer than 2.5 seconds
- repeated layout signature across three or more scenes
- unanchored or decorative path
- caption safe-zone overlap
- primary visual route missing from rendered frames
- capture route rendered as a tiny stamp or without `data-capture-size="half|large|full"`
- `director-review.md` PASS without evidence frame references

## Learning Rule

If motion QA misses a visible quality problem, do not just patch the current scene.

Use this sequence:

1. Mark the current render/review as failed.
2. Record the issue in `review/video-review/issue-log.md`.
3. Fix the scene, primitive, or QA rule.
4. Verify with a new frame, contact sheet, or render.
5. If the same failure can recur in future videos, run `/ce-compound` after verification and promote a prevention rule into this system, a role skill, or the QA script.

`/ce-compound` is for solved and verified recurring failures, not active debugging.
