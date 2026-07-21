import { cn } from "@/lib/utils";

export function IndexNumber({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-2xl text-foreground-faint sm:text-3xl",
        className
      )}
    >
      {children}
    </span>
  );
}
