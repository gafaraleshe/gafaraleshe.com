"use client";

/*
 * Selected work — a two-column grid of live-site screenshots, modelled on
 * the "Selected work" section of pysavant.cv and restyled for the filing
 * cards. Each project is a 16:10 homepage capture matted in a tile frame:
 * on hover (or keyboard focus) the shot blooms from black-and-white into
 * colour and settles to 96%, showing the frame as a mat. Grayscale only
 * applies on hover-capable devices, so touch visitors always see colour.
 * Under the shot: display title, one-line description, then the live domain
 * and a separate link to the project's GitHub repo.
 *
 * Screenshots live in public/assets/work/ (1280x800 webp, captured from each
 * live homepage at 1440x900).
 */

import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { riseInView } from "@/components/motion";

export type WorkItem = {
  title: string;
  description: string;
  href: string;
  repo?: string;
  image: string;
};

const GITHUB_REPOS_URL = "https://github.com/gafaraleshe?tab=repositories";

// Keyboard focus ring shared by every link in the grid.
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

// "https://www.gafaraleshe.com/" -> "gafaraleshe.com"
function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <motion.li
      {...riseInView(Math.min(index, 3) * 0.08)}
      className="relative flex flex-col"
    >
      {/* One live link covers the shot, title, blurb and domain (the whole
          card, as on pysavant.cv). It is named by the title alone; the repo
          link sits beside it rather than inside it. */}
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`group/work flex flex-1 flex-col rounded-md ${FOCUS_RING}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-ink/10 bg-tile shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={`${item.title} homepage`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full rounded-[3px] object-cover object-top transition duration-500 ease-out group-hover/work:scale-[0.96] group-hover/work:grayscale-0 group-focus-visible/work:scale-[0.96] group-focus-visible/work:grayscale-0 [@media(hover:hover)]:grayscale"
          />
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <div className="flex items-center gap-1.5">
            <h3
              id={titleId}
              className="font-display text-base font-bold uppercase leading-tight tracking-tight text-ink"
            >
              {item.title}
            </h3>
            {/* Slides in on hover; always shown where there is no hover. */}
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 text-ink-faint transition duration-300 group-hover/work:translate-x-0 group-hover/work:opacity-100 group-focus-visible/work:translate-x-0 group-focus-visible/work:opacity-100 [@media(hover:hover)]:-translate-x-1 [@media(hover:hover)]:opacity-0"
            />
          </div>
          <p
            id={descId}
            className="mt-1 line-clamp-2 font-mono text-[11.5px] leading-relaxed text-ink-muted"
          >
            {item.description}
          </p>
          {/* Right padding keeps the domain clear of the repo link. */}
          <p
            className={`mt-auto flex items-center gap-1.5 pt-2 font-mono text-[10.5px] leading-4 text-ink-faint transition-colors group-hover/work:text-ink-muted ${
              item.repo ? "pr-16" : ""
            }`}
          >
            <Globe aria-hidden className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{domainOf(item.href)}</span>
          </p>
        </div>
      </a>

      {/* Pinned to the domain row; the padding (offset by the negative
          inset) grows the tap target to 24px without moving the text. */}
      {item.repo && (
        <a
          href={item.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${item.title} on GitHub`}
          className={`absolute -bottom-1 -right-1 z-10 flex items-center gap-1.5 rounded-sm p-1 font-mono text-[10.5px] leading-4 text-ink-muted transition-colors hover:text-ink ${FOCUS_RING}`}
        >
          <Github aria-hidden className="h-3.5 w-3.5 shrink-0" />
          <span className="underline decoration-ink/20 underline-offset-2">
            Repo
          </span>
        </a>
      )}
    </motion.li>
  );
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 sm:gap-x-4"
      >
        {items.map((item, i) => (
          <WorkCard key={item.href} item={item} index={i} />
        ))}
      </ul>

      <div className="mt-7 flex justify-end border-t border-dashed border-ink/15 pt-4">
        <a
          href={GITHUB_REPOS_URL}
          target="_blank"
          rel="noreferrer"
          className={`rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink ${FOCUS_RING}`}
        >
          More on GitHub <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}
