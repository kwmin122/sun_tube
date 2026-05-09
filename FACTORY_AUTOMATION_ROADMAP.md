# Hype Tuber Factory Automation Roadmap

이 문서는 `hype_tuber`를 "제작 규칙집"에서 "검수 가능한 자동 제작 공장"으로 확장하기 위한 구현 계획입니다.

다른 세션에서 구현할 때는 이 파일을 먼저 읽고, 1차부터 순서대로 진행합니다.

## Current Goal

최종 목표는 사용자가 주제만 넣으면 다음 흐름이 단계적으로 진행되는 것입니다.

```text
topic
-> new project
-> research / creative / scenes / script
-> user approval
-> ElevenLabs TTS/SRT
-> audio mix
-> timed scene packets
-> route work orders
-> video-use / imagegen / capture / Hyperframes work
-> QA
-> render
-> rendered-frame video review
-> final QA
-> packaging
-> GitHub template / npm distribution
```

중요한 점:

- 이것은 처음부터 무검수 풀오토 렌더러가 아니다.
- 1차 목표는 "주제만 넣으면 공장이 시작되고 다음 역할 프롬프트가 나온다"이다.
- 2차 이후부터 TTS, route work orders, 외부 도구 실행, 렌더, 배포 자동화를 붙인다.
- `project.json`이 canonical state이고, `status.md`는 사람이 보는 체크리스트다.
- `factory:next`는 실행기가 아니라 게이트 판정과 프롬프트 생성기다.
- `youtube-scene-director`는 이 workspace에서 사용하지 않는다.

## Must Read Before Implementation

```text
AGENTS.md
README.md
PRODUCTION_ROLES.md
CREATIVE_DEVELOPMENT_PIPELINE.md
CONTENT_FACTORY_PIPELINE.md
TOOL_ROUTING_PIPELINE.md
FACTORY_AUTOMATION_ROADMAP.md
```

For coding and script work, apply the global `karpathy-guidelines` skill:

```text
~/.codex/skills/karpathy-guidelines/SKILL.md
```

## Cross-Runtime Distribution Model

This repo should work as a GitHub template or cloneable project that humans open with their own AI coding tools.

Expected runtime surfaces:

| Runtime | Repo Instruction Surface |
|---|---|
| Codex | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| Human | `README.md`, `BOOTSTRAP.md` |
| Scripts | `package.json`, `scripts/*.mjs`, `schemas/project.schema.json` |

Do not assume Codex global skills, Claude global skills, `video-use`, browser tooling, or image generation are installed on every user's machine. `doctor` must report these as required, production-required, or optional/late dependencies.

## Canonical Project State

Add this file:

```text
templates/project/project.json
```

Every new project copies and fills it.

Recommended shape:

```json
{
  "schemaVersion": 1,
  "id": "003",
  "slug": "test-topic",
  "title": "테스트 주제",
  "status": "idea",
  "currentGate": "topic_intake",
  "createdAt": "",
  "updatedAt": "",
  "approved": {
    "creativeBrief": false,
    "plan": false,
    "tts": false,
    "timedScenePackets": false,
    "render": false
  },
  "artifacts": {
    "researchPack": false,
    "creativeBrief": false,
    "draftScenePackets": false,
    "plan": false,
    "tts": false,
    "audioMix": false,
    "timedScenePackets": false,
    "assetPlan": false,
    "designContext": false,
    "composition": false,
    "render": false
  },
  "routes": {
    "workOrders": "not_required",
    "videoUse": "not_required",
    "imagegen": "not_required",
    "capture": "not_required",
    "hyperframes": "planned"
  }
}
```

Valid route state values:

Every `routes.*` value must use this string enum. Do not mix booleans and strings in route state. If a route-like concept needs a boolean, put it under `artifacts` instead.

```text
not_required
required
planned
in_progress
done
blocked
```

Valid top-level project status values:

`status` is the coarse, human-readable production state. It is useful for dashboards and `PROJECTS.md`, but scripts should not use it as the exact gate.

```text
idea
research
creative
script
review
tts
timing
assets
motion
pre_render_qa
render
video_review
final_qa
package
done
blocked
```

Valid `currentGate` values:

`currentGate` is the exact state-machine gate used by scripts such as `status.mjs`, `next.mjs`, TTS, QA, and render automation.

```text
topic_intake
research
creative
draft_scenes
script
review
tts
timing
assets
motion
pre_render_qa
render
video_review
final_qa
package
done
blocked
```

