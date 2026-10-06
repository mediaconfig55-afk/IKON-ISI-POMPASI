"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { Urun } from "@/data/urunler";

/** Kartların X ekseninde yerleşimi — Z-ekseni kademesiyle derinlik verir. */
/** Her karede yeniden tahsis etmemek için paylaşılan ara renk nesnesi. */
const KARARTMA = new THREE.Color();

const YERLESIM: { x: number; y: number; z: number; egim: number }[] = [
  { x: -4.6, y: 0.25, z: -1.1, egim: 0.16 },
  { x: -1.55, y: -0.15, z: 0.2, egim: 0.06 },
  { x: 1.55, y: 0.15, z: 0.2, egim: -0.06 },
  { x: 4.6, y: -0.25, z: -1.1, egim: -0.16 },
];

type KartProps = {
  urun: Urun;
  konum: (typeof YERLESIM)[number];
  secili: boolean;
  bastirilmis: boolean;
  onSec: () => void;
  onAc: () => void;
};

function Kart({ urun, konum, secili, bastirilmis, onSec, onAc }: KartProps) {
  const grup = useRef<THREE.Group>(null);
  const dokuMesh = useRef<THREE.Mesh>(null);
  const [uzerinde, setUzerinde] = useState(false);
  const doku = useTexture(urun.gorsel);
  const { viewport } = useThree();

  // Mobilde kartlar tek sütuna düşmez; bunun yerine sahne daralır (bkz. Vitrin3D)
  const renk = useMemo(() => new THREE.Color(urun.renk), [urun.renk]);

  useFrame((state, delta) => {
    if (!grup.current) return;
    const t = state.clock.elapsedTime;
    const fare = state.pointer;

    // Hedef dönüş: fare/jiroskop takibi + hafif serbest salınım
    const hedefRotY = konum.egim + fare.x * 0.22 + Math.sin(t * 0.4 + konum.x) * 0.03;
    const hedefRotX = -fare.y * 0.14 + Math.cos(t * 0.33 + konum.x) * 0.025;

    // Seçili kart kameraya doğru uçar; bastırılmış kartlar geri çekilip solar
    const hedefZ = secili ? 1.0 : bastirilmis ? konum.z - 2.2 : konum.z;
    const hedefX = secili ? 0 : konum.x;
    const hedefY = secili ? 0 : konum.y + Math.sin(t * 0.6 + konum.x) * 0.07;
    const hedefOlcek = secili ? 1.1 : bastirilmis ? 0.86 : uzerinde ? 1.06 : 1;

    const h = 1 - Math.pow(0.0015, delta); // kare hızından bağımsız yumuşatma
    grup.current.position.x += (hedefX - grup.current.position.x) * h;
    grup.current.position.y += (hedefY - grup.current.position.y) * h;
    grup.current.position.z += (hedefZ - grup.current.position.z) * h;
    grup.current.rotation.y += ((secili ? 0 : hedefRotY) - grup.current.rotation.y) * h;
    grup.current.rotation.x += ((secili ? 0 : hedefRotX) - grup.current.rotation.x) * h;

    const o = grup.current.scale.x + (hedefOlcek - grup.current.scale.x) * h;
    grup.current.scale.setScalar(o);

    // Bastırılmış kart saydamlaşırsa altındaki renkli plaka görünür; bunun
    // yerine fotoğrafın kendisini karartıyoruz (basic material color map'i çarpar).
    if (dokuMesh.current) {
      const mat = dokuMesh.current.material as THREE.MeshBasicMaterial;
      const hedefTon = bastirilmis ? 0.22 : 1;
      mat.color.lerp(KARARTMA.setScalar(hedefTon), h);
    }

    void viewport;
  });

  return (
    <group
      ref={grup}
      position={[konum.x, konum.y, konum.z]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setUzerinde(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setUzerinde(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (secili) onAc();
        else onSec();
      }}
    >
      {/* Dış kabuk — "çift pervaz": metal tepsi içinde cam levha */}
      <RoundedBox args={[2.7, 3.5, 0.12]} radius={0.16} smoothness={6}>
        {/* meshPhysicalMaterial + clearcoat bu sahnede görünür fayda sağlamadan
            kare başına belirgin maliyet ekliyordu; standard yeterli. */}
        <meshStandardMaterial color="#0d0f13" roughness={0.38} metalness={0.9} />
      </RoundedBox>

      {/* Vurgu rengiyle içten aydınlatma halkası */}
      <RoundedBox args={[2.52, 3.32, 0.1]} radius={0.12} smoothness={6} position={[0, 0, 0.03]}>
        <meshStandardMaterial
          color={renk}
          emissive={renk}
          emissiveIntensity={bastirilmis ? 0.06 : uzerinde || secili ? 0.55 : 0.18}
          roughness={0.6}
          metalness={0.1}
        />
      </RoundedBox>

      {/* İç çekirdek — ürün fotoğrafı (üretici görselleri beyaz zeminli) */}
      <mesh ref={dokuMesh} position={[0, 0, 0.085]}>
        <planeGeometry args={[2.34, 3.14]} />
        <meshBasicMaterial map={doku} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Sahne({
  urunler,
  secili,
  setSecili,
}: {
  urunler: Urun[];
  secili: string | null;
  setSecili: (s: string | null) => void;
}) {
  const router = useRouter();
  const kok = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Kart dizisi (≈10,5 × 3,5 birim) hem yüksekliğe hem genişliğe sığdırılır;
  // böylece geniş ekranda büyür, dar ekranda taşmadan küçülür.
  useFrame((_, delta) => {
    if (!kok.current) return;
    // Kart yüksekliği (3,5 birim) görünür alanın ~%62'sini kaplasın; seçilen
    // kart öne uçtuğunda da kadrajın dışına taşmaz.
    const hedef = THREE.MathUtils.clamp(
      Math.min(viewport.height / 5.6, viewport.width / 11.2),
      0.4,
      1.35,
    );
    const h = 1 - Math.pow(0.004, delta);
    kok.current.scale.x += (hedef - kok.current.scale.x) * h;
    kok.current.scale.y += (hedef - kok.current.scale.y) * h;
    kok.current.scale.z += (hedef - kok.current.scale.z) * h;
  });

  return (
    <group ref={kok}>
      {urunler.map((u, i) => (
        <Kart
          key={u.slug}
          urun={u}
          konum={YERLESIM[i] ?? YERLESIM[0]}
          secili={secili === u.slug}
          bastirilmis={secili !== null && secili !== u.slug}
          onSec={() => setSecili(u.slug)}
          onAc={() => router.push(`/urun/${u.slug}`)}
        />
      ))}
    </group>
  );
}

export default function Vitrin3D({ urunler }: { urunler: Urun[] }) {
  const [secili, setSecili] = useState<string | null>(null);
  const [sahnedeMi, setSahnedeMi] = useState(true);
  const sarmalayici = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const seciliUrun = urunler.find((u) => u.slug === secili) ?? null;

  /*
   * Vitrin ekrandan çıktığında render döngüsünü tamamen durdurur. Aksi hâlde
   * kullanıcı ürün listesine veya danışmana kaydırdıktan sonra da sahne her
   * karede çizilmeye devam ediyor ve kaydırma takılıyordu.
   */
  useEffect(() => {
    const el = sarmalayici.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => setSahnedeMi(giris.isIntersecting),
      { rootMargin: "120px" },
    );
    gozlemci.observe(el);
    return () => gozlemci.disconnect();
  }, []);

  return (
    <div ref={sarmalayici} className="relative h-[clamp(22rem,56vh,34rem)] w-full">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 42 }}
        // Yüksek DPI ekranlarda 2x kadraj dolduran sahne için fazla pahalı.
        dpr={[1, 1.5]}
        frameloop={sahnedeMi ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setSecili(null)}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 8]} intensity={1.6} />
        <directionalLight position={[-6, -2, 4]} intensity={0.6} color="#38bdf8" />
        <Suspense fallback={null}>
          <Sahne urunler={urunler} secili={secili} setSecili={setSecili} />
        </Suspense>
      </Canvas>

      {/* Seçim sonrası eylem katmanı — WebGL üzerinde HTML olarak durur */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          seciliUrun ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {seciliUrun && (
          <div className="pointer-events-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-[2rem] border border-white/10 bg-black/60 p-2 backdrop-blur-2xl sm:flex-row sm:gap-3">
            <div className="flex-1 px-4 py-2 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-sis">
                {seciliUrun.tip}
              </p>
              <p className="text-base font-semibold text-kir">{seciliUrun.kisaAd}</p>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/urun/${seciliUrun.slug}`)}
              className="group mb-2 flex w-[calc(100%-1rem)] items-center justify-between gap-3 rounded-full bg-kir py-2 pl-6 pr-2 text-sm font-semibold text-kuyu transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:mb-0 sm:w-auto"
            >
              Detayları aç
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M3 11L11 3M11 3H5M11 3V9"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
