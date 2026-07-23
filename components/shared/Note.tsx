import { cn } from "@/lib/utils";

export function Note({
  label = "Note",
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-l-2 border-accent bg-background-elevated/40 py-3 pl-4 pr-4 sm:flex-row sm:gap-4",
        className
      )}
    >
      <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {label}
      </span>
      <p className="text-sm leading-relaxed text-foreground-muted">
        {children}
      </p>
    </div>
  );
}
