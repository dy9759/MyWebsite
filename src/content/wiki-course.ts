// 闭环学院 course data — imported with authorization (the course is the
// user's own personalized program, anchored on their product). Structure only;
// full lesson bodies live in public/wiki/lessons/*.json and load on demand.
export type CourseNode = {
  id: string;
  title: string;
  type: string;
  minutes: number;
  lessonId: string;
  hook: string;
};
export type CourseChapter = {
  id: string;
  index: number;
  title: string;
  tagline: string;
  milestone: string;
  nodes: CourseNode[];
};

export const COURSE_CHAPTERS: CourseChapter[] = [
  {
    "id": "ch0",
    "index": 0,
    "title": "你刚刚创造了什么",
    "tagline": "解剖一次 vibe coding —— 从你已有的经验出发，认识你亲手造出来的东西",
    "milestone": "里程碑：用 AI 生成你产品的 v0.1，亲手画出它的文件地图",
    "nodes": [
      {
        "id": "c0n1",
        "title": "解剖一次 vibe coding",
        "type": "概念",
        "minutes": 35,
        "lessonId": "vibe",
        "hook": "AI 给你生成的那堆文件到底是什么？逐个拆开看。"
      },
      {
        "id": "c0n2",
        "title": "本地与服务器：代码住在哪里",
        "type": "概念",
        "minutes": 35,
        "lessonId": "localserver",
        "hook": "localhost 为什么别人打不开？\"我电脑上\"和\"线上\"的关系。"
      },
      {
        "id": "c0n3",
        "title": "从输入网址到看到页面",
        "type": "概念",
        "minutes": 35,
        "lessonId": "url2page",
        "hook": "DNS、HTTP、那 0.3 秒里发生的一切。"
      }
    ]
  },
  {
    "id": "ch1",
    "index": 1,
    "title": "软件的解剖学",
    "tagline": "前端、后端与数据的世界 —— 看懂结构，才能对话、排期、验收",
    "milestone": "里程碑：画出你产品的三层结构图和数据模型草图",
    "nodes": [
      {
        "id": "c1n1",
        "title": "前端、后端与数据库",
        "type": "概念",
        "minutes": 45,
        "lessonId": "frontback",
        "hook": "点一下\"下单\"按钮，请求走过哪几站？看动画就懂。"
      },
      {
        "id": "c1n2",
        "title": "API：系统间的契约",
        "type": "概念",
        "minutes": 40,
        "lessonId": "api",
        "hook": "你写的 PRD 其实就是一份契约 —— API 是它的工程版本。"
      },
      {
        "id": "c1n3",
        "title": "数据建模：产品的骨架",
        "type": "概念",
        "minutes": 40,
        "lessonId": "datamodel",
        "hook": "数据模型错了，AI 写再多代码也救不回来。"
      },
      {
        "id": "c1n4",
        "title": "技术栈地图：AI 为什么默认给你这套",
        "type": "权衡",
        "minutes": 40,
        "lessonId": "stackmap",
        "hook": "Next.js、Supabase、Python……选型到底在选什么？"
      }
    ]
  },
  {
    "id": "ch2",
    "index": 2,
    "title": "认识你的 AI 程序员",
    "tagline": "大模型如何写代码 —— 懂你的搭档，才能指挥它（全课程最大差异化）",
    "milestone": "里程碑：用 spec 方式让 AI 一次做对你产品的一个功能",
    "nodes": [
      {
        "id": "c2n1",
        "title": "LLM 是怎么工作的",
        "type": "概念",
        "minutes": 50,
        "lessonId": "llm",
        "hook": "token、上下文窗口、概率生成——AI 为什么会忘、会编造。"
      },
      {
        "id": "c2n2",
        "title": "上下文工程与 spec 写作",
        "type": "流程",
        "minutes": 50,
        "lessonId": "spec",
        "hook": "为什么同样的需求，有人一次成型，有人拉扯二十轮。"
      },
      {
        "id": "c2n3",
        "title": "AI 失效模式图鉴",
        "type": "鉴别",
        "minutes": 50,
        "lessonId": "aifail",
        "hook": "幻觉 API、绕圈、过度自信、\"能跑但错了\"——逐个识别。"
      }
    ]
  },
  {
    "id": "ch3",
    "index": 3,
    "title": "工程安全网",
    "tagline": "不丢东西、不弄坏 —— Git、环境、部署与密钥",
    "milestone": "里程碑：上线！朋友的手机能打开你的产品",
    "nodes": [
      {
        "id": "c3n1",
        "title": "Git：软件世界的后悔药",
        "type": "流程",
        "minutes": 50,
        "lessonId": "git",
        "hook": "AI 大改之前先存档——十万行 AI 代码时代的安全带。"
      },
      {
        "id": "c3n2",
        "title": "环境与部署：为什么不能直接改线上",
        "type": "流程",
        "minutes": 45,
        "lessonId": "deploy",
        "hook": "dev / staging / prod —— 三个环境救过无数产品的命。"
      },
      {
        "id": "c3n3",
        "title": "密钥与配置：最贵的一次 git push",
        "type": "流程",
        "minutes": 40,
        "lessonId": "secrets",
        "hook": ".env 提交到 GitHub、API key 泄露——vibe coding 事故率第一名。"
      }
    ]
  },
  {
    "id": "ch4",
    "index": 4,
    "title": "能跑 ≠ 能上线",
    "tagline": "安全与验收 —— 在\"演示成功\"和\"真实上线\"之间设一道闸",
    "milestone": "里程碑：拿着验收清单，给你的产品做一次完整安全验收",
    "nodes": [
      {
        "id": "c4n1",
        "title": "认证与授权：最贵的一课",
        "type": "鉴别",
        "minutes": 45,
        "lessonId": "authz",
        "hook": "这段 AI 代码通过了所有测试，却能让任何用户看到别人的订单。"
      },
      {
        "id": "c4n2",
        "title": "输入与数据安全",
        "type": "鉴别",
        "minutes": 35,
        "lessonId": "inputsec",
        "hook": "注入攻击、脏数据、用户上传的一切都不可信。"
      },
      {
        "id": "c4n3",
        "title": "验收思维：读代码 > 写代码",
        "type": "鉴别",
        "minutes": 50,
        "lessonId": "acceptance",
        "hook": "AI 时代你的真实工作姿势不是生产者，是验收者。本章总纲。"
      }
    ]
  },
  {
    "id": "ch5",
    "index": 5,
    "title": "给产品装上 AI",
    "tagline": "AI 产品工程 —— 从\"AI 帮你写产品\"到\"产品里有 AI\"",
    "milestone": "里程碑：给产品加一个真 AI 功能，并算出单用户成本",
    "nodes": [
      {
        "id": "c5n1",
        "title": "数量级直觉：快慢与成本的物理学",
        "type": "直觉",
        "minutes": 40,
        "lessonId": "magnitude",
        "hook": "大模型是全速度表最慢的一行——猜错数量级，AI 功能的账单和体验都会失控。"
      },
      {
        "id": "c5n2",
        "title": "非确定性工程：兜底、结构化、流式",
        "type": "流程",
        "minutes": 45,
        "lessonId": "nondeterm",
        "hook": "概率系统怎么做出确定性的产品体验。"
      },
      {
        "id": "c5n3",
        "title": "RAG、Agent 与 MCP",
        "type": "概念",
        "minutes": 45,
        "lessonId": "ragagent",
        "hook": "让 AI 有记忆、会用工具——现代 AI 产品的三块积木。"
      },
      {
        "id": "c5n4",
        "title": "Evals：非确定性系统怎么算\"够好\"",
        "type": "权衡",
        "minutes": 45,
        "lessonId": "evals",
        "hook": "会评测 AI 的 PM，比会用 AI 的 PM 值钱十倍。"
      }
    ]
  },
  {
    "id": "ch6",
    "index": 6,
    "title": "有用户之后",
    "tagline": "运维、成本、性能与结构 —— 产品活着且长得动，才谈得上增长",
    "milestone": "里程碑：给产品接上日志并亲手定位一次故障；画出你产品的模块边界地图",
    "nodes": [
      {
        "id": "c6n1",
        "title": "可观测性：出事了你怎么知道",
        "type": "流程",
        "minutes": 45,
        "lessonId": "observability",
        "hook": "日志、监控、报警——没有它们，线上事故就是盲人摸象。"
      },
      {
        "id": "c6n2",
        "title": "云成本：账单从哪来",
        "type": "直觉",
        "minutes": 35,
        "lessonId": "cloudcost",
        "hook": "IaaS / PaaS / Serverless，以及为什么账单会爆炸。"
      },
      {
        "id": "c6n3",
        "title": "并发：抢库存为什么会超卖",
        "type": "直觉",
        "minutes": 45,
        "lessonId": "concurrency",
        "hook": "两个请求同时到达，世界就不一样了。"
      },
      {
        "id": "c6n4",
        "title": "复杂度：为什么一万条就卡了",
        "type": "直觉",
        "minutes": 40,
        "lessonId": "complexity",
        "hook": "O(n²) 不是数学题，是商业后果。"
      },
      {
        "id": "c6n5",
        "title": "架构与解耦：为什么越改越乱",
        "type": "权衡",
        "minutes": 50,
        "lessonId": "arch",
        "hook": "第 15 个功能之后每改必坏？边界是 AI 替不了你画的那条线。"
      }
    ]
  },
  {
    "id": "ch7",
    "index": 7,
    "title": "规模的智慧",
    "tagline": "工程思想毕业课 —— 亲历过前六章的痛，经典才真正砸中你",
    "milestone": "毕业：产品复盘答辩 + 你的判断力档案",
    "nodes": [
      {
        "id": "c7n1",
        "title": "人月神话与 Brooks 定律 ⭐",
        "type": "定律",
        "minutes": 55,
        "lessonId": "brooks",
        "hook": "1000 人为什么干不过承诺？三关模拟器亲手玩出 50 年不倒的定律。"
      },
      {
        "id": "c7n2",
        "title": "技术债：借了就要还",
        "type": "权衡",
        "minutes": 40,
        "lessonId": "techdebt",
        "hook": "快糙上线还是好好写？亲手经营六次决策，看三个月后的代价。"
      },
      {
        "id": "c7n3",
        "title": "没有银弹：本质复杂度",
        "type": "定律",
        "minutes": 45,
        "lessonId": "nosilver",
        "hook": "AI 消灭了哪种复杂度、没消灭哪种——全课程的理论地基。"
      },
      {
        "id": "c7n4",
        "title": "康威定律与人机分工（毕业课）",
        "type": "定律",
        "minutes": 55,
        "lessonId": "conway",
        "hook": "组织决定架构；闭环七环里，哪些必须人做 gate——课程总纲。"
      }
    ]
  }
];

export const COURSE_TOTAL_LOOPS = COURSE_CHAPTERS.reduce(
  (n, ch) => n + ch.nodes.length,
  0,
);
