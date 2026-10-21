"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DottedMap from "dotted-map";

/* Unified Design System Imports */
import { ArrowRight, EASE, GlowButton, L, S, SiteFooter, SiteNav, T, stagger } from "./components/system";
import WelcomeScreen from "./components/WelcomeScreen";
import SoundToggle from "./components/SoundToggle";
import ScrambleText from "./components/ScrambleText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ========================================================================== */
/* 0. TYPE + UI SYSTEM — one place for sizes so every section matches          */
/* ========================================================================== */

const TYPE = {
  /* hero headline — uses the studio display font */
  display: T.display,
  /* big statements and section headlines — studio heading font */
  statement: T.h2,
  h2: T.h2,
  /* card / row title */
  h3: "font-sans font-bold leading-tight tracking-[-0.03em] text-[clamp(1.375rem,2.4vw,2rem)]",
  /* supporting text */
  body: "font-sans text-base leading-relaxed sm:text-lg",
  small: "font-sans text-sm leading-relaxed",
  /* small label above a headline — studio label font */
  label: `text-brand-green ${T.label}`,
};

const BTN = {
  base: "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-sm font-bold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green",
  green: "bg-brand-green text-black",
  white: "bg-white text-black",
  dark: "bg-[#0c0d10] text-white",
};

const AUDIT_HREF = "/contact?service=audit";

const HERO_KICKER = "Modern4Labs — Digital Studio";
const ROTATING_WORDS = ["Leads.", "Growth.", "Vision.", "Scale."] as const;

/* ========================================================================== */
/* 1. CONTENT — edit words here                                                */
/* ========================================================================== */

const PROBLEMS = [
  { title: "Posting isn't marketing.", desc: "A full feed doesn't mean anyone is paying attention." },
  { title: "Ordinary gets scrolled past.", desc: "Content that looks like everyone else's is invisible." },
  { title: "Attention needs a next step.", desc: "Views mean nothing if nobody messages, books or buys." },
];

/* ---- Map locations: to add a city, add one entry here (lat/lng + time zone) ---- */
type Hub = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  tz: string;
  role: string;
  clients: string[];
  hq?: boolean;
};

const HUBS: Hub[] = [
  { id: "colombo", city: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, tz: "Asia/Colombo", role: "Studio HQ", clients: ["Seafarer Store", "The Search Bar"], hq: true },
  { id: "stockholm", city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, tz: "Europe/Stockholm", role: "Nordic expansion", clients: ["The Search Bar"] },
  { id: "melbourne", city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, tz: "Australia/Melbourne", role: "High-ticket funnels", clients: ["Sunblock Property"] },
];

/* ---- Client logos: one entry per client. Put logo files in /public/clients ---- */
const CLIENTS = [
  { name: "The Search Bar", logo: "/clients/logo-2.png" },
  { name: "Sunblock Property", logo: "/clients/logo-3.png" },
  { name: "Seafarer Store", logo: "/clients/logo-4.png" },
  { name: "Foldfox", logo: "/clients/logo-1.png" },
];

const PROJECT_IMAGES = [
  "/works/project-0.png",
  "/works/project-1.jpeg",
  "/works/project-2.png",
  "/works/project-3.jpeg",
  "/works/project-4.png",
  "/works/project-5.jpeg",
  "/works/project-6.jpeg",
];

/* ---- Services. Only list a client under "proof" if you did that work for them ---- */
type ServicePreview = "video" | "ads" | "page" | "chat";

const SERVICES: {
  id: string;
  num: string;
  title: string;
  promise: string;
  tags: string[];
  monthly: string;
  proof?: string;
  preview: ServicePreview;
}[] = [
  {
    id: "short-form-video",
    num: "001",
    title: "Short-form video",
    promise: "Reels and ads that stop the scroll and say something.",
    tags: ["Content ideas", "Scriptwriting", "Editing", "Hooks & captions"],
    monthly: "A planned calendar of scripted, edited reels, ready to post.",
    proof: "Seafarer Store",
    preview: "video",
  },
  {
    id: "paid-ads",
    num: "002",
    title: "Paid ads",
    promise: "Meta campaigns set up, tested and managed, so your budget goes to what works.",
    tags: ["Campaign setup", "Creative testing", "Retargeting", "Monthly reporting"],
    monthly: "Campaigns checked and adjusted every week, with a clear report every month.",
    proof: "Sunblock Property",
    preview: "ads",
  },
  {
    id: "landing-pages",
    num: "003",
    title: "Landing pages",
    promise: "Fast, focused pages that turn clicks into bookings.",
    tags: ["Page design", "Build", "Copywriting", "Lead forms"],
    monthly: "One page with one job, built and tested before it goes live.",
    proof: "The Search Bar",
    preview: "page",
  },
  {
    id: "automation-crm",
    num: "004",
    title: "Automation & CRM",
    promise: "WhatsApp and email follow-ups, so no lead goes cold.",
    tags: ["GoHighLevel", "WhatsApp flows", "Email follow-ups", "Lead pipelines"],
    monthly: "Every new lead gets a reply in minutes, even when you are busy.",
    preview: "chat",
  },
];

const STEPS = [
  { num: "01", title: "Free audit call", desc: "20 minutes on your page, your ads and where leads are slipping away." },
  { num: "02", title: "Clear plan", desc: "What we will make, run and measure, with a fixed quote." },
  { num: "03", title: "Create and launch", desc: "Content, ads and pages go live. You approve everything first." },
  { num: "04", title: "Report and scale", desc: "Monthly numbers, honest notes and more of what works." },
];

