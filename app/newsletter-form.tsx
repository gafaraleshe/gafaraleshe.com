"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
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
      className="relative mt-4 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-8"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        Newsletter:
      </p>
      <h2 className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-2xl">
        Get new drops first
      </h2>
      <p className="mt-2 max-w-md font-mono text-[12px] leading-relaxed text-neutral-600">
        Join the list for new LUTs, presets and behind-the-scenes — no spam,
        unsubscribe any time.
      </p>

      {status === "done" ? (
        <p className="mt-4 flex items-center gap-2 font-mono text-[13px] text-emerald-700">
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
            className="flex-1 rounded-md border border-neutral-900/15 bg-white px-3 py-2.5 font-mono text-sm text-neutral-900 outline-none focus:border-neutral-900/40"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Joining…" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 font-mono text-[12px] text-red-600">{message}</p>
      )}
    </section>
  );
}
