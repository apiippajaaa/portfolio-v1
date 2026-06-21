import { skillCategories } from "./skills";

import { experiences } from "./experiences";
import { developmentProjects } from "./projects";

export const portfolio = {
  name: "Nur Afif Misbahuddin",

  role: "Fullstack Developer",

  summary:
    "Fullstack developer with experience building modern web applications, UI/UX design, and video production.",

  /**
   * Flat list of all skills derived from skillCategories.
   * Single source of truth — update skills.ts, this updates automatically.
   */
  get skills(): string[] {
    return skillCategories.flatMap((cat) => cat.skills);
  },

  /**
   * Structured skill categories for richer context (used in chat route).
   */
  get skillsByCategory(): Record<string, string[]> {
    return Object.fromEntries(
      skillCategories.map((cat) => [cat.title, cat.skills])
    );
  },

  /**
   * Projects derived from development data.
   * Sorted: featured first, then by year descending.
   */
  get projects() {
    return [...developmentProjects].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.year ?? 0) - (a.year ?? 0);
    });
  },

  /**
   * Work experiences — already ordered in experiences.ts.
   */
  get experience() {
    return experiences;
  },

  contact: {
    email: "afifmisbahuddin7@email.com",
  },
} as const;