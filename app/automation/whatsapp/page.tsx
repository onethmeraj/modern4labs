"use client";

/* /automation/whatsapp — the automation system, explained.
   Workflow, features, integrations, use cases. */

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
} from "../../components/system";

const FLOW = [
  { num: "01", title: "Someone comments", desc: "A post asks for a keyword — \"DEMO\", \"PRICE\", \"JOIN\". The comment is the trigger.", meta: "Instagram · Facebook · TikTok" },
  { num: "02", title: "Auto-reply fires", desc: "They get a public reply and a direct message within seconds, while the interest is still live.", meta: "Under 5 seconds" },
  { num: "03", title: "Moved to WhatsApp", desc: "One tap takes them from the DM into a WhatsApp thread, where reply rates are far higher.", meta: "Click-to-chat hand-off" },
  { num: "04", title: "Qualified automatically", desc: "A short sequence asks the two or three questions your sales team always asks first.", meta: "Branching logic" },
  { num: "05", title: "Lands in your CRM", desc: "Name, number, source post and answers arrive as a record, tagged and assigned.", meta: "No manual entry" },
  { num: "06", title: "Followed up", desc: "Unanswered leads get timed nudges. Nothing goes cold because someone was busy.", meta: "Scheduled sequences" },
];

const FEATURES = [
  { title: "Comment-keyword triggers", desc: "Any keyword on any post becomes an entry point. Run several campaigns at once without them colliding." },
  { title: "Instant DM + WhatsApp hand-off", desc: "The gap between interest and contact is where leads die. This closes it to seconds." },
  { title: "Qualification sequences", desc: "Budget, timeline, location, course interest — asked before a human is involved." },
  { title: "Lead-source attribution", desc: "Every lead carries the post that produced it, so you know which content actually sells." },
  { title: "Business-hours routing", desc: "After-hours leads get an acknowledgement and a scheduled follow-up rather than silence." },
  { title: "Broadcast re-engagement", desc: "Past leads are a list. Re-open them with an offer instead of buying the same audience twice." },
];

const INTEGRATIONS = [
  { name: "WhatsApp Business", role: "Conversation layer" },
  { name: "ManyChat", role: "Automation engine" },
  { name: "Meta Business Suite", role: "Comment + DM triggers" },
  { name: "Instagram & Facebook", role: "Entry points" },
  { name: "Your CRM", role: "Pipeline + records" },
  { name: "Sheets / Notion", role: "Lightweight tracking" },
];

const USE_CASES = [
  { tag: "Education", title: "Course enrolment", desc: "A teacher's reel asks for a keyword. The system books the trial class without an admin touching it.", accent: "rgba(52,211,153,0.35)" },
  { tag: "Property", title: "Buyer enquiries", desc: "Listing content captures budget and suburb before the agent's first call, so nobody wastes a viewing.", accent: "rgba(103,232,249,0.35)" },
  { tag: "SaaS", title: "Demo bookings", desc: "Product content routes qualified traffic straight into a calendar, with the use case already stated.", accent: "rgba(196,181,253,0.35)" },
  { tag: "Events", title: "Seminar registration", desc: "One campaign handles registration, reminders and the day-before nudge that decides attendance.", accent: "rgba(252,211,77,0.35)" },
];

export default function WhatsAppAutomationPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="Automated WhatsApp"
        title={
          <>
            Turn a comment into a conversation.{" "}
            <span className={`italic text-brand-green ${GLOW.text}`}>Automatically.</span>
          </>
        }
        lead="Most brands lose leads in the gap between someone commenting and someone replying. This system closes that gap to seconds, qualifies the lead, and files it — before anyone on your team opens the app."
      >
        <div className="flex flex-wrap gap-4">
          <GlowButton href="/contact" className={L.button}>
            Set this up for us <ArrowRight />
          </GlowButton>
          <GlowButton href="/start" tone="ghost" className={L.button}>
            See all packages
          </GlowButton>
        </div>
      </PageHeader>

      {/* ---------- The workflow ---------- */}
      <section className={`${L.gutter} pb-8`}>
        <div className={`${L.container}`}>
          <Eyebrow className="mb-12">The workflow</Eyebrow>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {FLOW.map((step) => (
              <motion.li key={step.num} variants={fadeUp}>
                <TiltCard max={7} className="h-full">
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-colors duration-500 sm:p-8 ${S.border} ${S.panel} hover:border-brand-green/30`}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, rgba(${GLOW.rgb},0.35) 0%, transparent 70%)` }}
                    />

                    <div className="relative mb-6 flex items-center justify-between">
                      <span className={`text-brand-green ${T.label}`}>{step.num}</span>
                      <span className={`rounded-full border border-white/10 bg-black/30 px-3 py-1 ${T.label}`}>{step.meta}</span>
                    </div>

                    <h3 className="relative mb-3 font-serif text-2xl font-light text-white">{step.title}</h3>
                    <p className={`relative ${T.small}`}>{step.desc}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ---------- Scroll-glow statement ---------- */}
      <section className={`${L.gutter} py-24 sm:py-32`}>
        <div className={L.narrow}>
          <ScrollGlowStatement
            text="A lead that waits four hours for a reply is not a lead. It is a competitor's customer."
            className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-[1.15] tracking-[-0.015em]"
          />
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className={`${L.gutter} pb-24`}>
        <div className={L.container}>
          <Eyebrow className="mb-12">What's included</Eyebrow>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className={`group p-7 transition-colors duration-500 sm:p-8 ${S.panel} hover:bg-white/[0.06]`}>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full bg-brand-green ${GLOW.soft}`} />
                  <h3 className="font-serif text-lg font-light text-white">{f.title}</h3>
                </div>
                <p className={T.small}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Integrations ---------- */}
      <section className={`${L.gutter} pb-24`}>
        <div className={L.container}>
          <Eyebrow className="mb-12">Integrations</Eyebrow>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {INTEGRATIONS.map((tool) => (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                className={`group flex items-center gap-4 rounded-full border px-5 py-3 transition-colors duration-500 ${S.border} ${S.card} hover:border-brand-green/40`}
              >
                <span className="font-sans text-sm font-light text-white">{tool.name}</span>
                <span className="h-3 w-px bg-white/20" />
                <span className={T.label}>{tool.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Use cases ---------- */}
      <section className={`${L.gutter} pb-24 sm:pb-32`}>
        <div className={L.container}>
          <Eyebrow className="mb-12">Where it works</Eyebrow>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {USE_CASES.map((c) => (
              <motion.div key={c.title} variants={fadeUp}>
                <TiltCard max={6} className="h-full">
                  <div
                    className={`relative h-full overflow-hidden rounded-2xl border p-8 backdrop-blur-xl sm:p-10 ${S.border} ${S.panel}`}
                    style={{ boxShadow: `0 2px 6px rgba(0,0,0,0.5), 0 40px 90px -60px ${c.accent}` }}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <span className={`mb-5 block ${T.label}`}>{c.tag}</span>
                    <h3 className={`mb-4 text-white ${T.h3}`}>{c.title}</h3>
                    <p className={T.body}>{c.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}