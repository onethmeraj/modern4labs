"use client";

/* /automation/whatsapp — the comment-to-CRM system, explained:
   workflow, what's included, integrations, where it works. */

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BTN,
  BookCallButton,
  CtaBand,
  GLOW,
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
} from "../../components/system";

const FLOW = [
  { num: "01", title: "Someone comments", desc: "A post asks for a keyword like “DEMO”, “PRICE” or “JOIN”. The comment is the trigger.", meta: "Instagram, Facebook, TikTok" },
  { num: "02", title: "Auto-reply fires", desc: "They get a public reply and a direct message within seconds, while they’re still interested.", meta: "Under 5 seconds" },
  { num: "03", title: "Moved to WhatsApp", desc: "One tap takes them from the DM into a WhatsApp chat, where reply rates are far higher.", meta: "Click-to-chat" },
  { num: "04", title: "Qualified automatically", desc: "A short sequence asks the two or three questions your sales team always asks first.", meta: "Branching logic" },
  { num: "05", title: "Lands in your CRM", desc: "Name, number, source post and answers arrive in GoHighLevel, tagged and assigned.", meta: "No manual entry" },
  { num: "06", title: "Followed up", desc: "Leads who don’t reply get timed nudges. Nothing goes cold because someone was busy.", meta: "Scheduled sequences" },
];

const FEATURES = [
  { title: "Comment-keyword triggers", desc: "Any keyword on any post becomes an entry point. Run several campaigns at once without them colliding." },
  { title: "Instant DM + WhatsApp hand-off", desc: "The gap between interest and contact is where leads die. This closes it to seconds." },
  { title: "Qualification sequences", desc: "Budget, timeline, location or course interest, asked before a person gets involved." },
  { title: "Lead-source attribution", desc: "Every lead carries the post or ad that produced it, so you know which content actually sells." },
  { title: "Business-hours routing", desc: "After-hours leads get an instant acknowledgement and a scheduled follow-up instead of silence." },
  { title: "Broadcast re-engagement", desc: "Past leads are a list. Re-open them with an offer instead of paying for the same audience twice." },
];

const INTEGRATIONS = [
  { name: "WhatsApp Business", role: "Conversations" },
  { name: "GoHighLevel", role: "CRM + automation" },
  { name: "Meta Business Suite", role: "Comment + DM triggers" },
  { name: "Instagram & Facebook", role: "Entry points" },
  { name: "Meta Pixel & CAPI", role: "Ad attribution" },
  { name: "Google Sheets", role: "Simple reporting" },
];

const USE_CASES = [
  { tag: "Education", title: "Course enrolment", desc: "A teacher’s reel asks for a keyword. The system books the trial class without an admin touching it." },
  { tag: "Property", title: "Buyer enquiries", desc: "Listing content captures budget and suburb before the agent’s first call, so nobody wastes a viewing." },
  { tag: "Retail", title: "Product orders", desc: "Comment “SIZE” or “PRICE” and get sizes, prices and an order link in WhatsApp straight away." },
  { tag: "Events", title: "Registrations", desc: "One campaign handles registration, reminders and the day-before nudge that decides attendance." },
];

export default function WhatsAppAutomationPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="WhatsApp automation"
        title={
          <>
            Turn a comment into a conversation. <span className="text-brand-green">Automatically.</span>
          </>
        }
        lead="Most brands lose leads in the gap between someone commenting and someone replying. This system closes that gap to seconds, qualifies the lead and files it in your CRM, before anyone on your team opens the app."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookCallButton className={`${BTN.base} ${BTN.green}`}>
            Set this up for us <ArrowRight />
          </BookCallButton>
          <Link href="/start" className={`${BTN.base} ${BTN.dark}`}>
            See all packages
          </Link>
        </div>
      </PageHeader>

      {/* ---------- Workflow ---------- */}
      <section className={`${L.gutter} pb-14 sm:pb-20`}>
        <div className={L.container}>
          <SectionHead label="The workflow" title="From comment to CRM in six steps." note="Runs on its own, day and night." />

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3"
          >
            {FLOW.map((step) => (
              <motion.li key={step.num} variants={fadeUp} className="group relative flex flex-col bg-[#0c0d10] p-6 transition-colors duration-300 hover:bg-[#101216] sm:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, rgba(${GLOW.rgb},0.3) 0%, transparent 70%)` }}
                />
                <div className="relative flex items-center justify-between gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-green text-xs font-semibold text-black">{step.num}</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">{step.meta}</span>
                </div>
                <h3 className="relative mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
                <p className={`relative mt-2 ${T.small}`}>{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className={`border-y border-white/[0.06] bg-[#101216] ${L.gutter} py-16 sm:py-24`}>
        <div className={L.narrow}>
          <ScrollGlowStatement
            text="A lead that waits four hours for a reply isn’t a lead anymore. It’s a competitor’s customer."
            className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.035em]"
          />
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className={`${L.gutter} py-14 sm:py-20`}>
        <div className={L.container}>
          <SectionHead label="What’s included" title="Everything it takes to never miss a lead." />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.li key={f.title} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-brand-green/30 sm:p-7">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-white">{f.title}</h3>
                <p className={`mt-2 ${T.small}`}>{f.desc}</p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Integrations */}
          <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.08] pt-10 lg:flex-row lg:items-center lg:gap-10">
            <p className={`shrink-0 ${T.label}`}>Works with</p>
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2.5"
            >
              {INTEGRATIONS.map((tool) => (
                <motion.li
                  key={tool.name}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition-colors duration-300 hover:border-brand-green/40"
                >
                  <span className="text-sm font-medium text-white">{tool.name}</span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="text-xs text-white/50">{tool.role}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ---------- Use cases ---------- */}
      <section className={`border-t border-white/[0.06] ${L.gutter} py-14 sm:py-20`}>
        <div className={L.container}>
          <SectionHead label="Where it works" title="Any business that sells through conversations." />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {USE_CASES.map((c) => (
              <motion.li key={c.title} variants={fadeUp} className="rounded-xl border border-white/[0.08] bg-[#15171c] p-7 transition-colors duration-300 hover:border-brand-green/30 sm:p-8">
                <span className="rounded-full border border-brand-green/30 px-3 py-1 text-xs font-medium text-brand-green">{c.tag}</span>
                <h3 className={`mt-5 text-white ${T.h3}`}>{c.title}</h3>
                <p className={`mt-2 ${T.small}`}>{c.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <CtaBand
        title="Stop losing leads in the inbox."
        lead="Book a free 20-minute call and we’ll map how this system would work for your posts, your questions and your CRM."
        whatsappText="Hi Modern4labs, I'd like to set up WhatsApp automation."
      />
      <SiteFooter />
    </main>
  );
}