"use client";
import { ScrambleText } from "@/app/components/site/scramble-text";

const LINKS = [
  { label: "The drop", href: "#drop" },
  { label: "Letter", href: "#letter" },
  { label: "Customs", href: "#customs" },
  { label: "Instagram", href: "https://www.instagram.com/wear_orphan/" },
];

export default function SiteNav() {
  return (
    <header className="ow-nav">
      <a className="ow-wordmark" href="/" aria-label="Orphan Wear home">
        Orphan
      </a>
      <nav aria-label="Site" className="ow-nav__links">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href}>
            <ScrambleText onMount={false} text={l.label} />
          </a>
        ))}
      </nav>
      <span className="ow-nav__meta">Est. 2023</span>
    </header>
  );
}