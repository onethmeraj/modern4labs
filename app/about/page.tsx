"use client";

import { motion } from "motion/react";
import { SiteNav, SiteFooter, PageHeader, T, S, L, stagger, fadeUp, GlowButton, ArrowRight } from "../components/system";

const PROOF_POINTS = [
  {
    metric: "1-Sec",
    label: "Performance Budget",
    desc: "We don't ship bloated code. Every platform is engineered for lightning-fast loads and 60fps interaction.",
  },
  {
    metric: "0",
    label: "Hand-Off Bottlenecks",
    desc: "Strategy, design, and frontend code happen under one roof. No miscommunication, no delays.",
  },
  {
    metric: "100%",
    label: "Conversion-Led",
    desc: "We don't build digital art for awards; we build high-performance systems designed to turn traffic into pipeline revenue.",
  },
];

const THE_STACK = [
  { area: "Strategy & Positioning", what: "Clarity before pixels.", detail: "We nail your market angle and messaging before touching a design file." },
  { area: "Identity & UI Systems", what: "Designed once, scales forever.", detail: "Cohesive design systems so your brand looks elite across every single touchpoint." },
  { area: "Web Engineering", what: "Built for speed and conversion.", detail: "Edge architecture and clean code that outpaces your competition." },
  { area: "Growth & Automation", what: "Pipelines that actually close.", detail: "Connecting your web presence directly to CRM and WhatsApp workflows." },
];

export default function AboutPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
      <SiteNav />

      {/* Conversion-Focused Header */}
      <PageHeader
        eyebrow="The Modern4Labs Standard"
        title={
          <span>
            We build digital systems that <span className="text-brand-green">turn traffic into revenue.</span>
          </span>
        }
        lead="Stop losing high-value clients to slow, confusing websites. We combine elite engineering with direct conversion architecture so your brand commands authority from the first click."
      >
        <div className="flex flex-wrap gap-4 pt-2">
          <GlowButton href="/contact" className={L.button}>
            Book a discovery call <ArrowRight />
          </GlowButton>
          <GlowButton href="/start" tone="ghost" className={L.button}>
            Explore packages
          </GlowButton>
        </div>
      </PageHeader>

      {/* Direct Value Metrics (Replaces paragraphs with instant proof) */}
      <section className={`${L.gutter} ${L.container} pb-20 sm:pb-28`}>
        <motion.div 
          variants={stagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {PROOF_POINTS.map((item, idx) => (
            <motion.div 
              variants={fadeUp} 
              key={idx}
              className="relative rounded-3xl border border-white/[0.08] bg-[#101216] p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <span className="font-sans font-black text-4xl sm:text-5xl text-brand-green block mb-3">{item.metric}</span>
                <h3 className="font-sans font-bold text-lg text-white mb-2">{item.label}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Do & Why Trust Us (Clear, punchy breakdown) */}
      <section className={`border-t border-white/[0.08] bg-[#101216] ${L.gutter} py-20 sm:py-28`}>
        <div className={`${L.container}`}>
          <div className="mb-14 max-w-2xl">
            <p className={`mb-4 flex items-center gap-4 ${T.label}`}>
              <span className="h-px w-10 bg-brand-green" />
              How we operate
            </p>
            <h2 className={`text-white ${T.h2}`}>Everything under one roof. No agency fluff.</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {THE_STACK.map((row, i) => (
              <div 
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-8 sm:p-10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-brand-green ${T.label}`}>0{i + 1} / Discipline</span>
                  <span className="font-mono text-xs text-white/40">{row.what}</span>
                </div>
                <h3 className="font-sans font-extrabold text-xl text-white mb-3">{row.area}</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-white/65">{row.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Conversion Bottom CTA */}
      <section className={`border-t border-white/[0.08] bg-[#0c0d10] ${L.gutter} py-24 sm:py-32 text-center`}>
        <div className={`${L.container} max-w-3xl flex flex-col items-center`}>
          <span className={`mb-4 text-brand-green ${T.label}`}>Take the next step</span>
          <h2 className={`text-white ${T.h2} mb-6`}>Ready to stop losing leads to a mediocre web presence?</h2>
          <p className={`max-w-xl ${T.body} mb-10`}>
            Fill out a quick brief. It routes directly to our team, and we’ll tell you straight-up if we can scale your revenue.
          </p>
          <GlowButton href="/contact" className={L.button}>
            Tell us what you&apos;re building <ArrowRight />
          </GlowButton>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}