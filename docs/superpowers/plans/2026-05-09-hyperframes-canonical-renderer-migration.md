# Hyperframes Canonical Renderer Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Hyperframes the default final-design renderer while importing Remotion's useful timing, frame-review, and renderer-comparison gates into a reusable video production OS.

**Architecture:** Hyperframes becomes the canonical delivery renderer for this style: dark editorial grid, glass panels, strong Korean typography, and GSAP/HTML/SVG motion. Remotion remains a comparison/candidate renderer and timing lab, not the default final aesthetic. All future videos must pass actual-render frame review, caption checks, route utility checks, and director review before packaging.

**Tech Stack:** Node scripts, Hyperframes, HTML/CSS/SVG/GSAP, ffmpeg/ffprobe, existing `factory:*` scripts, project Markdown templates, Remotion as optional comparison renderer.

---

## Non-Negotiable Decisions

- Hyperframes is the default final renderer for this project's current design language.
- Remotion is kept as `candidate` / `timing_lab` / `comparison`, not promoted globally.
- The final render selected for upload must be chosen by rendered-frame review, not by script state or synthetic DOM markers.
- A capture route is valid only when the captured asset directly explains the narration.
- Free-floating connector lines are banned. Every line must be anchored to named node bounds or replaced by lanes/tokens.
- Big empty panels are blockers, even if the DOM has many child nodes.

## Current Problem To Fix

The selected Remotion V2 render improved structure and smoothness, but the user prefers the Hyperframes visual language. Hyperframes had a better editorial look but failed on connector-line quality and weak visual QA. The migration should keep Hyperframes' design strengths and import Remotion-era safeguards:

- real MP4 frame extraction;
- scene `motion-peak` evidence;
- director-review blocking gate;
- synthetic DOM false-positive detection;
- renderer comparison;
- caption lead/sync checks;
- scene visual thesis fields.

## File Map

### Modify

- `projects/002-claude-managed-agents/composition-hyperframes/index.html`
  - Build Hyperframes V2 for the current video.
  - Remove ugly free-floating path overlays.
  - Add anchored lines, lanes, token flows, and denser scene-specific layouts.

- `projects/002-claude-managed-agents/composition-hyperframes/src/scenes.json`
  - Keep scene timing as data source.
  - Add or verify per-scene recipe references if the current composer reads them.

- `projects/002-claude-managed-agents/composition-hyperframes/src/design-context.json`
  - Carry over visual thesis and motion grammar from project docs into Hyperframes data.

- `scripts/review_video.mjs`
  - Ensure Hyperframes receives the same actual-frame review treatment as Remotion.
  - Add route-utility warnings for source capture frames.

- `scripts/qa_project.mjs`
  - Allow Hyperframes to be selected as final when it has actual frame evidence and anchored-line checks pass.
  - Keep synthetic DOM checks for all renderers that generate review HTML.

- `scripts/package_project.mjs`
  - No behavior change expected. Verify it copies selected `renders/final.mp4` plus comparison renders.

- `projects/002-claude-managed-agents/review/video-review/renderer-comparison.md`
  - Re-select Hyperframes V2 if it passes.

- `projects/002-claude-managed-agents/review/video-review/director-review.md`
  - Rewrite as Hyperframes V2 PASS only after inspecting actual frames.

- `TOOL_ROUTING_PIPELINE.md`
  - Clarify capture route utility rules.
  - Clarify Hyperframes as final design renderer and Remotion as candidate renderer.

- `RENDERER_COMPARISON_PIPELINE.md`
  - Add renderer-role taxonomy: `canonical_design`, `candidate`, `timing_lab`, `blocked`.

- `MOTION_GRAPHICS_QUALITY_SYSTEM.md`
  - Add Hyperframes-specific motion-quality rules.
  - Ban non-anchored connector lines and decorative source zoom boxes.

- `templates/project/creative-brief.md`
  - Add `Preferred Final Renderer` and `Renderer Candidate Policy`.

- `templates/project/design-context.md`
  - Add `Canonical Design Language` and `Capture Utility Contract`.

