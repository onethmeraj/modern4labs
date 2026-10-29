"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Unified Design System Imports */
import { ArrowRight, EASE, GlowButton, L, S, SiteFooter, SiteNav } from "./components/system";
import WelcomeScreen from "./components/WelcomeScreen";
import SoundToggle from "./components/SoundToggle";
import ScrambleText from "./components/ScrambleText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ========================================================================== */
/* 0. TYPE + UI SYSTEM — Inter Tight headings, Inter body                     */
/* ========================================================================== */

const TYPE = {
  display: "font-display font-semibold leading-[1.02] tracking-[-0.045em] text-[clamp(2.5rem,6vw,5.25rem)]",
  statement: "font-display font-semibold leading-[1.04] tracking-[-0.04em] text-[clamp(2.1rem,4.6vw,4rem)]",
  h2: "font-display font-semibold leading-[1.06] tracking-[-0.035em] text-[clamp(1.85rem,3.4vw,3rem)]",
  h3: "font-display font-medium leading-snug tracking-[-0.02em] text-[clamp(1.15rem,1.8vw,1.5rem)]",
  body: "font-sans text-base leading-relaxed sm:text-[17px]",
  small: "font-sans text-sm leading-relaxed",
  label: "font-sans font-medium text-brand-green text-[13px] tracking-[0.01em]",
};

const BTN = {
  base: "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green",
  green: "bg-brand-green text-black",
  white: "bg-white text-black",
  dark: "bg-[#0c0d10] border border-white/20 text-white hover:border-white/50",
  whatsapp: "bg-[#25D366] text-black",
};

const AUDIT_HREF = "/contact?service=audit";
const CALENDLY_URL = "https://calendly.com/emadushka801/modern4labs";
const WHATSAPP_HREF = "https://wa.me/94776822434";

const HERO_KICKER = "Modern4Labs — Digital Studio";
const ROTATING_WORDS = ["Leads.", "Growth.", "Vision.", "Scale."] as const;

/* ========================================================================== */
/* 1. CONTENT CONFIGURATION                                                   */
/* ========================================================================== */

/* Logos are white, transparent PNGs so they sit evenly on the dark tiles.
   `box` sizes each one optically: wide wordmarks get less height, the square FoldFox mark more. */
const CLIENTS = [
  { name: "The Search Bar", logo: "/clients/searchbarlogo.png", box: "h-12 w-[78%] sm:h-14" },
  { name: "Sunblock Property", logo: "/clients/sunblocklogo.png", box: "h-11 w-[82%] sm:h-12" },
  { name: "Seafarer Store", logo: "/clients/seafarerlogo.png", box: "h-12 w-[74%] sm:h-14" },
  { name: "FoldFox", logo: "/clients/foldfoxlogo.png", box: "h-20 w-[50%] sm:h-24" },
];


const SERVICES: {
  id: string;
  num: string;
  title: string;
  promise: string;
  tags: string[];
  monthly: string;
  proof?: string;
}[] = [
  {
    id: "short-form-video",
    num: "001",
    title: "Short-form video",
    promise: "Reels and ads that stop the scroll and say something.",
    tags: ["Content ideas", "Scriptwriting", "Editing", "Hooks"],
    monthly: "A planned calendar of scripted, edited reels, ready to post.",
    proof: "Seafarer Store",
  },
  {
    id: "paid-ads",
    num: "002",
    title: "Paid ads",
    promise: "Meta campaigns set up, tested and managed for ROI.",
    tags: ["Campaign setup", "Creative testing", "Retargeting"],
    monthly: "Campaigns checked and adjusted every week, with a clear monthly report.",
    proof: "Sunblock Property",
  },
  {
    id: "websites-tracking",
    num: "003",
    title: "Websites & tracking",
    promise: "Websites, e-commerce stores and landing pages built to turn clicks into bookings and sales.",
    tags: ["Websites", "E-commerce", "Landing pages", "Meta Pixel & Conversions API", "Google Analytics 4", "Lead forms"],
    monthly: "Every site we build is wired for tracking from day one. You see who visited, what they clicked and which ad or post brought them in, so you stop guessing and spend on what works.",
    proof: "The Search Bar",
  },
  {
    id: "automation-crm",
    num: "004",
    title: "CRM & automation",
    promise: "Every lead lands in a GoHighLevel CRM and gets a reply in minutes, even when you are busy.",
    tags: ["GoHighLevel CRM", "Lead pipelines", "WhatsApp flows", "Email & SMS follow-ups", "Booking reminders"],
    monthly: "You see each lead's journey in one place, from the first ad click to the booked call, and automated follow-ups make sure nobody goes cold.",
  },
  {
    id: "cloud-infrastructure",
    num: "005",
    title: "Cloud Infrastructure",
    promise: "Lightning-fast, highly secure cloud hosting and deployment.",
    tags: ["AWS / Vercel", "Performance Tuning", "Security", "Uptime"],
    monthly: "Enterprise-grade hosting with continuous monitoring, daily backups, and global scaling.",
  },
];

/* --------------------------------------------------------------------------
   PROJECTS — one entry per file in /public/works (project-0 to project-8, no project-4).
   -------------------------------------------------------------------------- */
