import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { securityBadges } from "@/config/site";

export function SecuritySection() {
  return (
    <section id="security" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="05" label="Security" meta="Non-Custodial" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <Reveal variant="left" delay={80}>
              <h2 className="max-w-md text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                Your keys. Your limits.{" "}
                <span className="text-accent">Aera&apos;s execution.</span>
              </h2>
            </Reveal>

            <Reveal variant="left" delay={160}>
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
                Aera never takes custody of your assets. Funds sit in a smart
                contract vault only you can withdraw from, and every action
                is bound by hard on-chain limits and logged the moment it
                happens.
              </p>
            </Reveal>

            <Reveal variant="left" delay={240}>
              <div className="mt-8 inline-flex items-center gap-2 border border-border-muted px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
                Phase 0 · Validation — audit required before beta funds
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border-muted bg-border-muted sm:grid-cols-2">
            {securityBadges.map((badge, i) => (
              <Reveal key={badge.title} delay={200 + i * 90}>
                <div className="group flex h-full flex-col gap-3 bg-background p-6 transition-colors duration-200 hover:bg-background-elevated/50">
                  <div className="flex items-center justify-between">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                    <span className="font-mono text-xs text-foreground-faint transition-colors duration-200 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-foreground">
                    {badge.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-foreground-muted">
                    {badge.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
