"use client";

/*
 * Links — the same paper sheet, header and quiet section labels as the home
 * page, holding a link-in-bio: a grid of social tiles in their brand
 * colours, the latest YouTube upload, then grouped link rows (work, picks &
 * deals, contact).
 */

import { useState, type ComponentType, type ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import {
  Aperture,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  FileText,
  GraduationCap,
} from "lucide-react";
import { NameReveal, Reveal } from "@/components/motion";
import {
  DiscordGlyph,
  FacebookGlyph,
  GitHubGlyph,
  HostingerGlyph,
  InstagramGlyph,
  LinkedInGlyph,
  MailGlyph,
  SnapchatGlyph,
  TikTokGlyph,
  TwitchGlyph,
  XGlyph,
  YouTubeGlyph,
} from "@/components/BrandIcons";
import { LatestVideo } from "@/components/LatestVideo";
import { SiteNav } from "@/components/SiteNav";
import NewsletterForm from "../newsletter-form";
import {
  CV_FILENAME,
  CV_PDF,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  PHONE,
  PHONE_HREF,
} from "@/lib/cv";
import { YOUTUBE_URL, type LatestVideo as Video } from "@/lib/youtube";

const PROFILE_IMG = "/assets/gafar-profile.jpg";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const softRise = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.55, delay, ease: EASE_OUT },
  },
});

type Glyph = ComponentType<{ size?: number; className?: string }>;

// ── Data ──

// Brand colours per theme: black marks follow the ink token, and Snapchat's
// yellow is deepened so it reads on the white tile.
const socials: {
  label: string;
  handle: string;
  href: string;
  Icon: Glyph;
  light: string;
  dark: string;
}[] = [
  {
    label: "Instagram",
    handle: "@gafaraleshe",
    href: "https://instagram.com/gafaraleshe",
    Icon: InstagramGlyph,
    light: "#E4405F",
    dark: "#F77737",
  },
  {
    label: "YouTube",
    handle: "@gafaraleshe",
    href: YOUTUBE_URL,
    Icon: YouTubeGlyph,
    light: "#FF0000",
    dark: "#FF3B3B",
  },
  {
    label: "TikTok",
    handle: "@gafaraleshe",
    href: "https://tiktok.com/@gafaraleshe",
    Icon: TikTokGlyph,
    light: "var(--ink)",
    dark: "#25F4EE",
  },
  {
    label: "X",
    handle: "@GafarAleshe",
    href: "https://x.com/GafarAleshe",
    Icon: XGlyph,
    light: "var(--ink)",
    dark: "var(--ink)",
  },
  {
    label: "LinkedIn",
    handle: "gafaraleshe",
    href: LINKEDIN_URL,
    Icon: LinkedInGlyph,
    light: "#0A66C2",
    dark: "#3B8FE0",
  },
  {
    label: "GitHub",
    handle: "gafaraleshe",
    href: GITHUB_URL,
    Icon: GitHubGlyph,
    light: "var(--ink)",
    dark: "var(--ink)",
  },
  {
    label: "Twitch",
    handle: "@gafitenison",
    href: "https://twitch.tv/gafitenison",
    Icon: TwitchGlyph,
    light: "#9146FF",
    dark: "#A970FF",
  },
  {
    label: "Snapchat",
    handle: "@gafaraleshe",
    href: "https://www.snapchat.com/add/gafaraleshe",
    Icon: SnapchatGlyph,
    light: "#C9B300",
    dark: "#FFFC00",
  },
  {
    label: "Discord",
    handle: "Join the server",
    href: "https://discord.gg/UeuVcW6J5G",
    Icon: DiscordGlyph,
    light: "#5865F2",
    dark: "#7983F5",
  },
  {
    label: "Facebook",
    handle: "Gafar Aleshe",
    href: "https://www.facebook.com/profile.php?id=61577047186240",
    Icon: FacebookGlyph,
    light: "#0866FF",
    dark: "#4A8DFF",
  },
];

type LinkItem = {
  title: string;
  description: string;
  href: string;
  // A site screenshot (public/assets/work/) or an icon on a small tile.
  image?: string;
  Icon?: Glyph;
  download?: string;
  code?: string;
};

