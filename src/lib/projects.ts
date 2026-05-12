import projects from "@/data/projects.json";

export type ProjectCategory = "code" | "design" | "video";

export type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  images?: string[];
  stack: string[];
  videoUrl?: string;
  isCore?: boolean;
};

type ProjectData = Record<ProjectCategory, Project[]>;

const data = projects as ProjectData;

export function getAllProjects() {
  return Object.entries(data).flatMap(([category, items]) =>
    items.map((item) => ({
      ...item,
      category: category as ProjectCategory,
    }))
  );
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find(
    (project) => project.slug === slug
  );
}

export function getRelatedProjects(
  currentSlug: string,
  limit = 3
) {
  return getAllProjects()
    .filter((project) => project.slug !== currentSlug)
    .slice(0, limit);
}