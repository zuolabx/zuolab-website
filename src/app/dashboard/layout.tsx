"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/manage-blog", label: "Manage blogs" },
];

function ZuoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="h-5 w-5"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" width="34" height="34" stroke="currentColor" strokeWidth="1" />
        <path d="M9 11h18L9 25h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      <span className="text-[13px] tracking-[0.05em]" style={alphaLyrae}>
        Zuo<span className="text-[#6366f1]">lab</span>
      </span>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin", { method: "DELETE" });
    router.push("/auth");
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f0]">
      {/* Top bar */}
      <header className="border-b border-[#f5f5f0]/[0.08] bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Left: logo + breadcrumb */}
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-opacity hover:opacity-70">
              <ZuoLogo />
            </Link>
            <span className="text-[#f5f5f0]/20 select-none text-sm">/</span>
            <span
              className="text-[11px] tracking-[0.12em] text-[#f5f5f0]/40"
              style={alphaLyrae}
            >
              DASHBOARD
            </span>
          </div>

          {/* Right: nav + sign out */}
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => {
              const active =
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-[13px] tracking-[0.04em] transition-colors ${
                    active
                      ? "text-[#f5f5f0]"
                      : "text-[#f5f5f0]/40 hover:text-[#f5f5f0]/70"
                  }`}
                  style={alphaLyrae}
                >
                  {label}
                  {active && (
                    <span className="ml-1.5 inline-block w-1 h-1 rounded-full bg-[#6366f1] align-middle" />
                  )}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="text-[13px] text-[#f5f5f0]/30 hover:text-red-400 transition-colors"
              style={alphaLyrae}
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
