export type ProjectCategory =
  | "development"
  | "design"
  | "video";

export type SectionIcon =
  | "code"
  | "design"
  | "video";

/* ---------------------------------- */
/* Development */
/* ---------------------------------- */

export type DevelopmentProject = {

  id: string;

  title: string;
  slug: string;

  featured: boolean;

  shortDescription: string;
  description: string;

  cover: string;
  gallery: string[];

  stack: string[];

  role?: string;
  year?: number;

  liveUrl?: string;
  githubUrl?: string;
};

/* ---------------------------------- */
/* Design */
/* ---------------------------------- */

export type DesignProject = {

  id: string;

  slug: string;

  featured: boolean;

  cover: string;
};

/* ---------------------------------- */
/* Video */
/* ---------------------------------- */

export type VideoProject = {

  id: string;

  slug: string;

  featured: boolean;

  cover: string;

  videoUrl: string;
};

/* ---------------------------------- */
/* Shared */
/* ---------------------------------- */

export type Project =
  | DevelopmentProject
  | DesignProject
  | VideoProject;