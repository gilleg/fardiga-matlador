import type { Metadata } from "next";
import { MealTools } from "../components/MealTools";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Verktyg för att jämföra färdiga matlådor",
  description: "Räkna på veckokostnad och tidsvinst och hitta vilken typ av färdiga matlådor som passar din vardag.",
};

export default function ToolsPage() {
  return <><SiteHeader /><main className="tools-page"><header className="tools-hero"><p className="eyebrow">Verktyg</p><h1>Vad tjänar du på färdig mat?</h1><p>Räkna på hela beställningen, se den möjliga tidsvinsten och börja jämförelsen utifrån det som betyder mest för dig.</p></header><MealTools compactMinutes={7} productLabel="färdiga matlådor" guideLinks={{ budget: "/billiga-matlador", time: "/matlador-med-hemleverans", choice: "/basta-fardiga-matlador", special: "/vegetariska-matlador" }} /></main><SiteFooter /></>;
}
