# Vertical Slice Subagent Implementation Plan

This document defines how to implement the universal production OS v1 using vertical slices and subagents.

The goal is not to patch one weak render. The goal is to build a reusable YouTube/Hyperframes production system where any future topic can choose an appropriate content type, scene recipe, motion grammar, renderer, asset route, and review rubric.

## Non-Negotiable Scope

- Korean response and project operation remain the default.
- Do not use `youtube-scene-director` unless the user explicitly calls it.
- Apply `karpathy-guidelines`: small implementation steps, clear assumptions, surgical edits, fast verification.
- MVP excludes rights, privacy, quote-accuracy, citation-missing, and source-risk review.
- Do not recreate `hype-source-editor` as an active gate.
- `source-notes.md` remains optional compatibility only, not a required gate.
- Research remains a material-development role, not a verification team.
- Final videos must be copied to `~/Downloads`.
- GitHub push happens only after final PASS.
- `/ce-compound` is used only after a recurring-risk mistake is fixed and verified. It is not an active debugging step.

## Target Outcome

By the end of the implementation goal:

1. Universal production OS v1 exists in docs, templates, scripts, and role skills.
2. Scene recipes and motion primitives exist above renderer-specific code.
3. Project 002 is rebuilt as the first proof sample.
4. Two comparable outputs are attempted:
   - `projects/002-claude-managed-agents/renders/final-hyperframes.mp4`
   - `projects/002-claude-managed-agents/renders/final-remotion.mp4`
5. The better reviewed output is copied to:
   - `projects/002-claude-managed-agents/renders/final.mp4`
6. Downloads receives every available final/comparison render:
   - `~/Downloads/claude-managed-agents-final.mp4`
   - `~/Downloads/claude-managed-agents-hyperframes.mp4`
   - `~/Downloads/claude-managed-agents-remotion.mp4` when Remotion succeeds
7. Review evidence exists for both renderers.
8. `director-review.md` selects the final renderer with evidence frames.
9. The reusable rules are committed and pushed.

If Remotion setup or rendering blocks, do not hide it. Record `Remotion blocked` in `review/video-review/renderer-comparison.md`, finish the Hyperframes final, copy available renders to Downloads, and keep Remotion marked as a candidate renderer.

## Post-Failure Learning Loop

The factory must learn from real production mistakes without turning every typo into process overhead.

```text
Mistake detected
-> stop claiming PASS
-> write issue in review/video-review/issue-log.md
-> identify root cause
-> fix
-> verify with command output and frame evidence
-> if recurrence risk exists, run /ce-compound
-> write or update docs/solutions/
-> promote prevention into QA, AGENTS.md, CLAUDE.md, or a role skill only when it helps future projects
```

Run `/ce-compound` only after:

1. the mistake is fixed,
2. the fix is verified,
3. the mistake is likely to recur,
4. the prevention rule should help future agents.

Do not run `/ce-compound` for simple typos, one-off edits, or unresolved problems.

Always consider `/ce-compound` after fixing:

- QA passed a video that should have failed.
- Render succeeded but the video was visibly low quality.
- Caption timing, BGM level, or subtitle placement failed repeatedly.
- A subagent or renderer route touched the wrong scope.
- Hyperframes/Remotion route state diverged from the actual artifact.
- `director-review.md` gave PASS without evidence frames.

## Source Of Truth Layers

Do not let subagents invent different versions of the video.

| Layer | Meaning |
|---|---|
| `project.json` | Coarse canonical production state |
| `creative-brief.md` | Video-level content type, visual strategy, motion grammar, renderer target |
| `draft-scene-packets.md` | Scene-level role, route, recipe, visual intent before script |
| `plan.md` | User-approved script and scene contract |
| `voiceover/solo/voiceover-solo-elevenlabs.srt` | Timing source |
| `timed-scene-packets.md` | Final scene timing, narration verbs, motion purpose |
| `asset-plan.md` | Scene asset and visual plan |
| `design-context.md` | Visual system, references, style constraints |
| `scene-recipes/*` | Renderer-independent scene direction recipes |
| `motion-primitives/*` | Renderer-independent motion grammar definitions |
| `work-orders/*.md` | Route-level implementation truth |
| `composition-hyperframes/` | Hyperframes implementation |
| `composition-remotion/` | Remotion implementation |
| `review/video-review/*` | Rendered-frame evidence and director decision |

