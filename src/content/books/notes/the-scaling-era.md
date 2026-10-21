---
title: The Scaling Era
book: "The Scaling Era: An Oral History of AI, 2019–2025"
author: Dwarkesh Patel, Gavin Leech
date: 2026-10-21
summary: 把 Dwarkesh Patel 与一线研究者、实验室负责人和预测者的访谈按"规模化、评估、内部机制、安全、投入、影响、爆发、时间线"重新编排，适合当作一份可回查的 AI 技术与产业问题库，看清关键主张、证据和分歧。
tags: 规模化定律, 访谈口述史, AI评估, AI安全, AGI时间线
catalogId: R080
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
2019 年以来 AI 进步的主线是"投入越多算力和数据，得到越多智能"；这本口述史把相信者、怀疑者和实验室内部人的说法并排摆开，让我看到哪些是经验事实、哪些是推测、哪些仍有分歧。

## 核心框架
- **规模化是经验事实，不是理论**：损失随算力、数据、参数平滑下降，但为什么如此、具体能力何时出现，受访者都承认说不清。
- **评估永远是不完整的抽样**：基准越来越快被刷满，能力往往在发布后才被发现；长链条任务的可靠性比单步得分更说明问题。
- **内部机制仍是黑箱**：架构和训练目标是清楚的，学到的表征却不清楚；可解释性研究刚开始给出可读的特征。
- **安全的难点在于"理解价值观"不等于"认同价值观"**：现有对齐方法只做浅层修改，需要多种方法交叉验证。
- **AI 是工业过程**：下一代模型需要更大的集群、电力和数据，投入能否持续增长是关键约束。
- **影响与时间线高度分歧**：从"几年内"到"本世纪"都有人押注；书中把这些说法当作需要证据检验的主张，而不是事实。

## 章节笔记

<!-- chapter: Chapter 1 Scaling -->
### 规模化（Scaling）
- 开篇用数据说明量级：训练前沿模型所需算力比 2010 年高出百亿倍，前沿模型训练算力大约每六个月翻一番。
- 神经规模定律让大额训练投入变得可预测，这是 GPT-3 这类押注的依据；近来又出现了"推理时规模化"，让模型在每个问题上多想一会儿。
- Dario Amodei 认为规模化几乎完全是经验事实：总体损失可以预测得很准，但具体能力何时出现很难预测，有时很突然。
- Jared Kaplan 把神经网络理解为在拟合数据流形，用这个思路解释规模定律的形状。
- Demis Hassabis 主张一半精力推规模、一半精力发明新架构和算法，两者都需要。
- 原文：「What’s predictable is this statistical average, this loss, this entropy.」
- 原文：「It’s an empirical question whether we will hit a brick wall.」
- 怎么用：做路线规划时，我会把"模型整体会变强"当作较确定的前提，但把"某项具体能力何时可用"当作需要持续实测的不确定项。

<!-- chapter: Chapter 2 Evals -->
### 评估（Evals）
- 预训练损失不是目标，真正关心的是模型完成真实任务的能力；基准用来检验模型是否泛化而不是记忆。
- 输入空间无法穷举，评估只是对巨大分布的不完整抽样；能力常在发布后才被发现，Jack Clark 称之为"能力悬置"。
- 基准从创建到被攻克的时间越来越短。
- Shane Legg 指出现有基准缺少对情景记忆、流式视频理解等能力的测试。
- Sholto Douglas 认为智能体没普及的关键是单步可靠性：多步任务的成功率是逐步相乘的，90% 和 99% 的单步成功率差别巨大。
- 原文：「evals are only ever sampling incompletely from a very large distribution」
- 原文：「But the key issue is that your base task solve rate is 90 percent.」
- 怎么用：评估语音智能体时，我会按任务时长和步骤数分层测成功率，而不是只看单轮问答的得分。

<!-- chapter: Chapter 3 Internals -->
### 内部机制（Internals）
- 要区分三件事：架构（训练前的设定）、训练目标（预测下一个词）、内部表征（训练中学到的概念与算法）；前两者清楚，第三者不清楚。
- 模型能推理，也会记忆训练数据；在新收集的数据上表现下滑说明存在"推理差距"。
- Trenton Bricken 把注意力机制与小脑的联想记忆电路做类比，讨论大脑与神经网络的趋同。
- 叠加（superposition）让模型在有限参数里塞进更多特征，导致单个神经元难以解释；用稀疏化投影可以得到更清晰的特征。
- 原文：「We understand an LLM’s architecture and objective just fine, but these learned and massively distributed representations remain unclear.」
- 原文：「I believe the reason networks are so hard to interpret is in large part because of superposition.」
- 怎么用：向客户解释模型行为时，我会避免给出"模型是这样思考的"这类确定说法，只陈述可观测的输入输出规律和测试结果。

