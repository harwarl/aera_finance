"use client";

import { useMemo, useState } from "react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { PerformanceChart } from "@/components/shared/PerformanceChart";
import { SegmentedToggle } from "@/components/shared/SegmentedToggle";
import {
  allocation,
  performanceCallout,
  performanceSeries,
  performanceTimeframes,
} from "@/config/dashboard";

// Same three hues as the chart above it (accent, blue, amber) — two
// near-identical lime shades read as one color at a glance, which
// defeats the point of an allocation breakdown.
const SEGMENT_COLORS = ["var(--accent)", "#6d8cf7", "#e0a94a"];

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
            Vault Performance
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
              style={{
                width: `${slice.pct}%`,
                backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
              }}
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
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
              />
              {slice.label} · {slice.pct}%
            </span>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
