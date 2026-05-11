# Visual Source Routing and Scene Contracts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` only after the shared contracts are written. Do not parallelize the planning gates. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable production loop where every scene has a clear visual source decision before writing, implementation cannot fill gaps with generic cards/effects, and final video review catches weak motion, weak captures, bad subtitles, and empty-looking scenes.

**Architecture:** `project.json` remains the large-stage state, but `scene-contracts.md` becomes the implementation contract between scene planning and motion work. `asset-plan.md`, `design-context.md`, and `work-orders/*.md` describe resources and execution state; `review-video` and `director-review.md` judge actual rendered frames, not synthetic DOM markers.

**Tech Stack:** Node scripts, Markdown templates, Hyperframes/HTML/CSS/GSAP as the canonical renderer, optional Remotion candidate only when explicitly requested, ElevenLabs SRT for caption timing, ffmpeg/ffprobe for media checks.

---

## Scope Decisions

- `youtube-scene-director` is not used.
- `writing-skills` is not used.
- `hype-source-editor`, source-notes gate, rights/privacy/citation review remain out of MVP.
- Hyperframes is the default renderer. Remotion is a candidate renderer, not a default factory requirement.
- Caption progress bars are banned. Captions show text only, timed from ElevenLabs forced-alignment SRT.
- Capture zoom/highlight/Korean labels are optional. They are not mandatory because narration/subtitles can explain the capture.
- If a capture is used as a scene's primary visual, it must be large enough to read: at least one side of the composition, roughly half the frame width/height depending on layout.
- The first implementation target is the factory loop itself. The next actual topic video uses this loop after the validation gates pass.

## Source Of Truth Stack

| Layer | Purpose | May Block Work |
|---|---|---|
| `project.json` | large project state and current gate | yes |
| `creative-brief.md` | whole-video content type, visual strategy, motion grammar | yes |
| `draft-scene-packets.md` | scene purpose and route before script | yes |
| `scene-contracts.md` | exact implementation contract per scene | yes |
| `plan.md` | approved script plus scene promise | yes |
| `timed-scene-packets.md` | SRT-based timing and motion beats | yes |
| `asset-plan.md` | needed captures/images/video/html assets | yes |
| `work-orders/*.md` | actual route execution state | yes |
| `composition/` | implemented video surface | yes |
| `review/video-review/` | rendered-frame evidence | yes |
| `director-review.md` | final viewer/editor verdict | yes |

## Phase 1: Visual Source Routing System

**Files:**
- Create: `VISUAL_SOURCE_ROUTING_SYSTEM.md`
- Modify: `TOOL_ROUTING_PIPELINE.md`
- Modify: `CONTENT_FACTORY_PIPELINE.md`
- Modify: `templates/project/creative-brief.md`
- Modify: `templates/project/draft-scene-packets.md`
- Modify: `templates/project/asset-plan.md`
- Modify: `templates/project/design-context.md`

- [ ] **Step 1: Add visual source decision fields**

Add these fields to the project templates:

```markdown
Primary Visual Source:
Secondary Visual Source:
Capture Role: primary | support | not_required
Capture Mode: full_side | split_half | zoom_optional | highlight_optional | not_required
Imagegen Role: primary | support | not_required
Video-use Role: primary | support | not_required
HTML Motion Role: primary | support | not_required
Why This Route:
Why Not The Other Routes:
```

Expected behavior:
- Every scene must explicitly consider capture, imagegen, video-use, and HTML motion.
- A scene can still choose `not_required`, but it must state why.
- Imagegen can be `primary` for story, metaphor, reenactment, visual essay, intro, transition, thumbnail, or emotional explanation scenes.
- Capture can be `primary` for news, official page, product page, community post, app screen, article, docs, benchmark, UI evidence, or "look at this screen" narration scenes.

- [ ] **Step 2: Lock capture sizing rule**

Add this rule to routing docs and templates:

```markdown
Primary capture must occupy a readable major area:
- desktop/wide layout: one side of the frame, normally 45-55% width.
- vertical layout: top or middle block, normally 40-55% height.
- small source stamp is allowed only as provenance texture, never as the primary visual.
```

Do not require:
- zoom
- highlight
- translated label

Those are optional tools chosen only when they help the narration.

