"use client";

// Interactive engines part 1: the frontback diagram and the first two Brooks
// sims (communication network / add-people race), ported from the original.
import { useEffect, useMemo, useRef, useState } from "react";

// ---- 图解：前端 / 后端 / 数据库 请求流 ----
const BOXES = [
  { id: "front", name: "前端", x: 60, color: "#d9480f", fill: "#fef6ec", sub: "用户设备 · 不可信", desc: "跑在用户设备上：渲染界面、收集输入、做\"第一道体验提示\"。因为代码在用户手里，它说的话不能作数——一切真检查要后端再做。" },
  { id: "back", name: "后端", x: 300, color: "#2456a6", fill: "#e3ecf7", sub: "你的服务器 · 说了算", desc: "跑在你的服务器上：验证身份（认证）、检查权限（授权）、执行业务规则（算价、锁库存）。系统里唯一\"说了算\"的地方。" },
  { id: "db", name: "数据库", x: 540, color: "#2b8a3e", fill: "#e6f4ea", sub: "事实之家 · 不能丢", desc: "唯一的事实记录：订单、余额、状态都住在这里。后端是裁判，数据库是记分牌——记分牌不能丢，所以备份和表设计是全系统最不能出错的地方。" },
];
const FLOW_STEPS = [
  "用户在「提交订单」上点了一下…",
  "① 前端把输入打包成请求，发往后端（HTTP + API 契约）",
  "② 后端验明身份、检查权限、计算价格 —— 规则在这里说了算",
  "③ 数据库写入订单，成为唯一的事实记录",
  "④ 结果原路返回，前端渲染出\"下单成功\" —— 全程约 0.3 秒",
];
const DOT_POS: Record<number, { x: number; y: number } | null> = {
  0: null,
  1: { x: 210, y: 90 },
  2: { x: 450, y: 90 },
  3: { x: 450, y: 90 },
  4: { x: 210, y: 132 },
};

export function DiagramFrontback() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    if (running) return;
    setRunning(true);
    setOpen(null);
    setStep(1);
    [2, 3, 4].forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStep(s);
          if (s === 4) setRunning(false);
        }, (i + 1) * 1400),
      );
    });
  };
  const dot = DOT_POS[step];
  const opened = BOXES.find((b) => b.id === open);

  return (
    <div className="loop-diagram-panel">
      <svg viewBox="0 0 700 210" role="img" aria-label="前端、后端、数据库三层结构与请求流动动画">
        <line x1={200} y1={90} x2={300} y2={90} stroke="#c2cede" strokeWidth={2} />
        <line x1={440} y1={90} x2={540} y2={90} stroke="#c2cede" strokeWidth={2} />
        <line x1={200} y1={132} x2={300} y2={132} stroke="#c2cede" strokeWidth={2} strokeDasharray="4 4" />
        <line x1={440} y1={132} x2={540} y2={132} stroke="#c2cede" strokeWidth={2} strokeDasharray="4 4" />
        <text x={250} y={80} fontSize={11} fill="#7b8b9c" textAnchor="middle">请求 →</text>
        <text x={490} y={80} fontSize={11} fill="#7b8b9c" textAnchor="middle">查询/写入 →</text>
        <text x={250} y={152} fontSize={11} fill="#7b8b9c" textAnchor="middle">← 响应</text>
        {BOXES.map((b) => {
          const active =
            (step >= 1 && b.id === "front") || (step >= 2 && b.id === "back") || (step >= 3 && b.id === "db");
          return (
            <g key={b.id} style={{ cursor: "pointer" }} onClick={() => setOpen(open === b.id ? null : b.id)}>
              <rect x={b.x} y={52} width={140} height={110} rx={12} fill={b.fill} stroke={active ? b.color : "#d7dfe8"} strokeWidth={active ? 2.5 : 1.5} />
              <text x={b.x + 70} y={100} fontSize={18} fontWeight={700} fill={b.color} textAnchor="middle">{b.name}</text>
              <text x={b.x + 70} y={124} fontSize={11} fill="#7b8b9c" textAnchor="middle">{b.sub}</text>
              <text x={b.x + 70} y={145} fontSize={10} fill="#a0aebc" textAnchor="middle">点击查看职责</text>
            </g>
          );
        })}
        {dot ? (
          <circle cx={dot.x} cy={dot.y} r={7} fill="#d9480f" stroke="#fff" strokeWidth={2}>
            <animate attributeName="opacity" values="1;0.5;1" dur="0.9s" repeatCount="indefinite" />
          </circle>
        ) : null}
        <text x={350} y={196} fontSize={13} fill="#43566a" textAnchor="middle" fontWeight={600}>{FLOW_STEPS[step]}</text>
      </svg>
      {opened ? (
        <div className="loop-sim-insight" style={{ marginTop: 4 }}>
          <b>{opened.name}：</b>
          {opened.desc}
        </div>
      ) : null}
      <div style={{ marginTop: 12 }}>
        <button type="button" className="loop-btn-primary" onClick={run} disabled={running}>
          {step === 0 ? "▶ 发起请求" : running ? "请求进行中…" : "↻ 再来一次"}
        </button>
      </div>
    </div>
  );
}

