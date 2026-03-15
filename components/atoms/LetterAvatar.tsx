import { cn } from "@/lib/utils";

// Subtle colored tints that work on dark backgrounds
const DARK_COLORS = [
  { bg: "rgba(99,102,241,0.12)", text: "#a5b4fc", border: "rgba(99,102,241,0.18)" },
  { bg: "rgba(168,85,247,0.12)", text: "#d8b4fe", border: "rgba(168,85,247,0.18)" },
  { bg: "rgba(34,197,94,0.10)", text: "#86efac", border: "rgba(34,197,94,0.18)" },
  { bg: "rgba(249,115,22,0.10)", text: "#fdba74", border: "rgba(249,115,22,0.18)" },
  { bg: "rgba(239,68,68,0.10)", text: "#fca5a5", border: "rgba(239,68,68,0.18)" },
  { bg: "rgba(59,130,246,0.12)", text: "#93c5fd", border: "rgba(59,130,246,0.18)" },
  { bg: "rgba(234,179,8,0.10)", text: "#fde047", border: "rgba(234,179,8,0.18)" },
  { bg: "rgba(20,184,166,0.10)", text: "#5eead4", border: "rgba(20,184,166,0.18)" },
];

interface LetterAvatarProps {
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LetterAvatar({ companyName, size = "md", className }: LetterAvatarProps) {
  const palette = DARK_COLORS[companyName.charCodeAt(0) % DARK_COLORS.length];

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
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
        borderColor: palette.border,
      }}
      aria-label={`${companyName} logo`}
    >
      {companyName.charAt(0).toUpperCase()}
    </div>
  );
}
