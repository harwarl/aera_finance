import type { Metadata } from "next";
import { geist } from "@/lib/aeraFont";
import "../aera-tokens.css";
import "../aera-pages.css";

export const metadata: Metadata = {
  title: "Connect · Aera Finance",
  description: "Connect your wallet and create your Aera vault on Robinhood Chain.",
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <div className={`aera ${geist.variable}`}>{children}</div>;
}
