"use client";

/*
 * Photography — the SHOTBYGAFAR sets on the cinema side, made to be sent
 * as a link. A big title, sticky chips for the styles, then each style's
 * sets (cover, label, contact strip) in uneven columns; Birthdays pinned up
 * as prints and the nightlife frames as a film strip. Any frame opens the
 * fullscreen viewer, which walks through every style. Same sets as
 * shotbygafar.com/portfolio (lib/photography.ts).
 */

import { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import { framesOf, portfolio, type PortfolioCategory } from "@/lib/photography";
import { Viewer, buildSlides } from "@/components/photography/Viewer";
import {
  FilmStrip,
  SetCard,
  Spotlight,
  type OpenAt,
} from "@/components/photography/Sets";

const BOOKING_URL = "https://shotbygafar.com/booking";
const PORTFOLIO_URL = "https://shotbygafar.com/portfolio";

type Open = { slug: string; index: number } | null;

const totalFrames = portfolio.reduce(
  (n, c) => n + c.posts.reduce((m, p) => m + framesOf(p).length, 0),
  0
);
const pad = (n: number) => String(n).padStart(2, "0");

// Highlights the style whose section is crossing the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState(portfolio[0].slug);
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    portfolio.forEach(c => {
      const el = document.getElementById(c.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function PhotographyView() {
  const [open, setOpen] = useState<Open>(null);
  const active = useActiveSection();

  const openAt = (category: PortfolioCategory, code: string, n: number) => {
    const index = buildSlides(category).findIndex(
      s => s.code === code && s.n === n
    );
    setOpen({ slug: category.slug, index: Math.max(0, index) });
  };

  return (
    <main className="px-[5%] md:px-[4%]">
      {/* ── Title ── */}
      <section className="pb-10 pt-4 md:pb-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          SHOTBYGAFAR — Photography
        </p>
        <h1 className="mt-4 font-cine text-[clamp(64px,12.5vw,200px)] uppercase leading-[0.85] tracking-wide text-white">
          Stills,
          <br />
          <span className="text-white/30">shot live.</span>
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Concert stages, football pitches, birthdays, nights out and brand
            shoots — {totalFrames} frames across {portfolio.length} styles. Tap
            any frame to see the whole set full screen.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOpen({ slug: portfolio[0].slug, index: 0 })}
              className="flex items-center gap-2 bg-white px-5 py-2.5 font-cine text-[18px] uppercase tracking-wide text-black transition-opacity hover:opacity-85"
            >
              <Maximize2 className="h-4 w-4" />
              View full screen
            </button>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-white/30 px-5 py-2.5 font-cine text-[18px] uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Book a shoot ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Style chips ── */}
      <nav
        aria-label="Styles"
        className="sticky top-0 z-20 -mx-[5.3%] flex gap-1.5 overflow-x-auto border-y border-white/10 bg-black/85 px-[5%] py-3 backdrop-blur [scrollbar-width:none] md:-mx-[4.2%] md:px-[4%] [&::-webkit-scrollbar]:hidden"
      >
        {portfolio.map(c => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] transition-colors ${
              active === c.slug
                ? "border-white bg-white text-black"
                : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
            }`}
          >
            {c.title}
          </a>
        ))}
      </nav>

      {portfolio.map((c, i) => (
        <Style
          key={c.slug}
          category={c}
          number={i + 1}
          onOpen={(code, n) => openAt(c, code, n)}
        />
      ))}

      <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">
        More at{" "}
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
        >
          shotbygafar.com
        </a>
      </p>

      {open && <Viewer start={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

function Style({
  category,
  number,
  onOpen,
}: {
  category: PortfolioCategory;
  number: number;
  onOpen: OpenAt;
}) {
  const strips = category.posts.filter(p => p.strip);
  const sets = category.posts.filter(p => !p.strip);
  const first = category.posts[0];

  return (
    <section
      id={category.slug}
      className="scroll-mt-16 border-b border-white/10 py-14"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/40">
            {pad(number)}
          </p>
          <h2 className="mt-1 font-cine text-[44px] uppercase leading-none tracking-wide text-white sm:text-[56px]">
            {category.title}
          </h2>
          <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-white/55">
            {category.blurb}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpen(first.code, framesOf(first)[0]?.n ?? 1)}
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
        >
          Full screen <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {category.spotlight ? (
        <Spotlight posts={sets} onOpen={onOpen} />
      ) : (
        sets.length > 0 && (
          <div
            className={`gap-6 [&>*]:mb-10 [&>*]:break-inside-avoid ${
              sets.length === 1
                ? "max-w-[560px]"
                : "columns-1 sm:columns-2 xl:columns-3"
            }`}
          >
            {sets.map((p, i) => (
              <SetCard
                key={p.code}
                post={p}
                index={i}
                offset={sets.length > 1 && i % 2 === 1}
                onOpen={onOpen}
              />
            ))}
          </div>
        )
      )}

      {strips.map(p => (
        <FilmStrip key={p.code} post={p} onOpen={onOpen} />
      ))}
    </section>
  );
}
