import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { DashboardAgentPanel } from "@/components/sections/DashboardAgentPanel";
import { DashboardPerformance } from "@/components/sections/DashboardPerformance";
import { Reveal } from "@/components/shared/Reveal";

export function LiveDemo() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader label="Live Demo" meta="No Wallet Required" />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            This is a real vault.{" "}
            <span className="text-accent">It just isn&apos;t yours yet.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 border border-border-muted rounded-xl bg-background-elevated/30">
            <div className="flex items-center justify-between border-b border-border-muted px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground-faint/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
                Live Preview
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_320px]">
              <DashboardPerformance />
              <DashboardAgentPanel />
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-8 flex justify-center">
            <Button href="/onboarding">Create Your Own Vault</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
