/**
 * Ürün verisi — nibe.com.tr ürün sayfalarından alınmıştır.
 * Teknik tablolar ÜNTES|NIBE broşürlerinden (PDF) ve NIBE S2125 teknik tablo
 * görselinden birebir aktarılmıştır; kaynak sitede "Özellikleri" sekmeleri boştur.
 */

export type TeknikTablo = {
  baslik: string;
  /** Sütun başlıkları (ilk sütun özellik adı olduğu için burada yer almaz) */
  modeller: string[];
  satirlar: {
    ozellik: string;
    birim?: string;
    /** Tek değer tüm modelleri kapsar; dizi uzunluğu modeller ile eşleşir */
    degerler: string | string[];
  }[];
  dipnotlar?: string[];
};

export type Dokuman = {
  ad: string;
  url: string;
  tur: "brosur" | "katalog" | "montaj" | "kullanim" | "sema";
};

export type Avantaj = {
  baslik: string;
  metin: string;
};

export type Urun = {
  slug: string;
  ad: string;
  kisaAd: string;
  tip: "Monoblok" | "Split" | "İç Ünite";
  etiket: string;
  ozet: string;
  gorsel: string;
  gorselAlt?: string;
  /** 3D sahnede kartın vurgu rengi */
  renk: string;
  /** Kart üzerinde gösterilen 3 anahtar rakam */
  vitrin: { deger: string; etiket: string }[];
  aciklama: string[];
  avantajlar: Avantaj[];
  teknik: TeknikTablo;
  teknikGorsel?: string;
  dokumanlar: Dokuman[];
  /** WhatsApp için ürüne özel hazır mesaj taslağı */
  whatsappMesaji: string;
  /** Instagram DM için ürüne özel hazır mesaj taslağı */
  instagramMesaji: string;
  kaynak: string;
};

const KATALOG =
  "https://drive.google.com/file/d/1WngC9008BJKrSduegE7MRUCCU-fG_Axd/view?usp=share_link";

