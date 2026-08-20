"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { SegmentedToggle } from "@/components/shared/SegmentedToggle";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { useVaultAccountStatus, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";
import { VAULT_ACCOUNT_STATUS_LABEL, VaultAccountStatus } from "@/types/contracts";

const STATUS_OPTIONS = [
  { value: String(VaultAccountStatus.Active), label: VAULT_ACCOUNT_STATUS_LABEL[VaultAccountStatus.Active] },
  {
    value: String(VaultAccountStatus.PausedByUser),
    label: VAULT_ACCOUNT_STATUS_LABEL[VaultAccountStatus.PausedByUser],
  },
];

function isAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function AdminAccountOverride() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState(String(VaultAccountStatus.Active));
  const tx = useVaultWrite();

  const lookupAddress = isAddress(account) ? (account as `0x${string}`) : undefined;
  const { data: currentStatus, refetch } = useVaultAccountStatus(lookupAddress);

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lookupAddress) return;
    await tx.writeContractAsync(
      vaultWrite.setAccountStatus(lookupAddress, Number(status))
    );
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Account Status Override
        </span>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
          Calls <code className="text-foreground-muted">setAccountStatus</code>{" "}
          directly for any account — only known status values are exposed
          here (see the caveat on the AccountStatus enum in{" "}
          <code className="text-foreground-muted">types/contracts.ts</code>).
        </p>

        {tx.hash ? (
          <div className="mt-5">
            <TxStatus tx={tx} onClose={() => tx.reset()} confirmedLabel="Account status updated on-chain." />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Account Address
              </label>
              <input
                required
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="0x…"
                className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
              />
              {lookupAddress ? (
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Current:{" "}
                  {currentStatus !== undefined
                    ? (VAULT_ACCOUNT_STATUS_LABEL[currentStatus] ?? `Unknown (${currentStatus})`)
                    : "…"}
                </p>
              ) : null}
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                New Status
              </label>
              <div className="mt-2 max-w-xs">
                <SegmentedToggle options={STATUS_OPTIONS} value={status} onChange={setStatus} />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={!lookupAddress}>
              Update Status
            </Button>
          </form>
        )}
      </div>
    </CornerBrackets>
  );
}
