# hyperframes/anchored-lines

Use when a Hyperframes scene needs to show dependency, flow, assignment, or convergence.

## Do

- Prefer lanes, packets, rails, state bars, and merge gates before drawing long connector lines.
- If a line is necessary, draw it inside the local scene layer and attach it to named nodes.
- Keep lines behind text and above the background.
- Use `stroke-dasharray` / `stroke-dashoffset` only when the line itself explains direction.

## Do Not

- Draw arbitrary diagonal divs or broad free-floating SVG paths.
- Let lines cross title, caption, or readable panel text.
- Use decorative paths that do not explain the narration verb.

## Required Metadata

- Nodes use `data-anchor-id`.
- Paths use `data-anchor-from` and `data-anchor-to`.
- Text-safe areas use `data-no-cross`.

## QA Fail If

- A `path-draw` has no `data-anchor-from` or `data-anchor-to`.
- The scene has connector lines but no moving token, pulse, direction marker, or visible flow state.
- The line is only a visual flourish.
