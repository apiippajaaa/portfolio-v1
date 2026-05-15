import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import projects from "@/data/projects.json";

import Background from "@/app/components/layouts/background/Background";
import CategoryHero from "./components/CategoryHero";
import { DesignGrid, ProjectSection } from "../components";
import GetInTouch from "../../about/components/GetInTouch";

/* ================= TYPES ================= */

type Props = {
  params: Promise<{
    category: string;
  }>;
};

/* ================= CONFIG ================= */

const categoryConfig = {
  development: {
    title: "Development",
    description:
      "Modern platforms, realtime systems, and interactive products.",
    icon: "code" as const,
    projects: projects.code,
  },

  design: {
    title: "Design",
    description: "Minimal visual explorations and interface concepts.",
    icon: "design" as const,
    projects: projects.design,
  },

  video: {
    title: "Motion & Video",
    description: "Cinematic edits and visual storytelling experiences.",
    icon: "video" as const,
    projects: projects.video,
  },
};

/* ================= PAGE ================= */

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const current = categoryConfig[category as keyof typeof categoryConfig];

  if (!current) {
    notFound();
  }

  return (
    <>
      <Background />

      <main className="relative overflow-hidden px-6 pb-32 pt-28 mx-auto w-full max-w-6xl">
        <section className="relative mx-auto max-w-7xl">
          <CategoryHero
            title={current.title}
            description={current.description}
            category={category}
          />

          {category === "design" ? (
            <DesignGrid projects={current.projects} />
          ) : (
            <ProjectSection
              icon={current.icon}
              title=""
              description=""
              projects={current.projects.map((item) => ({
                ...item,
                category: category as "development" | "design" | "video",
              }))}
            />
          )}

          {/* ARCHIVE CTA */}
          {category === "development" && (
            <div className="mt-36 flex justify-center">
              <Link
                href="/projects/development/archive"
                className="group relative inline-flex flex-col items-center px-10 py-6"
              >
                {/* top line */}
                <div className="relative mb-5 h-px w-full bg-white/50">
                  <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
                </div>

                {/* content */}
                <div className="flex items-center gap-4 transition-transform duration-500 group-hover:scale-[1.03]">
                  <span className="text-sm font-medium uppercase tracking-[0.38em] text-white transition-all duration-300 ">
                    Explore Archive
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-white transition-all duration-500 group-hover:rotate-45 group-hover:text-yellow-400"
                  />
                </div>

                {/* bottom line */}
                <div className="relative mt-5 h-px w-full bg-white/50">
                  <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
                </div>

                {/* hover blur */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-all duration-700 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-16 w-32 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/5 blur-2xl" />
                </div>
              </Link>
            </div>
          )}
        </section>
        <GetInTouch />
      </main>
    </>
  );
}
