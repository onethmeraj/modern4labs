"use client";

/* /about — who we are, how we work, the team. Same type, spacing and
   buttons as the homepage, ending on the shared call to action. */

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BTN,
  BookCallButton,
  ArrowRight,
  CountUp,
  CtaBand,
  EASE,
  L,
  PageHeader,
  S,
  SectionHead,
  SiteFooter,
  SiteNav,
  T,
  fadeUp,
  stagger,
} from "../components/system";
import { RESULTS, TEAM } from "../components/Content";

/* How a project runs once it's handed over: who owns each step.
   Owners are matched to TEAM by first name. */
type Owner = "Eshan" | "Oneth" | "Riftha";
type Step = { owners: Owner[]; title: string; desc: string };
type Playbook = { id: string; label: string; summary: string; steps: Step[] };

/* Eshan leads every client and the strategy. Eshan and Oneth build together.
   Riftha finalises requirements, scripts, emails and handover documents. */
const PLAYBOOKS: Playbook[] = [
  {
    id: "website",
    label: "Website or landing page",
    summary: "A site that loads fast, converts, and tells you exactly where every lead came from.",
    steps: [
      { owners: ["Eshan"], title: "Kick-off and strategy", desc: "A 20-minute call on your goals, audience and deadline. Eshan shapes the plan and stays your contact from here." },
      { owners: ["Riftha"], title: "Requirements locked in", desc: "Every page, feature and deadline written into a requirements document and checked with you before work starts." },
      { owners: ["Eshan", "Oneth"], title: "Design and build", desc: "Built mobile-first and fast. You get a private preview link to review before anything goes live." },
      { owners: ["Oneth"], title: "Tracking and CRM", desc: "Meta Pixel, Conversions API and GA4 installed, and every form connected to GoHighLevel." },
      { owners: ["Riftha"], title: "Final check", desc: "Every requirement ticked off and every form tested, so nothing reaches you half-finished." },
      { owners: ["Eshan", "Riftha"], title: "Launch and handover", desc: "We go live, walk you through your data, and you get a handover document with every login and setting." },
    ],
  },
  {
    id: "social",
    label: "Social media and content",
    summary: "A steady flow of content that sounds like you, posted on time, with numbers you can see.",
    steps: [
      { owners: ["Eshan"], title: "Onboarding and strategy", desc: "Content pillars, hooks and a monthly calendar, approved by you before production starts." },
      { owners: ["Riftha"], title: "Scripts and captions", desc: "Every script and caption written, checked against the brief and sent to you for approval." },
      { owners: ["Eshan"], title: "Shoots and edits", desc: "A planned shoot so you only need to show up, then fast-paced edits built around strong hooks." },
      { owners: ["Eshan", "Oneth"], title: "Publish and track", desc: "Posts scheduled across your platforms, with profile links tracked so you see which posts bring enquiries." },
      { owners: ["Eshan"], title: "Monthly review", desc: "Results, what worked, and a call to plan the next month." },
    ],
  },
  {
    id: "event",
    label: "Event launch",
    summary: "Branding, promotion and registrations handled together, all working back from your event date.",
    steps: [
      { owners: ["Eshan"], title: "Countdown plan and concept", desc: "A timeline built backwards from the event date, plus the campaign idea and event look." },
      { owners: ["Riftha"], title: "Details and copy finalised", desc: "Event details, scripts, emails and WhatsApp messages written and checked before anything is built." },
      { owners: ["Eshan", "Oneth"], title: "Event website", desc: "Landing page with registration, Meta Pixel and Conversions API, so every sign-up is tracked." },
      { owners: ["Oneth"], title: "Reminders on autopilot", desc: "Automated confirmations and day-before reminders on WhatsApp and email that keep attendance high." },
      { owners: ["Eshan"], title: "Promotion", desc: "Teasers, announcements and ads that drive people to register." },
      { owners: ["Eshan", "Riftha"], title: "Wrap-up and handover", desc: "Registrations, sources and attendance in one report, plus a handover document for next time." },
    ],
  },
  {
    id: "ads",
    label: "Ads and lead generation",
    summary: "Campaigns that bring in real enquiries, measured from the first click to the booked call.",
    steps: [
      { owners: ["Eshan"], title: "Brief and strategy", desc: "Who you want to reach, your offer and what a good lead looks like for you." },
      { owners: ["Oneth"], title: "Tracking first", desc: "Pixel, Conversions API and CRM set up before a cent is spent, so nothing goes unmeasured." },
      { owners: ["Riftha", "Eshan"], title: "Scripts and creative", desc: "Ad scripts and copy written and checked, then turned into videos and visuals with several angles to test." },
      { owners: ["Eshan", "Oneth"], title: "Launch and test", desc: "Campaigns go live, weak ads are cut and budget moves to what works." },
      { owners: ["Oneth"], title: "Instant follow-up", desc: "New leads get a WhatsApp or email reply in minutes through GoHighLevel." },
      { owners: ["Eshan"], title: "Numbers and next steps", desc: "Leads, cost per lead and bookings, with a clear plan for the next month." },
    ],
  },
];

