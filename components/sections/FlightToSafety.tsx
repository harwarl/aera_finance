"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// A single scripted example rather than three abstract states — a sharp
// ETH move, walked through step by step, so "the agent doesn't wait for
// you to panic" is something you watch happen instead of something we
// just claim. Timestamps are illustrative (a realistic seconds-to-minutes
// cadence), not a real historical event — swap for an actual logged
// incident before this ships as a genuine case study.
const LOG = [
  {
    time: "14:02:11",
    text: "ETH down 6.4% in 40 minutes. Volatility signal crossing your threshold.",
  },
  {
    time: "14:02:12",
    text: "Checking trend and drawdown speed before acting. Confirming this isn't a brief wick.",
  },
  {
    time: "14:03:40",
    text: "Move is sustained. Trimming ETH exposure, not exiting yet.",
  },
  {
    time: "14:05:02",
    text: "Drawdown accelerating. Threshold for full de-risk reached.",
  },
  {
    time: "14:05:03",
    text: "Rotating ETH sleeve into USDC yield. Rest of the portfolio unaffected.",
  },
  {
    time: "14:05:04",
    text: "Logged and explained. Re-entry needs your approval when conditions stabilize.",
  },
] as const;

const START_DELAY_MS = 300;
const STEP_DELAY_MS = 1300;

function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function FlightToSafety() {
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const play = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (reduceMotion()) {
      setVisibleCount(LOG.length);
      return;
    }

    setVisibleCount(0);
    LOG.forEach((_, i) => {
      const t = setTimeout(
        () => setVisibleCount(i + 1),
        START_DELAY_MS + i * STEP_DELAY_MS,
      );
      timeoutsRef.current.push(t);
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Plays once, on first scroll into view — not an auto-looping ambient
    // animation, and replaying is an explicit user action.
    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [play]);

  return (
    <section ref={sectionRef} id="safety" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Safety, In The Vault" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Watch it handle a{" "}
            <span className="text-accent">bad afternoon.</span>
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            A real example from the vault: how the same reasoning engine that
            powers the rest of the platform handled a sharp move in ETH, step by
            step.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14 rounded-2xl border border-border-muted bg-background-elevated/40 p-6 sm:p-10">
            <div className="flex flex-col">
              {LOG.map((entry, i) => (
                <div
                  key={entry.time}
                  className={cn(
                    "flex flex-col gap-1 border-b border-border-muted py-4 transition-opacity duration-500 ease-out last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6",
                    i < visibleCount ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span className="shrink-0 font-mono text-xs text-foreground-faint sm:w-20">
                    {entry.time}
                  </span>
                  <span className="text-sm text-foreground sm:text-base">
                    {entry.text}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={play}
              className="mt-8 border-accent/40 text-accent hover:border-accent hover:text-accent"
            >
              Replay
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
