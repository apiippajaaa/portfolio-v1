import type { Experience } from "@/types/experiences";

import { JourneyItem } from "./Item";

type JourneyTimelineProps = {
  items: Experience[];
};

export function JourneyTimeline({ items }: JourneyTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-white/20 to-transparent md:left-1/2" />

      <div className="space-y-12 md:space-y-20">
        {items.map((item, index) => (
          <JourneyItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
