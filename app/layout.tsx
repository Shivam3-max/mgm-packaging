import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import SmoothScroll from "@/components/SmoothScroll";
import { QuoteProvider } from "@/components/QuoteProvider";
import QuoteDrawer from "@/components/QuoteDrawer";
import { SITE } from "@/data/company";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} — LLDPE Polybags, Barotiwala Baddi`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "LLDPE polybag manufacturer in Barotiwala, Baddi. Plain, printed, zip lock, gusset and coloured polybags in any size, 15–200 micron. Free samples across the BBN belt.",
  keywords: [
    "LLDPE polybags", "polybag manufacturer Baddi", "polythene bags Barotiwala",
    "zip lock bags Himachal", "gusset bags manufacturer", "printed polybags India",
    "pharmaceutical polybags Baddi", "custom size polybags",
  ],
  openGraph: {
    title: `${SITE.name} — LLDPE Polybags`,
    description: `${SITE.taglineShort} LLDPE polybags manufactured inside the Baddi industrial belt.`,
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#022F73",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  name: SITE.name,
  description: "Manufacturer of LLDPE polybags — plain, printed, zip lock, gusset and coloured.",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.district,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.pin,
    addressCountry: "IN",
  },
  email: SITE.email,
  telephone: SITE.partners.map((p) => p.phoneIntl),
  areaServed: SITE.serviceArea,
  slogan: SITE.taglineShort,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <QuoteProvider>
          <SmoothScroll />
          <a
            href="#main"
            className="btn btn--primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyBar />
          <QuoteDrawer />
        </QuoteProvider>
      </body>
    </html>
  );
}