- `templates/project/asset-plan.md`
  - Add capture usefulness fields.

- `templates/project/timed-scene-packets.md`
  - Add `Motion Peak Evidence Required` field.

### Create

- `motion-primitives/hyperframes-anchored-lines.md`
  - Define how Hyperframes lines must attach to nodes.

- `motion-primitives/hyperframes-source-evidence.md`
  - Define when screenshots/captures are useful enough to show.

- `motion-primitives/hyperframes-scene-density.md`
  - Define visual-density patterns that avoid empty panels.

- `projects/002-claude-managed-agents/review/video-review/hyperframes-v2-fix-list.md`
  - Track the specific current-video fixes before final selection.

## Task 1: Reclassify Renderer Roles

**Files:**
- Modify: `RENDERER_COMPARISON_PIPELINE.md`
- Modify: `templates/project/creative-brief.md`
- Modify: `projects/002-claude-managed-agents/review/video-review/renderer-comparison.md`

- [ ] **Step 1: Define renderer roles**

Add this taxonomy:

```markdown
## Renderer Roles

| Role | Meaning | Package Eligibility |
|---|---|---|
| canonical_design | Default renderer for final visual language | eligible |
| candidate | Alternative renderer for comparison | eligible only if selected by director review |
| timing_lab | Used to test timing, transitions, or captions | not eligible by default |
| blocked | Render failed or quality gate failed | not eligible |

Current default:
- Hyperframes: canonical_design
- Remotion: candidate / timing_lab
```

- [ ] **Step 2: Add creative-brief fields**

Add:

```markdown
Preferred Final Renderer:
- hyperframes

Renderer Candidate Policy:
- Hyperframes owns final design language unless director review selects another renderer.
- Remotion may be used for comparison, timing experiments, or proof that a frame-based renderer improves a specific scene.
- A candidate renderer cannot become final without frame evidence and director review.
```

- [ ] **Step 3: Update current renderer comparison to planned migration state**

Before rebuilding Hyperframes V2, set:

```markdown
Verdict: NEEDS_REVIEW

Selected renderer: none

Migration target:
- Hyperframes V2 should be rebuilt and reviewed as the preferred final candidate.
- Remotion V2 remains available as comparison and fallback.
```

- [ ] **Step 4: Verify**

Run:

```bash
rg -n "canonical_design|Preferred Final Renderer|Selected renderer" RENDERER_COMPARISON_PIPELINE.md templates/project/creative-brief.md projects/002-claude-managed-agents/review/video-review/renderer-comparison.md
```

Expected:

- Each file contains the new renderer-role language.

## Task 2: Add Capture Utility Contract

**Files:**
- Modify: `TOOL_ROUTING_PIPELINE.md`
- Modify: `templates/project/asset-plan.md`
- Modify: `projects/002-claude-managed-agents/asset-plan.md`
- Create: `motion-primitives/hyperframes-source-evidence.md`

- [ ] **Step 1: Define capture pass/fail rules**

Add:

```markdown
## Capture Utility Contract

A capture route is `qa_passed` only when all are true:

- The capture is from the intended page or source.
- The visible crop is relevant to the exact narration beat.
- The important region occupies enough screen area to read or recognize.
- Highlight/zoom points to a meaningful source detail, not a decorative rectangle.
- The scene overlays Korean interpretation, labels, or comparison structure.

Capture route must be downgraded to `support` or rerouted to Hyperframes diagram when:

- The page is mostly English text and the viewer cannot quickly understand it.
- The highlighted box does not identify a specific claim or UI affordance.
- The capture is used as background texture.
- The narration can be explained better by a diagram, flow, or typed evidence card.
```

- [ ] **Step 2: Extend asset-plan columns**

Add these columns to `templates/project/asset-plan.md` and current `asset-plan.md`:

```markdown
| Capture Role | Useful Crop | Viewer Reads What | Reroute If Weak |
```

Allowed `Capture Role` values:

```text
primary_evidence
support_texture
not_required
reroute_to_diagram
```

- [ ] **Step 3: Mark current weak capture as requiring redesign**