## Sequential vs Parallel Work

### Sequential Gates

These stages are not parallelized:

```text
topic
-> research-pack
-> creative-brief
-> draft-scene-packets
-> plan
-> user approval
-> TTS/SRT
-> timed-scene-packets
-> route work orders
```

Reason: visual strategy, script, and timing are upstream contracts. If multiple agents reinterpret them independently, the renderers will diverge.

### Parallel Vertical Slice Work

Parallel work starts only after `timed-scene-packets.md`, `asset-plan.md`, `design-context.md`, `scene-recipes/*`, and `motion-primitives/*` exist.

Each slice owns a scene group end-to-end:

```text
scene contract
-> recipe selection
-> asset route confirmation
-> Hyperframes scene implementation
-> Remotion scene implementation
-> scene snapshots
-> scene QA notes
-> fixes
```

### Sequential Closing Gates

These stages return to sequential:

```text
renderer integration
-> render both versions
-> review-video both versions
-> director-review comparison
-> final selection
-> final QA
-> package
-> Downloads copy
-> GitHub push
```

## Should We Use Subagents?

Yes, but only after the contracts exist.

Do not use subagents for early creative decisions. Use them for bounded vertical slices and independent verification.

Subagents are useful for:

- scene-group vertical slices that implement or specify both renderer folders from one scene contract
- disjoint file ownership by scene group
- QA/review script hardening while scene implementation continues
- Remotion setup while Hyperframes remains the fallback path
- independent frame review after renders exist

Subagents are not useful for:

- choosing the whole video angle before `creative-brief.md`
- rewriting the approved script
- making rights/source/privacy judgments
- editing the same composition files in parallel
- marking director review PASS without evidence frames

## Subagent Roles For Implementation

Use scene-group subagents, not renderer-team subagents.

Do not split work into a Hyperframes team and a Remotion team. That makes the same scene drift across renderers. Each scene-group subagent owns the scene interpretation and implements or specifies both renderer outputs from the same contract.

Shared scaffold, primitive definitions, QA scripts, final integration, and renderer comparison stay with the main agent or a single designated owner.

| Subagent | Use When | Owns | Must Not Touch |
|---|---|---|---|
| OS Docs Owner | Build reusable system docs/templates | `SCENE_RECIPE_SYSTEM.md`, `MOTION_GRAPHICS_QUALITY_SYSTEM.md`, `RENDERER_COMPARISON_PIPELINE.md`, `templates/project/*` | project 002 renderer folders |
| Recipe/Primitive Owner | Add initial scene recipes and primitive specs | `scene-recipes/*`, `motion-primitives/*` | renderer implementation folders after scaffold starts |
| QA Owner | Harden machine gates | `scripts/review_video.mjs`, `scripts/qa_project.mjs`, review templates | scene visual code unless fixing parser fixtures |
| Caption Sync Owner | Add audio/SRT sync report path | caption sync script/report hooks | motion design code |
| Slice A Subagent | Build scene 02 across both renderers | scene 02 files in `composition-hyperframes/` and `composition-remotion/` | other scene groups, shared primitives unless assigned |
| Slice B Subagent | Build scenes 05-06 across both renderers | scenes 05-06 files in both renderer folders | other scene groups, shared primitives unless assigned |
| Slice C Subagent | Build scenes 07-08 across both renderers | scenes 07-08 files in both renderer folders | other scene groups, shared primitives unless assigned |
| Slice D Subagent | Build scenes 09-10 across both renderers | scenes 09-10 files in both renderer folders | other scene groups, shared primitives unless assigned |
| Slice E Subagent | Build scenes 11-13 across both renderers | scenes 11-13 files in both renderer folders | other scene groups, shared primitives unless assigned |
| Renderer Judge | Compare outputs after render | `review/video-review/renderer-comparison.md`, director review draft | renderer source code |
| Integrator | Final consistency and package | package scripts, final copy, docs consistency | broad rewrites |

