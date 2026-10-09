"use client";

/*
 * GitHub activity graph, after the Activity section on pysavant.cv: the last
 * year of contributions to github.com/gafaraleshe as a heatmap, one column per
 * week with Sunday on top, shaded with the heat-0…heat-4 tokens so it follows
 * the light/dark theme. Data comes from /api/github (see lib/github.ts).
 *
 * Renders the card's contents only; page.tsx supplies the SectionCard. The
 * grid stretches to the card's width and scrolls sideways on phones, opening
 * on the latest weeks. When it scrolls into view the colours wash in column
 * by column: a CSS transition per square rather than ~370 motion components,
 * and none at all under prefers-reduced-motion.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import type { ContributionDay, GitHubActivity as Activity } from "@/lib/github";

const PROFILE_URL = "https://github.com/gafaraleshe";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Spelled out in full so Tailwind generates every level.
const HEAT = [
  "bg-heat-0",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4",
] as const;

// Shape of the loading placeholder: a year of empty weeks.
const PLACEHOLDER_WEEKS = 53;

// The colour wash: each week column starts this long after the one before.
const WASH_STEP_MS = 12;

const GAP = "gap-[2px] sm:gap-[3px]";
const SQUARE =
  "aspect-square rounded-[2px] transition-[background-color] duration-500 ease-out motion-reduce:transition-none";

type State =
  | { status: "loading" }
  | { status: "ready"; activity: Activity }
  | { status: "failed" };

function plural(n: number, word: string) {
  return `${n.toLocaleString("en-GB")} ${word}${n === 1 ? "" : "s"}`;
}

// "3 contributions on 5 Oct 2026". The date's parts are read as written:
// new Date("2026-10-05") is UTC midnight, which shows as the 4th anywhere
// west of Greenwich.
function describe({ date, count, level }: ContributionDay) {
  const [y, m, d] = date.split("-").map(Number);
  const on = `on ${d} ${MONTHS[m - 1]} ${y}`;
  if (count > 0) return `${plural(count, "contribution")} ${on}`;
  // Shaded but uncounted only happens if GitHub's tooltips change shape.
  return level > 0 ? `Contributions ${on}` : `No contributions ${on}`;
}

type MonthLabel = { col: number; span: number; name: string };

// As on GitHub, a column is labelled when its first day starts a new month.
// Each label spans the columns up to the next one; a month with fewer than
// two (a partial first or last month) has no room for its name, so it's
// skipped rather than colliding with its neighbour.
function monthLabels(weeks: Activity["weeks"]): MonthLabel[] {
  const starts: { col: number; month: number }[] = [];
  weeks.forEach((week, col) => {
    const first = week.find(day => day);
    if (!first) return;
    const month = Number(first.date.slice(5, 7)) - 1;
    if (starts[starts.length - 1]?.month !== month) {
      starts.push({ col, month });
    }
  });
  return starts
    .map(({ col, month }, i) => ({
      col,
      span: (starts[i + 1]?.col ?? weeks.length) - col,
      name: MONTHS[month],
    }))
    .filter(label => label.span >= 2);
}

export function GitHubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });
  const scrollRef = useRef<HTMLDivElement>(null);
  // Colours are held back until the graph is half on screen, so the wash
  // plays where it's seen rather than on load, below the fold.
  const inView = useInView(scrollRef, { once: true, amount: 0.5 });

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then(r => (r.ok ? r.json() : { activity: null }))
      .then((d: { activity?: Activity | null }) => {
        if (!active) return;
        const activity = d.activity;
        setState(
          activity && Array.isArray(activity.weeks) && activity.weeks.length
            ? { status: "ready", activity }
            : { status: "failed" }
        );
      })
      .catch(() => {
        if (active) setState({ status: "failed" });
      });
    return () => {
      active = false;
    };
  }, []);

  // A phone can't fit the whole year, so open on the latest weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [state.status]);

  if (state.status === "failed") {
    return (
      <p className="font-mono text-[12px] leading-relaxed text-ink-dim">
        Couldn't load the graph right now.{" "}
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink"
        >
          See it on GitHub <span aria-hidden>↗</span>
        </a>
      </p>
    );
  }

  const activity = state.status === "ready" ? state.activity : null;
  const shaded = activity !== null && inView;
  const weekCount = activity ? activity.weeks.length : PLACEHOLDER_WEEKS;
  const columns: CSSProperties = {
    gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))`,
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-1.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5"
      >
        <div className="min-w-[560px]">
          {/* Month names, on the same column tracks as the squares. */}
          <div aria-hidden className={`mb-1.5 grid h-3 ${GAP}`} style={columns}>
            {activity &&
              monthLabels(activity.weeks).map(label => (
                <span
                  key={label.col}
                  className="overflow-hidden whitespace-nowrap font-mono text-[10px] leading-3 text-ink-faint"
                  style={{
                    gridColumn: `${label.col + 1} / span ${label.span}`,
                  }}
                >
                  {label.name}
                </span>
              ))}
          </div>

          {/* Squares fill column by column, Sunday to Saturday. The loading
              placeholder shares their keys, so the same elements take on
              the real colours and the transition plays. */}
          <div
            role="img"
            aria-label={
              activity
                ? `${plural(activity.total, "GitHub contribution")} in the last year`
                : "Loading GitHub contributions"
            }
            className={`grid grid-flow-col ${GAP} ${activity ? "" : "motion-safe:animate-pulse"}`}
            style={{ ...columns, gridTemplateRows: "repeat(7, auto)" }}
          >
            {activity
              ? activity.weeks.flatMap((week, col) =>
                  week.map((day, row) =>
                    day ? (
                      <span
                        key={`${col}-${row}`}
                        aria-hidden
                        title={describe(day)}
                        className={`${SQUARE} ${HEAT[shaded ? day.level : 0]} hover:outline hover:-outline-offset-1 hover:outline-ink/50`}
                        style={{ transitionDelay: `${col * WASH_STEP_MS}ms` }}
                      />
                    ) : (
                      <span key={`${col}-${row}`} aria-hidden />
                    )
                  )
                )
              : Array.from({ length: PLACEHOLDER_WEEKS * 7 }, (_, i) => (
                  <span
                    key={`${Math.floor(i / 7)}-${i % 7}`}
                    aria-hidden
                    className={`${SQUARE} ${HEAT[0]}`}
                  />
                ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-[11px] text-ink-muted">
          {activity
            ? `${plural(activity.total, "contribution")} in the last year`
            : "Loading contributions…"}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            aria-hidden
            className="flex items-center gap-1.5 font-mono text-[10px] text-ink-faint"
          >
            Less
            <span className="flex gap-[2px]">
              {HEAT.map(heat => (
                <span
                  key={heat}
                  className={`size-[9px] rounded-[2px] ${heat}`}
                />
              ))}
            </span>
            More
          </span>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-ink-muted underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink"
          >
            github.com/gafaraleshe <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
