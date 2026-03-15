export function Hero() {
  return (
    <section className="border-b border-gray-200 bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-500 mb-6 tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          12 open positions
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Find your next great role.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-gray-500">
          Curated engineering, design, and marketing positions at the world&apos;s
          most forward-thinking technology companies.
        </p>
      </div>
    </section>
  );
}
