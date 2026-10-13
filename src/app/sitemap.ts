import { CONFIG } from "@/config";
import { CASE_SLUGS } from "@/content/portfolio";
import { COURSE_CHAPTERS } from "@/content/wiki-course";

// Generated from the same sources as the static routes (issue #89), so new
// case studies and lessons appear automatically. /ai/ is omitted: it is only
// a client-side redirect into /wiki/.
export default async function sitemap() {
  const siteUrl = new URL(
    CONFIG.siteUrl.endsWith("/") ? CONFIG.siteUrl : `${CONFIG.siteUrl}/`,
  );

  const lessonIds = COURSE_CHAPTERS.flatMap((ch) => ch.nodes.map((n) => n.lessonId));
  const routes = [
    "",
    "projects/",
    ...CASE_SLUGS.map((slug) => `projects/${slug}/`),
    "lab/",
    "research/",
    "wiki/",
    ...Array.from(new Set(lessonIds)).map((id) => `wiki/course/${id}/`),
  ];

  const lastModified = new Date().toISOString();
  return routes.map((route) => ({ url: new URL(route, siteUrl).toString(), lastModified }));
}