export const URUNLER: Urun[] = [
  {
    slug: "nibe-split-ams-hbs-05",
    ad: "NIBE SPLIT Isı Pompası (AMS 10 + HBS 05)",
    kisaAd: "NIBE SPLIT",
    tip: "Split",
    etiket: "Inverter kontrollü · Havadan suya",
    ozet:
      "Dış ünite AMS 10, iç mekândaki HBS 05 split kutusuna soğutucu akışkan borularıyla bağlanır. −20 °C'ye kadar yüksek kapasite, 58 °C'ye kadar çıkış suyu.",
    gorsel: "/urunler/nibe-split.jpg",
    renk: "#38bdf8",
    vitrin: [
      { deger: "58 °C", etiket: "Çıkış suyu" },
      { deger: "−20 °C", etiket: "Çalışma sınırı" },
      { deger: "A+++", etiket: "Enerji sınıfı 35 °C" },
    ],
    aciklama: [
      "NIBE SPLIT, akıllı ve kompakt bir inverter kontrollü havadan suya ısı pompasıdır. AMS serisi dış ünite, soğutucu akışkan borularıyla iç mekânda bulunan NIBE HBS split kutusuna bağlanır.",
      "NIBE SPLIT ısı pompası tüm yıl boyunca mahalin ihtiyaçlarına otomatik olarak uyum sağladığından optimum tasarruf sağlar. −20 °C'lik bir dış ortam sıcaklığına kadar sorunsuz bir şekilde çalışır ve aynı zamanda 58 °C'ye kadar çıkış suyu sıcaklığı sağlar.",
      "Yüksek soğutma performansı sayesinde ısı pompası, yüksek dış ortam sıcaklıklarında bile konforlu bir iç mekân iklimi sağlamasına olanak tanır. Akıllı teknoloji sayesinde ürün, enerji tüketiminizi kontrol etmenizi sağlar ve evinizin önemli parçalarından biri hâline gelir.",
      "Verimli kontrol sistemi sayesinde, maksimum konfor için iç ortam iklimini otomatik olarak ayarlar ve bu sayede doğaya minimum düzeyde CO₂ emisyonu gerçekleşir.",
    ],
    avantajlar: [
      {
        baslik: "Akıllı Teknoloji",
        metin: "Kompakt yapısı sayesinde evinizin gereksinimlerine uyum sağlar.",
      },
      {
        baslik: "Güçlü Tasarım",
        metin: "−20 °C'ye kadar yüksek kapasite ve etkili soğutma işlevi.",
      },
      {
        baslik: "Daha Basit Bir Yaşam",
        metin: "Kullanıcı dostu kontrol ile enerji tasarrufu sağlayan akıllı teknoloji.",
      },
    ],
    teknik: {
      baslik: "NIBE SPLIT",
      modeller: [
        "AMS 10-6 / HBS 05-6",
        "AMS 10-8 / HBS 05-12",
        "AMS 10-12 / HBS 05-12",
        "AMS 10-16 / HBS 05-16",
      ],
      satirlar: [
        { ozellik: "Enerji Sınıfı — Sistem (35/55 °C)", degerler: "A+++ / A++" },
        { ozellik: "Enerji Sınıfı — Ünite (35/55 °C)", degerler: "A++ / A++" },
        {
          ozellik: "Nominal Isıtma Kapasitesi (7/35 °C, ΔT=5 °C)",
          birim: "kW",
          degerler: ["6,5", "9,4", "12,6", "17,1"],
        },
        {
          ozellik: "Nominal Isıtma Kapasitesi (7/55 °C, ΔT=10 °C)",
          birim: "kW",
          degerler: ["7", "8,9", "12", "16,2"],
        },
        {
          ozellik: "SCOP EN14825 Ortalama İklim Şartları (35 / 55 °C) ①",
          degerler: ["4.8 / 3.5", "4.4 / 3.3", "4.4 / 3.4", "4.5 / 3.4"],
        },
        {
          ozellik: "SCOP EN14825 Soğuk İklim Şartları (35 / 55 °C) ②",
          degerler: ["3.7 / 3.0", "3.6 / 2.8", "3.6 / 2.9", "3.7 / 2.9"],
        },
        {
          ozellik: "COP EN14825 (7/35 °C, ΔT=5 °C)",
          degerler: ["5,32", "4,65", "4,78", "4,85"],
        },
        {
          ozellik: "Nominal Soğutma Kapasitesi (27/18 °C)",
          birim: "kW",
          degerler: ["7,98", "11,2", "11,7", "17,7"],
        },
        {
          ozellik: "Nominal Soğutma Kapasitesi (35/7 °C)",
          birim: "kW",
          degerler: ["4,86", "7,1", "9,45", "13,04"],
        },
        { ozellik: "EER (27/18 °C)", degerler: ["4,52", "3,5", "3,52", "3,91"] },
        { ozellik: "EER (35/7 °C)", degerler: ["2,61", "2,68", "2,77", "2,88"] },
        {
          ozellik: "Ses Gücü Seviyesi (LWA) EN12102 (7 / 45 °C, nominal)",
          birim: "dB(A)",
          degerler: ["51", "55", "58", "62"],
        },
        { ozellik: "Güç Beslemesi", degerler: "230 V ~50 Hz" },
        {
          ozellik: "CO₂ Emisyonu",
          birim: "ton",
          degerler: ["3.13", "5.32", "6.06", "8.35"],
        },
        {
          ozellik: "Yükseklik / Genişlik / Derinlik — AMS 10",
          birim: "mm",
          degerler: [
            "640 / 800 / 290",
            "750 / 880 / 340",
            "845 / 970 / 370",
            "1.300 / 970 / 370",
          ],
        },
        {
          ozellik: "Yükseklik (Boru ile) / Genişlik / Derinlik — HBS 05",
          birim: "mm",
          degerler: [
            "565 / 404 / 472",
            "565 / 404 / 472",
            "565 / 404 / 472",
            "565 / 404 / 472",
          ],
        },
        {
          ozellik: "Ağırlık (Paketsiz) AMS 10 / HBS 05",
          birim: "kg",
          degerler: ["46 / 13", "60 / 15", "74 / 15", "105 / 19.5"],
        },
      ],
      dipnotlar: [
        "Defrost süreçleri göz önüne alınmıştır.",
        "① Ortalama iklim şartları −7 °C.",
        "② Soğuk iklim şartları −15 °C.",
      ],
    },
    dokumanlar: [
      {
        ad: "Broşür",
        url: "https://nibe.com.tr/wp-content/uploads/2021/04/Split-AMS-HBS-05.pdf",
        tur: "brosur",
      },
      { ad: "Katalog", url: KATALOG, tur: "katalog" },
      {
        ad: "AMS 10 Montaj Kılavuzu",
        url: "https://www.nibe.eu/assets/documents/25693/331942-4.pdf",
        tur: "montaj",
      },
      {
        ad: "HBS 05 Montaj Kılavuzu",
        url: "https://www.nibe.eu/assets/documents/25378/331901-2.pdf",
        tur: "montaj",
      },
      {
        ad: "AMS 10 Kullanım Kılavuzu",
        url: "https://www.nibe.eu/assets/documents/25303/331961-2.pdf",
        tur: "kullanim",
      },
      {
        ad: "HBS 05 Kullanım Kılavuzu",
        url: "https://www.nibe.eu/assets/documents/25400/331921-2.pdf",
        tur: "kullanim",
      },
      {
        ad: "Örnek Tesisat Şemaları",
        url: "https://partner.nibe.eu/For-partners/docking11/NIBE-SPLIT/Dockings/",
        tur: "sema",
      },
    ],
    whatsappMesaji:
      "Merhaba, İKON Klima sitesinden yazıyorum. NIBE SPLIT (AMS 10 + HBS 05) ısı pompası hakkında bilgi almak istiyorum.\n\nÖğrenmek istediklerim:\n• Hangi kapasite bana uygun (AMS 10-6 / 10-8 / 10-12 / 10-16)?\n• Split kutusu (HBS 05) için iç mekânda ne kadar yer gerekiyor?\n• Anahtar teslim montaj dahil fiyat ve ödeme seçenekleri\n\nMahalim hakkında: ___ m², ___ (yerden ısıtma / radyatör / fancoil), ___ (il/ilçe)\n\nTeşekkürler.",
    instagramMesaji:
      "Merhaba! Sitenizden NIBE SPLIT (AMS 10 + HBS 05) ısı pompasını inceledim. Uygun kapasite, montaj koşulları ve fiyat hakkında bilgi alabilir miyim? Mahalim: ___ m², ___ (yerden ısıtma / radyatör).",
    kaynak: "https://www.nibe.com.tr/product/nibe-split-isi-pompasi/",
  },

  {
    slug: "nibe-s2125",
    ad: "NIBE S2125 Hava Kaynaklı Isı Pompası",
    kisaAd: "NIBE S2125",
    tip: "Monoblok",
    etiket: "Yüksek sıcaklık · Wi-Fi · Doğal soğutucu akışkan",
    ozet:
      "75 °C'ye kadar gidiş suyu sıcaklığı, −25 °C dış havada 65 °C performans. Doğal soğutucu akışkanlı, dahili Wi-Fi'lı amiral gemisi model.",
    gorsel: "/urunler/nibe-s2125.jpg",
    gorselAlt: "/urunler/nibe-s2125-alt.jpg",
    renk: "#34d399",
    vitrin: [
      { deger: "75 °C", etiket: "Gidiş suyu" },
      { deger: "−25 °C", etiket: "65 °C'de çalışır" },
      { deger: "5,33", etiket: "SCOP (35 °C)" },
    ],
    aciklama: [
      "NIBE S2125, inverter kontrollü akıllı bir hava kaynaklı ısı pompasıdır. NIBE iç üniteleri ile birlikte kullanıldığında, konutlar için yüksek verimli bir iklimlendirme sistemi oluşturur.",
      "Doğal soğutucu akışkan kullanan sistem, çevre ve iklim üzerindeki etkisini en aza indirerek sürdürülebilir bir çözüm sunar. Akıllı kontrol sayesinde konutun anlık ısıtma ihtiyacına otomatik uyum sağlar.",
      "Yüksek mevsimsel verimliliğe sahip sistem, düşük işletme maliyetleriyle yüksek performanslı ısıtma ve sıcak su üretimi sağlar. Geniş çalışma aralığında 75 °C'ye kadar gidiş suyu sıcaklığı sunarken, −25 °C dış hava sıcaklığında 65 °C'ye kadar performans gösterir.",
      "Wi-Fi bağlantısı ve kablosuz aksesuar desteği akıllı ev sistemleriyle entegrasyona olanak tanır.",
    ],
    avantajlar: [
      {
        baslik: "Akıllı Teknoloji",
        metin: "Kompakt yapısı sayesinde evinizin gereksinimlerine uyum sağlar.",
      },
      {
        baslik: "Güçlü Tasarım",
        metin:
          "75 °C'ye kadar gidiş suyu sıcaklığı ve −25 °C dış hava sıcaklığında 65 °C'ye kadar yüksek sıcaklık performansı.",
      },
      {
        baslik: "Daha Basit Bir Yaşam",
        metin: "Kullanıcı dostu kontrol ile enerji tasarrufu sağlayan akıllı teknoloji.",
      },
    ],
    teknik: {
      baslik: "NIBE S2125 Teknik Özellikler",
      modeller: ["S2125-8", "S2125-12", "S2125-14", "S2125-16", "S2125-20"],
      satirlar: [
        {
          ozellik: "Ürün Enerji Verimliliği Sınıfı 35/55 °C ①",
          degerler: [
            "A+++ / A++",
            "A+++ / A+++",
            "A+++ / A+++",
            "A+++ / A+++",
            "A+++ / A+++",
          ],
        },
        {
          ozellik: "Sistem Enerji Verimliliği Sınıfı (Mahal Isıtma) 35/55 °C ②",
          degerler: "A+++ / A+++",
        },
        {
          ozellik: "SCOP EN14825 ortalama iklim, 35/55 °C",
          degerler: [
            "5,00 / 3,70",
            "5,00 / 3,80",
            "5,27 / 4,06",
            "5,33 / 4,08",
            "5,30 / 4,08",
          ],
        },
        {
          ozellik: "P designh ortalama iklim 35/55 °C",
          birim: "kW",
          degerler: [
            "5,33 / 5,30",
            "6,80 / 7,60",
            "11,00 / 11,00",
            "11,00 / 11,00",
            "11,00 / 11,00",
          ],
        },
        {
          ozellik: "SCOP EN14825 soğuk iklim, 35/55 °C",
          degerler: [
            "4,10 / 3,20",
            "4,20 / 3,40",
            "4,37 / 3,57",
            "4,47 / 3,58",
            "4,61 / 3,69",
          ],
        },
        {
          ozellik: "P designh soğuk iklim 35/55 °C",
          birim: "kW",
          degerler: [
            "5,4 / 5,2",
            "8,4 / 8,4",
            "13,00 / 14,00",
            "13,00 / 14,00",
            "13,00 / 14,00",
          ],
        },
        {
          ozellik: "7/35 Isıtma Kapasitesi / COP, EN14511, nominal",
          birim: "kW",
          degerler: [
            "3,15 / 5,16",
            "3,67 / 5,24",
            "5,10 / 0,92 / 5,55",
            "5,10 / 0,92 / 5,55",
            "5,10 / 0,92 / 5,55",
          ],
        },
        {
          ozellik: "Ses Seviyesi (LWA), EN12102 at 7/45, nominal",
          birim: "dB(A)",
          degerler: ["49", "55", "55", "55", "55"],
        },
        {
          ozellik: "Nominal Gerilim",
          degerler: [
            "230 V – 50 Hz / 400 V 3N – 50 Hz",
            "230 V – 50 Hz / 400 V 3N – 50 Hz",
            "400 V 3N – 50 Hz",
            "230 V – 50 Hz / 400 V 3N – 50 Hz",
            "230 V – 50 Hz / 400 V 3N – 50 Hz",
          ],
        },
        {
          ozellik: "CO₂ Eşdeğer (Hermetik Olarak Sızdırmaz Soğutucu Akışkan Devresi) ③",
          birim: "ton",
          degerler: ["0,0024", "0,0024", "0,00345", "0,00345", "0,00345"],
        },
        {
          ozellik: "Yükseklik / Genişlik / Derinlik",
          birim: "mm",
          degerler: [
            "1070 / 1130 / 820",
            "1070 / 1130 / 820",
            "1180 / 1278 / 831",
            "1180 / 1278 / 831",
            "1180 / 1278 / 831",
          ],
        },
        {
          ozellik: "Ağırlık (ambalaj hariç)",
          birim: "kg",
          degerler: ["179", "179", "215", "215", "215"],
        },
      ],
      dipnotlar: [
        "① Ürün enerji verimliliği sınıfı ölçeği (Mahal Isıtma): A+++ – D.",
        "② Sistem enerji verimliliği sınıfı ölçeği (Mahal Isıtma): A+++ – G. Belirtilen sistem enerji verimliliği değeri, ürünün sıcaklık kontrol cihazını (oda termostatını) da içermektedir.",
        "③ NIBE S2125, F-Gaz Yönetmeliği kapsamında yıllık periyodik kontrol gerektirmez.",
      ],
    },
    teknikGorsel: "/urunler/s2125-teknik-tablo.png",
    dokumanlar: [
      {
        ad: "Broşür",
        url: "https://nibe.com.tr/wp-content/uploads/2021/04/Monoblok-F2120.pdf",
        tur: "brosur",
      },
      { ad: "Katalog", url: KATALOG, tur: "katalog" },
      {
        ad: "Montaj Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/29492/M12712-1.pdf",
        tur: "montaj",
      },
      {
        ad: "Kullanım Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/29493/M12713_1.pdf",
        tur: "kullanim",
      },
      {
        ad: "Örnek Tesisat Şemaları",
        url: "https://partner.nibe.eu/For-partners/docking11/NIBE-F2040/Dockings/",
        tur: "sema",
      },
    ],
    whatsappMesaji:
      "Merhaba, İKON Klima sitesinden yazıyorum. NIBE S2125 hava kaynaklı ısı pompası hakkında bilgi almak istiyorum.\n\nÖğrenmek istediklerim:\n• Mahalim için hangi model uygun (S2125-8 / 12 / 14 / 16 / 20)?\n• Mevcut radyatör tesisatımla 65–75 °C yüksek sıcaklık çalışması mümkün mü?\n• Hangi iç ünite ile eşleştirmelisiniz (VVM S320 / VVM 310 vb.)?\n• Montaj dahil fiyat ve teslim süresi\n\nMahalim hakkında: ___ m², ___ (yerden ısıtma / radyatör / fancoil), ___ (il/ilçe)\n\nTeşekkürler.",
    instagramMesaji:
      "Merhaba! NIBE S2125'i sitenizden inceledim. Yüksek sıcaklık performansı mevcut radyatörlerimle uyumlu mu, hangi model ve iç ünite önerirsiniz? Mahalim: ___ m², ___ (yerden ısıtma / radyatör).",
    kaynak: "https://www.nibe.com.tr/product/nibe-f2120-monoblok-isi-pompasi-65-c/",
  },

  {
    slug: "nibe-f2040",
    ad: "NIBE F2040 Monoblok Isı Pompası",
    kisaAd: "NIBE F2040",
    tip: "Monoblok",
    etiket: "Monoblok · Inverter kontrollü",
    ozet:
      "Tek gövdeli monoblok çözüm. −20 °C ile +43 °C arasında çalışır, 58 °C'ye kadar sıcak su sağlar; iç mekânda soğutucu akışkan tesisatı gerektirmez.",
    gorsel: "/urunler/nibe-f2040.jpg",
    renk: "#f59e0b",
    vitrin: [
      { deger: "58 °C", etiket: "Çıkış suyu" },
      { deger: "17,1 kW", etiket: "Maks. ısıtma" },
      { deger: "50 dB(A)", etiket: "En sessiz model" },
    ],
    aciklama: [
      "NIBE F2040 MONOBLOK, akıllı ve kompakt bir inverter kontrollü havadan suya ısı pompasıdır. NIBE F2040 MONOBLOK ısı pompası tüm yıl boyunca mahalin ihtiyaçlarına otomatik olarak uyum sağladığından optimum tasarruf sağlar.",
      "NIBE F2040 MONOBLOK ısı pompaları, −20 °C'lik bir dış ortam sıcaklığına kadar sorunsuz bir şekilde çalışır ve aynı zamanda 58 °C'ye kadar çıkış suyu sıcaklığı sağlar.",
      "Yüksek soğutma performansı sayesinde ısı pompası, yüksek dış ortam sıcaklıklarında bile konforlu bir iç mekân iklimi sağlamasına olanak tanır. Akıllı teknoloji sayesinde ürün, enerji tüketiminizi kontrol etmenizi sağlar ve evinizin önemli parçalarından biri hâline gelir.",
      "Verimli kontrol sistemi sayesinde, maksimum konfor için iç ortam iklimini otomatik olarak ayarlar ve bu sayede doğaya minimum düzeyde CO₂ emisyonu gerçekleşir.",
    ],
    avantajlar: [
      {
        baslik: "Akıllı Teknoloji",
        metin: "Kompakt yapısı sayesinde evinizin gereksinimlerine uyum sağlar.",
      },
      {
        baslik: "Güçlü Tasarım",
        metin: "−20 °C'ye kadar yüksek kapasite ve etkili soğutma işlevi.",
      },
      {
        baslik: "Daha Basit Bir Yaşam",
        metin: "Kullanıcı dostu kontrol ile enerji tasarrufu sağlayan akıllı teknoloji.",
      },
    ],
    teknik: {
      baslik: "NIBE F2040",
      modeller: ["F2040-6", "F2040-8", "F2040-12", "F2040-16"],
      satirlar: [
        { ozellik: "Enerji Sınıfı — Sistem (35/55 °C)", degerler: "A+++ / A++" },
        { ozellik: "Enerji Sınıfı — Ünite (35/55 °C)", degerler: "A++ / A++" },
        {
          ozellik: "Nominal Isıtma Kapasitesi (7/35 °C, ΔT=5 °C)",
          birim: "kW",
          degerler: ["6,5", "9,4", "12,6", "17,1"],
        },
        {
          ozellik: "Nominal Isıtma Kapasitesi (7/55 °C, ΔT=10 °C)",
          birim: "kW",
          degerler: ["7", "8,9", "12", "16,2"],
        },
        {
          ozellik: "SCOP EN14825 Ortalama İklim Şartları (35/55 °C) ①",
          degerler: ["4.8 / 3.5", "4.4 / 3.3", "4.4 / 3.4", "4.5 / 3.4"],
        },
        {
          ozellik: "SCOP EN14825 Soğuk İklim Şartları (35/55 °C) ②",
          degerler: ["3.7 / 3.0", "3.6 / 2.8", "3.6 / 2.9", "3.7 / 2.9"],
        },
        {
          ozellik: "COP EN14825 (7/35 °C, ΔT=5 °C)",
          degerler: ["5,32", "4,65", "4,78", "4,85"],
        },
        {
          ozellik: "Nominal Soğutma Kapasitesi (27/18 °C)",
          birim: "kW",
          degerler: ["7,98", "11,2", "11,7", "17,7"],
        },
        {
          ozellik: "Nominal Soğutma Kapasitesi (35/7 °C)",
          birim: "kW",
          degerler: ["4,86", "7,1", "9,45", "13,04"],
        },
        { ozellik: "EER (27/18 °C)", degerler: ["4,52", "3,5", "3,52", "3,91"] },
        { ozellik: "EER (35/7 °C)", degerler: ["2,61", "2,68", "2,77", "2,88"] },
        {
          ozellik: "Ses Gücü Seviyesi (LWA) EN12102 (7 / 45 °C, nominal)",
          birim: "dB(A)",
          degerler: ["50", "54", "57", "61"],
        },
        {
          ozellik: "Güç Beslemesi",
          birim: "V",
          degerler: "230 V 50 Hz, 230 V 2AC 50 Hz",
        },
        {
          ozellik: "CO₂ Emisyonu",
          birim: "ton",
          degerler: ["3.13", "5.32", "6.06", "8.35"],
        },
        {
          ozellik: "Yükseklik / Genişlik / Derinlik",
          birim: "mm",
          degerler: [
            "791 / 993 / 364",
            "895 / 1.035 / 422",
            "995 / 1.145 / 452",
            "1.450 / 1.145 / 452",
          ],
        },
        {
          ozellik: "Ağırlık (Paketsiz)",
          birim: "kg",
          degerler: ["66", "90", "105", "135"],
        },
      ],
      dipnotlar: [
        "Defrost süreçleri göz önüne alınmıştır.",
        "① Ortalama iklim şartları −7 °C.",
        "② Soğuk iklim şartları −15 °C.",
      ],
    },
    dokumanlar: [
      {
        ad: "Broşür",
        url: "https://nibe.com.tr/wp-content/uploads/2021/04/Monoblok-F2040.pdf",
        tur: "brosur",
      },
      { ad: "Katalog", url: KATALOG, tur: "katalog" },
      {
        ad: "Montaj Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/25738/231844-8.pdf",
        tur: "montaj",
      },
      {
        ad: "Kullanım Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/25358/231845-5.pdf",
        tur: "kullanim",
      },
      {
        ad: "Örnek Tesisat Şemaları",
        url: "https://partner.nibe.eu/For-partners/docking11/NIBE-F2040/Dockings/",
        tur: "sema",
      },
    ],
    whatsappMesaji:
      "Merhaba, İKON Klima sitesinden yazıyorum. NIBE F2040 monoblok ısı pompası hakkında bilgi almak istiyorum.\n\nÖğrenmek istediklerim:\n• Mahalime hangi kapasite uygun (F2040-6 / 8 / 12 / 16)?\n• Monoblok olduğu için iç mekânda nasıl bir bağlantı gerekiyor?\n• Montaj dahil fiyat, garanti ve teslim süresi\n\nMahalim hakkında: ___ m², ___ (yerden ısıtma / radyatör / fancoil), ___ (il/ilçe)\n\nTeşekkürler.",
    instagramMesaji:
      "Merhaba! NIBE F2040 monoblok ısı pompasını sitenizden inceledim. Mahalime uygun kapasite ve montaj dahil fiyat hakkında bilgi alabilir miyim? Mahalim: ___ m², ___ (yerden ısıtma / radyatör).",
    kaynak: "https://www.nibe.com.tr/product/nibe-f2040-monoblok-isi-pompasi/",
  },

  {
    slug: "nibe-vvm-s320",
    ad: "NIBE VVM S320 İç Ünite",
    kisaAd: "VVM S320",
    tip: "İç Ünite",
    etiket: "Dahili Wi-Fi · Entegre boyler",
    ozet:
      "Isı pompasının iç mekân tarafı: boyler, elektrikli ısıtıcı, sirkülasyon pompası, buffer tank ve emniyet ekipmanları tek kabinde. Dahili Wi-Fi ile uzaktan kontrol.",
    gorsel: "/urunler/nibe-vvm-s320.jpg",
    renk: "#a78bfa",
    vitrin: [
      { deger: "176 L", etiket: "Boyler hacmi" },
      { deger: "207 L", etiket: "Sıcak su (40 °C)" },
      { deger: "Wi-Fi", etiket: "Dahili bağlantı" },
    ],
    aciklama: [
      "NIBE VVM S320, havadan suya ısı pompası sistemleriyle entegre edilmek üzere tasarlanmış bir iç ünitedir. Sistemin içinde sıcak su tankı, elektrikli ısıtıcı, sirkülasyon pompası, doldurma valfi, manometre, emniyet valfi, buffer tank ve genleşme kabı bulunur.",
      "VVM S320 içerisinde invertör kontrollü sirkülasyon pompası, sıcak su üreticisi, sıcak su yönlendirme vanası, elektrikli ısıtıcı ve buffer tank gibi unsurlar yer alır. Son versiyon kontrol ünitesi ile dış ünite dahil tüm sistem kolayca kontrol edilebilir.",
      "S serilerinde kontrol sisteminde dahili Wi-Fi mevcuttur. Bu sayede tablet, telefon ve benzeri ekipmanlar ile sistemin uzaktan kontrolü mümkün olur. Kullanıcılar telefon, tablet veya bilgisayardan evin konforunu uzaktan yönetebilir.",
      "Ünite içerisinde ayrıca şebeke su doldurma, basınç ölçerler, emniyet vanası ve genleşme tankı gibi sistem kurulumunda ihtiyaç olan tüm ekipmanlar montajlı şekilde bulunur. Sistem, maksimum konfor ile minimum enerji tüketimini bir arada sunmaktadır.",
    ],
    avantajlar: [
      {
        baslik: "Entegre Sistem",
        metin:
          "NIBE havadan suya ısı pompası ile birleştirilerek tam entegre bir sistem oluşturur.",
      },
      {
        baslik: "Akıllı Teknoloji",
        metin: "Akıllı, kullanıcı dostu kontrol sistemine sahiptir.",
      },
      {
        baslik: "Kullanıcı Dostu",
        metin:
          "Dokunmatik kontrol ve maksimum konfor için enerji tasarrufu sağlayan akıllı teknoloji ile entegre kablosuz bağlantı.",
      },
    ],
    teknik: {
      baslik: "NIBE VVM S320",
      modeller: ["VVM S320"],
      satirlar: [
        {
          ozellik: "Yükseklik / Genişlik / Derinlik",
          birim: "mm",
          degerler: "1800 / 600 / 615",
        },
        { ozellik: "Ağırlık", birim: "kg", degerler: "140" },
        { ozellik: "Boyler Hacmi", birim: "litre", degerler: "176" },
        { ozellik: "Sıcak Su Kapasitesi (40 °C)", birim: "litre", degerler: "207" },
        { ozellik: "Bağlantı Şekli", degerler: "Üstten" },
        { ozellik: "Elektrikli Isıtıcı", birim: "kW", degerler: "9" },
        {
          ozellik: "Şebeke Gerilimi",
          degerler: "1 x 230 V ve 3 x 400 V seçenekleri",
        },
        {
          ozellik: "Emaye (E) Korozyon Korumalı Model",
          degerler: "3 x 400 V şebeke geriliminde çalışır",
        },
        { ozellik: "Dahili Wi-Fi", degerler: "Var (S serisi kontrol ünitesi)" },
        {
          ozellik: "Uyumlu Dış Üniteler",
          degerler:
            "SPLIT AMS 10-6 / 10-8 / 10-12 · F2120-8 / 12 / 16 · F2040-6 / 8 / 12",
        },
      ],
      dipnotlar: [
        "Değerler ÜNTES | NIBE Havadan Suya Isı Pompaları iç üniteler broşüründen alınmıştır.",
        "Uyumluluk tablosu broşürdeki \"Uyumlu Üniteler\" matrisine göredir.",
      ],
    },
    dokumanlar: [
      {
        ad: "Broşür (İç Üniteler)",
        url: "https://nibe.com.tr/wp-content/uploads/2021/04/NIBE-Ic-uniteler.pdf",
        tur: "brosur",
      },
      { ad: "Katalog", url: KATALOG, tur: "katalog" },
      {
        ad: "Montaj Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/27033/531159-2.pdf",
        tur: "montaj",
      },
      {
        ad: "Kullanım Kılavuzu",
        url: "https://partner.nibe.eu/nibedocuments/29526/M12717-1.pdf",
        tur: "kullanim",
      },
      {
        ad: "Örnek Tesisat Şemaları",
        url: "https://partner.nibe.eu/For-partners/docking11/nibe-VVMS320-1/Dockings/",
        tur: "sema",
      },
    ],
    whatsappMesaji:
      "Merhaba, İKON Klima sitesinden yazıyorum. NIBE VVM S320 iç ünite hakkında bilgi almak istiyorum.\n\nÖğrenmek istediklerim:\n• Hangi dış ünite ile eşleştirmem gerekiyor (SPLIT AMS / F2040 / S2125)?\n• 176 L boyler evimdeki sıcak su ihtiyacı için yeterli mi?\n• Kurulum için teknik odada ne kadar yer gerekiyor (1800×600×615 mm)?\n• Montaj dahil fiyat ve teslim süresi\n\nEvim hakkında: ___ m², ___ kişi, ___ (il/ilçe)\n\nTeşekkürler.",
    instagramMesaji:
      "Merhaba! NIBE VVM S320 iç üniteyi sitenizden inceledim. Hangi dış ünite ile uyumlu ve boyler kapasitesi evim için yeterli mi? Evim: ___ m², ___ kişi.",
    kaynak: "https://www.nibe.com.tr/product/vvm-s320-ic-unite/",
  },
];

export function urunBul(slug: string): Urun | undefined {
  return URUNLER.find((u) => u.slug === slug);
}
