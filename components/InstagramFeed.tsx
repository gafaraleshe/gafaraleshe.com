"use client";

/*
 * Instagram section for Gafar Aleshe (@gafaraleshe). Renders the section's
 * contents only; page.tsx supplies the heading, as with GitHubActivity.
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
    <div className="grid grid-cols-3 gap-2">
      {posts.slice(0, 6).map(p => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square overflow-hidden rounded-lg border border-ink/10 bg-tile"
          title={p.caption?.slice(0, 120) || HANDLE}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.caption?.slice(0, 80) || `Post by ${HANDLE}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover scrim over the photo: stays dark in both themes. */}
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
      className="group block"
      aria-label={`Open ${HANDLE} on Instagram`}
    >
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((t, i) => (
          <div
            key={i}
            className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-gradient-to-br ${t} transition-transform duration-500 group-hover:scale-[0.98]`}
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
    <div>
      {hasPosts ? <PostGrid posts={posts!} /> : <FallbackGrid />}
      <p className="mt-3 font-mono text-[11.5px] tracking-[0.02em] text-ink-muted">
        Builds, behind-the-scenes and shoots go up on Instagram first.
      </p>
    </div>
  );
}

export const INSTAGRAM_PROFILE = { url: INSTAGRAM_URL, handle: HANDLE };
