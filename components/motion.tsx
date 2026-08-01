"use client";

/*
 * Shared motion vocabulary for the filing-card design system, modelled on
 * the Framer appear effects used on luvswallet.info: a quick tween rise for
 * hero cards, springy bounce pop-ins for the decorative tape/paperclip
 * pieces, staggered slide-up cascades for content, and a 3D flip-in for the
 * photo card. Entrance transitions live inside their animate targets so the
 * element-level `transition` stays free for hover/tap micro-interactions.
 */

import type { ReactNode } from "react";
import { motion, MotionConfig, type MotionProps, type Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.44, 0, 0.56, 1];

export const springy = (
  delay = 0,
  bounce = 0.4,
  duration = 0.8,
): Transition => ({ type: "spring", bounce, duration, delay });

// Hero card: fast tween rise from deep below the fold.
export const heroRise: MotionProps = {
  initial: { opacity: 0, y: 120 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", delay: 0.1, duration: 0.45, ease: EASE },
  },
};

// Plain tween fade, used for page chrome.
export const fadeIn = (delay = 0, duration = 0.7): MotionProps => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { type: "tween", delay, duration, ease: EASE },
  },
});

// Springy slide-up for rows inside an already-visible card.
export const rise = (delay = 0, y = 40): MotionProps => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0, transition: springy(delay) },
});

// Springy slide-up that fires when scrolled into view.
export const riseInView = (delay = 0, y = 40): MotionProps => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: springy(delay) },
  viewport: { once: true, margin: "-40px" },
});

// Tape pieces: drop in with scale and a snap of rotation. The final angle
// moves here from the Tailwind rotate class so the spring can overshoot it.
export const tapePop = (rotate: number, delay = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.4, y: -40, rotate: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate,
    transition: springy(delay, 0.5, 1.1),
  },
});

// Paperclip: drops from above and swings straight.
export const clipDrop = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: -60, rotate: 60 },
  animate: { opacity: 1, y: 0, rotate: 0, transition: springy(delay, 0.25, 0.7) },
});

// Photo card: 3D flip-in from the right.
export const flipIn = (delay = 0.7): MotionProps => ({
  initial: { opacity: 0, x: 40, rotate: 30, rotateY: -50, transformPerspective: 900 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    rotateY: 0,
    transformPerspective: 900,
    transition: springy(delay, 0.4, 0.9),
  },
});

// Bouncy scale pop for small square things (social icons, chips).
export const chipPop = (delay = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.4 },
  whileInView: { opacity: 1, scale: 1, transition: springy(delay, 0.5, 0.7) },
  viewport: { once: true, margin: "-20px" },
});

// Hover/tap micro-interactions for cards and buttons.
export const hoverLift: MotionProps = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: springy(0, 0.55, 0.45),
};

export const hoverPop: MotionProps = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.95 },
  transition: springy(0, 0.55, 0.4),
};

// Polaroid photo hover, adapted from luvswallet.info's image swap: the card
// tilts and grows on a spring while the photo blooms from black-and-white
// into colour (pair with `group` on the card and grayscale classes on the img).
export const photoHover: MotionProps = {
  whileHover: { scale: 1.05, rotate: 2 },
  whileTap: { scale: 0.97 },
  transition: springy(0, 0.5, 0.5),
};

// Honour prefers-reduced-motion for every animation below the provider.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Letter-by-letter name reveal with a motion-blur trail, like the big
// "LOVE VICTOR" type-in on luvswallet.info. Each character slides in from
// the right, blurred, on a staggered delay.
export function NameReveal({
  lines,
  delay = 0.9,
  stagger = 0.07,
  blur = 8,
}: {
  lines: string[];
  delay?: number;
  stagger?: number;
  blur?: number;
}) {
  let index = 0;
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
      {lines.map(line => (
        <span key={line} className="block">
          {Array.from(line).map((ch, ci) => {
            const d = delay + index++ * stagger;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, x: 14, filter: `blur(${blur}px)` }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { type: "tween", delay: d, duration: 0.32, ease: EASE },
                }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            );
          })}
        </span>
      ))}
      </span>
    </>
  );
}

// Scroll-triggered reveal wrapper for whole sections.
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0, transition: springy(delay, 0.35, 0.9) }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}
