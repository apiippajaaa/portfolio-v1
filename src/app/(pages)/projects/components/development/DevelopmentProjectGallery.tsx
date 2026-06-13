"use client";

import { useState } from "react";

import GalleryCard from "./DevelopmentGalleryCard";
import FloatingNavButton from "./floating-nav-button";
import DevelopmentGalleryCard from "./DevelopmentGalleryCard";

type Props = {
  title: string;
  images: string[];
};

export default function DevelopmentProjectGallery({ title, images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  const hasMultipleImages = images.length > 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="mt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* header */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#F5D76E]/55">
              Gallery
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
              Project Screens
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-[#F5F5DC]/55 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#F5D76E]" />
            {images.length} Preview
          </div>
        </div>

        {/* mobile carousel */}
        <div className="relative md:hidden">
          <div className="overflow-hidden rounded-4xl">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={image} className="min-w-full">
                  <GalleryCard
                    image={image}
                    alt={`${title} preview ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {hasMultipleImages && (
            <>
              <FloatingNavButton direction="left" onClick={prevSlide} />

              <FloatingNavButton direction="right" onClick={nextSlide} />
            </>
          )}

          {/* dots */}
          <div className="mt-5 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-1.5 rounded-full transition-all duration-300
                  ${
                    currentIndex === index
                      ? "w-8 bg-[#F5D76E]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* desktop */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <DevelopmentGalleryCard
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
