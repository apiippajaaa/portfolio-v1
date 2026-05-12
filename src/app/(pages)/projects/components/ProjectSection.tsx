"use client";

import CleanCard from "./CleanCard";
import SectionHeader from "./SectionHeader";

/* ================= TYPES ================= */

export type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  stack: string[];
};

type Props = {
  icon: "code" | "design" | "video";
  title: string;
  description: string;
  projects: Project[];
};

/* ================= COMPONENT ================= */

function ProjectSection({ icon, title, description, projects }: Props) {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <SectionHeader icon={icon} title={title} description={description} />

      {/* GRID */}
      <div
        className="
          grid gap-10

          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {projects.map((project) => (
          <CleanCard key={project.slug} item={project} />
        ))}
      </div>
    </section>
  );
}

/* ================= STATIC EXPORT ================= */

ProjectSection.Header = SectionHeader;

export default ProjectSection;