/* ---- Comparison: answers "why not do it myself or hire anyone?" ---- */
const COMPARE = [
  { row: "Ideas", diy: "Whatever you have time for", typical: "Trends and templates, copied", us: "Original ideas built around your brand" },
  { row: "Content", diy: "Phone videos when you can", typical: "Posts made to fill a calendar", us: "Every post made to get a message, booking or sale" },
  { row: "Strategy", diy: "Guesswork", typical: "Rarely part of the deal", us: "A clear plan before anything is made" },
  { row: "Ads, pages, follow-up", diy: "Separate tools, separate headaches", typical: "A different company for each", us: "One team for video, ads, pages and automation" },
  { row: "Price", diy: "Your time, which is never free", typical: "Extras you find out about later", us: "Fixed packages, price known upfront" },
  { row: "Reporting", diy: "Hard to tell what's working", typical: "Likes and reach", us: "Monthly numbers tied to enquiries" },
];

/* ---- Statistics: every number has a public source. Do not add numbers without one ---- */
const STATS = [
  {
    value: 9,
    decimals: 0,
    prefix: "",
    suffix: "M",
    label: "social media users in Sri Lanka",
    point: "Your customers are already scrolling.",
    source: "DataReportal, Digital 2026 (Oct 2025)",
  },
  {
    value: 21.6,
    decimals: 1,
    prefix: "+",
    suffix: "%",
    label: "growth in Instagram's ad reach in Sri Lanka in one year",
    point: "The audience is growing. Standing out matters more every month.",
    source: "Meta ad tools via DataReportal (Oct 2024 to Oct 2025)",
  },
  {
    value: 47,
    decimals: 0,
    prefix: "",
    suffix: "%",
    label: "of the sales lift from advertising comes from the creative itself",
    point: "Budget gets you seen. Creative gets you chosen.",
    source: "Nielsen & NCSolutions",
  },
];

/* ---- Your own results. Leave empty until you have real, checkable numbers.
   Format: { value: "…", label: "…", client: "…" }. The block only shows when this has items. ---- */
const RESULTS: { value: string; label: string; client: string }[] = [];

const PILLARS = [
  { word: "Visibility", line: "Get seen by the right people." },
  { word: "Virality", line: "Give people a reason to share." },
  { word: "Credibility", line: "Look like the obvious choice." },
];

/* ========================================================================== */
/* 2. MOTION HELPERS                                                           */
/* ========================================================================== */

const PRIORITY = { hero: 3 };

const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const lineMask = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.4, ease: EASE } },
};

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ========================================================================== */
/* 3. PAGE ASSEMBLY                                                            */
/* ========================================================================== */

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false); // have we read sessionStorage yet?
  const lenis = useLenis();

  // Decide once, on mount, whether the welcome should play this session.
  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setEntered(true); // already seen this session — skip straight to the page
      setReady(true); // skip path must also release the hero animation
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (entered) lenis.start();
    else lenis.stop();
  }, [lenis, entered]);

  const handleExitComplete = useCallback(() => {
    sessionStorage.setItem("introSeen", "true"); // remember for the rest of the session

    if (!lenis) {
      setReady(true);
      return;
    }

    lenis.start();
    lenis.scrollTo(0, { immediate: true });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh(true);
        setReady(true);
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {checked && !entered && <WelcomeScreen key="welcome" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
        <SiteNav />

        {/* 1. Hero */}
        <Hero start={ready} />

        {/* 2. The problem + presence */}
        <div className="relative z-20 -mt-[2px] w-full overflow-hidden bg-[#0c0d10]">
          <ConstellationCanvas />
          <Problem />
          <div className="relative z-10 w-full border-t border-white/[0.06]">
            <GlobalPresenceMap />
            <ClientLogos />
          </div>
        </div>

        {/* 3. Work */}
        <div className="relative z-20 w-full border-t border-white/[0.04] bg-[#0c0d10]">
          <Work />
        </div>

        {/* 4. Services */}
        <div className="relative z-10 w-full bg-[#0c0d10]">
          <Services />
        </div>

        {/* 5. Why us vs doing it yourself */}
        <div className="relative z-10 w-full bg-[#0c0d10]">
          <Compare />
        </div>

        {/* 6. Why creativity matters (numbers) */}
        <div className="relative z-10 w-full bg-[#0c0d10]">
          <TheNumbers />
        </div>

        {/* 7. How it works */}
        <div className="relative z-20 w-full bg-[#101216]">
          <HowItWorks />
        </div>

        {/* 8. Final CTA */}
        <div className="relative z-20 w-full bg-[#0c0d10]">
          <FinalCta />
          <SiteFooter />
        </div>
      </main>
    </MotionConfig>
  );
}

/* ========================================================================== */
/* 4. SECTIONS                                                                 */
/* ========================================================================== */

/* ---------- Background particles ---------- */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 50 : 100;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.4 + 0.4,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(36, 210, 56, 0.4)";
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(36, 210, 56, ${0.16 - (dist / 140) * 0.16})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}


