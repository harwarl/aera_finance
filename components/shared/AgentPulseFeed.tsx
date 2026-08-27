"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DUST_CARD_HOLD_MS as CARD_HOLD_MS,
  DUST_REST_DURATION_MS as REST_DURATION_MS,
  DUST_WAVE_DURATION_MS as WAVE_DURATION_MS,
} from "@/components/shared/HeroSceneDust";

// What the hero's sphere is "thinking" — mirrors HeroSceneDust's own
// wave / pop / rest cycle with its own setTimeout chain (imported durations
// so the two can't drift if one changes) rather than a prop wired through
// the WebGL scene: the wave plays with the card hidden, then the card pops
// once the wave finishes, holds, hides, rests, and the cycle repeats.
const MESSAGES = [
  { tag: "[drift]", msg: "AAPL 6.2% over target weight", type: "watch" },
  { tag: "[check]", msg: "within daily risk bound", type: "" },
  { tag: "[action]", msg: "sell 1.4%, route to yield", type: "" },
  { tag: "[yield]", msg: "USDC apy below threshold", type: "watch" },
  { tag: "[check]", msg: "vault clears risk bound", type: "" },
  { tag: "[action]", msg: "migrate position, no sig required", type: "" },
  { tag: "[log]", msg: "recorded to portfolio ledger", type: "" },
] as const;

export function AgentPulseFeed({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    function runCycle() {
      // Phase 1: wave sweeps the sphere — card stays hidden.
      after(() => {
        indexRef.current = (indexRef.current + 1) % MESSAGES.length;
        setIndex(indexRef.current);
        setVisible(true);

        // Phase 2: card pops and holds.
        after(() => {
          setVisible(false);

          // Phase 3: rest, then the next wave begins.
          after(runCycle, REST_DURATION_MS);
        }, CARD_HOLD_MS);
      }, WAVE_DURATION_MS);
    }

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const entry = MESSAGES[index];
  const isWatch = entry.type === "watch";

  return (
    <div
      className={cn(
        "pointer-events-none flex items-center gap-2.5 rounded-lg border border-border-muted bg-background-elevated/80 px-3.5 py-2.5 backdrop-blur-sm transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          isWatch ? "bg-danger" : "bg-accent",
        )}
      />
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest",
          isWatch ? "text-danger" : "text-accent",
        )}
      >
        {entry.tag}
      </span>
      <span className="font-mono text-xs text-foreground-muted">
        {entry.msg}
      </span>
    </div>
  );
}
