
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("newsletter-dismissed")) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  function closePopup() {
    setIsOpen(false);
    localStorage.setItem("newsletter-dismissed", "true");
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closePopup();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close newsletter popup"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/10 bg-white text-neutral-900 shadow-md transition-transform hover:scale-105"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 id="newsletter-popup-title" className="sr-only">
          Subscribe to the newsletter
        </h2>

        <NewsletterForm />
      </div>
    </div>
  );
}