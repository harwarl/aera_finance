"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  STATUS_DOT_CLASS,
  STATUS_LABEL,
  STATUS_TEXT_CLASS,
} from "@/lib/decisions";
import type { DecisionStatus } from "@/types";

// The same entry shape/status colors as the real decision log
// (DecisionLogFull, /dashboard/decisions) — a small illustrative set,
// each one typing its description in as it "arrives," accumulating
// downward. Once the last entry finishes, it holds, then clears and
// starts over — a log that's always mid-write, never sitting static.

type Entry = {
  time: string;
  action: string;
  status: DecisionStatus;
  detail: string;
};

const ENTRIES: Entry[] = [
  {
    time: "2m ago",
    action: "REBALANCE",
    status: "executed",
    detail:
      "Trimmed ETH from 21% to 17% after it drifted past your target band, and routed the difference into your approved yield position.",
  },
  {
    time: "4m ago",
    action: "YIELD ROUTE",
    status: "executed",
    detail:
      "Moved idle USDC balance into a higher-yield Morpho position now that the rate spread cleared your 0.4% threshold.",
  },
  {
    time: "9m ago",
    action: "REBALANCE",
    status: "blocked",
    detail:
      "Proposed a 22% BTC position. Blocked by your 15% max trade size constraint before execution. No trade occurred.",
  },
  {
    time: "14m ago",
    action: "REBALANCE",
    status: "review",
    detail:
      "Proposed trade size was within limits but 4.8x larger than your recent average, so the circuit breaker held it for manual review.",
  },
  {
    time: "20m ago",
    action: "TRADE",
    status: "executed",
    detail:
      "Executed via the venue with the best net price after fees, and settled on-chain in one transaction.",
  },
];

const CHAR_MS = 14;
const ENTRY_GAP_MS = 550;
const LOOP_HOLD_MS = 2400;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TypingDecisionLog() {
  const [entryIndex, setEntryIndex] = useState(() =>
    prefersReducedMotion() ? ENTRIES.length - 1 : 0,
  );
  const [typedLength, setTypedLength] = useState(() =>
    prefersReducedMotion() ? ENTRIES[ENTRIES.length - 1].detail.length : 0,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    function typeCurrent(i: number, charIndex: number) {
      if (cancelled) return;

      if (i >= ENTRIES.length) {
        timeout = setTimeout(() => {
          if (cancelled) return;
          setEntryIndex(0);
          setTypedLength(0);
          typeCurrent(0, 0);
        }, LOOP_HOLD_MS);
        return;
      }

      setEntryIndex(i);
      setTypedLength(charIndex);
      const detail = ENTRIES[i].detail;
      if (charIndex < detail.length) {
        timeout = setTimeout(() => typeCurrent(i, charIndex + 1), CHAR_MS);
      } else {
        timeout = setTimeout(() => typeCurrent(i + 1, 0), ENTRY_GAP_MS);
      }
    }

    typeCurrent(0, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [entryIndex, typedLength]);

  return (
    <div
      ref={scrollRef}
      className="flex max-h-[340px] flex-col divide-y divide-border-muted overflow-y-auto"
    >
      {ENTRIES.slice(0, entryIndex + 1).map((entry, i) => {
        const isCurrent = i === entryIndex;
        const shownDetail = isCurrent
          ? entry.detail.slice(0, typedLength)
          : entry.detail;

        return (
          <div
            key={entry.time + entry.action}
            className="flex flex-col gap-2 px-5 py-4 sm:px-6"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="text-foreground-faint">{entry.time}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground-muted">
                {entry.action}
              </span>
              <span
                className={cn(
                  "flex items-center gap-1.5",
                  STATUS_TEXT_CLASS[entry.status],
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    STATUS_DOT_CLASS[entry.status],
                  )}
                />
                {STATUS_LABEL[entry.status]}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {shownDetail}
              {isCurrent && (
                <span className="animate-caret-blink ml-0.5 inline-block h-[0.9em] w-[0.09em] translate-y-[0.15em] bg-current align-middle" />
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
