import Link from "next/link";
import { ZuoLogo } from "./zuo-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1e1e1e] bg-[#0d0d0d] text-foreground/70">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <ZuoLogo />
            <p className="text-[14px] leading-relaxed text-foreground/50 max-w-sm">
              We build software products and integrate AI into existing business workflows for founders and companies.
            </p>
            <div className="pt-2">
              <a
                href="mailto:founders@zuolabs.com"
                className="inline-flex items-center text-[13px] font-mono text-accent hover:underline"
              >
                founders@zuolabs.com
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/35">
              Navigation
            </p>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link
                  href="/products"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Col */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/35">
              Connect
            </p>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a
                  href="https://cal.com/zuolabs/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Book a 30-min Call</span>
                  <span className="text-foreground/30 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/zuolabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Twitter / X</span>
                  <span className="text-foreground/30 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zuolabx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <span className="text-foreground/30 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/zuo-labs-0795b4412/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-foreground/30 text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-foreground/40 font-mono">
          <p>© 2026 ZuoLabs. All rights reserved.</p>
          <p className="text-foreground/30 text-xs">
            Software built for real workloads.
          </p>
        </div>
      </div>
    </footer>
  );
}
