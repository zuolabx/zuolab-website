import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://zuolab.com";

interface BlogEntry {
  slug: string;
  updatedAt?: string;
  createdAt?: string;
}

async function getBlogSlugs(): Promise<BlogEntry[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/blog/fetch/all`, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.blogs ?? []) as BlogEntry[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Dynamic blog posts ─────────────────────────────────────────────────────
  const blogs = await getBlogSlugs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt ?? blog.createdAt ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
