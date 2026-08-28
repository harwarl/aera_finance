import {
  AlertTriangle,
  CircleDollarSign,
  Clock,
  Cpu,
  Code2,
  Layers,
  Puzzle,
  RefreshCw,
  Server,
  Timer,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AeraDustMark } from "@/components/shared/AeraDustMark";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";

const PROBLEMS: {
  title: string;
  body: string;
  icons: LucideIcon[];
}[] = [
  {
    title: "Drift doesn't wait for you to check",
    body: "Target allocations decay the moment markets move. By the time you notice, the drift has already cost you.",
    icons: [TrendingUp, Clock, RefreshCw, AlertTriangle],
  },
  {
    title: "Idle isn't neutral. It's a position that's losing",
    body: "Every dollar not deployed is a decision made by default, and it's the only one earning nothing.",
    icons: [Wallet, Timer, Layers, CircleDollarSign],
  },
  {
    title: "Every team rebuilds the same agent from zero",
    body: "Vault contracts, signal pipelines, decision engines. The infrastructure behind an AI-managed portfolio gets built from scratch, again and again, by every team that wants one.",
    icons: [Server, Cpu, Puzzle, Code2],
  },
];

export function ProblemFraming() {
  return (
    <section className="-mt-3 pb-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="The Gap" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} delay={80 + i * 80}>
              <GlowCard className="h-full border border-border-muted rounded-xl bg-background-elevated/40 p-6 sm:p-8">
                <div className="flex gap-3">
                  {problem.icons.map((Icon, iconIndex) => (
                    <span
                      key={iconIndex}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-subtle transition-colors duration-300 delay-100 group-hover/glow:border-accent/40 group-hover/glow:bg-accent/10"
                    >
                      <Icon className="h-4 w-4 text-foreground-faint transition-all duration-200 group-hover/glow:scale-125 group-hover/glow:text-accent" />
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

        <Reveal delay={260} className="mt-4">
          <GlowCard className="grid grid-cols-1 items-center gap-10 border border-border-muted rounded-xl bg-background-elevated/40 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="mx-auto aspect-square w-full max-w-[220px]">
              <AeraDustMark />
            </div>
            <div>
              <h3 className="max-w-lg text-2xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl">
                One person can&apos;t watch every position.{" "}
                <span className="text-foreground-faint">
                  One team can&apos;t build every layer.
                </span>{" "}
                Atlas does both.
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
