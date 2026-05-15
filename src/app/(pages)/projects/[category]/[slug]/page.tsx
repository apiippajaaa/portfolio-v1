import Image from "next/image";

import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/lib/projects";

import ProjectGallery from "./components/ProjectGallery";
import Background from "@/app/components/layouts/background/Background";
import BackButton from "@/app/components/ui/BackButton";

/* ==========================================================================
   TYPES
========================================================================== */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ==========================================================================
   PAGE
========================================================================== */

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Background />
      <main className="relative z-10 overflow-hidden pb-32">
        {/* ambient */}

        {/* hero */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-12">
            <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              {/* content */}
              <div className="relative z-10">
                <h1 className="mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>

                {project.description && (
                  <p className="mt-7 max-w-2xl text-sm leading-[2] text-[#F5F5DC]/60 md:text-base">
                    {project.description}
                  </p>
                )}

                {/* stack */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#F5F5DC]/80 backdrop-blur-xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <BackButton
                  className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-[#F5D76E] transition-all duration-300 hover:gap-3"
                  label="Back to projects"
                />
              </div>

              {/* preview */}
              <HeroPreview image={project.heroImage} title={project.title} />
            </div>
          </div>
        </section>

        {/* gallery */}
        <ProjectGallery title={project.title} images={project.images ?? []} />
      </main>
    </>
  );
}

/* ==========================================================================
   UI
========================================================================== */

type HeroPreviewProps = {
  image: string;
  title: string;
};

function HeroPreview({ image, title }: HeroPreviewProps) {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#F5D76E]/15 blur-3xl" />

      <div className="relative">
        {/* blur layer */}
        <div
          className="absolute -inset-5 rounded-[40px] border border-white/5 bg-white/2 blur-2xl
          "
        />

        {/* image */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-2xl">
          <div className="relative aspect-16/11">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#04142F]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
