"use client";

import { useState } from "react";

type GuideLinks = {
  budget: string;
  time: string;
  choice: string;
  special: string;
};

type MealToolsProps = {
  compactMinutes: number;
  guideLinks: GuideLinks;
  productLabel: string;
};

const currency = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

export function MealTools({ compactMinutes, guideLinks, productLabel }: MealToolsProps) {
  const [people, setPeople] = useState(2);
  const [meals, setMeals] = useState(4);
  const [portionPrice, setPortionPrice] = useState(65);
  const [delivery, setDelivery] = useState(49);
  const [ordinaryMinutes, setOrdinaryMinutes] = useState(45);
  const [priority, setPriority] = useState<keyof GuideLinks>("budget");

  const weeklyCost = people * meals * portionPrice + delivery;
  const monthlyCost = weeklyCost * 4.33;
  const savedMinutes = Math.max(0, ordinaryMinutes - compactMinutes) * meals * 4.33;
  const recommendations = {
    budget: { title: "Räkna hela veckokostnaden", text: "Jämför samma antal personer och middagar, inklusive leverans och tillval.", href: guideLinks.budget },
    time: { title: "Välj efter faktisk tidsvinst", text: "Räkna även planering, handling och disk, inte bara tiden vid spisen.", href: guideLinks.time },
    choice: { title: "Kontrollera veckans val", text: "Se hur många rätter som verkligen passar hushållet innan du beställer.", href: guideLinks.choice },
    special: { title: "Läs varje rätts innehåll", text: "Filter hjälper, men ingredienslistan och din egen tolerans avgör alltid.", href: guideLinks.special },
  } satisfies Record<keyof GuideLinks, { title: string; text: string; href: string }>;
  const recommendation = recommendations[priority];

  return (
    <div className="meal-tools">
      <section className="tool-panel" id="veckokostnad">
        <div className="tool-heading"><p className="eyebrow">Kostnad</p><h2>Räkna på en hel vecka</h2><p>Ändra reglagen och se en jämförbar kostnad för {productLabel}.</p></div>
        <div className="tool-control-grid">
          <label>Personer <strong>{people}</strong><input type="range" min="1" max="6" value={people} onChange={(event) => setPeople(Number(event.target.value))} /></label>
          <label>Middagar per vecka <strong>{meals}</strong><input type="range" min="2" max="7" value={meals} onChange={(event) => setMeals(Number(event.target.value))} /></label>
          <label>Pris per portion <strong>{portionPrice} kr</strong><input type="range" min="30" max="150" step="5" value={portionPrice} onChange={(event) => setPortionPrice(Number(event.target.value))} /></label>
          <label>Leverans per vecka <strong>{delivery} kr</strong><input type="range" min="0" max="129" step="10" value={delivery} onChange={(event) => setDelivery(Number(event.target.value))} /></label>
        </div>
        <div className="tool-result" aria-live="polite"><span>Ungefär per vecka</span><strong>{currency.format(weeklyCost)}</strong><small>{currency.format(monthlyCost)} per genomsnittsmånad</small></div>
      </section>

      <section className="tool-panel" id="tidsvinst">
        <div className="tool-heading"><p className="eyebrow">Tid</p><h2>Hur mycket tid kan du vinna?</h2><p>Jämför din vanliga middagstid med ett mer förberett upplägg.</p></div>
        <label className="tool-wide-control">Din vanliga tid per middag <strong>{ordinaryMinutes} minuter</strong><input type="range" min="15" max="90" step="5" value={ordinaryMinutes} onChange={(event) => setOrdinaryMinutes(Number(event.target.value))} /></label>
        <div className="tool-result" aria-live="polite"><span>Möjlig tidsvinst per månad</span><strong>{Math.floor(savedMinutes / 60)} tim {Math.round(savedMinutes % 60)} min</strong><small>Beräknat på {meals} middagar i veckan och {compactMinutes} minuter med det valda upplägget.</small></div>
      </section>

      <section className="tool-panel" id="valjare">
        <div className="tool-heading"><p className="eyebrow">Väljare</p><h2>Vad är viktigast för dig?</h2><p>Välj den fråga som ska styra din första gallring.</p></div>
        <label className="tool-select-label" htmlFor="meal-priority">Min viktigaste prioritet</label>
        <select id="meal-priority" value={priority} onChange={(event) => setPriority(event.target.value as keyof GuideLinks)}>
          <option value="budget">Lägsta rimliga totalkostnad</option>
          <option value="time">Så lite vardagsarbete som möjligt</option>
          <option value="choice">Många rätter att välja mellan</option>
          <option value="special">Kostval eller specialkost</option>
        </select>
        <div className="tool-recommendation" aria-live="polite"><h3>{recommendation.title}</h3><p>{recommendation.text}</p><a href={recommendation.href}>Läs rätt guide <span aria-hidden="true">↗</span></a></div>
      </section>
    </div>
  );
}
