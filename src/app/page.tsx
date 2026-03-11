"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedBackground from "./components/AnimatedBackground";

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
      <AnimatedBackground />
      <nav className="nav">
        <Link href="/" className="nav-brand">
          Gafar Aleshe
          <span className="nav-title nav-carousel" style={{ opacity: fade ? 1 : 0 }}>
            {titles[titleIndex]}
          </span>
        </Link>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#connect">Connect</a></li>
            <li><Link href="/links">Links</Link></li>
          </ul>
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <div className="content">
        {/* Hero */}
        <section className="hero" id="about">
          <div className="avatar-wrap">
            <div className="avatar-initials">GA</div>
          </div>

          <p className="hero-intro">
            Hi, I&apos;m <span className="hero-name">Gafar Aleshe</span>
          </p>

          <p className="hero-roles">
            <span className="role-pill">Software Engineer</span>
            <span className="role-dot">•</span>
            <span className="role-pill">Creative Developer</span>
            <span className="role-dot">•</span>
            <span className="role-pill">Founder</span>
          </p>

          <div className="section">
            <p className="body-text">
              I build full-stack web applications using{" "}
              <InlineIcon emoji="⚛️" /> React,{" "}
              <InlineIcon emoji="▲" /> Next.js, and{" "}
              <InlineIcon emoji="🟢" /> Node.js — and I&apos;ve shipped{" "}
              <strong>25+ live websites</strong> for real clients.
              Currently studying Computer Science at{" "}
              <InlineIcon emoji="🎓" /> University of Essex and looking
              for internship or junior developer roles.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="section" id="projects">
          <h2 className="section-label">Projects</h2>
          <div className="project-list">
            {projects.map((p) => (
              <a key={p.title} href={p.href} className="project-card" target="_blank" rel="noreferrer">
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

        {/* Stack */}
        <section className="section" id="stack">
          <h2 className="section-label">Stack</h2>
          <div className="stack-grid">
            {stack.map((s) => (
              <div key={s.category} className="stack-group">
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

        {/* Experience */}
        <section className="section" id="experience">
          <h2 className="section-label">Experience</h2>
          <div className="exp-list">
            <div className="exp-item">
              <div className="exp-left">
                <span className="exp-company">
                  <InlineIcon emoji="💻" /> Fronttoback Development
                </span>
                <span className="exp-role">Web Developer</span>
              </div>
              <span className="exp-date">Dec 2022 – Present</span>
            </div>
            <p className="body-text exp-desc">
              Built and deployed 25+ responsive websites using JavaScript, HTML, CSS, and WordPress.
              Implemented e-commerce and SEO features. Managed hosting environments and collaborated
              with teams via Slack and Trello.
            </p>
          </div>
        </section>

        {/* Connect */}
        <section className="section" id="connect">
          <h2 className="section-label">Connect</h2>
          <p className="body-text">
            Reach me at{" "}
            <a href="mailto:gafaraleshe2411@gmail.com" className="link">
              gafaraleshe2411@gmail.com
            </a>
          </p>
          <div className="connect-links">
            <a href="https://github.com/gafitenison" target="_blank" rel="noreferrer" className="connect-item">
              <InlineIcon emoji="🐙" /> GitHub <span className="arrow">↗</span>
            </a>
            <a href="https://linkedin.com/in/gafaraleshe/" target="_blank" rel="noreferrer" className="connect-item">
              <InlineIcon emoji="💼" /> LinkedIn <span className="arrow">↗</span>
            </a>
          </div>
          <div style={{ marginTop: "16px" }}>
          
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Gafar Aleshe</p>
        </footer>
      </div>
    </main>
  );
}