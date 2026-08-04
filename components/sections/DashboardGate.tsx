"use client";

import { useAccount } from "wagmi";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Button } from "@/components/ui/Button";

export function DashboardGate({ children }: { children: React.ReactNode }) {
  const { isConnected, status } = useAccount();

  if (status === "connecting" || status === "reconnecting") {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Checking wallet…
        </span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
        <CornerBrackets>
          <div className="max-w-sm border border-border-muted bg-background-elevated/60 p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
              Wallet Required
            </span>
            <h2 className="mt-3 text-xl font-black leading-snug tracking-tight text-foreground">
              Connect your wallet to view your dashboard.
            </h2>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-foreground-muted">
              Your portfolio, decision log, and rules are tied to your
              connected wallet.
            </p>
            <Button href="/connect" className="mt-6">
              Connect Wallet
            </Button>
          </div>
        </CornerBrackets>
      </div>
    );
  }

  return <>{children}</>;
}
