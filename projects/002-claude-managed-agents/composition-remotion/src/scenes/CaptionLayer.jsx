import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export function CaptionLayer({ captions, fps }) {
  const frame = useCurrentFrame();
  const seconds = frame / fps;
  const lead = 1.15;
  const active = captions.find((caption) => seconds >= caption.start - lead && seconds <= caption.end - 0.05);
  if (!active) return null;
  const local = seconds - (active.start - lead);
  const opacity = interpolate(local, [0, 0.16, Math.max(0.2, active.end - active.start)], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 68, pointerEvents: "none" }}>
      <div
        style={{
          maxWidth: 1700,
          padding: "20px 42px",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,.18)",
          background: "rgba(5,7,5,.76)",
          boxShadow: "0 28px 90px rgba(0,0,0,.54), inset 0 1px 0 rgba(255,255,255,.12)",
          color: "#fffdf4",
          fontSize: 45,
          fontWeight: 850,
          lineHeight: 1.22,
          textAlign: "center",
          opacity,
          transform: `translateY(${interpolate(opacity, [0, 1], [16, 0])}px)`
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
}
