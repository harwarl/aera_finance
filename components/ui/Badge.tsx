import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
