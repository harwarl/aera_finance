import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-lg font-black tracking-tight text-foreground",
        className
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center border border-accent text-xs text-accent">
        A
      </span>
      AERA
    </span>
  );
}
