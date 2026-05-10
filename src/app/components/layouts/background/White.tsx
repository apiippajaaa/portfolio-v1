"use client";

export default function BackgroundWhite() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F8F5EE]">
      {/* BASE */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#F8F5EE_45%,#E8DCC2_100%)]
        "
      />

      {/* WARM GLOW */}
      <div
        className="
          absolute
          top-[-10%]
          left-[-10%]
          w-[700px]
          h-[700px]
          rounded-full
          bg-[#FFF6DD]/70
          blur-3xl
        "
      />

      {/* GOLDEN GLOW */}
      <div
        className="
          absolute
          bottom-[-20%]
          right-[-10%]
          w-[700px]
          h-[700px]
          rounded-full
          bg-[#DCC7A1]/35
          blur-3xl
        "
      />

      {/* ROYAL BLUE ACCENT */}
      <div
        className="
          absolute
          top-[20%]
          right-[15%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-[#0B3D91]/10
          blur-3xl
        "
      />

      {/* CENTER LIGHT */}
      <div
        className="
          absolute
          top-[35%]
          left-[35%]
          w-[450px]
          h-[450px]
          rounded-full
          bg-white/60
          blur-3xl
        "
      />

      {/* GRID */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,61,145,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,61,145,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* FADE */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.15)_60%,rgba(220,199,161,0.35)_100%)]
        "
      />

      {/* LIGHT STREAK */}
      <div
        className="
          absolute
          top-0
          left-[-20%]
          w-[140%]
          h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#0B3D91]/20
          to-transparent
        "
      />

      {/* NOISE */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-multiply
          bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
        "
      />
    </div>
  );
}
