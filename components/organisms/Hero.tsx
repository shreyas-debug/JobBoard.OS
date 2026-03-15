export function Hero() {
  return (
    <section className="pt-10 pb-5 text-center sm:pt-14 sm:pb-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/50 mb-5 tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          12 open positions
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-white/90 sm:text-[44px]">
          Find your next great role.
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-white/40">
          Engineering, design, and marketing positions at world-class technology companies.
        </p>
      </div>
    </section>
  );
}
