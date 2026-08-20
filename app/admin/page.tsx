import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AdminGate } from "@/components/sections/AdminGate";
import { AdminWaitlist } from "@/components/sections/AdminWaitlist";
import { AdminTreasury } from "@/components/sections/AdminTreasury";
import { AdminProtocolControls } from "@/components/sections/AdminProtocolControls";
import { AdminErrors } from "@/components/sections/AdminErrors";

export const metadata: Metadata = {
  title: "Admin — Aera Finance",
};

export default function AdminPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <AdminGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-danger">
                Restricted
              </span>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-foreground-muted">
                Access here is gated by checking your connected wallet
                against an admin allowlist defined in the app — there&apos;s
                no server-verified session yet, so treat this as a UI-level
                gate, not real security. Every action below is a placeholder;
                nothing sends, moves, or pauses anything until the real
                backend exists.
              </p>
            </div>

            <AdminTreasury />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
              <AdminWaitlist />
              <AdminProtocolControls />
            </div>

            <AdminErrors />
          </div>
        </AdminGate>
      </Container>
    </section>
  );
}
