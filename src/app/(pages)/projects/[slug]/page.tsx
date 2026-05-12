"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import projects from "@/data/projects.json";

/* ==========================================================================
   TYPES
========================================================================== */

type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  images?: string[];
  stack: string[];
};

type ProjectCollection = {
  code: Project[];
  design: Project[];
  video: Project[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ==========================================================================
   DATA
========================================================================== */

const projectData = projects as ProjectCollection;

const allProjects: Project[] = [
  ...projectData.code,
  ...projectData.design,
  ...projectData.video,
];

/* ==========================================================================
   HELPERS
========================================================================== */

const findProjectBySlug = (slug: string) => {
  return allProjects.find((project) => project.slug === slug);
};

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

/* ==========================================================================
   UI
========================================================================== */

function FloatingNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2",
        "items-center justify-center rounded-full",
        "border border-white/10",
        "bg-black/25 backdrop-blur-2xl",
        "text-white/80",
        "transition-all duration-300",
        "hover:scale-105",
        "hover:border-[#F5D76E]/30",
        "hover:bg-black/40",
        "hover:text-[#F5D76E]",
        "active:scale-95",
        isLeft ? "left-3" : "right-3"
      )}
    >
      {isLeft ? (
        <ChevronLeft
          size={18}
          className="
            transition-transform duration-300
            group-hover:-translate-x-0.5
          "
        />
      ) : (
        <ChevronRight
          size={18}
          className="
            transition-transform duration-300
            group-hover:translate-x-0.5
          "
        />
      )}
    </button>
  );
}

