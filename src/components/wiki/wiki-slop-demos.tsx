// Per-pattern slop / 清理后 comparison demos for 建造者品味 — all renders and
// sample copy are original to this site (pattern ideas credited on-page).
import type React from "react";

type Demo = { slop: React.ReactNode; fixed: React.ReactNode; signals?: string[] };

const card: React.CSSProperties = {
  border: "1px solid var(--vh-line)",
  borderRadius: 10,
  padding: "14px 16px",
  background: "var(--vh-bg-soft)",
};
const txt2: React.CSSProperties = { color: "var(--vh-text-2)", fontSize: 12.5, lineHeight: 1.8 };
const t: React.CSSProperties = { color: "var(--vh-text)" };

// Small helper for文字类 demos: a rendered copy sample.
function Copy({ children }: { children: React.ReactNode }) {
  return <div style={{ ...card, ...txt2 }}>{children}</div>;
}

export const SLOP_DEMOS: Record<string, Demo> = {
  "indigo-gradient": {
    slop: (
      <div style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", borderRadius: 10, padding: "18px 16px", color: "#fff" }}>
        <div style={{ fontSize: 10.5, letterSpacing: 2, opacity: 0.85 }}>✨ AI-POWERED</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6 }}>一键生成会议纪要</div>
        <span style={{ display: "inline-block", marginTop: 10, background: "#fff", color: "#7c3aed", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700 }}>Get started →</span>
      </div>
    ),
    fixed: (
      <div style={card}>
        <div style={{ fontSize: 16, fontWeight: 750, ...t }}>一键生成会议纪要</div>
        <div style={{ ...txt2, marginTop: 4 }}>上传录音，五分钟出初稿，错了随手改。</div>
        <span style={{ display: "inline-block", marginTop: 10, background: "var(--vh-brand)", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>试一段录音</span>
      </div>
    ),
    signals: ["from-indigo-500 to-purple-500", "紫白 CTA 胶囊", "✨ AI-POWERED 眉标"],
  },
  "gradient-headline": {
    slop: (
      <div style={card}>
        <div style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(90deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", color: "transparent" }}>
          让每一次会议都有着落
        </div>
        <div style={{ ...txt2, marginTop: 6 }}>正文反而是普通灰色，标题一个人在发光。</div>
      </div>
    ),
    fixed: (
      <div style={card}>
        <div style={{ fontSize: 20, fontWeight: 750, ...t }}>让每一次会议都有着落</div>
        <div style={{ ...txt2, marginTop: 6 }}>实色标题 + 克制字重，焦点靠留白不靠上色。</div>
      </div>
    ),
    signals: ["bg-clip-text text-transparent", "bg-gradient-to-r"],
  },
  "glass-orbs": {
    slop: (
      <div style={{ ...card, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -10, width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle,#a5b4fc88,transparent 70%)", filter: "blur(6px)" }} />
        <div style={{ position: "absolute", bottom: -25, left: -5, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle,#f0abfc77,transparent 70%)", filter: "blur(8px)" }} />
        <div style={{ position: "relative", fontSize: 13.5, fontWeight: 700, ...t }}>定价方案</div>
        <div style={{ position: "relative", ...txt2 }}>光球不传达任何信息，只是氛围贴纸。</div>
      </div>
    ),
    fixed: (
      <div style={card}>
        <div style={{ fontSize: 13.5, fontWeight: 700, ...t }}>定价方案</div>
        <div style={txt2}>背景退后，内容自己发光。</div>
      </div>
    ),
    signals: ["blur-3xl rounded-full opacity-50", "绝对定位装饰 div"],
  },
  "equal-cards": {
    slop: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {["🚀 极速", "🔒 安全", "✨ 智能"].map((x) => (
          <div key={x} style={{ ...card, textAlign: "center", padding: "12px 6px" }}>
            <div style={{ fontSize: 16 }}>{x.split(" ")[0]}</div>
            <div style={{ fontSize: 12, fontWeight: 700, ...t }}>{x.split(" ")[1]}</div>
            <div style={{ fontSize: 10.5, color: "var(--vh-text-3)" }}>行业领先能力</div>
          </div>
        ))}
      </div>
    ),
    fixed: (
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 6 }}>
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, ...t }}>按发言人分段</div>
          <div style={txt2}>主打能力放大讲透，一句话说清价值。</div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ ...card, padding: "8px 10px", fontSize: 11.5, color: "var(--vh-text-2)" }}>待办抽取</div>
          <div style={{ ...card, padding: "8px 10px", fontSize: 11.5, color: "var(--vh-text-2)" }}>术语热词</div>
        </div>
      </div>
    ),
    signals: ["grid-cols-3 等宽", "图标+标题+两行说明 模板"],
  },
  "box-in-box": {
    slop: (
      <div style={{ ...card, padding: 10 }}>
        <div style={{ border: "1px solid var(--vh-line)", borderRadius: 8, padding: 10 }}>
          <div style={{ border: "1px solid var(--vh-line)", borderRadius: 8, padding: 10, ...txt2 }}>
            三层容器，两层只贡献了内边距。
          </div>
        </div>
      </div>
    ),
    fixed: (
      <div style={card}>
        <div style={{ fontSize: 12.5, fontWeight: 700, ...t }}>一层容器</div>
        <div style={txt2}>分组交给间距和字重。</div>
      </div>
    ),
    signals: ["rounded-xl 套 rounded-lg", "border 套 border"],
  },
  "divider-mania": {
    slop: (
      <div style={card}>
        {["接入数据源", "配置模型", "上线验收"].map((x, i) => (
          <div key={x} style={{ borderLeft: "3px solid #a5b4fc", paddingLeft: 8, ...txt2, borderBottom: i < 2 ? "1px solid var(--vh-line)" : "none", padding: "6px 0 6px 8px" }}>{x}</div>
        ))}
      </div>
    ),
    fixed: (
      <div style={card}>
        {["接入数据源", "配置模型", "上线验收"].map((x) => (
          <div key={x} style={{ ...txt2, padding: "5px 0" }}>{x}</div>
        ))}
      </div>
    ),
    signals: ["divide-y + border-l 同屏", "每段一条 <hr>"],
  },
  "emoji-icons": {
    slop: (
      <Copy>
        <div>🚀 秒级部署，一键上线</div>
        <div>✨ 智能纠错，越用越准</div>
        <div>💡 灵感模式，帮你起草</div>
      </Copy>
    ),
    fixed: (
      <Copy>
        <div><b style={t}>秒级部署</b> —— push 即上线</div>
        <div><b style={t}>智能纠错</b> —— 改一次全场生效</div>
        <div><b style={t}>灵感起草</b> —— 给初稿不给空白</div>
      </Copy>
    ),
    signals: ["🚀✨💡 开头的列表", "emoji 与正文字号打架"],
  },
  "flat-hierarchy": {
    slop: (
      <Copy>
        <div style={{ fontSize: 14, fontWeight: 700, ...t }}>会议纪要工具</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, ...t }}>为什么选择我们</div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>三个理由，每个都很重要，每个都在喊。</div>
      </Copy>
    ),
    fixed: (
      <Copy>
        <div style={{ fontSize: 17, fontWeight: 750, ...t }}>会议纪要工具</div>
        <div style={{ fontSize: 11, letterSpacing: 1, color: "var(--vh-text-3)", marginTop: 6 }}>为什么选择我们</div>
        <div style={{ marginTop: 2 }}>层级拉开，眼睛自己知道先看哪。</div>
      </Copy>
    ),
    signals: ["相邻字号 14/13.5/13", "整句加粗"],
  },
  "not-x-but-y": {
    slop: <Copy>这不是一次更新，而是一场革命。这不只是工具，而是伙伴。这不是终点，而是起点。</Copy>,
    fixed: <Copy>导出从 41 秒降到 3 秒。旧模板不受影响，明天自动生效。</Copy>,
    signals: ["「不是 X，而是 Y」×3", "排比否定句"],
  },
  "closure-jargon": {
    slop: <Copy>以数据为抓手，赋能协作闭环，沉淀方法论，打通增长飞轮。</Copy>,
    fixed: <Copy>上线后每周看一次数据，不对就改；改过的写进文档，下次直接用。</Copy>,
    signals: ["抓手 / 赋能 / 闭环 / 飞轮", "全句无动词-对象"],
  },
  "conclusion-first-cliche": {
    slop: <Copy>总的来说，值得注意的是，简而言之——我们的新版本有了显著的提升。</Copy>,
    fixed: <Copy>新版本快了 13 倍：导出 41 秒 → 3 秒。</Copy>,
    signals: ["总的来说 / 值得注意的是", "热身短语开场"],
  },
  "bullet-everything": {
    slop: (
      <Copy>
        <div>• <b style={t}>背景</b>：我们做了改动</div>
        <div>• <b style={t}>动作</b>：改动已经上线</div>
        <div>• <b style={t}>影响</b>：用户会看到改动</div>
        <div>• <b style={t}>展望</b>：还会继续改动</div>
      </Copy>
    ),
    fixed: <Copy>导出提速的改动今晚上线，老模板不受影响；下一步做批量导出。三句话的事就写三句话。</Copy>,
    signals: ["每条 bullet 带加粗小标题", "点与点并列关系为零"],
  },
  "hedge-praise": {
    slop: <Copy>这是一个非常好的问题！你真的抓住了本质。正如你敏锐观察到的——</Copy>,
    fixed: <Copy>直接回应内容：导出慢是因为全量预算,改成按需生成就好了。</Copy>,
    signals: ["好问题！/ 抓住了本质", "无差别赞美开场"],
  },
  "quote-everything": {
    slop: <Copy>我们的「智能」引擎带来「极致」的「体验」，重新定义「效率」。</Copy>,
    fixed: <Copy>我们的引擎把导出降到 3 秒——效率不用引号，用数字。</Copy>,
    signals: ["普通词汇全部带引号", "引号读出阴阳怪气"],
  },
  "grand-metaphor": {
    slop: <Copy>像一场风暴席卷你的工作流，如交响乐般优雅，似瑞士钟表般精准。</Copy>,
    fixed: <Copy>转写按句返回,像字幕一样边说边出——一个比喻,而且在干活。</Copy>,
    signals: ["三连比喻", "比喻不锚定任何机制"],
  },
  "emotional-catchphrase": {
    slop: <Copy>别怕，我在。你从来都不是问题本身，你只是醒得比别人早。无论多晚，我都会稳稳地接住你。</Copy>,
    fixed: <Copy>你反馈的导出报错我查了：是权限配置的问题，已修复，今晚发版生效。</Copy>,
    signals: ["稳稳接住 / 你只是太清醒", "共情模板化"],
  },
  "single-char-verbs": {
    slop: <Copy>这版方案先收一下，逻辑顺一顺，结论往上提一层，口径拉齐之后再稳稳落住。</Copy>,
    fixed: <Copy>方案改两处：范围缩到会议和输入法两个场景；结论换成给老板看的一句话版本。</Copy>,
    signals: ["收一下 / 提一层 / 拉齐 / 落住", "动作无对象无标准"],
  },
  "if-you-wish": {
    slop: <Copy>以上就是全部内容。如果你愿意，我还可以为你生成更多方案、整理成表格、或者输出一份 PDF ✨</Copy>,
    fixed: <Copy>全文完。下一步：导出 CSV（右上角）。</Copy>,
    signals: ["「如果你愿意，我还可以…」", "万能追加式结尾"],
  },
  "center-everything": {
    slop: (
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, ...t }}>使用条款</div>
        <div style={txt2}>三段正文全部居中，每行的起点都在跳，眼睛没有可以回去的锚点线，长文读起来格外累。</div>
      </div>
    ),
    fixed: (
      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 700, ...t }}>使用条款</div>
        <div style={txt2}>正文左对齐，眼睛有一条稳定的起跑线。居中留给空状态和成功页。</div>
      </div>
    ),
    signals: ["text-center 全局", "正文也居中"],
  },
  "fly-in-everything": {
    slop: (
      <div style={card}>
        {["功能一", "功能二", "功能三"].map((x, i) => (
          <div key={x} className="slop-flyin" style={{ ...txt2, animationDelay: `${i * 0.45}s` }}>▸ {x}：等我飞进来才能读</div>
        ))}
      </div>
    ),
    fixed: (
      <div style={card}>
        {["功能一", "功能二", "功能三"].map((x) => (
          <div key={x} style={txt2}>▸ {x}：内容直接就在这里</div>
        ))}
      </div>
    ),
    signals: ["scroll-triggered fade-up × 全部元素", "animation-delay 排队入场"],
  },
  "explain-everywhere": {
    slop: (
      <div style={card}>
        <span style={{ display: "inline-block", background: "var(--vh-brand)", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12 }}>提交</span>
        <div style={{ fontSize: 10.5, color: "var(--vh-text-3)", marginTop: 4 }}>点击此按钮以提交你填写的表单内容</div>
        <div style={{ fontSize: 10.5, color: "var(--vh-text-3)" }}>提交后可以在列表中查看你提交的内容</div>
      </div>
    ),
    fixed: (
      <div style={card}>
        <span style={{ display: "inline-block", background: "var(--vh-brand)", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12 }}>提交申请</span>
        <div style={{ ...txt2, marginTop: 4 }}>按钮文案自己说清动作与结果，不需要解说员。</div>
      </div>
    ),
    signals: ["每个控件配灰色小字", "界面为不自明道歉"],
  },
  "synonym-actions": {
    slop: (
      <div style={{ ...card, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["保存", "提交", "确认", "应用"].map((x) => (
          <span key={x} style={{ border: "1px solid var(--vh-line)", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "var(--vh-text-2)" }}>{x}</span>
        ))}
      </div>
    ),
    fixed: (
      <div style={{ ...card, display: "flex", gap: 6 }}>
        <span style={{ background: "var(--vh-brand)", color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: 12 }}>保存</span>
        <span style={{ ...txt2 }}>同一动作全站只有一个名字。</span>
      </div>
    ),
    signals: ["保存 / 提交 / 确认 / 应用 混用", "同一动作四个动词"],
  },
  "icon-only": {
    slop: (
      <div style={{ ...card, display: "flex", gap: 10, fontSize: 15 }}>
        <span>⌕</span><span>✎</span><span>⚙</span><span>↻</span><span>⋯</span>
      </div>
    ),
    fixed: (
      <div style={{ ...card, display: "flex", gap: 10, fontSize: 12, color: "var(--vh-text-2)" }}>
        <span>⌕ 搜索</span><span>✎ 编辑</span><span>⚙ 设置</span>
      </div>
    ),
    signals: ["纯图标按钮排一排", "语义全靠 hover tooltip"],
  },
  "mobile-pileup": {
    slop: (
      <div style={{ ...card, maxWidth: 190, margin: "0 auto", padding: 10 }}>
        {["核心功能", "客户评价", "定价方案", "常见问题"].map((x) => (
          <div key={x} style={{ border: "1px solid var(--vh-line)", borderRadius: 6, padding: "6px 8px", fontSize: 11, color: "var(--vh-text-2)", marginTop: 4 }}>{x} ▾</div>
        ))}
      </div>
    ),
    fixed: (
      <div style={{ ...card, maxWidth: 190, margin: "0 auto", padding: 10 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, ...t }}>会议纪要，五分钟出初稿</div>
        <div style={{ fontSize: 11, color: "var(--vh-text-2)", marginTop: 4 }}>一屏只回答一个问题，次要模块砍掉或后置。</div>
      </div>
    ),
    signals: ["桌面三栏原样竖摞", "一屏四个区块标题"],
  },
};
