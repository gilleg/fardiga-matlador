import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_NAME, SITE_URL } from "../content/metadata";

const url = SITE_URL + "/affiliatepolicy";

export const metadata: Metadata = {
  title: "Affiliatepolicy | " + SITE_NAME,
  description: "Så fungerar annonslänkar, ersättning och redaktionellt oberoende på " + SITE_NAME + ".",
  alternates: { canonical: url, languages: { "sv-SE": url } },
};

export default function AffiliatePolicyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Affiliatepolicy", item: url },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <article className="policy-shell">
          <nav className="breadcrumbs" aria-label="Brödsmulor"><a href="/">Start</a><span aria-hidden="true">/</span><span>Affiliatepolicy</span></nav>
          <header className="policy-header">
            <p className="eyebrow">Senast uppdaterad 27 augusti 2026</p>
            <h1>Affiliatepolicy</h1>
            <p>{SITE_NAME} kan få ersättning när en besökare går vidare via vissa annonslänkar och senare beställer en måltidstjänst. Det är en finansieringsmodell, inte ett sätt att köpa placeringar eller formuleringar.</p>
          </header>

          <div className="policy-content">
            <section>
              <h2>Vad en annonslänk är</h2>
              <p>En annonslänk går via ett annonsnätverk som kan registrera att klicket kom från {SITE_NAME}. Om besökaren senare blir kund kan sajten få ersättning från partnern.</p>
              <p>Du betalar inte mer för att använda en annonslänk. Priset, avtalet och villkoren bestäms av leverantörernas egna aktuella uppgifter. Där vi kan styra länkattributet märks kommersiella länkar tekniskt som sponsrade.</p>
            </section>

            <section>
              <h2>Vilka aktörer som ingår</h2>
              <p>Vi kan inkludera leverantörer även när de saknar samarbete eller ersättningsmodell. Urvalet ska styras av relevans, marknadsnärvaro och att det finns offentlig information som går att kontrollera.</p>
              <p>Att utelämna viktiga alternativ bara för att de saknar annonsprogram skulle göra jämförelsen sämre. Därför ska både partnerlänkar och vanliga källänkar kunna förekomma på sajten.</p>
            </section>

            <section>
              <h2>Vad ersättningen inte påverkar</h2>
              <p>Ersättning får inte styra vilka svagheter, begränsningar eller kontrollpunkter som beskrivs. När vi utser vinnare, rekommenderar ett förstaval eller rangordnar alternativ ska slutsatsen bygga på sajtens uttalade kriterier: pris, innehåll, leverans, målgrupp, flexibilitet och villkor.</p>
              <p>Affiliate-status är inte ett jämförelsekriterium. Om en partner har nackdelar ska de kunna beskrivas, och om ett alternativ utan annonsprogram är relevant ska det kunna tas med.</p>
            </section>

            <section>
              <h2>Spårning av klick</h2>
              <p>Annonslänkar kan innehålla tekniska parametrar som visar vilken sida klicket kom från. De används för mätning och ersättning. Vad annonsnätverk och mottagande leverantörer själva behandlar efter klicket styrs av deras egna villkor och integritetspolicyer.</p>
              <p>Läs mer om lokal lagring, analys och dina val i vår <a href="/integritetspolicy">integritetspolicy</a> och <a href="/cookiepolicy">cookiepolicy</a>.</p>
            </section>

            <section>
              <h2>Kontrollera aktuella villkor</h2>
              <p>Information om matkassar och färdiga måltider kan ändras snabbt. Våra guider ska därför ses som en strukturerad väg in i jämförelsen, medan slutligt pris, avtal och villkor alltid kontrolleras hos leverantören innan du bestämmer dig.</p>
              <p>Ser du något som inte stämmer ska uppgiften kontrolleras mot källan, rättas och få ett nytt uppdateringsdatum.</p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
