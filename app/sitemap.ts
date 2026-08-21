import type { MetadataRoute } from "next";
import { articles } from "./content/articles";
import { SITE_URL } from "./content/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/${article.slug}`,
    lastModified: article.updated,
    changeFrequency: "monthly",
    priority: article.slug.startsWith("recension/") ? 0.65 : 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: "2026-08-21", changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/om-oss`, lastModified: "2026-08-21", changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE_URL}/integritetspolicy`, lastModified: "2026-08-21", changeFrequency: "yearly", priority: 0.35 },
    { url: `${SITE_URL}/cookiepolicy`, lastModified: "2026-08-21", changeFrequency: "yearly", priority: 0.35 },
    ...articleRoutes,
  ];
}
