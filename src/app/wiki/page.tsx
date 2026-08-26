import type { Metadata } from "next";
import WikiPageBody from "@/components/wiki/wiki-page-body";

export const metadata: Metadata = {
  title: "AI Sense Wiki",
  description:
    "四大知识域同源：AI 知识源 + Vibe Hub + 闭环学院 + AI Native 招聘，左侧浏览、右侧随行对话（演示壳）。",
};

export default function WikiPage() {
  return <WikiPageBody />;
}
