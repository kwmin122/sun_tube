# packetFlow

## Purpose

Show data, work, event, or decision packets moving through a system.

## Use When

- Narration says route, send, trigger, split, merge, pass, or flow.

## Avoid When

- The packet has no semantic label.
- Movement distracts from reading.

## Hyperframes/GSAP Notes

- Move tokens along anchored paths or lane rails.
- Keep packets short-lived and labeled.

## Remotion Notes

- Drive packet progress from local frame interpolation.
- Add motion blur only for fast camera/packet movement.

## Required Metadata

```html
<span data-packet data-packet-role="event">event.created</span>
```

## QA Checks

- packet has visible start and end.
- packet label matches the narration beat.
- packet does not enter caption safe zone.

## Failure Examples

- Random glowing dots without semantic label.
