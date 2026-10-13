import { CONFIG } from "@/config";
import { MetadataRoute } from "next";

// Required by `output: "export"` since Next 15.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteBase = CONFIG.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteBase}/sitemap.xml`,
  };
}
