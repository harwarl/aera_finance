import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const MODES = [
  {
    name: "Advisor",
    tag: "Manual",
    description:
      "The agent proposes every move. Nothing executes until you approve it.",
    recommended: false,
  },
  {
    name: "Copilot",
    tag: "Default",
    description:
      "Routine rebalancing and yield routing run on their own. De-risking always requires your sign-off.",
    recommended: true,
  },
  {
    name: "Autopilot",
    tag: "Full Delegation",
    description:
      "The agent operates fully within your rules — no approval step, still bounded by your on-chain limits.",
    recommended: false,
  },
] as const;

export function AutonomyModes() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Control" meta="Pick Your Autonomy" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            You decide how much{" "}
            <span className="text-accent">the agent decides.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MODES.map((mode, i) => (
            <Reveal key={mode.name} delay={160 + i * 100}>
              <CornerBrackets
                className={cn("h-full", mode.recommended && "opacity-100")}
              >
                <div
                  className={cn(
                    "flex h-full flex-col gap-4 p-6 sm:p-7",
                    mode.recommended
                      ? "border border-accent/40 bg-accent/5"
                      : "bg-background-elevated/40",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">
                      {mode.name}
                    </h3>
                    {mode.recommended ? (
                      <Badge className="border-accent/40 text-accent">
                        {mode.tag}
                      </Badge>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                        {mode.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {mode.description}
                  </p>
                </div>
              </CornerBrackets>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
