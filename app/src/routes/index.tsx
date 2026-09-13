import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/site/hero";
import {
  CustomsSection,
  DropSection,
  LetterSection,
  SiteFooter,
  SiteNav,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

// Header: a real 3D tee that follows the cursor, then dissolves on scroll
// (two beats). Then the drop as floating 3D models, the letter, customs.
function Index() {
  return (
    <div className="ow">
      <SiteNav />
      <main>
        <Hero />
        <DropSection />
        <LetterSection />
        <CustomsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
