"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/manage-blog", label: "Manage blogs" },
];

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
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Top bar */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors"
            >
              anshumancdx.xyz
            </Link>
            <span className="text-gray-200 select-none">/</span>
            <span className="text-sm text-gray-500">Dashboard</span>
          </div>

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
                  className={`text-sm transition-colors ${
                    active
                      ? "text-gray-900 font-medium"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-600 transition-colors"
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