For current Scene 03, change the action language from generic `captured official page` to:

```markdown
Capture Role: support_texture
Useful Crop: weak
Viewer Reads What: source context only, not enough Korean explanation
Reroute If Weak: build Hyperframes memory sorting diagram and keep capture as small source stamp
```

- [ ] **Step 4: Verify**

Run:

```bash
rg -n "Capture Utility Contract|primary_evidence|support_texture|reroute_to_diagram|Useful Crop" TOOL_ROUTING_PIPELINE.md templates/project/asset-plan.md projects/002-claude-managed-agents/asset-plan.md motion-primitives/hyperframes-source-evidence.md
```

Expected:

- Capture pass/fail rules exist in docs and templates.

## Task 3: Define Hyperframes Anchored Lines

**Files:**
- Create: `motion-primitives/hyperframes-anchored-lines.md`
- Modify: `MOTION_GRAPHICS_QUALITY_SYSTEM.md`
- Modify: `scripts/review_video.mjs`

- [ ] **Step 1: Add anchored-line primitive spec**

Create:

```markdown
# hyperframes/anchored-lines

Use When:
- A diagram needs to show dependency, flow, assignment, or convergence.

Do:
- Draw lines inside an SVG layer.
- Compute path endpoints from named anchors.
- Keep paths behind text and above background.
- Use `stroke-dasharray` / `stroke-dashoffset` for draw animation.
- Use curved paths only when they avoid text and panel bodies.

Do Not:
- Draw arbitrary diagonal divs.
- Let lines cross title, captions, or readable text.
- Use decorative lines that do not explain flow.
- Put a highlighted rectangle over a capture unless it points to a narrated source detail.

Required DOM:
- Nodes use `data-anchor-id`.
- SVG paths use `data-path-from` and `data-path-to`.
- Text-safe areas use `data-no-cross`.

QA Fail If:
- A path has no `data-path-from` or `data-path-to`.
- A path bounding box intersects a `data-no-cross` element.
- A scene has connector lines but no visible moving token, pulse, or direction marker.
```

- [ ] **Step 2: Add review scanner rule**

In `scripts/review_video.mjs`, extend line-quality detection:

```js
const unanchoredPaths = [...html.matchAll(/<path\b([^>]*)>/gi)]
  .filter((match) => !/data-path-from=/.test(match[1]) || !/data-path-to=/.test(match[1]));
```

Report:

```json
{
  "issue": "unanchored_path_draw",
  "severity": "blocker",
  "detail": "SVG path lacks data-path-from/data-path-to anchor metadata"
}
```

- [ ] **Step 3: Verify**

Run:

```bash
node --check scripts/review_video.mjs
npm run factory:review-video -- projects/002-claude-managed-agents -- --render final-hyperframes.mp4
```

Expected:

- Current Hyperframes remains FAIL until lines are anchored or removed.

## Task 4: Refactor Hyperframes V2 Scenes Around Visual Thesis

**Files:**
- Modify: `projects/002-claude-managed-agents/composition-hyperframes/index.html`
- Modify: `projects/002-claude-managed-agents/composition-hyperframes/src/design-context.json`
- Modify: `projects/002-claude-managed-agents/timed-scene-packets.md`
- Create: `projects/002-claude-managed-agents/review/video-review/hyperframes-v2-fix-list.md`

- [ ] **Step 1: Write the current fix-list**

Create:

```markdown
# Hyperframes V2 Fix List

| Scene | Current Problem | V2 Direction | Pass Evidence |
|---|---|---|---|
| 01 | Good mood, but route lines must not cross content | OS assembly with anchored paths or no lines | `scene-01-motion-peak.png` |
| 03 | Source capture feels like an English page with a decorative orange box | Small source stamp + main Korean memory-sorting diagram | `scene-03-motion-peak.png` |
| 06 | Outcome loop must show criteria, scoring, revision, re-score | Rubric loop with moving score token | `scene-06-motion-peak.png` |
| 08 | Multi-agent must show fan-out/fan-in, not static worker cards | Worker lanes + packets + merge gate | `scene-08-motion-peak.png` |
| 09 | Event trigger must show event packet passing a trigger gate | Event packet -> trigger gate -> action queue | `scene-09-motion-peak.png` |
| 11 | Four functions should converge into one operating system | Convergence board, no generic summary cards | `scene-11-motion-peak.png` |
| 13 | Final takeaway should feel like a conclusion, not another card list | Big final question + four operating levers | `scene-13-motion-peak.png` |
```

