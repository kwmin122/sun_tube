# Dalbi Example 2 Reference Analysis

Source file: `/Users/a0000/Downloads/달비예시2.mov`
Analyzed date: 2026-05-08

## Technical Pass

- Duration: `36.926667s`
- Resolution: `2124x1202`
- Video codec: `h264`
- Average frame rate: about `47.08fps`
- Source frames: `1739`
- Audio stream: none detected in the file

Generated analysis assets:

- `frames-all-lowres/`: all `1739` frames, scaled to 320px width
- `frames-2fps/`: `74` review frames
- `sheets/contact-1fps.jpg`: whole clip contact sheet
- `sheets/contact-2fps.jpg`: denser whole clip contact sheet
- `keyframes/`: larger representative stills
- `scene-cuts/scene-detect.log`: ffmpeg scene detection log
- `scene-cuts/scene-times.txt`: extracted scene timestamps

## What This Reference Is Doing

This is not a pure motion-graphics sequence. It is an evidence chain built from clips.

This chain is a reference-specific pattern, not a universal template:

```text
source interview -> editorial label -> quote clip -> metaphor b-roll -> counter-interview -> highlighted quote -> takeaway
```

The key lesson is that the interview is not used as filler. It is used as a credibility beat, then cut against commentary and metaphor footage so the viewer understands why the quote matters.

## Shot Map

| Time | Visual | Function | Notes |
|---|---|---|---|
| 0.0-1.5 | Embedded video player / street interview frame | raw-source entry | Keeps player UI visible, making it feel like a found source. |
| 1.5-3.0 | Notice-wall image with Korean caption | editorial setup | Caption says the interview is being targeted/criticized. |
| 3.0-4.5 | CEO talking head, small centered frame on black | source quote | Speaker label `(CEO)` appears above the face. Minimal motion. |
| 4.5-7.0 | Protest / student b-roll | consequence metaphor | Yellow Korean caption turns the quote into a concrete fear. |
| 7.0-8.0 | CEO talking head again | ridicule beat | Parenthetical meme-like text reframes the speaker. |
| 8.0-9.0 | Black-and-white wave | emotional bridge | Converts claim into "panic/doom" imagery. |
| 9.0-10.5 | Audience hand raised | setup for response | Prepares the counter-interview. |
| 10.5-18.0 | Two-person interview stage, wide shot | counter-evidence | English source subtitle plus Korean explanation line. |
| 18.0-21.0 | Same interview, quote held | punch quote | Important Korean quote is yellow. |
| 21.0-24.0 | Tighter speaker crop | intensity | Crop changes while source remains continuous. |
| 24.0-34.0 | Same interview, continued quote | authority hold | Lets a credible person speak long enough to land. |
| 34.0-36.9 | Final interview line about jobs | corrective conclusion | Ends with a factual counterpoint instead of animation. |

## Interview Design Pattern

1. Use the original interview clip only after the narration has created a question.
2. Keep the source visually identifiable: stage, speaker, event backdrop, YouTube/player UI, or source label.
3. Add two subtitle layers when needed:
   - source-language subtitle near the clip
   - Korean meaning/interpretation under it
4. Use white Korean text for ordinary translation.
5. Use yellow Korean text only for the quote that the viewer should remember.
6. Change crop, not layout, during a long interview excerpt:
   - wide two-person shot for context
   - speaker crop for the punch line
   - hold frame long enough for reading
7. Cut away to b-roll before or after the quote when the abstract claim needs emotional grounding.

## Caption And Layout Rules From This Clip

- Interview clip is usually centered with black surrounding space, not stretched full-screen.
- Captions sit in the bottom third but leave enough room below the clip.
- Important quote text uses black box + yellow type.
- Source captions and Korean captions do not overlap each other.
- Long interview holds are acceptable if the quote itself is the evidence.

## What To Copy

- Use interviews as proof, rebuttal, or authority, not decoration.
- Put the interview after the claim, not before the viewer knows why it matters.
- Burn subtitles into processed interview clips before importing them into Hyperframes.
- Highlight one quote per interview beat.
- Alternate interview with screenshots, b-roll, or diagrams so the video does not become a lecture recording.

## What Not To Copy Blindly

- Do not use a full interview segment if only one sentence matters.
- Do not stack Korean captions over our final bottom subtitles.
- Do not use third-party clips without source and rights/risk notes.
- Do not rely on a quote if the topic needs primary docs or code evidence instead.
