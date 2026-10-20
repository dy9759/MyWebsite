---
title: Hands-On Large Language Models
book: Hands-On Large Language Models: Language Understanding and Generation
author: Jay Alammar, Maarten Grootendorst
date: 2026-10-20
summary: 用直觉优先的图解把 token、embedding、检索、生成和微调串成一张地图，是做 AI / 语音产品时判断“该用哪种模型、哪种表示、哪种检索”的基础词典。
tags: 大语言模型, 向量表示, 语义检索, RAG, 微调
catalogId: R034
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
这本书把大语言模型拆成“表示”和“生成”两条线：先把文字变成 token 和向量，再决定是拿向量去分类、聚类、检索，还是交给生成模型写答案；读完我得到的是一套可以随手画出来的概念卡片。

## 核心框架
- 两类模型：表示模型（encoder-only，如 BERT）擅长把文本压成向量，生成模型（decoder-only，如 GPT 系列）擅长逐 token 续写；两者都算 LLM，用途不同。
- 一切从 token 和 embedding 开始：分词决定模型“看到”什么，向量决定语义能否被计算和比较。
- 不微调也能走很远：预训练模型 + 提示工程 + 链、记忆、Agent + 检索增强，覆盖了大部分应用场景。
- 检索是表示模型最重要的落地：稠密检索召回、重排序精排、RAG 让生成模型基于资料作答并给出出处。
- 需要时再训练：先训练或微调 embedding 模型适配领域，再用 SFT 和偏好调优塑造生成模型的行为；评估永远要回到自己的使用场景。

## 章节笔记

<!-- chapter: 1. An Introduction to Large Language Models -->
### 大语言模型导论（An Introduction to Large Language Models）
- 作者用一条简史串起语言 AI：从词袋模型、word2vec 的稠密向量，到注意力机制和 Transformer，再到 2023 年生成式 AI 的爆发。
- 书中把“大语言模型”定义得比较宽：既包括 BERT 这类表示模型，也包括 GPT 这类生成模型，关键是能力而非参数规模。
- 训练范式分两步：先在海量文本上预训练得到基础模型，再微调到具体任务或对话行为。
- 也讨论了偏见、透明度、版权和监管等责任问题，以及闭源 API 与开源模型的取舍。
- 原文：「Keep in mind that new and improved LLMs are frequently released.」
- 怎么用：我做产品选型时不把某个模型写死，接口层保留可替换性，模型更新快于产品迭代。

<!-- chapter: 2. Tokens and Embeddings -->
### Token 与 Embedding（Tokens and Embeddings）
- 分词器是模型的第一步，把原始文本切成 token ID；常见粒度有词、子词、字符和字节，BPE、WordPiece、SentencePiece 是主流算法。
- 不同分词器在大小写、换行、代码缩进、非英语语言上的处理差异很大，这直接影响成本和效果。
- 语言模型输出的是上下文相关的 token 向量，比 word2vec 那种静态词向量更有表达力；进一步可以得到整句、整篇文档的单一向量。
- word2vec 的对比训练思想还能迁移到推荐系统，例如把歌单当句子、把歌曲当词来学习歌曲向量。
- 原文：「Language models deal with text in small chunks called tokens.」
- 怎么用：评估中文或多语场景时，我会先看分词器把一句话切成多少 token，它同时决定上下文占用和调用成本。

<!-- chapter: 3. Looking Inside Large Language Models -->
### 走进大语言模型内部（Looking Inside Large Language Models）
- 生成模型一次只产出一个 token，再把它拼回输入继续下一轮前向计算。
- 三大组件：分词器、一叠 Transformer 块、语言建模头；最后由解码策略（贪心、温度采样等）从概率分布中选 token。
- 各 token 并行处理，流的数量就是上下文长度；KV 缓存避免重复计算，是生成提速的关键。
- 新架构改进包括更高效的注意力（如分组查询注意力）和旋转位置编码 RoPE。
- 原文：「A Transformer LLM generates one token at a time.」
- 怎么用：理解“逐 token 生成 + KV 缓存”后，我能更清楚地解释首字延迟和流式输出，这对语音交互的响应体感尤其关键。

