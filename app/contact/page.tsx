"use client";

/* /contact — where "Work with us" lands.
   No backend: the form composes a WhatsApp message and opens it as a draft. */

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eyebrow,
  GLOW,
  GlowButton,
  L,
  PageHeader,
  S,
  SiteFooter,
  SiteNav,
  T,
  fadeUp,
  stagger,
} from "../components/system";

const SERVICES = [
  "Content Retainer",
  "Meta Ads",
  "WhatsApp & CRM Automation",
  "Creative Production",
  "90-Day Launch Sprint",
  "Not sure yet",
];

const TIMELINES = ["Starting now", "Within a month", "This quarter", "Exploring"];

/* wa.me format: country code, no leading zero, no plus sign. */
const WHATSAPP_NUMBER = "94776822434";
const WHATSAPP_DISPLAY = "+94 77 682 2434";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", details: "", timeline: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);

  const toggle = (service: string) =>
    setSelected((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));

  const ready = Boolean(form.name.trim() && form.email.trim() && form.details.trim());

  const handleSubmit = () => {
    if (!ready) return;

    const message = [
      "Hi Modern4labs — new project enquiry.",
      "",
      `Name: ${form.name}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Timeline: ${form.timeline || "—"}`,
      `Services: ${selected.join(", ") || "—"}`,
      "",
      "Project details:",
      form.details,
    ].join("\n");

    /* encodeURIComponent turns the newlines into %0A, which WhatsApp
       renders as real line breaks in the draft. */
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setOpened(true);
    /* Reset so a second enquiry isn't blocked by a dead button. */
    setTimeout(() => setOpened(false), 5000);
  };

  const field =
    "w-full rounded-xl border border-white/[0.12] bg-black/30 px-4 py-3.5 font-sans text-[0.9375rem] font-light text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-brand-green/50 focus:bg-black/50";

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2.5 font-sans text-[0.8125rem] font-light transition-all duration-400 ${
      on
        ? `border-brand-green/50 bg-brand-green/15 text-brand-green ${GLOW.soft}`
        : "border-white/[0.12] bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
    }`;

  return (
    <main className={`w-full overflow-x-clip font-sans text-white ${S.page}`}>
      <SiteNav />

      <PageHeader
        eyebrow="Work with us"
        title={
          <>
            Tell us what you're building.{" "}
            <span className={`italic text-brand-green ${GLOW.text}`}>We'll tell you if we're right for it.</span>
          </>
        }
        lead="A short brief is enough to start. Fill this in and it opens as a WhatsApp message with your details already written — you just hit send."
      />

      <section className={`${L.gutter} pb-24 sm:pb-32`}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className={`${L.container} grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20`}
        >
          {/* ---------- Form ---------- */}
          <motion.div
            variants={fadeUp}
            className={`relative overflow-hidden rounded-3xl border p-7 backdrop-blur-xl sm:p-10 ${S.border} ${S.panel}`}
            style={{ boxShadow: `0 2px 6px rgba(0,0,0,0.5), 0 50px 100px -60px rgba(${GLOW.rgb},0.28)` }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />

            <div className="flex flex-col gap-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={T.label} htmlFor="name">Name</label>
                  <input
                    id="name"
                    className={field}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={T.label} htmlFor="company">Company</label>
                  <input
                    id="company"
                    className={field}
                    placeholder="Brand or business"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={T.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={field}
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Service selection — chips, because a dropdown hides the range. */}
              <div className="flex flex-col gap-4">
                <span className={T.label}>What do you need?</span>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggle(service)}
                      className={chip(selected.includes(service))}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className={T.label}>Timeline</span>
                <div className="flex flex-wrap gap-2.5">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, timeline: form.timeline === t ? "" : t })}
                      className={chip(form.timeline === t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={T.label} htmlFor="details">Project details</label>
                <textarea
                  id="details"
                  rows={5}
                  className={`${field} resize-none`}
                  placeholder="What are you selling, who to, and what has already been tried?"
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <GlowButton
                  onClick={handleSubmit}
                  className={`${L.button} ${!ready ? "pointer-events-none opacity-40" : ""}`}
                >
                  {opened ? "Opened in WhatsApp" : "Send on WhatsApp"} <ArrowRight />
                </GlowButton>
                <span className={T.label}>
                  {opened
                    ? "Hit send in WhatsApp to reach us."
                    : "Opens WhatsApp with your details filled in."}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ---------- Aside ---------- */}
          <motion.aside variants={fadeUp} className="flex flex-col gap-10">
            <div>
              <Eyebrow className="mb-6">Direct</Eyebrow>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-2xl font-light text-white transition-colors hover:text-brand-green sm:text-3xl"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <p className={`mt-6 ${T.body}`}>
                Colombo, Sri Lanka — working with brands across Sri Lanka and Australia.
              </p>
            </div>

            <div className={`rounded-2xl border p-7 ${S.border} ${S.card}`}>
              <span className={`mb-5 block ${T.label}`}>What happens next</span>
              <ol className="flex flex-col gap-4">
                {[
                  "Your message lands on WhatsApp and we reply within a day.",
                  "A 30-minute discovery call, no deck.",
                  "A written scope with deliverables and a fixed monthly figure.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-brand-green">0{i + 1}</span>
                    <span className="font-sans text-[0.875rem] font-light leading-relaxed text-white/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className={`mb-4 ${T.label}`}>Not ready to talk?</p>
              <GlowButton href="/start" tone="ghost" className="px-5 py-2.5">
                Browse packages
              </GlowButton>
            </div>
          </motion.aside>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}