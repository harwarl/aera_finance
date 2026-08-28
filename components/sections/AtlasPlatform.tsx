"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Lock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AutonomyDial } from "@/components/shared/AutonomyDial";
import {
  AgentScoreVisual,
  BLUE,
  reduceMotion,
  VaultVisual,
  type VisualProps,
  YieldVisual,
} from "@/components/shared/PlatformStepVisuals";
import {
  PlatformCarousel,
  type PlatformCarouselItem,
} from "@/components/shared/PlatformCarousel";
import { Reveal } from "@/components/shared/Reveal";

// The vault is the first of eight things the same engine is built to run.
// Items 1, 2, 3, and 5 reuse visuals already built for "How It Works" and
// "Control" rather than re-illustrating the same idea twice; items 4, 6, 7,
// and 8 get new, small, single-purpose diagrams since nothing existing
// covers guardrails, infrastructure, the signal feed, or strategy sharing.
//
// "Live" vs "Roadmap" isn't decorative: items 1-5 are the vault product's
// current behavior, items 6-8 are the "infrastructure other teams can
// build on, a data feed for other agents, and eventually shared
// strategies" language already used in the FAQ and whitepaper roadmap —
// so the badge stays accurate rather than inventing a rating.

const GUARDRAILS = [
  "No withdrawal to a new address",
  "No trading an unlisted asset",
  "No exceeding your caps",
];

