"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Unified Design System Imports */
import {
  ArrowRight,
  EASE,
  GlowButton,
  L,
  S,
  SiteFooter,
  SiteNav,
  T,
  TiltCard,
  fadeUp,
  stagger,
} from "./components/system";
import WelcomeScreen from "./components/WelcomeScreen";
import SoundToggle from "./components/SoundToggle";
import ScrambleText from "./components/ScrambleText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ========================================================================== */
/* 1. CONTENT                                                                 */
/* ========================================================================== */

const HERO_KICKER = "Modern4Labs — Digital Studio";
const ROTATING_WORDS = ["Leads.", "Growth.", "Vision.", "Scale."] as const;

const IMG = {
  ui: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1200&auto=format&fit=crop",
  code: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  strategy: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
  dashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  identity: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  abstract: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
};

const TRAIL_IMAGES = [IMG.ui, IMG.code, IMG.strategy, IMG.dashboard, IMG.identity, IMG.abstract];
const CLIENTS = ["NVIDIA", "STEALTH STARTUP", "Y COMBINATOR", "SEQUOIA", "OPENAI", "META", "TECHSTARS"];

const HERO_CARDS = [
  { num: "01", tag: "Authority", title: "Aesthetic Precision", desc: "Establishes trust and positions you as the premium choice in a crowded market." },
  { num: "02", tag: "Retention", title: "Fluid Interaction", desc: "Cinematic motion reduces bounce rates and guides users toward the conversion event." },
  { num: "03", tag: "Revenue", title: "Data Architecture", desc: "Design backed by data. We turn passive scrollers into committed clients." },
  { num: "04", tag: "Velocity", title: "Engineered Speed", desc: "Sub-second loads and 60fps motion, because performance is part of the brand." },
  { num: "05", tag: "Clarity", title: "Systemised Design", desc: "One design system across every surface, so nothing ever feels improvised." },
];

const HERO_CARD_POSITIONS = [
  "left-[3%] top-[9%] -rotate-6 xl:left-[6%]",
  "right-[3%] top-[11%] rotate-6 xl:right-[6%]",
  "left-[4%] bottom-[10%] -rotate-3 xl:left-[8%]",
  "right-[4%] bottom-[8%] rotate-3 xl:right-[8%]",
  "left-[40%] top-[4%] -rotate-2",
];

const HERO_CARD_PARALLAX = [
  { x: -40, y: -50, rx: 12, ry: 14 },
  { x: 50, y: 40, rx: -12, ry: -18 },
  { x: -30, y: 60, rx: 10, ry: 10 },
  { x: 42, y: -34, rx: -10, ry: -12 },
  { x: -18, y: 46, rx: 8, ry: 16 },
];

const LINK_ORDER = [0, 4, 1, 3, 2];

const TRUST_CARDS = [
  {
    num: "01",
    service: "Strategy & Positioning",
    value: "Clarity before pixels.",
    desc: "Most agencies open a design file first. We open a document. Positioning, audience and the one idea your brand owns come before a single visual decision.",
    fact: "Every engagement opens with a two-week diagnostic — never a template.",
    accent: { text: "text-emerald-300", rule: "bg-emerald-300", panel: "from-emerald-400/20 via-emerald-500/5", glow: "rgba(52,211,153,0.25)" },
  },
  {
    num: "02",
    service: "Identity Systems",
    value: "Designed once, applied everywhere.",
    desc: "Not a logo. A system — type scale, colour, motion rules, component library — so every future asset looks like it came from the same studio.",
    fact: "40+ documented components handed over with every identity build.",
    accent: { text: "text-cyan-300", rule: "bg-cyan-300", panel: "from-cyan-400/20 via-cyan-500/5", glow: "rgba(103,232,249,0.25)" },
  },
  {
    num: "03",
    service: "Web Engineering",
    value: "Performance is part of the brand.",
    desc: "Cinematic doesn't mean slow. Everything we ship is built on the edge, tested on mid-range hardware, and held to a frame budget — not just a design review.",
    fact: "We don't ship above a one-second largest contentful paint.",
    accent: { text: "text-violet-300", rule: "bg-violet-300", panel: "from-violet-400/20 via-violet-500/5", glow: "rgba(196,181,253,0.25)" },
  },
  {
    num: "04",
    service: "Content Engines",
    value: "Volume without the drop in quality.",
    desc: "A brand needs feeding. We build repeatable production systems so output stays constant long after the launch buzz has faded.",
    fact: "Twelve finished assets from a single production day.",
    accent: { text: "text-amber-300", rule: "bg-amber-300", panel: "from-amber-400/20 via-amber-500/5", glow: "rgba(252,211,77,0.25)" },
  },
  {
    num: "05",
    service: "Growth & Analytics",
    value: "Reporting you actually read.",
    desc: "No 40-slide dashboards nobody opens. One page, the numbers that move the business, and a clear recommendation attached to each one.",
    fact: "A 60-second monthly report, with next actions already decided.",
    accent: { text: "text-rose-300", rule: "bg-rose-300", panel: "from-rose-400/20 via-rose-500/5", glow: "rgba(253,164,175,0.25)" },
  },
];

