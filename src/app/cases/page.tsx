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

const engagements = [
  {
    num: "01",
    name: "Debjeet Ghosh",
    duration: "6 Month Engagement",
    quote:
      "Working with Zuolabs has been a really positive experience overall. The team consistently showed professionalism, strong technical knowledge, and a genuine willingness to understand our requirements before implementing solutions.",
    tags: ["Professionalism", "Technical Depth", "Requirements-First"],
    highlight: true,
  },
  {
    num: "02",
    name: "Richard Terebesi",
    duration: "3 Month Engagement",
    quote:
      "Excellent communication, reliable delivery, and strong technical execution. The team was responsive throughout the project and consistently met expectations.",
    tags: ["Communication", "Reliable Delivery", "Technical Execution"],
    highlight: false,
  },
  {
    num: "03",
    name: "Marta Silva",
    duration: "6 Month Engagement",
    quote:
      "Zuolabs adapted quickly to feedback and changing requirements. The collaboration felt smooth, professional, and highly efficient from start to finish.",
    tags: ["Adaptability", "Efficiency", "Collaboration"],
    highlight: false,
  },
  {
    num: "04",
    name: "Nikhil Joshi",
    duration: "1+ Year Engagement",
    quote:
      "A dependable long-term engineering partner. Strong ownership, attention to detail, and the ability to consistently deliver high-quality work over an extended period.",
    tags: ["Long-Term Partner", "Ownership", "Quality"],
    highlight: true,
  },
  {
    num: "05",
    name: "Amit Agarwal",
    duration: "1 Month Engagement",
    quote:
      "Fast turnaround, clear communication, and excellent support throughout the project. The team was easy to work with and delivered exactly what was needed.",
    tags: ["Fast Turnaround", "Support", "Clear Communication"],
    highlight: false,
  },
];

const stats = [
  { value: "5+", label: "Client Engagements" },
  { value: "1mo–1yr+", label: "Engagement Range" },
  { value: "100%", label: "Delivery Rate" },
  { value: "0", label: "Scope Creep Incidents" },
];

