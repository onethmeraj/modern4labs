"use client";

/* Lenis <-> GSAP sync. Without this in the tree, useLenis() returns null
   everywhere and ScrollTrigger measures pins it cannot track. */

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorField from "./CursorField";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapSync() {
  /* Lenis drives ScrollTrigger */
  const lenis = useLenis(ScrollTrigger.update);

  /* GSAP's ticker drives Lenis. One RAF loop, not two. */
  useEffect(() => {
    if (!lenis) return;
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    /* autoRaf must stay false — true gives a second RAF loop and jagged scroll. */
    <ReactLenis root options={{ lerp: 0.12, autoRaf: false }}>
      <LenisGsapSync />
      {/* Cursor-reactive particle constellation. Fixed at z-0 behind
          everything, pointer-events-none, desktop only. */}
      <CursorField />
      {children}
    </ReactLenis>
  );
}