import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DevelopmentCarouselItem({ children }: Props) {
  return (
    <div className="snap-center shrink-0 w-75 sm:w-90 lg:w-105">{children}</div>
  );
}
