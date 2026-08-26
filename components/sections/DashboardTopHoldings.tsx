import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { cn } from "@/lib/utils";
import { holdings } from "@/config/dashboard";
import { formatCurrency } from "@/lib/holdings";

const PREVIEW_COUNT = 3;

export function DashboardTopHoldings() {
  const top = [...holdings]
    .sort((a, b) => b.value - a.value)
    .slice(0, PREVIEW_COUNT);

  return (
    <DashboardCard className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Top Holdings
        </span>
        <Link
          href="/dashboard/holdings"
          className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
        >
          View Full Breakdown
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-5 flex flex-1 flex-col divide-y divide-border-muted">
        {top.map((holding) => (
          <Link
            key={holding.id}
            href={`/dashboard/holdings/${holding.id}`}
            className="group flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold",
                  holding.type === "crypto"
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-background-subtle text-foreground-muted"
                )}
              >
                {holding.symbol.slice(0, 3)}
              </span>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                  {holding.symbol}
                </span>
                <span className="block truncate text-xs text-foreground-faint">
                  {holding.name}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(holding.value)}
              </span>
              <span className="h-1 w-20 overflow-hidden rounded-full bg-background">
                <span
                  className="block h-full bg-accent"
                  style={{ width: `${Math.min(holding.allocationPct, 100)}%` }}
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
