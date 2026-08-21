export type ProviderKey = "svarta-ladan" | "factor" | "macro-meals" | "fardiga-maten";

export type Provider = {
  key: ProviderKey;
  rank: number;
  name: string;
  shortName: string;
  badge?: string;
  ratingValue: string;
  pricePerPortion: string;
  weeklyPrice: string;
  deliveryFee: string;
  boxType: string;
  cookingTime: string;
  deliveryArea: string;
  benefits: string[];
  drawbacks: string[];
  bestFor: string;
  details: { label: string; value: string }[];
  officialUrl: string;
  reviewSlug: string;
  affiliate?: boolean;
};

export const providers: Provider[] = [
  {
    key: "svarta-ladan", rank: 1, name: "Svarta Lådan", shortName: "SL", badge: "Vårt helhetsval", ratingValue: "4,6/5",
    pricePerPortion: "Från 78 kr", weeklyPrice: "Från 545 kr per vecka", deliveryFee: "Kontrollera i kassan", boxType: "Kylda, färdiglagade matlådor", cookingTime: "Några minuter att värma", deliveryArea: "Stora delar av mellersta och södra Sverige",
    benefits: ["Flera kostinriktningar, inklusive vego och kaloriinriktade lådor", "Färdiglagat och svensklagat", "Gluten- och laktosfria alternativ enligt tjänstens information", "Ingen matlagning eller råvaruhandel i vardagen"],
    drawbacks: ["Leveransområdet måste kontrolleras per postnummer", "Veckokostnaden varierar med vald låda", "Specialkost behöver alltid läsas rätt för varje enskild rätt"],
    bestFor: "Dig som vill kombinera färdiglagad vardagsmat med flera kostval", details: [{ label: "Portion", value: "Från 78 kr" }, { label: "Upplägg", value: "Veckolådor" }, { label: "Kostval", value: "Vego, träning, kaloriinriktat" }, { label: "Leverans", value: "Kyld hemleverans" }, { label: "Bindning", value: "Kontrollera aktuella villkor" }],
    officialUrl: "https://svartaladan.se/", reviewSlug: "svarta-ladan-recension",
  },
  {
    key: "factor", rank: 2, name: "Factor", shortName: "F", badge: "Tydliga kostmål", ratingValue: "4,5/5",
    pricePerPortion: "Cirka 110–140 kr", weeklyPrice: "Varierar med antal rätter", deliveryFee: "49 kr enligt underlag", boxType: "Färska, färdiglagade måltider", cookingTime: "Några minuter att värma", deliveryArea: "Kontrollera vid beställning",
    benefits: ["Omkring 21 rätter i veckomenyn enligt tjänsten", "Tydliga spår för keto, proteinrikt och max 550 kcal", "Kostvalen beskriver protein och energi", "Paus eller avslut enligt tjänstens villkor"],
    drawbacks: ["Högre portionspris än de svenska budgetalternativen", "Frakt behöver räknas in", "Utbud och leverans behöver kontrolleras för aktuell vecka"],
    bestFor: "Dig som vill välja färdig mat utifrån ett deklarerat kostmål", details: [{ label: "Portion", value: "Cirka 110–140 kr" }, { label: "Meny", value: "Cirka 21 rätter i veckan" }, { label: "Protein", value: "Proteinrikt: minst 30 g enligt tjänsten" }, { label: "Kalorier", value: "Max 550-kcal-val finns" }, { label: "Bindning", value: "Pausa eller avsluta enligt villkor" }],
    officialUrl: "https://www.factormeals.se/", reviewSlug: "factor-recension",
  },
  {
    key: "macro-meals", rank: 3, name: "Macro Meals", shortName: "MM", badge: "För näringskoll", ratingValue: "4,7/5",
    pricePerPortion: "Cirka 115 kr", weeklyPrice: "Beror på val av meny och antal", deliveryFee: "Kontrollera i kassan", boxType: "Näringsberäknade, färdiglagade matlådor", cookingTime: "Några minuter att värma", deliveryArea: "Kontrollera postnummer och leveransdag",
    benefits: ["Näringsvärden redovisas per rätt", "Tydligt proteinfokus", "Val mellan färdig meny och mix & match", "Maten går att frysa enligt tjänstens information"],
    drawbacks: ["Minimiantal och frakt påverkar totalen", "Färre kostprofiler än Factor", "Leveransdag skiljer mellan postnummer"],
    bestFor: "Dig som vill se protein och kalorier innan du väljer veckans rätter", details: [{ label: "Portion", value: "Cirka 115 kr" }, { label: "Protein", value: "Cirka 42 g i snitt enligt underlag" }, { label: "Energi", value: "Cirka 479 kcal i snitt enligt underlag" }, { label: "Beställning", value: "Meny eller mix & match" }, { label: "Leverans", value: "Kyld hemleverans" }],
    officialUrl: "https://www.macromeals.se/", reviewSlug: "macro-meals-recension",
  },
  {
    key: "fardiga-maten", rank: 4, name: "Färdiga Maten", shortName: "FM", badge: "Husmanskost", ratingValue: "4,4/5",
    pricePerPortion: "Från 65 kr", weeklyPrice: "Varierar med val och leverans", deliveryFee: "Kontrollera i kassan", boxType: "Färdiglagad husmanskost", cookingTime: "Värms före servering", deliveryArea: "Kontrollera tillgänglighet för din adress",
    benefits: ["Lägsta portionsriktmärket i vår översikt", "Klassisk vardagsmat", "Färdiglagade portioner minskar köksarbetet", "Kan passa dig som vill ha ett enklare upplägg"],
    drawbacks: ["Mindre fokus på deklarerade kostmål", "Utbud och område behöver kontrolleras", "Portionsstorlek och hållbarhet kan skilja mellan rätter"],
    bestFor: "Dig som prioriterar klassisk färdig mat och ett lägre portionsriktmärke", details: [{ label: "Portion", value: "Från 65 kr" }, { label: "Inriktning", value: "Husmanskost" }, { label: "Måltid", value: "Färdiglagad" }, { label: "Leverans", value: "Kontrollera aktuellt område" }, { label: "Bindning", value: "Kontrollera aktuella villkor" }],
    officialUrl: "https://www.lagatochklart.online/lagat", reviewSlug: "fardiga-maten-recension",
  },
];

export function getProvider(key: ProviderKey) {
  return providers.find((provider) => provider.key === key) ?? providers[0];
}

export function getProviderLink(provider: Provider) {
  return provider.officialUrl;
}
