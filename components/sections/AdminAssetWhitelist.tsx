"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { APPROVED_ASSETS } from "@/config/contracts";
import { useVaultIsApprovedAsset, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";

function AssetRow({ symbol, name, address }: { symbol: string; name: string; address: `0x${string}` }) {
  const { data: isApproved, refetch } = useVaultIsApprovedAsset(address);
  const tx = useVaultWrite();

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  async function toggle() {
    await tx.writeContractAsync(vaultWrite.setApprovedAsset(address, !isApproved));
  }

  return (
    <div className="flex flex-col gap-2 border border-border-muted p-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="block text-sm font-bold text-foreground">{symbol}</span>
        <span className="block text-xs text-foreground-faint">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {tx.error ? (
          <span className="max-w-[24ch] text-xs text-danger">
            {tx.error.message.slice(0, 80)}
          </span>
        ) : (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-widest",
              isApproved ? "text-accent" : "text-foreground-faint"
            )}
          >
            {isApproved ? "Approved" : "Not Approved"}
          </span>
        )}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={toggle}
          disabled={tx.isPending || tx.isConfirming}
          className={!isApproved ? undefined : "hover:border-danger hover:text-danger"}
        >
          {tx.isPending || tx.isConfirming
            ? "Confirming…"
            : isApproved
              ? "Revoke"
              : "Approve"}
        </Button>
      </div>
    </div>
  );
}

export function AdminAssetWhitelist() {
  const [customAddress, setCustomAddress] = useState("");
  const customTx = useVaultWrite();
  const { data: customIsApproved, refetch: refetchCustom } = useVaultIsApprovedAsset(
    /^0x[a-fA-F0-9]{40}$/.test(customAddress) ? (customAddress as `0x${string}`) : undefined
  );

  useEffect(() => {
    if (customTx.isConfirmed) refetchCustom();
  }, [customTx.isConfirmed, refetchCustom]);

  async function handleCustomSubmit(approved: boolean) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(customAddress)) return;
    await customTx.writeContractAsync(
      vaultWrite.setApprovedAsset(customAddress as `0x${string}`, approved)
    );
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Asset Whitelist
        </span>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
          Calls <code className="text-foreground-muted">setApprovedAsset</code>{" "}
          directly — approving or revoking here changes what every user can
          deposit or withdraw immediately.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          {APPROVED_ASSETS.map((asset) => (
            <AssetRow
              key={asset.symbol}
              symbol={asset.symbol}
              name={asset.name}
              address={asset.address}
            />
          ))}
        </div>

        <div className="mt-5 border-t border-border-muted pt-5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Other Asset Address
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="0x…"
              className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => handleCustomSubmit(true)}
                disabled={!/^0x[a-fA-F0-9]{40}$/.test(customAddress)}
              >
                Approve
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => handleCustomSubmit(false)}
                disabled={!/^0x[a-fA-F0-9]{40}$/.test(customAddress)}
                className="hover:border-danger hover:text-danger"
              >
                Revoke
              </Button>
            </div>
          </div>
          {customAddress && /^0x[a-fA-F0-9]{40}$/.test(customAddress) ? (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Currently:{" "}
              <span className={customIsApproved ? "text-accent" : "text-foreground-faint"}>
                {customIsApproved ? "Approved" : "Not Approved"}
              </span>
            </p>
          ) : null}
          {customTx.error ? (
            <p className="mt-2 text-xs text-danger">
              {customTx.error.message.slice(0, 120)}
            </p>
          ) : null}
        </div>
      </div>
    </CornerBrackets>
  );
}
