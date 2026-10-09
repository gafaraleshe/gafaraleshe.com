/*
 * Cinema project page — centred title and roles over a full-width 16:9
 * player, then a link on to the next project.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  cinemaProjects,
  coverFor,
  embedUrl,
  getCinemaProject,
} from "@/lib/cinema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cinemaProjects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getCinemaProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Gafar Aleshe`,
    description: project.summary ?? project.roles,
  };
}

export default async function CinemaProjectPage({ params }: Params) {
  const project = getCinemaProject((await params).slug);
  if (!project) notFound();

  const index = cinemaProjects.indexOf(project);
  const next = cinemaProjects[(index + 1) % cinemaProjects.length];
  const embed = project.video && embedUrl(project.video);
  const still = coverFor(project);

  return (
    <main className="px-[5%] md:px-[4%]">
      <div className="mx-auto max-w-[1400px]">
        <header className="pb-10 pt-4 text-center md:pb-14">
          <h1 className="font-cine text-[44px] uppercase leading-none tracking-wide sm:text-[64px]">
            {project.title}
          </h1>
          <p className="mt-3 font-cine text-[16px] uppercase tracking-[0.12em] text-white/70 sm:text-[19px]">
            {project.roles} · {project.year}
          </p>
        </header>

        <div className="relative aspect-video w-full overflow-hidden bg-[#191919]">
          {embed ? (
            <iframe
              src={embed}
              title={project.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : still ? (
            <img
              src={still}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cine text-[20px] uppercase tracking-[0.2em] text-white/40">
                Film coming soon
              </span>
            </div>
          )}
        </div>

        {project.summary && (
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-white/75">
            {project.summary}
          </p>
        )}

        <nav className="mt-20 flex items-center justify-between border-t border-white/15 pt-6">
          <a
            href="/cinema"
            className="font-cine text-[18px] uppercase tracking-wide text-white/60 transition-colors hover:text-white"
          >
            ← All work
          </a>
          {next.slug !== project.slug && (
            <a
              href={`/cinema/${next.slug}`}
              className="font-cine text-[18px] uppercase tracking-wide text-white/60 transition-colors hover:text-white"
            >
              Next: {next.title} →
            </a>
          )}
        </nav>
      </div>
    </main>
  );
}
