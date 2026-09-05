"use client";

import { useEffect, useState } from "react";

const menuGroups = [
  { title: "Jämför", links: [{ href: "/basta-fardiga-matlador", label: "Bästa färdiga matlådorna" }, { href: "/billiga-matlador", label: "Billiga matlådor" }, { href: "/matlador-med-hemleverans", label: "Med hemleverans" }, { href: "/nyttiga-matlador", label: "Nyttiga matlådor" }] },
  { title: "Vardag & mål", links: [{ href: "/matlador-for-traning", label: "För träning" }, { href: "/matlador-for-viktnedgang", label: "För viktnedgång" }, { href: "/fardiga-matlador-for-en-person", label: "För en person" }, { href: "/vegetariska-matlador", label: "Vegetariska" }] },
  { title: "Recensioner", links: [{ href: "/svarta-ladan-recension", label: "Svarta Lådan" }, { href: "/factor-recension", label: "Factor" }, { href: "/macro-meals-recension", label: "Macro Meals" }, { href: "/fardiga-maten-recension", label: "Färdiga Maten" }] },
  { title: "Verktyg", links: [{ href: "/verktyg#veckokostnad", label: "Veckokostnad" }, { href: "/verktyg#tidsvinst", label: "Tidsvinst" }, { href: "/verktyg#valjare", label: "Matlådeväljaren" }] },
];

const utilityLinks = [{ href: "/om-oss", label: "Om oss och vår metod" }, { href: "/integritetspolicy", label: "Integritetspolicy" }, { href: "/cookiepolicy", label: "Cookiepolicy" }];

function MenuColumns({ onNavigate }: { onNavigate?: () => void }) {
  return <>{menuGroups.map((group) => <div className="menu-group" key={group.title}><p>{group.title}</p>{group.links.map((link) => <a href={link.href} key={link.href} onClick={onNavigate}>{link.label}</a>)}</div>)}</>;
}

function DropdownGroup({ group }: { group: (typeof menuGroups)[number] }) {
  return <div className="menu-group"><p>{group.title}</p>{group.links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</div>;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", close); };
  }, [mobileOpen]);

  return <div className="site-header-shell"><header className="site-header">
    <a className="brand" href="/" aria-label="Färdiga matlådor, startsida"><img className="brand-mark" src="/brand-ready-meals.svg" alt="" width="36" height="36" /><span>Färdiga matlådor</span></a>
    <nav className="desktop-nav" aria-label="Huvudmeny">
      <details className="nav-dropdown nav-dropdown-compare"><summary><span className="nav-label">Jämför</span> <span className="nav-toggle-icon" aria-hidden="true">＋</span></summary><div className="nav-dropdown-panel"><DropdownGroup group={menuGroups[0]} /></div></details>
      <details className="nav-dropdown nav-dropdown-vardag"><summary><span className="nav-label">Guider</span> <span className="nav-toggle-icon" aria-hidden="true">＋</span></summary><div className="nav-dropdown-panel"><DropdownGroup group={menuGroups[1]} /></div></details>
      <details className="nav-dropdown nav-dropdown-reviews"><summary><span className="nav-label">Recensioner</span> <span className="nav-toggle-icon" aria-hidden="true">＋</span></summary><div className="nav-dropdown-panel"><DropdownGroup group={menuGroups[2]} /></div></details>
      <a href="/verktyg">Verktyg</a>
      <a href="/om-oss">Om oss</a>
    </nav>
    <button className="mobile-menu-trigger" type="button" aria-expanded={mobileOpen} aria-controls="mobil-meny" onClick={() => setMobileOpen(true)}><span className="menu-icon" aria-hidden="true"><span /><span /></span>Meny</button>
  </header><div className={`mobile-menu-layer${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}><button className="mobile-menu-backdrop" type="button" aria-label="Stäng meny" onClick={() => setMobileOpen(false)} /><div className="mobile-menu-drawer" id="mobil-meny" role="dialog" aria-modal="true" aria-label="Alla sidor"><div className="mobile-menu-head"><span>Alla sidor</span><button type="button" aria-label="Stäng meny" onClick={() => setMobileOpen(false)}>×</button></div><nav className="mobile-nav" aria-label="Mobilmeny"><MenuColumns onNavigate={() => setMobileOpen(false)} /><div className="mobile-menu-utility">{utilityLinks.map((link) => <a href={link.href} key={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>)}</div></nav></div></div></div>;
}
