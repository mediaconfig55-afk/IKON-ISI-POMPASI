import { NextResponse } from "next/server";
import { URUNLER, type Urun } from "@/data/urunler";

export const runtime = "nodejs";

/**
 * Akıllı Ürün Danışmanı.
 *
 * Müşterinin serbest metinle anlattığı mahal bilgisini TypeSafe'in System One
 * modeli Jev'e tipli sorular olarak sorar; Jev metin üretmez, seçim/olasılık
 * döner. Karar mantığı (eşikler, gerekçe metni, mesaj taslağı) burada, kodda
 * kalır — model yalnızca anlamsal yargıyı sağlar.
 *
 * TYPESAFE_API_KEY tanımlı değilse kural tabanlı yedek kullanılır, böylece
 * anahtar eklenene kadar site tam çalışır.
 */

type Yanit = {
  slug: string;
  baslik: string;
  gerekce: string[];
  guven: number;
  kaynak: "jev" | "kural";
  whatsappMesaji: string;
  sinyaller: {
    yuksekSicaklik: number | null;
    sertIklim: number | null;
    sogutma: number | null;
    kapasite: number | null;
  };
};

const API_URL = "https://api.typesafe.ai/v1/systemone";

/** Jev'e gönderilen seçenek tanımları — her biri ürünün kullanım senaryosu. */
const SECENEKLER: Record<string, string> = {
  "nibe-s2125":
    "NIBE S2125 monoblok. Mevcut yüksek sıcaklıklı radyatör tesisatı olan, sert kış yaşanan veya en yüksek verim istenen mahaller. 75 °C'ye kadar gidiş suyu, −25 °C dış havada 65 °C. En geniş kapasite aralığı (8–20 kW).",
  "nibe-f2040":
    "NIBE F2040 monoblok. Yerden ısıtma veya düşük sıcaklıklı tesisatı olan, ılıman iklimdeki konutlar. 58 °C'ye kadar çıkış suyu, −20 °C'ye kadar çalışma, 6–16 kW. Dış mekânda tek gövde, iç mekânda soğutucu akışkan tesisatı gerekmez.",
  "nibe-split-ams-hbs-05":
    "NIBE SPLIT (AMS 10 + HBS 05). Dış ünite için yer kısıtı olan, dış üniteyi küçük tutmak isteyen veya mevcut split altyapısı bulunan mahaller. 58 °C'ye kadar çıkış suyu, −20 °C'ye kadar çalışma, 6–16 kW. İç mekânda küçük bir split kutusu gerektirir.",
  "nibe-vvm-s320":
    "NIBE VVM S320 iç ünite. Müşteri dış üniteden çok sıcak kullanım suyu, boyler, buffer tank veya sistemin iç mekân tarafını soruyorsa. 176 L boyler, 9 kW elektrikli ısıtıcı, dahili Wi-Fi.",
};

const KAPASITE_SEVIYELERI = [
  "Çok küçük mahal: yaklaşık 80 m² altı daire veya tek katlı küçük bir ev.",
  "Küçük–orta mahal: yaklaşık 80–140 m² daire veya müstakil ev.",
  "Orta–büyük mahal: yaklaşık 140–220 m² villa veya iki katlı ev.",
  "Büyük mahal: yaklaşık 220 m² üzeri villa, çok katlı yapı veya ticari alan.",
];

type JevYaniti = {
  answers: {
    urun?: { choice: string; confidence: number };
    yuksekSicaklik?: { noul: number };
    sertIklim?: { noul: number };
    sogutma?: { noul: number };
    kapasite?: { score: number; confidence: number };
  };
};

/** Çalışma sınırı −20 °C olan modeller; sert iklimde tek başlarına önerilmez. */
const DUSUK_SINIR = new Set(["nibe-f2040", "nibe-split-ams-hbs-05"]);