const work: LinkItem[] = [
  {
    title: "Portfolio",
    description: "Experience, projects and skills",
    href: "/",
    image: "/assets/work/gafaraleshe.webp",
  },
  {
    title: "Résumé",
    description: "Download my CV as a PDF",
    href: CV_PDF,
    download: CV_FILENAME,
    Icon: FileText,
  },
  {
    title: "Hermite Labs",
    description: "Software for creative businesses",
    href: "https://hermitelabs.com",
    image: "/assets/work/hermitelabs.webp",
  },
  {
    title: "HermiteFlow",
    description: "CRM and invoicing with UK VAT built in",
    href: "https://flow.hermitelabs.com",
    image: "/assets/work/hermiteflow.webp",
  },
  {
    title: "SHOTBYGAFAR",
    description: "Photography & videography bookings",
    href: "https://shotbygafar.com",
    image: "/assets/work/shotbygafar.webp",
  },
  {
    title: "Gaffy Studios",
    description: "The creative studio behind SHOTBYGAFAR",
    href: "https://gaffystudios.com",
    image: "/assets/work/gaffystudios.webp",
  },
];

const picks: LinkItem[] = [
  {
    title: "Amazon Prime Student",
    description: "6-month free trial via my student link",
    href: "https://www.amazon.co.uk/joinstudent?tag=gafaraleshe08-21",
    Icon: GraduationCap,
  },
  {
    title: "My PC build",
    description: "The full parts list on kit.co",
    href: "https://kit.co/gafaraleshe/pc-build",
    Icon: Cpu,
  },
  {
    title: "Dehancer",
    description: "10% off colour grading",
    href: "https://www.dehancer.com/shop",
    Icon: Aperture,
    code: "GAFAR10",
  },
  {
    title: "Hostinger UK",
    description: "Web hosting deal via my referral",
    href: "https://hostinger.co.uk?referralcode=wjkgafararb2",
    Icon: HostingerGlyph,
  },
];

// ── Pieces ──

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal y={16}>
      <section>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            {title}
          </h2>
          {action}
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function CornerMarks() {
  const base = "pointer-events-none absolute h-3 w-3 border-ink/25";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          },
          () => {}
        );
      }}
      aria-label={copied ? `Copied ${code}` : `Copy code ${code}`}
      className="flex items-center gap-1.5 rounded-md border border-dashed border-ink/25 px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-ink transition-colors hover:border-ink/50 hover:bg-ink/5"
    >
      {code}
      {copied ? (
        <Check
          aria-hidden
          className="h-3 w-3 text-emerald-600 dark:text-emerald-400"
        />
      ) : (
        <Copy aria-hidden className="h-3 w-3 text-ink-muted" />
      )}
    </button>
  );
}

function LinkRow({ item }: { item: LinkItem }) {
  const external = item.href.startsWith("http");
  const Icon = item.Icon;

  return (
    <li className="relative">
      <a
        href={item.href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...(item.download ? { download: item.download } : {})}
        className="group flex h-full items-center gap-3.5 rounded-lg border border-ink/10 bg-tile p-2.5 pr-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:bg-tile-hover hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {item.image ? (
          <span className="relative aspect-[16/10] w-[72px] shrink-0 overflow-hidden rounded-md border border-ink/10 bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              width={144}
              height={90}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
          </span>
        ) : (
          Icon && (
            <span className="grid h-[45px] w-[72px] shrink-0 place-items-center rounded-md border border-ink/10 bg-paper text-ink-dim transition-colors group-hover:text-ink">
              <Icon size={20} className="h-5 w-5" />
            </span>
          )
        )}
        <span className={`min-w-0 flex-1 ${item.code ? "sm:pr-24" : ""}`}>
          <span className="block truncate text-[14px] font-medium text-ink sm:text-[14.5px]">
            {item.title}
          </span>
          <span className="block truncate text-[12.5px] text-ink-muted sm:text-[13px]">
            {item.description}
            {item.code && (
              <span className="sm:hidden">
                {" "}
                · code <span className="font-mono text-ink">{item.code}</span>
              </span>
            )}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-ink-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </a>
      {/* Beside the link rather than inside it: a button can't nest in <a>. */}
      {item.code && (
        <span className="absolute right-10 top-1/2 hidden -translate-y-1/2 sm:block">
          <CopyCode code={item.code} />
        </span>
      )}
    </li>
  );
}

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map(item => (
        <LinkRow key={item.title} item={item} />
      ))}
    </ul>
  );
}

