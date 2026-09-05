import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

const articleSlugs = ["basta-fardiga-matlador", "billiga-matlador", "matlador-med-hemleverans", "nyttiga-matlador", "matlador-for-traning", "matlador-for-viktnedgang", "fardiga-matlador-for-en-person", "vegetariska-matlador", "svarta-ladan-recension", "factor-recension", "macro-meals-recension", "fardiga-maten-recension"];

function comparisonProviderOrder(html) {
  return [...html.matchAll(/<article class="matkasse-card(?: is-winner)?">([\s\S]*?)<\/article>/g)].map((match) => match[1].match(/<h3>([^<]+)<\/h3>/)?.[1]).filter(Boolean);
}

test("startsidan har eget varumärke, innehåll och bildmaterial", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? "";
  assert.match(head, /Färdiga matlådor 2026/);
  assert.match(head, /brand-ready-meals\.svg/);
  assert.match(html, /Färdig mat när veckan inte har mer att ge/);
  assert.match(html, /Svarta Lådan/);
  assert.match(html, /Macro Meals/);
  assert.match(html, /images\/fardiga-matlador\/hero-ready-meals\.png/);
  assert.doesNotMatch(html, /HelloFresh|ICA Matkasse|Bästa matkasse/);
});

test("alla guider och recensioner svarar med rätt innehåll", async () => {
  for (const slug of articleSlugs) {
    const response = await render(`/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /Källor och underlag/);
    assert.match(html, /Färdiga matlådor/);
    assert.equal((html.match(/class="article-editorial-image/g) ?? []).length, 2, `${slug} should have two editorial images`);
    assert.match(html, /class="article-tool-link"[^>]*>[\s\S]*?href="\/verktyg#/);
    assert.doesNotMatch(html, /HelloFresh|ICA Matkasse|Hedvig|Trygg-Hansa/);
  }
});

test("verktyg är en egen sektion och partnernamn länkas i kortsvaret", async () => {
  const tools = await (await render("/verktyg")).text();
  assert.match(tools, /id="veckokostnad"/);
  assert.match(tools, /id="tidsvinst"/);
  assert.match(tools, /id="valjare"/);
  assert.match(tools, /href="\/verktyg">Verktyg<\/a>/);
  const article = await (await render("/basta-fardiga-matlador")).text();
  const directAnswer = article.match(/<div class="direct-answer"[\s\S]*?<\/div><\/header>/)?.[0] ?? "";
  assert.match(directAnswer, /href="https:\/\/svartaladan\.se\/"[\s\S]*?>Svarta Lådan<\/a>/);
});

test("jämförelsen har rätt helhetsval och fyra tjänster", async () => {
  const html = await (await render("/basta-fardiga-matlador")).text();
  assert.equal(comparisonProviderOrder(html)[0], "Svarta Lådan");
  assert.deepEqual(comparisonProviderOrder(html), ["Svarta Lådan", "Factor", "Macro Meals", "Färdiga Maten"]);
  assert.match(html, /Vårt val i jämförelsen/);
});

test("policyer och kakval använder projektets nyckel utan analytics-script", async () => {
  const privacy = await (await render("/integritetspolicy")).text();
  assert.match(privacy, /Färdiga matlådor/);
  const cookies = await (await render("/cookiepolicy")).text();
  assert.match(cookies, /Ändra kakval/);
  const cookieSource = await readFile(new URL("../app/components/CookieConsent.tsx", import.meta.url), "utf8");
  assert.match(cookieSource, /fardiga-matlador_cookie_consent/);
  assert.doesNotMatch(cookieSource, /googletagmanager|gtag\(/);
});

test("projektet har avsedda visuella tillgångar och responsiv fyrkorts-layout", async () => {
  await access(new URL("../public/brand-ready-meals.svg", import.meta.url));
  await access(new URL("../public/images/fardiga-matlador/hero-ready-meals.png", import.meta.url));
  await access(new URL("../public/images/fardiga-matlador/warm-at-home.png", import.meta.url));
  await access(new URL("../public/images/fardiga-matlador/weekly-choices.png", import.meta.url));
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.matkasse-card-grid \{[^}]*grid-template-columns: repeat\(4/);
  assert.match(styles, /@media \(max-width: 960px\) \{[\s\S]*?\.matkasse-card-grid \{ grid-template-columns: repeat\(2/);
  assert.match(styles, /@media \(max-width: 720px\) \{[\s\S]*?\.matkasse-card-grid \{ grid-template-columns: 1fr/);
});