`schemas/project.schema.json` must define `status` and `currentGate` as separate enums. Do not reuse one enum for both.

## Artifact Completion Semantics

`artifacts.*` booleans mean "production artifact completed", not "file exists".

This matters because `templates/project` already contains placeholder markdown files. After `factory:new`, files such as `research-pack.md`, `plan.md`, and `asset-plan.md` may exist while the matching artifact state is still `false`.

Example:

```text
File state: research-pack.md exists
Artifact state: project.json.artifacts.researchPack === false
Meaning: the placeholder file exists, but material research is not complete
```

`status.mjs` must report file existence and artifact completion separately.

## Phase 1: Factory Control Panel

1차는 반드시 여기까지 구현하고 검증합니다.

### Files To Add Or Update

```text
package.json
.gitignore
BOOTSTRAP.md
CLAUDE.md
.env.example
schemas/project.schema.json
templates/project/project.json
scripts/doctor.mjs
scripts/validate_templates.mjs
scripts/new_project.mjs
scripts/status.mjs
scripts/next.mjs
```

### Package Scripts

```json
{
  "scripts": {
    "factory:doctor": "node scripts/doctor.mjs",
    "factory:validate-templates": "node scripts/validate_templates.mjs",
    "factory:new": "node scripts/new_project.mjs",
    "factory:status": "node scripts/status.mjs",
    "factory:next": "node scripts/next.mjs"
  }
}
```

### `.gitignore` Requirements

GitHub distribution must not commit heavy or private outputs.

Ignore:

```text
node_modules/
.env
.DS_Store
*.log
projects/*/renders/*
projects/*/voiceover/*
projects/*/assets/**/originals/*
projects/*/assets/**/generated/*
projects/*/assets/**/processed/*
projects/*/composition/node_modules/
projects/*/composition/snapshots/*
templates/project/renders/*
templates/project/composition/snapshots/*
!projects/*/renders/.gitkeep
!projects/*/voiceover/.gitkeep
!projects/*/assets/**/.gitkeep
!templates/project/renders/.gitkeep
!templates/project/composition/snapshots/.gitkeep
```

Keep `.gitkeep` files where empty folders must exist.

### `doctor.mjs`

Purpose: environment and dependency check.

Do not validate template content here. Template integrity belongs to `validate_templates.mjs`.

Dependency levels:

| Level | Check |
|---|---|
| Required | Node, npm, package.json, scripts folder, templates/project, templates/project/project.json, role skills, AGENTS.md, CLAUDE.md |
| Production Required | ffmpeg, ffprobe, Hyperframes runnable through `npx --yes hyperframes@0.5.3 --help` or equivalent |
| Optional / Late | ElevenLabs key, `video-use` local path, image generation capability, browser capture capability |

Output should be explicit:

```text
Required: PASS
Production Required: WARN
Optional / Late: WARN
Overall: PASS_FOR_PHASE_1
```

Phase 1 should pass even if ElevenLabs, `video-use`, imagegen, or browser capture are missing.

### `validate_templates.mjs`

Purpose: repository/template integrity check.

Checks:

- `templates/project/project.json` exists.
- `templates/project/project.json` matches `schemas/project.schema.json`.
- `schemas/project.schema.json` defines separate enums for `status` and `currentGate`.
- required markdown files exist:

```text
research-pack.md
creative-brief.md
draft-scene-packets.md
plan.md
timed-scene-packets.md
status.md
asset-plan.md
design-context.md
source-notes.md
scene-packet.md
```

- `status.md` checklist and `project.json.artifacts` do not drift meaningfully. The comparison must treat `artifacts.*` as completion state, not file existence.
- `project.json.routes.*` uses only the route string enum, not booleans.
- `timed-scene-packets.md` has a `Tool Route` column.
- `asset-plan.md` has a `Tool Route` column.
- all `skills/*/SKILL.md` files have valid YAML frontmatter.

The command must fail nonzero when required template integrity fails.

### `new_project.mjs`

Command:

```bash
npm run factory:new -- "테스트 주제"
npm run factory:new -- "테스트 주제" --id 999 --dry-run
```

Responsibilities:

1. Receive topic from argv.
2. Compute next project ID from `projects/NNN-*`.
3. Create slug.
4. Copy `templates/project` to `projects/{NNN-slug}`.
5. Fill `project.json`:
   - id
   - slug
   - title
   - createdAt
   - updatedAt
   - status: `idea`
   - currentGate: `topic_intake`
