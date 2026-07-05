"use client";

/*
 * Instagram section for Gafar Aleshe (@gafaraleshe).
 *
 * Two layers:
 *   1. Official Instagram embeds — paste post / reel permalinks into POSTS
 *      below and they render live via Instagram's embed.js.
 *   2. A branded fallback gallery grid + follow CTA that always shows, so the
 *      section never looks empty while POSTS is being filled in.
 *
 * To add real posts: open a post on instagram.com/gafaraleshe, copy its URL
 * (e.g. https://www.instagram.com/p/XXXXXXXXXXX/) and add it to POSTS.
 */

import { useEffect } from "react";
import { InstagramIcon } from "@/components/LinkIcons";

const INSTAGRAM_URL = "https://instagram.com/gafaraleshe";
const HANDLE = "@gafaraleshe";

// Paste real post / reel permalinks here to render them as live embeds.
const POSTS: string[] = [];

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// Branded placeholder tiles for the fallback grid — cinematic gradients that
// match the graph-paper aesthetic and link straight to the profile.
const TILES = [
  "from-neutral-700 to-neutral-900",
  "from-emerald-700 to-neutral-900",
  "from-amber-600 to-neutral-900",
  "from-stone-600 to-neutral-900",
  "from-neutral-800 to-black",
  "from-rose-700 to-neutral-900",
];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramEmbeds() {
  useEffect(() => {
    if (POSTS.length === 0) return;
    const SRC = "https://www.instagram.com/embed.js";
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

  if (POSTS.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {POSTS.map(url => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: 0, width: "100%" }}
        />
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
      <div className="flex items-center justify-between gap-2 bg-white px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900">
          <InstagramIcon />
          {HANDLE}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors group-hover:text-neutral-900">
          View feed →
        </span>
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
  const hasPosts = POSTS.length > 0;
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

      {hasPosts ? <InstagramEmbeds /> : <FallbackGrid />}
    </section>
  );
}
