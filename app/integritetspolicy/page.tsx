import type { Metadata } from "next";
import { AffiliateBar } from "../components/AffiliateBar";
import { CookieSettingsButton } from "../components/CookieConsent";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_URL } from "../content/metadata";

export const metadata: Metadata = { title: "Integritetspolicy", description: "Information om hur Färdiga matlådor behandlar personuppgifter och kakor.", alternates: { canonical: `${SITE_URL}/integritetspolicy` } };

export default function PrivacyPage() {
  return <><SiteHeader /><main className="policy-shell"><header className="policy-header"><p className="eyebrow">Policy</p><h1>Integritetspolicy</h1><p>Här beskriver vi hur webbplatsen hanterar personuppgifter och kakor.</p><CookieSettingsButton /></header><div className="policy-content"><section><h2>Personuppgifter</h2><p>Webbplatsen har inget konto, formulär för beställning eller egen registrering av personuppgifter. När du klickar vidare till en leverantör av färdig mat behandlar den tjänsten uppgifter enligt sin egen integritetspolicy.</p></section><section><h2>Kakor och lokal lagring</h2><p>Vi använder lokal lagring för att komma ihåg ditt val i kakbannern. Sajten har inget eget analysverktyg konfigurerat i den här versionen.</p></section><section><h2>Externa länkar</h2><p>Artiklarna länkar till leverantörer och andra källor. De externa webbplatserna ansvarar för sin egen integritet och användning av kakor.</p></section><section><h2>Dina rättigheter</h2><p>Du kan begränsa eller radera kakor via webbläsarens inställningar. För frågor om den här policyn kan du kontakta redaktionen via sajtens publicerade kontaktväg när sådan finns.</p></section></div></main><AffiliateBar /><SiteFooter /></>;
}
