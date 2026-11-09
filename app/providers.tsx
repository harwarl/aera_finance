"use client";

import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme, type Theme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { robinhoodTestnet, wagmiConfig } from "@/config/wagmi";

// RainbowKit modal in Aera's tokens: one accent (#2EE6D6), Geist, near-black
// glass panels, never pure-white text.
const base = darkTheme({
  accentColor: "#2EE6D6",
  accentColorForeground: "#04070A",
  borderRadius: "large",
  overlayBlur: "small",
});
const aeraTheme: Theme = {
  ...base,
  colors: {
    ...base.colors,
    modalBackground: "#080C0F",
    modalBorder: "#1A2326",
    modalText: "#E6EEEC",
    modalTextDim: "#5B686D",
    modalTextSecondary: "#85939A",
    modalBackdrop: "rgba(2,4,7,0.7)",
    actionButtonSecondaryBackground: "rgba(255,255,255,0.05)",
    closeButton: "#85939A",
    closeButtonBackground: "rgba(255,255,255,0.05)",
    generalBorder: "#1A2326",
    generalBorderDim: "#121A1D",
    menuItemBackground: "rgba(46,230,214,0.08)",
    profileForeground: "#080C0F",
    connectButtonBackground: "#080C0F",
    connectButtonInnerBackground: "#0A1013",
    connectButtonText: "#E6EEEC",
  },
  fonts: { body: "var(--font-geist), Geist, sans-serif" },
  shadows: { ...base.shadows, dialog: "0 30px 80px rgba(0,0,0,0.6)" },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={aeraTheme} initialChain={robinhoodTestnet} modalSize="compact" appInfo={{ appName: "Aera Finance", learnMoreUrl: "/docs" }}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
