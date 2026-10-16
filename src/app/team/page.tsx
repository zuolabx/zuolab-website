import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Team | ZuoLabs",
  description:
    "Meet the engineering team behind ZuoLabs: Sahil Nayak and Anshuman Praharaj.",
};

const founders = [
  {
    name: "Sahil Nayak",
    role: "Fullstack Engineer & Co-Founder",
    image: "https://avatars.githubusercontent.com/sahilnyk",
    twitter: "https://x.com/sahilnyk",
    bio: "Builds and maintains backend systems and cloud infrastructure. Experienced with Docker, container orchestration, and performance optimization. Focuses on writing reliable services and resilient system architecture.",
  },
  {
    name: "Anshuman Praharaj",
    role: "Fullstack Engineer & Co-Founder",
    image: "https://avatars.githubusercontent.com/u/103830605?v=4",
    twitter: "https://x.com/anshumancdx",
    bio: "Full-stack engineer focused on shipping reliable software quickly. Works across database schema design, backend APIs, and responsive, accessible user interfaces.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* Hero Header */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <SectionLabel label="The Team" className="mb-4" />
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-foreground leading-[1.08] max-w-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Small team.
              <br />
              <span className="text-foreground/45">High output.</span>
            </h1>
            <p className="mt-6 text-foreground/60 text-lg leading-relaxed max-w-2xl font-light">
              Engineers who care about solid architecture, fast execution, and
              writing maintainable code.
            </p>
          </div>
        </section>

        {/* Founders Grid */}
        <section className="border-b border-[#1e1e1e] px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {founders.map((member) => (
              <div
                key={member.name}
                className="border border-[#1e1e1e] bg-[#0d0d0d] p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border border-[#262626] grayscale"
                    />
                    <div>
                      <h2
                        className="text-2xl font-medium text-foreground tracking-tight"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {member.name}
                      </h2>
                      <p className="text-xs font-mono text-accent tracking-wide mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/65 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e1e1e] flex items-center justify-between">
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter / X</span>
                  </a>

                  <a
                    href="mailto:founders@zuolabs.com"
                    className="text-xs font-mono text-accent/80 hover:text-accent transition-colors"
                  >
                    founders@zuolabs.com
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Strip */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <SectionLabel
              label="Engineering Values"
              className="justify-center"
            />
            <h3
              className="text-3xl sm:text-4xl font-normal text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Direct communication, direct technical accountability
            </h3>
            <p className="text-foreground/60 text-base max-w-2xl mx-auto leading-relaxed">
              When you work with ZuoLabs, there are no intermediate layers or
              outsourced handoffs. You collaborate directly with the engineers
              designing and building your software.
            </p>
            <div className="pt-2">
              <a
                href="https://cal.com/zuolabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors"
              >
                Speak Directly with Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
