"use client";

/*
 * The nav that sits on the grid above the home and links sheets: the GA
 * monogram, Cinema and Shop, and one outlined pill pointing at the other
 * page (Links from home, Portfolio from links).
 */

import { motion } from "framer-motion";
import { fadeIn } from "@/components/motion";

const ITEM =
  "rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white";

export function SiteNav({
  cta,
  className = "",
}: {
  cta: { href: string; label: string };
  className?: string;
}) {
  return (
    <motion.nav
      {...fadeIn(0.15)}
      aria-label="Site"
      className={`mx-auto mb-5 flex items-center justify-between px-1 sm:mb-8 ${className}`}
    >
      <a
        href="/"
        className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
      >
        GA
      </a>
      <div className="flex items-center gap-1">
        <a href="/cinema" className={ITEM}>
          Cinema
        </a>
        <a href="/shop" className={ITEM}>
          Shop
        </a>
        <a
          href={cta.href}
          className="rounded-full border border-white/25 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
        >
          {cta.label} ↗
        </a>
      </div>
    </motion.nav>
  );
}
