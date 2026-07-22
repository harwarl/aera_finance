import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  info: {
    icon: Info,
    className: "border-accent/40 bg-accent/5 text-accent",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-danger/40 bg-danger/5 text-danger",
  },
} as const;

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: keyof typeof VARIANTS;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, className: variantClassName } = VARIANTS[variant];

  return (
    <div
      className={cn("border px-4 py-3", variantClassName, className)}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="font-mono text-xs font-semibold uppercase tracking-widest">
          {title}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        {children}
      </p>
    </div>
  );
}
