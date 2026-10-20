---
title: 7 Powers
book: 7 Powers: The Foundations of Business Strategy
author: Hamilton Helmer
date: 2026-10-20
summary: 当模型能力迅速商品化时，这本书给了我一把尺子：AI / 语音产品真正能长期守住的，只有同时具备"收益"与"壁垒"的七种力量。
tags: 商业战略, 竞争壁垒, 护城河, AI 产品, 规模效应
catalogId: R059
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
战略就是找到一条通往"持续力量"的路线；而力量必须同时满足两个条件：能实实在在改善现金流的收益（Benefit），以及让对手无法或不愿抹平这份收益的壁垒（Barrier）。

## 核心框架
- 价值 = 市场规模 × 长期差异化利润；后者只能来自"力量"，运营卓越本身不构成战略优势。
- 七种力量：规模经济、网络经济、反定位、转换成本、品牌、独占资源、流程力量。每一种都用"收益 + 壁垒"两个维度刻画。
- 收益条件在商业里很常见，壁垒条件却极其稀缺——判断一个优势时，先看壁垒。
- 静态（Statics）回答"力量是什么"，动态（Dynamics）回答"怎么得到它"：所有力量都始于发明，并要先跨过"令人非买不可的价值"这道门槛。
- 不同力量有各自的时间窗口：起源期可建立反定位与独占资源；起飞期是规模经济、网络经济和转换成本的窗口；稳定期才轮到流程力量与品牌。

## 章节笔记

<!-- chapter: Introduction -->
### 导论：战略罗盘（Introduction）
- 作者认为战略框架必须"简单但不简陋"，才能成为一线决策者随身携带的罗盘，而不是束之高阁的分析报告。
- 给出两个核心定义：力量是创造持续差异化回报潜力的一组条件；战略是在重要市场中通往持续力量的路线。
- 以 Intel 从存储器转向微处理器为例，说明同样的管理团队，处在有无力量的业务中，结局截然不同。
- 收益条件很常见，壁垒才是稀缺品，所以评估任何优势都要先问壁垒在哪。
- 原文：「Power: the set of conditions creating the potential for persistent differential returns」
- 原文：「As a strategist, then, my advice is, “Always look to the Barrier first.”」
- 怎么用：评估一个 AI 功能是否构成优势时，我先不问"它好不好用"，而是问"对手为什么不能在三个月内复制它"。

<!-- chapter: Chapter 1: Scale Economies -->
### 第一章：规模经济（Scale Economies）
- 规模经济指单位成本随业务规模扩大而下降；Netflix 的原创内容是典型的固定成本，订户越多，每个订户分摊越少。
- 收益是更低的成本；壁垒是挑战者为抢份额要付出的代价太高、回报太低，于是理性地不去追。
- 规模经济的来源不止固定成本，还包括采购议价、物流密度、学习等。
- 原文：「The quality of declining unit costs with increased business size is referred to as Scale Economies.」
- 原文：「This unattractive cost/benefit is itself the Barrier for Scale Economies.」
- 怎么用：模型训练、数据标注、评测基建都是固定成本，我要算清楚哪部分摊薄能真正拉开单位成本差距，而推理调用这类可变成本基本不构成规模壁垒。

<!-- chapter: Chapter 2: Network Economies -->
### 第二章：网络经济（Network Economies）
- 以 LinkedIn 对比 Plaxo 为例：产品对每个用户的价值随使用者增多而上升，领先者一旦拉开差距，追赶几乎不可能。
- 这类行业往往"赢家通吃"，存在临界点，早期份额争夺异常激烈。
- 网络效应有边界：LinkedIn 的职业网络与 Facebook 的个人社交网络彼此并不吞噬；有网络效应也不等于一定有力量。
- 原文：「Network Economies occur when the value of a product to a customer is increased by the use of the product by others.」
- 怎么用：我要分清"数据飞轮"是真网络效应（别的用户让我的体验变好）还是只是规模效应（数据多了模型略好），后者的壁垒弱得多。

<!-- chapter: Chapter 3: Counter-Positioning -->
### 第三章：反定位（Counter-Positioning）
- Vanguard 的指数基金是案例：新进入者采用更优的商业模式，而在位者看得见却不跟进。
- 在位者不跟进往往不是愚蠢，而是理性计算：跟进会伤害现有业务，这种"附带损害"就是壁垒。
- 附带损害有多种形式，包括蚕食现有收入、组织激励冲突、管理层自身利益等。
- 原文：「A newcomer adopts a new, superior business model which the incumbent does not mimic due to anticipated damage to their existing business.」
- 原文：「The Barrier, simply put, is collateral damage.」
- 怎么用：对小团队而言这是最现实的力量：找一个让大厂按次计费、按席位收费或既有渠道"不敢跟"的定价或交付模式，而不是在模型能力上正面硬拼。

<!-- chapter: Chapter 4: Switching Costs -->
### 第四章：转换成本（Switching Costs）
- 以 SAP 为例：客户一旦嵌入，更换供应商会带来预期价值损失，现有供应商可以在后续销售中获得更高定价。
- 转换成本分三类：财务性、程序性（学习、流程、迁移风险）、关系性。
- 收益只在客户持续追加购买时兑现；它对所有玩家都开放，强度取决于行业本身，而且可以为其他力量铺路。
- 原文：「The value loss expected by a customer that would be incurred from switching to an alternate supplier for additional purchases.」
- 怎么用：这直接对应"嵌入"假设：把产品嵌进客户的工作流、术语库、配置和集成里，比单纯的 API 调用更难被替换；但要避免把锁定做成让客户反感的陷阱。

