---
title: Prediction Machines
book: Prediction Machines, Updated and Expanded: The Simple Economics of Artificial Intelligence
author: Ajay Agrawal, Joshua Gans, Avi Goldfarb
date: 2026-10-20
summary: 把 AI 还原成“变便宜的预测”，用决策拆解（预测、判断、行动、数据）帮 AI / 语音产品判断能力该放在哪、价值从哪来。
tags: AI经济学, 决策拆解, AI战略, 产品方法论, 风险管理
catalogId: R100
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
这一轮 AI 带来的不是“智能”，而是变得极其便宜的预测；预测越便宜，判断、数据和行动这些互补品就越值钱，产品和战略也要围绕这条主线重排。

## 核心框架
- 预测 = 用已有信息补全缺失信息。成本下降后，预测会被用在原本不被当作“预测问题”的地方（翻译、驾驶、语音识别）。
- 一个决策由输入数据、预测、判断、行动、结果，以及训练 / 输入 / 反馈三类数据组成。AI 只替代了其中的“预测”。
- 预测的替代品（人工预测）贬值，互补品（数据、判断、行动）升值；判断最难外包，也最难写进合同。
- 落地路径：拆工作流 → 拆任务 → 用 AI Canvas 拆决策 → 按 ROI 排序逐个上。真正的收益往往来自重排整个工作流，而不是单点插入。
- 当预测足够好、并能扭转业务里的核心权衡时，AI 会改变战略本身，甚至改变企业边界，所以不能只交给 IT 部门。
- 每一个 AI 选择都是权衡：速度与准确、自动化与控制、数据与隐私、早上线学习与品牌风险。

## 章节笔记

<!-- chapter: 2. Cheap Changes Everything -->
### 便宜改变一切（Cheap Changes Everything）
- 作者用经济学的老办法看新技术：某样东西变便宜，就会被大量使用，还会被用到原本不属于它的问题上，就像算术变便宜后，摄影从化学问题变成了计算问题。
- AI 让“预测”变便宜，因此传统预测任务（库存、需求）更好做，翻译、导航这类新问题也被改写成预测问题。
- 价格下降会重排其他要素的价值：人工预测这一替代品贬值，数据、判断、行动这些互补品升值。
- 亚马逊“先发货后购物”的思想实验说明：预测足够好时，变化的不只是效率，而是商业模式。
- 原文：「When prediction is cheap, there will be more prediction and more complements to prediction.」
- 怎么用：评估一个 AI / 语音功能时，我先问“它让哪种预测变便宜了”，再问“哪些互补环节会因此变成瓶颈或变得更值钱”。

<!-- chapter: 3. Prediction Machine Magic -->
### 预测机器的魔法（Prediction Machine Magic）
- 预测不只针对未来，也可以补全现在和过去的信息：判断交易是否欺诈、影像里是否有肿瘤、拿手机的人是不是机主。
- 准确率的提升容易被误读：从 85% 到 90% 错误减少三分之一，而从 98% 到 99.9% 错误减少到原来的二十分之一，后者往往才是质变。
- 看似平凡的“补全缺失信息”，在视觉、驾驶、翻译上叠加起来，就让机器显得像有魔法。
- 原文：「Prediction is the process of filling in missing information.」
- 怎么用：讨论识别或翻译质量时，我用“错误率下降了几倍”而不是“准确率涨了几个点”来判断是否跨过了可用门槛。

<!-- chapter: 6. Data Is the New Oil -->
### 数据是新石油（Data Is the New Oil）
- 预测机器用三类数据：训练数据（把模型训出来）、输入数据（做出这一次预测）、反馈数据（在使用中持续改进）。
- 采集数据是投资，有成本也可能有侵入感，需要估算每类数据的 ROI。
- 统计上数据边际收益递减；但经济上未必，如果多出来的数据让模型越过“可用 / 合规 / 胜过对手”的门槛，价值会突然跳升。
- 原文：「In economic terms, data is a key complement to prediction.」
- 怎么用：设计语音产品时，我会把“反馈数据从哪来”当成一等需求，比如用户纠错、重说、放弃这些信号是否被记录并能回流。

