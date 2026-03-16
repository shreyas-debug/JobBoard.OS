"use client";

import { useState } from "react";
import { LetterAvatar } from "./LetterAvatar";
import { cn } from "@/lib/utils";

// Brand-specific gradient backgrounds — white SVG logo sits on top
const BRAND_GRADIENTS: Record<string, string> = {
  vercel:       "from-zinc-500 to-zinc-900",
  linear:       "from-indigo-500 to-violet-700",
  stripe:       "from-indigo-400 to-cyan-500",
  loom:         "from-orange-500 to-red-600",
  figma:        "from-orange-400 to-violet-600",
  notion:       "from-zinc-500 to-zinc-800",
  monzo:        "from-red-400 to-pink-600",
  webflow:      "from-blue-500 to-indigo-600",
  planetscale:  "from-violet-500 to-purple-800",
  resend:       "from-sky-400 to-blue-600",
  revolut:      "from-slate-600 to-indigo-600",
  descript:     "from-rose-500 to-violet-600",
  framer:       "from-violet-500 to-pink-600",
  raycast:      "from-orange-500 to-red-600",
  supabase:     "from-emerald-500 to-teal-600",
};

// Deterministic fallback palette for unknown companies
const FALLBACK_GRADIENTS = [
  "from-blue-600 to-violet-600",
  "from-violet-600 to-pink-600",
  "from-rose-500 to-orange-500",
  "from-orange-500 to-amber-400",
  "from-emerald-500 to-teal-400",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
];

function getBrandGradient(companyName: string): string {
  const key = companyName.toLowerCase().replace(/[^a-z]/g, "");
  if (BRAND_GRADIENTS[key]) return BRAND_GRADIENTS[key];
  return FALLBACK_GRADIENTS[companyName.charCodeAt(0) % FALLBACK_GRADIENTS.length];
}

interface CompanyLogoProps {
  logoUrl?: string | null;
  companyName: string;
  size?: "sm" | "md";
  className?: string;
}

export function CompanyLogo({ logoUrl, companyName, size = "md", className }: CompanyLogoProps) {
  const [imgError, setImgError] = useState(false);
  const gradient = getBrandGradient(companyName);

  const containerSize = size === "md" ? "h-11 w-11" : "h-8 w-8";
  const iconSize     = size === "md" ? "h-[22px] w-[22px]" : "h-4 w-4";

  if (logoUrl && !imgError) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-[0_0_16px_rgba(255,255,255,0.08)]",
          containerSize,
          gradient,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className={cn("object-contain", iconSize)}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return <LetterAvatar companyName={companyName} size={size === "md" ? "md" : "sm"} className={className} />;
}
