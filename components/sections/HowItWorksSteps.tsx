"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// Four cards, each mostly visual (roughly a 70/30 icon-to-text split) with
// a timestamp, headline, description, and fill-progress bar underneath.
// Bars before the active step sit full, the active one fills over
// STEP_DURATION_MS, the rest stay empty — then it advances and loops.
// Timed with GSAP rather than CSS keyframes since each step's duration and
// the loop-reset need to be coordinated in JS anyway.
//
// The active card also gets ACTIVE_WEIGHT× the width of the other three —
// a real flex-basis tween, not a transform overlay, so it actually pushes
// its neighbors narrower rather than just floating on top of them. Desktop
// (lg+) only; on the stacked mobile layout every card is full-width
// regardless, so there's nothing to elevate. Each card reuses GlowCard —
// the same reactive, cursor-tracked border glow as "The Gap."
//
// Every visual also takes an `active` prop (i === activeIndex) and replays
// its entrance — rows/tags fading and sliding in, icons popping in with a
// stagger — each time its column becomes the one being read, not just once
// on first mount. That's what keeps a card from going dead for the ~3s
// between its reveal and the next card taking over.

const STEP_DURATION_MS = 3600;
const ACTIVE_WEIGHT = 1.7;
const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// A restrained second and third hue alongside the locked teal accent, used
// only here to distinguish content (assets, partners, risk factors) — same
// pattern already used for BTC's amber in the performance chart. Newer,
// smaller holdings stay neutral rather than reaching for a fourth or fifth
// hue — restraint over a rainbow of asset colors.
const AMBER = "#e0a94a"; // BTC / warmth
const BLUE = "#6d8cf7"; // external chain & stablecoin partners
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

const RISK_FACTORS = [
  { label: "Volatility", value: 22, color: "var(--accent)" },
  { label: "Trend", value: 18, color: "var(--accent)" },
  { label: "Drawdown", value: 52, color: "var(--foreground-faint)" },
];

const EXECUTION_NODES = [
  { name: "Vault Contract", color: "var(--accent)" },
  { name: "Robinhood Chain", color: BLUE },
];

function reduceMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

type VisualProps = { active: boolean };

