"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  slug: string;
  heroImage: string;
};

export default function DesignGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {projects.map((item, index) => (
        <motion.div
          key={item.slug}
          className="mb-5 break-inside-avoid"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href={`/projects/design/${item.slug}`}>
            <div className="group relative">
              <div className="absolute -inset-2 rounded-[34px] bg-blue-600/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-[#0A0F1F]">
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
