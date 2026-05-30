import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface BlogPost {
  title: string;
  content: string;
  author: string;
  slug: string;
  coverImg?: string | null;
  createdAt: string;
}

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const base =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT ?? 3000}`
      : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");

  const res = await fetch(`${base}/api/blog/fetch/${slug}`, {
    cache: process.env.NODE_ENV === "development" ? "no-store" : "default",
    next:
      process.env.NODE_ENV === "development" ? undefined : { revalidate: 3600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);

  const json = await res.json();
  return json.data as BlogPost;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Post not found" };

  const excerpt = blog.content
    .replace(/[#*`>\-_\[\]()!]/g, "")
    .trim()
    .slice(0, 160);

  return {
    title: `${blog.title} — ZuoLab`,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      type: "article",
      authors: [blog.author],
      ...(blog.coverImg ? { images: [blog.coverImg] } : {}),
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const htmlContent = blog.content;

  return (
    <>
      {/* Nav — identical to home + blog listing */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="w-full flex items-stretch h-11 border-x border-b border-foreground/[0.35]">
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

          <div className="flex-1 flex items-center justify-center gap-3 sm:gap-10 px-2 sm:px-5 border-r border-foreground/[0.35]">
            <Link href="/#work" className="text-[12px] sm:text-[15px] text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Services
            </Link>
            <Link href="/#cases" className="text-[12px] sm:text-[15px] text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Work
            </Link>
            <Link href="/blog" className="text-[12px] sm:text-[15px] text-foreground/70 hover:text-foreground transition-colors" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              Blog
            </Link>
          </div>

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

      {/* Page container */}
      <div className="w-full border-x border-foreground/[0.35] mt-11 min-h-screen">

        {/* SectionHeader breadcrumb */}
        <div className="flex items-stretch border-b border-foreground/[0.35]">
          <div className="flex items-center px-5 py-2.5 border-r border-foreground/[0.35] shrink-0 bg-[#1a1a1a]">
            <Link
              href="/blog"
              className="text-[11px] tracking-[0.1em] text-foreground/50 hover:text-accent transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
            >
              <span>←</span>
              <span>Writing</span>
            </Link>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-20" />
          </div>
        </div>

        {/* Cover image — full-width, cinematic */}
        {blog.coverImg && (
          <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden border-b border-foreground/[0.35]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="w-full h-full object-cover grayscale contrast-[1.1] brightness-75"
            />
            <div className="absolute inset-0 scan-lines pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Article header */}
        <div className="px-6 sm:px-10 lg:px-16 pt-12 pb-10 border-b border-foreground/[0.35] max-w-4xl mx-auto w-full">
          {/* Meta row */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] tracking-[0.12em] uppercase text-foreground/35" style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}>
              {blog.author}
            </span>
            {blog.createdAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-foreground/25" />
                <time
                  dateTime={blog.createdAt}
                  className="text-[11px] tracking-[0.05em] text-foreground/35"
                  style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
                >
                  {formatDate(blog.createdAt)}
                </time>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-foreground/90 tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 6vw, 72px)",
              lineHeight: "1.1",
            }}
          >
            {blog.title}
          </h1>
        </div>

        {/* Divider with halftone accent */}
        <div className="flex items-stretch h-px border-b border-foreground/[0.35]">
          <div className="w-24 bg-accent/60" />
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-10" />
          </div>
        </div>

        {/* Article body */}
        <div className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16 max-w-4xl mx-auto w-full">
          <article
            className="
              prose max-w-none
              prose-headings:font-medium prose-headings:tracking-tight
              prose-headings:text-foreground/90
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-foreground/60 prose-p:leading-[1.85] prose-p:text-[17px]
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
              prose-strong:text-foreground/85 prose-strong:font-medium
              prose-blockquote:border-l-2 prose-blockquote:border-accent/50
              prose-blockquote:text-foreground/45 prose-blockquote:italic
              prose-blockquote:pl-5 prose-blockquote:not-italic
              prose-code:text-accent prose-code:bg-foreground/[0.06] prose-code:rounded
              prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[14px] prose-code:font-normal
              prose-pre:bg-[#0d0d10] prose-pre:border prose-pre:border-foreground/[0.12]
              prose-pre:text-foreground/80 prose-pre:rounded-none
              prose-img:rounded-none prose-img:mx-auto prose-img:border prose-img:border-foreground/[0.12]
              prose-hr:border-foreground/[0.15]
              prose-ol:text-foreground/60 prose-ul:text-foreground/60
              prose-li:marker:text-accent/50
            "
            style={{ fontFamily: "var(--font-inter)" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Post footer / back nav */}
        <div className="border-t border-foreground/[0.35] px-6 sm:px-10 lg:px-16 py-8 flex items-center justify-between max-w-4xl mx-auto w-full">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[13px] text-foreground/40 hover:text-foreground transition-colors"
            style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to all posts
          </Link>

          <a
            href="https://cal.com/zuolabs/30min"
            className="inline-flex items-center gap-2 text-[13px] text-accent hover:text-foreground transition-colors"
            style={{ fontFamily: "'Alpha Lyrae', sans-serif" }}
          >
            Work with us
            <span>→</span>
          </a>
        </div>

        {/* Footer watermark */}
        <footer className="border-t border-foreground/[0.35]">
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
