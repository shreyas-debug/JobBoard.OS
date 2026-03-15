const BADGE_STYLES: Record<string, string> = {
  // Types
  "Full-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Contract":  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  // Departments
  "Engineering": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Design":      "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Marketing":   "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  // Locations
  "Remote": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "London": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "NYC":    "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const DEFAULT_STYLE = "bg-white/[0.05] text-white/55 border-white/[0.08]";

interface JobBadgeProps {
  label: string;
}

export function JobBadge({ label }: JobBadgeProps) {
  const styles = BADGE_STYLES[label] ?? DEFAULT_STYLE;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles}`}
    >
      {label}
    </span>
  );
}
