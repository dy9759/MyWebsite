import type { Metadata } from "next";
import BooksPageContent from "@/components/books/books-page-content";
import { getAllNotes, splitNote } from "@/lib/books/notes";

export const metadata: Metadata = {
  title: "读书",
  description: "按章节整理的读书笔记，可从笔记跳到原书对应章节；附 AI PM 分级阅读目录，以及在浏览器本地打开电子书的阅读器。",
};

export default function BooksPage() {
  const notes = getAllNotes().map(({ markdown, ...meta }) => ({
    ...meta,
    chapterCount: splitNote(markdown).chapters.length,
  }));
  return <BooksPageContent notes={notes} />;
}
