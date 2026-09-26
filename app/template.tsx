"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return (
    <>
      {/* CSS-driven, not JS-driven. If anything goes wrong it ends at
          opacity 0 and pointer-events none, so it can never trap the page
          behind a black screen. */}
      <div
        aria-hidden
        key={pathname}
        className="route-sweep pointer-events-none fixed inset-0 z-[80]"
      />

      {/* Content starts VISIBLE and animates from a transform only.
          opacity is never the thing standing between you and your page. */}
      <motion.div
        initial={{ y: 14 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}