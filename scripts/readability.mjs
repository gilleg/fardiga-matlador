const articleSlugs = [
  "basta-fardiga-matlador", "billiga-matlador", "matlador-med-hemleverans", "nyttiga-matlador",
  "matlador-for-traning", "matlador-for-viktnedgang", "fardiga-matlador-for-en-person", "vegetariska-matlador",
  "svarta-ladan-recension", "factor-recension", "macro-meals-recension", "fardiga-maten-recension",
];

function readableText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(?:p|li|h[1-6]|dt|dd|summary|div|section|article)>/gi, ". ").replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#xA0;/gi, " ").replace(/&amp;/gi, " och ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

export function calculateLix(text) {
  const words = text.match(/[A-Za-zÅÄÖåäö0-9]+(?:[-/][A-Za-zÅÄÖåäö0-9]+)*/g) ?? [];
  const sentences = text.match(/[.!?]+(?=\s|$)/g) ?? [];
  const longWords = words.filter((word) => word.replace(/[-/]/g, "").length > 6);
  const lix = words.length / Math.max(sentences.length, 1) + (longWords.length * 100) / Math.max(words.length, 1);
  return { lix: Math.round(lix * 10) / 10, words: words.length, sentences: sentences.length, longWords: longWords.length };
}

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("readability", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
for (const slug of articleSlugs) {
  const response = await worker.fetch(new Request(`http://localhost/${slug}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const score = calculateLix(readableText(await response.text()));
  console.log(`${slug.padEnd(36)} LIX ${String(score.lix).padStart(4)}  ${score.words} ord`);
}
