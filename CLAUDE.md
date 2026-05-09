# CLAUDE.md

This repository is a role-based YouTube/Hyperframes production factory.

Read these first:

- `README.md`
- `AGENTS.md`
- `PRODUCTION_ROLES.md`
- `CREATIVE_DEVELOPMENT_PIPELINE.md`
- `TOOL_ROUTING_PIPELINE.md`
- `FACTORY_AUTOMATION_ROADMAP.md`

Rules:

- Do not use `youtube-scene-director` unless the user explicitly asks for it.
- `project.json` is the canonical machine state.
- `status.md` is a human checklist, not the state machine source.
- `factory:next` generates the next role prompt. It must not call an LLM API.
- `source-notes.md` is optional compatibility context, not an MVP gate.
- Research is material development, not rights/privacy/citation review.
- TTS requires `project.json.approved.plan === true`.
- Render requires pre-render QA unless the user explicitly passes an override.
- Renderer comparison must use one shared scene contract. Do not let Hyperframes and Remotion invent different scene meanings.
- `factory:review-video` is evidence generation, not final creative approval.
- `/ce-compound` is only for fixed, verified, recurring-risk failures.

Start here:

```bash
npm run factory:doctor
npm run factory:validate-templates
npm run factory:new -- "주제"
npm run factory:next -- <project-path>
```
