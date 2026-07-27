import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// WalletConnect (Reown Cloud) project ID — required for the WalletConnect
// connector specifically; injected wallets (MetaMask, browser extensions,
// etc.) still work without a real one. Get an ID at
// https://cloud.reown.com and set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "YOUR_WALLETCONNECT_PROJECT_ID";

// A curated wallet list rather than RainbowKit's full default set —
// the default set's Coinbase "Smart Wallet" connector currently pulls in
// @coinbase/cdp-sdk, which has optional imports for unpublished @x402/*
// packages that break the Next.js build. Drop coinbaseWallet back in once
// that upstream dependency chain is fixed.
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, walletConnectWallet, rainbowWallet, injectedWallet],
    },
  ],
  {
    appName: "Aera Finance",
    projectId,
  }
);

// Placeholder chain set — swap in Robinhood Chain here once its RPC
// details are public. Mainnet + Sepolia keep connect/sign functional today.
export const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});
