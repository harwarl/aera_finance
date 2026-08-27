import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { DecisionLogFull } from "@/components/sections/DecisionLogFull";

export const metadata: Metadata = {
  title: "Decision Log — Atlas",
};

export default function DecisionsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                Decision Log
              </span>
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-foreground-muted">
                Every action the agent takes or declines to take, in plain
                language, in the order it happened. Nothing here is summarized
                after the fact.
              </p>
            </div>
            <DecisionLogFull />
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
