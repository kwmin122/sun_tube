# explain/fan-out-fan-in

## Use When

- Explaining role split, parallel work, multiagent orchestration, task routing, or merge decisions.

## Primary Routes

- `hyperframes`
- `remotion`

## Secondary Routes

- `capture` for product/docs proof.
- `imagegen` as support only when the scene needs atmosphere.

## Required Primitives

- `fanOutFanIn`
- `packetFlow`
- `anchoredPath`

## Motion Beats

1. Lead node appears with a clear responsibility.
2. Task packets split outward into role lanes.
3. Each lane performs a distinct action.
4. Results converge back into a merge node.
5. Merge node outputs one next action.

## Renderer Notes

- Hyperframes: use a scene-local GSAP timeline. Do not drive this with the global all-scene fade.
- Remotion: use scene-local frame math, `spring`, and path progress per packet.

## QA Fail If

- Cards appear without packet movement.
- The fan-out and fan-in are not both visible.
- Connector lines cross text or do not attach to nodes.
- All worker cards have identical animation and no different role.

## Example Scenes

- Project 002 scenes 07-08.
