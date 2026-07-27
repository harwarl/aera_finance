import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // RainbowKit's Coinbase "Smart Wallet" connector (which we don't use —
  // see config/wagmi.ts) pulls in @coinbase/cdp-sdk, which has optional
  // dynamic imports of unpublished @x402/* packages that break static
  // bundling. Marking it external skips bundling it; the code path is
  // never actually executed.
  serverExternalPackages: ["@coinbase/cdp-sdk", "@base-org/account"],
};

export default nextConfig;
