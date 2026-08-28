"use client";

import { useId, useMemo, useState } from "react";
import type { PerformanceCallout, PerformancePoint } from "@/types";

// A single-series vault chart — no BTC benchmark line, no gridline axis.
// The line's color travels through the site's locked palette (accent,
// then the same blue/amber secondary hues already used in "How It Works"
// and "Safety") along its length instead of sitting in one flat color —
// deliberately not another all-lime chart, without reaching for a hue
// outside what's already established elsewhere on the site.

const BLUE = "#6d8cf7";
const AMBER = "#e0a94a";

function formatDateLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const VIEW_W = 100;
const VIEW_H = 40;
const TOP_PAD = 4;
const PLOT_H = VIEW_H - TOP_PAD;

export function PerformanceChart({
  data,
  callout,
}: {
  data: PerformancePoint[];
  callout?: PerformanceCallout | null;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const chart = useMemo(() => {
    const n = data.length;
    const values = data.map((d) => d.vault);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = (max - min) * 0.15 || 1;
    const lo = min - pad;
    const hi = max + pad;

    const xAt = (i: number) => (n <= 1 ? 0 : (i / (n - 1)) * VIEW_W);
    const yAt = (v: number) => TOP_PAD + PLOT_H - ((v - lo) / (hi - lo)) * PLOT_H;

    const pts = data.map((d, i) => [xAt(i), yAt(d.vault)] as const);

    const toPath = (points: readonly (readonly [number, number])[]) =>
      points
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");

    const linePath = toPath(pts);
    const areaPath = `${linePath} L${xAt(n - 1).toFixed(2)},${VIEW_H} L${xAt(0).toFixed(2)},${VIEW_H} Z`;

    const calloutIndex = callout ? data.findIndex((d) => d.date === callout.date) : -1;

    return {
      pts,
      linePath,
      areaPath,
      lastY: pts.at(-1)?.[1] ?? 0,
      calloutX: calloutIndex >= 0 ? xAt(calloutIndex) : null,
      calloutY: calloutIndex >= 0 ? pts[calloutIndex][1] : null,
    };
  }, [data, callout]);

  const lastValue = data.at(-1)?.vault ?? 0;

  const isHovering = hoverIndex !== null;
  const hoverPoint = isHovering ? data[hoverIndex] : null;
  const hoverX = isHovering ? chart.pts[hoverIndex][0] : null;
  const hoverY = isHovering ? chart.pts[hoverIndex][1] : null;

  // While hovering, the live crosshair takes over from the static event
  // callout so the two annotations never compete for the same space.
  const tooltipX = isHovering ? hoverX : chart.calloutX;
  const tooltipLeftPct =
    tooltipX !== null ? Math.min(Math.max(tooltipX, 15), 58) : null;

  const activeY = isHovering ? hoverY : chart.calloutY;
  const activeX = isHovering ? hoverX : chart.calloutX;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(fraction * (data.length - 1));
    setHoverIndex(Math.min(Math.max(idx, 0), data.length - 1));
  }

  function handlePointerLeave() {
    setHoverIndex(null);
  }

  return (
    <div className="relative">
      <div
        className="relative h-56 cursor-crosshair sm:h-64"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`vaultStroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="38%" stopColor={BLUE} />
              <stop offset="70%" stopColor={AMBER} />
              <stop offset="100%" stopColor="var(--accent-300)" />
            </linearGradient>
            <linearGradient id={`vaultFill-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="38%" stopColor={BLUE} stopOpacity="0.16" />
              <stop offset="70%" stopColor={AMBER} stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--accent-300)" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id={`vaultFillFade-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <mask id={`vaultFillMask-${uid}`}>
              <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#vaultFillFade-${uid})`} />
            </mask>
          </defs>

          <path
            d={chart.areaPath}
            fill={`url(#vaultFill-${uid})`}
            stroke="none"
            mask={`url(#vaultFillMask-${uid})`}
          />

          <path
            d={chart.linePath}
            fill="none"
            stroke={`url(#vaultStroke-${uid})`}
            strokeWidth="0.55"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {activeX !== null ? (
            <line
              x1={activeX}
              y1={TOP_PAD}
              x2={activeX}
              y2={VIEW_H}
              stroke="var(--border-color)"
              strokeWidth="0.3"
              strokeDasharray="1.2,1.2"
              style={{ transition: "x1 100ms ease-out, x2 100ms ease-out" }}
            />
          ) : null}
        </svg>

        {activeX !== null && activeY !== null ? (
          <span
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[left,top] duration-100 ease-out"
            style={{
              left: `${(activeX / VIEW_W) * 100}%`,
              top: `${(activeY / VIEW_H) * 100}%`,
              boxShadow: "0 0 8px 1px color-mix(in srgb, var(--accent) 55%, transparent)",
            }}
          />
        ) : null}

        {!isHovering && chart.calloutX === null ? (
          <span
            className="pointer-events-none absolute right-1 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-accent"
            style={{ top: `${(chart.lastY / VIEW_H) * 100}%` }}
          >
            {lastValue.toFixed(1)}
          </span>
        ) : null}

        {tooltipLeftPct !== null ? (
          <div
            className="pointer-events-none absolute top-2 w-36 max-w-[55vw] -translate-x-1/2 rounded-lg border border-border bg-background-elevated/95 p-3 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.9)] transition-[left] duration-100 ease-out sm:w-40"
            style={{ left: `${tooltipLeftPct}%` }}
          >
            {isHovering && hoverPoint ? (
              <>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
                  {formatDateLabel(hoverPoint.date)}
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {hoverPoint.vault.toFixed(1)}
                </span>
              </>
            ) : callout ? (
              <>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
                  {formatDateLabel(callout.date)} · {callout.label}
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {callout.vault.toFixed(1)}
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        <span>{formatDateLabel(data[0]?.date ?? "")}</span>
        <span>{formatDateLabel(data[Math.floor((data.length - 1) / 2)]?.date ?? "")}</span>
        <span>{formatDateLabel(data.at(-1)?.date ?? "")}</span>
      </div>
    </div>
  );
}
