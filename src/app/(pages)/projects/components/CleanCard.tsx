"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  stack: string[];
};

type Props = {
  item: Project;
};

export default function CleanCard({ item }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${item.slug}`} className="group block">
        {/* IMAGE */}
        <div className="relative">
          {/* GLOW */}
          <div className="absolute -inset-2 rounded-[34px] bg-blue-600/25 blur-3xl" />

          {/* CARD */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/10 to-transparent" />

              {/* ICON */}
              <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400 text-[#0A0F1F] shadow-[0_0_30px_rgba(250,204,21,0.45)] transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-1 pt-5">
          <h3 className="text-[22px] font-medium tracking-[-0.04em] text-white">
            {item.title}
          </h3>

          {item.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
              {item.description}
            </p>
          )}

          {/* STACK */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
