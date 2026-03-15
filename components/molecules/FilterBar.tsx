"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
              size={15}
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search roles or companies…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search jobs by title or company"
              className="pl-9 bg-zinc-900/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-violet-500/20 h-9 text-sm"
            />
          </div>

          {/* Job Type pills */}
          <div
            role="group"
            aria-label="Filter by job type"
            className="flex items-center gap-1"
          >
            {JOB_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onTypeChange(value)}
                aria-pressed={activeType === value}
                className={cn(
                  "h-8 rounded-full px-3 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950",
                  activeType === value
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-900/40"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
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
              className="w-full sm:w-[160px] h-8 bg-zinc-900/60 border-zinc-800 text-zinc-300 text-xs focus:ring-violet-500/20 focus:border-violet-500"
            >
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {DEPARTMENTS.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-zinc-300 text-xs focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Count */}
          <span className="shrink-0 text-xs text-zinc-500 sm:ml-auto">
            {filteredCount === totalCount
              ? `${totalCount} roles`
              : `${filteredCount} of ${totalCount} roles`}
          </span>
        </div>
      </div>
    </div>
  );
}
