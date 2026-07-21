import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-foreground-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
