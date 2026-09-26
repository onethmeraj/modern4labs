"use client";

/* /start — where the "Start a project" CTA lands.
   Packages and inclusions only. No prices: pricing is scoped per engagement
   and quoted after the call, which is also how your quotations actually work. */

import { motion } from "motion/react";
import {
  ArrowRight,
  Eyebrow,
  GLOW,
  GlowButton,
  L,
  PageHeader,
  S,
  ScrollGlowStatement,
  SiteFooter,
  SiteNav,
  T,
  TiltCard,
  fadeUp,
  stagger,
} from "../components/system";

const PACKAGES = [
  {
    num: "01",
    name: "Content Retainer",
    tag: "Most engagements start here",
    summary:
      "A monthly content engine: strategy, scripting, editing and publishing across every platform your audience actually uses.",
    includes: [
      "Content strategy and monthly calendar",
      "Ideation, question banks and scripts, sent for review before filming",
      "Short-form video production and editing",
      "Static content: ideation, design and copy",
      "Captions, publishing and platform scheduling",
      "Monthly performance report and review call",
    ],
    accent: "text-emerald-300",
    glow: "rgba(52,211,153,0.35)",
  },
  {
    num: "02",
    name: "Meta Ads",
    tag: "Setup + ongoing management",
    summary:
      "The advertising foundation built once, properly, then run and optimised month to month against real conversion data.",
    includes: [
      "Ad account structure and campaign build",
      "Meta pixel install and conversion tracking",
      "Audience, lookalike and retargeting setup",
      "Daily management, creative and angle testing",
      "Budget and bid management",
      "Winning organic content converted into ad creative",
    ],
    note: "Ad spend is paid directly to Meta and sits outside our fee.",
    accent: "text-cyan-300",
    glow: "rgba(103,232,249,0.35)",
  },
  {
    num: "03",
    name: "WhatsApp & CRM Automation",
    tag: "Capture every lead, automatically",
    summary:
      "Comment-keyword automation that moves a commenter into WhatsApp and then into your CRM, without anyone watching the inbox.",
    includes: [
      "Comment-keyword automation setup",
      "Automated DM and WhatsApp hand-off flows",
      "Lead capture and qualification sequences",
      "CRM setup and pipeline configuration",
      "Ongoing CRM management and hygiene",
      "Lead-source reporting",
    ],
    href: "/automation/whatsapp",
    accent: "text-violet-300",
    glow: "rgba(196,181,253,0.35)",
  },
  {
    num: "04",
    name: "Creative Production",
    tag: "Per-asset or bundled",
    summary:
      "Production on its own, when strategy is handled internally and you need assets that land.",
    includes: [
      "Short-form video ads: hook, captions, motion graphics",
      "Carousel ads and sequenced posts",
      "Static image ads and posts",
      "On-site filming guidance and direction",
      "Print and event design",
    ],
    accent: "text-amber-300",
    glow: "rgba(252,211,77,0.35)",
  },
  {
    num: "05",
    name: "90-Day Launch Sprint",
    tag: "Zero to running system",
    summary:
      "A fixed three-month engagement that takes a brand from nothing to a running content and acquisition system.",
    includes: [
      "Month 1 — strategy, content pillars, first production batch, profile optimisation",
      "Month 2 — product-led content, ads launch, cold and retargeting audiences",
      "Month 3 — product focus, spend scaled on winners only, demo-booking content",
      "Full 90-day report with next-phase recommendations",
      "Handover of all paid-for deliverables",
    ],
    accent: "text-rose-300",
    glow: "rgba(253,164,175,0.35)",
  },
];

const PROCESS = [
  { num: "01", title: "Discovery call", desc: "Thirty minutes. Your market, your goals, what has already been tried." },
  { num: "02", title: "Scope & quote", desc: "A written scope with deliverables, volumes and a fixed monthly figure." },
  { num: "03", title: "Strategy build", desc: "Positioning, pillars and calendar, approved by you before any filming." },
  { num: "04", title: "Production & launch", desc: "We film, edit, publish and run. You approve scripts before the camera turns on." },
  { num: "05", title: "Report & adjust", desc: "Monthly report, review call, and a scope that flexes with the results." },
];

