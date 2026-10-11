"use client";

/*
 * Fullscreen photography viewer, shared with shotbygafar.com's portfolio. Opens on a frame and holds every frame of
 * every set in that category, with chips to jump between categories, so a
 * visitor can walk through all the styles without leaving the page.
 *
 *   Desktop  a side-by-side carousel: frames sit in a row at full height,
 *            snapping to the centre, with arrow buttons and ←/→ keys.
 *   Mobile   reels-style: one frame per screen, swipe up for the next.
 *
 * Each frame carries its set's label (who, where) and its place in the set.
 * Each category ends on a card to the next one.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  framesOf,
  portfolio,
  postUrl,
  type PortfolioCategory,
} from "@/lib/photography";

export type Slide = {
  key: string;
  code: string;
  src: string;
  w: number;
  h: number;
  video: boolean;
  n: number;
  total: number;
  title: string;
  context?: string;
  credit?: string;
};

/** Every frame a category opens as, shared with the page so a click on any
    frame can open the viewer right on it. */
export function buildSlides(category: PortfolioCategory): Slide[] {
  return category.posts.flatMap(post => {
    const frames = framesOf(post);
    return frames.map(f => ({
      key: `${post.code}-${f.n}`,
      code: post.code,
      src: f.src,
      w: f.w,
      h: f.h,
      video: Boolean(f.video),
      n: f.n,
      total: f.total,
      title: post.title,
      context: post.context,
      credit: post.credit,
    }));
  });
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Mounted only while open; `start` is the category and slide it opens on. */
export function Viewer({
  start,
  onClose,
}: {
  start: { slug: string; index: number };
  onClose: () => void;
}) {
  const [slug, setSlug] = useState(start.slug);
  const [current, setCurrent] = useState(start.index);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startAt = useRef(start.index);

  const catIndex = Math.max(
    0,
    portfolio.findIndex(c => c.slug === slug)
  );
  const category = portfolio[catIndex];
  const nextCategory = portfolio[(catIndex + 1) % portfolio.length];
  const slides = useMemo(() => buildSlides(category), [category]);
  // The end card counts as a slide for the arrows and the observer.
  const count = slides.length + 1;

  // While open: lock the page behind, and hand focus back on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  const slideEls = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? []
    );

  const goTo = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    slideEls()[i]?.scrollIntoView({
      behavior,
      inline: "center",
      block: "start",
    });
  }, []);

  // New category (or first open): jump straight to the starting slide.
  // startAt holds until a category switch resets it, so a repeated effect
  // (React's dev double-run) lands on the same slide.
  useEffect(() => {
    const i = startAt.current;
    const raf = requestAnimationFrame(() =>
      goTo(i, "instant" as ScrollBehavior)
    );
    return () => cancelAnimationFrame(raf);
  }, [slug, goTo]);

  // The current slide is whichever sits closest to the middle of the track
  // (a row on desktop, a column on phones), checked once per frame.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const box = root.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      let best = 0;
      let bestDist = Infinity;
      slideEls().forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(
          r.left + r.width / 2 - cx,
          r.top + r.height / 2 - cy
        );
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setCurrent(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug, slides.length]);

  // Keys: arrows step through, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(Math.min(current + 1, count - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, count, goTo, onClose]);

  const switchTo = (next: string) => {
    startAt.current = 0;
    setCurrent(0);
    setSlug(next);
  };

  const active = slides[current];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} — photography viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-[#050505]/[0.97] text-white backdrop-blur-sm"
    >
      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 lg:block">
          SHOTBYGAFAR · Photography
        </p>
        <nav
          aria-label="Categories"
          className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {portfolio.map(c => (
            <button
              key={c.slug}
              type="button"
              onClick={() => switchTo(c.slug)}
              aria-pressed={c.slug === slug}
              className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] transition-colors ${
                c.slug === slug
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              }`}
            >
              {c.title}
            </button>
          ))}
        </nav>
        <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-white/50 sm:block">
          {pad(Math.min(current + 1, slides.length))} / {pad(slides.length)}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Track: a column of screens on phones, a row on desktop ── */}
      <div
        ref={trackRef}
        key={slug}
        className="flex min-h-0 flex-1 snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain md:snap-x md:flex-row md:items-center md:gap-6 md:overflow-x-auto md:overflow-y-hidden md:px-[max(1.5rem,calc(50vw-17rem))] md:[scrollbar-width:thin]"
      >
        {slides.map((s, i) => {
          const firstOfSet = i === 0 || slides[i - 1].code !== s.code;
          return (
            <figure
              key={s.key}
              data-slide={i}
              className={`flex min-h-full w-full shrink-0 snap-start flex-col items-center justify-center px-4 py-5 md:h-full md:min-h-0 md:w-auto md:snap-center md:px-0 md:py-6 ${
                firstOfSet && i > 0 ? "md:ml-10" : ""
              }`}
            >
              <div className="w-full md:h-full md:w-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={`${s.title} — frame ${s.n}`}
                  width={s.w}
                  height={s.h}
                  loading={Math.abs(i - start.index) < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-auto max-h-[calc(100svh-11rem)] w-full rounded-[3px] object-contain md:h-[calc(100%-3.5rem)] md:max-h-none md:w-auto md:max-w-[min(78vw,1100px)]"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="min-w-0">
                    <span className="font-cine text-[21px] uppercase leading-none tracking-wide text-white">
                      {s.title}
                    </span>
                    {s.context && (
                      <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                        {s.context}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] tabular-nums tracking-[0.15em] text-white/45">
                    {s.video ? "Video still · " : ""}
                    {pad(s.n)}/{pad(s.total)}
                  </span>
                </figcaption>
              </div>
            </figure>
          );
        })}

        {/* End card: on to the next category. */}
        <section
          data-slide={slides.length}
          className="flex min-h-full w-full shrink-0 snap-start items-center justify-center px-6 py-10 md:h-full md:w-[360px] md:snap-center"
        >
          <button
            type="button"
            onClick={() => switchTo(nextCategory.slug)}
            className="group text-left"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/45">
              Up next
            </span>
            <span className="mt-2 block font-cine text-[52px] uppercase leading-none tracking-wide text-white">
              {nextCategory.title}
            </span>
            <span className="mt-3 block max-w-[28ch] text-[13.5px] leading-relaxed text-white/60">
              {nextCategory.blurb}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors group-hover:bg-white group-hover:text-black">
              Keep going <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </section>
      </div>

      {/* ── Bottom bar: arrows on desktop, a swipe hint on phones ── */}
      <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 sm:px-6">
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => goTo(Math.max(current - 1, 0))}
            disabled={current === 0}
            aria-label="Previous"
            className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(current + 1, count - 1))}
            disabled={current >= count - 1}
            aria-label="Next"
            className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45 md:hidden">
          Swipe up · {category.title}
        </p>
        <p className="hidden font-cine text-[22px] uppercase tracking-wide text-white/80 md:block">
          {category.title}
        </p>
        {active ? (
          <a
            href={postUrl(active.code)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
          >
            {active.video ? "Watch on Instagram" : "Instagram"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
