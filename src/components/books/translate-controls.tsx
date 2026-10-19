"use client";

import { Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Progress } from "@/lib/books/bilingual";
import type { TargetPref } from "@/lib/books/translate";

type Props = {
  canBilingual: boolean; // reflowable books only; PDFs are images + a text layer
  bilingual: boolean;
  onBilingual: (on: boolean) => void;
  target: TargetPref;
  onTarget: (t: TargetPref) => void;
  progress: Progress | null;
  hasKey: boolean;
  zh: boolean;
};

export default function TranslateControls({ canBilingual, bilingual, onBilingual, target, onTarget, progress, hasKey, zh }: Props) {
  const working = bilingual && progress && progress.done < progress.total;
  return (
    <div className="flex items-center gap-1">
      {canBilingual && (
        <Button
          variant={bilingual ? "secondary" : "outline"}
          size="sm"
          aria-pressed={bilingual}
          onClick={() => onBilingual(!bilingual)}
          title={hasKey ? undefined : zh ? "需要先在 AI 面板里配置百炼 Key" : "Set your Bailian key in the AI panel first"}
        >
          {working ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Languages className="mr-1 h-3.5 w-3.5" />}
          {zh ? "双语" : "Bilingual"}
          {working && <span className="ml-1 tabular-nums text-xs text-muted-foreground">{progress.done}/{progress.total}</span>}
        </Button>
      )}
      <select
        value={target}
        onChange={(e) => onTarget(e.target.value as TargetPref)}
        aria-label={zh ? "翻译目标语言" : "Translate to"}
        className="h-9 rounded-md border bg-background px-1.5 text-xs"
      >
        <option value="auto">{zh ? "自动" : "Auto"}</option>
        <option value="zh">→ 中文</option>
        <option value="en">→ English</option>
      </select>
    </div>
  );
}
