# rubricLoop

## Purpose

Show criteria, scoring, feedback, revision, and re-check as a loop.

## Use When

- Explaining outcomes, graders, quality gates, rubric checks, or review loops.

## Avoid When

- The scene only lists criteria without evaluation.

## Hyperframes/GSAP Notes

- Animate criteria first, then score, then return path to revision.

## Remotion Notes

- Use staged `Sequence` blocks: criteria, judge, revise, retry.

## Required Metadata

```html
<section data-primitive="rubricLoop" data-loop-stages="criteria,score,revise,retry">
```

## QA Checks

- The loop includes at least three stages.
- The revision path returns visibly.
- The final state differs from initial state.

## Failure Examples

- A single checklist with no scoring or retry motion.
