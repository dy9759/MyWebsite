---
title: Build
book: Build: An Unorthodox Guide to Making Things Worth Making
author: Tony Fadell
date: 2026-10-20
summary: 一本把"做产品"拆成约束、代际和叙事的实战手册，适合做 AI / 语音产品的人用来校准 V1 该押注什么、该砍掉什么。
tags: 产品决策, 硬件与体验, 产品叙事, 团队成长, 创业
catalogId: R070
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
Fadell 用 iPod、iPhone、Nest 的一线经历说明：好产品不是靠数据堆出来的，而是在时间、团队、代际这些硬约束下，带着一个清楚的"为什么"做出取舍。

## 核心框架
- **数据决策 vs 观点决策**：先判断眼前的决定属于哪一类。全新产品几乎没有可靠数据，硬把观点问题变成数据问题只会陷入分析瘫痪。
- **产品 = 完整的用户旅程**：从第一次听说到最终弃用，每一段都要被"原型化"，实体或屏幕上的那个东西只占很小一部分。
- **先讲"为什么"，再做"做什么"**：产品故事是开发工具而不只是营销文案，故事讲不通的地方，产品多半也有问题。
- **颠覆、演进、执行三者平衡**：V1 必须有值得一战的颠覆点，但不能一次改变太多；V2、V3 才是打磨和赚钱的阶段。
- **用约束逼出决策**：外部截止日期、内部"心跳"节奏、小团队、有限预算，都是让团队停止无限打磨的手铐。
- **成长必然打破组织**：团队规模跨过几个断点时，沟通方式和管理层级必须提前调整。

## 章节笔记

<!-- chapter: Chapter 1.4: Don’t (Only) Look Down -->
### 别只盯着脚下（Don’t (Only) Look Down）
- 一线执行者大部分时间理应埋头做细节，但需要留出一部分时间"抬头看远方、环顾四周"。
- 抬头是确认使命和中期里程碑是否仍然成立；环顾是去和市场、支持、销售等平行团队聊，他们往往最早看到撞墙的迹象。
- 作者在 General Magic 被一位产品经理一句"没人在乎那个会走路的柠檬"点醒：工程师喜欢的炫技功能，用户未必需要。
- 原文：「Your job isn’t just doing your job. It’s also to think like your manager or CEO.」
- 怎么用：我做 AI 功能时，定期去看客服工单和销售反馈，检查团队热衷的"酷功能"是不是另一个会走路的柠檬。

<!-- chapter: Chapter 2.2: Data Versus Opinion -->
### 数据还是观点（Data Versus Opinion）
- 关键决策要先分清是数据驱动还是观点驱动；后者缺乏足够数据，只能靠洞察、专家意见和直觉，并由决策者承担后果。
- 作者在 Philips 时期过度依赖用户焦点小组，同一批人周一选 X、周五选 Y，数据成了拐杖甚至水泥鞋。
- A/B 测试可以诊断问题、优化局部，但不能替代产品愿景；如果产品核心都能被测试结果随意改动，那就等于没有核心。
- 做出观点型决定后，要向团队讲清思考过程，倾听反对意见，但不搞投票。
- 原文：「But data can’t solve an opinion-based problem.」
- 原文：「A/B and user testing is not product design. It’s a tool.」
- 怎么用：对话式产品里，提示词措辞、按钮位置可以 A/B；但"要不要让用户打断 AI 说话"这类核心交互，应该由产品判断定方向，再用测试验证细节。

<!-- chapter: Chapter 3.1: Make the Intangible Tangible -->
### 把无形变有形（Make the Intangible Tangible）
- 产品不只是那个东西本身，而是从认知、购买、安装、使用、维修到退货的整条旅程，每段衔接处用户都会问一次"为什么"。
- 作者常把别人递来的精美原型先放到一边，反问"不做这个硬件，能不能解决问题"。硬件只有在不可替代时才值得做。
- Nest 团队一度只顾恒温器本体，忽视了占据用户大部分体验的手机 App；作者认为这和硬件同等重要。
- 用包装盒、虚拟新闻稿、线框图等方式，把整条旅程提前做成看得见、摸得着的原型。
- 原文：「If hardware doesn’t absolutely need to exist to enable the overall experience, then it should not exist.」
- 原文：「You should be prototyping your marketing long before you have anything to market.」
- 怎么用：做语音产品前先问"不做新设备 / 新 App，只做一个接入现有渠道的能力行不行"，并把用户从听说到放弃的每一步画出来。

