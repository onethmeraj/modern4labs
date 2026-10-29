"use client";

/* /contact — where "Work with us" lands.
   No backend: the brief opens as a pre-written WhatsApp message.
   Anyone who'd rather talk can book a 20-minute call instead. */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BTN,
  BookCallButton,
  GLOW,
  L,
  PageHeader,
  S,
  SiteFooter,
  SiteNav,
  T,
  WHATSAPP_DISPLAY,
  fadeUp,
  stagger,
  whatsappLink,
} from "../components/system";

const SERVICES = [
  "Content Retainer",
  "Meta Ads",
  "Website & Tracking",
  "WhatsApp & CRM Automation",
  "Creative Production",
  "90-Day Launch Sprint",
  "Not sure yet",
];

const TIMELINES = ["Starting now", "Within a month", "This quarter", "Just exploring"];

/* /contact?service=... preselects a chip (links from the homepage use these ids) */
const SERVICE_FROM_QUERY: Record<string, string> = {
  audit: "Not sure yet",
  "short-form-video": "Content Retainer",
  "paid-ads": "Meta Ads",
  "websites-tracking": "Website & Tracking",
  "automation-crm": "WhatsApp & CRM Automation",
  "cloud-infrastructure": "Website & Tracking",
};

const NEXT_STEPS = [
  "Your message lands on WhatsApp and we reply within a day.",
  "A free 20-minute call. No slide deck, just your goals.",
  "A written scope with deliverables and a fixed monthly figure.",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", details: "", timeline: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);

  // Read ?service= without useSearchParams, so the page needs no Suspense boundary
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("service");
    const match = key ? SERVICE_FROM_QUERY[key] : undefined;
    if (match) setSelected([match]);
  }, []);

  const toggle = (service: string) =>
    setSelected((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));

  const ready = Boolean(form.name.trim() && form.email.trim() && form.details.trim());

  const handleSubmit = () => {
    if (!ready) return;
    const message = [
      "Hi Modern4labs, new project enquiry.",
      "",
      `Name: ${form.name}`,
      `Company: ${form.company || "-"}`,
      `Email: ${form.email}`,
      `Timeline: ${form.timeline || "-"}`,
      `Services: ${selected.join(", ") || "-"}`,
      "",
      "Project details:",
      form.details,
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setOpened(true);
    setTimeout(() => setOpened(false), 5000);
  };

  const field =
    "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-[15px] text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-brand-green/60 focus:bg-white/[0.05]";

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${
      on ? "border-brand-green bg-brand-green text-black font-medium" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
    }`;

  const fieldLabel = "text-sm font-medium text-white/80";

  return (
    <main className={`w-full overflow-x-clip font-sans text-white selection:bg-brand-green selection:text-black ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what you’re building. <span className="text-brand-green">We’ll tell you if we’re the right fit.</span>
          </>
        }
        lead="A short brief is enough to start. Fill this in and it opens as a WhatsApp message with your details already written. Prefer to talk? Book a free 20-minute call."
      />

      <section className={`${L.gutter} pb-14 sm:pb-20`}>
        <motion.div variants={stagger} initial="hidden" animate="show" className={`${L.container} grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10`}>
          {/* ---------- Form ---------- */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-[#101216] p-6 sm:p-8"
            style={{ boxShadow: `0 40px 100px -60px rgba(${GLOW.rgb},0.3)` }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/60 to-transparent" />

            <form
              className="flex flex-col gap-7"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={fieldLabel} htmlFor="name">Name <span className="text-brand-green">*</span></label>
                  <input id="name" required autoComplete="name" className={field} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={fieldLabel} htmlFor="company">Company</label>
                  <input id="company" autoComplete="organization" className={field} placeholder="Brand or business" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={fieldLabel} htmlFor="email">Email <span className="text-brand-green">*</span></label>
                <input id="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className={`mb-3 ${fieldLabel}`}>What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((service) => (
                    <button key={service} type="button" aria-pressed={selected.includes(service)} onClick={() => toggle(service)} className={chip(selected.includes(service))}>
                      {service}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className={`mb-3 ${fieldLabel}`}>Timeline</legend>
                <div className="flex flex-wrap gap-2">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={form.timeline === t}
                      onClick={() => setForm({ ...form, timeline: form.timeline === t ? "" : t })}
                      className={chip(form.timeline === t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <label className={fieldLabel} htmlFor="details">Project details <span className="text-brand-green">*</span></label>
                <textarea
                  id="details"
                  required
                  rows={5}
                  className={`${field} resize-none`}
                  placeholder="What are you selling, who to, and what have you already tried?"
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  aria-disabled={!ready}
                  className={`${BTN.base} ${BTN.whatsapp} ${!ready ? "cursor-not-allowed opacity-40 hover:translate-y-0" : ""}`}
                >
                  {opened ? "Opened in WhatsApp" : "Send on WhatsApp"} <ArrowRight />
                </button>
                <p className={T.meta}>
                  {opened ? "Hit send in WhatsApp to reach us." : ready ? "Opens WhatsApp with your details filled in." : "Add your name, email and project details to continue."}
                </p>
              </div>
            </form>
          </motion.div>

          {/* ---------- Aside ---------- */}
          <motion.aside variants={fadeUp} className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-xl border border-brand-green/25 bg-brand-green/[0.05] p-6 sm:p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 blur-[70px]"
                style={{ background: `radial-gradient(circle, rgba(${GLOW.rgb},0.35) 0%, transparent 70%)` }}
              />
              <p className={`relative ${T.label}`}>Prefer to talk?</p>
              <p className="relative mt-2 font-display text-2xl font-semibold tracking-[-0.025em] text-white">Book a free 20-minute call.</p>
              <p className={`relative mt-2 ${T.small}`}>Pick a time that suits you. We’ll look at your page, your ads and where leads are slipping away.</p>
              <BookCallButton className={`${BTN.base} ${BTN.green} relative mt-5 w-full sm:w-auto`}>
                Book a 20-min call <ArrowRight />
              </BookCallButton>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#15171c] p-6 sm:p-7">
              <p className={T.label}>Direct</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-display text-2xl font-semibold tracking-[-0.025em] text-white transition-colors hover:text-brand-green"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <p className={`mt-2 ${T.small}`}>Colombo, Sri Lanka. Working with brands across Sri Lanka and Australia.</p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#15171c] p-6 sm:p-7">
              <p className={T.label}>What happens next</p>
              <ol className="mt-4 flex flex-col gap-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${i === 0 ? "bg-brand-green text-black" : "border border-white/20 text-white/70"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-white/75">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className={`px-1 ${T.small}`}>
              Not ready to talk?{" "}
              <Link href="/start" className="font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-brand-green">
                Browse packages
              </Link>
            </p>
          </motion.aside>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}