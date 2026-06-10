"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

function AnimateIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-stretch border-y border-foreground/[0.35]">
      <div className="flex items-center px-5 py-2.5 border-r border-foreground/[0.35] shrink-0 bg-[#1a1a1a]">
        <span
          className="text-[11px] tracking-[0.1em] text-foreground/50"
          style={alphaLyrae}
        >
          {label}
        </span>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-20" />
      </div>
    </div>
  );
}

const services = [
  {
    num: "01",
    title: "AI Engineering",
    tag: "Intelligence Layer",
    description:
      "We design and deploy production-grade AI systems — RAG pipelines, agentic workflows, LLM fine-tuning, and custom model integrations. Not demos. Not prototypes. Systems that work under real load, for real users.",
    capabilities: [
      "RAG & vector search pipelines",
      "LLM fine-tuning & prompt engineering",
      "Agentic workflow orchestration",
      "AI-native product architecture",
    ],
    accent: true,
  },
  {
    num: "02",
    title: "SAP ABAP",
    tag: "Enterprise Systems",
    description:
      "Deep SAP ABAP expertise for custom module development, legacy system migration, and enterprise workflow automation. We write clean, maintainable ABAP that integrates seamlessly with your existing SAP landscape.",
    capabilities: [
      "Custom ABAP module development",
      "SAP ERP / S/4HANA integration",
      "Legacy migration & refactoring",
      "BAPI, RFC & IDoc development",
    ],
    accent: false,
  },
  {
    num: "03",
    title: "Android Development",
    tag: "Mobile Engineering",
    description:
      "Native Android applications built for performance, reliability, and scale. From architecture design to Play Store deployment — Kotlin-first, modern Jetpack Compose, and rigorously tested across devices.",
    capabilities: [
      "Kotlin & Jetpack Compose",
      "Offline-first architecture",
      "Firebase & backend integration",
      "Play Store deployment & optimization",
    ],
    accent: false,
  },
  {
    num: "04",
    title: "GTM Strategy",
    tag: "Growth & Marketing",
    description:
      "Go-to-market strategy built for B2B software companies. We map your ICP, craft positioning that converts, and build repeatable growth engines — from cold outbound to content-led pipeline.",
    capabilities: [
      "ICP definition & market segmentation",
      "Positioning & messaging frameworks",
      "Content-led & outbound GTM motions",
      "Product-led growth strategy",
    ],
    accent: false,
  },
  {
    num: "05",
    title: "Outsourced Engineers",
    tag: "Embedded Talent",
    description:
      "Senior engineers embedded directly into your team. No ramp-up theatrics — they ship from week one. Flexible engagements, vetted talent, and full ownership of their domain.",
    capabilities: [
      "Dedicated senior engineers",
      "Full-stack, AI, mobile & backend",
      "Flexible part-time or full-time",
      "Direct Slack & stand-up integration",
    ],
    accent: false,
  },
];

