"use client";

import { useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { toast } from "sonner";
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
  X,
  Share2,
} from "lucide-react";
import type { Job } from "@/types/job";

interface JobDetailDialogProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  isApplied: boolean;
  onApply: (jobId: string) => void;
  onWithdraw: (jobId: string) => void;
}

export function JobDetailDialog({
  job,
  open,
  onClose,
  isApplied,
  onApply,
  onWithdraw,
}: JobDetailDialogProps) {
  const [isApplying, setIsApplying]     = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

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

  const handleWithdraw = async () => {
    if (!isApplied || isWithdrawing) return;
    setIsWithdrawing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    onWithdraw(job.id);
    setIsWithdrawing(false);
    toast.info("Application withdrawn.", {
      description: `Your application for ${job.title} has been removed.`,
    });
  };

  const handleShare = async () => {
    const url = window.location.origin + `/?q=${encodeURIComponent(job.title)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!", { description: "Share this job with someone." });
    } catch {
      toast.error("Couldn't copy link.");
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        {/* ── Dark blurred backdrop ── */}
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />

        {/* ── Popup: bottom sheet on mobile, centered modal on sm+ ── */}
        <DialogPrimitive.Popup className="fixed z-50 flex flex-col overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_24px_80px_rgba(0,0,0,0.9)] outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 inset-x-0 bottom-0 w-full max-h-[92vh] rounded-t-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:max-h-[88vh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl data-open:slide-in-from-bottom-4 data-closed:slide-out-to-bottom-4 sm:data-open:zoom-in-95 sm:data-closed:zoom-out-95">

          {/* ── Drag handle (mobile only) ── */}
          <div className="flex shrink-0 justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
            <div className="h-1 w-10 rounded-full bg-white/15" />
          </div>

          {/* ── Header (fixed) ── */}
          <div className="shrink-0 border-b border-white/5 px-4 pb-4 pt-5 pr-12 sm:px-6 sm:pb-5 sm:pt-6 sm:pr-14">
            <div className="flex items-start gap-4">
              <CompanyLogo
                logoUrl={job.logoUrl}
                companyName={job.companyName}
                size="md"
              />
              <div className="min-w-0">
                <DialogPrimitive.Title className="text-[15px] font-semibold tracking-tight text-white/90">
                  {job.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-0.5 text-[12px] font-semibold uppercase tracking-widest text-white/30">
                  {job.companyName}
                </DialogPrimitive.Description>
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
                { icon: MapPin,     label: "Location",   value: job.location   },
                { icon: DollarSign, label: "Salary",     value: job.salaryRange },
                { icon: Briefcase,  label: "Type",       value: job.type       },
                { icon: Building2,  label: "Department", value: job.department },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
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

            <div className="mt-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11px] text-white/25">
                <Calendar size={10} aria-hidden="true" />
                Posted {postedDate}
              </p>
              {/* Share button */}
              <button
                type="button"
                onClick={handleShare}
                title="Copy link to this job"
                className="flex items-center gap-1.5 rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/35 transition-all hover:bg-white/[0.08] hover:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
              >
                <Share2 size={11} aria-hidden="true" />
                Share
              </button>
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
              About the Role
            </h3>
            <div className="space-y-4 pb-6">
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

          {/* ── Sticky footer: single CTA ── */}
          <div className="shrink-0 border-t border-white/5 px-4 py-3 sm:px-6 sm:py-4">
            {isApplied ? (
              <div className="flex items-center gap-2">
                {/* Applied indicator */}
                <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 py-3 text-[13px] font-semibold text-emerald-400">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Applied
                </div>
                {/* Withdraw button */}
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  title="Withdraw your application"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] font-medium text-white/40 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                >
                  {isWithdrawing ? (
                    <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <X size={13} aria-hidden="true" />
                  )}
                  Withdraw
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApply}
                disabled={isApplying}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 py-3 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
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

          {/* ── Close button ── */}
          <DialogPrimitive.Close
            aria-label="Close job details"
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            <X size={13} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
