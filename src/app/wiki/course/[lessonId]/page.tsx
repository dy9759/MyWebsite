import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSE_CHAPTERS } from "@/content/wiki-course";
import WikiLessonPage from "@/components/wiki/wiki-lesson-page";
import type { Lesson } from "@/components/wiki/wiki-lesson";

// Flat loop list in course order, with chapter context and prev/next links.
const LOOPS = COURSE_CHAPTERS.flatMap((ch) =>
  ch.nodes.map((node) => ({ chapter: ch, node })),
);

export function generateStaticParams() {
  return LOOPS.map(({ node }) => ({ lessonId: node.lessonId }));
}

export function generateMetadata({
  params,
}: {
  params: { lessonId: string };
}): Metadata {
  const loop = LOOPS.find(({ node }) => node.lessonId === params.lessonId);
  if (!loop) return {};
  return {
    title: `${loop.node.title} · 闭环学院`,
    description: loop.node.hook,
  };
}

function readLesson(lessonId: string): Lesson {
  const file = join(process.cwd(), "public", "wiki", "lessons", `${lessonId}.json`);
  return JSON.parse(readFileSync(file, "utf8")) as Lesson;
}

export default function CourseLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const index = LOOPS.findIndex(({ node }) => node.lessonId === params.lessonId);
  if (index < 0) notFound();
  const { chapter, node } = LOOPS[index];
  const prev = LOOPS[index - 1] ?? null;
  const next = LOOPS[index + 1] ?? null;

  return (
    <WikiLessonPage
      lesson={readLesson(params.lessonId)}
      chapterIndex={chapter.index}
      chapterTitle={chapter.title}
      milestone={chapter.milestone}
      isChapterEnd={node.id === chapter.nodes[chapter.nodes.length - 1].id}
      loopNumber={index + 1}
      loopTotal={LOOPS.length}
      node={node}
      prev={prev ? { lessonId: prev.node.lessonId, title: prev.node.title } : null}
      next={next ? { lessonId: next.node.lessonId, title: next.node.title } : null}
    />
  );
}
