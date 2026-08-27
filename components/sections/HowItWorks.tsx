import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { StepsGrid } from "@/components/sections/StepsGrid";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="How It Works" meta="Analyze → Explain" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            One continuous loop, running on-chain.
          </h2>
        </Reveal>

        <StepsGrid />
      </Container>
    </section>
  );
}
