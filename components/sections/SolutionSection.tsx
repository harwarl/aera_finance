import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Reveal } from "@/components/shared/Reveal";

const logEntries = [
  {
    time: "09:41:02",
    action: "REBALANCE",
    detail:
      "Trimmed AAPLx from 18% to 14% after it drifted past your target band, and routed the difference into idle USDC yield.",
  },
  {
    time: "09:41:04",
    action: "YIELD ROUTE",
    detail:
      "Moved idle stablecoin balance into a higher-yield pool now that gas costs are below your 0.4% threshold.",
  },
  {
    time: "09:41:06",
    action: "TRADE",
    detail:
      "Executed via the venue with the best net price after fees — settled on-chain in one transaction.",
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            label="The Solution"
            meta="Autonomous, Explained"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal variant="left" delay={80}>
            <div>
              <h2 className="max-w-lg text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                Aera manages the portfolio. You get the{" "}
                <span className="text-accent">reasoning</span>.
              </h2>
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
                Every rebalance, trade, and yield move is decided by a
                risk-bounded policy engine and logged the moment it happens. In
                plain language, not transaction hashes, so you always know why
                your portfolio changed.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={200}>
            <CornerBrackets>
              <Card className="p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  <span>Agent Decision Log</span>
                  <span className="flex items-center gap-2 text-accent">
                    <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
                    Live
                  </span>
                </div>

                <div className="flex flex-col gap-4 divide-y divide-border-muted">
                  {logEntries.map((entry, i) => (
                    <Reveal key={entry.time} delay={280 + i * 100}>
                      <div className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                          <span className="text-foreground-faint">
                            {entry.time}
                          </span>
                          <span className="border border-border px-2 py-0.5 text-accent">
                            {entry.action}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground-muted">
                          {entry.detail}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Card>
            </CornerBrackets>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
