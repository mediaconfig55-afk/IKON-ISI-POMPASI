"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Görünüm alanına girince ağır, yumuşak bir belirme.
 * IntersectionObserver kullanır — scroll dinleyicisi sürekli reflow tetiklerdi.
 */
export default function Belirme({
  children,
  gecikme = 0,
}: {
  children: React.ReactNode;
  gecikme?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [gorunur, setGorunur] = useState(false);
  const [bitti, setBitti] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Gözlemci desteklenmiyorsa içerik gizli kalmasın.
    if (typeof IntersectionObserver === "undefined") {
      setGorunur(true);
      return;
    }

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          setGorunur(true);
          gozlemci.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    gozlemci.observe(el);
    return () => gozlemci.disconnect();
  }, []);

  // Animasyon bitince transform/filter tamamen kaldırılır; aksi hâlde her bölüm
  // kalıcı bir compositor katmanı (filter: blur(0)) olarak kalıp kaydırmayı ağırlaştırır.
  if (bitti) return <div ref={ref}>{children}</div>;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${gecikme}ms` }}
      onTransitionEnd={() => gorunur && setBitti(true)}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        gorunur
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-16 opacity-0 blur-md"
      }`}
    >
      {children}
    </div>
  );
}
