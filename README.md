# İKON Klima — 3D Isı Pompası Satış Sitesi

NIBE hava kaynaklı ısı pompaları için 3D vitrinli satış sitesi.
Isıtma ve Soğutma Sistemleri · Mesut Kozan · Atakum / Samsun.

## Ne var?

- **3D vitrin (ana sayfa)** — React Three Fiber ile gerçek WebGL sahne. Dört ürün
  fotoğrafı derinlikte kademelenmiş kartlar olarak durur, fare hareketiyle eğilir.
  Bir karta tıklanınca (mobilde dokununca) kart kameraya uçar, diğerleri geri
  çekilip kararır; ikinci dokunuş ürün sayfasını açar.
- **Dört ürün sayfası**, her biri kaynak sitedeki gibi 4 sekmeli:
  Açıklama · Avantajları · Özellikleri · Dökümanlar. Her ürünün içeriği,
  teknik tablosu ve döküman listesi birbirinden farklıdır.
- **Ürüne özel hazır mesajlar** — WhatsApp bağlantısı o ürün için yazılmış
  soruları otomatik doldurur. Instagram DM metni URL ile doldurulamadığından
  taslak panoya kopyalanır ve profil açılır.
- **Akıllı Ürün Danışmanı (Jev)** — müşteri mahalini serbest metinle anlatır,
  TypeSafe'in System One modeli Jev tipli yargılar döner, uygun ürün ve gerekçesi
  gösterilir.

## Kurulum

```bash
npm install
cp .env.example .env.local   # anahtarları doldurun
npm run dev                  # http://localhost:3000
```

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
| --- | --- | --- |
| `TYPESAFE_API_KEY` | hayır | Jev danışmanı için. Boşsa danışman kural tabanlı yedek mantıkla çalışır, site kırılmaz. |
| `NEXT_PUBLIC_SITE_URL` | hayır | Canlı alan adı. `sitemap.xml`, `robots.txt` ve OpenGraph için kullanılır. |

## Vercel'e yayınlama

1. Projeyi bir Git deposuna gönderin.
2. Vercel → **New Project** → depoyu seçin. Next.js otomatik algılanır,
   ayar değiştirmenize gerek yok.
3. **Environment Variables** bölümüne `TYPESAFE_API_KEY` ve
   `NEXT_PUBLIC_SITE_URL` ekleyin.
4. Deploy.

Domain bağladıktan sonra `NEXT_PUBLIC_SITE_URL` değerini yeni alan adıyla
güncelleyip yeniden dağıtın — sitemap ve paylaşım görselleri buna bağlıdır.

## Danışman nasıl çalışır

`src/app/api/danisman/route.ts` tek bir istekte Jev'e dört bağımsız soru sorar:

| Soru | Primitif | Ne döner |
| --- | --- | --- |
| `urun` | choice | Dört üründen biri |
| `yuksekSicaklik` | noul | 55 °C üzeri gidiş suyu gerekiyor mu (0–1) |
| `sertIklim` | noul | Konum −20 °C altına iniyor mu (0–1) |
| `sogutma` | noul | Soğutma da isteniyor mu (0–1) |
| `kapasite` | score | Mahal büyüklüğü (4 kademe) |

Model yalnızca anlamsal yargıyı üretir; **karar politikası kodda kalır**. Örneğin
F2040 ve SPLIT −20 °C'de durduğundan, `sertIklim > 0.6` ise öneri kod tarafında
−25 °C'ye kadar çalışan S2125'e yükseltilir ve bu gerekçe kullanıcıya yazılır.

Anahtar yoksa veya Jev'e ulaşılamazsa `kuralTabanli()` devreye girer; yanıttaki
`kaynak` alanı hangisinin kullanıldığını söyler.

## İçerik kaynağı

Ürün metinleri, görselleri ve döküman bağlantıları
[nibe.com.tr](https://www.nibe.com.tr/urunler/isi-pompasi/hava-kaynakli-isi-pompasi/)
ürün sayfalarından alınmıştır. Kaynak sitede "Özellikleri" sekmeleri S2125 dışında
boş olduğundan, teknik tablolar ÜNTES | NIBE broşür PDF'lerinden (SPLIT AMS+HBS 05,
Monoblok F2040, İç Üniteler) ve NIBE S2125 teknik tablo görselinden aktarılmıştır.
Veriler `src/data/urunler.ts` dosyasında tek yerde toplanmıştır.

## İletişim bilgilerini değiştirme

Telefon, Instagram, adres ve genel mesaj taslağı: `src/lib/iletisim.ts`.
Ürüne özel mesaj taslakları: `src/data/urunler.ts` içinde her ürünün
`whatsappMesaji` ve `instagramMesaji` alanları.
