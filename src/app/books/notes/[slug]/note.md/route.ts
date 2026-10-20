import { getAllNotes, getNote, markersToText } from "@/lib/books/notes";

// Plain-Markdown copy of each note, linked from /llms.txt so AI tools can
// read notes without parsing HTML.
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  if (!note) return new Response("Not found", { status: 404 });
  const header = `# ${note.title}\n\n> 《${note.book}》· ${note.author} · ${note.date}${note.draft ? " · 草稿" : ""}\n> ${note.summary}\n\n`;
  return new Response(header + markersToText(note.markdown) + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
