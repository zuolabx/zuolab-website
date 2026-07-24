const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

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
          {char === " " ? "\u00a0" : char}
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

export function SiteFooter() {
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
              <a href="/services" className="group text-[14px]" style={alphaLyrae}>
                <CharHover text="Services" />
              </a>
            </li>
            <li>
              <a href="/work" className="group text-[14px]" style={alphaLyrae}>
                <CharHover text="Work" />
              </a>
            </li>
            <li>
              <a href="/team" className="group text-[14px]" style={alphaLyrae}>
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
                href="https://www.linkedin.com/in/zuo-labs-0795b4412/"
                className="group flex items-center gap-3 text-[14px]"
                style={alphaLyrae}
              >
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
                href="mailto:founders@zuolabs.com"
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
                <CharHover text="founders@zuolabs.com" />
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
