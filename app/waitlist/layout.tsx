import type { Metadata } from "next";
import { geist } from "@/lib/aeraFont";
import "../aera-tokens.css";
import "../aera-pages.css";

export const metadata: Metadata = {
  title: "Aera Finance waitlist",
  description: "Aera opens in waves. Join the waitlist for early access.",
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return <div className={`aera ${geist.variable}`}>{children}</div>;
}