- [ ] **Step 2: Rebuild Scene 03 capture use**

Change Scene 03 design:

```text
Left 22%: small source stamp with cropped official page.
Right 78%: Korean memory sorting board.
Motion: noisy chips enter, only useful patterns remain.
No large orange rectangle over the screenshot.
```

CSS/DOM requirements:

```html
<div class="source-stamp" data-capture-role="support_texture">
  <img src="./assets/screenshots/scene-03-capture-3.png" alt="" />
  <span>공식 발표 캡처</span>
</div>
<div class="memory-sorter" data-visual-thesis="dreaming-sorts-memory">
  <div class="noise-chip">반복 실수</div>
  <div class="noise-chip">성공 워크플로</div>
  <div class="memory-result">쓸모 있는 메모리</div>
</div>
```

- [ ] **Step 3: Replace line-heavy scenes with lane/token motion**

For Scenes 01, 08, 09, 11:

```text
Prefer lanes, packets, state bars, and merge gates.
Use SVG anchored paths only when direction cannot be shown by layout.
No decorative diagonal strokes.
```

- [ ] **Step 4: Verify snapshots before render**

Run:

```bash
npm --prefix projects/002-claude-managed-agents/composition-hyperframes run check
npm --prefix projects/002-claude-managed-agents/composition-hyperframes run snapshot -- . --at 6.7,36.6,97.7,186.7,211.4,261.4,293.1 --output snapshots-hyperframes-v2
```

Expected:

- Snapshot frames show no ugly diagonal free-floating lines.
- Scene 03 no longer has a large decorative orange rectangle over an English source page.
- Large panels have visible Korean explanatory structure.

## Task 5: Render Hyperframes V2 And Review Actual Frames

**Files:**
- Modify generated: `projects/002-claude-managed-agents/renders/final-hyperframes.mp4`
- Modify generated: `projects/002-claude-managed-agents/review/video-review/hyperframes-review.md`
- Modify generated: `projects/002-claude-managed-agents/review/video-review/frame-manifest-hyperframes.json`
- Modify generated: `projects/002-claude-managed-agents/review/video-review/scene-frame-notes-hyperframes.md`

- [ ] **Step 1: Render Hyperframes V2**

Run:

```bash
npm run factory:render -- projects/002-claude-managed-agents -- --renderer hyperframes
```

Expected:

```text
Rendered: projects/002-claude-managed-agents/renders/final-hyperframes.mp4
```

- [ ] **Step 2: Generate actual frame review**

Run:

```bash
npm run factory:review-video -- projects/002-claude-managed-agents -- --render final-hyperframes.mp4
```

Expected:

```text
Wrote: projects/002-claude-managed-agents/review/video-review/hyperframes-review.md
Result: PASS
```

If the result is FAIL, do not select Hyperframes. Fix line/capture/static issues first.

- [ ] **Step 3: Inspect frames manually**

Open these:

```text
review/video-review/contact-sheet-hyperframes.jpg
review/video-review/scene-frames-hyperframes/scene-03-motion-peak.png
review/video-review/scene-frames-hyperframes/scene-08-motion-peak.png
review/video-review/scene-frames-hyperframes/scene-09-motion-peak.png
```

Pass standard:

- Scene 03 must not look like a random English webpage crop.
- Scene 08 must visibly show parallel work distribution.
- Scene 09 must visibly show event -> trigger -> action.
- Captions must not cover the main visual explanation.

## Task 6: Re-select Final Renderer

