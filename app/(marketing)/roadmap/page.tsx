import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { RulerDivider } from "@/components/layout/RulerDivider";
import { Reveal } from "@/components/shared/Reveal";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Roadmap — Aera Finance",
  description:
    "What's shipped and what's next for Aera's autonomous on-chain portfolio agent.",
};

const legend: { label: string; className: string; pulse?: boolean }[] = [
  { label: "Shipped", className: "border-accent bg-accent" },
  { label: "In Progress", className: "border-accent bg-accent", pulse: true },
  { label: "Planned", className: "border-border bg-background" },
];

export default function RoadmapPage() {
  return (
    <>
      <section className="pb-16 pt-16 sm:pt-24">
        <Container>
          <Reveal className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground-faint">
            <span className="text-accent">/</span> Roadmap
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
              Shipped, in progress,{" "}
              <span className="text-accent">and next.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
              A running log of what Aera&apos;s agent already does, what
              it&apos;s actively learning to do, and what&apos;s queued up
              next.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {legend.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint"
                >
                  <span
                    className={`h-2.5 w-2.5 rotate-45 border ${item.className} ${
                      item.pulse ? "animate-ticker-blink" : ""
                    }`}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <RulerDivider />

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mb-10 hidden font-mono text-[10px] uppercase tracking-widest text-foreground-faint lg:block">
            <span className="text-accent">→</span> Scroll to explore
          </Reveal>

          <RoadmapTimeline />
        </Container>
      </section>

      <RulerDivider />

      <section className="border-b border-border-muted bg-background-elevated/40 py-20 sm:py-28">
        <Container className="flex flex-col items-start gap-8">
          <Reveal>
            <p className="max-w-2xl text-2xl font-black leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              Want to see the next milestone{" "}
              <span className="text-accent">before it ships?</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-8">
              <CornerBrackets>
                <Button href="/waitlist">Join Waitlist</Button>
              </CornerBrackets>
              <Button href="/whitepaper" variant="secondary">
                Read the Whitepaper
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
