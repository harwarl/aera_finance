import Link from "next/link";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { RulesEditor } from "@/components/sections/RulesEditor";
import { PortfolioConstraints } from "@/components/sections/PortfolioConstraints";

export const metadata: Metadata = {
  title: "Rules — Aera Finance",
};

export default function RulesPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                Your Rules
              </span>
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-foreground-muted">
                These are your preferences for how the agent manages your
                portfolio. Change them any time — the agent adapts on the
                next rebalance.
              </p>
            </div>

            <RulesEditor />

            <details className="group border border-dashed border-border-muted bg-background-subtle/40 p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-foreground-faint">
                <span className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Advanced · System Constraints
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>

              <div className="mt-5">
                <PortfolioConstraints />
              </div>

              <Link
                href="/dashboard/security"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
              >
                View Full Security &amp; Trust Page
                <ArrowRight className="h-3 w-3" />
              </Link>
            </details>
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
