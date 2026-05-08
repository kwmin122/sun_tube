# Dalbi Example Reference Analysis

## Source

- File: `/Users/a0000/Downloads/달비예시 .mov`
- Duration: 39.835s
- Video: h264, 2124x1202, about 37.62fps, 1499 frames
- Audio: none

Generated analysis assets:

- `sheets/contact-1fps.jpg`
- `sheets/contact-2fps.jpg`
- `frames-all-lowres/` — all 1499 source frames extracted at 320px width for frame-level audit
- `frames-2fps/`
- `scene-cuts/scene-detect.log`
- `scene-cuts/scene-times.txt`
- `scene-cuts/t-*.jpg`

## What This Creator Is Doing

This is not pure HTML motion graphics. It is evidence-driven video editing:

1. Use real-world B-roll to set mood.
2. Cut to product or brand proof.
3. Use simple handmade diagrams for the core explanation.
4. Insert social proof screenshots.
5. Insert article screenshots as factual evidence.
6. Use metaphor footage or warning imagery to dramatize risk.
7. Keep Korean captions always visible as the narration spine.

The edit feels expensive because the visual source changes often, not because every frame is a complex animation.

## Shot Map

| Time | Visual Type | What Happens | Motion / Edit Pattern | Production Meaning |
|---|---|---|---|---|
| 0.0-2.0 | YouTube/player B-roll | Subway clip with embedded player UI | static playback, slight frame movement | Opens with real footage, not abstract intro |
| 2.0-3.5 | Terminal / prompt screenshot | Claude Code prompt or terminal-like UI | hard cut, screen holds | Shows "this is about actual AI coding tools" |
| 3.5-4.5 | Product/brand image | OpenAI logo on device | hard cut, cinematic crop | Brand proof, quick context |
| 4.5-8.0 | Hand-drawn chart | "쓸 수 없는 수준" graphic builds | title appears, bars/label appear | Explains judgment with simple visual metaphor |
| 8.0-12.0 | Institutional B-roll | Courthouse-like building | hard cut, then mascot overlay | Moves from claim to "case/story" mood |
| 12.0-14.0 | Brand/icon overlay | Ghost-like command icon on purple field | logo scales/holds | Branded chapter divider |
| 14.0-22.0 | X/Twitter screenshot | Post, replies, highlighted sentence | browser screenshot pans/holds, highlight changes | Social proof and direct quote evidence |
| 22.0-25.0 | Warning sign metaphor | Caution triangle on orange | held close-up | Emotional risk marker |
| 25.0-27.0 | Industrial B-roll | Green machine/server-like footage | hard cut | Dramatic transition to failure story |
| 27.0-29.5 | Emergency stop image | Big red text + button | held, slight motion | Visual metaphor for catastrophic action |
| 29.5-34.0 | Article screenshot | Article about AI agent deleting database | scroll/hold article | Factual evidence layer |
| 34.0-36.5 | Archive room B-roll | Archive boxes | hard cut, slight motion | "data/file" metaphor |
| 36.5-39.8 | Caution wall sign | Falling debris caution sign | held to finish | Final warning metaphor |

## Visual Formula

The creator alternates four visual modes:

- **Evidence:** screenshots, posts, articles, terminal screens.
- **Authority:** logos, official pages, product UI, recognizable platforms.
- **Metaphor:** courthouse, archive, emergency stop, caution sign.
- **Explanation:** simple diagrams, labels, highlighted text.

The rhythm is usually:

```text
claim -> proof screenshot -> metaphor B-roll -> explanation graphic -> proof screenshot -> warning metaphor
```

## Caption Style

- Captions are bottom-centered black boxes.
- Captions stay consistent across every source type.
- The source visual changes, but the caption style does not.
- Caption is the timeline spine; visuals support the sentence currently being spoken.

## Motion Notes

- Most sources are not heavily animated.
- Screenshots get subtle pan/zoom, highlight, crop, or cursor-like focus.
- Diagrams get sequential reveals.
- B-roll is used as atmosphere with little extra animation.
- Cuts happen on semantic beats, not just every fixed number of seconds.

## What To Copy Into Our Workflow

For each future script scene, add an "asset intent" before animation:

| Scene Need | Best Asset |
|---|---|
| factual claim | official page, README, docs, article screenshot |
| public reaction | X/Reddit/Hacker News/GitHub issue screenshot |
| product identity | logo, app UI, website hero, release page |
| risk or failure | metaphor B-roll, warning sign, incident image |
| abstract process | handmade diagram or HTML/SVG animation |
| quote or interview | short downloaded interview clip with burned subtitle |

## Required Pipeline Upgrade

Add an asset acquisition pass before TTS/render:

1. Read script and scene table.
2. Mark every sentence as `claim`, `proof`, `metaphor`, `diagram`, `quote`, or `transition`.
3. Create `asset-plan.md`.
4. Download or capture assets into `assets/evidence/`, `assets/broll/`, `assets/screenshots/`, `assets/interviews/`.
5. Record all sources in `source-notes.md`.
6. Process assets into edit-ready clips/images.
7. Build Hyperframes scenes from the processed assets.
8. Snapshot every scene with captions visible.

## Important Constraint

Downloaded interviews, platform screenshots, and third-party images may have copyright or platform-policy risk. Keep source links, keep clips short, use only what is needed for commentary/explanation, and prefer official or user-provided assets when possible.