/* Check these match how you actually work before going live. */
const PROMISES = [
  { title: "One point of contact", desc: "Eshan leads your project from the first call to launch. You always know who to message." },
  { title: "Nothing missed", desc: "Riftha checks every requirement before work starts and again before handover." },
  { title: "You approve everything", desc: "Scripts, designs and pages are signed off by you before they go live." },
  { title: "Everything is yours", desc: "Ad accounts, pages, content and data stay in your name, with a handover document." },
];

const firstName = (n: string) => n.split(" ")[0];
const memberByFirst = (n: Owner) => TEAM.find((m) => firstName(m.name) === n);

const BELIEFS = [
  { title: "Posting isn’t marketing.", desc: "A full feed doesn’t mean anyone is paying attention." },
  { title: "Ordinary gets scrolled past.", desc: "Content that looks like everyone else’s is invisible." },
  { title: "Attention needs a next step.", desc: "Views mean nothing if nobody messages, books or buys." },
];

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

function OwnerChip({ name }: { name: Owner }) {
  const m = memberByFirst(name);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-green/40 to-[#14301c] text-[10px] font-semibold text-white">
        {initials(m?.name ?? name)}
      </span>
      <span className="text-xs font-medium text-white/80">{name}</span>
    </span>
  );
}

function HandOver() {
  const [active, setActive] = useState(0);
  const pb = PLAYBOOKS[active];
  const involved = Array.from(new Set(pb.steps.flatMap((s) => s.owners)));

  return (
    <section className={`border-y border-white/[0.06] bg-[#101216] ${L.gutter} py-14 sm:py-20`}>
      <div className={L.container}>
        <SectionHead
          label="If you hand it over to us"
          title="Here’s exactly what happens next."
          note="Pick a project type to see each step and who on our team owns it."
        />

        <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10">
          {/* Project types */}
          <div role="tablist" aria-label="Project type" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible">
            {PLAYBOOKS.map((p, i) => {
              const on = active === i;
              return (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`pb-${p.id}`}
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-left text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${
                    on ? "border-brand-green bg-brand-green text-black" : "border-white/10 text-white/75 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {p.label}
                  <svg viewBox="0 0 24 24" className={`hidden h-4 w-4 shrink-0 transition-transform lg:block ${on ? "translate-x-0.5" : "opacity-40"}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Playbook */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pb.id}
              id={`pb-${pb.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-xl border border-white/[0.08] bg-[#0c0d10] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-md">
                  <h3 className={`text-white ${T.h3}`}>{pb.label}</h3>
                  <p className={`mt-2 ${T.small}`}>{pb.summary}</p>
                </div>
                <div>
                  <p className={`mb-2 ${T.meta}`}>Your team on this</p>
                  <div className="flex flex-wrap gap-2">
                    {involved.map((o) => <OwnerChip key={o} name={o} />)}
                  </div>
                </div>
              </div>

              <ol className="relative mt-2">
                {pb.steps.map((st, i) => (
                  <motion.li
                    key={st.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: EASE }}
                    className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 py-5 sm:grid-cols-[2.25rem_1fr_auto] sm:items-start"
                  >
                    {/* connecting line */}
                    {i < pb.steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-[1.0625rem] top-[3.25rem] w-px bg-white/10" />}
                    <span className={`relative grid h-9 w-9 place-items-center rounded-full text-xs font-semibold ${i === 0 ? "bg-brand-green text-black" : "border border-white/20 bg-[#0c0d10] text-white/75"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1.5">
                      <p className="font-display text-lg font-semibold tracking-[-0.02em] text-white">{st.title}</p>
                      <p className={`mt-1 max-w-xl ${T.small}`}>{st.desc}</p>
                    </div>
                    <div className="col-start-2 mt-3 flex flex-wrap gap-2 sm:col-start-3 sm:mt-1.5 sm:justify-end">
                      {st.owners.map((o) => <OwnerChip key={o} name={o} />)}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* What stays the same on every project */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROMISES.map((p) => (
            <motion.li key={p.title} variants={fadeUp} className="bg-[#101216] p-6">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              <p className="mt-3 font-display text-base font-semibold tracking-[-0.015em] text-white">{p.title}</p>
              <p className={`mt-1 ${T.small}`}>{p.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="About Modern4Labs"
        title={
          <>
            One studio for content, ads and tech. <span className="text-brand-green">Built to bring in leads.</span>
          </>
        }
        lead="Most brands juggle a videographer, an ads freelancer and a web developer who never talk to each other. With us, each part of your project has a clear owner on one small team, and you can see exactly who does what."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookCallButton className={`${BTN.base} ${BTN.green}`}>
            Book a 20-min call <ArrowRight />
          </BookCallButton>
          <Link href="/start" className={`${BTN.base} ${BTN.dark}`}>
            See packages
          </Link>
        </div>
      </PageHeader>

      {/* ---------- Results ---------- */}
      <section className={`${L.gutter} pb-14 sm:pb-20`}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`${L.container} grid gap-5 sm:grid-cols-3`}
        >
          {RESULTS.map((r) => (
            <motion.div key={r.label} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold tracking-[-0.04em] text-brand-green">
                <CountUp value={r.value} />
              </p>
              <p className="mt-3 font-medium text-white/90">{r.label}</p>
              <p className={`mt-1 ${T.meta}`}>{r.client}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Team ---------- */}
      <section className={`${L.gutter} py-14 sm:py-20`}>
        <div className={L.container}>
          <SectionHead label="Who we are" title="The people behind your growth." note="You talk to the people doing the work, not an account manager." />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 md:grid-cols-3"
          >
            {TEAM.map((m) => (
              <motion.li
                key={m.name}
                variants={fadeUp}
                className="group flex flex-col rounded-xl border border-white/[0.08] bg-[#15171c] p-6 transition-colors duration-300 hover:border-brand-green/30 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-brand-green/35 via-[#14301c] to-[#0c0d10] grayscale transition duration-500 group-hover:grayscale-0">
                    {m.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[50%_20%]" />
                    ) : (
                      <span className="grid h-full w-full place-items-center font-display text-xl font-semibold text-white/85">{initials(m.name)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold tracking-[-0.02em] text-white">{m.name}</p>
                    <p className="text-sm font-medium text-brand-green">{m.title}</p>
                  </div>
                </div>

                <p className={`mt-5 ${T.meta}`}>{m.role}</p>
                <p className={`mt-3 ${T.small}`}>{m.bio}</p>

                <div className="mt-auto pt-6">
                  <div className="grid grid-cols-[1fr_auto] gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08]">
                    <span className="bg-[#15171c] px-3 py-2.5 text-xs leading-snug text-white/70">{m.qualification}</span>
                    <span className="bg-[#15171c] px-3 py-2.5 text-right text-xs font-semibold text-white">{m.experience}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---------- Hand-over playbooks ---------- */}
      <HandOver />

      {/* ---------- Beliefs ---------- */}
      <section className={`${L.gutter} py-14 sm:py-20`}>
        <div className={L.container}>
          <SectionHead label="What we believe" title="Three rules behind every project." />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
          >
            {BELIEFS.map((b) => (
              <motion.li key={b.title} variants={fadeUp} className="bg-[#0c0d10] p-7 sm:p-8">
                <span className="mb-4 block h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_12px_rgba(36,210,56,0.6)]" />
                <p className="font-display text-xl font-semibold tracking-[-0.02em] text-white">{b.title}</p>
                <p className={`mt-2 ${T.small}`}>{b.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}