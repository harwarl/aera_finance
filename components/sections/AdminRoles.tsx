"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import {
  useVaultIsAdmin,
  useVaultIsKeeper,
  useVaultOwner,
  useVaultWrite,
  vaultWrite,
} from "@/hooks/useVaultContract";

function isAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

type WriteConfig = ReturnType<typeof vaultWrite.setAdmin> | ReturnType<typeof vaultWrite.setKeeper>;

function RoleForm({
  title,
  description,
  restrictedNote,
  disabled,
  useStatusHook,
  buildWriteConfig,
}: {
  title: string;
  description: string;
  restrictedNote?: string;
  disabled?: boolean;
  useStatusHook: (address?: `0x${string}`) => { data: boolean | undefined };
  buildWriteConfig: (address: `0x${string}`, status: boolean) => WriteConfig;
}) {
  const [address, setAddress] = useState("");
  const tx = useVaultWrite();
  const lookupAddress = isAddress(address) ? (address as `0x${string}`) : undefined;
  const { data: currentStatus } = useStatusHook(lookupAddress);

  async function handleClick(status: boolean) {
    if (!lookupAddress) return;
    await tx.writeContractAsync(buildWriteConfig(lookupAddress, status));
  }

  return (
    <div className="border border-border-muted p-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        {title}
      </span>
      <p className="mt-1.5 text-xs leading-relaxed text-foreground-faint">{description}</p>
      {restrictedNote ? (
        <p className="mt-1.5 text-xs leading-relaxed text-danger">{restrictedNote}</p>
      ) : null}

      {tx.hash ? (
        <div className="mt-4">
          <TxStatus tx={tx} onClose={() => tx.reset()} confirmedLabel="Role updated on-chain." />
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x…"
            disabled={disabled}
            className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none disabled:opacity-40"
          />
          {lookupAddress ? (
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Currently:{" "}
              <span className={currentStatus ? "text-accent" : "text-foreground-faint"}>
                {currentStatus ? "Granted" : "Not Granted"}
              </span>
            </p>
          ) : null}
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => handleClick(true)}
              disabled={disabled || !lookupAddress}
            >
              Grant
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => handleClick(false)}
              disabled={disabled || !lookupAddress}
              className="hover:border-danger hover:text-danger"
            >
              Revoke
            </Button>
          </div>
          {tx.error ? (
            <p className="text-xs text-danger">{tx.error.message.slice(0, 120)}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function AdminRoles() {
  const { address } = useAccount();
  const { data: owner } = useVaultOwner();
  const isOwner = Boolean(address && owner && address.toLowerCase() === owner.toLowerCase());

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Roles
        </span>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
          Admins can manage the protocol; keepers can charge fees on any
          account&apos;s behalf. Granting admin is restricted to the
          contract owner.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RoleForm
            title="Admin Role"
            description="Grants or revokes protocol admin — owner only."
            restrictedNote={
              !isOwner ? "This wallet is not the contract owner — this call will revert." : undefined
            }
            useStatusHook={useVaultIsAdmin}
            buildWriteConfig={vaultWrite.setAdmin}
          />
          <RoleForm
            title="Keeper Role"
            description="Grants or revokes keeper access for automated fee charging."
            useStatusHook={useVaultIsKeeper}
            buildWriteConfig={vaultWrite.setKeeper}
          />
        </div>
      </div>
    </CornerBrackets>
  );
}