6. Update `PROJECTS.md`.
7. Print next command.
8. Support `--dry-run` so repeatable tests can preview without writing files.
9. Support `--id <NNN>` so tests can use deterministic IDs.

Expected output:

```text
Created: <project-path>
Next: npm run factory:next -- <project-path>
```

Do not overwrite an existing project.

If the target path already exists, fail with a clear message and suggest either using a different topic/ID or deleting the test project. Do not silently merge, replace, or mutate an existing project.

### `status.mjs`

Command:

```bash
npm run factory:status -- <project-path>
```

Responsibilities:

- Read `project.json`.
- Check expected files exist.
- Report file existence separately from artifact completion.
- Detect mismatch between canonical `project.json` and actual artifacts.
- Print current gate.
- Print missing or pending items.
- Print the next recommended command.

Example output:

```text
Project: <project-path>
Status: idea
Current gate: topic_intake
Canonical state: project.json
Missing or pending:
- Files: research-pack.md exists
- Artifact state: researchPack false
- Meaning: file exists but research artifact is not completed
Next:
- npm run factory:next -- <project-path>
```

### `next.mjs`

Command:

```bash
npm run factory:next -- <project-path>
```

Responsibilities:

- Read `project.json`.
- Infer current gate.
- Choose next role.
- Print required input files.
- Print expected output files.
- Generate a ready-to-paste prompt for Codex/Claude Code.

This script must not call an LLM API in Phase 1.

Example role routing:

| Gate | Role |
|---|---|
| topic_intake | `hype-topic-producer` |
| research | `hype-research-desk` |
| creative | `hype-showrunner`, `hype-creative-director` |
| draft_scenes | `hype-scene-planner` |
| script | `hype-writer-room` |
| review | user approval required |
| tts | `hype-audio-producer` |
| timing | `hype-scene-planner` |
| assets | `hype-asset-producer`, `hype-visual-director` |
| motion | `hype-motion-designer` |
| pre_render_qa | `hype-qa-editor` |
| render | render command allowed after pre-render QA |
| video_review | `hype-video-reviewer` |
| final_qa | `hype-qa-editor` |
| package | `hype-packaging-editor` |
| done | no next production role |
| blocked | print blocker and required human decision |

### Phase 1 Acceptance Criteria

