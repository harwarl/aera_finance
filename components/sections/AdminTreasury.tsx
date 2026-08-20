"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { protocolFees } from "@/config/admin";
import { APPROVED_ASSETS } from "@/config/contracts";
import {
  useVaultFeeRateBps,
  useVaultFeesOwedToAdmin,
  useVaultMaxFeeRateBps,
  useVaultWrite,
  vaultWrite,
} from "@/hooks/useVaultContract";
import { formatCurrency } from "@/lib/holdings";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Fees are tracked in USDT — a dollar-denominated approved asset makes
// more sense for a fee/AUM display than ETH would.
const FEE_ASSET = APPROVED_ASSETS.find((asset) => asset.symbol === "USDT")!;

export function AdminTreasury() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: accruedFeesRaw, refetch: refetchAccrued } =
    useVaultFeesOwedToAdmin(FEE_ASSET.address);
  const tx = useVaultWrite();

  const { data: feeRateBps, refetch: refetchFeeRate } = useVaultFeeRateBps();
  const { data: maxFeeRateBps } = useVaultMaxFeeRateBps();
  const [newFeeRatePct, setNewFeeRatePct] = useState("");
  const feeRateTx = useVaultWrite();

  const accruedFees =
    accruedFeesRaw !== undefined
      ? Number(formatUnits(accruedFeesRaw, FEE_ASSET.decimals))
      : protocolFees.accruedFees;

  useEffect(() => {
    if (tx.isConfirmed) refetchAccrued();
  }, [tx.isConfirmed, refetchAccrued]);

  useEffect(() => {
    if (feeRateTx.isConfirmed) refetchFeeRate();
  }, [feeRateTx.isConfirmed, refetchFeeRate]);

  function closeModal() {
    setModalOpen(false);
    tx.reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (accruedFeesRaw === undefined) return;
    await tx.writeContractAsync(vaultWrite.withdrawFees(FEE_ASSET.address, accruedFeesRaw));
  }

  async function handleFeeRateSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pct = Number(newFeeRatePct);
    if (Number.isNaN(pct)) return;
    await feeRateTx.writeContractAsync(vaultWrite.setFeeRate(BigInt(Math.round(pct * 100))));
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Protocol Treasury
        </span>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Total AUM
            </span>
            <p className="mt-1.5 text-lg font-bold text-foreground">
              {formatCurrency(protocolFees.totalAum)}
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Accrued Fees
            </span>
            <p className="mt-1.5 text-lg font-bold text-accent">
              {formatCurrency(accruedFees)}
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Withdrawn to Date
            </span>
            <p className="mt-1.5 text-lg font-bold text-foreground">
              {formatCurrency(protocolFees.withdrawnToDate)}
            </p>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Treasury · {truncateAddress(protocolFees.treasuryAddress)}
        </p>

        <Button
          variant="secondary"
          className="mt-5 w-full sm:w-auto"
          onClick={() => setModalOpen(true)}
          disabled={!accruedFeesRaw}
        >
          Withdraw Accrued Fees
        </Button>

        <div className="mt-6 border-t border-border-muted pt-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Fee Rate
          </span>
          <p className="mt-1.5 text-sm font-bold text-foreground">
            {feeRateBps !== undefined ? `${Number(feeRateBps) / 100}%` : "—"}
            {maxFeeRateBps !== undefined ? (
              <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-widest text-foreground-faint">
                Max {Number(maxFeeRateBps) / 100}%
              </span>
            ) : null}
          </p>

          {feeRateTx.hash ? (
            <div className="mt-3">
              <TxStatus
                tx={feeRateTx}
                onClose={() => feeRateTx.reset()}
                confirmedLabel="Fee rate updated on-chain."
              />
            </div>
          ) : (
            <form onSubmit={handleFeeRateSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="number"
                min={0}
                max={maxFeeRateBps !== undefined ? Number(maxFeeRateBps) / 100 : 10}
                step={0.1}
                value={newFeeRatePct}
                onChange={(e) => setNewFeeRatePct(e.target.value)}
                placeholder="New rate %"
                className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
              />
              <Button type="submit" size="sm" disabled={newFeeRatePct === ""}>
                Update
              </Button>
            </form>
          )}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Withdraw Accrued Fees"
      >
        {tx.hash ? (
          <TxStatus tx={tx} onClose={closeModal} confirmedLabel="Fees withdrawn on-chain." />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This withdraws the full accrued balance of{" "}
              <span className="font-bold text-foreground">
                {formatCurrency(accruedFees)}
              </span>{" "}
              via <code className="text-foreground-muted">withdrawFees</code>{" "}
              — this calls the vault contract for real.
            </p>
            <Button type="submit" className="w-full">
              Confirm Withdrawal
            </Button>
          </form>
        )}
      </Modal>
    </CornerBrackets>
  );
}
