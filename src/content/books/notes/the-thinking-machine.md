---
title: 思考机器
book: The Thinking Machine: Jensen Huang, Nvidia, and the World's Most Coveted Microchip
author: Stephen Witt
date: 2026-10-21
summary: 从游戏显卡到 AI 基础设施，英伟达的每一次关键赌注都有具体的约束和代价——这本书帮我把芯片、架构、软件生态和公司选择放在一条时间线上看，而不只盯着模型发布。
tags: 产业史, 英伟达, 算力, 软件生态, 技术赌注
catalogId: R075
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话

一家做游戏显卡的小公司，凭着对并行计算长达十多年的亏损坚持和 CUDA 软件栈，在神经网络突然起飞时接住了整个行业——作者同时提醒，这是一个由焦虑、强硬管理和高风险押注共同写成的故事。

## 核心框架

- **技术赌注要放在约束里看**：每一次押注（仿真器、并行流水线、可编程着色器、CUDA、深度学习）都发生在现金紧张、竞争者众多或投资人质疑的时刻，书中把条件和代价都写出来了。
- **"零十亿美元市场"**：黄仁勋愿意为一个今天没有收入、只有少数科研用户的市场长期投入，赌它将来只属于自己。
- **软件栈才是护城河**：作者的判断是英伟达赢在软件而不是电路——CUDA 免费、只跑在自家硬件上，把开发者锁进生态。
- **两种被冷落的技术相遇**：神经网络和并行计算都曾被视为死路，AlexNet 证明二者合在一起才成立。
- **规模的外部成本**：后期的电力、地缘政治、估值预期和 AI 风险争论，作者都放在台面上，并明确说明自己对 AI 的担忧。

## 章节笔记

<!-- chapter: Introduction -->
### 引言（Introduction）
- 作者概括全书：一家小众游戏硬件供应商如何成为全球最有价值的公司；关键是 1990 年代末为渲染《雷神之锤》做的并行架构改动，以及多年亏损后在 2012 年被多伦多学者用于训练神经网络。
- 他形容黄仁勋像工程师而不像商人：把难题拆成简单原则再放大；同时承认黄仁勋是很难报道的对象，书基于对近两百人的采访。
- 黄仁勋没有签署 2023 年把 AI 风险与核战争并列的声明，这条分歧贯穿到书末。
- 原文：「But if Huang is motivated by anxiety, he is also motivated by fascination with the seductive power his technology has unlocked.」
- 怎么用：读人物史时，我把"动机"和"决策"分开记——同一个决定，可以既出于恐惧也出于好奇，复盘时两者都要写。

<!-- chapter: Chapter One: The Bridge -->
### 第1–2章 桥与大规模集成（The Bridge / Large-Scale Integration）
- 十岁的黄仁勋和哥哥被送到肯塔基一所实为少年管教学校的寄宿学校，被欺负、打扫厕所，却在学业上拔尖；高中时打乒乓球到全国水平，在 Denny's 打工。
- 作者认为他最独特的品质是近乎极端的专注。
- 毕业后在 AMD、LSI Logic 做芯片设计，以惊人的工作强度出名；与 Sun 的 Priem、Malachowsky 合作推出 Sun GX，两人提出做面向 PC 游戏的廉价版本被 Sun 拒绝，这成为创业的起点。
- 原文：「Huang was athletic and had good reflexes, but his unique quality was his exceptional focus.」
- 怎么用：机会常常来自大公司"不想做的便宜版本"；我会留意合作方明确拒绝的需求，它们可能正是独立产品的起点。

<!-- chapter: Chapter Three: New Venture -->
### 第3章 新创业（New Venture）
- 1993 年三人在 Denny's 讨论，黄仁勋反复推演，直到确信游戏 3D 加速市场能做到 5000 万美元规模；当时至少有三十多家竞争者。
- 红杉和 Sutter Hill 投资时更看重的是这几个人本身；投资人的说法是，在计算领域客户并不知道什么是可能的。
- 首款 NV1 由 Priem 主导，采用与主流不同的二次纹理映射，主打与世嘉主机兼容；微软随后推出只支持三角形的 DirectX 标准，NV1 被搁浅，大量退货。
- 原文：「The product was known as a “graphics accelerator,” and at least thirty-five competitors were trying to build one.」
- 怎么用：差异化如果押在一个与平台标准相反的技术路线上，平台方一纸标准就能让产品失效；我在做技术选型时，会把"上游平台会往哪走"列为首要风险。

