import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RadarDiagram } from "@/components/shared/RadarDiagram";
import { Reveal } from "@/components/shared/Reveal";
import { CornerBrackets } from "../shared/CornerBrackets";
import { ScrambleText } from "../shared/ScrambleText";

export function Hero() {
  return (
    <section className="relative flex min-h-[95vh] flex-col justify-center overflow-hidden py-16 sm:py-24">
      <Container>
        <Reveal className="mb-10 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <span className="text-foreground-muted">
            <span className="text-accent">/ </span>
            <ScrambleText value=" Powered by AI" />
          </span>
          <span className="text-accent">
            <ScrambleText startDelay={40} value="[ On-Chain · Real-Time ]" />
          </span>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal delay={80}>
              <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
                Every trade <span className="text-accent">reasoned.</span>{" "}
                Nothing automated in the dark.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
                Aera manages your portfolio of tokenized real stocks and
                on-chain yield, built on Robinhood Chain — rebalancing
                positions, executing trades, and routing yield without you
                touching a signature. No finance degree required.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-col gap-8 sm:flex-row">
                <CornerBrackets className="w-full sm:w-auto">
                  <Button href="#solution" className="w-full sm:w-auto">
                    Launch Agent
                  </Button>
                </CornerBrackets>
                <Button
                  href="#how-it-works"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={200} className="hidden lg:block">
            <RadarDiagram />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
