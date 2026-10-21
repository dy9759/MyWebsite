---
title: Designing Machine Learning Systems
book: "Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications"
author: Chip Huyen
date: 2026-10-21
summary: 把机器学习从"训练一个模型"扩展成数据、特征、评估、部署、监控、持续学习和组织协作组成的闭环系统，帮我在承担完整 AI / 语音产品线时看清每一段的责任和反馈回路。
tags: 机器学习系统, MLOps, 数据工程, 监控与分布漂移, 持续学习
catalogId: R033
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
生产环境里的机器学习是一个系统问题而不是算法问题：模型只占一小块，数据如何产生、如何流动、上线后如何漂移、谁来发现和修复，决定了它能不能长期可用。

## 核心框架
- **系统视角**：ML 系统包含业务需求、数据栈、特征、模型、部署、监控、基础设施和人，只盯算法远远不够。
- **从业务目标出发**：ML 指标只有能推动业务指标才有意义；多个目标先解耦，再分别建模和组合。
- **数据是一等公民**：数据格式、数据流转方式、采样、标注、类别不平衡、数据泄漏，都会直接决定模型上限。
- **上线不是终点**：模型在训练结束后表现最好，之后随分布漂移而退化；ML 系统常常"静默失败"。
- **闭环迭代**：监控发现问题，持续学习和线上测试（影子部署、A/B、金丝雀、交错实验、多臂老虎机）完成更新与验证。
- **人与组织**：用户体验要应对"大多数时候正确"的预测；团队分工、平台工具和负责任 AI 都是系统的一部分。

## 章节笔记

<!-- chapter: 1. Overview of Machine Learning Systems -->
### 机器学习系统概览（Overview of Machine Learning Systems）
- 先问 ML 是否必要、是否划算：ML 适合从已有数据中学习复杂模式并对新数据做预测，且问题重复、规模大、错误代价可承受的场景；ML 解决不了的问题，它也可能是方案的一部分。
- 大多数 ML 应用其实在企业侧，而非面向消费者。
- 研究与生产的差别：利益相关方更多、计算优先级从吞吐转向延迟、数据在变化且很脏、公平性和可解释性要求更高。
- 与传统软件的差别：ML 系统里代码与数据纠缠在一起，数据会变，系统也就需要随之改变。
- 原文：「ML in production is very different from ML in research.」
- 原文：「In SWE, there’s an underlying assumption that code and data are separated.」
- 怎么用：立项评审时，我会先用"要学的模式是否存在、数据是否可得、错误代价多大"三问过滤需求，而不是默认用模型解决。

<!-- chapter: 2. Introduction to Machine Learning Systems Design -->
### 机器学习系统设计导论（Introduction to Machine Learning Systems Design）
- 项目必须从业务目标出发，再翻译成 ML 目标；很多 ML 项目夭折，是因为团队只顾提升 ML 指标、没能说明对业务指标的影响。
- 通用要求有四项：可靠性、可扩展性、可维护性、可适应性。
- 开发是迭代过程：定范围、数据工程、模型开发、部署、监控与持续学习、业务分析，循环往复。
- 问题框定会影响难度：同一个需求可以框成分类或回归、多分类或多个二分类，选择会影响后续维护。
- 多目标优化时，先把目标拆开分别建模再加权组合，比把它们揉进一个损失函数更好维护。
- 原文：「In general, when there are multiple objectives, it’s a good idea to decouple them first because it makes model development and maintenance easier.」
- 怎么用：写需求文档时，我会并排写出"业务指标—ML 指标—映射假设"，并把质量、延迟、成本等目标分开定义、分开验收。

<!-- chapter: 3. Data Engineering Fundamentals -->
### 数据工程基础（Data Engineering Fundamentals）
- 数据来源多样：用户输入、系统日志、内部数据库、第三方数据，各自的可靠性和隐私风险不同。
- 格式选择有取舍：行存适合写入、列存适合按列分析；文本格式易读、二进制格式更紧凑。
- 结构化与非结构化的区别本质上是"谁来承担对数据结构的假设"：写入方还是读取方。
- 事务处理与分析处理正在走向存储与计算解耦。
- 数据在进程之间流转有三种方式：经数据库、经服务请求、经实时传输；批处理产出静态特征，流处理产出动态特征。
- 原文：「The division between structured and unstructured data is quite fluid—the main question is who has to shoulder the responsibility of assuming the structure of data.」
- 怎么用：对语音日志这类数据，我会在采集时就约定好字段和结构，避免下游每个使用方各自猜测格式。

