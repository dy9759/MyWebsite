// Reading routes over the catalog: one work goal → a short ordered list.
// The advice is to keep one route plus one parallel long read at a time.

export type ReadingRoute = {
  id: string;
  title: string;
  goal: string;
  steps: string[]; // catalog ids, in reading order
  parallel?: boolean; // "pick one at a time" rather than a strict sequence
  output: string;
};

export const READING_ROUTES: ReadingRoute[] = [
  {
    id: "monetize",
    title: "推进 AI / 语音 API 商业化",
    goal: "弄清客户为什么买、愿意为什么付费",
    steps: ["R046", "R055", "R056", "R010"],
    output: "客户证据、最佳客户画像、差异价值、套餐与价格试验",
  },
  {
    id: "quality",
    title: "完善质量与上线判断",
    goal: "定义产品怎样算「做好了」、什么情况下可以上线",
    steps: ["R002", "R005", "R032"],
    output: "错误分类、最低质量标准、评测与发布流程、方案取舍",
  },
  {
    id: "engineering",
    title: "与算法、工程更有效地讨论方案",
    goal: "说清问题出在模型、数据、系统还是交互",
    steps: ["R032", "R038", "R037"],
    output: "质量、延迟、稳定性、成本、交互体验的方案取舍表",
  },
  {
    id: "agent",
    title: "推进 Voice Agent / 工具调用",
    goal: "选对架构、能验收、守住权限边界",
    steps: ["R012", "R015", "R027"],
    output: "架构选择、任务验收、权限与数据流检查",
  },
  {
    id: "people",
    title: "人物与产业并行阅读",
    goal: "理解关键决策在当时的约束下为什么会发生",
    steps: ["R070", "R062", "R075", "R077"],
    parallel: true,
    output: "关键决策、当时约束、付出的代价，以及其他可能的解释",
  },
];

export const READING_PRINCIPLES = [
  "把它当成可检索的阅读库，而不是按顺序读完的书单。",
  "同时只保留一条工作主线 + 一本并行长读，不要一次开启十几本。",
  "让每篇文章、每本书改变一个实际判断：方法类留下检查表，商业类留下待验证的客户假设，传记类留下「在当时的约束下为什么这样决定」。",
  "推荐指数是针对当前阶段的主观判断，不是销量、评分或社交平台推荐次数；低优先级不等于书不好。",
];
