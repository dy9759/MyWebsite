---
title: AI Engineering
book: "AI Engineering: Building Applications with Foundation Models"
author: Chip Huyen
date: 2026-10-20
summary: 把"基于现成大模型做应用"拆成评估、上下文、微调、推理与系统架构几块可验收的工程问题，是做 AI / 语音产品时做技术取舍的底图。
tags: AI工程, 模型评估, RAG与Agent, 推理优化, 系统架构
catalogId: R032
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
当模型变成一种可以调用的服务，AI 工程的难点就从"训练模型"转移到"评估、适配和系统化"：先想清楚怎么判断好坏，再决定在模型、数据还是系统哪一层花力气。

## 核心框架
- **评估先行**：开放式输出难以评估，但没有可靠的评估管线，后面的提示、RAG、微调、优化都无法判断是否真的变好。书中用两整章讲评估，说明了它的分量。
- **适配阶梯**：先把提示工程做到头，再按失败类型选路——缺信息用 RAG / 工具，行为不对才考虑微调；微调的真正瓶颈往往是数据而不是训练本身。
- **模型选择是"私有排行榜"**：先用硬属性（许可、隐私、部署方式）筛掉不合格的模型，再用公开基准缩小范围，最后用自己的评估集决出胜负，并在线上持续监控。
- **成本与延迟是一等公民**：TTFT、TPOT、吞吐与利用率决定体验和单位成本，延迟与吞吐之间存在天然取舍。
- **渐进式架构**：从"请求→模型→响应"的最简结构出发，按需逐步加上下文增强、护栏、路由/网关、缓存与 Agent 模式，每加一层都要配可观测性。
- **反馈即数据**：对话式界面带来新的隐式反馈信号，它既是产品指标，也是数据飞轮的原料，AI 工程因此比传统 ML 工程更贴近产品。

## 章节笔记

<!-- chapter: 1. Introduction to Building AI Applications with Foundation Models -->
### 用基础模型构建 AI 应用导论（Introduction to Building AI Applications with Foundation Models）
- 规模化让模型能力变强，同时让训练门槛高到只有少数机构负担得起，于是出现"模型即服务"，应用层的门槛反而大幅降低，AI 工程由此兴起。
- 做之前先问"该不该做"：区分是防御性需求还是机会型需求，明确人与 AI 在流程中的分工（AI 是主导还是辅助、是否需要人审）。
- 护城河问题很现实：建立在通用模型之上的薄层，可能随着底层模型能力增强而被吞掉。
- 里程碑规划要正视"最后一公里"：演示容易，产品化很难；先评估现成模型能做到几成，再决定投入。
- 原文：「It might take a weekend to build a demo but months, and even years, to build a product.」
- 原文：「If something is easy for you to build, it’s also easy for your competitors.」
- 怎么用：立项时我会先用现成模型跑一轮基线，把"已能做到的比例"和"可用门槛"写下来，差距决定是否值得做以及做多久。

<!-- chapter: 2. Understanding Foundation Models -->
### 理解基础模型（Understanding Foundation Models）
- 模型之间的差异主要来自训练数据分布、架构与规模、以及后训练方式；数据分布决定了模型在特定语言和领域上的短板。
- 预训练给能力，后训练（监督微调 + 偏好微调）让模型更安全、更好用，但人类偏好难以被一个公式完整表达。
- 采样策略（温度、top-k、top-p、停止条件）决定输出风格；采样让模型具有概率性，这既是创造力的来源，也是不一致和幻觉的来源。
- 结构化输出可以通过提示、后处理、约束采样或微调来保证，成本和可靠性各不相同。
- 原文：「Pre-training makes a model capable, but not necessarily safe or easy to use.」
- 原文：「Sampling makes AI models probabilistic.」
- 怎么用：对需要稳定格式的环节（如语音转写后的结构化抽取），我会固定采样参数并加格式校验，而不是指望模型"每次都对"。

<!-- chapter: 3. Evaluation Methodology -->
### 评估方法论（Evaluation Methodology）
- 模型越强，潜在的灾难性失败代价越大；很多团队靠口碑或"肉眼看"做判断，风险高且拖慢迭代。
- 语言建模指标（交叉熵、困惑度）适合指导训练和数据处理，但不直接等于应用质量。
- 精确评估包括功能正确性（如代码能否跑通）和与参考答案的相似度（精确匹配、词法相似、语义相似）。
- "AI 当裁判"灵活且便宜，但存在不一致、标准模糊、成本延迟以及位置/长度/自我偏好等偏差；裁判本身也会迭代，分数不宜跨时间直接比较。
- 比较式评估（两两对比排名）适合主观质量，但扩展性和从相对排名到绝对水平的转换都有难点。
- 原文：「Without a clear understanding of where your system fails, no amount of evaluation metrics or tools can make the system robust.」
- 原文：「While promising, AI judges should be supplemented with exact evaluation, human evaluation, or both.」
- 怎么用：用 LLM 裁判时我会固定裁判模型和提示版本，并保留一小批人工标注样本定期校准裁判结果。