type Project = {
  id: string;
  image: string;
  category: string;
  title: string;
  summary: string;
  services: string[];
};

const PROJECTS: Project[] = [
  {
    id: "searchbar-production",
    image: "/works/project-0.png",
    category: "Video production",
    title: "The Search Bar production",
    summary: "End-to-end video production for The Search Bar, a learning platform for teachers. We planned the shoots, filmed on set and handled the edit, so the brand had a steady flow of ready-to-post content.",
    services: ["Pre-production", "Filming", "Editing", "Social cut-downs"],
  },
  {
    id: "automotive-branding",
    image: "/works/project-1.jpeg",
    category: "Branding",
    title: "Branding for the automotive industry",
    summary: "On-location shoots at showrooms and launch events, capturing vehicles, people and the atmosphere of the day. Built into brand content and short-form videos that make the dealership feel premium and busy.",
    services: ["Event coverage", "Gimbal filming", "Brand content", "Reels"],
  },
  {
    id: "product-personal-branding",
    image: "/works/project-2.png",
    category: "Product & personal brand",
    title: "Product and personal branding shoots",
    summary: "Shoots that put the product and the founder side by side, so customers see both what they are buying and who stands behind it. Lit, framed and scripted for social first.",
    services: ["Shoot planning", "Product filming", "Talking-head video", "Editing"],
  },
  {
    id: "podcast-shoots",
    image: "/works/project-3.jpeg",
    category: "Podcast",
    title: "Single-guest social media podcasts",
    summary: "One-on-one podcast sessions recorded for social media. One sitting is cut into many short clips with strong hooks, so a single shoot feeds weeks of posts.",
    services: ["Multi-camera setup", "Audio", "Clip editing", "Captions"],
  },
  {
    id: "tutor-personal-branding",
    image: "/works/project-5.png",
    category: "Personal brand",
    title: "Personal branding for tutors and niche experts",
    summary: "Personal brands for tutors and niche specialists. We find the angle that makes them the obvious choice, write the scripts and film content that builds trust with students and parents.",
    services: ["Positioning", "Scripting", "Filming", "Editing"],
  },
  {
    id: "studio-setup",
    image: "/works/project-6.jpeg",
    category: "Studio & videography",
    title: "Studio setup and detail-focused videography",
    summary: "Studio builds with lighting, framing and backdrops planned for video, plus videography that focuses on the details: textures, close-ups and clean movement that make footage look high-end.",
    services: ["Studio design", "Lighting", "Videography", "Colour"],
  },
  {
    id: "system-architecture",
    image: "/works/project-7.png",
    category: "Web systems",
    title: "System architecture and planning",
    summary: "Before any code is written, we map how the whole system fits together: user data, API endpoints, profiles and the logic that connects them. Planning it out first means fewer surprises mid-build, faster delivery and a system that can grow with the business.",
    services: ["System design", "API planning", "Database structure", "Scalability"],
  },
  {
    id: "web-development",
    image: "/works/project-8.png",
    category: "Web development",
    title: "Custom websites and web apps",
    summary: "Full-stack builds from front end to back end: fast websites, e-commerce stores and custom web apps. Meta Pixel, analytics and CRM connections are wired in from day one, so every visitor and lead is tracked from launch.",
    services: ["Next.js", "Backend & APIs", "E-commerce", "Tracking & CRM"],
  },
];

const RESULTS = [
  { value: "+45%", label: "Increase in qualified leads", client: "Sunblock Property" },
  { value: "3.2x", label: "Return on ad spend", client: "The Search Bar" },
  { value: "975K+", label: "Revenue generated for clients", client: "Across client campaigns" },
];

const STEPS = [
  { num: "01", title: "Free audit call", desc: "20 minutes on your page, your ads and where leads are slipping away." },
  { num: "02", title: "Clear plan", desc: "What we will make, run and measure, with a fixed quote." },
  { num: "03", title: "Create & launch", desc: "Content, ads and pages go live. You approve everything first." },
  { num: "04", title: "Scale", desc: "Monthly numbers, honest notes and more of what works." },
];

/* Add portraits to /public/team (e.g. /team/eshan.jpg) and set `photo`.
   Without a photo the card shows initials. */
type Member = {
  name: string;
  title: string; // short title under the portrait
  role: string; // full role in the panel
  qualification: string;
  experience: string;
  bio: string;
  focus: string[];
  photo?: string;
};