<!-- chapter: Chapter 3.2: Why Storytelling -->
### 为什么要讲故事（Why Storytelling）
- 好的产品故事同时打动感性与理性、把复杂概念讲简单、并反复提醒用户要解决的问题。
- 乔布斯发布 iPhone 时先用"怀疑病毒"让观众重新意识到旧手机的烦恼，再给出解决方案。
- 故事在开发期就每天被讲、被打磨；故事讲不通的部分会倒逼产品修改，例如 iPhone 选择玻璃面板和不要实体键盘。
- 做得越久，团队越容易只谈"做什么"而忘了外人并不了解"为什么"。
- 原文：「If part of the story didn’t work, then part of the product wasn’t going to work, either, and would need to be changed.」
- 怎么用：每个 AI 功能立项时先写一段面向用户的"为什么"，讲给不在项目里的同事听，卡壳的地方就是需要重新设计的地方。

<!-- chapter: Chapter 3.3: Evolution Versus Disruption Versus Execution -->
### 演进、颠覆与执行（Evolution Versus Disruption Versus Execution）
- V1 应该有颠覆性，否则聪明人听完只会耸肩；但颠覆不能取代扎实执行，有时还需要在渠道、商业模式上一起创新。
- 颠覆失败的三种典型：只做一个亮点而忽视完整体验；因技术太难放弃了唯一的差异点；一次改变太多，超出用户的心智模型。
- 第一代 iPod 没有音乐商店，不是没想到，而是从 CD 到 MP3 已经是足够大的一跳，要给用户站稳的时间。
- 原文：「You can’t push people too far outside their mental model. Not at first.」
- 怎么用：AI 产品的 V1 只押一个颠覆点，其余交互尽量沿用用户熟悉的形态，把第二个颠覆留到下一代。

<!-- chapter: Chapter 3.4: Your First Adventure—and Your Second -->
### 第一次与第二次冒险（Your First Adventure—and Your Second）
- V1 的决策工具优先级是：愿景 > 用户洞察 > 数据；到了 V2，有了付费用户，顺序变为数据 > 洞察 > 愿景，但愿景不能丢。
- 不只是产品有 V1、V2，团队和流程同样有第一版和第二版；V1 团队还在建立信任，风险被放大。
- iPhone 不做实体键盘的争论说明：面对全新用户群，市场团队基于旧用户的数据判断并不可靠。
- 原文：「But this information will never be definitive. It won’t make your decisions for you.」
- 怎么用：写产品决策时标注当前处于 V1 还是 V2 阶段，据此决定这次该更信愿景还是更信数据。

<!-- chapter: Chapter 3.5: Heartbeats and Handcuffs -->
### 心跳与手铐（Heartbeats and Handcuffs）
- 时间是最好的约束；最好有一个外部、不可移动的截止日期，再用团队心跳和项目心跳组成内部节奏。
- General Magic 一再延期，直到竞争压力出现才开始真正做取舍；iPhone 则给每个概念设定短周期，不行就重置。
- 概念阶段保持小团队、少预算，否则大量人员围观反复推翻会造成混乱，大预算还会导致过度设计。
- 原文：「You need constraints to make good decisions and the best constraint in the world is time.」
- 原文：「So keep your project small as long as you can.」
- 怎么用：给每个 AI 原型设一个固定验证窗口和明确的"重置"条件，到点就决定继续、换假设还是停。

<!-- chapter: Chapter 3.6: Three Generations -->
### 三代产品（Three Generations）
- 颠覆性产品通常要三代才能做对并盈利：V1 求产品市场匹配，V2 求单位经济，V3 求整体盈利。
- 不同代对应不同用户：V1 面向尝鲜者，V2 面向早期大众，V3 面向要求完美的大众市场。
- 外包与自建也随代际变化：V1 多外包求速度，V2 把关键能力收回内部，V3 只外包小而受控的任务。
- 原文：「You typically need to create at least three generations of any new, disruptive product before you get it right and turn a profit.」
- 怎么用：做 API 商业化规划时，先承认 V1 不赚钱，明确每一代的目标是"证明有人要"、"单次调用算得过账"还是"公司整体赚钱"。

<!-- chapter: Chapter 4.1: How to Spot a Great Idea -->
### 如何识别好点子（How to Spot a Great Idea）
- 好点子的三要素：回答了"为什么"、解决很多人日常的问题、即使研究过难度后仍然挥之不去。
- 越是让人激动的点子，越要放慢，先调研、做原型、写计划，看它是否持续"追着你跑"。
- 区分止痛药和维生素：前者解决持续的痛点，缺了马上会察觉。
- 原文：「The best ideas are painkillers, not vitamins.」
- 怎么用：评估新 AI 功能时先问"用户少了它会不会立刻难受"，答不上来就降为维生素，排到后面。

