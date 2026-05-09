import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";

const accent = "#f2ad6d";
const teal = "#57d5c5";
const cream = "#fffaf0";
const panel = "rgba(255,255,255,.065)";

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function Card({ title, label, children, active = false, style = {} }) {
  return (
    <div style={{
      borderRadius: 26,
      border: `1px solid ${active ? "rgba(242,173,109,.72)" : "rgba(255,255,255,.15)"}`,
      background: active ? "linear-gradient(135deg, rgba(242,173,109,.17), rgba(87,213,197,.08))" : panel,
      boxShadow: active ? "0 0 70px rgba(242,173,109,.16), inset 0 1px 0 rgba(255,255,255,.18)" : "inset 0 1px 0 rgba(255,255,255,.10)",
      padding: 30,
      ...style
    }}>
      {label ? <div style={{ color: active ? teal : "rgba(255,255,255,.5)", fontSize: 23, fontWeight: 900 }}>{label}</div> : null}
      <div style={{ color: cream, fontSize: 42, fontWeight: 930, lineHeight: 1.12, marginTop: label ? 12 : 0 }}>{title}</div>
      {children}
    </div>
  );
}

function Pill({ children, active = false }) {
  return (
    <div style={{
      padding: "12px 22px",
      borderRadius: 999,
      color: active ? "#06100f" : cream,
      background: active ? teal : "rgba(87,213,197,.12)",
      border: "1px solid rgba(87,213,197,.36)",
      fontSize: 26,
      fontWeight: 850
    }}>{children}</div>
  );
}

export function BeforeAfter({ scene, progress }) {
  const split = spring({ frame: progress * 120 - 14, fps: 30, config: { damping: 18, stiffness: 120 } });
  const afterActive = progress > 0.48;
  return (
    <div style={{ position: "absolute", left: 92, right: 92, top: 318, bottom: 168 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, height: "100%" }}>
        <Card title="똑똑한 답변" label="Before" active={!afterActive} style={{ transform: `translateX(${-20 + split * 20}px)` }}>
          <div style={{ marginTop: 38, display: "grid", gap: 18 }}>
            {["단발성 대화", "세션 종료", "다음 요청에서 맥락 손실"].map((item) => <Pill key={item}>{item}</Pill>)}
          </div>
        </Card>
        <Card title="운영 시스템" label="After" active={afterActive} style={{ transform: `translateX(${28 - split * 28}px)` }}>
          <div style={{ marginTop: 38, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {scene.items.map((item, index) => <Pill key={item} active={progress > 0.24 + index * 0.13}>{item}</Pill>)}
          </div>
        </Card>
      </div>
      <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)", width: 160, height: 160, borderRadius: 99, border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.36)", display: "grid", placeItems: "center", color: accent, fontSize: 34, fontWeight: 950 }}>
        {afterActive ? "SYSTEM" : "MODEL"}
      </div>
    </div>
  );
}

