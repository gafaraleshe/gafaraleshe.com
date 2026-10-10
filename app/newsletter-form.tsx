"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// "paper" is the filing card used on /shop; "cinema" the flat black version
// for /cinema/shop, which ignores the site theme like the rest of /cinema.
const TONES = {
  paper: {
    section:
      "relative mt-4 rounded-md border border-ink/10 bg-paper px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-8",
    label: "font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted",
    title:
      "mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl",
    body: "mt-2 max-w-md font-mono text-[12px] leading-relaxed text-ink-dim",
    input:
      "flex-1 rounded-md border border-ink/15 bg-tile px-3 py-2.5 font-mono text-sm text-ink outline-none placeholder:text-ink/50 focus:border-ink/40",
    button:
      "flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60",
    done: "text-emerald-700 dark:text-emerald-400",
    error: "text-red-600 dark:text-red-400",
  },
  cinema: {
    section: "relative border border-white/15 bg-black px-6 py-8 sm:px-10",
    label: "font-mono text-[11px] uppercase tracking-[0.25em] text-white/50",
    title:
      "mt-2 font-cine text-[34px] uppercase leading-none tracking-wide text-white sm:text-[44px]",
    body: "mt-3 max-w-md text-[14px] leading-relaxed text-white/60",
    input:
      "flex-1 border border-white/20 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none placeholder:text-white/35 focus:border-white/60",
    button:
      "flex items-center justify-center gap-2 bg-white px-5 py-2.5 font-cine text-[18px] uppercase tracking-wide text-black transition-opacity hover:opacity-85 disabled:opacity-60",
    done: "text-emerald-400",
    error: "text-red-400",
  },
} as const;

export default function NewsletterForm({
  tone = "paper",
}: {
  tone?: keyof typeof TONES;
}) {
  const t = TONES[tone];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  }

  return (
    <section
      className={t.section}
      style={
        tone === "paper"
          ? {
              backgroundImage:
                "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }
          : undefined
      }
    >
      <p className={t.label}>Newsletter:</p>
      <h2 className={t.title}>Get new drops first</h2>
      <p className={t.body}>
        Join the list for new LUTs, presets and behind-the-scenes — no spam,
        unsubscribe any time.
      </p>

      {status === "done" ? (
        <p
          className={`mt-4 flex items-center gap-2 font-mono text-[13px] ${t.done}`}
        >
          <Check className="h-4 w-4" />
          You&apos;re on the list. Check your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-label="Email address"
            className={t.input}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={t.button}
          >
            {status === "loading" ? "Joining…" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {status === "error" && (
        <p className={`mt-3 font-mono text-[12px] ${t.error}`}>{message}</p>
      )}
    </section>
  );
}
