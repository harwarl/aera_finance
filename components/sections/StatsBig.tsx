import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { stats } from "@/config/site";

export function StatsBig() {
  const [headline, ...rest] = stats;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Results" meta="Since Genesis" />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-4">
          <Reveal delay={80}>
            <ScrambleText
              value={headline.value}
              className="text-6xl font-black leading-none tracking-tighter text-accent sm:text-8xl"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[28ch] pb-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {headline.label}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border-muted pt-10 sm:grid-cols-3">
          {rest.map((stat, i) => (
            <Reveal key={stat.label} delay={200 + i * 100}>
              <span className="block font-mono text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1.5 block max-w-[24ch] text-xs leading-relaxed text-foreground-faint">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
