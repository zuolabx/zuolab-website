import Link from "next/link";

interface ZuoLogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

export function ZuoLogo({ className = "", showText = true, href = "/" }: ZuoLogoProps) {
  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        className="h-5 w-5 shrink-0 text-foreground"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
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
      {showText && (
        <span
          className="text-[13px] tracking-[0.05em] font-medium leading-none text-foreground"
          style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
        >
          Zuo<span className="text-accent">labs</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
