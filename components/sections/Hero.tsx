"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { Typewriter } from "@/components/shared/Typewriter";
import { CornerBrackets } from "../shared/CornerBrackets";
import { ScrambleText } from "../shared/ScrambleText";
import { HeroSceneDust } from "../shared/HeroSceneDust";

const REASONING_LINES = [
  "checking AAPLx vs 20d trend...",
  "ETH drift holding within band",
  "confidence on NVDAx: high",
  "BTC trend intact, no action",
];

function ReasoningBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % REASONING_LINES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3.5 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="font-mono text-xs text-accent/80">
        {REASONING_LINES[index]}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex h-[calc(100dvh-5rem)] flex-col overflow-hidden pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <HeroSceneDust />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-background via-background/70 to-transparent sm:block"
      />

      <Container className="relative flex flex-1 flex-col justify-end">
        <Reveal className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-foreground-muted">
          <span className="h-px w-10 bg-accent-100/50" />
          <ScrambleText value="40+ Assets, One View" />
          <span className="hidden h-px w-10 bg-accent/50 sm:block" />
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-3xl text-[clamp(2.4rem,10vw,5rem)] font-black uppercase leading-[0.88] tracking-tight text-foreground mb-2">
            <ScrambleText variant="glitch" value="One agent." />
            <br />
            <span className="text-accent">
              <Typewriter value="A platform underneath it." />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            Atlas is an autonomous agent that manages a portfolio of
            tokenized real stocks and on-chain yield, built on the same
            rails available to power the next one.
          </p>
        </Reveal>

        <Reveal delay={110}>
          <div className="mt-5">
            <ReasoningBadge />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4 sm:flex-row mt-6">
            <CornerBrackets className="w-full sm:w-auto">
              <Button href="/onboarding" className="w-full sm:w-auto">
                Create Your Vault
              </Button>
            </CornerBrackets>
            <Button
              href="#how-it-works"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              See How It Works
            </Button>
          </div>
        </Reveal>
      </Container>

      <Container className="relative pb-2 sm:pb-4">
        <div className="flex justify-center pb-2 sm:pb-3">
          <ScrollCue />
        </div>
      </Container>
    </section>
  );
}