// ---- 第一关 · 沟通网络 (peoplenet) ----
const MEET_TAX = 0.12;
const MAX_PEOPLE = 16;
const lines = (n: number) => (n * (n - 1)) / 2;
const effective = (n: number) => Math.max(0, n - MEET_TAX * lines(n));
const pos = (i: number) => ({ x: 90 + (i % 4) * 150, y: 64 + Math.floor(i / 4) * 100 });

function Person({ x, y, meeting, idx }: { x: number; y: number; meeting: boolean; idx: number }) {
  const c = meeting ? "#d9480f" : "#2456a6";
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-14} r={9} fill={c} />
      <path d="M -12 14 C -12 -2, 12 -2, 12 14 Z" fill={c} />
      <g transform="translate(13,-24)">
        <rect x={-2} y={-11} width={30} height={17} rx={5} fill={meeting ? "#fdeee5" : "#e3ecf7"} stroke={meeting ? "#f5cdb5" : "#c4d5ee"} />
        <text x={13} y={2} fontSize={10} textAnchor="middle" fill={meeting ? "#d9480f" : "#173d7d"} fontWeight={700}>{meeting ? "开会" : "</>"}</text>
      </g>
      <text x={0} y={30} fontSize={9.5} textAnchor="middle" fill="#7b8b9c">#{idx + 1}</text>
    </g>
  );
}

export function PeoplenetSim() {
  const [n, setN] = useState(3);
  const [touched, setTouched] = useState(false);
  const l = lines(n);
  const eff = effective(n);
  const meetRatio = n > 0 ? Math.min(1, (n - eff) / n) : 0;
  const meeting = Math.round(n * meetRatio);
  const pairs = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) out.push([i, j]);
    return out;
  }, [n]);
  const insight = !touched
    ? { text: "👉 拖动滑块加人。盯住两件事：人和人之间长出来的线，和小人头顶的状态气泡。", crisis: false }
    : n <= 4
      ? { text: `${n} 个人只有 ${l} 条线，几乎人人都在敲代码——小团队的"人多力量大"基本成立。继续加。`, crisis: false }
      : n <= 8
        ? { text: `${l} 条线了。注意：已经有 ${meeting} 个人主要时间耗在对齐和开会上。每加一个人，长出来的不只是一双手，还有 ${n} 条新的沟通线。`, crisis: false }
        : eff > 0
          ? { text: `${n} 个人 = ${l} 条沟通线。${meeting} 人在开会，真正产出相当于 ${eff.toFixed(1)} 个人。你雇了 ${n} 份工资，买到了 ${eff.toFixed(1)} 份产能。`, crisis: true }
          : { text: `${l} 条线彻底淹没了团队：理论上所有人的全部时间都耗在沟通上，净产出归零。这就是 Brooks 在 IBM 亲眼看到的黑洞。`, crisis: true };

  return (
    <div className="loop-sim-panel">
      <span className="loop-sim-stage-tag">第一关 · 沟通网络</span>
      <div className="loop-sim-controls">
        <span className="loop-sim-slider-label">团队人数</span>
        <input
          type="range"
          min={2}
          max={MAX_PEOPLE}
          step={1}
          value={n}
          aria-label="团队人数"
          onChange={(e) => {
            setN(Number(e.target.value));
            setTouched(true);
          }}
        />
        <span className="loop-sim-value">{n} 人</span>
      </div>
      <svg viewBox="0 0 640 440" style={{ width: "100%", height: "auto" }} role="img" aria-label={`${n} 人团队的沟通网络，共 ${l} 条沟通线`}>
        {pairs.map(([a, b]) => {
          const pa = pos(a);
          const pb = pos(b);
          return <line key={`${a}-${b}`} className="loop-commline" x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} />;
        })}
        {Array.from({ length: n }, (_, i) => {
          const p = pos(i);
          return <Person key={i} x={p.x} y={p.y} meeting={i >= n - meeting} idx={i} />;
        })}
      </svg>
      <div className="loop-sim-readouts">
        <div className="loop-sim-readout">工资单上的人<b>{n}</b></div>
        <div className={`loop-sim-readout ${l > 28 ? "hot" : ""}`}>沟通线 n(n−1)/2<b>{l}</b></div>
        <div className={`loop-sim-readout ${meeting > n / 2 ? "hot" : ""}`}>陷入会议的人<b>{meeting}</b></div>
        <div className={`loop-sim-readout ${eff < n / 2 ? "hot" : ""}`}>实际买到的产能<b>{eff.toFixed(1)}</b></div>
      </div>
      <div className={`loop-sim-insight ${insight.crisis ? "crisis" : ""}`} aria-live="polite">{insight.text}</div>
    </div>
  );
}

