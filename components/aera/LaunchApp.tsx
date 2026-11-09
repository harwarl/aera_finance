"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useAccountEffect } from "wagmi";
import { robinhoodTestnet } from "@/config/wagmi";
import { hasVault } from "@/lib/vaultStore";

// Returning user with a vault on Robinhood Chain → dashboard. Anyone else
// (new user, wrong network) → the onboarding steps on /connect, which end in
// the dashboard.
const ONBOARD = "/connect?next=%2Fapp";
const destination = (address?: string, chainId?: number) =>
  address && chainId === robinhoodTestnet.id && hasVault(address) ? "/app" : ONBOARD;

// Module-level so the redirect survives the clicked button unmounting (e.g.
// the mobile menu closing); any mounted Launch app button finishes it.
let wanted = false;

/**
 * "Launch app". Not connected: the RainbowKit wallet picker opens in place;
 * once a wallet connects the user continues to the dashboard if it already
 * owns a vault, or to /connect to create one (then on to the dashboard).
 * Already connected: same decision, immediately. Renders a real link so it
 * works without JS (AppGate catches that case).
 */
export function LaunchApp({
  children = "Launch app",
  onClick,
  ...rest
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { status, address, chainId } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const router = useRouter();

  // Picker closed without connecting: forget the request.
  useEffect(() => {
    if (!connectModalOpen && status === "disconnected") wanted = false;
  }, [connectModalOpen, status]);

  useAccountEffect({
    onConnect({ isReconnected, address: a, chainId: c }) {
      if (wanted && !isReconnected) {
        wanted = false;
        router.push(destination(a, c));
      }
    },
  });

  return (
    <a
      href="/app"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (status === "connected") {
          router.push(destination(address, chainId));
          return;
        }
        if (status === "reconnecting" || !openConnectModal) {
          router.push("/app");
          return;
        }
        wanted = true;
        openConnectModal();
      }}
    >
      {children}
    </a>
  );
}
