import { cn } from "@/lib/utils";

const FLAT_COLORS = [
  { bg: "#EFF6FF", text: "#1D4ED8" },
  { bg: "#FDF4FF", text: "#7E22CE" },
  { bg: "#F0FDF4", text: "#15803D" },
  { bg: "#FFF7ED", text: "#C2410C" },
  { bg: "#FFF1F2", text: "#BE123C" },
  { bg: "#F0F9FF", text: "#0369A1" },
  { bg: "#FAFAF5", text: "#4D7C0F" },
  { bg: "#F8F4FF", text: "#6D28D9" },
];

interface LetterAvatarProps {
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LetterAvatar({ companyName, size = "md", className }: LetterAvatarProps) {
  const palette = FLAT_COLORS[companyName.charCodeAt(0) % FLAT_COLORS.length];

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl font-bold border",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: palette.bg,
        color: palette.text,
        borderColor: palette.text + "22",
      }}
      aria-label={`${companyName} logo`}
    >
      {companyName.charAt(0).toUpperCase()}
    </div>
  );
}
