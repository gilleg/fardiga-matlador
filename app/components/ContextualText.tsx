import type { ReactNode } from "react";
import { articles } from "../content/articles";
import { getProviderLink, providers } from "../content/providers";
import { ExplainedText } from "./ExplainedText";

type LinkableProvider = {
  key: string;
  name: string;
  affiliate?: boolean;
  officialUrl: string;
  reviewUrl?: string;
  reviewSlug?: string;
};

type LinkableArticle = {
  slug: string;
  title: string;
  related: string[];
};

type LinkCandidate = {
  id: string;
  forms: string[];
  href: string;
  external: boolean;
  sponsored: boolean;
  priority: number;
};

export type ContextualLinkState = {
  seen: Set<string>;
  links: number;
  productLinks: number;
};

const MAX_INTERNAL_LINKS = 7;

const swedishWords: Record<string, string> = {
  basta: "bästa",
  bast: "bäst",
  forsakring: "försäkring",
  forsakringen: "försäkringen",
  forsakringar: "försäkringar",
  jamfor: "jämför",
  rorlig: "rörlig",
  rorligt: "rörligt",
  sjalvrisk: "självrisk",
  aldre: "äldre",
  lag: "låg",
  lagt: "lågt",
  manadsavgift: "månadsavgift",
  man: "man",
  for: "för",
  fran: "från",
  ar: "är",
  aterbetalning: "återbetalning",
  kop: "köp",
};

function slugPhrase(slug: string) {
  return slug
    .split("/").at(-1)!
    .split("-")
    .map((word) => swedishWords[word] ?? word)
    .join(" ");
}

function uniqueForms(forms: string[]) {
  return [...new Set(forms.map((form) => form.trim()).filter((form) => form.length >= 8))]
    .sort((a, b) => b.length - a.length);
}

const linkableArticles = articles as unknown as LinkableArticle[];

function articleForms(article: LinkableArticle) {
  const title = article.title
    .replace(/\s+[–—].*$/, "")
    .replace(/\s+\d{4}.*$/, "")
    .replace(/[?!]$/, "")
    .trim();
  const phrase = slugPhrase(article.slug);
  const forms = [title, phrase];

  if (phrase.startsWith("vad kostar ")) {
    forms.push(phrase.replace(/^vad kostar /, "vad kostar en "));
  }

  return uniqueForms(forms);
}

function candidates(currentSlug: string, relatedSlugs: string[], state: ContextualLinkState) {
  const related = new Set(relatedSlugs);
  const articleLinks: LinkCandidate[] = state.links < MAX_INTERNAL_LINKS
    ? linkableArticles
      .filter((article) => article.slug !== currentSlug)
      .map((article) => ({
        id: `article:${article.slug}`,
        forms: articleForms(article),
        href: `/${article.slug}`,
        external: false,
        sponsored: false,
        priority: related.has(article.slug) ? 0 : 3,
      }))
    : [];

  const providerLinks = (providers as unknown as LinkableProvider[]).map<LinkCandidate>((provider) => ({
    id: `provider-product:${provider.key}`,
    forms: [provider.name],
    href: getProviderLink(provider as Parameters<typeof getProviderLink>[0]),
    external: true,
    sponsored: Boolean(provider.affiliate),
    priority: -1,
  }));

  return [...articleLinks, ...providerLinks].filter((candidate) => !state.seen.has(candidate.id));
}

function findMatch(text: string, linkCandidates: LinkCandidate[]) {
  let winner: { candidate: LinkCandidate; index: number; value: string } | null = null;

  for (const candidate of linkCandidates) {
    for (const form of candidate.forms) {
      const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = new RegExp(`(^|[^\\p{L}\\p{N}])(${escaped})(?=$|[^\\p{L}\\p{N}])`, "iu").exec(text);
      if (!match) continue;
      const index = match.index + match[1].length;
      const value = match[2];
      if (
        !winner ||
        index < winner.index ||
        (index === winner.index && candidate.priority < winner.candidate.priority) ||
        (index === winner.index && candidate.priority === winner.candidate.priority && value.length > winner.value.length)
      ) {
        winner = { candidate, index, value };
      }
    }
  }

  return winner;
}

export function createContextualLinkState(): ContextualLinkState {
  return { seen: new Set<string>(), links: 0, productLinks: 0 };
}

export function takeContextualLink(
  text: string,
  currentSlug: string,
  relatedSlugs: string[],
  state: ContextualLinkState,
) {
  const match = findMatch(text, candidates(currentSlug, relatedSlugs, state));
  if (!match) return null;

  state.seen.add(match.candidate.id);
  if (match.candidate.id.startsWith("provider-product:")) {
    state.productLinks += 1;
  } else {
    state.links += 1;
  }
  return match;
}

export function ContextualText({
  text,
  currentSlug,
  relatedSlugs,
  state,
}: {
  text: string;
  currentSlug: string;
  relatedSlugs: string[];
  state: ContextualLinkState;
}) {
  const parts: ReactNode[] = [];
  let remaining = text;
  let partIndex = 0;

  while (remaining) {
    const match = takeContextualLink(remaining, currentSlug, relatedSlugs, state);
    if (!match) {
      parts.push(<ExplainedText key={`text-${partIndex}`} text={remaining} />);
      break;
    }

    const before = remaining.slice(0, match.index);
    if (before) parts.push(<ExplainedText key={`text-${partIndex}`} text={before} />);

    const attributes = match.candidate.external
      ? {
          target: "_blank",
          rel: match.candidate.sponsored
            ? "sponsored nofollow noopener noreferrer"
            : "noopener noreferrer",
        }
      : {};

    parts.push(
      <a className="contextual-link" href={match.candidate.href} key={`link-${partIndex}`} {...attributes}>
        {match.value}
      </a>,
    );
    remaining = remaining.slice(match.index + match.value.length);
    partIndex += 1;
  }

  return <>{parts}</>;
}

export function MidArticleLink({ article, state }: { article: LinkableArticle; state: ContextualLinkState }): ReactNode {
  const related = takeMidArticleLink(article, state);
  if (!related) return null;
  return <p className="mid-article-link">Läs också: <a href={`/${related.slug}`}>{related.title}</a></p>;
}

export function takeMidArticleLink(article: LinkableArticle, state: ContextualLinkState) {
  const related = article.related
    .filter((slug) => !state.seen.has(`article:${slug}`))
    .map((slug) => linkableArticles.find((candidate) => candidate.slug === slug))
    .find(Boolean);
  if (!related) return null;
  state.seen.add(`article:${related.slug}`);
  state.links += 1;
  return related;
}
