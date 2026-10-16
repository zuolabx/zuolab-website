import Link from "next/link";
import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "ZuoLabs — Product Development & AI Engineering Agency",
  description:
    "We design, build, and ship software products, AI integrations, and AI-native applications for businesses and founders.",
};

const capabilities = [
  {
    num: "01",
    title: "AI Integration & Workflows",
    description:
      "RAG pipelines, custom model integrations, and agentic workflows that solve real business problems — built to handle production workloads, not just demo scripts.",
  },
  {
    num: "02",
    title: "End-to-End Product Engineering",
    description:
      "From technical architecture and database modeling to responsive frontend interfaces and cloud deployments. We ship complete, production-ready software.",
  },
  {
    num: "03",
    title: "AI-Native Applications",
    description:
      "Designing and engineering software built from the ground up around generative AI, intelligent search, and autonomous data processing.",
  },
  {
    num: "04",
    title: "Architecture & Systems Modernization",
    description:
      "Performance audits, API integrations, enterprise system connectivity (including SAP ABAP), and scalable refactoring for growing systems.",
  },
];

const productsPreview = [
  {
    name: "Raven",
    tagline: "Headless AI Knowledge Engine",
    description:
      "Transforms scattered product documentation, internal wikis, and manuals into an intelligent teammate for employees and customers with vector retrieval and natural query handling.",
    status: "Active Product",
  },
  {
    name: "Servio",
    tagline: "Restaurant Operating System",
    description:
      "A unified platform combining table orders, kitchen display, real-time inventory tracking, payroll, and billing analytics into a streamlined interface.",
    status: "Active Product",
  },
];

const testimonials = [
  {
    quote:
      "Working with Zuolabs has been a really positive experience overall. The team consistently showed professionalism, strong technical knowledge, and a genuine willingness to understand our requirements before implementing solutions.",
    author: "Debjeet Ghosh",
    engagement: "6 Month Engagement",
  },
  {
    quote:
      "They handled tasks with good attention to detail and timely delivery. Instead of simply completing assigned work, they often suggested practical improvements and better approaches that helped improve the final outcome of the project. Their ability to adapt quickly to feedback and changing requirements made the entire collaboration much easier and more efficient.",
    author: "Nikhil Joshi",
    engagement: "4 Month Engagement",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* HERO SECTION */}
        <section className="border-b border-[#1e1e1e] px-6 py-24 md:py-36">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="Product Development & AI Engineering" className="mb-6" />

            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.08] max-w-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              We design, build, and ship software that works.
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-2xl font-light">
              ZuoLabs partners with founders and businesses to take products from technical
              architecture to production — building AI-native applications, end-to-end
              platforms, and scalable workflows.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://cal.com/zuolabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
              >
                Book a 30-min Call →
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#2a2a2a] text-foreground/80 font-mono text-xs uppercase tracking-[0.1em] hover:border-foreground/50 hover:text-foreground transition-colors"
              >
                View Services
              </Link>
            </div>

            {/* Quick Strip */}
            <div className="mt-20 pt-8 border-t border-[#1a1a1a] flex flex-wrap items-center justify-between gap-6 text-xs font-mono uppercase tracking-[0.12em] text-foreground/40">
              <span>Full-Stack Development</span>
              <span className="hidden sm:inline text-foreground/20">/</span>
              <span>AI Integration & RAG</span>
              <span className="hidden sm:inline text-foreground/20">/</span>
              <span>AI-Native Products</span>
              <span className="hidden sm:inline text-foreground/20">/</span>
              <span>Enterprise Modernization</span>
            </div>
          </div>
        </section>

        {/* WHAT WE DO / CAPABILITIES */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <SectionLabel label="Capabilities" className="mb-3" />
                <h2
                  className="text-3xl sm:text-4xl font-normal text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Engineering built for real production
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-mono uppercase tracking-[0.12em] text-accent hover:underline flex items-center gap-1"
              >
                <span>Full services breakdown</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {capabilities.map((cap) => (
                <div key={cap.num} className="space-y-3">
                  <span className="text-xs font-mono text-accent/70 tracking-widest block">
                    {cap.num}
                  </span>
                  <h3 className="text-xl font-medium text-foreground tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/55">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS PREVIEW */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <SectionLabel label="Products" className="mb-3" />
                <h2
                  className="text-3xl sm:text-4xl font-normal text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Software we build and operate
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-mono uppercase tracking-[0.12em] text-accent hover:underline flex items-center gap-1"
              >
                <span>Explore all products</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productsPreview.map((prod) => (
                <div
                  key={prod.name}
                  className="p-8 border border-[#1e1e1e] bg-[#0d0d0d] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">
                        {prod.tagline}
                      </span>
                      <span className="text-[11px] font-mono text-foreground/40 border border-[#222] px-2 py-0.5">
                        {prod.status}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-medium text-foreground"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/55">
                      {prod.description}
                    </p>
                  </div>
                  <div>
                    <a
                      href="https://cal.com/zuolabs/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-foreground/75 hover:text-accent transition-colors"
                    >
                      <span>Inquire about {prod.name}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK / APPROACH */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="How We Work" className="mb-4" />
            <h2
              className="text-3xl sm:text-4xl font-normal text-foreground mb-16 max-w-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Direct engineering, zero administrative bloat
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-3">
                <span className="text-xs font-mono text-foreground/35 uppercase tracking-widest block">
                  Phase 01
                </span>
                <h3 className="text-lg font-medium text-foreground">
                  Architecture & Scope
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed">
                  We clarify goals, define constraints, and select the optimal technical
                  stack before writing code. You get architectural clarity, not vague estimates.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-foreground/35 uppercase tracking-widest block">
                  Phase 02
                </span>
                <h3 className="text-lg font-medium text-foreground">
                  Sprint & Deploy
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed">
                  Rapid weekly increments shipped straight to staging and production. You communicate
                  directly with the engineers who write the code.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-foreground/35 uppercase tracking-widest block">
                  Phase 03
                </span>
                <h3 className="text-lg font-medium text-foreground">
                  Handover or Scale
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed">
                  Clean repositories, thorough documentation, and zero vendor lock-in.
                  We hand off cleanly to your team or continue supporting feature growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VERIFIED ATTESTATIONS / TESTIMONIALS */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="Attestations" className="mb-4" />
            <h2
              className="text-3xl sm:text-4xl font-normal text-foreground mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Feedback from client engagements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-[#1e1e1e] bg-[#0d0d0d] flex flex-col justify-between space-y-6"
                >
                  <blockquote className="text-foreground/80 text-[15px] leading-relaxed italic">
                    “{t.quote}”
                  </blockquote>
                  <div className="pt-4 border-t border-[#1e1e1e] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.author}</p>
                      <p className="text-xs text-foreground/45 font-mono">{t.engagement}</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 border border-accent/20 px-2 py-0.5">
                      Verified Client
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2
              className="text-4xl sm:text-5xl font-normal text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to ship your next product?
            </h2>
            <p className="text-foreground/60 text-base max-w-xl mx-auto leading-relaxed">
              Schedule a 30-minute introductory conversation with our engineering team to
              discuss architecture, timeline, and execution.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/zuolabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
              >
                Book a 30-min Call →
              </a>
              <a
                href="mailto:founders@zuolabs.com"
                className="px-6 py-3.5 border border-[#2a2a2a] text-foreground/80 font-mono text-xs uppercase tracking-[0.1em] hover:border-foreground/50 hover:text-foreground transition-colors"
              >
                founders@zuolabs.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
