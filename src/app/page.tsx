"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const projects = [
  {
    title: "Internal Workflow & Task Management System",
    description:
      "Full-stack task management app with JWT auth, REST APIs, and PostgreSQL. Built with React, Next.js, Node.js, and deployed via Docker.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    href: "https://github.com/gafitenison",
    icon: "🗂️",
  },
  {
    title: "TaskFlow – Full-Stack Task Management",
    description:
      "React frontend with ASP.NET Core backend. JWT authentication, Entity Framework Core, and SQL Server.",
    tags: ["React", "ASP.NET Core", "SQL Server", "JWT"],
    href: "https://github.com/gafitenison",
    icon: "✅",
  },
  {
    title: "Inventory & Order Management API",
    description:
      "Backend API in C# and ASP.NET Core managing products, orders, and users with CRUD, relationships, and unit tests.",
    tags: ["C#", "ASP.NET Core", "SQL Server"],
    href: "https://github.com/gafitenison",
    icon: "📦",
  },
  {
    title: "Sales & Stock Control System",
    description:
      "Menu-driven sales and inventory system with SQLite, relational schema, reorder reports, and receipt generation.",
    tags: ["Python", "SQLite"],
    href: "https://github.com/gafitenison",
    icon: "📊",
  },
];

const titles = [
  "Software Engineer",
  "Creative Developer",
  "Founder",
  "Full-Stack Dev",
  "UI Enthusiast",
];

const stack = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C#"] },
  { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Bootstrap"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { category: "Databases", items: ["PostgreSQL", "SQL Server", "MongoDB", "SQLite"] },
  { category: "Tools", items: ["Git", "Docker", "CI/CD", "JIRA"] },
  { category: "Design", items: ["Photoshop", "Illustrator", "Premiere Pro", "Canva"] },
];

