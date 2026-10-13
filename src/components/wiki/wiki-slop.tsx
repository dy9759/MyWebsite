"use client";

// AI Slop 专题 — 什么样的设计与文案一眼看出「AI 味」，以及怎么改。
// 目录主题整合自 killaislop.com 与 vibe-hub.org/anti-ai-flavor（经站主授权，
// 见页尾致谢）；全部讲解文案与对比演示为本站原创重写。
import { useEffect, useState } from "react";
import { SLOP_DEMOS } from "@/components/wiki/wiki-slop-demos";
import VhModal from "@/components/wiki/vh-modal";

type SlopItem = { id: string; name: string; group: string; why: string; fix: string };

const ITEMS: SlopItem[] = [
  // ---- 视觉 slop ----
  { id: "indigo-gradient", name: "蓝紫渐变", group: "视觉", why: "从背景、按钮到光球，一水的靛蓝到紫。这是生成器在没有品牌输入时的默认审美，出现频率高到成了 AI 出品的签名色。", fix: "从产品本身取色：内容类用低饱和中性色打底，一个真正属于你的强调色就够。删掉渐变后如果页面显得空，说明缺的是内容层级，不是颜色。" },
  { id: "gradient-headline", name: "渐变文字标题", group: "视觉", why: "标题文字填渐变，读起来费劲、缩略图里发糊，唯一的作用是宣告「我想要科技感」——而科技感从来不是这么来的。", fix: "标题用实色、够重的字重和克制的字距。想要视觉焦点，给标题旁边留白，比给文字上色有效十倍。" },
  { id: "glass-orbs", name: "玻璃光球与氛围渐变", group: "视觉", why: "背景飘着几颗失焦光球、四角晕开氛围渐变——不承载任何信息，只是「别的 AI 页面也这样」的从众产物。", fix: "背景的职责是退后。需要氛围时用一层极浅的纯色或非常克制的噪点，让内容自己发光。" },
  { id: "equal-cards", name: "三张等宽卡片", group: "视觉", why: "任何内容都塞进三等分卡片网格：图标、标题、两行说明。等宽等高抹平了信息的重要性差异，读者无从判断先看哪个。", fix: "先问内容的真实权重：主打的放大、次要的收窄，允许不对称。卡片是容器，不是版式的答案。" },
  { id: "box-in-box", name: "框里套框", group: "视觉", why: "卡片里包着圆角块，圆角块里再来一个描边框——每层都想「分组」，叠出来的只有压迫感和浪费的内边距。", fix: "一层容器足够。用间距和字重分组，删掉一半边框后你会发现结构反而清楚了。" },
  { id: "divider-mania", name: "分割线成瘾", group: "视觉", why: "每段之间一条横线、列表左侧一条竖线、标题下再来一条——线条泛滥说明作者不信任留白的分组能力。", fix: "留白就是分割。只有当两块内容真的容易混读时才画线，画了线就删掉相应的空隙，别双重收费。" },
  { id: "emoji-icons", name: "Emoji 当图标", group: "视觉", why: "功能列表前排一串 🚀✨💡：跨平台渲染不一致、语义模糊，而且和正文字号打架——这是没有图标系统时的临时补丁被当成了设计。", fix: "要么用一套线性图标统一大小与描边，要么干脆不用图标。列表的可读性靠文案动词，不靠表情符号。" },
  { id: "flat-hierarchy", name: "没有层级的字号", group: "视觉", why: "标题、副标题、正文挤在相邻字号里，或者一整句话全部加粗——页面每个元素都在喊，等于没有一个在说。", fix: "定一个明确的字阶（比如 13/15/20/28），层级之间拉开真实差距；强调一次只给一个词。" },
  // ---- 文字 AI 味 ----
  { id: "not-x-but-y", name: "「不是 X，而是 Y」", group: "文字", why: "每三段出现一次的排比否定句。第一次有力，第十次成了口头禅——模型爱用它制造深刻感，读者只感到疲劳。", fix: "直接说 Y。需要对比时给一个具体的事实差异，而不是修辞结构。" },
  { id: "closure-jargon", name: "满口「闭环」「抓手」「赋能」", group: "文字", why: "黑话是意义的占位符：说的人不用想清楚，听的人也无从验证。密度一高，整段话像营销部生成的白噪声。", fix: "每个黑话都换成动词+对象：「形成闭环」→「上线后每周看数据再改」。换不出来的句子，删。" },
  { id: "conclusion-first-cliche", name: "先说结论的套话开场", group: "文字", why: "「总的来说」「简而言之」「值得注意的是」——这些短语不传递信息，只是模型在热身。", fix: "把第一句删了再读一遍：几乎总是更好。开头直接给事实或判断。" },
  { id: "bullet-everything", name: "什么都拆成分点", group: "文字", why: "三句话的事拆成五个 bullet，每个 bullet 一个加粗小标题——结构感是假的，因为点与点之间本没有并列关系。", fix: "有真实并列才用列表。叙述、因果、转折就老老实实写成段落，散文不丢人。" },
  { id: "hedge-praise", name: "动不动夸你「抓住了本质」", group: "文字", why: "「这是一个非常好的问题」「你说到了点子上」——无差别的赞美是奉承，不是反馈，读者第二次就免疫了。", fix: "省掉评价，直接回应内容。真想肯定，指出具体哪一点对、为什么对。" },
  { id: "quote-everything", name: "什么都要加「引号」", group: "文字", why: "普通词汇被引号包裹：「智能」的「体验」带来「价值」——引号本该标记特殊用法，滥用后只剩阴阳怪气。", fix: "只有术语首次出现或反讽时才用引号。其余全删，句子立刻干净。" },
  { id: "grand-metaphor", name: "夸张比喻堆砌", group: "文字", why: "「像一场革命」「如同交响乐般优雅」——比喻不锚定具体事实时，只是辞藻通胀，稀释了真正的信息。", fix: "一篇文章最多留一个比喻，并且让它干活：能帮读者理解机制的留下，装饰性的删光。" },
  { id: "emotional-catchphrase", name: "「稳稳接住你」式共情", group: "文字", why: "「你不是太敏感，你只是太清醒」「我就在这里，稳稳地接住你」——套模板的情感话术，第一次见暖，第十次见起鸡皮疙瘩：共情成了口癖，就不再是共情。", fix: "回应具体的事，而不是发共情模板：把「接住你」换成「这个问题我查了，是 X 造成的，今晚修」。" },
  { id: "single-char-verbs", name: "单字动作口癖", group: "文字", why: "「收一下」「提一层」「落回去」「拉齐」——把动作压缩成单字黑话，显得干练，实际谁也不知道具体要做什么。正常说话不这么说。", fix: "每个单字动作展开成「动词+对象+标准」：「收一下」→「把范围缩到这两个场景」；说人话是最高级的干练。" },
  { id: "if-you-wish", name: "「如果你愿意，我还可以…」", group: "文字", why: "结尾永远缀一句主动加码的服务话术。放在产品文案里，就是典型的对话残留——它暴露了文本的生成来源。", fix: "文案止于信息说完的那一刻。行动号召要具体（「导出 CSV」），不要万能追加（「还想要什么都可以」）。" },
  // ---- 交互与结构 ----
  { id: "center-everything", name: "一切居中", group: "交互", why: "标题居中、正文居中、按钮居中——居中是最不需要决策的对齐方式，也最难建立扫读的锚点线。", fix: "默认左对齐，让眼睛有一条稳定的起跑线。居中留给真正的仪式时刻：空状态、成功页。" },
  { id: "fly-in-everything", name: "每块都要飞进来", group: "交互", why: "滚一屏，八个元素依次淡入上移。动画不再传达状态变化，只是延迟了内容的出现——第二次访问就变成纯粹的等待。", fix: "动效服务于反馈（按下、加载、完成），不服务于出场。列表内容直接渲染，把 300ms 还给读者。" },
  { id: "explain-everywhere", name: "到处补说明文字", group: "交互", why: "每个控件旁边一行灰色小字解释它是干嘛的——界面在为自己的不自明道歉。", fix: "改标签而不是加注释：按钮文案写清动作与结果，说明文字只留给真正有代价的操作。" },
  { id: "synonym-actions", name: "同一操作换着叫", group: "交互", why: "这里叫「保存」，那里叫「提交」，弹窗里又叫「确认」——同一动作三个名字，用户每次都要重新猜。", fix: "给每个核心动作定唯一动词，写进文案表，全站复用。" },
  { id: "icon-only", name: "只放图标不写名字", group: "交互", why: "一排孤零零的图标按钮，含义全靠悬停提示——移动端连悬停都没有。省下的空间用可用性付了账。", fix: "高频动作图标+文字并排；确实要省空间，保证图标是通用惯例（放大镜、齿轮），其余一律带标签。" },
  { id: "mobile-pileup", name: "手机端一路堆到底", group: "交互", why: "桌面的三栏在窄屏里原样竖着摞：一屏塞四个区块标题，层级全靠运气。响应式不等于「变窄」。", fix: "移动端重排优先级:砍掉次要模块、合并重复入口,让每屏只回答一个问题。" },
];

