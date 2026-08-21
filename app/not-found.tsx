import type { Metadata } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Sidan hittades inte",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <div className="not-found-cat" aria-hidden="true">404</div>
        <p className="eyebrow">Fel adress</p>
        <h1>Här finns inget att jämföra.</h1>
        <p>Länken kan vara gammal eller adressen felstavad. Startsidan har alla aktuella guider och bolagsrecensioner.</p>
        <a className="primary-button" href="/">Gå till startsidan <span aria-hidden="true">↗</span></a>
      </main>
      <SiteFooter />
    </>
  );
}
