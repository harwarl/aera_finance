import { cn } from "@/lib/utils";

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-border">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 whitespace-nowrap border-r border-border px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors last:border-r-0",
            value === option.value
              ? "bg-accent text-background"
              : "text-foreground-muted hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
