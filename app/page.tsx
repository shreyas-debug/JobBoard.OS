import { Suspense } from "react";
import { JobBoard } from "@/components/organisms/JobBoard";
import { JobCardSkeleton } from "@/components/molecules/JobCardSkeleton";

function FallbackGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Suspense fallback={<FallbackGrid />}>
        <JobBoard />
      </Suspense>
    </main>
  );
}
