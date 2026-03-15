import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl bg-gray-100" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-40 rounded-md bg-gray-100" />
          <Skeleton className="h-4 w-16 rounded-md bg-gray-100" />
          <Skeleton className="h-4 w-20 rounded-md bg-gray-100" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16 rounded-md bg-gray-100" />
          <Skeleton className="h-3 w-14 rounded-md bg-gray-100" />
          <Skeleton className="h-3 w-24 rounded-md bg-gray-100" />
        </div>
      </div>
      <Skeleton className="h-4 w-4 rounded bg-gray-100" />
    </div>
  );
}
