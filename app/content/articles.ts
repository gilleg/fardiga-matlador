import type { ProviderKey } from "./providers";

export type ContentTable = { headers: string[]; rows: string[][] };
export type ContentSection = { title: string; paragraphs?: string[]; bullets?: string[]; table?: ContentTable; note?: string; sourceRefs?: { label: string; url: string }[]; };
export type QuickFact = {
  label: string;
  value: string;
  detail?: string;
};

export type ArticleData = {
  slug: string;
  category: string;
  title: string;
  description: string;
  answer: string[];
  quickFacts?: QuickFact[];
  answerScope?: string;
  published: string;
  updated: string;
  readingTime: string;
  sections: ContentSection[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
  related: string[];
};

const published = "2026-08-21";
const updated = "2026-08-21";

const providerSources: Record<ProviderKey, { label: string; url: string }> = {
  "svarta-ladan": { label: "Svarta Lådan: meny och leverans", url: "https://svartaladan.se/" },
  factor: { label: "Factor: meny och kostprofiler", url: "https://www.factormeals.se/" },
  "macro-meals": { label: "Macro Meals: färdigrätter och leverans", url: "https://www.macromeals.se/fardigratter/" },
  "fardiga-maten": { label: "Färdiga Maten: produkt- och leveransinformation", url: "https://www.lagatochklart.online/lagat" },
};

const commonSources = [
  { label: "Livsmedelsverket: mat och måltider", url: "https://www.livsmedelsverket.se/matvanor-halsa--miljo" },
  { label: "Konsumentverket: avtal och ångerrätt", url: "https://www.konsumentverket.se/om-konsumentverket/var-verksamhet/konsumentratt/" },
];

type Seed = {
  slug: string;
  category: string;
  title: string;
  description: string;
  winner: ProviderKey;
  angle: string;
  focus: [string, string, string];
  related?: string[];
  source?: ProviderKey;
};

const seeds: Seed[] = [
  { slug: "basta-fardiga-matlador", category: "Jämförelse", title: "Bästa färdiga matlådorna 2026 – jämför hemleverans och vardagsnytta", description: "Jämför färdiga matlådor efter portionspris, näringsinformation, leverans och hur väl maten fungerar i en vanlig vecka.", winner: "svarta-ladan", angle: "Svarta Lådan är vårt helhetsval när varierade kostinriktningar, färdiglagade portioner och ett tydligt veckoupplägg ska fungera tillsammans.", focus: ["Pris per portion", "Kostval och näringsinfo", "Leverans till rätt adress"] },
  { slug: "matlador-med-hemleverans", category: "Leverans", title: "Matlådor med hemleverans 2026 – kylt, klart och till rätt dörr", description: "Så jämför du färdiga matlådor med hemleverans: postnummer, frakt, kylkedja, leveransdag och minsta beställning.", winner: "svarta-ladan", angle: "Svarta Lådan är en bra start för kylda portioner med flera kostinriktningar, så länge tjänsten levererar till ditt postnummer.", focus: ["Postnummer och leveransdag", "Frakt och minsta beställning", "Hållbarhet och förvaring"] },
  { slug: "nyttiga-matlador", category: "Näring", title: "Nyttiga matlådor 2026 – protein, energi och vardagsval", description: "Hitta nyttiga färdiga matlådor genom att jämföra näringsinformation, portionsstorlek och hur lätt det är att välja rätt.", winner: "macro-meals", angle: "Macro Meals blir vårt förstaval när protein och energi ska gå att kontrollera rätt för rätt innan beställning.", focus: ["Protein per portion", "Kalorier och portionsstorlek", "Ingredienser och allergener"] },
  { slug: "matlador-for-traning", category: "Träning", title: "Matlådor för träning 2026 – protein utan söndagspreppen", description: "Jämför träningsmat med hemleverans efter deklarerat protein, energi, portionsstorlek och leveransupplägg.", winner: "macro-meals", angle: "Macro Meals är mest relevant för träning när du vill kunna se deklarerade protein- och energivärden innan du väljer dina rätter.", focus: ["Protein", "Energi", "Beställningsstorlek"] },
  { slug: "matlador-for-viktnedgang", category: "Vardagsmål", title: "Matlådor för viktnedgång 2026 – portionskontroll utan genvägar", description: "Jämför färdiglagade matlådor med deklarerad energi, portionsstorlek och måltider som fungerar i en hållbar vardag.", winner: "factor", angle: "Factor är mest relevant här för sitt tydliga max 550-kcal-spår, men en färdig matlåda ersätter inte individuell hälso- eller vårdrådgivning.", focus: ["Energi per portion", "Mättnad och rutin", "Flexibilitet i beställningen"] },
  { slug: "fardiga-matlador-for-en-person", category: "Hushåll", title: "Färdiga matlådor för en person 2026 – mindre svinn i vardagen", description: "Så jämför du färdiglagade portioner när du bor själv: frakt, minsta order, hållbarhet, frysning och veckans faktiska kostnad.", winner: "svarta-ladan", angle: "Svarta Lådan blir vårt första alternativ för en person som vill ha variation och färdiglagat utan att planera varje måltid från grunden.", focus: ["Minsta beställning", "Frakt per måltid", "Hållbarhet och frysning"] },
  { slug: "billiga-matlador", category: "Prisguide", title: "Billiga matlådor 2026 – vad kostar färdiglagat på riktigt?", description: "Jämför billigare färdiga matlådor efter portionspris, frakt, minsta beställning och om upplägget faktiskt passar veckan.", winner: "fardiga-maten", angle: "Färdiga Maten har det lägsta portionsriktmärket i vår översikt, men totalen beror alltid på leverans, antal rätter och din adress.", focus: ["Portionspris", "Frakt", "Antal rätter"] },
  { slug: "vegetariska-matlador", category: "Specialkost", title: "Vegetariska matlådor 2026 – färdig mat med växtbaserade val", description: "Jämför vegetariska och veganska färdiga matlådor med fokus på tydlig information, leverans och aktuella rätter.", winner: "svarta-ladan", angle: "Svarta Lådan är vårt första val att kontrollera för växtbaserat eftersom tjänsten beskriver en särskild vegolåda med både vegetariska och veganska val.", focus: ["Aktuellt växtbaserat utbud", "Allergener", "Leveransområde"] },
  { slug: "svarta-ladan-recension", category: "Recension", title: "Svarta Lådan recension 2026 – kostval, matlådor och leverans", description: "Vår genomgång av Svarta Lådans upplägg för färdiglagade matlådor: veckolådor, kostval, kylleverans och viktiga villkor.", winner: "svarta-ladan", angle: "Svarta Lådan passar dig som vill ha färdiglagade veckomåltider och kunna välja mellan flera kostinriktningar.", focus: ["Veckolådor", "Kostinriktningar", "Leverans"], source: "svarta-ladan" },
  { slug: "factor-recension", category: "Recension", title: "Factor recension 2026 – kostprofiler, meny och flexibelt abonnemang", description: "Vår genomgång av Factor med fokus på menyval, protein, keto, energitak, leverans och de villkor som är viktiga före köp.", winner: "factor", angle: "Factor passar dig som vill välja färdig mat med en tydligt deklarerad kostprofil, exempelvis proteinrikt eller max 550 kcal.", focus: ["Kostprofiler", "Veckomeny", "Paus och avslut"], source: "factor" },
  { slug: "macro-meals-recension", category: "Recension", title: "Macro Meals recension 2026 – protein, makron och hemleverans", description: "Vår genomgång av Macro Meals med näringsinformation, beställningssätt, färdiglagade portioner och leverans.", winner: "macro-meals", angle: "Macro Meals passar dig som använder deklarerat protein och energi som ett aktivt stöd när du väljer veckans måltider.", focus: ["Näringsinfo", "Beställningssätt", "Leveransdag"], source: "macro-meals" },
  { slug: "fardiga-maten-recension", category: "Recension", title: "Färdiga Maten recension 2026 – husmanskost och portionspris", description: "Vår genomgång av Färdiga Maten med fokus på klassisk färdiglagad mat, portionspris, leverans och praktiska kontrollpunkter.", winner: "fardiga-maten", angle: "Färdiga Maten passar dig som i första hand letar efter klassisk, färdiglagad vardagsmat med ett lägre portionsriktmärke.", focus: ["Portionspris", "Rätttyp", "Leverans"], source: "fardiga-maten" },
];

function providerName(key: ProviderKey) {
  return { "svarta-ladan": "Svarta Lådan", factor: "Factor", "macro-meals": "Macro Meals", "fardiga-maten": "Färdiga Maten" }[key];
}

function makeArticle(seed: Seed): ArticleData {
  const winnerName = providerName(seed.winner);
  const isReview = seed.category === "Recension";
  const reviewSections: ContentSection[] = [
    { title: `Så har vi granskat ${winnerName}`, paragraphs: [`Vi tittar på tjänstens upplägg från meny och val av rätter till leverans, prisinformation och villkor. Det betyder att vi beskriver vad som går att kontrollera i beställningsflödet, men inte låtsas att vi har provsmakat varje rätt under identiska förhållanden.`, `Veckomeny, lagerstatus, leveransområde och pris kan skifta. Därför ska den aktuella beställningssidan alltid väga tyngre än en generell sammanfattning.`] },
    { title: `När ${winnerName} passar`, paragraphs: [seed.angle, `För den här tjänsten väger ${seed.focus.join(", ").toLowerCase()} tyngst. Ett annat upplägg kan passa bättre när du prioriterar exempelvis husmanskost, ett visst kostmål eller lägsta portionspris.`], bullets: seed.focus.map((item) => `Kontrollera ${item.toLowerCase()} i den aktuella beställningen.`) },
    { title: "Kontrollera före beställning", paragraphs: ["Läs den aktuella menyn, ingredienslistan och leveransinformationen före köp. För specialkost behöver varje rätt bedömas utifrån egen information, inte bara ett övergripande filter."], bullets: ["Ditt postnummer och tillgängliga leveransdagar.", "Frakt, minsta order och den totala veckokostnaden.", "Allergener, innehåll och portionsstorlek.", "Paus, ändring och avslut enligt aktuella villkor."] },
  ];
  const guideSections: ContentSection[] = [
    { title: "Färdig mat är inte en matkasse", paragraphs: ["En matkasse innehåller vanligen råvaror och recept. Färdiga matlådor är redan lagade: du värmer och äter. Det sparar planering och köksarbete, men gör det ännu viktigare att granska pris, portionsstorlek, innehåll och hållbarhet innan du väljer.", "Jämför alltid samma sak. Ett pris per portion kan se attraktivt ut, men frakt, minsta beställning och hur många rätter som faktiskt behövs i veckan avgör slutkostnaden."] },
    { title: `När ${winnerName} blir ett rimligt val`, paragraphs: [seed.angle, `Det betyder inte att samma tjänst är bäst för alla. Svarta Lådan är bred i kostval, Factor har tydliga kostprofiler, Macro Meals redovisar näringsvärden och Färdiga Maten har ett lägre portionsriktmärke. Börja med ditt verkliga behov och kontrollera sedan den aktuella menyn.`], bullets: ["Jämför portionspris med frakt inräknad.", "Kontrollera om leverans finns till din adress.", "Se hur många måltider som krävs för att beställningen ska fungera."] },
    { title: "Tre frågor som gör jämförelsen mer rättvis", paragraphs: ["Först: hur mycket tid vill du verkligen lägga på lunch och middag? En färdig måltid kan vara värd mer än priset på etiketten när alternativet är hämtmat eller en handling som aldrig blir av.", "Sedan: hur viktig är näringsinformationen? Om du tränar, följer ett kostmål eller behöver ha koll på allergener vill du kunna läsa varje rätt, inte bara se en kategori på startsidan.", "Till sist: fungerar leveransen? Skriv in postnumret, jämför leveransdagen med din vardag och kontrollera kylförvaring när lådan väl har kommit hem."] },
  ];
  const faq = isReview ? [
    { question: `Hur har ni bedömt ${winnerName}?`, answer: "Vi granskar meny, beställningsflöde, leverans, prisinformation, villkor och hur tjänsten fungerar i en vanlig vecka." },
    { question: `Vem passar ${winnerName} för?`, answer: seed.angle },
    { question: "Vad behöver jag kontrollera innan jag beställer?", answer: "Kontrollera meny, ingredienser, leverans till ditt postnummer, antal portioner, frakt och villkor för paus eller avslut." },
  ] : [
    { question: "Vad är skillnaden mellan en färdig matlåda och en matkasse?", answer: "En färdig matlåda är redan lagad och behöver normalt bara värmas. En matkasse innehåller råvaror och recept som du lagar själv." },
    { question: "Vad kostar färdiga matlådor?", answer: "Priset varierar med rätt, antal portioner, frakt och eventuell introduktion. Jämför den totala beställningen, inte bara den lägsta portionalen." },
    { question: "Hur länge håller färdiga matlådor?", answer: "Hållbarheten varierar med rätt och leverans. Följ alltid datummärkning och förvaringsråd på den specifika förpackningen." },
  ];
  return {
    slug: seed.slug, category: seed.category, title: seed.title, description: seed.description,
    answer: [seed.angle, "Jämför alltid aktuell meny, ingredienser, leverans till ditt postnummer och den faktiska totalsumman före beställning."],
    quickFacts: [
      { label: isReview ? "Tjänst" : "Förstaval", value: winnerName },
      { label: "Jämför först", value: seed.focus[0] },
      { label: "Kontrollera", value: seed.focus[1] },
      { label: "Slutkontroll", value: seed.focus[2] },
    ],
    answerScope: "Sammanfattningen gäller artikelns angivna upplägg. Portionspris, leverans, näringsvärden och minsta beställning behöver kontrolleras hos tjänsten.",
    published, updated, readingTime: "6 min", sections: isReview ? reviewSections : guideSections, faq,
    sources: [seed.source ? providerSources[seed.source] : providerSources[seed.winner], ...commonSources],
    related: seed.related ?? ["basta-fardiga-matlador", "matlador-med-hemleverans", "billiga-matlador"],
  };
}

export const articles: ArticleData[] = seeds.map(makeArticle);
export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
export function formatDate(date: string) { return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`)); }
