export type Project = {
    title: string;
    slug: string;
    description?: string;
    heroImage: string;
    images?: string[];
    stack: string[];
  };
  
  export type ProjectCollection = {
    code: Project[];
    design: Project[];
    video: Project[];
  };
  
  export type PageProps = {
    params: Promise<{
      slug: string;
    }>;
  };