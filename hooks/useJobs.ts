"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jobsData from "@/data/jobs.json";
import type { Job } from "@/types/job";
import { useDebounce } from "./useDebounce";

const allJobs = jobsData as Job[];

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

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (activeType !== "all") params.set("type", activeType);
    if (activeDepartment !== "all") params.set("dept", activeDepartment);

    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/", { scroll: false });
  }, [debouncedQuery, activeType, activeDepartment, router]);

  const filteredJobs = allJobs.filter((job) => {
    const q = debouncedQuery.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      (job.companyName?.toLowerCase().includes(q) ?? false);
    const matchesType = activeType === "all" || job.type === activeType;
    const matchesDept =
      activeDepartment === "all" || job.department === activeDepartment;
    return matchesSearch && matchesType && matchesDept;
  });

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveType("all");
    setActiveDepartment("all");
    router.replace("/", { scroll: false });
  }, [router]);

  return {
    jobs: filteredJobs,
    searchQuery,
    setSearchQuery,
    activeType,
    setActiveType,
    activeDepartment,
    setActiveDepartment,
    clearFilters,
    totalCount: allJobs.length,
  };
}
