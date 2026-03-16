import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-4 sm:gap-5 sm:px-6 sm:py-5">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl bg-white/5" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-44 bg-white/5" />
          <Skeleton className="h-3.5 w-16 bg-white/5 rounded-full" />
          <Skeleton className="h-3.5 w-20 bg-white/5 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14 bg-white/5" />
          <Skeleton className="h-3 w-20 bg-white/5" />
          <Skeleton className="h-3 w-24 bg-white/5" />
        </div>
      </div>
      <Skeleton className="h-4 w-4 shrink-0 rounded bg-white/5" />
    </div>
  );
}
