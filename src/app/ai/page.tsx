import type { Metadata } from "next";
import AIRedirect from "@/components/ai/ai-redirect";

// AI Sense Sources now lives inside the Wiki as the AI 知识源 domain; this
// route only forwards old links there.
export const metadata: Metadata = {
  title: "AI Sense Sources｜我的 AI 信息系统",
  description: "AI Sense Sources 已整合进 AI Sense Wiki 的「AI 知识源」。",
};

export default function AIPage() {
  return <AIRedirect />;
}
