import type { Metadata } from "next";
import { geist } from "@/lib/aeraFont";
import "../aera-tokens.css";
import "./docs.css";

export const metadata: Metadata = {
  title: { default: "Aera Docs", template: "%s · Aera Docs" },
  description: "Everything about your vault, the agent that manages it and the rules it can't break.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`aera ${geist.variable}`}>{children}</div>;
}
