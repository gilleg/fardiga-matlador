import type { Metadata } from "next";
import "./tokens.css";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./content/metadata";
import { CookieConsent } from "./components/CookieConsent";

const INITIAL_TITLE = "Färdiga matlådor 2026 - jämför hemlevererad färdig mat";
const INITIAL_DESCRIPTION = "Jämför färdiga matlådor efter portionspris, kostinriktning, leverans och vad som passar din vardag.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: INITIAL_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: INITIAL_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    dateModified: "2026-08-21",
    description: "En fristående svensk konsumentguide som jämför färdiglagade matlådor efter pris, leverans, kostinriktning och vardagsnytta.",
  };

  return (
    <html lang="sv-SE">
      <head>
        <script async src="https://addrevenue.io/easylinks.min.js?c=3469183" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5121VTNSS" />
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-D5121VTNSS');" }} />
        <link rel="icon" href="/brand-ready-meals.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