function InlineIcon({ emoji }: { emoji: string }) {
  return <span className="inline-icon-emoji">{emoji}</span>;
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Rotating nav subtitle
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTitleIndex((i) => (i + 1) % titles.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main className="main">
      {/* Nav */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          Gafar Aleshe
          <span className="nav-title" style={{ opacity: fade ? 1 : 0 }}>
            {titles[titleIndex]}
          </span>
        </Link>
        <nav className="nav-center">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#connect">Connect</a></li>
            <li><Link href="/links">Links</Link></li>
          </ul>
        </nav>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div className="content">

        {/* ── Hero ── */}
        <section className="hero" id="about">

          <div className="availability anim" style={{ animationDelay: "0.05s" }}>
            <span className="availability-dot" />
            <span>Open to work</span>
          </div>

          <h1 className="hero-name anim" style={{ animationDelay: "0.12s" }}>
            Hi, I&apos;m <em>Gafar Aleshe</em> —<br />
            Software Engineer &amp;<br />
            Creative Developer
          </h1>

          <div className="hero-roles anim" style={{ animationDelay: "0.20s" }}>
            <span className="role-pill">Software Engineer</span>
            <span className="role-dot">•</span>
            <span className="role-pill">Creative Developer</span>
            <span className="role-dot">•</span>
            <span className="role-pill">Founder</span>
          </div>

          <p className="body-text anim" style={{ animationDelay: "0.28s" }}>
            I build full-stack web applications using{" "}
            <InlineIcon emoji="⚛️" /> React,{" "}
            <InlineIcon emoji="▲" /> Next.js, and{" "}
            <InlineIcon emoji="🟢" /> Node.js — and I&apos;ve shipped{" "}
            <strong>25+ live websites</strong> for real clients.
            Currently studying Computer Science at{" "}
            <InlineIcon emoji="🎓" /> University of Essex and looking
            for internship or junior developer roles.
          </p>
        </section>

        {/* Divider */}
        <div className="section-divider anim-fade" style={{ animationDelay: "0.36s" }} />

        {/* ── Projects ── */}
        <section className="section" id="projects">
          <h2 className="section-label anim" style={{ animationDelay: "0.42s" }}>
            Projects
          </h2>
          <div className="project-list">
            {projects.map((p, i) => (
              <a
                key={p.title}
                href={p.href}
                className="project-card anim"
                target="_blank"
                rel="noreferrer"
                style={{ animationDelay: `${0.48 + i * 0.08}s` }}
              >
                <div className="project-header">
                  <span className="project-title">
                    <span className="project-icon">{p.icon}</span>
                    {p.title}
                  </span>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Stack ── */}
        <section className="section" id="stack">
          <h2 className="section-label anim" style={{ animationDelay: "0.82s" }}>
            Stack
          </h2>
          <div className="stack-grid">
            {stack.map((s, i) => (
              <div
                key={s.category}
                className="stack-group anim"
                style={{ animationDelay: `${0.88 + i * 0.06}s` }}
              >
                <h3 className="stack-category">{s.category}</h3>
                <ul className="stack-items">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="section" id="experience">
          <h2 className="section-label anim" style={{ animationDelay: "1.26s" }}>
            Experience
          </h2>
          <div className="exp-block anim" style={{ animationDelay: "1.32s" }}>
            <div className="exp-header">
              <div className="exp-left">
                <span className="exp-company">
                  <InlineIcon emoji="💻" /> Fronttoback Development
                </span>
                <span className="exp-role">Web Developer</span>
              </div>
              <span className="exp-date">Dec 2022 – Present</span>
            </div>
            <p className="body-text">
              Built and deployed 25+ responsive websites using JavaScript, HTML, CSS, and WordPress.
              Implemented e-commerce and SEO features. Managed hosting environments and collaborated
              with teams via Slack and Trello.
            </p>
          </div>
        </section>

        {/* ── Businesses ── */}
        <section className="section" id="businesses">
          <h2 className="section-label anim" style={{ animationDelay: "1.38s" }}>
            Businesses
          </h2>
          <div className="businesses-grid">
            <a
              href="https://gaffystudios.com"
              target="_blank"
              rel="noreferrer"
              className="biz-card anim"
              style={{ "--accent": "#c0ff72", animationDelay: "1.44s" } as React.CSSProperties}
            >
              <div className="biz-card-top">
                <span className="biz-card-title">Gaffy Studios</span>
                <span className="biz-card-arrow">↗</span>
              </div>
              <p className="biz-card-desc">Branding, products &amp; cinematic studio work</p>
            </a>
            <a
              href="https://shotbygafar.com"
              target="_blank"
              rel="noreferrer"
              className="biz-card anim"
              style={{ "--accent": "#72c8ff", animationDelay: "1.52s" } as React.CSSProperties}
            >
              <div className="biz-card-top">
                <span className="biz-card-title">ShotByGafar</span>
                <span className="biz-card-arrow">↗</span>
              </div>
              <p className="biz-card-desc">Commercial photography &amp; videography for brands</p>
            </a>
          </div>
        </section>

        {/* ── Connect ── */}
        <section className="section" id="connect">
          <h2 className="section-label anim" style={{ animationDelay: "1.60s" }}>
            Connect
          </h2>
          <div className="connect-block anim" style={{ animationDelay: "1.66s" }}>
            <div>
              <h3>Let&apos;s build something.</h3>
              <p>
                <a href="mailto:info@gafaraleshe.com" className="link">
                  info@gafaraleshe.com
                </a>
              </p>
              <p style={{ marginTop: "6px" }}>
                <span className="body-text">London, UK · Available for freelance &amp; full-time roles</span>
              </p>
            </div>
            <div className="connect-links">
              <a
                href="https://github.com/gafitenison"
                target="_blank"
                rel="noreferrer"
                className="connect-item"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/gafaraleshe/"
                target="_blank"
                rel="noreferrer"
                className="connect-item"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer anim-fade" style={{ animationDelay: "1.74s" }}>
          <span className="footer-copy">© {new Date().getFullYear()} Gafar Aleshe</span>
          <Link href="/links" className="footer-link">Links →</Link>
        </footer>

      </div>
    </main>
  );
}
