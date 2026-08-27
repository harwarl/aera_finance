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
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rainbowWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: "Atlas",
    projectId,
  },
);

// Robinhood Chain has no public testnet RPC yet, so this reuses Sepolia's
// real chain ID and endpoint — just rebranded — as a functional stand-in.
// Swap in the real Robinhood Testnet chain ID/RPC once it's public; keep
// the id equal to Sepolia's until then, since changing it without a
// matching RPC would break wallet connections.
export const robinhoodTestnet = {
  ...sepolia,
  name: "Robinhood Testnet",
} as const;

// Robinhood Testnet is the default network for the app; mainnet is kept
// available as an optional switch target, not the default.
export const wagmiConfig = createConfig({
  connectors,
  chains: [robinhoodTestnet, mainnet],
  transports: {
    [robinhoodTestnet.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