<!-- chapter: Chapter Four: Thirty Days -->
### 第4章 三十天（Thirty Days）
- NV1 失败后公司现金将尽，员工从一百多人裁到三十五名工程师；黄仁勋告诉世嘉放弃合作转向微软标准，但请对方仍支付交付 NV2 原型的 100 万美元。
- 他用这笔钱买了硬件仿真器，跳过实体原型直接量产 NV3（Riva 128）——作者称这是一次疯狂的赌博，仿真速度慢到每三十秒一帧。
- Riva 128 在 1997 年 8 月上市救活了公司；此后"我们离倒闭只有三十天"成为公司口头禅。
- 原文：「“It was fifty-fifty,” he told me, “but we were going out of business anyway.”」
- 怎么用：当不做也会失败时，高风险方案的真实成本其实变低了；我做决策时会把"什么都不改的基线"也算出它的失败概率，而不是默认它安全。

<!-- chapter: Chapter Five: Going Parallel -->
### 第5章 走向并行（Going Parallel）
- Priem 与黄仁勋冲突不断，经调解后被多次降职；Kirk 成为黄仁勋的军师，从濒临倒闭的对手那里挖人。
- 黄仁勋把《创新者的窘境》奉为最爱，据此对英特尔采取持续的战术性回避，专做英特尔不会做、也不想服务的产品。
- 他给台积电张忠谋写信争取到代工；为满足卡马克对多个像素着色器的需求，1998 年的 Riva TNT 采用双像素流水线，把并行计算带进消费级产品——他起初也怀疑这条路，因为超级计算机厂商在并行上屡屡失败。
- 原文：「Christensen’s insight was that it was easier to go up the escalator of profitability than down.」
- 怎么用：面对强势平台，我优先找对方不会进入的细分场景，而不是正面竞争同一类产品。

<!-- chapter: Chapter Six: Jellyfish -->
### 第6章 水母（Jellyfish）
- 1997 年，商用神经网络程序 Jellyfish 在双陆棋上击败顶级人类玩家，但主流学界几乎无人关注，当时神经网络被视为玩具。
- 它的源头是 IBM 研究员 Tesauro 用强化学习训练的 TD-Gammon，后者自己摸索出与人类不同的下法；IBM 没有将其商业化。
- 作者 Dahl 后来转向扑克，却发现网络陷入训练平台期后无从改进，因为他几乎不知道模型是怎么工作的，最终放弃。
- 原文：「Once a neural net hit a training plateau—and they almost always did—there was rarely an obvious way to make it better.」
- 怎么用：模型进入平台期且不可解释时，我会先补诊断工具和评测，再决定加数据还是换方法，避免像书中那样只能放弃。

<!-- chapter: Chapter Seven: Deathmatch -->
### 第7–8章 死亡竞赛与上瘾循环（Deathmatch / The Compulsion Loop）
- 英伟达以六个月一代的节奏推新品，与 3dfx 激烈竞争（包括作者转述的跑分手段和挖人引发的诉讼）；3dfx 倒下后，英伟达以 7000 万美元收购部分资产并挑选约 120 名员工，新同事发现代码库积累了大量技术债。
- 黄仁勋起初怀疑可编程着色器，直到他算清"不做的代价"；2001 年 GeForce 首次搭载，并进入微软 Xbox。
- 随后的低谷：2001–2002 年股价下跌九成以上、会计丑闻、着色器推广缓慢、GeForce FX 失败；Priem 淡出并在 2004–2006 年卖光股票。作者认为最终是 PC 玩家把公司救了回来，并直言这一客群文化有毒、具有成瘾特征。
- 原文：「Not to gamble was the biggest risk of all.」
- 原文：「“The way I see it now, tech debt is the battle scar of the survivor.”」
- 怎么用：我评估新能力时会单列"不做的代价"；对快速迭代留下的技术债，记录下来并安排偿还，而不是假装没有。

<!-- chapter: Chapter Nine: CUDA -->
### 第9章 CUDA
- 斯坦福学生 Buck 把多块 GeForce 串起来做通用计算并开源了 Brook；黄仁勋招来 Buck、Dally 和曾创办并行计算公司的 Nickolls，秘密开发 CUDA。
- 背景约束：Dennard 缩放失效，单核提速见顶；但 2000 年代末多数消费需求并不需要这么多算力，最初的真实用户只有两位乳腺癌影像研究者。
- 代价：芯片为通用计算增加的成本让 GeForce 比竞品更贵；CUDA 2006 年底免费发布、只支持自家硬件，2007 年下载量惨淡；内部争夺资源；作者认为最大的隐性代价是分散了对核心游戏客户的注意力——笔记本 GPU 故障（"Bumpgate"）爆发后，2 亿美元退款准备金吞掉了全年利润。
- 原文：「Mammogram imaging was the first example of what Huang would later call the “zero-billion-dollar” market.」
- 怎么用：做开发者平台时，我会紧紧服务好最早那几个"非典型"用户，把他们的需求做成文档、库和样例，而不是急于证明市场规模。

