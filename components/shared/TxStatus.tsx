import { Button } from "@/components/ui/Button";
import type { useVaultWrite } from "@/hooks/useVaultContract";

export type VaultTxState = ReturnType<typeof useVaultWrite>;

export function TxStatus({
  tx,
  onClose,
  confirmedLabel,
}: {
  tx: VaultTxState;
  onClose: () => void;
  confirmedLabel: string;
}) {
  if (tx.error) {
    const message = tx.error.message;
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="max-h-32 overflow-y-auto text-sm leading-relaxed text-danger">
          {message.length > 220 ? `${message.slice(0, 220)}…` : message}
        </p>
        <Button type="button" variant="secondary" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm leading-relaxed text-foreground-muted">
        {tx.isConfirmed
          ? confirmedLabel
          : tx.isConfirming
            ? "Waiting for the transaction to confirm on-chain…"
            : "Confirm this in your wallet…"}
      </p>
      {tx.isConfirmed ? (
        <Button type="button" variant="secondary" onClick={onClose} className="w-full">
          Close
        </Button>
      ) : null}
    </div>
  );
}
