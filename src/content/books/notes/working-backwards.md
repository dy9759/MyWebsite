---
title: Working Backwards
book: "Working Backwards: Insights, Stories, and Secrets from Inside Amazon"
author: Colin Bryar, Bill Carr
date: 2026-10-21
summary: 两位亚马逊老兵把"从客户体验倒推"拆成可复制的机制，适合做 AI / 语音产品的人用来把客户承诺、关键问题和衡量方式前置到立项评审。
tags: 产品方法, PR/FAQ, 组织设计, 指标体系, 商业化
catalogId: R073
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
亚马逊的创新不是靠天才拍板，而是靠一套"机制"：领导力准则 + 抬杆者招聘 + 单线程团队 + 六页纸叙述 + PR/FAQ + 可控的投入指标，让"客户至上"在几十万人的规模下仍然能落到每一次决策里。

## 核心框架
- **好意不管用，机制才管用**：文化要靠流程、工具和检查点来强制落实，而不是靠"下次注意"。
- **从客户体验倒推**：先写一份面向客户的新闻稿和 FAQ，把"做给谁、解决什么、为什么现在"写清楚，再决定要不要投入研发。
- **用写作代替幻灯片**：六页纸叙述逼迫作者想清楚，会议前 20 分钟默读，让讨论围绕想法而不是演讲者。
- **可分离的单线程团队**：一个负责人只做一件事，团队之间像 API 一样低耦合，减少协调成本。
- **管理投入，而非产出**：收入、利润是结果，团队真正能推动的是选品、在库率、速度这类可控投入指标，且指标本身要不断校正。
- **长期主义与容忍失败**：发明必然伴随失败，关键是能否从失败中学习并保留做过的人。

## 章节笔记

<!-- chapter: 1. Building Blocks: Leadership Principles and Mechanisms -->
### 基石：领导力准则与机制（Building Blocks: Leadership Principles and Mechanisms）
- 早期贝佐斯能亲自把控每封客服邮件、每个包装细节；公司扩张到数百人后，这种"亲力亲为"无法再传递标准，于是需要把文化写下来。
- 领导力准则是 HR 访谈大量优秀管理者后"发现"出来的，而不是凭空设计；它们被嵌进面试、绩效评估、会议讨论里，因此员工不需要背诵。
- 准则不能自我执行，需要机制来强化：年度计划 OP1/OP2、数量多且细的 S-Team 目标（多数是投入型指标、按 SMART 写、并由财务集中跟踪），以及以长期股权为主的高管薪酬。
- 原文：「Good intentions don’t work. Mechanisms do.」
- 怎么用：做 AI 产品时，把"要重视 bad case""要关注延迟"这类口号，换成固定节奏的评测例会、上线前的检查清单和有人负责的指标看板。

<!-- chapter: 2. Hiring: Amazon’s Unique Bar Raiser Process -->
### 招聘：抬杆者流程（Hiring: Amazon’s Unique Bar Raiser Process）
- 作者用一个失败的招聘案例说明：招聘急迫感、确认偏误和"找像自己的人"会让团队在明知有疑点时仍然录用。
- 抬杆者（Bar Raiser）来自其他团队、经过专门训练，参与每一轮面试循环，确保流程被遵守；他们不承担岗位空缺的压力，因此不受急迫偏误影响。
- 流程包括：清晰的岗位描述、按准则分配面试维度的行为面试、提交前互不可见的书面反馈、由抬杆者主持的汇报会、背景调查。
- 抬杆者拥有否决权，但实际很少动用，更多作用在于让讨论回到证据和标准。
- 原文：「The Bar Raiser was granted the extraordinary power to veto any hire and override the hiring manager.」
- 原文：「To avoid bias, the interviewer may not see or discuss other members’ votes, comments, or feedback until their own feedback has been submitted.」
- 怎么用：招 AI 工程师或产品经理时，先各自写下带具体例子的书面反馈再开会讨论，并请一位非本团队的人来守住标准。

