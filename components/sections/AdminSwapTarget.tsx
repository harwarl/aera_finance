"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { useVaultSwapTarget, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";

function isAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function AdminSwapTarget() {
  const { data: currentTarget, refetch } = useVaultSwapTarget();
  const [target, setTarget] = useState("");
  const tx = useVaultWrite();

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAddress(target)) return;
    await tx.writeContractAsync(vaultWrite.setSwapTarget(target as `0x${string}`));
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Swap Target
        </span>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
          The 0x exchange proxy address every rebalance routes swaps
          through. Calls{" "}
          <code className="text-foreground-muted">setSwapTarget</code>{" "}
          directly.
        </p>

        <p className="mt-3 font-mono text-xs text-foreground-muted">
          Current: {currentTarget ?? "—"}
        </p>

        {tx.hash ? (
          <div className="mt-5">
            <TxStatus tx={tx} onClose={() => tx.reset()} confirmedLabel="Swap target updated on-chain." />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              required
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0x…"
              className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
            />
            <Button type="submit" size="sm" disabled={!isAddress(target)}>
              Update
            </Button>
          </form>
        )}
      </div>
    </CornerBrackets>
  );
}