<!-- chapter: Chapter 4 Safety -->
### 安全（Safety）
- 风险分三类：意外、滥用、目标错位；RLHF 等现有方法只是浅层修改，越狱持续存在说明它们只是"藏起"了不良能力。
- Joe Carlsmith 用一个刻意极端的类比说明：模型理解人类价值观，不代表它认同；足够聪明的模型还可能分辨出测试场景。
- Dario Amodei 认为对齐不像证明一个数学猜想，更需要能看清内部机制的语言和工具。
- Mark Zuckerberg 更关注当下的内容风险，例如用模型批量制造虚假信息。
- Ilya Sutskever 认为不会有单一数学定义，而要用对抗测试、行为一致性、内部检查等多种方法共同建立信心。
- 原文：「Yes, but the question is whether it shares those values.」
- 原文：「Rather than achieving a single mathematical definition, I think we will achieve multiple definitions that look at alignment’s different aspects.」
- 怎么用：做模型安全评审时，我会组合红队测试、行为一致性检查和线上监控，而不是依赖单一的安全分数。

<!-- chapter: Chapter 5 Inputs -->
### 投入（Inputs）
- 规模化的本质是投入的规模化：资金、芯片、电力、数据；眼下的约束正从 GPU 转向集中供电。
- 训练数据量逐代成倍增长，实验室购买内容档案、雇佣大量专业人员写数据，高昂成本推动了合成数据。
- Leopold Aschenbrenner 认为 AI 是工业过程，需要新集群、新电厂乃至新晶圆厂；Dylan Patel 讨论超大单体数据中心的选址与电力难题。
- Mark Zuckerberg 坦言没人能确定规模化会持续，但值得押注巨额基础设施；Ilya Sutskever 认为数据还够用，但终会用完。
- 原文：「Unlike most things that have recently come out of Silicon Valley, AI is an industrial process.」
- 原文：「But at some point the data will run out.」
- 怎么用：做 API 商业化的成本预期时，我会把推理算力和电力价格当作长期变量，避免把当前价格曲线直接外推。

<!-- chapter: Chapter 6 Impact -->
### 影响（Impact）
- 现状可以讲出两种故事：官方使用率低、头部公司仍在亏损；同时代码生成、咨询任务、学生作业中的使用已经很普遍。
- 即使技术足够好，企业还要经历缓慢的产品化和采用过程；就算进步停止，现有能力的"经济悬置"也会在未来十年释放。
- Tyler Cowen 认为人们低估了知识层面的阻碍：世界未必处处可被更多智能撬动。
- Dylan Patel 认为互联网泡沫不是恰当类比，因为这次买硬件的是全球最赚钱的公司。
- Ajeya Cotra 推测用户的点赞点踩等偏好反馈会越来越多地回流到系统中。
- 原文：「Even when the technology is good enough, firms still face a slow process of productization and adoption.」
- 原文：「But on the general knowledge side, I think people underestimate the possible barriers.」
- 怎么用：规划产品节奏时，我会把"模型能力到位"和"客户流程改造到位"分开估计，后者往往才是决定落地速度的部分。

<!-- chapter: Chapter 7 Explosion -->
### 智能爆发（Explosion）
- 如果 AI 能改进 AI 研究本身，进步会自我加速；目前已有间接迹象：AI 参与芯片设计、降低能耗、生成合成数据、在评估中当裁判。
- 真正的"直接自我改进"目前只出现在规则固定、目标简单的封闭问题中，比如自博弈系统。
- Carl Shulman 从硬件角度论证：如果 AI 能替代研究人员，更多计算机就意味着更多"研究员"。
- Sholto Douglas 指出算力是重要约束：每次改进都要重新训练模型，实验吞吐有上限。
- Trenton Bricken 认为还需要更高的可靠性和更长更便宜的上下文，才能真正自动化研究工作。
- 原文：「One of the important bounding constraints here is compute.」
- 原文：「We need a few more nines of reliability for it to be really useful and trustworthy.」
- 怎么用：评估"用 AI 加速团队工作"的方案时，我会先找出流程里真正的瓶颈（算力、审核、数据），再判断自动化能带来多大提速。

<!-- chapter: Chapter 8 Timelines -->
### 时间线（Timelines）
- 这一章把多位受访者对 AGI 时间的判断并排摆出：从本十年后期到 2030 年代末、2040 年代初都有。
- 不同人的定义不同：有人以"像受过良好教育的人"为标准，有人以"绝大多数远程工作可被替代"为标准。
- 也有人明确拒绝给出带精确概率的预测；Carl Shulman 认为当前投入的高速增长是一次性的，因此可能性集中在未来十年左右。
- 原文：「I have refused to deploy timelines with fancy probabilities consistently for many years.」
- 怎么用：引用任何时间线预测时，我会同时写出预测者、定义和前提假设，不把单个数字当结论。

