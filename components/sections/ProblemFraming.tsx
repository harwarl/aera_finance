import {
  AlertTriangle,
  CircleDollarSign,
  Clock,
  Layers,
  RefreshCw,
  Timer,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { DotMatrixText } from "@/components/shared/DotMatrixText";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";

const PROBLEMS: {
  title: string;
  body: string;
  icons: LucideIcon[];
}[] = [
  {
    title: "Your portfolio drifts while you sleep",
    body: "Target allocations decay the moment markets move. By the time you check, the drift has already cost you.",
    icons: [TrendingUp, Clock, RefreshCw, AlertTriangle],
  },
  {
    title: "Idle cash earns nothing between decisions",
    body: "Stablecoin balances sit uninvested waiting on your next move. Every undecided day is a day unearned.",
    icons: [Wallet, Timer, Layers, CircleDollarSign],
  },
];

export function ProblemFraming() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="The Gap" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} delay={80 + i * 80}>
              <GlowCard className="h-full border border-border-muted bg-background-elevated/40 p-6 sm:p-8">
                <div className="flex gap-3">
                  {problem.icons.map((Icon, iconIndex) => (
                    <span
                      key={iconIndex}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-subtle text-foreground-faint transition-all duration-300 group-hover/glow:border-accent/40 group-hover/glow:bg-accent/10 group-hover/glow:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                </div>

                <h3 className="mt-6 text-lg font-bold text-foreground sm:text-xl">
                  {problem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {problem.body}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-4">
          <GlowCard className="grid grid-cols-1 items-center gap-10 border border-border-muted bg-background-elevated/40 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="mx-auto w-full max-w-[220px] opacity-90">
              <DotMatrixText text="AERA" />
            </div>
            <div>
              <h3 className="max-w-lg text-2xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl">
                Your capital moves every second.{" "}
                <span className="text-foreground-faint">
                  Your attention can&apos;t.
                </span>
              </h3>
              <Button href="#how-it-works" className="mt-8">
                See How It Works
              </Button>
            </div>
          </GlowCard>
        </Reveal>
      </Container>
    </section>
  );
}