<!-- chapter: Chapter 4.4: You Can Only Have One Customer -->
### 只能有一个客户（You Can Only Have One Customer）
- 无论 B2B、B2C 还是更复杂的组合，主要精力和品牌只能服务一类客户，否则产品、团队、定价都会被撕裂。
- Apple 做企业服务器失败；反而是消费者爱上 iPhone 后，企业被员工倒逼接纳它。
- 如果必须兼顾两类客户，品牌和营销仍应面向个人，因为企业里做选择的也是人。
- 原文：「You cannot make a single product for two completely opposite customers—for two different customer journeys.」
- 怎么用：一个语音能力同时卖给开发者和终端用户时，先定谁是唯一主客户，另一方的需求只能作为附加，不能改写核心定义。

<!-- chapter: Chapter 5.2: Breakpoints -->
### 断点（Breakpoints）
- 公司增长到一定人数就会"断"，通常出现在新增管理层的时刻，伴随沟通变慢和信息不均。
- 早期一个人能直接管的人数更多，之后会收窄；要在临界点之前提前搭建管理层，并辅导新管理者。
- 断点往往出现在一切顺利的时候，生日蛋糕这种小事也会变成文化冲突。
- 原文：「Growth will break your company.」
- 怎么用：团队扩张前先写下信息如何同步、谁做哪类决策，不要等出现"有人不知道这个决定"才补。

<!-- chapter: Chapter 5.3: Design for Everyone -->
### 人人都要设计（Design for Everyone）
- 设计不是某个职业的专利，而是一种思考方式：理解客户、拆解问题、系统地寻找优雅解法。
- 两个原则：运用设计思维，以及对抗"习惯化"，不把日常小麻烦当成理所当然。
- 遥控器例子说明：真正的问题往往不是"遥控器太多"，而是背后具体的使用场景。
- 原文：「At its core, designing simply means thinking through a problem and finding an elegant solution.」
- 怎么用：收到"加一个功能"的需求时，先还原用户在什么场景、什么时刻遇到问题，再决定是否真的需要新功能。

<!-- chapter: Chapter 5.4: A Method to the Marketing -->
### 营销也有方法（A Method to the Marketing）
- 营销不能放到最后，产品和市场团队从一开始就要合作，用营销来给产品叙事做原型。
- 产品本身就是品牌，每个触点都在做营销，各触点需要一起设计、各自承担一部分信息。
- 信息架构模板：列出痛点（为什么）、止痛药（怎么做）、感性上"我想要"与理性上"我需要"的理由。
- 原文：「The best marketing is just telling the truth.」
- 怎么用：给 AI 功能写对外说明时用这四栏表格梳理，并且只写真实能做到的能力，不夸大准确率或场景。

<!-- chapter: Chapter 5.5: The Point of PMs -->
### 产品经理的意义（The Point of PMs）
- 产品经理不等于项目经理、市场或设计，而是定义产品该做什么、写出规格和对外信息，并作为用户的代言人。
- 规格回答"怎么工作"，信息回答"用户为什么在乎"，后者必须在开工前就想清楚。
- 规格和信息不是一成不变的说明书，需要随新现实调整，但不能靠共识来做决定。
- 原文：「Figuring out what should be built and why is the hardest part of building.」
- 怎么用：每个需求文档同时附上"规格"和"一句话用户价值"，两者对不上就不开工。

## 读完留下
用一个产品决策写出约束与替代选项（决策卡模板）：

- **决策是什么**：一句话写清要做或不做的事。
- **决策类型**：数据驱动 / 观点驱动？若是观点驱动，写下依据的洞察和最终拍板人。
- **所处代际**：V1 / V2 / V3？据此排定愿景、洞察、数据的优先级。
- **为什么**：这是止痛药还是维生素？用一句用户能听懂的话说出来。
- **约束**：
  - 时间：外部截止点是什么，内部心跳节奏如何？
  - 人和钱：最少需要几个人、多少预算就能验证？
  - 客户：唯一主客户是谁，另一类客户的需求放在哪里？
  - 心智模型：这次改变了用户多少习惯，是否超出能接受的范围？
- **替代选项**（至少三个）：
  1. 不做新东西，只改造现有旅程中的某一段；
  2. 只保留一个颠覆点，其余沿用熟悉形态；
  3. 推迟到下一代，本代只为它铺路。
- **放弃了什么**：明确写下被砍掉的功能和理由。
- **故事测试**：把这个决策讲给项目外的人听，哪里讲不通就回到上面重新取舍。
- **重置条件**：到什么时间点、出现什么信号就推翻重来。

## 我的问题清单
- AI 产品迭代速度远快于硬件，"三代才盈利"的节奏在模型能力每隔几个月就变化的环境里还成立吗？
- 当模型本身的能力边界不确定时，如何区分"技术太难所以放弃颠覆点"和"及时止损"？
- 面向开发者的 API 与面向终端用户的应用，是否真的只能选一个主客户？平台型业务的例外条件是什么？
- 观点驱动的决策由谁拍板、如何留痕，才能在团队扩张越过断点后仍保持一致？
