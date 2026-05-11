"use client";

import Link from "next/link";
import Image from "next/image";
import projects from "@/data/projects.json";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Clapperboard } from "lucide-react";

import Background from "@/app/components/layouts/background/Background";

type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  stack: string[];
  isCore?: boolean;
};

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div
        className="
          mb-5
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-white/8
          px-4
          py-2
          shadow-[0_0_30px_rgba(255,255,255,0.04)]
          backdrop-blur-2xl
        "
      >
        <div className="text-yellow-400">{icon}</div>

        <span
          className="
            text-[11px]
            uppercase
            tracking-[0.22em]
            text-white/80
          "
        >
          Selected Works
        </span>
      </div>

      <h2
        className="
          text-3xl
          font-semibold
          tracking-[-0.05em]
          text-white
          md:text-5xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-4
          text-sm
          leading-relaxed
          text-white/55
          md:text-[15px]
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================
   CLEAN PROJECT CARD
========================= */

function CleanCard({ item, href }: { item: Project; href: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={href} className="group block">
        {/* IMAGE */}
        <div className="relative">
          {/* ROYAL BLUE GLOW */}
          <div
            className="
              absolute
              -inset-2
              rounded-[34px]
              bg-blue-600/25
              blur-3xl
              opacity-100
            "
          />

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
            "
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.04]
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#020617]/80
                  via-[#020617]/10
                  to-transparent
                "
              />

              {/* FLOAT BUTTON */}
              <div
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-yellow-400/30
                  bg-yellow-400
                  text-[#0A0F1F]
                  shadow-[0_0_30px_rgba(250,204,21,0.45)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  group-hover:rotate-45
                  group-hover:scale-110
                "
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-1 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="
                  text-[22px]
                  font-medium
                  tracking-[-0.04em]
                  text-white
                "
              >
                {item.title}
              </h3>

              {item.description && (
                <p
                  className="
                    mt-2
                    line-clamp-2
                    text-sm
                    leading-relaxed
                    text-white/50
                  "
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>

          {/* STACK */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-white/15
                  bg-white/8
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  text-white/90
                  shadow-[0_0_20px_rgba(255,255,255,0.04)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-yellow-400/40
                  hover:bg-blue-600/20
                  hover:text-yellow-300
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================
   DESIGN GRID
========================= */

function DesignGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {projects.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.04,
          }}
          viewport={{ once: true }}
          className="mb-5 break-inside-avoid"
        >
          <Link href={`/projects/design/${item.slug}`}>
            <div className="group relative">
              {/* ROYAL BLUE GLOW */}
              <div
                className="
                  absolute
                  -inset-2
                  rounded-[34px]
                  bg-blue-600/20
                  blur-3xl
                  opacity-100
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.03]
                "
              >
                <div
                  className={`
                    relative overflow-hidden
                    ${
                      index % 3 === 0
                        ? "aspect-[4/5]"
                        : index % 2 === 0
                        ? "aspect-[4/6]"
                        : "aspect-[4/4.8]"
                    }
                  `}
                >
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.03]
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#020617]/70
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* FLOAT BUTTON */}
                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-yellow-400/30
                      bg-yellow-400
                      text-[#0A0F1F]
                      shadow-[0_0_30px_rgba(250,204,21,0.45)]
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      group-hover:scale-110
                    "
                  >
                    <ArrowRight size={15} className="rotate-[-45deg]" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const codeProjects = projects.code as Project[];
  const designProjects = projects.design as Project[];
  const videoProjects = projects.video as Project[];

  return (
    <>
      <Background />

      <main className="relative overflow-hidden px-5 pb-32 pt-24 md:px-10">
        {/* ROYAL BLUE AMBIENT GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[720px]
            w-[720px]
            -translate-x-1/2
            rounded-full
            bg-blue-700/20
            blur-[150px]
          "
        />

        {/* EXTRA SIDE LIGHT */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-1/3
            h-[400px]
            w-[400px]
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

        <div className="mx-auto max-w-7xl">
          {/* HERO */}
          <section className="mb-28 md:mb-36">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl"
            >
              {/* CAPSULE */}
              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/8
                  px-4
                  py-2
                  text-[11px]
                  uppercase
                  tracking-[0.24em]
                  text-white/80
                  shadow-[0_0_30px_rgba(255,255,255,0.04)]
                  backdrop-blur-2xl
                "
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.9)]" />
                Portfolio Collection
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-8
                  text-5xl
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.07em]
                  text-white
                  md:text-7xl
                  xl:text-[96px]
                "
              >
                Building modern
                <br />
                digital experiences
                <br />
                with clarity.
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-8
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-white/55
                  md:text-lg
                "
              >
                Selected works across development, interface design, and motion
                storytelling with a clean, modern, and futuristic approach.
              </p>
            </motion.div>
          </section>

          {/* CONTENT */}
          <div className="space-y-32 md:space-y-40">
            {/* DEVELOPMENT */}
            <section className="space-y-12">
              <SectionHeader
                icon={<Code2 size={16} />}
                title="Development"
                description="Modern platforms, realtime systems, and interactive products."
              />

              <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                {codeProjects.slice(0, 6).map((item) => (
                  <CleanCard
                    key={item.slug}
                    item={item}
                    href={`/projects/explore/${item.slug}`}
                  />
                ))}
              </div>
            </section>

            {/* DESIGN */}
            <section className="space-y-12">
              <SectionHeader
                icon={<Palette size={16} />}
                title="Design"
                description="Minimal visual explorations and interface concepts."
              />

              <DesignGrid projects={designProjects} />
            </section>

            {/* VIDEO */}
            <section className="space-y-12">
              <SectionHeader
                icon={<Clapperboard size={16} />}
                title="Motion & Video"
                description="Cinematic edits and visual storytelling experiences."
              />

              <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                {videoProjects.slice(0, 6).map((item) => (
                  <CleanCard
                    key={item.slug}
                    item={item}
                    href={`/projects/video/${item.slug}`}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