- [ ] **Step 3: Move route choice before script**

Update the pipeline:

```text
topic
-> research/material scouting
-> creative brief
-> draft scene packets
-> visual source routing
-> scene contracts
-> writer room
-> plan approval
-> TTS/SRT
-> timed scene packets
-> route work orders
-> implementation
```

Reason:
The writer must know when the scene is capture-led, image-led, demo-led, interview-led, or motion-led before writing the spoken line.

## Phase 2: Scene Contract Gate

**Files:**
- Create: `SCENE_CONTRACT_SYSTEM.md`
- Create: `templates/project/scene-contracts.md`
- Create: `scripts/validate_scene_contract.mjs`
- Modify: `package.json`
- Modify: `scripts/approve_plan.mjs`
- Modify: `skills/hype-scene-planner/SKILL.md`
- Modify: `skills/hype-motion-designer/SKILL.md`
- Modify: `skills/hype-writer-room/SKILL.md`

- [ ] **Step 1: Add required scene contract template**

Each scene must have:

```markdown
## Scene 03

Narration Clause:
Primary Screen Object:
Viewer Must Understand:
Primary Visual Source:
Allowed Visual Elements:
Forbidden Fillers:
Motion Beats:
Required State Change:
Hold Rule:
Exit Rule:
Implementation Markers:
Evidence Frame Requirement:
Fallback Policy:
If Missing, Do Not:
```

Required rule:

```markdown
If the primary object cannot be built, stop and return to planning.
Do not replace it with cards, decorative paths, glass panels, dots, chips, generic progress bars, or generic Synthesis/CardGrid fallback.
```

- [ ] **Step 2: Add `factory:validate-scene-contract`**

`scripts/validate_scene_contract.mjs` must fail if:
- a scene has no contract
- any required field is empty
- `Primary Visual Source` is missing
- `Motion Beats` are missing
- `Forbidden Fillers` is empty
- `Fallback Policy` does not say to return to planning
- `Capture Role: primary` exists but `Capture Mode` is missing

Command:

```bash
npm run factory:validate-scene-contract -- projects/<project>
```

Expected output:

```text
Scene contract validation: FAIL
- Scene 04 missing Primary Screen Object
- Scene 07 missing Motion Beats
```

- [ ] **Step 3: Block approval on false contracts**

`scripts/approve_plan.mjs` must not allow `approved.plan=true` unless:

```bash
npm run factory:validate-scene-contract -- <project>
npm run factory:validate-visual-routing -- <project>
```

both pass.

Important:
Do not force `approved.plan=true`. The project must actually pass the gates.

## Phase 3: Visual Routing Validator

**Files:**
- Create: `scripts/validate_visual_routing.mjs`
- Modify: `package.json`
- Modify: `scripts/route_work_orders.mjs`
- Modify: `skills/hype-asset-producer/SKILL.md`
- Modify: `skills/hype-visual-director/SKILL.md`

- [ ] **Step 1: Add route consistency checks**

The validator must compare:
- `draft-scene-packets.md`
- `scene-contracts.md`
- `asset-plan.md`
- `work-orders/*.md`

Fail if:
- a scene chooses capture/imagegen/video-use but `asset-plan.md` has no matching row
- `asset-plan.md` marks a route `not_required` while scene contract says it is primary
- `work-orders` are `done` but the implementation contract has no marker/evidence requirement
- `imagegen primary` has no prompt direction
- `capture primary` has no URL/path/source instruction

- [ ] **Step 2: Define route status states**

Use one status vocabulary:

```text
planned
inputs_ready
implemented
qa_passed
blocked
not_required
```

Do not mix booleans and strings in route state.

## Phase 4: Motion Direction Rules

**Files:**
- Modify: `MOTION_GRAPHICS_QUALITY_SYSTEM.md`
- Modify: `motion-primitives/*.md`
- Modify: `skills/hype-motion-designer/SKILL.md`
- Modify: `skills/hype-video-reviewer/SKILL.md`
- Modify: `templates/project/timed-scene-packets.md`

- [ ] **Step 1: Ban generic filler**

Motion designer rules:
- Do not add dots, lines, glass cards, sheens, route paths, or progress bars unless the scene contract names them.
- Do not reveal all elements at once.
- Prefer one active idea at a time: introduce, explain, hold, transition.
- Once a core object appears, keep it visible while narration explains it unless the contract says to replace/collapse it.

