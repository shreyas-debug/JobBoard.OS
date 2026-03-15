"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JobCard } from "@/components/molecules/JobCard";
import { JobCardSkeleton } from "@/components/molecules/JobCardSkeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import type { Job } from "@/types/job";

interface JobGridProps {
  jobs: Job[];
  isLoading: boolean;
  onJobClick: (job: Job) => void;
  onReset: () => void;
}

const SKELETON_COUNT = 8;

export function JobGrid({ jobs, isLoading, onJobClick, onReset }: JobGridProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {isLoading ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState onReset={onReset} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <AnimatePresence mode="popLayout">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2, type: "tween" }}
                layout
              >
                <JobCard job={job} onClick={onJobClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
