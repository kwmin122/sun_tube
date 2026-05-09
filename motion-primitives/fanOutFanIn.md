# fanOutFanIn

## Purpose

Show one lead node distributing work to multiple lanes and merging the results.

## Use When

- Explaining multiagent orchestration, parallel analysis, sharded logs, review lanes, or team workflows.

## Avoid When

- The scene has only one linear flow.
- There is no final merge or decision.

## Hyperframes/GSAP Notes

- Use scene-local timeline windows: split, lane work, merge.
- Give each lane a distinct role and visual action.

## Remotion Notes

- Use `spring` for split and merge states.
- Use path progress per lane.

## Required Metadata

```html
<section data-recipe="explain/fan-out-fan-in">
```

## QA Checks

- fan-out and fan-in both appear.
- lane roles differ.
- merge output is visible.

## Failure Examples

- Four identical cards appear with no route motion.
