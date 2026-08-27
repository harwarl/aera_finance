"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { CopyableAddress } from "@/components/shared/CopyableAddress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useVault } from "@/hooks/useVault";

const CREATE_DELAY_MS = 900;

export function VaultOnboardingFlow() {
  const { isConnected } = useAccount();
  const { vault, createVault } = useVault();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate() {
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, CREATE_DELAY_MS));
    createVault();
    setIsCreating(false);
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <CornerBrackets>
        <div className="border border-border-muted bg-background-elevated/60 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
              01 · Connect Wallet
            </span>
            {isConnected ? (
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                <Check className="h-3 w-3" />
                Connected
              </span>
            ) : null}
          </div>

          {isConnected ? (
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Your wallet is connected — no vault has moved any funds yet.
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Connect a wallet to create your vault. This only reads your
                address — it can&apos;t move funds on its own.
              </p>
              <ConnectButton.Custom>
                {({ openConnectModal, connectModalOpen, mounted }) => (
                  <Button
                    type="button"
                    onClick={openConnectModal}
                    disabled={!mounted || connectModalOpen}
                    className="mt-5 w-full"
                  >
                    {connectModalOpen ? "Connecting…" : "Connect Wallet"}
                  </Button>
                )}
              </ConnectButton.Custom>
            </>
          )}
        </div>
      </CornerBrackets>

      <CornerBrackets
        className={cn(
          "transition-opacity duration-300",
          isConnected ? "opacity-100" : "pointer-events-none opacity-40"
        )}
      >
        <div className="border border-border-muted bg-background-elevated/60 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
              02 · Create Your Vault
            </span>
            {vault ? (
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                <Check className="h-3 w-3" />
                Created
              </span>
            ) : null}
          </div>

          {vault ? (
            <>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                This vault belongs only to your wallet — no other account can
                deposit into it or touch its rules.
              </p>
              <CopyableAddress address={vault.address} className="mt-5" />
              <Button href="/dashboard" className="mt-5 w-full sm:w-auto">
                Go to Dashboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Deploys your own isolated vault position — separate from
                every other user&apos;s, governed only by the rules you set.
              </p>
              <Button
                type="button"
                onClick={handleCreate}
                disabled={!isConnected || isCreating}
                className="mt-5 w-full sm:w-auto"
              >
                {isCreating ? "Creating Vault…" : "Create Vault"}
              </Button>
            </>
          )}
        </div>
      </CornerBrackets>
    </div>
  );
}
