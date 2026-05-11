# Universal YouTube Content Factory

This is the master production plan for `hype_tuber`.

The factory is not a fixed video template. It is a repeatable system for turning any topic into a researched, narrated, motion-designed YouTube video.

## Core Principle

References are pattern libraries, not scripts to copy.

A reference sequence such as:

```text
original claim -> challenge -> b-roll -> rebuttal interview -> highlighted quote
```

is one useful recipe for a rebuttal-style video. It must not become the default structure for every topic.

The factory chooses the structure after research, based on what the content needs.

## Standard Flow

```text
topic
-> topic classification
-> research-pack.md
-> creative-brief.md
-> draft-scene-packets.md
-> visual source routing
-> scene-contracts.md
-> script + scene contract in plan.md
-> user approval
-> ElevenLabs TTS + SRT
-> timed-scene-packets.md
-> scene-contracts.md
-> factory:validate-scene-contract
-> factory:validate-visual-routing
-> scene tool routing
-> asset-plan.md / design-context.md updates
-> asset / visual / motion / audio work by scene
-> Hyperframes assembly
-> snapshot / pre-render QA
-> render
-> rendered-frame video review
-> final QA
-> packaging
```

## Required Project Artifacts

Every project should keep:

- `research-pack.md`: material leads, links, interview candidates, image candidates, scene sparks
- `creative-brief.md`: angle, length, tone, structure, creative direction
- `draft-scene-packets.md`: pre-script scene purpose, role, material direction, visual intent
- `plan.md`: script, scene table, selected content pattern, motion plan
- `timed-scene-packets.md`: post-TTS/SRT scene timing, caption behavior, motion beats, production instructions
- `scene-contracts.md`: per-scene implementation contract; defines primary screen object, allowed elements, forbidden fillers, motion beats, markers, and evidence frame
- `TOOL_ROUTING_PIPELINE.md`: workspace-level rulebook for when scenes use Hyperframes, `video-use`, imagegen, capture, or scripts
- `status.md`: production checklist and current gate
- `source-notes.md`: optional compatibility notes for older source-focused projects; not an MVP gate
- `design-context.md`: visual system, format, references, caption safe zone
- `asset-plan.md`: scene-by-scene asset decisions and processing state
- `assets/`: evidence, screenshots, b-roll, interviews, processed media
- `composition/`: Hyperframes implementation
- `renders/`: final outputs and snapshots

Recommended folder layout:

