"use client";

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
        {/* AMBIENT GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[150px]" />

        <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

        {/* CONTAINER */}
        <section className="mx-auto w-full max-w-6xl">
          {/* HERO */}
          <section className="relative flex min-h-screen items-center">
            <ProjectsHero />
          </section>

          {/* CONTENT */}
          <div className="space-y-32 pb-32">
            {/* DEVELOPMENT */}
            <ProjectSection
              icon="code"
              title="Development"
              description="Modern platforms, realtime systems, and interactive products."
              projects={codeProjects.slice(0, 6)}
            />

            {/* DESIGN */}
            <section className="space-y-12">
              <ProjectSection.Header
                icon="design"
                title="Design"
                description="Minimal visual explorations and interface concepts."
              />

              <DesignGrid projects={designProjects} />
            </section>

            {/* VIDEO */}
            <ProjectSection
              icon="video"
              title="Motion & Video"
              description="Cinematic edits and visual storytelling experiences."
              projects={videoProjects.slice(0, 6)}
            />
          </div>
        </section>
      </main>
    </>
  );
}
