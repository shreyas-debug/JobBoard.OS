import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-fuchsia-500 to-violet-600",
  "from-slate-500 to-gray-600",
];

interface LetterAvatarProps {
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LetterAvatar({
  companyName,
  size = "md",
  className,
}: LetterAvatarProps) {
  const gradient = GRADIENTS[companyName.charCodeAt(0) % GRADIENTS.length];

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-lg",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-bold text-white shadow-sm",
        gradient,
        sizeClasses[size],
        className
      )}
      aria-label={`${companyName} logo`}
    >
      {companyName.charAt(0).toUpperCase()}
    </div>
  );
}
