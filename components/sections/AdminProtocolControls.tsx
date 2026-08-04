"use client";

import { useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function AdminProtocolControls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [paused, setPaused] = useState(false);

  function closeModal() {
    setModalOpen(false);
    setConfirmed(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConfirmed(true);
    setPaused((prev) => !prev);
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
              paused ? "bg-danger" : "animate-ticker-blink bg-accent"
            )}
          />
          <span className="text-lg font-black tracking-tight text-foreground">
            {paused ? "Paused" : "Active"}
          </span>
        </div>
        <p className="mt-2 max-w-[42ch] text-xs leading-relaxed text-foreground-faint">
          Pausing halts new trade execution across every vault protocol-wide
          — a global circuit breaker for emergencies, separate from any
          single user&apos;s own rules.
        </p>

        <Button
          variant="secondary"
          className={cn(
            "mt-5 w-full sm:w-auto",
            !paused && "hover:border-danger hover:text-danger"
          )}
          onClick={() => setModalOpen(true)}
        >
          {paused ? "Resume Protocol" : "Pause Protocol"}
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={paused ? "Resume Protocol" : "Pause Protocol"}
      >
        {confirmed ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              This would {paused ? "resume" : "halt"} trade execution across
              every vault here once the agent&apos;s on-chain controller is
              live — this is a placeholder, nothing changed on-chain.
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
              {paused
                ? "This resumes trade execution for every connected vault."
                : "This immediately halts trade execution for every connected vault, for every user, until resumed."}
            </p>
            <Button type="submit" className="w-full">
              Confirm {paused ? "Resume" : "Pause"}
            </Button>
          </form>
        )}
      </Modal>
    </CornerBrackets>
  );
}
