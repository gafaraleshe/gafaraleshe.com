/*
 * Design: Ethereal Open Canvas — Links page
 * Modern clean design with SVG icons, all original links restored
 */

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink as ExternalLinkIcon } from "lucide-react";
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

// ── All socials from the original site ──
const socials = [
  { label: "Instagram", handle: "@gafaraleshe", href: "https://instagram.com/gafaraleshe", Icon: InstagramIcon },
  { label: "X / Twitter", handle: "@GafarAleshe", href: "https://x.com/GafarAleshe", Icon: TwitterIcon },
  { label: "TikTok", handle: "@gafaraleshe", href: "https://tiktok.com/@gafaraleshe", Icon: TikTokIcon },
  { label: "YouTube", handle: "@gafaraleshe", href: "https://www.youtube.com/@gafaraleshe", Icon: YouTubeIcon },
  { label: "Twitch", handle: "@gafitenison", href: "https://twitch.tv/gafitenison", Icon: TwitchIcon },
  { label: "Snapchat", handle: "@gafaraleshe", href: "https://www.snapchat.com/add/gafaraleshe", Icon: SnapchatIcon },
  { label: "Discord", handle: "Join server", href: "https://discord.gg/UeuVcW6J5G", Icon: DiscordIcon },
  { label: "Facebook", handle: "Gafar Aleshe", href: "https://www.facebook.com/profile.php?id=61577047186240", Icon: FacebookIcon },
  { label: "LinkedIn", handle: "gafaraleshe", href: "https://linkedin.com/in/gafaraleshe/", Icon: LinkedInIcon },
  { label: "GitHub", handle: "gafaraleshe", href: "https://github.com/gafaraleshe", Icon: GitHubIcon },
];

// ── All feature links from the original site ──
const features = [
  {
    label: "Subscribe on YouTube",
    description: "Tech tips, reviews, unboxing, tutorials & lifestyle vlogs",
    href: "https://youtube.com/@gafaraleshe?sub_confirmation=1",
    Icon: YouTubeSubscribeIcon,
    featured: true,
  },
  {
    label: "SHOTBYGAFAR",
    description: "Professional photography & videography",
    href: "https://shotbygafar.com",
    Icon: CameraIcon,
    featured: false,
  },
  {
    label: "Portfolio Website",
    description: "View my full CV and project portfolio",
    href: "/",
    Icon: GlobeIcon,
    featured: false,
  },
  {
    label: "Amazon Prime Student — 6 Month Trial",
    description: "Get the student deal via my link",
    href: "https://www.amazon.co.uk/joinstudent?tag=gafaraleshe08-21",
    Icon: AcademicIcon,
    featured: false,
  },
  {
    label: "My PC Build Parts",
    description: "Full parts list on kit.co",
    href: "https://kit.co/gafaraleshe/pc-build",
    Icon: ComputerIcon,
    featured: false,
  },
  {
    label: "Dehancer — Use code GAFAR10",
    description: "10% off film-like color grading tools",
    href: "https://www.dehancer.com/shop",
    Icon: FilmIcon,
    featured: false,
  },
  {
    label: "Hostinger UK — Discount Link",
    description: "Web hosting deal via my referral",
    href: "https://hostinger.co.uk?referralcode=wjkgafararb2",
    Icon: ServerIcon,
    featured: false,
  },
  {
    label: "InvoiceFlow API",
    description: "Freelance billing service — Node.js, PostgreSQL, Docker",
    href: "https://github.com/gafaraleshe/InvoiceFlow",
    Icon: CodeIcon,
    featured: false,
  },
  {
    label: "Gaffy Studios",
    description: "Creative studio website — React, Next.js 15, TypeScript",
    href: "https://github.com/gafaraleshe/gaffystudios",
    Icon: PaletteIcon,
    featured: false,
  },
  {
    label: "Email Me",
    description: "contact@gafaraleshe.com",
    href: "mailto:contact@gafaraleshe.com",
    Icon: MailIcon,
    featured: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
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
        className="self-start max-w-2xl w-full mx-auto mb-12 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        gafaraleshe.com
      </motion.a>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <img
          src={PROFILE_IMG}
          alt="Gafar Aleshe"
          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-lg mb-4"
        />
        <h1 className="font-serif text-2xl tracking-tight text-foreground">
          Gafar Aleshe
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Software Engineer · Creative Director · Portsmouth, UK
        </p>
      </motion.div>

      {/* Social icons row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center gap-3 flex-wrap mb-12 max-w-2xl"
      >
        {socials.map((s) => {
          const Icon = s.Icon;
          return (
            <motion.a
              key={s.label}
              variants={item}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg border border-black/[0.08] flex items-center justify-center text-foreground hover:border-black/[0.2] hover:bg-black/[0.04] hover:scale-110 transition-all duration-200"
              title={`${s.label} — ${s.handle}`}
            >
              <Icon />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl space-y-2"
      >
        {features.map((f) => {
          const Icon = f.Icon;
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
                  ? "bg-foreground text-white border-foreground hover:bg-foreground/90 shadow-sm"
                  : "bg-white border-black/[0.06] hover:border-black/[0.15] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              }`}
            >
              <div className={`flex-shrink-0 w-5 h-5 ${f.featured ? "text-white" : "text-muted-foreground"}`}>
                <Icon />
              </div>
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
              <div className={`flex-shrink-0 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                f.featured
                  ? "text-white/60"
                  : "text-muted-foreground/40"
              }`}>
                <ExternalLinkIcon />
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-xs text-muted-foreground"
      >
        © {new Date().getFullYear()} Gafar Aleshe
      </motion.p>
    </div>
  );
}
