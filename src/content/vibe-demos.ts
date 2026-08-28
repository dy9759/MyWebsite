// 课程来源词条的示意图配置（React demo 引擎数据）。
// 五种原语：steps 流程 / compare 对比 / bars 量条 / curve 增长曲线 / gauge 阈值表。
export type DemoConfig =
  | {
      kind: "steps";
      items: { t: string; s?: string; hot?: boolean; gate?: boolean }[];
      loop?: boolean;
      note?: string;
    }
  | { kind: "compare"; cols: { title: string; tone?: "good" | "bad"; items: string[] }[]; note?: string }
  | {
      kind: "bars";
      rows: { label: string; v: number; text?: string; tone?: "good" | "bad" | "warn" }[];
      note?: string;
    }
  | { kind: "curve"; lines: { fn: "const" | "log" | "lin" | "quad"; label: string; hot?: boolean }[]; note?: string }
  | { kind: "gauge"; value: number; threshold: number; label: string; note?: string };

import GENERATED from "./vibe-demos-generated.json";

const HAND: Record<string, DemoConfig> = {
  // ——— 手写样例（覆盖五种原语） ———
  "the-loop": {
    kind: "steps",
    items: [
      { t: "需求" },
      { t: "spec", gate: true },
      { t: "生成", hot: true },
      { t: "验收", gate: true },
      { t: "部署", gate: true },
      { t: "观测" },
      { t: "迭代" },
    ],
    loop: true,
    note: "AI 只吃掉「生成」一环，其余六环仍由人主导",
  },
  rag: {
    kind: "steps",
    items: [{ t: "提问" }, { t: "检索", s: "你的知识库", hot: true }, { t: "拼入上下文" }, { t: "生成回答" }],
    note: "先查资料再回答——检索质量决定七成效果",
  },
  idor: {
    kind: "compare",
    cols: [
      { title: "/orders/1024", tone: "good", items: ["✓ 是本人订单", "校验归属后返回"] },
      { title: "/orders/1023", tone: "bad", items: ["✗ 别人的订单", "漏校验 → 越权泄露"] },
    ],
    note: "换个 id 就能看别人的数据——服务端必须逐次校验归属",
  },
  "time-scales": {
    kind: "bars",
    rows: [
      { label: "内存", v: 4, text: "~100ns", tone: "good" },
      { label: "磁盘", v: 30, text: "~100µs", tone: "warn" },
      { label: "网络", v: 100, text: "~10ms+", tone: "bad" },
    ],
    note: "每跨一级慢上千倍——先问慢在哪个量级",
  },
  "quadratic-time": {
    kind: "curve",
    lines: [
      { fn: "const", label: "O(1)" },
      { fn: "log", label: "O(log n)" },
      { fn: "lin", label: "O(n)" },
      { fn: "quad", label: "O(n²)", hot: true },
    ],
    note: "双重循环：数据翻倍，耗时四倍",
  },
  "pass-rate": {
    kind: "gauge",
    value: 96,
    threshold: 95,
    label: "客服场景测试集",
    note: "达到阈值才准上线——「够好」必须量化",
  },
  "doom-loop": {
    kind: "steps",
    items: [{ t: "改一下" }, { t: "还是错" }, { t: "再改", hot: true }, { t: "更错" }],
    loop: true,
    note: "三轮不中就打断：清上下文、换角度、先讲根因",
  },
  fallback: {
    kind: "steps",
    items: [{ t: "调用 AI" }, { t: "超时/不合格", s: "触发", hot: true }, { t: "降级路径", s: "缓存/规则/隐藏" }],
    note: "宁可少给，不可崩给",
  },
  "data-masking": {
    kind: "compare",
    cols: [
      { title: "客服看到", tone: "good", items: ["138****1234", "尾号核对足够"] },
      { title: "接口全量返回", tone: "bad", items: ["13812341234", "抓包即泄露"] },
    ],
    note: "最小披露：能少给就少给",
  },
  "change-freeze": {
    kind: "bars",
    rows: [
      { label: "平时", v: 70, text: "正常变更", tone: "good" },
      { label: "大促前 2 周", v: 8, text: "封网：只放紧急修复", tone: "bad" },
      { label: "大促后", v: 55, text: "有序解冻", tone: "warn" },
    ],
    note: "稳定比新功能值钱的时刻",
  },
  harness: {
    kind: "compare",
    cols: [
      { title: "只有聊天框", tone: "bad", items: ["能说不能做", "看不见结果"] },
      { title: "模型 × Harness", tone: "good", items: ["工具·知识·观察", "行动·权限 五件套"] },
    ],
    note: "模型是引擎，Harness 是整台车",
  },
  "permission-boundary": {
    kind: "steps",
    items: [
      { t: "读文件", s: "自动放行" },
      { t: "改代码", s: "留痕可回滚" },
      { t: "删库/付款", s: "人工确认", gate: true, hot: true },
    ],
    note: "按可逆性分三档——不可逆的确认权永远在人手里",
  },
  sandbox: {
    kind: "compare",
    cols: [
      { title: "生产环境放飞", tone: "bad", items: ["删错=事故", "不敢放权"] },
      { title: "沙箱里折腾", tone: "good", items: ["坏了重开一间", "审查后才出去"] },
    ],
    note: "给 Agent 一间可以砸的房间",
  },
  hooks: {
    kind: "steps",
    items: [
      { t: "Agent 写文件" },
      { t: "Hook 触发", s: "lint + 测试", hot: true },
      { t: "失败回传", s: "它自己修" },
      { t: "通过放行", gate: true },
    ],
    note: "规范写进机制，不靠模型自觉",
  },
  "todo-discipline": {
    kind: "steps",
    items: [
      { t: "列清单", s: "计划外化" },
      { t: "做一项", hot: true },
      { t: "勾一项", s: "持续自我提醒" },
      { t: "全部勾完", gate: true },
    ],
    note: "防长任务中途「失忆」",
  },
  "context-compaction": {
    kind: "bars",
    rows: [
      { label: "对话 3 小时", v: 96, text: "窗口快满", tone: "bad" },
      { label: "压缩成摘要", v: 18, text: "结论留下", tone: "good" },
      { label: "关键结论", v: 30, text: "落进文件（不受压缩影响）", tone: "good" },
    ],
    note: "细节可丢，结论落盘",
  },
  "agent-memory": {
    kind: "compare",
    cols: [
      { title: "无记忆", tone: "bad", items: ["每次重讲规矩", "错误反复重犯"] },
      { title: "记忆文件", tone: "good", items: ["教一次一直会", "过时条目要清理"] },
    ],
    note: "跨会话的积累，写进文件",
  },
  "background-task": {
    kind: "bars",
    rows: [
      { label: "串行等待", v: 100, text: "测试 10 分钟干等", tone: "bad" },
      { label: "后台并行", v: 45, text: "同时推进下一项", tone: "good" },
    ],
    note: "慢活挂后台，窗口留给推理",
  },
  "agent-team": {
    kind: "compare",
    cols: [
      { title: "适合编队", tone: "good", items: ["300 页各改各的", "独立视角互相挑错"] },
      { title: "不适合", tone: "bad", items: ["核心模型设计", "三行代码的小活"] },
    ],
    note: "沟通成本定律对 AI 同样生效——看交接",
  },
  asr: {
    kind: "steps",
    items: [
      { t: "音频流", s: "噪声·口音·抢话", hot: true },
      { t: "声学识别" },
      { t: "文本输出", s: "错一词，下游全歪" },
    ],
    note: "拿自己场景的真实音频测",
  },
  tts: {
    kind: "bars",
    rows: [
      { label: "整段合成再播", v: 100, text: "~3s 开口", tone: "bad" },
      { label: "流式边合成边播", v: 15, text: "首包 <500ms", tone: "good" },
    ],
    note: "首包延迟决定对话像不像「人」",
  },
  "voice-agent": {
    kind: "steps",
    items: [
      { t: "听清", s: "ASR" },
      { t: "想好", s: "LLM", hot: true },
      { t: "说出", s: "TTS" },
      { t: "被打断", s: "随时回到听", gate: true },
    ],
    loop: true,
    note: "胜负手在全链路延迟与打断体验",
  },
  vad: {
    kind: "gauge",
    value: 62,
    threshold: 50,
    label: "静音判定阈值",
    note: "太灵敏喘气也触发，太迟钝说完没反应——阈值是门手艺",
  },
  "simultaneous-interpretation": {
    kind: "bars",
    rows: [
      { label: "等整句再译", v: 100, text: "准但慢 ~3s", tone: "warn" },
      { label: "抢先增量译", v: 30, text: "快但常改口", tone: "warn" },
      { label: "按场景定预算", v: 55, text: "大会字幕≠面对面", tone: "good" },
    ],
    note: "延迟与准确的极限拉扯，选平衡点",
  },
  "speaker-diarization": {
    kind: "compare",
    cols: [
      { title: "无分离", tone: "bad", items: ["张三的话记在李四头上", "文字全对，纪要不能用"] },
      { title: "按人分段", tone: "good", items: ["谁说的记谁头上", "允许人工改归属"] },
    ],
    note: "错误很隐蔽——归属错了没人察觉",
  },
};

// 生成配置在前，手写样例覆盖同名项
export const DEMOS: Record<string, DemoConfig> = {
  ...(GENERATED as Record<string, DemoConfig>),
  ...HAND,
};

export const hasVibeDemo = (id: string) => id in DEMOS;
