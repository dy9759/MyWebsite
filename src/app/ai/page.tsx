import type { Metadata } from "next";
import AIPageBody from "@/components/ai/ai-page-body";
import { AI_CONFIG } from "@/ai-config";

export const metadata: Metadata = {
  title: "AI Learning Library｜我的 AI 信息系统",
  description: AI_CONFIG.hero.intro,
};

export default function AIPage() {
  return <AIPageBody />;
}
