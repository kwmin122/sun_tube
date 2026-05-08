# Design Context

## Project

- Project name: Claude Managed Agents 업데이트
- Collection date: 2026-05-08
- Output purpose: 약 5분 34초 한국어 기술 해설 영상
- Format: 1920x1080
- Target viewer: AI 에이전트 워크플로를 쓰는 개발자와 빌더
- Viewing situation: YouTube desktop/mobile horizontal playback

## Sources And Assets

- Official source links: https://claude.com/blog/new-in-claude-managed-agents
- Topic source link: https://wikidocs.net/blog/@jaehong/12977/
- Logo path: pending
- Product image path: pending
- UI screenshot path: pending
- Reference path: `../../references/ez-mov/`, `../../references/dalbi-example-2/`

## Visual System

- Color tokens: near-black background, Claude orange accent, cool cyan routing lines, white text, muted gray panels
- Font choices: Korean sans-serif with strong weight contrast; final choice pending composition
- Visual mood: technical control room, system diagram, high-signal dashboard
- Motion personality: route, sort, score, split, merge, callback, lock
- Caption safe zone: keep core visuals above bottom caption band, roughly y=820 for 1920x1080

## Tool Routing

- Default route: Hyperframes for final composition, diagrams, captions, kinetic type, and render
- Capture route: scenes 01, 03, 12 for source webpage/product announcement screenshots
- Imagegen route: optional style frames only if later needed
- `video-use` route: none currently, because no raw/interview/demo video clip is selected
- scripts/ffmpeg route: later audio mix and render checks only

## Constraints

- Forbidden styles: generic purple SaaS gradient, face-heavy footage, decorative cards without information role, copied reference sequence
- Unknowns: exact official UI screenshot availability, final SRT timing, final BGM/SFX accents

## Scene Visual Spine

| Scene | Visual Role | Direction |
|---|---|---|
| 01 | Announcement hook | Four compact update cards over source page capture |
| 02 | Reframe | Model card transforms into operating-system frame |
| 03 | Dreaming what | Memory fragments sort into high-signal lanes |
| 04 | Dreaming when useful | Repeated workflow pattern carries into next session |
| 05 | Outcomes what | Output passes through rubric grader and revision loop |
| 06 | Outcomes when useful | Requirements, brand, and design checklists scan outputs |
| 07 | Multiagent what | Lead agent fans out to specialist nodes |
| 08 | Multiagent when useful | Logs, metrics, docs, and support panels run in parallel |
| 09 | Webhooks what | Completed task sends callback to next workflow |
| 10 | Webhooks when useful | Event chain connects long-running tasks to review/QA |
| 11 | Synthesis | Four-axis system locks into one center node |
| 12 | Cases | Harvey, Netflix, Spiral, Wisedocs case cards |
| 13 | Takeaway | "Which model?" is replaced by "Which system?" |
