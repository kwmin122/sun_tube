import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { BeforeAfter, FanOutFanIn, FlowPipeline, RubricLoop, SourceZoom } from "../primitives/MotionPrimitives.jsx";

const accent = "#f2ad6d";
const teal = "#57d5c5";
const cream = "#fffaf0";

function Background({ scene }) {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 25%, rgba(242,173,109,.13), transparent 30%), radial-gradient(circle at 15% 80%, rgba(87,213,197,.12), transparent 34%), #050705" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)", backgroundSize: "92px 92px" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(255,255,255,.05), transparent 20%, rgba(255,255,255,.04) 54%, transparent 74%)" }} />
      <div style={{ position: "absolute", right: 54, top: 46, color: "rgba(255,255,255,.38)", fontSize: 38, fontWeight: 900 }}>{scene.id}</div>
    </AbsoluteFill>
  );
}

function Header({ scene, progress }) {
  const slide = interpolate(progress, [0, 0.12], [-36, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 54, left: 68, right: 68, transform: `translateY(${slide}px)`, opacity: interpolate(progress, [0, 0.1], [0, 1], { extrapolateRight: "clamp" }) }}>
      <div style={{ color: accent, fontSize: 36, fontWeight: 950, letterSpacing: 0, textTransform: "uppercase" }}>{scene.kicker}</div>
      <div style={{ marginTop: 10, maxWidth: 1540, color: cream, fontSize: scene.title.length > 34 ? 66 : 76, lineHeight: 1.06, fontWeight: 950, letterSpacing: 0 }}>{scene.title}</div>
    </div>
  );
}

function SceneBody({ scene, progress }) {
  if (scene.id === "02") return <BeforeAfter scene={scene} progress={progress} />;
  if (["05", "06"].includes(scene.id)) return <RubricLoop scene={scene} progress={progress} />;
  if (["07", "08"].includes(scene.id)) return <FanOutFanIn scene={scene} progress={progress} />;
  if (["09", "10"].includes(scene.id)) return <FlowPipeline scene={scene} progress={progress} />;
  if (["03", "12"].includes(scene.id)) return <SourceZoom scene={scene} progress={progress} />;
  return <Synthesis scene={scene} progress={progress} />;
}

function Synthesis({ scene, progress }) {
  const items = scene.items || [];
  const focus = Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length)));
  return (
    <div style={{ position: "absolute", left: 86, right: 86, bottom: 175, top: 300, display: "grid", gridTemplateColumns: `repeat(${Math.min(4, items.length)}, 1fr)`, gap: 28 }}>
      {items.map((item, index) => {
        const p = spring({ frame: Math.max(0, progress * 180 - index * 10), fps: 30, config: { damping: 19, stiffness: 115 } });
        return (
          <div key={item} style={{
            borderRadius: 28,
            border: `1px solid ${index === focus ? "rgba(242,173,109,.72)" : "rgba(255,255,255,.14)"}`,
            background: index === focus ? "linear-gradient(135deg, rgba(242,173,109,.18), rgba(87,213,197,.08))" : "rgba(255,255,255,.055)",
            padding: 34,
            transform: `translateY(${(1 - p) * 40}px) scale(${0.96 + p * 0.04})`,
            opacity: 0.38 + p * 0.62,
            boxShadow: index === focus ? "0 0 60px rgba(242,173,109,.18), inset 0 1px 0 rgba(255,255,255,.16)" : "inset 0 1px 0 rgba(255,255,255,.10)"
          }}>
            <div style={{ color: index === focus ? accent : "rgba(255,255,255,.44)", fontSize: 24, fontWeight: 900 }}>0{index + 1}</div>
            <div style={{ color: cream, fontSize: 46, lineHeight: 1.15, fontWeight: 920, marginTop: 18 }}>{item}</div>
            <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,.09)", marginTop: 34, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, Math.max(0, (progress * items.length - index) * 100))}%`, height: "100%", background: index === focus ? teal : accent }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SceneFrame({ scene, fps }) {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / Math.max(1, scene.duration * fps)));
  return (
    <AbsoluteFill>
      <Background scene={scene} />
      <Header scene={scene} progress={progress} />
      <SceneBody scene={scene} progress={progress} />
    </AbsoluteFill>
  );
}
