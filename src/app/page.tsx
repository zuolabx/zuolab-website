"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

function AnimateIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

function CharHover({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`group inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-flex justify-center w-[1ch] h-[1.2em] text-foreground/50 group-hover:text-foreground transition-colors"
          style={{ transitionDelay: `${i * 25}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

function ZuoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-5 w-5" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="34" height="34" stroke="currentColor" strokeWidth="1" />
        <path d="M9 11h18L9 25h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
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
      <div className="flex items-center px-5 py-2.5 border-r border-foreground/[0.35] shrink-0">
        <span className="text-[11px] tracking-[0.1em] text-foreground/50" style={alphaLyrae}>
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
    <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0d0d10] -mx-px">
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

      <div className="relative z-10 px-6 pt-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-1"
          >
            <h1
              className="text-[clamp(3rem,8vw,6rem)] leading-[1.05] text-[#f2efe6] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Assumptions
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              className="text-[clamp(3rem,8vw,6rem)] leading-[1.05] text-[#f2efe6] tracking-[-0.02em] pl-[30%] md:pl-[35%]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Kill Products.
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-md"
        >
          <p className="text-[12px] text-[#f2efe6]/50 leading-[1.8] mb-1">
            We build production-grade software for teams who refuse to compromise.
          </p>
          <p className="text-[12px] text-[#f2efe6]/50 leading-[1.8] mb-1">
            One product at a time. All of them built to scale from day one.
          </p>
          <p className="text-[12px] text-[#f2efe6]/50 leading-[1.8]">
            From architecture to production. No handoffs, no bullshit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Mission() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "18%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["16%", "35%"]);

  return (
    <section ref={sectionRef} className="border-b border-foreground/[0.35] overflow-x-clip">
      <SectionHeader label="Mission" />
      <div className="py-20 px-6 relative">
        <motion.div style={{ x: x1 }} className="mb-14 ml-[5%] md:ml-[10%]">
          <AnimateIn>
            <p className="text-[14px] text-foreground/50 leading-[1.8] max-w-[280px] text-right">
              ZuoLab exists to close the gap between ambition and execution. Software cannot be built with generic approaches.
            </p>
          </AnimateIn>
        </motion.div>

        <motion.div style={{ x: x2 }} className="mb-14 ml-[15%] md:ml-[25%]">
          <AnimateIn delay={0.1}>
            <p className="text-[14px] text-foreground/50 leading-[1.8] max-w-[280px] text-right">
              Every product has unique constraints, user expectations, and scaling challenges that demand first-principles thinking. We go deep so you can ship fast.
            </p>
          </AnimateIn>
        </motion.div>

        <motion.div style={{ x: x3 }} className="ml-[30%] md:ml-[40%]">
          <AnimateIn delay={0.2}>
            <p className="text-[13px] text-foreground/30 leading-[1.8] max-w-[240px] text-right italic" style={{ fontFamily: "var(--font-serif)" }}>
              Not a body shop. A team of domain experts<br />
              custom-built for your product.
            </p>
          </AnimateIn>
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  const services = [
    {
      num: "01",
      title: "Saas Development",
      description: "Full-stack product engineering. From napkin sketch to thousands of paying users. Architecture that scales, code that lasts.",
      cta: { label: "Case Studies", href: "#cases" },
    },
    {
      num: "02",
      title: "Technical Consulting",
      description: "Architecture reviews, performance audits, and hands-on guidance from engineers who've scaled systems to millions.",
      cta: { label: "Talk to Us", href: "mailto:hello@zuolab.com" },
    },
    {
      num: "03",
      title: "Ai Integration",
      description: "Custom models, RAG pipelines, and agentic workflows that work in production — not just demos.",
      cta: { label: "Talk to Us", href: "mailto:hello@zuolab.com" },
    },
  ];

  return (
    <section id="work" className="border-b border-foreground/[0.35]">
      <SectionHeader label="Services" />
      <div className="grid md:grid-cols-3">
        {services.map((service, i) => (
          <AnimateIn key={service.title} delay={i * 0.08}>
            <div className={`group h-full p-6 flex flex-col ${i < 2 ? "border-r border-foreground/[0.35]" : ""}`}>
              <span className="text-[10px] text-foreground/20 mb-4 block tracking-[0.15em]">
                {service.num}
              </span>
              <h3 className="text-[15px] font-medium mb-3" style={alphaLyrae}>{service.title}</h3>
              <p className="text-foreground/40 leading-[1.7] mb-6 flex-1 text-[12px]">
                {service.description}
              </p>
              <a
                href={service.cta.href}
                className="text-accent text-[11px] tracking-[0.08em] hover:text-foreground transition-colors"
              >
                {service.cta.label} →
              </a>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function CaseStudies() {
  const projects = [
    {
      title: "Payroll Engine",
      category: "Saas",
      date: "Mar 2026",
      description: "Multi-tenant payroll processing $40M+/mo. Built from scratch in 6 months.",
      tech: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    },
    {
      title: "Fleet Intelligence",
      category: "Ai/Ml",
      date: "Jan 2026",
      description: "Logistics optimization. 30% cost reduction, sub-second ML inference.",
      tech: ["Python", "TensorFlow", "GCP", "React"],
    },
    {
      title: "Developer Portal",
      category: "Tooling",
      date: "Nov 2025",
      description: "Self-service for 200+ engineers. Onboarding: 2 weeks → 2 hours.",
      tech: ["Go", "Kubernetes", "React", "Terraform"],
    },
  ];

  return (
    <section id="cases" className="border-b border-foreground/[0.35]">
      <SectionHeader label="Case Studies" />
      <div className="grid md:grid-cols-3">
        {projects.map((project, i) => (
          <AnimateIn key={project.title} delay={i * 0.08}>
            <div className={`group h-full flex flex-col ${i < 2 ? "border-r border-foreground/[0.35]" : ""}`}>
              <div className="h-28 relative border-b border-foreground/[0.35] flex items-center justify-center">
                <motion.svg
                  className="w-16 h-16 text-foreground/[0.15]"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  {i === 0 && (
                    <>
                      <motion.rect x="10" y="10" width="80" height="80" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                      <motion.line x1="10" y1="50" x2="90" y2="50" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
                      <motion.line x1="50" y1="10" x2="50" y2="90" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <motion.circle cx="50" cy="50" r="35" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                      <motion.path d="M50 15 L50 85" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
                      <motion.path d="M25 30 L75 70" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <motion.polygon points="50,10 90,90 10,90" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                      <motion.line x1="50" y1="10" x2="50" y2="90" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
                      <motion.line x1="30" y1="50" x2="70" y2="50" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} />
                    </>
                  )}
                </motion.svg>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-[0.1em] text-accent">{project.category}</span>
                  <span className="text-[10px] text-foreground/25">{project.date}</span>
                </div>
                <h3 className="text-[15px] font-medium mb-2" style={alphaLyrae}>{project.title}</h3>
                <p className="text-foreground/40 text-[12px] leading-[1.7] mb-5 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-foreground/[0.35]">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] text-foreground/30 tracking-[0.06em]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

function Attestations() {
  const testimonials = [
    {
      text: "ZuoLab didn't just build our product — they challenged our assumptions and made it ten times better than what we spec'd.",
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
        <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={17} />
      </div>
    </section>
  );
}

function Team() {
  const members = [
    {
      name: "Sahil Nayak",
      role: "Infrastructure Architect",
      image: "https://avatars.githubusercontent.com/sahilnyk",
      twitter: "https://x.com/sahilnyk",
    },
    {
      name: "Anshuman Praharaj",
      role: "Full-stack Systems Engineer",
      image: "https://avatars.githubusercontent.com/u/103830605?v=4",
      twitter: "#",
    },
    {
      name: "Aditya Petkar",
      role: "Applied Ai Engineer",
      image: "https://avatars.githubusercontent.com/u/183547965?v=4",
      twitter: "#",
    },
  ];

  return (
    <section id="team" className="border-b border-foreground/[0.35]">
      <SectionHeader label="Team" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {members.map((member, i) => (
          <AnimateIn key={member.name} delay={i * 0.1}>
            <div className={`group ${i < 2 ? "border-r border-foreground/[0.35]" : ""}`}>
              <div className="aspect-square relative overflow-hidden">
                <img
                  alt={member.name}
                  src={member.image}
                  className="w-full h-full object-cover grayscale contrast-[1.15] group-hover:grayscale-[0.3] group-hover:contrast-100 transition-all duration-700 scale-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 vertical-scan pointer-events-none" />
                <div className="absolute inset-0 scan-lines pointer-events-none opacity-30" />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <a
                    href={member.twitter}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/[0.35] text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all bg-[#0d0d0d]/60 backdrop-blur-sm"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().split(" ")[0]}@zuolab.com`}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/[0.35] text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all bg-[#0d0d0d]/60 backdrop-blur-sm"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
          <p className="text-foreground/30 max-w-sm leading-[1.7] text-[11px] mt-4">
            Software agency for teams who ship. Saas development, technical consulting,
            and ai integration — from zero to production.
          </p>
        </div>

        <div className="p-6 border-r border-foreground/[0.35]">
          <h4 className="text-[10px] tracking-[0.1em] mb-4 text-foreground/25">Company</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="#work" className="text-[11px]"><CharHover text="Services" /></a></li>
            <li><a href="#cases" className="text-[11px]"><CharHover text="Work" /></a></li>
            <li><a href="#team" className="text-[11px]"><CharHover text="Team" /></a></li>
          </ul>
        </div>

        <div className="p-6">
          <h4 className="text-[10px] tracking-[0.1em] mb-4 text-foreground/25">Connect</h4>
          <ul className="space-y-3 text-[11px]">
            <li>
              <a href="#" className="flex items-center gap-2 text-foreground/35 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <CharHover text="Twitter / X" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-foreground/35 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                <CharHover text="Github" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-foreground/35 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                <CharHover text="Linkedin" />
              </a>
            </li>
            <li>
              <a href="mailto:hello@zuolab.com" className="flex items-center gap-2 text-foreground/35 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <CharHover text="hello@zuolab.com" />
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
            style={alphaLyrae}
          >
            lab
          </span>
        </div>
      </div>

      <div className="flex items-stretch">
        <div className="flex-1 flex items-center px-6 py-3 border-r border-foreground/[0.35]">
          <p className="text-[10px] text-foreground/20 tracking-[0.1em]">© 2025 Zuolab</p>
        </div>
        <div className="flex items-center px-6 py-3">
          <p className="text-[10px] text-foreground/20 tracking-[0.1em]">Built with obsessive attention to detail</p>
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
        <div className="max-w-[1200px] mx-auto flex items-stretch h-11 border-x border-b border-foreground/[0.35]">
          <div className="flex items-center px-5 border-r border-foreground/[0.35]">
            <ZuoLogo />
          </div>
          <div className="flex-1 flex items-center justify-center gap-8 px-5 border-r border-foreground/[0.35]">
            <a href="#work" className="text-[12px]">
              <CharHover text="Services" />
            </a>
            <a href="#cases" className="text-[12px]">
              <CharHover text="Work" />
            </a>
            <a href="#team" className="text-[12px]">
              <CharHover text="Team" />
            </a>
          </div>
          <a
            href="mailto:hello@zuolab.com"
            className="flex items-center px-5 text-[12px] text-foreground hover:text-accent transition-colors"
          >
            Talk to Us
          </a>
        </div>
      </nav>

      {/* Single container - border-x runs full height */}
      <div className="max-w-[1200px] mx-auto border-x border-foreground/[0.35] mt-11">
        <Hero />
        <Mission />
        <Work />
        <CaseStudies />
        <Attestations />
        <Team />
        <Footer />
      </div>
    </>
  );
}