<!-- chapter: 3. Organizing: Separable, Single-Threaded Leadership -->
### 组织：可分离的单线程领导（Organizing: Separable, Single-Threaded Leadership）
- 随着增长，亚马逊发现团队之间的依赖（共享代码、数据库守门人、跨部门资源审批）让大家把更多时间花在协调而不是建设上。
- 他们一度尝试"改善协调"，包括 NPI 这类集中排优先级流程，但结论是协调本身就是病根，应当从源头切断依赖。
- 先是两个披萨团队，要求团队自给自足、有明确的"适应度函数"；后来发现综合指标反而难用、优秀的小团队负责人很稀缺，于是演化为单线程领导者（STL）模式：一个人全职负责一件事，团队可以大于两个披萨。
- 技术上的对应物是服务化和 API：团队之间通过定义清楚的接口协作，而不是靠邮件和会议。
- 原文：「We were spending more time coordinating and less time building.」
- 原文：「Appointing a single-threaded leader is necessary but not sufficient.」
- 怎么用：AI 新能力（比如一项新的语音能力）立项时，指定一个只对它负责的人，并检查团队是否被平台、数据、标注等外部依赖卡住；能做成接口的就别做成会议。

<!-- chapter: 4. Communicating: Narratives and the Six-Pager -->
### 沟通：叙述文档与六页纸（Communicating: Narratives and the Six-Pager）
- 2004 年 S-Team 会议停用 PowerPoint，改为六页纸叙述；会议开头所有人默读约 20 分钟，再进入讨论。
- 作者在当年的提案备忘录中论证：幻灯片的线性和低信息密度会丢掉细节和逻辑关联，而叙述文档能展现相互关联的论证，也让作者自己想得更清楚。
- 核心信条是"想法比演讲者更重要"：不再奖励擅长演讲的人，而是让文档本身经受审视。
- 六页纸结构因场景而异，常见有引言、信条、成果、失误、下期计划、人员需求；反馈被视为协作，有的团队逐行过稿。
- 原文：「This means a written narrative would contain seven to nine times the information density of our typical PowerPoint presentation.」
- 怎么用：AI 产品方案评审改用一份完整叙述文档，会上先默读再提问；尤其要求把模型能力边界、失败模式和取舍写成连贯段落，而不是几条 bullet。

<!-- chapter: 5. Working Backwards: Start with the Desired Customer Experience -->
### 逆向工作法：从期望的客户体验出发（Working Backwards: Start with the Desired Customer Experience）
- 数字业务早期，团队交给贝佐斯的方案缺少客户体验细节，他反复追问"样稿在哪里"，半成品样稿被视为半成品思考。
- 团队后来想到把产品概念写成新闻稿：传统公司在开发结束时才写新闻稿，亚马逊把它放到最前面，迫使大家先就功能、体验、价格达成一致。
- PR/FAQ 的规范：新闻稿不超过一页，FAQ 不超过五页；FAQ 分对外问题（客户和媒体会问的）与对内问题（市场规模、单位经济、依赖、可行性、前期投入风险）。
- 书中用一个虚构的智能邮箱产品演示完整 PR/FAQ；作者强调，多数 PR/FAQ 不会进入开发，这恰恰是流程的价值所在。
- 原文：「To Jeff, a half-baked mock-up was evidence of half-baked thinking.」
- 原文：「The primary point of the process is to shift from an internal/company perspective to a customer perspective.」
- 怎么用：每个新的语音 API 能力先写一页"发布新闻稿"：开发者是谁、今天的痛点、发布后他们能做到什么；FAQ 里必须回答价格依据、延迟与准确率目标、最难解决的体验问题和第三方依赖。

