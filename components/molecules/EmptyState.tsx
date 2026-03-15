import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
        <SearchX className="text-gray-400" size={26} aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-gray-800">No roles found</h3>
        <p className="max-w-xs text-[13px] text-gray-500">
          No positions match your current filters. Try a different search or
          clear your filters.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Reset filters
      </button>
    </div>
  );
}
