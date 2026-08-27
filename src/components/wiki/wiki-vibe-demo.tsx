"use client";

// React 示意图引擎：为 course 来源的词条渲染 VibeHub 风格的可视化 demo。
// 五种原语（steps/compare/bars/curve/gauge），逐词配置见 src/content/vibe-demos.ts。
import { DEMOS, type DemoConfig } from "@/content/vibe-demos";

const TONE: Record<string, string> = {
  good: "vd-good",
  bad: "vd-bad",
  warn: "vd-warn",
};

function Steps({ d }: { d: Extract<DemoConfig, { kind: "steps" }> }) {
  return (
    <span className="vd-steps">
      {d.items.map((it, i) => (
        <span key={i} className="vd-step-wrap">
          <span className={`vd-step${it.hot ? " hot" : ""}${it.gate ? " gate" : ""}`}>
            {it.gate ? <span className="vd-gate-mark">✋</span> : null}
            <b>{it.t}</b>
            {it.s ? <i>{it.s}</i> : null}
          </span>
          {i < d.items.length - 1 ? <span className="vd-arrow">→</span> : null}
        </span>
      ))}
      {d.loop ? <span className="vd-loopback">↻</span> : null}
    </span>
  );
}

function Compare({ d }: { d: Extract<DemoConfig, { kind: "compare" }> }) {
  return (
    <span className="vd-compare" style={{ gridTemplateColumns: `repeat(${d.cols.length}, 1fr)` }}>
      {d.cols.map((c, i) => (
        <span key={i} className={`vd-col ${c.tone ? TONE[c.tone] : ""}`}>
          <b>{c.title}</b>
          {c.items.map((it, j) => (
            <span key={j}>{it}</span>
          ))}
        </span>
      ))}
    </span>
  );
}

function Bars({ d }: { d: Extract<DemoConfig, { kind: "bars" }> }) {
  return (
    <span className="vd-bars">
      {d.rows.map((r, i) => (
        <span key={i} className="vd-bar-row">
          <span className="vd-bar-label">{r.label}</span>
          <span className="vd-bar-track">
            <span
              className={`vd-bar-fill ${r.tone ? TONE[r.tone] : ""}`}
              style={{ width: `${Math.max(2, Math.min(100, r.v))}%` }}
            />
          </span>
          {r.text ? <span className="vd-bar-text">{r.text}</span> : null}
        </span>
      ))}
    </span>
  );
}

const CURVE_PATHS: Record<string, string> = {
  // viewBox 0 0 220 80, origin bottom-left (x:10→210, y:70→8)
  const: "M10,62 L210,62",
  log: "M10,68 C50,46 90,40 210,32",
  lin: "M10,70 L210,18",
  quad: "M10,70 Q140,66 190,10 L196,4",
};

function Curve({ d }: { d: Extract<DemoConfig, { kind: "curve" }> }) {
  return (
    <span className="vd-curve">
      <svg viewBox="0 0 220 80" aria-hidden="true">
        <line x1="10" y1="72" x2="210" y2="72" className="vd-axis" />
        <line x1="10" y1="72" x2="10" y2="6" className="vd-axis" />
        {d.lines.map((l, i) => (
          <path key={i} d={CURVE_PATHS[l.fn]} className={`vd-line${l.hot ? " hot" : ""}`} />
        ))}
      </svg>
      <span className="vd-curve-legend">
        {d.lines.map((l, i) => (
          <span key={i} className={l.hot ? "hot" : ""}>
            {l.label}
          </span>
        ))}
      </span>
    </span>
  );
}

function Gauge({ d }: { d: Extract<DemoConfig, { kind: "gauge" }> }) {
  const pass = d.value >= d.threshold;
  return (
    <span className="vd-gauge">
      <span className="vd-gauge-head">
        <span>{d.label}</span>
        <b className={pass ? "vd-pass" : "vd-fail"}>
          {d.value}%{pass ? " ✓" : " ✗"}
        </b>
      </span>
      <span className="vd-gauge-track">
        <span className={`vd-gauge-fill ${pass ? "vd-good" : "vd-bad"}`} style={{ width: `${d.value}%` }} />
        <span className="vd-gauge-mark" style={{ left: `${d.threshold}%` }} />
      </span>
      <span className="vd-gauge-foot">阈值 {d.threshold}%</span>
    </span>
  );
}

export default function VibeDemo({ id }: { id: string }) {
  const d = DEMOS[id];
  if (!d) return null;
  return (
    <span className="vd-panel" aria-hidden="true">
      {d.kind === "steps" ? (
        <Steps d={d} />
      ) : d.kind === "compare" ? (
        <Compare d={d} />
      ) : d.kind === "bars" ? (
        <Bars d={d} />
      ) : d.kind === "curve" ? (
        <Curve d={d} />
      ) : (
        <Gauge d={d} />
      )}
      {"note" in d && d.note ? <span className="vd-note">{d.note}</span> : null}
    </span>
  );
}