<!-- chapter: 4. Evaluate AI Systems -->
### 评估 AI 系统（Evaluate AI Systems）
- 评估维度包括领域能力、生成质量（事实一致性、安全性）、指令遵循与角色扮演、以及成本和延迟。
- 模型选择分四步：用硬属性筛选、用公开信息缩小范围、用自有评估管线实验、上线后持续监控；四步可反复迭代。
- 自托管还是用 API，要从数据隐私、数据来源与版权、性能、功能、成本、控制与透明度、端侧部署等维度权衡，答案因团队而异。
- 公开基准可能被训练数据污染，排行榜的聚合方式也不透明，只能用来排除差模型。
- 评估管线三步：评估系统中的每个组件；写评估准则和带例子的评分规则，并把评估指标映射到业务指标；选择方法、标注数据并检验评估管线本身。
- 原文：「An application that is deployed but can’t be evaluated is worse.」
- 原文：「Public benchmarks can help you weed out bad models, but they won’t help you find the best models for your applications.」
- 怎么用：我会把"指标阈值 → 可自动化的业务比例"写成一张映射表，用它决定继续优化还是先上线。

<!-- chapter: 5. Prompt Engineering -->
### 提示工程（Prompt Engineering）
- 提示工程是最便宜的适配手段，不改权重；上手容易，做好很难，应当像 ML 实验一样系统化地实验和评估。
- 最佳实践：指令清晰明确、给角色和示例、指定输出格式、提供足够上下文、拆分复杂任务、给模型"思考时间"、持续迭代。
- 提示要版本化管理，和代码分离，便于回溯和对比。
- 防御性提示工程：提示可能被逆向提取，越狱和（间接）提示注入是真实威胁，需要在模型、提示和系统三个层面设防，没有一劳永逸的方案。
- 原文：「You should make the most out of prompting before moving to more resource-intensive techniques like finetuning.」
- 原文：「Prompt experiments should be conducted with the same rigor as any ML experiment, with systematic experimentation and evaluation.」
- 怎么用：每次改提示都跑同一套评估集并记录版本号，防注入则默认把外部内容当数据而非指令处理。

<!-- chapter: 6. RAG and Agents -->
### RAG 与智能体（RAG and Agents）
- 指令对所有请求通用，上下文则因请求而异；RAG 和 Agent 是构建上下文的两大模式。
- RAG 的效果主要取决于检索器：基于词项的检索（如 BM25）轻量、是强基线；基于向量的检索更重但上限更高；两者常组合使用。
- 检索优化手段包括分块策略、重排序、查询改写和上下文化检索；RAG 也可扩展到多模态和表格数据。
- Agent 由环境和工具定义，模型充当规划者；规划可借助反思和记忆增强。工具越多能力越强，但写操作和自动化也放大安全风险。
- 评估 Agent 要先列出失败模式（规划失败、工具失败、效率问题），再统计各自发生频率。
- 原文：「The success of a RAG system depends on the quality of its retriever.」
- 原文：「However, the more automated the agent becomes, the more catastrophic its failures can be.」
- 怎么用：做知识问答类功能时，我会先单独评估检索命中率，再看生成质量；Agent 的写操作默认加人工确认。

<!-- chapter: 7. Finetuning -->
### 微调（Finetuning）
- 微调最常用来提升指令遵循和输出格式的一致性，也可增强领域能力和安全性，但前期投入明显更高。
- 选 RAG 还是微调，取决于失败是"缺信息"还是"行为不对"；面向时效性知识，RAG 往往更有效。
- 内存是核心瓶颈：参数量、精度和训练状态决定显存需求；量化和 PEFT 都是在降低这部分开销。
- LoRA 参数高效、数据高效且模块化，便于同时服务和组合多个适配器；模型合并则尝试把多个微调模型合成一个。
- 原文：「The answer depends on whether your model’s failures are information-based or behavior-based.」
- 怎么用：考虑微调前，我会先把失败样本按"缺知识 / 格式或风格错"分类，只有后者占多数且提示已到瓶颈时才进入微调。

