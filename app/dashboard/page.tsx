import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { DashboardSummary } from "@/components/sections/DashboardSummary";
import { DashboardPerformance } from "@/components/sections/DashboardPerformance";
import { DashboardTopHoldings } from "@/components/sections/DashboardTopHoldings";
import { DashboardAgentActivity } from "@/components/sections/DashboardAgentActivity";
import { DashboardAgentPanel } from "@/components/sections/DashboardAgentPanel";

export const metadata: Metadata = {
  title: "Dashboard — Aera Finance",
};

export default function DashboardPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start xl:grid-cols-[1fr_360px]">
            <div className="flex min-w-0 flex-col gap-6">
              <DashboardSummary />
              <DashboardPerformance />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <DashboardTopHoldings />
                <DashboardAgentActivity />
              </div>
            </div>
            <DashboardAgentPanel />
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