<!-- chapter: 6. Metrics: Manage Your Inputs, Not Your Outputs -->
### 指标：管理投入，而非产出（Metrics: Manage Your Inputs, Not Your Outputs）
- 股价、收入、利润都是产出指标，难以直接操纵；应当聚焦团队可控、最终会推动产出的投入指标，并用飞轮图把它们串起来。
- 指标生命周期：定义、测量、分析、改进、控制。选错投入指标的代价很大：曾经用"新增商品详情页数量"衡量选品，结果大量上新却不带来销售，后来改成"有库存可立即发货的详情页浏览占比"。
- 周业务回顾（WBR）用固定格式的指标图表，聚焦偏差而非预期内的数字，指标负责人解释波动，并把客户个案和异常报告放进同一份材料。
- 常见陷阱：会议变成救火、噪声淹没信号。
- 原文：「Output metrics—things like orders, revenue, and profit—are important, but they generally can’t be directly manipulated in a sustainable manner over the long term.」
- 原文：「The right input metrics get the entire organization focused on the things that matter most.」
- 怎么用：API 商业化不只盯收入和调用量，而是拆出可控投入：首次调用成功率、接入耗时、关键场景识别准确率、P95 延迟；并定期问"这个指标涨了，产出真的会涨吗"。

<!-- chapter: Introduction to Part Two -->
### 第二部分导言：发明机器（Introduction to Part Two）
- 贝佐斯希望亚马逊是"一个同时是发明机器的大公司"，而发明必须承受一连串失败的实验，Fire Phone 这样的失败也被视为有价值的前奏。
- 发明需要长期思维与客户至上相结合，并用第一部分的机制来保障执行。
- 作者也提醒：不是所有问题都需要发明，发明适合差异化真正重要的地方；没有预算就别勉强。
- 原文：「To invent you have to experiment, and if you know in advance that it’s going to work, it’s not an experiment.」
- 怎么用：给 AI 产品的探索项目单独留预算和预期失败率，同时先判断这件事是否属于能形成差异化的领域，不是的话直接用成熟方案。

<!-- chapter: 7. Kindle -->
### Kindle
- 2004 年 Bill Carr 被调去负责数字媒体，组织上把数字业务从实体零售中分离出来，这是单线程领导结构的早期案例。
- 团队从客户需求倒推，得出必须自己做硬件的结论，尽管亚马逊此前只是零售商；为此建立了专门的硬件团队，并收购了 Mobipocket。
- 关键体验目标是让读者忘记设备的存在；贝佐斯坚持不需要连接电脑、内置书店、通过无线网络（Whispernet）直接下载，这在当时极具争议，也需要和运营商谈判。
- 原文：「If we start with the customer and work backwards, then the most logical conclusion is that we need to create our own devices.」
- 怎么用：判断是否要自建某个环节（比如端侧模型、专用硬件、自有 SDK），先看客户体验是否离不开它，而不是看团队现有技能。

<!-- chapter: 8. Prime -->
### Prime 会员（Prime）
- 起点是对增长的焦虑和对运费痛点的认识：Super Saver 免运费降低了成本、拉高了客单价，但仍让客户在"慢而免费"与"快而昂贵"之间二选一，也覆盖不了时间敏感的客户。
- 团队讨论过积分、返利等忠诚度方案，但零售与航空不同，送出去的东西都有成本；重度用户会不会把会员费"吃垮"也是一大争议。
- 贝佐斯认为卡住的不是想法本身，而是被风险厌恶拖住的决策流程；最终组织一支小团队，在极度压缩的时间内（2005 年 2 月）上线了每年 79 美元的会员。
- 原文：「Most businesses don’t have the tools to evaluate the cost of not doing something.」
- 怎么用：对订阅或包量套餐这类没有充分数据的决定，把"不做的代价"也写进评审文档；数据不够时，由负责人带着清晰的假设拍板，再用上线后的数据修正。

<!-- chapter: 9. Prime Video -->
### Prime Video
- 2006 年的 Unbox 是 Bill Carr 自认最大的失败：只支持较新的 Windows 电脑、下载一部电影需要数小时、版权方限制繁多。
- 复盘结论是：团队把速度、媒体曝光和盯竞争对手放在了客户体验之前；而且客户更在意下载速度而不是画质。
- 亚马逊没有因此解雇负责人，而是要求把教训分享给其他团队；此后通过把流媒体作为 Prime 的附带权益、做 Fire TV 等设备、成立 Amazon Studios，花十年才把体验做对。
- 原文：「We had prioritized speed, press coverage, and competitor obsession over the customer experience.」
- 怎么用：赶在竞品发布会前上线 AI 功能前，先问一句"用户第一次用的时候会不会卡住"；上线失败后保留负责人，把复盘写成全组可读的文档。

