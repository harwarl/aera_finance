import { cn } from "@/lib/utils";

export function CornerBrackets({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute -left-2 -top-2 h-3 w-3 border-l border-t border-accent/60" />
      <span className="pointer-events-none absolute -right-2 -top-2 h-3 w-3 border-r border-t border-accent/60" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 h-3 w-3 border-b border-l border-accent/60" />
      <span className="pointer-events-none absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-accent/60" />
      {children}
    </div>
  );
}
