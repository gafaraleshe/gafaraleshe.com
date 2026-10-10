"use client";

/*
 * Home — laid out after pysavant.cv: one narrow column with a name and
 * profile row, a few plain paragraphs, then quiet sections (Activity,
 * Experience, Skills, Selected work, Education) each headed by a small
 * label. The column sits on a single paper sheet over the graph-paper grid,
 * near-black by default and the original cream card in the light theme.
 */

import { useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import { ChevronDown, Download, Mail } from "lucide-react";
import { NameReveal, Reveal, fadeIn } from "@/components/motion";
import {
  GitHubGlyph,
  InstagramGlyph,
  LinkedInGlyph,
  MailGlyph,
  XGlyph,
} from "@/components/BrandIcons";
import { GitHubActivity } from "@/components/GitHubActivity";
import { INSTAGRAM_PROFILE, InstagramFeed } from "@/components/InstagramFeed";
import { PathChooser } from "@/components/PathChooser";
import { SkillIcon } from "@/components/SkillIcons";
import { WorkGrid, type WorkItem } from "@/components/WorkGrid";

const PROFILE_IMG = "/assets/gafar-profile.jpg";
const RESUME_PDF = "/assets/Gafar_Aleshe_Resume.pdf";

const EMAIL = "gafaraleshe2411@gmail.com";
const PHONE = "+44 7882 655541";
const PHONE_HREF = "tel:+447882655541";
const GITHUB_URL = "https://github.com/gafaraleshe";

const DOTTED = {
  backgroundImage: "radial-gradient(var(--paper-dot) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// pysavant's entrance: a short, soft rise rather than the card bounces.
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const softRise = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.55, delay, ease: EASE_OUT },
  },
});

// ── Data ──

const profiles = [
  {
    label: "Instagram",
    href: "https://instagram.com/gafaraleshe",
    Icon: InstagramGlyph,
  },
  { label: "X", href: "https://x.com/GafarAleshe", Icon: XGlyph },
  { label: "GitHub", href: GITHUB_URL, Icon: GitHubGlyph },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gafaraleshe/",
    Icon: LinkedInGlyph,
  },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: MailGlyph },
];

const experience = [
  {
    company: "FrontToBack",
    companyHref: "https://fronttobackdev.com/",
    role: "Frontend Developer & Creative Director",
    location: "Portsmouth, UK",
    start: "Dec 22",
    end: "Now",
    bullets: [
      "Built and deployed 25+ responsive websites and web applications using JavaScript, HTML, CSS, PHP and WordPress, translating client requirements into production-ready user interfaces.",
      "Developed responsive, mobile-first interfaces with reusable components, semantic HTML, accessible forms and cross-browser compatibility, improving usability across devices.",
      "Implemented e-commerce functionality and SEO integrations using WooCommerce and Yoast, contributing to 3.2× lead growth while maintaining 98% client retention.",
      "Collaborated with clients and team members through Slack and Trello, gathering requirements, managing development tasks and delivering projects against deadlines.",
      "Led digital content and web strategy across client projects, contributing to growth of 13K+ Instagram and 70K+ TikTok followers and generating 10M+ views.",
    ],
  },
  {
    company: "SHOTBYGAFAR",
    companyHref: "https://shotbygafar.com",
    role: "Founder & Creative Director",
    location: "Portsmouth, UK",
    start: "Aug 24",
    end: "Now",
    bullets: [
      "Professional photography and videography services for brands, events, and businesses — 25+ clients, five-figure revenue.",
      "Managed end-to-end client workflow from briefs to delivery, handling scheduling, contracts, and revisions.",
    ],
  },
];

const skills: [string, string[]][] = [
  ["Language", ["TypeScript", "JavaScript", "Python"]],
  [
    "Frontend",
    [
      "React",
      "Next.js",
      "Vue",
      "Redux",
      "Tailwind CSS",
      "Vite",
      "HTML5",
      "CSS3",
      "TanStack Query",
      "React Hook Form",
    ],
  ],
  ["Backend", ["Node.js", "REST APIs", "JWT", "OAuth 2.0", "WebAuthn"]],
  ["Data", ["PostgreSQL", "MongoDB", "SQL", "Drizzle ORM", "Zod"]],
  [
    "DevOps & Testing",
    [
      "AWS",
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Jest",
      "Cypress",
      "TDD",
    ],
  ],
  [
    "Accessibility",
    [
      "Semantic HTML",
      "WCAG",
      "ARIA",
      "Keyboard Accessibility",
      "Screen Readers",
    ],
  ],
];

