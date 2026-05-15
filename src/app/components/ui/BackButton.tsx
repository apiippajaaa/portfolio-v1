"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  label?: string;
  showIcon?: boolean;
};

export default function BackButton({
  className = "",
  label = "Back",
  showIcon = true,
}: Props) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={className}>
      {showIcon && <ArrowLeft size={16} />}
      {label}
    </button>
  );
}
