"use client";

import { useEffect, useState } from "react";

/**
 * Ürün sayfasının açılış hareketi: ana sayfadaki 3D kartın kameraya uçmasının
 * devamı hissini verir — içerik hafifçe uzaktan, bulanık gelip yerine oturur.
 */
export default function GirisAnimasyonu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [yerinde, setYerinde] = useState(false);
  const [bitti, setBitti] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setYerinde(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /*
   * Animasyon bitince sarmalayıcıdan transform/filter kaldırılır. Kalıcı bir
   * transform burada ayrıca içerideki `lg:sticky` görsel sütunu için yeni bir
   * kapsayıcı blok oluşturur ve sayfayı gereksiz yere compositor'a yükler.
   */
  if (bitti) return <div>{children}</div>;

  return (
    <div
      onTransitionEnd={() => yerinde && setBitti(true)}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        yerinde
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-10 scale-[0.97] opacity-0 blur-lg"
      }`}
    >
      {children}
    </div>
  );
}
