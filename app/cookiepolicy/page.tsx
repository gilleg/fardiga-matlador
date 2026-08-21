import type { Metadata } from "next";
import { AffiliateBar } from "../components/AffiliateBar";
import { CookieSettingsButton } from "../components/CookieConsent";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_URL } from "../content/metadata";

export const metadata: Metadata = { title: "Cookiepolicy", description: "Så använder Färdiga matlådor kakor och lokal lagring.", alternates: { canonical: `${SITE_URL}/cookiepolicy` } };

export default function CookiePage() {
  return <><SiteHeader /><main className="policy-shell"><header className="policy-header"><p className="eyebrow">Policy</p><h1>Cookiepolicy</h1><p>Vi använder så få kakor som möjligt och sparar endast ditt val för kakbannern lokalt i webbläsaren.</p><CookieSettingsButton /></header><div className="policy-content"><section><h2>Nödvändiga funktioner</h2><p>Vi använder lokal lagring för att komma ihåg om du har valt endast nödvändiga kakor eller godkänt alla. Valet gör att bannern inte behöver visas vid varje sidvisning.</p></section><section><h2>Analys</h2><p>I den här versionen är inget externt analys-ID konfigurerat. Valet i bannern är därför ett sparat integritetsval, inte ett aktiverat analysverktyg.</p></section><section><h2>Hantera ditt val</h2><p>Du kan ändra kakval när som helst med knappen på den här sidan eller via sidfoten. Du kan också blockera eller radera kakor i webbläsarens inställningar.</p></section></div></main><AffiliateBar /><SiteFooter /></>;
}