```text
projects/{NNN-slug}/
|-- research-pack.md
|-- creative-brief.md
|-- draft-scene-packets.md
|-- plan.md
|-- timed-scene-packets.md
|-- scene-contracts.md
|-- status.md
|-- source-notes.md
|-- design-context.md
|-- asset-plan.md
|-- source/
|-- assets/
|   |-- evidence/
|   |-- screenshots/
|   |-- broll/
|   |-- interviews/
|   |   |-- originals/
|   |   `-- processed/
|   |-- demos/
|   |-- data/
|   `-- processed/
|-- voiceover/
|-- composition/
`-- renders/
```

## Factory Gates

| Gate | Output | Pass Condition |
|---|---|---|
| 1. Topic Intake | short brief | Topic, target viewer, output format, tone are clear enough to research. |
| 2. Material Research | `research-pack.md` | Angle leads, links, interview/image candidates, and scene sparks are useful enough for creative decisions. |
| 3. Creative Brief | `creative-brief.md` | One angle, length band, structure, and tone are selected. |
| 4. Draft Scene Packets | `draft-scene-packets.md` | Scene purpose and material direction exist before script writing. |
| 4b. Visual Source Routing | `draft-scene-packets.md` + `scene-contracts.md` | Every scene has capture/imagegen/video-use/HTML roles before the writer writes the line. |
| 5. Script Contract | `plan.md` draft | One idea per line and scene table are ready for user approval. Capture-led lines explain what the viewer is seeing. |
| 6. User Approval | approved plan | Script and scene contract are accepted. |
| 7. TTS Sync | MP3 + SRT | `voiceover_elevenlabs_sam.txt` is sent to ElevenLabs, ElevenLabs forced alignment creates the timing SRT, and `assets/audio/voiceover-display.srt` reuses only those times while showing `voiceover.txt` text. Display/spoken line counts must match. |
| 8. Timed Scene Packets | `timed-scene-packets.md` | Exact scene timing, text-only caption behavior, motion beats, and asset timing are mapped to ElevenLabs SRT. |
| 8b. Scene Contracts | `scene-contracts.md` + `factory:validate-scene-contract` + `factory:validate-visual-routing` | Every scene has primary screen object, primary visual source, capture/imagegen/video-use/HTML roles, allowed elements, forbidden fillers, motion beats, required state change, implementation markers, and evidence frame before implementation. |
| 9. Tool Routing + Production | routed assets + composition | Every scene has a primary route before asset, visual, motion, and audio work starts. Complex scenes use one-at-a-time progressive disclosure instead of showing every element at once. |
| 10. Pre-render Verification | snapshots | Captions do not collide, dense frames are readable, and route work is complete before render. |
| 11. Video Review | `review/video-review/video-review.md` + `director-review.md` | Rendered frames and contact sheet are generated, then the editor/director explicitly approves scene intent, motion purpose, rhythm, captions, assets, and empty-feel. |
| 11b. Renderer Comparison, if used | `hyperframes-review.md`, `remotion-review.md`, `renderer-comparison.md` | Both renderer candidates use the same scene contract. The selected renderer is copied to `renders/final.mp4`; blocked renderers are recorded, not hidden. |
| 12. Final QA | MP4 probe | Final render has valid audio/video streams and duration after machine video review and director review both pass. |
| 13. Packaging | title/thumbnail/description direction | Upload package direction matches the approved video. |

## Post-Failure Learning

When a quality or gate failure recurs, log it in `review/video-review/issue-log.md` while fixing it. After the fix is verified, run `/ce-compound` only if the prevention rule should help future projects.

## Asset Roles

Classify every scene by what the viewer needs at that moment.

| Role | Use When | Typical Assets |
|---|---|---|
| `claim` | The narration states a thesis or key idea. | docs, README, article screenshot, quote card |
| `proof` | The viewer needs a concrete visual reason to believe or understand. | UI screenshot, issue, post, chart, public record |
| `quote` | A person or source must speak. | interview clip, talk clip, podcast, quote card |
| `context` | The viewer needs background. | timeline, archive image, map, simple explainer card |
| `metaphor` | The idea is abstract or emotional. | b-roll, generated/owned visual, symbolic footage |
| `diagram` | A mechanism must be understood. | HTML/SVG/GSAP diagram |
| `demo` | A workflow or product behavior matters. | screen recording, UI walkthrough |
| `data` | A number or trend carries the point. | chart, counter, table, animated metric |
| `transition` | The scene needs a rhythm bridge. | typography, logo, wipe, short motion beat |

## Tool Routing

Use `TOOL_ROUTING_PIPELINE.md` before production work starts.

Every scene should pick a primary route:

| Route | Use When |
|---|---|
| `hyperframes` | The scene is kinetic type, HTML/SVG diagram, UI motion, or final composition work. |
| `video-use` | A raw/reference/interview/demo video file needs analysis, transcript, trimming, subtitle, crop, or clip export. |
| `imagegen` | The scene needs generated metaphor, style frame, background, or non-factual illustration. |
| `capture` | The scene needs web, docs, GitHub, product UI, or screenshot evidence. |
| `script/ffmpeg` | The scene needs simple conversion, probing, extraction, audio mix, or normalization. |
| `manual` | The user already supplied a ready asset. |

`video-use` prepares source footage. Hyperframes remains the default place where final captions, diagrams, TTS timing, and the complete render are assembled.

## State Ownership

`project.json` is the canonical state file. Parallel scene, asset, capture, imagegen, audio, or renderer work may write owned artifacts and manifests, but must not save competing `project.json` snapshots. The orchestrator/main process merges artifact and route status back into `project.json` sequentially after parallel work finishes.

## Pattern Library

Pick one primary pattern per video and optionally mix secondary patterns per scene.

### 1. Claim -> Proof -> Explanation

Use for technical/product explainers.

```text
hook claim -> official screenshot -> highlight -> animated diagram -> takeaway
```

### 2. Problem -> Cause -> Fix

Use for tutorials, workflow tools, productivity, developer pain.

```text
pain scene -> failed attempt -> root cause diagram -> product/workflow fix -> result
```

### 3. Myth -> Correction

Use when the audience likely believes a wrong or incomplete idea.

```text
common belief -> evidence against it -> better framing -> practical takeaway
```

### 4. Original Claim -> Counter-Evidence

Use for rebuttal or commentary.

```text
source claim -> why it matters -> counter source -> interpretation -> final judgment
```

The Dalbi interview pattern belongs here, but it is only one variant.

### 5. Timeline / Evolution

Use for technology history, product launches, market changes.

```text
before -> trigger event -> turning point -> current state -> what changed
```

### 6. Case Study

Use for specific companies, products, repos, failures, wins.

```text
case intro -> evidence stack -> decision point -> consequence -> lesson
```

### 7. Comparison / Versus

Use when the point is clearer through contrast.

```text
A state -> B state -> side-by-side difference -> deciding criterion
```

### 8. Demo Walkthrough

Use when the product behavior is the proof.

```text
task -> screen recording -> key action highlight -> result -> why it matters
```

### 9. Data Story

Use when a number, metric, or trend drives the video.

```text
surprising number -> source -> animated chart -> human meaning -> implication
```

## Choosing The Right Pattern

| Topic Type | Default Pattern | Asset Bias |
|---|---|---|
| open-source repo | Claim -> Proof -> Explanation | README, docs, CLI screenshots, diagrams |
| AI tool/product | Problem -> Cause -> Fix | UI screenshots, workflow diagrams, demos |
| controversy/commentary | Original Claim -> Counter-Evidence | clips, articles, posts, quote cards |
| market/news | Timeline / Data Story | articles, charts, public statements |
| tutorial | Demo Walkthrough | screen recordings, UI highlights |
| concept explainer | Myth -> Correction or Diagram-first | diagrams, analogies, minimal b-roll |
| company/person story | Case Study | interviews, archive, press, timeline |

## Production Modes

Choose the mode based on the topic and timeline.

| Mode | Use When | Minimum Asset Bar |
|---|---|---|
| `motion-only` | concept is abstract and no external proof is needed | researched script + diagrams |
| `evidence-led` | trust or comprehension depends on documents or screenshots | useful screenshots + highlights |
| `demo-led` | product behavior is the point | screen recording + step highlights |
| `quote-led` | a person/public statement carries the narrative | quote/interview candidate + subtitles |
| `documentary-led` | story depends on many outside materials | material stack + b-roll + interviews |

## Material And Asset Acquisition Rules

Use this priority order:

1. Official material: README, docs, product page, release notes, official talks
2. Primary public material: GitHub issues, commits, posts by involved people
3. Useful secondary material: news, analysis, transcript
4. User-provided material
5. Owned/generated supporting visuals
6. Third-party b-roll or image candidates

Put useful links and candidates in `research-pack.md` or `asset-plan.md`. `source-notes.md` is optional compatibility context, not a required MVP gate.

## Processing Rules

Screenshots:

- crop to the meaningful region
- hide irrelevant UI
- highlight the exact sentence, number, or UI area
- keep text readable at final resolution

Interviews / talks:

- use as one asset type, not the default proof
- trim to the useful quote
- keep speaker/source context visible when it helps trust
- subtitle or translate before composition
- use project accent color for the one quote that must stick

B-roll:

- use for context, emotion, or consequence
- do not let it replace evidence
- keep it short unless the visual itself is the story

Diagrams:

- build in HTML/SVG/GSAP
- reveal one idea at a time
- sync payoff to the ElevenLabs SRT

## Scene Contract

Each scene starts with a draft contract in `plan.md`, then becomes an implementation contract in `scene-contracts.md`.

- What is the viewer supposed to understand now?
- Which pattern role does this scene serve?
- Which asset proves or clarifies the point?
- What should move, and why?
- Where is the caption safe zone?
- Which frame will be snapshotted for verification?
- Which visual elements are allowed?
- Which filler elements are forbidden?
- Which implementation markers must exist?

If those answers are missing, do not fill the scene with generic cards, fades, dots, connector lines, glass panels, or generic fallback components.

## Verification Checklist

- [ ] The video structure was chosen for the topic, not copied from a reference.
- [ ] `research-pack.md` supports the chosen angle and scene ideas.
- [ ] `draft-scene-packets.md` existed before the approval script.
- [ ] `timed-scene-packets.md` was created from ElevenLabs SRT.
- [ ] `scene-contracts.md` was created and `factory:validate-scene-contract` passed.
- [ ] No interview or b-roll is used as decoration only.
- [ ] The final bottom caption does not collide with source subtitles.
- [ ] Screenshots are readable.
- [ ] Motion supports comprehension.
- [ ] Dense frames were snapshotted and reviewed.
- [ ] Final MP4 has valid video/audio streams.

## Automation Roadmap

Manual quality comes first. Automate only after the manual version works.

Useful future helpers:

- `scripts/capture_material_url.mjs`: browser screenshot with URL/material logging
- `scripts/make_contact_sheet.mjs`: frame extraction and contact sheet generation
- `scripts/trim_quote_clip.mjs`: trim public video clips into scene-ready segments
- `scripts/burn_interview_subtitles.mjs`: add Korean subtitles to interview clips
- `scripts/snapshot_scene_times.mjs`: snapshot dense frames from the scene table
