"use client";

import { Search, X, CheckCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { value: "all", label: "All" },
  { value: "Full-time", label: "Full-time" },
  { value: "Contract", label: "Contract" },
] as const;

const DEPARTMENTS = [
  { value: "all", label: "All Departments" },
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
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

  const selectedDeptLabel =
    DEPARTMENTS.find((d) => d.value === activeDepartment)?.label ??
    "All Departments";

  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* ── Row 1: Search (stable width) + count ── */}
        <div className="flex items-center gap-3 pt-3 pb-2">
          <div className="relative flex-1">
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
              aria-label="Search jobs by title or company"
              className="w-full h-9 rounded-lg border border-white/8 bg-white/5 pl-8 pr-8 text-[13px] text-white/90 placeholder:text-white/30 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.07]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[12px] font-medium text-white/25 tabular-nums">
              {filteredCount === totalCount
                ? `${totalCount} roles`
                : `${filteredCount} of ${totalCount}`}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange("");
                  onTypeChange("all");
                  onDepartmentChange("all");
                  onToggleAppliedOnly(false);
                }}
                className="text-[11px] font-semibold text-white/30 underline underline-offset-2 hover:text-white/60 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Row 2: Filter chips (scrollable on mobile) ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          {/* Type pills */}
          <div
            role="group"
            aria-label="Filter by job type"
            className="flex shrink-0 items-center gap-0.5 rounded-lg border border-white/8 bg-white/5 p-0.5"
          >
            {JOB_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onTypeChange(value)}
                aria-pressed={activeType === value}
                className={cn(
                  "h-7 rounded-md px-3 text-[12px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                  activeType === value
                    ? "bg-white text-black font-semibold"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Department select */}
          <Select
            value={activeDepartment}
            onValueChange={(val) => onDepartmentChange(val ?? "all")}
          >
            <SelectTrigger
              aria-label="Filter by department"
              className="h-8 w-[148px] shrink-0 text-[12px] border-white/8 bg-white/5 text-white/60 focus:ring-0 focus:border-white/20 rounded-lg"
            >
              <SelectValue>{selectedDeptLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-white/10 rounded-xl shadow-2xl">
              {DEPARTMENTS.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-[13px] text-white/70 focus:bg-white/10 focus:text-white rounded-lg"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Applied toggle chip */}
          <button
            type="button"
            role="switch"
            aria-checked={showAppliedOnly}
            onClick={() => onToggleAppliedOnly(!showAppliedOnly)}
            className={cn(
              "flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
              showAppliedOnly
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-white/8 bg-white/5 text-white/50 hover:text-white/80"
            )}
          >
            <CheckCheck size={12} aria-hidden="true" />
            Applied
            {appliedCount > 0 && (
              <span
                className={cn(
                  "ml-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none",
                  showAppliedOnly
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-white/50"
                )}
              >
                {appliedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
