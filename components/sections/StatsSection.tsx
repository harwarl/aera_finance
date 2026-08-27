import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { stats } from "@/config/site";

export function StatsSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Results" meta="Since Genesis" />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={80}>
            <h2 className="max-w-xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Built to run{" "}
              <span className="text-foreground-faint">without you.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
              Live Readout
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="scale" delay={200 + i * 100}>
              <CornerBrackets className="h-full">
                <div className="group flex h-full flex-col gap-8 bg-background-elevated/50 p-6 transition-colors duration-200 hover:bg-background-elevated/30">
                  <span className="font-mono text-xs text-foreground-faint transition-colors duration-200 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ScrambleText
                    value={stat.value}
                    startDelay={i * 150}
                    className="font-sans text-4xl font-black tracking-tighter text-foreground sm:text-5xl"
                  />
                  <span className="max-w-[20ch] text-xs leading-relaxed text-foreground-muted">
                    {stat.label}
                  </span>
                </div>
              </CornerBrackets>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