<!-- chapter: 7. The New Division of Labor -->
### 新的分工（The New Division of Labor）
- 人在某些条件下预测很差：过度看重显眼信息、忽视统计规律，专家也不例外。
- 机器擅长在数据丰富、变量交互复杂的场景里预测；人擅长理解数据如何产生，在数据稀薄时用因果模型推断。
- 作者用已知的已知、已知的未知、未知的已知、未知的未知来划分人机分工，其中“未知的已知”最危险：机器很自信，但其实错了。
- 机器预测随规模变便宜，因此会出现“例外时由人预测”：常规交给机器，机器没把握时呼叫人。
- 原文：「Prediction machines are much better than humans at factoring in complex interactions among different indicators.」
- 怎么用：给模型加上置信度出口，低置信度时转人工或请用户确认，把“人在例外处介入”做成产品流程而不是事后补救。

<!-- chapter: 8. Unpacking Decisions -->
### 拆开决策（Unpacking Decisions）
- 预测不是决策，只是决策的一个组件；其余是判断、行动、结果，以及三类数据。
- 过去人同时做预测和判断，所以这种区分没什么意义；机器接手预测后，必须把决策“解剖”开来看。
- 伦敦出租车司机的例子：导航软件没让老司机变差，而是让普通司机变强，记路线的稀缺性消失了。
- 判断是给每种结果（包括犯错的结果）定收益，它要求把真正追求的目标说清楚。预测越便宜，需要的判断越多。
- 原文：「Making a decision requires applying judgment to a prediction and then acting.」
- 原文：「However, deciding not to decide is still a decision.」
- 怎么用：每个 AI 功能我都写清楚“模型预测什么、谁来判断、谁来执行”，避免把模型输出直接当结论。

<!-- chapter: 9. The Value of Judgment -->
### 判断的价值（The Value of Judgment，含第 10 章 Predicting Judgment）
- 预测便宜后，理解每个行动在每种情境下的回报就更值钱；但判断本身耗时、耗精力，还要试错。
- 不确定性下不仅要算对的回报，还要算错的代价，这让判断更昂贵。
- 如果“行动 × 情境”组合有限，可以把判断提前写成规则交给机器（作者称为奖励函数工程），从而自动化决策；组合太多、太罕见时，更高效的做法是机器先预测、人再判断。
- 第 10 章补充：机器也能通过大量示例学习“人在这种情况下会怎么做”，比如自动驾驶；但对个人偏好这类机器拿不到的数据、以及罕见事件（并购、创新），机器难以预测人的判断。
- 原文：「With better prediction come more opportunities to consider the rewards of various actions—in other words, more opportunities for judgment.」
- 怎么用：我会把高频、规则清楚的分支写成策略自动执行，把长尾的难题留给人，并记录人的判断以便将来让模型学习。

<!-- chapter: 11. Taming Complexity -->
### 驯服复杂性（Taming Complexity）
- 好的预测让决策能处理更多“如果”（状态）和更多“那么”（行动选项）。
- 缺少预测时我们只能“满意即可”，比如总是提早去机场然后在休息室里等；机场休息室、活检这类发明本质上都是应对预测不足的风险管理手段。
- 预测变强后，这些为“将就”而存在的方案价值会下降，这类变化最不直观，需要刻意练习去发现。
- 原文：「We are so used to satisficing that we don’t even think of some decisions as involving a prediction.」
- 怎么用：我会找产品里那些“为了保险而设计”的冗余步骤，比如固定等待、重复确认，问一句：如果预测足够好，这一步还需要吗？

<!-- chapter: 12. Fully Automated Decision-Making -->
### 完全自动化决策（Fully Automated Decision-Making）
- 引入 AI 不等于完全自动化；只有判断能被写死或被学会、行动也交给机器时，人才完全离开回路。
- 最先被完全自动化的任务有三类：除预测外早已自动化的（如采矿）；对反应速度回报很高的（如自动驾驶）；等待预测代价很高的（如太空探索）。
- 城市道路上的自动驾驶有外部性，矿区里的没有；外部性带来监管，责任划分会成为完全自动化的关键政策议题。
- 原文：「Before the recent advances in AI, everything except prediction could already be automated.」
- 怎么用：判断一个流程能否全自动，我会先查“除了预测之外还有哪些环节必须由人完成”，以及出错时的后果是否会落到第三方身上。

