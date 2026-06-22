// components/development/DevelopmentCarouselItem.tsx

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DevelopmentCarouselItem({ children }: Props) {
  return (
    <div
      className="
        snap-center
        shrink-0
        w-[300px]
        sm:w-[360px]
        lg:w-[420px]
      "
    >
      {children}
    </div>
  );
}
