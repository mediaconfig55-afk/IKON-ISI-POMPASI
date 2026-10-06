import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { URUNLER, urunBul } from "@/data/urunler";
import { FIRMA } from "@/lib/iletisim";
import Sekmeler from "@/components/Sekmeler";
import Belirme from "@/components/Belirme";
import GirisAnimasyonu from "@/components/GirisAnimasyonu";
import {
  InstagramButonu,
  SabitIletisimCubugu,
  WhatsappButonu,
} from "@/components/IletisimButonlari";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return URUNLER.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const urun = urunBul(slug);
  if (!urun) return { title: "Ürün bulunamadı" };

  return {
    title: urun.ad,
    description: urun.ozet,
    openGraph: {
      title: `${urun.ad} · ${FIRMA.ad}`,
      description: urun.ozet,
      images: [{ url: urun.gorsel }],
    },
  };
}

export default async function UrunSayfasi({ params }: Props) {
  const { slug } = await params;
  const urun = urunBul(slug);
  if (!urun) notFound();

  const digerleri = URUNLER.filter((u) => u.slug !== urun.slug);

  return (
    <>
      {/* Ürünün kendi rengiyle boyanan, sayfaya sabit arka plan ışığı */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="orb absolute -right-32 top-[-5%] h-[36rem] w-[36rem] rounded-full blur-[90px]"
          style={{
            background: `radial-gradient(circle, ${urun.renk} 0%, transparent 70%)`,
          }}
        />
        <div
          className="orb absolute -left-40 bottom-[5%] h-[30rem] w-[30rem] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
      </div>

      {/* Ana sayfadaki 3D kartın devamı hissi: görsel öne doğru açılarak gelir */}
      <GirisAnimasyonu>
        <section className="px-4 pb-16 pt-32 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#urunler"
              className="group inline-flex items-center gap-2 text-sm text-sis transition-colors duration-500 hover:text-kir"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Tüm ürünler
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
              {/* Görsel — çift pervazlı kabuk */}
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white">
                  <Image
                    src={urun.gorsel}
                    alt={urun.ad}
                    width={800}
                    height={800}
                    priority
                    className="h-auto w-full object-contain p-10"
                  />
                </div>
                {urun.gorselAlt && (
                  <div className="mt-1.5 overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white">
                    <Image
                      src={urun.gorselAlt}
                      alt={`${urun.ad} ikinci görünüm`}
                      width={800}
                      height={640}
                      className="h-auto w-full object-contain p-10"
                    />
                  </div>
                )}
              </div>

              {/* Başlık + vitrin rakamları + iletişim */}
              <div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ background: `${urun.renk}1f`, color: urun.renk }}
                >
                  {urun.tip}
                </span>

                <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                  {urun.ad}
                </h1>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-sis/70">
                  {urun.etiket}
                </p>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-sis">
                  {urun.ozet}
                </p>

                <dl className="mt-10 grid grid-cols-3 gap-4">
                  {urun.vitrin.map((v) => (
                    <div
                      key={v.etiket}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-1.5"
                    >
                      <div className="rounded-[calc(1.25rem-0.375rem)] bg-kat px-4 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                        <dt className="sr-only">{v.etiket}</dt>
                        <dd className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {v.deger}
                        </dd>
                        <dd className="mt-1 text-[11px] leading-tight text-sis/70">
                          {v.etiket}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-1.5">
                  <div className="rounded-[calc(1.5rem-0.375rem)] bg-kat p-6">
                    <p className="text-sm font-semibold">
                      Bu ürün için hazır mesajınız dolu geliyor
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-sis">
                      Tıkladığınızda {urun.kisaAd} için hazırlanmış sorular otomatik
                      yazılır; boşlukları doldurup gönderin yeter.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <WhatsappButonu mesaj={urun.whatsappMesaji} />
                      <InstagramButonu mesaj={urun.instagramMesaji} />
                    </div>
                    <p className="mt-5 text-xs text-sis/60">
                      {FIRMA.yetkili} · {FIRMA.telefonGosterim} · {FIRMA.adresKisa}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GirisAnimasyonu>

      {/* ———————————————— 4 sekme ———————————————— */}
      <section className="px-4 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Belirme>
            <Sekmeler urun={urun} />
          </Belirme>

          <p className="mt-6 text-xs text-sis/50">
            Kaynak: <a href={urun.kaynak} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sis">nibe.com.tr</a>{" "}
            · Teknik tablolar ÜNTES | NIBE broşürlerinden alınmıştır.
          </p>
        </div>
      </section>

      {/* ———————————————— Diğer ürünler ———————————————— */}
      {/* pb-40: mobilde alttaki sabit iletişim çubuğu içeriği örtmesin */}
      <section className="px-4 pb-40 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight">Diğer sistemler</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {digerleri.map((d, i) => (
              <Belirme key={d.slug} gecikme={i * 70}>
                <Link
                  href={`/urun/${d.slug}`}
                  className="group block h-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-700 hover:border-white/25"
                >
                  <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-kuyu-2 p-5">
                    <div className="mb-5 aspect-square overflow-hidden rounded-[0.9rem] bg-white">
                      <Image
                        src={d.gorsel}
                        alt={d.ad}
                        width={400}
                        height={400}
                        className="h-full w-full object-contain p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-sis/70">
                      {d.tip}
                    </p>
                    <p className="mt-1 text-base font-semibold tracking-tight">
                      {d.kisaAd}
                    </p>
                  </div>
                </Link>
              </Belirme>
            ))}
          </div>
        </div>
      </section>

      <SabitIletisimCubugu mesaj={urun.whatsappMesaji} />
    </>
  );
}
