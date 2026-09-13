import SiteNav from "@/app/components/site/nav";
import { Hero } from "@/app/components/site/hero";
import {
  CustomsSection,
  DropSection,
  LetterSection,
  SiteFooter,
} from "@/app/components/site/sections";

export default function Home() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <DropSection />
      <LetterSection />
      <CustomsSection />
      <SiteFooter />
    </main>
  );
}