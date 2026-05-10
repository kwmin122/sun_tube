# Renderer Comparison

Verdict: PASS
Selected renderer: hyperframes

## Decision

Hyperframes is the selected renderer for this delivery because the project is a diagram-first technical explainer. The final Hyperframes render keeps the vertical-slice architecture readable, avoids body source captures, avoids caption progress bars, and matches the scene contracts without synthetic QA DOM.

Remotion blocked: no Remotion render was produced for this 003 delivery because the user selected the Hyperframes design direction as the better fit. This is recorded as a deliberate renderer decision, not as a hidden success.

## Renderer Table

| Renderer | Status | Render | Machine Review | Decision |
|---|---|---|---|---|
| hyperframes | selected | `projects/003-vertical-slice-vibe-coding/renders/final-hyperframes.mp4` | `review/video-review/hyperframes-review.md` PASS | final |
| remotion | blocked | not produced | not applicable | blocked by renderer decision |

## Evidence

- Selected render: `projects/003-vertical-slice-vibe-coding/renders/final-hyperframes.mp4`
- Final render: `projects/003-vertical-slice-vibe-coding/renders/final.mp4`
- Contact sheet: `projects/003-vertical-slice-vibe-coding/review/video-review/contact-sheet-hyperframes.jpg`
- Frame manifest: `projects/003-vertical-slice-vibe-coding/review/video-review/frame-manifest-hyperframes.json`
- Synthetic DOM report: `projects/003-vertical-slice-vibe-coding/review/video-review/synthetic-dom-report-hyperframes.json`

## Rationale

- The video explains architecture through stable diagrams, folder maps, scope fences, and feature slices.
- Hyperframes is sufficient for this version because the motion is contract-driven: reveal, gather, scan, shrink, lock, and select.
- Remotion remains a candidate renderer for future frame-perfect comparison work, but it is not required to deliver this project.
