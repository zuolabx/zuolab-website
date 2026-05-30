import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — ZuoLab",
  description:
    "Thoughts on software engineering, backend systems, and building things that scale — by the ZuoLab team.",
};

export const dynamic = "force-dynamic";

interface BlogEntry {
  _id: string;
  title: string;
  slug: string;
  author: string;
  coverImg?: string | null;
  createdAt: string;
  excerpt?: string;
}

async function getAllBlogs(): Promise<BlogEntry[]> {
  const base =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT ?? 3000}`
      : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");

  try {
    const res = await fetch(`${base}/api/blog/fetch/all`, {
      cache: process.env.NODE_ENV === "development" ? "no-store" : "default",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.blogs ?? []) as BlogEntry[];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <>
      {/* Nav — matches home page exactly */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="w-full flex items-stretch h-11 border-x border-b border-foreground/[0.35]">
          {/* Logo */}
          <div className="flex items-center px-3 sm:px-5 border-r border-foreground/[0.35]">
            <Link href="/" className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="34" height="34" stroke="currentColor" strokeWidth="1" />
                <path d="M9 11h18L9 25h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
              <span className="text-[13px] tracking-[0.05em]" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
                Zuo<span className="text-accent">lab</span>
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex-1 flex items-center justify-center gap-3 sm:gap-10 px-2 sm:px-5 border-r border-foreground/[0.35]">
            <Link href="/#work" className="text-[12px] sm:text-[15px] text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Services
            </Link>
            <Link href="/#cases" className="text-[12px] sm:text-[15px] text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Work
            </Link>
            <Link href="/blog" className="text-[12px] sm:text-[15px] text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Blog
            </Link>
          </div>

          {/* CTA */}
          <a
            href="https://cal.com/zuolabs/30min"
            className="flex items-center px-2 sm:px-5 text-[12px] sm:text-[17px] text-foreground hover:text-[#0d0d0d] transition-colors duration-300 relative overflow-hidden group"
            style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
          >
            <span className="relative z-10 whitespace-nowrap">Talk to Us</span>
            <span className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
        </div>
      </nav>

      {/* Page container — same border-x pattern as home */}
      <div className="w-full border-x border-foreground/[0.35] mt-11 min-h-screen">

        {/* Page header — SectionHeader pattern */}
        <div className="flex items-stretch border-b border-foreground/[0.35]">
          <div className="flex items-center px-5 py-2.5 border-r border-foreground/[0.35] shrink-0 bg-[#1a1a1a]">
            <span
              className="text-[11px] tracking-[0.1em] text-foreground/50"
              style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
            >
              Writing
            </span>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-20" />
          </div>
        </div>

        {/* Hero header */}
        <div className="border-b border-foreground/[0.35] px-6 sm:px-10 py-14 sm:py-20 relative overflow-hidden bg-[#0d0d10]">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none opacity-20">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="border-l border-foreground/20 first:border-l-0 last:border-r hidden md:block" />
            ))}
          </div>

          <div className="relative z-10 max-w-3xl">
            <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/30 mb-5" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              {blogs.length > 0 ? `${blogs.length} post${blogs.length !== 1 ? "s" : ""}` : "No posts yet"}
            </p>
            <h1
              className="text-foreground/90 tracking-[-0.02em] mb-5"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 7vw, 88px)",
                lineHeight: "1.08",
              }}
            >
              From the lab.
            </h1>
            <p className="text-foreground/40 text-[15px] sm:text-[17px] leading-[1.7] max-w-xl">
              Engineering deep-dives, system design notes, and lessons from building things that actually ship.
            </p>
          </div>
        </div>

        {/* Blog list */}
        {blogs.length === 0 ? (
          <div className="px-6 sm:px-10 py-20 border-b border-foreground/[0.35]">
            <p className="text-foreground/25 text-[15px]" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              No posts yet — check back soon.
            </p>
          </div>
        ) : (
          <div>
            {blogs.map((blog, i) => (
              <article key={blog._id} className="border-b border-foreground/[0.35]">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group grid md:grid-cols-[1fr_auto] items-stretch hover:bg-foreground/[0.02] transition-colors duration-200"
                >
                  {/* Content */}
                  <div className="px-6 sm:px-10 py-8 sm:py-10 md:border-r border-foreground/[0.35]">
                    {/* Post number + meta */}
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-[10px] text-foreground/20 tracking-[0.15em]" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="w-px h-3 bg-foreground/20" />
                      <span className="text-[11px] text-foreground/35 tracking-[0.1em] uppercase" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
                        {blog.author}
                      </span>
                      {blog.createdAt && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-foreground/20" />
                          <time dateTime={blog.createdAt} className="text-[11px] text-foreground/35 tracking-[0.05em]" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
                            {formatDate(blog.createdAt)}
                          </time>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      className="text-foreground/80 group-hover:text-foreground transition-colors duration-200 mb-4"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(22px, 3vw, 32px)",
                        lineHeight: "1.18",
                      }}
                    >
                      {blog.title}
                    </h2>

                    {/* Read link */}
                    <span className="group/cta relative inline-flex items-center text-accent text-[13px] tracking-[0.08em] transition-all" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
                      Read post
                      <span className="ml-1.5 group-hover:ml-3 transition-all duration-200">→</span>
                    </span>
                  </div>

                  {/* Cover image — right column, only when present */}
                  {blog.coverImg ? (
                    <div className="hidden md:block w-64 lg:w-80 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.coverImg}
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale contrast-[1.1] group-hover:grayscale-[0.3] group-hover:contrast-100 transition-all duration-700 scale-100 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 scan-lines pointer-events-none opacity-20" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/40 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    /* Placeholder tile when no cover image */
                    <div className="hidden md:flex w-64 lg:w-80 items-center justify-center bg-[#0d0d10] relative overflow-hidden">
                      <div className="absolute inset-0 halftone opacity-30" />
                      <span
                        className="text-[64px] font-medium leading-none text-foreground/[0.03] select-none"
                        style={{ fontFamily: "var(--font-chinese)" }}
                      >
                        佐
                      </span>
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer>
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
              <p className="text-[14px] text-foreground/20 tracking-[0.1em]">© 2025 Zuolab</p>
            </div>
            <div className="flex items-center px-6 py-3">
              <p className="text-[14px] text-foreground/20 tracking-[0.1em]">Built with obsessive attention to detail</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