If only one Codex instance is active, the same sequence still applies. The "subagent" roles become local work packets, not separate workers.

## Vertical Slice File Ownership

Disjoint write sets prevent conflicts.

| Slice | Scenes | Main Idea | Hyperframes Write Scope | Remotion Write Scope |
|---|---:|---|---|---|
| Slice A | 02 | chatbot to operating system morph | `composition-hyperframes/src/scenes/scene-02.*` | `composition-remotion/src/scenes/Scene02.tsx` |
| Slice B | 05-06 | rubric loop, score, revise | `composition-hyperframes/src/scenes/scene-05-06.*` | `composition-remotion/src/scenes/Scene05.tsx`, `Scene06.tsx` |
| Slice C | 07-08 | fan-out/fan-in, worker lanes | `composition-hyperframes/src/scenes/scene-07-08.*` | `composition-remotion/src/scenes/Scene07.tsx`, `Scene08.tsx` |
| Slice D | 09-10 | event packet, trigger gate, action queue | `composition-hyperframes/src/scenes/scene-09-10.*` | `composition-remotion/src/scenes/Scene09.tsx`, `Scene10.tsx` |
| Slice E | 11-13 | operating-system convergence and final claim | `composition-hyperframes/src/scenes/scene-11-13.*` | `composition-remotion/src/scenes/Scene11.tsx`, `Scene12.tsx`, `Scene13.tsx` |

Shared primitive files are edited only by the Integrator or a designated primitive owner.

## `subagent-driven-development` Fit

The `subagent-driven-development` skill is usable for this plan, with constraints.

Use it for implementation waves after the plan and contracts are written. Do not use it to bypass upstream creative gates.

### Required Adaptation

The skill says to dispatch a fresh subagent per task with spec review and code quality review. For this repo, a "task" must be one of:

```text
OS docs/templates
recipe/primitive registry
QA/review gate hardening
caption sync report
scene group slice A: scene 02
scene group slice B: scenes 05-06
scene group slice C: scenes 07-08
scene group slice D: scenes 09-10
scene group slice E: scenes 11-13
renderer comparison/final package
```

Do not create separate tasks for "all Hyperframes scenes" and "all Remotion scenes". Renderer-level tasking would split scene direction and lower quality.

### Review Order Per Task

Every subagent task must pass:

```text
implementer
-> spec compliance review
-> code quality / craft review
-> integration by main agent
```

Spec compliance checks whether the task matches this plan and the scene contract.

Code quality / craft review checks:

- minimal unrelated changes
- no broad rewrites
- renderer folder boundaries respected
- motion tied to narration verb
- no decorative line/path misuse
- no card-only repeated layout unless recipe explicitly allows it
- captions and safe zones preserved
- verification command or blocker reported

### Dispatch Rule

Subagents receive exact task text, write scope, read-only context, and verification expectations. They do not read this whole plan independently and reinterpret it.

The main agent remains responsible for:

- creating or updating the task list
- preventing overlapping file writes
- answering subagent questions
- running final integration checks
- deciding whether Remotion is successful, blocked, or warning-only
- copying final outputs to Downloads
- committing and pushing

### Stop Conditions

Stop and escalate only if:

- a subagent reports a blocker that cannot be solved by more context or task splitting
- Remotion cannot install or render and fallback policy must be applied
- final render cannot be produced
- the plan itself conflicts with current repo structure

Do not stop between tasks just to ask "continue?" after implementation has started.

## Universal Production OS v1

### Content Type Model

