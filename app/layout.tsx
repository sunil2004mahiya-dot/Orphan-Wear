import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Pirata_One } from "next/font/google";

import "./globals.css";
import SiteNav from "@/app/components/site/nav";

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

const pirata = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orphan-wear.vercel.app"),
  title: "Orphan Wear",
  description:
    "The original Orphan brand. One of one streetwear, hand bleached, embroidered and signed in house since 2023.",
  icons: { icon: "/assets/head/favicon-32.png", apple: "/assets/head/apple-touch-icon.png" },
  openGraph: {
    title: "Orphan Wear",
    description: "The original Orphan brand. One of one streetwear.",
    type: "website",
    images: [{ url: "/assets/brand/orphan-mark.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${pirata.variable}`}>
      <body className="ow">{children}</body>
    </html>
  );
}
