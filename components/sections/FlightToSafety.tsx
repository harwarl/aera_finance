"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Check,
  ShieldCheck,
  Sun,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// Redesigned onto the patterns the rest of the site has settled into: a
// GlowCard per state, an icon badge that brightens immediately on hover
// with the card's border catching up a beat later (same as "The Gap" and
// "Control"), and "Calm" marked active to tie back to the live risk score
// shown elsewhere (32/100 sits under the Calm threshold).

const STATES: {
  index: string;
  name: string;
  Icon: LucideIcon;
  tone: "accent" | "muted" | "danger";
  description: string;
  allocation: string;
  active?: boolean;
}[] = [
  {
    index: "01",
    name: "Calm",
    Icon: Sun,
    tone: "accent",
    description:
      "Normal conditions. The agent holds your target allocation and routes idle balance to yield.",
    allocation: "70% growth / 30% yield",
    active: true,
  },
  {
    index: "02",
    name: "Alert",
    Icon: TriangleAlert,
    tone: "muted",
    description:
      "Volatility or drift rises past your threshold. Position sizing tightens before anything breaks.",
    allocation: "50% growth / 50% yield",
  },
  {
    index: "03",
    name: "Shelter",
    Icon: ShieldCheck,
    tone: "danger",
    description:
      "A regime break. The agent rotates toward stablecoins and yield-bearing positions automatically.",
    allocation: "15% growth / 85% yield",
  },
];

const TONE_CLASS = {
  accent: "text-accent",
  muted: "text-foreground-muted",
  danger: "text-danger",
};

const BAR_CLASS = {
  accent: "bg-accent",
  muted: "bg-foreground-faint",
  danger: "bg-danger",
};

const CARD_HOVER =
  "[transition:transform_300ms,box-shadow_300ms,border-color_300ms_100ms] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)]";

export function FlightToSafety() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bars = barRefs.current.filter(Boolean) as HTMLDivElement[];
    const targets = STATES.map(
      (s) => 100 - Number(s.allocation.split("%")[0]),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bars.forEach((bar, i) => {
        bar.style.width = `${targets[i]}%`;
      });
      return;
    }

    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          gsap.set(bars, { width: "0%" });
          // Reads as loading, not just growing: every bar races to 100%
          // first, then settles back down to its real allocation.
          const tl = gsap.timeline();
          bars.forEach((bar, i) => {
            const start = i * 0.15;
            tl.to(
              bar,
              { width: "100%", duration: 0.6, ease: "power2.out" },
              start,
            ).to(
              bar,
              { width: `${targets[i]}%`, duration: 0.6, ease: "power2.inOut" },
              start + 0.6,
            );
          });
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Safety" meta="Three States" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            The agent doesn&apos;t wait for you to{" "}
            <span className="text-accent">panic.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {STATES.map((state, i) => (
            <Reveal key={state.name} delay={160 + i * 100}>
              <GlowCard
                className={cn(
                  "flex h-full flex-col gap-5 border border-border-muted rounded-2xl bg-background-elevated/40 p-6 sm:p-7",
                  CARD_HOVER,
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-subtle text-foreground-muted",
                      "transition-all duration-200 group-hover/glow:scale-110 group-hover/glow:border-accent/40 group-hover/glow:bg-accent/10 group-hover/glow:text-accent",
                    )}
                  >
                    <state.Icon className="h-5 w-5" />
                  </span>
                  {state.active && (
                    <Badge className="border-accent/40 text-accent">
                      Active Now
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-foreground-faint">
                  <span>{state.index}</span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      TONE_CLASS[state.tone],
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        BAR_CLASS[state.tone],
                      )}
                    />
                    {state.name}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-foreground-muted">
                  {state.description}
                </p>

                <div className="mt-auto">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                    <div
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className={cn("h-full w-0", BAR_CLASS[state.tone])}
                    />
                  </div>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                    {state.allocation}
                  </span>
                </div>

                {state.name === "Shelter" && (
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-danger">
                    <Check className="h-3 w-3" />
                    Re-entry waits for your approval
                  </span>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
