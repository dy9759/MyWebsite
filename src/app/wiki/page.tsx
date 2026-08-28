import type { Metadata } from "next";
import WikiPageBody from "@/components/wiki/wiki-page-body";

export const metadata: Metadata = {
  title: "AI Sense Wiki",
  description:
    "五大知识域同源：AI 知识源 + 建造者词典 + 建造者学院 + AI Slop + AI Native 招聘，浏览与随行对话共用同一数据源。",
};

export default function WikiPage() {
  return <WikiPageBody />;
}