- [ ] **Step 2: Tie motion to narration verbs**

Every motion beat must map to a narration verb:

```markdown
Narration Verb: 쪼갭니다
Motion Beat: one task packet splits into three worker lanes

Narration Verb: 비교합니다
Motion Beat: before/after split opens and old structure fades behind

Narration Verb: 확인합니다
Motion Beat: source capture expands to half-frame and cursor/viewport settles
```

- [ ] **Step 3: Keep liquid glass limited**

Allowed:
- focus lens
- selection layer
- state transition
- temporary route packet distortion

Not allowed:
- full-screen vague blur
- every card as glass
- text-heavy glass panels
- shiny overlay with no explanatory role

## Phase 5: Caption System Rule

**Files:**
- Modify: `CONTENT_FACTORY_PIPELINE.md`
- Modify: `skills/hype-audio-producer/SKILL.md`
- Modify: `skills/hype-qa-editor/SKILL.md`
- Modify: `templates/project/timed-scene-packets.md`
- Modify: Hyperframes subtitle implementation only if a progress UI exists.

- [ ] **Step 1: Lock caption source**

Caption source stays:

```text
voiceover.txt
-> ElevenLabs MP3
-> ElevenLabs forced-alignment SRT
-> parsed SRT cue start/end
-> scene-relative captions
-> renderer displays current cue
```

- [ ] **Step 2: Remove caption progress bars**

Rule:

```markdown
Caption UI shows the active caption text only.
Do not add caption progress bars, cue fill bars, or progress rails under captions.
```

- [ ] **Step 3: Add sync QA**

Fail or warn:
- caption consistently appears after narration starts
- cue stays too long after narration ends
- final scenes drift more than early scenes
- caption covers the primary visual object

## Phase 6: Review Gate Based On Rendered Frames

**Files:**
- Modify: `scripts/review_video.mjs`
- Modify: `scripts/qa_project.mjs`
- Modify: `templates/project/review/video-review/director-review.md`
- Modify: `skills/hype-video-reviewer/SKILL.md`

- [ ] **Step 1: Treat review-video as evidence generator**

`factory:review-video` must generate:

```text
review/video-review/<render-name>/
  contact-sheet.jpg
  scene-frames/
  suspicious-frames/
  visual-density-report.json
  caption-sync-report.json
  route-presence-report.json
  video-review.md
```

It must not auto-PASS the video.

- [ ] **Step 2: Director review blocks packaging**

`factory:qa --stage final` must fail if:
- `director-review.md` does not exist
- `Verdict: PASS` is missing
- critical findings are unresolved
- PASS has no evidence frame references

- [ ] **Step 3: Actual-frame checks**

Fail if rendered frames show:
- primary capture too small
- capture used only as unreadable background
- big panel with no active object
- same layout signature across three or more scenes
- scene contract primary object not visible
- forbidden filler visible
- path/line crosses text or caption zone

## Phase 7: Subagent Use In Vertical Slice Production

**Files:**
- Modify: `SUBAGENT_VERTICAL_SLICE_PIPELINE.md` or create if missing.
- Modify: `skills/hype-production-orchestrator/SKILL.md`

- [ ] **Step 1: Do not parallelize planning**

Sequential:

```text
topic-producer
-> research-desk
-> showrunner
-> creative-director
-> scene-planner
-> scene-contracts
-> writer-room
-> user approval
-> TTS/SRT
```

- [ ] **Step 2: Parallelize only after contracts**

After `scene-contracts.md`, `timed-scene-packets.md`, `asset-plan.md`, and `design-context.md` exist:

```text
subagent A: scenes 01-03
subagent B: scenes 04-06
subagent C: scenes 07-09
subagent D: scenes 10-12
```

Each subagent owns a vertical slice:
- assets for its scenes
- Hyperframes scene implementation
- local scene snapshots
- route status updates for its scenes

Do not split by renderer. Split by scene group so each scene keeps one interpretation.

- [ ] **Step 3: Main agent integrates**

Main agent owns:
- shared primitives
- global CSS
- caption layer
- final assembly
- review-video
- director-review
- final package
- GitHub push

