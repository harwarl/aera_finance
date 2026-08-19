import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { DashboardSummary } from "@/components/sections/DashboardSummary";
import { DashboardDecisionLog } from "@/components/sections/DashboardDecisionLog";
import { DashboardRules } from "@/components/sections/DashboardRules";
import { DashboardHoldings } from "@/components/sections/DashboardHoldings";

export const metadata: Metadata = {
  title: "Dashboard — Aera Finance",
};

export default function DashboardPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <DashboardSummary />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
              <DashboardDecisionLog />
              <DashboardRules />
            </div>
            <DashboardHoldings />
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