// Screenshots in public/assets/work/ (see components/WorkGrid.tsx).
const work: WorkItem[] = [
  {
    title: "Hermite Labs",
    description:
      "Multi-product SaaS for creative businesses — web, API and desktop in one monorepo",
    href: "https://hermitelabs.com",
    image: "/assets/work/hermitelabs.webp",
  },
  {
    title: "HermiteFlow",
    description:
      "CRM and invoicing for photographers and studios, with UK VAT built in",
    href: "https://flow.hermitelabs.com",
    image: "/assets/work/hermiteflow.webp",
  },
  {
    title: "SHOTBYGAFAR",
    description: "Booking site for my photography and film studio",
    href: "https://shotbygafar.com",
    image: "/assets/work/shotbygafar.webp",
  },
  {
    title: "Gaffy Studios",
    description: "The creative studio behind SHOTBYGAFAR — Next.js 15",
    href: "https://gaffystudios.com",
    repo: "https://github.com/gafaraleshe/gaffystudios",
    image: "/assets/work/gaffystudios.webp",
  },
  {
    title: "gafaraleshe.com",
    description: "This site — code, cinema and a shop under one roof",
    href: "https://gafaraleshe.com",
    repo: "https://github.com/gafaraleshe/gafaraleshe.com",
    image: "/assets/work/gafaraleshe.webp",
  },
];

const education = [
  {
    name: "University of Essex Online",
    detail: "BSc Computer Science, graduating 2028",
  },
  {
    name: "Havant and South Downs College",
    detail: "A Levels in Computer Science, Maths & Further Maths, 2023–25",
  },
];

const certifications = [
  { name: "CS50x", detail: "Introduction to Computer Science, HarvardX" },
  {
    name: "Full-Stack & Python Pro",
    detail: "Bootcamps by Dr Angela Yu",
  },
  { name: "AWS Cloud Practitioner", detail: "Essentials, AWS on edX" },
  { name: "AWS Educate", detail: "Introduction to Generative AI" },
];

// ── Pieces ──

