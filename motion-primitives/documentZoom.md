# documentZoom

## Purpose

Use real captures as readable proof by zooming and highlighting relevant parts.

## Use When

- Official page, README, article, UI screenshot, or document is the evidence.

## Avoid When

- Exact proof is not needed.
- The capture is too low resolution to read.

## Hyperframes/GSAP Notes

- Use crop/scale motion and highlight rectangles.
- Keep the proof area above captions.

## Remotion Notes

- Use transform interpolation and masks.

## Required Metadata

```html
<img data-proof-asset="scene-03-capture" />
<div data-highlight-region="claim-title"></div>
```

## QA Checks

- capture is referenced in composition.
- highlighted text remains readable.
- caption does not cover the proof.

## Failure Examples

- A tiny webpage screenshot used as background texture.
