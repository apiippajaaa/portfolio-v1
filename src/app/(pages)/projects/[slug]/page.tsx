import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/lib/projects";

import ProjectGallery from "./components/project-gallery";
import Background from "@/app/components/layouts/background/Background";

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
        <AmbientGlow />

        {/* hero */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-12">
            <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              {/* content */}
              <div className="relative z-10">
                <HeroBadge />

                <h1
                  className="
                  mt-7 text-5xl font-semibold leading-[0.92]
                  tracking-[-0.08em] text-white
                  sm:text-6xl lg:text-7xl
                "
                >
                  {project.title}
                </h1>

                {project.description && (
                  <p
                    className="
                    mt-7 max-w-2xl text-sm leading-[2]
                    text-[#F5F5DC]/60 md:text-base
                  "
                  >
                    {project.description}
                  </p>
                )}

                {/* stack */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="
                      rounded-full border border-white/10
                      bg-white/[0.04]
                      px-4 py-2 text-xs font-medium
                      text-[#F5F5DC]/80
                      backdrop-blur-xl
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* back */}
                <Link
                  href="/projects"
                  className="
                  mt-12 inline-flex items-center gap-2
                  text-sm font-medium text-[#F5D76E]
                  transition-all duration-300
                  hover:gap-3
                "
                >
                  <ArrowLeft size={16} />
                  Back to projects
                </Link>
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

function AmbientGlow() {
  return (
    <>
      <div className="pointer-events-none absolute left-[-10%] top-24 h-[500px] w-[500px] rounded-full bg-[#F5D76E]/10 blur-[120px]" />

      <div
        className="pointer-events-none absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[140px]
        "
      />
    </>
  );
}

function HeroBadge() {
  return (
    <div
      className="
        inline-flex items-center gap-2
        rounded-full border border-[#F5D76E]/15
        bg-white/[0.03]
        px-4 py-2
        text-[11px] uppercase tracking-[0.24em]
        text-[#F5D76E]
        backdrop-blur-xl
      "
    >
      <Sparkles size={13} />
      Featured Project
    </div>
  );
}

type HeroPreviewProps = {
  image: string;
  title: string;
};

function HeroPreview({ image, title }: HeroPreviewProps) {
  return (
    <div className="relative">
      {/* glow */}
      <div
        className="
          absolute -left-10 top-10
          h-40 w-40 rounded-full
          bg-[#F5D76E]/15 blur-3xl
        "
      />

      <div className="relative">
        {/* blur layer */}
        <div
          className="
            absolute -inset-5 rounded-[40px]
            border border-white/5
            bg-white/[0.02]
            blur-2xl
          "
        />

        {/* image */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          <div className="relative aspect-[16/11]">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#04142F]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