const TEAM: Member[] = [
  {
    name: "Eshan Madushanka",
    photo: "/team/profileeshan.jpg",
    title: "Creative Director",
    role: "Co-Founder, Creative Director & Content Strategist",
    qualification: "BBA (Hons) in Marketing Management",
    experience: "5+ years",
    bio: "Leads creative direction, video editing, content production and social media strategy. Focused on compelling creative concepts, strong brand identities and content strategies that drive audience engagement and brand growth.",
    focus: ["Creative direction", "Video editing", "Content production", "Social media strategy", "Brand identity"],
  },
  {
    name: "Oneth Meraj",
    photo: "/team/profileoneth.jpg",
    title: "Technology & Growth",
    role: "Co-Founder, Technology & Growth Strategist",
    qualification: "BSc (Hons) in Software Engineering",
    experience: "4+ years",
    bio: "Full-stack engineer and tech lead specialising in technology development, backend systems, AI-driven solutions and business growth strategy. Focused on building scalable digital solutions that drive business growth.",
    focus: ["Full-stack development", "Backend systems", "AI solutions", "Growth strategy", "Client management"],
  },
  {
    name: "Riftha",
    title: "Head of Operations",
    role: "Head of Operations",
    qualification: "BBA (Hons) in Marketing Management",
    experience: "4+ years",
    bio: "Runs day-to-day operations, team coordination, workflow management and project delivery, making sure every project is executed smoothly from start to finish.",
    focus: ["Operations", "Team coordination", "Workflow management", "Project delivery"],
  },
];

const TOOLS = ["Meta Ads", "Meta Pixel & CAPI", "Google Analytics 4", "GoHighLevel CRM", "WhatsApp Business", "Next.js", "Vercel", "AWS"];

const REVIEWS = [
  {
    text: "They handled our full social media video production and product shoots. Our products finally look the way they deserve to online.",
    author: "Deeleka Sonal",
    role: "Founder, Seafarer Store LK",
  },
  {
    text: "So efficient that we had nothing to do from our side. A small team, but they managed everything better than I can put into words.",
    author: "Chathuranga Buddhi",
    role: "Founder, TIS Solutions",
  },
  {
    text: "They helped with our platform and built the strategy behind my whole business plan. We went from 12 clients to 48 clients a month.",
    author: "Thusitha Buddika",
    role: "Founder, BookMyDriver",
  },
];

/* Review the answers so they match how you actually work before going live. */
const FAQS = [
  { q: "How soon will I see results?", a: "Most campaigns go live within 14 days. You'll see early numbers in the first couple of weeks, and by day 30 we know what's working and double down on it." },
  { q: "How much does it cost?", a: "We work on fixed monthly packages, so you know the price before we start. Ad budget is separate and is paid straight to Meta from your own account." },
  { q: "Can I start with just one service?", a: "Yes. Plenty of clients start with reels or a landing page, then add ads or automation once the first piece is working." },
  { q: "Do I need to be on camera?", a: "Not always, but it helps. Faces build trust faster. If you're camera-shy, we write the script, keep the shoot short and do the heavy lifting in the edit." },
  { q: "Who owns the ad account and the content?", a: "You do. Ads run from your account, the budget stays in your control, and every video and page we make is yours to keep." },
  { q: "Will I know where my leads come from?", a: "Yes. We set up Meta Pixel, Conversions API and Google Analytics on your site, and every lead goes into a GoHighLevel CRM. You can see which ad, post or page brought each person in." },
  { q: "Will I approve things before they go live?", a: "Always. You see every script, edit and page before it's published. Nothing goes out without your yes." },
  { q: "Do you work with businesses outside Sri Lanka?", a: "Yes. We work with brands in Sri Lanka and Australia, and we're set up to work remotely with anyone." },
  { q: "What happens on the free audit call?", a: "20 minutes. We look at your page, your ads and where leads are dropping off, then tell you what we'd fix first. No pressure to sign anything." },
];

/* ========================================================================== */
/* 2. MOTION UTILITIES                                                        */
/* ========================================================================== */

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Calendly popup. The script loads on first hover/focus, so it never slows the page.
   If it fails to load, the link simply opens Calendly in a new tab. */
declare global {
  interface Window { Calendly?: { initPopupWidget: (o: { url: string }) => void } }
}

let calendlyLoading: Promise<void> | null = null;
function loadCalendly() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (calendlyLoading) return calendlyLoading;
  calendlyLoading = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "https://assets.calendly.com/assets/external/widget.js";
    js.async = true;
    js.onload = () => resolve();
    js.onerror = () => { calendlyLoading = null; reject(); };
    document.body.appendChild(js);
  });
  return calendlyLoading;
}

function BookCallButton({ className, children }: { className: string; children: React.ReactNode }) {
  const open = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url: `${CALENDLY_URL}?hide_gdpr_banner=1` });
    } catch {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={open}
      onMouseEnter={() => { void loadCalendly().catch(() => {}); }}
      onFocus={() => { void loadCalendly().catch(() => {}); }}
      className={className}
    >
      {children}
    </a>
  );
}

const lineMask = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.4, ease: EASE } },
};

