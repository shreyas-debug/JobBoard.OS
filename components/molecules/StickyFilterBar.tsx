"use client";

import { Search, X, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyFilterBarProps {
  visible: boolean;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  activeType: string;
  onTypeChange: (v: string) => void;
  activeDepartment: string;
  onDepartmentChange: (v: string) => void;
  showAppliedOnly: boolean;
  onToggleAppliedOnly: (v: boolean) => void;
  appliedCount: number;
}

const JOB_TYPES = [
  { value: "all",       label: "All"       },
  { value: "Full-time", label: "Full-time" },
  { value: "Contract",  label: "Contract"  },
  { value: "Part-time", label: "Part-time" },
] as const;

const DEPARTMENTS = [
  { value: "all",         label: "All Depts"    },
  { value: "Engineering", label: "Engineering"  },
  { value: "Design",      label: "Design"       },
  { value: "Marketing",   label: "Marketing"    },
  { value: "Product",     label: "Product"      },
] as const;

export function StickyFilterBar({
  visible,
  searchQuery,
  onSearchChange,
  activeType,
  onTypeChange,
  activeDepartment,
  onDepartmentChange,
  showAppliedOnly,
  onToggleAppliedOnly,
  appliedCount,
}: StickyFilterBarProps) {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl transition-all duration-300 ease-in-out",
        visible
          ? "translate-y-0 opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      {/* Subtle gradient tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% -20%, rgba(99,102,241,0.08), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-2.5 sm:px-6">

        {/* Row 1: Search */}
        <div className="relative mb-2">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search roles or companies…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search jobs"
            className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-8 pr-8 text-[13px] text-white placeholder:text-white/30 outline-none transition-all focus:border-white/25 focus:bg-white/[0.09]"
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

        {/* Row 2: All chips in one horizontal scroll row */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Type pills */}
          {JOB_TYPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onTypeChange(value)}
              aria-pressed={activeType === value}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                activeType === value
                  ? "border-white bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.12)]"
                  : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white"
              )}
            >
              {label}
            </button>
          ))}

          {/* Divider */}
          <span className="shrink-0 h-4 w-px bg-white/10 mx-0.5" aria-hidden="true" />

          {/* Department pills */}
          {DEPARTMENTS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onDepartmentChange(value)}
              aria-pressed={activeDepartment === value}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                activeDepartment === value
                  ? "border-white bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.12)]"
                  : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white"
              )}
            >
              {label}
            </button>
          ))}

          {/* Divider */}
          <span className="shrink-0 h-4 w-px bg-white/10 mx-0.5" aria-hidden="true" />

          {/* Applied toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={showAppliedOnly}
            onClick={() => onToggleAppliedOnly(!showAppliedOnly)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
              showAppliedOnly
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white"
            )}
          >
            <CheckCheck size={11} aria-hidden="true" />
            Applied
            {appliedCount > 0 && (
              <span className={cn(
                "rounded px-1.5 py-0.5 text-[9px] font-bold tabular-nums leading-none",
                showAppliedOnly ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
              )}>
                {appliedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
