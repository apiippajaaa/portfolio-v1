import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function FloatingNavButton({ direction, onClick }: Props) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={`group absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 backdrop-blur-2xl text-white/80 transition-all duration-300 hover:scale-105 hover:border-[#F5D76E]/30 hover:bg-black/40 hover:text-[#F5D76E] active:scale-95 ${
        isLeft ? "left-3" : "right-3"
      }`}
    >
      {isLeft ? (
        <ChevronLeft
          size={18}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      ) : (
        <ChevronRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}
