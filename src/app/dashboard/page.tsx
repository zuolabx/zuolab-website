import Link from "next/link";
import dbConnect from "@/db/dbconnect";
import { BlogModel } from "@/schemas/blog.schema";

export const dynamic = "force-dynamic";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

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
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
      {/* Section header */}
      <div className="flex items-stretch border-y border-[#f5f5f0]/[0.12] mb-10">
        <div className="flex items-center px-4 py-2 border-r border-[#f5f5f0]/[0.12] shrink-0 bg-[#1a1a1a]">
          <span className="text-[10px] tracking-[0.12em] text-[#f5f5f0]/40" style={alphaLyrae}>
            OVERVIEW
          </span>
        </div>
        <div className="flex-1 flex items-center px-5">
          <h1 className="text-[15px] font-medium text-[#f5f5f0]/80" style={alphaLyrae}>
            Dashboard
          </h1>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-12 border border-[#f5f5f0]/[0.08] bg-[#f5f5f0]/[0.08]">
        {statCards.map(({ label, value }) => (
          <div key={label} className="bg-[#0d0d0d] px-5 py-6 flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/30" style={alphaLyrae}>
              {label}
            </p>
            <p className="text-4xl font-semibold text-[#f5f5f0] tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#f5f5f0]/[0.08] mb-10" />

      {/* Latest posts */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/30" style={alphaLyrae}>
            Recent Posts
          </p>
          <Link href="/dashboard/manage-blog" className="text-[12px] text-[#6366f1] hover:text-[#6366f1]/70 transition-colors" style={alphaLyrae}>
            Manage all →
          </Link>
        </div>

        {stats.latest.length === 0 ? (
          <p className="text-sm text-[#f5f5f0]/30">No posts yet.</p>
        ) : (
          <div className="border border-[#f5f5f0]/[0.08]">
            {stats.latest.map((post) => (
              <div key={post.slug} className="flex items-center justify-between gap-4 bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors px-5 py-3.5 border-b border-[#f5f5f0]/[0.06] last:border-b-0">
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-[#f5f5f0]/80 truncate">{post.title}</p>
                  <p className="text-[11px] text-[#f5f5f0]/30 mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)" }}>
                    /blog/{post.slug}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <time dateTime={post.createdAt} className="text-[11px] text-[#f5f5f0]/30 whitespace-nowrap">
                    {formatDate(post.createdAt)}
                  </time>
                  <Link href={`/blog/${post.slug}`} target="_blank" className="text-[12px] text-[#f5f5f0]/30 hover:text-[#6366f1] transition-colors" title="View post">
                    ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-12 pt-8 border-t border-[#f5f5f0]/[0.08]">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/30 mb-4" style={alphaLyrae}>
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/manage-blog" className="border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-4 py-2 text-[13px] text-[#f5f5f0]/60 hover:border-[#6366f1]/40 hover:text-[#f5f5f0] transition-colors" style={alphaLyrae}>
            Manage blogs
          </Link>
          <Link href="/blog" target="_blank" className="border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-4 py-2 text-[13px] text-[#f5f5f0]/60 hover:border-[#6366f1]/40 hover:text-[#f5f5f0] transition-colors" style={alphaLyrae}>
            View public blog ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
