import type { Metadata } from "next";
import BooksPageContent from "@/components/books/books-page-content";
import { getAllNotes } from "@/lib/books/notes";

export const metadata: Metadata = {
  title: "读书",
  description: "读书笔记，以及一个在浏览器本地打开 EPUB、PDF、MOBI、TXT 等电子书的阅读器。",
};

export default function BooksPage() {
  const notes = getAllNotes().map(({ markdown: _markdown, ...meta }) => meta);
  return <BooksPageContent notes={notes} />;
}
