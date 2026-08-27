"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function buildSignInMessage(address: string) {
  const nonce = crypto.randomUUID();
  const issuedAt = new Date().toISOString();
  return [
    "Sign in to Atlas",
    "",
    "This signature verifies wallet ownership. It does not trigger a transaction or cost any gas.",
    "",
    `Wallet: ${address}`,
    `Nonce: ${nonce}`,
    `Issued: ${issuedAt}`,
  ].join("\n");
}

type AuthState = "idle" | "signing" | "authenticated";

export function ConnectFlow() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [authState, setAuthState] = useState<AuthState>("idle");
  const [authError, setAuthError] = useState<string | null>(null);

  async function handleSign() {
    if (!address) return;

    setAuthState("signing");
    setAuthError(null);

    try {
      const message = buildSignInMessage(address);
      const signature = await signMessageAsync({ message });

      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, message, signature }),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error ?? "Verification failed.");
      }

      setAuthState("authenticated");
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Signature failed. Try again.",
      );
      setAuthState("idle");
    }
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

          {isConnected && address ? (
            <div className="mt-5 flex items-center justify-between border border-border-muted bg-background/60 px-4 py-3">
              <span className="font-mono text-sm text-foreground">
                {truncateAddress(address)}
              </span>
              <button
                type="button"
                onClick={() => {
                  disconnect();
                  setAuthState("idle");
                  setAuthError(null);
                }}
                className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-danger"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Connect a wallet to launch the Aera agent. This only reads your
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
          isConnected ? "opacity-100" : "pointer-events-none opacity-40",
        )}
      >
        <div className="border border-border-muted bg-background-elevated/60 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
              02 · Sign Wallet
            </span>
            {authState === "authenticated" ? (
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                <Check className="h-3 w-3" />
                Verified
              </span>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            Sign a message to prove you control this wallet. It&apos;s free — no
            transaction, no gas.
          </p>

          {authState === "authenticated" ? (
            <Button href="/dashboard" className="mt-5 w-full sm:w-auto">
              Enter Aera
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSign}
              disabled={!isConnected || authState === "signing"}
              className="mt-5 w-full sm:w-auto"
            >
              {authState === "signing" ? "Awaiting Signature…" : "Sign Message"}
            </Button>
          )}

          {authError ? (
            <p className="mt-4 text-xs text-danger">{authError}</p>
          ) : null}
        </div>
      </CornerBrackets>
    </div>
  );
}
