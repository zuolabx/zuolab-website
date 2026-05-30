"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const alphaLyrae = { fontFamily: "'Alpha Lyrae', sans-serif" };

const REASON_MESSAGES: Record<string, string> = {
  unauthenticated: "Please sign in to access the dashboard.",
  forbidden: "You need to be an admin to access the dashboard.",
  session_expired: "Your session has expired. Please sign in again.",
};

// Isolated so useSearchParams is inside a Suspense boundary (required by Next.js)
function RedirectNotice({ onNotice }: { onNotice: (msg: string) => void }) {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") ?? "";
  const message = REASON_MESSAGES[reason] ?? "";

  useEffect(() => {
    if (message) onNotice(message);
  }, [message, onNotice]);

  return null;
}

function ZuoLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="h-5 w-5"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M9 11h18L9 25h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      <span className="text-[13px] tracking-[0.05em]" style={alphaLyrae}>
        Zuo<span className="text-[#6366f1]">lab</span>
      </span>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message ?? "Login failed.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f0]">
      {/* Reads ?reason= param and sets error message */}
      <Suspense fallback={null}>
        <RedirectNotice onNotice={setError} />
      </Suspense>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#f5f5f0]/[0.08]">
        <ZuoLogo />
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#f5f5f0]/30"
          style={alphaLyrae}
        >
          Admin Access
        </span>
      </div>

      {/* Centered form area */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Section label */}
          <div className="flex items-stretch border-y border-[#f5f5f0]/[0.12] mb-10">
            <div className="flex items-center px-4 py-2 border-r border-[#f5f5f0]/[0.12] shrink-0 bg-[#1a1a1a]">
              <span
                className="text-[10px] tracking-[0.12em] text-[#f5f5f0]/40"
                style={alphaLyrae}
              >
                SIGN IN
              </span>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-[28px] font-medium tracking-tight leading-tight text-[#f5f5f0]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Dashboard access is restricted to admins.
            </h1>
          </div>

          {/* Error / redirect notice */}
          {error && (
            <div
              role="alert"
              className="mb-6 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 rounded-none"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/40 mb-2"
                style={alphaLyrae}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-[#f5f5f0] placeholder-[#f5f5f0]/20 outline-none focus:border-[#6366f1]/60 transition-colors rounded-none"
                placeholder="you@example.com"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] uppercase tracking-[0.18em] text-[#f5f5f0]/40 mb-2"
                style={alphaLyrae}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#f5f5f0]/[0.12] bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-[#f5f5f0] placeholder-[#f5f5f0]/20 outline-none focus:border-[#6366f1]/60 transition-colors rounded-none"
                placeholder="••••••••"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#6366f1] text-[#0d0d0d] py-2.5 text-[13px] tracking-[0.08em] hover:bg-[#6366f1]/90 disabled:opacity-40 transition-colors rounded-none cursor-pointer"
              style={alphaLyrae}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-[11px] text-[#f5f5f0]/20 text-center tracking-[0.05em]">
            Unauthorised access attempts are logged.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return <LoginForm />;
}