/* ========================================================================== */
/* 3. PAGE ASSEMBLY                                                           */
/* ========================================================================== */

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setEntered(true);
      setReady(true);
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (entered) lenis.start();
    else lenis.stop();
  }, [lenis, entered]);

  const handleExitComplete = useCallback(() => {
    sessionStorage.setItem("introSeen", "true");
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
  }, [lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {checked && !entered && <WelcomeScreen key="welcome" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
        <SiteNav />

        {/* 1. Hero */}
        <div className="relative z-20 w-full overflow-hidden bg-[#0c0d10]">
          <ConstellationCanvas />
          <Hero start={ready} />
        </div>

        {/* 2. Logo Strip */}
        <div className="relative z-10 w-full border-t border-white/[0.06] bg-[#0c0d10]">
          <ClientLogos />
        </div>

        {/* 3. Services */}
        <div className="relative z-20 w-full bg-[#0c0d10]">
          <Services />
        </div>

        {/* 4. Work & Results */}
        <div className="relative z-10 w-full border-t border-white/[0.04] bg-[#0c0d10]">
          <WorkAndResults />
        </div>

        {/* 5. Proof band (replaces the single testimonial) */}
        <div className="relative z-20 w-full border-y border-white/[0.06] bg-[#101216]">
          <ProofBand />
        </div>

        {/* 6. How It Works */}
        <div className="relative z-10 w-full bg-[#0c0d10]">
          <HowItWorks />
        </div>

        {/* 7. Who We Are */}
        <div className="relative z-20 w-full border-t border-white/[0.04] bg-[#0c0d10]">
          <WhoWeAre />
        </div>

        {/* 8. Reviews */}
        <div className="relative z-10 w-full border-t border-white/[0.04] bg-[#101216]">
          <Reviews />
        </div>

        {/* 9. FAQ */}
        <div className="relative z-20 w-full border-t border-white/[0.04] bg-[#0c0d10]">
          <FAQ />
        </div>

        {/* 10. Final CTA */}
        <div className="relative z-10 w-full border-t border-white/[0.04] bg-[#0c0d10]">
          <FinalCta />
          <SiteFooter />
        </div>
      </main>
    </MotionConfig>
  );
}

/* ========================================================================== */
/* 4. SECTIONS & COMPONENTS                                                   */
/* ========================================================================== */

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
    <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen" />
  );
}

