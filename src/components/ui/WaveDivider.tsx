import { cn } from "@/lib/utils";

interface WaveDividerProps {
  variant?: "bottom" | "top";
  className?: string;
}

export function WaveDivider({ variant = "bottom", className }: WaveDividerProps) {
  return (
    <div
      className={cn(
        "w-full h-16 md:h-24",
        variant === "bottom" ? "wave-divider" : "wave-divider-top",
        className
      )}
      aria-hidden="true"
    />
  );
}
