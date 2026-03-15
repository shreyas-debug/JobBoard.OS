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

export function JobCard({ job, onClick, isApplied = false }: JobCardProps) {
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
      className="group flex cursor-pointer items-center gap-5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-6 py-5 transition-all duration-300 ease-out hover:bg-white/[0.04] hover:border-white/[0.1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
    >
      {/* Brand gradient logo */}
      <div className="relative shrink-0">
        <CompanyLogo
          logoUrl={job.logoUrl}
          companyName={job.companyName ?? job.title}
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
      <div className="min-w-0 flex-1">
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
        className="shrink-0 text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/50"
        aria-hidden="true"
      />
    </article>
  );
}
