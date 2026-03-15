interface HeroProps {
  openCount: number;
}

export function Hero({ openCount }: HeroProps) {
  return (
    <div className="text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        {openCount} open {openCount === 1 ? "position" : "positions"}
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-white/90 sm:text-5xl">
        Find your next great role.
      </h1>

      <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/40">
        Engineering, design, and marketing positions at world-class technology companies.
      </p>
    </div>
  );
}
