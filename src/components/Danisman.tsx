"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { URUNLER } from "@/data/urunler";
import { WhatsappButonu } from "./IletisimButonlari";

type Oneri = {
  slug: string;
  baslik: string;
  gerekce: string[];
  guven: number;
  kaynak: "jev" | "kural";
  whatsappMesaji: string;
};

const ORNEKLER = [
  "180 m² iki katlı villam var, yerden ısıtma döşeli, Samsun Atakum. Yazın soğutma da istiyorum.",
  "120 m² dairede klasik petek radyatörler var, kombiden ısı pompasına geçmek istiyorum.",
  "Dış üniteye ayıracak yerim çok kısıtlı, balkona sığacak bir çözüm arıyorum.",
];

export default function Danisman() {
  const [talep, setTalep] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [oneri, setOneri] = useState<Oneri | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  const urun = oneri ? URUNLER.find((u) => u.slug === oneri.slug) : null;

  async function gonder(metin: string) {
    setYukleniyor(true);
    setHata(null);
    setOneri(null);
    try {
      const yanit = await fetch("/api/danisman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ talep: metin }),
      });
      const veri = await yanit.json();
      if (!yanit.ok) {
        setHata(veri.hata ?? "Bir sorun oluştu, lütfen tekrar deneyin.");
        return;
      }
      setOneri(veri as Oneri);
    } catch {
      setHata("Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5">
      <div className="rounded-[calc(2rem-0.375rem)] bg-kuyu-2 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-10">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sis">
          Jev destekli
        </span>

        <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Hangi ısı pompası size uygun?
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-sis">
          Mahalinizi kendi cümlelerinizle anlatın — metrekare, tesisat tipi, il/ilçe.
          Saniyeler içinde size uygun modeli ve gerekçesini görün.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!yukleniyor && talep.trim().length >= 8) gonder(talep.trim());
          }}
          className="mt-8"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5 transition-colors duration-500 focus-within:border-white/25">
            <textarea
              value={talep}
              onChange={(e) => setTalep(e.target.value)}
              rows={3}
              maxLength={1200}
              placeholder="Örn: 160 m² müstakil evim var, yerden ısıtma döşeli, Samsun'da oturuyorum..."
              className="w-full resize-none rounded-[calc(1.5rem-0.375rem)] bg-kat px-5 py-4 text-[15px] leading-relaxed text-kir placeholder:text-sis/50 focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ORNEKLER.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setTalep(o);
                  gonder(o);
                }}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-left text-xs text-sis transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/20 hover:text-kir"
              >
                {o.length > 54 ? `${o.slice(0, 54)}…` : o}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={yukleniyor || talep.trim().length < 8}
            className="group mt-6 flex w-full items-center justify-between gap-3 rounded-full bg-kir py-3 pl-7 pr-2 text-sm font-semibold text-kuyu transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:opacity-40 sm:w-auto"
          >
            {yukleniyor ? "Değerlendiriliyor…" : "Bana uygun modeli bul"}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </form>

        {hata && (
          <p role="alert" className="mt-6 text-sm text-alev">
            {hata}
          </p>
        )}

        {oneri && urun && (
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-kat p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="mx-auto w-28 shrink-0 overflow-hidden rounded-[1rem] bg-white sm:mx-0">
                  <Image
                    src={urun.gorsel}
                    alt={urun.ad}
                    width={220}
                    height={220}
                    className="h-auto w-full"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-sis">
                    Size önerilen
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    {urun.ad}
                  </h3>

                  <ul className="mt-4 space-y-2.5">
                    {oneri.gerekce.map((g, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-sis">
                        <span
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: urun.renk }}
                        />
                        {g}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs text-sis/60">
                    {oneri.kaynak === "jev"
                      ? `Jev güven skoru: %${Math.round(oneri.guven * 100)}`
                      : "Ön değerlendirme (kural tabanlı)"}{" "}
                    · Kesin seçim yerinde ısı kaybı hesabıyla yapılır.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <WhatsappButonu
                      mesaj={oneri.whatsappMesaji}
                      etiket="Bu öneriyi WhatsApp'tan sor"
                    />
                    <Link
                      href={`/urun/${urun.slug}`}
                      className="flex items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-kir transition-colors duration-500 hover:bg-white/5"
                    >
                      Ürün detayı
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
