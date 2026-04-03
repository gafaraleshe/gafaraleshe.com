/*
 * Design: Ethereal Open Canvas — Links page
 * All links from the original gafaraleshe.com/links page, rebuilt cleanly
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663479557356/Wfm9Zj6GfSKo3RJW9fde2i/gafar_face_8473d35c.jpg";

// ── All socials from the original site ──
const socials = [
  { label: "Instagram", handle: "@gafaraleshe", href: "https://instagram.com/gafaraleshe", emoji: "📸" },
  { label: "X / Twitter", handle: "@GafarAleshe", href: "https://x.com/GafarAleshe", emoji: "𝕏" },
  { label: "TikTok", handle: "@gafaraleshe", href: "https://tiktok.com/@gafaraleshe", emoji: "🎵" },
  { label: "YouTube", handle: "@gafaraleshe", href: "https://www.youtube.com/@gafaraleshe", emoji: "▶" },
  { label: "Twitch", handle: "@gafitenison", href: "https://twitch.tv/gafitenison", emoji: "🟣" },
  { label: "Snapchat", handle: "@gafaraleshe", href: "https://www.snapchat.com/add/gafaraleshe", emoji: "👻" },
  { label: "Discord", handle: "Join server", href: "https://discord.gg/UeuVcW6J5G", emoji: "💬" },
  { label: "Facebook", handle: "Gafar Aleshe", href: "https://www.facebook.com/profile.php?id=61577047186240", emoji: "👤" },
  { label: "LinkedIn", handle: "gafaraleshe", href: "https://linkedin.com/in/gafaraleshe/", emoji: "💼" },
  { label: "GitHub", handle: "gafaraleshe", href: "https://github.com/gafaraleshe", emoji: "🐙" },
];

// ── All feature links from the original site ──
const features = [
  {
    label: "Subscribe on YouTube",
    description: "Tech tips, reviews, unboxing, tutorials & lifestyle vlogs",
    href: "http://youtube.com/@gafaraleshe?sub_confirmation=1",
    emoji: "🔔",
    featured: true,
  },
  {
    label: "SHOTBYGAFAR",
    description: "Photography portfolio",
    href: "http://shotbygafar.com",
    emoji: "📷",
    featured: false,
  },
  {
    label: "Portfolio Website",
    description: "View my full CV and project portfolio",
    href: "/",
    emoji: "🌐",
    featured: false,
  },
  {
    label: "Amazon Prime Student — 6 Month Trial",
    description: "Get the student deal via my link",
    href: "http://www.amazon.co.uk/joinstudent?tag=gafaraleshe08-21",
    emoji: "🎓",
    featured: false,
  },
  {
    label: "My PC Build Parts",
    description: "Full parts list on kit.co",
    href: "https://kit.co/gafaraleshe/pc-build",
    emoji: "🖥️",
    featured: false,
  },
  {
    label: "Dehancer — Use code GAFAR10",
    description: "10% off film-like color grading tools",
    href: "https://www.dehancer.com/shop",
    emoji: "🎞️",
    featured: false,
  },
  {
    label: "Hostinger UK — Discount Link",
    description: "Web hosting deal via my referral",
    href: "https://hostinger.co.uk?referralcode=wjkgafararb2",
    emoji: "🌐",
    featured: false,
  },
  {
    label: "InvoiceFlow API",
    description: "Freelance billing service — Node.js, PostgreSQL, Docker",
    href: "https://github.com/gafaraleshe/InvoiceFlow",
    emoji: "📄",
    featured: false,
  },
  {
    label: "Gaffy Studios",
    description: "Creative studio website — React, Next.js 15, TypeScript",
    href: "https://github.com/gafaraleshe/gaffystudios",
    emoji: "🎨",
    featured: false,
  },
  {
    label: "Email Me",
    description: "info@gafaraleshe.com",
    href: "mailto:info@gafaraleshe.com",
    emoji: "✉️",
    featured: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Links() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
      {/* Back link */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="self-start max-w-lg w-full mx-auto mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        gafaraleshe.com
      </motion.a>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <img
          src={PROFILE_IMG}
          alt="Gafar Aleshe"
          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-lg mb-4"
        />
        <h1 className="font-serif text-2xl tracking-tight text-foreground">
          Gafar Aleshe
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          Code, content & curated moments —<br />
          building apps, crafting stories.
        </p>
      </motion.div>

      {/* Social icons row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center gap-2 flex-wrap mb-10 max-w-lg"
      >
        {socials.map((s) => (
          <motion.a
            key={s.label}
            variants={item}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-black/[0.08] flex items-center justify-center text-base hover:border-black/[0.2] hover:bg-black/[0.02] hover:scale-110 transition-all duration-200"
            title={`${s.label} — ${s.handle}`}
          >
            {s.emoji}
          </motion.a>
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-lg space-y-2.5"
      >
        {features.map((f) => {
          const isExternal =
            f.href.startsWith("http") || f.href.startsWith("mailto");
          return (
            <motion.a
              key={f.label}
              variants={item}
              href={f.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 group ${
                f.featured
                  ? "bg-foreground text-white border-foreground hover:bg-foreground/90"
                  : "bg-white border-black/[0.06] hover:border-black/[0.12] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              }`}
            >
              <span className="text-lg flex-shrink-0">{f.emoji}</span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium truncate ${
                    f.featured ? "text-white" : "text-foreground"
                  }`}
                >
                  {f.label}
                </p>
                {f.description && (
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      f.featured
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {f.description}
                  </p>
                )}
              </div>
              <ArrowUpRight
                className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  f.featured
                    ? "text-white/60"
                    : "text-muted-foreground/40"
                }`}
              />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-xs text-muted-foreground"
      >
        © {new Date().getFullYear()} Gafar Aleshe
      </motion.p>
    </div>
  );
}
