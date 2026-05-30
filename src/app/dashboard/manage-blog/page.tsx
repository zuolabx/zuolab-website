"use client";

import { useState, useEffect, FormEvent } from "react";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/cms/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[420px] rounded-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
      <p className="text-xs text-gray-400">Loading editor…</p>
    </div>
  ),
});

// Types
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

// Helpers
function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Badge({ archived }: { archived: boolean }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
        archived
          ? "bg-amber-50 text-amber-600"
          : "bg-emerald-50 text-emerald-600"
      }`}
    >
      {archived ? "Archived" : "Live"}
    </span>
  );
}

// Main page
export default function ManageBlogPage() {
  const [view, setView] = useState<View>("list");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // fetch all blogs (including archived — admin needs to see everything)
  async function fetchBlogs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/fetch/all?limit=50");
      const json = await res.json();
      // fetch/all excludes deleted&archived by default; for admin we fetch separately
      // We fetch all live + all archived in one go via limit=50
      setBlogs(json.data?.blogs ?? []);
    } catch {
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete
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

  // Toggle archive
  async function handleToggleArchive(blog: Blog) {
    const res = await fetch("/api/blog/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: blog.slug, archived: !blog.archived }),
    });
    if (res.ok) {
      setBlogs((prev) =>
        prev.map((b) =>
          b.slug === blog.slug ? { ...b, archived: !b.archived } : b
        )
      );
    } else {
      const json = await res.json();
      alert(json.message ?? "Failed to update.");
    }
  }

  // Open edit
  function openEdit(blog: Blog) {
    setEditingBlog(blog);
    setView("edit");
  }

  return (
    <div>
      {/* Page heading + action */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
            Content
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Manage Blogs
          </h1>
        </div>
        {view === "list" ? (
          <button
            onClick={() => setView("create")}
            className="rounded-sm bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            + New post
          </button>
        ) : (
          <button
            onClick={() => { setView("list"); setEditingBlog(null); }}
            className="rounded-sm border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 transition-colors"
          >
            ← Back to list
          </button>
        )}
      </div>

      {/* Views */}
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
        <BlogForm
          mode="create"
          onSuccess={() => { fetchBlogs(); setView("list"); }}
        />
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

//Blog List
function BlogList({
  blogs,
  loading,
  error,
  onDelete,
  onToggleArchive,
  onEdit,
}: {
  blogs: Blog[];
  loading: boolean;
  error: string;
  onDelete: (slug: string) => void;
  onToggleArchive: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
}) {
  if (loading) return <p className="text-sm text-gray-400">Loading…</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (blogs.length === 0)
    return (
      <p className="text-sm text-gray-400">
        No posts yet. Create your first one.
      </p>
    );

  return (
    <div className="space-y-3">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex items-center gap-4 rounded-sm border border-gray-100 bg-white px-5 py-4"
        >
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-medium text-gray-900 truncate">
                {blog.title}
              </p>
              <Badge archived={blog.archived} />
            </div>
            <p className="text-xs text-gray-400 font-mono truncate">
              /blog/{blog.slug}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {blog.author} · {formatDate(blog.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onEdit(blog)}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onToggleArchive(blog)}
              className={`text-xs transition-colors ${
                blog.archived
                  ? "text-emerald-600 hover:text-emerald-800"
                  : "text-amber-600 hover:text-amber-800"
              }`}
            >
              {blog.archived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={() => onDelete(blog.slug)}
              className="text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Blog Form (create + edit)
function BlogForm({
  mode,
  initial,
  onSuccess,
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

  // Auto-generate slug from title only in create mode
  function handleTitleChange(val: string) {
    setTitle(val);
    if (mode === "create") {
      const generated = val
        .toLowerCase()
        .trim()
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
          body: JSON.stringify({
            title,
            slug,
            author,
            content,
            coverImg: coverImg || null,
          }),
        });
      } else {
        res = await fetch("/api/blog/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: initial!.slug,
            title,
            author,
            content,
            coverImg: coverImg || null,
            ...(slug !== initial!.slug ? { newSlug: slug } : {}),
          }),
        });
      }

      const json = await res.json();
      if (!res.ok) {
        setError(json.message ?? "Something went wrong.");
        return;
      }
      onSuccess();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-sm border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors";
  const labelCls =
    "block text-xs uppercase tracking-[0.15em] text-gray-500 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6" noValidate>
      <h2 className="text-xl font-semibold text-gray-900">
        {mode === "create" ? "New post" : "Edit post"}
      </h2>

      {error && (
        <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className={labelCls}>Title</label>
        <input
          className={inputCls}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>
          Slug{" "}
          <span className="normal-case tracking-normal text-gray-400">
            (15–50 chars)
          </span>
        </label>
        <input
          className={`${inputCls} font-mono text-xs`}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="my-blog-post-slug-must-be-at-least-30-characters"
          required
        />
        <p className="mt-1 text-xs text-gray-400">{slug.length} / 100</p>
      </div>

      {/* Author */}
      <div>
        <label className={labelCls}>Author</label>
        <input
          className={inputCls}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anshuman"
          required
        />
      </div>

      {/* Cover image */}
      <div>
        <label className={labelCls}>Cover image URL (optional)</label>
        <input
          className={inputCls}
          value={coverImg}
          onChange={(e) => setCoverImg(e.target.value)}
          placeholder="https://..."
          type="url"
        />
      </div>

      {/* Content */}
      <div>
        <label className={labelCls}>Content</label>
        <TiptapEditor value={content} onChange={setContent} />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {saving
            ? "Saving…"
            : mode === "create"
            ? "Publish post"
            : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className="rounded-sm border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:border-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