function GalleryCard({ image, alt }: { image: string; alt: string }) {
  return (
    <div
      className="
        group relative overflow-hidden

        rounded-[32px]

        border border-white/10

        bg-white/[0.03]

        backdrop-blur-2xl
      "
    >
      {/* glow */}
      <div
        className="
          absolute inset-0

          bg-[radial-gradient(circle_at_top,#F5D76E15_0%,transparent_70%)]

          opacity-0

          transition-opacity duration-500

          group-hover:opacity-100
        "
      />

      {/* image */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="
            object-cover

            transition-transform duration-700

            group-hover:scale-[1.03]
          "
        />

        {/* overlay */}
        <div
          className="
            absolute inset-0

            bg-gradient-to-t
            from-[#04142F]/45
            via-transparent
            to-transparent
          "
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   GALLERY
========================================================================== */

type GalleryProps = {
  title: string;
  images: string[];
};

function ProjectGallery({ title, images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeImages = useMemo(() => {
    return images?.length ? images : [];
  }, [images]);

  const hasMultipleImages = safeImages.length > 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  if (!safeImages.length) return null;

  return (
    <section className="mt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* HEADER */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.28em]

                text-[#F5D76E]/55
              "
            >
              Gallery
            </p>

            <h2
              className="
                mt-3

                text-3xl
                font-semibold

                tracking-[-0.06em]

                text-white

                md:text-5xl
              "
            >
              Project Screens
            </h2>
          </div>

          {/* desktop info */}
          <div
            className="
              hidden md:flex items-center gap-2

              rounded-full

              border border-white/10

              bg-white/[0.03]

              px-4 py-2

              text-sm

              text-[#F5F5DC]/55

              backdrop-blur-xl
            "
          >
            <span className="h-2 w-2 rounded-full bg-[#F5D76E]" />
            {safeImages.length} Preview
          </div>
        </div>

        {/* ==========================================================================
            MOBILE CAROUSEL
        ========================================================================== */}
        <div className="relative md:hidden">
          {/* slider */}
          <div className="overflow-hidden rounded-[32px]">
            <div
              className="
                flex

                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {safeImages.map((image, index) => (
                <div key={image} className="relative min-w-full">
                  <GalleryCard
                    image={image}
                    alt={`${title} preview ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* navigation */}
          {hasMultipleImages && (
            <>
              <FloatingNavButton direction="left" onClick={prevSlide} />

              <FloatingNavButton direction="right" onClick={nextSlide} />
            </>
          )}

          {/* dots */}
          <div className="mt-5 flex justify-center gap-2">
            {safeImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-[#F5D76E]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>

        {/* ==========================================================================
            DESKTOP GRID
        ========================================================================== */}
        <div
          className="
            hidden

            gap-6

            md:grid
            md:grid-cols-2

            xl:grid-cols-3
          "
        >
          {safeImages.map((image, index) => (
            <GalleryCard
              key={image}
              image={image}
              alt={`${title} preview ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   EMPTY STATE
========================================================================== */

function ProjectNotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div
        className="
          rounded-[36px]

          border border-white/10

          bg-white/[0.03]

          px-8 py-10

          text-center

          backdrop-blur-2xl
        "
      >
        <p
          className="
            text-sm
            uppercase
            tracking-[0.3em]

            text-[#F5D76E]/55
          "
        >
          404
        </p>

        <h1
          className="
            mt-4

            text-3xl
            font-semibold

            tracking-[-0.05em]

            text-white

            md:text-5xl
          "
        >
          Project not found
        </h1>

        <p
          className="
            mx-auto mt-4

            max-w-md

            text-sm
            leading-relaxed

            text-white/55
          "
        >
          The page you are looking for does not exist.
        </p>

        <Link
          href="/projects"
          className="
            mt-8 inline-flex items-center gap-2

            rounded-full

            border border-[#F5D76E]/20

            bg-[#F5D76E]/10

            px-5 py-3

            text-sm
            font-medium

            text-[#F5F5DC]

            backdrop-blur-xl

            transition-all duration-300

            hover:border-[#F5D76E]/40
            hover:bg-[#F5D76E]/15
          "
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>
    </main>
  );
}

/* ==========================================================================
   PAGE
========================================================================== */

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = findProjectBySlug(slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <main className="relative z-10 overflow-hidden pb-32">
      {/* ambient */}
      <div
        className="
          pointer-events-none

          absolute left-[-10%] top-24

          h-[500px] w-[500px]

          rounded-full

          bg-[#F5D76E]/10

          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none

          absolute right-[-10%] top-[30%]

          h-[500px] w-[500px]

          rounded-full

          bg-blue-400/10

          blur-[140px]
        "
      />

      {/* hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
          <div
            className="
              grid gap-16

              lg:grid-cols-[0.95fr_1.05fr]
              lg:items-center
            "
          >
            {/* left */}
            <div className="relative z-10">
              {/* badge */}
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-[#F5D76E]/15

                  bg-white/[0.03]

                  px-4 py-2

                  text-[11px]
                  uppercase
                  tracking-[0.24em]

                  text-[#F5D76E]

                  backdrop-blur-xl
                "
              >
                <Sparkles size={13} />
                Featured Project
              </div>

              {/* title */}
              <h1
                className="
                  mt-7

                  text-5xl
                  font-semibold

                  leading-[0.92]
                  tracking-[-0.08em]

                  text-white

                  sm:text-6xl
                  lg:text-7xl
                "
              >
                {project.title}
              </h1>

              {/* description */}
              {project.description && (
                <p
                  className="
                    mt-7

                    max-w-2xl

                    text-sm
                    leading-[2]

                    text-[#F5F5DC]/60

                    md:text-base
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
                      rounded-full

                      border border-white/10

                      bg-white/[0.04]

                      px-4 py-2

                      text-xs
                      font-medium

                      text-[#F5F5DC]/80

                      backdrop-blur-xl
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* back */}
              <div className="mt-12">
                <Link
                  href="/projects"
                  className="
                    inline-flex items-center gap-2

                    text-sm
                    font-medium

                    text-[#F5D76E]

                    transition-all duration-300

                    hover:gap-3
                  "
                >
                  <ArrowLeft size={16} />
                  Back to projects
                </Link>
              </div>
            </div>

            {/* right */}
            <div className="relative">
              {/* glow */}
              <div
                className="
                  absolute -left-10 top-10

                  h-40 w-40

                  rounded-full

                  bg-[#F5D76E]/15

                  blur-3xl
                "
              />

              {/* card */}
              <div className="relative">
                <div
                  className="
                    absolute -inset-5

                    rounded-[40px]

                    border border-white/5

                    bg-white/[0.02]

                    blur-2xl
                  "
                />

                <div
                  className="
                    relative overflow-hidden

                    rounded-[40px]

                    border border-white/10

                    bg-white/[0.03]

                    backdrop-blur-2xl
                  "
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* overlay */}
                    <div
                      className="
                        absolute inset-0

                        bg-gradient-to-t
                        from-[#04142F]/80
                        via-transparent
                        to-transparent
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* gallery */}
      <ProjectGallery title={project.title} images={project.images ?? []} />
    </main>
  );
}
