import Link from "next/link";
import { FIRMA } from "@/lib/iletisim";
import { URUNLER } from "@/data/urunler";

export default function Footer() {
  return (
    <footer
      id="iletisim"
      className="border-t border-white/[0.07] px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sis">
          İletişim
        </span>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {FIRMA.slogan}
            </h2>
            <p className="mt-4 text-sm text-sis">{FIRMA.yetkili}</p>
            <a
              href={FIRMA.haritaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block max-w-xs text-sm leading-relaxed text-sis transition-colors duration-500 hover:text-kir"
            >
              {FIRMA.adres}
            </a>
            <a
              href={`tel:${FIRMA.telefonTel}`}
              className="mt-6 block text-2xl font-semibold tracking-tight transition-colors duration-500 hover:text-buz"
            >
              {FIRMA.telefonGosterim}
            </a>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-sis/60">Ürünler</p>
            {URUNLER.map((u) => (
              <Link
                key={u.slug}
                href={`/urun/${u.slug}`}
                className="text-sm text-sis transition-colors duration-500 hover:text-kir"
              >
                {u.kisaAd}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-sis/60">Bize ulaşın</p>
            <a
              href={`https://wa.me/${FIRMA.telefonWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sis transition-colors duration-500 hover:text-kir"
            >
              WhatsApp
            </a>
            <a
              href={FIRMA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sis transition-colors duration-500 hover:text-kir"
            >
              Instagram · @{FIRMA.instagramKullanici}
            </a>
            <a
              href={FIRMA.haritaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sis transition-colors duration-500 hover:text-kir"
            >
              Haritada aç
            </a>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-xs text-sis/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {FIRMA.ad} · {FIRMA.adresKisa}
          </p>
          <p className="max-w-md sm:text-right">
            Ürün görselleri, teknik tablolar ve dökümanlar NIBE / ÜNTES'e aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}