<!-- chapter: 13. What’s at Stake? -->
### 代价有多大（What’s at Stake?）
- 预测总会出错，而且错误分类型：误报和漏报的代价可能完全不同。
- 错误的代价决定了“赌注”：推荐错商品代价低，内容审核放过有害内容代价高。低赌注决策更值得自动化，高赌注决策更需要人工把关。
- 一个决策算高还是低赌注，本身就是判断，由人决定；预测越不完美，这一判断越重要。
- 原文：「The relevant stakes to use come from judgment, which, as we have already noted, is determined wholly by humans.」
- 怎么用：上线前我会分别列出误报和漏报的后果，用它决定阈值、是否需要人工复核，而不是只看一个总准确率。

<!-- chapter: 14. Deconstructing Workflows -->
### 拆解工作流（Deconstructing Workflows）
- AI 工具是单点方案，每个工具产出一种特定预测；大公司由许多把输入变成输出的工作流组成，工作流又由任务组成。
- 落地方法：拆成任务，估算每个任务用 AI 的 ROI，按 ROI 排序从上往下做。
- 单点插入有时立竿见影，但多数时候需要重排整个工作流，所以和个人电脑革命一样，生产率提升会滞后。
- 虚构的 MBA 录取 AI：要拿到全部收益，学校得取消人工排名、加大招生宣传、调整奖学金、甚至做到即时录取。
- 原文：「AI tools are point solutions.」
- 原文：「Understanding the workflow was critical for figuring out how best to deploy the AI tool.」
- 怎么用：做语音能力集成时，我先画出客户完整的工作流，再看模型插在哪一步、上下游哪些步骤会因此被删掉或放大。

<!-- chapter: 15. Decomposing Decisions -->
### 拆解决策（Decomposing Decisions，含第 16 章 Job Redesign）
- 要把任务拆到决策层，才能看清预测机器插在哪里，并估算收益与成本。
- AI Canvas 逐项填写：预测、判断、行动、结果、训练数据、输入数据、反馈数据，强制把每个要素说清楚。
- Canvas 的中心是“核心预测”。要说清楚预测什么，常常会逼出“我们的真实目标到底是什么”的讨论，比如“最好的学生”到底指什么。
- 第 16 章补充：工作是任务的集合。AI 会增强工作、收缩工作、重组工作，或改变所需技能的侧重，像电子表格让会计从算得快转向问对问题。
- 原文：「At the center of the AI canvas is prediction.」
- 怎么用：每个新功能我都填一张 AI Canvas，如果“核心预测”一栏写不出具体可测的目标，就说明需求还没想清楚。

<!-- chapter: 17. AI in the C-Suite -->
### 高管层的 AI（AI in the C-Suite）
- AI 改变战略需要三个条件：商业模式里存在核心权衡；这个权衡受不确定性影响；AI 降低不确定性后足以让天平倒向另一边。
- AI 在一处落地会波及其他环节，比如“先发货后购物”会逼出退货回收业务，改变企业边界，所以不能只交给 IT。
- 判断变得更值钱，可能改变组织层级；拥有受预测影响的“行动”环节，是传统企业分享 AI 价值的筹码，新进入者也可能反向整合去拥有行动。
- 原文：「First, a strategic dilemma or trade-off must exist.」
- 怎么用：讨论 AI 战略时，我先写出业务里因不确定性而被迫做的那个权衡，再判断更好的预测能不能把它翻过来。

<!-- chapter: 18. When AI Transforms Your Business -->
### AI 改变你的业务（When AI Transforms Your Business）
- 企业边界（自己做还是外包）受不确定性影响；预测降低不确定性，就会移动这条边界。
- 不确定性降低后合同更好写，数据、预测、行动相关的设备和劳动更容易外包；但判断难以在合同里规定、难以监督，所以判断型岗位更可能留在内部。
- AI 提高了拥有数据的动力；如果某项预测不是战略核心，直接买预测往往比买数据自己训更合算。
- 原文：「Judgment quality is hard to specify in a contract and difficult to monitor.」
- 怎么用：做 API 商业化时，我会区分客户的核心预测和非核心预测：非核心的适合直接卖预测结果，核心的客户会更想拥有数据和模型。

