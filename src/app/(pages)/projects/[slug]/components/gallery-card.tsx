import Image from "next/image";

type Props = {
  image: string;
  alt: string;
};

export default function GalleryCard({ image, alt }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#F5D76E15_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-[1.03]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#04142F]/45 via-transparent to-transparent" />
      </div>
    </div>
  );
}
