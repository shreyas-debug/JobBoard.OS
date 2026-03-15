"use client";

import { Search, X } from "lucide-react";
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
  totalCount: number;
  filteredCount: number;
}

const JOB_TYPES = [
  { value: "all", label: "All Types" },
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
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const hasActiveFilters =
    searchQuery || activeType !== "all" || activeDepartment !== "all";

  const selectedDeptLabel =
    DEPARTMENTS.find((d) => d.value === activeDepartment)?.label ?? "All Departments";

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={13}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by title or company…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search jobs by title or company"
              className="w-full h-9 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-8 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none transition-colors focus:border-gray-400 focus:ring-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Type pills */}
          <div
            role="group"
            aria-label="Filter by job type"
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-0.5"
          >
            {JOB_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onTypeChange(value)}
                aria-pressed={activeType === value}
                className={cn(
                  "h-7.5 rounded-md px-3 text-[12px] font-semibold transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900",
                  activeType === value
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-800"
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
              className="w-full sm:w-[160px] h-9 text-[13px] border-gray-200 bg-gray-50 text-gray-700 focus:ring-0 focus:border-gray-400 rounded-lg"
            >
              <SelectValue>{selectedDeptLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-md">
              {DEPARTMENTS.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-[13px] text-gray-700 focus:bg-gray-100 focus:text-gray-900 rounded-lg"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Count + clear */}
          <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
            <span className="text-[12px] font-medium text-gray-400 tabular-nums">
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
                }}
                className="text-[11px] font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
