"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { JobCard } from "@/components/molecules/JobCard";
import { JobCardSkeleton } from "@/components/molecules/JobCardSkeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job";
import type { SortOption } from "@/hooks/useJobs";

interface JobGridProps {
  jobs: Job[];
  totalCount: number;
  isLoading: boolean;
  onJobClick: (job: Job) => void;
  onReset: () => void;
  isApplied: (jobId: string) => boolean;
  hasActiveFilters: boolean;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

const SKELETON_COUNT = 8;

export function JobGrid({
  jobs,
  totalCount,
  isLoading,
  onJobClick,
  onReset,
  isApplied,
  hasActiveFilters,
  sortBy,
  onSortChange,
}: JobGridProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const activeLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Newest first";

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-6 sm:px-6">

      {/* Count anchor + sort control */}
      {!isLoading && (
        <div className="mb-3 flex items-center justify-between gap-3 px-1">

          {/* Left: count + clear */}
          <div className="flex items-center gap-3 text-[12px] text-white/35">
            <span className="tabular-nums">
              {jobs.length === totalCount
                ? `${totalCount} open ${totalCount === 1 ? "role" : "roles"}`
                : `${jobs.length} of ${totalCount} roles`}
            </span>
            {hasActiveFilters && jobs.length > 0 && (
              <>
                <span aria-hidden="true" className="text-white/15">·</span>
                <button
                  type="button"
                  onClick={onReset}
                  className="font-medium text-white/35 underline underline-offset-2 transition-colors hover:text-white/60"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>

          {/* Right: sort dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((prev) => !prev)}
              className="flex items-center gap-1 text-[12px] text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <span>Sort: <span className="text-white/60">{activeLabel.replace(" first", "")}</span></span>
              <ChevronDown
                size={11}
                className={cn("transition-transform duration-150", sortOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {sortOpen && (
              <>
                {/* Click-away overlay */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                  aria-hidden="true"
                />
                {/* Dropdown panel */}
                <div
                  role="listbox"
                  aria-label="Sort order"
                  className="absolute right-0 top-full z-20 mt-1.5 w-36 overflow-hidden rounded-lg border border-white/10 bg-[#121214]/90 py-1 shadow-xl backdrop-blur-2xl"
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      role="option"
                      aria-selected={sortBy === value}
                      type="button"
                      onClick={() => {
                        onSortChange(value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-left text-[12px] transition-colors hover:bg-white/[0.05]",
                        sortBy === value ? "text-white" : "text-white/45"
                      )}
                    >
                      {label}
                      {sortBy === value && (
                        <Check size={11} className="text-white/60" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState onReset={onReset} />
      ) : (
        <motion.div className="flex flex-col gap-2.5" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                layout="position"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{
                  layout: { type: "spring", stiffness: 350, damping: 35, mass: 0.8 },
                  opacity: { duration: 0.18, delay: i * 0.025 },
                  y: { duration: 0.18, delay: i * 0.025 },
                }}
              >
                <JobCard job={job} onClick={onJobClick} isApplied={isApplied(job.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
