"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { DesignProject } from "@/types/projects";

import Loader from "@/components/ui/Loader";

type Props = {
  projects: DesignProject[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function DesignPreviewModal({
  projects,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const project = activeIndex !== null ? projects[activeIndex] : null;

  const [loadedCover, setLoadedCover] = useState("");

  const isLoading = project ? loadedCover !== project.cover : false;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePrev = useCallback(() => {
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          handleClose();
          break;

        case "ArrowLeft":
          handlePrev();
          break;

        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleClose, handlePrev, handleNext]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
        className="fixed inset-0 z-9999 bg-black/85 backdrop-blur-xl"
      >
        <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
          <button
            type="button"
            aria-label="Close preview"
            onClick={handleClose}
            className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="absolute top-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md">
            {activeIndex! + 1} / {projects.length}
          </div>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-95 md:flex cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-95 md:flex cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={project.cover}
            initial={{
              opacity: 0,
              scale: 0.97,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-[92vw] items-center justify-center"
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
                    <Loader className="scale-125" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Image
              key={project.cover}
              src={project.cover}
              alt={`Design ${project.id}`}
              width={2000}
              height={3000}
              priority
              draggable={false}
              onLoad={() => setLoadedCover(project.cover)}
              className={`max-h-[92vh] w-auto rounded-2xl object-contain shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
