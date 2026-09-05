type ToolLink = { href: string; title: string; text: string };

function toolForArticle(slug: string): ToolLink {
  if (/billig|pris|student|person/.test(slug)) {
    return { href: "/verktyg#veckokostnad", title: "Räkna på veckokostnaden", text: "Fyll i portioner, middagar och leverans för att jämföra samma upplägg." };
  }
  if (/fardig|lattlagad|traning|viktnedgang/.test(slug)) {
    return { href: "/verktyg#tidsvinst", title: "Se din möjliga tidsvinst", text: "Räkna på hur mycket planering och matlagning upplägget kan frigöra." };
  }
  return { href: "/verktyg#valjare", title: "Börja med rätt prioritet", text: "Använd väljaren för att avgöra vilken jämförelse som är mest relevant för dig." };
}

export function ArticleToolLink({ slug }: { slug: string }) {
  const tool = toolForArticle(slug);
  return <section className="article-tool-link" aria-label="Relevant verktyg"><p className="eyebrow">Verktyg</p><h3>{tool.title}</h3><p>{tool.text}</p><a href={tool.href}>Öppna verktyget <span aria-hidden="true">↗</span></a></section>;
}
