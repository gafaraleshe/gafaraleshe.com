"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.44-4.96 3.44-8.38Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.03-6.45-4.75H1.7v2.98A11.5 11.5 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.55 14.67a6.9 6.9 0 0 1 0-4.34V7.35H1.7a11.5 11.5 0 0 0 0 10.3l3.85-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.7 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.2 15.1 0 12 0A11.5 11.5 0 0 0 1.7 7.35l3.85 2.98C6.46 7.6 9 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function AuthForm({
  mode,
  next = "/account",
}: {
  mode: "login" | "signup";
  next?: string;
}) {
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const guard = () => {
    if (!isSupabaseConfigured) {
      setError(
        "Auth isn't configured yet — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return false;
    }
    return true;
  };

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!guard()) return;
    setLoading("email");
    const supabase = createClient();
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        setNotice("Check your email to confirm your account, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.assign(next);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(null);
    }
  }

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    if (!guard()) return;
    setLoading("google");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <a
        href="/links"
        className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
      >
        ← Gafar Aleshe
      </a>

      <div
        className="relative w-full max-w-sm rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-7 py-9 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          {isSignup ? "Create Account" : "Sign In"}
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
          {isSignup ? "Join in" : "Welcome back"}
        </h1>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading !== null}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-neutral-900/15 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 disabled:opacity-60"
        >
          <GoogleIcon />
          {loading === "google" ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-900/10" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            or
          </span>
          <span className="h-px flex-1 bg-neutral-900/10" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-neutral-900/15 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="mt-1 w-full rounded-md border border-neutral-900/15 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading !== null}
            className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading === "email"
              ? "Working…"
              : isSignup
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-md border border-red-300/60 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-4 rounded-md border border-emerald-300/60 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            {notice}
          </p>
        )}

        <p className="mt-6 text-center font-mono text-xs text-neutral-500">
          {isSignup ? "Already have an account? " : "No account yet? "}
          <a
            href={isSignup ? "/auth/login" : "/auth/sign-up"}
            className="font-semibold text-neutral-900 underline underline-offset-2"
          >
            {isSignup ? "Sign in" : "Create one"}
          </a>
        </p>
      </div>
    </div>
  );
}
