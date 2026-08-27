import { cn } from "@/lib/utils";

export function ScrollCue({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent",
        className
      )}
    >
      <span className="animate-scroll-cue-bounce flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-background/60 backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4v16" />
          <path d="M6 14l6 6 6-6" />
        </svg>
      </span>
      Scroll
    </div>
  );
}
