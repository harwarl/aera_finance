import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="01" label="The Problem" meta="Manual Management" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal variant="left" delay={80}>
            <h2 className="max-w-xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Manual on-chain portfolios are quietly{" "}
              <span className="text-danger">leaking value</span>.
            </h2>
          </Reveal>

          <Reveal variant="right" delay={200}>
            <p className="text-sm leading-relaxed text-foreground-muted sm:text-base">
              Tokenized stocks and yield sit scattered across chains and
              protocols, drifting out of balance the moment prices move.
              Fixing that by hand means tracking positions daily, timing
              trades, and understanding risk most people were never trained
              for — so allocations sit stale, and returns quietly slip.
            </p>

            <div className="mt-8 border border-border-muted bg-background-elevated/30 p-5">
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                <span>Median 30-Day Drift</span>
                <span className="text-danger">-4.8%</span>
              </div>
              <svg
                viewBox="0 0 300 48"
                className="mt-4 h-10 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="drift-glow" cx="100%" cy="100%" r="70%">
                    <stop offset="0%" stopColor="var(--danger)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--danger)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="300" cy="38" r="26" fill="url(#drift-glow)" />
                <polyline
                  points="0,10 40,14 80,11 120,20 160,18 200,30 240,26 280,38 300,38"
                  fill="none"
                  stroke="var(--danger)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="300" cy="38" r="2.5" fill="var(--danger)" />
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
