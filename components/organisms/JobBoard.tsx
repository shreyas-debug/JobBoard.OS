"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/organisms/Hero";
import { FilterBar } from "@/components/molecules/FilterBar";
import { JobGrid } from "@/components/organisms/JobGrid";
import { JobDetailSheet } from "@/components/organisms/JobDetailSheet";
import { useJobs } from "@/hooks/useJobs";
import { useAppliedJobs } from "@/hooks/useAppliedJobs";
import type { Job } from "@/types/job";

export function JobBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
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

  const { appliedIds, applyToJob, isApplied } = useAppliedJobs();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setSheetOpen(true);
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
    <div className="relative min-h-screen bg-[#0A0A0A] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

      <Hero />

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

      <main>
        <JobGrid
          jobs={displayedJobs}
          isLoading={isLoading}
          onJobClick={handleJobClick}
          onReset={handleReset}
          isApplied={isApplied}
        />
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-[11px] text-white/25">
        JobBoard.OS &mdash; Built with Next.js, Tailwind CSS &amp; Shadcn/UI
      </footer>

      <JobDetailSheet
        job={selectedJob}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        isApplied={selectedJob ? isApplied(selectedJob.id) : false}
        onApply={applyToJob}
      />
    </div>
  );
}
