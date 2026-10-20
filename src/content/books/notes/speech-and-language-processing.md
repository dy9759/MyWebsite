---
title: Speech and Language Processing
book: Speech and Language Processing (3rd ed. draft)
author: Daniel Jurafsky, James H. Martin
date: 2026-10-20
summary: 这本 NLP 与语音的标准教科书把语言模型、Transformer、机器翻译、ASR 与 TTS 的原理和评测方法串成一条线，是做语音 / 语音翻译 AI 产品时判断技术边界与指标含义的底层参照。
tags: 语言模型, 语音识别, 机器翻译, 评测指标, 语音合成
catalogId: R037
---

> 由 AI 辅助起草，作者审改。书中原文只作简短引用，完整内容请阅读正版。

## 一句话
从分词、n-gram 到 Transformer 与大模型，再到翻译、问答、对话、语音识别与合成，这本书讲清楚了每个模块"怎么建"和"怎么量"；对我来说，最值钱的是后者——每个指标在衡量什么、又漏掉了什么。

## 核心框架
- **一切皆预测下一个 token**：从 n-gram 到大模型，语言模型的本质都是给序列打概率；翻译、摘要、问答都可以改写成条件生成问题。
- **表示决定能力**：从稀疏词频向量到静态词向量，再到上下文相关的嵌入，模型"理解"语言的方式一路从计数走向注意力。
- **编码器-解码器是通用骨架**：机器翻译、语音识别、语音合成在结构上几乎是同一套模型，只是输入输出的模态不同。
- **评测分内在与外在**：困惑度这类内在指标便宜、可快速迭代，但最终要用 WER、chrF、MOS 这类贴近任务的指标甚至真人评测来确认。
- **真实场景远比基准难**：朗读语音近乎"已解决"，而多人对话、远场、口音和方言下的错误率仍高得多，产品体验差距往往就藏在这里。

## 章节笔记

<!-- chapter: Regular Expressions, Tokenization, Edit Distance -->
### 正则、分词与编辑距离（Regular Expressions, Tokenization, Edit Distance）
- 正则表达式依然是文本清洗、模式抽取的第一工具，ELIZA 式的模式匹配就是它的早期应用。
- 现代模型不直接吃"词"，而是吃子词 token：BPE 这类自底向上的算法用字母序列的统计规律合并出词表，未登录词也能被拆成已知片段。
- 最小编辑距离用动态规划求两个字符串之间的插入、删除、替换次数，并顺带给出对齐结果——这正是后面 WER 的计算基础。
- 原文：「These are derived via bottom-up tokenization, in which we use simple statistics of letter sequences to come up with the vocabulary of subword tokens」
- 怎么用：做多语言或中英混说的语音产品时，我要留意分词器对不同语言的切分粒度，它直接影响 token 成本、上下文长度和后续指标的可比性。

<!-- chapter: N-gram Language Models -->
### n-gram 语言模型（N-gram Language Models）
- 语言模型给"下一个词"分配概率；在语音识别里，它负责判断哪种听写结果更像一句正常的话。
- n-gram 用固定窗口内的前文做马尔可夫近似，靠计数和归一化训练；未见过的组合需要平滑或插值来兜底。
- 评测分外在（嵌入真实任务看效果）与内在（困惑度）。困惑度越低越好，但它必须在严格隔离的测试集上算，且只有词表相同才可比。
- 原文：「And the perplexity of two language models is only comparable if they use identical vocabularies.」
- 怎么用：比较两个语言模型或供应商时，我先确认测试集是否泄漏、词表/分词是否一致；困惑度的提升最后仍要用端到端任务指标来确认。

<!-- chapter: Vector Semantics and Embeddings -->
### 向量语义与词嵌入（Vector Semantics and Embeddings）
- 分布假设：出现在相似上下文里的词，意思也相近；词义因此可以被表示成高维空间里的一个点。
- 稀疏向量（tf-idf、PPMI）每一维对应一个词；稠密向量（word2vec、GloVe）只有几十到上千维，相似度常用余弦来量。
- 这一章的静态嵌入是后面 BERT 等上下文嵌入的前身，也是向量检索的直觉来源。
- 原文：「Words that occur in similar contexts tend to have similar meanings.」
- 怎么用：做术语库、热词或语义检索时，我可以用嵌入相似度找同义或近义说法，但要记得静态向量分不清一词多义。

<!-- chapter: RNNs and LSTMs -->
### 循环网络与 LSTM（RNNs and LSTMs）
- 语言天然是时间序列，口语尤其如此；RNN 用循环连接携带历史，不再依赖固定窗口。
- LSTM 通过门控缓解长距离信息丢失；堆叠和双向结构进一步增强表达力。
- 本章总结了四种常见架构：序列标注、序列分类、语言建模，以及处理"输入输出长度不同、也不逐词对齐"问题的编码器-解码器。
- 原文：「Language is an inherently temporal phenomenon.」
- 怎么用：理解流式语音系统时，我会把"只能看过去"的单向结构和"要看完整句"的双向结构区分开，前者天然更适合低延迟。

