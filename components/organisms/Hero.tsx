export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-white py-16 sm:py-20">
      {/* Subtle blue radial glow top-center */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-100/60 blur-[100px]"
        aria-hidden="true"
      />

      {/* Dot grid — very faint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, black 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-600 mb-7 tracking-wide uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          12 open positions
        </div>

        {/* Headline */}
        <h1 className="text-[2.6rem] font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] leading-[1.15]">
          Find your next{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            great role.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-gray-500">
          Curated engineering, design, and marketing positions at the world&apos;s
          most forward-thinking technology companies.
        </p>
      </div>
    </section>
  );
}
