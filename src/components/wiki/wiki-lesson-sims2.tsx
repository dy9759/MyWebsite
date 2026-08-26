"use client";

// Interactive engines part 2: the commander decision sim and the Git
// four-act timeline, ported from the original engines.
import { useState } from "react";

// ---- 第三关 · 你来当指挥 (commander) ----
const CORE_TOTAL = 20;
const PAGES_TOTAL = 24;
const DEADLINE = 10;
const MAX_WEEKS = 20;

type CmdState = {
  week: number;
  coreDone: number;
  pagesDone: number;
  coreCrew: number;
  pagesCrew: number;
  coreRamp: number;
  pagesRamp: number;
  log: string[];
  deliveredAt: number | null;
};
const CMD_INIT: CmdState = { week: 0, coreDone: 0, pagesDone: 0, coreCrew: 2, pagesCrew: 2, coreRamp: 0, pagesRamp: 0, log: [], deliveredAt: null };
const commTax = (n: number) => 0.12 * ((n * (n - 1)) / 2);

function tick(s: CmdState): CmdState {
  const coreEff = Math.min(s.coreCrew - s.coreRamp, 2);
  const crowd = Math.max(0, s.coreCrew - 2) * 0.35;
  const coreCap = Math.max(0.3, coreEff - crowd - s.coreRamp * 0.3);
  const pagesAvail = s.pagesCrew - s.pagesRamp;
  const pagesCap = Math.max(0, pagesAvail - commTax(s.pagesCrew) - s.pagesRamp * 0.3);
  const coreDone = Math.min(CORE_TOTAL, s.coreDone + (s.coreDone < CORE_TOTAL ? coreCap : 0));
  const pagesDone = Math.min(PAGES_TOTAL, s.pagesDone + (s.pagesDone < PAGES_TOTAL ? pagesCap : 0));
  const week = s.week + 1;
  const delivered = coreDone >= CORE_TOTAL && pagesDone >= PAGES_TOTAL;
  return { ...s, week, coreDone, pagesDone, coreRamp: 0, pagesRamp: 0, deliveredAt: s.deliveredAt ?? (delivered ? week : null) };
}
function runWeeks(s: CmdState, n: number): CmdState {
  let cur = s;
  for (let i = 0; i < n && cur.deliveredAt === null && cur.week < MAX_WEEKS; i++) cur = tick(cur);
  return cur;
}
const CMD_CHOICES = [
  { id: "hold", label: "不加人，维持现状", detail: "核心 2 人 + 页面组按兵不动，省下工资和沟通线" },
  { id: "pages2", label: "加 2 人 → 投页面组", detail: "页面互相独立、可并行——但新人要 1 周才能上手" },
  { id: "core4", label: "加 4 人 → 全投核心链", detail: "核心链是瓶颈，老板的本能：往最急的地方堆人" },
];
function applyChoice(s: CmdState, id: string): CmdState {
  if (id === "pages2") return { ...s, pagesCrew: s.pagesCrew + 2, pagesRamp: 2, log: [...s.log, `第 ${s.week} 周：页面组 +2 人（1 周 ramp-up）`] };
  if (id === "core4") return { ...s, coreCrew: s.coreCrew + 4, coreRamp: 4, log: [...s.log, `第 ${s.week} 周：核心链 +4 人（串行任务，人多手杂）`] };
  return { ...s, log: [...s.log, `第 ${s.week} 周：维持现状`] };
}
function bossBaseline(): number {
  let s = CMD_INIT;
  for (let i = 0; i < 3; i++) {
    s = applyChoice(s, "core4");
    s = runWeeks(s, 3);
  }
  while (s.deliveredAt === null && s.week < MAX_WEEKS) s = tick(s);
  return s.deliveredAt ?? MAX_WEEKS;
}

function CmdModule({ label, done, total, crew }: { label: string; done: number; total: number; crew: number }) {
  return (
    <div className="loop-cmd-module">
      <div className="loop-cmd-module-head">
        <span className="loop-cmd-module-name">{label}</span>
        <span className="loop-cmd-crew">{crew} 人 · {done.toFixed(1)}/{total}</span>
      </div>
      <div className="loop-race-bar" style={{ height: 16 }}>
        <div className={`loop-race-fill ${done >= total ? "done" : "b"}`} style={{ width: `${(done / total) * 100}%` }} />
      </div>
    </div>
  );
}

