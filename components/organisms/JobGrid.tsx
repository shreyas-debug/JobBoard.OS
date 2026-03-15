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

const SKELETON_COUNT = 6;

export function JobGrid({ jobs, isLoading, onJobClick, onReset }: JobGridProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))
        ) : jobs.length === 0 ? (
          <EmptyState onReset={onReset} />
        ) : (
          <AnimatePresence mode="popLayout">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.35,
                  type: "tween",
                }}
                layout
              >
                <JobCard job={job} onClick={onJobClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
