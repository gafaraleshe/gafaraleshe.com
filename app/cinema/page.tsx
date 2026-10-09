/*
 * Cinema — film portfolio index. Edge-to-edge two-column grid of 16:9
 * covers; hovering a cover washes it white and reveals the title, year, and
 * roles. On small screens the grid stacks and captions sit under each cover.
 * Projects live in lib/cinema.ts.
 */

import { cinemaProjects, coverFor, type CinemaProject } from "@/lib/cinema";

function Cover({ project }: { project: CinemaProject }) {
  const src = coverFor(project);
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  // No still yet: a title card keeps the grid looking intentional.
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950">
      <span className="px-6 text-center font-cine text-3xl uppercase tracking-wide text-white/25 sm:text-5xl">
        {project.title}
      </span>
    </div>
  );
}

function Details({ project }: { project: CinemaProject }) {
  return (
    <>
      <p className="font-cine text-[18px] uppercase leading-[21px] md:text-[24px] md:leading-[28px]">
        {project.title}
      </p>
      <p className="pt-[5px] font-cine text-[14px] leading-5 md:text-[16px]">
        {project.year}
      </p>
      <p className="pt-3 font-cine text-[14px] leading-5 md:text-[16px]">
        {project.roles}
      </p>
    </>
  );
}

export default function CinemaWork() {
  return (
    <main className="md:mx-[4%]">
      <h1 className="sr-only">Cinema work</h1>
      <section className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-[5px] md:gap-y-[5px]">
        {cinemaProjects.map(project => (
          <a
            key={project.slug}
            href={`/cinema/${project.slug}`}
            className="group block outline-none"
          >
            <div className="relative aspect-video overflow-hidden bg-neutral-900">
              <Cover project={project} />
              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-white/90 px-[8%] text-center text-[#222] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
                <Details project={project} />
              </div>
            </div>
            <div className="px-[5%] pt-3 text-center text-white md:hidden">
              <Details project={project} />
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
