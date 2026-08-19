"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Check, ShieldCheck } from "lucide-react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { AGENT_ADDRESS } from "@/config/contracts";
import { useVaultApprovedAgent, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function AgentAccessControl() {
  const { address } = useAccount();
  const { data: approvedAgent, refetch } = useVaultApprovedAgent(address);
  const tx = useVaultWrite();

  const isApproved =
    approvedAgent !== undefined &&
    approvedAgent.toLowerCase() === AGENT_ADDRESS.toLowerCase() &&
    AGENT_ADDRESS.toLowerCase() !== ZERO_ADDRESS;

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  async function handleGrant() {
    await tx.writeContractAsync(vaultWrite.approveAgent(AGENT_ADDRESS));
  }

  return (
    <DashboardCard>
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Agent Access
        </span>
      </div>

      <p className="mt-2 max-w-[50ch] text-xs leading-relaxed text-foreground-faint">
        Approving the agent grants it manager-role permission on your
        vault, scoped to your rules and trade limits above — it never
        gains withdrawal rights. Revoke it any time from Account Controls.
      </p>

      {tx.hash ? (
        <div className="mt-5">
          <TxStatus
            tx={tx}
            onClose={() => tx.reset()}
            confirmedLabel="Agent access granted on-chain."
          />
        </div>
      ) : isApproved ? (
        <span className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
          <Check className="h-3 w-3" />
          Agent Approved
        </span>
      ) : (
        <Button
          type="button"
          className="mt-5 w-full sm:w-auto"
          onClick={handleGrant}
          disabled={!address}
        >
          Grant Agent Access
        </Button>
      )}
    </DashboardCard>
  );
}