<!-- chapter: 4. Training Data -->
### 训练数据（Training Data）
- 采样方法决定数据代表性：非概率采样容易引入偏差；分层、加权、蓄水池、重要性采样各有适用场景。
- 自然标签（可由系统自动推断对错的反馈）在工业界很常见，但通常有延迟，延迟长度就是反馈回路长度。
- 人工标注贵、慢、涉及隐私，且标注者之间常有分歧；可用弱监督、半监督、迁移学习、主动学习缓解标签不足。
- 类别不平衡是常态：要选对指标，再考虑重采样或修改损失函数。
- 数据增强（保持标签的简单变换、扰动、合成）能提升效果与泛化。
- 原文：「Tasks with natural labels are tasks where the model’s predictions can be automatically evaluated or partially evaluated by the system.」
- 原文：「No matter how clever your algorithms might be, if your training data is bad, your algorithms won’t be able to perform well.」
- 怎么用：我会梳理产品里有哪些"自然标签"（如用户手动修改识别结果、重听、撤销），把它们定义成可采集的反馈，并记录反馈回路长度。

<!-- chapter: 5. Feature Engineering -->
### 特征工程（Feature Engineering）
- 深度学习减少了手工特征，但特征工程在生产中仍然重要。
- 常见操作：处理缺失值、缩放、离散化、类别编码、特征交叉、位置嵌入。
- 数据泄漏是高发问题：标签信息以某种形式混进特征，而推理时拿不到；常见原因包括随机切分时间序列数据、切分前做缩放或过采样、重复数据等。
- 最佳实践：按时间切分，切分后再缩放和过采样，只用训练集统计量；了解数据的生成过程、记录数据血缘、关注特征重要性与泛化能力、及时删掉无用特征。
- 原文：「We are never done with data and features.」
- 怎么用：做离线评估前，我会专门检查一遍切分方式和统计量来源，效果"好得反常"时先怀疑泄漏。

<!-- chapter: 6. Model Development and Offline Evaluation -->
### 模型开发与离线评估（Model Development and Offline Evaluation）
- 选模型不必逐一比较架构，而是看目标、约束和要求；从简单模型起步，它同时是基线。
- 集成、实验追踪与版本管理、分布式训练、AutoML 都是开发阶段的工具；实验追踪常被跳过，需要工具自动化。
- 评估指标离开基线就没有意义：随机基线、简单启发式、零规则、人类水平、现有方案都可作对照。
- 离线评估方法：扰动测试、不变性测试、方向性预期测试、模型校准、置信度测量、切片评估。
- 校准常被忽视却很重要；只展示有把握的预测，能避免损害用户信任。
- 原文：「When evaluating your model, it’s essential to know the baseline you’re evaluating it against.」
- 怎么用：我会为评估集建立切片（口音、噪声、语速、领域），并对输入做扰动测试，避免整体平均数掩盖局部退化。

<!-- chapter: 7. Model Deployment and Prediction Service -->
### 模型部署与预测服务（Model Deployment and Prediction Service）
- 四个部署误区：只部署一两个模型、不动就不会变差、模型不需要经常更新、大多数工程师不用操心规模。
- 软件会"腐烂"，ML 系统还会因分布漂移而退化，模型通常在刚训练完时表现最好。
- 批量预测与在线预测各有取舍：在线预测更能响应用户变化但要控制延迟；批处理和流处理管线可以统一。
- 模型压缩手段：低秩分解、知识蒸馏、剪枝、量化。
- 云端推理易上手但有网络延迟和成本问题；端侧推理需要足够的算力、内存和电量，作者判断长期趋势是端侧在线预测。
- 原文：「Software doesn’t age like fine wine.」
- 原文：「The chapter is technical because deploying ML models is an engineering challenge, not an ML challenge.」
- 怎么用：做端云方案取舍时，我会把延迟、单次成本、隐私和设备资源列成矩阵，再决定哪些环节放端侧、哪些留云端。

<!-- chapter: 8. Data Distribution Shifts and Monitoring -->
### 数据分布漂移与监控（Data Distribution Shifts and Monitoring）
- 失败分两类：软件系统失败（目前占多数）和 ML 特有失败。
- ML 特有失败有三大来源：生产数据与训练数据不同、边缘情况、退化反馈循环（预测影响反馈，反馈又影响下一版模型）。
- 分布漂移分为协变量漂移、标签漂移、概念漂移；检测可用统计方法和两样本检验，并注意时间窗口的选择。
- 监控要覆盖运维指标（延迟、吞吐、资源占用）和 ML 指标（准确性相关指标、预测、特征、原始输入）。
- 计算指标容易，读懂指标难：要分清是真实漂移还是管线出错。可观测性意味着能从外部输出推断内部问题。
- 原文：「For this reason, we say that ML systems often fail silently.」
- 原文：「Monitoring is all about metrics.」
- 怎么用：我会为线上模型配置"预测分布"和"输入特征分布"的监控，而不只盯着服务可用性；拿不到实时标签时，预测分布的变化就是最早的预警信号。

