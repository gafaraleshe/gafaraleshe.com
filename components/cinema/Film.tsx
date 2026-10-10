/*
 * Building blocks for the cinema pages: a project's cover (still, YouTube
 * thumbnail, or a slate-style title card), the camera viewfinder marks that
 * frame it on hover, and the film card used by the index grid and the
 * "More films" strip on each project page.
 */

import { coverFor, type CinemaProject } from "@/lib/cinema";

// Covers start desaturated and grade into colour on hover or focus, like a
// LUT going on. Touch screens, which can't hover, always get colour.
const GRADE =
  "transition duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:scale-[1.03] group-focus-visible:grayscale-0 [@media(hover:hover)]:grayscale";

export function Cover({
  project,
  index,
  plain = false,
}: {
  project: CinemaProject;
  index?: number;
  /** Title-card fallback without its lettering, for framed features. */
  plain?: boolean;
}) {
  const src = coverFor(project);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${GRADE}`}
      />
    );
  }
  // No still yet: a clapperboard slate keeps the grid looking intentional.
  // Its lettering sits low so the corner overlays stay clear.
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end bg-[radial-gradient(ellipse_at_30%_20%,#262626_0%,#0b0b0b_65%)] p-5 sm:p-7 ${GRADE}`}
    >
      {!plain && (
        <>
          <span className="font-cine text-[40px] uppercase leading-[0.9] tracking-wide text-white/20 sm:text-[64px]">
            {project.title}
          </span>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Scene {String((index ?? 0) + 1).padStart(2, "0")} · Take 1 ·{" "}
            {project.year}
          </span>
        </>
      )}
    </div>
  );
}

// Four corner brackets, like a camera's frame guides. Hidden until hover.
export function Viewfinder({ always = false }: { always?: boolean }) {
  const base = `pointer-events-none absolute h-5 w-5 border-white/80 transition-all duration-300 ${
    always
      ? "opacity-70"
      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
  }`;
  return (
    <>
      <span
        className={`${base} left-3 top-3 border-l border-t ${always ? "" : "group-hover:left-4 group-hover:top-4"}`}
      />
      <span
        className={`${base} right-3 top-3 border-r border-t ${always ? "" : "group-hover:right-4 group-hover:top-4"}`}
      />
      <span
        className={`${base} bottom-3 left-3 border-b border-l ${always ? "" : "group-hover:bottom-4 group-hover:left-4"}`}
      />
      <span
        className={`${base} bottom-3 right-3 border-b border-r ${always ? "" : "group-hover:bottom-4 group-hover:right-4"}`}
      />
    </>
  );
}

export function FilmCard({
  project,
  index,
  wide = false,
}: {
  project: CinemaProject;
  index: number;
  wide?: boolean;
}) {
  return (
    <a
      href={`/cinema/${project.slug}`}
      className={`group block outline-none ${wide ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden border border-white/10 bg-neutral-950 ${
          wide ? "aspect-video md:aspect-[2.39/1]" : "aspect-video"
        }`}
      >
        <Cover project={project} index={index} />
        <Viewfinder />
        <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-white/70 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 px-2.5 py-1 font-cine text-[15px] uppercase tracking-wide text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          ▶ Watch
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 pt-3">
        <div>
          <p className="font-cine text-[22px] uppercase leading-none tracking-wide text-white md:text-[26px]">
            {project.title}
          </p>
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
            {project.roles}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[11px] tracking-[0.15em] text-white/45">
          {project.year}
        </span>
      </div>
    </a>
  );
}
