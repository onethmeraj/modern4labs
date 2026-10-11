"use client";

/* Lenis <-> GSAP sync. Without this in the tree, useLenis() returns null
   everywhere and ScrollTrigger measures pins it cannot track. */

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorField from "./CursorField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  /* FIX 1: Prevent the hiding mobile address bar from forcing GSAP
     to recalculate pin physics mid-swipe. This instantly stops the
     horizontal carousels from getting "stuck" and jiggling. */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

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
    /* FIX 2: Added `syncTouch: true` and `touchMultiplier: 2`. 
       This forces mobile swipe gestures to use the exact same buttery smooth
       Lenis math as the desktop scroll wheel, completely removing native lag. */
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.12, 
        autoRaf: false,
        syncTouch: true,
        touchMultiplier: 2
      }}
    >
      <LenisGsapSync />
      {/* Cursor-reactive particle constellation. Fixed at z-0 behind
          everything, pointer-events-none, desktop only. */}
      <CursorField />
      {children}
    </ReactLenis>
  );
}