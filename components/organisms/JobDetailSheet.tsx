"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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
        className="w-full sm:max-w-[520px] overflow-y-auto border-l border-gray-200 bg-white p-0 shadow-xl"
      >
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-5">
          <SheetHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5 min-w-0">
                <LetterAvatar companyName={job.companyName ?? job.title} size="lg" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    {job.companyName}
                  </p>
                  <SheetTitle className="mt-0.5 text-lg font-bold text-gray-900 leading-snug">
                    {job.title}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Job details for {job.title} at {job.companyName}
                  </SheetDescription>
                </div>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <JobBadge label={job.type} />
              <JobBadge label={job.department} />
              <JobBadge label={job.location} />
            </div>

            <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-gray-400" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd>{job.location}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign size={11} className="text-gray-400" aria-hidden="true" />
                <dt className="sr-only">Salary</dt>
                <dd className="font-medium text-gray-700">{job.salaryRange}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="text-gray-400" aria-hidden="true" />
                <dt className="sr-only">Posted</dt>
                <dd>Posted {postedDate}</dd>
              </div>
            </dl>
          </SheetHeader>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-[0.15em]">
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
                      <p className="text-[13px] font-semibold text-gray-800 mb-2.5">
                        {heading}
                      </p>
                      <ul className="space-y-2">
                        {lines
                          .filter((l) => l.startsWith("- "))
                          .map((line, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-relaxed"
                            >
                              <span
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
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
                  <p key={i} className="text-[13px] text-gray-600 leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          <Separator className="bg-gray-100" />

          {/* CTA */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Apply Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Back
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
