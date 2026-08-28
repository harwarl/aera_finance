"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Three of the four step visuals originally built for "How It Works" —
// extracted here so both that section (kept intact, just no longer in the
// page composition) and the new "Atlas Platform" section can render the
// exact same deposit/yield/agent-watching visuals instead of duplicating
// them. ExecutionVisual stayed behind in HowItWorksSteps since nothing
// else reuses it.

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// A restrained second and third hue alongside the locked accent, used only
// here to distinguish content (assets, partners, risk factors) — same
// pattern already used for BTC's amber in the performance chart. Newer,
// smaller holdings stay neutral rather than reaching for a fourth or fifth
// hue — restraint over a rainbow of asset colors.
export const AMBER = "#e0a94a"; // BTC / warmth
export const BLUE = "#6d8cf7"; // external chain & stablecoin partners
const NEUTRAL = "var(--foreground-faint)";

const VAULT_ASSETS = [
  { symbol: "ETH", name: "Ethereum", color: "var(--accent)" },
  { symbol: "BTC", name: "Bitcoin", color: AMBER },
  { symbol: "USDC", name: "USD Coin", color: BLUE },
  { symbol: "ATLAS", name: "Atlas Protocol", color: NEUTRAL },
  { symbol: "AAPLx", name: "Tokenized Apple", color: NEUTRAL },
];

const YIELD_TAGS = [
  { label: "Protocol · Morpho", color: BLUE },
  { label: "Target · 6.8% APY", color: "var(--accent)" },
  { label: "Asset · USDC", color: BLUE },
  { label: "Sleeve · Base Yield", color: null },
];

// A status word per holding rather than an abstract score/factor-bar
// readout — matches the redesigned DashboardAgentPanel used in Live Demo.
const AGENT_HOLDINGS: { symbol: string; status: "holding" | "trimming" }[] = [
  { symbol: "AAPLx", status: "holding" },
  { symbol: "ETH", status: "trimming" },
  { symbol: "BTC", status: "holding" },
  { symbol: "NVDAx", status: "holding" },
];

export function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(REDUCE_MOTION_QUERY).matches
  );
}

export type VisualProps = { active: boolean };

export function VaultVisual({ active }: VisualProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();
    tl.set(rows, { opacity: 0, x: -8 })
      .set(dots, { scale: 0 })
      .to(rows, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", stagger: 0.22 }, 0)
      .to(dots, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.22 }, 0.08);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="flex w-full flex-col gap-2">
      {VAULT_ASSETS.map((asset, i) => (
        <div
          key={asset.symbol}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className="flex items-center justify-between rounded-lg border px-3.5 py-2"
          style={{
            borderColor: `color-mix(in srgb, ${asset.color} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${asset.color} 7%, transparent)`,
          }}
        >
          <span className="flex items-center gap-2">
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-1.5 w-1.5 shrink-0 animate-ticker-blink rounded-full"
              style={{ backgroundColor: asset.color }}
            />
            <span className="font-mono text-xs font-bold text-foreground">
              {asset.symbol}
            </span>
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-widest"
            style={{ color: asset.color }}
          >
            Deposited
          </span>
        </div>
      ))}
    </div>
  );
}

export function YieldVisual({ active }: VisualProps) {
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const tags = tagRefs.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();
    tl.set(tags, { opacity: 0, scale: 0.85, y: 4 }).to(tags, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.8)",
      stagger: 0.14,
    });
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-accent/30 bg-accent/5 p-5">
      <span className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
        <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
        Yield Position
      </span>
      <div className="mt-4 flex flex-wrap gap-2">
        {YIELD_TAGS.map((tag, i) =>
          tag.color ? (
            <span
              key={tag.label}
              ref={(el) => {
                tagRefs.current[i] = el;
              }}
              className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest"
              style={{
                borderColor: `color-mix(in srgb, ${tag.color} 35%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${tag.color} 10%, transparent)`,
                color: tag.color,
              }}
            >
              {tag.label}
            </span>
          ) : (
            <span
              key={tag.label}
              ref={(el) => {
                tagRefs.current[i] = el;
              }}
              className="rounded-full border border-border bg-background-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-foreground-muted"
            >
              {tag.label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function AgentScoreVisual({ active }: VisualProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots = barRefs.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();
    tl.set(rows, { opacity: 0, x: -6 })
      .set(dots, { scale: 0 })
      .to(rows, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.15 }, 0)
      .to(dots, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.15 }, 0.08);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-border-muted bg-background-subtle p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
          Agent · Watching
        </span>
        <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent">
          Copilot
        </span>
      </div>
      <div className="mt-4 flex flex-col divide-y divide-border-muted">
        {AGENT_HOLDINGS.map((holding, i) => (
          <div
            key={holding.symbol}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex items-center justify-between gap-2 py-2 first:pt-0 last:pb-0"
          >
            <span className="flex items-center gap-2">
              <span
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    holding.status === "trimming" ? AMBER : "var(--accent)",
                }}
              />
              <span className="font-mono text-xs font-bold text-foreground">
                {holding.symbol}
              </span>
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{
                color: holding.status === "trimming" ? AMBER : "var(--accent)",
              }}
            >
              {holding.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
