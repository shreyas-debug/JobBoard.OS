"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, DollarSign, ArrowRight, Clock } from "lucide-react";
import { JobBadge } from "@/components/atoms/JobBadge";
import { LetterAvatar } from "@/components/atoms/LetterAvatar";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
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

export function JobCard({ job, onClick }: JobCardProps) {
  const [imgError, setImgError] = useState(false);
  const showLogo = job.logoUrl && !imgError;

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
      className="group flex cursor-pointer items-center gap-4 border-b border-gray-200 bg-white px-5 py-4 transition-colors duration-100 last:border-b-0 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
    >
      {/* Logo */}
      <div className="shrink-0">
        {showLogo ? (
          <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={job.logoUrl!}
              alt={`${job.companyName} logo`}
              fill
              className="object-contain p-1.5"
              onError={() => setImgError(true)}
              sizes="44px"
            />
          </div>
        ) : (
          <LetterAvatar companyName={job.companyName ?? job.title} size="md" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2
            className="text-[14px] font-semibold text-gray-900 truncate"
            title={job.title}
          >
            {job.title}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            <JobBadge label={job.type} />
            <JobBadge label={job.department} />
          </div>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12px] text-gray-500">
          <span className="font-medium text-gray-600">{job.companyName}</span>
          <span className="text-gray-300" aria-hidden="true">/</span>
          <span className="flex items-center gap-1">
            <MapPin size={10} aria-hidden="true" />
            {job.location}
          </span>
          <span className="text-gray-300" aria-hidden="true">/</span>
          <span className="flex items-center gap-1">
            <DollarSign size={10} aria-hidden="true" />
            {job.salaryRange}
          </span>
          <span className="text-gray-300" aria-hidden="true">/</span>
          <span className="flex items-center gap-1 text-gray-400">
            <Clock size={10} aria-hidden="true" />
            {timeAgo(job.postedAt)}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={15}
        className="shrink-0 text-gray-300 transition-colors duration-100 group-hover:text-gray-600"
        aria-hidden="true"
      />
    </article>
  );
}
