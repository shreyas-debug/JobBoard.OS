export function Hero({ openCount }: { openCount: number }) {
  return (
    <div className="relative w-full overflow-hidden text-center">
      {/* Radial gradient aura behind hero text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-indigo-600/20 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[240px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-violet-500/15 blur-[60px]"
        aria-hidden="true"
      />

      {/* Live badge */}
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/40"
        style={{ animation: "fadeSlideUp 0.5s ease both" }}
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        {openCount} open {openCount === 1 ? "position" : "positions"}
      </div>

      {/* Gradient headline */}
      <h1
        className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        style={{ animation: "fadeSlideUp 0.6s ease 0.1s both" }}
      >
        <span className="bg-gradient-to-br from-white via-white/95 to-white/50 bg-clip-text text-transparent">
          Find your next great role.
        </span>
      </h1>

      <p
        className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/40"
        style={{ animation: "fadeSlideUp 0.6s ease 0.2s both" }}
      >
        Engineering, design, and marketing positions at world-class technology
        companies.
      </p>
    </div>
  );
}
