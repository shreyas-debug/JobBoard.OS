"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { JobBadge } from "@/components/atoms/JobBadge";
import { CompanyLogo } from "@/components/atoms/CompanyLogo";
import {
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Briefcase,
  Building2,
} from "lucide-react";
import type { Job } from "@/types/job";

interface JobDetailSheetProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  isApplied: boolean;
  onApply: (jobId: string) => void;
}

export function JobDetailSheet({
  job,
  open,
  onClose,
  isApplied,
  onApply,
}: JobDetailSheetProps) {
  const [isApplying, setIsApplying] = useState(false);

  if (!job) return null;

  const postedDate = new Date(job.postedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const descriptionParagraphs = job.description.split("\n\n").filter(Boolean);

  const handleApply = async () => {
    if (isApplied || isApplying) return;
    setIsApplying(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    onApply(job.id);
    setIsApplying(false);
    toast.success("Application submitted!", {
      description: `You've applied for ${job.title} at ${job.companyName}.`,
    });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-[500px] border-l border-white/10 bg-[#0A0A0A] p-0"
      >
        {/* Header — pr-12 clears Shadcn's built-in X button */}
        <div className="shrink-0 border-b border-white/5 px-6 pb-5 pt-5 pr-12">
          <div className="flex items-start gap-3">
            <CompanyLogo logoUrl={job.logoUrl} companyName={job.companyName ?? job.title} size="md" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                {job.companyName}
              </p>
              <SheetTitle className="mt-0.5 text-[15px] font-semibold tracking-tight text-white/90">
                {job.title}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Job details for {job.title} at {job.companyName}
              </SheetDescription>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <JobBadge label={job.type} />
            <JobBadge label={job.department} />
          </div>

          {/* Bento metadata 2×2 */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { icon: MapPin, label: "Location", value: job.location },
              { icon: DollarSign, label: "Salary", value: job.salaryRange },
              { icon: Briefcase, label: "Type", value: job.type },
              { icon: Building2, label: "Department", value: job.department },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-2.5"
              >
                <Icon size={12} className="shrink-0 text-white/30" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">
                    {label}
                  </p>
                  <p className="truncate text-[12px] font-semibold text-white/80">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 flex items-center gap-1 text-[11px] text-white/25">
            <Calendar size={10} aria-hidden="true" />
            Posted {postedDate}
          </p>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
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
                    <p className="mb-2.5 text-[13px] font-semibold text-white/80">
                      {heading}
                    </p>
                    <ul className="space-y-2">
                      {lines
                        .filter((l) => l.startsWith("- "))
                        .map((line, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/50"
                          >
                            <span
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/20"
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
                <p key={i} className="text-[13px] leading-relaxed text-white/50">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {/* Sticky footer — single CTA */}
        <div className="shrink-0 border-t border-white/5 px-6 py-4">
          {isApplied ? (
            <div
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 py-3 text-[13px] font-semibold text-emerald-400"
              aria-label="Already applied"
            >
              <CheckCircle2 size={14} aria-hidden="true" />
              Applied
            </div>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              disabled={isApplying}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-[13px] font-semibold text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              {isApplying ? (
                <>
                  <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  <ExternalLink size={13} aria-hidden="true" />
                  Apply Now
                </>
              )}
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
