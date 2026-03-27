'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DotGrid from "./components/DotGrid";
import ScrollableNav from "./components/ScrollableNav";
import Magnet from "./components/Magnet";
import BlurText from "./components/BlurText";

const projects = [
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
  {
    title: "Real-Time Chat Application",
    description:
      "WebSocket-based chat app with real-time messaging, user authentication, and persistent message history using MongoDB.",
    tags: ["Node.js", "Socket.io", "React", "MongoDB", "Express"],
    href: "https://github.com/gafitenison",
    icon: "💬",
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

export default function Home() {
  const [dark, setDark] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Dot grid colors based on theme
  const dotGridColors = dark
    ? { baseColor: '#ffffff', activeColor: '#1a6fff' }
    : { baseColor: '#000000', activeColor: '#1a6fff' };

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
      {/* Interactive dot grid */}
      <DotGrid
        dotSize={8}
        gap={40}
        baseColor={dotGridColors.baseColor}
        activeColor={dotGridColors.activeColor}
        proximity={120}
        speedTrigger={80}
        shockRadius={200}
        shockStrength={4}
        maxSpeed={3000}
        resistance={600}
        returnDuration={1.2}
      />

      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Navigation */}
      <ScrollableNav
        dark={dark}
        onThemeToggle={() => setDark(!dark)}
        titleIndex={titleIndex}
        fade={fade}
      />

      {/* Content */}
      <div className="content">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-content"
          >
            <div className="hero-image">
              <Image
                src="/gafar_face.jpg"
                alt="Gafar Aleshe"
                width={120}
                height={120}
                className="profile-img"
                priority
              />
            </div>

            <BlurText
              text="Creative developer & designer"
              className="hero-title"
              animateBy="words"
              delay={0.3}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hero-subtitle"
            >
              I build full-stack web applications using React, Next.js, and Node.js — and I have shipped 25+ live websites for real clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hero-cta"
            >
              <Magnet padding={60} magnetStrength={3}>
                <a href="#projects" className="cta-button">
                  View My Work
                </a>
              </Magnet>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="projects-section" id="projects">
          <BlurText text="Featured Projects" animateBy="words" className="section-title" />

          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="project-card"
              >
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Stack Section */}
        <section className="stack-section" id="stack">
          <BlurText text="Tech Stack" animateBy="words" className="section-title" />

          <div className="stack-grid">
            {stack.map((s, i) => (
              <motion.div
                key={s.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="stack-group"
              >
                <h3 className="stack-category">{s.category}</h3>
                <ul className="stack-items">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2 className="cta-title">
              <BlurText text="Let's build something amazing together." animateBy="words" />
            </h2>
            <p className="cta-description">
              I am always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <Magnet padding={60} magnetStrength={3}>
              <a href="mailto:info@gafaraleshe.com" className="cta-button primary">
                Get in Touch
              </a>
            </Magnet>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="footer-content"
          >
            <p>© {new Date().getFullYear()} Gafar Aleshe. All rights reserved.</p>
            <Link href="/links" className="footer-link">View All Links →</Link>
          </motion.div>
        </footer>
      </div>
    </main>
  );
}
