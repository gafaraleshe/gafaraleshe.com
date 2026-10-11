"use client";

/*
 * Newsletter popup for the shop pages. It waits for a sign of interest
 * rather than jumping in on load: a few seconds on the page, scrolling
 * past the first products, or (on desktop) the pointer heading for the tab
 * bar. Closing it snoozes it for a month and subscribing retires it for
 * good (lib/newsletter.ts). Escape, the close button or a click outside
 * closes it; focus moves into it and comes back afterwards.
 *
 * `paper` is the filing-card look of /shop, `cinema` the black film stock
 * of /cinema/shop. Both pair a photo with the form.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { shouldPrompt, snooze, subscribe } from "@/lib/newsletter";

const DELAY_MS = 6000;
const SCROLL_SHARE = 0.45;
const PHOTO = "/photography/Db3FcFIiMpQ/05-sm.webp";

const TONES = {
  paper: {
    card: "bg-paper text-ink border border-ink/10 rounded-lg",
    label: "font-mono text-[10.5px] uppercase tracking-[0.25em] text-ink-muted",
    title:
      "font-display text-[28px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-[32px]",
    body: "font-mono text-[12.5px] leading-relaxed text-ink-dim",
    input:
      "w-full rounded-md border border-ink/15 bg-tile px-3 py-2.5 font-mono text-sm text-ink outline-none placeholder:text-ink/45 focus:border-ink/40",
    button:
      "flex w-full items-center justify-center gap-2 rounded-md bg-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60",
    close: "border-ink/15 bg-tile text-ink hover:bg-ink hover:text-paper",
    small: "font-mono text-[10.5px] text-ink-faint",
    done: "text-emerald-700 dark:text-emerald-400",
    error: "text-red-600 dark:text-red-400",
  },
  cinema: {
    card: "bg-black text-white border border-white/15",
    label: "font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/50",
    title:
      "font-cine text-[40px] uppercase leading-[0.9] tracking-wide text-white sm:text-[48px]",
    body: "text-[14px] leading-relaxed text-white/65",
    input:
      "w-full border border-white/20 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none placeholder:text-white/35 focus:border-white/60",
    button:
      "flex w-full items-center justify-center gap-2 bg-white px-5 py-2.5 font-cine text-[19px] uppercase tracking-wide text-black transition-opacity hover:opacity-85 disabled:opacity-60",
    close:
      "border-white/25 bg-black text-white hover:bg-white hover:text-black",
    small: "font-mono text-[10.5px] text-white/40",
    done: "text-emerald-400",
    error: "text-red-400",
  },
} as const;

export function NewsletterPopup({
  tone = "paper",
}: {
  tone?: keyof typeof TONES;
}) {
  const t = TONES[tone];
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const shown = useRef(false);

  // Arm the triggers once, unless this visitor has subscribed or snoozed.
  useEffect(() => {
    if (!shouldPrompt()) return;
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
      cleanup();
    };
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_SHARE) show();
    };
    // Pointer leaving through the top edge: heading for the tabs.
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    }
    return cleanup;
  }, []);

  // While open: Escape closes, focus moves in and comes back on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
    // close is stable enough here: it only sets state and storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    if (status !== "done") snooze();
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const result = await subscribe(email);
    if (result.ok) {
      setStatus("done");
      window.setTimeout(() => setOpen(false), 2800);
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="newsletter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={e => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative grid w-full max-w-[720px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:grid-cols-[0.9fr_1.1fr] ${t.card}`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={`absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border transition-colors ${t.close}`}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Photo, with a strip of film along the edge. */}
            <div className="relative hidden min-h-[360px] bg-black sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-2 w-2.5 opacity-70"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, transparent 0 8px, rgb(0 0 0 / 0.85) 8px 16px, transparent 16px 22px)",
                }}
              />
              <span className="absolute bottom-4 left-4 bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                SHOTBYGAFAR
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className={t.label}>Newsletter</p>
              <h2 id="newsletter-title" className={`mt-2 pr-8 ${t.title}`}>
                New drops first
              </h2>
              <p className={`mt-3 ${t.body}`}>
                New LUTs and presets the day they land, plus the odd
                behind-the-scenes from shoots. No spam — unsubscribe any time.
              </p>

              {status === "done" ? (
                <p
                  className={`mt-6 flex items-center gap-2 font-mono text-[13px] ${t.done}`}
                >
                  <Check className="h-4 w-4" />
                  You&apos;re on the list. Check your inbox.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-2">
                  <input
                    ref={inputRef}
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
                <p className={`mt-3 font-mono text-[12px] ${t.error}`}>
                  {message}
                </p>
              )}
              <button
                type="button"
                onClick={close}
                className={`mt-4 self-start underline-offset-2 hover:underline ${t.small}`}
              >
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
