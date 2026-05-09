# Renderer Comparison Pipeline

This repo can build a Hyperframes version and a Remotion comparison version from the same production contract.

Hyperframes is the canonical design renderer for the current editorial explainer style: dark grid, glass panels, strong Korean typography, HTML/CSS/SVG/GSAP motion, and YouTube information pacing. Remotion is a candidate renderer and timing lab, not the new default.

## Renderer Roles

| Role | Meaning | Package Eligibility |
|---|---|---|
| `canonical_design` | Default renderer for the project's final visual language. | eligible |
| `candidate` | Alternative renderer for comparison. | eligible only if selected by director review |
| `timing_lab` | Used to test timing, transitions, captions, or frame-based ideas. | not eligible by default |
| `blocked` | Render failed or quality gate failed. | not eligible |

Current default:

- Hyperframes: `canonical_design`
- Remotion: `candidate` / `timing_lab`

## Common Inputs

Both renderers must read the same upstream files:

```text
project.json
creative-brief.md
timed-scene-packets.md
asset-plan.md
design-context.md
scene-recipes/*
motion-primitives/*
voiceover/solo/voiceover-solo-elevenlabs.srt
voiceover/solo/voiceover-solo-final-mix.m4a
```

## Outputs

Success path:

```text
renders/final-hyperframes.mp4
renders/final-remotion.mp4
renders/final.mp4
review/video-review/hyperframes-review.md
review/video-review/remotion-review.md
review/video-review/renderer-comparison.md
```

Fallback path when Remotion blocks:

```text
renders/final-hyperframes.mp4
renders/final.mp4
review/video-review/renderer-comparison.md
```

Never create a fake `final-remotion.mp4`.

MP4s, contact sheets, scene frames, snapshots, and copied media are local artifacts and are intentionally ignored by git. The review Markdown and JSON files can reference those paths, but the final deliverable is the local `renders/` output plus the copied files in `~/Downloads`.

## Blocked Renderer Learning

When a renderer blocks or produces a low-quality PASS candidate:

1. Write the blocker or quality failure in `review/video-review/renderer-comparison.md`.
2. Keep the usable renderer moving to `renders/final.mp4`.
3. Do not hide the failed renderer by deleting evidence.
4. If the failure was caused by a reusable integration mistake, run `/ce-compound` only after the fallback path is rendered and the root cause is verified.

## Comparison Criteria

| Criterion | Meaning |
|---|---|
| caption sync | subtitles appear with narration and avoid key visuals |
| static gap | rich scenes keep meaningful motion |
| scene uniqueness | scenes do not collapse into one repeated card layout |
| motion purpose | motion makes the narration verb visible |
| asset fit | selected capture/imagegen/video-use/hyperframes route appears on-screen |
| line quality | paths attach to nodes and do not cut through text |
| YouTube rhythm | viewer gets a new visual reason every 5-10 seconds |
| director score | final human/agent judgment with evidence frames |

## Selection Rule

The selected renderer is copied to:

```text
renders/final.mp4
```

`review/video-review/renderer-comparison.md` must state why the selected renderer won.

Renderer selection is a creative decision, not a technical default. Hyperframes should win by default for editorial explainers unless its actual rendered frames fail line quality, visual density, caption safety, or scene thesis checks. Remotion should win only when the frame-reviewed result is clearly better for the specific video.
