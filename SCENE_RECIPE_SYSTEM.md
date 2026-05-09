# Scene Recipe System

Scene recipes are renderer-independent directing contracts. They are not fixed visual templates.

Use recipes after the script is approved and before renderer implementation. A recipe tells the motion designer what the scene must prove, which visual route should carry the scene, which motion primitives are required, and what review should fail.

## Selection Order

1. Choose video-level `primaryContentType` and `secondaryContentTypes` in `creative-brief.md`.
2. Choose each scene's `sceneRole` and `sceneContentType` in `draft-scene-packets.md`.
3. Select two or three candidate recipes.
4. The director/agent picks one recipe and records it in `draft-scene-packets.md`.
5. `timed-scene-packets.md` converts the recipe into timed motion beats.

Do not auto-apply a recipe without writing the selected recipe into the scene packet.

## Content Types

| Type | Best Primary Routes | Review Emphasis |
|---|---|---|
| `explain` | hyperframes, remotion, data-viz | mechanism, state transition, clarity |
| `story` | imagegen, video-use, mixed | emotional continuity, scene change |
| `proof` | capture, documentZoom, data-viz | source visibility, highlight readability |
| `reaction` | video-use, capture, split-screen | original claim, response, rebuttal structure |
| `tutorial` | screen-recording, capture | cursor/step clarity, followability |
| `product` | capture, screen-recording, before/after | feature value, before/after difference |
| `documentary` | video-use, capture, imagegen support | interview/B-roll rhythm |
| `visual-essay` | imagegen, kinetic-type, mixed | image memorability, tonal fit |

## Scene Roles

Valid roles:

```text
hook
claim
proof
context
demo
quote
comparison
mechanism
emotion
transition
payoff
CTA
```

## Recipe File Contract

Each file under `scene-recipes/` must include:

- `Use When`
- `Primary Routes`
- `Secondary Routes`
- `Required Primitives`
- `Motion Beats`
- `Renderer Notes`
- `QA Fail If`
- `Example Scenes`

## Required Scene Packet Fields

Every scene using a recipe must declare:

```yaml
sceneRole:
sceneContentType:
sceneRecipe:
primaryVisualRoute:
secondaryVisualRoute:
motionGrammar:
narrationVerb:
motionPurpose:
imagegenRole:
reviewRisk:
rendererTargets:
```

## Initial Recipe Registry

| Recipe | Best For | Required Primitives |
|---|---|---|
| `explain/fan-out-fan-in` | role split, parallel work, multiagent orchestration | `fanOutFanIn`, `packetFlow`, `anchoredPath` |
| `explain/mechanism-state-machine` | trigger, condition, state, outcome | `packetFlow`, `anchoredPath`, `liquidLens` |
| `proof/document-zoom-highlight` | docs, README, articles, UI proof | `documentZoom`, `liquidLens` |
| `product/before-after-demo` | old vs new workflow, product value | `documentZoom`, `packetFlow`, `liquidLens` |
| `visual-essay/imagegen-cinematic-sequence` | mood, reenactment, symbolic scenes | `liquidLens`, `packetFlow` |
