"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ScrollableNavProps {
  dark: boolean;
  onThemeToggle: () => void;
  titleIndex: number;
  fade: boolean;
}

export default function ScrollableNav({
  dark,
  onThemeToggle,
  titleIndex,
  fade,
}: ScrollableNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Trigger pill box when scrolled more than 50px
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titles = [
    "Software Engineer",
    "Creative Developer",
    "Founder",
    "Full-Stack Dev",
    "UI Enthusiast",
  ];

  return (
    <nav
      className={`nav scrollable-nav ${isScrolled ? "scrolled" : ""}`}
      style={{
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="nav-center-wrapper">
        <Link href="/" className="nav-brand">
          Gafar Aleshe
          {!isScrolled && (
            <span
              className="nav-title"
              style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease" }}
            >
              {titles[titleIndex]}
            </span>
          )}
        </Link>

        <div className="nav-center">
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#stack">Stack</a>
            </li>
            <li>
              <a href="#connect">Connect</a>
            </li>
            <li>
              <Link href="/links">Links</Link>
            </li>
          </ul>
        </div>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
