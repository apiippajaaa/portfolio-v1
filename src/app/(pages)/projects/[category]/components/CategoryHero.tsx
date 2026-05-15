import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  category: string;
};

export default function CategoryHero({ title, description, category }: Props) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden mx-auto w-full max-w-6xl">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
        {/* MOBILE */}
        <div className="flex flex-col items-center text-center lg:hidden">
          {/* LABEL */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-white/45 backdrop-blur-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.9)]" />
            Selected Works
          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-semibold leading-none tracking-[-0.08em] text-white sm:text-6xl">
            {title}
          </h1>

          {/* DESC */}
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/40">
            {description}
          </p>

          {/* ARCHIVE */}
          {category === "development" && (
            <Link
              href="/projects/development/archive"
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/20 hover:bg-yellow-400 hover:text-black"
            >
              Archive
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          )}

          {/* INFO */}
          <div className="mt-16 border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Curated Projects Collection
            </p>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/30">
              Exploring clean digital experiences through minimalist visuals,
              motion, and modern interaction design.
            </p>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          {/* LABEL */}
          <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-white/45 backdrop-blur-2xl">
            {/* animated dot */}
            <div className="relative flex h-2 w-2 items-center justify-center">
              {/* ping */}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400/60" />

              {/* glow */}
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-yellow-400/20 blur-[4px]" />

              {/* main dot */}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.9)]" />
            </div>
            Selected Works
          </div>

          {/* CONTENT */}
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            {/* LEFT */}
            <div className="max-w-5xl">
              <h1 className="text-[120px] font-semibold leading-[0.9] tracking-[-0.08em] text-white">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/40">
                {description}
              </p>
            </div>

            {/* RIGHT */}
            {category === "development" && (
              <div className="flex justify-end">
                <Link
                  href="/projects/development/archive"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/20 hover:bg-yellow-400 hover:text-black"
                >
                  Archive
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* BOTTOM INFO */}
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8 text-white/35">
            <p className="text-xs uppercase tracking-[0.3em]">
              Curated Projects Collection
            </p>

            <p className="max-w-md text-sm leading-relaxed text-right text-white/30">
              Exploring clean digital experiences through minimalist visuals,
              motion, and modern interaction design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
