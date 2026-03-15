import { Suspense } from "react";
import { JobBoard } from "@/components/organisms/JobBoard";
import { JobCardSkeleton } from "@/components/molecules/JobCardSkeleton";

function FallbackGrid() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Suspense fallback={<FallbackGrid />}>
        <JobBoard />
      </Suspense>
    </main>
  );
}
