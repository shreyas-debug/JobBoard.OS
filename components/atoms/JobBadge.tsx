interface JobBadgeProps {
  label: string;
}

export function JobBadge({ label }: JobBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/60">
      {label}
    </span>
  );
}
