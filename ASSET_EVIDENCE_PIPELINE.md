# Evidence Asset Production Pipeline

This is the asset line inside the broader `CONTENT_FACTORY_PIPELINE.md`.

Use this for narration-led motion videos that also need real screenshots, source images, B-roll, interviews, talks, quote cards, data, UI recordings, or public documents.

Reference videos are used to learn patterns. They do not define a fixed sequence.

MVP note: this pipeline is for material and asset production, not rights, privacy, citation, quote-accuracy, or missing-source review. Put useful candidates in `research-pack.md` and working asset choices in `asset-plan.md`. `source-notes.md` is optional compatibility context, not a required MVP gate.

## Goal

Upgrade the Hyperframes workflow from pure motion graphics to evidence-driven explainers:

```text
topic -> research-pack -> creative brief -> draft scene packets -> script -> timed scene packets -> asset plan -> capture/download -> processing -> Hyperframes render
```

## Stage 1: Reference And Topic Intake

Inputs:

- User topic
- Reference video, if provided
- Required tone and format

Outputs:

- `research-pack.md`
- `design-context.md`
- `asset-plan.md`

Checks:

- Topic source is real and current.
- The visual direction is not generic.
- Each scene has a visual asset intent.

## Stage 2: Script-To-Asset Classification

After the script draft, tag each narration beat. A scene can have one primary role and one secondary role.

| Tag | Meaning | Best Visual |
|---|---|---|
| `claim` | factual statement | official docs, README, release note, article screenshot |
| `proof` | evidence or public reaction | platform post, GitHub issue, browser screenshot |
| `quote` | someone said it | interview clip, talk clip, quote screenshot |
| `context` | background or setup | timeline, archive, map, source montage |
| `metaphor` | emotional or tension framing | B-roll, warning sign, archive, environment image |
| `diagram` | abstract process | HTML/SVG/GSAP animation |
| `demo` | product/workflow behavior | screen recording, UI walkthrough |
| `data` | number or trend | chart, counter, table, animated metric |
| `transition` | scene bridge | typography, logo, quick cut |

The output is a filled `asset-plan.md`.

Do not force every video into the same order. Choose the asset order from the content pattern in `CONTENT_FACTORY_PIPELINE.md`.

## Stage 3: Asset Acquisition

Preferred order:

1. Official product/docs/README screenshots
2. Official blog, release note, changelog, or press page
3. Public social post or issue screenshot
4. Interview/talk/podcast clip provided by user or public URL
5. Screen recordings or demos
6. Owned/generated metaphor visuals
7. Third-party B-roll or image candidates

Suggested folders:

```text
assets/
|-- evidence/
|-- screenshots/
|-- broll/
|-- interviews/
|-- demos/
|-- data/
`-- processed/
```

Useful links and candidates go into `research-pack.md` or `asset-plan.md`.

## Stage 4: Processing

For screenshots:

- crop to the meaningful area
- blur or darken irrelevant UI
- add highlight rectangles or underline
- export 1920x1080-safe image

For interview clips:

- trim to only the relevant sentence
- normalize size and volume
- add subtitles or burned lower caption
- keep source link and usage note
- keep the speaker, stage, event backdrop, or player UI identifiable when that context increases trust
- use the project accent color only for the one quote the viewer should remember
- if the global bottom caption is active, place interview subtitles above the caption safe zone

For the detailed interview workflow, use `INTERVIEW_ASSET_PIPELINE.md`.

For demos:

- crop to the action
- highlight clicks, fields, file names, or CLI commands
- remove private/local information
- keep each action readable before moving on

For data:

- capture the source table/chart when possible
- rebuild the chart in HTML/SVG when readability matters
- label the time period and source

For B-roll:

- trim to the emotional beat
- color match if needed
- add slow zoom or pan only if it helps the narration

For diagrams:

- build in HTML/SVG/GSAP
- reveal one idea at a time
- sync payoff to SRT word timing

## Stage 5: Hyperframes Composition

Composition rules:

- Captions remain the stable spine.
- Evidence screenshots should use subtle pan/zoom, crop, highlight, or scroll.
- B-roll should be simple and short.
- Interviews and talks should be treated as source evidence, not decoration.
- Demos should show the exact action or result the narration mentions.
- Diagram scenes should carry the explanation.
- Do not let source visuals fight the subtitles.
- Snapshot the densest frame of every scene.

## Stage 6: Verification

Run:

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration,size:stream=index,codec_type,codec_name,width,height,avg_frame_rate,sample_rate,channels -of json ../renders/final.mp4
```

Manual checks:

- Can a viewer tell what the video is about in the first 2 seconds?
- Does each screenshot appear long enough to understand?
- Are interview clips subtitled?
- Are demos free of private/local secrets?
- Are data visuals labeled with source and period?
- Are captions never covered?

## Implementation Priority

1. Use `CONTENT_FACTORY_PIPELINE.md` as the master workflow.
2. Add `asset-plan.md` to every project.
3. Build a repeatable screenshot/download folder convention.
4. Add a simple asset checklist to `status.md`.
5. For each new topic, manually do the asset pass once before automating.
6. After repeated successful passes, automate helpers for screenshots, clipping, normalization, and source logging.
