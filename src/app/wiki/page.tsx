import type { Metadata } from "next";
import WikiPageBody from "@/components/wiki/wiki-page-body";

export const metadata: Metadata = {
  title: "AI Sense Wiki",
  description:
    "六大知识域同源：建造者词典 / 学院 / 品味 / FDE 能力测试（共识）→ 信号（前沿）→ 机会（AI native 岗位），浏览与随行对话共用同一数据源。",
};

export default function WikiPage() {
  return <WikiPageBody />;
}
