import React from "react";
import { Img, interpolate, staticFile } from "remotion";

const accent = "#f2ad6d";
const teal = "#57d5c5";
const cream = "#fffaf0";
const muted = "rgba(255,250,240,.68)";
const panel = "rgba(255,255,255,.065)";

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function span(progress, start, end) {
  return clamp((progress - start) / Math.max(0.001, end - start));
}

function fade(progress, start, end) {
  return interpolate(span(progress, start, end), [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

function Panel({ children, active = false, style = {} }) {
  return (
    <div style={{
      borderRadius: 26,
      border: `1px solid ${active ? "rgba(242,173,109,.74)" : "rgba(255,255,255,.14)"}`,
      background: active ? "linear-gradient(135deg, rgba(242,173,109,.16), rgba(87,213,197,.08))" : panel,
      boxShadow: active ? "0 0 70px rgba(242,173,109,.14), inset 0 1px 0 rgba(255,255,255,.16)" : "inset 0 1px 0 rgba(255,255,255,.10)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children, color = teal }) {
  return <div style={{ color, fontSize: 23, fontWeight: 900, letterSpacing: 0 }}>{children}</div>;
}

function Title({ children, size = 42 }) {
  return <div style={{ color: cream, fontSize: size, lineHeight: 1.12, fontWeight: 930, letterSpacing: 0 }}>{children}</div>;
}

function Body({ children, style = {} }) {
  return <div style={{ position: "absolute", left: 86, right: 86, top: 300, bottom: 168, ...style }}>{children}</div>;
}

function Chip({ children, active = false, style = {} }) {
  return (
    <div style={{
      padding: "13px 20px",
      borderRadius: 999,
      border: `1px solid ${active ? "rgba(87,213,197,.74)" : "rgba(255,255,255,.16)"}`,
      background: active ? "rgba(87,213,197,.20)" : "rgba(255,255,255,.07)",
      color: active ? cream : muted,
      fontSize: 25,
      fontWeight: 850,
      whiteSpace: "nowrap",
      ...style,
    }}>{children}</div>
  );
}

function ProgressBar({ progress, color = accent }) {
  return (
    <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,.09)", overflow: "hidden" }}>
      <div style={{ width: `${clamp(progress) * 100}%`, height: "100%", background: color }} />
    </div>
  );
}

function MiniRows({ rows, progress, start = 0.2 }) {
  return (
    <div style={{ display: "grid", gap: 13 }}>
      {rows.map((row, index) => {
        const p = fade(progress, start + index * 0.08, start + 0.18 + index * 0.08);
        return (
          <div key={row} style={{
            opacity: p,
            transform: `translateX(${(1 - p) * -24}px)`,
            padding: "15px 18px",
            borderRadius: 15,
            background: "rgba(255,255,255,.08)",
            color: cream,
            fontSize: 27,
            lineHeight: 1.2,
            fontWeight: 760,
          }}>{row}</div>
        );
      })}
    </div>
  );
}

function CaptureFrame({ src, progress, label, highlight = "default" }) {
  const zoom = 1 + span(progress, 0.16, 0.78) * 0.12;
  const highlightOpacity = fade(progress, 0.42, 0.58);
  const h = {
    default: { left: "15%", top: "18%", width: "48%", height: "18%" },
    middle: { left: "20%", top: "34%", width: "52%", height: "22%" },
    case: { left: "36%", top: "30%", width: "42%", height: "30%" },
  }[highlight];
  return (
    <Panel style={{ position: "relative", overflow: "hidden", minHeight: 510 }}>
      <Img src={staticFile(`captures/${src}`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, filter: "saturate(.88) contrast(1.08) brightness(.74)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.18), transparent 60%)" }} />
      <div style={{ position: "absolute", left: 28, top: 24 }}>
        <Label color={accent}>{label}</Label>
      </div>
      <div style={{ position: "absolute", ...h, opacity: highlightOpacity, border: `6px solid ${accent}`, borderRadius: 18, boxShadow: "0 0 46px rgba(242,173,109,.40)" }} />
    </Panel>
  );
}

function Arrow({ x1, y1, x2, y2, progress, color = accent }) {
  const visible = clamp(progress);
  return (
    <g opacity={0.28 + visible * 0.72}>
      <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * visible} y2={y1 + (y2 - y1) * visible} stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx={x1 + (x2 - x1) * visible} cy={y1 + (y2 - y1) * visible} r="12" fill={color} />
    </g>
  );
}

export function Scene01OperatingSystem({ scene, progress }) {
  const modules = [
    ["Dreaming", "세션 사이 학습", 300, 80],
    ["Outcome", "기준으로 채점", 1180, 80],
    ["Multi-agent", "작업 분배", 300, 455],
    ["Event triggers", "조건부 후속 작업", 1180, 455],
  ];
  const core = fade(progress, 0.28, 0.46);
  return (
    <Body>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {modules.map((module, index) => (
          <Arrow key={module[0]} x1={module[2] + 260} y1={module[3] + 82} x2={920} y2={330} progress={span(progress, 0.18 + index * 0.06, 0.46 + index * 0.06)} color={index % 2 ? teal : accent} />
        ))}
      </svg>
      <Panel active style={{ position: "absolute", left: "50%", top: "50%", zIndex: 2, width: 460, height: 250, transform: `translate(-50%, -50%) scale(${0.9 + core * 0.1})`, display: "grid", placeItems: "center", textAlign: "center", background: "rgba(7,10,8,.94)" }}>
        <div>
          <Label color={teal}>ONE OPERATING LOOP</Label>
          <Title size={48}>Managed Agents OS</Title>
          <div style={{ color: muted, fontSize: 27, lineHeight: 1.28, marginTop: 18, fontWeight: 760 }}>기억, 기준, 분업, 트리거가<br />하나의 작업 흐름으로 연결됩니다.</div>
        </div>
      </Panel>
      {modules.map((module, index) => {
        const p = fade(progress, 0.06 + index * 0.05, 0.22 + index * 0.05);
        return (
          <Panel key={module[0]} active={progress > 0.26 + index * 0.08} style={{ position: "absolute", left: module[2], top: module[3], width: 360, height: 170, padding: 26, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
            <Label color={index % 2 ? teal : accent}>0{index + 1}</Label>
            <Title size={42}>{module[0]}</Title>
            <div style={{ color: muted, fontSize: 25, fontWeight: 760, marginTop: 13 }}>{module[1]}</div>
          </Panel>
        );
      })}
    </Body>
  );
}

export function Scene02Reframe({ scene, progress }) {
  const shift = span(progress, 0.18, 0.62);
  return (
    <Body style={{ display: "grid", gridTemplateColumns: "0.9fr 1.25fr", gap: 34 }}>
      <Panel style={{ padding: 34, opacity: 0.48 + (1 - shift) * 0.52 }}>
        <Label color="rgba(255,255,255,.46)">OLD QUESTION</Label>
        <Title size={48}>더 똑똑한 챗봇?</Title>
        <MiniRows progress={progress} rows={["답변 생성", "세션 종료", "다음 요청에서 맥락 손실"]} />
      </Panel>
      <Panel active style={{ padding: 34, position: "relative", overflow: "hidden" }}>
        <Label color={teal}>NEW FRAME</Label>
        <Title size={54}>학습하고 검수하고<br />후속 작업까지 잇는 운영 시스템</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 34 }}>
          {scene.items.map((item, index) => <Chip key={item} active={progress > 0.28 + index * 0.1}>{item}</Chip>)}
        </div>
        <div style={{ marginTop: 36 }}>
          <ProgressBar progress={span(progress, 0.38, 0.78)} color={teal} />
        </div>
        <div style={{ color: muted, fontSize: 30, lineHeight: 1.32, fontWeight: 780, marginTop: 28 }}>{scene.description}</div>
      </Panel>
    </Body>
  );
}

export function Scene03DreamingEvidence({ scene, progress }) {
  return (
    <Body style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 32 }}>
      <CaptureFrame src="scene-03-capture-3.png" progress={progress} label="SOURCE ZOOM" highlight="middle" />
      <Panel active style={{ padding: 32 }}>
        <Label color={accent}>NOISE TO MEMORY</Label>
        <Title size={48}>과거 세션을 다시 훑고<br />쓸모 있는 패턴만 남깁니다.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 30 }}>
          {["반복 실수", "성공 워크플로", "팀 선호", "정리된 메모리"].map((item, index) => (
            <Panel key={item} active={progress > 0.2 + index * 0.12} style={{ padding: 22 }}>
              <Label color={index === 3 ? teal : accent}>0{index + 1}</Label>
              <Title size={34}>{item}</Title>
            </Panel>
          ))}
        </div>
      </Panel>
    </Body>
  );
}

