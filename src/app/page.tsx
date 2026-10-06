import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { URUNLER } from "@/data/urunler";
import { FIRMA } from "@/lib/iletisim";
import Danisman from "@/components/Danisman";
import Belirme from "@/components/Belirme";

// WebGL sahnesi yalnızca istemcide çalışır; ilk boyada HTML ızgara görünür.
const Vitrin3D = dynamic(() => import("@/components/Vitrin3D"), {
  loading: () => <div className="h-[clamp(22rem,56vh,34rem)] w-full" />,
});

export default function AnaSayfa() {
  return (
    <>
      {/* Arka plan: nefes alan ısıtma/soğutma küreleri — sabit, pointer almaz */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="orb absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)" }}
        />
        <div
          className="orb absolute -right-40 top-[30%] h-[34rem] w-[34rem] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            animationDelay: "-7s",
          }}
        />
        <div
          className="orb absolute bottom-[-15%] left-1/3 h-[30rem] w-[30rem] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, #34d399 0%, transparent 70%)",
            animationDelay: "-3.5s",
          }}
        />
      </div>

      {/* ———————————————— Giriş ———————————————— */}
      {/* justify-center kullanılmaz: içerik viewport'tan uzunsa üst kısmı kırpılır */}
      <section className="relative flex min-h-[100dvh] flex-col px-4 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto w-full max-w-6xl">
          <Belirme>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sis">
              NIBE Yetkili Satış · {FIRMA.adresKisa}
            </span>
          </Belirme>

          <Belirme gecikme={80}>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              Evinizi ısıtan
              <br />
              <span className="bg-gradient-to-r from-buz via-kir to-alev bg-clip-text text-transparent">
                en sessiz karar.
              </span>
            </h1>
          </Belirme>

          <Belirme gecikme={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-sis sm:text-lg">
              Hava kaynaklı NIBE ısı pompaları. Kartlardan birine dokunun —
              teknik tablosundan montaj kılavuzuna kadar her şey açılır.
            </p>
          </Belirme>
        </div>

        {/* 3D vitrin */}
        <div className="mt-8 flex-1">
          <Vitrin3D urunler={URUNLER} />
        </div>

        <p className="mx-auto mt-2 max-w-6xl px-1 text-xs text-sis/60">
          Bir ürüne tıklayın veya dokunun → öne çıkar → tekrar dokunun ya da
          &ldquo;Detayları aç&rdquo;a basın.
        </p>
      </section>

      {/* ———————————————— Ürün ızgarası ———————————————— */}
      <section id="urunler" className="px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Belirme>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sis">
              Ürünler
            </span>
            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Dört sistem, dört farklı ev.
            </h2>
          </Belirme>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {URUNLER.map((u, i) => (
              <Belirme key={u.slug} gecikme={i * 70}>
                <Link
                  href={`/urun/${u.slug}`}
                  className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/25"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-kuyu-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      <Image
                        src={u.gorsel}
                        alt={u.ad}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-8 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                      />
                      <span
                        className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ background: `${u.renk}26`, color: "#0b0d10" }}
                      >
                        {u.tip}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="text-xl font-semibold tracking-tight">{u.kisaAd}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-sis/70">
                        {u.etiket}
                      </p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-sis">
                        {u.ozet}
                      </p>

                      <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-6">
                        {u.vitrin.map((v) => (
                          <div key={v.etiket}>
                            <dt className="sr-only">{v.etiket}</dt>
                            <dd className="text-lg font-semibold tracking-tight">
                              {v.deger}
                            </dd>
                            <dd className="mt-0.5 text-[11px] leading-tight text-sis/70">
                              {v.etiket}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <span className="mt-7 flex items-center justify-between gap-3 rounded-full border border-white/10 py-2 pl-5 pr-2 text-sm font-semibold transition-colors duration-500 group-hover:bg-white/[0.06]">
                        Detaylar ve dökümanlar
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
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
                      </span>
                    </div>
                  </div>
                </Link>
              </Belirme>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————— Jev danışmanı ———————————————— */}
      <section id="danisman" className="px-4 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Belirme>
            <Danisman />
          </Belirme>
        </div>
      </section>
    </>
  );
}