Use video-level primary/secondary types. A video can mix types.

```yaml
primaryContentType: explain
secondaryContentTypes:
  - product
  - proof
```

Scene-level type may differ from the video type.

Examples:

| Scene | Scene Role | Scene Content Type |
|---|---|---|
| 01 | hook | visual-essay |
| 02 | mechanism | explain |
| 05 | proof | product |
| 08 | system | explain |

### Supported Content Types

| Type | Primary Visual Strategy |
|---|---|
| `explain` | HTML/SVG diagrams, flow, state transition |
| `story` | imagegen primary, timeline, reenactment, mood |
| `proof` | capture, document zoom, highlight, quote card |
| `reaction` | source clip, quote, rebuttal frame, split-screen |
| `tutorial` | screen recording, cursor path, step overlay |
| `product` | UI capture, feature demo, before/after |
| `documentary` | interview, B-roll, location/image, archive |
| `visual-essay` | imagegen, generated backgrounds, poetic typography |

### Scene Roles

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

### Visual Routes

```text
capture
video-use
imagegen
hyperframes
remotion
screen-recording
data-viz
manual
mixed
```

### Imagegen Role

`imagegen` is not globally secondary.

| Role | Meaning |
|---|---|
| `primary` | Generated image is the main explanatory, emotional, or metaphorical visual |
| `support` | Mood, texture, transition, styleframe, thumbnail support |
| `not_required` | Exact document, UI, data, code, or interview is more important |

Project 002 uses mostly `support` or `not_required`, but future story, history, visual essay, or emotion-heavy topics may use `imagegen: primary`.

## Initial Scene Recipes

Create these first:

```text
scene-recipes/explain/fan-out-fan-in.md
scene-recipes/explain/mechanism-state-machine.md
scene-recipes/proof/document-zoom-highlight.md
scene-recipes/product/before-after-demo.md
scene-recipes/visual-essay/imagegen-cinematic-sequence.md
```

Each recipe must include:

```text
Use When
Primary Route
Secondary Routes
Required Primitives
Motion Beats
Renderer Notes
QA Fail If
Example Scenes
```

## Initial Motion Primitives

Create these first:

```text
motion-primitives/anchoredPath.md
motion-primitives/packetFlow.md
motion-primitives/fanOutFanIn.md
motion-primitives/rubricLoop.md
motion-primitives/documentZoom.md
motion-primitives/liquidLens.md
```

Each primitive must include:

```text
Purpose
Use When
Avoid When
Hyperframes/GSAP Implementation Notes
Remotion Implementation Notes
Required Metadata
QA Checks
Failure Examples
```

## Motion Quality Rules

### Banned Patterns

- all scenes using the same fade + y + stagger motion
- decorative connector lines that float across text or cards
- large empty glass panels
- Liquid Glass as a global theme
- cards that appear without a visual thesis
- scene layouts repeated three or more times without a deliberate reason
- text-heavy panels with no motion tied to narration verbs

### Required Scene Contract

Every scene must define:

```yaml
scene:
narrationVerb:
viewerShouldUnderstand:
sceneRecipe:
primaryVisualRoute:
motionPrimitive:
motionPurpose:
captionRisk:
assetRisk:
reviewRisk:
```

If a scene says "split", "route", "score", "wake", "merge", "compare", "zoom", or "trigger", the motion must make that verb visible.

## Motion Graphics Research Applied To Our System

These references are used as implementation guidance, not as copy templates.

| Reference | What We Use |
|---|---|
| Remotion `useCurrentFrame` | Frame-relative scene timing and scene-local animation |
| Remotion `Sequence` | Renderer-level scene separation |
| Remotion `@remotion/transitions` | Named transition presentations such as fade, slide, wipe, iris, zoomBlur |
| Remotion `@remotion/paths` | SVG path length, tangent, morph, bounding box, and route quality |
| Remotion `@remotion/motion-blur` | Camera movement, packet flow, and trail effects when motion is fast |
| Apple Liquid Glass | Use glass as adaptive control/focus layer, not as a generic card style |
| Rive state machines | Candidate for reusable stateful animation assets |
| Lottie JSON | Candidate for reusable vector animation assets |

