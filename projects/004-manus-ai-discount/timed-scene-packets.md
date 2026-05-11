# Timed Scene Packets

Owner: `hype-scene-planner`

Final timing is based on `voiceover/solo/voiceover-solo-elevenlabs.srt`.

## Timing Table

| Scene | Time Range | SRT Lines | Tool Route | Renderer Targets | Scene Recipe | Primary Visual Source | Capture Role | Capture Mode | Imagegen Role | Narration Verb | Motion Purpose | Reveal Mode | Caption Behavior | Primary Asset | Motion Beat | Review Check | Audio/SFX | Snapshot Time | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 0:00-0:29.6 | 1-13 | hyperframes | hyperframes | product/before-after-demo | hyperframes | not_required | not_required | support | 떴습니다 | price urgency and value conversion | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | none | title -> annual price -> monthly equivalent -> urgency lock | price and value claim visible | light hit | 0:20 | implemented |
| 02 | 0:29.6-0:36.1 | 14-16 | capture + hyperframes | hyperframes | proof/document-zoom-highlight | capture | primary_evidence | split_half | not_required | 기준입니다 | distinguish official context from community report | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | Manus pricing help capture | capture settle -> community-report badge -> method bridge | capture readable half-side | soft tick | 0:33 | implemented |
| 03 | 0:36.1-0:51.6 | 17-24 | hyperframes | hyperframes | product/before-after-demo | hyperframes | not_required | not_required | not_required | 확인합니다 | show Android check order | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | Android flow diagram | phone -> app -> play store -> annual -> amount gate | method visible | step pop | 0:45 | implemented |
| 04 | 0:51.6-1:10.1 | 25-32 | hyperframes | hyperframes | explain/mechanism-state-machine | hyperframes | not_required | not_required | not_required | 보세요 | verify charge and period | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | user report text | points -> actual charge -> period check -> warning | no guarantee language | warning ping | 1:02 | implemented |
| 05 | 1:10.1-1:24.1 | 33-40 | hyperframes | hyperframes | explain/fan-out-fan-in | hyperframes | not_required | not_required | support | 쓸 여지가 있습니다 | show use-case lanes | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | none | trigger -> crawl -> data -> image/video -> loop | lanes active | subtle pulse | 1:18 | implemented |
| 06 | 1:24.1-1:36.3 | 41-46 | capture + hyperframes | hyperframes | proof/document-zoom-highlight | capture | primary_evidence | split_half | not_required | 확인하세요 | show subscription management safety | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | Google Play help capture | capture settle -> renewal -> manage -> account checks | capture readable half-side | caution tick | 1:30 | implemented |
| 07 | 1:36.3-1:47.5 | 47-52 | hyperframes | hyperframes | explain/mechanism-state-machine | hyperframes | not_required | not_required | not_required | 멈추세요 | final action list | one-at-a-time | bottom safe-zone text-only caption from ElevenLabs SRT, no progress bar | none | amount -> period -> subscription checks | all three checks visible | close hit | 1:42 | implemented |

## Review Notes

- [x] Rebuilt exact ranges after ElevenLabs SRT.
- [x] Do not add caption progress bars.
- [x] Keep capture scenes half-side or larger.
- [x] Reveal one explanation unit at a time.
