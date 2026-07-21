import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { integrations } from "@/config/site";
import { ScrambleText } from "../shared/ScrambleText";

const track = [...integrations, ...integrations];

export function TrustBar() {
  return (
    <section className="py-20">
      <Reveal>
        <Container>
          <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
            <span className="text-foreground-muted">
              <span className="text-accent">/</span>
              <ScrambleText value="Integrated With" />
            </span>
            <span className="text-accent">
              <ScrambleText startDelay={40} value="[ Audited Integrations ]" />
            </span>
          </div>
        </Container>

        <div className="group max-w-[1440] mx-auto overflow-hidden border-y border-border-muted">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {track.map((integration, i) => (
              <div
                key={`${integration.name}-${i}`}
                className="flex h-20 w-48 shrink-0 items-center justify-center border-r border-border-muted px-4 font-mono text-sm uppercase tracking-wide text-foreground-faint transition-colors hover:text-foreground-muted"
              >
                {integration.name}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
