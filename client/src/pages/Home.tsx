/*
 * Design: Ethereal Open Canvas
 * - Pure white background, warm gray text, sage green accent
 * - DM Serif Display for hero name, Inter for body, Geist Mono for tags
 * - Generous whitespace, gentle Framer Motion animations
 * - NO heavy canvas/GSAP — lightweight Framer Motion only
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  Download,
} from "lucide-react";

const PROFILE_IMG = "/assets/gafar-profile.jpg";
const HERO_BG = "/assets/hero-abstract.webp";
const SECTION_ACCENT = "/assets/section-accent.webp";
const RESUME_PDF = "/assets/Gafar_Aleshe_Resume.pdf";

// ── Typewriter ──
function TypewriterText({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
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
    } else {
      if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setIsDeleting(false);
        setWordIndex((p) => (p + 1) % words.length);
      }
    }
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 70;
    timerRef.current = window.setTimeout(tick, speed);
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, [tick, isDeleting]);

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[0.9em] ml-0.5 align-middle"
        style={{ backgroundColor: "oklch(0.55 0.06 155)" }}
      />
    </span>
  );
}

// ── Reveal wrapper ──
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Magnet hover ──
function Magnet({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setTx((e.clientX - r.left - r.width / 2) * 0.15);
        setTy((e.clientY - r.top - r.height / 2) * 0.15);
      }}
      onMouseLeave={() => {
        setTx(0);
        setTy(0);
      }}
      style={{
        transform: `translate3d(${tx}px,${ty}px,0)`,
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}

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
  {
    role: "Crew Trainer (Part Time)",
    company: "McDonald's",
    location: "Portsmouth, UK",
    period: "Jul 2023 – Present",
    bullets: [],
  },
  {
    role: "Warehouse Assistant (Seasonal)",
    company: "Amazon",
    location: "Havant, UK",
    period: "Oct 2024 – Jan 2025, Oct 2025 – Jan 2026",
    bullets: [],
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

const skills = {
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

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.04]"
          : "bg-transparent"
      } rounded-full px-6 py-2.5`}
    >
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="font-serif text-base tracking-tight text-foreground whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Gafar Aleshe
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/[0.03]"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="/links"
          className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-black/[0.08] hover:border-black/[0.15] hover:bg-black/[0.02] transition-all text-foreground"
        >
          Links
        </a>
      </div>
    </motion.nav>
  );
}

// ── Main Page ──
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background accent */}
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.035] pointer-events-none select-none"
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Profile image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <img
              src={PROFILE_IMG}
              alt="Gafar Aleshe"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-white shadow-lg"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Gafar Aleshe
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-8"
          >
            <TypewriterText
              words={roles}
              className="text-lg sm:text-xl text-muted-foreground font-light"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10"
          >
            I build full-stack web applications using React, Next.js, and
            Node.js — and I have shipped 25+ live websites for real clients.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Magnet>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
            </Magnet>
            <Magnet>
              <a
                href="mailto:contact@gafaraleshe.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-black/[0.12] rounded-full text-sm font-medium hover:border-black/[0.25] hover:bg-black/[0.02] transition-all"
              >
                Get in Touch
              </a>
            </Magnet>
            <Magnet>
              <a
                href={RESUME_PDF}
                download="Gafar_Aleshe_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-black/[0.12] rounded-full text-sm font-medium hover:border-black/[0.25] hover:bg-black/[0.02] transition-all"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </Magnet>
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          >
            <MapPin className="w-3 h-3" />
            <span>Portsmouth, UK</span>
            <span className="mx-2 text-border">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" className="py-28 sm:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Professional Experience
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-16">
              Where I've worked
            </h2>
          </Reveal>

          <div className="space-y-14">
            {experience.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.08}>
                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap mt-1 sm:mt-0.5">
                      {exp.period}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2 mt-3">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-border"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {i < experience.length - 1 && (
                    <div className="mt-10 h-px bg-border" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-28 sm:py-36 bg-[#fafaf8]">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Featured Projects
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-16">
              Things I've built
            </h2>
          </Reveal>

          <div className="space-y-10">
            {projects.map((proj, i) => (
              <Reveal key={proj.title} delay={i * 0.1}>
                <a
                  href={proj.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block group p-6 sm:p-8 bg-white rounded-xl border border-black/[0.06] hover:border-black/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {proj.subtitle}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-black/[0.03] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* CodeSignal */}
          <Reveal delay={0.2}>
            <div className="mt-12 p-5 rounded-xl border border-black/[0.06] bg-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                Technical Assessment
              </p>
              <p className="text-sm text-foreground">
                CodeSignal coding assessment score:{" "}
                <span className="font-semibold">500 / 600</span> — strong
                problem-solving and data structures knowledge.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" className="py-28 sm:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Education
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-16">
              Academic background
            </h2>
          </Reveal>

          <div className="space-y-12">
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={i * 0.1}>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {edu.school}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mt-1">
                    {edu.detail}
                  </p>
                  {edu.modules && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      <span className="font-medium">Modules:</span>{" "}
                      {edu.modules}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications */}
          <Reveal delay={0.15}>
            <div className="mt-16">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-6">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary before:font-bold"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="py-28 sm:py-36 bg-[#fafaf8]">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Technical Skills
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-16">
              What I work with
            </h2>
          </Reveal>

          <div className="space-y-10">
            {Object.entries(skills).map(([category, items], i) => (
              <Reveal key={category} delay={i * 0.1}>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-3.5 py-2 text-sm bg-white border border-black/[0.06] rounded-lg text-foreground hover:border-black/[0.12] hover:shadow-sm transition-all duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-28 sm:py-36 relative overflow-hidden">
        {/* Subtle accent image */}
        <img
          src={SECTION_ACCENT}
          alt=""
          className="absolute bottom-0 right-0 w-72 opacity-[0.06] pointer-events-none select-none"
        />

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground mb-6">
              Let's build something together.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <Magnet>
                <a
                  href="mailto:contact@gafaraleshe.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>
              </Magnet>
              <Magnet>
                <a
                  href="https://github.com/gafaraleshe"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-black/[0.12] rounded-full text-sm font-medium hover:border-black/[0.25] hover:bg-black/[0.02] transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Magnet>
              <Magnet>
                <a
                  href="https://linkedin.com/in/gafaraleshe/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-black/[0.12] rounded-full text-sm font-medium hover:border-black/[0.25] hover:bg-black/[0.02] transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Magnet>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gafar Aleshe
          </p>
          <a
            href="/links"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All Links →
          </a>
        </div>
      </footer>
    </div>
  );
}