const GREATS = [
  { num: "01", name: "Jobs", trait: "Invention", lesson: "Taste is a discipline. Refuse to ship anything that feels ordinary.", img: "/greats/jobs.jpg" },
  { num: "02", name: "Ronaldo", trait: "Relentlessness", lesson: "Talent is the entry fee. The work after the work is where the gap opens.", img: "/greats/ronaldo.jpg" },
  { num: "03", name: "West", trait: "Conviction", lesson: "Every category-defining idea looked unreasonable before it looked obvious.", img: "/greats/west.jpg" },
  { num: "04", name: "Jordan", trait: "Hustle", lesson: "No shortcut replaces reps. Volume makes the outcome look inevitable.", img: "/greats/jordan.jpg" },
  { num: "05", name: "Bryant", trait: "Obsession", lesson: "Details compound. A brand is a thousand small things, all of them noticed.", img: "/greats/bryant.jpg" },
] as const;

const SHOWCASE_3D = [
  { num: "01", title: "Identity", desc: "Every build begins with the core essence of the brand and its market positioning.", img: IMG.ui },
  { num: "02", title: "Insight", desc: "Data, experience and performance brought together through a detail-led approach.", img: IMG.code },
  { num: "03", title: "Cohesion", desc: "Every interaction chosen with precision, so UI and frontend feel distinctive.", img: IMG.strategy },
  { num: "04", title: "Conversion", desc: "Pipelines architected to turn attention into measurable revenue.", img: IMG.dashboard },
  { num: "05", title: "Scale", desc: "Future-proof infrastructure designed to grow with your business.", img: IMG.identity },
];

const SERVICES = [
  { title: "Web Platforms", desc: "From headless architecture to frontend refinement, platforms designed to change your presence without compromising character.", img: IMG.dashboard },
  { title: "Digital Systems", desc: "Typography, grids and material chosen to create an interface that feels personal, tactile and considered.", img: IMG.identity },
  { title: "Growth Funnels", desc: "Marketing systems built to enhance stance and market presence, selected to complement the brand's performance.", img: IMG.abstract },
];

/* ========================================================================== */
/* 2. LOCAL MOTION CONFIG + HELPERS                                           */
/* ========================================================================== */

const PRIORITY = { hero: 5, pipeline: 4, carousel: 3, services: 2 };

const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

/* Lines rise out of a mask instead of fading in — reads as film titling. */
const lineMask = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.4, ease: EASE } },
};

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function offsetFromCenter(el: HTMLElement, trackX: number) {
  const elCenter = el.offsetLeft + el.offsetWidth / 2 + trackX;
  return (elCenter - window.innerWidth / 2) / (window.innerWidth / 2);
}

function buildConstellationPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const mid = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  const first = mid(points[points.length - 1], points[0]);
  let d = `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`;

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const m = mid(current, next);
    d += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`;
  }
  return `${d} Z`;
}

/* ========================================================================== */
/* 3. PAGE ASSEMBLY                                                           */
/* ========================================================================== */

export default function Home() {
  /* FIX 2: two booleans, not one.
     entered — the user dismissed the welcome screen
     ready   — the welcome screen has fully LEFT the DOM and the document
               has its final height. Only `ready` gates measurement + Hero. */
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  /* Scroll lock while the welcome screen is up. lenis.stop(), never body.overflow. */
  useEffect(() => {
    if (!lenis) return;
    if (entered) lenis.start();
    else lenis.stop();
  }, [lenis, entered]);

  /* Fires from AnimatePresence's onExitComplete — the welcome screen is gone
     before anything measures the page. */
  const handleExitComplete = useCallback(() => {
    if (!lenis) {
      setReady(true);
      return;
    }

    lenis.start();
    lenis.scrollTo(0, { immediate: true });

    /* Two frames: one for React's commit, one for the browser's layout pass.
       A single rAF still measures the pre-unmount height. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh(true); /* hard refresh — recalculates pin spacers */
        setReady(true);              /* only now do the Hero variants start */
      });
    });

    /* Serif metrics land late and shift every pinned start. Refresh again. */
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [lenis]);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const proxy = { skew: 0 };
    const setSkew = gsap.quickSetter(".velocity-skew", "skewY", "deg");
    const clamp = gsap.utils.clamp(-5, 5);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -200);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, { skew: 0, duration: 0.9, ease: "power3", overwrite: true, onUpdate: () => setSkew(proxy.skew) });
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!entered && <WelcomeScreen key="welcome" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
        <SiteNav />
        <Hero start={ready} />
        <TrustStack />
        <StandardQueue />
        <WorkHoverTrail />
        <ApproachMarquee />
        <Showcase3DCarousel />
        <PhilosophyReveal />
        <ServicesSplit />
        <SiteFooter />
      </main>
    </MotionConfig>
  );
}

/* ========================================================================== */
/* 4. SECTIONS                                                                */
/* ========================================================================== */

/* ---------- Hero: graded film + constellation cards ---------- */

function Hero({ start }: { start: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(SVGCircleElement | null)[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    HERO_CARD_PARALLAX.forEach((p, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      gsap.to(el, { x: x * p.x, y: y * p.y, rotateX: y * p.rx, rotateY: x * p.ry, duration: 1.6, ease: "power3.out" });
    });

    gsap.to(".hero-video", { x: x * -18, y: y * -14, duration: 2, ease: "power3.out" });
  }, []);

  /* FIX 3a: early return on !start + revertOnUpdate, so the false->true flip
     doesn't leave an orphaned ticker callback running. */
  useGSAP(() => {
      if (!start) return;
      if (prefersReducedMotion()) return;
      const section = containerRef.current;
      const path = pathRef.current;
      if (!section || !path) return;

      const draw = () => {
        const base = section.getBoundingClientRect();
        const points = LINK_ORDER.map((idx) => {
          const el = cardRefs.current[idx];
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
        }).filter(Boolean) as { x: number; y: number }[];

        if (points.length < 2) return;
        path.setAttribute("d", buildConstellationPath(points));

        points.forEach((p, i) => {
          const node = nodesRef.current[i];
          if (!node) return;
          node.setAttribute("cx", p.x.toFixed(1));
          node.setAttribute("cy", p.y.toFixed(1));
        });
      };

      gsap.ticker.add(draw);
      return () => gsap.ticker.remove(draw);
    },
    { scope: containerRef, dependencies: [start], revertOnUpdate: true }
  );

  /* FIX 3b: revertOnUpdate kills the first timeline before building the
     second. Without it, two timelines fight over autoAlpha on .fg-word and
     the headline stays at 0 — the "entrance animation failure". */
  useGSAP(() => {
      if (!start) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".constellation-path", { strokeDashoffset: -240, duration: 6, ease: "none", repeat: -1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 2.5 : 3.5)}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: PRIORITY.hero,
          },
        });

        tl
          .fromTo(".hero-video", { scale: 1.04 }, { scale: 1.35, ease: "none", duration: 4 }, 0)
          .fromTo(".hero-grade", { opacity: 1 }, { opacity: 0.5, ease: "none", duration: 4 }, 0)
          .fromTo(".fg-word", { scale: 1, autoAlpha: 1, filter: "blur(0px)" }, { scale: 2.4, autoAlpha: 0, filter: "blur(14px)", duration: 2, ease: "power2.in", stagger: 0.22 }, 0.2)
          .fromTo(".fg-ui", { autoAlpha: 1, filter: "blur(0px)" }, { autoAlpha: 0, filter: "blur(10px)", duration: 0.8 }, 0.2)
          .fromTo("#lab-compass", { autoAlpha: 0, scale: 0.8, rotate: -20 }, { autoAlpha: 0.18, scale: 1, rotate: 0, duration: 2.5, ease: "power2.out" }, 0.8)
          .fromTo(".bg-word", { scale: 0.92, autoAlpha: 0, filter: "blur(10px)" }, { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 2, ease: "power2.out", stagger: 0.06 }, 0.8)
          .fromTo(".bg-ui", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease: "power2.out" }, 1.2)
          .fromTo(".tangled-card", { autoAlpha: 0, scale: 0.6, yPercent: 18 }, { autoAlpha: 1, scale: 1, yPercent: 0, stagger: 0.14, duration: 2, ease: "power3.out" }, 1.4)
          .fromTo(".constellation", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power2.out" }, 2.1);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".bg-layer", { display: "none" });
      });

      return () => mm.revert(); /* matchMedia needs explicit cleanup */
    },
    { scope: containerRef, dependencies: [start], revertOnUpdate: true }
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-black [perspective:1200px] ${L.screen}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video h-[108%] w-[108%] -translate-x-[4%] -translate-y-[4%] object-cover [filter:brightness(0.62)_saturate(1)_contrast(1.05)] will-change-transform"
        >
          <source src="/modern4labsintro.mp4" type="video/mp4" />
        </video>

        <div className="hero-grade absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_45%,transparent_75%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: NOISE_URL }} />

      <div className={`relative z-10 flex h-full w-full items-center justify-center ${L.gutter}`}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={start ? "show" : "hidden"}
          className="pointer-events-none absolute inset-0 flex w-full flex-col items-center justify-center text-center"
        >
          <FgBlock className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
            <span className="h-px w-8 bg-white/30 sm:w-14" />
            <span className={`whitespace-nowrap text-white/70 ${T.label}`}>{HERO_KICKER}</span>
            <span className="h-px w-8 bg-white/30 sm:w-14" />
          </FgBlock>

          <h1 className={`relative z-10 mx-auto w-full max-w-[min(92vw,1100px)] text-center ${T.display}`}>
            <span className="fg-word block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineMask} className="block text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.9)]">
                Engineering Digital
              </motion.span>
            </span>

            <span className="fg-word mt-1 block overflow-hidden pb-[0.14em] md:mt-2">
              <motion.span variants={lineMask} className="block">
                <span className="inline-block bg-gradient-to-br from-white via-brand-green to-brand-green/70 bg-clip-text italic text-transparent [filter:drop-shadow(0_0_28px_rgba(36,210,56,0.35))]">
                  {start ? <ScrambleText words={ROTATING_WORDS} hold={2200} speed={34} align="center" /> : <span>{ROTATING_WORDS[0]}</span>}
                </span>
              </motion.span>
            </span>
          </h1>

          <FgBlock className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
            <span className="h-10 w-px bg-gradient-to-b from-white/45 to-transparent" />
            <p className="max-w-md font-sans text-sm font-light leading-relaxed text-white/65 sm:text-base">
              A digital studio engineering brands that refuse to be ignored.
            </p>
          </FgBlock>
        </motion.div>

        <div className="bg-layer pointer-events-none absolute inset-0 flex w-full flex-col items-center justify-center text-center">
          <div id="lab-compass" className="invisible pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform">
            <LabCompass />
          </div>

          <div className={`relative z-20 flex h-full w-full flex-col items-center justify-center ${L.gutter}`}>
            <div className="mb-10 flex max-w-3xl flex-wrap justify-center gap-x-[0.25em] gap-y-1 font-serif text-[clamp(1.5rem,3.4vw,3rem)] italic leading-tight tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.9)] sm:mb-12">
              <SplitWords text="We architect high-converting experiences." className="bg-word invisible" animateEntrance={false} />
            </div>

            <div className="bg-ui invisible pointer-events-auto">
              <GlowButton href="/contact" className={`${L.button} ${T.button}`}>
                Deploy project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </GlowButton>
            </div>
          </div>
        </div>

        <svg aria-hidden className="constellation pointer-events-none absolute inset-0 z-20 hidden h-full w-full opacity-0 lg:block">
          <path
            ref={pathRef}
            className="constellation-path"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1 9"
          />
          {LINK_ORDER.map((_, i) => (
            <circle
              key={i}
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              r="2.5"
              fill="rgba(36,210,56,0.9)"
              className="[filter:drop-shadow(0_0_6px_rgba(36,210,56,0.9))]"
            />
          ))}
        </svg>

        <div className="bg-layer pointer-events-none absolute inset-0 z-30 hidden overflow-hidden lg:block">
          {HERO_CARDS.map((card, i) => (
            <div
              key={card.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`tangled-card invisible absolute w-[230px] overflow-hidden rounded-2xl border p-5 backdrop-blur-2xl [transform-style:preserve-3d] xl:w-[265px] ${S.border} ${S.card} ${S.lift} ${HERO_CARD_POSITIONS[i]}`}
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(36,210,56,0.9)]" />
                <span className={`text-brand-green ${T.label}`}>
                  {card.num} <span className="text-white/35">/ {card.tag}</span>
                </span>
              </div>

              <h4 className="mb-2 font-serif text-lg font-light text-white xl:text-xl">{card.title}</h4>
              <p className="font-sans text-[0.78rem] font-light leading-relaxed text-white/70">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Sound control. The video always starts muted — this is the user
            gesture browsers require before audio is allowed. */}
        <div className="fg-ui absolute bottom-8 right-5 z-30 sm:bottom-10 sm:right-8">
          <SoundToggle videoRef={videoRef} />
        </div>

        <div className="fg-ui pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3 sm:bottom-10">
          <span className={`text-white/45 ${T.label}`}>Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-white/80" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust: sticky stacking cards ---------- */

function TrustStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".trust-card", sectionRef.current);

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const next = cards[i + 1];

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top center", scrub: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={`relative w-full ${S.page} ${L.gutter} pb-28 pt-28 sm:pb-36 sm:pt-36`}>
      <div className={`${L.container} mb-16 sm:mb-24`}>
        <p className={`mb-6 flex items-center gap-4 ${T.label}`}>
          <span className="h-px w-10 bg-brand-green" />
          Why teams trust us
        </p>
        <h2 className={`max-w-4xl text-white ${T.h2}`}>
          Five disciplines. One studio. <span className="italic text-white/50">No hand-offs.</span>
        </h2>
        <p className={`mt-8 max-w-xl ${T.body}`}>
          Most brands stitch together a strategist, a designer, a developer and a marketer who never
          speak. We run all five in one room, which is why the work arrives consistent and on time.
        </p>
      </div>

      <div className={`${L.container} flex flex-col gap-6 sm:gap-8`}>
        {TRUST_CARDS.map((card, i) => (
          <article
            key={card.num}
            className={`trust-card sticky origin-top overflow-hidden rounded-3xl border backdrop-blur-xl will-change-transform ${S.border} ${S.panel}`}
            style={{ top: `calc(12vh + ${i * 14}px)`, zIndex: i + 1, boxShadow: `0 2px 6px rgba(0,0,0,0.5), 0 50px 100px -60px ${card.accent.glow}` }}
          >
            <span className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${card.accent.rule} to-transparent opacity-70`} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent.panel} to-transparent`} />

            <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14 lg:p-14">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`${card.accent.text} ${T.label}`}>{card.num}</span>
                  <span className={`h-px w-8 ${card.accent.rule} opacity-60`} />
                  <span className={T.label}>Service</span>
                </div>
                <h3 className="mb-3 font-serif text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
                  {card.service}
                </h3>
                <p className={`mb-5 font-serif text-[clamp(1.0625rem,1.8vw,1.5rem)] italic leading-snug ${card.accent.text}`}>
                  {card.value}
                </p>
                <p className={`max-w-lg ${T.body}`}>{card.desc}</p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-black/30 p-6 sm:p-8">
                <span className={`mb-4 block ${card.accent.text} ${T.label}`}>The proof</span>
                <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-white/85 sm:text-base">{card.fact}</p>
                <span className="pointer-events-none absolute -bottom-4 -right-1 font-serif text-[5rem] font-light leading-none text-white/[0.07]">
                  {card.num}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- The Standard: horizontal pipeline ---------- */

function StandardQueue() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      const track = trackRef.current;
      if (!track) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      const cards = gsap.utils.toArray<HTMLElement>(".standard-card", sectionRef.current);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          refreshPriority: PRIORITY.pipeline,
          onUpdate: () => {
            const trackX = Number(gsap.getProperty(track, "x"));
            cards.forEach((card) => {
              const offset = offsetFromCenter(card, trackX);
              const dist = Math.abs(offset);
              gsap.set(card, {
                scale: gsap.utils.clamp(0.82, 1.02, 1.02 - dist * 0.3),
                opacity: gsap.utils.clamp(0.4, 1, 1 - dist * 0.7),
                rotateY: offset * 8,
                transformPerspective: 1200,
              });
            });
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={`relative w-full overflow-hidden border-y border-white/[0.08] ${S.panel} ${L.screen}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div animate={{ x: ["-8%", "12%", "-8%"], y: ["0%", "-10%", "0%"] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[22%] top-[35%] h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-[130px]" />
        <motion.div animate={{ x: ["6%", "-10%", "6%"], y: ["-4%", "8%", "-4%"] }} transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[70%] top-[65%] h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[38%] z-0 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[300px] w-[300px] rounded-full border border-white/10 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />
          <div className="absolute h-[320px] w-[320px] animate-[spin_14s_linear_infinite_reverse] rounded-full border-b border-t border-brand-green/25 sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-8 z-30 text-center sm:top-12">
        <h2 className={T.label}>The Standard — studied, not copied</h2>
      </div>

      <div ref={trackRef} className="flex h-full w-fit items-center px-[7.5vw] will-change-transform sm:px-[17.5vw] md:px-[25vw] lg:px-[30vw]">
        {GREATS.map((person, i) => (
          <div key={person.num} className="standard-card relative flex h-full w-[85vw] shrink-0 flex-col items-center justify-center [transform-style:preserve-3d] sm:w-[65vw] md:w-[50vw] lg:w-[40vw]">
            <TiltCard max={10} className="relative w-[200px] sm:w-[240px] lg:w-[280px]">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl border ${S.border} ${S.lift}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.img} alt={person.name} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                <span className={`absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-md ${T.label} text-white/80`}>{person.num}</span>
              </div>
              <div className="pointer-events-none absolute inset-x-6 top-full h-16 origin-top scale-y-[-1] overflow-hidden rounded-b-2xl opacity-25 [mask-image:linear-gradient(to_top,transparent,black)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.img} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-top blur-[2px]" />
              </div>
            </TiltCard>

            <div className="mt-24 w-[88%] max-w-[340px] text-center sm:mt-28">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-6 bg-brand-green/60" />
                <span className={`text-brand-green ${T.label}`}>{person.trait}</span>
                <span className="h-px w-6 bg-brand-green/60" />
              </div>
              <h3 className="mb-3 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-tight tracking-tight text-white">{person.name}</h3>
              <p className="font-sans text-[0.875rem] font-light leading-relaxed text-white/70 sm:text-base">{person.lesson}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Selected Works ---------- */

type TrailItem = { id: number; x: number; y: number; img: string; rotate: number; z: number };
const TRAIL = { distance: 90, lifetime: 1200 };

function WorkHoverTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const zCounter = useRef(10);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (Math.hypot(x - lastPos.current.x, y - lastPos.current.y) < TRAIL.distance) return;
    lastPos.current = { x, y };

    const item: TrailItem = {
      id: Date.now() + Math.random(),
      x,
      y,
      img: TRAIL_IMAGES[imageIndex.current % TRAIL_IMAGES.length],
      rotate: Math.random() * 16 - 8,
      z: ++zCounter.current,
    };
    imageIndex.current += 1;

    setTrail((prev) => [...prev, item]);
    timers.current.push(setTimeout(() => setTrail((prev) => prev.filter((t) => t.id !== item.id)), TRAIL.lifetime));
  }, []);

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${S.page} md:cursor-crosshair ${L.gutter} ${L.block} md:h-[100svh] md:py-0`}>
      <div className="pointer-events-none relative z-[100] flex flex-col items-center text-center mix-blend-difference">
        <h2 className="font-serif text-[clamp(3rem,11vw,8rem)] font-light leading-[0.95] tracking-tighter text-white">
          Selected<br /><span className="italic text-white/55">Works</span>
        </h2>
        <p className={`mt-6 max-w-sm sm:mt-8 ${T.label}`}>
          <span className="hidden md:inline">Move cursor to explore our digital archive</span>
          <span className="md:hidden">A selection from our digital archive</span>
        </p>
      </div>

      <div className="mt-14 grid w-full max-w-md grid-cols-2 gap-4 md:hidden">
        {TRAIL_IMAGES.slice(0, 4).map((src) => (
          <div key={src} className={`relative aspect-[3/4] overflow-hidden rounded-xl border ${S.border} ${S.lift}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.6, rotate: item.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className={`pointer-events-none absolute hidden overflow-hidden rounded-xl border md:block ${S.border} ${S.lift}`}
            style={{
              left: item.x, top: item.y, x: "-50%", y: "-50%", zIndex: item.z, width: "clamp(180px, 20vw, 320px)", aspectRatio: "3 / 4",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Client marquee ---------- */

function ApproachMarquee() {
  return (
    <section className={`relative z-10 ${S.page} ${L.block}`}>
      <div className={`mb-14 text-center sm:mb-20 ${L.gutter}`}>
        <p className={`mb-4 ${T.label}`}>Trusted by</p>
        <h2 className={`mx-auto max-w-3xl text-white ${T.h2}`}>Our Approach<br />To Every Build</h2>
      </div>

      <div className="relative flex overflow-hidden border-y border-white/[0.08] py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-0 z-10 w-full bg-gradient-to-r from-[#0c0d10] via-transparent to-[#0c0d10]" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 44, ease: "linear", repeat: Infinity }} className="flex flex-nowrap items-center gap-12 whitespace-nowrap px-6 sm:gap-20 sm:px-12">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-12 font-serif text-[clamp(1.25rem,3vw,2.5rem)] tracking-tight text-white/35 sm:gap-20">
              {CLIENTS.map((client) => (
                <span key={`${copy}-${client}`} className="cursor-default transition-colors duration-500 hover:text-white">{client}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 3D carousel ---------- */

function Showcase3DCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lenis = useLenis();

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useGSAP(() => {
      const track = trackRef.current;
      if (!track) return;
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: PRIORITY.carousel,
          onUpdate: () => {
            const trackX = Number(gsap.getProperty(track, "x"));
            cardsRef.current.forEach((card) => {
              if (!card) return;
              const offset = offsetFromCenter(card, trackX);
              const rotateY = gsap.utils.clamp(-45, 45, offset * -36);

              gsap.set(card, {
                rotateY,
                rotateZ: rotateY * 0.015,
                scale: gsap.utils.clamp(0.84, 1, 1 - Math.abs(offset) * 0.16),
                z: gsap.utils.clamp(-320, 0, -Math.abs(offset) * 280),
                transformPerspective: 1400,
              });

              const content = card.querySelector(".card-content");
              if (content) gsap.set(content, { opacity: gsap.utils.clamp(0.25, 1, 1 - Math.abs(offset) * 1.2) });
            });
          },
        },
      });
    },
    { scope: sectionRef }
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !lenis) return;
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = lenis.scroll;
    document.body.style.cursor = "grabbing";
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!dragging.current || !lenis) return;
    const walk = (dragStartX.current - e.clientX) * 1.5;
    lenis.scrollTo(dragStartScroll.current + walk, { immediate: true, force: true });
  };

  const endDrag = () => {
    dragging.current = false;
    document.body.style.cursor = "";
  };

  return (
    <section ref={sectionRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag} style={{ touchAction: "pan-y" }} className={`relative flex w-full flex-col justify-center overflow-hidden ${S.panel} ${L.screen}`}>
      <div className={`pointer-events-none relative z-10 pt-24 sm:pt-28 lg:pt-32 ${L.gutter}`}>
        <h2 className={`text-white ${T.h2}`}>Our Capabilities</h2>
        <p className={`mt-3 ${T.label}`}>
          <span className="hidden md:inline">Drag to explore // Scroll to navigate</span>
          <span className="md:hidden">Scroll to navigate</span>
        </p>
      </div>

      <div ref={trackRef} className="flex w-fit flex-1 items-center gap-6 px-[calc(50vw-110px)] will-change-transform sm:gap-8 sm:px-[calc(50vw-140px)] md:px-[calc(50vw-180px)] lg:gap-12 lg:px-[calc(50vw-210px)]">
        {SHOWCASE_3D.map((item, i) => (
          <div key={item.num} ref={(el) => { cardsRef.current[i] = el; }} className={`relative aspect-[3/4] w-[220px] shrink-0 overflow-hidden rounded-2xl border [transform-style:preserve-3d] sm:w-[280px] md:w-[360px] md:cursor-grab lg:w-[420px] md:active:cursor-grabbing ${S.border} ${S.lift}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={item.title} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

            <div className="card-content pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
              <div className={`mb-3 text-brand-green ${T.label}`}>{item.num} <span className="text-white/30">/ 05</span></div>
              <h3 className={`mb-2 text-white ${T.h3}`}>{item.title}</h3>
              <p className={`max-w-[92%] ${T.small}`}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Philosophy ---------- */

function PhilosophyReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const statement = "A brand should say something before it moves. Every line, material, and interaction is considered.";

  useGSAP(() => {
      gsap.fromTo(".reveal-word", { opacity: 0.14, y: 8 }, { opacity: 1, y: 0, stagger: 0.05, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top 75%", end: "center center", scrub: true } });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={`flex flex-col items-center justify-center text-center ${S.page} ${L.gutter} ${L.block}`}>
      <div className="mx-auto max-w-4xl">
        <h2 className={`flex flex-wrap justify-center gap-x-[0.25em] text-white ${T.h2}`}>
          {statement.split(" ").map((word, i) => (
            <span key={i} className="reveal-word inline-block will-change-[opacity,transform]">{word}</span>
          ))}
        </h2>
        <div className="mt-14 flex justify-center sm:mt-20">
          <GlowButton href="/contact" className={`${L.button} ${T.button}`}>Begin the build</GlowButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services: pinned split screen ---------- */

function ServicesSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const textBlocks = gsap.utils.toArray<HTMLElement>(".srv-text-block", sectionRef.current);
        const wrappers = gsap.utils.toArray<HTMLElement>(".srv-image-wrapper", sectionRef.current);

        wrappers.forEach((w, i) => i !== 0 && gsap.set(w, { clipPath: "inset(100% 0% 0% 0%)" }));
        textBlocks.forEach((t, i) => i !== 0 && gsap.set(t, { opacity: 0.25 }));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * SERVICES.length}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: PRIORITY.services,
          },
        });

        SERVICES.forEach((_, i) => {
          if (i === 0) return;
          const at = i - 1;

          tl.to(textColumnRef.current, { y: () => `-${i * 100}svh`, ease: "none", duration: 1 }, at)
            .to(textBlocks[i - 1], { opacity: 0.25, duration: 0.5, ease: "none" }, at + 0.25)
            .to(textBlocks[i], { opacity: 1, duration: 0.5, ease: "none" }, at + 0.25)
            .fromTo(wrappers[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, at);

          const img = wrappers[i].querySelector("img");
          if (img) tl.fromTo(img, { yPercent: 12, scale: 1.1 }, { yPercent: 0, scale: 1, ease: "none", duration: 1 }, at);
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(".srv-image-wrapper", { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(".srv-text-block", { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={`relative w-full ${S.page}`}>
      <div className={`relative hidden overflow-hidden md:flex ${L.screen} ${L.container}`}>
        <div className="relative h-full w-1/2">
          <div ref={textColumnRef} className="absolute left-0 top-0 flex w-full flex-col will-change-transform">
            {SERVICES.map((item) => (
              <div key={item.title} className={`srv-text-block flex h-[100svh] flex-col justify-center ${L.gutter}`}>
                <div className={`mb-5 text-brand-green ${T.label}`}>Service</div>
                <h3 className={`mb-5 text-white ${T.h2}`}>{item.title}</h3>
                <p className={`mb-8 max-w-sm ${T.body}`}>{item.desc}</p>
                <div>
                  <GlowButton href="/contact" className={`${L.button} ${T.button}`}>Start Your Project</GlowButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-full w-1/2 items-center justify-center p-6 lg:p-8">
          {SERVICES.map((item, i) => (
            <div key={item.title} className={`srv-image-wrapper absolute inset-y-16 left-0 right-8 overflow-hidden rounded-2xl border will-change-transform lg:inset-y-20 lg:right-12 ${S.border} ${S.lift}`} style={{ zIndex: i }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="velocity-skew h-full w-full object-cover will-change-transform" />
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-col gap-16 md:hidden ${L.gutter} ${L.block}`}>
        {SERVICES.map((item) => (
          <div key={item.title} className="flex flex-col gap-6">
            <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border ${S.border} ${S.lift}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div>
              <div className={`mb-3 text-brand-green ${T.label}`}>Service</div>
              <h3 className={`mb-3 text-white ${T.h3}`}>{item.title}</h3>
              <p className={T.body}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* 5. HOMEPAGE SPECIFIC HELPERS                                               */
/* ========================================================================== */

function SplitWords({ text, className = "", animateEntrance = true }: { text: string; className?: string; animateEntrance?: boolean }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className={`inline-block origin-center will-change-transform ${className}`}>
          {animateEntrance ? <motion.span variants={fadeUp} className="inline-block">{word}</motion.span> : word}
        </span>
      ))}
    </>
  );
}

function FgBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`fg-ui ${className}`}>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </div>
  );
}

function LabCompass() {
  return (
    <svg viewBox="0 0 1000 1000" className="pointer-events-none h-[130vw] max-h-[900px] w-[130vw] max-w-[900px] animate-[spin_120s_linear_infinite] opacity-30">
      <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 16" className="text-brand-green/30" />
      <circle cx="500" cy="500" r="460" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 8" className="text-white/10" />
      <path id="curve" d="M 500, 500 m -430, 0 a 430,430 0 1,1 860,0 a 430,430 0 1,1 -860,0" fill="transparent" />
      <text className="fill-white/20 font-mono text-[11px] uppercase tracking-[0.5em]">
        <textPath href="#curve" startOffset="0%">Creative Engineering • Measurable Growth • Cognitive Impact • Scalable Systems • </textPath>
        <textPath href="#curve" startOffset="50%">Creative Engineering • Measurable Growth • Cognitive Impact • Scalable Systems • </textPath>
      </text>
    </svg>
  );
}