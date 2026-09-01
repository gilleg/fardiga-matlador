import { notFound } from "next/navigation";
import { getComparisonProfile } from "../content/comparisons";
import { getArticle, formatDate } from "../content/articles";
import { getArticleImage } from "../content/articleImages";
import { SITE_NAME, SITE_URL } from "../content/metadata";
import { getProvider, getProviderLink, providers } from "../content/providers";
import { AffiliateBar } from "./AffiliateBar";
import { ExplainedText } from "./ExplainedText";
import { ProviderComparison } from "./ProviderComparison";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) notFound();
  const profile = getComparisonProfile(article.slug);
  const winner = getProvider(profile.winner);
  const image = getArticleImage(article.slug);
  const mascotImages = ["/images/mascots/ready-meal.png", "/images/mascots/delivery-plan.png", "/images/mascots/nutrition-check.png"];
  const mascotImage = mascotImages[article.slug.length % mascotImages.length];
  const articleUrl = `${SITE_URL}/${article.slug}`;
  const reviewedProvider = providers.find((provider) => provider.reviewSlug === article.slug);
  const choiceHeading = reviewedProvider ? `Vår bedömning av ${reviewedProvider.name}` : `${winner.name} är vårt val i den här jämförelsen.`;
  const choiceCaveat = reviewedProvider
    ? "Bedömningen gäller tjänstens upplägg, flexibilitet och vardagsnytta. Kontrollera aktuell meny, leveransområde och villkor före beställning."
    : "Det är inte ett löfte om lägsta totalpris. Kontrollera ditt postnummer, portionsantal, leverans och aktuell meny.";
  const choiceLinkLabel = reviewedProvider ? `Se ${reviewedProvider.name}s aktuella utbud` : "Se aktuellt erbjudande";
  const focusItems = reviewedProvider ? ["Meny och val", "Leverans och villkor", "Passar din vardag"] : ["Smak och recept", "Pris och leverans", "Passar din vardag"];
  const imageCaption = reviewedProvider ? `${reviewedProvider.name} bedöms efter meny, beställningsflöde, leverans och villkor.` : image.caption;
  const nextStepHeading = reviewedProvider ? "Kontrollera tjänsten före beställning" : "Gör priset jämförbart";
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: article.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: article.published, dateModified: article.updated, inLanguage: "sv-SE", mainEntityOfPage: articleUrl, author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL }, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Start", item: SITE_URL }, { "@type": "ListItem", position: 2, name: article.title, item: articleUrl }] };
  const reviewSchema = reviewedProvider ? { "@context": "https://schema.org", "@type": "Review", name: `Vår bedömning av ${reviewedProvider.name}`, url: `${articleUrl}#var-bedomning`, datePublished: article.published, dateModified: article.updated, reviewBody: article.answer.join(" "), itemReviewed: { "@type": "Service", name: `${reviewedProvider.name} färdiga matlådor`, provider: { "@type": "Organization", name: reviewedProvider.name } }, author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } } : null;

  return <>
    <SiteHeader />
    <main>
      <article className="article-shell">
        <nav className="breadcrumbs" aria-label="Brödsmulor"><a href="/">Start</a><span aria-hidden="true">/</span><span>{article.category}</span></nav>
        <header className="article-header"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><div className="article-meta"><span>Publicerad <time dateTime={article.published}>{formatDate(article.published)}</time></span><span>Senast uppdaterad <time dateTime={article.updated}>{formatDate(article.updated)}</time></span><span>{article.readingTime} läsning</span></div><div className="direct-answer" aria-label="Kort svar"><p className="direct-label">Kort svar</p>{article.answer.map((paragraph) => <p key={paragraph}><ExplainedText text={paragraph} /></p>)}
              {article.quickFacts && (
                <dl className="answer-facts" aria-label="Nyckeluppgifter">
                  {article.quickFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd><ExplainedText text={fact.value} /></dd>
                      {fact.detail && <small><ExplainedText text={fact.detail} /></small>}
                    </div>
                  ))}
                </dl>
              )}
              {article.answerScope && <p className="answer-scope"><ExplainedText text={article.answerScope} /></p>}
            </div></header>
        <figure className="article-editorial-image"><img src={image.src} alt={image.alt} width="1600" height="1067" /><figcaption>{imageCaption}</figcaption></figure>
        <div className="article-layout"><div className="article-body">
          <section className="article-choice" id="var-bedomning"><p className="eyebrow">{reviewedProvider ? "Vår recension" : "Vårt val i jämförelsen"}</p><h2>{choiceHeading}</h2><p><ExplainedText text={profile.winnerReason} /></p><p className="choice-caveat">{choiceCaveat}</p><a className="choice-button" href={getProviderLink(winner)} target="_blank" rel={winner.affiliate ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}>{choiceLinkLabel} <span aria-hidden="true">↗</span></a></section>
          <section className="focus-grid" aria-label="Det här jämför vi">{focusItems.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</section>
          <ProviderComparison slug={article.slug} />
          <figure className="article-mascot-block"><img src={mascotImage} alt="Illustrerad matlåda som markerar ett praktiskt jämförelsesteg" width="640" height="640" /><figcaption>Kontrollera portionsstorlek, innehåll och leverans innan du räknar fram priset per måltid.</figcaption></figure>
          {article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}><ExplainedText text={paragraph} /></p>)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}><ExplainedText text={item} /></li>)}</ul>}
              {section.sourceRefs && <p className="section-sources"><strong>Källor för uppgifterna:</strong>{section.sourceRefs.map((source) => <a href={source.url} rel="noopener noreferrer" key={source.url}>{source.label}</a>)}</p>}
            </section>)}
          <section className="next-step-section"><p className="eyebrow">Nästa steg</p><h2>{nextStepHeading}</h2><ol>{(reviewedProvider ? ["Se att veckans meny och kostval passar dig.", "Kontrollera leverans till ditt postnummer och vad som ingår.", "Läs villkoren för ändring, paus och avslut före beställning."] : ["Välj samma antal portioner hos varje tjänst.", "Lägg till leverans och eventuella tillval.", "Kontrollera paus, uppsägning och ordinarie pris innan du beställer."]).map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><span>{step}</span></li>)}</ol><a href={reviewedProvider ? "/basta-fardiga-matlador" : "/#jamforelse"}>{reviewedProvider ? "Jämför tjänsterna" : "Tillbaka till jämförelsen"} <span aria-hidden="true">↗</span></a></section>
          <section className="faq-section"><p className="eyebrow">Vanliga frågor</p><h2>Frågor och svar</h2><div className="faq-list">{article.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p><ExplainedText text={item.answer} /></p></details>)}</div></section>
          <section className="sources-section"><h2>Källor och underlag</h2><p>Priser, leveransområden och menyer ändras. Uppgifterna kontrollerades 18 augusti 2026 och ska jämföras med aktuell beställningssida före köp.</p><ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ol></section>
        </div><aside className="article-aside"><div className="aside-card"><p className="eyebrow">{reviewedProvider ? "Vår recensionsmetod" : "Vår jämförelseprincip"}</p><p>{reviewedProvider ? "Vi bedömer tjänstens upplägg, styrkor och begränsningar mot aktuella villkor. En recension är inte samma sak som en topplista." : "En tjänst får inte vinna på en enda stark sida. Pris, leverans, portionsstorlek, innehåll och vardagsnytta behöver fungera tillsammans."}</p><a href="/om-oss">Så arbetar vi</a></div></aside></div>
        <section className="related-section"><p className="eyebrow">Läs vidare</p><div className="related-grid">{article.related.map((relatedSlug) => { const related = getArticle(relatedSlug); return related ? <a href={`/${related.slug}`} key={related.slug}><span>{related.category}</span><strong>{related.title}</strong><span aria-hidden="true">↗</span></a> : null; })}</div></section>
      </article>
    </main>
    <AffiliateBar /><SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    {reviewSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />}
  </>;
}