<!-- chapter: 8. Dataset Engineering -->
### 数据集工程（Dataset Engineering）
- 越来越少团队从头训练模型，数据成为差异化的主要来源，数据工作也从兼职变成专门岗位。
- 数据设计的三个核心标准：质量、覆盖度、数量；少量高质量数据可以胜过大量噪声数据，多样性同样关键。
- 合成数据（规则、模拟、AI 生成）可以补足数据，但必须验证质量，并警惕表面模仿、模型坍缩和来源不清等问题；蒸馏是常见用法。
- 数据处理包括检查、去重、清洗过滤和格式化；最难自动化的是"想清楚需要什么数据"和标注准则。
- 原文：「A small amount of high-quality data can outperform a large amount of noisy data.」
- 怎么用：我会先写标注准则和少量高质量样本，再考虑扩量或合成，并为合成数据单独设一道验证。

<!-- chapter: 9. Inference Optimization -->
### 推理优化（Inference Optimization）
- 模型再好，太慢或太贵都会失去价值；优化可以发生在模型、硬件和服务三个层面。
- 关键指标：首 token 时间（TTFT，受预填充影响）、每 token 输出时间（TPOT，受解码影响）、吞吐与有效吞吐、以及 MFU / MBU 等利用率。
- 模型层：量化、蒸馏、推测解码、并行解码、注意力与 KV 缓存优化；服务层：批处理、预填充与解码分离、提示缓存、各类并行。
- 技术选择取决于负载：长上下文更依赖 KV 缓存优化，长且重复的提示或多轮对话更受益于提示缓存；综合来看量化、张量并行、副本并行和注意力优化最常见效。
- 原文：「There’s a trade-off between latency and throughput.」
- 原文：「Throughput metrics are directly related to cost.」
- 怎么用：对实时语音交互，我会把 TTFT 作为首要验收指标，再在可接受延迟内追求吞吐和单位成本。

<!-- chapter: 10. AI Engineering Architecture and User Feedback -->
### AI 工程架构与用户反馈（AI Engineering Architecture and User Feedback）
- 架构从最简形态逐步演进：增强上下文 → 加输入/输出护栏 → 加模型路由与网关 → 用精确缓存和语义缓存降延迟 → 引入 Agent 模式。
- 路由通过意图分类把不同请求分给更合适或更便宜的方案；网关统一接入多模型，便于权限、成本控制和故障切换。
- 每加一个组件都会带来新的失败模式，因此要有监控与可观测性：指标、日志与链路追踪、漂移检测。
- 对话中的隐式反馈很丰富：提前终止、纠错、抱怨、情绪、重新生成、对话长度等；反馈的收集时机和方式要兼顾体验。
- 反馈有偏差且不完整，还可能形成退化反馈循环，放大初始偏差。
- 原文：「Many AI challenges are, at their core, system problems.」
- 原文：「Keep in mind that user feedback is incomplete.」
- 怎么用：我会把"重新生成""中途打断"等隐式信号埋点进日志，作为线上质量指标和后续评估集的来源。

## 读完留下

**模型—数据—系统方案取舍与验收表**

| 层 | 先回答的问题 | 可选方案 | 验收标准（上线前写好） |
|---|---|---|---|
| 目标 | 防御性还是机会型？人与 AI 如何分工？ | 辅助 / 主导 / 人审 | 业务指标与评估指标的映射表 |
| 模型 | 硬属性（许可、隐私、部署）是否满足？ | API / 自托管 / 端侧 | 自有评估集得分、成本、TTFT/TPOT |
| 提示 | 提示是否已做到头？ | 指令、示例、拆分、思考链 | 版本化提示 + 固定评估集回归 |
| 上下文 | 失败是否源于缺信息？ | 词项检索 / 向量检索 / 混合 / Agent 工具 | 检索命中率、引用正确率 |
| 微调与数据 | 失败是否源于行为或格式？数据够吗？ | LoRA / 全量 / 蒸馏 / 合成数据 | 数据质量、覆盖、数量检查；微调前后对比 |
| 推理 | 延迟和成本是否达标？ | 量化、缓存、批处理、并行 | 延迟分位数、吞吐、单位请求成本 |
| 系统 | 失败能否被发现和追踪？ | 护栏、路由、网关、缓存 | 告警覆盖主要失败模式；反馈埋点就绪 |

验收时逐行确认：每一层的选择都对应一个具体失败类型，每个新增组件都有对应的指标和回滚办法。

## 我的问题清单
- AI 裁判本身在迭代，如何让不同时期的评估分数仍然可比？
- 对于语音这类多模态输入，书中以文本为主的评估方法要如何改造？
- 隐式反馈存在偏差和退化循环，用它构造评估集时如何去偏？
- 当底层模型快速变强时，哪些微调和数据投入是不会被"吞掉"的？
