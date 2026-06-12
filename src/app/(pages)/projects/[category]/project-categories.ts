import { ProjectCategory, SectionIcon } from "@/types/projects";

export const PROJECT_CATEGORIES: Record<
  ProjectCategory,
  {
    title: string;
    description: string;
    icon: SectionIcon;
  }
> = {
  development: {
    title: "Development",
    description:
      "Modern platforms, realtime systems, and interactive products.",
    icon: "code",
  },

  design: {
    title: "Design",
    description:
      "Minimal visual explorations and interface concepts.",
    icon: "design",
  },

  video: {
    title: "Motion & Video",
    description:
      "Cinematic edits and visual storytelling experiences.",
    icon: "video",
  },
};