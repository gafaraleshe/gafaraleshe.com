/*
 * Cinema project page — centred title and roles over a full-width 16:9
 * player, a credits strip, then more films and a link on to the next one.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  cinemaProjects,
  coverFor,
  embedUrl,
  getCinemaProject,
} from "@/lib/cinema";
import { FilmCard, Viewfinder } from "@/components/cinema/Film";

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
  // The next two films after this one, wrapping round.
  const others = [1, 2]
    .map(n => cinemaProjects[(index + n) % cinemaProjects.length])
    .filter((p, i, all) => p.slug !== project.slug && all.indexOf(p) === i);

  return (
    <main className="px-[5%] md:px-[4%]">
      <div className="mx-auto max-w-[1400px]">
        <header className="pb-10 pt-4 text-center md:pb-14">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(cinemaProjects.length).padStart(2, "0")}
          </p>
          <h1 className="font-cine text-[44px] uppercase leading-none tracking-wide sm:text-[64px]">
            {project.title}
          </h1>
          <p className="mt-3 font-cine text-[16px] uppercase tracking-[0.12em] text-white/70 sm:text-[19px]">
            {project.roles} · {project.year}
          </p>
        </header>

        <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-[#0b0b0b]">
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
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#1c1c1c_0%,#0b0b0b_70%)]">
              <Viewfinder always />
              <span className="font-cine text-[20px] uppercase tracking-[0.2em] text-white/40">
                Film coming soon
              </span>
            </div>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            ["Year", project.year],
            ["Credits", project.roles.replace(/\s*\|\|\s*/g, " · ")],
            ["Studio", "SHOTBYGAFAR"],
          ].map(([term, value]) => (
            <div
              key={term}
              className="bg-black px-4 py-3 last:col-span-2 sm:last:col-span-1"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                {term}
              </dt>
              <dd className="mt-1 font-cine text-[18px] uppercase tracking-wide text-white">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {project.summary && (
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-white/75">
            {project.summary}
          </p>
        )}

        {others.length > 0 && (
          <section className="mt-24" aria-labelledby="more-films">
            <h2
              id="more-films"
              className="mb-6 border-b border-white/10 pb-3 font-cine text-[32px] uppercase leading-none tracking-wide text-white"
            >
              More films
            </h2>
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2">
              {others.map(p => (
                <FilmCard
                  key={p.slug}
                  project={p}
                  index={cinemaProjects.indexOf(p)}
                />
              ))}
            </div>
          </section>
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
