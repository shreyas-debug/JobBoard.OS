import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <SearchX className="text-gray-400" size={22} aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-gray-800">No roles found</h3>
        <p className="max-w-xs text-[13px] text-gray-500">
          No positions match your current filters.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
      >
        Reset filters
      </button>
    </div>
  );
}
