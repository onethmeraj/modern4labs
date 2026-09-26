"use client";

/* Loading screen — dark, typographic, ~3.6s.
   The counter is driven by a GSAP tween rather than setInterval so it eases
   (fast start, slow finish) instead of ticking mechanically. */

import { useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE, T } from "./system";

const DURATION = 3.6;

/* Words cycle behind the counter so the wait says something. */
const PHASES = ["Calibrating", "Composing", "Engineering", "Refining"];

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);

  useGSAP(
    () => {
      const counter = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          /* A beat at 100 before handing over, so it doesn't snap away. */
          gsap.delayedCall(0.45, onEnter);
        },
      });

      tl.to(counter, {
        value: 100,
        duration: DURATION,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.value);
          setCount(v);
          setPhase(Math.min(PHASES.length - 1, Math.floor((v / 100) * PHASES.length)));
        },
      })
        .to(".load-bar", { scaleX: 1, duration: DURATION, ease: "power2.inOut" }, 0)
        .fromTo(".load-mark", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }, 0.1);

      return () => tl.kill();
    },
    { scope: rootRef }
  );

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.9, ease: EASE },
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#0c0d10] px-6 py-8 text-white sm:px-10 sm:py-12"
    >
      {/* Slow brand wash so the screen isn't flat black */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(36,210,56,0.14) 0%, rgba(6,43,79,0.30) 45%, transparent 72%)",
          animationDuration: "5s",
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <span className="load-mark inline-block text-brand-green" style={{ ...({} as object) }}>
          <span className={T.label}>Modern4Labs</span>
        </span>
        <span className={`load-mark inline-block ${T.label}`}>Est. 2026 — Colombo</span>
      </div>

      {/* Centre: the counter */}
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden">
          <span className="load-mark block font-serif text-[clamp(4.5rem,18vw,13rem)] font-light leading-[0.85] tracking-[-0.04em] tabular-nums text-white">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        <div className="mt-6 overflow-hidden">
          <span className={`load-mark block ${T.label}`}>{PHASES[phase]}</span>
        </div>
      </div>

      {/* Bottom: the bar */}
      <div className="relative flex flex-col gap-5">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="load-bar h-full w-full origin-left scale-x-0 bg-brand-green"
            style={{ boxShadow: "0 0 18px rgba(36,210,56,0.8)" }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className={`load-mark inline-block ${T.label}`}>Engineering digital presence</span>
          <span className={`load-mark inline-block ${T.label}`}>{count}%</span>
        </div>
      </div>
    </motion.div>
  );
}