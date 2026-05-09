# anchoredPath

## Purpose

Draw a route between concrete nodes without decorative lines crossing the scene.

## Use When

- A process flows from one node to another.
- A packet moves along a route.
- A fan-out/fan-in diagram needs visible direction.

## Avoid When

- The line is only decoration.
- The line crosses captions, titles, or body text.
- Nodes are not visible.

## Hyperframes/GSAP Notes

- Compute or declare anchors with `data-anchor`.
- Store path purpose with `data-route-purpose`.
- Animate with `strokeDashoffset` only after anchors are valid.

## Remotion Notes

- Use `@remotion/paths` where available for length and progress.
- Tie token position to path progress.

## Required Metadata

```html
<path data-anchor-from="lead" data-anchor-to="docs" data-route-purpose="split work" />
```

## QA Checks

- from/to anchors exist.
- path does not cross caption/title safe zones.
- path is tied to a narration verb.

## Failure Examples

- A broad orange curve floating over three cards.
- A path that cuts through a title.
