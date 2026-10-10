import type { Metadata } from "next";
import { CinemaFooter, CinemaHeader } from "@/components/cinema/CinemaChrome";

export const metadata: Metadata = {
  title: "Gafar Aleshe — Cinema",
  description:
    "Film, cinematography, and colour work by Gafar Aleshe (SHOTBYGAFAR). Portsmouth, UK.",
  openGraph: {
    title: "Gafar Aleshe — Cinema",
    description: "Film, cinematography, and colour work. Portsmouth, UK.",
  },
};

export default function CinemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="top" className="cinema-root cinema-grid min-h-screen text-white">
      <CinemaHeader />
      {children}
      <CinemaFooter />
    </div>
  );
}
