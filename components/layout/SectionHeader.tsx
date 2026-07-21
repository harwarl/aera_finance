import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/shared/ScrambleText";

export function SectionHeader({
  index,
  label,
  meta,
  className,
}: {
  index: string;
  label: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest",
        className,
      )}
    >
      <span className="text-foreground-muted">
        <span className="text-accent font-semibold">
          [<ScrambleText value={index} />]
        </span>{" "}
        <ScrambleText value={label} startDelay={90} />
      </span>
      {meta ? (
        <ScrambleText value={meta} startDelay={180} className="text-accent" />
      ) : null}
    </div>
  );
}
