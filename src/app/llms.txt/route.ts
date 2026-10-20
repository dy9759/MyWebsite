import { CONFIG } from "@/config";
import { getAllNotes } from "@/lib/books/notes";

// llms.txt (https://llmstxt.org): a Markdown index that points AI tools at
// plain-text versions of the site's long-form content.
export const dynamic = "force-static";

export function GET() {
  const site = CONFIG.siteUrl.replace(/\/$/, "");
  const notes = getAllNotes()
    .map((n) => `- [${n.title}](${site}/books/notes/${n.slug}/note.md): ${n.summary}`)
    .join("\n");
  const body = `# ${CONFIG.name}

> ${CONFIG.descriptionRaw}

## 读书笔记

${notes}

## 阅读目录

- [AI PM 分级阅读目录](${site}/books/catalog.md): 106 项读物（评测、Agent、技术书、产品与商业方法、人物传记与产业史），含优先级、推荐理由、读法与链接
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