**Files:**
- Modify: `projects/002-claude-managed-agents/review/video-review/renderer-comparison.md`
- Modify: `projects/002-claude-managed-agents/review/video-review/director-review.md`
- Modify generated: `projects/002-claude-managed-agents/renders/final.mp4`

- [ ] **Step 1: Select Hyperframes only if it passes**

If Hyperframes V2 passes machine review and director frame inspection, write:

```markdown
Verdict: PASS

Selected renderer: hyperframes

Why:
- Hyperframes owns the preferred final design language.
- V2 removed unanchored connector lines.
- V2 replaced decorative source zoom with useful Korean explanatory structure.
- V2 passes actual-frame review.
```

- [ ] **Step 2: Write director evidence**

`director-review.md` must cite at least 8 Hyperframes frames:

```markdown
`review/video-review/scene-frames-hyperframes/scene-01-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-03-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-06-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-08-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-09-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-10-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-11-motion-peak.png`
`review/video-review/scene-frames-hyperframes/scene-13-motion-peak.png`
```

- [ ] **Step 3: Promote Hyperframes to final**

Run:

```bash
cp projects/002-claude-managed-agents/renders/final-hyperframes.mp4 projects/002-claude-managed-agents/renders/final.mp4
```

- [ ] **Step 4: Verify final QA**

Run:

```bash
npm run factory:qa -- projects/002-claude-managed-agents -- --stage final
```

Expected:

```text
Result: PASS
```

## Task 7: Package And Copy To Downloads

**Files:**
- Generated: `projects/002-claude-managed-agents/package/*`
- Generated local artifacts in `~/Downloads`

- [ ] **Step 1: Package**

Run:

```bash
npm run factory:package -- projects/002-claude-managed-agents
```

Expected:

```text
Generated upload package under projects/002-claude-managed-agents/package
```

- [ ] **Step 2: Verify Downloads**

Run:

```bash
ls -lh ~/Downloads/claude-managed-agents-final.mp4 ~/Downloads/claude-managed-agents-hyperframes.mp4 ~/Downloads/claude-managed-agents-remotion.mp4
```

Expected:

- `claude-managed-agents-final.mp4` exists and matches selected Hyperframes V2.
- `claude-managed-agents-hyperframes.mp4` exists as the selected design renderer.
- `claude-managed-agents-remotion.mp4` exists as comparison/fallback.

## Task 8: Generalize The Rule Into Factory Defaults

**Files:**
- Modify: `FACTORY_AUTOMATION_ROADMAP.md`
- Modify: `CONTENT_FACTORY_PIPELINE.md`
- Modify: `TOOL_ROUTING_PIPELINE.md`
- Modify: `skills/hype-motion-designer/SKILL.md`
- Modify: `skills/hype-video-reviewer/SKILL.md`
- Modify: `skills/hype-production-orchestrator/SKILL.md`

- [ ] **Step 1: Add renderer selection policy**

Add:

```markdown
Renderer selection is a creative decision, not a technical default.

Default:
- Use Hyperframes when the target style is editorial explainer, technical diagram, Korean narration, dark grid, glass panel, or YouTube information video.

Use Remotion when:
- frame-perfect sequence timing is the main risk,
- caption rendering needs React-based control,
- comparison render is explicitly requested,
- a scene requires complex frame interpolation that Hyperframes cannot express cleanly.

Final selection requires:
- machine review,
- contact sheet,
- director-review with evidence frames,
- final QA.
```

- [ ] **Step 2: Add capture downgrade rule**

Add:

```markdown
If a capture is technically correct but visually unhelpful, downgrade it:

primary_evidence -> support_texture -> not_required -> reroute_to_diagram
```

- [ ] **Step 3: Verify docs**

Run:

```bash
rg -n "Renderer selection is a creative decision|primary_evidence -> support_texture|Hyperframes when" FACTORY_AUTOMATION_ROADMAP.md CONTENT_FACTORY_PIPELINE.md TOOL_ROUTING_PIPELINE.md skills/hype-motion-designer/SKILL.md skills/hype-video-reviewer/SKILL.md skills/hype-production-orchestrator/SKILL.md
npm run factory:validate-templates
```

