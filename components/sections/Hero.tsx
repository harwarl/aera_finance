import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "@/components/shared/HeroScene";
import { Reveal } from "@/components/shared/Reveal";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { Typewriter } from "@/components/shared/Typewriter";
import { CornerBrackets } from "../shared/CornerBrackets";
import { ScrambleText } from "../shared/ScrambleText";

export function Hero() {
  return (
    <section className="relative flex h-[calc(100dvh-5rem)] flex-col overflow-hidden pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <HeroScene />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-background via-background/70 to-transparent sm:block"
      />

      <Container className="relative flex flex-1 flex-col justify-end">
        <Reveal className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-foreground-muted">
          <span className="h-px w-10 bg-accent-100/50" />
          <ScrambleText value="Intelligence, With Guardrails" />
          <span className="hidden h-px w-10 bg-accent/50 sm:block" />
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-3xl text-[clamp(2.4rem,10vw,5rem)] font-black uppercase leading-[0.88] tracking-tight text-foreground">
            <ScrambleText variant="glitch" value="Executed" />
            <br />
            <ScrambleText variant="glitch" value="on chain." />
            <br />
            <span className="text-accent">
              <Typewriter value="Explained in plain English." />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4 sm:flex-row mt-2">
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
