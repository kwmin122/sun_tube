# proof/document-zoom-highlight

## Use When

- Showing a document, README, official page, article, release note, or UI screenshot as the primary proof.

## Primary Routes

- `capture`
- `screen-recording`

## Secondary Routes

- `hyperframes` or `remotion` for annotation and motion.

## Required Primitives

- `documentZoom`
- `liquidLens`

## Motion Beats

1. Show the real capture.
2. Zoom to the exact relevant region.
3. Highlight one claim or UI element.
4. Add a short interpretation layer.
5. Return to the broader scene or transition into a diagram.

## Renderer Notes

- Keep text readable after scaling.
- Avoid generated fake UI for exact proof.

## QA Fail If

- The proof asset is not visible in the rendered frame.
- The highlighted region is too small to read.
- Captions cover the proof region.

## Example Scenes

- Project 002 scenes 01, 03, 12.