<!-- chapter: The Transformer -->
### Transformer（The Transformer）
- Transformer 是构建大模型的标准架构，核心是自注意力 / 多头注意力：每个 token 按相关性从上下文中汇集信息。
- 一个 Transformer 块由残差流、多头注意力、前馈层和层归一化组成，多块堆叠形成深层网络；输入是词嵌入加位置编码。
- 顶部的语言模型头把最后一层输出映射回词表，经 softmax 得到下一个 token 的概率；长上下文窗口让模型能利用大量前文。
- 原文：「Attention can be thought of as a way to build contextual representations of a token’s meaning by attending to and integrating information from surrounding tokens」
- 怎么用：当我评估长对话或长文档场景时，要把上下文窗口、注意力计算成本和延迟一起考虑，而不是只看模型参数量。

<!-- chapter: Large Language Models -->
### 大语言模型（Large Language Models）
- 问答、摘要、翻译、情感分析都能改写成"预测下一个词"，因此可以统一交给大模型处理。
- 生成时很少用贪心解码（太重复、太单调），而是用 top-k、top-p、温度等采样方法控制多样性；翻译这类强约束任务则偏好束搜索。
- 预训练依赖数千亿词级别的网页语料，需要质量过滤和领域配比；KV 缓存、参数高效微调等技巧用来压低推理与训练成本。
- 困惑度对分词器敏感，跨模型比较时要格外小心；同时还要看下游任务准确率、公平性、能耗，以及幻觉、偏见、隐私与版权等风险。
- 原文：「For this reason perplexity is best used when comparing language models that use the same tokenizer.」
- 怎么用：我在选型时不能拿不同家模型的困惑度直接比较，应当用自己场景的下游任务集去测，并单独评估幻觉率。

<!-- chapter: Masked Language Models -->
### 掩码语言模型（Masked Language Models）
- 双向编码器（BERT 一类）在处理每个 token 时能同时看左右文，目标不是生成，而是得到上下文化的表示。
- 训练方式是遮住部分词让模型猜，学到的上下文嵌入比离散的"词义条目"更细腻。
- 在预训练模型上加轻量分类头即可微调做句子分类、句对推理、命名实体识别等任务。
- 原文：「Bidirectional encoders can be used to generate contextualized representations of input embeddings using the entire input context.」
- 怎么用：对于标点恢复、实体识别、意图分类这类"看完整句再判断"的小任务，编码器模型往往比调用大模型更便宜、更快、更稳定。

<!-- chapter: Model Alignment, Prompting, and In-Context Learning -->
### 对齐、提示与上下文学习（Model Alignment, Prompting, and In-Context Learning）
- 简单提示就能把很多实际应用映射成大模型可解的问题，而不必改动模型本身；少样本示例进一步给出格式和风格的引导。
- 上下文学习指模型在推理时从提示中"学会"新任务，而不更新参数；思维链提示帮助处理多步推理。
- 对齐分两步：指令微调（用指令-回答数据继续训练）和偏好对齐（RLHF、DPO 等），让模型更有用也更安全。
- 原文：「Simple prompting can be used to map practical applications to problems that can be solved by LLMs without altering the model.」
- 怎么用：做产品原型时，我先用提示和少样本示例验证可行性，只有当提示无法稳定达标时才考虑微调。

<!-- chapter: Machine Translation -->
### 机器翻译（Machine Translation）
- 机器翻译的主要用途是信息获取、辅助人工译者（译后编辑、本地化），以及新兴的即时沟通场景，例如在整句说完前就开始翻译的增量翻译。
- 语言之间在语序、词汇划分、形态、指代密度上都有差异，这是翻译难的根源；标准方法是带交叉注意力的编码器-解码器，用平行语料训练，回译可以利用单语数据。
- 解码常用束搜索，最小贝叶斯风险解码是另一种选择；低资源语言可借助数据增强和多语言模型。
- 评测看两个维度：忠实度（意思是否准确）和流利度（目标语言是否自然）。真人评测最准；自动指标如 chrF 基于字符 n-gram 重合，BLEU 基于词 n-gram 精确率，嵌入类指标则比较语义相似度。
- 原文：「Automatic metrics are less accurate than human evaluation, but can help test potential system improvements」
- 原文：「chrF is simple, robust, and correlates very well with human judgments in many languages」
- 怎么用：我做翻译质量评估时，把自动指标当作迭代用的"体温计"，关键版本仍要安排双语人工按忠实度和流利度分开打分。

