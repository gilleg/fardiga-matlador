import { getProvider, getProviderLink } from "../content/providers";

export function AffiliateBar() {
  const featured = getProvider("svarta-ladan");

  return (
    <aside className="affiliate-bar" aria-label="Svarta Lådans erbjudande">
      <div className="affiliate-bar-inner">
        <div className="affiliate-bar-copy">
          <span>Vårt helhetsval</span>
          <strong>{featured.name}: färdiglagat med flera kostinriktningar</strong>
        </div>
        <a
          className="affiliate-button"
          href={getProviderLink(featured)}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
        >
          Se aktuella matlådor <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