<!-- chapter: Chapter 5: Branding -->
### 第五章：品牌（Branding）
- 品牌让客观上相同的产品获得更高支付意愿，来源有两种：情感效价，以及降低购买不确定性的信任。
- 壁垒是"迟滞"：品牌只能在长期一致的强化行为中积累，模仿者面对漫长且不确定的投入。
- 稀释、仿冒和客户偏好变化都会侵蚀品牌，甚至让迟滞时钟归零。
- 原文：「The durable attribution of higher value to an objectively identical offering that arises from historical information about the seller.」
- 怎么用：在 B2B 的 AI / 语音产品里，品牌更多来自"可靠、不出事"的信任，而不是情感；每一次严重失误都在重置这个时钟。

<!-- chapter: Chapter 6: Cornered Resource -->
### 第六章：独占资源（Cornered Resource）
- Pixar 的创作核心团队是案例：以有利条件优先获得一种被追逐、且能独立提升价值的资产。
- 壁垒形式各异，可以是专利、牌照、稀缺原料，也可以是关键人物的个人选择。
- 作者给出五项筛选测试，其中"充分性"最关键：资源本身必须足以带来持续差异化回报；很多人把优秀的管理者误当作独占资源。
- 原文：「Preferential access at attractive terms to a coveted asset that can independently enhance value.」
- 怎么用：专有数据是否算独占资源，要问它能否独立提升价值、获取条件是否真的优于对手；公开可抓取或可买到的数据不算。

<!-- chapter: Chapter 7: Process Power -->
### 第七章：流程力量（Process Power）
- 丰田生产方式是案例：即使通过合资工厂对通用汽车完全透明，通用也无法在自己的工厂复制。
- 收益是更低成本或更好产品；壁垒同样是迟滞——这些流程改进嵌在组织里，只能靠长时间的演进积累。
- 大多数运营改进只有收益没有壁垒，所以运营卓越不等于战略，流程力量非常罕见。
- 原文：「The rarity of Process Power results from the infrequency of the Barrier: an unyielding, long-time constant for the improvements in question.」
- 怎么用：评测、数据清洗、错误回流这些"脏活"如果能沉淀为难以复刻的组织能力，才可能接近流程力量；一份写得好的提示词或 SOP 不是。

<!-- chapter: Chapter 8: The Path to Power -->
### 第八章：通往力量之路（The Path to Power）
- 静态告诉我力量长什么样，动态回答怎么到达；作者的第一个洞见是所有力量都始于发明。
- 以 Netflix 从邮寄 DVD 到流媒体、再到原创内容为例：授权内容让所有对手站在同一起跑线，转向独家原创才建立起规模经济。
- 要先创造"令人非买不可的价值"，路径有三条：能力驱动、客户驱动、竞争者驱动。
- 战略更像不断试验中的"手艺"，行动是第一原则，而非规整的战略规划。
- 原文：「But let me offer a first insight right here up front: all Power starts with invention.」
- 原文：「There are three distinct paths to creating compelling value.」
- 怎么用：做 AI 产品时，"非买不可的价值"是入场券，但不是力量本身；我要在产品可行的同时就规划好它要通向七种力量中的哪一种。

<!-- chapter: Chapter 9: The Power Progression -->
### 第九章：力量的时间进程（The Power Progression）
- 以 Intel 微处理器为例，把业务分为起源、起飞、稳定三个阶段，起飞与稳定的分界大约是单位增长率跌到每年 30%–40% 以下。
- 起源期是反定位与独占资源的窗口；起飞期是规模经济、网络经济与转换成本的窗口；稳定期才可能建立流程力量和品牌。
- 窗口一旦关闭就很难再打开：Intel 的力量几乎都在起飞期奠定。
- 原文：「Knowing when this window is open and when it shuts is valuable in recognizing and seizing the opportunity.」
- 怎么用：AI 应用很多正处在起飞期，这时最该押注的是分发规模、网络效应和嵌入深度，而不是指望"以后慢慢做品牌"。

## 读完留下
我把它压成一张"数据、分发、嵌入和规模优势假设"检查表，每个产品方向都逐行填写：

| 假设 | 对应力量 | 收益是什么 | 壁垒是什么（对手为何不能/不愿追） | 窗口期 | 当前证据 |
|---|---|---|---|---|---|
| 数据优势 | 独占资源 / 网络经济 | | 获取条件是否独占？是否满足充分性？ | 起源–起飞 | |
| 分发优势 | 规模经济 / 反定位 | | 对手追份额的代价？跟进是否伤害其主业？ | 起源–起飞 | |
| 嵌入优势 | 转换成本 | | 客户换供应商损失什么？是否有后续购买？ | 起飞 | |
| 规模优势 | 规模经济 | | 哪些是可摊薄的固定成本？ | 起飞 | |

- 每一行先填"壁垒"一列，填不出来就标记为"只有收益"。
- 区分真网络效应和数据规模效应。
- 标注当前处于哪个阶段，判断该假设的窗口是否还开着。

## 我的问题清单
- 基础模型能力快速扩散时，"数据飞轮"有多少真正满足独占资源的充分性测试，又有多少只是暂时领先？
- 对于调用大模型 API 的应用层产品，反定位的空间主要来自定价模式、交付方式还是渠道冲突？
- 嵌入式转换成本与客户信任之间的边界在哪里，怎样做到"难以替换"而不变成"被绑架"？
- 当 AI 行业整体仍处起飞期，流程力量是否会比书中描述的更早出现？
