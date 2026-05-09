---
name: hyperframes-motion-design-guide
description: Use in the hype_tuber workspace when creating, revising, polishing, or reviewing HTML/CSS/JS/GSAP/Hyperframes motion graphics, kinetic typography, animated explainers, infographics, YouTube scenes, or visual systems. Applies context-driven design, material notes, motion timing, caption safe zones, snapshot review, and final render verification.
---

# Hyperframes Motion Design Guide

You are not only writing HTML/CSS/JS. You are designing a finished motion artifact using HTML/CSS/JS as the production tool.

The goal is not "the screen runs." The goal is "this can be shown to viewers without apology."

Use this skill for Hyperframes compositions, YouTube explainers, kinetic typography, animated diagrams, infographics, product concept videos, visual slide sequences, and motion-design polish passes.

## 1. Confirm Material Context First

Do not rely on memory for anything likely to change:

- Product or brand existence
- Current name, version, launch date, pricing, specs, repository status
- Logo, UI, product screenshots, brand color, font source
- Official claims, numbers, benchmark results, or public roadmap

For the current MVP, this is material-development context, not a rights, privacy, quote-accuracy, citation-completeness, or copyright gate.

Before design work, create or update `research-pack.md`, `asset-plan.md`, or `design-context.md` in the project root. `source-notes.md` is optional compatibility context only.

Useful material notes include:

- Topic and collection date
- Useful links
- Source files saved under `source/`
- Claims or visual materials used in script or visuals
- Claims or materials deliberately not used
- Uncertainty and freshness notes, when useful

For open-source or public products, prefer official README, docs, release notes, website, package registry, and verified screenshots. Use secondary sources only when the official source is missing and label them as secondary.

## 2. Start From Design Context

Do not make a generic pretty video from an empty canvas.

Before animation, create or update `design-context.md` in the project root.

Include:

- Project name
- Collection date
- Output purpose
- Format: `1920x1080`, `1080x1920`, or other
- Target viewer and viewing situation
- Official source links
- Logo path, if used
- Product image or UI screenshot paths, if used
- Existing references
- Color tokens
- Font choices
- Visual mood
- Motion personality
- Caption safe zone
- Forbidden styles
- Unknowns

Asset priority:

1. Logo
2. Product image or official render
3. Actual UI screenshot
4. Brand colors
5. Fonts
6. Tone keywords
7. Motion, photo, and copy style

Rules:

- Do not use source-less assets as the core visual.
- If a brand logo matters, do not omit it without saying why.
- If the video explains a product, do not replace the product entirely with abstract shapes.
- Do not infer brand identity from color alone.

## 3. Resolve Ambiguous Requests Before Building

If the request is vague, propose three visual directions before implementation.

Vague examples:

- "예쁘게"
- "고급스럽게"
- "요즘 느낌"
- "SaaS 느낌"
- "알아서"
- "디자인 하나"

Each direction must include:

- Name
- Core impression
- Best use case
- Layout principle
- Color direction
- Typography direction
- Image or graphic style
- Motion style
- Strength
- Risk
- Recommendation

If the user already gave a locked reference, script, or style direction, do not re-open direction choice. Convert that direction into a concrete scene and motion plan.

## 4. Treat Output Type As The Design Brief

HTML does not mean "website."

- App prototype: flow, state, clickability, empty/error/loading states
- Landing page: first viewport shows product, brand, or offer immediately
- Slide sequence: each scene supports narration rhythm and transition
- Animation: time axis, cuts, velocity, hold frames, and eye movement
- Infographic: data accuracy, reading order, scale, and emphasis
- Review: evaluate purpose fit, hierarchy, legibility, detail, and usability

For YouTube motion explainers, the primary unit is the scene, not the page section.

## 5. Build A Scene Contract

Before composing, `plan.md` must contain a scene table.

Each scene needs:

- Time range
- Narration lines
- Content pattern role
- On-screen phrase
- Layout
- Primary motion
- Secondary motion
- Caption behavior
- Assets
- Verification timestamp

Use ElevenLabs SRT as the timing source when available. A visual reveal should land on or slightly before the spoken payoff word.

## 6. Add An Evidence Asset Pass

For YouTube explainers, do not rely only on abstract motion graphics. Add real visual material where it improves trust or comprehension.

Before building the composition, create or update `asset-plan.md`.

Classify each narration beat. Use `CONTENT_FACTORY_PIPELINE.md` as the master workflow; the list below describes asset roles, not a fixed edit order.

- `claim`: needs an official source, article, README, docs, or release note screenshot.
- `proof`: needs a browser screenshot, platform post, chart, issue, commit, or product UI.
- `quote`: needs a short interview/talk clip or quote screenshot.
- `context`: needs timeline, archive, map, source montage, or explainer card.
- `metaphor`: can use B-roll, warning imagery, archive imagery, environment footage, or generated/owned visuals.
- `diagram`: should be HTML/SVG/GSAP motion, not random stock.
- `demo`: should use screen recording, UI walkthrough, CLI capture, or product behavior.
- `data`: should use a sourced chart, table, counter, or rebuilt HTML/SVG graphic.
- `transition`: can use typography, logo, simple icon, or atmospheric cut.

