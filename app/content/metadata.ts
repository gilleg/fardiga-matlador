import type { Metadata } from "next";
import type { ArticleData } from "./articles";

export const SITE_URL = "https://fardiga-matlador.se";
export const SITE_NAME = "Färdiga matlådor";

export function articleMetadata(article: ArticleData): Metadata {
  const url = `${SITE_URL}/${article.slug}`;
  const title = `${article.title} | ${SITE_NAME}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url, languages: { "sv-SE": url } },
    openGraph: {
      title,
      description: article.description,
      url,
      siteName: SITE_NAME,
      locale: "sv_SE",
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [],
    },
    twitter: { card: "summary", title, description: article.description, images: [] },
  };
}
