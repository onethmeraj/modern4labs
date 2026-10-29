"use client";

/* /start — where "Start a project" lands. Packages and inclusions.
   Every package has two ways to act: book a call, or ask about it on WhatsApp. */

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BTN,
  BookCallButton,
  CtaBand,
  L,
  PageHeader,
  S,
  ScrollGlowStatement,
  SectionHead,
  SiteFooter,
  SiteNav,
  T,
  fadeUp,
  stagger,
  whatsappLink,
} from "../components/system";

type Package = {
  num: string;
  name: string;
  tag: string;
  summary: string;
  includes: string[];
  note?: string;
  href?: string;
  featured?: boolean;
};

const PACKAGES: Package[] = [
  {
    num: "01",
    name: "Content Retainer",
    tag: "Most engagements start here",
    featured: true,
    summary: "A monthly content engine: strategy, scripting, editing and publishing across every platform your audience actually uses.",
    includes: [
      "Content strategy and monthly calendar",
      "Ideas and scripts, sent for review before filming",
      "Short-form video production and editing",
      "Static content: ideas, design and copy",
      "Captions, publishing and scheduling",
      "Monthly performance report and review call",
    ],
  },
  {
    num: "02",
    name: "Meta Ads",
    tag: "Setup + ongoing management",
    summary: "The ad foundation built once, properly, then run and improved every month against real conversion data.",
    includes: [
      "Ad account structure and campaign build",
      "Meta Pixel and Conversions API tracking",
      "Audience, lookalike and retargeting setup",
      "Weekly management, creative and angle testing",
      "Budget and bid management",
      "Best organic content turned into ad creative",
    ],
    note: "Ad spend is paid directly to Meta from your account, outside our fee.",
  },
  {
    num: "03",
    name: "Website & Tracking",
    tag: "Websites, stores and landing pages",
    summary: "A fast site built to convert, with every visitor tracked so you know exactly which ad, post or page brought each lead in.",
    includes: [
      "Website, e-commerce store or landing page",
      "Copy, design and build",
      "Meta Pixel, Conversions API and Google Analytics 4",
      "Lead forms connected to your CRM",
      "Hosting on Vercel or AWS, with monitoring",
      "Handover walkthrough of your data",
    ],
  },
  {
    num: "04",
    name: "WhatsApp & CRM Automation",
    tag: "Capture every lead, automatically",
    summary: "Comment-keyword automation that moves a commenter into WhatsApp and then into your CRM, without anyone watching the inbox.",
    includes: [
      "Comment-keyword automation setup",
      "Automated DM and WhatsApp hand-off flows",
      "Lead capture and qualification sequences",
      "GoHighLevel CRM and pipeline setup",
      "Ongoing CRM management",
      "Lead-source reporting",
    ],
    href: "/automation/whatsapp",
  },
  {
    num: "05",
    name: "Creative Production",
    tag: "Per asset or bundled",
    summary: "Production on its own, for when strategy is handled in-house and you need assets that land.",
    includes: [
      "Short-form video ads: hooks, captions, motion graphics",
      "Carousel ads and sequenced posts",
      "Static image ads and posts",
      "On-site filming and direction",
      "Print and event design",
    ],
  },
  {
    num: "06",
    name: "90-Day Launch Sprint",
    tag: "Zero to a running system",
    summary: "A fixed three-month engagement that takes a brand from nothing to a running content and lead-generation system.",
    includes: [
      "Month 1: strategy, content pillars, first shoot, profile setup",
      "Month 2: product-led content, ads launch, retargeting",
      "Month 3: spend scaled on winners only, booking-focused content",
      "Full 90-day report with next-phase plan",
      "Handover of everything we made",
    ],
  },
];

