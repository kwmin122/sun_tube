# hyperframes/source-evidence

Use when a scene needs a screenshot, source page, UI capture, or document capture inside a Hyperframes explainer.

## Capture Roles

| Role | Meaning |
|---|---|
| `primary_evidence` | The capture is the main proof and the viewer can read or recognize the relevant area. |
| `support_texture` | The capture establishes source context, but the main explanation comes from Korean labels, diagrams, or motion. |
| `not_required` | A capture would not improve the scene. |
| `reroute_to_diagram` | The capture is technically correct but visually unhelpful; use Hyperframes diagram instead. |

## Pass Criteria

- The captured area matches the narration beat.
- The crop is large enough to read or recognize.
- Any highlight points to a specific source detail.
- Korean interpretation is added when the source is English-heavy.

## Fail Criteria

- A giant English page fills the scene but the viewer cannot tell what matters.
- A decorative rectangle sits on a screenshot without explaining a claim.
- The capture is only background texture while the asset plan claims `primary_evidence`.
- The same idea would be clearer as a diagram, flow, or Korean evidence card.
