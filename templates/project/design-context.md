# Design Context

## Project

- Project name:
- Collection date:
- Output purpose:
- Format:
- Target viewer:
- Viewing situation:

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

## Scene Visual Density

Use this table before Hyperframes implementation. It prevents large empty panels and makes imagegen decisions explicit.

| Scene | Visual Density | Motion Layer | Imagegen Need | Notes |
|---|---|---|---|---|
| 01 | standard | source highlight, card reveal | not_required | |
| 02 | rich | path draw, route pulse, row reveal | optional | |
| 03 | standard | screenshot crop, callout | not_required | |

Guidance:

- `rich` scenes need visible information rows and at least one motion primitive such as path draw, route pulse, count-up, scan fill, or liquid sheen.
- Use imagegen for mood, styleframe, background, or thumbnail candidates. Use capture or HTML/SVG for factual evidence and text-heavy diagrams.
- Keep caption-critical content above the bottom caption safe zone.

## Constraints

- Forbidden styles:
- Unknowns:
