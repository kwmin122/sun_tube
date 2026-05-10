# Scene Contract System

Scene contracts stop implementers from filling unclear scenes with generic cards, fades, dots, connector lines, or glass panels.

## Why This Exists

The repeated failure mode was not only weak design taste. The production system allowed scenes to move from planning to implementation with vague labels such as `card reveal`, `path draw`, `liquid glass`, or `motion layer`.

When a scene is under-specified, the implementer guesses. Those guesses often become:

- decorative cards
- generic fade/stagger
- random dots or chips
- unanchored connector lines
- broad glass panels
- generic fallback components

The fix is to make the scene contract the implementation authority.

## Pipeline Position

```text
timed-scene-packets.md
-> scene-contracts.md
-> factory:validate-scene-contract
-> implementation
-> factory:review-video
-> director-review
```

`asset-plan.md` is the material plan.
`design-context.md` is the visual system.
`scene-contracts.md` is the per-scene implementation contract.

## Required Fields

Every scene must define:

- Narration Clause
- Primary Screen Object
- Viewer Must Understand
- Allowed Visual Elements
- Forbidden Fillers
- Motion Beats
- Required State Change
- Hold Rule
- Exit Rule
- Implementation Markers
- Evidence Frame Requirement
- Fallback Policy
- Generic Component Ban
- If Missing, Do Not

## Implementation Rule

If a scene is missing a required field, the implementer must stop and return it to planning.

Do not replace a missing primary object with cards, decorative paths, glass panels, dots, chips, generic progress bars, or generic fallback components.

## QA Rule

Pre-render QA must fail when:

- `scene-contracts.md` is missing
- required contract fields are empty
- the contract does not define implementation markers
- the implementation lacks required `data-*` markers
- generic fallback components appear without explicit permission
- forbidden filler classes appear in the implementation
- the evidence frame cannot prove the primary screen object exists

## Command

```bash
npm run factory:validate-scene-contract -- <project-path>
npm run factory:validate-scene-contract -- <project-path> -- --check-implementation
```

Use the first command before implementation. Use `--check-implementation` during pre-render QA.
