import Image from "next/image";

type Props = {
  image: string;
  title: string;
};

export default function HeroPreview({ image, title }: Props) {
  return (
    <div className="relative">
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#F5D76E]/15 blur-3xl" />

      <div className="relative">
        <div className="absolute -inset-5 rounded-[40px] border border-white/5 bg-white/2 blur-2xl" />

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-2xl">
          <div className="relative aspect-16/11">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#04142F]/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
