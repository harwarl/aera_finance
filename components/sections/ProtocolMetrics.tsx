"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "../layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

// Placeholder figures in the same spirit as the rest of config/dashboard.ts —
// there's no live vault or market feed yet, so these are illustrative, not
// wired to a real price source. Swap for real reads once both exist.
const METRICS = [
  {
    label: "Base Yield APY",
    tag: "MORPHO",
    value: "~6.8%",
    suffix: "TARGET APY",
    description:
      "Idle balances earn on Morpho from the moment they land. No action required.",
    points: "0,28 14,25 28,24 42,19 57,20 71,13 85,14 100,6",
  },
  {
    label: "Assets Tracked",
    tag: "24/7 MONITORING",
    value: "180+",
    suffix: "POSITIONS",
    description:
      "Stock Tokens, crypto, and yield positions, priced and rechecked continuously.",
    points: "0,30 14,28 28,27 42,23 57,21 71,17 85,15 100,9",
  },
  {
    label: "Decision Latency",
    tag: "VS MANUAL TRADING",
    value: "<400ms",
    suffix: "MEDIAN",
    description:
      "From drift detected to trade proposed, quantified in milliseconds, not days.",
    points: "0,10 14,14 28,12 42,17 57,15 71,20 85,18 100,24",
  },
  {
    label: "Custody Taken",
    tag: "REVOCABLE ANYTIME",
    value: "0%",
    suffix: "EVER",
    description:
      "Funds sit in a contract only you can withdraw from. Atlas never holds the key.",
    points: "0,18 100,18",
  },
] as const;

// Same stretch used in "How It Works" — the hovered column takes
// ACTIVE_WEIGHT× the others' share — but triggered by the cursor here
// instead of an auto-advancing timer.
const ACTIVE_WEIGHT = 1.7;
const DESKTOP_QUERY = "(min-width: 1024px)";
const INACTIVE_WEIGHT_SUM = METRICS.length - 1;
const ACTIVE_WIDTH_PCT =
  (ACTIVE_WEIGHT / (ACTIVE_WEIGHT + INACTIVE_WEIGHT_SUM)) * 100;
const INACTIVE_WIDTH_PCT = (1 / (ACTIVE_WEIGHT + INACTIVE_WEIGHT_SUM)) * 100;
const EQUAL_WIDTH_PCT = 100 / METRICS.length;

export function ProtocolMetrics() {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  function setActive(index: number | null) {
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;
    columnRefs.current.forEach((col, i) => {
      if (!col) return;
      const widthPct =
        index === null
          ? EQUAL_WIDTH_PCT
          : i === index
            ? ACTIVE_WIDTH_PCT
            : INACTIVE_WIDTH_PCT;
      gsap.to(col, {
        width: `${widthPct}%`,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  }

  return (
    <section className="relative overflow-hidden border-b border-border-muted bg-background-elevated/20 py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 8% 22%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 22% 68%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 38% 15%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 54% 78%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 68% 35%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 81% 60%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 93% 20%, var(--foreground-faint) 50%, transparent 50%), radial-gradient(1px 1px at 15% 90%, var(--foreground-faint) 50%, transparent 50%)",
        }}
      />

      <Container className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <SectionHeader label="At A Glance" />
          </Reveal>
          <span className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
            Live · Robinhood Chain
          </span>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border-muted">
          <div className="flex flex-col divide-y divide-border-muted lg:flex-row lg:divide-x lg:divide-y-0">
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                ref={(el) => {
                  columnRefs.current[i] = el;
                }}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                className="group p-5 transition-colors duration-300 hover:bg-background-elevated/60 lg:w-1/4 lg:shrink-0 sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                    {metric.label}
                  </span>
                  <span className="whitespace-nowrap rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    {metric.tag}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                    {metric.suffix}
                  </span>
                </div>

                <svg
                  viewBox="0 0 100 36"
                  preserveAspectRatio="none"
                  className="mt-3 h-8 w-full"
                  aria-hidden="true"
                >
                  <polyline
                    points={metric.points}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </svg>

                <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