function VaultVisual({ active }: VisualProps) {
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

function YieldVisual({ active }: VisualProps) {
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

function AgentScoreVisual({ active }: VisualProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const bars = barRefs.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();
    tl.set(rows, { opacity: 0, x: -6 })
      .set(bars, { scaleX: 0 })
      .to(rows, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.15 }, 0)
      .to(bars, { scaleX: 1, duration: 0.9, ease: "power2.out", stagger: 0.15 }, 0.1);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-border-muted bg-background-subtle p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
          Agent · Risk Score
        </span>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-accent">
          <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
          Live
        </span>
      </div>
      <div className="mt-2 flex items-end gap-1.5">
        <span className="text-2xl font-black leading-none text-foreground">32</span>
        <span className="pb-0.5 font-mono text-[9px] text-foreground-faint">/ 100</span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {RISK_FACTORS.map((factor, i) => (
          <div
            key={factor.label}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex items-center gap-2"
          >
            <span className="w-16 shrink-0 font-mono text-[8px] uppercase tracking-widest text-foreground-faint">
              {factor.label}
            </span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-background">
              <span
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="block h-full origin-left"
                style={{ width: `${factor.value}%`, backgroundColor: factor.color }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionVisual({ active }: VisualProps) {
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement | null>(null);

  // The traveling pulse along the connector lines loops forever regardless
  // of which card is active — it's the one visual that already had
  // continuous action, so it isn't gated or replayed.
  useEffect(() => {
    if (reduceMotion()) return;
    const tweens = pulseRefs.current.map((dot, i) => {
      if (!dot) return null;
      return gsap.fromTo(
        dot,
        { attr: { cy: 2 } },
        {
          attr: { cy: 22 },
          duration: 1.3,
          delay: i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
      );
    });
    return () => tweens.forEach((t) => t?.kill());
  }, []);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    const tl = gsap.timeline();
    tl.set([pillRef.current, ...nodes], { opacity: 0, y: 6 }).to(
      [pillRef.current, ...nodes],
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.16 },
    );
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div
        ref={pillRef}
        className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent"
      >
        Aera Agent
      </div>
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="h-6 w-full max-w-55"
        aria-hidden="true"
      >
        <line x1="25" y1="0" x2="25" y2="24" stroke="var(--border-color)" strokeWidth="1" />
        <line x1="75" y1="0" x2="75" y2="24" stroke="var(--border-color)" strokeWidth="1" />
        <circle
          ref={(el) => {
            pulseRefs.current[0] = el;
          }}
          cx="25"
          cy="2"
          r="2.2"
          fill="var(--accent)"
        />
        <circle
          ref={(el) => {
            pulseRefs.current[1] = el;
          }}
          cx="75"
          cy="2"
          r="2.2"
          fill={BLUE}
        />
      </svg>
      <div className="grid w-full grid-cols-2 gap-2">
        {EXECUTION_NODES.map((node, i) => (
          <div
            key={node.name}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="flex flex-col items-center gap-1 rounded-lg border px-2.5 py-3"
            style={{
              borderColor: `color-mix(in srgb, ${node.color} 30%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${node.color} 7%, transparent)`,
            }}
          >
            <span className="text-center font-mono text-[9px] font-bold text-foreground">
              {node.name}
            </span>
            <span
              className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-widest"
              style={{ color: node.color }}
            >
              <Check className="h-2.5 w-2.5" />
              Verified
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    time: "0:20",
    title: "Deposit into your vault",
    description:
      "Fund once. ETH, BTC, or stablecoins land in a vault only your wallet can withdraw from.",
    Visual: VaultVisual,
  },
  {
    time: "0:45",
    title: "Idle balance earns automatically",
    description:
      "Every dollar not actively deployed routes into a Morpho yield position the moment it lands.",
    Visual: YieldVisual,
  },
  {
    time: "1:10",
    title: "The agent watches every tick",
    description:
      "Volatility, trend, and drawdown are scored continuously, with no polling and no missed moves.",
    Visual: AgentScoreVisual,
  },
  {
    time: "1:35",
    title: "Rebalances execute on-chain",
    description:
      "Proposals that clear your limits route through Robinhood Chain liquidity automatically.",
    Visual: ExecutionVisual,
  },
] as const;

const INACTIVE_WEIGHT_SUM = STEPS.length - 1;
const ACTIVE_WIDTH_PCT = (ACTIVE_WEIGHT / (ACTIVE_WEIGHT + INACTIVE_WEIGHT_SUM)) * 100;
const INACTIVE_WIDTH_PCT = (1 / (ACTIVE_WEIGHT + INACTIVE_WEIGHT_SUM)) * 100;

export function HowItWorksSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (reduceMotion()) return;

    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    function elevate(index: number) {
      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.to(col, {
          width: isDesktop ? `${i === index ? ACTIVE_WIDTH_PCT : INACTIVE_WIDTH_PCT}%` : "100%",
          duration: 0.7,
          ease: "power3.inOut",
        });
      });
    }

    function playStep(index: number) {
      if (cancelled) return;
      setActiveIndex(index);
      elevate(index);

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.set(bar, { scaleX: i < index ? 1 : 0 });
      });

      const bar = barRefs.current[index];
      if (!bar) return;
      tween = gsap.to(bar, {
        scaleX: 1,
        duration: STEP_DURATION_MS / 1000,
        ease: "none",
        onComplete: () => playStep((index + 1) % STEPS.length),
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!tween) playStep(0);
          else tween.play();
        } else {
          tween?.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      tween?.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="How It Works" meta="Deposit → Execute" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Set it up once.{" "}
            <span className="text-accent">The loop runs itself.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div
            ref={containerRef}
            className="mt-12 overflow-hidden rounded-2xl border border-border-muted"
          >
            <div className="flex flex-col divide-y divide-border-muted lg:flex-row lg:divide-x lg:divide-y-0">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  ref={(el) => {
                    columnRefs.current[i] = el;
                  }}
                  className="lg:w-1/4 lg:shrink-0"
                >
                  <GlowCard className="flex h-full flex-col bg-background-elevated/40 p-6 sm:p-7">
                    <div className="flex h-64 items-center justify-center sm:h-72">
                      <step.Visual active={i === activeIndex} />
                    </div>

                    <span
                      className={cn(
                        "mt-6 font-mono text-xs transition-colors duration-300",
                        i === activeIndex ? "text-accent" : "text-foreground-faint",
                      )}
                    >
                      {step.time}
                    </span>
                    <h3 className="mt-1.5 text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
                      {step.description}
                    </p>

                    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-border">
                      <div
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="h-full w-full origin-left scale-x-0 bg-accent"
                      />
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
