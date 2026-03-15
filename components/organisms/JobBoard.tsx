"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/organisms/Hero";
import { FilterBar } from "@/components/molecules/FilterBar";
import { JobGrid } from "@/components/organisms/JobGrid";
import { JobDetailSheet } from "@/components/organisms/JobDetailSheet";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/types/job";

export function JobBoard() {
  const {
    jobs,
    searchQuery,
    setSearchQuery,
    activeType,
    setActiveType,
    activeDepartment,
    setActiveDepartment,
    clearFilters,
    totalCount,
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeDepartment={activeDepartment}
        onDepartmentChange={setActiveDepartment}
        totalCount={totalCount}
        filteredCount={jobs.length}
      />
      <main className="flex-1">
        <JobGrid
          jobs={jobs}
          isLoading={isLoading}
          onJobClick={handleJobClick}
          onReset={clearFilters}
        />
      </main>
      <footer className="border-t border-zinc-800/60 py-6 text-center text-xs text-zinc-600">
        <p>
          JobBoard.OS &mdash; Built with Next.js &amp; Tailwind CSS
        </p>
      </footer>
      <JobDetailSheet
        job={selectedJob}
        open={isSheetOpen}
        onClose={handleSheetClose}
      />
    </div>
  );
}
