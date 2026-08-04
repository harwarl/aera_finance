"use client";

import { useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";
import { protocolFees } from "@/config/admin";
import { formatCurrency } from "@/lib/holdings";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AdminTreasury() {
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  function closeModal() {
    setModalOpen(false);
    setWithdrawn(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWithdrawn(true);
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
              {formatCurrency(protocolFees.accruedFees)}
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
        >
          Withdraw Accrued Fees
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Withdraw Accrued Fees"
      >
        {withdrawn ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              {formatCurrency(protocolFees.accruedFees)} would be withdrawn
              to the treasury address here once the fee contract is live —
              this is a placeholder, no funds moved.
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="w-full"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This withdraws the full accrued balance of{" "}
              <span className="font-bold text-foreground">
                {formatCurrency(protocolFees.accruedFees)}
              </span>{" "}
              to {truncateAddress(protocolFees.treasuryAddress)}.
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
