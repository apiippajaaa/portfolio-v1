const CONTENT = {
  badge: "JOURNEY",
  title: "Work Experience",
  description:
    "A curated journey of experiences, growth and professional milestones.",
};

export function JourneyHeader() {
  return (
    <header className="mb-16 text-center md:mb-20">
      <p className="text-[11px] uppercase tracking-[0.35em] text-yellow-400">
        {CONTENT.badge}
      </p>

      <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
        {CONTENT.title}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
        {CONTENT.description}
      </p>
    </header>
  );
}
