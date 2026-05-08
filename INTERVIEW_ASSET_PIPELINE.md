# Interview / Quote Asset Pipeline

Use this when a video needs external interviews, talks, panels, podcasts, or public statements as one kind of evidence.

This is not the master video structure. The master structure lives in `CONTENT_FACTORY_PIPELINE.md`.

MVP note: use this as a production guide for finding and preparing interview/quote material. Rights, privacy, citation, quote-accuracy, and missing-source review are out of scope unless the user explicitly re-enables the deferred `hype-source-editor` role.

## Goal

The goal is not "download a random interview." The goal is:

```text
claim -> why it matters -> relevant speaker quote -> Korean subtitle -> visual interpretation
```

One reference-specific pattern from `references/dalbi-example-2/` is:

```text
source clip -> short editorial setup -> b-roll or diagram -> counter quote -> accent-highlighted takeaway
```

Treat that as one recipe for rebuttal/commentary videos. Do not force it onto tutorials, product explainers, repo explainers, demos, or data stories.

## When To Use An Interview

Use an interview only when it does one of these jobs:

- `authority`: a founder, maintainer, researcher, executive, or directly involved person explains the point.
- `contrast`: one person says an extreme thing and another source pushes back.
- `proof of narrative`: the quote shows that the issue is being publicly discussed.
- `emotional grounding`: the quote gives a human voice to an otherwise abstract technical point.

Do not use an interview when a README, spec, issue, or official docs screenshot is more direct.

## Research And Source Collection

For each candidate clip, capture useful production details in `research-pack.md` or `asset-plan.md`:

| Field | Required |
|---|---|
| Speaker | yes |
| Role / relevance | yes |
| Original URL | yes |
| Published date | yes, if available |
| Exact quote | yes |
| Timestamp range | yes |
| Why this quote is used | yes |
| Downloaded file path | yes, after download |

Preferred source order:

1. Official conference/talk channel
2. Official company, project, or maintainer channel
3. Public podcast/interview page with transcript
4. Public news interview
5. User-provided clip

Avoid reuploaded clips when the original is findable.

## Download And Processing

Store originals under:

```text
assets/interviews/originals/
```

Store processed clips under:

```text
assets/interviews/processed/
```

Recommended processing:

1. Trim to the one useful quote, usually `2-8s`.
2. Keep the source context visible: speaker, stage, video player UI, or event backdrop.
3. Normalize loudness if the clip audio is used.
4. Add Korean subtitles before composition.
5. Export an edit-ready version:

```text
assets/interviews/processed/{scene}-{speaker}-{slug}.mp4
assets/interviews/processed/{scene}-{speaker}-{slug}.srt
assets/interviews/processed/{scene}-{speaker}-{slug}.jpg
```

If the final narration should remain dominant, use the interview as silent visual evidence with burned Korean quote text.

## Subtitle Style

Default interview subtitle stack:

- Source-language subtitle: small white, close to the interview frame
- Korean translation: larger white, below source subtitle
- Key quote: Korean project-accent color, black box if readability needs it, only for the one memorable line

The Dalbi reference often uses yellow. Our videos should use whatever accent color is defined in `design-context.md`.

Do not cover the final YouTube bottom caption area. In 1920x1080, keep interview subtitle stacks above the bottom caption band when the global caption is active.

## Hyperframes Scene Contract

Each interview scene in `plan.md` must include:

| Field | Meaning |
|---|---|
| Time range | where it appears |
| Source quote | exact quote or paraphrase |
| Speaker | name and role |
| Clip path | processed asset path |
| Caption behavior | source subtitle / Korean translation / accent quote |
| Motion | crop push, hold, cutaway, or split-screen |
| Setup | what claim appears before the quote |
| Payoff | what the quote proves |

## Motion Rules

- Interview enters with a hard cut or quick scale-in, not a decorative transition.
- Use slow crop push only when the speaker lands a key phrase.
- Use b-roll, screenshots, diagrams, or data cutaways only when they clarify the quote.
- Do not animate the quote text more loudly than the speaker clip.
- Hold the key quote for at least `0.7s` after the spoken phrase.

## Verification

Before final render:

- [ ] Source URL is logged.
- [ ] Timestamp range is logged.
- [ ] Clip is trimmed.
- [ ] Korean subtitle is burned or synced.
- [ ] Caption safe zone is checked.
- [ ] Speaker/role is clear enough for viewer trust.
- [ ] The quote directly supports the narration beat.
