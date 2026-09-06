import type { Metadata } from "next";
import type { ArticleData } from "./articles";

export const SITE_URL = "https://fardiga-matlador.se";
export const SITE_NAME = "Färdiga matlådor";

function seoText(value: string, max = 155) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

function seoTitle(value: string) {
  return value.replace(/\s+[–-].*$/, "").trim();
}

export function articleMetadata(article: ArticleData): Metadata {
  const url = `${SITE_URL}/${article.slug}`;
  const title = `${seoTitle(article.title)} | ${SITE_NAME}`;
  const description = seoText(article.description || article.answer?.[0] || `${seoTitle(article.title)} från ${SITE_NAME}.`);

  return {
    title: seoTitle(article.title),
    description,
    alternates: { canonical: url, languages: { "sv-SE": url } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "sv_SE",
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [],
    },
    twitter: { card: "summary", title, description, images: [] },
  };
}
