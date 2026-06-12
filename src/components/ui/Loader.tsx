import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
};

export default function Loader({ className }: LoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <div className={cn("loader", className)} />
    </div>
  );
}
