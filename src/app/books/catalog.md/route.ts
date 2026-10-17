import { READING_PRINCIPLES, READING_ROUTES } from "@/content/books/reading-routes";
import { CATALOG, CATALOG_BY_ID, CATEGORIES, categoryLabel, sortCatalog } from "@/lib/books/catalog";

// The reading catalog as one Markdown file, linked from /llms.txt, so AI
// tools get the whole list (with reasons and links) without parsing the UI.
export const dynamic = "force-static";

export function GET() {
  const routes = READING_ROUTES.map(
    (r) =>
      `- **${r.title}**（${r.goal}）：${r.steps.map((id) => `${id} ${CATALOG_BY_ID.get(id)?.title}`).join(r.parallel ? " ／ " : " → ")}。读完留下：${r.output}`,
  ).join("\n");
  const sections = CATEGORIES.map((c) => {
    const items = sortCatalog(
      CATALOG.filter((e) => e.category === c),
      "priority",
    )
      .map(
        (e) =>
          `### ${e.id} [${e.title}](${e.url})\n${e.author} · ${e.kind} · ${e.priority} · 重要性 ${e.importance} · 推荐 ${e.score}/5 · ${e.access}\n\n- 推荐理由：${e.reason}\n- 建议读法：${e.method}\n- 阅读产出：${e.output}\n- 取舍提醒：${e.caveat}\n- 推荐出处：${e.evidenceUrl ? `[${e.evidence}](${e.evidenceUrl})` : e.evidence}\n- 核验状态：${e.reviewStatus}`,
      )
      .join("\n\n");
    return `## ${categoryLabel(c)}\n\n${items}`;
  }).join("\n\n");
  const body = `# AI PM 分级阅读目录（${CATALOG.length} 项）

> 优先级 P0 立即读 / P1 下一批 / P2 按需读 / P3 收藏速读；重要性 S 核心 / A 重要 / B 背景 / C 可选；推荐指数 5 分制，是针对当前阶段的主观判断。目录由 AI 辅助检索整理、作者审定；链接指向作者、出版社或原文页面。

## 怎么读

${READING_PRINCIPLES.map((p) => `- ${p}`).join("\n")}

## 阅读路线

${routes}

${sections}
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
