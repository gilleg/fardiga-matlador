import { getComparisonProfile } from "../content/comparisons";
import { getProviderLink, providers } from "../content/providers";
import { ExplainedText } from "./ExplainedText";
import { ContextualText, createContextualLinkState } from "./ContextualText";

function ensureProviderMention(providerName: string, text: string) {
  if (text.toLocaleLowerCase("sv-SE").includes(providerName.toLocaleLowerCase("sv-SE"))) return text;
  return `${providerName}: ${text.charAt(0).toLocaleLowerCase("sv-SE")}${text.slice(1)}`;
}

export function ProviderComparison({ slug }: { slug: string }) {
  const contextualLinkState = createContextualLinkState();
  const linkedText = (text: string) => (
    <ContextualText text={text} currentSlug={slug} relatedSlugs={[]} state={contextualLinkState} />
  );
  const profile = getComparisonProfile(slug);
  const order = profile.offers.map((offer) => ({ offer, provider: providers.find((provider) => provider.key === offer.provider) ?? providers[0] }));
  return <section className="matkasse-comparison" aria-labelledby="matlador-jamforelse">
    <p className="eyebrow">Situationsanpassad jämförelse</p>
    <h2 id="matlador-jamforelse">{profile.heading}</h2>
    <p className="comparison-intro">{linkedText(profile.intro)}</p>
    <div className="matkasse-card-grid">
      {order.map(({ offer, provider }, index) => <article className={`matkasse-card${provider.key === profile.winner ? " is-winner" : ""}`} key={provider.key}>
        <div className="matkasse-card-top"><span>{String(index + 1).padStart(2, "0")}</span>{provider.key === profile.winner && <strong>{provider.badge ?? "Vårt val"}</strong>}</div>
        <div className="matkasse-title matkasse-title-with-logo">{provider.logo ? <img className="matkasse-provider-logo" src={provider.logo} alt={`${provider.name} logotyp`} /> : <span className="matkasse-symbol">{provider.shortName}</span>}<div><h3>{provider.name} färdiga matlådor</h3><p>{provider.boxType}</p></div></div>
        <p className="matkasse-card-label">{linkedText(ensureProviderMention(provider.name, offer.label))}</p>
        <div className="matkasse-price"><span>Pris per portion</span><strong>{provider.pricePerPortion}</strong></div>
        <div className="matkasse-facts"><p><span>Veckokostnad</span><span className="receipt-value">{provider.weeklyPrice}</span></p><p><span>Leverans</span><span className="receipt-value">{provider.deliveryFee}</span></p><p><span>Värms på</span><span className="receipt-value">{provider.cookingTime}</span></p></div>
        <p className="matkasse-fit"><span className="offer-label">Passar:</span> {linkedText(ensureProviderMention(provider.name, offer.fit))}</p>
        <div className="matkasse-watch"><span className="provider-detail-label">Kontrollera hos {provider.name}</span><p>{linkedText(ensureProviderMention(provider.name, offer.watch))}</p></div>
        <details className="matkasse-details"><summary>Detaljer</summary><dl>{provider.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl><h4>Fördelar</h4><ul>{provider.benefits.map((item) => <li key={item}>{item}</li>)}</ul><h4>Nackdelar</h4><ul>{provider.drawbacks.map((item) => <li key={item}>{item}</li>)}</ul></details>
        <div className="matkasse-actions"><a href={`/${provider.reviewSlug}`}>Recension</a><a href={getProviderLink(provider)} target="_blank" rel={provider.affiliate ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}>Se tjänstens sida <span aria-hidden="true">↗</span></a></div>
      </article>)}
    </div>
  </section>;
}