<!-- chapter: Chapter Ten: Resonance -->
### 第10章 共振（Resonance）
- Dally 加入并把英伟达研究院扩到三百多人，推动面向学术界的 GTC 大会；CUDA 之父 Nickolls 2011 年去世。
- 2013 年激进投资人 Starboard 来信，质疑 CUDA 是否合理；黄仁勋放弃了基带业务，却在 CUDA 上加码——作者称这是他职业生涯中最冒险的决定，并依靠董事会的长期支持过关。
- 作者解读：《创新者的窘境》其实是一本"如何不失败"的书；黄仁勋没有具体的未来蓝图，而是靠与客户和员工的持续互动形成"共振"。
- 原文：「Pursuing niche markets cost profits, making investors question your sanity.」
- 原文：「It was not a book about how to succeed; it was a book about how not to fail.」
- 怎么用：面对"砍掉不赚钱的长期项目"的压力，我会区分哪些是可以放弃的成熟红海业务，哪些是只有自己在投的长期能力，并为后者准备能说服投资方的阶段证据。

<!-- chapter: Chapter Eleven: AlexNet -->
### 第11章 AlexNet
- 辛顿曾在大会上劝研究者买英伟达 GPU，并写信请英伟达送一块，被拒绝；当时英伟达没有一个专职 AI 研究员。
- Krizhevsky 和 Sutskever 用两张 GeForce 显卡在卧室里训练一周，使用李飞飞的 ImageNet 数据集，2012 年以大幅领先夺冠。
- 2013 年起挑战赛被神经网络方案淹没；辛顿把三人的"公司"拍卖，谷歌以 4400 万美元胜出。
- 原文：「Under ideal circumstances, the two GeForce cards could execute a combined three trillion operations per second.」
- 怎么用：突破往往来自"消费级硬件 + 公开数据 + 冷门算法"的组合；我会定期检查团队手里有没有因为门槛降低而突然可行的旧方法。

<!-- chapter: Chapter Twelve: O.I.A.L.O. -->
### 第12–14章 千载难逢、超级智能与好年景（O.I.A.L.O. / Superintelligence / The Good Year）
- Catanzaro 成为英伟达第一个专职 AI 研究员，他做的神经网络加速库 cuDNN 起初被软件团队否定；黄仁勋看到后从第一性原理推论："能解决无结构的视觉问题，还能教它什么？"随即宣布押上公司，不再是一家图形公司。
- 作者指出深度学习革命同样是一场硬件革命：两种被抛弃的技术合在一起才成立。
- 之后：云厂商按小时出租 GPU，马斯克等人担忧 AI 风险并创立 OpenAI，黄仁勋 2016 年把首台 DGX-1 亲手送到 OpenAI；2017 年又拿下任天堂 Switch 芯片、经历加密货币挖矿潮，并开始做机器人仿真平台。
- 原文：「Huang told me he was just reasoning from first principles.」
- 怎么用：当一项能力在最难的场景被证明可行时，我会推演"它还能迁移到哪里"，并尽早决定是否把资源集中过去——犹豫的成本可能比押错更高。

<!-- chapter: Chapter Fifteen: The Transformer -->
### 第15章 Transformer
- 谷歌的 Uszkoreit 认为显式教语法无法扩展，提出只靠上下文的自注意力机制；八人团队做出 Transformer，作者把它比作 AlexNet 之后的"喷气发动机"。
- 谷歌管理层没有看出其产品价值，到 2023 年八位作者全部离开。
- Sutskever 在 OpenAI 用 Transformer 做 GPT：GPT-1（2018）、GPT-2，出现未经专门训练的"涌现"能力；训练成本极高，微软投资 10 亿美元。作者指出 OpenAI 有谷歌没有的自由——可以先发布不好的东西再迭代。
- 原文：「Teaching grammar to the computer explicitly, like a high school Latin teacher, was an approach that didn’t scale.」
- 怎么用：做语音和语言产品时，我优先选择"数据越多越好"的路线，而不是依赖不断堆叠的人工规则；同时警惕自己在大组织里看不见内部研究的产品价值。

