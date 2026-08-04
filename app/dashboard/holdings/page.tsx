import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { HoldingsFull } from "@/components/sections/HoldingsFull";

export const metadata: Metadata = {
  title: "Holdings — Aera Finance",
};

export default function HoldingsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                Holdings
              </span>
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-foreground-muted">
                Every position currently held in your vault, broken out by
                asset type.
              </p>
            </div>
            <HoldingsFull />
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
