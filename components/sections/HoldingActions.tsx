"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FlagTriangleRight } from "lucide-react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";

export function HoldingActions({ symbol }: { symbol: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function closeModal() {
    setModalOpen(false);
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Actions
        </span>
        <p className="mt-2 max-w-[50ch] text-xs leading-relaxed text-foreground-faint">
          Aera manages trades on this position automatically, inside your
          rules and the system&apos;s constraints — there&apos;s no direct
          buy/sell here. If something looks off, you can flag it or adjust
          your preferences.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <Button type="button" onClick={() => setModalOpen(true)}>
            <FlagTriangleRight className="h-3.5 w-3.5" />
            Request Manual Review
          </Button>

          <Link
            href="/dashboard/rules"
            className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
          >
            Adjust Your Rules
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard/decisions"
            className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
          >
            View Related Decisions
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Request Manual Review"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This would flag {symbol} for manual review in your decision
              log here once the vault contract is live — this is a
              placeholder, nothing was flagged.
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
              This holds any pending action on {symbol} for your manual
              review instead of letting the agent proceed automatically —
              the same circuit breaker the agent triggers on unusually
              large trades.
            </p>
            <Button type="submit" className="w-full">
              Confirm Flag for Review
            </Button>
          </form>
        )}
      </Modal>
    </CornerBrackets>
  );
}
