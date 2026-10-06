import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FIRMA } from "@/lib/iletisim";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikonklima.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${FIRMA.ad} · NIBE Isı Pompası — ${FIRMA.adresKisa}`,
    template: `%s · ${FIRMA.ad}`,
  },
  description:
    "NIBE hava kaynaklı ısı pompaları: S2125, F2040, SPLIT ve VVM S320. Teknik özellikler, dökümanlar ve ücretsiz keşif. Atakum / Samsun.",
  keywords: [
    "ısı pompası",
    "NIBE",
    "hava kaynaklı ısı pompası",
    "Samsun ısı pompası",
    "Atakum",
    "yerden ısıtma",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: FIRMA.ad,
    title: `${FIRMA.ad} · NIBE Isı Pompası`,
    description:
      "NIBE hava kaynaklı ısı pompaları — teknik özellikler, dökümanlar ve ücretsiz keşif.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={`${jakarta.variable} gren antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
