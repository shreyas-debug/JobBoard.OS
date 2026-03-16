"use client";

import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/organisms/Hero";
import { FilterBar } from "@/components/molecules/FilterBar";
import { StickyFilterBar } from "@/components/molecules/StickyFilterBar";
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
    sortBy,
    setSortBy,
  } = useJobs();

  const { appliedIds, applyToJob, unapplyFromJob, isApplied } = useAppliedJobs();

  // Sticky filter bar — visible once the hero section scrolls out of view
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]">

      {/* ── Sticky filter bar (appears on scroll) ── */}
      <StickyFilterBar
        visible={showSticky}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeDepartment={activeDepartment}
        onDepartmentChange={setActiveDepartment}
        showAppliedOnly={showAppliedOnly}
        onToggleAppliedOnly={setShowAppliedOnly}
        appliedCount={appliedIds.size}
      />

      {/* ── Top section: hero + filters ── */}
      <div
        ref={heroSectionRef}
        className="relative w-full overflow-hidden border-b border-white/10 px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(99,102,241,0.18) 0%, rgba(0,0,0,0) 60%), linear-gradient(to bottom, #000000 0%, #050508 60%, #0A0A0A 100%)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3">
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
          />
        </div>
      </div>

      {/* ── Bottom section: job list + ambient glow ── */}
      <div className="relative w-full overflow-hidden pb-24">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-100px] z-0 h-[600px] w-[800px] -translate-x-1/2 rounded-[100%] bg-indigo-500/15 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <JobGrid
            jobs={displayedJobs}
            totalCount={allJobs.length}
            isLoading={isLoading}
            onJobClick={handleJobClick}
            onReset={handleReset}
            isApplied={isApplied}
            hasActiveFilters={
              !!searchQuery ||
              activeType !== "all" ||
              activeDepartment !== "all" ||
              showAppliedOnly
            }
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/5 py-6 text-center">
        <p className="text-[11px] text-white/20">JobBoard.OS</p>
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
