"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AutonomyDial } from "@/components/shared/AutonomyDial";
import { Reveal } from "@/components/shared/Reveal";

// This standalone section is no longer in the page composition — the same
// dial now lives inside "The Atlas Platform" as item 5. Kept intact here
// (rather than deleted) in case it's ever needed as a full-width section
// again; see AutonomyDial for the live slider/derived-fact logic itself.
export function AutonomyModes() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Control" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Set how much room{" "}
            <span className="text-accent">the agent has.</span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            There&apos;s no fixed mode to pick. Drag the line, and every
            threshold below moves with it.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14">
            <AutonomyDial />
            <p className="mt-8 border-t border-border-muted pt-6 text-xs leading-relaxed text-foreground-faint">
              Regardless of this setting: the agent can never withdraw to a
              new address, trade an unlisted asset, or exceed your caps. One
              transaction revokes everything.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
