"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  PauseCircle,
  PlayCircle,
  ShieldOff,
} from "lucide-react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";

type ActiveModal = "deposit" | "withdraw" | "revoke" | "pause" | null;

function AmountForm({
  actionLabel,
  amount,
  onAmountChange,
  onSubmit,
}: {
  actionLabel: string;
  amount: string;
  onAmountChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Amount (USDC)
        </label>
        <input
          required
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
        />
      </div>
      <Button type="submit" className="w-full">
        {actionLabel}
      </Button>
    </form>
  );
}

function SuccessState({
  onClose,
  label,
}: {
  onClose: () => void;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm leading-relaxed text-foreground-muted">
        {label} would be submitted here once the vault contract is live —
        this is a placeholder for the on-chain write.
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="w-full"
      >
        Close
      </Button>
    </div>
  );
}

export function DashboardAccountControls() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pauseIntent, setPauseIntent] = useState<"pause" | "resume">("pause");

  function closeModal() {
    setActiveModal(null);
    setAmount("");
    setSubmitted(false);
  }

  function openPauseModal() {
    setPauseIntent(paused ? "resume" : "pause");
    setActiveModal("pause");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handlePauseSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setPaused(pauseIntent === "pause");
  }

  return (
    <>
      <CornerBrackets>
        <div className="border border-border-muted bg-background-elevated/50 p-6">
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
            <Button type="button" variant="secondary" onClick={openPauseModal}>
              {paused ? (
                <PlayCircle className="h-3.5 w-3.5" />
              ) : (
                <PauseCircle className="h-3.5 w-3.5" />
              )}
              {paused ? "Resume Agent" : "Pause My Agent"}
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
        </div>
      </CornerBrackets>

      <Modal open={activeModal === "deposit"} onClose={closeModal} title="Deposit">
        {submitted ? (
          <SuccessState onClose={closeModal} label="Deposit" />
        ) : (
          <AmountForm
            actionLabel="Deposit"
            amount={amount}
            onAmountChange={setAmount}
            onSubmit={handleSubmit}
          />
        )}
      </Modal>

      <Modal open={activeModal === "withdraw"} onClose={closeModal} title="Withdraw">
        {submitted ? (
          <SuccessState onClose={closeModal} label="Withdrawal" />
        ) : (
          <AmountForm
            actionLabel="Withdraw"
            amount={amount}
            onAmountChange={setAmount}
            onSubmit={handleSubmit}
          />
        )}
      </Modal>

      <Modal
        open={activeModal === "pause"}
        onClose={closeModal}
        title={pauseIntent === "resume" ? "Resume Agent" : "Pause My Agent"}
      >
        {submitted ? (
          <SuccessState
            onClose={closeModal}
            label={pauseIntent === "resume" ? "Resume" : "Pause"}
          />
        ) : (
          <form onSubmit={handlePauseSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              {pauseIntent === "resume"
                ? "This resumes trade execution for your vault only."
                : "This immediately halts trade execution for your vault only — other users are unaffected. Your funds stay exactly where they are."}
            </p>
            <Button type="submit" className="w-full">
              Confirm {pauseIntent === "resume" ? "Resume" : "Pause"}
            </Button>
          </form>
        )}
      </Modal>

      <Modal
        open={activeModal === "revoke"}
        onClose={closeModal}
        title="Revoke Agent Access"
      >
        {submitted ? (
          <SuccessState onClose={closeModal} label="Revocation" />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This immediately removes the agent&apos;s manager-role
              permission on your vault. Your funds are unaffected and stay
              exactly where they are — you can grant access again later.
            </p>
            <Button type="submit" className="w-full hover:bg-danger">
              Confirm Revoke
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