/* ---------- Hero ---------- */
function Hero({ start }: { start: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(".hero-video", { x: x * -14, y: y * -10, duration: 1.8, ease: "power3.out" });
  }, []);

  useGSAP(
    () => {
      if (!start || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.55}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: PRIORITY.hero,
        },
      });

      tl.fromTo(".hero-video", { scale: 1.04 }, { scale: 1.35, ease: "none", duration: 1 }, 0)
        .fromTo(".hero-video-wrapper", { opacity: 1 }, { opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(
          ".fg-content",
          { autoAlpha: 1, y: 0, filter: "blur(0px)" },
          { autoAlpha: 0, y: -40, filter: "blur(14px)", duration: 0.8, ease: "power2.in" },
          0
        );
    },
    { scope: containerRef, dependencies: [start], revertOnUpdate: true }
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#0c0d10] ${L.screen}`}
    >
      <div className="hero-video-wrapper pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video h-[108%] w-[108%] -translate-x-[4%] -translate-y-[4%] object-cover [filter:brightness(0.5)_saturate(1)_contrast(1.05)] will-change-transform"
        >
          <source src="/modern4labsintro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10]/85 via-black/30 to-[#0c0d10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: NOISE_URL }} />

      <div className={`relative z-10 flex h-full w-full items-center justify-center ${L.gutter}`}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={start ? "show" : "hidden"}
          className="fg-content flex w-full flex-col items-center text-center will-change-[transform,opacity,filter]"
        >
          <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
            <span className="h-px w-8 bg-white/30 sm:w-14" />
            <span className={`whitespace-nowrap text-white/70 ${T.label}`}>{HERO_KICKER}</span>
            <span className="h-px w-8 bg-white/30 sm:w-14" />
          </div>

          <h1 className={`relative z-10 mx-auto w-full max-w-[min(92vw,1100px)] text-center ${T.display}`}>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineMask} className="block text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.9)]">
                Engineering Digital
              </motion.span>
            </span>

            <span className="mt-1 block overflow-hidden pb-[0.14em] md:mt-2">
              <motion.span variants={lineMask} className="block">
                <span className="inline-block bg-gradient-to-br from-white via-brand-green to-brand-green/70 bg-clip-text text-transparent [filter:drop-shadow(0_0_28px_rgba(36,210,56,0.35))]">
                  {start ? <ScrambleText words={ROTATING_WORDS} hold={2200} speed={34} align="center" /> : <span>{ROTATING_WORDS[0]}</span>}
                </span>
              </motion.span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
            <span className="h-10 w-px bg-gradient-to-b from-white/45 to-transparent" />
            <p className="max-w-md font-sans text-sm font-normal leading-relaxed text-white/65 sm:text-base">
              A digital studio engineering brands that refuse to be ignored.
            </p>

            <div className="pointer-events-auto mt-2">
              <GlowButton href="/contact" className={`${L.button} ${T.button}`}>
                Deploy project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </GlowButton>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-5 z-30 sm:bottom-10 sm:right-8">
          <SoundToggle videoRef={videoRef} />
        </div>
      </div>
    </section>
  );
}