const GROUPS = ["视觉", "文字", "交互"] as const;

export const SLOP_TOTAL = ITEMS.length;

function DemoPair({ title, slop, better, note }: { title: string; slop: React.ReactNode; better: React.ReactNode; note: string }) {
  return (
    <div className="slop-pair">
      <p className="slop-pair-title">{title}</p>
      <div className="slop-pair-grid">
        <figure>
          <div className="slop-stage">{slop}</div>
          <figcaption className="slop-cap bad">Slop 版</figcaption>
        </figure>
        <figure>
          <div className="slop-stage">{better}</div>
          <figcaption className="slop-cap good">更好的版本</figcaption>
        </figure>
      </div>
      <p className="slop-note">{note}</p>
    </div>
  );
}

// slop / 清理后 live comparison inside the modal (all renders self-built).
function SlopDemoStage({ id }: { id: string }) {
  const demo = SLOP_DEMOS[id];
  const [mode, setMode] = useState<"slop" | "fixed">("slop");
  if (!demo) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div className="slop-toggle" role="tablist" aria-label="对照切换">
        <button type="button" role="tab" aria-selected={mode === "slop"} className={mode === "slop" ? "on bad" : ""} onClick={() => setMode("slop")}>
          ● slop
        </button>
        <button type="button" role="tab" aria-selected={mode === "fixed"} className={mode === "fixed" ? "on good" : ""} onClick={() => setMode("fixed")}>
          ● 清理后
        </button>
      </div>
      <div className="slop-stage" style={{ marginTop: 8 }}>{mode === "slop" ? demo.slop : demo.fixed}</div>
      {demo.signals?.length ? (
        <p className="slop-signals">
          <span>信号</span>
          {demo.signals.map((sig) => (
            <code key={sig}>{sig}</code>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function SlopModal({ item, onClose }: { item: SlopItem; onClose: () => void }) {
  return (
    <VhModal label={item.name} onClose={onClose}>
      <h3 className="slop-modal-title">{item.name}<span className="vh-en">{item.group} slop</span></h3>
      <SlopDemoStage id={item.id} />
      <p className="slop-why"><b>为什么是 slop</b>{item.why}</p>
      <p className="slop-fix"><b>怎么改</b>{item.fix}</p>
    </VhModal>
  );
}

export default function WikiSlop() {
  const [open, setOpen] = useState<SlopItem | null>(null);
  return (
    <div className="theme-vibe -mx-4 -mb-4 px-4 pb-8 pt-4 md:px-6">
      <h2 className="vh-page-title !mt-0">AI Slop 图鉴</h2>
      <p className="slop-intro">
        AI 生成的设计与文案，难看得很有辨识度——因为生成器在缺少品牌输入时总是回落到同一套默认审美。
        这里按「视觉 / 文字 / 交互」整理了 {ITEMS.length} 种最常见的 AI 味模式：每一条讲清它为什么读起来像机器，以及具体怎么改。
        点开卡片看完整拆解，页尾有 slop 与更好版本的并排对照。
      </p>

      {GROUPS.map((g) => (
        <section key={g}>
          <h3 className="vh-cat-title">
            {g === "视觉" ? "视觉 slop" : g === "文字" ? "文字 AI 味" : "交互与结构"}
            <span className="vh-count">{ITEMS.filter((i) => i.group === g).length} 种</span>
          </h3>
          <div className="slop-grid">
            {ITEMS.filter((i) => i.group === g).map((i) => (
              <button key={i.id} type="button" className="slop-card" onClick={() => setOpen(i)}>
                <b>{i.name}{SLOP_DEMOS[i.id] ? <em className="slop-demo-hint">对照</em> : null}</b>
                <span>{i.why.slice(0, 42)}…</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <h3 className="vh-cat-title">对照现场<span className="vh-count">4 组</span></h3>

      <DemoPair
        title="① Hero 区：默认审美 vs 编辑式排版"
        slop={
          <div style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", borderRadius: 10, padding: "26px 18px", textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 2 }}>🚀 NEXT-GEN PLATFORM ✨</div>
            <div style={{ fontSize: 21, fontWeight: 800, marginTop: 8, background: "linear-gradient(90deg,#fff,#c7d2fe)", WebkitBackgroundClip: "text", color: "transparent" }}>
              用 AI 赋能你的每一个闭环
            </div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 8 }}>我们不是工具，而是革命 💡</div>
            <div style={{ marginTop: 14 }}>
              <span style={{ background: "#fff", color: "#6d28d9", borderRadius: 999, padding: "7px 18px", fontSize: 12.5, fontWeight: 700 }}>立即开启旅程 →</span>
            </div>
          </div>
        }
        better={
          <div style={{ background: "var(--vh-bg-soft)", border: "1px solid var(--vh-line)", borderRadius: 10, padding: "26px 20px" }}>
            <div style={{ fontSize: 22, fontWeight: 750, lineHeight: 1.3, color: "var(--vh-text)" }}>会议纪要，五分钟出初稿</div>
            <div style={{ fontSize: 13, marginTop: 8, color: "var(--vh-text-2)", lineHeight: 1.7 }}>
              上传录音，按发言人分段、带待办清单。错了随手改，改动会被记住。
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ background: "var(--vh-brand)", color: "#fff", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, fontWeight: 600 }}>试一段录音</span>
              <span style={{ fontSize: 12, color: "var(--vh-text-3)" }}>免注册 · 30 秒样例</span>
            </div>
          </div>
        }
        note="左边:渐变+emoji+居中+黑话+万能 CTA,五种 slop 一次集齐;右边:说清产品做什么、给一条具体的下一步——没有一处装饰,反而更贵气。"
      />

      <DemoPair
        title="② 特性区：三等宽卡片 vs 真实层级"
        slop={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["✨ 智能分析", "🚀 极速体验", "🔒 安全可靠"].map((t) => (
              <div key={t} style={{ border: "1px solid var(--vh-line)", borderRadius: 10, padding: "14px 10px", textAlign: "center", background: "var(--vh-bg-soft)" }}>
                <div style={{ fontSize: 20 }}>{t.split(" ")[0]}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 6, color: "var(--vh-text)" }}>{t.split(" ")[1]}</div>
                <div style={{ fontSize: 11, marginTop: 4, color: "var(--vh-text-3)" }}>行业领先的先进能力</div>
              </div>
            ))}
          </div>
        }
        better={
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 8 }}>
            <div style={{ border: "1px solid var(--vh-line)", borderRadius: 10, padding: "16px 14px", background: "var(--vh-bg-soft)" }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--vh-text)" }}>按发言人分段</div>
              <div style={{ fontSize: 12, marginTop: 5, color: "var(--vh-text-2)", lineHeight: 1.65 }}>
                谁说的记在谁头上，纠错一次全场生效——纪要能不能直接发群里，就差这一步。
              </div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ border: "1px solid var(--vh-line)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "var(--vh-text-2)" }}>待办自动抽取</div>
              <div style={{ border: "1px solid var(--vh-line)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "var(--vh-text-2)" }}>术语表热词</div>
            </div>
          </div>
        }
        note="等宽卡片假装三件事同样重要;右边把主打能力放大、次要能力收进侧栏——版式本身就在替你说「先看这个」。"
      />

      <DemoPair
        title="③ 正文：AI 味文案 vs 人话"
        slop={
          <div style={{ fontSize: 12.5, lineHeight: 1.9, color: "var(--vh-text-2)" }}>
            <p>总的来说，这不仅仅是一次「升级」，而是一场关于效率的<b>革命</b>。</p>
            <p style={{ marginTop: 6 }}>我们相信：</p>
            <ul style={{ paddingLeft: 18, marginTop: 4, listStyle: "disc" }}>
              <li><b>赋能</b>——为你的工作流持续赋能</li>
              <li><b>闭环</b>——让每一次协作形成完美闭环</li>
              <li><b>抓手</b>——打造数字化转型的关键抓手</li>
            </ul>
            <p style={{ marginTop: 6 }}>如果你愿意，我们还可以为你做得更多 ✨</p>
          </div>
        }
        better={
          <div style={{ fontSize: 12.5, lineHeight: 1.9, color: "var(--vh-text-2)" }}>
            <p>新版把导出速度提到了 3 秒以内（旧版平均 41 秒）。</p>
            <p style={{ marginTop: 6 }}>改动只有两处：报表按需生成，不再全量预算；导出格式增加了 CSV。</p>
            <p style={{ marginTop: 6 }}>老模板不受影响，明天起自动生效。</p>
          </div>
        }
        note="左边一个事实都没有;右边三句话全是事实。文字的 AI 味不在词汇,在「信息密度趋近于零」。"
      />

      <DemoPair
        title="④ 强调：什么都突出 vs 一次一个"
        slop={
          <div style={{ fontSize: 13, lineHeight: 2, color: "var(--vh-text-2)" }}>
            <span style={{ background: "#fef08a" }}>核心优势</span>在于<b><i>极致</i></b>的
            <span style={{ textDecoration: "underline" }}>用户体验</span>与
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>行业领先</span>的
            <s>传统方案</s><span style={{ background: "#fecaca" }}>颠覆性</span>能力。
          </div>
        }
        better={
          <div style={{ fontSize: 13, lineHeight: 2, color: "var(--vh-text-2)" }}>
            纠错一次，<b>全场生效</b>——同一个人名不用改第二遍。
          </div>
        }
        note="高亮、下划线、斜体、彩色、删除线同时上阵,读者的眼睛无处落脚。一句话只强调一个点,而且要强调得起——它得真的重要。"
      />

      <p className="vh-credit">
        专题目录整合自{" "}
        <a href="https://killaislop.com/" target="_blank" rel="noopener noreferrer">killaislop.com</a>
        {" "}与{" "}
        <a href="https://vibe-hub.org/anti-ai-flavor" target="_blank" rel="noopener noreferrer">vibe-hub.org/anti-ai-flavor</a>
        {" "}（经站主授权引用其主题目录；本页全部讲解文案与对比演示为本站原创重写）。
      </p>

      {open ? <SlopModal item={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}
