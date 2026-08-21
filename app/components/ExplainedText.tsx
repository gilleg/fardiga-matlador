type TermEntry = { forms: string[]; definition: string };

const termEntries: TermEntry[] = [
  { forms: ["portionspris", "portionspriset"], definition: "Priset för en portion före eller efter leveransavgift, beroende på jämförelsen." },
  { forms: ["veckokostnad", "veckokostnaden"], definition: "Summan för veckans kasse inklusive relevanta leveransavgifter och tillval." },
  { forms: ["leveransavgift", "leveransavgiften", "leveransavgifter"], definition: "Avgiften för att få kassen hem eller till ett utlämningsställe." },
  { forms: ["matlåda", "matlådan", "matlådor", "matlådorna"], definition: "En färdiglagad portion som levereras kyld och normalt värms före servering." },
  { forms: ["kostval", "kostvalet", "kostvalen"], definition: "En meny eller ett filter för till exempel vegetarisk, glutenfri eller laktosfri kost." },
  { forms: ["bindningstid", "bindningstiden"], definition: "En period då ett abonnemang inte kan avslutas utan att villkoren påverkas." },
  { forms: ["basvaror", "basvarorna"], definition: "Sådant som salt, olja eller andra ingredienser som vissa kassar förutsätter att du har hemma." },
  { forms: ["färdiglagad", "färdiglagade"], definition: "Måltider som levereras tillagade och bara behöver värmas eller läggas upp." },
  { forms: ["ekologisk", "ekologiskt", "ekologiska"], definition: "Råvaror som säljs med ekologisk märkning eller ett uttalat ekologiskt sortiment." },
];

const definitions = new Map(termEntries.flatMap((entry) => entry.forms.map((form) => [form.toLocaleLowerCase("sv-SE"), entry.definition])));
const escapedForms = termEntries.flatMap((entry) => entry.forms).sort((a, b) => b.length - a.length).map((form) => form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const termPattern = new RegExp(`(${escapedForms.join("|")})`, "gi");

export function ExplainedText({ text }: { text: string }) {
  return <>{text.split(termPattern).map((part, index) => { const definition = definitions.get(part.toLocaleLowerCase("sv-SE")); if (!definition) return part; const termName = `${part.charAt(0).toLocaleUpperCase("sv-SE")}${part.slice(1)}`; const explanation = `${termName}: ${definition}`; return <span className="term-tooltip" data-tooltip={explanation} key={`${part}-${index}`}><span>{part}</span><button className="term-tooltip-button" type="button" aria-label={explanation}>?</button></span>; })}</>;
}
