import type { Metadata } from "next";
import { ArticlePage } from "../components/ArticlePage";
import { articles, getArticle } from "../content/articles";
import { articleMetadata } from "../content/metadata";

export function generateStaticParams() {
  return articles
    .filter((article) => !article.slug.includes("/"))
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? articleMetadata(article) : {};
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage slug={slug} />;
}
