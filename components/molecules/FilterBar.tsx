"use client";

import { Search, X, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeType: string;
  onTypeChange: (value: string) => void;
  activeDepartment: string;
  onDepartmentChange: (value: string) => void;
  showAppliedOnly: boolean;
  onToggleAppliedOnly: (val: boolean) => void;
  appliedCount: number;
  totalCount: number;
  filteredCount: number;
}

const JOB_TYPES = [
  { value: "all",       label: "All"       },
  { value: "Full-time", label: "Full-time" },
  { value: "Contract",  label: "Contract"  },
  { value: "Part-time", label: "Part-time" },
] as const;

const DEPARTMENTS = [
  { value: "all",         label: "All Departments" },
  { value: "Engineering", label: "Engineering"     },
  { value: "Design",      label: "Design"          },
  { value: "Marketing",   label: "Marketing"       },
  { value: "Product",     label: "Product"         },
] as const;

export function FilterBar({
  searchQuery,
  onSearchChange,
  activeType,
  onTypeChange,
  activeDepartment,
  onDepartmentChange,
  showAppliedOnly,
  onToggleAppliedOnly,
  appliedCount,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const hasActiveFilters =
    !!searchQuery ||
    activeType !== "all" ||
    activeDepartment !== "all" ||
    showAppliedOnly;

  return (
    <div
      className="flex w-full max-w-2xl flex-col gap-3"
      style={{ animation: "fadeSlideUp 0.6s ease 0.3s both" }}
    >

      {/* ── Row 1: Search (full width) ── */}
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          size={13}
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search roles or companies…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search jobs"
          className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.05] pl-8 pr-8 text-[13px] text-white placeholder:text-white/30 outline-none transition-all focus:border-white/25 focus:bg-white/[0.08]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
            aria-label="Clear search"
          >
            <X size={11} />
          </button>
        )}
      </div>

      {/* ── Row 2: Type pills + Applied toggle ── */}
      <div className="flex items-center justify-between gap-2">

        {/* Type pills */}
        <div
          role="group"
          aria-label="Filter by job type"
          className="flex flex-1 gap-0.5 rounded-lg border border-white/8 bg-white/[0.03] p-0.5"
        >
          {JOB_TYPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onTypeChange(value)}
              aria-pressed={activeType === value}
              className={cn(
                "flex-1 h-8 rounded-md px-2 text-[11px] sm:text-[12px] sm:px-3 whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                activeType === value
                  ? "bg-white/10 text-white font-semibold border border-white/20"
                  : "font-medium text-white/45 hover:text-white/75"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Applied toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={showAppliedOnly}
          onClick={() => onToggleAppliedOnly(!showAppliedOnly)}
          className={cn(
            "flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
            showAppliedOnly
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-white/8 bg-white/[0.03] text-white/45 hover:bg-white/[0.06] hover:border-white/15 hover:text-white/75"
          )}
        >
          <CheckCheck size={12} aria-hidden="true" />
          Applied
          {appliedCount > 0 && (
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none",
                showAppliedOnly
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/10 text-white/45"
              )}
            >
              {appliedCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Row 3: Department pills (horizontal scroll) ── */}
      <div
        role="group"
        aria-label="Filter by department"
        className="flex w-full items-center gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {DEPARTMENTS.map(({ value, label }) => {
          const isActive = activeDepartment === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onDepartmentChange(value)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                isActive
                  ? "border-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "border-white/10 bg-transparent text-white/60 hover:bg-white/[0.05] hover:text-white"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Row 4: Count + clear ── */}
      <div className="flex items-center justify-center gap-3 text-[12px] text-white/30">
        <span className="tabular-nums">
          {filteredCount === totalCount
            ? `${totalCount} roles`
            : `${filteredCount} of ${totalCount} roles`}
        </span>
        {hasActiveFilters && (
          <>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                onTypeChange("all");
                onDepartmentChange("all");
                onToggleAppliedOnly(false);
              }}
              className="font-semibold underline underline-offset-2 hover:text-white/60 transition-colors"
            >
              Clear filters
            </button>
          </>
        )}
      </div>
    </div>
  );
}