// ── Page ──

export default function LinksView({ video }: { video: Video | null }) {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      <SiteNav
        cta={{ href: "/", label: "Portfolio" }}
        className="max-w-[760px]"
      />

      <main
        className="relative mx-auto max-w-[760px] rounded-xl border border-ink/10 bg-paper px-5 pb-8 pt-12 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] sm:px-12 sm:pb-10 sm:pt-16"
        style={DOTTED}
      >
        <CornerMarks />

        {/* ── Header ── */}
        <header>
          <motion.div {...softRise(0)} className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE_IMG}
              alt=""
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-full border border-ink/10 object-cover grayscale transition duration-500 hover:grayscale-0"
            />
            <div className="min-w-0">
              <h1 className="text-[19px] font-medium tracking-[-0.015em] text-ink sm:text-[21px]">
                <NameReveal
                  lines={["Gafar Aleshe"]}
                  delay={0.2}
                  stagger={0.03}
                  blur={4}
                />
              </h1>
              <p className="mt-0.5 text-[14px] text-ink-muted sm:text-[14.5px]">
                Software engineer & creative{" "}
                <span className="whitespace-nowrap text-ink-faint">
                  / @gafaraleshe
                </span>
              </p>
            </div>
          </motion.div>

          <motion.p
            {...softRise(0.05)}
            className="mt-5 text-[14.5px] leading-[1.75] text-ink-dim sm:text-[15.5px]"
          >
            I build accessible, type-safe web apps and shoot photo and film as{" "}
            <span className="text-ink">SHOTBYGAFAR</span>. Everything I make,
            post and recommend — in one place.
          </motion.p>

          {/* ── Socials ── */}
          <motion.ul
            {...softRise(0.1)}
            role="list"
            aria-label="Social profiles"
            className="mt-7 grid grid-cols-5 gap-2"
          >
            {socials.map(({ label, handle, href, Icon, light, dark }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${label} — ${handle}`}
                  aria-label={`${label} (${handle})`}
                  style={
                    {
                      "--brand": light,
                      "--brand-dark": dark,
                    } as React.CSSProperties
                  }
                  className="group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-tile text-[var(--brand)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-tile-hover hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:aspect-auto sm:py-4 dark:text-[var(--brand-dark)]"
                >
                  <Icon
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted transition-colors group-hover:text-ink sm:block">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </header>

        <div className="mt-12 space-y-12">
          <Section
            title="Latest video"
            action={
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
              >
                Channel
                <span
                  aria-hidden
                  className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            }
          >
            <LatestVideo video={video} />
          </Section>

          <Section title="Work">
            <LinkList items={work} />
          </Section>

          <Section title="Picks & deals">
            <LinkList items={picks} />
          </Section>

          <Section title="Say hello">
            <ul role="list" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <LinkRow
                item={{
                  title: "Email",
                  description: EMAIL,
                  href: `mailto:${EMAIL}`,
                  Icon: MailGlyph,
                }}
              />
              <LinkRow
                item={{
                  title: "Discord",
                  description: "Hang out in the server",
                  href: "https://discord.gg/UeuVcW6J5G",
                  Icon: DiscordGlyph,
                }}
              />
            </ul>
          </Section>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
          <p className="font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
            © {new Date().getFullYear()} Gafar Aleshe
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={PHONE_HREF}
              className="font-mono text-[11.5px] tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[11.5px] tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
            >
              {EMAIL}
            </a>
          </div>
        </footer>
      </main>

      <div className="mx-auto max-w-[760px]">
        <NewsletterForm />
        <div className="mt-6 flex items-center justify-between px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            {LOCATION}
          </p>
          <a
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            Portfolio →
          </a>
        </div>
      </div>
    </div>
  );
}