const PROCESS = [
  { num: "01", title: "Discovery call", desc: "20 minutes on your market, your goals and what you’ve already tried." },
  { num: "02", title: "Scope & quote", desc: "A written scope with deliverables, volumes and a fixed monthly figure." },
  { num: "03", title: "Strategy build", desc: "Positioning, pillars and calendar, approved by you before any filming." },
  { num: "04", title: "Produce & launch", desc: "We film, edit, build and run. You approve everything before it goes live." },
  { num: "05", title: "Report & adjust", desc: "Monthly numbers, a review call, and a scope that flexes with results." },
];

export default function StartPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="Packages"
        title={
          <>
            Pick the shape of the work. <span className="text-brand-green">We’ll scope the rest.</span>
          </>
        }
        lead="Every engagement gets a written scope with volumes, platforms and deliverables agreed up front. Here’s what we build. You get a fixed quote after a 20-minute call, before any work starts."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookCallButton className={`${BTN.base} ${BTN.green}`}>
            Book a 20-min call <ArrowRight />
          </BookCallButton>
          <Link href="/automation/whatsapp" className={`${BTN.base} ${BTN.dark}`}>
            See the automation system
          </Link>
        </div>
      </PageHeader>

      {/* ---------- Packages ---------- */}
      <section className={`${L.gutter} pb-14 sm:pb-20`}>
        <div className={L.container}>
          <SectionHead label="What we build" title="Six ways to work with us." note="Mix and match. Most clients combine two or three." />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 lg:grid-cols-2"
          >
            {PACKAGES.map((pkg) => (
              <motion.article
                key={pkg.num}
                variants={fadeUp}
                className={`group relative flex flex-col overflow-hidden rounded-xl border p-7 transition-colors duration-300 sm:p-8 ${
                  pkg.featured ? "border-brand-green/30 bg-brand-green/[0.04]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs tabular-nums text-white/50">{pkg.num}</span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${pkg.featured ? "border-brand-green/40 text-brand-green" : "border-white/15 text-white/60"}`}>
                    {pkg.tag}
                  </span>
                </div>

                <h3 className={`mt-5 text-white ${T.h3}`}>{pkg.name}</h3>
                <p className={`mt-3 ${T.small}`}>{pkg.summary}</p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.08] pt-6">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <svg viewBox="0 0 24 24" className="mt-[3px] h-4 w-4 shrink-0 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                {pkg.note && <p className={`mt-5 ${T.meta}`}>{pkg.note}</p>}

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                  <BookCallButton className={`${BTN.base} ${pkg.featured ? BTN.green : BTN.white}`}>
                    Get a quote <ArrowRight size={14} />
                  </BookCallButton>
                  <a
                    href={whatsappLink(`Hi Modern4labs, I'm interested in the ${pkg.name} package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${BTN.base} ${BTN.dark}`}
                  >
                    Ask on WhatsApp
                  </a>
                  {pkg.href && (
                    <Link href={pkg.href} className="text-sm font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-white">
                      How it works
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className={`border-y border-white/[0.06] bg-[#101216] ${L.gutter} py-16 sm:py-24`}>
        <div className={L.narrow}>
          <ScrollGlowStatement
            text="We don’t sell deliverables. We build the system that keeps producing leads long after launch."
            className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.035em]"
          />
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className={`${L.gutter} py-14 sm:py-20`}>
        <div className={L.container}>
          <SectionHead label="How it runs" title="From first call to first report." note="Step one is free and takes 20 minutes." />

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5"
          >
            {PROCESS.map((step, i) => (
              <motion.li key={step.num} variants={fadeUp} className="flex flex-col gap-3 bg-[#0c0d10] p-6 sm:p-7">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ${
                    i === 0 ? "bg-brand-green text-black" : "border border-white/20 text-white/70"
                  }`}
                >
                  {step.num}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
                <p className={T.small}>{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <CtaBand title="Not sure which package fits?" lead="Tell us what you’re selling and who to. In 20 minutes we’ll point you to the right mix, with a fixed quote to follow." />
      <SiteFooter />
    </main>
  );
}