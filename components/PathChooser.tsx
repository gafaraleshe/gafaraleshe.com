"use client";

/*
 * "This or that?" — the first thing a visitor sees on the home page. One
 * index card, two doors: Code closes the card onto the software portfolio
 * underneath, Cinema heads to /cinema. The pick is remembered for the
 * browser session so the card doesn't reappear on every visit to "/".
 *
 * The overlay server-renders at opacity 0 and fades in after hydration, so
 * returning visitors (already picked) never see it flash.
 */

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { EASE, hoverLift, rise, springy } from "@/components/motion";

const PATH_KEY = "gafar:path";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

function remember(path: "code" | "cinema") {
  try {
    sessionStorage.setItem(PATH_KEY, path);
  } catch {}
}

export function PathChooser({ onCode }: { onCode: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(PATH_KEY)) setOpen(false);
    } catch {}
  }, []);

  const chooseCode = () => {
    remember("code");
    setOpen(false);
    onCode();
  };

  const chooseCinema = () => {
    remember("cinema");
    router.push("/cinema");
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") chooseCode();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="chooser"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chooser-title"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: "tween",
              delay: 0.1,
              duration: 0.35,
              ease: EASE,
            },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-scrim px-4 py-8 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0, transition: springy(0.15, 0.35, 0.8) }}
            exit={{
              opacity: 0,
              y: 40,
              transition: { duration: 0.25, ease: EASE },
            }}
            // Focus the card, not an option, so neither door looks pre-picked.
            tabIndex={-1}
            autoFocus
            className="relative w-full max-w-2xl rounded-md border border-ink/10 bg-paper px-6 py-8 outline-none shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
            style={DOTTED}
          >
            {/* Tape is dimmed on the near-black dark-theme paper. */}
            <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-stone-300/50 shadow-sm dark:bg-stone-300/30" />

            <motion.div {...rise(0.3)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                Before you scroll:
              </p>
              <h2
                id="chooser-title"
                className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl"
              >
                This or that?
              </h2>
              <p className="mt-3 max-w-md font-mono text-[13px] leading-relaxed text-ink-dim">
                I write code and I make films. Pick a side — you can switch any
                time.
              </p>
            </motion.div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <motion.button
                {...rise(0.45)}
                {...hoverLift}
                type="button"
                onClick={chooseCode}
                className="group flex flex-col rounded-md border border-ink/15 bg-tile p-5 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink">
                  <Terminal className="h-4 w-4" />
                </span>
                <span className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                  Code
                </span>
                <span className="mt-1 font-mono text-[12px] leading-relaxed text-ink-dim">
                  Software engineering — full-stack apps, APIs, and things
                  I&apos;ve built.
                </span>
                <span className="mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-ink">
                  Enter <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>

              {/* The Cinema door is always black, like the cinema pages; in
                  the dark theme a hairline ring keeps it off the paper. */}
              <motion.button
                {...rise(0.55)}
                {...hoverLift}
                type="button"
                onClick={chooseCinema}
                className="group relative flex flex-col overflow-hidden rounded-md bg-black p-5 text-left text-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink dark:ring-1 dark:ring-white/10"
              >
                {/* Letterbox bars slide in on hover, like a frame going 2.39:1. */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-0 bg-neutral-800 transition-all duration-300 group-hover:h-3" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-neutral-800 transition-all duration-300 group-hover:h-3" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 font-cine text-lg leading-none">
                  ▶
                </span>
                <span className="mt-6 font-cine text-[34px] uppercase leading-none tracking-wide">
                  Cinema
                </span>
                <span className="mt-1 font-mono text-[12px] leading-relaxed text-white/65">
                  Film, cinematography &amp; colour — the SHOTBYGAFAR side.
                </span>
                <span className="mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white">
                  Roll film <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>
            </div>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Esc to skip
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
