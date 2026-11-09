import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// WalletConnect (Reown Cloud) project ID. Needed for WalletConnect QR codes
// and mobile deep links (MetaMask/Rainbow on phones). Browser-extension
// wallets work without it. Get one at https://cloud.reown.com and set
// NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local.
export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_WALLETCONNECT_PROJECT_ID";

// Every connector comes from RainbowKit so the /connect modal lists them all.
const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rabbyWallet, coinbaseWallet, walletConnectWallet],
    },
    {
      groupName: "More",
      wallets: [rainbowWallet, injectedWallet],
    },
  ],
  {
    appName: "Aera Finance",
    appDescription: "Your vault, your rules.",
    appUrl: "https://aerafinance.xyz",
    appIcon: "https://aerafinance.xyz/icon-512.png",
    projectId: walletConnectProjectId,
  },
);

// Robinhood Chain has no public testnet RPC yet, so this reuses Sepolia's
// real chain ID and endpoint, rebranded, as a stand-in. Swap in the real
// Robinhood Testnet chain ID/RPC once it's public.
export const robinhoodTestnet = {
  ...sepolia,
  name: "Robinhood Testnet",
} as const;

export const wagmiConfig = createConfig({
  connectors,
  chains: [robinhoodTestnet, mainnet],
  transports: {
    [robinhoodTestnet.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
