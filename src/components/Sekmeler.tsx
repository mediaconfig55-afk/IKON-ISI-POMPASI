"use client";

import Image from "next/image";
import { useState } from "react";
import type { Urun } from "@/data/urunler";

const SEKMELER = ["Açıklama", "Avantajları", "Özellikleri", "Dökümanlar"] as const;
type Sekme = (typeof SEKMELER)[number];

const DOKUMAN_ETIKETI: Record<string, string> = {
  brosur: "PDF · Broşür",
  katalog: "Katalog",
  montaj: "PDF · Montaj",
  kullanim: "PDF · Kullanım",
  sema: "Web · Şema",
};

export default function Sekmeler({ urun }: { urun: Urun }) {
  const [aktif, setAktif] = useState<Sekme>("Açıklama");

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5">
      <div className="rounded-[calc(2rem-0.375rem)] bg-kuyu-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Sekme başlıkları — yatayda kayabilir, aktif olanın altında ince vurgu */}
        <div
          role="tablist"
          aria-label="Ürün bilgi sekmeleri"
          className="flex gap-1 overflow-x-auto border-b border-white/[0.07] p-2"
        >
          {SEKMELER.map((s) => (
            <button
              key={s}
              role="tab"
              id={`sekme-${s}`}
              aria-selected={aktif === s}
              aria-controls={`panel-${s}`}
              onClick={() => setAktif(s)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                aktif === s
                  ? "bg-white/[0.08] text-kir"
                  : "text-sis hover:text-kir"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-10">
          {aktif === "Açıklama" && (
            <div
              role="tabpanel"
              id="panel-Açıklama"
              aria-labelledby="sekme-Açıklama"
              className="space-y-5"
            >
              {urun.aciklama.map((p, i) => (
                <p
                  key={i}
                  className="max-w-3xl text-[15px] leading-[1.75] text-sis sm:text-base"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          {aktif === "Avantajları" && (
            <div
              role="tabpanel"
              id="panel-Avantajları"
              aria-labelledby="sekme-Avantajları"
              className="grid gap-4 md:grid-cols-3"
            >
              {urun.avantajlar.map((a, i) => (
                <div
                  key={a.baslik}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5"
                >
                  <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-kat p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                    <span
                      className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
                      style={{
                        background: `${urun.renk}1f`,
                        color: urun.renk,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-kir">
                      {a.baslik}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-sis">{a.metin}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aktif === "Özellikleri" && (
            <div
              role="tabpanel"
              id="panel-Özellikleri"
              aria-labelledby="sekme-Özellikleri"
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {urun.teknik.baslik}
              </h3>

              <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[42rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 pr-4 text-left font-medium text-sis">
                        Özellik
                      </th>
                      <th className="w-16 py-3 pr-4 text-left font-medium text-sis">
                        Birim
                      </th>
                      {urun.teknik.modeller.map((m) => (
                        <th
                          key={m}
                          className="py-3 pr-4 text-left text-xs font-semibold text-kir"
                        >
                          {m}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {urun.teknik.satirlar.map((satir) => {
                      const tekDeger = typeof satir.degerler === "string";
                      return (
                        <tr
                          key={satir.ozellik}
                          className="border-b border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.02]"
                        >
                          <td className="py-3 pr-4 align-top text-sis">
                            {satir.ozellik}
                          </td>
                          <td className="py-3 pr-4 align-top text-xs text-sis/70">
                            {satir.birim ?? ""}
                          </td>
                          {tekDeger ? (
                            <td
                              className="py-3 pr-4 align-top text-kir"
                              colSpan={urun.teknik.modeller.length}
                            >
                              {satir.degerler as string}
                            </td>
                          ) : (
                            (satir.degerler as string[]).map((d, i) => (
                              <td key={i} className="py-3 pr-4 align-top text-kir">
                                {d}
                              </td>
                            ))
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {urun.teknik.dipnotlar && (
                <ul className="space-y-1 text-xs leading-relaxed text-sis/70">
                  {urun.teknik.dipnotlar.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}

              {urun.teknikGorsel && (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5">
                  <div className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-white">
                    <Image
                      src={urun.teknikGorsel}
                      alt={`${urun.kisaAd} üretici teknik tablosu`}
                      width={1606}
                      height={833}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {aktif === "Dökümanlar" && (
            <div
              role="tabpanel"
              id="panel-Dökümanlar"
              aria-labelledby="sekme-Dökümanlar"
              className="grid gap-3 sm:grid-cols-2"
            >
              {urun.dokumanlar.map((d) => (
                <a
                  key={d.ad}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M13.5 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5l-5-5Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 3.5v5h5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-kir">
                      {d.ad}
                    </span>
                    <span className="block text-xs text-sis">
                      {DOKUMAN_ETIKETI[d.tur] ?? "Belge"}
                    </span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-sis transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
