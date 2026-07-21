import { cn } from "@/lib/utils";

export function TexturedBand({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "texture-belt flex mx-auto w-full max-w-[1440] min-h-8 items-center border-y border-border-muted bg-background-elevated/40 sm:min-h-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
