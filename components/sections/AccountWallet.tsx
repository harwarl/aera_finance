"use client";

import { useAccount, useDisconnect } from "wagmi";
import { DashboardCard } from "@/components/shared/DashboardCard";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AccountWallet() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  if (!address) return null;

  return (
    <DashboardCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Connected Wallet
        </span>
        <p className="mt-2 font-mono text-lg text-foreground">
          {truncateAddress(address)}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          {chain?.name ?? "Unknown network"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => disconnect()}
        className="rounded-lg border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:border-danger hover:text-danger"
      >
        Disconnect
      </button>
    </DashboardCard>
  );
}