export default function StartPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="Start a project"
        title={
          <>
            Pick the shape of the work.{" "}
            <span className={`italic text-brand-green ${GLOW.text}`}>We'll scope the rest.</span>
          </>
        }
        lead="Every engagement is quoted against a written scope — volumes, platforms and deliverables agreed up front. Below is what we build. Pricing follows the call, once we know what you actually need."
      >
        <div className="flex flex-wrap gap-4">
          <GlowButton href="/contact" className={L.button}>
            Book a discovery call <ArrowRight />
          </GlowButton>
          <GlowButton href="/automation/whatsapp" tone="ghost" className={L.button}>
            See the automation system
          </GlowButton>
        </div>
      </PageHeader>

      {/* ---------- Packages ---------- */}
      <section className={`${L.gutter} pb-8`}>
        <div className={`${L.container} mb-14`}>
          <Eyebrow>What we build</Eyebrow>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={`${L.container} grid gap-6 lg:grid-cols-2`}
        >
          {PACKAGES.map((pkg, i) => (
            <motion.div key={pkg.num} variants={fadeUp} className={i === PACKAGES.length - 1 ? "lg:col-span-2" : ""}>
              <TiltCard max={6} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-colors duration-500 sm:p-10 ${S.border} ${S.panel} hover:border-white/25`}
                  style={{ boxShadow: `0 2px 6px rgba(0,0,0,0.5), 0 40px 90px -60px ${pkg.glow}` }}
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  {/* Hover glow — same light as the buttons, so the system reads as one. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${pkg.glow} 0%, transparent 70%)` }}
                  />

                  <div className="relative mb-6 flex items-center gap-3">
                    <span className={`${pkg.accent} ${T.label}`}>{pkg.num}</span>
                    <span className="h-px w-8 bg-white/20" />
                    <span className={T.label}>{pkg.tag}</span>
                  </div>

                  <h2 className={`relative mb-4 text-white ${T.h3}`}>{pkg.name}</h2>
                  <p className={`relative mb-8 max-w-xl ${T.body}`}>{pkg.summary}</p>

                  <ul className="relative mb-8 flex flex-col gap-3">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className={`mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brand-green ${GLOW.soft}`} />
                        <span className="font-sans text-[0.875rem] font-light leading-relaxed text-white/75 sm:text-[0.9375rem]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note && <p className={`relative mb-6 ${T.label}`}>{pkg.note}</p>}

                  <div className="relative mt-auto flex flex-wrap items-center gap-4 pt-2">
                    <GlowButton href="/contact" tone="ghost" className="px-5 py-2.5">
                      Request a quote <ArrowRight size={14} />
                    </GlowButton>
                    {pkg.href && (
                      <a href={pkg.href} className={`transition-colors hover:text-white ${T.label}`}>
                        How it works →
                      </a>
                    )}
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Scroll-glow statement ---------- */}
      <section className={`${L.gutter} ${L.block}`}>
        <div className={L.narrow}>
          <ScrollGlowStatement
            text="We don't sell deliverables. We build the system that keeps producing them long after the launch."
            className={`font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-[1.15] tracking-[-0.015em]`}
          />
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className={`${L.gutter} pb-24 sm:pb-32`}>
        <div className={`${L.container}`}>
          <Eyebrow className="mb-12">How it runs</Eyebrow>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5"
          >
            {PROCESS.map((step) => (
              <motion.li key={step.num} variants={fadeUp} className={`flex flex-col gap-3 p-7 sm:p-8 ${S.panel}`}>
                <span className={`text-brand-green ${T.label}`}>{step.num}</span>
                <h3 className="font-serif text-xl font-light text-white">{step.title}</h3>
                <p className="font-sans text-[0.8125rem] font-light leading-relaxed text-white/60">{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}