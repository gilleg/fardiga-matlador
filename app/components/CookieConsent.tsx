"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "fardiga-matlador_cookie_consent";
const CONSENT_EVENT = "fardiga-matlador-cookie-consent-change";
type ConsentValue = "necessary" | "all" | null;
let memoryConsent: ConsentValue = null;

function readConsent() {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === "necessary" || stored === "all" ? stored : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function saveConsent(value: "necessary" | "all") {
  memoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Valet gäller fortfarande under det aktuella sidbesöket om lagring är blockerad.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);

  function choose(value: "necessary" | "all") {
    saveConsent(value);
  }

  if (consent === "all" || consent === "necessary") return null;

  return (
    <aside className="cookie-banner" aria-label="Val av kakor">
      <div className="cookie-banner-inner">
        <p>
          Vi sparar bara ditt val för kakbannern lokalt i webbläsaren. Läs vår{" "}
          <a href="/integritetspolicy">integritetspolicy</a>.
        </p>
        <div className="cookie-actions">
          <button type="button" onClick={() => choose("necessary")}>Endast nödvändiga</button>
          <button type="button" onClick={() => choose("all")}>Godkänn alla</button>
        </div>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  function resetConsent() {
    memoryConsent = null;
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // Sidan laddas om och visar bannern även om webblagring inte är tillgänglig.
    }
    window.location.reload();
  }

  return <button className="cookie-settings-button" type="button" onClick={resetConsent}>Ändra kakval</button>;
}
