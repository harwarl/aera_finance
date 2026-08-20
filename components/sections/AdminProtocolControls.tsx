"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { useVaultIsPaused, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";
import { cn } from "@/lib/utils";

export function AdminProtocolControls() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: isPaused, refetch } = useVaultIsPaused();
  const tx = useVaultWrite();

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  function closeModal() {
    setModalOpen(false);
    tx.reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await tx.writeContractAsync(isPaused ? vaultWrite.unpause() : vaultWrite.pause());
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Protocol Controls
        </span>

        <div className="mt-5 flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              isPaused ? "bg-danger" : "animate-ticker-blink bg-accent"
            )}
          />
          <span className="text-lg font-black tracking-tight text-foreground">
            {isPaused ? "Paused" : "Active"}
          </span>
        </div>
        <p className="mt-2 max-w-[42ch] text-xs leading-relaxed text-foreground-faint">
          Pausing blocks new deposits and rebalances across every vault
          protocol-wide — withdrawals stay open. A global circuit breaker
          for emergencies, separate from any single user&apos;s own rules.
        </p>

        <Button
          variant="secondary"
          className={cn(
            "mt-5 w-full sm:w-auto",
            !isPaused && "hover:border-danger hover:text-danger"
          )}
          onClick={() => setModalOpen(true)}
        >
          {isPaused ? "Unpause Protocol" : "Pause Protocol"}
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={isPaused ? "Unpause Protocol" : "Pause Protocol"}
      >
        {tx.hash ? (
          <TxStatus
            tx={tx}
            onClose={closeModal}
            confirmedLabel={isPaused ? "Protocol unpaused on-chain." : "Protocol paused on-chain."}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              {isPaused
                ? "This resumes deposits and rebalances for every connected vault."
                : "This immediately blocks new deposits and rebalances for every connected vault, for every user, until unpaused. Withdrawals remain available throughout."}
            </p>
            <Button type="submit" className="w-full">
              Confirm {isPaused ? "Unpause" : "Pause"}
            </Button>
          </form>
        )}
      </Modal>
    </CornerBrackets>
  );
}