function Section({
  id,
  title,
  action,
  children,
}: {
  id?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal y={16}>
      <section id={id} className="scroll-mt-16">
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

// Hand-written margin note with a drawn arrow pointing back at the buttons.
function OpenToWork() {
  return (
    <div
      aria-hidden
      className="pointer-events-none ml-3 hidden items-center gap-1 sm:flex"
    >
      <svg
        viewBox="0 0 64 32"
        fill="none"
        className="doodle h-7 w-14 overflow-visible text-ink-muted"
      >
        <path
          d="M60 22C46 30 22 28 6 12"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M5 22L5 11L16 10"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ "--doodle-delay": "1.6s" } as React.CSSProperties}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0, rotate: -8, y: 4 }}
        animate={{
          opacity: 1,
          rotate: -6,
          y: 0,
          transition: { delay: 1.1, duration: 0.6, ease: EASE_OUT },
        }}
        className="-mt-5 whitespace-nowrap font-hand text-[21px] leading-none text-ink-muted"
      >
        open to work
      </motion.span>
    </div>
  );
}

// pysavant's experience strip: a hairline with a dot per role (the latest
// one pulsing), names and dates in columns, and the detail behind "See more".
function Experience() {
  const [open, setOpen] = useState(false);
  const cols = experience.length;

  return (
    <Section
      id="experience"
      title="Experience"
      action={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="experience-detail"
          className="flex items-center gap-1 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
        >
          {open ? "See less" : "See more"}
          <ChevronDown
            aria-hidden
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      }
    >
      <div aria-hidden className="relative mb-3.5 hidden h-2 sm:block">
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2"
          style={{
            right: `${100 / cols}%`,
            backgroundImage:
              "linear-gradient(to right, var(--ink) 0%, color-mix(in oklab, var(--ink) 18%, transparent) 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-1/2 grid -translate-y-1/2"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {experience.map((exp, i) => (
            <div key={exp.company} className="flex justify-start">
              <span className="relative flex size-1.5 items-center justify-center">
                {i === 0 && (
                  <span className="absolute -inset-1 animate-ping rounded-full bg-ink/15 [animation-duration:2.8s]" />
                )}
                <span
                  className={`relative size-1.5 rounded-full ${i === 0 ? "bg-ink" : "bg-ink/30"}`}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol
        className="grid grid-cols-2 gap-x-4 gap-y-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {experience.map(exp => (
          <li key={exp.company} className="sm:pr-4">
            <p className="text-[14px] font-medium text-ink sm:text-[14.5px]">
              {exp.company}
            </p>
            <p className="mt-0.5 text-[13px] text-ink-muted">{exp.role}</p>
            <p className="mt-1 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
              {exp.start} – {exp.end}
            </p>
          </li>
        ))}
      </ol>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="experience-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-6 border-t border-ink/10 pt-6">
              {experience.map(exp => (
                <div key={exp.company}>
                  <p className="text-[14px] text-ink">
                    {exp.role} ·{" "}
                    <a
                      href={exp.companyHref}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {exp.company}
                    </a>
                  </p>
                  <p className="mt-0.5 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
                    {exp.location} · {exp.start} – {exp.end}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {exp.bullets.map(b => (
                      <li
                        key={b}
                        className="relative pl-4 text-[13.5px] leading-relaxed text-ink-dim before:absolute before:left-0 before:text-ink-faint before:content-['–']"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// Numbered list after pysavant's "Field studies".
function NumberedList({
  items,
}: {
  items: { name: string; detail: string }[];
}) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item.name} className="flex items-baseline gap-3">
          <span className="w-4 shrink-0 font-mono text-[11.5px] tracking-[0.02em] text-ink-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-[14px] leading-relaxed text-ink-muted sm:text-[14.5px]">
            <span className="text-ink">{item.name}</span>{" "}
            <span className="text-ink-faint">—</span> {item.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

// ── Page ──
export default function Home() {
  // Bumped when the visitor picks "Code" so the entrance animations that
  // played behind the chooser run again in plain view.
  const [entrance, setEntrance] = useState(0);

  return (
    <>
      <PathChooser onCode={() => setEntrance(n => n + 1)} />
      <HomeContent key={entrance} />
    </>
  );
}

function HomeContent() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-8 sm:py-8">
      {/* ── Site nav, on the grid ── */}
      <motion.nav
        {...fadeIn(0.15)}
        aria-label="Site"
        className="mx-auto mb-5 flex max-w-[760px] items-center justify-between px-1 sm:mb-8"
      >
        <a
          href="/"
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
        >
          GA
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/cinema"
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
          >
            Cinema
          </a>
          <a
            href="/shop"
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
          >
            Shop
          </a>
          <a
            href="/links"
            className="rounded-full border border-white/25 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
          >
            Links ↗
          </a>
        </div>
      </motion.nav>

      <main
        className="relative mx-auto max-w-[760px] rounded-xl border border-ink/10 bg-paper px-5 pb-8 pt-12 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] sm:px-12 sm:pb-10 sm:pt-16"
        style={DOTTED}
      >
        <CornerMarks />

        {/* ── Header ── */}
        <header>
          <motion.div
            {...softRise(0)}
            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          >
            <div className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE_IMG}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full border border-ink/10 object-cover grayscale transition duration-500 hover:grayscale-0"
              />
              <div>
                <h1 className="text-[17px] font-medium tracking-[-0.015em] text-ink sm:text-[18px]">
                  <NameReveal
                    lines={["Gafar Aleshe"]}
                    delay={0.2}
                    stagger={0.03}
                    blur={4}
                  />
                </h1>
                <p className="mt-0.5 text-[14px] text-ink-muted sm:text-[14.5px]">
                  Software engineer{" "}
                  <span className="whitespace-nowrap text-ink-faint">
                    / @gafaraleshe
                  </span>
                </p>
              </div>
            </div>

            <nav
              aria-label="Profiles"
              className="-ml-1.5 flex shrink-0 flex-wrap items-center gap-0.5 sm:ml-0 sm:gap-1 sm:pt-1"
            >
              {profiles.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  aria-label={label}
                  title={label}
                  className="grid size-8 place-items-center rounded-md text-ink-muted transition-colors hover:bg-tile hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                >
                  <Icon />
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            {...softRise(0.05)}
            className="mt-6 space-y-3.5 text-[14.5px] leading-[1.75] text-ink-dim sm:text-[15.5px]"
          >
            <p>
              Hey, I&apos;m Gafar — a software engineer based in{" "}
              <span className="text-ink">Portsmouth, UK</span>. I work across
              full-stack and frontend, building accessible, type-safe web apps
              with TypeScript, React, Next.js and Node.js.
            </p>
            <p>
              I&apos;ve shipped 25+ responsive sites and apps at{" "}
              <a
                className="link"
                href="https://fronttobackdev.com/"
                target="_blank"
                rel="noreferrer"
              >
                FrontToBack
              </a>
              , and I&apos;m building{" "}
              <a
                className="link"
                href="https://hermitelabs.com"
                target="_blank"
                rel="noreferrer"
              >
                Hermite Labs
              </a>{" "}
              — software for creative businesses, starting with the{" "}
              <a
                className="link"
                href="https://flow.hermitelabs.com"
                target="_blank"
                rel="noreferrer"
              >
                HermiteFlow
              </a>{" "}
              CRM and invoicing app.
            </p>
            <p>
              Away from the editor I shoot photo and film as{" "}
              <span className="text-ink">SHOTBYGAFAR</span> — that side lives in
              the{" "}
              <a className="link" href="/cinema">
                cinema
              </a>
              , with my LUTs and presets in the{" "}
              <a className="link" href="/cinema/shop">
                shop
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            {...softRise(0.1)}
            className="mt-7 flex flex-wrap items-center gap-2"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-85 sm:text-[14px]"
            >
              <Mail aria-hidden className="h-[15px] w-[15px]" />
              Email me
            </a>
            <a
              href={RESUME_PDF}
              download="Gafar_Aleshe_Resume.pdf"
              className="flex items-center gap-1.5 rounded-lg border border-ink/15 bg-tile px-3.5 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-tile-hover sm:text-[14px]"
            >
              <Download aria-hidden className="h-[15px] w-[15px]" />
              Résumé
            </a>
            <OpenToWork />
          </motion.div>
        </header>

        <div className="mt-12 space-y-12">
          {/* ── Activity: the GitHub contribution grid ── */}
          <Section id="activity" title="Activity">
            <GitHubActivity />
          </Section>

          <Experience />

          {/* ── Skills ── */}
          <Section id="skills" title="Skills">
            <dl className="space-y-3">
              {skills.map(([category, items]) => (
                <div
                  key={category}
                  className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <dt className="w-28 shrink-0 text-[13px] text-ink-muted sm:text-[13.5px]">
                    {category}
                  </dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-2">
                    {items.map(item => (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 text-[13px] text-ink-dim sm:text-[14px]"
                      >
                        <SkillIcon name={item} className="size-[15px]" />
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* ── Selected work ── */}
          <Section
            id="work"
            title="Selected work"
            action={
              <a
                href={`${GITHUB_URL}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
              >
                All repos
                <span
                  aria-hidden
                  className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            }
          >
            <WorkGrid items={work} />
          </Section>

          {/* ── Education ── */}
          <Section id="education" title="Education">
            <NumberedList items={education} />
          </Section>

          <Section id="certifications" title="Certifications">
            <NumberedList items={certifications} />
          </Section>

          {/* ── Instagram ── */}
          <Section
            id="instagram"
            title="Instagram"
            action={
              <a
                href={INSTAGRAM_PROFILE.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink sm:text-[13.5px]"
              >
                {INSTAGRAM_PROFILE.handle}
                <span
                  aria-hidden
                  className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            }
          >
            <InstagramFeed />
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
        <div className="mt-6 flex items-center justify-between px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Portsmouth, United Kingdom
          </p>
          <a
            href="/links"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            All Links →
          </a>
        </div>
      </div>
    </div>
  );
}
