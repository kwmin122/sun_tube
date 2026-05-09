import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  Scene01OperatingSystem,
  Scene02Reframe,
  Scene03DreamingEvidence,
  Scene04MemoryContinuity,
  Scene05OutcomeRubricSetup,
  Scene06OutcomeRevisionLoop,
  Scene07LeadAgentDelegation,
  Scene08FanOutFanIn,
  Scene09EventTriggerGate,
  Scene10AutomationQueue,
  Scene11SystemConvergence,
  Scene12CaseEvidence,
  Scene13FinalPayoff,
  SceneFallback,
} from "./V2Scenes.jsx";

const accent = "#f2ad6d";
const cream = "#fffaf0";

const sceneMap = {
  "01": Scene01OperatingSystem,
  "02": Scene02Reframe,
  "03": Scene03DreamingEvidence,
  "04": Scene04MemoryContinuity,
  "05": Scene05OutcomeRubricSetup,
  "06": Scene06OutcomeRevisionLoop,
  "07": Scene07LeadAgentDelegation,
  "08": Scene08FanOutFanIn,
  "09": Scene09EventTriggerGate,
  "10": Scene10AutomationQueue,
  "11": Scene11SystemConvergence,
  "12": Scene12CaseEvidence,
  "13": Scene13FinalPayoff,
};

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
      <div style={{ color: accent, fontSize: 34, fontWeight: 950, letterSpacing: 0, textTransform: "uppercase" }}>{scene.kicker}</div>
      <div style={{ marginTop: 10, maxWidth: 1540, color: cream, fontSize: scene.title.length > 34 ? 60 : 72, lineHeight: 1.06, fontWeight: 950, letterSpacing: 0 }}>{scene.title}</div>
    </div>
  );
}

export function SceneFrame({ scene, fps }) {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / Math.max(1, scene.duration * fps)));
  const SceneBody = sceneMap[scene.id] || SceneFallback;
  return (
    <AbsoluteFill>
      <Background scene={scene} />
      <Header scene={scene} progress={progress} />
      <SceneBody scene={scene} progress={progress} />
    </AbsoluteFill>
  );
}
