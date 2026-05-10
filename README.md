# hype_tuber

Hyperframes 기반 모션 애니메이션 유튜브 제작 작업실입니다.

목표는 대본과 TTS를 기준으로 얼굴 노출 없는 고퀄리티 HTML/SVG 모션그래픽 영상을 만드는 것입니다.

## Workflow

1. 주제를 받는다.
2. `research-pack.md`에 소재 리서치를 모은다.
3. `creative-brief.md`와 `draft-scene-packets.md`로 각도, 길이, 구조, 씬 목적을 잡는다.
4. `plan.md`에 승인용 대본과 씬 계약서를 만든다.
5. 사용자가 검수한다.
6. 승인 후 ElevenLabs TTS를 만든다.
7. ElevenLabs forced-alignment SRT 타이밍에 맞춰 `timed-scene-packets.md`를 만든다. 자막은 기본적으로 SRT cue 기반 text-only이며 진행바를 넣지 않는다.
8. `scene-contracts.md`를 만들고 `factory:validate-scene-contract`로 구현 계약을 검증한다.
9. `TOOL_ROUTING_PIPELINE.md` 기준으로 씬별 도구 경로를 정한다.
10. 자료/비주얼/모션/오디오를 씬별로 병렬 제작한다.
11. Hyperframes 조립 후 `snapshot`, pre-render QA, `render`, video review, final QA를 거친다.
12. 제목, 썸네일, 설명문, 고정댓글 방향을 패키징한다.

## Folder Map

```text
hype_tuber/
|-- README.md
|-- AGENTS.md
|-- PRODUCTION_ROLES.md
|-- CREATIVE_DEVELOPMENT_PIPELINE.md
|-- TOOL_ROUTING_PIPELINE.md
|-- PROJECTS.md
|-- skills/
|   |-- hype-*/
|   `-- hyperframes-motion-design-guide/
|-- shared/
|   |-- DESIGN.md
|   `-- assets/
|       |-- fonts/
|       |-- icons/
|       `-- images/
|-- templates/
|   `-- project/
|       |-- research-pack.md
|       |-- creative-brief.md
|       |-- draft-scene-packets.md
|       |-- plan.md
|       |-- timed-scene-packets.md
|       |-- scene-contracts.md
|       |-- status.md
|       |-- source-notes.md
|       |-- design-context.md
|       |-- asset-plan.md
|       |-- source/
|       |-- assets/
|       |   |-- audio/
|       |   |-- images/
|       |   `-- transcript/
|       |-- composition/
|       `-- renders/
|-- projects/
`-- references/
    `-- ez-mov/
```

## New Project

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:smoke
npm run factory:new -- "your topic" --slug your-topic
npm run factory:status -- <project-path>
npm run factory:next -- <project-path>
```

`factory:smoke` uses `.factory-tmp/factory-smoke` only. Do not use real `projects/NNN-*` folders for control-panel smoke tests.

For Korean-only topics, pass `--slug`; otherwise `factory:new` falls back to an ID-based slug such as `project-997`.

After TTS is approved:

```bash
npm run factory:tts -- <project-path>
npm run factory:mix -- <project-path>
npm run factory:timing -- <project-path>
npm run factory:validate-scene-contract -- <project-path>
npm run factory:route -- <project-path>
npm run factory:compose -- <project-path>
npm run factory:qa -- <project-path> -- --stage pre-render
npm run factory:render -- <project-path>
npm run factory:review-video -- <project-path>
npm run factory:qa -- <project-path> -- --stage final
npm run factory:package -- <project-path>
```

Renderer comparison projects may also run:

```bash
npm run factory:render -- <project-path> -- --renderer hyperframes
npm run factory:render -- <project-path> -- --renderer remotion
npm run factory:review-video -- <project-path> -- --render final-hyperframes.mp4
npm run factory:review-video -- <project-path> -- --render final-remotion.mp4
```

`factory:review-video` generates evidence; it is not the final aesthetic judge. `review/video-review/director-review.md` and `renderer-comparison.md` must select the final renderer before final QA/package.

If a recurring factory mistake is fixed and verified, document the prevention with `/ce-compound`. Do not run `/ce-compound` for unresolved problems or one-off typos.

Rendered MP4s, contact sheets, scene frames, snapshots, and downloaded/generated media are local delivery artifacts. They are intentionally ignored for GitHub size control. The canonical handoff location for finished videos is `~/Downloads`, and project review Markdown/JSON records the local evidence paths.

`factory:route` is blocked until `project.json.artifacts.timedScenePackets` and `project.json.artifacts.assetPlan` are both `true`. Placeholder template rows must not become executable work orders.

## TTS Standard

```bash
python ~/.codex/skills/elevenlabs-tts/scripts/generate_elevenlabs_tts.py \
  --file voiceover.txt \
  --out-dir voiceover/solo \
  --audio voiceover-solo-elevenlabs.mp3 \
  --srt voiceover-solo-elevenlabs.srt

ffmpeg -y -i voiceover/solo/voiceover-solo-elevenlabs.mp3 \
  -c:a aac -b:a 192k voiceover/solo/voiceover-solo-final-mix.m4a
```

Use `voiceover/solo/voiceover-solo-elevenlabs.srt` as the timing source for scene and caption sync.

## Production Rule

Do not write the final script before `draft-scene-packets.md` exists.

Do not start TTS before `plan.md` has user-approved narration and scene contract.

Do not start exact motion timing before `timed-scene-packets.md` exists. Do not start implementation before `scene-contracts.md` exists and `factory:validate-scene-contract` passes. The scene contract is the implementation authority for primary screen object, allowed elements, forbidden fillers, motion beats, markers, and evidence frame.

For motion design and animation, apply the local design-guide skill first:

```text
skills/hyperframes-motion-design-guide/SKILL.md
```

Use `CONTENT_FACTORY_PIPELINE.md` as the master workflow for topic-to-render production.

Use `TOOL_ROUTING_PIPELINE.md` to decide whether each scene should use Hyperframes, `video-use`, imagegen, capture, scripts/ffmpeg, or manual assets. Hyperframes remains the default final composition/render path. Use `video-use` when source video needs analysis, transcript, trimming, subtitles, crop, or processed clip export.

New projects should keep `research-pack.md` for material development, `creative-brief.md` for the angle/structure decision, `draft-scene-packets.md` and `timed-scene-packets.md` for scene planning and timing, `scene-contracts.md` for implementation contracts, `design-context.md` for visual direction, and `asset-plan.md` for screenshots, B-roll, interview candidates, demos, data, generated visuals, and processed assets.

`source-notes.md` is optional compatibility context, not an MVP gate. Use `INTERVIEW_ASSET_PIPELINE.md` only when a video needs public interviews, talks, podcasts, or quote clips.
