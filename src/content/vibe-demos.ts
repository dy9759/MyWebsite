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
};

// 生成配置在前，手写样例覆盖同名项
export const DEMOS: Record<string, DemoConfig> = {
  ...(GENERATED as Record<string, DemoConfig>),
  ...HAND,
};
