import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Products — ZuoLabs",
  description:
    "Software products engineered and operated by ZuoLabs — Raven AI Knowledge Engine and Servio Restaurant Operating System.",
};

const products = [
  {
    num: "01",
    name: "Raven",
    tagline: "Headless AI Knowledge Engine",
    description:
      "A headless AI knowledge engine that transforms complex technical documentation, internal wikis, and customer support databases into an intelligent queryable teammate. Instead of searching across tabs, booking meetings, or filing tickets, teams and customers get instant, accurate, source-attributed answers.",
    capabilities: [
      "Natural language understanding and hybrid vector search",
      "Robust RAG architecture with provenance and source citations",
      "Headless API designed for custom UI integration and Slack bots",
      "Continuous synchronization with Notion, GitHub, and internal data stores",
    ],
    status: "Active Product",
  },
  {
    num: "02",
    name: "Servio",
    tagline: "Modern Restaurant Operating System",
    description:
      "A unified operating system built for hospitality operators. Servio connects floor ordering, kitchen display workflows (KDS), stock tracking, employee payroll, and billing analytics into a single synchronized platform, eliminating fragmentation across point-of-sale systems.",
    capabilities: [
      "Multi-terminal floor ordering with instant kitchen synchronization",
      "Live ingredient-level inventory tracking and low-stock alerts",
      "Integrated employee time-tracking, role management, and payroll exports",
      "Real-time revenue, margins, and operational performance dashboards",
    ],
    status: "Active Product",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* Page Header */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="Products" className="mb-4" />
            <h1
              className="text-4xl sm:text-6xl font-normal text-foreground leading-[1.1] max-w-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Software we design, build, and operate.
            </h1>
            <p className="mt-6 text-foreground/60 text-lg leading-relaxed max-w-2xl font-light">
              Alongside our client engineering engagements, ZuoLabs conceives and maintains
              specialized software products addressing complex domain problems.
            </p>
          </div>
        </section>

        {/* Product Sections */}
        <section className="border-b border-[#1e1e1e] px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-20 py-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="border border-[#1e1e1e] bg-[#0d0d0d] p-8 md:p-12 space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e1e1e]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-accent">{product.num}</span>
                    <h2
                      className="text-3xl sm:text-4xl font-normal text-foreground"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {product.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-accent/80">
                      {product.tagline}
                    </span>
                    <span className="text-[11px] font-mono text-foreground/40 border border-[#222] px-2 py-0.5">
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-4">
                    <p className="text-foreground/70 text-base leading-relaxed">
                      {product.description}
                    </p>
                    <div className="pt-4">
                      <a
                        href="https://cal.com/zuolabs/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
                      >
                        Inquire about {product.name} →
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-[#121212] p-6 border border-[#1e1e1e] space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-foreground/40">
                      Core Capabilities
                    </p>
                    <ul className="space-y-3">
                      {product.capabilities.map((cap, i) => (
                        <li key={i} className="text-xs text-foreground/70 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-accent shrink-0 mt-0.5">—</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="px-6 py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3
              className="text-3xl sm:text-4xl font-normal text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Interested in deploying our products or building your own?
            </h3>
            <p className="text-foreground/60 text-base max-w-xl mx-auto">
              We work with founders and enterprise teams to adapt our engines or engineer bespoke systems from scratch.
            </p>
            <div className="pt-2">
              <a
                href="https://cal.com/zuolabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
              >
                Schedule an Architecture Call →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}