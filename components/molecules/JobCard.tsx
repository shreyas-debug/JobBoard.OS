"use client";

import { MapPin, Clock, DollarSign, ChevronRight } from "lucide-react";
import { JobBadge } from "@/components/atoms/JobBadge";
import { LetterAvatar } from "@/components/atoms/LetterAvatar";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(job);
    }
  };

  const postedDate = new Date(job.postedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(job)}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${job.title} at ${job.companyName}`}
      className="group relative flex cursor-pointer flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-xl hover:shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <LetterAvatar
            companyName={job.companyName ?? job.title}
            size="md"
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-400 truncate">
              {job.companyName}
            </p>
            <h2
              className="mt-0.5 text-base font-semibold text-zinc-50 truncate"
              title={job.title}
            >
              {job.title}
            </h2>
          </div>
        </div>
        <ChevronRight
          className="shrink-0 text-zinc-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-400 mt-1"
          size={16}
          aria-hidden="true"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <JobBadge label={job.type} />
        <JobBadge label={job.department} />
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} aria-hidden="true" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={12} aria-hidden="true" />
          {job.salaryRange}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Clock size={12} aria-hidden="true" />
          {postedDate}
        </span>
      </div>
    </article>
  );
}
