export type ArticleImage = { src: string; alt: string; caption: string };

const deliveryImage: ArticleImage = {
  src: "/images/fardiga-matlador/hero-ready-meals.png",
  alt: "Färdiglagade matlådor med grönsaker och lax på ett ljust köksbord",
  caption: "Färdiglagade matlådor ska jämföras på mer än portionspris: leverans, innehåll och hur upplägget fungerar i veckan.",
};

const homeImage: ArticleImage = {
  src: "/images/fardiga-matlador/warm-at-home.png",
  alt: "En person värmer en färdiglagad matlåda hemma i köket",
  caption: "Det praktiska värdet ligger i hur lätt en portion går från leverans till en vanlig middag hemma.",
};

const weeklyImage: ArticleImage = {
  src: "/images/fardiga-matlador/weekly-choices.png",
  alt: "Färdiga matlådor och en veckoplan sedda uppifrån",
  caption: "Veckans meny, portionsantal och leverans avgör den totala beställningen.",
};

export function getArticleImage(slug: string): ArticleImage {
  if (["matlador-for-traning", "matlador-for-viktnedgang", "macro-meals-recension", "factor-recension"].includes(slug)) return weeklyImage;
  if (["matlador-med-hemleverans", "fardiga-matlador-for-en-person", "svarta-ladan-recension", "fardiga-maten-recension"].includes(slug)) return homeImage;
  return deliveryImage;
}
