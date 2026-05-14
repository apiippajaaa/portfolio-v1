"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B3D91]">
      {/* BASE GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1d5fd1_0%,#0B3D91_45%,#082b66_100%)]" />

      {/* GLOW TOP LEFT */}
      <div className="absolute top-[-15%] left-[-10%] w-187.5 h-187.5 rounded-full bg-[#F5F5DC]/12 blur-3xl" />

      {/* GLOW BOTTOM RIGHT */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[750px] h-[750px] rounded-full bg-blue-300/10 blur-3xl" />

      {/* EXTRA GLOW CENTER */}
      <div className="absolute top-[30%] left-[35%] w-125 h-125 rounded-full bg-white/5 blur-3xl" />

      {/* GRID */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
        }}
      />

      {/* GRID FADE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,61,145,0.25)_65%,rgba(11,61,145,0.75)_100%)]" />

      {/* LIGHT STREAK */}
      <div className="absolute top-0 left-[-20%] w-[140%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/15" />

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
