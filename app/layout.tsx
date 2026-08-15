import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import FilmGrain from "@/components/chrome/FilmGrain";
import Navbar from "@/components/chrome/Navbar";
import CustomCursor from "@/components/chrome/CustomCursor";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import { SITE } from "@/content/site";

/**
 * Section 08 · "When Neue Haas Grotesk is unavailable, Inter serves as the
 * system-grade fallback. No other font is ever substituted."
 *
 * TO GO LIVE: add the licensed Neue Haas Grotesk woff2 files via
 * next/font/local and the stack in globals.css picks them up first —
 * this import stays as the fallback exactly as the brand book intends.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        <a
          href="#main"
          className="skip-link bg-crimson px-4 py-3 text-label uppercase text-white"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <FilmGrain />
        <CustomCursor />
        <Navbar />

        <main id="main">{children}</main>
      </body>
    </html>
  );
}
