"use client";

import { useRef, useState } from "react";
import { Loader2, Sparkles, Square } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import WikiByokPanel from "@/components/wiki/wiki-byok-panel";
import { CATALOG, CATALOG_BY_ID, type ReadingStatus } from "@/lib/books/catalog";
import { streamChat } from "@/lib/books/companion";
import { buildAdvisorMessages } from "@/lib/books/companion-tasks";
import { renderSafeMarkdown } from "@/lib/books/safe-markdown";
import { useAiAccess } from "@/lib/books/ai-access";

const EXAMPLES = ["准备给语音产品定价并找到第一批付费客户", "想系统搞懂 Agent 评测和上线标准", "下个月开始带一个 AI 产品小团队"];

// "[R046]" / "R046" in the advisor's answer become buttons that jump to the
// entry. Runs on sanitised HTML; ids are validated against the catalog.
const linkifyIds = (html: string) =>
  html.replace(/\[?\b(R\d{3})\b\]?/g, (m, id: string) => {
    const e = CATALOG_BY_ID.get(id);
    return e
      ? `<button type="button" class="cat-ref" data-id="${id}">${id} ${e.title.replace(/[<>&"]/g, "")}</button>`
      : m;
  });

type Props = { statusOf: (id: string) => ReadingStatus; onJump: (id: string) => void };

export default function CatalogAdvisor({ statusOf, onJump }: Props) {
  const { language } = useLanguage();
  const cfg = useAiAccess();
  const [goal, setGoal] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const ask = async () => {
    if (!cfg || !goal.trim()) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setBusy(true);
    setError("");
    setAnswer("");
    try {
      await streamChat(cfg, buildAdvisorMessages(goal.trim(), CATALOG, statusOf, language), setAnswer, language, ac.signal);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        <h3 className="font-medium">选书顾问</h3>
        <span className="text-xs text-muted-foreground">说出当前目标，AI 从这 {CATALOG.length} 项里排一条路线</span>
      </div>
      {!cfg && (
        <div className="mt-2 text-xs">
          <WikiByokPanel />
        </div>
      )}
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows={2}
        placeholder="例如：准备给语音产品定价并找到第一批付费客户"
        className="mt-2 w-full resize-none rounded-md border bg-background px-3 py-2 text-sm"
        disabled={!cfg}
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" onClick={() => setGoal(ex)} className="rounded-full border px-2 py-0.5 text-xs hover:bg-accent/10" disabled={!cfg}>
            {ex}
          </button>
        ))}
        <span className="flex-1" />
        {busy ? (
          <Button size="sm" variant="outline" onClick={() => abortRef.current?.abort()}>
            <Square className="mr-1 h-3 w-3" /> 停止
          </Button>
        ) : (
          <Button size="sm" onClick={ask} disabled={!cfg || !goal.trim()}>
            规划路线
          </Button>
        )}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        会把目录（标题、优先级、推荐理由和你在本浏览器标记的阅读状态）和你的目标
        {cfg?.mode === "proxy" ? "经本站代理（只转发、不保存）发送给阿里云百炼，使用本站每日有限的免费额度。" : "用你的 Key 发送给阿里云百炼，不经过本站。"}
      </p>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      {(answer || busy) && (
        <div
          className="mt-3 rounded-md bg-muted/30 p-3 text-sm leading-6 [&_.cat-ref]:rounded [&_.cat-ref]:text-primary [&_.cat-ref]:underline [&_.cat-ref]:decoration-dotted [&_.cat-ref]:underline-offset-4 [&_h2]:mt-3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-medium [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_table]:my-2 [&_table]:w-full [&_table]:text-xs [&_td]:border [&_td]:px-1.5 [&_td]:py-1 [&_th]:border [&_th]:bg-muted/50 [&_th]:px-1.5 [&_th]:py-1 [&_th]:text-left"
          onClick={(e) => {
            const btn = (e.target as HTMLElement).closest<HTMLElement>(".cat-ref");
            if (btn?.dataset.id) onJump(btn.dataset.id);
          }}
        >
          {answer ? (
            <div dangerouslySetInnerHTML={{ __html: linkifyIds(renderSafeMarkdown(answer)) }} />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
}
