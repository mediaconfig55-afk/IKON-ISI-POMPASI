"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FIRMA, GENEL_WHATSAPP_MESAJI, whatsappLinki } from "@/lib/iletisim";

const BAGLANTILAR = [
  { ad: "Ürünler", href: "/#urunler" },
  { ad: "Danışman", href: "/#danisman" },
  { ad: "İletişim", href: "/#iletisim" },
];

export default function Navbar() {
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    document.body.style.overflow = acik ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [acik]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5 sm:pt-6">
        <nav className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-2xl">
          <Link
            href="/"
            onClick={() => setAcik(false)}
            className="flex items-center gap-2.5 rounded-full py-2 pl-4 pr-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-buz opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-buz" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{FIRMA.ad}</span>
          </Link>

          <div className="ml-auto hidden items-center gap-1 sm:flex">
            {BAGLANTILAR.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="rounded-full px-4 py-2 text-sm text-sis transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-kir"
              >
                {b.ad}
              </Link>
            ))}
          </div>

          <a
            href={whatsappLinki(GENEL_WHATSAPP_MESAJI)}
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-auto flex items-center gap-2 rounded-full bg-kir py-2 pl-5 pr-2 text-sm font-semibold text-kuyu transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:ml-0"
          >
            <span className="hidden sm:inline">Teklif al</span>
            <span className="sm:hidden">Yaz</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {/* Hamburger — iki çizgi akışkan şekilde X'e dönüşür */}
          <button
            type="button"
            aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={acik}
            onClick={() => setAcik((v) => !v)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 sm:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-kir transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                acik ? "translate-y-0 rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-kir transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                acik ? "translate-y-0 -rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Ekranı kaplayan cam katman — bağlantılar kademeli maske ile belirir */}
      <div
        className={`fixed inset-0 z-30 bg-black/85 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:hidden ${
          acik ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {BAGLANTILAR.map((b, i) => (
            <Link
              key={b.href}
              href={b.href}
              onClick={() => setAcik(false)}
              style={{ transitionDelay: acik ? `${100 + i * 60}ms` : "0ms" }}
              className={`text-4xl font-semibold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                acik ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-md"
              }`}
            >
              {b.ad}
            </Link>
          ))}
          <a
            href={FIRMA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAcik(false)}
            style={{ transitionDelay: acik ? "280ms" : "0ms" }}
            className={`mt-6 text-sm uppercase tracking-[0.2em] text-sis transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              acik ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            @{FIRMA.instagramKullanici}
          </a>
        </div>
      </div>
    </>
  );
}
