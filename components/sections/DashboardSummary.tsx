import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { cn } from "@/lib/utils";
import { allocation, portfolioSummary } from "@/config/dashboard";

const SEGMENT_COLORS = ["bg-accent", "bg-accent-600", "bg-border"];

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function DashboardSummary() {
  const withinTolerance =
    portfolioSummary.driftPct <= portfolioSummary.driftToleranceP;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
      <CornerBrackets>
        <div className="flex h-full flex-col border border-border-muted bg-background-elevated/50 p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Total Portfolio Value
          </span>
          <ScrambleText
            value={formatCurrency(portfolioSummary.totalValue)}
            className="mt-4 block text-4xl font-black tracking-tighter text-foreground sm:text-5xl"
          />

          <div className="mt-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Allocation
            </span>
            <div className="mt-2 flex h-2 w-full overflow-hidden border border-border-muted">
              {allocation.map((slice, i) => (
                <div
                  key={slice.label}
                  className={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                  style={{ width: `${slice.pct}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {allocation.map((slice, i) => (
                <span
                  key={slice.label}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-muted"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5",
                      SEGMENT_COLORS[i % SEGMENT_COLORS.length]
                    )}
                  />
                  {slice.label} · {slice.pct}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </CornerBrackets>

      <CornerBrackets>
        <div className="flex h-full flex-col justify-between border border-border-muted bg-background-elevated/50 p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Drift From Target
          </span>
          <span
            className={cn(
              "mt-4 text-4xl font-black tracking-tighter sm:text-5xl",
              withinTolerance ? "text-foreground" : "text-danger"
            )}
          >
            {portfolioSummary.driftPct}%
          </span>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            {withinTolerance ? "Within target" : "Rebalance pending"} ·
            Tolerance {portfolioSummary.driftToleranceP}%
          </p>
        </div>
      </CornerBrackets>

      <CornerBrackets>
        <div className="flex h-full flex-col justify-between border border-border-muted bg-background-elevated/50 p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Agent Status
          </span>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 animate-ticker-blink rounded-full bg-accent" />
            <span className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Active
            </span>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Continuously monitoring
          </p>
        </div>
      </CornerBrackets>
    </div>
  );
}
