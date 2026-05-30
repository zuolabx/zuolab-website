import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/db/dbconnect";
import { BlogModel } from "@/schemas/blog.schema";

// No ISR — always fresh stats
export const dynamic = "force-dynamic";

interface Stats {
  total: number;
  published: number;
  archived: number;
  deleted: number;
  latest: { title: string; slug: string; createdAt: string }[];
}

async function getBlogStats(): Promise<Stats> {
  await dbConnect();

  const [total, published, archived, deleted, latestDocs] = await Promise.all([
    BlogModel.countDocuments({}),
    BlogModel.countDocuments({ deletedBy: { $exists: false }, archived: { $ne: true } }),
    BlogModel.countDocuments({ archived: true, deletedBy: { $exists: false } }),
    BlogModel.countDocuments({ deletedBy: { $exists: true } }),
    BlogModel.find({ deletedBy: { $exists: false }, archived: { $ne: true } })
      .select("title slug createdAt")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return {
    total,
    published,
    archived,
    deleted,
    latest: latestDocs.map((b) => ({
      title: b.title,
      slug: b.slug,
      createdAt: (b as any).createdAt?.toISOString?.() ?? "",
    })),
  };
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function DashboardPage() {
  const stats = await getBlogStats();

  const statCards = [
    { label: "Total Posts", value: stats.total },
    { label: "Published", value: stats.published },
    { label: "Archived", value: stats.archived },
    { label: "Deleted", value: stats.deleted },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
          Overview
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {statCards.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-sm border border-gray-100 bg-white px-5 py-5"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">
              {label}
            </p>
            <p className="text-4xl font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <hr className="border-none h-px bg-gray-100 mb-10" />

      {/* Latest posts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
            Recent Posts
          </p>
          <Link
            href="/dashboard/manage-blog"
            className="text-xs text-gray-500 underline underline-offset-4 decoration-gray-200 hover:text-gray-900 transition-colors"
          >
            Manage all →
          </Link>
        </div>

        {stats.latest.length === 0 ? (
          <p className="text-sm text-gray-400">No posts yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.latest.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between gap-4 rounded-sm border border-gray-100 bg-white px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">
                    /blog/{post.slug}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <time
                    dateTime={post.createdAt}
                    className="text-xs text-gray-400 whitespace-nowrap"
                  >
                    {formatDate(post.createdAt)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    title="View post"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-4">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/manage-blog"
            className="rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Manage blogs
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            View public blog ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
