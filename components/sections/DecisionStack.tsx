"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// Six placeholder decisions dealt into a stack, one at a time, like cards
// onto a deck — pauses once fully stacked, then flies apart and redeals on
// a loop. Pauses/plays with an IntersectionObserver so it's not burning
// cycles off-screen, and respects prefers-reduced-motion.
const CARDS = [
  { tag: "REBALANCE", detail: "Trimmed AAPL 6.2% over target weight, routed the difference to yield." },
  { tag: "CHECK", detail: "Proposed trade cleared the daily risk bound." },
  { tag: "YIELD ROUTE", detail: "Idle USDC moved into a higher-yield position." },
  { tag: "CHECK", detail: "Vault cleared risk bound before execution." },
  { tag: "ACTION", detail: "Migrated the position — no signature required." },
  { tag: "LOG", detail: "Recorded to the portfolio ledger." },
] as const;

const CARD_ROTATIONS = [3, -4, 2, -3, 4, -2];

export function DecisionStack() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(".stack-card", stack);
    let tl: gsap.core.Timeline | null = null;

    function buildTimeline() {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
      cards.forEach((card, i) => {
        timeline.fromTo(
          card,
          { y: -220, x: 0, rotate: 0, opacity: 0, scale: 0.92 },
          {
            y: i * 6,
            x: i * 5,
            rotate: CARD_ROTATIONS[i % CARD_ROTATIONS.length],
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.6)",
          },
          i === 0 ? 0 : "-=0.35",
        );
      });
      timeline.to({}, { duration: 1.5 });
      timeline.to(cards, {
        y: -220,
        opacity: 0,
        scale: 0.92,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.in",
      });
      return timeline;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!tl) tl = buildTimeline();
          else tl.play();
        } else {
          tl?.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(stack);

    return () => {
      observer.disconnect();
      tl?.kill();
    };
  }, []);

  return (
    <section id="decisions" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="The Ledger" meta="Every Move, Logged" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal delay={80}>
            <div>
              <h2 className="max-w-lg text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                One agent.{" "}
                <span className="text-accent">Every decision on record.</span>
              </h2>
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
                Rebalances, yield routes, and risk checks — each one lands on
                the ledger the instant it happens, with the reasoning behind
                it in plain language. Nothing executes off the record.
              </p>
              <Button href="/dashboard/decisions" className="mt-8">
                View Full Log
              </Button>
            </div>
          </Reveal>

          <Reveal delay={160} variant="scale">
            <div
              ref={stackRef}
              className="relative mx-auto h-[280px] w-full max-w-sm sm:h-[320px]"
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.tag + i}
                  className={cn(
                    "stack-card absolute left-1/2 top-1/2 w-64 -ml-32 -mt-[52px] border border-border-muted bg-background-elevated p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:w-72 sm:-ml-36",
                  )}
                  style={{ zIndex: i }}
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-accent">{card.tag}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
