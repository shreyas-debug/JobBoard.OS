import { cn } from "@/lib/utils";

const variantStyles: Record<string, string> = {
  "Full-time": "bg-blue-50 text-blue-700 border-blue-200",
  Contract:    "bg-amber-50 text-amber-700 border-amber-200",
  Remote:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  London:      "bg-violet-50 text-violet-700 border-violet-200",
  NYC:         "bg-rose-50 text-rose-700 border-rose-200",
  Engineering: "bg-slate-100 text-slate-700 border-slate-200",
  Design:      "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  Marketing:   "bg-orange-50 text-orange-700 border-orange-200",
};

interface JobBadgeProps {
  label: string;
  className?: string;
}

export function JobBadge({ label, className }: JobBadgeProps) {
  const style = variantStyles[label] ?? "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