Asset folders:

- `assets/evidence/`
- `assets/screenshots/`
- `assets/broll/`
- `assets/interviews/`
- `assets/demos/`
- `assets/data/`
- `assets/processed/`

Rules:

- Record useful material links in `research-pack.md`, `asset-plan.md`, or optional `source-notes.md`.
- Prefer official/public primary sources.
- Keep third-party clips short and only use them for commentary or explanation.
- Do not use unsourced screenshots as factual evidence.
- Normalize assets before Hyperframes: crop, highlight, subtitle, and safe-zone check.
- If a spoken interview clip is used, trim it and add subtitles before composition.
- For public interviews, talks, podcasts, or quote clips, also follow `INTERVIEW_ASSET_PIPELINE.md` in the workspace root.

Useful rhythms are chosen by topic. Examples:

```text
claim -> proof screenshot -> metaphor B-roll -> explanation graphic -> quote/interview -> consequence visual
problem -> cause -> fix -> demo -> result
myth -> correction -> proof -> takeaway
timeline -> turning point -> current state -> implication
```

## 7. Motion Design Rules For Hyperframes

Motion exists to improve comprehension.

Core rules:

- Reveal one new idea at a time.
- Avoid parallel reveals of unrelated elements.
- Prefer `transform`, `opacity`, and carefully limited `filter`.
- Do not animate layout properties such as `top`, `left`, `width`, `height`, or `margin` during playback.
- Use ease-out quart, quint, expo, or GSAP `power3.out` / `power4.out`.
- Avoid bounce and elastic unless the brand is intentionally playful.
- Give complex diagrams a short hold after the final state.
- Make the final frame of a scene readable for at least 0.7s unless it is only a transition beat.
- Use motion verbs that match meaning: compress, split, compare, lock, reject, pass, loop, count, reveal.
- Do not make decoration move more loudly than the information.

Caption safety:

- Captions are sacred. Do not move or resize captions unless the user asks.
- Reserve the bottom caption zone before placing visual content.
- For 1920x1080 with bottom captions, keep important scene content above roughly `y=820`.
- Cards, meters, diagrams, and final text must not sit behind the caption box.
- Always snapshot the densest frame in each scene with captions visible.

## 8. Avoid Common AI Design Patterns

Avoid by default:

- Meaningless purple/blue gradients
- Decorative glow with no information role
- Glassmorphism as a default style
- Repeated rounded cards as the whole design
- Emojis used as generic icons
- Abstract SVG blobs unrelated to the subject
- Hero sections with more decoration than message
- Every topic becoming a SaaS dashboard
- Product-free mockups when the product should be visible
- Nested cards
- Gradient text

Prefer:

- Real content and real sources
- Strong information hierarchy
- Readable typography
- Density that matches the subject
- Stable safe zones
- Consistent color tokens
- Purposeful images or diagrams
- Motion that explains the idea

## 9. HTML/CSS/SVG Implementation Standards

For Hyperframes:

- Keep `index.html` deterministic.
- Register GSAP timelines on `window.__timelines`.
- Every timed visible element needs `class="clip"`, `data-start`, `data-duration`, and `data-track-index`.
- Use sub-compositions when a file becomes hard to inspect.
- Use CSS variables for colors, spacing, and recurring sizes.
- Use stable dimensions for cards, grids, diagrams, counters, and caption boxes.
- Avoid viewport-scaled text. Choose explicit sizes per format.
- Avoid text overflow by constraining width and line-height.
- Use SVG for diagrams when it clarifies structure.
- Use image assets for actual products, people, places, UI, or brand references.

Composition file warnings are allowed only when the render is still easy to inspect and the project is a one-off. For repeat templates, split scenes and captions into sub-compositions.

## 10. Verification Gate

Do not call work complete until it is checked.

Minimum checks:

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <key-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration,size:stream=index,codec_type,codec_name,width,height,avg_frame_rate,sample_rate,channels -of json ../renders/final.mp4
```

Visual checks:

- First scene clearly communicates what the video is about.
- Most important message appears before supporting decoration.
- Text is readable at playback size.
- No important element overlaps captions.
- No text is clipped or hidden.
- Motion start, midpoint, and final state are coherent.
- Assets load from local paths.
- Console or render logs do not show blocking errors.
- Audio exists when expected.

For final video:

- Verify duration.
- Verify resolution and frame rate.
- Verify audio codec and channels.
- Run volume check when audio was mixed.
- Copy to `Downloads` only when requested.

## 11. Final Report

Keep the final report short.

Include:

- Created or changed files
- Design direction
- Asset/source basis
- Verification run
- Remaining uncertainty or warning

Do not claim anything was verified unless the command or visual check actually happened.