<!-- chapter: 19. Your Learning Strategy -->
### 你的学习策略（Your Learning Strategy）
- AI 优先意味着把预测准确度放在第一位，可能牺牲收入、用户数或体验，是真实的取舍而不是口号。
- AI 产品初期往往不如写死规则的产品，但上线后会持续学习并反超；在位者激励更弱，观望可能导致追不上。
- 何时上线是关键权衡：越早上线学得越快，但不成熟的模型会伤害品牌甚至安全。邮件类产品可以早放，自动驾驶则要谨慎。
- 原文：「AI-first is not a buzzword—it represents a real trade-off.」
- 原文：「The first users of the AI product will have a poor customer experience because the AI needs to learn.」
- 怎么用：发布新模型时，我会按错误代价分层灰度：低风险场景先放量换反馈数据，高风险场景等指标过线再开。

<!-- chapter: 20. Managing AI Risk -->
### 管理 AI 风险（Managing AI Risk）
- 六类主要风险：预测带来歧视并产生责任；数据稀疏时质量差，尤其是自信但错误的“未知的已知”；错误输入可以欺骗模型；模型同质化带来系统性大故障；模型可被反复询问而泄露知识产权和弱点；反馈可被操纵，让模型学坏。
- 多样性是个体与系统的权衡：大家都用最好的那个模型，个体风险低，但整体崩溃的概率上升。
- 风险无法全部消除，只能提前预判并权衡。
- 原文：「Such monoculture can be individually beneficial but increase systemwide risk.」
- 怎么用：我会为语音产品单独做风险清单，重点看对抗输入、反馈污染和单一供应商依赖，并保留可切换的备选模型。

<!-- chapter: 21. Beyond Business -->
### 商业之外（Beyond Business）
- 社会层面有三组权衡：生产率与分配（AI 会做大蛋糕，但可能加剧不平等）；创新与竞争（规模效应和数据飞轮可能导致垄断）；性能与隐私（个人数据越多预测越好，但隐私越少）。
- 不同地区会依据自身偏好做不同选择，比如欧洲偏向更多隐私保护，代价是数据摩擦。
- 原文：「There is a basic trade-off between intrusion and personalization and a potential for customer dissatisfaction associated with acquiring user data.」
- 怎么用：涉及语音这类个人数据时，我会把“要多少数据换多少个性化”写成明确的产品决策，并给用户可理解的选择权。

## 读完留下
拿到一个 AI / 语音需求时，我按下面这张清单拆：

- [ ] 预测：模型到底在补全什么缺失信息？能否写成可测量的目标？
- [ ] 判断：每种结果（含误报、漏报）的收益和代价是什么？由谁来定？
- [ ] 行动：预测之后谁执行？行动环节归谁所有？
- [ ] 结果：如何衡量成功？结果能否回流成反馈数据？
- [ ] 数据：训练 / 输入 / 反馈三类数据各从哪来，成本与 ROI 如何？
- [ ] 赌注：错误代价高还是低？决定自动化程度和人工介入点。
- [ ] 例外：低置信度时如何转人工或请用户确认？
- [ ] 工作流：上下游哪些步骤会因此被删除、放大或重组？
- [ ] 客户价值：更好的预测是否改变了客户的某个核心权衡？如果是，这才是最大的价值。
- [ ] 风险：歧视、对抗输入、反馈污染、单一模型依赖是否有预案？

## 我的问题清单
- 大模型让“预测判断”也变得便宜，书里“判断留给人”的边界会退到哪里？
- 对 API 型业务来说，客户拥有行动和判断，供应商只卖预测，价值会不会被持续压缩？
- 早上线换反馈数据与早期体验差之间，怎样设一个可量化的发布门槛？
- 当所有人都用少数几个基础模型时，“系统性风险”在产品层面该如何对冲？
