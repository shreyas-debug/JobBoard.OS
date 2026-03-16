"use client";

import { MapPin, DollarSign, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { JobBadge } from "@/components/atoms/JobBadge";
import { CompanyLogo } from "@/components/atoms/CompanyLogo";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  isApplied?: boolean;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

function isNew(dateStr: string): boolean {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff <= 3;
}

const DEPT_ACCENT: Record<string, string> = {
  Engineering: "rgba(99,102,241,",   // indigo
  Design:      "rgba(244,63,94,",    // rose
  Marketing:   "rgba(245,158,11,",   // amber
  Product:     "rgba(20,184,166,",   // teal
};

export function JobCard({ job, onClick, isApplied = false }: JobCardProps) {
  const fresh = isNew(job.postedAt);
  const accentBase = DEPT_ACCENT[job.department] ?? "rgba(255,255,255,";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(job);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(job)}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${job.title} at ${job.companyName}`}
      className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 transition-all duration-300 ease-out hover:bg-white/[0.07] hover:border-white/[0.14] hover:-translate-y-[3px] hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
      style={{
        // @ts-expect-error CSS custom property
        "--hover-shadow": `0 8px 32px ${accentBase}0.12)`,
      }}
    >
      {/* Left accent bar — slides in on hover */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 rounded-r-full transition-transform duration-300 ease-out group-hover:scale-y-100"
        style={{ background: `${accentBase}0.7)` }}
        aria-hidden="true"
      />

      {/* Subtle background glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${accentBase}0.06) 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Brand gradient logo */}
      <div className="relative shrink-0 z-10">
        <CompanyLogo
          logoUrl={job.logoUrl}
          companyName={job.companyName}
          size="md"
        />
        {isApplied && (
          <div
            className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A0A0A]"
            aria-hidden="true"
          >
            <CheckCircle2 size={13} className="text-emerald-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2
            className="text-[14px] font-semibold tracking-tight text-white/90 truncate"
            title={job.title}
          >
            {job.title}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            <JobBadge label={job.type} />
            <JobBadge label={job.department} />
          </div>
          {fresh && !isApplied && (
            <span className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
              New
            </span>
          )}
          {isApplied && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              <CheckCircle2 size={9} aria-hidden="true" />
              Applied
            </span>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-white/40">
          <span className="font-medium text-white/60">{job.companyName}</span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MapPin size={10} aria-hidden="true" />
            {job.location}
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <DollarSign size={10} aria-hidden="true" />
            {job.salaryRange}
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-white/30">
            <Clock size={10} aria-hidden="true" />
            {timeAgo(job.postedAt)}
          </span>
        </div>
      </div>

      {/* Arrow slides right on hover */}
      <ArrowRight
        size={14}
        className="relative z-10 shrink-0 text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/50"
        aria-hidden="true"
      />
    </article>
  );
}
