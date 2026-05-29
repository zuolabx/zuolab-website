"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };
const cardo = { fontFamily: "'Cardo', serif" };

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

function CharHover({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-flex items-center justify-center text-foreground/70 group-hover:text-foreground transition-colors duration-150"
          style={{ transitionDelay: `${i * 25}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

function ZuoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="h-5 w-5"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M9 11h18L9 25h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      <span className="text-[13px] tracking-[0.05em]" style={alphaLyrae}>
        Zuo<span className="text-accent">lab</span>
      </span>
    </div>
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

function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[70vh] flex flex-col justify-center bg-[#0d0d10] -mx-px overflow-hidden pb-8 md:pb-0">
      <AnimatedGradientBackground
        Breathing={true}
        startingGap={140}
        breathingRange={6}
        animationSpeed={0.01}
        gradientColors={[
          "#0d0d10",
          "#0d0d16",
          "#12101c",
          "#18122e",
          "#12101c",
          "#0d0d16",
          "#0d0d10",
        ]}
        gradientStops={[15, 30, 45, 55, 70, 85, 100]}
        topOffset={15}
      />

      {/* Hero image - full section */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 pointer-events-none z-[2] opacity-20 md:opacity-40"
      >
        <Image
          src="/herodemo2.jpg"
          alt="Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Rough texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none opacity-30">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="border-l border-foreground/20 first:border-l-0 last:border-r hidden md:block"
          />
        ))}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`mobile-${idx}`}
            className="border-l border-foreground/20 first:border-l-0 last:border-r md:hidden"
          />
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#f2efe6] tracking-[-0.02em] max-w-[1100px]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(40px, 9vw, 120px)",
            lineHeight: "1.08",
          }}
        >
          <span className="block" style={{ marginLeft: "0%" }}>
            Assumptions
          </span>
          <span
            className="block"
            style={{ marginLeft: "clamp(45%, 55%, 65%)" }}
          >
            Kill
          </span>
          <span
            className="block"
            style={{ marginLeft: "clamp(60%, 70%, 78%)" }}
          >
            Products.
          </span>
        </motion.h1>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-b border-foreground/[0.35]">
      <SectionHeader label="Why work with us" />
      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* Main hero tile */}
        <div className="col-span-2 row-span-2 border-r border-b border-foreground/[0.35] p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[400px] relative overflow-hidden">
          {/* Background image with texture */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/herodemo.jpg"
              alt="Ship fast and scale smarter"
              fill
              className="object-cover object-center opacity-25"
            />
            {/* Rough texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10">
            <h2
              className="text-3xl md:text-5xl font-medium tracking-tight mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ship faster.
              <br />
              scale smarter.
            </h2>
            <p className="text-foreground/50 text-[15px] md:text-[16px] leading-[1.7] max-w-md">
              from zero to production in weeks. built-in analytics, feature
              flags, and performance optimization. ready for growth from day
              one.
            </p>
          </div>
          <div className="flex gap-3 mt-6 relative z-10">
            <a
              href="https://cal.com/zuolabs/30min"
              className="inline-flex items-center px-5 py-2.5 bg-accent text-[#0d0d0d] text-[14px] hover:bg-accent/90 transition-colors"
              style={alphaLyrae}
            >
              start project
            </a>
            <a
              href="#work"
              className="inline-flex items-center px-5 py-2.5 border border-foreground/[0.3] text-[14px] hover:border-foreground/[0.5] transition-colors"
              style={alphaLyrae}
            >
              view services
            </a>
          </div>
        </div>

        {/* Chart 1 - Time to Market Bar */}
        <div className="border-r border-b border-foreground/[0.35] p-6 flex flex-col justify-between">
          <span
            className="text-[11px] text-foreground/40 tracking-[0.1em]"
            style={alphaLyrae}
          >
            time to market
          </span>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-foreground/40 w-12">
                typical
              </span>
              <div className="flex-1 h-2 bg-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/30 w-full" />
              </div>
              <span className="text-[10px] text-foreground/50">16w</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-foreground/40 w-12">
                zuolab
              </span>
              <div className="flex-1 h-2 bg-foreground/10 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-accent transition-all duration-1000 ease-out"
                  style={{
                    width: "30%",
                    animation: "barGrow 4s ease-in-out infinite",
                  }}
                />
              </div>
              <span className="text-[10px] text-accent font-medium">4w</span>
            </div>
          </div>
          <p className="text-[12px] text-foreground/50 mt-2">
            4x faster launches
          </p>
        </div>

        {/* Chart 2 - Growth Curve */}
        <div className="border-b border-foreground/[0.35] p-6 flex flex-col justify-between">
          <span
            className="text-[11px] text-foreground/40 tracking-[0.1em]"
            style={alphaLyrae}
          >
            user growth
          </span>
          <div className="h-16 flex items-end gap-0.5">
            {[12, 18, 28, 45, 72, 95, 98, 100].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-accent/20 hover:bg-accent transition-all duration-700 ease-out"
                style={{
                  height: `${height}%`,
                  animation: `barRise 3s ease-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <p className="text-[12px] text-foreground/50 mt-2">
            10x velocity spike
          </p>
        </div>

        {/* Chart 3 - Performance Score */}
        <div className="border-r border-b border-foreground/[0.35] p-6 flex flex-col justify-between">
          <span
            className="text-[11px] text-foreground/40 tracking-[0.1em]"
            style={alphaLyrae}
          >
            performance
          </span>
          <div className="relative">
            <svg viewBox="0 0 100 50" className="w-full h-16">
              <path
                d="M 5 45 Q 25 35, 50 15 T 95 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent opacity-30"
              />
              <path
                d="M 5 45 Q 25 35, 50 15 T 95 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent"
                strokeDasharray="200"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="200"
                  to="0"
                  dur="2s"
                  fill="freeze"
                />
              </path>
              <circle cx="95" cy="5" r="2" className="fill-accent" />
            </svg>
          </div>
          <p className="text-[12px] text-foreground/50">99/100 lighthouse</p>
        </div>

        {/* Chart 4 - Cost Reduction */}
        <div className="border-b border-foreground/[0.35] p-6 flex flex-col justify-between">
          <span
            className="text-[11px] text-foreground/40 tracking-[0.1em]"
            style={alphaLyrae}
          >
            cost per user
          </span>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-foreground/40">before</span>
              <span className="text-foreground/50">$8.50</span>
            </div>
            <div className="w-full h-8 bg-foreground/5 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-foreground/20 w-full" />
              <div
                className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 ease-out"
                style={{
                  width: "40%",
                  animation: "barShrink 4s ease-in-out infinite",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-foreground/40">after</span>
              <span className="text-accent font-medium">$3.40</span>
            </div>
          </div>
          <p className="text-[12px] text-foreground/50">-60% savings</p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const services = [
    {
      num: "01",
      title: "Saas Development",
      description:
        "Full-stack product engineering. From napkin sketch to thousands of paying users. Architecture that scales, code that lasts.",
      cta: { label: "Case Studies", href: "#cases" },
    },
    {
      num: "02",
      title: "Technical Consulting",
      description:
        "Architecture reviews, performance audits, and hands-on guidance from engineers who've scaled systems to millions.",
      cta: { label: "Talk to Us", href: "https://cal.com/zuolabs/30min" },
    },
    {
      num: "03",
      title: "Ai Integration",
      description:
        "Custom models, RAG pipelines, and agentic workflows that work in production - not just demos.",
      cta: { label: "Talk to Us", href: "https://cal.com/zuolabs/30min" },
    },
  ];

  return (
    <section id="work" className="border-b border-foreground/[0.35]">
      <SectionHeader label="Services" />
      <div className="grid md:grid-cols-3 items-stretch">
        {services.map((service, i) => (
          <AnimateIn key={service.title} delay={i * 0.08}>
            <div
              className={`group h-full min-h-[320px] py-12 px-8 flex flex-col ${i < 2 ? "border-r border-foreground/[0.35]" : ""}`}
            >
              <span className="text-[10px] text-foreground/20 mb-8 block tracking-[0.15em]">
                {service.num}
              </span>
              <h3 className="text-[19px] font-medium mb-5" style={alphaLyrae}>
                {service.title}
              </h3>
              <p className="text-foreground/40 leading-[1.7] mb-10 flex-1 text-[16px]">
                {service.description}
              </p>
              <a
                href={service.cta.href}
                className="group relative inline-flex items-center text-accent text-[15px] tracking-[0.08em] transition-all hover:pl-2"
              >
                <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
                <span className="group-hover:text-foreground transition-colors">
                  {service.cta.label}
                </span>
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </a>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "How long does a typical project take?",
      answer:
        "Most projects are delivered within 4-8 weeks, depending on scope. We prioritize speed without cutting corners - you'll see working software in production, not just prototypes.",
    },
    {
      id: "item-2",
      question: "Do you work with early-stage startups?",
      answer:
        "Yes. We've built MVPs that scaled to thousands of users. If you have product-market fit or a clear vision, we can help you ship fast.",
    },
    {
      id: "item-3",
      question: "What's your tech stack?",
      answer:
        "We're stack-agnostic but default to Next.js, React, Node.js, PostgreSQL, and AWS/Vercel. We choose technology based on your constraints, not ours.",
    },
    {
      id: "item-4",
      question: "How do you handle project scope changes?",
      answer:
        "We embrace change. If requirements shift mid-project, we re-scope and communicate impact immediately. No surprises, no scope creep drama.",
    },
    {
      id: "item-5",
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes. We offer maintenance retainers and on-call support. Most clients keep us around for feature development and infrastructure work.",
    },
    {
      id: "item-6",
      question: "What if we're not technical - can you still work with us?",
      answer:
        "Absolutely. We translate product ideas into architecture decisions. You focus on the business, we handle the engineering.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full flex flex-col justify-center py-8 border-b border-foreground/[0.35]"
    >
      <SectionHeader label="FAQ" />
      <div className="w-full py-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="space-y-1.5 border-none py-1.5"
            >
              <AccordionTrigger className="group flex w-full justify-end py-0 hover:no-underline [&_svg]:hidden">
                <div className="bg-accent text-[#0d0d0d] max-w-[85%] sm:max-w-[70%] md:max-w-[60%] cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[14px] sm:text-[15px] transition-all duration-200">
                  {item.question}
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex justify-start">
                <div className="bg-foreground/[0.05] text-foreground/70 max-w-[85%] sm:max-w-[70%] md:max-w-[60%] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-[1.6]">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Attestations() {
  const testimonials = [
    {
      text: "ZuoLab didn't just build our product - they challenged our assumptions and made it ten times better than what we spec'd.",
      name: "Marcus Chen",
      role: "Cto · Paystack",
    },
    {
      text: "We went from concept to 10k users in 3 months. Their speed is unreal, and the code quality is genuinely impressive.",
      name: "Sarah Okafor",
      role: "Founder · Kinde",
    },
    {
      text: "One of the best engineering partnerships we've had. They pushed back where it mattered and delivered a system that just works.",
      name: "David Park",
      role: "Vp Eng · Raycast",
    },
    {
      text: "Their architecture decisions saved us months of refactoring down the line. Genuinely senior engineering thinking.",
      name: "Liam Torres",
      role: "Cto · Resend",
    },
    {
      text: "Shipped our MVP in 3 weeks. No corners cut, no tech debt. We scaled to 50k users without touching the codebase.",
      name: "Priya Mehta",
      role: "Founder · Kyte",
    },
    {
      text: "They integrated an AI pipeline into our existing system without downtime. Production-grade from day one.",
      name: "Jake Morrison",
      role: "Eng Lead · Linear",
    },
    {
      text: "ZuoLab understood our domain faster than any team we've worked with. The handoff was seamless.",
      name: "Amara Osei",
      role: "Cpo · Supabase",
    },
    {
      text: "No drama, no surprises, no scope creep. Just clean code shipped on time. Exactly what we needed.",
      name: "Tom Richter",
      role: "Vp Eng · Vercel",
    },
    {
      text: "Their consulting engagement identified 3 critical bottlenecks we'd missed for months. Worth every penny.",
      name: "Nina Zhao",
      role: "Director · Stripe",
    },
  ];

  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <section className="border-b border-foreground/[0.35]">
      <SectionHeader label="Attestations" />
      <div className="flex justify-center gap-4 py-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[500px] overflow-hidden">
        <TestimonialsColumn testimonials={col1} duration={15} />
        <TestimonialsColumn
          testimonials={col2}
          className="hidden md:block"
          duration={19}
        />
        <TestimonialsColumn
          testimonials={col3}
          className="hidden lg:block"
          duration={17}
        />
      </div>
    </section>
  );
}

function Team() {
  const members = [
    {
      name: "Sahil Nayak",
      role: "Fullstack Engineer",
      image: "https://avatars.githubusercontent.com/sahilnyk",
      twitter: "https://x.com/sahilnyk",
      bio: "built and maintained backend systems for production applications. familiar with cloud infrastructure, Docker, Kubernetes basics, and performance optimization. focused on writing reliable, scalable services and improving system stability.",
    },
    {
      name: "Anshuman Praharaj",
      role: "Fullstack Engineer",
      image: "https://avatars.githubusercontent.com/u/103830605?v=4",
      twitter: "https://x.com/anshumancdx",
      bio: "full-stack generalist. ships features fast. from database queries to pixel-perfect UI. makes complex systems feel simple.",
    },
    {
      name: "Aditya Petkar",
      role: "AI Engineer",
      image: "https://avatars.githubusercontent.com/u/183547965?v=4",
      twitter: "https://x.com/AdityaPetk50536",
      bio: "builds and integrates AI features for real-world applications. worked with RAG pipelines, LLM integrations, and basic agent workflows. focused on practical implementations and deployment-ready solutions",
    },
  ];

  return (
    <section id="team" className="border-b border-foreground/35">
      <SectionHeader label="Small team high productive!" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {members.map((member, i) => (
          <AnimateIn key={member.name} delay={i * 0.1}>
            <div
              className={`group ${i < 2 ? "border-r border-foreground/[0.35]" : ""} relative`}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  alt={member.name}
                  src={member.image}
                  className="w-full h-full object-cover grayscale contrast-[1.15] group-hover:grayscale-[0.3] group-hover:contrast-100 transition-all duration-700 scale-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 vertical-scan pointer-events-none" />
                <div className="absolute inset-0 scan-lines pointer-events-none opacity-30" />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

                {/* Bio overlay on hover */}
                <div className="absolute inset-0 bg-[#0d0d0d]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <p className="text-[13px] md:text-[14px] text-foreground/80 leading-[1.7] text-center">
                    {member.bio}
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 z-10">
                  <a
                    href={member.twitter}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/[0.35] text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all bg-[#0d0d0d]/60 backdrop-blur-sm"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().split(" ")[0]}@zuolab.com`}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/[0.35] text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all bg-[#0d0d0d]/60 backdrop-blur-sm"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="p-5 border-t border-foreground/[0.35]">
                <h4 className="text-[15px] font-medium mb-1" style={alphaLyrae}>
                  {member.name}
                </h4>
                <p className="text-[10px] text-foreground/35 tracking-[0.1em]">
                  {member.role}
                </p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="grid md:grid-cols-4 border-b border-foreground/[0.35]">
        <div className="md:col-span-2 p-6 border-r border-foreground/[0.35]">
          <ZuoLogo />
          <p className="text-foreground/30 max-w-sm leading-[1.7] text-[15px] mt-4">
            Software agency for teams who ship. Saas development, technical
            consulting, and ai integration - from zero to production.
          </p>
        </div>

        <div className="p-6 border-r border-foreground/[0.35]">
          <h4 className="text-[13px] tracking-[0.1em] mb-4 text-foreground/25">
            Company
          </h4>
          <ul className="space-y-3">
            <li>
              <a href="#work" className="group text-[14px]" style={alphaLyrae}>
                <CharHover text="Services" />
              </a>
            </li>
            <li>
              <a href="#cases" className="group text-[14px]" style={alphaLyrae}>
                <CharHover text="Work" />
              </a>
            </li>
            <li>
              <a href="#team" className="group text-[14px]" style={alphaLyrae}>
                <CharHover text="Team" />
              </a>
            </li>
          </ul>
        </div>

        <div className="p-6">
          <h4 className="text-[13px] tracking-[0.1em] mb-4 text-foreground/25">
            Connect
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://x.com/zuolabs"
                className="group flex items-center gap-3 text-[14px]"
                style={alphaLyrae}
              >
                <svg
                  className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <CharHover text="Twitter / X" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/zuolabx"
                className="group flex items-center gap-3 text-[14px]"
                style={alphaLyrae}
              >
                <svg
                  className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <CharHover text="Github" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-3 text-[14px]"
                style={alphaLyrae}
              >
                {/* LinkedIn URL not provided */}
                <svg
                  className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <CharHover text="Linkedin" />
              </a>
            </li>
            <li>
              <a
                href="mailto:zuolabx@gmail.com"
                className="group flex items-center gap-3 text-[14px]"
                style={alphaLyrae}
              >
                <svg
                  className="w-4 h-4 text-foreground/70 group-hover:text-accent transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <CharHover text="zuolabx@gmail.com" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden py-8 border-b border-foreground/[0.35]">
        <div className="text-center select-none">
          <span
            className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black leading-none text-foreground/[0.03]"
            style={{ fontFamily: "var(--font-chinese)" }}
          >
            佐
          </span>
          <span
            className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-medium leading-none text-foreground/[0.03]"
            style={{ fontFamily: "'Alpha Lyrae', sans-serif", fontWeight: 500 }}
          >
            lab
          </span>
        </div>
      </div>

      <div className="flex items-stretch">
        <div className="flex-1 flex items-center px-6 py-3 border-r border-foreground/[0.35]">
          <p className="text-[14px] text-foreground/20 tracking-[0.1em]">
            © 2025 Zuolab
          </p>
        </div>
        <div className="flex items-center px-6 py-3">
          <p className="text-[14px] text-foreground/20 tracking-[0.1em]">
            Built with obsessive attention to detail
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      {/* Navbar - fixed, has its own container */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="w-full flex items-stretch h-11 border-x border-b border-foreground/[0.35]">
          <div className="flex items-center px-3 sm:px-5 border-r border-foreground/[0.35]">
            <ZuoLogo />
          </div>
          <div className="flex-1 flex items-center justify-center gap-3 sm:gap-10 px-2 sm:px-5 border-r border-foreground/[0.35]">
            <a
              href="#work"
              className="group text-[12px] sm:text-[15px]"
              style={alphaLyrae}
            >
              <CharHover text="Services" />
            </a>
            <a
              href="#cases"
              className="group text-[12px] sm:text-[15px]"
              style={alphaLyrae}
            >
              <CharHover text="Work" />
            </a>
            <a
              href="#team"
              className="group text-[12px] sm:text-[15px]"
              style={alphaLyrae}
            >
              <CharHover text="Team" />
            </a>
          </div>
          <a
            href="https://cal.com/zuolabs/30min"
            className="flex items-center px-2 sm:px-5 text-[12px] sm:text-[17px] text-foreground hover:text-[#0d0d0d] transition-colors duration-300 relative overflow-hidden group"
            style={alphaLyrae}
          >
            <span className="relative z-10 whitespace-nowrap">Talk to Us</span>
            <span className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
        </div>
      </nav>

      {/* Single container - border-x runs full height */}
      <div className="w-full border-x border-foreground/[0.35] mt-11">
        <Hero />
        <Benefits />
        <Work />
        <FAQs />
        <Attestations />
        <Team />
        <Footer />
      </div>
    </>
  );
}
