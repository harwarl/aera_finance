"use client";

import { useMemo, useState } from "react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { PerformanceChart } from "@/components/shared/PerformanceChart";
import { SegmentedToggle } from "@/components/shared/SegmentedToggle";
import { cn } from "@/lib/utils";
import {
  allocation,
  performanceCallout,
  performanceSeries,
  performanceTimeframes,
} from "@/config/dashboard";

const SEGMENT_COLORS = ["bg-accent", "bg-accent-600", "bg-border"];

type Timeframe = (typeof performanceTimeframes)[number]["value"];

export function DashboardPerformance() {
  const [timeframe, setTimeframe] = useState<Timeframe>("90D");

  const data = useMemo(() => {
    const preset = performanceTimeframes.find((p) => p.value === timeframe);
    const days = preset?.days ?? performanceSeries.length;
    return performanceSeries.slice(-days);
  }, [timeframe]);

  return (
    <DashboardCard>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Performance · vs BTC
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
            Live
          </span>
        </div>
        <div className="w-full overflow-x-auto sm:w-auto">
          <SegmentedToggle
            options={performanceTimeframes.map((p) => ({
              value: p.value,
              label: p.value,
            }))}
            value={timeframe}
            onChange={setTimeframe}
          />
        </div>
      </div>

      <div className="mt-8">
        <PerformanceChart data={data} callout={performanceCallout} />
      </div>

      <div className="mt-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Allocation
        </span>
        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-background">
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
                  "h-1.5 w-1.5 rounded-full",
                  SEGMENT_COLORS[i % SEGMENT_COLORS.length]
                )}
              />
              {slice.label} · {slice.pct}%
            </span>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