function StatsBar() {
  return (
    <section className="border-b border-foreground/[0.35]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <AnimateIn key={stat.label} delay={i * 0.07}>
            <div
              className={`py-8 px-8 flex flex-col gap-1 ${
                i < 3 ? "border-r border-foreground/[0.35]" : ""
              } border-b border-foreground/[0.35] md:border-b-0`}
            >
              <span
                className="text-3xl md:text-4xl font-medium tracking-tight text-foreground/90"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[11px] text-foreground/35 tracking-[0.1em]"
                style={alphaLyrae}
              >
                {stat.label}
              </span>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function EngagementCard({
  eng,
  index,
  isRight,
}: {
  eng: (typeof engagements)[0];
  index: number;
  isRight: boolean;
}) {
  return (
    <AnimateIn delay={index * 0.08} className="h-full">
      <div
        className={`relative h-full flex flex-col py-10 px-8 md:px-10 transition-colors duration-300 hover:bg-foreground/[0.02] group ${
          !isRight ? "border-r border-foreground/[0.35]" : ""
        }`}
      >
        {/* Long-term badge glow */}
        {eng.highlight && (
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-accent/5" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-accent rounded-full opacity-60" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <span
            className="text-[10px] text-foreground/20 tracking-[0.15em]"
            style={alphaLyrae}
          >
            {eng.num}
          </span>
          <span
            className={`text-[10px] tracking-[0.1em] border px-2.5 py-1 ${
              eng.highlight
                ? "text-accent/80 border-accent/20 bg-accent/5"
                : "text-foreground/35 border-foreground/[0.15]"
            }`}
            style={alphaLyrae}
          >
            {eng.duration}
          </span>
        </div>

        {/* Quote mark */}
        <div
          className="text-5xl text-foreground/10 leading-none mb-2 select-none"
          style={{ fontFamily: "var(--font-serif)" }}
          aria-hidden="true"
        >
          "
        </div>

        {/* Quote */}
        <blockquote
          className="text-foreground/60 leading-[1.8] text-[15px] mb-8 flex-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {eng.quote}
        </blockquote>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {eng.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.08em] text-foreground/30 border border-foreground/[0.1] px-2 py-0.5"
              style={alphaLyrae}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <div className="border-t border-foreground/[0.1] pt-5">
          <p className="text-[14px] font-medium text-foreground/80" style={alphaLyrae}>
            {eng.name}
          </p>
        </div>
      </div>
    </AnimateIn>
  );
}

function EngagementsGrid() {
  const [first, ...rest] = engagements;

  return (
    <section className="border-b border-foreground/[0.35]">
      <SectionHeader label="Client Engagements" />

      {/* Featured / first card — full width */}
      <AnimateIn>
        <div className="border-b border-foreground/[0.35] py-14 px-8 md:px-12 grid md:grid-cols-2 gap-12 hover:bg-foreground/[0.02] transition-colors duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span
                className="text-[10px] text-foreground/20 tracking-[0.15em]"
                style={alphaLyrae}
              >
                {first.num}
              </span>
              <span
                className="text-[10px] tracking-[0.1em] text-accent/80 border border-accent/20 bg-accent/5 px-2.5 py-1"
                style={alphaLyrae}
              >
                {first.duration}
              </span>
            </div>

            <div
              className="text-6xl text-foreground/10 leading-none mb-3 select-none"
              style={{ fontFamily: "var(--font-serif)" }}
              aria-hidden="true"
            >
              "
            </div>

            <blockquote
              className="text-foreground/60 leading-[1.85] text-[17px] md:text-[18px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {first.quote}
            </blockquote>
          </div>

          <div className="relative z-10 flex flex-col justify-between">
            <div className="flex flex-wrap gap-2 mb-6">
              {first.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.08em] text-foreground/35 border border-foreground/[0.15] px-2.5 py-1"
                  style={alphaLyrae}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-foreground/[0.15] pt-6">
              <p
                className="text-[15px] font-medium text-foreground/80 mb-1"
                style={alphaLyrae}
              >
                {first.name}
              </p>
              <p className="text-[11px] text-foreground/30 tracking-[0.08em]" style={alphaLyrae}>
                Verified Client
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* 2-column grid for rest */}
      <div className="grid md:grid-cols-2">
        {rest.map((eng, i) => (
          <div
            key={eng.num}
            className={`${i < rest.length - 1 || rest.length % 2 === 0 ? "border-b border-foreground/[0.35]" : ""} ${i === rest.length - 1 && rest.length % 2 !== 0 ? "md:col-span-2" : ""}`}
          >
            <EngagementCard
              eng={eng}
              index={i + 1}
              isRight={i % 2 !== 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustBanner() {
  return (
    <section className="border-b border-foreground/[0.35] relative overflow-hidden">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      <AnimateIn>
        <div className="py-10 px-8 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <p
            className="text-[12px] text-foreground/30 tracking-[0.1em] max-w-lg leading-[1.7]"
            style={alphaLyrae}
          >
            Based on verified client engagements ranging from 1 month to 1+ year.
            All testimonials are from direct, long-term working relationships.
          </p>
          <a
            href="https://cal.com/zuolabs/30min"
            className="inline-flex items-center px-6 py-3 bg-accent text-[#0d0d0d] text-[13px] hover:bg-accent/90 transition-colors shrink-0"
            style={alphaLyrae}
          >
            start your engagement →
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}

export default function CasesPage() {
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
              Work
            </p>
            <h1
              className="text-[clamp(36px,7vw,90px)] font-medium tracking-tight leading-[1.05] max-w-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Real clients.
              <br />
              <span className="text-foreground/30">Real results.</span>
            </h1>
            <p className="mt-6 text-foreground/40 text-[15px] md:text-[16px] leading-[1.75] max-w-xl">
              Every engagement here is a verified long-term client relationship —
              not a testimonial from a one-off call. We build things that last.
            </p>
          </motion.div>
        </div>

        <StatsBar />
        <EngagementsGrid />
        <TrustBanner />
        <SiteFooter />
      </div>
    </>
  );
}
