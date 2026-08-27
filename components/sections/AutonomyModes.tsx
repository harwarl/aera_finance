import {
  Check,
  Pencil,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

// Two rows, same three-column rhythm, read together: the top row is who
// holds which piece of control (you / the agent / the contract), the
// bottom row is where you can set the dial between the first two. The
// middle column is the through-line — "the agent decides" up top,
// "Copilot" (its default mode) below — same idea, both places.

type PillarItem = { text: string; positive: boolean; bold?: string };

const PILLARS: {
  Icon: LucideIcon;
  emphasize: boolean;
  label: string;
  items: PillarItem[];
}[] = [
  {
    Icon: SlidersHorizontal,
    emphasize: false,
    label: "You decide, at setup",
    items: [
      { text: "Your target mix and how much stays in stable yield", positive: true },
      { text: "How much volatility you're willing to hold", positive: true },
      { text: "Which assets are allowed. Nothing else gets traded.", positive: true },
      { text: "Your autonomy level: Advisor, Copilot, or Autopilot", positive: true },
      { text: "Deposits, withdrawals, and revocation stay yours alone", positive: true },
    ],
  },
  {
    Icon: Zap,
    emphasize: true,
    label: "The agent decides, continuously",
    items: [
      { bold: "When", text: "your risk score crosses a threshold", positive: true },
      { bold: "How much", text: "to rebalance and in what order", positive: true },
      { bold: "Which", text: "venue and pool get the trade", positive: true },
      { bold: "When", text: "re-entry starts after a flight to safety", positive: true },
      { bold: "All", text: "of it, staying inside the bands you set", positive: true },
    ],
  },
  {
    Icon: ShieldCheck,
    emphasize: false,
    label: "The contract enforces, always",
    items: [
      { text: "Can't withdraw to any address, not even its own", positive: false },
      { text: "Can't touch an asset you haven't whitelisted", positive: false },
      { text: "Can't exceed your floor or caps. Every trade checks on-chain.", positive: false },
      { text: "Can't edit your policy. Only your signature can.", positive: false },
      { text: "One transaction revokes everything immediately", positive: true },
    ],
  },
];

const MODES = [
  {
    name: "Advisor",
    tag: "Human Led",
    Icon: Pencil,
    description:
      "The agent proposes every move. Nothing executes until you approve it.",
    recommended: false,
  },
  {
    name: "Copilot",
    tag: "Default",
    Icon: ShieldCheck,
    description:
      "Routine rebalancing and yield routing run on their own. De-risking always requires your sign-off.",
    recommended: true,
  },
  {
    name: "Autopilot",
    tag: "Agent Led",
    Icon: Zap,
    description:
      "The agent operates fully within your rules. No approval step, still bounded by your on-chain limits.",
    recommended: false,
  },
] as const;

const CARD_HOVER =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)]";

export function AutonomyModes() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Control" meta="You, Agent, Contract" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            You decide how much{" "}
            <span className="text-accent">the agent decides.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            Your policy sets the limits before anything moves. The agent
            decides within them, continuously. The vault contract checks
            every trade on-chain, so nothing about your funds ever comes
            down to trusting a model.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.label} delay={160 + i * 100}>
              <div
                className={cn(
                  "flex h-full flex-col gap-5 rounded-xl border p-6 sm:p-7",
                  pillar.emphasize
                    ? "border-accent/50 bg-accent/5"
                    : "border-border-muted bg-background-elevated/40",
                  CARD_HOVER,
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    pillar.emphasize
                      ? "bg-accent text-background"
                      : "border border-border bg-background-subtle text-foreground-muted",
                  )}
                >
                  <pillar.Icon className="h-5 w-5" />
                </span>

                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  {pillar.label}
                </span>

                <ul className="flex flex-col gap-3">
                  {pillar.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted"
                    >
                      {item.positive ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                      )}
                      <span>
                        {item.bold && (
                          <span className="font-semibold text-foreground">
                            {item.bold}{" "}
                          </span>
                        )}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {MODES.map((mode, i) => (
            <Reveal key={mode.name} delay={460 + i * 100}>
              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-xl border p-6 sm:p-7",
                  mode.recommended
                    ? "border-accent/50 bg-accent/5"
                    : "border-border-muted bg-background-elevated/40",
                  CARD_HOVER,
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-subtle text-foreground-muted">
                      <mode.Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {mode.name}
                    </h3>
                  </div>
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