Expected:

- Renderer policy appears in docs/skills.
- Template validation passes.

## Task 9: Final Verification And Push

**Files:**
- All modified files.

- [ ] **Step 1: Run full checks**

Run:

```bash
node --check scripts/review_video.mjs
node --check scripts/qa_project.mjs
npm run factory:doctor
npm run factory:validate-templates
npm run factory:qa -- projects/002-claude-managed-agents -- --stage final
npm run factory:status -- projects/002-claude-managed-agents
```

Expected:

- JS syntax checks pass.
- Doctor passes required checks.
- Template validation passes.
- Final QA passes.
- Project status is `done`.

- [ ] **Step 2: Confirm remote state before committing**

Run:

```bash
git status --short --branch
git diff --stat
```

Expected:

- Only intended docs, scripts, Hyperframes composition, and review files changed.

- [ ] **Step 3: Commit**

Run:

```bash
git add RENDERER_COMPARISON_PIPELINE.md MOTION_GRAPHICS_QUALITY_SYSTEM.md TOOL_ROUTING_PIPELINE.md CONTENT_FACTORY_PIPELINE.md FACTORY_AUTOMATION_ROADMAP.md templates/project skills/hype-motion-designer/SKILL.md skills/hype-video-reviewer/SKILL.md skills/hype-production-orchestrator/SKILL.md scripts/review_video.mjs scripts/qa_project.mjs motion-primitives projects/002-claude-managed-agents
git commit -m "Make Hyperframes canonical renderer with frame-reviewed QA"
```

- [ ] **Step 4: Push**

Run:

```bash
git push
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected:

- Local HEAD equals remote `refs/heads/main`.

## Subagent / Vertical Slice Execution Model

Use subagents only after shared docs and scene plans are fixed. Do not split by renderer. Split by scene group vertical slices so each worker owns the same scene's planning, Hyperframes implementation, review frames, and fixes.

Recommended ownership:

| Worker | Scope | Files |
|---|---|---|
| Main | Renderer policy, QA gates, final integration | scripts, templates, docs, renderer comparison |
| Worker A | Scenes 01/03 capture and source evidence | Hyperframes index sections, asset-plan capture rows, frame notes |
| Worker B | Scenes 06/08 mechanism and fan-out/fan-in | Hyperframes index sections, motion primitive docs |
| Worker C | Scenes 09/11/13 trigger/convergence/payoff | Hyperframes index sections, director evidence |

Rules:

- Workers do not edit `scripts/qa_project.mjs` or `scripts/review_video.mjs`; main owns those.
- Workers do not select final renderer; main owns `renderer-comparison.md`.
- Each worker must produce snapshots or frame evidence for its scene group.
- Main does final QA and packaging.

## Done Definition

Done only when all are true:

- Hyperframes V2 removes ugly free-floating connector lines.
- Scene 03 capture no longer looks like a random English page with a decorative rectangle.
- Capture route utility rules are documented and enforced.
- `factory:review-video` produces Hyperframes frame evidence.
- `director-review.md` cites Hyperframes evidence frames.
- `renderer-comparison.md` selects Hyperframes V2.
- `renders/final.mp4` equals Hyperframes V2.
- `factory:qa --stage final` passes.
- Package copies final/comparison MP4s to Downloads.
- GitHub main is pushed.

## Self-Review

Spec coverage:
- Hyperframes preferred design language: covered by Tasks 1, 4, 6, 8.
- Remotion useful parts imported: covered by Tasks 3, 5, 6, 8.
- Capture box/source screenshot concern: covered by Tasks 2 and 4.
- 범용성: covered by templates, docs, skills, and QA scripts in Tasks 1, 2, 3, 8.
- Vertical slice/subagent execution: covered by dedicated execution model section.

Placeholder scan:
- No `TBD`, generic "handle later", or unspecified pass criteria.

Type consistency:
- Renderer values are `hyperframes`, `remotion`, `none`.
- Capture role values are `primary_evidence`, `support_texture`, `not_required`, `reroute_to_diagram`.
