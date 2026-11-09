import type { Metadata } from "next";
import { AppGate } from "@/components/aera/app/AppGate";
import { AppShell } from "@/components/aera/app/AppShell";
import { geist } from "@/lib/aeraFont";
import "../aera-tokens.css";
import "./app.css";

export const metadata: Metadata = {
  title: { default: "Aera App", template: "%s · Aera App" },
};

// reference/Aera-App.dc.html (BUILD.md §8). Sample data until wired to the vault contracts.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`aera ${geist.variable}`}>
      <AppGate>
        <AppShell>{children}</AppShell>
      </AppGate>
    </div>
  );
}
