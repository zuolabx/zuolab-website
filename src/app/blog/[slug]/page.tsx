import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";

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

  if (!blog) return { title: "Post not found | ZuoLabs" };

  const excerpt = blog.content
    .replace(/[#*`>\-_\[\]()!]/g, "")
    .trim()
    .slice(0, 160);

  return {
    title: `${blog.title} | ZuoLabs`,
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

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* Back Link Header */}
        <div className="border-b border-[#1e1e1e] px-6 py-5">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="text-xs font-mono uppercase tracking-[0.15em] text-foreground/45 hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>All Articles</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <header className="px-6 pt-16 pb-12 border-b border-[#1e1e1e]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono text-foreground/40">
              <span className="text-accent">{blog.author}</span>
              {blog.createdAt && (
                <>
                  <span>•</span>
                  <time dateTime={blog.createdAt}>
                    {formatDate(blog.createdAt)}
                  </time>
                </>
              )}
            </div>

            <h1
              className="text-3xl sm:text-5xl font-normal text-foreground leading-[1.12]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {blog.title}
            </h1>
          </div>
        </header>

        {/* Cover Image if present */}
        {blog.coverImg && (
          <div className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto max-h-[460px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImg}
                alt={blog.title}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="px-6 py-16 sm:py-20">
          <div
            className="
              max-w-3xl mx-auto
              prose prose-invert
              prose-headings:font-normal prose-headings:tracking-tight
              prose-headings:text-foreground
              prose-p:text-foreground/75 prose-p:leading-[1.8] prose-p:text-[17px]
              prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-accent/80
              prose-blockquote:border-l-2 prose-blockquote:border-accent
              prose-blockquote:text-foreground/60 prose-blockquote:italic
              prose-code:text-accent prose-code:bg-[#161616] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm
              prose-pre:bg-[#111111] prose-pre:border prose-pre:border-[#222222] prose-pre:rounded-none
              prose-hr:border-[#1e1e1e]
              prose-li:text-foreground/70
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Article Postscript / CTA */}
        <section className="border-t border-[#1e1e1e] px-6 py-16 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-foreground">
                Building an AI product or complex web application?
              </p>
              <p className="text-xs text-foreground/50 mt-1">
                We build and ship software designed to run reliably in
                production.
              </p>
            </div>
            <a
              href="https://cal.com/zuolabs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-accent text-[#0d0d0d] font-mono text-xs uppercase tracking-[0.1em] font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
            >
              Book a Call
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
