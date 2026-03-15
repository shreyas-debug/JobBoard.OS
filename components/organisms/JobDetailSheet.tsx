"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { JobBadge } from "@/components/atoms/JobBadge";
import { LetterAvatar } from "@/components/atoms/LetterAvatar";
import { MapPin, DollarSign, Calendar, ExternalLink } from "lucide-react";
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

  const descriptionParagraphs = job.description
    .split("\n\n")
    .filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[540px] overflow-y-auto bg-zinc-950 border-zinc-800 p-0"
      >
        {/* Header band */}
        <div className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-6">
          <SheetHeader>
            <div className="flex items-start gap-4">
              <LetterAvatar
                companyName={job.companyName ?? job.title}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-400">
                  {job.companyName}
                </p>
                <SheetTitle className="mt-0.5 text-xl font-bold text-zinc-50 leading-snug">
                  {job.title}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Job details for {job.title} at {job.companyName}
                </SheetDescription>
              </div>
            </div>

            {/* Quick meta */}
            <div className="mt-4 flex flex-wrap gap-2">
              <JobBadge label={job.type} />
              <JobBadge label={job.department} />
              <JobBadge label={job.location} />
            </div>

            {/* Meta list */}
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <MapPin size={12} className="text-zinc-500" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd>{job.location}</dd>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <DollarSign size={12} className="text-zinc-500" aria-hidden="true" />
                <dt className="sr-only">Salary</dt>
                <dd>{job.salaryRange}</dd>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Calendar size={12} className="text-zinc-500" aria-hidden="true" />
                <dt className="sr-only">Posted</dt>
                <dd>Posted {postedDate}</dd>
              </div>
            </dl>
          </SheetHeader>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
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
                      <p className="text-sm font-semibold text-zinc-200 mb-2">
                        {heading}
                      </p>
                      <ul className="space-y-1.5 pl-1">
                        {lines
                          .filter((l) => l.startsWith("- "))
                          .map((line, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"
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
                  <p key={i} className="text-sm text-zinc-400 leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {/* CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-900/30 transition-all"
            >
              <ExternalLink size={15} className="mr-2" aria-hidden="true" />
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onClose}
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Back to listings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
