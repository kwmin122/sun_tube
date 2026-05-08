# Bootstrap

This repo is meant to work as a GitHub template or cloneable production workspace.

## Setup

```bash
npm install
npm run factory:doctor
npm run factory:validate-templates
npm run factory:smoke
```

## Start A Project

```bash
npm run factory:new -- "내 주제" --slug my-topic
npm run factory:status -- <project-path>
npm run factory:next -- <project-path>
```

`factory:next` prints the next role, the files to read, the files to write, and a ready-to-paste prompt for Codex or Claude Code.

`factory:smoke` creates temporary projects only under `.factory-tmp/factory-smoke`; real `projects/NNN-*` folders should not be used for smoke tests.

## Production Commands

```bash
npm run factory:tts -- <project-path>
npm run factory:mix -- <project-path>
npm run factory:timing -- <project-path>
npm run factory:route -- <project-path>

npm run factory:video-use -- <project-path> -- --dry-run
npm run factory:imagegen -- <project-path> -- --dry-run
npm run factory:capture -- <project-path> -- --dry-run

npm run factory:compose -- <project-path>
npm run factory:qa -- <project-path> -- --stage pre-render
npm run factory:render -- <project-path> -- --dry-run
npm run factory:render -- <project-path>
npm run factory:qa -- <project-path> -- --stage final
npm run factory:package -- <project-path>
```

`factory:route` requires completed timed scene packets and asset plan artifacts. Rows with missing executable input/action are blocked instead of being treated as done.

External tools such as ElevenLabs, `video-use`, image generation, browser capture, ffmpeg, and Hyperframes may require local setup. `factory:doctor` reports these by dependency level.
