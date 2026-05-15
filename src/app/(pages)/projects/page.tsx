"use client";

import Link from "next/link";

import projects from "@/data/projects.json";

import Background from "@/app/components/layouts/background/Background";

import { DesignGrid, ProjectSection, ProjectsHero } from "./components";

/* ================= TYPES ================= */

type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  stack: string[];
  isCore?: boolean;
};

type ProjectCollection = {
  code: Project[];
  design: Project[];
  video: Project[];
};

/* ================= DATA ================= */

const projectData = projects as ProjectCollection;

/* ================= COMPONENT ================= */

export default function ProjectsPage() {
  const {
    code: codeProjects,
    design: designProjects,
    video: videoProjects,
  } = projectData;

  return (
    <>
      <Background />

      <main className="relative overflow-hidden">
        {/* CONTAINER */}
        <section className="mx-auto w-full max-w-6xl">
          {/* HERO */}
          <section className="relative flex min-h-screen items-center">
            <ProjectsHero />
          </section>

          {/* CONTENT */}
          <div className="space-y-32 pb-32">
            {/* DEVELOPMENT */}
            <section className="space-y-12">
              <ProjectSection
                icon="code"
                title="Development"
                description="Modern platforms, realtime systems, and interactive products."
                projects={codeProjects.slice(0, 6).map((item) => ({
                  ...item,
                  category: "development",
                }))}
              />

              <div className="flex justify-center">
                <Link
                  href="/projects/development"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400 hover:text-black"
                >
                  View All Development
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </section>

            {/* DESIGN */}
            <section className="space-y-12">
              <ProjectSection.Header
                icon="design"
                title="Design"
                description="Minimal visual explorations and interface concepts."
              />

              <DesignGrid projects={designProjects} />

              <div className="flex justify-center">
                <Link
                  href="/projects/design"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400 hover:text-black"
                >
                  View All Design
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </section>

            {/* VIDEO */}
            <section className="space-y-12">
              <ProjectSection
                icon="video"
                title="Motion & Video"
                description="Cinematic edits and visual storytelling experiences."
                projects={videoProjects.slice(0, 6).map((item) => ({
                  ...item,
                  category: "video",
                }))}
              />

              <div className="flex justify-center">
                <Link
                  href="/projects/video"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400 hover:text-black"
                >
                  View All Motion & Video
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
