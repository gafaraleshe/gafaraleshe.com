"use client";

/*
 * A handful of photography sets — the first of each style — with the
 * fullscreen viewer behind them. Used on the cinema index and in the home
 * page's lightbox; the full collection is on /cinema/photography.
 */

import { useState } from "react";
import { portfolio } from "@/lib/photography";
import { SetCard } from "./Sets";
import { Viewer, buildSlides } from "./Viewer";

const featured = portfolio
  .filter(c => !c.spotlight)
  .map(c => ({ category: c, post: c.posts.find(p => !p.strip) ?? c.posts[0] }));

export function FeaturedSets({
  count = 6,
  columns = "columns-1 sm:columns-2 lg:columns-3",
  thumbs = 4,
}: {
  count?: number;
  /** Tailwind column classes for the masonry. */
  columns?: string;
  thumbs?: number;
}) {
  const [open, setOpen] = useState<{ slug: string; index: number } | null>(
    null
  );

  const openAt = (slug: string, code: string, n: number) => {
    const category = portfolio.find(c => c.slug === slug);
    if (!category) return;
    const index = buildSlides(category).findIndex(
      s => s.code === code && s.n === n
    );
    setOpen({ slug, index: Math.max(0, index) });
  };

  return (
    <>
      <div className={`${columns} gap-6 [&>*]:mb-9 [&>*]:break-inside-avoid`}>
        {featured.slice(0, count).map(({ category, post }, i) => (
          <div key={post.code}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {category.title}
            </p>
            <SetCard
              post={post}
              index={i}
              offset={i % 2 === 1}
              thumbs={thumbs}
              onOpen={(code, n) => openAt(category.slug, code, n)}
            />
          </div>
        ))}
      </div>
      {open && <Viewer start={open} onClose={() => setOpen(null)} />}
    </>
  );
}