Implementation links:

- https://www.remotion.dev/docs/use-current-frame
- https://www.remotion.dev/docs/transitions
- https://www.remotion.dev/docs/paths
- https://www.remotion.dev/docs/motion-blur
- https://developer.apple.com/videos/play/wwdc2025/219/
- https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- https://rive.app/docs/runtimes/web/state-machines
- https://docs.lottiefiles.com/en/format/lottie-json

## Liquid Glass Rules

Liquid Glass is a limited motion grammar, not the visual identity of every video.

### Allowed

- selected state
- floating control
- focus lens
- route packet passing over a surface
- before/after boundary transition
- short adaptive highlight on interaction or state change

### Not Allowed

- large reading panels made entirely glass
- text-heavy cards under strong blur
- decorative sheen on every card
- glass over content that reduces legibility
- global "everything is glass" theme

### CSS Direction

Use this only as a primitive seed, not as a default card style.

```css
.liquid-lens {
  backdrop-filter: blur(18px) saturate(1.25);
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.28), transparent 34%),
    linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.035));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.28),
    inset 0 -1px 0 rgba(0,0,0,.25),
    0 18px 48px rgba(0,0,0,.32);
}
```

## Renderer Strategy

### Common Contract

Both renderers must read the same:

```text
project.json
timed-scene-packets.md
asset-plan.md
design-context.md
scene-recipes/*
motion-primitives/*
voiceover/solo/voiceover-solo-final-mix.m4a
voiceover/solo/voiceover-solo-elevenlabs.srt
```

### Hyperframes Renderer

Path:

```text
projects/002-claude-managed-agents/composition-hyperframes/
```

Rules:

- no global all-scene timeline as the primary implementation
- use scene-specific nested timelines
- keep shared primitives in `composition-hyperframes/src/motion-primitives.js`
- keep recipe mapping in `composition-hyperframes/src/scene-recipes.js`
- output `renders/final-hyperframes.mp4`

Example direction:

```js
export function buildScene08Timeline({tl, root, scene}) {
  const anchors = getAnchors(root, ["lead", "log", "docs", "code", "merge"]);
  const paths = anchoredPath({
    svg: root.querySelector("[data-route-layer]"),
    from: anchors.lead,
    to: [anchors.log, anchors.docs, anchors.code],
    avoid: root.querySelectorAll("[data-no-cross]")
  });

  packetFlow({
    tl,
    paths,
    tokens: root.querySelectorAll("[data-packet]"),
    start: scene.start + 0.8
  });

  fanOutFanIn({
    tl,
    root,
    start: scene.start + 1.1
  });
}
```

### Remotion Renderer

Path:

```text
projects/002-claude-managed-agents/composition-remotion/
```

Rules:

- use `Sequence` for scene separation
- use `useCurrentFrame` for local frame control
- use `@remotion/paths` for route path quality where installed
- use `@remotion/motion-blur` only for fast packet/camera movement
- output `renders/final-remotion.mp4`
- keep Remotion as candidate renderer until more projects prove it

Example direction:

```tsx
const Scene08 = ({scene}: {scene: SceneSpec}) => {
  const frame = useCurrentFrame();
  const local = frame - scene.startFrame;
  const split = spring({frame: local - 12, fps: 30});
  const merge = spring({frame: local - 95, fps: 30});

  return (
    <AbsoluteFill>
      <FanOutFanInGraph split={split} merge={merge} />
      <PacketLayer progress={interpolate(local, [20, 90], [0, 1])} />
    </AbsoluteFill>
  );
};
```

## QA And Review Gates

### `factory:review-video`

This script must create evidence, not creative approval.

It should extract:

