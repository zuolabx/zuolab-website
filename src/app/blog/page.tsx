import Link from "next/link";
import { Metadata } from "next";
import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Blog & Perspectives — ZuoLabs",
  description:
    "Engineering insights, backend architecture, AI workflows, and product design by the ZuoLabs team.",
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
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-14">
        {/* Header */}
        <section className="border-b border-[#1e1e1e] px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
            <SectionLabel label="Writing & Notes" className="mb-4" />
            <h1
              className="text-4xl sm:text-6xl font-normal text-foreground leading-[1.1] max-w-2xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Perspectives on building software that scales.
            </h1>
            <p className="mt-6 text-foreground/60 text-lg leading-relaxed max-w-xl font-light">
              Engineering insights, system architecture notes, and AI integration practices
              from the ZuoLabs team.
            </p>
          </div>
        </section>

        {/* Blog Listing */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {blogs.length === 0 ? (
              <div className="py-20 text-center border border-[#1e1e1e] bg-[#0d0d0d] p-12">
                <p className="text-foreground/50 text-base mb-2 font-mono text-sm">
                  No articles published yet.
                </p>
                <p className="text-foreground/35 text-xs">
                  Check back soon for new technical write-ups.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#1e1e1e]">
                {blogs.map((blog) => (
                  <article key={blog._id} className="py-12 group">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex flex-col sm:flex-row sm:items-start justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
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

                        <h2
                          className="text-2xl sm:text-3xl font-normal text-foreground group-hover:text-accent transition-colors"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {blog.title}
                        </h2>

                        {blog.excerpt && (
                          <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}

                        <div className="pt-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-accent group-hover:underline inline-flex items-center gap-1">
                            <span>Read article</span>
                            <span>→</span>
                          </span>
                        </div>
                      </div>

                      {blog.coverImg && (
                        <div className="sm:w-44 sm:h-28 shrink-0 overflow-hidden border border-[#222] bg-[#141414]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.coverImg}
                            alt={blog.title}
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
