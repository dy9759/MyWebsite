---
title: 我看见的世界
book: The Worlds I See: Curiosity, Exploration, and Discovery at the Dawn of AI
author: Fei-Fei Li（李飞飞）
date: 2026-10-21
summary: 一位研究者如何在"算法才是主角"的年代押注数据，又如何把 AI 拉回到具体的人——这对做 AI / 语音产品的人是关于研究选择、数据条件和社会需求的一堂长课。
tags: 人物, 回忆录, 数据, 计算机视觉, 以人为本
catalogId: R062
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话

李飞飞把自己的移民经历和 ImageNet 的诞生交织在一起讲：一个被同行普遍看衰的数据假设，在算力和众包条件成熟的那一刻改变了整个领域；而她后半程的问题变成了"这项技术怎么对待人"。

## 核心框架

- **研究选择来自长期的问题意识**：她从视觉"先认出类别"这一认知科学发现出发，才得出"需要覆盖整个视觉世界的数据"这一判断，而不是追某个算法热点。
- **数据是被低估的一半**：2006 年前后学界的注意力集中在算法上，数据被当作训练用的道具；ImageNet 的赌注是规模与多样性本身会改变算法的表现。
- **条件决定可行性**：同一个想法，没有互联网图片、搜索引擎、亚马逊众包平台和 GPU，就只能停留在"19 年才能标完"的估算里。
- **假设需要一个公开的检验场**：ImageNet 挑战赛把数据集变成可比较的赛道，前两年结果平淡，第三年 AlexNet 才把假设兑现。
- **从能力到影响**：进入工业界后她看到算力集中、偏见、隐私和问责问题，最终把方向定为"以人为本的 AI"，并强调这要靠跨学科和公共机构，而不只是公司。

## 章节笔记

<!-- chapter: 1. Pins and Needles in D.C. -->
### 第1章 华盛顿的忐忑（Pins and Needles in D.C.）
- 2018 年她到众议院科学委员会作证，同场还有政府问责署的首席科学家和 OpenAI 的联合创始人；当时正值"技术反冲"，偏见算法、失业和监控的担忧占据舆论。
- 她给自己定下的唯一要点是：AI 的影响取决于开发它的动机，成功的定义应当把对人和社区的正面影响算进去。
- 作证前一天她还守在病床边照顾母亲——全书的两条线（个人经历与技术史）从这里交汇。
- 原文：「It matters what motivates the development of AI, in both science and industry, and I believe that motivation must explicitly center on human benefit.」
- 怎么用：我在写产品立项文档时，把"这个功能为谁带来什么好处"放在指标之前写清楚，而不是事后补一段"社会价值"。

<!-- chapter: 2. Something to Chase -->
### 第2章 追逐的东西（Something to Chase）
- 成都的童年：父亲带她看山野、母亲带她读书，两人都对当时的体制环境失望，却给了她"看得更远"的家庭氛围。
- 小学老师当众说男生天生更聪明，这让她第一次生出强烈的不服；父亲赴美后，她一度物理成绩崩溃，后来在思念父亲中重新爱上物理。
- 1992 年她和母亲终于拿到签证离开中国。
- 原文：「Now I didn’t just want to see further, but to reach further as well.」
- 怎么用：我留意团队里那些被默认"不适合做技术"的人；早期一句否定可能决定一个人往哪走，管理者的言语本身就是一种资源分配。

<!-- chapter: 3. A Narrowing Gulf -->
### 第3章 缩窄的鸿沟（A Narrowing Gulf）
- 新泽西的移民生活：一居室、每天打工、语言障碍、同学被霸凌的恐惧；数学老师 Sabella 先生成为她在美国的第一个朋友和导师，并帮她拿到普林斯顿的录取和资助。
- 穿插的 AI 史：达特茅斯会议的乐观、积木世界和专家系统的商业热潮，以及专家系统因知识录入成本过高而退潮。
- 另一条线是机器学习：从感知机、Hubel 和 Wiesel 的层级视觉、新认知机到反向传播，再到 LeCun 用邮政编码样本训练网络、被用于识别支票。
- 原文：「They saw the human capacity to reason as neatly analogous to a computer program: nothing more than the product of logical rules.」
- 怎么用：专家系统的教训很直接——靠人工写规则覆盖真实世界，录入成本会先于能力触顶；我评估"规则 + 模型"方案时会单独估算规则维护的长期成本。

<!-- chapter: 4. Discovering the Mind -->
### 第4章 发现心智（Discovering the Mind）
- 普林斯顿学物理期间，母亲心脏病恶化，医疗费用和生计压力把她拉回现实；Sabella 夫妇借钱让她家买下干洗店，她周末回家帮忙、远程当翻译。
- 大二暑假在伯克利参与猫视觉皮层实验，第一次听到神经元对图像的放电声，并用信号重建出看到的画面，从此确认自己爱的是研究本身。
- 原文：「What’s more, I now knew, without equivocation, that I loved research.」
- 怎么用：真正的方向感往往来自一次亲手做出来的实验，而不是阅读；我会给新同事安排一个能很快看到真实结果的小项目，让判断建立在手感上。