function ServiceCard({
  service,
  index,
  isLast,
}: {
  service: (typeof services)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <AnimateIn delay={index * 0.07}>
      <div
        className={`group relative h-full flex flex-col py-10 px-8 md:px-10 ${
          !isLast ? "border-b border-foreground/[0.35]" : ""
        } hover:bg-foreground/[0.02] transition-colors duration-300`}
      >
        {/* Corner accent for AI service */}
        {service.accent && (
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-accent/10" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
          </div>
        )}

        <div className="flex items-start justify-between mb-8">
          <span
            className="text-[10px] text-foreground/20 tracking-[0.15em]"
            style={alphaLyrae}
          >
            {service.num}
          </span>
          <span
            className="text-[10px] tracking-[0.12em] text-foreground/35 border border-foreground/[0.15] px-2.5 py-1"
            style={alphaLyrae}
          >
            {service.tag}
          </span>
        </div>

        <h2
          className={`text-2xl md:text-[28px] font-medium mb-4 tracking-tight transition-colors duration-200 ${
            service.accent
              ? "text-gradient"
              : "group-hover:text-foreground/90"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {service.title}
        </h2>

        <p className="text-foreground/45 leading-[1.75] text-[15px] mb-8 flex-1 max-w-2xl">
          {service.description}
        </p>

        <div className="mb-10">
          <ul className="space-y-2">
            {service.capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[13px] text-foreground/50"
              >
                <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://cal.com/zuolabs/30min"
          className="group/cta relative inline-flex items-center text-accent text-[14px] tracking-[0.08em] transition-all hover:pl-2 w-fit"
          style={alphaLyrae}
        >
          <span className="absolute left-0 opacity-0 group-hover/cta:opacity-100 transition-opacity">
            →
          </span>
          <span className="group-hover/cta:text-foreground transition-colors">
            Talk to Us
          </span>
          <span className="ml-1 group-hover/cta:ml-2 transition-all">→</span>
        </a>
      </div>
    </AnimateIn>
  );
}

function ServicesGrid() {
  // Layout: 2 columns on desktop — first service spans full width as hero, then 2 per row
  const [hero, ...rest] = services;

  return (
    <section className="border-b border-foreground/[0.35]">
      <SectionHeader label="What we do" />

      {/* Hero service — AI Engineering */}
      <AnimateIn>
        <div className="relative border-b border-foreground/[0.35] py-14 px-8 md:px-12 grid md:grid-cols-2 gap-10 md:gap-20 hover:bg-foreground/[0.02] transition-colors duration-300 group overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span
                className="text-[10px] text-foreground/20 tracking-[0.15em]"
                style={alphaLyrae}
              >
                {hero.num}
              </span>
              <span
                className="text-[10px] tracking-[0.12em] text-accent/70 border border-accent/20 px-2.5 py-1 bg-accent/5"
                style={alphaLyrae}
              >
                {hero.tag}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-gradient"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {hero.title}
            </h2>
            <p className="text-foreground/45 leading-[1.8] text-[16px] max-w-xl">
              {hero.description}
            </p>
          </div>

          <div className="relative z-10 flex flex-col justify-between">
            <ul className="space-y-3 mb-10">
              {hero.capabilities.map((cap, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[14px] text-foreground/55 border-b border-foreground/[0.08] pb-3 last:border-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
            <a
              href="https://cal.com/zuolabs/30min"
              className="inline-flex items-center px-6 py-3 bg-accent text-[#0d0d0d] text-[13px] hover:bg-accent/90 transition-colors w-fit"
              style={alphaLyrae}
            >
              start a project →
            </a>
          </div>
        </div>
      </AnimateIn>

      {/* Remaining services — 2 columns */}
      <div className="grid md:grid-cols-2">
        {rest.map((service, i) => (
          <div
            key={service.num}
            className={`${i % 2 === 0 ? "border-r border-foreground/[0.35]" : ""}`}
          >
            <ServiceCard
              service={service}
              index={i + 1}
              isLast={i === rest.length - 1 || i === rest.length - 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We map your problem space, tech constraints, and growth goals in a structured 60-min session.",
    },
    {
      num: "02",
      title: "Scoping",
      desc: "Clear deliverables, timeline, and a fixed or retainer engagement — no surprises.",
    },
    {
      num: "03",
      title: "Execution",
      desc: "Embedded engineers ship weekly. You see progress in production, not just Figma.",
    },
    {
      num: "04",
      title: "Handoff",
      desc: "Full documentation, knowledge transfer, and optional ongoing support retainer.",
    },
  ];

  return (
    <section className="border-b border-foreground/[0.35]">
      <SectionHeader label="How we work" />
      <div className="grid grid-cols-2 md:grid-cols-4">
        {steps.map((step, i) => (
          <AnimateIn key={step.num} delay={i * 0.08}>
            <div
              className={`py-10 px-8 flex flex-col ${
                i < 3 ? "border-r border-foreground/[0.35]" : ""
              } border-b border-foreground/[0.35] md:border-b-0`}
            >
              <span
                className="text-[10px] text-foreground/20 tracking-[0.15em] mb-6 block"
                style={alphaLyrae}
              >
                {step.num}
              </span>
              <h3
                className="text-[17px] font-medium mb-3"
                style={alphaLyrae}
              >
                {step.title}
              </h3>
              <p className="text-foreground/40 text-[13px] leading-[1.7]">
                {step.desc}
              </p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="border-b border-foreground/[0.35] relative overflow-hidden">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent pointer-events-none" />
      <AnimateIn>
        <div className="py-16 md:py-20 px-8 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div>
            <p
              className="text-[11px] text-foreground/30 tracking-[0.12em] mb-3"
              style={alphaLyrae}
            >
              Ready to ship?
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s build something that
              <br />
              <span className="text-gradient">actually works.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://cal.com/zuolabs/30min"
              className="inline-flex items-center px-6 py-3 bg-accent text-[#0d0d0d] text-[13px] hover:bg-accent/90 transition-colors"
              style={alphaLyrae}
            >
              book a call →
            </a>
            <a
              href="mailto:hello@zuolabs.com"
              className="inline-flex items-center px-6 py-3 border border-foreground/[0.3] text-[13px] hover:border-foreground/[0.5] transition-colors"
              style={alphaLyrae}
            >
              send us a brief
            </a>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <div className="w-full border-x border-foreground/[0.35] mt-11">
        {/* Page Header */}
        <div className="border-b border-foreground/[0.35] px-8 md:px-12 py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10"
          >
            <p
              className="text-[11px] text-foreground/30 tracking-[0.15em] mb-5"
              style={alphaLyrae}
            >
              Services
            </p>
            <h1
              className="text-[clamp(36px,7vw,90px)] font-medium tracking-tight leading-[1.05] max-w-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Engineering
              <br />
              <span className="text-foreground/30">you can</span> ship.
            </h1>
            <p className="mt-6 text-foreground/40 text-[15px] md:text-[16px] leading-[1.75] max-w-xl">
              From AI pipelines to enterprise SAP, mobile apps to go-to-market —
              we run the full stack so you can focus on what matters.
            </p>
          </motion.div>
        </div>

        <ServicesGrid />
        <ProcessSection />
        <CtaBanner />
        <SiteFooter />
      </div>
    </>
  );
}
