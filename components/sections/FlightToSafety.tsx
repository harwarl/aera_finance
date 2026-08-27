import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const STATES = [
  {
    index: "01",
    name: "Calm",
    tone: "accent" as const,
    description:
      "Normal conditions. The agent holds your target allocation and routes idle balance to yield.",
    allocation: "70% growth / 30% yield",
  },
  {
    index: "02",
    name: "Alert",
    tone: "muted" as const,
    description:
      "Volatility or drift rises past your threshold. Position sizing tightens before anything breaks.",
    allocation: "50% growth / 50% yield",
  },
  {
    index: "03",
    name: "Shelter",
    tone: "danger" as const,
    description:
      "A regime break. The agent rotates toward stablecoins and yield-bearing positions automatically.",
    allocation: "15% growth / 85% yield",
  },
] as const;

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

export function FlightToSafety() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Flight to Safety" meta="Three States" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            The agent doesn&apos;t wait for you to{" "}
            <span className="text-accent">panic.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STATES.map((state, i) => (
            <Reveal key={state.name} delay={160 + i * 100}>
              <CornerBrackets className="h-full">
                <div className="flex h-full flex-col gap-5 bg-background-elevated/40 p-6 sm:p-7">
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
                        className={cn("h-full", BAR_CLASS[state.tone])}
                        style={{
                          width: `${100 - Number(state.allocation.split("%")[0])}%`,
                        }}
                      />
                    </div>
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                      {state.allocation}
                    </span>
                  </div>
                </div>
              </CornerBrackets>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
