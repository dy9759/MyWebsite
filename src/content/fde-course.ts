// 建造者学院 · FDE 认证篇 — the FDE question bank split into four academy
// chapters, one per module of the official course (lessons 1.x–4.x). Chapter
// titles and taglines are written here; per-lesson question counts and domains
// are derived from the bank so they never drift.
import { FDE_DOMAIN_LABELS, FDE_QUESTIONS, type FdeDomain } from "@/lib/fde-exam";

export type FdeChapter = {
  id: string;
  index: number; // continues the academy numbering (第 0–8 章)
  title: string;
  tagline: string;
  milestone: string;
  lessons: string[];
};

export const FDE_CHAPTERS: FdeChapter[] = [
  {
    id: "fde1",
    index: 9,
    title: "FDE ① AI 与大模型基础",
    tagline: "把 AI、机器学习、大模型这些词讲清楚，是面对客户的第一道门槛",
    milestone: "里程碑：能向客户画清 AI 技术层级，并说明大模型能做什么、不能做什么",
    lessons: ["1.1", "1.2", "1.3"],
  },
  {
    id: "fde2",
    index: 10,
    title: "FDE ② 智能体平台与搭建",
    tagline: "平台的定位、能力边界和核心功能——知道它擅长什么，才能用对地方",
    milestone: "里程碑：独立判断一个需求该用平台的哪类能力搭建，并说清边界",
    lessons: ["2.1", "2.2上", "2.2中", "2.2下", "2.3"],
  },
  {
    id: "fde3",
    index: 11,
    title: "FDE ③ 场景方案与行业落地",
    tagline: "从客户的业务场景出发设计方案，再看它在不同行业里怎么落地",
    milestone: "里程碑：给一个真实客户场景写出可落地的智能体方案草图",
    lessons: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"],
  },
  {
    id: "fde4",
    index: 12,
    title: "FDE ④ 交付运维与安全合规 · 认证冲刺",
    tagline: "上线不是终点：评测、运维、权限与合规，最后用全真模拟检验整套能力",
    milestone: "里程碑：全真模拟稳定达到 70 分以上",
    lessons: ["4.1", "4.2", "4.3", "4.4", "4.5"],
  },
];

export const FDE_LAST_CHAPTER = FDE_CHAPTERS[FDE_CHAPTERS.length - 1].id;

export function chapterOfLesson(lesson: string): FdeChapter | undefined {
  return FDE_CHAPTERS.find((ch) => ch.lessons.includes(lesson));
}

export function chapterOfQuestion(id: string): FdeChapter | undefined {
  const q = FDE_QUESTIONS.find((x) => x.id === id);
  return q ? chapterOfLesson(q.lesson) : undefined;
}

export type FdeLessonInfo = { lesson: string; count: number; domains: string[] };

export function lessonInfo(lesson: string, language: "zh" | "en"): FdeLessonInfo {
  const qs = FDE_QUESTIONS.filter((q) => q.lesson === lesson);
  const domains = Array.from(new Set(qs.map((q) => q.domain))) as FdeDomain[];
  return { lesson, count: qs.length, domains: domains.map((d) => FDE_DOMAIN_LABELS[language][d]) };
}

export function chapterCount(ch: FdeChapter): number {
  return FDE_QUESTIONS.filter((q) => ch.lessons.includes(q.lesson)).length;
}
