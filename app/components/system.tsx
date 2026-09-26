"use client";

/* ==========================================================================
   MODERN4LABS — SHARED DESIGN SYSTEM
   Every page imports from here. One glow, one type scale, one surface set,
   so /start and /contact feel like the same brand as the homepage.
   ========================================================================== */

import { useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ---------- Tokens ---------- */

export const T = {
  display: "font-serif font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,8vw,6.5rem)]",
  h1: "font-serif font-light leading-[0.98] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,5rem)]",
  h2: "font-serif font-light leading-[1.05] tracking-[-0.015em] text-[clamp(2rem,4.5vw,3.75rem)]",
  h3: "font-serif font-light leading-tight tracking-tight text-[clamp(1.375rem,2.2vw,2rem)]",
  body: "font-sans font-light leading-relaxed text-[clamp(0.9375rem,1vw,1.0625rem)] text-white/65",
  small: "font-sans font-light leading-relaxed text-[0.8125rem] sm:text-sm text-white/65",
  label: "font-mono uppercase text-[9px] sm:text-[10px] tracking-[0.3em] text-white/45",
  button: "font-mono uppercase text-[10px] sm:text-[11px] tracking-[0.2em]",
};

/* Lifted, slightly warm neutrals. Pure #000 reads as a void. */
export const S = {
  page: "bg-[#0c0d10]",
  panel: "bg-[#101216]",
  card: "bg-white/[0.06]",
  border: "border-white/[0.12]",
  lift: "shadow-[0_2px_6px_rgba(0,0,0,0.5),0_30px_70px_-30px_rgba(0,0,0,0.9)]",
};

export const L = {
  gutter: "px-5 sm:px-8 lg:px-12",
  container: "mx-auto w-full max-w-7xl",
  narrow: "mx-auto w-full max-w-4xl",
  block: "py-24 sm:py-32 lg:py-40",
  screen: "h-[100svh] min-h-[560px]",
  button: "px-6 py-3 sm:px-8 sm:py-4",
};

/* ONE glow, used everywhere: buttons, active states, cards, section edges.
   Shared values are what make separate pages read as a single brand. */
export const GLOW = {
  rgb: "36,210,56",
  soft: "shadow-[0_0_30px_-8px_rgba(36,210,56,0.35)]",
  strong: "shadow-[0_0_50px_-8px_rgba(36,210,56,0.55)]",
  text: "[filter:drop-shadow(0_0_22px_rgba(36,210,56,0.45))]",
  ring: "ring-1 ring-brand-green/40",
};

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Nav + Footer (shared across every route) ---------- */

const NAV_LINKS = [
  { href: "/automation/whatsapp", label: "WhatsApp Automation" },
  { href: "/start", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <nav className={`fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-4 ${L.gutter}`}>
      <Link href="/" className="relative h-6 w-28 shrink-0 sm:h-8 sm:w-36">
        <Image 
          src="/logo-text.png" 
          alt="Modern4labs" 
          fill 
          priority 
          sizes="150px" /* <--- ADD THIS LINE HERE */
          className="object-contain object-left" 
        />
      </Link>

      <div className="flex items-center gap-6 sm:gap-8">
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={`transition-colors duration-300 hover:text-white ${T.label}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <GlowButton href="/start" className="px-4 py-2 sm:px-6 sm:py-2.5">
          Start a project
        </GlowButton>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className={`border-t border-white/[0.08] ${L.gutter} py-14 sm:py-16`}>
      <div className={`${L.container} flex flex-col gap-10 sm:gap-12`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className={`max-w-xl text-white ${T.h3}`}>
            Ready to build something people actually stop for?
          </h2>
          <GlowButton href="/contact" className={L.button}>
            Work with us <ArrowRight />
          </GlowButton>
        </div>

        <div className={`flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row ${T.label}`}>
          <span>© 2026 Modern4labs.io</span>
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Buttons ---------- */

/** Magnetic + glow. Renders a Link when href is passed, a button otherwise. */
export function GlowButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  tone = "primary",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !textRef.current || !isFinePointer() || prefersReducedMotion()) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.35;
    const y = (e.clientY - top - height / 2) * 0.35;
    gsap.to(ref.current, { x, y, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    gsap.to(textRef.current, { x: x * 0.35, y: y * 0.35, duration: 0.9, ease: "power3.out", overwrite: "auto" });
  };

  /* power4, never elastic — premium, not bouncy. */
  const onLeave = () => {
    if (!ref.current || !textRef.current) return;
    gsap.to([ref.current, textRef.current], { x: 0, y: 0, duration: 1, ease: "power4.out", overwrite: "auto" });
  };

  const base =
    tone === "primary"
      ? `border-brand-green/40 bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-black ${GLOW.soft} hover:${GLOW.strong}`
      : "border-white/25 bg-white/[0.04] text-white hover:bg-white hover:text-black";

  const inner = (
    <span ref={textRef} className="pointer-events-none flex items-center gap-3">
      {children}
    </span>
  );

  const shell = `group relative inline-flex items-center justify-center whitespace-nowrap rounded-full border backdrop-blur-xl transition-[background-color,color,box-shadow] duration-500 ${base} ${T.button} ${className}`;

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block will-change-transform">
      {href ? (
        <Link href={href} className={shell}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={shell}>
          {inner}
        </button>
      )}
    </div>
  );
}

/* ---------- Objects ---------- */

/** Tilts toward the cursor and lifts. Transforms only; desktop + fine pointer. */
export function TiltCard({ children, className = "", max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isFinePointer() || prefersReducedMotion()) return;

      const rx = gsap.quickTo(el, "rotateX", { duration: 0.7, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotateY", { duration: 0.7, ease: "power3.out" });
      const sc = gsap.quickTo(el, "scale", { duration: 0.7, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        rx(-((e.clientY - r.top) / r.height - 0.5) * max);
        ry(((e.clientX - r.left) / r.width - 0.5) * max);
      };
      const onEnter = () => sc(1.03);
      const onLeave = () => {
        rx(0);
        ry(0);
        sc(1);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`[transform-style:preserve-3d] will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ---------- The glow system's centrepiece ----------
   A statement where a soft light trail tracks the scroll position: words
   ahead of the light are dim, words behind it are lit, and a blurred orb
   sits on the active word. One ScrollTrigger, transforms and opacity only. */

export function ScrollGlowStatement({
  text,
  className = "",
  accent = "rgba(36,210,56,0.5)",
}: {
  text: string;
  className?: string;
  accent?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const container = containerRef.current;
      const orb = orbRef.current;
      if (!container) return;

      const spans = gsap.utils.toArray<HTMLElement>(".glow-word", container);

      if (prefersReducedMotion()) {
        gsap.set(spans, { opacity: 1, color: "#ffffff" });
        if (orb) gsap.set(orb, { opacity: 0 });
        return;
      }

      gsap.set(spans, { opacity: 0.16 });

      const moveX = orb ? gsap.quickTo(orb, "x", { duration: 0.5, ease: "power3.out" }) : null;
      const moveY = orb ? gsap.quickTo(orb, "y", { duration: 0.5, ease: "power3.out" }) : null;

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top 78%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          const head = self.progress * spans.length;

          spans.forEach((span, i) => {
            /* Distance from the light's head, in words. Inside the falloff
               the word lifts toward white; behind it, it stays lit. */
            const d = head - i;
            const lit = d >= 0 ? 1 : Math.max(0, 1 + d / 2.5);
            span.style.opacity = String(0.16 + lit * 0.84);
            span.style.textShadow = d >= 0 && d < 2 ? `0 0 28px ${accent}` : "none";
          });

          const idx = Math.min(spans.length - 1, Math.max(0, Math.round(head)));
          const target = spans[idx];
          if (target && moveX && moveY) {
            moveX(target.offsetLeft + target.offsetWidth / 2);
            moveY(target.offsetTop + target.offsetHeight / 2);
          }
        },
      });

      return () => st.kill();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* The light trail itself */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -ml-[180px] -mt-[180px] h-[360px] w-[360px] rounded-full opacity-70 blur-[90px] will-change-transform"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />
      <p className="relative flex flex-wrap gap-x-[0.25em] gap-y-1 text-white">
        {words.map((word, i) => (
          <span key={i} className="glow-word inline-block will-change-[opacity]">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ---------- Small shared pieces ---------- */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-4 ${T.label} ${className}`}>
      <span className={`h-px w-10 bg-brand-green ${GLOW.soft}`} />
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`relative overflow-hidden ${L.gutter} pb-16 pt-36 sm:pb-24 sm:pt-44`}>
      {/* Page-level glow: same colour, same falloff, every route. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[110vw] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-50 blur-[130px]"
        style={{ background: `radial-gradient(ellipse, rgba(${GLOW.rgb},0.18) 0%, rgba(6,43,79,0.22) 45%, transparent 72%)` }}
      />

      <motion.div variants={stagger} initial="hidden" animate="show" className={`relative ${L.container}`}>
        <motion.div variants={fadeUp}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1 variants={fadeUp} className={`mt-6 max-w-4xl text-white ${T.h1}`}>
          {title}
        </motion.h1>
        {lead && (
          <motion.p variants={fadeUp} className={`mt-8 max-w-xl ${T.body}`}>
            {lead}
          </motion.p>
        )}
        {children && <motion.div variants={fadeUp} className="mt-10">{children}</motion.div>}
      </motion.div>
    </header>
  );
}

export function ArrowRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-500 group-hover:translate-x-1 ${className}`}
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}