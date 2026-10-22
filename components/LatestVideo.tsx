"use client";

/*
 * The links page's "Latest video" card: the newest upload from lib/youtube.ts
 * as a 16:9 thumbnail with a play button. The YouTube player (privacy-enhanced
 * youtube-nocookie.com) only loads once it's clicked, so the page stays light.
 * With no video it falls back to a subscribe prompt.
 */

import { useState } from "react";
import { Play } from "lucide-react";
import { YouTubeGlyph } from "@/components/BrandIcons";
import {
  YOUTUBE_SUBSCRIBE_URL,
  YOUTUBE_URL,
  type LatestVideo as Video,
} from "@/lib/youtube";

// "2026-10-01T…" -> "3 weeks ago".
function ago(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  if (!Number.isFinite(seconds)) return undefined;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size)
      return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export function LatestVideo({ video }: { video: Video | null }) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault is missing on some older or low-res uploads; hqdefault
  // always exists.
  const [thumb, setThumb] = useState<"maxresdefault" | "hqdefault">(
    "maxresdefault"
  );

  if (!video) {
    return (
      <a
        href={YOUTUBE_SUBSCRIBE_URL}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-ink/10 bg-tile p-4 transition-colors hover:bg-tile-hover"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#FF0000] text-white">
          <YouTubeGlyph size={22} />
        </span>
        <span>
          <span className="block text-[14.5px] font-medium text-ink">
            Subscribe on YouTube
          </span>
          <span className="block text-[13px] text-ink-muted">
            Tech, coding, reviews and vlogs — @gafaraleshe
          </span>
        </span>
      </a>
    );
  }

  const when = video.published ? ago(video.published) : video.publishedText;
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-tile">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title || "Latest YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play “${video.title}”`}
            className="group/play absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/${thumb}.jpg`}
              alt=""
              onError={() => setThumb("hqdefault")}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover/play:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#FF0000] [animation-duration:2s]" />
                <span className="relative size-1.5 rounded-full bg-[#FF0000]" />
              </span>
              Latest upload
            </span>
            <span className="absolute left-1/2 top-1/2 grid h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#FF0000] text-white shadow-lg transition-transform duration-300 group-hover/play:scale-110">
              <Play aria-hidden className="h-5 w-5 fill-current" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="line-clamp-2 text-[14.5px] font-medium leading-snug text-ink transition-colors hover:text-ink-soft"
          >
            {video.title || "Watch on YouTube"}
          </a>
          {/* The age is worked out again in the browser, so it can differ
              from the cached server render by an hour or so. */}
          <p
            suppressHydrationWarning
            className="mt-1 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              @gafaraleshe
            </a>
            {when && <> · {when}</>}
          </p>
        </div>
        <a
          href={YOUTUBE_SUBSCRIBE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#FF0000] px-3.5 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <YouTubeGlyph size={15} />
          Subscribe
        </a>
      </div>
    </div>
  );
}
