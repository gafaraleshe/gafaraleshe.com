"use client";

/*
 * Theme tab — the light/dark switch, built as an index-card divider tab
 * sticking out of the right edge of the screen. Light is the original green
 * graph paper, dark the deeper palette in globals.css. Rendered once from
 * Providers, so it's on every page except /cinema, which is always black.
 *
 * The server can't know the visitor's theme, but next-themes puts the "dark"
 * class on <html> before paint, so everything visible is styled with dark:
 * variants and is right from the first frame. Theme-dependent attributes
 * (aria-pressed, theme-color) wait for mount to avoid a hydration mismatch.
 * After mount the pill hands over to framer-motion so it can slide: the
 * provider's disableTransitionOnChange would cut a CSS transition dead.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { springy } from "@/components/motion";

const OPTIONS = [
  {
    value: "light",
    label: "Light theme",
    Icon: Sun,
    // Active in light (sits on the ink pill), idle in dark.
    tone: "text-paper dark:text-ink-muted dark:hover:text-ink",
  },
  {
    value: "dark",
    label: "Dark theme",
    Icon: Moon,
    // Idle in light, active in dark.
    tone: "text-ink-muted hover:text-ink dark:text-paper dark:hover:text-paper",
  },
] as const;

// The canvas colour (--canvas in globals.css), for the browser toolbar tint.
const CANVAS = { light: "#095e4e", dark: "#052b23" } as const;

// Same dotted card stock as the index cards.
const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// One option: 24px on phones, where the tab has to fit inside the page
// gutter plus the cards' padding, 28px from sm up.
const CELL = "h-6 w-6 sm:h-7 sm:w-7";

// The pill's carrier is a whole cell, so shifting it 100% moves it exactly
// one option down. The ink inside is inset 2px, which keeps it clear of the
// focus rings drawn on the cell edges.
const CARRIER = `pointer-events-none absolute left-0 top-0 ${CELL}`;
const INK = "absolute inset-0.5 rounded-[4px] bg-ink shadow-sm";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (pathname?.startsWith("/cinema")) return null;

  // Unknown on the server and during hydration; known once mounted.
  const dark = mounted && resolvedTheme === "dark";

  return (
    <>
      {/* React hoists this into <head>. It holds the light colour until mount,
          so hydration reuses the server's tag, then follows the theme. */}
      <meta name="theme-color" content={dark ? CANVAS.dark : CANVAS.light} />

      <motion.div
        role="group"
        aria-label="Colour theme"
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: springy(0.6, 0.15, 0.7) }}
        className="fixed right-0 top-24 z-40 flex flex-col items-center rounded-l-md border border-r-0 border-ink/10 bg-paper px-[3px] pb-[3px] pt-2 shadow-[-8px_14px_32px_-14px_rgba(0,0,0,0.5)] print:hidden sm:top-28 sm:px-1 sm:pb-1"
        style={DOTTED}
      >
        <span
          aria-hidden
          className="select-none font-mono text-[9px] uppercase leading-none tracking-[0.25em] text-ink-muted [writing-mode:vertical-rl]"
        >
          Theme
        </span>
        <span
          aria-hidden
          className="mb-1.5 mt-1 w-full border-t border-dashed border-ink/20"
        />

        <div className="relative flex flex-col">
          {mounted ? (
            <motion.span
              aria-hidden
              initial={false}
              animate={{ y: dark ? "100%" : "0%" }}
              transition={springy(0, 0.3, 0.45)}
              className={CARRIER}
            >
              <span className={INK} />
            </motion.span>
          ) : (
            // Before mount the dark: variant places it, right from first paint.
            <span aria-hidden className={`${CARRIER} dark:translate-y-full`}>
              <span className={INK} />
            </span>
          )}

          {OPTIONS.map(({ value, label, Icon, tone }) => (
            <motion.button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              aria-label={label}
              aria-pressed={mounted ? resolvedTheme === value : undefined}
              title={label}
              whileTap={{ scale: 0.88 }}
              transition={springy(0, 0.55, 0.4)}
              className={`relative flex items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink ${CELL} ${tone}`}
            >
              <Icon className="h-3.5 w-3.5" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