<!-- chapter: 5. First Light -->
### 第5章 最初的光（First Light）
- 作者以寒武纪大爆发开篇：感光能力出现后，生物之间的竞争与神经系统一起加速，大脑是对越来越复杂的外部世界的回应。
- 毕业时她面对华尔街的高薪机会，母亲一句话让她选择读研；她最终去了加州理工，跟随 Perona 和 Koch，两人都是跨学科、好奇心极强的学者。
- 她认为视觉不只是智能的一个应用，而是理解智能本身的入口。
- 原文：「Understanding how we see, therefore, is to understand ourselves.」
- 怎么用：做语音产品也一样，听觉和对话不是"一个功能模块"，而是用户理解世界的方式之一；我在定义问题时先回到人怎么听、怎么说，再谈模型。

<!-- chapter: 6. The North Star -->
### 第6章 北极星（The North Star）
- 心理物理实验显示，人在注意力被占用时仍能识别真实场景，结合 Thorpe、Biederman、Potter 等人的研究，她得出"视觉首先以类别组织世界"的看法。
- 她和 Perona 做"单样本学习"，在 ICCV 报告时发现所有提问都关于算法，没有人问数据，而她意识到数据才是关键；随后两人按词典挑选类别，做出 101 类、九千多张图的 Caltech 101。
- 同一时期母亲心衰、家里卖掉干洗店，她拿到麦肯锡的正式邀约，母亲坚持她是科学家。
- 算法普遍过拟合，她追问"101 类凭什么够"，在 Biederman 的论文里看到人能区分约三万类物体的估计。
- 原文：「In fact, the more I thought about it, the more I wondered why this topic—the subtle but intriguing power of data—wasn’t getting any attention.」
- 怎么用：当所有人都在问同一个维度（比如模型结构）时，我会专门问一次被冷落的那一维（数据覆盖、评测集、真实场景分布）是否才是瓶颈。

<!-- chapter: 7. A Hypothesis -->
### 第7章 一个假设（A Hypothesis）
- 在普林斯顿结识语言学家 Fellbaum，了解到 WordNet；她决定按 WordNet 的规模构建图像数据集，从十四万词条中筛出两万两千多个可视、可数的类别，每类目标一千张图。
- 同行几乎一致反对：类别太多、训练太慢、下载不了、没人能标完；只有李凯等少数人支持，学生邓嘉加入。
- 约束和代价非常具体：本科生标注速度推算要 19 年，搜索引擎限流，经费见底，她甚至考虑过用干洗店的方式筹钱；导师辈的 Malik 也表示怀疑。
- 转机来自学生提到的亚马逊众包平台，标注队伍扩展到全球；她也担心众包是否构成剥削，于是在经费允许内尽量提高单价。
- 2009 年完成首版：一千五百万张图、两万两千类、来自 167 个国家的四万八千多名标注者，但在 CVPR 上只拿到海报展示。
- 原文：「There was no escaping the fact that algorithms were the center of our universe in 2006, and data just wasn’t a particularly interesting topic.」
- 原文：「Centuries later, the emerging practice of crowdsourcing was predicated on the same idea: that truly intelligent automation was still best performed by humans.」
- 怎么用：做数据工程前，我先算"按现有人力要多久"，再找能改变数量级的外部条件（平台、工具、流程），同时把标注者的报酬和处境写进方案。

<!-- chapter: 8. Experimentation -->
### 第8章 实验（Experimentation）
- 为了让数据集被使用，她仿照 PASCAL VOC 办 ImageNet 挑战赛，发布一千类、约一百四十万张图的子集，并用 top-5 错误率减少误判。
- 2010、2011 两届冠军都是支持向量机，进步只有个位数，参赛者减少，她承认自己高估了速度；同期导师 Sabella 去世。
- 2012 年多伦多团队的 AlexNet 以约 10 个百分点的跃升登顶：结构与二十多年前的 LeNet 差别不大，真正不同的是 GPU 训练和 ImageNet 的规模。
- 原文：「“I think it will make them obsolete.”」
- 原文：「How techniques that worked well with small data sets suddenly performed poorly when trained on large ones—and vice versa.」
- 怎么用：一个能力假设需要公开、可比较的评测才能被验证；我搭评测集时会预留"看起来没进展"的耐心期，同时持续记录小数据和大数据下方法排名的变化。

<!-- chapter: 9. What Lies Beyond Everything? -->
### 第9章 "一切"之外还有什么？（What Lies Beyond Everything?）
- 深度学习带来关注和资源，实验室开始做细粒度分类（如车型），发现 ImageNet 的"大而全"在某些领域其实很粗。
- 学生用街景图片识别车型，再与人口普查数据关联，推断社区的社会经济特征，提出比人工调查更快更便宜的方法。
- 她和 Karpathy 做图像描述：她坚持模型必须逐词生成句子，而不是从训练数据中检索拼接；成果发布时恰好与谷歌的同类工作撞车。
- 原文：「The census is an absolute treasure trove of data, all organized by neighborhood, county, state, even voting precinct.」
- 怎么用：我判断一个"能说话"的系统时，会检查它是在生成还是在检索复述训练数据——这对语音助手的回答质量同样适用。

