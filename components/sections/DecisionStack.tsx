import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { TypingDecisionLog } from "@/components/shared/TypingDecisionLog";

export function DecisionStack() {
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
                Rebalances, yield routes, and risk checks each land on the
                ledger the instant they happen, with the reasoning behind them
                in plain language. Nothing executes off the record.
              </p>
              <Button href="/connect" className="mt-8">
                View Full Log
              </Button>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-border-muted bg-background-elevated/30">
              <div className="flex items-center justify-between border-b border-border-muted px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground-faint/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                </div>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                  <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
                  Live Preview
                </span>
              </div>

              <TypingDecisionLog />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