<!-- chapter: 9. Continual Learning and Test in Production -->
### 持续学习与线上测试（Continual Learning and Test in Production）
- 持续学习不一定是逐条样本更新，更多是小批量、频繁地更新；有无状态重训和有状态续训两种方式。
- 四个阶段：手动无状态重训 → 自动重训 → 自动有状态训练 → 持续学习。
- 更新频率取决于数据新鲜度的价值，可以用不同时间段的数据训练多个版本来实测；还要权衡模型迭代与数据迭代。
- 线上测试方法：影子部署、A/B 测试、金丝雀发布、交错实验、多臂老虎机；监控是被动观察，线上测试是主动选择用哪个模型产出结果来评估。
- 原文：「Continual learning is a problem specific to ML, but it largely requires an infrastructural solution.」
- 怎么用：新模型上线前，我会先用影子部署对比新旧输出，再小流量金丝雀放量，并提前写好回滚条件。

<!-- chapter: 10. Infrastructure and Tooling for MLOps -->
### MLOps 基础设施与工具（Infrastructure and Tooling for MLOps）
- 基础设施分层：存储与计算、开发环境、资源管理、ML 平台。
- 云服务便于起步，规模变大后成本会变得很高，部分大公司开始考虑回迁自建数据中心。
- 开发环境标准化能直接提升效率，容器帮助从开发走向生产。
- 资源管理从 cron 到调度器再到编排器；ML 工作流有专门的管理工具。
- ML 平台的三大件：模型部署、模型仓库、特征仓库；自建还是采购取决于公司阶段、核心竞争力和工具成熟度。
- 原文：「The more complex a system, the more it can benefit from good infrastructure.」
- 怎么用：评估自建还是采购时，我会先判断这块能力是否构成差异化；不构成的优先采购，把团队精力留给数据和评估。

<!-- chapter: 11. The Human Side of Machine Learning -->
### 机器学习中人的一面（The Human Side of Machine Learning）
- 用户体验三个挑战：概率性导致前后不一致；"大多数时候正确"的预测只有在用户能方便修正时才有用；推理慢时需要平滑降级。
- 平滑降级的做法：主模型超时就切到更快的备用方案（启发式、简单模型或缓存结果）。
- 团队结构：领域专家不只是标注者，也应参与问题定义、特征、误差分析和界面设计；端到端数据科学家需要足够的平台工具支持。
- 负责任 AI：作者认为这是全书最重要的话题，用案例说明不负责任的后果，并给出发现偏差来源、理解数据驱动方法局限、权衡不同目标等框架；它不能沦为合规打勾。
- 原文：「These mostly correct predictions can be useful for users who can easily correct them.」
- 怎么用：对语音转写、自动摘要这类"大致正确"的输出，我会把一键修改、候选结果和超时兜底作为功能需求，而不是体验层面的锦上添花。

## 读完留下

**数据到上线的责任和反馈闭环**

| 环节 | 关键问题 | 责任方 | 反馈信号 / 验收 |
|---|---|---|---|
| 业务目标 | 要推动哪个业务指标？ML 指标如何映射？ | 产品 | 业务—ML 指标映射表 |
| 数据采集 | 来源、结构、隐私是否明确？ | 数据工程 | 数据字典、血缘记录 |
| 标注与采样 | 有哪些自然标签？反馈回路多长？ | 产品 + 数据 | 标签覆盖率、标注一致性 |
| 特征 | 是否按时间切分？是否有泄漏？ | 算法 | 切分与统计量来源检查 |
| 离线评估 | 基线是什么？切片与扰动测试是否通过？ | 算法 + 产品 | 分切片指标、校准情况 |
| 部署 | 批量还是在线？端侧还是云端？ | 工程 | 延迟分位数、单次成本 |
| 监控 | 运维指标与 ML 指标是否都有？ | 工程 + 算法 | 预测/特征分布告警 |
| 更新 | 多久更新？数据新鲜度价值多大？ | 算法 + 平台 | 新鲜度实验结果 |
| 线上测试 | 影子、金丝雀、A/B 的放量与回滚规则？ | 工程 + 产品 | 放量记录、回滚条件 |
| 用户体验 | 错误能否被方便修正？超时如何兜底？ | 产品 + 设计 | 修改率、超时降级率 |
| 负责任 AI | 偏差来源与受影响人群是否评估？ | 全体 | 风险评审记录 |

闭环检查：每个环节都要有明确的责任方和一个可观测的反馈信号；用户的修改、超时和投诉要能回流到标注与评估集。

## 我的问题清单
- 大模型时代很多团队不再自己训练模型，书中的持续学习和特征仓库在"调用 API + 提示 + 检索"的架构里对应什么？
- 语音场景的自然标签（用户修改、重听、打断）噪声很大，怎样把它们变成可靠的训练与评估信号？
- 当退化反馈循环发生在推荐或自动纠错里时，有没有低成本的早期检测办法？
- 对小团队来说，书中的基础设施哪些是必须先有的，哪些可以等规模上来再补？
