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

export default function TeamPage() {
  return (
    <>
      <SiteNav />

      {/* Single container - border-x runs full height */}
      <div className="w-full border-x border-foreground/[0.35] mt-11">

        {/* Page hero */}
        <section className="relative flex flex-col justify-center border-b border-foreground/[0.35] px-6 py-20 md:py-28 overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none opacity-20">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="border-l border-foreground/20 first:border-l-0 last:border-r hidden md:block"
              />
            ))}
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`m-${idx}`}
                className="border-l border-foreground/20 first:border-l-0 last:border-r md:hidden"
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.15em] text-foreground/40 mb-4"
              style={alphaLyrae}
            >
              THE TEAM
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[#f2efe6] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 7vw, 96px)",
                lineHeight: "1.08",
              }}
            >
              Small team.
              <br />
              <span className="text-foreground/40">High output.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-foreground/50 text-[15px] md:text-[17px] leading-[1.7] max-w-xl"
            >
              Three engineers who care obsessively about craft, speed, and the
              code that outlives the sprint.
            </motion.p>
          </div>
        </section>

        {/* Team grid */}
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
                        target="_blank"
                        rel="noopener noreferrer"
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
                    <h2 className="text-[15px] font-medium mb-1" style={alphaLyrae}>
                      {member.name}
                    </h2>
                    <p className="text-[10px] text-foreground/35 tracking-[0.1em]">
                      {member.role}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-b border-foreground/[0.35] px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              className="text-[11px] tracking-[0.12em] text-foreground/40 mb-2"
              style={alphaLyrae}
            >
              WORK WITH US
            </p>
            <h3
              className="text-[22px] md:text-[28px] text-foreground/90 tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Got a project in mind?
            </h3>
          </div>
          <a
            href="https://cal.com/zuolabs/30min"
            className="inline-flex items-center px-6 py-3 bg-accent text-[#0d0d0d] text-[14px] hover:bg-accent/90 transition-colors shrink-0"
            style={alphaLyrae}
          >
            Book a call →
          </a>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
