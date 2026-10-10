/*
 * Cinema — the film portfolio index, on black film stock with the site's
 * grid. A big title, the showreel as a letterboxed 2.39:1 feature, then the
 * films in an editorial grid (one wide, two half, repeating), what I shoot,
 * and a strip from the shop. Projects live in lib/cinema.ts, products in
 * lib/shop.ts.
 */

import { cinemaProjects } from "@/lib/cinema";
import { products } from "@/lib/shop";
import { Cover, FilmCard, Viewfinder } from "@/components/cinema/Film";
import { ProductTeaser } from "@/components/cinema/ProductCard";

// Figures as published on shotbygafar.com.
const stats = [
  { value: "25+", label: "Clients" },
  { value: "UK", label: "Based & mobile" },
  { value: "7yr+", label: "Behind the lens" },
];

const services = [
  {
    title: "Weddings",
    body: "The day as it felt — vows, first dances and the moments in between.",
  },
  {
    title: "Events",
    body: "Highlight reels for parties, conferences and live shows, delivered fast.",
  },
  {
    title: "Brands",
    body: "Product films, promos and social-first content for small businesses.",
  },
  {
    title: "Portraits",
    body: "Bold, honest portraits and photo sessions, graded in-house.",
  },
];

function SectionHead({
  id,
  title,
  aside,
}: {
  id?: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-3">
      <h2
        id={id}
        className="font-cine text-[36px] uppercase leading-none tracking-wide text-white sm:text-[44px]"
      >
        {title}
      </h2>
      {aside}
    </div>
  );
}

export default function CinemaWork() {
  const [reel, ...films] = cinemaProjects;

  return (
    <main className="px-[5%] md:px-[4%]">
      {/* ── Title ── */}
      <section className="pb-12 pt-4 md:pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          SHOTBYGAFAR — Film · Photo · Colour
        </p>
        <h1 className="mt-4 font-cine text-[clamp(64px,12.5vw,200px)] uppercase leading-[0.85] tracking-wide text-white">
          Stories, shot
          <br />
          <span className="text-white/30">&amp; graded.</span>
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Cinematography, edit and colour by Gafar Aleshe — weddings, events
            and brand films from Portsmouth, wherever the story is.
          </p>
          <dl className="grid grid-cols-3 gap-6 sm:flex sm:gap-12">
            {stats.map(s => (
              // Value above label visually; label first for screen readers.
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {s.label}
                </dt>
                <dd className="font-cine text-[40px] leading-none text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Showreel, letterboxed ── */}
      {reel && (
        <a
          href={`/cinema/${reel.slug}`}
          className="group relative block outline-none"
          aria-label={`Play ${reel.title}`}
        >
          <div className="relative aspect-video overflow-hidden border border-white/10 bg-neutral-950 md:aspect-[2.39/1]">
            <Cover project={reel} index={0} plain />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <Viewfinder always />
            <span className="absolute left-6 top-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
              Rec
            </span>
            <span className="absolute right-6 top-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
              2.39:1 · {reel.year}
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/30 pl-1 text-xl text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                ▶
              </span>
              <span className="font-cine text-[22px] uppercase tracking-[0.15em] text-white md:text-[26px]">
                Play {reel.title}
              </span>
            </div>
            <span className="absolute bottom-5 left-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/60">
              {reel.roles}
            </span>
          </div>
        </a>
      )}

      {/* ── Films ── */}
      {films.length > 0 && (
        <section className="mt-24" aria-labelledby="films-title">
          <SectionHead
            id="films-title"
            title="Selected films"
            aside={
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/45">
                {String(films.length).padStart(2, "0")} projects
              </span>
            }
          />
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2">
            {films.map((project, i) => (
              <FilmCard
                key={project.slug}
                project={project}
                index={i + 1}
                wide={i % 3 === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── What I shoot ── */}
      <section className="mt-28">
        <SectionHead
          title="What I shoot"
          aside={
            <a
              href="https://shotbygafar.com"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              Rates & booking ↗
            </a>
          }
        />
        <ol className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.title} className="bg-black p-6">
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 font-cine text-[30px] uppercase leading-none tracking-wide text-white">
                {s.title}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── From the shop ── */}
      <section className="mt-28" aria-labelledby="shop-title">
        <SectionHead
          id="shop-title"
          title="From the shop"
          aside={
            <a
              href="/cinema/shop"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              LUTs & presets →
            </a>
          }
        />
        <p className="-mt-2 mb-6 max-w-xl text-[14px] leading-relaxed text-white/55">
          The colour grades from my films, packed up for yours — LUTs for
          Premiere, DaVinci and Final Cut, and Lightroom presets for photo.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(p => (
            <ProductTeaser key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
