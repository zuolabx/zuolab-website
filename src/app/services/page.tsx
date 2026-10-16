import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Services | ZuoLabs",
  description:
    "Software product development, AI integrations, enterprise SAP ABAP, Android development, and embedded engineering teams.",
};

const services = [
  {
    num: "01",
    title: "AI Engineering",
    tag: "AI & Workflows",
    description:
      "We design and deploy AI systems that run in production. This includes RAG pipelines, fine-tuned models, and task-specific automations that work reliably under real user load.",
    capabilities: [
      "RAG and semantic search pipelines",
      "Model fine-tuning and evaluation",
      "Automated task and decision workflows",
      "AI-native application architecture",
    ],
  },
  {
    num: "02",
    title: "SAP ABAP & Enterprise Systems",
    tag: "Enterprise Engineering",
    description:
      "Deep SAP ABAP expertise for custom module development, legacy system migration, and enterprise workflow integration. We write maintainable ABAP code that connects with your existing SAP landscape.",
    capabilities: [
      "Custom ABAP module development",
      "SAP ERP and S/4HANA integration",
      "Legacy migration and refactoring",
      "BAPI, RFC, and IDoc development",
    ],
  },
  {
    num: "03",
    title: "Android Development",
    tag: "Mobile Engineering",
    description:
      "Native Android applications built with Kotlin and Jetpack Compose. We design for offline reliability, fast performance, and stable releases on the Google Play Store.",
    capabilities: [
      "Kotlin and Jetpack Compose",
      "Offline-first architecture",
      "Backend and cloud integration",
      "Play Store deployment and testing",
    ],
  },
  {
    num: "04",
    title: "GTM Strategy & Growth",
    tag: "Go-to-Market",
    description:
      "Go-to-market strategy built specifically for software products and B2B platforms. We map your Ideal Customer Profile (ICP), sharpen product positioning, and establish reproducible acquisition channels.",
    capabilities: [
      "ICP definition and segmentation",
      "Positioning and messaging frameworks",
      "Content-led and outbound motions",
      "Product-led growth strategy",
    ],
  },
  {
    num: "05",
    title: "Embedded Engineering Talent",
    tag: "Dedicated Team",
    description:
      "Senior engineers who join your team directly. We integrate into your GitHub repositories, Slack channels, and daily stand-ups without lengthy onboarding.",
    capabilities: [
      "Dedicated senior engineers",
      "Full-stack, AI, mobile, and backend",
      "Flexible engagement models",
      "Direct integration into daily stand-ups",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Technical Discovery & Architecture",
    description:
      "We review your constraints, existing data models, and business objectives. We outline concrete architecture decisions, milestones, and deliverables before coding begins.",
  },
  {
    step: "02",
    title: "Iterative Sprint Execution",
    description:
      "We work in focused 1-2 week cycles, shipping functional increments directly to staging environments. You receive constant visibility and direct engineer access.",
  },
  {
    step: "03",
    title: "Production Deployment & Verification",
    description:
      "We deploy to production with comprehensive observability, error logging, and performance monitoring to verify behavior under actual user traffic.",
  },
  {
    step: "04",
    title: "Handoff or Ongoing Support",
    description:
      "All intellectual property, documentation, CI/CD pipelines, and infrastructure belong to you. We can hand off to your team or continue providing engineering support.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* Page Hero */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="Services & Capabilities" className="mb-4" />
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-foreground leading-[1.08] max-w-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Engineering you can ship.
            </h1>
            <p className="mt-6 text-foreground/60 text-lg leading-relaxed max-w-2xl font-light">
              We build custom software, integrate AI into existing products,
              develop Android apps, and provide dedicated engineering capacity.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="border-b border-[#1e1e1e] px-6 py-16">
          <div className="max-w-5xl mx-auto divide-y divide-[#1e1e1e]">
            {services.map((service) => (
              <div
                key={service.num}
                className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-accent">
                      {service.num}
                    </span>
                    <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest">
                      {service.tag}
                    </span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-normal text-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {service.title}
                  </h2>
                </div>

                <div className="md:col-span-8 space-y-6">
                  <p className="text-foreground/70 text-base leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-foreground/40 mb-3">
                      Key Deliverables & Focus
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="text-xs text-foreground/60 flex items-center gap-2 font-mono"
                        >
                          <span className="text-accent/60"> </span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="Delivery Process" className="mb-4" />
            <h2
              className="text-3xl sm:text-4xl font-normal text-foreground mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              How an engagement runs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-8 border border-[#1e1e1e] bg-[#0d0d0d] space-y-4"
                >
                  <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                    Phase {step.step}
                  </span>
                  <h3 className="text-xl font-medium text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2
              className="text-4xl sm:text-5xl font-normal text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Have a technical project in mind?
            </h2>
            <p className="text-foreground/60 text-base leading-relaxed">
              Tell us about your product requirements, existing architecture, or
              team needs. We will respond with actionable technical feedback and
              an engagement proposal.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://cal.com/zuolabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
              >
                Book a Technical Call
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