export function CommanderSim({ onFinished }: { onFinished: () => void }) {
  const [s, setS] = useState(CMD_INIT);
  const [picks, setPicks] = useState<string[]>([]);
  const [ended, setEnded] = useState(false);
  const baseline = bossBaseline();

  const pick = (id: string) => {
    let next = applyChoice(s, id);
    const nextPicks = [...picks, id];
    if (nextPicks.length < 3) {
      next = runWeeks(next, 3);
    } else {
      next = runWeeks(next, MAX_WEEKS);
      setEnded(true);
      onFinished();
    }
    setPicks(nextPicks);
    setS(next);
  };
  const reset = () => {
    setS(CMD_INIT);
    setPicks([]);
    setEnded(false);
  };
  const d = s.deliveredAt;
  const win = d !== null && d <= DEADLINE;
  const usedCore4 = picks.includes("core4");
  const earlyPages = picks[0] === "pages2";

  return (
    <div className="loop-sim-panel">
      <span className="loop-sim-stage-tag">第三关 · 你来当指挥</span>
      <p style={{ fontSize: 14.5, color: "var(--loop-ink-2)" }}>
        项目死线：<b>第 {DEADLINE} 周</b>。核心链是串行任务（最多 2 人有效），页面组是 12 个独立页面（可并行）。 三个决策点，打败&quot;老板的本能&quot;（每次都往核心链堆人 → 第 {baseline} 周才能交付）。
      </p>
      <div className="loop-cmd-board">
        <div className="loop-cmd-status">
          <div><b>{s.week}</b>当前周</div>
          <div className={s.week > DEADLINE ? "warn" : ""}><b>{DEADLINE}</b>死线（周）</div>
          <div><b>{s.coreCrew + s.pagesCrew}</b>总人数</div>
        </div>
        <CmdModule label="核心链（串行）" done={s.coreDone} total={CORE_TOTAL} crew={s.coreCrew} />
        <CmdModule label="页面组（可并行）" done={s.pagesDone} total={PAGES_TOTAL} crew={s.pagesCrew} />
        {s.log.length > 0 ? (
          <div style={{ fontSize: 12.5, color: "var(--loop-ink-3)", marginTop: 8 }}>
            {s.log.map((l, i) => (
              <div key={i}>· {l}</div>
            ))}
          </div>
        ) : null}
      </div>
      {ended ? (
        <>
          <div className={`loop-cmd-result ${win ? "win" : "lose"}`}>
            <b>
              {win
                ? `✓ 第 ${d} 周交付 —— 赶上死线，并且比"老板的本能"（第 ${baseline} 周）快了 ${baseline - (d ?? 0)} 周`
                : `✗ 第 ${d ?? "20+"} 周才交付，错过第 ${DEADLINE} 周死线${d !== null && d < baseline ? `（但仍好过无脑堆人的第 ${baseline} 周）` : ""}`}
            </b>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14.5 }}>
              {usedCore4
                ? "复盘：你往串行核心链加过人——那里最多 2 人有效，多出来的人只添乱（还记得\"九个女人\"吗）。核心链的工期是这个项目的物理下限，谁也压不动。"
                : earlyPages
                  ? "复盘：你第 0 周就给可并行的页面组加人——ramp-up 的代价付得越早，回报期越长。这就是\"加人是否有效取决于任务可拆分性 + 时机\"的完整版。"
                  : "复盘：你保护了核心链，很好。更进一步：给页面组加人越早越划算——ramp-up 是固定成本，早付早回本。"}
            </p>
          </div>
          <div style={{ marginTop: 10 }}>
            <button type="button" className="loop-btn-ghost" onClick={reset}>↻ 换一套打法再试</button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: 14, fontWeight: 600, margin: "10px 0 6px" }}>决策点 {picks.length + 1} / 3 · 你的指令：</p>
          {CMD_CHOICES.map((c) => (
            <button key={c.id} type="button" className="loop-decision-choice" onClick={() => pick(c.id)}>
              <b>{c.label}</b>
              <span>{c.detail}</span>
            </button>
          ))}
        </>
      )}
    </div>
  );
}

// ---- Git 四幕时间线 (gittimeline) ----
const MAIN_Y = 84;
const BRANCH_Y = 30;
const KIND_COLOR: Record<string, string> = { main: "var(--loop-blue)", branch: "var(--loop-orange)", merge: "var(--loop-green)", revert: "var(--loop-green)", dead: "#b8c2cc" };