export function RubricLoop({ scene, progress }) {
  const steps = ["기준", "채점", "수정", "재검수"];
  const active = Math.min(3, Math.floor(progress * 4.2));
  const loop = 360 * clamp((progress - 0.1) / 0.78);
  return (
    <div style={{ position: "absolute", left: 96, right: 96, top: 315, bottom: 170 }}>
      <div style={{ position: "absolute", inset: "40px 140px", borderRadius: 999, border: "3px solid rgba(242,173,109,.30)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 640, height: 300, transform: `translate(-50%, -50%) rotate(${loop}deg)`, borderTop: `8px solid ${accent}`, borderBottom: `8px solid ${accent}`, borderRadius: "50%" }} />
      {steps.map((step, index) => {
        const positions = [[70, 75], [55, 56], [73, 26], [28, 47]][index];
        return (
          <Card key={step} title={step} label={`0${index + 1}`} active={index === active} style={{ position: "absolute", left: `${positions[0]}%`, top: `${positions[1]}%`, transform: "translate(-50%, -50%)", width: 315, textAlign: "center" }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: 650, color: "rgba(255,250,240,.78)", fontSize: 34, lineHeight: 1.35, fontWeight: 780 }}>{scene.description}</div>
    </div>
  );
}

export function FanOutFanIn({ scene, progress }) {
  const lanes = scene.items;
  const split = clamp((progress - 0.10) / 0.30);
  const merge = clamp((progress - 0.56) / 0.28);
  return (
    <div style={{ position: "absolute", left: 82, right: 82, top: 322, bottom: 244 }}>
      <Card title="리드 에이전트" label="PLAN" active style={{ position: "absolute", left: 0, top: 90, width: 330, height: 150 }} />
      <Card title="통합 판단" label="MERGE" active={merge > 0.3} style={{ position: "absolute", right: 0, top: 90, width: 330, height: 150 }} />
      <svg style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {lanes.map((_, index) => {
          const y = 48 + index * 124;
          const xLead = 330;
          const xWorker = 502;
          const xWorkerEnd = 1395;
          const xMerge = 1538;
          const visible = clamp(split * 1.2 - index * 0.11);
          const back = clamp(merge * 1.2 - (lanes.length - index) * 0.07);
          return (
            <g key={index}>
              <path d={`M${xLead} ${y} C ${xLead + 60} ${y}, ${xWorker - 70} ${y}, ${xWorker} ${y}`} stroke="rgba(242,173,109,.72)" strokeWidth="5" fill="none" strokeDasharray={`${visible * 210} 210`} />
              <path d={`M${xWorkerEnd} ${y} C ${xWorkerEnd + 60} ${y}, ${xMerge - 80} ${y}, ${xMerge} ${y}`} stroke="rgba(87,213,197,.72)" strokeWidth="5" fill="none" strokeDasharray={`${back * 210} 210`} />
              <circle cx={xLead + visible * (xWorker - xLead)} cy={y} r="12" fill={accent} opacity={visible} />
              <circle cx={xWorkerEnd + back * (xMerge - xWorkerEnd)} cy={y} r="12" fill={teal} opacity={back} />
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: 500, right: 500, display: "grid", gridTemplateRows: `repeat(${lanes.length}, 108px)`, gap: 16 }}>
        {lanes.map((lane, index) => (
          <Card key={lane} title={lane} label={["Log", "Docs", "Code", "Merge"][index] || "Task"} active={progress > 0.18 + index * 0.08} style={{ minHeight: 108, padding: 22 }}>
            <div style={{ marginTop: 14, height: 6, borderRadius: 99, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
              <div style={{ width: `${clamp((progress - 0.22 - index * 0.06) / 0.34) * 100}%`, height: "100%", background: index % 2 ? teal : accent }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FlowPipeline({ scene, progress }) {
  const steps = scene.items.slice(0, 4);
  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));
  const railProgress = clamp((progress - 0.08) / 0.78);
  return (
    <div style={{ position: "absolute", left: 72, right: 72, top: 328, bottom: 172 }}>
      <svg style={{ position: "absolute", left: 128, right: 128, top: 74, width: "calc(100% - 256px)", height: 80, overflow: "visible" }}>
        <path d="M0 36 L1700 36" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="8" strokeLinecap="round" />
        <path d="M0 36 L1700 36" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${railProgress * 1700} 1700`} />
        {[0, 0.333, 0.666, 1].map((x, index) => (
          <circle key={index} cx={x * 1700} cy="36" r={index <= active ? 18 : 10} fill={index <= active ? teal : "rgba(255,255,255,.20)"} />
        ))}
        <circle cx={railProgress * 1700} cy="36" r="21" fill={teal} opacity=".92" />
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 28, marginTop: 180 }}>
        {steps.map((step, index) => (
          <Card key={step} title={step} label={["Event", "Queue", "Trigger", "Action"][index] || "Step"} active={index === active}>
            <div style={{ marginTop: 30, display: "grid", gap: 12 }}>
              {["감지", "상태 변경", "후속 처리"].map((item, n) => <Pill key={item} active={progress > 0.20 + index * 0.14 + n * 0.04}>{item}</Pill>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SourceZoom({ scene, progress }) {
  const capture = scene.id === "12" ? "scene-12-capture-4.png" : scene.id === "03" ? "scene-03-capture-3.png" : "scene-01-capture-2.png";
  const zoom = 1 + clamp((progress - 0.18) / 0.5) * 0.12;
  return (
    <div style={{ position: "absolute", left: 90, right: 90, top: 312, bottom: 160, display: "grid", gridTemplateColumns: "1.04fr .96fr", gap: 34 }}>
      <div style={{ borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.11)" }}>
        <Img src={staticFile(`captures/${capture}`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, filter: "saturate(.92) contrast(1.04) brightness(.88)" }} />
        <div style={{ position: "absolute", left: 150, top: 155, width: 420, height: 92, border: `6px solid ${accent}`, borderRadius: 18, opacity: clamp((progress - 0.3) / 0.22), boxShadow: "0 0 42px rgba(242,173,109,.36)" }} />
      </div>
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        {scene.items.map((item, index) => <Card key={item} title={item} label={`SOURCE 0${index + 1}`} active={progress > 0.18 + index * 0.11} />)}
      </div>
    </div>
  );
}