<!-- chapter: 4. Text Classification -->
### 文本分类（Text Classification）
- 用预训练模型做分类有几条路：直接用任务专用模型、用 embedding 加一个轻量分类器、用零样本的向量相似度，或者让生成模型直接输出标签。
- 没有标注数据时，可以把标签描述也做成向量，和文本向量比相似度来零样本分类。
- 选型不只看榜单分数，推理速度在真实系统里同样重要。
- 原文：「The importance of inference speed should not be underestimated in real-life solutions.」
- 怎么用：意图识别这类高频任务，我优先考虑 embedding + 小分类器，把大模型留给难例和兜底。

<!-- chapter: 5. Text Clustering and Topic Modeling -->
### 文本聚类与主题建模（Text Clustering and Topic Modeling）
- 通用流水线：文本转向量，降维（如 UMAP），再聚类（如 HDBSCAN），最后人工检查各簇。
- BERTopic 在这条流水线上加了 c-TF-IDF 自动给簇提取关键词，并且像乐高一样可替换每个模块。
- 还可以叠加 KeyBERTInspired、MMR 优化关键词，或用生成模型给主题起一个可读的名字。
- 原文：「Language is more than a bag of words, and recent language models have proved to be quite capable of capturing that notion.」
- 怎么用：面对大量用户反馈或对话日志，我可以先聚类找主题，再决定哪些值得人工细看，而不是从零写分类体系。

<!-- chapter: 6. Prompt Engineering -->
### 提示工程（Prompt Engineering）
- 先控制输出：temperature、top_p 决定随机性，不同任务需要不同设置。
- 一个好提示的基本成分：指令、数据、输出格式、角色、语气、上下文等；具体性最重要。
- 进阶技巧：少样本示例的上下文学习、把问题拆成多步的链式提示、思维链、自洽性采样、思维树。
- 输出验证同样重要：用示例、语法约束或受限采样保证格式合规，减少幻觉。
- 原文：「LLMs may generate incorrect information confidently, which is referred to as hallucination.」
- 原文：「Here, specificity is arguably the most important aspect.」
- 怎么用：我写系统提示时先明确格式和长度约束，并允许模型说“不知道”，再用结构化输出约束兜底。

<!-- chapter: 7. Advanced Text Generation Techniques and Tools -->
### 进阶文本生成技术与工具（Advanced Text Generation Techniques and Tools）
- 以 LangChain 为例讲四个模块：模型 I/O（含量化模型加载）、链、记忆、Agent。
- 模型本身无状态，记忆靠外部实现：完整对话缓冲、只保留最近几轮的窗口缓冲、以及用 LLM 压缩历史的摘要记忆，各有成本与遗忘的取舍。
- Agent 用 ReAct 框架交替“思考—行动—观察”，可以调用搜索、计算器等工具完成单个模型做不到的任务。
- 原文：「The reason for this forgetful behavior is that these models are stateless—they have no memory of any previous conversation!」
- 怎么用：做多轮对话产品时，我把记忆策略当成显式设计决策：保留多少轮、何时摘要，都会影响延迟和成本。

<!-- chapter: 8. Semantic Search and Retrieval-Augmented Generation -->
### 语义检索与检索增强生成（Semantic Search and Retrieval-Augmented Generation）
- 三类系统：稠密检索（按向量近邻召回）、重排序（对候选逐一打相关分）、RAG（检索结果交给生成模型作答并引用来源）。
- 稠密检索的坑：文档切块策略、查询和答案不一定语义相似、需要处理“库里根本没有答案”的情况。
- 检索用平均精度均值（MAP）等指标评估；RAG 还要从忠实度、流畅度等多个维度评估，可借助人工或 LLM 评审。
- 进阶 RAG 包括查询改写、多查询、多跳检索、查询路由和 Agent 式 RAG。
- 原文：「The ability they add is called semantic search, which enables searching by meaning, and not simply keyword matching.」
- 原文：「Are a query and its best result semantically similar? Not always.」
- 怎么用：搭知识问答时我按“召回 → 重排 → 生成并引用”分层排查问题，先确认检索对了，再调生成。

<!-- chapter: 9. Multimodal Large Language Models -->
### 多模态大语言模型（Multimodal Large Language Models）
- 视觉 Transformer 把图片切成小块并转成类似 token 的向量。
- CLIP 用对比学习把图像和文本对齐到同一向量空间，支持零样本分类、跨模态检索和聚类。
- BLIP-2 用一个轻量的桥接模块把视觉特征投影成语言模型能读懂的向量，从而实现看图说话和图文对话。
- 原文：「It’s possible for a model to accept a modality as input yet not be able to generate in that modality.」
- 怎么用：思考语音或图像能力时，我分开问“能不能输入”和“能不能输出”，两者往往是不同的模型能力。

