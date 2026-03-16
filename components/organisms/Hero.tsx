export function Hero() {
  return (
    <div className="relative w-full overflow-hidden text-center">
      {/* Radial gradient auras */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-indigo-600/20 blur-[80px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[180px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-violet-500/15 blur-[50px]"
        aria-hidden="true"
      />

      {/* Status badge */}
      <div
        className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/40"
        style={{ animation: "fadeSlideUp 0.5s ease both" }}
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Now hiring
      </div>

      {/* Headline */}
      <h1
        className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
        style={{ animation: "fadeSlideUp 0.6s ease 0.1s both" }}
      >
        <span className="bg-gradient-to-br from-white via-white/95 to-white/50 bg-clip-text text-transparent">
          Find your next great role.
        </span>
      </h1>
    </div>
  );
}
