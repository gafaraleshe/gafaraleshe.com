"use client";

/*
 * The pieces a photography set is shown with, shared by /cinema/photography,
 * the cinema index and the home page (as on shotbygafar.com/portfolio): a set card (cover, label, contact strip of the frames behind
 * it), the spotlight prints and the film strip. Every frame calls onOpen
 * with its set and number, so the page can open the viewer right on it.
 */

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import {
  framesOf,
  type PortfolioPost,
  type PostFrame,
} from "@/lib/photography";

export type OpenAt = (code: string, n: number) => void;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const pad = (n: number) => String(n).padStart(2, "0");

// Grid images: the 640px export, or the full one on large or dense screens.
// `small` (thumbnails) only ever needs the 640px file.
export function FrameImage({
  frame,
  alt,
  small = false,
  sizes = "(min-width: 640px) 420px, 100vw",
  className = "",
}: {
  frame: PostFrame;
  alt: string;
  small?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={frame.sm}
      srcSet={small ? undefined : `${frame.sm} 640w, ${frame.src} ${frame.w}w`}
      sizes={small ? undefined : sizes}
      alt={alt}
      width={frame.w}
      height={frame.h}
      loading="lazy"
      decoding="async"
      className={`h-auto w-full object-cover transition duration-700 ease-out ${className}`}
    />
  );
}

export function SetCard({
  post,
  index = 0,
  offset,
  thumbs: thumbCount = 4,
  onOpen,
}: {
  post: PortfolioPost;
  index?: number;
  offset?: boolean;
  /** How many frames to show in the contact strip (0 hides it). */
  thumbs?: number;
  onOpen: OpenAt;
}) {
  const frames = framesOf(post);
  const [cover, ...rest] = frames;
  if (!cover) return null;
  const thumbs = rest.slice(0, thumbCount);
  const more = rest.length - thumbs.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.06, ease: EASE_OUT },
      }}
      viewport={{ once: true, margin: "-60px" }}
      className={offset ? "sm:pt-12" : ""}
    >
      <button
        type="button"
        onClick={() => onOpen(post.code, cover.n)}
        aria-label={`Open ${post.title}, ${frames.length} frames`}
        className="group relative block w-full overflow-hidden rounded-[3px] bg-white/5"
      >
        <FrameImage
          frame={cover}
          alt={post.title}
          className="group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
            {pad(frames.length)} frames
          </span>
          <Maximize2 className="h-4 w-4 text-white" />
        </span>
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-cine text-[24px] uppercase leading-none tracking-wide text-white">
            {post.title}
          </h3>
          {post.context && (
            <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/45">
              {post.context}
            </p>
          )}
        </div>
        <span className="shrink-0 font-mono text-[10px] tabular-nums tracking-[0.15em] text-white/40">
          {pad(frames.length)}
        </span>
      </div>

      {/* Contact strip: the frames behind the cover. */}
      {thumbs.length > 0 && (
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {thumbs.map(f => (
            <button
              key={f.n}
              type="button"
              onClick={() => onOpen(post.code, f.n)}
              aria-label={`${post.title}, frame ${f.n}`}
              className="group relative aspect-square overflow-hidden rounded-[2px] bg-white/5"
            >
              <FrameImage
                frame={f}
                alt=""
                small
                className="absolute inset-0 h-full opacity-70 group-hover:scale-105 group-hover:opacity-100"
              />
            </button>
          ))}
          {more > 0 && (
            <button
              type="button"
              onClick={() => onOpen(post.code, rest[thumbs.length].n)}
              aria-label={`${post.title}, ${more} more frames`}
              className="grid aspect-square place-items-center rounded-[2px] border border-white/15 font-mono text-[11px] text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              +{more}
            </button>
          )}
        </div>
      )}
    </motion.article>
  );
}

// Big prints pinned to the grid, slightly askew, with tape.
export function Spotlight({
  posts,
  onOpen,
}: {
  posts: PortfolioPost[];
  onOpen: OpenAt;
}) {
  const tilt = ["md:-rotate-2", "md:rotate-[1.5deg] md:mt-14"];
  const tape = ["bg-amber-200/50 -rotate-6", "bg-emerald-200/40 rotate-3"];
  return (
    <div>
      <p
        aria-hidden
        className="pointer-events-none mb-5 -rotate-3 font-hand text-[26px] leading-none text-white/70 md:mb-8 md:ml-4"
      >
        the spotlight ✶
      </p>
      <div className="grid gap-12 md:grid-cols-2 md:gap-14 md:px-4">
        {posts.map((p, i) => {
          const frames = framesOf(p);
          const cover = frames[0];
          if (!cover) return null;
          return (
            <motion.figure
              key={p.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: i * 0.12, ease: EASE_OUT },
              }}
              viewport={{ once: true, margin: "-60px" }}
              className={`relative bg-[#f4f3ec] p-3 pb-[4.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 md:hover:rotate-0 md:hover:scale-[1.01] ${tilt[i % 2]}`}
            >
              <span
                aria-hidden
                className={`absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 shadow-sm ${tape[i % 2]}`}
              />
              <button
                type="button"
                onClick={() => onOpen(p.code, cover.n)}
                aria-label={`Open ${p.title}, ${frames.length} frames`}
                className="group block w-full overflow-hidden"
              >
                <FrameImage
                  frame={cover}
                  alt={p.title}
                  className="group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                <span className="min-w-0">
                  <span className="block font-hand text-[26px] leading-none text-neutral-800">
                    {p.title}
                  </span>
                  {p.context && (
                    <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.18em] text-neutral-500">
                      {p.context}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => onOpen(p.code, cover.n)}
                  className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:text-black"
                >
                  {pad(frames.length)} frames <Maximize2 className="h-3 w-3" />
                </button>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </div>
  );
}

// Chosen frames from one post, run as a strip of film.
export function FilmStrip({
  post,
  onOpen,
}: {
  post: PortfolioPost;
  onOpen: OpenAt;
}) {
  const frames = framesOf(post);
  if (!frames.length) return null;
  const sprockets = {
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0 8px, rgb(255 255 255 / 0.18) 8px 18px, transparent 18px 26px)",
  };
  return (
    <div className="mt-2">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-cine text-[24px] uppercase leading-none tracking-wide text-white">
            {post.title}
          </h3>
          {post.context && (
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              {post.context}
            </p>
          )}
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          Frames {pad(frames[0].n)}–{pad(frames[frames.length - 1].n)}
        </span>
      </div>
      <div className="rounded-md bg-[#0c0c0c] px-2 py-5 ring-1 ring-white/10">
        <div aria-hidden className="mb-3 h-2.5" style={sprockets} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {frames.map((f, i) => (
            <motion.button
              key={f.n}
              type="button"
              onClick={() => onOpen(post.code, f.n)}
              aria-label={`${post.title}, frame ${f.n}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.08, ease: EASE_OUT },
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-sm"
            >
              <FrameImage
                frame={f}
                alt={`${post.title}, frame ${f.n}`}
                sizes="(min-width: 640px) 25vw, 50vw"
                className="aspect-[4/5] group-hover:scale-[1.04]"
              />
              <span className="absolute left-2 top-2 font-mono text-[10px] tracking-[0.15em] text-white/85 mix-blend-difference">
                {pad(f.n)}
              </span>
            </motion.button>
          ))}
        </div>
        <div aria-hidden className="mt-3 h-2.5" style={sprockets} />
      </div>
    </div>
  );
}
