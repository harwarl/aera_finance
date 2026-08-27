import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { Reveal } from "../shared/Reveal";

export function SectionHeader({
  label,
  meta,
  className,
}: {
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
      <Reveal className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-foreground-muted">
        <span className="h-px w-10 bg-accent-100/50" />
        <ScrambleText value={label} />
        <span className="hidden h-px w-10 bg-accent/50 sm:block" />
      </Reveal>
      {meta ? (
        <ScrambleText value={meta} startDelay={180} className="text-accent" />
      ) : null}
    </div>
  );
}