<!-- chapter: 10. AWS -->
### AWS
- AWS 的种子来自联盟计划开放商品数据接口：开发者用它做出了团队完全没想到的应用，亚马逊因此意识到开发者是一个全新的客户群体。
- 团队判断，存储、计算这类基础能力会逐渐变成无差别的商品，而亚马逊自己已经掌握这些"原语"，可以把它们做成按需使用的云服务。
- Andy Jassy 从技术顾问岗位出来，选择从零开始一项新业务；早期大约六项服务里只有 S3 和 EC2 迅速成功，贝佐斯与团队每两周深度评审一次。
- 原文：「I told Jeff that every day since the launch, software developers were creating applications that used the features in ways we had never imagined.」
- 怎么用：语音 API 也要把开发者当成真正的客户来经营，持续观察他们的意外用法；把底层能力拆成简单、可组合的原语，比一开始就做大而全的解决方案更容易被采用。

<!-- chapter: Conclusion: Being Amazonian Beyond Amazon -->
### 结语：在亚马逊之外做"亚马逊人"（Conclusion: Being Amazonian Beyond Amazon）
- 这些做法并不轻松：单线程团队强度高，叙述文档要接受所有人的批评，投入指标需要反复试错，长期股权激励也与短期奖金文化相悖。
- 作者给出可以从小处开始的清单：停用 PPT、建立抬杆者流程、聚焦可控投入指标、调整组织为单线程团队、调整高管薪酬、写下文化与准则、画出自己的飞轮。
- 他们强调这些方法是"分形"的，任何规模的团队都可以局部采用。
- 原文：「Ban PowerPoint as a tool to discuss complicated topics and start using six-page narratives and PR/FAQ documents in your leadership team meetings.」
- 怎么用：不照搬全套流程，先在一个新品评审里试 PR/FAQ + 默读，再在周会上把一个产出指标拆成两三个投入指标。

## 读完留下

**语音 API 新品 PR/FAQ 模板（一页新闻稿 + FAQ）**

- 标题：一句话说清"谁现在可以做到什么"
- 副标题：目标开发者 / 场景 + 最大的一个收益
- 第一段：发布了什么、何时可用、面向谁
- 第二段：开发者今天的痛点（具体场景，不写技术名词堆砌）
- 第三段：怎么解决，接入后体验的关键一步
- 客户引语（虚构但可信）：为什么愿意换
- 如何开始：文档、SDK、试用额度
- 对外 FAQ：价格怎么算？延迟和准确率是多少？支持哪些语言 / 口音 / 噪声环境？数据如何处理？
- 对内 FAQ：目标市场有多大、需求有多强？单位经济是否成立？最难的体验问题是什么？依赖哪些第三方或内部团队？如何控制前期投入风险？为什么现在做？

**配套业务指标（先投入、后产出）**

| 类型 | 指标 | 负责人 | 检查频率 |
|---|---|---|---|
| 投入 | 首次调用成功率、接入耗时 |  | 每周 |
| 投入 | 关键场景准确率、P95 延迟 |  | 每周 |
| 投入 | 文档 / 示例覆盖的高频问题比例 |  | 每月 |
| 产出 | 活跃开发者数、调用量、收入、留存 |  | 每月 |

每季度复查一次：投入指标的提升是否真的带动了产出，没有就换指标。

## 我的问题清单
- 小团队资源有限，PR/FAQ 中哪些对内 FAQ 必须答清才能立项，哪些可以留到原型阶段？
- AI 能力的效果不确定性很高，新闻稿里的承诺应该写到什么程度，才不至于变成空头支票？
- 单线程负责人在共享模型平台、共享数据的组织里，如何避免依赖重新变成协调成本？
- 投入指标被团队"刷"起来却不带动产出时，最早能在 WBR 的什么信号里看出来？
