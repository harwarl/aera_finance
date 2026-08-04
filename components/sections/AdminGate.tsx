"use client";

import { useAccount } from "wagmi";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Button } from "@/components/ui/Button";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { isConnected, status } = useAccount();
  const isAdmin = useIsAdmin();

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
            <span className="font-mono text-xs uppercase tracking-widest text-danger">
              Admins Only
            </span>
            <h2 className="mt-3 text-xl font-black leading-snug tracking-tight text-foreground">
              Connect an admin wallet to continue.
            </h2>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-foreground-muted">
              This area is restricted to the protocol&apos;s admin wallets.
            </p>
            <Button href="/connect" className="mt-6">
              Connect Wallet
            </Button>
          </div>
        </CornerBrackets>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
        <CornerBrackets>
          <div className="max-w-sm border border-border-muted bg-background-elevated/60 p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-danger">
              Admins Only
            </span>
            <h2 className="mt-3 text-xl font-black leading-snug tracking-tight text-foreground">
              This wallet doesn&apos;t have admin access.
            </h2>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-foreground-muted">
              Connect a wallet on the admin allowlist, or head back to your
              dashboard.
            </p>
            <Button href="/dashboard" variant="secondary" className="mt-6">
              Back to Dashboard
            </Button>
          </div>
        </CornerBrackets>
      </div>
    );
  }

  return <>{children}</>;
}
