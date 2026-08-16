import LabPageContent from "@/components/lab-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder Lab",
  description: "Agent、Skill、语音 AI 与个人效率产品的可交互实验和开源项目。",
};

export default function LabPage() {
  return <LabPageContent />;
}
