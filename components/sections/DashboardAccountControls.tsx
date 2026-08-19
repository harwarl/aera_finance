"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  PauseCircle,
  PlayCircle,
  ShieldOff,
} from "lucide-react";
import { AssetSelect } from "@/components/shared/AssetSelect";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Modal } from "@/components/shared/Modal";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { useVaultAccountStatus, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";
import { APPROVED_ASSETS, type ApprovedAsset } from "@/config/contracts";
import { VaultAccountStatus } from "@/types/contracts";

type ActiveModal = "deposit" | "withdraw" | "revoke" | "pause" | null;

function AmountForm({
  actionLabel,
  amount,
  onAmountChange,
  asset,
  onAssetChange,
  onSubmit,
  disabled,
}: {
  actionLabel: string;
  amount: string;
  onAmountChange: (value: string) => void;
  asset: ApprovedAsset;
  onAssetChange: (symbol: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Asset
        </label>
        <div className="mt-2">
          <AssetSelect assets={APPROVED_ASSETS} value={asset} onChange={onAssetChange} />
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground-faint">
          Only assets on the vault&apos;s approved whitelist can be
          deposited or withdrawn.
        </p>
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Amount ({asset.symbol})
        </label>
        <input
          required
          type="number"
          min="0"
          step="0.000001"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
        />
      </div>
      <Button type="submit" className="w-full" disabled={disabled}>
        {actionLabel}
      </Button>
    </form>
  );
}

export function DashboardAccountControls() {
  const { address } = useAccount();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<ApprovedAsset>(APPROVED_ASSETS[0]);

  // Each action gets its own write/receipt state so one pending tx doesn't
  // make an unrelated button look busy.
  const depositTx = useVaultWrite();
  const withdrawTx = useVaultWrite();
  const pauseTx = useVaultWrite();
  const revokeTx = useVaultWrite();

  const { data: accountStatus, refetch: refetchStatus } = useVaultAccountStatus(address);
  const isPaused = accountStatus === VaultAccountStatus.Paused;

  useEffect(() => {
    if (pauseTx.isConfirmed) refetchStatus();
  }, [pauseTx.isConfirmed, refetchStatus]);

  function closeModal() {
    setActiveModal(null);
    setAmount("");
    depositTx.reset();
    withdrawTx.reset();
    pauseTx.reset();
    revokeTx.reset();
  }

  function handleAssetChange(symbol: string) {
    const next = APPROVED_ASSETS.find((a) => a.symbol === symbol);
    if (next) setAsset(next);
  }

  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    const amountWei = parseUnits(amount || "0", asset.decimals);
    await depositTx.writeContractAsync(
      vaultWrite.deposit(asset.address, amountWei, asset.isNative ? amountWei : undefined)
    );
  }

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    const amountWei = parseUnits(amount || "0", asset.decimals);
    await withdrawTx.writeContractAsync(vaultWrite.withdraw(asset.address, amountWei));
  }

  async function handlePauseSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address) return;

    if (isPaused) {
      // The ABI exposes no self-serve "resume" — selfPause() only ever
      // pauses. This falls back to setAccountStatus(Active), which per the
      // contract's access checks may only succeed for an admin/keeper, not
      // the account owner. If this reverts, resuming likely needs an
      // admin to do it on your behalf.
      await pauseTx.writeContractAsync(
        vaultWrite.setAccountStatus(address, VaultAccountStatus.Active)
      );
    } else {
      await pauseTx.writeContractAsync(vaultWrite.selfPause());
    }
  }

  async function handleRevoke(e: React.FormEvent) {
    e.preventDefault();
    await revokeTx.writeContractAsync(vaultWrite.revokeAgentAccess());
  }

  return (
    <>
      <DashboardCard>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Account Controls
        </span>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveModal("deposit")}
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Deposit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveModal("withdraw")}
          >
            <ArrowUpFromLine className="h-3.5 w-3.5" />
            Withdraw
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveModal("pause")}
          >
            {isPaused ? (
              <PlayCircle className="h-3.5 w-3.5" />
            ) : (
              <PauseCircle className="h-3.5 w-3.5" />
            )}
            {isPaused ? "Resume Agent" : "Pause My Agent"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setActiveModal("revoke")}
            className="hover:border-danger hover:text-danger"
          >
            <ShieldOff className="h-3.5 w-3.5" />
            Revoke Access
          </Button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
          Deposit, withdraw, pause, and revoke are never more than one
          click away — nothing here is buried in a settings menu.
        </p>
      </DashboardCard>

      <Modal open={activeModal === "deposit"} onClose={closeModal} title="Deposit" clean>
        {depositTx.hash ? (
          <TxStatus tx={depositTx} onClose={closeModal} confirmedLabel="Deposit confirmed on-chain." />
        ) : (
          <AmountForm
            actionLabel="Deposit"
            amount={amount}
            onAmountChange={setAmount}
            asset={asset}
            onAssetChange={handleAssetChange}
            onSubmit={handleDeposit}
            disabled={!address}
          />
        )}
      </Modal>

      <Modal open={activeModal === "withdraw"} onClose={closeModal} title="Withdraw" clean>
        {withdrawTx.hash ? (
          <TxStatus tx={withdrawTx} onClose={closeModal} confirmedLabel="Withdrawal confirmed on-chain." />
        ) : (
          <AmountForm
            actionLabel="Withdraw"
            amount={amount}
            onAmountChange={setAmount}
            asset={asset}
            onAssetChange={handleAssetChange}
            onSubmit={handleWithdraw}
            disabled={!address}
          />
        )}
      </Modal>

      <Modal
        open={activeModal === "pause"}
        onClose={closeModal}
        title={isPaused ? "Resume Agent" : "Pause My Agent"}
        clean
      >
        {pauseTx.hash ? (
          <TxStatus
            tx={pauseTx}
            onClose={closeModal}
            confirmedLabel={isPaused ? "Resume confirmed on-chain." : "Pause confirmed on-chain."}
          />
        ) : (
          <form onSubmit={handlePauseSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              {isPaused
                ? "This resumes trade execution for your vault only. Note: the contract has no self-serve resume — if this reverts, an admin needs to reactivate your account."
                : "This immediately halts trade execution for your vault only — other users are unaffected. Your funds stay exactly where they are."}
            </p>
            <Button type="submit" className="w-full" disabled={!address}>
              Confirm {isPaused ? "Resume" : "Pause"}
            </Button>
          </form>
        )}
      </Modal>

      <Modal
        open={activeModal === "revoke"}
        onClose={closeModal}
        title="Revoke Agent Access"
        clean
      >
        {revokeTx.hash ? (
          <TxStatus tx={revokeTx} onClose={closeModal} confirmedLabel="Agent access revoked on-chain." />
        ) : (
          <form onSubmit={handleRevoke} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This immediately removes the agent&apos;s manager-role
              permission on your vault. Your funds are unaffected and stay
              exactly where they are — you can grant access again later.
            </p>
            <Button type="submit" className="w-full hover:bg-danger" disabled={!address}>
              Confirm Revoke
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