<!-- chapter: Chapter Sixteen: Hyperscale -->
### 第16–18章 超大规模、钱与"飞船"（Hyperscale / Money / Spaceships）
- 黄仁勋把整个数据中心看成一台计算机，为补齐网络短板收购 Mellanox（2020 年完成），400 亿美元收购 ARM 则因监管反对而放弃；AI 芯片毛利可超九成。
- 作者对护城河的判断：英伟达赢在软件，性能提升大多来自数值和指令层面的优化；免费工具的长期目的就是把研究者锁进自家硬件。
- GPT-3、ChatGPT、GPT-4 相继出现，推理成本迫使 OpenAI 收费；作者写道所有的钱、人才和创新最终都流经同一个"虹吸口"；员工持股带来巨额财富，园区内部却有严密的追踪。
- 原文：「The reason was that its software was better.」
- 怎么用：评估供应商依赖时，我看的不只是芯片或模型本身，还有工具链、库和开发者习惯带来的迁移成本；做自己的平台也应如此设计粘性。

<!-- chapter: Chapter Nineteen: Power -->
### 第19–21章 电力、市值与黄仁勋（Power / The Most Important Stock on Earth / Jensen）
- 生成式 AI 的用电主要来自推理而非训练；作者引用的分析认为满足需求可能要在十年内让美国核电容量翻倍，碳中和目标难以同时达成。
- 有对冲基金称科技股处于泡沫区；作者认为对英伟达最大的风险不是竞争而是失望。2024 年 2 月财报后单日市值增加 2770 亿美元。
- 台积电是全球生产的咽喉，作者惊讶地发现英伟达没有针对台海风险做过应急预案；黄仁勋有五十多个直接下属，公司文化与人员构成也在 AI 时代改变。
- 原文：「Disappointment, not competition, was the biggest risk to Nvidia’s empire.」
- 怎么用：做 AI 产品的成本模型时，我把推理的电力和算力成本当作长期变量，并为关键供应链（尤其单一来源）写好备选方案。

<!-- chapter: Chapter Twenty-Two: The Fear -->
### 第22–23章 恐惧与思考机器（The Fear / The Thinking Machine）
- Bengio 在 2023 年产生对 AI 失控的强烈担忧，辛顿也一度认同；LeCun 认为这是把机器拟人化。作者描述黄仁勋对末日风险的判断是零，并指出他也有金钱和自尊方面的动机。
- 作者认为 OpenAI 董事会风波暴露了短期利润与长期风险的错位，并坦承自己也有这种恐惧，这是他写书的原因。
- 最后一次采访中，黄仁勋因作者追问 AI 风险而长时间发火；作者事后认为这是他有意为之的表演，也认为正是这种不听劝的性格让他在别人失败的领域成功。
- 原文：「The Fear was the worst kind of fear, one that grew scarier when you set aside emotions and examined the problem rationally.」
- 怎么用：讨论 AI 风险时，我会先列出各方（包括自己）的利益动机，再看论据本身，避免把立场当证据。

## 读完留下

**关键技术赌注 × 条件 × 结果 时间线**

| 时间 | 赌注 | 当时的条件 / 约束 | 代价 | 结果 |
| --- | --- | --- | --- | --- |
| 1993–1995 | NV1：二次纹理映射 + 世嘉兼容 | 三十多家竞争者；平台标准未定 | DirectX 只支持三角形，大量退货 | 失败，几近倒闭 |
| 1996–1997 | 用仿真器跳过实体原型做 Riva 128 | 现金将尽，裁到 35 人 | 一次出错即破产 | 成功，仿真成为常规流程 |
| 1998 | Riva TNT 双流水线（并行） | 卡马克的着色需求；并行在超算上屡败 | 计算量翻倍 | 拿下游戏市场 |
| 2001 | 可编程着色器 | 不做的代价更高 | 推广慢，赶上股价暴跌 | 进入 Xbox，长期领先 |
| 2006–2013 | CUDA 通用计算 | 单核提速见顶；几乎没有付费用户 | 芯片更贵、利润被拖累、投资人质疑 | 成为 AI 时代的软件护城河 |
| 2013–2014 | 押注深度学习、cuDNN | AlexNet 刚证明可行；Starboard 压力 | 主业资源转移 | 转型为 AI 公司 |
| 2019–2020 | 收购 Mellanox；尝试收购 ARM | 数据中心成为一台计算机 | ARM 被监管叫停 | 补齐网络，掌控整机 |
| 2023–2024 | 超大规模 AI 基础设施 | 推理需求爆发 | 电力、台海、估值预期 | 市值登顶，风险同步放大 |

## 我的问题清单

- 对于做语音 / AI 应用的团队，"零十亿美元市场"该投入多久、用什么阶段信号决定继续还是止损？
- 如果护城河在软件栈，那么建立在别人栈上的应用层，迁移成本应该如何提前管理？
- 书中多次出现公开训斥式管理，这类高风险做法不能机械复制；高强度和心理安全之间的边界在哪里？
- 推理成本和电力约束会不会在未来几年重塑语音产品的设计（端侧、模型尺寸、实时性取舍）？