function Hero({ start }: { start: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(".hero-video", { x: x * -14, y: y * -10, duration: 1.8, ease: "power3.out" });
  }, []);

  useGSAP(() => {
    if (!start || prefersReducedMotion()) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 0.55}`,
        scrub: 0.8,
        pin: true,
      },
    });
    tl.fromTo(".hero-video", { scale: 1.04 }, { scale: 1.35, ease: "none", duration: 1 }, 0)
      .fromTo(".hero-video-wrapper", { opacity: 1 }, { opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
      .fromTo(".fg-content", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.8, ease: "power2.in" }, 0);
  }, { scope: containerRef, dependencies: [start] });

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className={`relative flex w-full items-center justify-center overflow-hidden bg-transparent ${L.screen}`}>
      <div className="hero-video-wrapper pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video ref={videoRef} autoPlay loop muted playsInline className="hero-video h-[108%] w-[108%] -translate-x-[4%] -translate-y-[4%] object-cover [filter:brightness(0.5)_saturate(1)_contrast(1.05)]">
          <source src="/modern4labsintro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10]/85 via-black/30 to-[#0c0d10]" />
      </div>

      <div className={`relative z-10 flex h-full w-full items-center justify-center ${L.gutter}`}>
        <motion.div initial="hidden" animate={start ? "show" : "hidden"} className="fg-content flex w-full flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
            <span className="h-px w-8 bg-white/30" />
            <span className={`whitespace-nowrap text-white/70 ${TYPE.label}`}>{HERO_KICKER}</span>
            <span className="h-px w-8 bg-white/30" />
          </div>

          <h1 className="relative z-10 mx-auto w-full max-w-5xl text-center font-serif text-[clamp(3rem,8.5vw,7rem)] font-normal leading-[1.02] tracking-[-0.01em]">
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineMask} className="block text-white">Engineering Digital</motion.span>
            </span>
            <span className="mt-1 block overflow-hidden pb-[0.14em]">
              <motion.span variants={lineMask} className="block">
                <span className="inline-block text-brand-green">
                  {start ? <ScrambleText words={ROTATING_WORDS} hold={1300} speed={20} align="center" /> : <span>{ROTATING_WORDS[0]}</span>}
                </span>
              </motion.span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
            <span className="h-10 w-px bg-gradient-to-b from-white/45 to-transparent" />
            <p className={`max-w-md text-white/65 ${TYPE.body}`}>A digital studio engineering brands that refuse to be ignored.</p>
            <div className="pointer-events-auto mt-2">
              <GlowButton href={AUDIT_HREF} className={`${L.button} ${BTN.green}`}>
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

function ClientLogos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".cl-item", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } });
  }, { scope: ref });

  return (
    <section ref={ref} className={`py-12 sm:py-16 ${L.gutter}`}>
      <div className={L.container}>
        <p className={`cl-item mb-8 text-center ${TYPE.label}`}>Brands we&apos;ve worked with</p>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-xl border border-white/[0.08] md:grid-cols-4">
          {CLIENTS.map((client, i) => (
            <li
              key={client.name}
              className={`cl-item group relative flex h-32 items-center justify-center border-white/[0.08] sm:h-40 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} ${i === 1 ? "md:border-r" : ""}`}
            >
              {/* soft green glow on hover */}
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,210,56,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className={`relative ${client.box}`}>
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 40vw, 220px"
                  className="object-contain object-center opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkAndResults() {
  const ref = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // One long track, all projects once, cloned only to make the loop seamless.
    // The track is wider than any screen, so the same image is never visible twice.
    tween.current = gsap.to(".work-track", { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
    gsap.from(".result-card", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".result-grid", start: "top 85%" } });
    // Roll-up counters: "+45%", "3.2x", "975K+" count up from zero, keeping prefix/suffix
    gsap.utils.toArray<HTMLElement>(".result-num").forEach((el, i) => {
      const raw = el.dataset.value ?? "";
      const m = raw.match(/^([^0-9]*)([0-9.]+)(.*)$/);
      if (!m) return;
      const [, pre, num, suf] = m;
      const end = parseFloat(num);
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;
      const obj = { v: 0 };
      el.textContent = `${pre}${(0).toFixed(decimals)}${suf}`;
      gsap.to(obj, {
        v: end,
        duration: 2.2,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".result-grid", start: "top 85%" },
        onUpdate: () => { el.textContent = `${pre}${obj.v.toFixed(decimals)}${suf}`; },
      });
    });
  }, { scope: ref });

  const setSpeed = (to: number) => {
    if (tween.current) gsap.to(tween.current, { timeScale: to, duration: 0.6, ease: "power2.out" });
  };

  const open = (p: Project) => { setSpeed(0); setActive(p); };
  const close = useCallback(() => { setActive(null); setSpeed(1); }, []);

  const copies = reduced ? [0] : [0, 1];

  return (
    <section ref={ref} className="relative w-full bg-[#0c0d10] py-14 sm:py-20">
      <div className={`mb-8 ${L.gutter} sm:mb-10`}>
        <div className={`${L.container} flex flex-col justify-between gap-6 md:flex-row md:items-end`}>
          <div>
            <p className={`mb-4 ${TYPE.label}`}>Our work</p>
            <h2 className={`max-w-2xl text-white ${TYPE.h2}`}>Case studies & results.</h2>
          </div>
          <p className={`max-w-xs text-white/60 md:text-right ${TYPE.small}`}>Shoots, edits and brand work for real clients. Tap a project to see what we did.</p>
        </div>
      </div>

      <div
        className={`pl-5 sm:pl-6 ${reduced ? "overflow-x-auto pb-4" : "overflow-hidden"}`}
        onMouseEnter={() => setSpeed(0.15)}
        onMouseLeave={() => !active && setSpeed(1)}
      >
        <div className="work-track flex w-max">
          {copies.map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex gap-5 pr-5 sm:gap-6 sm:pr-6">
              {PROJECTS.map((p) => (
                <li key={`${copy}-${p.id}`}>
                  <button
                    type="button"
                    tabIndex={copy === 1 ? -1 : 0}
                    onClick={() => open(p)}
                    className="group relative block h-[240px] w-[320px] overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green sm:h-[320px] sm:w-[460px] lg:h-[380px] lg:w-[560px]"
                  >
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 320px, (max-width: 1024px) 460px, 560px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity duration-500 sm:opacity-60 sm:group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <span>
                        <span className="block font-sans text-xs font-medium text-brand-green">{p.category}</span>
                        <span className="mt-1 block font-display text-lg font-medium leading-snug tracking-[-0.02em] text-white sm:text-xl">{p.title}</span>
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className={`${L.gutter} mt-10 sm:mt-14`}>
        <div className={`${L.container} result-grid grid gap-5 sm:grid-cols-3`}>
          {RESULTS.map((r) => (
            <div key={r.label} className="result-card rounded-xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold tabular-nums tracking-[-0.04em] text-brand-green">
                <span className="result-num" data-value={r.value} aria-label={r.value}>{r.value}</span>
              </p>
              <p className={`mt-3 font-medium text-white/90 ${TYPE.body}`}>{r.label}</p>
              <p className={`mt-1 text-white/50 ${TYPE.small}`}>{r.client}</p>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={close} />
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!project) return;
    lenis?.stop();
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      prev?.focus?.();
    };
  }, [project, lenis, onClose]);

  if (!mounted) return null;

  // Portal to <body>: the section wrappers create stacking contexts (z-10/z-20),
  // which would otherwise trap the modal underneath the next section.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="Close project" onClick={onClose} className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            data-lenis-prevent
            initial={{ y: 48, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#121418] font-sans shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:rounded-2xl"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className={TYPE.label}>{project.category}</p>
              <h3 id="project-title" className="mt-2 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-white">{project.title}</h3>

              <p className={`mt-5 text-white/75 ${TYPE.body}`}>{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-medium text-white/75">{s}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookCallButton className={`${BTN.base} ${BTN.green}`}>Book a 20-min call <ArrowRight size={16} /></BookCallButton>
                <button type="button" onClick={onClose} className={`${BTN.base} ${BTN.dark}`}>Back to projects</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ProofBand() {
  const ref = useRef<HTMLElement>(null);

  const stats = [
    { value: CLIENTS.length, suffix: "", label: "Brands we've worked with" },
    { value: SERVICES.length, suffix: "", label: "Services under one roof" },
    { value: 2, suffix: "", label: "Markets: Sri Lanka & Australia" },
    { value: 14, suffix: " days", label: "Typical time to first launch" },
  ];

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".proof-num").forEach((el) => {
      const end = Number(el.dataset.value);
      if (prefersReducedMotion()) { el.textContent = String(end); return; }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.4, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
      });
    });
    if (prefersReducedMotion()) return;
    gsap.from(".proof-item", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
  }, { scope: ref });

  return (
    <section ref={ref} className={`py-12 sm:py-16 ${L.gutter}`}>
      <div className={`${L.container} grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16`}>
        <div className="proof-item">
          <p className={`mb-4 ${TYPE.label}`}>Why brands trust us</p>
          <h2 className={`text-white ${TYPE.h2}`}>Strategy, production and tech under one roof.</h2>
          <p className={`mt-5 max-w-lg text-white/60 ${TYPE.body}`}>
            Most brands juggle a videographer, an ads freelancer and a web developer who never talk to each other. We plan, film, edit, run ads and build the pages in one place, so every piece pushes toward the same goal: more enquiries.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/65">{t}</li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08]">
          {stats.map((s) => (
            <div key={s.label} className="proof-item bg-[#101216] p-6 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] text-white">
                  <span className="proof-num" data-value={s.value}>{s.value}</span>
                  <span className="text-brand-green">{s.suffix || "+"}</span>
                </span>
                <span className="mt-2 block text-sm leading-snug text-white/55">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Services() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Only the dividers animate. Text is never hidden behind a scroll trigger.
    gsap.utils.toArray<HTMLElement>(".svc-rule").forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 95%" } });
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className={`relative w-full ${L.gutter} py-14 sm:py-20`}
      style={{ background: "radial-gradient(ellipse 70% 60% at 15% 30%, rgba(255,255,255,0.045), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(255,255,255,0.03), transparent 70%)" }}
    >
      <div className={L.container}>
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <h2 className="font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-semibold leading-none tracking-[-0.035em] text-white">What we do</h2>
            <span className="mt-6 block h-px w-56 bg-gradient-to-r from-white/70 to-transparent" />
          </div>
          <p className="max-w-[17rem] text-sm leading-relaxed text-white/65">
            Five services that work on their own or together, all connected to one tracking setup. Open one to see what you get.
          </p>
        </div>

        <ul className="relative">
          <span className="svc-rule absolute inset-x-0 top-0 h-px origin-left bg-white/10" />
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.id} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-panel-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-green sm:grid-cols-[5.5rem_1fr_auto] sm:py-7"
                >
                  <span className="text-xs tabular-nums text-white/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-display text-[clamp(1.3rem,2.1vw,1.75rem)] font-semibold tracking-[-0.025em] transition-colors duration-300 ${isOpen ? "text-white" : "text-white/85 group-hover:text-white"}`}>
                    {s.title}
                  </span>
                  <span className={`grid h-7 w-7 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-white text-white" : "border-white/45 text-white/75 group-hover:border-white"}`}>
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`svc-panel-${s.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                      <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 sm:grid-cols-[5.5rem_1fr]">
                        <span />
                        <div className="grid gap-6 pt-1 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
                          <div className="max-w-xl">
                            <p className="text-sm leading-relaxed text-white/70">
                              {s.promise} {s.monthly}
                              {s.proof && <> Currently working with <span className="text-white">{s.proof}</span>.</>}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {s.tags.map((t) => (
                                <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{t}</li>
                              ))}
                            </ul>
                          </div>
                          <BookCallButton className={`${BTN.base} ${BTN.green} justify-self-start`}>Book a 20-min call <ArrowRight size={16} /></BookCallButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="svc-rule absolute inset-x-0 bottom-0 h-px origin-left bg-white/10" />
              </li>
            );
          })}
        </ul>

        <div className="mt-10 grid gap-6 rounded-xl border border-brand-green/20 bg-brand-green/[0.04] p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <p className={TYPE.label}>Built into everything we make</p>
            <h3 className="mt-2 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-tight tracking-[-0.025em] text-white">Every visitor tracked. Every lead accounted for.</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
              Most businesses run ads and never find out who clicked, who left and who bought. We connect your site, ads and CRM so you see the full journey of every person who engages with your brand, and you get all of that data.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
            {[
              { k: "Click", v: "Meta Pixel & Conversions API" },
              { k: "Visit", v: "Google Analytics 4" },
              { k: "Lead", v: "GoHighLevel CRM" },
              { k: "Follow-up", v: "WhatsApp, email & SMS" },
            ].map((x) => (
              <li key={x.k} className="bg-[#101216] p-4">
                <p className="text-xs font-medium text-brand-green">{x.k}</p>
                <p className="mt-1 text-sm leading-snug text-white/80">{x.v}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-relaxed text-white/60"><span className="font-semibold text-white">Prices on the table.</span> Fixed packages. You see the price before the first call.</p>
          <Link href="/contact" className={`${BTN.base} ${BTN.white} justify-self-start`}>Get started</Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [reached, setReached] = useState(0);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      setReached(STEPS.length);
      gsap.set(".hiw-fill", { scaleX: 1 });
      gsap.set(".hiw-fill-v", { scaleY: 1 });
      return;
    }
    // Plays once when the section is in view, step by step:
    // light a step, hold, then draw the line to the next one.
    const n = STEPS.length;
    gsap.set(".hiw-fill", { scaleX: 0 });
    gsap.set(".hiw-fill-v", { scaleY: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".hiw-track", start: "top 70%", toggleActions: "play none none none", once: true },
    });
    for (let i = 0; i < n; i++) {
      tl.call(() => setReached(i + 1), undefined, ">0.35");
      tl.to(".hiw-fill", { scaleX: (i + 1) / n, duration: 1.1, ease: "power1.inOut" }, ">0.25");
      tl.to(".hiw-fill-v", { scaleY: (i + 1) / n, duration: 1.1, ease: "power1.inOut" }, "<");
    }
  }, { scope: ref });

  return (
    <section ref={ref} className={`relative w-full ${L.gutter} py-14 sm:py-20`}>
      <div className={L.container}>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl"><p className={`mb-4 ${TYPE.label}`}>How it works</p><h2 className={`text-white ${TYPE.h2}`}>From first call to first campaign.</h2></div>
          <p className={`max-w-[280px] text-white/60 md:text-right ${TYPE.small}`}>Step one is free and takes 20 minutes. <BookCallButton className="font-medium text-brand-green underline decoration-brand-green/40 underline-offset-4 hover:decoration-brand-green">Book it now</BookCallButton></p>
        </div>

        <ol className="hiw-track relative grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-14">
          <span className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/10 md:block"><span className="hiw-fill block h-full origin-left bg-brand-green" /></span>
          <span className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 md:hidden"><span className="hiw-fill-v block h-full w-full origin-top bg-brand-green" /></span>

          {STEPS.map((s, i) => {
            const lit = reached > i;
            return (
              <li key={s.num} className="relative">
                <span className={`absolute -left-10 top-0 grid h-8 w-8 place-items-center rounded-full border font-sans text-xs font-bold transition-colors duration-500 md:-top-14 md:left-0 md:h-11 md:w-11 ${lit ? "border-brand-green bg-brand-green text-black" : "border-white/15 bg-[#101216] text-white/50"}`}>{s.num}</span>
                <h3 className={`font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-500 ${lit ? "text-white" : "text-white/45"}`}>{s.title}</h3>
                <p className={`mt-2 max-w-xs font-sans text-sm font-light leading-relaxed transition-colors duration-500 ${lit ? "text-white/65" : "text-white/35"}`}>{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const m = TEAM[active];
  const first = m.name.split(" ")[0];

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".wwa-head > *", { y: 28, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    gsap.from(".wwa-portrait", { y: 40, autoAlpha: 0, scale: 0.96, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".wwa-grid", start: "top 80%" } });
  }, { scope: ref });

  const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <section ref={ref} className={`py-14 sm:py-20 ${L.gutter}`}>
      <div className={L.container}>
        <div className="wwa-head mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className={`mb-4 ${TYPE.label}`}>Who we are</p>
            <h2 className={`text-white ${TYPE.h2}`}>The people behind your growth.</h2>
          </div>
          <p className={`max-w-lg text-white/60 lg:justify-self-end ${TYPE.body}`}>
            A small team that handles ideas, video, ads, websites and automation. You talk to the people doing the work, not an account manager.
          </p>
        </div>

        <div className="wwa-grid grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          {/* Portraits: black and white, the selected one comes to colour */}
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {TEAM.map((p, i) => {
              const isActive = active === i;
              return (
                <li key={p.name} className="wwa-portrait">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => isFinePointer() && setActive(i)}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
                  >
                    <span className={`relative block aspect-[3/4] overflow-hidden rounded-lg border transition-[border-color,filter] duration-500 ${isActive ? "border-brand-green/60 grayscale-0" : "border-white/[0.08] grayscale"}`}>
                      {p.photo ? (
                        <Image src={p.photo} alt={p.name} fill sizes="(max-width: 1024px) 33vw, 260px" className="object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105" />
                      ) : (
                        <span className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-green/35 via-[#14301c] to-[#0c0d10] font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold text-white/85">{initials(p.name)}</span>
                      )}
                      <span className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-brand-green transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                    </span>
                    <span className="mt-3 block truncate font-display text-sm font-semibold tracking-[-0.01em] text-white sm:text-base">{p.name}</span>
                    <span className="block truncate text-xs text-white/50">{p.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Selected member: bio, focus and a direct CTA */}
          <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[#15171c] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={m.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                <p className="text-sm font-medium text-brand-green">{m.role}</p>
                <h3 className="mt-1 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-white">{m.name}</h3>

                <div className="mt-5 grid grid-cols-[1fr_auto] gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08]">
                  <div className="flex items-center gap-3 bg-[#15171c] px-4 py-3">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-green" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></svg>
                    <span className="text-sm leading-snug text-white/80">{m.qualification}</span>
                  </div>
                  <div className="bg-[#15171c] px-4 py-3 text-right">
                    <span className="block font-display text-lg font-semibold leading-none tracking-[-0.02em] text-white">{m.experience}</span>
                    <span className="mt-1 block text-[11px] text-white/45">experience</span>
                  </div>
                </div>

                <p className={`mt-5 text-white/70 ${TYPE.small} sm:text-[15px]`}>{m.bio}</p>
                <p className="mt-5 text-xs text-white/45">Handles</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <li key={f} className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-medium text-white/75">{f}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookCallButton className={`${BTN.base} ${BTN.green}`}>Book a call with {first} <ArrowRight size={16} /></BookCallButton>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={`${BTN.base} ${BTN.dark}`}>Message on WhatsApp</a>
            </div>

            <ul className="mt-8 divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {TEAM.map((p, i) => (
                <li key={p.name}>
                  <button type="button" onClick={() => setActive(i)} className={`flex w-full items-center gap-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${active === i ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                    <span className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${active === i ? "bg-brand-green text-black" : "bg-white/[0.08]"}`}>{initials(p.name)}</span>
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="ml-auto truncate text-xs text-white/40">{p.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="rev-star h-4 w-4 fill-brand-green"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
      ))}
    </div>
  );
}

function Reviews() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".rev-grid", start: "top 82%" } });
    // Cards pop in from slightly tilted and scaled down, then settle
    tl.fromTo(".rev-card",
      { y: 40, scale: 0.9, rotate: (i: number) => [-2.5, 1.5, -1.5][i % 3], autoAlpha: 0 },
      { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: 0.9, stagger: 0.14, ease: "back.out(1.6)" })
      .from(".rev-star", { scale: 0, autoAlpha: 0, duration: 0.35, stagger: 0.03, ease: "back.out(3)" }, "-=0.5");
  }, { scope: ref });

  return (
    <section ref={ref} className={`py-14 sm:py-20 ${L.gutter}`}>
      <div className={L.container}>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={`mb-4 ${TYPE.label}`}>Reviews</p>
            <h2 className={`text-white ${TYPE.h2}`}>What clients say.</h2>
          </div>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-white">Ask us for a reference</a>
        </div>
        <div className="rev-grid grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="rev-card flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand-green/30 sm:p-8">
              <div>
                <Stars />
                <blockquote className="mt-5 font-display text-lg leading-snug tracking-[-0.015em] text-white/90">&ldquo;{r.text}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] font-display text-sm font-semibold text-white">{r.author.charAt(0)}</span>
                <span>
                  <span className="block text-sm font-semibold text-white">{r.author}</span>
                  <span className="block text-xs text-white/50">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".faq-item", { y: 18, autoAlpha: 0, stagger: 0.05, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".faq-list", start: "top 85%" } });
  }, { scope: ref });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section ref={ref} className={`py-14 sm:py-20 ${L.gutter}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`${L.container} grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`mb-4 ${TYPE.label}`}>FAQ</p>
          <h2 className={`text-white ${TYPE.h2}`}>Questions people ask before working with us.</h2>
          <p className={`mt-5 max-w-sm text-white/60 ${TYPE.body}`}>Straight answers. If yours isn&apos;t here, just ask.</p>

          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#15171c] p-6">
            <p className="font-display text-lg font-medium tracking-[-0.02em] text-white">Still have a question?</p>
            <p className={`mt-1 text-white/55 ${TYPE.small}`}>Book a free 20-minute call, or message the team on WhatsApp.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <BookCallButton className={`${BTN.base} ${BTN.green}`}>Book a 20-min call</BookCallButton>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={`${BTN.base} ${BTN.whatsapp}`}>Chat on WhatsApp</a>
            </div>
          </div>
        </div>

        <ul className="faq-list space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.q} className={`faq-item overflow-hidden rounded-xl border transition-colors duration-300 ${isOpen ? "border-brand-green/30 bg-brand-green/[0.04]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-green sm:px-6"
                >
                  <span className={`font-display text-[17px] font-medium tracking-[-0.015em] sm:text-lg ${isOpen ? "text-white" : "text-white/85"}`}>{faq.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-brand-green bg-brand-green text-black" : "border-white/20 text-white/70"}`}>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className={`px-5 pb-6 text-white/65 sm:px-6 ${TYPE.small} sm:text-[15px]`}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(".fc-word", { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center center", scrub: true } });
  }, { scope: ref });

  const line1 = "Ready to scale?";
  const line2 = "Let's talk.";

  return (
    <section ref={ref} className={`flex flex-col items-center justify-center text-center ${L.gutter} py-20 sm:py-28`}>
      <h2 className={`mx-auto max-w-4xl ${TYPE.statement}`}>
        <span className="block text-white">{line1.split(" ").map((w, i) => <span key={i} className="fc-word inline-block pr-[0.22em]">{w}</span>)}</span>
        <span className="mt-2 block text-white/40 font-light">{line2.split(" ").map((w, i) => <span key={i} className="fc-word inline-block pr-[0.22em]">{w}</span>)}</span>
      </h2>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <BookCallButton className={`${BTN.base} ${BTN.green} w-full sm:w-auto`}>Book a 20-min call</BookCallButton>
        <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={`${BTN.base} ${BTN.whatsapp} w-full sm:w-auto`}>Chat on WhatsApp</a>
      </div>
    </section>
  );
}