<!-- chapter: 10. Deceptively Simple -->
### 第10章 看似简单（Deceptively Simple）
- 母亲问她到底做什么、AI 能帮到什么人，这促使她和斯坦福医学院的 Milstein 合作"环境智能"，从医院洗手合规这样具体的问题切入。
- 难点不在算法：招不到学生（担心论文发表周期太长、没有现成数据集），医疗场景的数据天然稀缺，隐私要求迫使设备在本地完成计算。
- 她去病房跟班观察后规定：新成员写代码前先去医院看护理现场；护士对"摄像头"的戒备和母亲对尊严的感受让她重新理解技术的边界。
- 原文：「But in the world of health care, the kind of data we needed was, almost by nature, scarce.」
- 怎么用：进入高敏感场景前，我先让团队到现场看真实工作流，再讨论数据和模型；隐私限制要在架构阶段决定（例如端侧处理），而不是上线前补。

<!-- chapter: 11. No One’s to Control -->
### 第11章 不再由谁掌控（No One’s to Control）
- 2014 年后资本和巨头涌入，ResNet、AlphaGo 接连出现，学生被高薪抢走；OpenAI 成立。
- 图片服务自动给黑人肖像打上冒犯性标签等事件让她直面数据偏见；她和 Russakovsky 先在 SAIL 为高中女生开设 AI 速成课，后来发展为全国性的非营利组织 AI4ALL。
- 在谷歌云任首席科学家期间，她看到神经架构搜索一次动用八百块 GPU，算力与人才集中到少数公司；对抗攻击、可解释性、自动驾驶致死、偏见算法、社交媒体丑闻让她不安，最终决定回到学术界推动"以人为本的 AI"。
- 原文：「Whatever we academics thought AI was, or might become, one thing was now undeniable: it was no longer ours to control.」
- 原文：「Since the days of ImageNet it had been clear that scale was important, but the notion had taken on nearly religious significance in recent years.」
- 怎么用：当团队把"更大规模"当成默认答案时，我会追问它解决的是哪个具体问题，以及由此带来的成本、偏见和可解释性代价由谁承担。

<!-- chapter: 12. The Next North Star -->
### 第12章 下一颗北极星（The Next North Star）
- 她在课堂上首次提出"以人为本的 AI"，学生反问伦理和技术有什么关系，这种怀疑在新成员中很常见。
- 斯坦福 HAI 成立，推动由公共资金支持的国家研究云，邀请经济学家等跨学科学者加入；环境智能的综述发表后，《柳叶刀》刊文系统提出伦理质疑，她认为这是应有的审视。
- 实验室也回头量化 ImageNet 本身吸收的偏见；她看到大语言模型再次证明数据规模的力量，同时认为未来的数据会走向模拟环境和行动。
- 原文：「Not merely to talk about human-centered AI, or to debate its merits, but to build it, brick by brick.」
- 怎么用：我把伦理审视当成产品评审的一部分，主动邀请外部批评，并定期回头审计自己早期的数据决策。

## 读完留下

**研究选择 × 数据条件 × 社会需求 对照表**（每个新方向立项时填一遍）

| 维度 | 要回答的问题 | 书中对照 |
| --- | --- | --- |
| 研究 / 产品选择 | 这个方向来自哪个长期问题？大家都在追的维度是否不是瓶颈？ | 从"视觉先认类别"推到 ImageNet |
| 数据条件 | 现有人力要多久？哪个外部条件能改变数量级？数据是否天然稀缺？ | 19 年标注估算 → 众包平台；医疗数据稀缺 |
| 算力与工具 | 没有哪项基础设施，这个想法就不成立？ | AlexNet 依赖 GPU |
| 检验方式 | 用什么公开、可比较的评测证明假设？能等几轮？ | 挑战赛前两届平淡 |
| 社会需求 | 谁真正需要它？我们去过现场吗？ | 先跟班病房再写代码 |
| 代价与风险 | 标注者、被采集者、被误判者的成本由谁承担？ | 众包报酬、偏见、隐私、尊严 |

## 我的问题清单

- 在语音场景里，今天"被冷落的那一维"是什么——口音与方言覆盖、真实噪声环境，还是评测集本身？
- 如果数据天然稀缺且敏感（如医疗、家庭语音），端侧处理和合成数据能替代多少真实采集？
- 公开评测能推动领域，但也可能让大家只优化榜单，产品团队该怎么设计不被"刷分"绑架的内部评测？
- 作者把希望放在大学和公共机构上；对于在公司里做产品的人，"以人为本"的最小可执行动作是什么？
