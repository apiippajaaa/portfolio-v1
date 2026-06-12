"use client";

type Star = {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
};

function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;

    return seed / 233280;
  };
}

const random = createSeededRandom(999);

const stars: Star[] = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  size: random() * 2.2 + 0.6,
  left: random() * 100,
  top: random() * 100,
  duration: random() * 60 + 50,
  delay: random() * -120,
  opacity: random() * 0.8 + 0.15,
}));

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* BASE */}
      <div className="absolute inset-0 bg-[#010101]" />

      {/* TOP GLOW */}
      <div className="absolute left-1/2 top-[-20%] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-white/4 blur-3xl" />

      {/* CENTER DEPTH */}
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

      {/* STARS */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 7}px rgba(255,255,255,0.9)`,
              animation: `spaceDrift ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_100%)]" />

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.018] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
