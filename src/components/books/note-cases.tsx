// "Core idea × case" cards under a chapter note: the chapter's key sentence
// and one concrete case from the book (both short verbatim passages), with a
// note on how the case shows the idea.

export type ChapterCase = { point: string; core: string; caseTitle: string; case: string; explain: string };

export default function NoteCases({ cases }: { cases: ChapterCase[] }) {
  if (!cases.length) return null;
  return (
    <div className="mt-5 space-y-4">
      {cases.map((c) => (
        <div key={c.core} className="rounded-lg border bg-muted/20 p-3 text-sm">
          <div className="text-xs font-medium text-primary">核心观点</div>
          <p className="mt-1 font-medium">{c.point}</p>
          <blockquote className="mt-2 border-l-2 border-primary/60 pl-3 leading-6 text-muted-foreground">{c.core}</blockquote>
          <div className="mt-3 text-xs font-medium text-primary">案例 · {c.caseTitle}</div>
          <blockquote className="mt-1 border-l-2 border-muted-foreground/30 pl-3 leading-6 text-muted-foreground">{c.case}</blockquote>
          <p className="mt-2 leading-6">
            <span className="mr-1 text-xs font-medium text-primary">怎么说明观点</span>
            {c.explain}
          </p>
        </div>
      ))}
    </div>
  );
}
