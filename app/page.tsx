"use client";

/*
 * Home — same index-card / filing aesthetic as the Links page.
 * Green graph-paper canvas, dotted paper cards, mono labels, display headings.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  NameReveal,
  Reveal,
  chipPop,
  clipDrop,
  fadeIn,
  flipIn,
  heroRise,
  photoHover,
  hoverPop,
  rise,
  riseInView,
  tapePop,
} from "@/components/motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Paperclip,
  Phone,
} from "lucide-react";
import { InstagramFeed } from "@/components/InstagramFeed";

const PROFILE_IMG = "/assets/gafar-profile.jpg";
const RESUME_PDF = "/assets/Gafar_Aleshe_Resume.pdf";

const EMAIL = "gafaraleshe2411@gmail.com";
const PHONE = "+44 7882 655541";
const PHONE_HREF = "tel:+447882655541";
const GITHUB_URL = "https://www.github.com/gafaraleshe";
const LINKEDIN_URL = "https://www.linkedin.com/in/gafaraleshe/";

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// ── Data ──
const roles = [
  "Software Engineer",
  "Full-Stack Development",
  "Frontend Development",
];

const experience = [
  {
    role: "Frontend Developer & Creative Director",
    company: "FrontToBack Development",
    companyHref: "https://fronttobackdev.com/",
    location: "Portsmouth, UK",
    period: "Dec 2022 – Present",
    bullets: [
      "Built and deployed 25+ responsive websites and web applications using JavaScript, HTML, CSS, PHP and WordPress, translating client requirements into production-ready user interfaces.",
      "Developed responsive, mobile-first interfaces with reusable components, semantic HTML, accessible forms and cross-browser compatibility, improving usability across devices.",
      "Implemented e-commerce functionality and SEO integrations using WooCommerce and Yoast, contributing to 3.2× lead growth while maintaining 98% client retention.",
      "Collaborated with clients and team members through Slack and Trello, gathering requirements, managing development tasks and delivering projects against deadlines.",
      "Led digital content and web strategy across client projects, contributing to growth of 13K+ Instagram and 70K+ TikTok followers and generating 10M+ views.",
    ],
  },
  {
    role: "Founder & Creative Director",
    company: "SHOTBYGAFAR",
    companyHref: "https://shotbygafar.com",
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
    title: "Hermite Labs",
    subtitle: "Full-Stack SaaS Platform for Creative Businesses",
    bullets: [
      "Architected and built a multi-product SaaS platform using TypeScript, React, Next.js and Python, structured as a monorepo spanning web, backend, API and desktop components.",
      "Developed HermiteFlow, a CRM and invoicing application supporting client management, invoice generation, business workflows and automated UK VAT calculations.",
      "Built reusable, responsive UI components with semantic HTML, accessible forms, keyboard navigation, visible focus states and WCAG-aligned design patterns.",
      "Implemented type-safe API workflows, authentication, role-based access control and validated data handling across shared platform services.",
      "Integrated Jest, Cypress and axe-core for automated testing and accessibility regression detection, complemented by manual keyboard and VoiceOver testing.",
    ],
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "Jest",
      "Cypress",
      "axe-core",
    ],
    links: [
      { label: "hermitelabs.com", href: "https://hermitelabs.com" },
      { label: "flow.hermitelabs.com", href: "https://flow.hermitelabs.com" },
    ],
  },
];

const education = [
  {
    school: "University of Essex Online",
    degree: "BSc Computer Science",
    period: "Expected Graduation: 2028",
    modules:
      "Data Structures & Algorithms, Object-Oriented Programming, Web Application Development, Data Modelling",
  },
  {
    school: "Havant and South Downs College",
    degree: "A Levels: Computer Science, Mathematics, Further Maths",
    period: "Sept 2023 – Jul 2025",
    modules: "",
  },
];

const certifications = [
  "CS50x: Introduction to Computer Science — HarvardX (edX)",
  "Full-Stack Web Development Bootcamp & Python Pro Bootcamp — Dr Angela Yu",
  "AWS Cloud Practitioner Essentials — AWS (edX)",
  "AWS Educate: Introduction to Generative AI",
];

const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python"],
  Frontend: [
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
  Backend: ["Node.js", "REST APIs", "JWT", "OAuth 2.0", "WebAuthn"],
  Data: ["PostgreSQL", "MongoDB", "SQL", "Drizzle ORM", "Zod"],
  "DevOps & Testing": [
    "AWS",
    "Docker",
    "Git",
    "GitHub Actions",
    "CI/CD",
    "Jest",
    "Cypress",
    "TDD",
  ],
  Accessibility: [
    "Semantic HTML",
    "WCAG",
    "ARIA",
    "Keyboard Accessibility",
    "Screen Readers",
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
      <motion.header
        {...fadeIn(0.15)}
        className="mx-auto mb-8 flex max-w-2xl items-center justify-between sm:mb-10"
      >
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white">
          <NameReveal
            lines={["Gafar Aleshe"]}
            delay={1.3}
            stagger={0.04}
            blur={4}
          />
        </span>
        <div className="flex items-center gap-1">
          <a
            href="/shop"
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
          >
            Shop
          </a>
          <a
            href="/links"
            className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
          >
            Links ↗
          </a>
        </div>
      </motion.header>

      <main className="mx-auto max-w-2xl pb-14">
        {/* ── Identity card ── */}
        <motion.div
          {...heroRise}
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <CornerMarks />
          <motion.span
            {...tapePop(-3, 0.9)}
            className="pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 bg-stone-300/50 shadow-sm"
          />
          <motion.span
            {...tapePop(-12, 1.05)}
            className="pointer-events-none absolute -left-4 top-1/3 h-6 w-16 bg-emerald-300/30 shadow-sm"
          />
          <motion.span
            {...tapePop(6, 1.2)}
            className="pointer-events-none absolute -right-3 bottom-12 h-6 w-16 bg-amber-200/40 shadow-sm"
          />

          <div className="flex items-start justify-between gap-4">
            <motion.div {...rise(0.35)} className="pt-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Name:
              </p>
              <h1 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-neutral-900 sm:text-6xl">
                <NameReveal lines={["Gafar", "Aleshe"]} />
              </h1>
              <p className="mt-3 font-mono text-[13px] text-neutral-600">
                <TypewriterText words={roles} />
              </p>
            </motion.div>

            <motion.div
              {...flipIn(0.7)}
              {...photoHover}
              className="group relative w-28 shrink-0 sm:w-36"
            >
              <motion.span
                {...clipDrop(1.35)}
                className="absolute -top-3 right-4 z-10"
              >
                <Paperclip
                  className="h-7 w-7 -rotate-[20deg] text-neutral-400"
                  strokeWidth={1.5}
                />
              </motion.span>
              <div className="overflow-hidden rounded-sm border border-neutral-900/10 bg-white shadow-sm">
                <img
                  src={PROFILE_IMG}
                  alt="Gafar Aleshe"
                  className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
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
            </motion.div>
          </div>

          <motion.p
            {...rise(0.5)}
            className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700"
          >
            Software engineer working across full-stack and frontend
            development. I build accessible, type-safe web applications with
            TypeScript, React, Next.js and Node.js — 25+ responsive sites and
            apps shipped.
          </motion.p>

          <motion.div {...rise(0.65)} className="mt-6 flex flex-wrap gap-2">
            <motion.a
              {...hoverPop}
              href="#experience"
              className="rounded-md bg-neutral-900 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              View Work
            </motion.a>
            <motion.a
              {...hoverPop}
              href={`mailto:${EMAIL}`}
              className="rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Email
            </motion.a>
            <motion.a
              {...hoverPop}
              href={RESUME_PDF}
              download="Gafar_Aleshe_Resume.pdf"
              className="flex items-center gap-1.5 rounded-md border border-neutral-900/20 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            {...rise(0.8)}
            className="mt-8 flex items-center justify-between border-t border-dashed border-neutral-900/15 pt-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Portsmouth, United Kingdom
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Made with <span className="text-red-500">♥</span>
            </p>
          </motion.div>
        </motion.div>

        {/* ── Experience ── */}
        <SectionCard
          id="experience"
          label="Experience:"
          title="Where I've worked"
        >
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                {...riseInView(i * 0.12)}
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
                      <a
                        href={exp.companyHref}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-neutral-900/20 underline-offset-2 transition-colors hover:text-neutral-900"
                      >
                        {exp.company}
                      </a>{" "}
                      · {exp.location}
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
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ── Projects ── */}
        <SectionCard id="projects" label="Projects:" title="Things I've built">
          <div className="space-y-3">
            {projects.map((p, i) => (
              <motion.div
                {...riseInView(i * 0.1)}
                key={p.title}
                className="rounded-md border border-neutral-900/10 bg-white p-5 shadow-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Project
                </p>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {p.title}
                </h3>
                <p className="font-mono text-[11px] text-neutral-500">
                  {p.subtitle}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {p.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="relative pl-4 font-mono text-[12px] leading-relaxed text-neutral-600 before:absolute before:left-0 before:text-neutral-400 before:content-['→']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.map(link => (
                    <motion.a
                      {...hoverPop}
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-md border border-neutral-900/20 px-3 py-1.5 font-mono text-[11px] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ── Education ── */}
        <SectionCard
          id="education"
          label="Education:"
          title="Academic background"
        >
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div {...riseInView(i * 0.12)} key={edu.school}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {edu.school}
                    </h3>
                    <p className="font-mono text-[12px] text-neutral-500">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="text-right font-mono text-[10px] uppercase tracking-wide text-neutral-400">
                    {edu.period}
                  </span>
                </div>
                {edu.modules && (
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-neutral-500">
                    Modules: {edu.modules}
                  </p>
                )}
              </motion.div>
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
                  {items.map((item, i) => (
                    <motion.span
                      {...chipPop(i * 0.04)}
                      key={item}
                      className="rounded-md border border-neutral-900/15 bg-white px-2.5 py-1 font-mono text-[11px] text-neutral-700"
                    >
                      {item}
                    </motion.span>
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
          <dl className="mt-5 space-y-2 border-t border-dashed border-neutral-900/15 pt-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Email
              </dt>
              <dd className="font-mono text-[12px] text-neutral-700">
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline decoration-neutral-900/20 underline-offset-2 transition-colors hover:text-neutral-900"
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Phone
              </dt>
              <dd className="font-mono text-[12px] text-neutral-700">
                <a
                  href={PHONE_HREF}
                  className="underline decoration-neutral-900/20 underline-offset-2 transition-colors hover:text-neutral-900"
                >
                  {PHONE}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Location
              </dt>
              <dd className="font-mono text-[12px] text-neutral-700">
                Portsmouth, United Kingdom
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <motion.a
              {...hoverPop}
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </motion.a>
            <motion.a
              {...hoverPop}
              href={PHONE_HREF}
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Phone className="h-4 w-4" />
              Call
            </motion.a>
            <motion.a
              {...hoverPop}
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Github className="h-4 w-4" />
              GitHub
            </motion.a>
            <motion.a
              {...hoverPop}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-neutral-900/20 bg-white px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </motion.a>
          </div>
        </SectionCard>

        {/* ── Instagram embed ── */}
        <Reveal>
          <InstagramFeed />
        </Reveal>

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
