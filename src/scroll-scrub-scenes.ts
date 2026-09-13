/**
 * Orphan Wear journey: ONE continuous 15 s film of a single black tee, cut at
 * exact frame boundaries into three consecutive segments so each chapter reads
 * over its own moment of the same take. Segment N+1 starts on the frame after
 * segment N ends, so the scrub has no seams to hide.
 *
 * Every poster is the exact first frame of the encoded clip beside it.
 */
import { createElement } from "react";
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

import { CustomCta, ShopCta } from "@/components/site/ctas";
import { SpecList } from "@/components/site/spec-list";

/** Brand tokens for the journey layer (design-brief.md palette). */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#e9c400",
  background: "#0b0b0b",
  ink: "#f1efe8",
  muted: "#8b8b86",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "started-in-last",
    label: "01 The tee",
    kicker: "Started in Last collection",
    title: "Started in last.",
    body: "Twelve pieces for anyone who was dealt a different hand from the start. Heavyweight cotton, printed, embroidered and finished in house.",
    tags: ["Heavyweight cotton", "Box logo", "Made in house"],
    actions: createElement(ShopCta),
    clip: "/assets/world/scene-01.mp4",
    poster: "/assets/world/scene-01-poster.png",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 42%",
    align: "left",
    scroll: 1.6,
    linger: 0.2,
  },
  {
    id: "made-once",
    label: "02 Made once",
    title: "Made once.",
    body: "What goes into every piece before it leaves the table.",
    actions: createElement(SpecList),
    clip: "/assets/world/scene-02.mp4",
    poster: "/assets/world/scene-02-poster.png",
    mobileClip: "/assets/world/scene-02-mobile.mp4",
    mobilePoster: "/assets/world/scene-02-mobile-poster.png",
    objectPosition: "38% 50%",
    mobileObjectPosition: "50% 38%",
    align: "right",
    scroll: 1.8,
    linger: 0.15,
  },
  {
    id: "then-gone",
    label: "03 Then gone",
    kicker: "One of one",
    title: "Then it is gone.",
    body: "Every Orphan piece is made one time. When it sells, that number is closed for good. If you want one that does not exist yet, ask for it.",
    actions: createElement(CustomCta),
    clip: "/assets/world/scene-03.mp4",
    poster: "/assets/world/scene-03-poster.png",
    mobileClip: "/assets/world/scene-03-mobile.mp4",
    mobilePoster: "/assets/world/scene-03-mobile-poster.png",
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 40%",
    align: "left",
    scroll: 1.6,
    linger: 0.25,
  },
];
