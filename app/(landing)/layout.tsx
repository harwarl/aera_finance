import type { Metadata } from "next";
import { geist } from "@/lib/aeraFont";
import "../aera-tokens.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "Aera Finance — Stocks, crypto, yield. One vault.",
  description: "Agent-managed vaults on Robinhood Chain. Stocks, crypto, yield. One vault.",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`aera ${geist.variable}`}>{children}</div>;
}
