"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type VideoPreviewModalProps = {
  videoUrl: string | null;
  onClose: () => void;
};

const BACKDROP_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const MODAL_ANIMATION = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
};

const BACKDROP_TRANSITION = {
  duration: 0.2,
};

const MODAL_TRANSITION = {
  duration: 0.25,
  ease: "easeOut" as const,
};

export default function VideoPreviewModal({
  videoUrl,
  onClose,
}: VideoPreviewModalProps) {
  useEffect(() => {
    if (!videoUrl) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [videoUrl, onClose]);

  return (
    <AnimatePresence>
      {videoUrl ? (
        <motion.div
          {...BACKDROP_ANIMATION}
          transition={BACKDROP_TRANSITION}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
          className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-xl"
        >
          <div className="flex min-h-dvh items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 sm:top-4 sm:right-4 sm:h-11 sm:w-11"
            >
              <X size={18} />
            </button>

            <motion.div
              {...MODAL_ANIMATION}
              transition={MODAL_TRANSITION}
              onClick={(event) => event.stopPropagation()}
              className=" w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:rounded-3xl"
            >
              <div className="aspect-video max-h-[85vh] w-full">
                <video
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                  className="h-full w-full object-contain"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
