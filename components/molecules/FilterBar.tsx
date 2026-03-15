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
    DEPARTMENTS.find((d) => d.value === activeDepartment)?.label ??
    "All Departments";

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={14}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by title or company…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search jobs by title or company"
              className="w-full h-9 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Type pills */}
          <div
            role="group"
            aria-label="Filter by job type"
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1"
          >
            {JOB_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onTypeChange(value)}
                aria-pressed={activeType === value}
                className={cn(
                  "h-7 rounded-md px-3 text-[12px] font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  activeType === value
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
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
              className="w-full sm:w-[165px] h-9 text-[13px] border-gray-200 bg-gray-50 text-gray-700 focus:ring-blue-100 focus:border-blue-400 rounded-lg"
            >
              <SelectValue>{selectedDeptLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
              {DEPARTMENTS.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-[13px] text-gray-700 focus:bg-blue-50 focus:text-blue-700 rounded-lg"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Count + clear */}
          <div className="flex items-center gap-2 sm:ml-auto shrink-0">
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
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
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