<!-- chapter: Question Answering, Information Retrieval, and RAG -->
### 问答、检索与 RAG（Question Answering, Information Retrieval, and RAG）
- 大模型会一本正经地编答案，而且置信度并不可靠，所以单靠参数记忆做问答不够。
- 信息检索用 tf-idf / BM25 稀疏向量或 BERT 类稠密向量匹配查询与文档，倒排索引提升效率，排序结果用平均精确率等指标评估。
- RAG 采用检索器 + 阅读器结构：先检索相关段落，再把它们拼进提示让大模型生成答案；问答可用精确匹配、token F1、平均倒数排名等评测。
- 原文：「it is not a general solution for QA, because it leads to hallucination, is unable to show users textual evidence to support the answer」
- 怎么用：凡是事实要求高的场景，我倾向于让回答引用检索到的原文片段，这样既降低幻觉，又能让用户自己核对。

<!-- chapter: Chatbots & Dialogue Systems -->
### 聊天机器人与对话系统（Chatbots & Dialogue Systems）
- 人类对话是复杂的协同活动：由话轮组成，每句话都是一种"言语行为"，双方还要不断建立共同认知。
- 口语对话系统必须知道何时停止说话（用户可能打断并纠正）、何时开始说话；判断用户是否说完的"端点检测"因噪声和句中停顿而很难。
- 任务型对话常用框架-槽位架构，对话状态架构再加上状态跟踪、策略和生成；基于大模型的聊天机器人则依赖微调、检索与 RLHF。
- ELIZA 的经验提醒：用户会把机器当人看待，情感投入与隐私风险都需要认真对待；设计上要尊重 HCI 原则，反复在真实用户上测试。
- 原文：「Spoken dialogue systems must also detect whether a user is done speaking, so they can process the utterance and respond.」
- 怎么用：做语音交互时，我会把打断处理和端点检测当成一等指标来测，因为它们比单句准确率更直接地决定"像不像在和人说话"。

<!-- chapter: Automatic Speech Recognition and Text-to-Speech -->
### 语音识别与语音合成（Automatic Speech Recognition and Text-to-Speech）
- ASR 的难度随词表规模、说话风格、信道和噪声剧烈变化：朗读语音的错误率已很低，而电话对话、方言口音、多人远场场景的错误率高出许多。
- 前端把波形经采样、量化、加窗、傅里叶变换和梅尔滤波转成对数梅尔谱；主流架构是带注意力的编码器-解码器，以及基于 CTC 损失的模型。
- 注意力模型更准，但需等整段输入；CTC 更容易做流式输出，RNN-T 在 CTC 上加入预测网络，弥补输出之间的独立性假设。
- WER 由词级编辑距离算出（替换 + 插入 + 删除，除以参考词数），因含插入可以超过 100%；还要看句错误率、混淆矩阵并做显著性检验。
- TTS 同样是编码器-解码器：先把文本映射为梅尔谱，再由声码器生成波形；前置的文本规范化要处理数字、日期、金额等非标准词。TTS 依赖 MOS 打分和 AB 测试评估。章末还提到唤醒词检测、说话人分离、说话人识别与语种识别。
- 原文：「By contrast, a CTC algorithm can input letters from left to right immediately.」
- 原文：「Speech synthesis systems are evaluated by human listeners.」
- 怎么用：我评估 ASR 时会按场景分桶报告 WER/CER，而不是只给一个总平均数；评估 TTS 时用小规模 AB 测试快速比较改动，再用 MOS 做版本基线。

## 读完留下

**ASR、语言建模与评测原理清单**

1. 语言模型
   - [ ] 困惑度是否在同一分词器、同一词表、未泄漏的测试集上计算？
   - [ ] 困惑度的改进是否经过端到端任务指标确认？
2. 语音识别（ASR）
   - [ ] WER/CER 是否按场景分桶：朗读、电话、多人对话、远场、口音？
   - [ ] 是否单独统计替换、插入、删除，并查看高频混淆词？
   - [ ] 流式与非流式的取舍：延迟需求是否要求 CTC / RNN-T 类结构？
   - [ ] 端点检测与打断处理是否有独立测试集？
3. 机器翻译
   - [ ] 自动指标（chrF / BLEU / 嵌入类）只用于迭代，关键版本有人工评测？
   - [ ] 人工评测是否把忠实度与流利度分开打分，并对评分者做过培训和归一化？
4. 语音合成（TTS）
   - [ ] 文本规范化是否覆盖数字、日期、金额、缩写？
   - [ ] 两个版本对比用 AB 测试，版本基线用 MOS？
5. 大模型应用
   - [ ] 事实类回答是否用 RAG 给出可核对的来源？
   - [ ] 是否单独评估幻觉率，而不只看流畅度？

## 我的问题清单
- 在级联式语音翻译里，ASR 的错误会怎样在翻译阶段被放大或被纠正？WER 与最终翻译质量之间的相关性有多强？
- 书中提到 TTS 还缺少可靠的自动评测指标，那么在快速迭代时，有没有比 AB 测试成本更低又足够可信的替代方案？
- 增量翻译需要在句子没说完时就输出，如何在延迟、改写次数和翻译质量之间定义一个可度量的平衡点？
- 端到端语音大模型兴起后，"ASR + LLM + TTS"的分模块评测框架还适用吗，哪些指标需要重新定义？
