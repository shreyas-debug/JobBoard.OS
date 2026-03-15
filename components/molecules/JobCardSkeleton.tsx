import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-5 py-4 last:border-b-0">
      <Skeleton className="h-11 w-11 shrink-0 rounded-xl bg-gray-100" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-44 bg-gray-100" />
          <Skeleton className="h-3.5 w-16 bg-gray-100" />
          <Skeleton className="h-3.5 w-20 bg-gray-100" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-14 bg-gray-100" />
          <Skeleton className="h-3 w-16 bg-gray-100" />
          <Skeleton className="h-3 w-28 bg-gray-100" />
        </div>
      </div>
      <Skeleton className="h-3.5 w-3.5 bg-gray-100" />
    </div>
  );
}
