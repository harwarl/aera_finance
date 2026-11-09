"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { robinhoodTestnet } from "@/config/wagmi";
import { useVault } from "@/lib/vaultStore";
import { sx } from "../sx";

/**
 * /app is only for a connected wallet, on Robinhood Chain, that owns a vault.
 * Anything else goes to /connect?next=<this path>, which brings the user back
 * here when the flow finishes.
 */
export function AppGate({ children }: { children: React.ReactNode }) {
  const { status, address, chainId } = useAccount();
  const vault = useVault(address);
  const path = usePathname();
  const router = useRouter();

  // wagmi starts its reconnect in an effect that runs after ours, so wait one
  // tick before trusting a "disconnected" status on first load.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 0);
    return () => clearTimeout(t);
  }, []);

  const busy = !settled || status === "connecting" || status === "reconnecting" || (status === "connected" && vault === undefined);
  const ok = status === "connected" && chainId === robinhoodTestnet.id && !!vault;

  useEffect(() => {
    if (!busy && !ok) router.replace(`/connect?next=${encodeURIComponent(path)}`);
  }, [busy, ok, path, router]);

  if (ok) return <>{children}</>;

  return (
    <div role="status" aria-live="polite" style={sx("min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: radial-gradient(40% 50% at 50% 45%, color-mix(in srgb, var(--accent) 8%, transparent), rgba(0,0,0,0) 70%), #04070A; color: #85939A; font-size: 14px")}>
      <span className="aera-mark" aria-hidden="true" style={sx("width: 40px; height: 40px; background: var(--accent); animation: ax-gate 2.4s ease-in-out infinite")} />
      {busy ? "Checking your wallet…" : "Taking you to connect your wallet…"}
    </div>
  );
}