<!-- chapter: Conclusion -->
### 结语（Conclusion）
- 作者提到 Dario Amodei 2017 年的"大块算力"备忘录：网络够大、数据分布够广、别在其他地方搞砸，就能走向 AGI。
- 作者列出可能失败的几组问题：投入能否继续指数增长、模型能否自我评估并越过数据墙、能否获得类人的泛化、算法改进能否持续叠加。
- 他认为每一项都很可能被解决，但必须同时成立，累积概率因此下降；离前沿最近的研究者往往更悲观，因为日常的琐碎故障最显眼。
- 原文：「But the real story of AI is the consistency and outlandish success of the trend line.」
- 怎么用：读行业新闻时，我会少关注人事八卦和"秘密方法"传闻，多关注趋势线本身是否出现拐点的证据。

<!-- chapter: The Bitter Lesson -->
### 苦涩的教训（The Bitter Lesson）
- Rich Sutton 2019 年的短文：七十年 AI 研究最大的教训是，能利用算力的通用方法最终最有效，而且优势很大。
- 研究者短期内倾向于注入人类领域知识，但随着算力成本持续下降，这些方法往往被基于搜索和学习的通用方法超越；国际象棋、围棋都是例子。
- 原文：「the only thing that matters in the long run is the leveraging of computation.」
- 怎么用：在产品里投入手工规则前，我会问一句：这部分在模型下一代升级后会不会被通用能力吞掉？

<!-- chapter: Will Scaling Work? -->
### 规模化会持续有效吗（Will Scaling Work?）
- Dwarkesh 2023 年的文章，以"相信者"和"怀疑者"两个虚构角色辩论。
- 怀疑者：高质量语言数据即将耗尽，自博弈和合成数据面临评估与算力两大难题，基准提升未必代表通用性。
- 相信者：只用简单结构和互联网数据就能得到如此通用的模型，本身就说明问题；合成数据也可能"就是能行"。
- 作者个人给出的判断是：规模化加算法进步加硬件进步在 2040 年前实现 AGI 的可能性约七成。
- 原文：「We’re about to run out of high-quality language data next year.」
- 怎么用：做中长期判断时，我会把正反两方论证都写下来，各自标出可以观察的证据，定期回看哪一方被验证。

## 读完留下

**关键主张、证据与分歧索引**

| 议题 | 关键主张 | 主要提出者 | 支持证据 | 反方 / 分歧 | 我可观察的信号 |
|---|---|---|---|---|---|
| 规模化 | 更多算力和数据带来更强能力 | Amodei、Kaplan | 损失曲线平滑可预测 | 具体能力何时出现不可预测 | 新一代模型在自有评估集上的提升 |
| 评估 | 评估是不完整抽样，可靠性是关键 | Clark、Douglas | 基准快速饱和、能力发布后才被发现 | 基准提升是否代表通用性 | 多步任务端到端成功率 |
| 内部机制 | 表征难以解释，叠加是主因 | Bricken | 稀疏特征研究 | 模型是否真正"推理" | 可解释性工具的成熟度 |
| 安全 | 理解价值观不等于认同 | Carlsmith、Sutskever | 越狱持续存在 | 当下风险 vs 长期风险孰重 | 红队测试结果、滥用事件 |
| 投入 | AI 是工业过程，电力是瓶颈 | Aschenbrenner、Dylan Patel | 资本开支和集群规模 | 投入增长能否持续 | 推理价格、算力供给 |
| 影响 | 产品化与采用是慢变量 | 作者、Cowen | 实际使用率与流程改造 | 知识层面是否存在天花板 | 客户流程改造的实际周期 |
| 爆发 | AI 加速 AI 研究 | Shulman、Aschenbrenner | 间接自我改进已出现 | 算力与重训成本是刹车 | 研发流程中 AI 承担的比例 |
| 时间线 | 从本十年到本世纪不等 | 多位受访者 | 趋势外推 | 定义不同、拒绝精确概率 | 预测者定义与前提的变化 |

用法：每当在访谈或新闻里看到新的判断，就按"主张—谁说的—证据—反方—可观察信号"补一行，区分事实与推测。

## 我的问题清单
- 书中讨论以文本模型为主，语音这类实时多模态场景的规模化收益是否同样平滑？
- 多步任务可靠性相乘的问题，在语音智能体的长对话里应如何拆解和度量？
- 如果推理时规模化成为主要进步来源，延迟敏感的语音产品如何在"多想一会儿"和"实时响应"之间取舍？
- 受访者大多来自头部实验室，这种样本结构会让书中的判断偏向哪个方向？
