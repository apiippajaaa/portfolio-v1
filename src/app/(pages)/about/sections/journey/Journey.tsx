"use client";

import { useState } from "react";

import SectionButton from "@/components/ui/SectionButton";

import { experiences } from "@/data/experiences";

import { JourneyHeader } from "./JourneyHeader";
import { JourneyTimeline } from "./JourneyTimeline";
import { INITIAL_VISIBLE_ITEMS } from "./constants";

export default function Journey() {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? experiences
    : experiences.slice(0, INITIAL_VISIBLE_ITEMS);

  const hasMoreItems = experiences.length > INITIAL_VISIBLE_ITEMS;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl md:px-6">
        <JourneyHeader />

        <JourneyTimeline items={visibleItems} />

        {hasMoreItems && (
          <div className="mt-12 flex justify-center md:mt-16">
            <SectionButton
              variant="glass"
              className="min-w-40 cursor-pointer border-white/10 text-white/70 hover:text-white"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Collapse Timeline" : "Explore More"}
            </SectionButton>
          </div>
        )}
      </div>
    </section>
  );
}
