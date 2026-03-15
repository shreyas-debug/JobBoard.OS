interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl">
        🔍
      </div>
      <p className="text-[15px] font-semibold text-white/70">No jobs found</p>
      <p className="mt-1 text-[13px] text-white/35">
        Try adjusting your filters or search term.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
      >
        Reset filters
      </button>
    </div>
  );
}
