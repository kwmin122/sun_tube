# {프로젝트 이름}

## Overview

- **Goal**:
- **Target viewer**:
- **Duration**:
- **Format**: 1920x1080 horizontal | 1080x1920 vertical
- **Tone**: hype | corporate | tutorial | storytelling | social
- **Visual style**: `../../shared/DESIGN.md`
- **Motion design guide**: `../../skills/hyperframes-motion-design-guide/SKILL.md`
- **Content factory**: `../../CONTENT_FACTORY_PIPELINE.md`
- **Production roles**: `../../PRODUCTION_ROLES.md`
- **Creative pipeline**: `../../CREATIVE_DEVELOPMENT_PIPELINE.md`
- **Primary content pattern**:
- **Research pack**: `research-pack.md`
- **Creative brief**: `creative-brief.md`
- **Draft scene packets**: `draft-scene-packets.md`
- **Timed scene packets**: `timed-scene-packets.md`
- **Source notes**: `source-notes.md` optional compatibility notes
- **Design context**: `design-context.md`
- **Asset plan**: `asset-plan.md`
- **Approval state**: draft | approved | locked

## Research Pack Summary

- Best angle lead:
- Strongest material:
- Interview/image/demo candidates:
- Open question:

## Creative Brief Summary

- Chosen angle:
- Length decision:
- Structure:
- Tone:

## Voiceover Script

Write spoken Korean lines here. Use one idea per line.

```text

```

## Scene Summary

| # | Time | Pattern Role | Core Message | Visual Concept | Motion Notes | Assets |
|---|---|---|---|---|---|---|
| 01 | 0:00-0:07 | hook/claim | Hook | Title cascade | keyword pop + camera push | |
| 02 | 0:07-0:18 | problem/context | Problem | Compare diagram | left/right stagger | |
| 03 | 0:18-0:32 | explanation/diagram | Explanation | Grid cards | card stagger | |
| 04 | 0:32-0:44 | proof/data | Proof | Metric reveal | count up + bar grow | |
| 05 | 0:44-0:54 | demo/application | Application | Icon labels | icon pop + short labels | |
| 06 | 0:54-1:00 | takeaway | CTA | One-line copy | fade out | |

## Motion Blueprint Summary

This table is a compact contract for the renderer. It should agree with `design-context.md`.

| # | Primary Screen Object | State Change | Motion Beat Ladder | Hold / Exit Rule | Snapshot Evidence |
|---|---|---|---|---|---|
| 01 | | | | | |
| 02 | | | | | |
| 03 | | | | | |

## Detailed Scene Plan

### Scene 01

- Time:
- Pattern role:
- Narration:
- On-screen phrase:
- Layout:
- Primary screen object:
- Supporting objects:
- Initial state:
- Active state:
- End state:
- Motion beat ladder:
- Hold / exit rule:
- Primary motion:
- Secondary motion:
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX:
- Verification frame:

### Scene 02

- Time:
- Pattern role:
- Narration:
- On-screen phrase:
- Layout:
- Primary screen object:
- Supporting objects:
- Initial state:
- Active state:
- End state:
- Motion beat ladder:
- Hold / exit rule:
- Primary motion:
- Secondary motion:
- Caption: bottom safe-zone text-only from ElevenLabs SRT, no progress bar
- SFX:
- Verification frame:

## Approval Gate

- Draft scene packets complete: yes | no
- User approved narration: yes | no
- User approved scene contract: yes | no
- TTS allowed: yes | no

## TTS Notes

- Provider: ElevenLabs
- Voice: Sam Hottman
- Voice ID: `WzMnDIgiICcj1oXbUBO0`
- Model: `eleven_flash_v2_5`
- Language: `ko`
- Output format: `mp3_44100_128`
- Original voice: `voiceover/solo/voiceover-solo-elevenlabs.mp3`
- Timing subtitle: `voiceover/solo/voiceover-solo-elevenlabs.srt`
- Display text: `voiceover/solo/voiceover.txt`
- Spoken TTS text: `voiceover/solo/voiceover_elevenlabs_sam.txt`
- Display subtitle: `assets/audio/voiceover-display.srt`
- Final mix: `voiceover/solo/voiceover-solo-final-mix.m4a`
- Sync: send `voiceover_elevenlabs_sam.txt` to ElevenLabs, create timing from ElevenLabs forced alignment, then replace only the SRT cue text with `voiceover.txt`. Display and spoken files must have the same line count. Captions are text-only with no progress bar.

## Render Checks

```bash
cd composition
npm run check
npx hyperframes snapshot . --at <scene-times> --output snapshots
npm run render -- -o ../renders/final.mp4 -q high -f 30
ffprobe -v error -show_entries format=duration:stream=width,height,avg_frame_rate -of json ../renders/final.mp4
```