These commands must work:

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:new -- "테스트 주제" --id 999 --dry-run
npm run factory:new -- "테스트 주제"
npm run factory:status -- <path printed by factory:new>
npm run factory:next -- <path printed by factory:new>
```

Pass conditions:

- Repeat-safe dry-run succeeds.
- New project is created without overwriting an existing project.
- `project.json` exists and is valid.
- `PROJECTS.md` is updated.
- `status` reports the current gate.
- `next` outputs a usable role prompt.
- `doctor` separates required, production-required, optional/late dependencies.
- `validate-templates` fails if the templates drift.

## Phase 2: Audio, Timing, And Route Work Orders

### Files To Add

```text
scripts/tts_elevenlabs.mjs
scripts/mix_voiceover_audio.mjs
scripts/timing_from_srt.mjs
scripts/route_work_orders.mjs
```

### Package Scripts

```json
{
  "scripts": {
    "factory:tts": "node scripts/tts_elevenlabs.mjs",
    "factory:mix": "node scripts/mix_voiceover_audio.mjs",
    "factory:timing": "node scripts/timing_from_srt.mjs",
    "factory:route": "node scripts/route_work_orders.mjs"
  }
}
```

### `tts_elevenlabs.mjs`

Command:

```bash
npm run factory:tts -- projects/003-topic
```

Strict gate:

```text
project.json.approved.plan === true
```

Do not run TTS only because `plan.md` contains approval-like text.

TTS standard:

```text
Voice: Sam Hottman
Voice ID: WzMnDIgiICcj1oXbUBO0
Model: eleven_flash_v2_5
Language: ko
Output: mp3_44100_128
Sync: ElevenLabs SRT / forced_alignment preferred
```

Secrets lookup order:

```text
ELEVENLABS_API_KEY
~/.codex/secrets/elevenlabs.env
```

Outputs:

```text
voiceover/solo/voiceover-solo-elevenlabs.mp3
voiceover/solo/voiceover-solo-elevenlabs.srt
voiceover/solo/elevenlabs_manifest.json
```

After success:

- update `project.json.artifacts.tts`
- update `project.json.status`
- update `project.json.updatedAt`

### `mix_voiceover_audio.mjs`

Command:

```bash
npm run factory:mix -- projects/003-topic
```

Inputs:

```text
voiceover/solo/voiceover-solo-elevenlabs.mp3
assets/bgm/default-bgm.mp3
```

Current BGM standard:

```text
Name: Glass Horizon
Artist: loudsquaredance310
Path: assets/bgm/default-bgm.mp3
BGM volume: default 0.05 with voice-first ducking
Ducking: enabled under narration
```

Output:

```text
voiceover/solo/voiceover-solo-final-mix.m4a
```

After success:

- update `project.json.artifacts.audioMix = true`
- update `project.json.updatedAt`

### `timing_from_srt.mjs`

Command:

```bash
npm run factory:timing -- projects/003-topic
```

Purpose:

- read ElevenLabs SRT
- read `plan.md`
- create or update `timed-scene-packets.md`
- map scenes to approximate SRT ranges
- leave `pending` where human review is needed

Gate:

```text
project.json.artifacts.tts === true
```

Optional stricter gate:

```text
project.json.approved.tts === true
```

### `route_work_orders.mjs`

Command:

```bash
npm run factory:route -- projects/003-topic
```

Purpose:

- read `timed-scene-packets.md`
- read `asset-plan.md`
- find `Tool Route`
- generate work order files

Outputs:

```text
work-orders/route-work-orders.md
work-orders/video-use.md
work-orders/imagegen.md
work-orders/capture.md
work-orders/hyperframes.md
```

MVP behavior:

- create work orders only
- do not call `video-use`
- do not call imagegen
- do not run browser capture

Update:

```text
project.json.routes.workOrders = "done"
```

## Phase 3: External Tool Execution

### Files To Add

```text
scripts/capture_work_orders.mjs
scripts/imagegen_work_orders.mjs
scripts/video_use_work_orders.mjs
```

### Package Scripts

```json
{
  "scripts": {
    "factory:capture": "node scripts/capture_work_orders.mjs",
    "factory:imagegen": "node scripts/imagegen_work_orders.mjs",
    "factory:video-use": "node scripts/video_use_work_orders.mjs"
  }
}
```

### Dry Run Rule

These commands must support dry-run:

```bash
npm run factory:imagegen -- projects/003-topic -- --dry-run
npm run factory:capture -- projects/003-topic -- --dry-run
npm run factory:video-use -- projects/003-topic -- --dry-run
```

Default behavior can be dry-run first if the command might spend money, use network-heavy tools, or depend on local apps.

### `capture_work_orders.mjs`

Purpose:

- read `work-orders/capture.md`
- capture web/docs/UI screenshots
- save files under:

```text
assets/screenshots/
assets/evidence/
```

Recommended implementation:

- use Playwright for repo-portable automation
- avoid Codex browser plugin as the primary repo script because it is session-dependent

### `imagegen_work_orders.mjs`

Purpose:

- read `work-orders/imagegen.md`
- run image generation for metaphor, style frame, background, thumbnail candidates
- save outputs:

```text
assets/generated/
assets/processed/
assets/generated/imagegen_manifest.json
```

Rule:

- do not use imagegen for factual evidence screenshots
- use it for metaphor/style/thumbnail/supporting visuals

### `video_use_work_orders.mjs`

Purpose:

- read `work-orders/video-use.md`
- process raw/reference/interview/talk/demo clips
- trim, crop, subtitle, normalize, contact-sheet as needed
- save processed clips:

```text
assets/interviews/processed/
assets/broll/processed/
assets/demos/processed/
```

Rule:

- run only when `project.json.routes.videoUse` is required/planned
- never route every project through `video-use`
- processed clip paths must be written back to `asset-plan.md` or a manifest

## Phase 4: Compose, QA, Render, Package

### Files To Add

```text
scripts/compose_project.mjs
scripts/qa_project.mjs
scripts/render_project.mjs
scripts/review_video.mjs
scripts/package_project.mjs
```

### Package Scripts

```json
{
  "scripts": {
    "factory:compose": "node scripts/compose_project.mjs",
    "factory:qa": "node scripts/qa_project.mjs",
    "factory:render": "node scripts/render_project.mjs",
    "factory:review-video": "node scripts/review_video.mjs",
    "factory:package": "node scripts/package_project.mjs"
  }
}
```

### Correct Execution Order

```bash
npm run factory:compose -- projects/003-topic
npm run factory:qa -- projects/003-topic -- --stage pre-render
npm run factory:render -- projects/003-topic
npm run factory:review-video -- projects/003-topic
npm run factory:qa -- projects/003-topic -- --stage final
npm run factory:package -- projects/003-topic
```

### `compose_project.mjs`

Purpose:

- read:

```text
timed-scene-packets.md
asset-plan.md
design-context.md
voiceover/solo/voiceover-solo-elevenlabs.srt
voiceover/solo/voiceover-solo-final-mix.m4a
```

- create composition data:

```text
composition/src/project-data.json
composition/src/scenes.json
composition/src/captions.json
composition/src/assets.json
composition/src/captures.json
```

Do not attempt 100 percent creative HTML generation on the first pass. Start with stable data scaffolding that a motion designer or agent can implement.

When capture or audio assets already exist, compose must sync them into `composition/assets/` so Hyperframes can reference stable local paths instead of project-root paths.

### `qa_project.mjs`

Stages:

```text
pre-render
final
```

Pre-render checks:

- `project.json` exists and is valid.
- `project.json.approved.plan === true`.
- `project.json.approved.timedScenePackets === true` or explicitly waived.
- SRT exists.
- `project.json.artifacts.audioMix === true`.
- final mix file exists.
- route work orders are done or marked not required.
- `asset-plan.md` rows are complete; `todo`, `pending`, and `blocked` rows cannot pass.
- `timed-scene-packets.md` rows are resolved; caption/audio/status fields cannot remain `pending`.
- captured assets are actually referenced in the composition when `routes.capture === "done"`.
- `asset-plan.md` has no blocking pending items.
- `timed-scene-packets.md` has no blocking pending items.
- Hyperframes `npm run check` passes.
- snapshots exist or can be generated.

Final checks:

- rendered MP4 exists.
- ffprobe sees audio and video streams.
- duration is plausible.
- final QA report is written.

Outputs:

```text
review/qa-pre-render.md
review/qa-final.md
```

### `render_project.mjs`

Command:

```bash
npm run factory:render -- projects/003-topic
```

Must support:

```bash
npm run factory:render -- projects/003-topic -- --dry-run
```

Responsibilities:

- run composition checks
- run snapshot command if configured
- render MP4
- run ffprobe
- write render manifest

Outputs:

```text
renders/final.mp4
renders/render_manifest.json
```

### `review_video.mjs`

Purpose:

- extract scene frames and a contact sheet from the rendered MP4
- compare captions, timed scene packets, asset plan, work orders, and composition markers
- block final QA if rich scenes look empty, route assets are missing, captions drift badly, broad decorative connector lines float over panels, or motion variety is too weak

Outputs:

```text
review/video-review/video-review.md
review/video-review/fix-list.md
review/video-review/frame-manifest.json
review/video-review/caption-sync-report.json
review/video-review/caption-config-report.json
review/video-review/motion-density-report.json
review/video-review/asset-presence-report.json
review/video-review/line-quality-report.json
review/video-review/route-transparency-report.json
review/video-review/frames/
review/video-review/contact-sheets/
```

### `package_project.mjs`

Purpose:

- generate upload package from final plan and render state

Outputs:

```text
package/title-options.md
package/description.md
package/pinned-comment.md
package/thumbnail-prompts.md
package/upload-checklist.md
```

## Phase 5: GitHub And Distribution

### GitHub Actions

Add:

```text
.github/workflows/ci.yml
```

Default CI should stay lightweight:

```bash
npm run factory:doctor -- --ci
npm run factory:validate-templates
```

Do not run full render on every push by default.

Optional later workflow:

```text
workflow_dispatch: render smoke
```

### GitHub Template Repo

This is the first recommended distribution path.

Expected user flow:

```bash
git clone <repo>
cd hype_tuber
npm install
npm run factory:doctor
npm run factory:validate-templates
npm run factory:new -- "내 주제"
npm run factory:next -- projects/003-my-topic
```

### npm Package

This is a later distribution path.

Possible future command:

```bash
npx hype-tuber-factory new "내 주제"
```

Do not prioritize npm packaging before the GitHub template workflow works.

## Full Future Command Set

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:smoke
npm run factory:new -- "주제" --slug topic
npm run factory:status -- projects/003-topic
npm run factory:next -- projects/003-topic

npm run factory:tts -- projects/003-topic
npm run factory:mix -- projects/003-topic
npm run factory:timing -- projects/003-topic
npm run factory:route -- projects/003-topic

npm run factory:video-use -- projects/003-topic -- --dry-run
npm run factory:imagegen -- projects/003-topic -- --dry-run
npm run factory:capture -- projects/003-topic -- --dry-run

npm run factory:compose -- projects/003-topic
npm run factory:qa -- projects/003-topic -- --stage pre-render
npm run factory:render -- projects/003-topic -- --dry-run
npm run factory:render -- projects/003-topic
npm run factory:review-video -- projects/003-topic
npm run factory:qa -- projects/003-topic -- --stage final
npm run factory:package -- projects/003-topic
```

