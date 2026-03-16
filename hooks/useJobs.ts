"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jobsData from "@/data/jobs.json";
import type { Job } from "@/types/job";
import { useDebounce } from "./useDebounce";

const ALL_JOBS = jobsData as Job[];

export type SortOption = "newest" | "oldest";

export function useJobs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") ?? ""
  );
  const [activeType, setActiveType] = useState(
    searchParams.get("type") ?? "all"
  );
  const [activeDepartment, setActiveDepartment] = useState(
    searchParams.get("dept") ?? "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "newest"
  );

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (activeType !== "all") params.set("type", activeType);
    if (activeDepartment !== "all") params.set("dept", activeDepartment);
    if (sortBy !== "newest") params.set("sort", sortBy);

    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/", { scroll: false });
  }, [debouncedQuery, activeType, activeDepartment, sortBy, router]);

  const filteredJobs = ALL_JOBS
    .filter((job) => {
      const q = debouncedQuery.toLowerCase();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        (job.companyName?.toLowerCase().includes(q) ?? false);
      const matchesType = activeType === "all" || job.type === activeType;
      const matchesDept =
        activeDepartment === "all" || job.department === activeDepartment;
      return matchesSearch && matchesType && matchesDept;
    })
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.postedAt).getTime();
      const dateB = new Date(b.postedAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveType("all");
    setActiveDepartment("all");
    setSortBy("newest");
    router.replace("/", { scroll: false });
  }, [router]);

  return {
    filteredJobs,
    allJobs: ALL_JOBS,
    searchQuery,
    setSearchQuery,
    activeType,
    setActiveType,
    activeDepartment,
    setActiveDepartment,
    sortBy,
    setSortBy,
    clearFilters,
    totalCount: ALL_JOBS.length,
  };
}
