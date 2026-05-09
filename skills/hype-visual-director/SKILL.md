---
name: hype-visual-director
description: "Use in the hype_tuber workspace to define design-context.md, imagegen directions, style frames, layout tone, color, typography, visual hierarchy, and scene-level visual language for Hyperframes motion videos."
---

# Hype Visual Director

Own visual direction.

## Inputs

- `creative-brief.md`
- `draft-scene-packets.md`
- `timed-scene-packets.md`, if available
- Reference patterns or assets

## Output

Create or update `design-context.md` with:

- visual mood
- color tokens
- typography direction
- imagegen direction
- composition rules
- caption safe zone
- forbidden styles
- scene visual notes

## Renderer-Aware Direction

When a project targets both Hyperframes and Remotion, define the visual logic once at the scene level. Do not let each renderer invent a different scene interpretation.

Default renderer stance:

- Hyperframes is the canonical design renderer unless the creative brief says otherwise.
- Remotion may be used as a candidate renderer for frame-accurate timing, but it must preserve the same visual thesis and scene recipe.

Classify imagegen per scene:

- `primary`: generated image carries the scene's explanation, emotion, or metaphor
- `support`: mood, texture, transition, opening, or thumbnail layer
- `not_required`: capture, interview, data, or HTML/SVG/Remotion diagram is clearer

The design context should name the scene recipe, primary route, motion grammar, and review risk before implementation starts.

## Capture Utility

Use capture only when it explains the scene. A useful capture needs a readable crop, a visible highlight, a clear sentence-level reason, and at least one half-side of frame presence when it is the selected route. If the viewer cannot tell what the capture proves, downgrade it to `support` texture or reroute the scene to HTML/SVG/imagegen. Do not keep tiny official-page stamps as completed capture work.

## Rules

- Design for the approved angle.
- Use visual assets to clarify scenes, not fill space.
- Keep face-free motion as default.
- Public interview/quote clips are exceptions only when approved in `asset-plan.md`.

## Do Not

- Make generic decorative frames.
- Copy reference layouts as templates.
- Change the script argument.
