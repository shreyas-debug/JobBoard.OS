import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-violet-600 to-indigo-600",
  "from-fuchsia-600 to-pink-600",
  "from-sky-600 to-blue-600",
  "from-emerald-600 to-teal-600",
  "from-amber-600 to-orange-600",
  "from-rose-600 to-red-600",
  "from-cyan-600 to-sky-600",
  "from-purple-600 to-violet-600",
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
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-14 w-14 text-xl",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-semibold text-white shadow-md",
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
