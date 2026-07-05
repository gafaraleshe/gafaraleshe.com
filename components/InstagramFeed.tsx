"use client";

/*
 * Instagram section for Gafar Aleshe (@gafaraleshe).
 *
 * Pulls the latest posts automatically from `/api/instagram` (backed by the
 * Instagram Graph API — see lib/instagram.ts). When a token is configured the
 * grid shows real thumbnails linking to each post; until then, or on any
 * error, it falls back to a branded gradient grid + follow CTA so the section
 * never looks empty.
 */

import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/LinkIcons";

const INSTAGRAM_URL = "https://instagram.com/gafaraleshe";
const HANDLE = "@gafaraleshe";

type IgPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
  type: string;
};

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// Gradient tiles for the fallback grid — cinematic, on-brand, and shown until
// the live feed loads (or if no token is configured yet).
const TILES = [
  "from-neutral-700 to-neutral-900",
  "from-emerald-700 to-neutral-900",
  "from-amber-600 to-neutral-900",
  "from-stone-600 to-neutral-900",
  "from-neutral-800 to-black",
  "from-rose-700 to-neutral-900",
];

function PostGrid({ posts }: { posts: IgPost[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md border border-neutral-900/10 bg-neutral-900/10 p-1">
      {posts.slice(0, 6).map(p => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square overflow-hidden bg-neutral-200"
          title={p.caption?.slice(0, 120) || HANDLE}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.caption?.slice(0, 80) || `Post by ${HANDLE}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-neutral-900/0 text-white opacity-0 transition-all group-hover:bg-neutral-900/40 group-hover:opacity-100">
            <InstagramIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

function FallbackGrid() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-md border border-neutral-900/10"
      aria-label={`Open ${HANDLE} on Instagram`}
    >
      <div className="grid grid-cols-3 gap-1 bg-neutral-900/10 p-1">
        {TILES.map((t, i) => (
          <div
            key={i}
            className={`relative flex aspect-square items-center justify-center bg-gradient-to-br ${t} transition-transform group-hover:scale-[1.02]`}
          >
            <InstagramIconLarge />
          </div>
        ))}
      </div>
    </a>
  );
}

function InstagramIconLarge() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeOpacity="0.55"
      strokeWidth="1.5"
      className="h-7 w-7"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<IgPost[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/instagram")
      .then(r => (r.ok ? r.json() : { posts: [] }))
      .then((d: { posts?: IgPost[] }) => {
        if (active) setPosts(d.posts ?? []);
      })
      .catch(() => {
        if (active) setPosts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const hasPosts = posts !== null && posts.length > 0;

  return (
    <section
      id="instagram"
      className="relative mt-4 scroll-mt-6 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
      style={DOTTED}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Instagram:
          </p>
          <h2 className="mb-1 mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            Latest on the grid
          </h2>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-neutral-900 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <InstagramIcon />
          Follow
        </a>
      </div>

      <p className="mb-5 max-w-md font-mono text-[12px] leading-relaxed text-neutral-600">
        Builds, behind-the-scenes, and creative work go up on Instagram first.
        Follow {HANDLE} for the latest.
      </p>

      {hasPosts ? <PostGrid posts={posts!} /> : <FallbackGrid />}

      <div className="mt-1 flex items-center justify-between gap-2 rounded-b-md bg-white px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900">
          <InstagramIcon />
          {HANDLE}
        </span>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View feed →
        </a>
      </div>
    </section>
  );
}
