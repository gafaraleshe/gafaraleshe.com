"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./links.css";
import DotGrid from "../components/DotGrid";

const socials = [
  { label: "Instagram", handle: "@gafaraleshe", href: "https://instagram.com/gafaraleshe", emoji: "📸", color: "#E1306C" },
  { label: "X / Twitter", handle: "@GafarAleshe", href: "https://x.com/GafarAleshe", emoji: "𝕏", color: "#ffffff" },
  { label: "TikTok", handle: "@gafaraleshe", href: "https://tiktok.com/@gafaraleshe", emoji: "🎵", color: "#69C9D0" },
  { label: "YouTube", handle: "@gafaraleshe", href: "https://www.youtube.com/@gafaraleshe", emoji: "▶", color: "#FF0000" },
  { label: "Twitch", handle: "@gafitenison", href: "https://twitch.tv/gafitenison", emoji: "🟣", color: "#9146FF" },
  { label: "Snapchat", handle: "@gafaraleshe", href: "https://www.snapchat.com/add/gafaraleshe", emoji: "👻", color: "#FFFC00" },
  { label: "Discord", handle: "Join server", href: "https://discord.gg/UeuVcW6J5G", emoji: "💬", color: "#5865F2" },
  { label: "Facebook", handle: "Gafar Aleshe", href: "https://www.facebook.com/profile.php?id=61577047186240", emoji: "👤", color: "#1877F2" },
];

const features = [
  {
    label: "Subscribe on YouTube",
    description: "Tech tips, reviews, unboxing, tutorials & lifestyle vlogs",
    href: "http://youtube.com/@gafaraleshe?sub_confirmation=1",
    emoji: "🔔",
    accent: "#FF0000",
    featured: true,
  },
  {
    label: "SHOTBYGAFAR",
    description: "Photography portfolio",
    href: "http://shotbygafar.com",
    emoji: "📷",
    accent: "#e8e8e8",
    featured: false,
  },
  {
    label: "Amazon Prime Student — 6 Month Trial",
    description: "Get the student deal via my link",
    href: "http://www.amazon.co.uk/joinstudent?tag=gafaraleshe08-21",
    emoji: "🎓",
    accent: "#FF9900",
    featured: false,
  },
  {
    label: "My PC Build Parts",
    description: "Full parts list on kit.co",
    href: "https://kit.co/gafaraleshe/pc-build",
    emoji: "🖥️",
    accent: "#00d4ff",
    featured: false,
  },
  {
    label: "Dehancer — Use code GAFAR10",
    description: "10% off film-like color grading tools",
    href: "https://www.dehancer.com/shop",
    emoji: "🎞️",
    accent: "#c8a96e",
    featured: false,
  },
  {
    label: "Hostinger UK — Discount Link",
    description: "Web hosting deal via my referral",
    href: "https://hostinger.co.uk?referralcode=wjkgafararb2",
    emoji: "🌐",
    accent: "#673DE6",
    featured: false,
  },
  {
    label: "Email Me",
    description: "info@gafaraleshe.com",
    href: "mailto:info@gafaraleshe.com",
    emoji: "✉️",
    accent: "#e8e8e8",
    featured: false,
  },
];

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  // Dot grid colors based on theme
  const dotGridColors = dark
    ? { baseColor: '#ffffff', activeColor: '#1a6fff' }
    : { baseColor: '#000000', activeColor: '#1a6fff' };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="links-page">
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
      <div className="orb orb-3" />

      <div className="links-container">
        {/* Top row: back link + theme toggle */}
        <div className="links-topbar">
          <Link href="/" className="back-link">
            ← gafaraleshe.com
          </Link>
          <button
            className="links-theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Avatar & header */}
        <header className={`links-header ${mounted ? "visible" : ""}`}>
          <div className="links-avatar"><img src="/gafar_face.jpg" alt="Gafar Aleshe" className="avatar-img" /></div>
          <h1 className="links-name">Gafar Aleshe</h1>
          <p className="links-bio">
            Code, content &amp; curated moments —<br />building apps, crafting stories.
          </p>

          {/* Social icon row */}
          <div className="social-row">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-dot"
                title={s.label}
                style={{ "--dot-color": s.color } as React.CSSProperties}
              >
                <span>{s.emoji}</span>
              </a>
            ))}
          </div>
        </header>

        {/* Feature links */}
        <div className="feature-links">
          {features.map((f, i) => (
            <a
              key={f.label}
              href={f.href}
              target={f.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer"
              className={`feature-card ${f.featured ? "featured-card" : ""} ${mounted ? "visible" : ""}`}
              style={{
                animationDelay: `${i * 60}ms`,
                "--accent": f.accent,
              } as React.CSSProperties}
            >
              <span className="feature-emoji">{f.emoji}</span>
              <div className="feature-text">
                <span className="feature-label">{f.label}</span>
                {f.description && (
                  <span className="feature-desc">{f.description}</span>
                )}
              </div>
              <span className="feature-arrow">↗</span>
            </a>
          ))}
        </div>

        <footer className="links-footer">
          © {new Date().getFullYear()} Gafar Aleshe
        </footer>
      </div>
    </div>
  );
}
