import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { developmentProjects, designs } from "@/data/projects";

import DevelopmentCard from "../components/development/DevelopmentCard";
import VideoGallery from "../components/video/VideoGallery";
import ProjectSection from "../components/page/ProjectSection";

import { PROJECT_CATEGORIES } from "./project-categories";

import ViewAllHeader from "./components/ViewAllHeader";
import GetInTouch from "../../about/sections/GetInTouch";
import DesignGallery from "../components/design/DesignGallery";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!(category in PROJECT_CATEGORIES)) {
    notFound();
  }

  const current =
    PROJECT_CATEGORIES[category as keyof typeof PROJECT_CATEGORIES];

  return (
    <>
      <main className="relative mx-auto w-full max-w-6xl overflow-hidden px-6 pb-32 pt-28">
        <section className="relative mx-auto max-w-7xl">
          <ViewAllHeader
            title={current.title}
            description={current.description}
            category={category}
          />

          {/* Design */}
          {category === "design" && <DesignGallery projects={designs} />}

          {/* Development */}
          {category === "development" && (
            <>
              <ProjectSection icon={current.icon} title="" description="">
                {developmentProjects.map((project) => (
                  <DevelopmentCard key={project.id} project={project} />
                ))}
              </ProjectSection>

              <ArchiveCTA />
            </>
          )}

          {/* Video */}
          {category === "video" && (
            <ProjectSection icon={current.icon} title="" description="">
              <VideoGallery />
            </ProjectSection>
          )}
        </section>

        <GetInTouch />
      </main>
    </>
  );
}

function ArchiveCTA() {
  return (
    <div className="mt-36 flex justify-center">
      <Link
        href="/projects/development/archive"
        className="group relative inline-flex flex-col items-center px-10 py-6"
      >
        <div className="relative mb-5 h-px w-full bg-white/50">
          <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="flex items-center gap-4 transition-transform duration-500 group-hover:scale-[1.03]">
          <span className="text-sm font-medium uppercase tracking-[0.38em] text-white">
            Explore Archive
          </span>

          <ArrowUpRight
            size={16}
            className="text-white transition-all duration-500 group-hover:rotate-45 group-hover:text-yellow-400"
          />
        </div>

        <div className="relative mt-5 h-px w-full bg-white/50">
          <div className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute left-1/2 top-1/2 h-16 w-32 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/5 blur-2xl" />
        </div>
      </Link>
    </div>
  );
}
