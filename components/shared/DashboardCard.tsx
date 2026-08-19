import { cn } from "@/lib/utils";

export function DashboardCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-muted bg-background-elevated/70 p-6 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.85)]",
        className
      )}
    >
      {children}
    </div>
  );
}
