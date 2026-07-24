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

export function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm">
      <div className="w-full flex items-stretch h-11 border-x border-b border-foreground/[0.35]">
        <div className="flex items-center px-3 sm:px-5 border-r border-foreground/[0.35]">
          <ZuoLogo />
        </div>
        <div className="flex-1 flex items-center justify-center gap-3 sm:gap-10 px-2 sm:px-5 border-r border-foreground/[0.35]">
         <a
            href="/products"
            className="group text-[12px] sm:text-[15px]"
            style={alphaLyrae}
          >
            <CharHover text="Products" />
          </a>
          <a
            href="/services"
            className="group text-[12px] sm:text-[15px]"
            style={alphaLyrae}
          >
            <CharHover text="Services" />
          </a>
          <a
            href="/cases"
            className="group text-[12px] sm:text-[15px]"
            style={alphaLyrae}
          >
            <CharHover text="Work" />
          </a>
          <a
            href="/team"
            className="group text-[12px] sm:text-[15px]"
            style={alphaLyrae}
          >
            <CharHover text="Team" />
          </a>
          <a
            href="/blog"
            className="group text-[12px] sm:text-[15px]"
            style={alphaLyrae}
          >
            <CharHover text="Blog" />
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
  );
}
