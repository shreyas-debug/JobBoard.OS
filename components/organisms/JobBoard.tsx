"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/organisms/Hero";
import { FilterBar } from "@/components/molecules/FilterBar";
import { JobGrid } from "@/components/organisms/JobGrid";
import { JobDetailDialog } from "@/components/organisms/JobDetailDialog";
import { useJobs } from "@/hooks/useJobs";
import { useAppliedJobs } from "@/hooks/useAppliedJobs";
import type { Job } from "@/types/job";

export function JobBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);

  const {
    filteredJobs,
    allJobs,
    searchQuery,
    setSearchQuery,
    activeType,
    setActiveType,
    activeDepartment,
    setActiveDepartment,
  } = useJobs();

  const { appliedIds, applyToJob, unapplyFromJob, isApplied } = useAppliedJobs();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setActiveType("all");
    setActiveDepartment("all");
    setShowAppliedOnly(false);
  };

  const displayedJobs = showAppliedOnly
    ? filteredJobs.filter((j) => appliedIds.has(j.id))
    : filteredJobs;

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">

      {/* ── Top section: pure black, hero + filters ── */}
      <div className="w-full border-b border-white/10 bg-black px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
          <Hero openCount={displayedJobs.length} />
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeType={activeType}
            onTypeChange={setActiveType}
            activeDepartment={activeDepartment}
            onDepartmentChange={setActiveDepartment}
            showAppliedOnly={showAppliedOnly}
            onToggleAppliedOnly={setShowAppliedOnly}
            appliedCount={appliedIds.size}
            totalCount={allJobs.length}
            filteredCount={displayedJobs.length}
          />
        </div>
      </div>

      {/* ── Bottom section: job list + ambient glow ── */}
      <div className="relative w-full overflow-hidden pb-24">
        {/* Fail-safe ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-100px] z-0 h-[600px] w-[800px] -translate-x-1/2 rounded-[100%] bg-indigo-500/15 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <JobGrid
            jobs={displayedJobs}
            isLoading={isLoading}
            onJobClick={handleJobClick}
            onReset={handleReset}
            isApplied={isApplied}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-6 text-center">
        <p className="text-[11px] text-white/20">
          JobBoard.OS &mdash; Next.js · Tailwind CSS · Shadcn/UI
        </p>
      </div>

      {/* ── Centered Dialog (replaces Sheet) ── */}
      <JobDetailDialog
        job={selectedJob}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        isApplied={selectedJob ? isApplied(selectedJob.id) : false}
        onApply={applyToJob}
        onWithdraw={unapplyFromJob}
      />
    </div>
  );
}