- contact sheet
- start/mid/end frame per scene
- caption-change frames
- motion-peak frames
- transition frames
- suspicious static frames

It should report:

- static gap
- caption safe-zone issues
- repeated layout signature
- path misuse
- missing route asset
- asset-plan/work-order mismatch
- renderer output validity

### Path Quality Rules

Fail or block when:

- `path-draw` has no anchor metadata
- path crosses title or caption safe zones
- path spans broad screen space without concrete from/to nodes
- path is decorative and not tied to the narration verb
- path visually cuts through cards or text

### Caption Sync Rules

Do not rely only on SRT duration or characters per second.

Target report:

```text
review/video-review/caption-sync-report.json
```

Process:

```text
final mix audio
-> whisper/onset extraction or fallback waveform/onset check
-> compare with ElevenLabs SRT
-> report mean and max timing deltas
```

Thresholds:

```text
meanAbsDelta > 250ms => FAIL
maxDelta > 500ms => blocker
repeated caption-after-speech => blocker
caption covers primary visual => blocker
```

If Whisper tooling is slow or unavailable, use a fallback onset/waveform report and mark the limitation explicitly.

### Director Review Rules

`director-review.md` cannot PASS with a one-line judgment.

PASS requires:

- evidence frame per major scene group
- issue/fix/resolved columns
- renderer comparison decision
- no unresolved critical findings
- statement of why the selected renderer is better

## Project 002 As First Test Case

Project:

```text
projects/002-claude-managed-agents
```

Video strategy:

```yaml
primaryContentType: explain
secondaryContentTypes:
  - product
  - proof
primaryVisualStrategy: technical system explainer
motionGrammar:
  - technical-grid
  - limited-liquid-control
imagegenRole: support/not_required
rendererTargets:
  - hyperframes
  - remotion
```

Scene targets:

| Scene | Recipe | Primitive Focus | Fix Goal |
|---|---|---|---|
| 02 | `explain/mechanism-state-machine` | state morph, liquidLens | chatbot becomes operating system |
| 05-06 | `explain/mechanism-state-machine` | rubricLoop | criteria, judge, revise, retry loop |
| 07-08 | `explain/fan-out-fan-in` | fanOutFanIn, packetFlow, anchoredPath | parallel work visibly splits and merges |
| 09-10 | `explain/mechanism-state-machine` | packetFlow, anchoredPath | event packet triggers action queue |
| 11-13 | synthesis/payoff recipe | convergence, kinetic type | four features become one operating system |

## Implementation Waves

### Wave 1: Planning Artifacts

Add:

```text
SCENE_RECIPE_SYSTEM.md
MOTION_GRAPHICS_QUALITY_SYSTEM.md
RENDERER_COMPARISON_PIPELINE.md
VERTICAL_SLICE_SUBAGENT_IMPLEMENTATION_PLAN.md
```

Update:

```text
templates/project/creative-brief.md
templates/project/draft-scene-packets.md
templates/project/timed-scene-packets.md
templates/project/asset-plan.md
templates/project/design-context.md
```

Pass when the templates can express content type, scene recipe, visual route, motion grammar, renderer targets, and review rubric.

### Wave 2: Recipe And Primitive Registry

Add the initial 5 recipes and 6 primitives.

Pass when each recipe and primitive has renderer-specific implementation notes and QA failure conditions.

### Wave 3: Review Gate Hardening

Update:

```text
scripts/review_video.mjs
scripts/qa_project.mjs
templates/project/review/video-review/director-review.md
skills/hype-video-reviewer/SKILL.md
skills/hype-motion-designer/SKILL.md
```

Pass when:

- evidence-frame-free PASS fails
- route completion without visible implementation fails
- path misuse fails
- repeated layout signature fails or warns by severity
- caption sync report is generated or limitation is explicit

### Wave 4: Renderer Scaffold

Add:

```text
projects/002-claude-managed-agents/composition-hyperframes/
projects/002-claude-managed-agents/composition-remotion/
```