async function jevSor(talep: string, signal: AbortSignal): Promise<JevYaniti> {
  const istek = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TYPESAFE_API_KEY}`,
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({
      model: "jev-latest",
      state: {
        musteriTalebi: talep,
        baglam:
          "Bir ısı pompası bayisinin web sitesinde, müşteri mahalini serbest metinle anlatıyor. Amaç doğru NIBE ürününü önermek.",
      },
      questions: {
        // Bağımsız sorular — tek istekte paralel çalışır, birbirlerini görmezler.
        urun: {
          type: "choice",
          instructions:
            "`musteriTalebi` içinde anlatılan mahal ve ihtiyaç için hangi NIBE ürünü en uygun? Tesisat tipi (yerden ısıtma mı radyatör mü), iklim sertliği, yer kısıtı ve müşterinin asıl sorduğu konuyu dikkate al.",
          criteria: SECENEKLER,
        },
        yuksekSicaklik: {
          type: "noul",
          instructions:
            "`musteriTalebi`, 55 °C üzeri gidiş suyu sıcaklığı gerektiren bir tesisata işaret ediyor mu?",
          criteria: {
            true: "Mevcut klasik/panel radyatör tesisatı, eski kombi dönüşümü, yüksek sıcaklık ihtiyacı veya sert kış koşulları belirtilmiş.",
            false:
              "Yerden ısıtma, fancoil, düşük sıcaklıklı tesisat belirtilmiş veya tesisat tipi hakkında bilgi yok.",
          },
        },
        sertIklim: {
          type: "noul",
          instructions:
            "`musteriTalebi` içinde anlatılan konum, dış hava sıcaklığının −20 °C'nin altına düştüğü sert bir kış iklimine sahip mi?",
          criteria: {
            true: "Doğu Anadolu veya İç Anadolu'nun yüksek rakımlı illeri (Erzurum, Kars, Ardahan, Ağrı, Sivas, Van, Erzincan, Yozgat gibi), yayla/dağ yerleşimi veya −20 °C altı sıcaklıkların açıkça belirtilmesi.",
            false:
              "Kıyı bölgeleri, ılıman iklim, Marmara/Ege/Akdeniz/Karadeniz illeri veya konum hakkında bilgi verilmemesi.",
          },
        },
        sogutma: {
          type: "noul",
          instructions:
            "`musteriTalebi` ısıtmanın yanında soğutma/klima ihtiyacını da belirtiyor mu?",
          criteria: {
            true: "Soğutma, klima, yazın serinletme veya yıl boyu iklimlendirme açıkça isteniyor.",
            false: "Yalnızca ısıtma ve/veya sıcak su ihtiyacından söz ediliyor.",
          },
        },
        kapasite: {
          type: "score",
          instructions:
            "`musteriTalebi` içinde anlatılan mahalin büyüklüğü hangi aralığa giriyor? Metrekare verilmemişse ev tipi ve oda sayısı gibi ipuçlarından tahmin et.",
          criteria: KAPASITE_SEVIYELERI,
        },
      },
    }),
  });

  if (!istek.ok) {
    const govde = await istek.text().catch(() => "");
    throw new Error(`TypeSafe ${istek.status}: ${govde.slice(0, 300)}`);
  }
  return (await istek.json()) as JevYaniti;
}

/** Anahtar yokken veya Jev'e ulaşılamadığında çalışan kural tabanlı yedek. */
function kuralTabanli(talep: string) {
  const t = talep.toLocaleLowerCase("tr-TR");
  const gecer = (...k: string[]) => k.some((x) => t.includes(x));

  const radyator = gecer("radyatör", "radyator", "petek", "kombi");
  const yerden = gecer("yerden", "döşemeden", "dosemeden");
  const sogutma = gecer("soğut", "sogut", "klima", "serinle");
  const icUnite = gecer("boyler", "sıcak su", "sicak su", "iç ünite", "ic unite", "tank");
  const yerKisiti = gecer("yer yok", "balkon", "dar", "yer kısıt", "yer kisit", "site yönetimi");
  const soguk = gecer(
    "erzurum",
    "kars",
    "ardahan",
    "sivas",
    "ağrı",
    "agri",
    "van",
    "erzincan",
    "yozgat",
    "soğuk iklim",
    "sert kış",
    "sert kis",
  );

  const m2 = /(\d{2,4})\s*m\s*2|(\d{2,4})\s*m²|(\d{2,4})\s*metrekare/.exec(t);
  const metrekare = m2 ? Number(m2[1] ?? m2[2] ?? m2[3]) : null;
  const kapasite =
    metrekare === null ? 1 : metrekare < 80 ? 0 : metrekare < 140 ? 1 : metrekare < 220 ? 2 : 3;

  let slug = "nibe-f2040";
  if (icUnite && !radyator && !yerden) slug = "nibe-vvm-s320";
  else if (radyator || soguk || kapasite >= 3) slug = "nibe-s2125";
  else if (yerKisiti) slug = "nibe-split-ams-hbs-05";

  return {
    slug,
    yuksekSicaklik: radyator ? 0.8 : 0.2,
    sertIklim: soguk ? 0.8 : 0.2,
    sogutma: sogutma ? 0.85 : 0.2,
    kapasite,
    guven: 0.45,
  };
}

function gerekceUret(
  urun: Urun,
  s: Yanit["sinyaller"],
  iklimNedeniyleDegisti: boolean,
): string[] {
  const g: string[] = [];

  if (iklimNedeniyleDegisti) {
    g.push(
      "Konumunuzda dış hava −20 °C'nin altına inebiliyor; F2040 ve SPLIT bu sınırda durduğu için −25 °C'ye kadar çalışan S2125'e yönlendirdik.",
    );
  }

  if (s.kapasite !== null) {
    const seviye = Math.round(s.kapasite);
    g.push(
      `Anlattığınız mahal ${KAPASITE_SEVIYELERI[Math.min(3, Math.max(0, seviye))]
        .split(":")[1]
        .trim()
        .replace(/\.$/, "")} aralığına giriyor.`,
    );
  }

  if (s.yuksekSicaklik !== null && s.yuksekSicaklik > 0.6) {
    g.push(
      urun.slug === "nibe-s2125"
        ? "Yüksek gidiş suyu sıcaklığı ihtiyacınız var; S2125 75 °C'ye kadar çıkabildiği için mevcut radyatörlerinizi değiştirmeden çalışabilir."
        : "Yüksek sıcaklık ihtiyacınız olabilir — bu modelin 58 °C sınırı tesisatınıza yetmezse S2125'e de bakmakta fayda var.",
    );
  } else if (s.yuksekSicaklik !== null && s.yuksekSicaklik < 0.4) {
    g.push(
      "Düşük sıcaklıklı tesisat (yerden ısıtma / fancoil) bu modelin en verimli çalıştığı senaryo.",
    );
  }

  if (s.sogutma !== null && s.sogutma > 0.6) {
    g.push(
      urun.slug === "nibe-vvm-s320"
        ? "Soğutma dış ünite tarafından sağlanır; iç üniteyi uygun bir dış ünite ile eşleştirmemiz gerekir."
        : "Soğutma da istediğiniz için bu modelin aktif soğutma fonksiyonu işinizi görür.",
    );
  }

  if (urun.slug === "nibe-split-ams-hbs-05") {
    g.push("Dış ünite kompakt kalır, iç mekânda yalnızca küçük bir split kutusu yer kaplar.");
  }
  if (urun.slug === "nibe-vvm-s320") {
    g.push("176 L boyler ve 9 kW elektrikli ısıtıcı ile sıcak su tarafını tek kabinde toplar.");
  }

  g.push(
    `Kesin model seçimi (${urun.teknik.modeller.slice(0, 3).join(" / ")}…) yerinde ısı kaybı hesabıyla netleşir.`,
  );
  return g;
}

export async function POST(request: Request) {
  let talep = "";
  try {
    const govde = (await request.json()) as { talep?: unknown };
    talep = typeof govde.talep === "string" ? govde.talep.trim().slice(0, 1200) : "";
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  if (talep.length < 8) {
    return NextResponse.json(
      { hata: "Lütfen mahaliniz hakkında biraz daha bilgi yazın (en az birkaç kelime)." },
      { status: 422 },
    );
  }

  let slug: string;
  let guven: number;
  let kaynak: Yanit["kaynak"] = "kural";
  let sinyaller: Yanit["sinyaller"] = {
    yuksekSicaklik: null,
    sertIklim: null,
    sogutma: null,
    kapasite: null,
  };

  if (process.env.TYPESAFE_API_KEY) {
    const kontrol = AbortSignal.timeout(15_000);
    try {
      const jev = await jevSor(talep, kontrol);
      const secim = jev.answers.urun;
      if (!secim || !URUNLER.some((u) => u.slug === secim.choice)) {
        throw new Error("Jev tanınmayan bir seçenek döndürdü.");
      }
      slug = secim.choice;
      guven = secim.confidence;
      kaynak = "jev";
      sinyaller = {
        yuksekSicaklik: jev.answers.yuksekSicaklik?.noul ?? null,
        sertIklim: jev.answers.sertIklim?.noul ?? null,
        sogutma: jev.answers.sogutma?.noul ?? null,
        kapasite: jev.answers.kapasite?.score ?? null,
      };
    } catch (e) {
      // Jev'e ulaşılamadı: sessizce düşmek yerine yedeğe geçip bunu kaydediyoruz.
      console.error("[danisman] Jev isteği başarısız, kural tabanlı yedeğe geçildi:", e);
      const y = kuralTabanli(talep);
      slug = y.slug;
      guven = y.guven;
      sinyaller = {
        yuksekSicaklik: y.yuksekSicaklik,
        sertIklim: y.sertIklim,
        sogutma: y.sogutma,
        kapasite: y.kapasite,
      };
    }
  } else {
    const y = kuralTabanli(talep);
    slug = y.slug;
    guven = y.guven;
    sinyaller = {
      yuksekSicaklik: y.yuksekSicaklik,
      sertIklim: y.sertIklim,
      sogutma: y.sogutma,
      kapasite: y.kapasite,
    };
  }

  /**
   * Politika kodda kalır: F2040 ve SPLIT −20 °C'de durur. Jev konumu sert iklim
   * olarak işaretlediyse bu modeller tek başına yetmez, S2125'e yükseltilir.
   */
  const iklimNedeniyleDegisti =
    (sinyaller.sertIklim ?? 0) > 0.6 && DUSUK_SINIR.has(slug);
  if (iklimNedeniyleDegisti) slug = "nibe-s2125";

  const urun = URUNLER.find((u) => u.slug === slug)!;

  const yanit: Yanit = {
    slug: urun.slug,
    baslik: urun.ad,
    gerekce: gerekceUret(urun, sinyaller, iklimNedeniyleDegisti),
    guven,
    kaynak,
    whatsappMesaji:
      `Merhaba, İKON Klima sitesindeki danışmandan yazıyorum. ${urun.kisaAd} önerildi.\n\n` +
      `Mahalim hakkında anlattıklarım:\n"${talep}"\n\n` +
      `Bu ürünün bana uygunluğunu, kapasite seçimini ve montaj dahil fiyatı öğrenmek istiyorum. Teşekkürler.`,
    sinyaller,
  };

  return NextResponse.json(yanit);
}
