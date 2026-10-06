import type { MetadataRoute } from "next";
import { URUNLER } from "@/data/urunler";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikonklima.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    ...URUNLER.map((u) => ({
      url: `${SITE}/urun/${u.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
