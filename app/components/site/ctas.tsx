"use client";
import { ScrambleText } from "./scramble-text";

export const SHOP_URL = "https://www.orphanwear.us/";
export const DM_URL = "https://ig.me/m/wear_orphan";
export const INSTAGRAM_URL = "https://www.instagram.com/wear_orphan/";

/** Primary CTA: outlined block, yellow flood from the left, arrow slides. */
export function ShopCta({ className = "" }: { className?: string }) {
  return (
    <a
      className={`ow-cta-shop ${className}`}
      href={SHOP_URL}
      rel="noreferrer"
      target="_blank"
    >
      <ScrambleText text="Shop the drop" />
      <span aria-hidden="true" className="ow-cta-shop__arrow">
        &rarr;
      </span>
    </a>
  );
}

/** Secondary CTA: bracketed label, brackets spread on hover. */
export function CustomCta({ className = "" }: { className?: string }) {
  return (
    <a
      className={`ow-cta-custom ${className}`}
      href={DM_URL}
      rel="noreferrer"
      target="_blank"
    >
      <span aria-hidden="true" className="ow-cta-custom__bracket">
        [
      </span>
      <ScrambleText text="Message for a custom" />
      <span aria-hidden="true" className="ow-cta-custom__bracket">
        ]
      </span>
    </a>
  );
}

/** Footer-only: underline draws from the left. */
export function FollowLink() {
  return (
    <a className="ow-follow" href={INSTAGRAM_URL} rel="noreferrer" target="_blank">
      Follow @wear_orphan
    </a>
  );
}
