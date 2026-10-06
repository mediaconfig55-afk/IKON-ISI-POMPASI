"use client";

import { useState } from "react";
import { FIRMA, instagramLinki, whatsappLinki } from "@/lib/iletisim";

function WhatsappIkon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.6-4.6A8.4 8.4 0 1 1 20.5 11.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.2c0 3 2.3 5.3 5.3 5.3.5 0 .9-.4.9-.9v-.9l-1.8-.9-.9.9c-1-.4-1.8-1.3-2.2-2.2l.9-.9L10.3 8h-.9c-.2 0-.4.1-.4.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIkon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function Ok() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsappButonu({
  mesaj,
  etiket = "WhatsApp'tan sor",
  genis = false,
}: {
  mesaj: string;
  etiket?: string;
  genis?: boolean;
}) {
  return (
    <a
      href={whatsappLinki(mesaj)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between gap-3 rounded-full bg-yesil py-2.5 pl-6 pr-2 text-sm font-semibold text-[#04120c] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
        genis ? "w-full" : "w-full sm:w-auto"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <WhatsappIkon />
        {etiket}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
        <Ok />
      </span>
    </a>
  );
}

/**
 * Instagram DM metni URL ile ön doldurulamadığı için mesaj taslağını panoya
 * kopyalayıp profili açıyoruz; kullanıcı DM kutusuna doğrudan yapıştırabilir.
 */
export function InstagramButonu({
  mesaj,
  etiket = "Instagram'dan yaz",
  genis = false,
}: {
  mesaj: string;
  etiket?: string;
  genis?: boolean;
}) {
  const [kopyalandi, setKopyalandi] = useState(false);

  async function tikla() {
    try {
      await navigator.clipboard.writeText(mesaj);
      setKopyalandi(true);
      window.setTimeout(() => setKopyalandi(false), 2600);
    } catch {
      // Pano izni yoksa sessizce geç — profil yine de açılır.
    }
    window.open(instagramLinki(), "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={tikla}
      className={`group flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/5 py-2.5 pl-6 pr-2 text-sm font-semibold text-kir transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 active:scale-[0.98] ${
        genis ? "w-full" : "w-full sm:w-auto"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <InstagramIkon />
        {kopyalandi ? "Mesaj kopyalandı — DM'e yapıştır" : etiket}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
        <Ok />
      </span>
    </button>
  );
}

/** Mobilde ekranın altına sabitlenen hızlı iletişim çubuğu. */
export function SabitIletisimCubugu({ mesaj }: { mesaj: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 sm:hidden">
      <div className="pointer-events-auto flex w-full gap-2 rounded-[1.75rem] border border-white/10 bg-black/70 p-1.5 backdrop-blur-2xl">
        <a
          href={whatsappLinki(mesaj)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-yesil py-3 text-sm font-semibold text-[#04120c] active:scale-[0.98]"
        >
          <WhatsappIkon />
          WhatsApp
        </a>
        <a
          href={FIRMA.telefonTel ? `tel:${FIRMA.telefonTel}` : "#"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-kir active:scale-[0.98]"
          aria-label="Telefonla ara"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
