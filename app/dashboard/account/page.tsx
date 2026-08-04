import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { AccountWallet } from "@/components/sections/AccountWallet";
import { DashboardAccountControls } from "@/components/sections/DashboardAccountControls";
import { DashboardFees } from "@/components/sections/DashboardFees";

export const metadata: Metadata = {
  title: "Account — Aera Finance",
};

export default function AccountPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                Account
              </span>
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-foreground-muted">
                Your wallet, vault access, and fee schedule.
              </p>
            </div>
            <AccountWallet />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DashboardAccountControls />
              <DashboardFees />
            </div>
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