<!-- chapter: 10. Creating Text Embedding Models -->
### 训练文本嵌入模型（Creating Text Embedding Models）
- 多数 embedding 模型的核心是对比学习：让相似样本靠近、不相似样本远离；SBERT 用孪生网络结构实现这一点。
- 用 sentence-transformers 可以从预训练 BERT 出发训练 embedding 模型；损失函数（余弦相似度损失、MNR 损失）和正负样本对的质量决定效果。
- 评估不能只看单个基准，MTEB 覆盖多任务多语言，也要兼顾延迟。
- 微调比从头训练省数据：有监督微调、用 Augmented SBERT 扩充标注、用 TSDAE 做无监督领域适配。
- 原文：「A good embedding model is more than just a good score on the STSB benchmark!」
- 怎么用：检索效果卡住时，我优先考虑用领域内的查询—文档对微调 embedding，而不是先换更大的生成模型。

<!-- chapter: 11. Fine-Tuning Representation Models for Classification -->
### 微调表示模型做分类（Fine-Tuning Representation Models for Classification）
- 有足够数据时，微调整个 BERT 通常效果最好；冻结部分层可以在速度和效果之间折中。
- SetFit 用少量标注样本先对比微调 embedding 模型、再训练分类头，少样本也能接近全量效果。
- 用掩码语言建模在领域语料上继续预训练，可以让模型先熟悉领域词汇。
- 命名实体识别是 token 级分类，需要处理子词和标签的对齐。
- 原文：「If we have sufficient data, fine-tuning tends to lead to some of the best-performing models possible.」
- 怎么用：只有几十条标注时，我会先试 SetFit 这类少样本方法，再决定是否值得投入大规模标注。

<!-- chapter: 12. Fine-Tuning Generation Models -->
### 微调生成模型（Fine-Tuning Generation Models）
- 高质量 LLM 的三步：预训练（语言建模）、有监督微调（指令跟随）、偏好调优（对齐人类偏好）。
- 参数高效微调（PEFT）里 LoRA 只训练低秩适配矩阵，QLoRA 再叠加量化，大幅降低显存需求。
- 评估方法各有局限：词级指标、公开基准、排行榜、LLM 评审、人工评估；基准可能被过拟合，人工评估仍是金标准。
- 偏好调优可以先训奖励模型再做 PPO，也可以用 DPO 直接在“选中/拒绝”样本对上优化。
- 原文：「Our advice is to evaluate your LLM based on the intended use case.」
- 原文：「Human evaluation remains the gold standard because it is up to you to decide whether the LLM works for your intended use case.」
- 怎么用：上线前我会为自己的场景准备一套小而真实的评测集，而不是只看公开榜单名次。

## 读完留下
模型、表示与检索概念卡片（每张卡片一句话定义 + 一个我会用它的场景）：
- [ ] Token：模型处理文本的最小单位；用于估算上下文和成本。
- [ ] Embedding：文本的向量表示；用于相似度、分类、聚类、检索。
- [ ] 表示模型 vs 生成模型：前者出向量，后者出文本；按任务选。
- [ ] 解码策略：温度、top_p；控制稳定性与多样性。
- [ ] KV 缓存与上下文长度：影响首字延迟与长对话成本。
- [ ] 提示要素：指令、上下文、格式、示例；具体性优先。
- [ ] 记忆策略：缓冲 / 窗口 / 摘要；权衡遗忘与成本。
- [ ] Agent（ReAct）：思考—行动—观察循环 + 工具。
- [ ] 稠密检索 → 重排序 → RAG：分层定位问题。
- [ ] 检索与 RAG 评估：MAP、忠实度、LLM 评审。
- [ ] 对比学习：embedding 与 CLIP 的共同底座。
- [ ] 微调路线：SetFit（少样本）、TSDAE（领域适配）、LoRA/QLoRA（生成模型）、DPO（偏好）。

## 我的问题清单
- 对中文和语音转写文本，现成 embedding 模型在口语化、错别字较多的输入上会损失多少检索效果？需要多少领域样本才值得微调？
- 多轮语音对话里，摘要记忆带来的额外延迟和窗口记忆带来的遗忘，哪个对体验伤害更大？
- 用 LLM 评审评估 RAG 时，如何校准它和人工判断之间的偏差？
- 什么情况下应该从“提示 + RAG”升级到 LoRA 微调，判断依据能否量化？
