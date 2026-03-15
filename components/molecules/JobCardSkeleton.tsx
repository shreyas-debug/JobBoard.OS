import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl bg-zinc-800" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20 rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-36 rounded-full bg-zinc-800" />
          </div>
        </div>
        <Skeleton className="h-4 w-4 rounded bg-zinc-800 mt-1" />
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full bg-zinc-800" />
        <Skeleton className="h-5 w-20 rounded-full bg-zinc-800" />
      </div>

      {/* Meta */}
      <div className="flex gap-4">
        <Skeleton className="h-3 w-14 rounded-full bg-zinc-800" />
        <Skeleton className="h-3 w-24 rounded-full bg-zinc-800" />
      </div>
    </div>
  );
}
