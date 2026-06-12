import { notFound } from "next/navigation";

import { designs, developmentProjects, videos } from "@/data/projects";

import DevelopmentDetail from "../../components/development/DevelopmentDetail";
import VideoDetail from "../../components/video/VideoDetail";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { category, slug } = await params;

  switch (category) {
    case "development": {
      const project = developmentProjects.find((item) => item.slug === slug);

      if (!project) notFound();

      return <DevelopmentDetail project={project} />;
    }

    // case "design": {
    //   const project = designs.find((item) => item.slug === slug);

    //   if (!project) notFound();

    //   return <DesignDetail project={project} />;
    // }

    case "video": {
      const project = videos.find((item) => item.slug === slug);

      if (!project) notFound();

      return <VideoDetail project={project} />;
    }

    default:
      notFound();
  }
}
