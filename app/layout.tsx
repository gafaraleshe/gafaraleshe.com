import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gafar Aleshe — Software Engineer",
  description:
    "Gafar Aleshe — Full-Stack Developer, Creative Director, and Computer Science student. Building web applications with React, Next.js, and Node.js.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Gafar Aleshe — Software Engineer",
    description:
      "Full-Stack Developer & Creative Director based in Portsmouth, UK.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerif.variable} ${geistMono.variable}`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
