"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { JobBadge } from "@/components/atoms/JobBadge";
import { LetterAvatar } from "@/components/atoms/LetterAvatar";
import { MapPin, DollarSign, Calendar, ExternalLink, X } from "lucide-react";
import type { Job } from "@/types/job";

interface JobDetailSheetProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

export function JobDetailSheet({ job, open, onClose }: JobDetailSheetProps) {
  if (!job) return null;

  const postedDate = new Date(job.postedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const descriptionParagraphs = job.description.split("\n\n").filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-[500px] border-l border-gray-200 bg-white p-0"
      >
        {/* Sticky header */}
        <div className="shrink-0 border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <LetterAvatar companyName={job.companyName ?? job.title} size="md" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  {job.companyName}
                </p>
                <SheetTitle className="mt-0.5 text-base font-bold leading-snug text-gray-900">
                  {job.title}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Job details for {job.title} at {job.companyName}
                </SheetDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-0.5 shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              aria-label="Close panel"
            >
              <X size={15} />
            </button>
          </div>

          {/* Badges + meta in header */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <JobBadge label={job.type} />
            <JobBadge label={job.department} />
            <JobBadge label={job.location} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={10} aria-hidden="true" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <DollarSign size={10} aria-hidden="true" />
              {job.salaryRange}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} aria-hidden="true" />
              Posted {postedDate}
            </span>
          </div>

          {/* Primary CTA — top */}
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Apply Now
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
            About the Role
          </h3>
          <div className="space-y-4">
            {descriptionParagraphs.map((para, i) => {
              const isHeading =
                para.startsWith("Key Responsibilities") ||
                para.startsWith("Requirements");

              if (isHeading) {
                const [heading, ...lines] = para.split("\n");
                return (
                  <div key={i}>
                    <p className="mb-2.5 text-[13px] font-semibold text-gray-800">
                      {heading}
                    </p>
                    <ul className="space-y-2">
                      {lines
                        .filter((l) => l.startsWith("- "))
                        .map((line, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-gray-600"
                          >
                            <span
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gray-400"
                              aria-hidden="true"
                            />
                            {line.replace("- ", "")}
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }

              return (
                <p key={i} className="text-[13px] leading-relaxed text-gray-600">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Apply for this Position
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-lg border border-gray-200 py-2.5 text-[13px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
          >
            Back to listings
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