## Phase 8: Apply To Next Topic Video

**Files:**
- Create a new `projects/<next-id>-<slug>/`
- Fill project docs from the new templates.
- Render with Hyperframes first.

- [ ] **Step 1: Intake and research**

For live/current topics, browse first and use exact dates.

Output:
- `research-pack.md`
- `creative-brief.md`

- [ ] **Step 2: Decide visual route before script**

For each scene, choose:
- capture primary/support/not_required
- imagegen primary/support/not_required
- video-use primary/support/not_required
- HTML motion primary/support/not_required

If the topic is news/product/community/tool:
- prefer large capture when it helps the viewer understand the subject.

If the topic is abstract/story/emotion/metaphor:
- imagegen may be primary.

If the topic is process/mechanism/architecture:
- HTML motion is usually primary.

- [ ] **Step 3: Write script from scene direction**

Writer room must reference the chosen visual when needed:

```text
지금 보이는 결제 화면에서 중요한 건 가격 자체보다 조건입니다.
여기서 확인할 건 세 가지입니다.
```

Do not write a generic script and then decorate it afterward.

- [ ] **Step 4: Approve only after validators pass**

Run:

```bash
npm run factory:validate-scene-contract -- projects/<project>
npm run factory:validate-visual-routing -- projects/<project>
npm run factory:approve-plan -- projects/<project>
```

Expected:
- no forced approval
- failed contracts return to planning

- [ ] **Step 5: Produce and review**

Run:

```bash
npm run factory:tts -- projects/<project>
npm run factory:mix -- projects/<project>
npm run factory:timing -- projects/<project>
npm run factory:route -- projects/<project>
npm run factory:qa -- projects/<project> -- --stage pre-render
npm run factory:render -- projects/<project> -- --renderer hyperframes
npm run factory:review-video -- projects/<project> -- --render final-hyperframes.mp4
npm run factory:qa -- projects/<project> -- --stage final
npm run factory:package -- projects/<project>
```

Final package must copy the selected final video to Downloads.

## Phase 9: Failure Learning Loop

**Files:**
- Modify: `MOTION_GRAPHICS_QUALITY_SYSTEM.md`
- Modify: `skills/hype-qa-editor/SKILL.md`
- Modify: `skills/hype-production-orchestrator/SKILL.md`

- [ ] **Step 1: Log repeated failures**

When QA passes but the user finds a real video problem:

```text
Fail / Mistake Detected
-> stop claiming PASS
-> write review/video-review/issue-log.md
-> identify root cause
-> fix
-> verify with commands and frame evidence
-> if recurrence risk exists, run ce-compound after the fix is verified
```

- [ ] **Step 2: Add compound trigger rule**

Run `ce-compound` only after:
- the mistake is fixed
- the fix is verified
- the mistake is likely to recur
- the prevention rule helps future agents

Do not run it for simple typos, one-off edits, or unresolved problems.

## Verification Checklist

Run before producing the next final video:

```bash
find skills -maxdepth 2 -name SKILL.md
node --check scripts/*.mjs scripts/lib/*.mjs
npm run factory:validate-templates
npm run factory:doctor
npm run factory:validate-scene-contract -- projects/<project>
npm run factory:validate-visual-routing -- projects/<project>
npm run factory:qa -- projects/<project> -- --stage pre-render
npm run factory:render -- projects/<project> -- --renderer hyperframes
npm run factory:review-video -- projects/<project> -- --render final-hyperframes.mp4
npm run factory:qa -- projects/<project> -- --stage final
npm run factory:package -- projects/<project>
```

YAML/frontmatter check:

```bash
ruby -e 'require "yaml"; Dir["skills/*/SKILL.md"].each { |f| s=File.read(f); y=s[/\A---\n(.*?)\n---/m,1]; YAML.safe_load(y || "", permitted_classes: [], aliases: false); puts "OK #{f}" }'
```

## Done Definition

This plan is complete only when:

- visual routing fields exist in templates
- `scene-contracts.md` exists and validates
- plan approval cannot be forced past invalid scene contracts
- capture primary scenes require large readable placement
- caption progress bars are banned
- review-video uses rendered-frame evidence
- director review blocks final package
- the next topic video is produced through the new gates
- final video is copied to Downloads
- GitHub push is complete

