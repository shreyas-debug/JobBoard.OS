import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60">
        <SearchX className="text-zinc-500" size={28} aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-zinc-200">No roles found</h3>
        <p className="max-w-xs text-sm text-zinc-500">
          No jobs match your current filters. Try adjusting your search or
          clearing the filters.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="mt-2 border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
      >
        Reset filters
      </Button>
    </div>
  );
}