Pass when both renderer folders can run their local check/build command or report a clear blocker.

### Wave 5: Vertical Slice Scene Production

Implement scene groups:

```text
02
05-06
07-08
09-10
11-13
```

Pass when each slice has:

- Hyperframes implementation
- Remotion implementation or clear renderer blocker
- scene snapshot
- no obvious caption overlap
- motion tied to narration verb

### Wave 6: Render Both Versions

Commands target:

```bash
npm run factory:render -- projects/002-claude-managed-agents -- --renderer hyperframes
npm run factory:render -- projects/002-claude-managed-agents -- --renderer remotion
```

Attempted outputs:

```text
renders/final-hyperframes.mp4
renders/final-remotion.mp4
```

If Remotion blocks, `final-remotion.mp4` is omitted and the blocker is recorded in `renderer-comparison.md`.

### Wave 7: Review Both Versions

Commands target:

```bash
npm run factory:review-video -- projects/002-claude-managed-agents -- --render final-hyperframes.mp4
npm run factory:review-video -- projects/002-claude-managed-agents -- --render final-remotion.mp4
```

Outputs:

```text
review/video-review/hyperframes-review.md
review/video-review/remotion-review.md
review/video-review/renderer-comparison.md
```

### Wave 8: Final Selection And Package

Pick the better renderer by evidence, not preference.

Selection criteria:

- caption sync
- static gap
- scene uniqueness
- motion purpose
- asset fit
- line quality
- YouTube rhythm
- director score

Outputs:

```text
renders/final.mp4
~/Downloads/claude-managed-agents-final.mp4
~/Downloads/claude-managed-agents-hyperframes.mp4
~/Downloads/claude-managed-agents-remotion.mp4
```

Fallback outputs when Remotion is blocked:

```text
renders/final-hyperframes.mp4
renders/final.mp4
review/video-review/renderer-comparison.md with Remotion blocked
~/Downloads/claude-managed-agents-final.mp4
~/Downloads/claude-managed-agents-hyperframes.mp4
```

Do not create a fake `final-remotion.mp4` if Remotion did not render.

### Wave 9: Generalize And Push

Only promote what passed in project 002.

Update:

```text
TOOL_ROUTING_PIPELINE.md
CONTENT_FACTORY_PIPELINE.md
FACTORY_AUTOMATION_ROADMAP.md
README.md
AGENTS.md
CLAUDE.md
skills/hype-visual-director/SKILL.md
skills/hype-motion-designer/SKILL.md
skills/hype-video-reviewer/SKILL.md
```

Then:

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:qa -- projects/002-claude-managed-agents -- --stage final
git status --short
git add .
git commit -m "Build vertical slice renderer comparison production plan"
git push
```

## Done Definition

The implementation goal is complete only when:

1. Universal OS v1 docs and templates exist.
2. 5 initial scene recipes exist.
3. 6 initial motion primitives exist.
4. Review gates block low-quality PASS.
5. Caption sync report exists or a clear fallback limitation is logged.
6. Hyperframes version renders.
7. Remotion version renders or an explicit blocker is recorded in `renderer-comparison.md`.
8. Both outputs have review evidence.
9. `renderer-comparison.md` selects a final output.
10. `renders/final.mp4` exists.
11. Downloads contains the final file and available comparison files.
12. Generalized rules are reflected in docs/skills/templates.
13. GitHub push is complete.

## Subagent Execution Policy

When Codex subagents are available and the user authorizes parallel implementation:

1. Spawn subagents only after Wave 1 contracts are written.
2. Give each subagent a scene-group write set, not a renderer-wide write set.
3. Do not delegate the immediate blocking step.
4. Do not let two subagents edit the same scene group, same shared primitive file, or same QA script.
5. Require every subagent final response to list changed paths and verification commands.
6. Run spec compliance review and code/craft quality review after each subagent task.
7. Main agent integrates and runs final checks.

When subagents are not used, follow the same waves serially.
