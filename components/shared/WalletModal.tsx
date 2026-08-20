"use client";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { Check, LogOut, Radio } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { cn } from "@/lib/utils";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain, isPending } = useSwitchChain();

  function handleDisconnect() {
    disconnect();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Wallet" clean>
      <div className="flex flex-col gap-6">
        {address ? (
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Connected Address
            </span>
            <p className="mt-1.5 font-mono text-sm text-foreground">
              {truncateAddress(address)}
            </p>
          </div>
        ) : null}

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Network
          </span>
          <div className="mt-2 flex flex-col gap-2">
            {chains.map((c) => {
              const active = c.id === chain?.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => switchChain({ chainId: c.id })}
                  disabled={active || isPending}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-3 py-2.5 text-left font-mono text-xs uppercase tracking-widest transition-colors disabled:cursor-default",
                    active
                      ? "border-accent text-accent"
                      : "border-border text-foreground-muted hover:border-border-muted hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Radio className="h-3.5 w-3.5" />
                    {c.name}
                  </span>
                  {active ? <Check className="h-3.5 w-3.5" /> : null}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-foreground-faint">
            Robinhood Testnet is the default network. Mainnet is available
            if you need it.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDisconnect}
          className="flex items-center justify-center gap-2 rounded-lg border border-danger/60 px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-danger transition-colors hover:bg-danger/10"
        >
          <LogOut className="h-3.5 w-3.5" />
          Disconnect Wallet
        </button>
      </div>
    </Modal>
  );
}
