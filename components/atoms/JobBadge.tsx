import { cn } from "@/lib/utils";

const variantStyles: Record<string, string> = {
  "Full-time":
    "bg-violet-500/10 text-violet-300 border border-violet-500/25 ring-violet-500/10",
  Contract:
    "bg-amber-500/10 text-amber-300 border border-amber-500/25 ring-amber-500/10",
  Remote:
    "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 ring-emerald-500/10",
  London:
    "bg-sky-500/10 text-sky-300 border border-sky-500/25 ring-sky-500/10",
  NYC: "bg-pink-500/10 text-pink-300 border border-pink-500/25 ring-pink-500/10",
  Engineering:
    "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 ring-indigo-500/10",
  Design:
    "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/25 ring-fuchsia-500/10",
  Marketing:
    "bg-orange-500/10 text-orange-300 border border-orange-500/25 ring-orange-500/10",
};

interface JobBadgeProps {
  label: string;
  className?: string;
}

export function JobBadge({ label, className }: JobBadgeProps) {
  const style =
    variantStyles[label] ??
    "bg-zinc-800 text-zinc-400 border border-zinc-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
