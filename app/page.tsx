"use client";

/*
 * Home — same index-card / filing aesthetic as the Links page.
 * Green graph-paper canvas, dotted paper cards, mono labels, display headings.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Paperclip,
} from "lucide-react";

const PROFILE_IMG = "/assets/gafar-profile.jpg";
const RESUME_PDF = "/assets/Gafar_Aleshe_Resume.pdf";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// ── Data ──
const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Creative Director",
  "UI Enthusiast",
  "Founder",
];

const experience = [
  {
    role: "Web Developer & Creative Director",
    company: "Fronttoback Development",
    location: "Portsmouth, UK",
    period: "Dec 2022 – Present",
    bullets: [
      "Built and deployed 25+ responsive websites using JavaScript, HTML, CSS, WordPress and modern web tools.",
      "Implemented e-commerce and SEO features (WooCommerce, Yoast) contributing to 3.2× lead growth and 98% client retention.",
      "Directed social media content strategy, scaling Instagram to 13K+ and TikTok to 70K+ followers with 10M+ views.",
    ],
  },
  {
    role: "Founder & Creative Director",
    company: "SHOTBYGAFAR",
    location: "Portsmouth, UK",
    period: "Aug 2024 – Present",
    bullets: [
      "Professional photography and videography services for brands, events, and businesses — 25+ clients, five-figure revenue.",
      "Managed end-to-end client workflow from briefs to delivery, handling scheduling, contracts, and revisions.",
    ],
  },
];

const projects = [
  {
    title: "InvoiceFlow API",
    subtitle: "Freelance Billing Service",
    description:
      "RESTful API with 15+ endpoints for invoice generation, client management, PDF export, and automated VAT calculation. OAuth 2.0 auth, Zod validation, rate limiting, CI/CD with GitHub Actions, Dockerised.",
    tags: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Docker"],
    href: "https://github.com/gafaraleshe/InvoiceFlow",
  },
  {
    title: "Gaffy Studios",
    subtitle: "Creative Studio Website",
    description:
      "Custom portfolio and e-commerce platform with a design system ensuring consistency across 10+ pages. Integrated Lemon Squeezy API for digital product sales. 95+ Lighthouse score.",
    tags: ["React", "Next.js 15", "TypeScript", "Tailwind CSS v4"],
    href: "https://github.com/gafaraleshe/gaffystudios",
  },
];

const education = [
  {
    school: "University of Essex",
    degree: "BSc Computer Science",
    detail: "Predicted: First Class Honours (80% average)",
    period: "Expected 2028",
    modules:
      "Data Structures & Algorithms, Object-Oriented Programming, Software Engineering, Database Systems, Computer Networks, Computer Security",
  },
  {
    school: "Havant and South Downs College",
    degree: "A Levels",
    detail: "Computer Science, Mathematics, Further Maths",
    period: "Sept 2023 – Jul 2025",
    modules: "",
  },
];

const certifications = [
  "CS50x: Introduction to Computer Science — HarvardX (edX)",
  "AWS Cloud Practitioner Essentials — AWS (edX)",
  "AWS Educate Introduction to Generative AI",
  "Python Pro Bootcamp — Dr Angela Yu",
  "Full-Stack Web Development Bootcamp — Dr Angela Yu",
];

const skills: Record<string, string[]> = {
  "Languages & Frameworks": [
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
  ],
  "Tools & Infrastructure": [
    "PostgreSQL",
    "Supabase",
    "Drizzle ORM",
    "Git",
    "GitHub",
    "Docker",
    "REST APIs",
    "OAuth 2.0",
    "CI/CD",
  ],
};

// ── Typewriter ──
function TypewriterText({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const current = words[wordIndex];
    if (!isDeleting) {
      if (text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else {
        timerRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else if (text.length > 0) {
      setText(current.slice(0, text.length - 1));
    } else {
      setIsDeleting(false);
      setWordIndex(p => (p + 1) % words.length);
    }
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 70;
    timerRef.current = window.setTimeout(tick, speed);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [tick, isDeleting]);

  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-neutral-900"
      />
    </span>
  );
}

// ── Scroll reveal ──
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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

function SectionCard({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section
        id={id}
        className="relative mt-4 scroll-mt-6 rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:px-8 sm:py-9"
        style={DOTTED}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          {label}
        </p>
        <h2 className="mb-6 mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

// ── Page ──
export default function Home() {
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
            href="/links"
            className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
          >
            Links ↗
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Identity card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <CornerMarks />
          <span className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-stone-300/50 shadow-sm" />
          <span className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 -rotate-12 bg-emerald-300/30 shadow-sm" />
          <span className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 rotate-6 bg-amber-200/40 shadow-sm" />

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
              <p className="mt-3 font-mono text-[13px] text-neutral-600">
                <TypewriterText words={roles} />
              </p>
            </div>

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

          <p className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Full-Stack Developer &amp; Creative Director. I build full-stack web
            apps with React, Next.js and Node.js — 25+ live sites shipped — and
            direct creative media that grows audiences.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#experience"
              className="rounded-md bg-neutral-900 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              View Work
            </a>
            <a
              href="mailto:contact@gafaraleshe.com"
              className="rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Email
            </a>
            <a
              href={RESUME_PDF}
              download="Gafar_Aleshe_Resume.pdf"
              className="flex items-center gap-1.5 rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-dashed border-neutral-900/15 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available · Portsmouth, UK
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Made with <span className="text-red-500">♥</span>
            </p>
          </div>
        </motion.div>

        {/* ── Experience ── */}
        <SectionCard
          id="experience"
          label="Experience:"
          title="Where I've worked"
        >
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div
                key={exp.company}
                className={
                  i > 0
                    ? "border-t border-dashed border-neutral-900/15 pt-6"
                    : ""
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-[12px] text-neutral-500">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-neutral-400">
                    {exp.period}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="relative pl-4 font-mono text-[12px] leading-relaxed text-neutral-600 before:absolute before:left-0 before:text-neutral-400 before:content-['→']"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Projects ── */}
        <SectionCard id="projects" label="Projects:" title="Things I've built">
          <div className="space-y-3">
            {projects.map(p => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-md border border-neutral-900/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      Project
                    </p>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[11px] text-neutral-500">
                      {p.subtitle}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-neutral-600">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded border border-neutral-900/15 px-2 py-0.5 font-mono text-[10px] text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-neutral-500">
            CodeSignal coding assessment:{" "}
            <span className="font-semibold text-neutral-900">500 / 600</span>
          </p>
        </SectionCard>

        {/* ── Education ── */}
        <SectionCard
          id="education"
          label="Education:"
          title="Academic background"
        >
          <div className="space-y-6">
            {education.map(edu => (
              <div key={edu.school}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {edu.school}
                    </h3>
                    <p className="font-mono text-[12px] text-neutral-500">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-neutral-400">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[12px] text-neutral-700">
                  {edu.detail}
                </p>
                {edu.modules && (
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-neutral-500">
                    Modules: {edu.modules}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-dashed border-neutral-900/15 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Certifications
            </p>
            <ul className="mt-3 space-y-1.5">
              {certifications.map(cert => (
                <li
                  key={cert}
                  className="relative pl-4 font-mono text-[12px] leading-relaxed text-neutral-600 before:absolute before:left-0 before:text-neutral-400 before:content-['·']"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        {/* ── Skills ── */}
        <SectionCard id="skills" label="Skills:" title="What I work with">
          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span
                      key={item}
                      className="rounded-md border border-neutral-900/15 bg-white px-2.5 py-1 font-mono text-[11px] text-neutral-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Contact ── */}
        <SectionCard
          id="contact"
          label="Contact:"
          title="Let's build something"
        >
          <p className="font-mono text-[12px] leading-relaxed text-neutral-600">
            I'm always open to new opportunities and collaborations. Reach out
            any time.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="mailto:contact@gafaraleshe.com"
              className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href="https://github.com/gafaraleshe"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/gafaraleshe/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </SectionCard>

        {/* ── Footer ── */}
        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            © {new Date().getFullYear()} Gafar Aleshe
          </p>
          <a
            href="/links"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            All Links →
          </a>
        </div>
      </main>
    </div>
  );
}
