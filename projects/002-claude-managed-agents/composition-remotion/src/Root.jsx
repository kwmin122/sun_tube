import React from "react";
import { AbsoluteFill, Audio, Composition, Sequence, staticFile } from "remotion";
import { FPS, HEIGHT, WIDTH, captions, scenes } from "./generated/data.js";
import { SceneFrame } from "./scenes/SceneFrame.jsx";
import { CaptionLayer } from "./scenes/CaptionLayer.jsx";

const totalFrames = Math.ceil(Math.max(...scenes.map((scene) => scene.end)) * FPS);

export function ClaudeManagedAgents() {
  return (
    <AbsoluteFill style={{ background: "#050705", fontFamily: "Pretendard, Inter, Arial, sans-serif" }}>
      <Audio src={staticFile("audio/voiceover-solo-final-mix.m4a")} />
      {scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={Math.round(scene.start * FPS)}
          durationInFrames={Math.max(1, Math.round(scene.duration * FPS))}
        >
          <SceneFrame scene={scene} fps={FPS} />
        </Sequence>
      ))}
      <CaptionLayer captions={captions} fps={FPS} />
    </AbsoluteFill>
  );
}

export function RemotionRoot() {
  return (
    <Composition
      id="ClaudeManagedAgents"
      component={ClaudeManagedAgents}
      durationInFrames={totalFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
}