## Factory Safety Rules

- Smoke tests must use `.factory-tmp/factory-smoke`, not real `projects/NNN-*` folders.
- `factory:new --dry-run` must not create files.
- `factory:new` supports `--slug`; Korean-only topics fall back to an ID slug such as `project-997` when no slug is supplied.
- `factory:route` is blocked until `artifacts.timedScenePackets === true` and `artifacts.assetPlan === true`.
- Placeholder template rows are not executable work orders.
- Capture, imagegen, and video-use rows with missing executable input or action are blocked.
- Mutating commands must print changed `project.json` fields; dry-run tool commands must not mutate `project.json`.

## Implementation Order

### First Implementation Session

Implement only Phase 1.

For the first control-panel pass only, hold TTS, route execution, capture, imagegen, video-use, render, GitHub Actions, and npm packaging for later phases.

Phase 1 is complete only when:

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:smoke
npm run factory:new -- "테스트 주제" --id 999 --dry-run
npm run factory:new -- "테스트 주제" --slug test-topic
npm run factory:status -- <path printed by factory:new>
npm run factory:next -- <path printed by factory:new>
```

all run successfully.

### Second Implementation Session

Implement Phase 2:

```text
tts_elevenlabs
mix_voiceover_audio
timing_from_srt
route_work_orders
```

### Third Implementation Session

Implement Phase 3:

```text
capture_work_orders
imagegen_work_orders
video_use_work_orders
```

### Fourth Implementation Session

Implement Phase 4:

```text
compose_project
qa_project
render_project
package_project
```

### Fifth Implementation Session

Implement Phase 5:

```text
GitHub Actions
GitHub template cleanup
npm package preparation
```

## Hard Safety Rules

- TTS must require `project.json.approved.plan === true`.
- Render must require pre-render QA unless explicitly passed with a documented override.
- Costly or environment-dependent commands must support `--dry-run`.
- Smoke tests must run in `.factory-tmp/factory-smoke`, never in real `projects/NNN-*` folders.
- `factory:route` must refuse incomplete timed packet or asset plan artifacts and must ignore placeholder template rows.
- Capture, imagegen, and video-use routes with missing executable inputs/actions must block instead of becoming done.
- `factory:next` must not call an LLM in Phase 1.
- `video-use` must run only for routed raw/source video work.
- `imagegen` must not be used for factual evidence screenshots.
- `source-notes.md` remains optional compatibility context, not a gate.
- `hype-source-editor` remains deferred and is not part of MVP.

## Handoff Prompt For Next Session

Use this prompt in a new Codex or Claude Code session:

```text
We are in /Users/a0000/Library/Mobile Documents/com~apple~CloudDocs/Desktop/dev/hype_tuber.

Read these files first:
- AGENTS.md
- README.md
- PRODUCTION_ROLES.md
- CREATIVE_DEVELOPMENT_PIPELINE.md
- CONTENT_FACTORY_PIPELINE.md
- TOOL_ROUTING_PIPELINE.md
- FACTORY_AUTOMATION_ROADMAP.md

Do not use youtube-scene-director.

Implement Phase 1 only from FACTORY_AUTOMATION_ROADMAP.md:
- package.json
- .gitignore updates
- BOOTSTRAP.md
- CLAUDE.md
- .env.example
- schemas/project.schema.json
- templates/project/project.json
- scripts/doctor.mjs
- scripts/validate_templates.mjs
- scripts/new_project.mjs
- scripts/status.mjs
- scripts/next.mjs

For this setup pass only, keep TTS, render, video-use, imagegen, capture, GitHub Actions, and npm packaging in later phases rather than treating them as permanent exclusions.

Done means these commands pass:
npm run factory:doctor
npm run factory:validate-templates
npm run factory:new -- "테스트 주제" --id 999 --dry-run
npm run factory:new -- "테스트 주제"
npm run factory:status -- <path printed by factory:new>
npm run factory:next -- <path printed by factory:new>
```