function GuardrailsVisual({ active }: VisualProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const tl = gsap.timeline();
    tl.set(rows, { opacity: 0, x: -8 }).to(rows, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.15,
    });
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-border-muted bg-background-subtle p-5">
      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
        Enforced by the contract
      </span>
      <div className="mt-4 flex flex-col gap-2">
        {GUARDRAILS.map((rule, i) => (
          <div
            key={rule}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex items-center gap-2.5 rounded-lg border border-accent/20 bg-accent/5 px-3.5 py-2.5"
          >
            <Lock className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="font-mono text-[11px] text-foreground">
              {rule}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VaultFactoryVisual({ active }: VisualProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const tl = gsap.timeline();
    tl.set([topRef.current, bottomRef.current], { opacity: 0, y: -8 })
      .to(topRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(
        bottomRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.15",
      );
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        ref={topRef}
        className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-center"
      >
        <span className="font-mono text-xs font-bold text-foreground">
          Your Product
        </span>
      </div>
      <div className="flex justify-center">
        <span className="font-mono text-[9px] text-foreground-faint">
          built on
        </span>
      </div>
      <div
        ref={bottomRef}
        className="rounded-lg border border-border-muted bg-background-subtle px-4 py-4 text-center"
      >
        <span className="font-mono text-xs font-bold text-foreground">
          Vault Factory
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
          Decision Engine
        </span>
      </div>
    </div>
  );
}

const SIGNAL_FEED = [
  { label: "Volatility", value: "18", color: "var(--accent)" },
  { label: "Trend", value: "22", color: BLUE },
  { label: "Drawdown", value: "15", color: "var(--accent)" },
  { label: "Macro", value: "58", color: "#e0a94a" },
];

function SignalFeedVisual({ active }: VisualProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();
    tl.set(rows, { opacity: 0, x: -6 })
      .set(dots, { scale: 0 })
      .to(rows, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.13 }, 0)
      .to(dots, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.13 }, 0.08);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-border-muted bg-background-subtle p-5">
      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
        Live Signal Feed
      </span>
      <div className="mt-4 flex flex-col divide-y divide-border-muted">
        {SIGNAL_FEED.map((signal, i) => (
          <div
            key={signal.label}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex items-center justify-between gap-2 py-2 first:pt-0 last:pb-0"
          >
            <span className="flex items-center gap-2">
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="h-1.5 w-1.5 shrink-0 animate-ticker-blink rounded-full"
                style={{ backgroundColor: signal.color }}
              />
              <span className="font-mono text-xs text-foreground">
                {signal.label}
              </span>
            </span>
            <span
              className="font-mono text-xs font-bold"
              style={{ color: signal.color }}
            >
              {signal.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyCardVisual({ active }: VisualProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || reduceMotion()) return;
    const tl = gsap.timeline();
    tl.set([headerRef.current, bodyRef.current, statsRef.current], {
      opacity: 0,
      y: 6,
    }).to([headerRef.current, bodyRef.current, statsRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.12,
    });
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <div className="w-full rounded-xl border border-border-muted bg-background-subtle p-5">
      <div ref={headerRef} className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-bold text-foreground">
          Base Yield + Momentum
        </span>
        <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent">
          Published
        </span>
      </div>
      <p ref={bodyRef} className="mt-2 text-[11px] leading-relaxed text-foreground-muted">
        Idle balances route to yield, crypto sleeve trims on trend breaks.
      </p>
      <div
        ref={statsRef}
        className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground-faint"
      >
        <span>
          Adopters <span className="text-foreground">214</span>
        </span>
        <span>
          Creator Cut <span className="text-accent">0.15%</span>
        </span>
      </div>
    </div>
  );
}

function staticVisual(Component: () => React.ReactElement) {
  return () => Component();
}

const ITEMS: PlatformCarouselItem[] = [
  {
    index: "01",
    title: "Vault-Based Portfolio Management",
    statement: "Deposit once. It's still yours.",
    description:
      "ETH, BTC, stablecoins, and tokenized stocks sit in a smart contract vault only your wallet can withdraw from. The agent holds a narrow rebalance-only role inside it, and revoking that role is one transaction.",
    status: "Live",
    Visual: VaultVisual,
  },
  {
    index: "02",
    title: "Automated Idle-Yield Routing",
    statement: "Nothing sits still.",
    description:
      "Every dollar not actively deployed routes into an approved yield position the moment it lands, no manual sweep required.",
    status: "Live",
    Visual: YieldVisual,
  },
  {
    index: "03",
    title: "Continuous Drift & Risk Monitoring",
    statement: "It never stops watching.",
    description:
      "Volatility, trend, drawdown, and macro regime are scored on every tick, not on a polling schedule, so nothing meaningful gets missed between checks.",
    status: "Live",
    Visual: AgentScoreVisual,
  },
  {
    index: "04",
    title: "Hard On-Chain Guardrails",
    statement: "Limits the contract enforces, not a policy that asks nicely.",
    description:
      "No withdrawal to a new address, no trading an unlisted asset, no exceeding your caps. These live in the contract itself, not in a document the agent could ignore.",
    status: "Live",
    Visual: GuardrailsVisual,
  },
  {
    index: "05",
    title: "Autonomous Rebalancing with Adjustable Autonomy",
    statement: "Set how much room it has.",
    description:
      "One slider sets how much needs your sign-off versus executes on its own, with every threshold on the vault recomputed live off the same value.",
    status: "Live",
    Visual: staticVisual(AutonomyDial),
  },
  {
    index: "06",
    title: "Vault Infrastructure",
    statement: "The rails underneath, available to build on.",
    description:
      "The vault product is the first thing built on this engine, not the only thing it can support. The same contracts and decision layer are designed for other teams to build their own products on top of.",
    status: "Roadmap",
    Visual: VaultFactoryVisual,
  },
  {
    index: "07",
    title: "Market Signal Feed",
    statement: "The same signals, as a feed.",
    description:
      "The volatility, trend, drawdown, and macro scoring that drives the vault's own decisions is designed to be exposed as a feed other agents can read.",
    status: "Roadmap",
    Visual: SignalFeedVisual,
  },
  {
    index: "08",
    title: "Strategy Sharing",
    statement: "Write a strategy. Others can run it.",
    description:
      "Publish a strategy built on the same engine, let other vaults adopt it, and earn a share of what it manages, without giving up custody of anyone's funds.",
    status: "Roadmap",
    Visual: StrategyCardVisual,
  },
];

export function AtlasPlatform() {
  return (
    <section id="platform" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Platform" meta="8 / 1 Engine" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Eight things. <span className="text-accent">One engine.</span>
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            Atlas starts as a single vault product. The same contracts,
            signals, and reasoning layer are built to carry more.
          </p>
        </Reveal>
      </Container>

      <div className="mt-14">
        <PlatformCarousel items={ITEMS} />
      </div>
    </section>
  );
}
