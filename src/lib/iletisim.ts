/** Firma ve iletişim bilgileri — tek kaynak. */

export const FIRMA = {
  ad: "İKON Klima",
  slogan: "Isıtma ve Soğutma Sistemleri",
  yetkili: "Mesut Kozan",
  adres: "Mevlana Mah. Bornova Cad. No: 151, Atakum / Samsun",
  adresKisa: "Atakum / Samsun",
  telefonGosterim: "0531 645 05 55",
  /** wa.me için ülke kodlu, sadece rakam */
  telefonWhatsapp: "905316450555",
  telefonTel: "+905316450555",
  instagramKullanici: "lkonklima",
  instagramUrl: "https://www.instagram.com/lkonklima/",
  haritaUrl:
    "https://www.google.com/maps/search/?api=1&query=Mevlana+Mah+Bornova+Cad+No+151+Atakum+Samsun",
} as const;

/** Ürüne özel hazır mesajla WhatsApp sohbeti açan bağlantı. */
export function whatsappLinki(mesaj: string): string {
  return `https://wa.me/${FIRMA.telefonWhatsapp}?text=${encodeURIComponent(mesaj)}`;
}

/**
 * Instagram DM'leri URL ile ön doldurulamaz; bu yüzden profile yönlendirip
 * mesaj taslağını kullanıcının panosuna kopyalıyoruz (bkz. InstagramButonu).
 */
export function instagramLinki(): string {
  return FIRMA.instagramUrl;
}

export const GENEL_WHATSAPP_MESAJI =
  "Merhaba, İKON Klima sitesinden yazıyorum. Isı pompası sistemleri hakkında bilgi almak istiyorum.\n\nMahalim hakkında: ___ m², ___ (yerden ısıtma / radyatör / fancoil), ___ (il/ilçe)\n\nTeşekkürler.";