export function Scene04MemoryContinuity({ scene, progress }) {
  const stages = ["어제의 판단", "오늘의 요청", "팀 규칙", "다음 세션"];
  return (
    <Body>
      <svg style={{ position: "absolute", inset: 0 }}>
        <path d="M150 260 C 520 80, 960 440, 1350 210 C 1500 120, 1650 165, 1790 260" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="8" strokeLinecap="round" />
        <path d="M150 260 C 520 80, 960 440, 1350 210 C 1500 120, 1650 165, 1790 260" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${span(progress, 0.12, 0.78) * 2050} 2050`} />
      </svg>
      {stages.map((stage, index) => (
        <Panel key={stage} active={progress > 0.18 + index * 0.14} style={{ position: "absolute", left: 120 + index * 430, top: index % 2 ? 360 : 115, width: 345, padding: 26 }}>
          <Label color={index === 3 ? teal : accent}>MEMORY 0{index + 1}</Label>
          <Title size={40}>{stage}</Title>
          <MiniRows progress={progress} start={0.25 + index * 0.08} rows={index === 0 ? ["결정 유지", "실패 맥락"] : index === 1 ? ["새 요청 연결", "반복 설명 제거"] : index === 2 ? ["톤 앤 매너", "검수 기준"] : ["컨텍스트 손실 감소", "바로 이어 작업"]} />
        </Panel>
      ))}
    </Body>
  );
}

export function Scene05OutcomeRubricSetup({ scene, progress }) {
  const cols = ["기준", "가중치", "통과선"];
  const rows = ["정확성", "톤", "완성도", "재작업 필요"];
  return (
    <Body style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 34 }}>
      <Panel style={{ padding: 34 }}>
        <Label color={accent}>BEFORE</Label>
        <Title size={50}>좋은 결과를<br />말로만 기대합니다.</Title>
        <MiniRows progress={progress} rows={["대충 맞음", "느낌상 괜찮음", "다시 고쳐봐"]} />
      </Panel>
      <Panel active style={{ padding: 34 }}>
        <Label color={teal}>OUTCOME RUBRIC</Label>
        <Title size={48}>좋은 결과의 기준표가 먼저 생깁니다.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 10, marginTop: 28 }}>
          {cols.map((col) => <Chip key={col} active>{col}</Chip>)}
          {rows.map((row, index) => (
            <React.Fragment key={row}>
              <Chip active={progress > 0.25 + index * 0.08}>{row}</Chip>
              <Chip active={progress > 0.34 + index * 0.08}>{index === 3 ? "blocker" : `${30 - index * 5}%`}</Chip>
              <Chip active={progress > 0.42 + index * 0.08}>{index === 3 ? "0개" : "PASS"}</Chip>
            </React.Fragment>
          ))}
        </div>
      </Panel>
    </Body>
  );
}

export function Scene06OutcomeRevisionLoop({ scene, progress }) {
  const active = Math.min(3, Math.floor(progress * 4.2));
  const nodes = [
    ["기준 작성", 150, 110],
    ["별도 모델 채점", 780, 280],
    ["수정 루프", 1260, 110],
    ["재검수", 760, 30],
  ];
  return (
    <Body>
      <svg style={{ position: "absolute", inset: 0 }}>
        <path d="M355 200 C 570 420, 980 455, 1260 220" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="9" strokeLinecap="round" />
        <path d="M1260 220 C 1040 -20, 550 -10, 355 200" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="9" strokeLinecap="round" />
        <path d="M355 200 C 570 420, 980 455, 1260 220" fill="none" stroke={accent} strokeWidth="9" strokeDasharray={`${span(progress, 0.12, 0.52) * 1050} 1050`} strokeLinecap="round" />
        <path d="M1260 220 C 1040 -20, 550 -10, 355 200" fill="none" stroke={teal} strokeWidth="9" strokeDasharray={`${span(progress, 0.46, 0.84) * 1050} 1050`} strokeLinecap="round" />
      </svg>
      {nodes.map((node, index) => (
        <Panel key={node[0]} active={index === active} style={{ position: "absolute", left: node[1], top: node[2], width: 390, padding: 30, textAlign: "center" }}>
          <Label color={index === active ? teal : accent}>STEP 0{index + 1}</Label>
          <Title size={42}>{node[0]}</Title>
        </Panel>
      ))}
      <Panel style={{ position: "absolute", left: 120, bottom: 20, right: 120, padding: 26, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {["문서 품질 검수", "지원 답변 톤 검사", "코드 리뷰 체크리스트"].map((item, index) => <Chip key={item} active={progress > 0.24 + index * 0.13}>{item}</Chip>)}
      </Panel>
    </Body>
  );
}

export function Scene07LeadAgentDelegation({ scene, progress }) {
  return <AgentNetwork scene={scene} progress={progress} mode="delegation" />;
}

export function Scene08FanOutFanIn({ scene, progress }) {
  return <AgentNetwork scene={scene} progress={progress} mode="parallel" />;
}

function AgentNetwork({ scene, progress, mode }) {
  const workers = mode === "parallel" ? ["빌드 로그", "문서 변경", "코드 경로", "통합 판단"] : ["로그 담당", "문서 담당", "코드 담당", "지원 담당"];
  return (
    <Body>
      <Panel active style={{ position: "absolute", left: 70, top: 190, width: 330, padding: 30, textAlign: "center" }}>
        <Label color={accent}>LEAD</Label>
        <Title size={42}>리드 에이전트</Title>
        <div style={{ color: muted, fontSize: 25, marginTop: 16, fontWeight: 760 }}>계획, 분배, 통합</div>
      </Panel>
      <Panel active={progress > 0.62} style={{ position: "absolute", right: 70, top: 190, width: 330, padding: 30, textAlign: "center" }}>
        <Label color={teal}>MERGE</Label>
        <Title size={42}>최종 판단</Title>
        <div style={{ color: muted, fontSize: 25, marginTop: 16, fontWeight: 760 }}>결과 합치기</div>
      </Panel>
      <svg style={{ position: "absolute", inset: 0 }}>
        {workers.map((_, index) => {
          const y = 75 + index * 118;
          const split = span(progress, 0.12 + index * 0.05, 0.40 + index * 0.05);
          const merge = span(progress, 0.50 + index * 0.04, 0.82 + index * 0.04);
          return (
            <g key={index}>
              <line x1="400" y1="275" x2={670 * split + 400 * (1 - split)} y2={y * split + 275 * (1 - split)} stroke={accent} strokeWidth="6" strokeLinecap="round" />
              <circle cx={400 + (670 - 400) * split} cy={275 + (y - 275) * split} r="12" fill={accent} opacity={split} />
              <line x1="1380" y1={y} x2={1645 * merge + 1380 * (1 - merge)} y2={275 * merge + y * (1 - merge)} stroke={teal} strokeWidth="6" strokeLinecap="round" />
              <circle cx={1380 + (1645 - 1380) * merge} cy={y + (275 - y) * merge} r="12" fill={teal} opacity={merge} />
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: 640, right: 520, top: 18, display: "grid", gap: 16 }}>
        {workers.map((worker, index) => (
          <Panel key={worker} active={progress > 0.2 + index * 0.08} style={{ padding: 22, minHeight: 98 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
              <Title size={36}>{worker}</Title>
              <Chip active>{mode === "parallel" ? ["분석", "정리", "구현", "병합"][index] : ["오류", "문서", "수정", "고객"][index]}</Chip>
            </div>
            <div style={{ marginTop: 15 }}>
              <ProgressBar progress={span(progress, 0.22 + index * 0.08, 0.62 + index * 0.08)} color={index % 2 ? teal : accent} />
            </div>
          </Panel>
        ))}
      </div>
    </Body>
  );
}

export function Scene09EventTriggerGate({ scene, progress }) {
  return <EventPipeline scene={scene} progress={progress} queue={false} />;
}

export function Scene10AutomationQueue({ scene, progress }) {
  return <EventPipeline scene={scene} progress={progress} queue />;
}

function EventPipeline({ scene, progress, queue }) {
  const steps = queue ? ["이벤트 수신", "큐 등록", "실행", "알림"] : ["문서 업로드", "조건 감지", "담당 에이전트", "후속 작업"];
  const active = Math.min(3, Math.floor(progress * 4.3));
  return (
    <Body>
      <svg style={{ position: "absolute", inset: 0 }}>
        <line x1="210" y1="170" x2="1710" y2="170" stroke="rgba(255,255,255,.13)" strokeWidth="10" strokeLinecap="round" />
        <line x1="210" y1="170" x2={210 + 1500 * span(progress, 0.10, 0.80)} y2="170" stroke={accent} strokeWidth="10" strokeLinecap="round" />
        {steps.map((_, index) => <circle key={index} cx={210 + index * 500} cy="170" r={index <= active ? 24 : 13} fill={index <= active ? teal : "rgba(255,255,255,.24)"} />)}
        <circle cx={210 + 1500 * span(progress, 0.10, 0.80)} cy="170" r="18" fill={teal} opacity=".95" />
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 58 }}>
        {steps.map((step, index) => (
          <Panel key={step} active={index === active} style={{ minHeight: 235, padding: 28 }}>
            <Label color={index === active ? teal : accent}>{queue ? "QUEUE" : "TRIGGER"} 0{index + 1}</Label>
            <Title size={42}>{step}</Title>
            <div style={{ marginTop: 52 }}><ProgressBar progress={span(progress, 0.16 + index * 0.09, 0.58 + index * 0.08)} color={index % 2 ? teal : accent} /></div>
          </Panel>
        ))}
      </div>
      <Panel active style={{ position: "absolute", left: 120, right: 120, bottom: 25, padding: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
          {(queue ? ["상태 기록", "재시도 가능", "완료 신호"] : ["조건 확인", "맥락 전달", "다음 작업 생성"]).map((item, index) => (
            <Chip key={item} active={progress > 0.28 + index * 0.14} style={{ textAlign: "center", fontSize: 30, padding: "20px 18px" }}>{item}</Chip>
          ))}
        </div>
      </Panel>
    </Body>
  );
}

export function Scene11SystemConvergence({ scene, progress }) {
  const axes = [["기억", "Dreaming"], ["기준", "Outcome"], ["분업", "Multi-agent"], ["트리거", "Events"]];
  return (
    <Body>
      <Panel active style={{ position: "absolute", left: "50%", top: "50%", width: 520, height: 250, transform: "translate(-50%, -50%)", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <Label color={teal}>CONVERGENCE</Label>
          <Title size={52}>Agent Operating System</Title>
        </div>
      </Panel>
      <svg style={{ position: "absolute", inset: 0 }}>
        {axes.map((_, index) => {
          const points = [[380, 80], [1390, 80], [380, 470], [1390, 470]][index];
          return <Arrow key={index} x1={points[0]} y1={points[1]} x2={960} y2={310} progress={span(progress, 0.12 + index * 0.08, 0.55 + index * 0.08)} color={index % 2 ? teal : accent} />;
        })}
      </svg>
      {axes.map((axis, index) => {
        const points = [[220, 35], [1260, 35], [220, 430], [1260, 430]][index];
        return (
          <Panel key={axis[0]} active={progress > 0.18 + index * 0.1} style={{ position: "absolute", left: points[0], top: points[1], width: 390, padding: 28 }}>
            <Label color={index % 2 ? teal : accent}>{axis[1]}</Label>
            <Title size={46}>{axis[0]}</Title>
          </Panel>
        );
      })}
    </Body>
  );
}

export function Scene12CaseEvidence({ scene, progress }) {
  return (
    <Body style={{ display: "grid", gridTemplateColumns: "1.02fr .98fr", gap: 32 }}>
      <CaptureFrame src="scene-12-capture-4.png" progress={progress} label="CASE EVIDENCE" highlight="case" />
      <Panel active style={{ padding: 32 }}>
        <Label color={accent}>REAL CASES</Label>
        <Title size={48}>사례는 모두 같은 방향입니다.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 28 }}>
          {scene.items.map((item, index) => (
            <Panel key={item} active={progress > 0.18 + index * 0.1} style={{ padding: 24 }}>
              <Label color={index % 2 ? teal : accent}>CASE 0{index + 1}</Label>
              <Title size={38}>{item}</Title>
              <div style={{ marginTop: 18 }}><ProgressBar progress={span(progress, 0.25 + index * 0.08, 0.72)} color={index % 2 ? teal : accent} /></div>
            </Panel>
          ))}
        </div>
      </Panel>
    </Body>
  );
}

export function Scene13FinalPayoff({ scene, progress }) {
  const oldQ = fade(progress, 0.06, 0.22) * (1 - fade(progress, 0.42, 0.56));
  const newQ = fade(progress, 0.48, 0.68);
  return (
    <Body>
      <Panel style={{ position: "absolute", left: 90, top: 70, width: 760, padding: 34, opacity: oldQ, transform: `translateY(${(1 - oldQ) * 30}px)` }}>
        <Label color="rgba(255,255,255,.48)">OLD QUESTION</Label>
        <Title size={62}>내 AI는 얼마나<br />똑똑한가?</Title>
      </Panel>
      <Panel active style={{ position: "absolute", right: 90, top: 70, width: 930, padding: 38, opacity: newQ, transform: `translateY(${(1 - newQ) * 30}px)` }}>
        <Label color={teal}>REAL QUESTION</Label>
        <Title size={62}>내 AI는 어떻게 배우고,<br />검수하고, 팀으로 일하는가?</Title>
      </Panel>
      <div style={{ position: "absolute", left: 150, right: 150, bottom: 80, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {["기억", "기준", "분업", "트리거"].map((item, index) => <Chip key={item} active={progress > 0.62 + index * 0.06} style={{ textAlign: "center", fontSize: 34, padding: "22px 20px" }}>{item}</Chip>)}
      </div>
    </Body>
  );
}

export function SceneFallback({ scene, progress }) {
  return (
    <Body style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
      {scene.items.map((item, index) => (
        <Panel key={item} active={progress > 0.18 + index * 0.12} style={{ padding: 28 }}>
          <Label color={index % 2 ? teal : accent}>0{index + 1}</Label>
          <Title size={42}>{item}</Title>
          <div style={{ marginTop: 32 }}><ProgressBar progress={span(progress, 0.25 + index * 0.08, 0.75)} color={index % 2 ? teal : accent} /></div>
        </Panel>
      ))}
    </Body>
  );
}
