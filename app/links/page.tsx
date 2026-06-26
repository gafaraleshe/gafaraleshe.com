"use client";

/*
 * Links — index-card / filing aesthetic on the green graph-paper canvas.
 * Dotted paper, taped corners, NAME label, photo + paperclip, monospace bio,
 * a squared social bar, and "LINK:" cards with circular arrow buttons.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Paperclip } from "lucide-react";
import {
  InstagramIcon,
  TwitterIcon,
  TikTokIcon,
  YouTubeIcon,
  TwitchIcon,
  SnapchatIcon,
  DiscordIcon,
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeSubscribeIcon,
  CameraIcon,
  GlobeIcon,
  AcademicIcon,
  ComputerIcon,
  FilmIcon,
  ServerIcon,
  CodeIcon,
  PaletteIcon,
  MailIcon,
} from "@/components/LinkIcons";

const PROFILE_IMG = "/assets/gafar-profile.jpg";

const socials = [
  {
    label: "Instagram",
    handle: "@gafaraleshe",
    href: "https://instagram.com/gafaraleshe",
    Icon: InstagramIcon,
  },
  {
    label: "X / Twitter",
    handle: "@GafarAleshe",
    href: "https://x.com/GafarAleshe",
    Icon: TwitterIcon,
  },
  {
    label: "TikTok",
    handle: "@gafaraleshe",
    href: "https://tiktok.com/@gafaraleshe",
    Icon: TikTokIcon,
  },
  {
    label: "YouTube",
    handle: "@gafaraleshe",
    href: "https://www.youtube.com/@gafaraleshe",
    Icon: YouTubeIcon,
  },
  {
    label: "Twitch",
    handle: "@gafitenison",
    href: "https://twitch.tv/gafitenison",
    Icon: TwitchIcon,
  },
  {
    label: "Snapchat",
    handle: "@gafaraleshe",
    href: "https://www.snapchat.com/add/gafaraleshe",
    Icon: SnapchatIcon,
  },
  {
    label: "Discord",
    handle: "Join server",
    href: "https://discord.gg/UeuVcW6J5G",
    Icon: DiscordIcon,
  },
  {
    label: "Facebook",
    handle: "Gafar Aleshe",
    href: "https://www.facebook.com/profile.php?id=61577047186240",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    handle: "gafaraleshe",
    href: "https://linkedin.com/in/gafaraleshe/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    handle: "gafaraleshe",
    href: "https://github.com/gafaraleshe",
    Icon: GitHubIcon,
  },
];

const features = [
  {
    label: "Subscribe on YouTube",
    description: "Tech tips, reviews, unboxing, tutorials & lifestyle vlogs",
    href: "https://youtube.com/@gafaraleshe?sub_confirmation=1",
    Icon: YouTubeSubscribeIcon,
  },
  {
    label: "SHOTBYGAFAR",
    description: "Professional photography & videography",
    href: "https://shotbygafar.com",
    Icon: CameraIcon,
  },
  {
    label: "Portfolio Website",
    description: "View my full CV and project portfolio",
    href: "/",
    Icon: GlobeIcon,
  },
  {
    label: "Amazon Prime Student",
    description: "6-month trial via my student link",
    href: "https://www.amazon.co.uk/joinstudent?tag=gafaraleshe08-21",
    Icon: AcademicIcon,
  },
  {
    label: "My PC Build Parts",
    description: "Full parts list on kit.co",
    href: "https://kit.co/gafaraleshe/pc-build",
    Icon: ComputerIcon,
  },
  {
    label: "Dehancer — Code GAFAR10",
    description: "10% off film-like colour grading tools",
    href: "https://www.dehancer.com/shop",
    Icon: FilmIcon,
  },
  {
    label: "Hostinger UK",
    description: "Web hosting deal via my referral",
    href: "https://hostinger.co.uk?referralcode=wjkgafararb2",
    Icon: ServerIcon,
  },
  {
    label: "InvoiceFlow API",
    description: "Freelance billing service — Node.js, PostgreSQL, Docker",
    href: "https://github.com/gafaraleshe/InvoiceFlow",
    Icon: CodeIcon,
  },
  {
    label: "Gaffy Studios",
    description: "Creative studio website — React, Next.js 15, TypeScript",
    href: "https://github.com/gafaraleshe/gaffystudios",
    Icon: PaletteIcon,
  },
  {
    label: "Email Me",
    description: "contact@gafaraleshe.com",
    href: "mailto:contact@gafaraleshe.com",
    Icon: MailIcon,
  },
];

function CornerMarks() {
  const base = "pointer-events-none absolute h-4 w-4 border-neutral-900/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export default function Links() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      {/* ── Top bar ── */}
      <header className="mx-auto mb-8 flex max-w-2xl items-center justify-between sm:mb-10">
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white">
          Gafar Aleshe
        </span>
        <div className="flex items-center gap-1">
          <a
            href="/auth/login"
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
          >
            Sign in
          </a>
          <a
            href="/"
            className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
          >
            Portfolio ↗
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl">
        {/* ── Index card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <CornerMarks />

          {/* tape pieces */}
          <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-stone-300/50 shadow-sm" />
          <span className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 -rotate-12 bg-emerald-300/30 shadow-sm" />
          <span className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 rotate-6 bg-amber-200/40 shadow-sm" />

          {/* name + photo */}
          <div className="flex items-start justify-between gap-4">
            <div className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Name:
              </p>
              <h1 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-neutral-900 sm:text-6xl">
                Gafar
                <br />
                Aleshe
              </h1>
            </div>

            {/* photo card */}
            <div className="relative w-28 shrink-0 sm:w-36">
              <Paperclip
                className="absolute -top-3 right-4 z-10 h-7 w-7 -rotate-[20deg] text-neutral-400"
                strokeWidth={1.5}
              />
              <div className="overflow-hidden rounded-sm border border-neutral-900/10 bg-white shadow-sm">
                <img
                  src={PROFILE_IMG}
                  alt="Gafar Aleshe"
                  className="aspect-square w-full object-cover"
                />
                <div className="border-t border-neutral-900/10 px-2 py-1.5">
                  <p className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-wide text-neutral-900">
                    Gafar Aleshe
                  </p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <p className="font-mono text-[7.5px] uppercase leading-tight tracking-wide text-neutral-500">
                      Software Engineer
                    </p>
                    <p className="font-mono text-[9px] text-neutral-400">
                      2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bio */}
          <p className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Full-Stack Developer &amp; Creative Director. I build robust,
            scalable, user-centric web apps — from REST APIs to e-commerce — and
            direct creative media that grows audiences.
          </p>

          {/* footer */}
          <div className="mt-8 flex items-center justify-end border-t border-dashed border-neutral-900/15 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Made with <span className="text-red-500">♥</span> in Portsmouth
            </p>
          </div>
        </motion.div>

        {/* ── Social bar ── */}
        <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-md border-l border-t border-neutral-900/10 bg-[#f4f3ec]">
          {socials.map(s => {
            const Icon = s.Icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={`${s.label} — ${s.handle}`}
                className="flex aspect-square items-center justify-center border-b border-r border-neutral-900/10 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        {/* ── Link cards ── */}
        <div className="mt-4 space-y-3 pb-14">
          {features.map((f, i) => {
            const Icon = f.Icon;
            const isExternal =
              f.href.startsWith("http") || f.href.startsWith("mailto");
            return (
              <motion.a
                key={f.label}
                href={f.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 * i }}
                className="group flex items-stretch overflow-hidden rounded-md border border-neutral-900/10 bg-[#f4f3ec] shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex w-20 shrink-0 items-center justify-center bg-neutral-900 text-white sm:w-24">
                  <Icon />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      Link:
                    </p>
                    <p className="truncate font-display text-base font-bold uppercase tracking-tight text-neutral-900">
                      {f.label}
                    </p>
                    {f.description && (
                      <p className="truncate font-mono text-[11px] text-neutral-500">
                        {f.description}
                      </p>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
