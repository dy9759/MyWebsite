import type { Metadata } from "next";
import CatalogPage from "@/components/books/catalog/catalog-page";
import { getAllNotes } from "@/lib/books/notes";

export const metadata: Metadata = {
  title: "AI PM 分级阅读目录",
  description:
    "105 项 AI 产品经理读物：评测、Agent、技术书、产品与商业方法、人物传记与产业史，按优先级、重要性和推荐指数分级，附推荐理由、读法与阅读产出。",
};

export default function BooksCatalogPage() {
  const noteByCatalog = Object.fromEntries(
    getAllNotes()
      .filter((n) => n.catalogId)
      .map((n) => [n.catalogId!, n.slug]),
  );
  return <CatalogPage noteByCatalog={noteByCatalog} />;
}
