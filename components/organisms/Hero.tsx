import { Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]"
          style={{ animation: "spotlight 6s ease-in-out infinite" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-400 mb-6">
          <Briefcase size={12} aria-hidden="true" />
          <span>12 open positions</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent leading-tight">
            Find your next role.
          </span>
          <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent leading-tight mt-1">
            Build what matters.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Curated engineering, design, and marketing roles at the world&apos;s
          most forward-thinking technology companies.
        </p>
      </div>
    </section>
  );
}
