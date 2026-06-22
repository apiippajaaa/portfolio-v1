"use client";

import { useState } from "react";

import SectionButton from "@/components/ui/SectionButton";

import { developmentProjects, designs, videos } from "@/data/projects";

import ProjectHeader from "./components/page/Header";
import ProjectSection from "./components/page/ProjectSection";

import DevelopmentCard from "./components/development/DevelopmentCard";
import DesignCard from "./components/design/DesignCard";
import VideoCard from "./components/video/VideoCard";
import VideoPreviewModal from "./components/video/VideoPreviewModal";
import HorizontalCarousel from "./components/page/HorizontalCarousel";

const featuredDevelopment = developmentProjects
  .filter((project) => project.featured)
  .slice(0, 6);

const featuredDesigns = designs
  .filter((project) => project.featured)
  .slice(0, 12);

const featuredVideos = videos.filter((project) => project.featured).slice(0, 6);

export default function ProjectsPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      <main className="relative overflow-hidden">
        <section className="mx-auto w-full max-w-6xl">
          <section
            id="project"
            className="relative flex min-h-screen snap-start items-center"
          >
            <ProjectHeader />
          </section>

          <div className="space-y-32 pb-32 px-6 py-12">
            {/* Development */}
            <section className="space-y-12">
              <ProjectSection.Header
                icon="code"
                title="Development"
                description="Modern platforms, realtime systems, and interactive products."
              />

              <div className="md:hidden">
                <HorizontalCarousel>
                  {featuredDevelopment.map((project) => (
                    <div key={project.id} className="w-75 shrink-0 snap-center">
                      <DevelopmentCard project={project} />
                    </div>
                  ))}
                </HorizontalCarousel>
              </div>

              <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {featuredDevelopment.map((project) => (
                  <DevelopmentCard key={project.id} project={project} />
                ))}
              </div>

              <div className="flex justify-center">
                <SectionButton href="/projects/development" variant="glass">
                  View All Development
                </SectionButton>
              </div>
            </section>

            {/* Design */}
            <section className="space-y-12">
              <ProjectSection.Header
                icon="design"
                title="Design"
                description="Minimal visual explorations and interface concepts."
              />

              <DesignCard projects={featuredDesigns} />

              <div className="flex justify-center">
                <SectionButton href="/projects/design" variant="glass">
                  View All Design
                </SectionButton>
              </div>
            </section>

            {/* Video */}
            <section className="space-y-12">
              <ProjectSection
                icon="video"
                title="Motion & Video"
                description="Cinematic edits and visual storytelling experiences."
              >
                {featuredVideos.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onOpen={setSelectedVideo}
                  />
                ))}
              </ProjectSection>

              <div className="flex justify-center">
                <SectionButton href="/projects/video" variant="glass">
                  View All Motion & Video
                </SectionButton>
              </div>
            </section>
          </div>
        </section>
      </main>

      <VideoPreviewModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