type Commit = { id: string; x: number; y: number; label: string; kind: string };
type Edge = { from: string; to: string; dead?: boolean };
type Toast = { tone: "good" | "bad" | "info"; text: string };
type SceneChoice = { label: string; go: () => void };

export function GitTimelineSim({ onFinished }: { onFinished: () => void }) {
  const [scene, setScene] = useState("p1");
  const [commits, setCommits] = useState<Commit[]>([{ id: "c0", x: 46, y: MAIN_Y, label: "项目初始", kind: "main" }]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [head, setHead] = useState("c0");

  const toast = (t: Toast) => setToasts((prev) => [...prev.slice(-2), t]);
  const addCommit = (c: Commit, from?: string) => {
    setCommits((prev) => [...prev, c]);
    if (from) setEdges((prev) => [...prev, { from, to: c.id }]);
    setHead(c.id);
  };
  const kill = (id: string, label: string) => {
    setCommits((prev) => prev.map((c) => (c.id === id ? { ...c, kind: "dead", label } : c)));
    setEdges((prev) => prev.map((e) => (e.to === id ? { ...e, dead: true } : e)));
  };
  const mergeFlow = () => {
    setScene("p6");
    addCommit({ id: "m1", x: 436, y: MAIN_Y, label: "合并：新框架上线", kind: "merge" }, "c2");
    setEdges((prev) => [...prev, { from: "b2", to: "m1" }]);
    toast({ tone: "good", text: "冲突解决，合并完成——主线获得了新框架，而且这期间主线随时都是能跑的。" });
  };

  const SCENES: Record<string, { tag: string; story: string[]; choices: SceneChoice[] }> = {
    p1: { tag: "第一幕 · 存档", story: ["你和 AI 刚完成了「登录功能」，一切正常，能跑。下一步做什么？"], choices: [
      { label: "趁热打铁，直接让 AI 开发下一个功能（不存档）", go: () => { setScene("p1_crash"); toast({ tone: "bad", text: "AI 在开发新功能时\"顺手优化\"了登录代码——登录坏了。你没有任何存档点，上一个能跑的版本已经不存在。" }); } },
      { label: "先说一句：\"commit 一下，说明写清楚\"", go: () => { setScene("p2"); addCommit({ id: "c1", x: 124, y: MAIN_Y, label: "登录功能", kind: "main" }, "c0"); toast({ tone: "good", text: "存档完成。从此无论后面怎么翻车，你永远可以回到这一刻。" }); } },
    ] },
    p1_crash: { tag: "第一幕 · 存档（翻车重演）", story: ["没有存档点，损失上限 = 全部工作。只能让 AI 在废墟上继续猜，越修越烂——这是 vibe coding 事故率第一名的剧本。", "给你一次重来的机会："], choices: [
      { label: "重来：这次先 commit 存档，再开发新功能", go: () => { setScene("p2"); addCommit({ id: "c1", x: 124, y: MAIN_Y, label: "登录功能", kind: "main" }, "c0"); toast({ tone: "good", text: "存档完成。记住这个动作的时机：每完成一个能跑的小功能。" }); } },
    ] },
    p2: { tag: "第一幕 · 存档", story: ["很快，「商品列表」也完成了，能跑。把习惯焊死——"], choices: [
      { label: "\"commit 一下：完成商品列表\"", go: () => { setScene("p3"); addCommit({ id: "c2", x: 202, y: MAIN_Y, label: "商品列表", kind: "main" }, "c1"); toast({ tone: "good", text: "存档点越密，后悔药越便宜——现在最多只会丢几十分钟的工作。" }); } },
    ] },
    p3: { tag: "第二幕 · 分支", story: ["现在来了个大活儿：你想让 AI 把整个界面框架换掉（大手术，波及几十个文件，没把握）。怎么开工？"], choices: [
      { label: "直接在主线上做——反正刚存过档", go: () => { setScene("p3_crash"); addCommit({ id: "c3", x: 280, y: MAIN_Y, label: "换框架(半成品)", kind: "main" }, "c2"); toast({ tone: "bad", text: "大改进行到一半，产品白屏了。主线现在是坏的——如果此刻有同事要基于主线干活，或者你想先修个线上小 bug，都没法进行。" }); } },
      { label: "\"开个分支做这个实验\"", go: () => { setScene("p4"); addCommit({ id: "b1", x: 280, y: BRANCH_Y, label: "换框架 v1", kind: "branch" }, "c2"); toast({ tone: "good", text: "分支「redesign」创建——一条平行时间线。无论上面怎么折腾，主线永远是那个能跑的版本。" }); } },
    ] },
    p3_crash: { tag: "第二幕 · 分支（回滚自救）", story: ["幸好你有存档。但注意代价：回滚回存档点，大改到一半的工作也全部丢弃。"], choices: [
      { label: "回滚到「商品列表」存档点", go: () => { setScene("p3_rolled"); kill("c3", "换框架(已回滚)"); setHead("c2"); toast({ tone: "info", text: "30 秒，回到能跑的版本。但你也看到了直接在主线上动刀的问题：主线坏掉的期间一切停摆，回滚时半途的工作全部陪葬。大手术应该去平行世界做。" }); } },
    ] },
    p3_rolled: { tag: "第二幕 · 分支", story: ["这次换个开法——"], choices: [
      { label: "\"开个分支做这个实验\"", go: () => { setScene("p4"); addCommit({ id: "b1", x: 280, y: BRANCH_Y, label: "换框架 v1", kind: "branch" }, "c2"); toast({ tone: "good", text: "分支「redesign」创建——实验归实验，主线归主线。" }); } },
    ] },
    p4: { tag: "第二幕 · 分支", story: ["分支上第一版做出来了……不妙：AI 把导航栏搞坏了，追加两轮修复越修越乱（你认出来了——这是打转循环的指纹）。"], choices: [
      { label: "在坏分支上继续硬修，都改了这么多了", go: () => { setScene("p4_stuck"); toast({ tone: "bad", text: "又两轮过去，分支更乱了。沉没成本正在绑架你——\"都改了这么多了\"恰恰是该止损的信号，因为分支扔掉不心疼，这正是当初开分支的原因。" }); } },
      { label: "丢弃整条分支——主线毫发无损", go: () => { setScene("p4_discarded"); kill("b1", "换框架 v1(已丢弃)"); setHead("c2"); toast({ tone: "good", text: "扔掉了。主线从头到尾没受任何影响。" }); } },
    ] },
    p4_stuck: { tag: "第二幕 · 分支（止损）", story: ["止损。分支的全部意义就是：失败可以整条扔掉。"], choices: [
      { label: "丢弃整条分支", go: () => { setScene("p4_discarded"); kill("b1", "换框架 v1(已丢弃)"); setHead("c2"); toast({ tone: "good", text: "扔掉了。主线从头到尾没受任何影响。" }); } },
    ] },
    p4_discarded: { tag: "第二幕 · 分支", story: ["复盘一下再重开：第一次失败大概率不是 AI 不行，是指令太模糊（\"把框架换掉\"是愿望不是 spec）。这次把范围、保留哪些行为、不许动哪些文件写清楚。"], choices: [
      { label: "重开分支，带着写清楚的 spec 再来一次", go: () => { setScene("p5"); addCommit({ id: "b2", x: 358, y: BRANCH_Y, label: "换框架 v2 ✓", kind: "branch" }, "c2"); toast({ tone: "good", text: "第二次成功了：新框架在分支上完整跑通。现在把它合并回主线。" }); } },
    ] },
    p5: { tag: "第三幕 · 合并冲突", story: ["合并时 Git 突然停下来报告：冲突。原因：你在分支上把首页标题改成了「闪购 · 三折起」，而昨天你顺手在主线上把同一行改成了「限时特卖 · 全场五折」。两条时间线对同一行代码有两种主张，Git 拒绝替你决定。"], choices: [
      { label: "让 AI 随便挑一个，赶紧合并完事", go: () => { setScene("p5_pick"); toast({ tone: "bad", text: "AI 挑了「限时特卖」——但运营这周的活动方案是三折闪购。机器能发现冲突、能合并不相干的改动；但同一行的两种改法哪个对，是业务判断。AI 只能猜，猜错的是你的促销。" }); } },
      { label: "人来拍板——这是业务决策，不是技术问题", go: () => { setScene("p5_pick"); toast({ tone: "good", text: "正确。记住这个分工：机器发现冲突，人裁决冲突。绝大多数冲突 AI 可以代劳合并，但涉及业务含义的那几行，必须你拍板。" }); } },
    ] },
    p5_pick: { tag: "第三幕 · 合并冲突", story: ["拍板：这周活动到底用哪句？"], choices: [
      { label: "保留「闪购 · 三折起」（分支版本）", go: mergeFlow },
      { label: "保留「限时特卖 · 全场五折」（主线版本）", go: mergeFlow },
    ] },
    p6: { tag: "第四幕 · 回滚", story: ["上线两天，用户反馈优惠券金额算错了。你让 AI 排查，定位到问题埋在「商品列表」那次提交里。注意：它后面已经又有新提交了——不能简单\"回到过去\"，那会把新框架也丢掉。"], choices: [
      { label: "revert：只撤销那一次提交的改动，历史照常保留", go: () => { setScene("done"); addCommit({ id: "r1", x: 514, y: MAIN_Y, label: "revert 商品列表", kind: "revert" }, "m1"); toast({ tone: "good", text: "revert 新增了一次\"反向提交\"，把那次改动精准抵消——新框架安然无恙，历史完整可查。回滚不是删除历史，是给历史追加一笔更正。" }); onFinished(); } },
      { label: "直接回滚到「商品列表」之前，重来", go: () => toast({ tone: "bad", text: "这会把后面所有工作（包括刚合并的新框架）一起丢掉——用大炮打蚊子。已定位到具体某次提交时，用 revert 精准抵消它就够了。" }) },
    ] },
    done: { tag: "四幕完成", story: ["你已经把 Git 的四个核心判断全部亲手走了一遍：何时存档（每个能跑的小功能）、何时开分支（大手术前）、冲突谁拍板（机器发现、人裁决）、怎么回滚（能精准抵消就不全量倒带）。"], choices: [] },
  };

  const cur = SCENES[scene];
  const byId = Object.fromEntries(commits.map((c) => [c.id, c]));

  return (
    <div className="loop-sim-panel">
      <svg viewBox="0 0 600 120" width="100%" height={132} aria-label="Git 提交时间线">
        <text x={6} y={88} fontSize={11} fill="var(--loop-ink-3)">主线</text>
        <text x={6} y={34} fontSize={11} fill="var(--loop-ink-3)">分支</text>
        {edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          if (!a || !b) return null;
          const stroke = e.dead ? "#c9d2db" : "var(--loop-ink-3)";
          const dash = e.dead || b.kind === "dead" ? "4 4" : undefined;
          if (a.y === b.y) return <line key={i} x1={a.x + 11} y1={a.y} x2={b.x - 11} y2={b.y} stroke={stroke} strokeWidth={2} strokeDasharray={dash} />;
          const mid = (a.x + b.x) / 2;
          return <path key={i} d={`M ${a.x + 9} ${a.y - 6} C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x - 9} ${b.y + (b.y < a.y ? 6 : -6)}`} fill="none" stroke={stroke} strokeWidth={2} strokeDasharray={dash} />;
        })}
        {commits.map((c) => (
          <g key={c.id}>
            <circle cx={c.x} cy={c.y} r={11} fill={c.kind === "dead" ? "#eef1f4" : "var(--loop-raised)"} stroke={KIND_COLOR[c.kind]} strokeWidth={head === c.id ? 3.5 : 2.5} />
            {head === c.id ? <circle cx={c.x} cy={c.y} r={16} fill="none" stroke={KIND_COLOR[c.kind]} strokeWidth={1} strokeDasharray="3 3" /> : null}
            <text x={c.x} y={c.y + (c.y === MAIN_Y ? 30 : -22)} fontSize={11} textAnchor="middle" fill={c.kind === "dead" ? "var(--loop-ink-3)" : "var(--loop-ink-2)"}>{c.label}</text>
          </g>
        ))}
      </svg>
      <span className="loop-sim-stage-tag">{cur.tag}</span>
      <div className="loop-gitsim-story">
        {cur.story.map((s, i) => (
          <p key={i}>{s}</p>
        ))}
      </div>
      {cur.choices.map((c, i) => (
        <button key={i} type="button" className="loop-decision-choice" onClick={c.go}>
          <b>{c.label}</b>
        </button>
      ))}
      {toasts.map((t, i) => (
        <div key={i} className={`loop-sim-insight ${t.tone === "bad" ? "crisis" : ""}`} style={{ marginTop: 8 }}>
          {t.text}
        </div>
      ))}
    </div>
  );
}
