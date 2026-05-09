# liquidLens

## Purpose

Use a constrained glass/lens effect for focus, selected state, or transition boundaries.

## Use When

- A state is selected.
- A floating control or focus lens appears.
- A packet crosses a surface.
- A before/after boundary needs a tactile transition.

## Avoid When

- Large reading panels need clarity.
- Text would sit under heavy blur.
- The effect is only decorative.

## Hyperframes/GSAP Notes

- Use `backdrop-filter` sparingly.
- Drive CSS variables such as `--mx` and `--my` from pointer/packet/focus position.

## Remotion Notes

- Treat as a composited overlay. Keep it short and purposeful.

## Required Metadata

```html
<div class="liquid-lens" data-lens-purpose="selected state"></div>
```

## QA Checks

- lens has a stated purpose.
- lens does not reduce text legibility.
- lens is not used on every card.

## Failure Examples

- Generic glassmorphism card grid.