// ---- 第二关 · 加人竞速 (race) ----
const TARGET = 60;
const RACE_EVENTS: Record<number, string> = {
  1: "两队同时开工：8 人 × 有效产能 4.6/周。",
  4: "⚠ 第 4 周评审：两队进度都落后预期。A 队老板拍板\"加 8 个人抢回来\"；B 队顶住压力，维持 8 人。",
  5: "A 队新人入场：老人停下来带新人，本周产能暴跌（ramp-up 成本）。",
  7: "A 队新人上手了——但 16 人 = 120 条沟通线，会议塞满日历，产能再也回不到从前。",
};
const weekCap = (team: "a" | "b", w: number) => (team === "b" || w <= 4 ? 4.6 : w <= 6 ? 2 : 3.2);
const progress = (team: "a" | "b", w: number) => {
  let t = 0;
  for (let i = 1; i <= w; i++) t += weekCap(team, i);
  return Math.min(TARGET, t);
};

export function RaceSim({ onFinished }: { onFinished: () => void }) {
  const [week, setWeek] = useState(0);
  const [running, setRunning] = useState(false);
  const [fin, setFin] = useState<{ a: number | null; b: number | null }>({ a: null, b: null });
  const timer = useRef<number | null>(null);
  const pa = progress("a", week);
  const pb = progress("b", week);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setTimeout(() => {
      const w = week + 1;
      setWeek(w);
      const fa = progress("a", w) >= TARGET ? (fin.a ?? w) : fin.a;
      const fb = progress("b", w) >= TARGET ? (fin.b ?? w) : fin.b;
      if (fa !== fin.a || fb !== fin.b) setFin({ a: fa, b: fb });
      if (fa !== null && fb !== null) {
        setRunning(false);
        onFinished();
      }
    }, 480);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, week, fin, onFinished]);

  const start = () => {
    setWeek(0);
    setFin({ a: null, b: null });
    setRunning(true);
  };
  const doneAll = fin.a !== null && fin.b !== null;

  return (
    <div className="loop-sim-panel">
      <span className="loop-sim-stage-tag">第二关 · 加人竞速</span>
      <div className="loop-sim-controls">
        <span className="loop-race-week">第 {week} 周</span>
        <button type="button" className="loop-btn-primary" onClick={start} disabled={running}>
          {week === 0 ? "▶ 开赛" : running ? "比赛进行中…" : "↻ 再跑一次"}
        </button>
      </div>
      <div className="loop-race-track">
        {(["a", "b"] as const).map((team) => {
          const p = team === "a" ? pa : pb;
          const f = team === "a" ? fin.a : fin.b;
          const crew = team === "a" ? (week >= 5 ? 16 : 8) : 8;
          return (
            <div key={team} className="loop-race-team">
              <div className="loop-race-team-head">
                <span className="loop-race-team-name">{team === "a" ? "A 队 · 中途加人到 16" : "B 队 · 稳住 8 人"}</span>
                <span className="loop-race-team-stat">
                  {crew} 人 · {p.toFixed(1)}/{TARGET}
                  {f !== null ? ` · 第 ${f} 周交付 ✓` : ""}
                </span>
              </div>
              <div className="loop-race-bar">
                <div className={`loop-race-fill ${f !== null ? "done" : team}`} style={{ width: `${(p / TARGET) * 100}%` }}>
                  {Math.round((p / TARGET) * 100)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="loop-race-events">
        {Object.entries(RACE_EVENTS)
          .filter(([w]) => Number(w) <= week)
          .map(([w, t]) => (
            <div key={w} className="loop-race-event">第 {w} 周 · {t}</div>
          ))}
      </div>
      {doneAll ? (
        <div className="loop-sim-insight crisis" aria-live="polite">
          终局：B 队第 {fin.b} 周交付，A 队拖到第 {fin.a} 周——加人的 A 队反而晚了 {(fin.a ?? 0) - (fin.b ?? 0)} 周，还多付了一倍工资。给延期的项目加人，让它延期得更厉害——你刚看完 Brooks 定律的原文演出。
        </div>
      ) : null}
    </div>
  );
}
