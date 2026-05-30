"use client";

import { useState, useEffect, FormEvent } from "react";
import dynamic from "next/dynamic";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

const TiptapEditor = dynamic(() => import("@/components/cms/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[420px] border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] flex items-center justify-center">
      <p className="text-xs text-[#f5f5f0]/30">Loading editor…</p>
    </div>
  ),
});

interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  coverImg?: string | null;
  archived: boolean;
  createdAt: string;
}

type View = "list" | "create" | "edit";

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function Badge({ archived }: { archived: boolean }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${
        archived
          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          : "bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20"
      }`}
      style={alphaLyrae}
    >
      {archived ? "Archived" : "Live"}
    </span>
  );
}

export default function ManageBlogPage() {
  const [view, setView] = useState<View>("list");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  async function fetchBlogs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/fetch/all?limit=50");
      const json = await res.json();
      setBlogs(json.data?.blogs ?? []);
    } catch {
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBlogs(); }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    const res = await fetch("/api/blog/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } else {
      const json = await res.json();
      alert(json.message ?? "Failed to delete.");
    }
  }

  async function handleToggleArchive(blog: Blog) {
    const res = await fetch("/api/blog/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: blog.slug, archived: !blog.archived }),
    });
    if (res.ok) {
      setBlogs((prev) => prev.map((b) => b.slug === blog.slug ? { ...b, archived: !b.archived } : b));
    } else {
      const json = await res.json();
      alert(json.message ?? "Failed to update.");
    }
  }

  function openEdit(blog: Blog) {
    setEditingBlog(blog);
    setView("edit");
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-stretch border-y border-[#f5f5f0]/[0.12] mb-10">
        <div className="flex items-center px-4 py-2 border-r border-[#f5f5f0]/[0.12] shrink-0 bg-[#1a1a1a]">
          <span className="text-[10px] tracking-[0.12em] text-[#f5f5f0]/40" style={alphaLyrae}>
            CONTENT
          </span>
        </div>
        <div className="flex-1 flex items-center justify-between px-5">
          <h1 className="text-[15px] font-medium text-[#f5f5f0]/80" style={alphaLyrae}>
            Manage Blogs
          </h1>
          {view === "list" ? (
            <button
              onClick={() => setView("create")}
              className="text-[12px] text-[#6366f1] hover:text-[#6366f1]/70 transition-colors"
              style={alphaLyrae}
            >
              + New post
            </button>
          ) : (
            <button
              onClick={() => { setView("list"); setEditingBlog(null); }}
              className="text-[12px] text-[#f5f5f0]/40 hover:text-[#f5f5f0]/70 transition-colors"
              style={alphaLyrae}
            >
              ← Back to list
            </button>
          )}
        </div>
      </div>

      {view === "list" && (
        <BlogList
          blogs={blogs}
          loading={loading}
          error={error}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
          onEdit={openEdit}
        />
      )}
      {view === "create" && (
        <BlogForm mode="create" onSuccess={() => { fetchBlogs(); setView("list"); }} />
      )}
      {view === "edit" && editingBlog && (
        <BlogForm
          mode="edit"
          initial={editingBlog}
          onSuccess={() => { fetchBlogs(); setView("list"); setEditingBlog(null); }}
        />
      )}
    </div>
  );
}

function BlogList({
  blogs, loading, error, onDelete, onToggleArchive, onEdit,
}: {
  blogs: Blog[];
  loading: boolean;
  error: string;
  onDelete: (slug: string) => void;
  onToggleArchive: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
}) {
  if (loading) return <p className="text-sm text-[#f5f5f0]/30">Loading…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (blogs.length === 0)
    return <p className="text-sm text-[#f5f5f0]/30">No posts yet. Create your first one.</p>;

  return (
    <div className="border border-[#f5f5f0]/[0.08]">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex items-center gap-4 bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors px-5 py-4 border-b border-[#f5f5f0]/[0.06] last:border-b-0"
        >
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[14px] font-medium text-[#f5f5f0]/80 truncate">{blog.title}</p>
              <Badge archived={blog.archived} />
            </div>
            <p className="text-[11px] text-[#f5f5f0]/30 truncate" style={{ fontFamily: "var(--font-mono)" }}>
              /blog/{blog.slug}
            </p>
            <p className="text-[11px] text-[#f5f5f0]/25 mt-0.5">
              {blog.author} · {formatDate(blog.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onEdit(blog)}
              className="text-[12px] text-[#f5f5f0]/40 hover:text-[#6366f1] transition-colors"
              style={alphaLyrae}
            >
              Edit
            </button>
            <button
              onClick={() => onToggleArchive(blog)}
              className={`text-[12px] transition-colors ${
                blog.archived
                  ? "text-[#6366f1]/60 hover:text-[#6366f1]"
                  : "text-amber-500/60 hover:text-amber-400"
              }`}
              style={alphaLyrae}
            >
              {blog.archived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={() => onDelete(blog.slug)}
              className="text-[12px] text-red-500/40 hover:text-red-400 transition-colors"
              style={alphaLyrae}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogForm({
  mode, initial, onSuccess,
}: {
  mode: "create" | "edit";
  initial?: Blog;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImg, setCoverImg] = useState(initial?.coverImg ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(val: string) {
    setTitle(val);
    if (mode === "create") {
      const generated = val.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100);
      setSlug(generated);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/blog/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, author, content, coverImg: coverImg || null }),
        });
      } else {
        res = await fetch("/api/blog/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: initial!.slug, title, author, content,
            coverImg: coverImg || null,
            ...(slug !== initial!.slug ? { newSlug: slug } : {}),
          }),
        });
      }
      const json = await res.json();
      if (!res.ok) { setError(json.message ?? "Something went wrong."); return; }
      onSuccess();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-[#f5f5f0]/80 placeholder-[#f5f5f0]/20 outline-none focus:border-[#6366f1]/50 transition-colors rounded-none";
  const labelCls = "block text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/40 mb-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6" noValidate>
      <h2 className="text-[18px] font-medium text-[#f5f5f0]/80" style={{ fontFamily: "var(--font-serif)" }}>
        {mode === "create" ? "New post" : "Edit post"}
      </h2>

      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className={labelCls} style={alphaLyrae}>Title</label>
        <input className={inputCls} value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title" required />
      </div>

      <div>
        <label className={labelCls} style={alphaLyrae}>
          Slug <span className="normal-case tracking-normal text-[#f5f5f0]/25">(15–50 chars)</span>
        </label>
        <input className={`${inputCls}`} style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-blog-post-slug" required />
        <p className="mt-1 text-[11px] text-[#f5f5f0]/25">{slug.length} / 100</p>
      </div>

      <div>
        <label className={labelCls} style={alphaLyrae}>Author</label>
        <input className={inputCls} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Anshuman" required />
      </div>

      <div>
        <label className={labelCls} style={alphaLyrae}>Cover image URL (optional)</label>
        <input className={inputCls} value={coverImg} onChange={(e) => setCoverImg(e.target.value)} placeholder="https://..." type="url" />
      </div>

      <div>
        <label className={labelCls} style={alphaLyrae}>Content</label>
        <TiptapEditor value={content} onChange={setContent} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#6366f1] text-[#0d0d0d] px-5 py-2.5 text-[13px] hover:bg-[#6366f1]/90 disabled:opacity-40 transition-colors"
          style={alphaLyrae}
        >
          {saving ? "Saving…" : mode === "create" ? "Publish post" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className="border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-5 py-2.5 text-[13px] text-[#f5f5f0]/50 hover:border-[#f5f5f0]/30 hover:text-[#f5f5f0]/70 transition-colors"
          style={alphaLyrae}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
