"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { shortAddr, useVault } from "@/lib/vaultStore";
import { sx } from "../sx";

/* Shared sample state for every /app screen (BUILD.md §8):
   TSLA 31% vs 25% target, proposal #014 waiting, Approve mode. */
export type Mode = "suggest" | "approve" | "auto";
export const MODE_DEFS: Record<Mode, [string, string]> = {
  suggest: ["Suggest", "Agent shows fixes. You trade yourself."],
  approve: ["Approve", "Agent prepares trades. You sign each one."],
  auto: ["Autopilot", "Agent trades on its own, inside your rules."],
};

type Ctx = {
  mode: Mode; setMode: (m: Mode) => void;
  approved: boolean; approve: () => void;
  band: number; setBand: (b: number) => void;
};
const AppState = createContext<Ctx | null>(null);
export const useAppState = () => {
  const c = useContext(AppState);
  if (!c) throw new Error("useAppState outside AppShell");
  return c;
};

const NAV: [string, string, string][] = [
  ["/app", "Overview", "M4 13h6V4H4zM14 20h6v-9h-6zM4 20h6v-3H4zM14 7h6V4h-6z"],
  ["/app/proposals", "Proposals", "M5 12l4 4 10-10"],
  ["/app/rules", "Rules", "M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"],
  ["/app/agent", "Agent", "M4 5h16v11H8l-4 4z"],
  ["/app/activity", "Activity", "M3 12h4l3-8 4 16 3-8h4"],
  ["/app/settings", "Settings", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 12h2M18 12h2M12 4v2M12 18v2"],
];
const TITLES: Record<string, string> = {
  "/app": "Overview", "/app/proposals": "Proposals", "/app/rules": "Rules & autonomy",
  "/app/agent": "Agent", "/app/activity": "Activity", "/app/settings": "Settings",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("approve");
  const [approved, setApproved] = useState(false);
  const [band, setBand] = useState(3);
  const path = usePathname();
  const { address } = useAccount();
  const vault = useVault(address);
  const title = TITLES[path] ?? "Overview";
  const [modeLabel, modeHint] = MODE_DEFS[mode];

  return (
    <AppState.Provider value={{ mode, setMode, approved, approve: () => setApproved(true), band, setBand }}>
      <div className="ax-root" style={sx("position: relative; height: 100vh; overflow: hidden; background: #04070A; color: #E6EEEC; display: flex")}>
        {/* SIDEBAR */}
        <aside className="ax-side" style={sx("width: 248px; flex: none; box-sizing: border-box; padding: 20px 14px; border-right: 1px solid #121A1D; background: #05090C; display: flex; flex-direction: column; gap: 18px")}>
          <Link href="/" style={sx("display: flex; align-items: center; gap: 10px; padding: 4px 8px; color: #E6EEEC; text-decoration: none")}>
            <span className="aera-mark" aria-hidden="true" style={sx("width: 24px; height: 24px; background: var(--accent); filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 45%, transparent))")} />
            <b style={sx("font-size: 16px; font-weight: 600; letter-spacing: -0.01em")}>Aera</b>
          </Link>
          <button type="button" className="ax-vault" style={sx("display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 14px; border: 1px solid #1A2326; background: #080C0F; color: #E6EEEC; font: 400 13px var(--font-geist), Geist, sans-serif; text-align: left; cursor: pointer")}>
            <span style={sx("width: 28px; height: 28px; border-radius: 9px; background: color-mix(in srgb, var(--accent) 14%, transparent); display: flex; align-items: center; justify-content: center")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2EE6D6" strokeWidth="2" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3" /><circle cx="12" cy="12" r="3" /></svg>
            </span>
            <span style={sx("flex: 1; display: flex; flex-direction: column")}>
              <b style={sx("font-weight: 600")}>My vault</b>
              <span style={sx("font-size: 11px; color: #5B686D")}>{vault?.vault ?? "—"}</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B686D" strokeWidth="2" aria-hidden="true"><path d="M7 10l5 5 5-5" /></svg>
          </button>
          <nav aria-label="App" className="ax-navlist" style={sx("display: flex; flex-direction: column; gap: 2px")}>
            {NAV.map(([to, label, d]) => {
              const on = to === path;
              return (
                <Link
                  key={to}
                  href={to}
                  className="ax-nav"
                  aria-current={on ? "page" : undefined}
                  style={sx("display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; font-size: 14px; text-decoration: none; transition: background .2s, color .2s; white-space: nowrap; color: " + (on ? "#E6EEEC" : "#85939A") + "; background: " + (on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "var(--accent)" : "#5B686D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
                  <span style={{ flex: 1 }}>{label}</span>
                  {to === "/app/proposals" && !approved && (
                    <span aria-label="1 waiting" style={sx("font-size: 11px; font-weight: 600; min-width: 18px; height: 18px; padding: 0 6px; box-sizing: border-box; border-radius: 999px; background: var(--accent); color: #04070A; display: inline-flex; align-items: center; justify-content: center")}>1</span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="ax-side-foot" style={sx("margin-top: auto; display: flex; flex-direction: column; gap: 10px")}>
            <div style={sx("display: flex; flex-direction: column; gap: 2px")}>
              <Link href="/docs" className="ax-nav" style={sx("display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 12px; font-size: 13px; color: #85939A; text-decoration: none")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h10l4 4v12H5z" /><path d="M9 12h6M9 16h4" /></svg>Docs
              </Link>
              <Link href="/" className="ax-nav" style={sx("display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 12px; font-size: 13px; color: #85939A; text-decoration: none")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 11l9-7 9 7v9H3z" /></svg>aerafinance.xyz
              </Link>
            </div>
            <div style={sx("padding: 14px; border-radius: 16px; border: 1px solid #1A2326; background: #080C0F; display: flex; flex-direction: column; gap: 8px")}>
              <span style={sx("font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #5B686D")}>Autonomy</span>
              <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500")}>
                <span style={sx("width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: ax-pulse 2s ease-in-out infinite")} />
                {modeLabel}
              </span>
              <span style={sx("font-size: 12px; color: #5B686D")}>{modeHint}</span>
            </div>
            <div style={sx("display: flex; align-items: center; gap: 10px; padding: 8px")}>
              <span style={sx("width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #6FB8FF)")} />
              <span style={sx("flex: 1; display: flex; flex-direction: column; font-size: 13px")}>
                <b style={sx("font-weight: 500")}>{shortAddr(address)}</b>
                <span style={sx("font-size: 11px; color: #5B686D")}>Robinhood Chain</span>
              </span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div style={sx("flex: 1; min-width: 0; display: flex; flex-direction: column")}>
          <header className="ax-top" style={sx("height: 68px; flex: none; box-sizing: border-box; padding: 0 28px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #121A1D")}>
            <h1 style={sx("margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em")}>{title}</h1>
            {/* Remove once wired to real data (BUILD.md §8). */}
            <span style={sx("font-size: 11px; padding: 4px 9px; border-radius: 999px; border: 1px solid #263034; color: #85939A; white-space: nowrap")}>Sample data</span>
            <div style={sx("margin-left: auto; display: flex; align-items: center; gap: 10px")}>
              <button type="button" aria-label="Notifications" style={sx("width: 40px; height: 40px; flex: none; border-radius: 50%; border: 1px solid #1A2326; background: rgba(0,0,0,0); color: #85939A; display: inline-flex; align-items: center; justify-content: center; position: relative; cursor: pointer")}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
                <span style={sx("position: absolute; top: 9px; right: 10px; width: 7px; height: 7px; border-radius: 50%; background: var(--accent)")} />
              </button>
              <button type="button" className="ax-hide-sm" style={sx("height: 40px; padding: 0 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.22); background: rgba(0,0,0,0.5); color: #E6EEEC; font: 500 14px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Withdraw</button>
              <button type="button" className="ax-btn-w" style={sx("height: 40px; padding: 0 20px; border-radius: 999px; border: 0; background: #FFFFFF; color: #04070A; font: 600 14px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Deposit</button>
            </div>
          </header>
          <main className="ax-scroll ax-main" style={sx("flex: 1; min-height: 0; overflow-y: auto; padding: 24px 28px 32px; box-sizing: border-box")}>
            {children}
          </main>
        </div>
      </div>
    </AppState.Provider>
  );
}