/* ---------- The Problem ---------- */
function Problem() {
  const ref = useRef<HTMLElement>(null);
  const statement = "Having a business is one thing. Making people notice it is another.";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".pb-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".pb-statement", start: "top 80%", end: "bottom 50%", scrub: true },
        }
      );
      gsap.from(".pb-item", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pb-list", start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="about" ref={ref} className={`relative z-10 w-full ${L.gutter} py-24 sm:py-36`}>
      <div className={L.container}>
        <p className={`mb-6 ${TYPE.label}`}>The problem</p>

        <h2 className={`pb-statement max-w-5xl text-white ${TYPE.statement}`}>
          {statement.split(" ").map((w, i) => (
            <span key={i} className="pb-word inline-block pr-[0.22em]">
              {w}
            </span>
          ))}
        </h2>

        <div className="pb-list mt-16 grid gap-10 border-t border-white/10 pt-10 sm:mt-24 md:grid-cols-3 md:gap-8">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="pb-item">
              <h3 className={`text-white ${TYPE.h3}`}>{p.title}</h3>
              <p className={`mt-3 max-w-xs text-white/55 ${TYPE.small} sm:text-base`}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-8 rounded-xl border border-brand-green/25 bg-brand-green/[0.06] p-8 sm:mt-28 sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <p className={`text-white ${TYPE.h2}`}>That&apos;s where we come in.</p>
          <div>
            <p className={`text-white/75 ${TYPE.body}`}>
              Modern4labs brings creative ideas, strategy, video, design, websites and automation together, so your brand gets noticed and that
              attention turns into enquiries.
            </p>
            <Link href={AUDIT_HREF} className={`mt-8 ${BTN.base} ${BTN.green}`}>
              Book a free audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Global presence map ---------- */
/* Map crop: Europe → Asia → Australia */
const MAP_REGION = { lat: { min: -46, max: 70 }, lng: { min: -16, max: 168 } };
const MAP_PAD = 1;
const DOT_R = 0.26;
const GLOW_RANGE = 7;
const GLOW_OPACITY = [0.95, 0.6, 0.36, 0.2];
const GREEN = "#24d238";

type Pin = Hub & { x: number; y: number };
type MapData = {
  w: number;
  h: number;
  base: string;
  glow: string[];
  pins: Pin[];
  arcs: { id: string; d: string; from: Pin; to: Pin }[];
};

let mapCache: MapData | null = null;

const dotPath = (x: number, y: number, r: number) =>
  `M${(x - r).toFixed(3)} ${y.toFixed(3)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

function buildMap(): MapData {
  if (mapCache) return mapCache;

  const map = new DottedMap({ height: 70, grid: "diagonal", region: MAP_REGION });

  const pins: Pin[] = HUBS.map((hub) => {
    const point = map.getPin({ lat: hub.lat, lng: hub.lng });
    if (!point) throw new Error("Unable to locate hub on map");
    const { x, y } = point;
    return { ...hub, x, y };
  });

  let w = 0;
  let h = 0;
  let base = "";
  const glow = ["", "", "", ""];

  for (const p of map.getPoints()) {
    w = Math.max(w, p.x);
    h = Math.max(h, p.y);

    let d = Infinity;
    for (const pin of pins) d = Math.min(d, Math.hypot(p.x - pin.x, p.y - pin.y));

    if (d < GLOW_RANGE) glow[Math.min(3, Math.floor((d / GLOW_RANGE) * 4))] += dotPath(p.x, p.y, DOT_R);
    else base += dotPath(p.x, p.y, DOT_R);
  }

  const hq = pins.find((p) => p.hq)!;
  const arcs = pins
    .filter((p) => !p.hq)
    .map((to) => {
      const dx = to.x - hq.x;
      const dy = to.y - hq.y;
      const dist = Math.hypot(dx, dy);
      let nx = -dy / dist;
      let ny = dx / dist;
      if (ny > 0) {
        nx = -nx;
        ny = -ny;
      }
      const bend = dist * 0.22;
      const cx = (hq.x + to.x) / 2 + nx * bend;
      const cy = (hq.y + to.y) / 2 + ny * bend;
      return { id: to.id, d: `M${hq.x} ${hq.y} Q${cx} ${cy} ${to.x} ${to.y}`, from: hq, to };
    });

  mapCache = { w: w + MAP_PAD * 2, h: h + MAP_PAD * 2, base, glow, pins, arcs };
  return mapCache;
}

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const formatTime = (d: Date | null, tz: string) =>
  d ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(d) : "--:--";

function OrbitMark() {
  return (
    <span className="relative grid h-8 w-8 shrink-0 place-items-center">
      <span className="absolute inset-0 rounded-full border border-dashed border-brand-green/60 motion-safe:animate-[spin_9s_linear_infinite]" />
      <span className="absolute inset-[5px] rounded-full border border-white/20" />
      <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#24d238]" />
    </span>
  );
}

function GlobalPresenceMap() {
  const ref = useRef<HTMLElement>(null);
  const { w, h, base, glow, pins, arcs } = useMemo(buildMap, []);
  const [active, setActive] = useState<string>("colombo");
  const reduced = useReducedMotion();
  const now = useNow();

  const pct = (p: { x: number; y: number }) => ({
    left: `${((p.x + MAP_PAD) / w) * 100}%`,
    top: `${((p.y + MAP_PAD) / h) * 100}%`,
  });

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%" } });
      tl.from(".pm-head > *", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" })
        .from(".pm-dots", { autoAlpha: 0, duration: 1.2, ease: "power2.out" }, "-=0.5")
        .fromTo(".pm-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.25, ease: "power2.inOut" }, "-=0.8")
        .from(".pm-pin", { autoAlpha: 0, y: 10, stagger: 0.12, duration: 0.6, ease: "back.out(2)" }, "-=1.2");
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <section ref={ref} className={`relative z-10 w-full ${L.gutter} py-20 sm:py-28`}>
      <div className={L.container}>
        <div className="pm-head mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className={`mb-4 ${TYPE.label}`}>Where we work</p>
            <h2 className={`max-w-2xl text-white ${TYPE.h2}`}>Based in Colombo. Working across borders.</h2>
          </div>
          <p className={`max-w-xs text-white/60 md:text-right ${TYPE.small} sm:text-base`}>
            Clients in Sri Lanka, Sweden and Australia, all run from one studio.
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080a]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_55%_55%,rgba(36,210,56,0.07),transparent_70%)]" />

          <div className="relative" style={{ aspectRatio: `${w} / ${h}` }}>
            <svg
              viewBox={`${-MAP_PAD} ${-MAP_PAD} ${w} ${h}`}
              className="pm-dots absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]"
              aria-hidden
            >
              <defs>
                <filter id="pm-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="0.6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {arcs.map((a) => (
                  <linearGradient key={a.id} id={`pm-grad-${a.id}`} gradientUnits="userSpaceOnUse" x1={a.from.x} y1={a.from.y} x2={a.to.x} y2={a.to.y}>
                    <stop offset="0%" stopColor={GREEN} stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
                  </linearGradient>
                ))}
              </defs>

              <path d={base} fill="#ffffff" fillOpacity={0.2} />
              {glow.map((d, i) => (
                <path key={i} d={d} fill={GREEN} fillOpacity={GLOW_OPACITY[i]} />
              ))}

              {arcs.map((a, i) => {
                const on = active === a.id || active === "colombo";
                return (
                  <g key={a.id}>
                    <path
                      id={`pm-arc-${a.id}`}
                      className="pm-arc"
                      d={a.d}
                      fill="none"
                      stroke={`url(#pm-grad-${a.id})`}
                      strokeWidth={0.16}
                      strokeLinecap="round"
                      strokeOpacity={on ? 1 : 0.3}
                      pathLength={1}
                      strokeDasharray={1}
                    />
                    {!reduced && (
                      <circle r={0.42} fill={GREEN} filter="url(#pm-glow)">
                        <animateMotion dur={`${3.4 + i * 0.7}s`} repeatCount="indefinite" calcMode="linear">
                          <mpath href={`#pm-arc-${a.id}`} />
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${3.4 + i * 0.7}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {pins.map((pin) => {
              const isActive = active === pin.id;
              const lit = pin.hq || isActive;
              return (
                <div
                  key={pin.id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={pct(pin)}
                  onMouseEnter={() => setActive(pin.id)}
                  onClick={() => setActive(pin.id)}
                >
                  <div className="pm-pin relative cursor-pointer">
                    <span className="relative grid h-3 w-3 place-items-center">
                      <span className={`absolute -inset-2 rounded-full bg-brand-green/25 motion-safe:animate-ping ${lit ? "opacity-100" : "opacity-0"}`} />
                      <span className={`h-3 w-3 rounded-full border ${lit ? "border-brand-green bg-black shadow-[0_0_14px_#24d238]" : "border-white/50 bg-black"}`} />
                      <span className={`absolute h-1 w-1 rounded-full ${lit ? "bg-brand-green" : "bg-white/70"}`} />
                    </span>

                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center">
                      {pin.hq ? (
                        <div className="flex items-center gap-2.5 whitespace-nowrap rounded-md border border-white/15 bg-[#0b0c0f]/90 py-1.5 pl-1.5 pr-3.5 shadow-[0_0_40px_-6px_rgba(36,210,56,0.55)] backdrop-blur-md sm:py-2 sm:pl-2 sm:pr-4">
                          <OrbitMark />
                          <div className="leading-none">
                            <span className="mb-1 inline-block rounded-[3px] bg-brand-green px-1.5 py-[3px] font-sans text-[9px] font-bold text-black">HQ</span>
                            <p className="font-sans text-xs font-bold text-white sm:text-sm">{pin.city}</p>
                          </div>
                        </div>
                      ) : (
                        <span
                          className={`whitespace-nowrap rounded-[4px] border px-2 py-[3px] font-sans text-[10px] font-semibold ${
                            isActive ? "border-brand-green/50 bg-brand-green/15 text-brand-green" : "border-white/15 bg-black/70 text-white/70"
                          }`}
                        >
                          {pin.city}
                        </span>
                      )}
                      <span className="h-3 w-px bg-gradient-to-b from-white/40 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-white/[0.06] px-5 py-3.5 sm:px-8">
            {HUBS.map((hub) => (
              <span key={hub.id} className="font-sans text-xs text-white/45">
                {hub.city} <span className={`tabular-nums ${active === hub.id ? "text-brand-green" : "text-white/85"}`}>{formatTime(now, hub.tz)}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {HUBS.map((hub) => {
            const isActive = active === hub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onMouseEnter={() => setActive(hub.id)}
                onFocus={() => setActive(hub.id)}
                onClick={() => setActive(hub.id)}
                className={`rounded-lg border p-5 text-left transition-colors duration-300 ${
                  isActive ? "border-brand-green/40 bg-brand-green/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                }`}
              >
                <p className="font-sans text-lg font-bold text-white">
                  {hub.city} <span className="font-normal text-white/40">{hub.country}</span>
                </p>
                <p className="mt-1 font-sans text-sm text-white/55">{hub.role}</p>
                <p className="mt-3 font-sans text-xs text-white/40">{hub.clients.join(", ")}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Client logos ---------- */
function ClientLogos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".cl-item", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative z-10 w-full ${L.gutter} pb-24 sm:pb-32`}>
      <div className={`${L.container} border-t border-white/[0.06] pt-16 sm:pt-20`}>
        <h2 className={`cl-item mb-10 text-center text-white ${TYPE.h2}`}>Brands that trust us</h2>

        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4">
          {CLIENTS.map((client) => (
            <li key={client.name} className="cl-item w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]">
              <div className="flex h-28 items-center justify-center rounded-lg bg-white px-6 transition-transform duration-300 hover:-translate-y-1 sm:h-32">
                <div className="relative h-12 w-full max-w-[160px] sm:h-14">
                  <Image src={client.logo} alt={client.name} fill sizes="160px" className="object-contain object-center" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work() {
  return (
    <section id="work" className="relative w-full overflow-hidden bg-[#0c0d10] py-24 sm:py-32">
      <div className={`mb-14 ${L.gutter} sm:mb-20`}>
        <div className={`${L.container} flex flex-col justify-between gap-6 md:flex-row md:items-end`}>
          <div>
            <p className={`mb-4 ${TYPE.label}`}>Our work</p>
            <h2 className={`max-w-2xl text-white ${TYPE.h2}`}>Work that gets noticed.</h2>
          </div>
          <p className={`max-w-xs text-white/60 md:text-right ${TYPE.small} sm:text-base`}>Reels, ads and pages made for real clients.</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {[0, 1].map((row) => (
          <div key={row} className="flex w-full">
            <motion.div
              animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: row === 0 ? 55 : 65, ease: "linear", repeat: Infinity }}
              className="flex w-max gap-5 px-3 sm:gap-6"
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-5 sm:gap-6">
                  {(row === 0 ? PROJECT_IMAGES : [...PROJECT_IMAGES].reverse()).map((img, i) => (
                    <div
                      key={i}
                      className="group relative h-[220px] w-[320px] overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03] sm:h-[320px] sm:w-[460px] lg:h-[380px] lg:w-[580px]"
                    >
                      <Image
                        src={img}
                        alt={`Modern4labs project ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 320px, (max-width: 1024px) 460px, 580px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ---------- Services (accordion + cursor preview) ---------- */

function PreviewMock({ kind }: { kind: ServicePreview }) {
  if (kind === "video") {
    return (
      <div className="relative mx-auto aspect-[9/16] h-full overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-brand-green/50 via-[#0f2a17] to-black p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-5 w-5 rounded-full bg-white/80" />
          <span className="h-1.5 w-14 rounded-full bg-white/60" />
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-xl">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-black">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-4 space-y-1.5">
          <span className="block h-2 w-4/5 rounded-full bg-white/80" />
          <span className="block h-2 w-3/5 rounded-full bg-white/50" />
          <span className="mt-3 block h-0.5 w-full overflow-hidden rounded-full bg-white/20">
            <motion.span
              className="block h-full bg-brand-green"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "ads") {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-white text-black">
        <div className="flex items-center gap-2 p-3">
          <span className="h-6 w-6 rounded-full bg-brand-green" />
          <div>
            <span className="block h-1.5 w-16 rounded-full bg-black/70" />
            <span className="mt-1 block text-[8px] text-black/50">Sponsored</span>
          </div>
        </div>
        <div className="relative flex-1 bg-gradient-to-br from-blue-500 to-blue-800">
          <div className="absolute bottom-3 left-3 flex items-end gap-1.5">
            {[18, 28, 22, 38, 52].map((h, i) => (
              <motion.span
                key={i}
                className="w-3 rounded-sm bg-white/85"
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
              />
            ))}
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-blue-700">+ leads</span>
        </div>
        <div className="flex items-center justify-between p-3">
          <span className="text-[10px] font-bold">Book a viewing</span>
          <span className="rounded-md bg-black px-2 py-1 text-[9px] font-bold text-white">Learn more</span>
        </div>
      </div>
    );
  }

  if (kind === "page") {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-[#f6f7f9] text-black">
        <div className="flex items-center gap-1 border-b border-black/10 bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-black/5" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="h-3 w-4/5 rounded-full bg-black/80" />
          <span className="h-3 w-3/5 rounded-full bg-black/80" />
          <span className="mt-1 h-1.5 w-full rounded-full bg-black/15" />
          <span className="h-1.5 w-5/6 rounded-full bg-black/15" />
          <div className="mt-auto space-y-1.5 rounded-xl bg-white p-3 shadow-sm">
            <span className="block h-5 rounded-md border border-black/10" />
            <span className="block h-5 rounded-md border border-black/10" />
            <motion.span
              className="block h-6 rounded-md bg-brand-green"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  const bubbles = [
    { me: false, w: "w-3/4", text: "Hi, I saw your ad. Is this still available?" },
    { me: true, w: "w-2/3", text: "Yes! Here's a link to book a quick call." },
    { me: false, w: "w-1/2", text: "Booked for Friday 👍" },
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0b141a]">
      <div className="flex items-center gap-2 bg-[#1f2c33] px-3 py-2.5">
        <span className="h-6 w-6 rounded-full bg-brand-green/80" />
        <span className="text-[10px] font-bold text-white">New lead</span>
        <span className="ml-auto text-[9px] text-brand-green">online</span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        {bubbles.map((b, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.35, duration: 0.35 }}
            className={`${b.w} rounded-lg px-2.5 py-1.5 text-[10px] leading-snug ${
              b.me ? "self-end bg-[#005c4b] text-white" : "self-start bg-[#202c33] text-white/90"
            }`}
          >
            {b.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [fine, setFine] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    setFine(isFinePointer() && !prefersReducedMotion());
  }, []);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    mx.set(x > r.width * 0.6 ? x - 244 : x + 24);
    my.set(e.clientY - r.top - 140);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".svc-line").forEach((line) => {
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 92%" } });
      });
      gsap.from(".svc-row-inner", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="services" ref={ref} onMouseMove={onMove} className={`relative w-full ${L.gutter} py-16 sm:py-24`}>
      <div className={`${L.container} relative overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-b from-[#15171c] via-[#0b0c0f] to-black px-5 py-14 sm:px-10 sm:py-20 lg:px-14`}>
        {/* Header */}
        <div className="relative mb-14 grid gap-6 sm:mb-20 lg:grid-cols-[110px_1fr] lg:gap-x-8">
          <p className={`lg:pt-6 ${TYPE.label}`}>What we do</p>
          <div>
            <h2 className="relative inline-block font-sans text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={lineMask} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
                  Services.
                </motion.span>
              </span>
              <span className="absolute -right-2 top-1 translate-x-full font-sans text-[clamp(1rem,2.4vw,1.75rem)] font-medium tracking-normal text-white/35">
                ({SERVICES.length})
              </span>
            </h2>
            <p className={`mt-6 max-w-lg text-white/65 ${TYPE.body}`}>Four services, one team. Built to work together.</p>
          </div>
        </div>

        {/* Rows */}
        <div className="svc-list relative" onMouseLeave={() => setHovered(null)}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.id} className="relative" onMouseEnter={() => setHovered(i)}>
                <span className="svc-line absolute inset-x-0 top-0 h-px origin-left bg-white/[0.12]" />

                <div className="svc-row-inner">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`svc-panel-${s.id}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-5 rounded-md py-8 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green sm:py-10 lg:grid-cols-[110px_1.2fr_1fr_44px] lg:gap-x-8"
                  >
                    <span className="col-start-1 row-start-1 font-sans text-sm tabular-nums text-white/45 lg:pt-3">({s.num})</span>

                    <span
                      className={`col-start-2 row-start-1 grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:col-start-4 ${
                        isOpen ? "border-white bg-white" : "border-white/20 group-hover:border-white/50"
                      }`}
                    >
                      <span className="relative block h-3.5 w-3.5">
                        <span className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 ${isOpen ? "bg-black" : "bg-white"}`} />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 transition-transform duration-300 ${isOpen ? "rotate-90 bg-black" : "bg-white"}`}
                        />
                      </span>
                    </span>

                    <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
                      <h3 className={`transition-colors duration-300 ${TYPE.h3} !text-[clamp(1.75rem,3.2vw,2.75rem)] ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                        {s.title}
                      </h3>
                      <p className={`mt-3 max-w-md text-white/60 ${TYPE.small} sm:text-base`}>{s.promise}</p>
                    </div>

                    <div className="col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:pt-2">
                      <p className="mb-3 font-sans text-xs text-white/40">What&apos;s included</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-[4px] border px-2.5 py-1 font-sans text-xs font-medium transition-colors duration-300 ${
                              isOpen ? "border-white bg-white text-black" : "border-white/15 text-white/70"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-panel-${s.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-10 lg:grid-cols-[110px_1fr_44px] lg:gap-x-8">
                          <div className="hidden lg:block" />
                          <div className="grid gap-6 rounded-lg border border-white/[0.08] bg-white/[0.03] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
                            <div>
                              <p className="mb-2 font-sans text-xs font-semibold text-brand-green">What you get</p>
                              <p className="font-sans text-base leading-relaxed text-white/85 sm:text-lg">{s.monthly}</p>
                              {s.proof && (
                                <p className="mt-4 font-sans text-sm text-white/50">
                                  Working with <span className="font-semibold text-white">{s.proof}</span>
                                </p>
                              )}
                            </div>
                            <Link href={`/contact?service=${s.id}`} className={`${BTN.base} ${BTN.green} justify-self-start sm:justify-self-end`}>
                              Book a free audit <ArrowRight size={16} />
                            </Link>
                          </div>
                          <div className="mx-auto h-64 w-52 lg:hidden">
                            <PreviewMock kind={s.preview} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative grid gap-6 pt-10 lg:grid-cols-[110px_1fr_auto] lg:items-center lg:gap-x-8">
          <span className="svc-line absolute inset-x-0 top-0 h-px origin-left bg-white/[0.12]" />
          <div className="hidden lg:block" />
          <p className={`max-w-md text-white/60 ${TYPE.small} sm:text-base`}>
            <span className="font-bold text-white">Prices on the table.</span> Fixed monthly packages. You see the price before the first call.
          </p>
          <Link href="/contact" className={`${BTN.base} ${BTN.white} justify-self-start`}>
            Get started
          </Link>
        </div>
      </div>

      {fine && (
        <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-30 hidden h-[280px] w-[220px] lg:block" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0 drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
              >
                <PreviewMock kind={SERVICES[hovered].preview} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

/* ---------- Compare: why not do it yourself? ---------- */
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Compare() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".cmp-head > *", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".cmp-row", {
        y: 16,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cmp-table", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative w-full ${L.gutter} py-16 sm:py-24`}>
      <div className={`${L.container} rounded-xl bg-[#f2f2f0] px-5 py-12 text-[#0c0d10] sm:px-10 sm:py-16 lg:px-14 lg:py-20`}>
        <div className="cmp-head mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className={`mb-4 text-[#0c0d10]/50 ${T.label}`}>Why modern4labs</p>
            <h2 className={`text-[#0c0d10] ${TYPE.h2}`}>
              Why not just
              <br />
              <span className="text-black/35">do it yourself?</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-relaxed text-black/65 sm:text-lg lg:justify-self-end">
            You could. Here&apos;s what changes when a team built for attention does it with you.
          </p>
        </div>

        {/* Desktop table */}
        <div className="cmp-table hidden md:block" role="table" aria-label="Doing it yourself versus a typical provider versus Modern4labs">
          <div className="grid grid-cols-[0.8fr_1fr_1fr_1.25fr]" role="row">
            <span role="columnheader" />
            <span role="columnheader" className="px-5 pb-4 font-sans text-sm font-semibold text-black/50">
              Doing it yourself
            </span>
            <span role="columnheader" className="px-5 pb-4 font-sans text-sm font-semibold text-black/50">
              A typical provider
            </span>
            <span role="columnheader" className="rounded-t-lg bg-[#0c0d10] px-6 pb-4 pt-5 font-sans text-base font-bold text-brand-green">
              Modern4labs
            </span>
          </div>
          {COMPARE.map((r, i) => (
            <div key={r.row} role="row" className="cmp-row grid grid-cols-[0.8fr_1fr_1fr_1.25fr]">
              <span role="rowheader" className="border-t border-black/10 py-5 pr-4 font-sans text-sm font-bold">
                {r.row}
              </span>
              <span role="cell" className="border-t border-black/10 px-5 py-5 font-sans text-sm leading-relaxed text-black/50">
                {r.diy}
              </span>
              <span role="cell" className="border-t border-black/10 px-5 py-5 font-sans text-sm leading-relaxed text-black/50">
                {r.typical}
              </span>
              <span
                role="cell"
                className={`flex items-start gap-3 border-t border-white/10 bg-[#0c0d10] px-6 py-5 font-sans text-[15px] font-semibold leading-relaxed text-white ${
                  i === COMPARE.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <Check className="mt-1 text-brand-green" />
                {r.us}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile list */}
        <div className="cmp-table space-y-3 md:hidden">
          {COMPARE.map((r) => (
            <div key={r.row} className="cmp-row rounded-lg bg-white p-5">
              <p className="font-sans text-xs font-semibold text-black/45">{r.row}</p>
              <p className="mt-2 flex items-start gap-2.5 font-sans text-base font-bold leading-snug">
                <Check className="mt-1 text-[#1a9b2b]" />
                {r.us}
              </p>
              <p className="mt-3 border-t border-black/10 pt-3 font-sans text-xs leading-relaxed text-black/45">
                Instead of: {r.diy.toLowerCase()}, or {r.typical.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className={`max-w-md text-black/60 ${TYPE.small} sm:text-base`}>See what this looks like for your business in a free 20-minute call.</p>
          <Link href={AUDIT_HREF} className={`${BTN.base} ${BTN.dark}`}>
            Book a free audit <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- The Numbers: why creativity matters ---------- */
function TheNumbers() {
  const ref = useRef<HTMLElement>(null);
  const INK = "#0d3b1e";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      ref.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const dec = Number(el.dataset.decimals ?? 0);
        const o = { v: 0 };
        el.textContent = (0).toFixed(dec);
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = o.v.toFixed(dec);
          },
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.from(".num-card", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".num-grid", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative w-full ${L.gutter} py-16 sm:py-24`}>
      <div className={`${L.container} rounded-xl bg-[#0d3b1e] px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20`}>
        <p className={`mb-6 text-[#4ade80] ${T.label}`}>Why creativity matters</p>
        <h2 className={`max-w-4xl text-white ${TYPE.statement}`}>Creativity turns attention into opportunity.</h2>
        <p className={`mt-6 max-w-xl text-white/70 ${TYPE.body}`}>Your customers are already online. The question is whether they stop for you.</p>

        <div className="num-grid mt-14 grid gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="num-card flex flex-col rounded-lg bg-white p-6 sm:p-8" style={{ color: INK }}>
              <p className="font-sans text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.05em] tabular-nums">
                {s.prefix}
                <span data-count={s.value} data-decimals={s.decimals}>
                  {s.value.toFixed(s.decimals)}
                </span>
                {s.suffix}
              </p>
              <p className="mt-3 font-sans text-base leading-snug opacity-75">{s.label}</p>
              <p className="mt-8 border-t border-[#0d3b1e]/15 pt-5 font-sans text-lg font-bold leading-snug tracking-[-0.01em]">{s.point}</p>
              <p className="mt-auto pt-6 font-sans text-[11px] opacity-50">Source: {s.source}</p>
            </div>
          ))}
        </div>

        {RESULTS.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <p className={`mb-6 text-[#4ade80] ${T.label}`}>Results from our work</p>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {RESULTS.map((r) => (
                <div key={r.label} className="rounded-lg border border-white/15 p-6">
                  <p className="font-sans text-5xl font-bold tracking-[-0.04em] text-white">{r.value}</p>
                  <p className="mt-2 font-sans text-sm text-white/70">{r.label}</p>
                  <p className="mt-4 font-sans text-xs text-[#4ade80]">{r.client}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 sm:mt-20 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.word}>
              <h3 className={`text-white ${TYPE.h3}`}>{p.word}</h3>
              <p className="mt-2 font-sans text-base text-white/65">{p.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [reached, setReached] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setReached(STEPS.length);
        return;
      }
      const st = { trigger: ".hiw-track", start: "top 75%", end: "bottom 50%", scrub: 0.6 };
      gsap.fromTo(
        ".hiw-fill",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { ...st, onUpdate: (self) => setReached(Math.ceil(self.progress * STEPS.length)) } }
      );
      gsap.fromTo(".hiw-fill-v", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`relative w-full ${L.gutter} py-24 sm:py-32`}>
      <div className={L.container}>
        <div className="mb-14 flex flex-col justify-between gap-6 sm:mb-20 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className={`mb-4 ${TYPE.label}`}>How it works</p>
            <h2 className={`text-white ${TYPE.h2}`}>From first call to first campaign.</h2>
          </div>
          <p className={`max-w-[280px] text-white/60 md:text-right ${TYPE.small} sm:text-base`}>Step one is free and takes 20 minutes.</p>
        </div>

        <ol className="hiw-track relative grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-14">
          <span className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/10 md:block">
            <span className="hiw-fill block h-full origin-left bg-brand-green" />
          </span>
          <span className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 md:hidden">
            <span className="hiw-fill-v block h-full w-full origin-top bg-brand-green" />
          </span>

          {STEPS.map((s, i) => {
            const lit = reached > i;
            return (
              <li key={s.num} className="relative">
                <span
                  className={`absolute -left-10 top-0 grid h-8 w-8 place-items-center rounded-full border font-sans text-xs font-bold transition-colors duration-500 md:-top-14 md:left-0 md:h-11 md:w-11 ${
                    lit ? "border-brand-green bg-brand-green text-black" : "border-white/15 bg-[#101216] text-white/50"
                  }`}
                >
                  {s.num}
                </span>
                <h3 className={`font-sans text-xl font-bold tracking-[-0.02em] transition-colors duration-500 ${lit ? "text-white" : "text-white/45"}`}>{s.title}</h3>
                <p className={`mt-2 max-w-xs font-sans text-sm leading-relaxed transition-colors duration-500 ${lit ? "text-white/65" : "text-white/35"}`}>{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".fc-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center center", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  const line1 = "Don't just show up online.";
  const line2 = "Give people a reason to remember you.";

  return (
    <section ref={ref} className={`flex flex-col items-center justify-center text-center ${L.gutter} py-28 sm:py-40`}>
      <h2 className={`mx-auto max-w-5xl ${TYPE.statement}`}>
        <span className="block text-white/40">
          {line1.split(" ").map((w, i) => (
            <span key={i} className="fc-word inline-block pr-[0.22em]">
              {w}
            </span>
          ))}
        </span>
        <span className="mt-2 block text-white">
          {line2.split(" ").map((w, i) => (
            <span key={i} className="fc-word inline-block pr-[0.22em]">
              {w}
            </span>
          ))}
        </span>
      </h2>
      <div className="mt-12 flex flex-col items-center gap-4 sm:mt-16">
        <GlowButton href={AUDIT_HREF} className={`${L.button} ${T.button}`}>
          Book a free audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </GlowButton>
        <p className="font-sans text-sm text-white/50">Free, 20 minutes, on your page, ads and follow-ups.</p>
      </div>
    </section>
  );
}