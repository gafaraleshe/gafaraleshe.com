/*
 * Design: Ethereal Open Canvas — Links page
 * Clean white linktree-style page with social links and featured items
 */

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Globe,
  Camera,
  ArrowLeft,
} from "lucide-react";

const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663479557356/Wfm9Zj6GfSKo3RJW9fde2i/gafar_face_8473d35c.jpg";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/gafaraleshe",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gafaraleshe/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:gafaraleshe2411@gmail.com",
    icon: Mail,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/shotbygafar",
    icon: Instagram,
  },
];

const features = [
  {
    title: "Portfolio Website",
    description: "View my full CV and project portfolio",
    href: "/",
    icon: Globe,
  },
  {
    title: "SHOTBYGAFAR",
    description: "Professional photography & videography",
    href: "https://instagram.com/shotbygafar",
    icon: Camera,
  },
  {
    title: "InvoiceFlow API",
    description: "Freelance billing service — Node.js, PostgreSQL, Docker",
    href: "https://github.com/gafaraleshe/InvoiceFlow",
    icon: Github,
  },
  {
    title: "Gaffy Studios",
    description: "Creative studio website — React, Next.js 15, TypeScript",
    href: "https://github.com/gafaraleshe/gaffystudios",
    icon: Globe,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Links() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      {/* Back link */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="self-start max-w-md w-full mx-auto mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to portfolio
      </motion.a>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <img
          src={PROFILE_IMG}
          alt="Gafar Aleshe"
          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-lg mb-4"
        />
        <h1 className="font-serif text-2xl tracking-tight text-foreground">
          Gafar Aleshe
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Software Engineer · Creative Director · Portsmouth, UK
        </p>
      </motion.div>

      {/* Social icons */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3 mb-10"
      >
        {socials.map((s) => (
          <motion.a
            key={s.label}
            variants={item}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-black/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-black/[0.2] hover:bg-black/[0.02] transition-all"
            title={s.label}
          >
            <s.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-3"
      >
        {features.map((f) => (
          <motion.a
            key={f.title}
            variants={item}
            href={f.href}
            target={f.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.06] bg-white hover:border-black/[0.12] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#fafaf8] flex items-center justify-center flex-shrink-0 group-hover:bg-black/[0.04] transition-colors">
              <f.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {f.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {f.description}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-xs text-muted-foreground"
      >
        © {new Date().getFullYear()} Gafar Aleshe
      </motion.p>
    </div>
  );
}
