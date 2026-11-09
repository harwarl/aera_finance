"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sx } from "../sx";
import { MODE_DEFS, PinnedBar, useAppState, type Mode } from "./AppShell";

const A = "var(--accent)";
const PANEL = "border-radius: 22px; border: 1px solid #1A2326; background: #080C0F;";
const CHECK = (c = "#2EE6D6") => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
);

/* Sample assets: TSLA 31% vs 25% target. */
const KINDS = { s: [A, "stock token"], c: ["#6FB8FF", "crypto"], u: ["#B4A6FF", "cash · yield"] } as const;
export const ASSETS = ([["TSLA", "TS", "s", 31, 25], ["NVDA", "NV", "s", 24, 25], ["ETH", "ET", "c", 27, 30], ["USDG", "$", "u", 18, 20]] as const).map(
  ([t, ab, k, now, target]) => {
    const out = Math.abs(now - target) > 3, col = KINDS[k][0], pos = (x: number) => (x * 2).toFixed(1) + "%";
    return {
      t, ab, now, target, kind: KINDS[k][1],
      chip: "width: 30px; height: 30px; flex: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; background: color-mix(in srgb, " + col + " 18%, transparent); color: " + col,
      nowStyle: "font-size: 15px; font-weight: 600; color: " + (out ? "#FF5A6A" : "#E6EEEC"),
      band: "position: absolute; top: 5px; height: 12px; left: " + pos(target - 3) + "; width: 12%; border-radius: 6px; background: color-mix(in srgb, var(--accent) 14%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); box-sizing: border-box",
      mark: "position: absolute; top: 3px; height: 16px; width: 2px; left: " + pos(target) + "; background: var(--accent)",
      dot: "position: absolute; top: 5px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; left: " + pos(now) + "; background: " + (out ? "#FF5A6A" : "#E6EEEC") + "; box-shadow: 0 0 " + (out ? "14px #FF5A6A; animation: ax-pulse 1.4s ease-in-out infinite" : "8px rgba(230,238,236,.5)"),
      fill: "position: absolute; left: 0; top: 0; bottom: 0; border-radius: 3px; width: " + target * 2 + "%; background: " + col,
      out,
    };
  },
);

const ACT_COL = { r: A, y: "#B4A6FF", h: "#FFBA5C", x: "#FF5A6A", d: "#E6EEEC" } as const;
const ACTIVITY: [keyof typeof ACT_COL, string, string][] = [
  ["x", "TSLA left its band · 31%", "6 min ago · drift monitor"],
  ["r", "Proposal #014 prepared", "4 min ago · agent"],
  ["y", "Idle USDG routed to yield", "3h ago · $412.00"],
  ["r", "Rebalanced · NVDA 29 → 25", "Yesterday · #013 executed"],
  ["d", "Deposit · 1.2 WETH", "2 days ago · from 0x4f…9a21"],
];

/** Sample vault value, nudged every 2.2s so the cents tick (animations.md §13). */
function useLiveValue() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const v = 12480.32 + Math.sin(tick * 1.3) * 3.1 + Math.cos(tick * 0.7) * 1.7;
  const [whole, cents] = v.toFixed(2).split(".");
  return ["$" + Number(whole).toLocaleString("en-US"), "." + cents];
}

const GUARD_CHIP = "font-size: 12px; padding: 6px 11px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent)";
const SEG = "display: flex; padding: 3px; border-radius: 999px; border: 1px solid #1A2326; font-size: 12px";

/* ---------------- OVERVIEW ---------------- */
export function Overview() {
  const [main, cents] = useLiveValue();
  return (
    <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
      <div className="mo-only" style={sx("display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 16px; border: 1px solid rgba(255,122,136,0.35); background: linear-gradient(90deg, rgba(255,90,106,0.10), rgba(255,90,106,0.02))")}>
        <span style={sx("position: relative; width: 10px; height: 10px; flex: none")}>
          <span style={sx("position: absolute; inset: 0; border-radius: 50%; background: #FF5A6A")} />
          <span style={sx("position: absolute; inset: 0; border-radius: 50%; border: 2px solid #FF5A6A; animation: mo-ping 1.6s ease-out infinite")} />
        </span>
        <span style={sx("flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px")}>
          <b style={sx("font-size: 14px; font-weight: 600")}>TSLA drifted out of band.</b>
          <span style={sx("font-size: 12px; color: #AEBBBA")}>Proposal #014 is ready</span>
        </span>
        <Link href="/app/proposals" style={sx("height: 32px; padding: 0 13px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 12px; font-weight: 600; text-decoration: none")}>Review</Link>
      </div>
      <div className="ax-banner desk-only" style={sx("display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 18px; border: 1px solid rgba(255,122,136,0.35); background: linear-gradient(90deg, rgba(255,90,106,0.10), rgba(255,90,106,0.02))")}>
        <span style={sx("position: relative; width: 10px; height: 10px; flex: none")}>
          <span style={sx("position: absolute; inset: 0; border-radius: 50%; background: #FF5A6A")} />
          <span style={sx("position: absolute; inset: 0; border-radius: 50%; border: 2px solid #FF5A6A; animation: ax-ping 1.6s ease-out infinite")} />
        </span>
        <span style={sx("flex: 1; font-size: 14px; color: #AEBBBA")}><b style={sx("color: #E6EEEC; font-weight: 600")}>TSLA drifted out of band.</b> 31% vs 25% target. A rebalance is ready for your approval.</span>
        <Link href="/app/proposals" style={sx("height: 36px; padding: 0 16px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap")}>Review proposal</Link>
      </div>

      <div className="ax-grid2" style={sx("display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 18px")}>
        <div className="ax-valpanel" style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column; gap: 14px")}>
          <div style={sx("display: flex; justify-content: space-between; align-items: flex-start; gap: 12px")}>
            <div style={sx("display: flex; flex-direction: column; gap: 6px")}>
              <span style={sx("font-size: 13px; color: #85939A")}>Vault value</span>
              <span className="ax-value" style={sx("font-size: 44px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums")}>{main}<span style={{ color: "#5B686D" }}>{cents}</span></span>
              <span style={sx("font-size: 13px; color: var(--accent)")}>+1.8% · 7 days</span>
            </div>
            <div className="ax-range" style={sx(SEG)}>
              <span style={sx("padding: 6px 12px; color: #85939A")}>24h</span>
              <span style={sx("padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,0.08)")}>7d</span>
              <span style={sx("padding: 6px 12px; color: #85939A")}>30d</span>
            </div>
          </div>
          <svg viewBox="0 0 600 150" preserveAspectRatio="none" style={sx("width: 100%; height: 150px")} aria-hidden="true">
            <defs><linearGradient id="ax-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2EE6D6" stopOpacity="0.28" /><stop offset="1" stopColor="#2EE6D6" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 118 C40 112 70 120 110 104 S180 92 220 98 S290 80 330 84 S400 64 440 70 S520 46 560 50 L600 40 L600 150 L0 150 Z" fill="url(#ax-area)" />
            <path d="M0 118 C40 112 70 120 110 104 S180 92 220 98 S290 80 330 84 S400 64 440 70 S520 46 560 50 L600 40" fill="none" stroke="#2EE6D6" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 6px rgba(46,230,214,0.6))" }} />
            <circle cx="600" cy="40" r="4" fill="#2EE6D6" />
          </svg>
        </div>
        <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
          <div className="mo-only" style={sx(PANEL + "padding: 16px 18px; display: flex; align-items: center; gap: 14px")}>
            <span style={sx("display: flex; flex-direction: column; gap: 2px")}>
              <span style={sx("font-size: 12px; color: #85939A")}>Idle USDG · earning</span>
              <b style={sx("font-size: 20px; font-weight: 500; letter-spacing: -0.02em")}>$2,496.06</b>
            </span>
            <span aria-hidden="true" style={sx("margin-left: auto; display: flex; gap: 3px")}>
              {Array.from({ length: 12 }, (_, i) => <span key={i} style={sx("width: 4px; height: 18px; border-radius: 2px; background: #B4A6FF; box-shadow: 0 0 8px rgba(180,166,255,.35)")} />)}
            </span>
          </div>
          <div className="desk-only" style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 12px")}>
            <div style={sx("display: flex; justify-content: space-between; font-size: 13px; color: #85939A")}><span>Idle cash · USDG</span><span style={{ color: "#B4A6FF" }}>Earning</span></div>
            <span style={sx("font-size: 30px; font-weight: 500; letter-spacing: -0.03em")}>$2,496.06</span>
            <div style={sx("height: 10px; background: repeating-linear-gradient(90deg, #B4A6FF 0 6px, rgba(0,0,0,0) 6px 8px); box-shadow: 0 0 16px rgba(180,166,255,0.3)")} />
            <span style={sx("font-size: 12px; color: #5B686D")}>Routed to on-chain yield · [RATE] APY · pulled back for rebalances</span>
          </div>
          <div className="desk-only" style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 12px")}>
            <div style={sx("display: flex; justify-content: space-between; font-size: 13px; color: #85939A")}><span>Guardrails</span><Link href="/app/rules" style={{ textDecoration: "none" }}>Edit</Link></div>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
              {["Max trade 10%", "4 assets", "Slippage 0.5%", "Cooldown 2h"].map((c) => <span key={c} style={sx(GUARD_CHIP)}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="ax-grid2" style={sx("display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 18px")}>
        <div style={sx(PANEL + "padding: 20px 24px; display: flex; flex-direction: column; gap: 4px")}>
          <div style={sx("display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 8px")}><b style={sx("font-size: 15px; font-weight: 600")}>Allocation vs target</b><span style={sx("font-size: 12px; color: #5B686D")}>Band ±3%</span></div>
          <div className="ax-alloc ax-allochead" style={sx("display: grid; grid-template-columns: 120px 70px 70px minmax(0, 1fr); gap: 16px; padding: 6px 0; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #5B686D")}><span>Asset</span><span>Now</span><span>Target</span><span>Position in band</span></div>
          {ASSETS.map((a) => (
            <div key={a.t} className="ax-row ax-alloc" style={sx("display: grid; grid-template-columns: 120px 70px 70px minmax(0, 1fr); gap: 16px; align-items: center; padding: 12px 0; border-top: 1px solid #121A1D")}>
              <span style={sx("display: flex; align-items: center; gap: 10px")}>
                <span style={sx(a.chip)}>{a.ab}</span>
                <span style={sx("display: flex; flex-direction: column")}><b style={sx("font-size: 14px; font-weight: 600")}>{a.t}</b><span style={sx("font-size: 11px; color: #5B686D")}>{a.kind}</span></span>
              </span>
              <span style={sx(a.nowStyle)}>{a.now}%{a.out && <span className="sr-only"> (out of band)</span>}</span>
              <span style={sx("font-size: 15px; color: #85939A")}>{a.target}%</span>
              <span style={sx("position: relative; height: 22px")} aria-hidden="true">
                <span style={sx("position: absolute; left: 0; right: 0; top: 10px; height: 2px; background: #121A1D")} />
                <span style={sx(a.band)} /><span style={sx(a.mark)} /><span style={sx(a.dot)} />
              </span>
            </div>
          ))}
        </div>
        <div className="desk-only" style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 4px")}>
          <div style={sx("display: flex; justify-content: space-between; padding-bottom: 8px")}>
            <b style={sx("font-size: 15px; font-weight: 600")}>Recent activity</b>
            <span style={sx("display: flex; align-items: center; gap: 6px; font-size: 12px; color: #5B686D")}><span style={sx("width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: ax-pulse 2s ease-in-out infinite")} />Live</span>
          </div>
          {ACTIVITY.map(([k, t, m]) => (
            <div key={t} style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 11px 0; border-top: 1px solid #121A1D")}>
              <span style={sx(`width: 8px; height: 8px; flex: none; margin-top: 5px; border-radius: 50%; background: ${ACT_COL[k]}; box-shadow: 0 0 8px ${ACT_COL[k]}`)} />
              <span style={sx("flex: 1; display: flex; flex-direction: column; gap: 2px")}><span style={sx("font-size: 13px")}>{t}</span><span style={sx("font-size: 11px; color: #5B686D")}>{m}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROPOSALS ---------------- */
const TRADE_GRID = "display: grid; grid-template-columns: 80px 1fr 1fr 120px; padding: 14px 16px; font-size: 14px; border-top: 1px solid #121A1D";
const TRADES: [string, string, string, string][] = [
  ["Sell", "TSLA", "2.47 tokens", "$748.80"],
  ["Buy", "ETH", "0.12 ETH", "$374.40"],
  ["Buy", "USDG", "249.60 USDG", "$249.60"],
  ["Buy", "NVDA", "0.68 tokens", "$124.80"],
];
const RULE_CHECK = "display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--accent) 7%, transparent)";
const EARLIER: [string, string, string][] = [
  ["#013 · NVDA 29 → 25", "Executed", A],
  ["#012 · Route idle USDG", "Executed", A],
  ["#011 · Rebalance again", "Held · cooldown", "#FFBA5C"],
  ["#010 · Buy unlisted token", "Rejected", "#FF7A88"],
];
const BAR = (parts: [string, number][]) => (
  <div style={sx("display: flex; gap: 3px; height: 12px; border-radius: 6px; overflow: hidden")}>
    {parts.map(([c, f], i) => <span key={i} style={{ flex: f, background: c }} />)}
  </div>
);

export function Proposals() {
  const { approved, approve } = useAppState();
  return (
    <>
    <PinnedBar>
      {!approved ? (
        <div style={sx("display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px")}>
          <button type="button" onClick={approve} style={sx("height: 50px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 15px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Approve and sign</button>
          <button type="button" style={sx("height: 50px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.22); background: rgba(0,0,0,0.5); color: #E6EEEC; font: 500 15px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Decline</button>
        </div>
      ) : (
        <div role="status" style={sx("display: flex; align-items: center; gap: 10px; min-height: 50px; padding: 0 16px; border-radius: 14px; background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent); font-size: 13px; animation: mo-pop .6s cubic-bezier(.22,1,.36,1) both")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
          Signed and submitted · tx 0x91…4e
        </div>
      )}
    </PinnedBar>
    <div className="ax-grid2 ax-has-bar" style={sx("display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 18px; align-items: start")}>
      <div style={sx("border-radius: 24px; border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 7%, transparent), rgba(255,255,255,0.01)), #080C0F; padding: 24px 26px; display: flex; flex-direction: column; gap: 20px; animation: ax-glow 4s ease-in-out infinite")}>
        <div style={sx("display: flex; justify-content: space-between; align-items: flex-start; gap: 12px")}>
          <div style={sx("display: flex; flex-direction: column; gap: 6px")}>
            <span style={sx("font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A")}>Proposal #014 · by agent · 4 min ago</span>
            <b className="ax-ptitle" style={sx("font-size: 26px; font-weight: 600; letter-spacing: -0.03em")}>Bring TSLA back to 25%</b>
          </div>
          {approved
            ? <span style={sx("font-size: 12px; padding: 6px 12px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); white-space: nowrap")}>Executed</span>
            : <span style={sx("font-size: 12px; padding: 6px 12px; border-radius: 999px; background: rgba(255,186,92,0.12); color: #FFBA5C; white-space: nowrap")}>Waiting for you</span>}
        </div>
        <div className="ax-xscroll" style={sx("display: flex; flex-direction: column; border-radius: 16px; border: 1px solid #1A2326; overflow: hidden")}>
          <div style={sx("display: grid; grid-template-columns: 80px 1fr 1fr 120px; padding: 10px 16px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #5B686D; background: #070B0E")}><span>Side</span><span>Asset</span><span>Amount</span><span style={{ textAlign: "right" }}>Value</span></div>
          {TRADES.map(([side, asset, amt, val]) => (
            <div key={asset} style={sx(TRADE_GRID)}>
              <span style={{ color: side === "Sell" ? "#FF7A88" : A }}>{side}</span>
              <b style={sx("font-weight: 600")}>{asset}</b>
              <span style={{ color: "#AEBBBA" }}>{amt}</span>
              <span style={{ textAlign: "right" }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={sx("display: grid; grid-template-columns: 70px minmax(0, 1fr); gap: 10px 16px; align-items: center; font-size: 12px; color: #85939A")}>
          <span>Before</span>{BAR([["#FF5A6A", 31], ["color-mix(in srgb, var(--accent) 60%, #04070A)", 24], ["#6FB8FF", 27], ["#B4A6FF", 18]])}
          <span>After</span>{BAR([[A, 25], ["color-mix(in srgb, var(--accent) 60%, #04070A)", 25], ["#6FB8FF", 30], ["#B4A6FF", 20]])}
          <span />
          <span style={sx("display: flex; gap: 16px; flex-wrap: wrap")}><span>TSLA 31 → 25</span><span>NVDA 24 → 25</span><span>ETH 27 → 30</span><span>USDG 18 → 20</span></span>
        </div>
        <div style={sx("display: flex; flex-direction: column; gap: 8px")}>
          <span style={sx("font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A")}>Rule checks</span>
          <div className="ax-grid2" style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px")}>
            {["Trade size 6% · max 10%", "All assets on your list", "Est. slippage 0.3% · max 0.5%", "Cooldown clear · last 2h 14m ago"].map((c) => (
              <span key={c} style={sx(RULE_CHECK)}>{CHECK()}{c}</span>
            ))}
          </div>
        </div>
        {!approved ? (
          <div className="desk-only" style={sx("display: flex; align-items: center; gap: 10px; padding-top: 4px; flex-wrap: wrap")}>
            <button type="button" className="ax-btn-w" onClick={approve} style={sx("height: 46px; padding: 0 24px; border-radius: 999px; border: 0; background: #FFFFFF; color: #04070A; font: 600 15px var(--font-geist), Geist, sans-serif; cursor: pointer; box-shadow: 0 0 30px rgba(255,255,255,0.16)")}>Approve and sign</button>
            <button type="button" style={sx("height: 46px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.22); background: rgba(0,0,0,0.5); color: #E6EEEC; font: 500 15px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Decline</button>
            <span style={sx("margin-left: auto; font-size: 12px; color: #5B686D")}>Est. gas [GAS] · executes in one transaction</span>
          </div>
        ) : (
          <div role="status" className="desk-only" style={sx("display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-radius: 14px; background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent); font-size: 14px")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
            Signed and submitted · tx 0x91…4e · vault back on target
          </div>
        )}
      </div>
      <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
        <div style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 10px")}>
          <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: #85939A")}><span className="aera-mark" aria-hidden="true" style={sx("width: 14px; height: 14px; background: var(--accent)")} />Why the agent proposed this</span>
          <p style={sx("margin: 0; font-size: 14px; line-height: 1.6; color: #AEBBBA")}>TSLA rose faster than the rest of the vault and passed the top of its ±3% band. Selling the excess and spreading it across the underweight assets returns every weight to target in one trade.</p>
        </div>
        <div className="desk-only" style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column")}>
          <b style={sx("font-size: 15px; font-weight: 600; padding-bottom: 8px")}>Earlier proposals</b>
          {EARLIER.map(([t, s, c]) => (
            <div key={t} style={sx("display: flex; justify-content: space-between; gap: 12px; padding: 12px 0; border-top: 1px solid #121A1D; font-size: 13px")}><span>{t}</span><span style={{ color: c }}>{s}</span></div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

/* ---------------- RULES ---------------- */
const PCT_BOX = "display: flex; align-items: center; gap: 4px; padding: 0 10px; height: 34px; border-radius: 10px; border: 1px solid #1A2326; background: #05090C; font-size: 14px";
const PCT_INPUT = "width: 32px; border: 0; background: rgba(0,0,0,0); color: #E6EEEC; font: 500 14px var(--font-geist), Geist, sans-serif; text-align: right; outline: none";
const ROW = "display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid #121A1D";

function NumField({ label, value, unit, onEdit }: { label: string; value: string; unit: string; onEdit?: () => void }) {
  const [v, setV] = useState(value);
  return (
    <label style={sx(PCT_BOX)}>
      <input type="text" inputMode="decimal" value={v} onChange={(e) => { setV(e.target.value); onEdit?.(); }} aria-label={label} style={sx(PCT_INPUT)} />
      <span style={{ color: "#5B686D" }}>{unit}</span>
    </label>
  );
}

export function Rules() {
  const { mode, setMode, band, setBand } = useAppState();
  const [dirty, setDirty] = useState(false);
  const edit = () => setDirty(true);
  return (
    <div className={dirty ? "ax-has-bar" : undefined} style={sx("display: flex; flex-direction: column; gap: 18px")}>
      {dirty && (
        <PinnedBar>
          <div style={sx("display: flex; align-items: center; gap: 12px; padding: 8px 8px 8px 14px; border-radius: 16px; border: 1px solid rgba(255,186,92,0.4); background: rgba(255,186,92,0.08)")}>
            <span style={sx("flex: 1; font-size: 13px; color: #FFBA5C")}>Unsaved changes</span>
            <button type="button" onClick={() => setDirty(false)} style={sx("height: 40px; padding: 0 18px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 14px var(--font-geist), Geist, sans-serif; cursor: pointer")}>Save and sign</button>
          </div>
        </PinnedBar>
      )}
      <div style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column; gap: 14px")}>
        <div style={sx("display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap")}><b style={sx("font-size: 15px; font-weight: 600")}>Autonomy</b><span style={sx("font-size: 12px; color: #5B686D")}>How much the agent decides on its own</span></div>
        <div role="radiogroup" aria-label="Autonomy" className="ax-grid3" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px")}>
          {(Object.entries(MODE_DEFS) as [Mode, [string, string]][]).map(([id, [label, desc]]) => {
            const on = id === mode;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => { setMode(id); edit(); }}
                style={sx("display: flex; flex-direction: column; gap: 6px; padding: 16px 18px; border-radius: 16px; text-align: left; cursor: pointer; font-family: var(--font-geist), Geist, sans-serif; color: #E6EEEC; background: " + (on ? "color-mix(in srgb, var(--accent) 8%, #080C0F)" : "#05090C") + "; border: 1px solid " + (on ? "color-mix(in srgb, var(--accent) 55%, transparent); box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 14%, transparent)" : "#1A2326"))}
              >
                <b style={sx("font-size: 15px; font-weight: 600")}>{label}</b>
                <span style={sx("font-size: 13px; line-height: 1.5; color: #85939A")}>{desc}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="ax-grid2" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px")}>
        <div style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column; gap: 16px")}>
          <div style={sx("display: flex; justify-content: space-between; align-items: baseline")}><b style={sx("font-size: 15px; font-weight: 600")}>Targets</b><span style={sx("font-size: 12px; color: var(--accent)")}>Total 100%</span></div>
          {ASSETS.map((a) => (
            <div key={a.t} style={sx("display: flex; align-items: center; gap: 12px")}>
              <span style={sx(a.chip)}>{a.ab}</span>
              <b style={sx("width: 64px; font-size: 14px; font-weight: 600")}>{a.t}</b>
              <span style={sx("flex: 1; height: 6px; border-radius: 3px; background: #121A1D; position: relative")}><span style={sx(a.fill)} /></span>
              <NumField label={`${a.t} target`} value={String(a.target)} unit="%" onEdit={edit} />
            </div>
          ))}
          <div style={sx("display: flex; flex-direction: column; gap: 10px; padding-top: 6px; border-top: 1px solid #121A1D")}>
            <div style={sx("display: flex; justify-content: space-between; font-size: 14px; padding-top: 10px")}><span style={{ color: "#85939A" }}>Drift band</span><b style={sx("font-weight: 600; color: var(--accent)")}>±{band}%</b></div>
            <input type="range" min={1} max={10} value={band} onChange={(e) => { setBand(Number(e.target.value)); edit(); }} aria-label="Drift band" aria-valuetext={`plus or minus ${band} percent`} style={sx("width: 100%; accent-color: #2EE6D6")} />
            <span style={sx("font-size: 12px; color: #5B686D")}>Rebalances trigger when any asset leaves its band.</span>
          </div>
        </div>
        <div style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column; gap: 4px")}>
          <div style={sx("display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; padding-bottom: 10px")}>
            <b style={sx("font-size: 15px; font-weight: 600")}>Guardrails</b>
            <span style={sx("display: flex; align-items: center; gap: 6px; font-size: 12px; color: #85939A")}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>Stored in your vault contract</span>
          </div>
          {([["Max trade size", "Share of vault per trade", "10", "%"], ["Max slippage", "Worst price impact accepted", "0.5", "%"], ["Cooldown", "Time between rebalances", "2", "h"]] as const).map(([t, d, v, u]) => (
            <div key={t} style={sx(ROW)}>
              <span style={sx("display: flex; flex-direction: column; gap: 2px")}><b style={sx("font-size: 14px; font-weight: 500")}>{t}</b><span style={sx("font-size: 12px; color: #5B686D")}>{d}</span></span>
              <NumField label={t === "Cooldown" ? "Cooldown hours" : t} value={v} unit={u} onEdit={edit} />
            </div>
          ))}
          <div style={sx("display: flex; flex-direction: column; gap: 10px; padding: 14px 0 0; border-top: 1px solid #121A1D")}>
            <span style={sx("display: flex; flex-direction: column; gap: 2px")}><b style={sx("font-size: 14px; font-weight: 500")}>Allowed assets</b><span style={sx("font-size: 12px; color: #5B686D")}>The agent can never buy anything else</span></span>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
              {["TSLA", "NVDA", "ETH", "USDG"].map((t) => <span key={t} style={sx("font-size: 13px; padding: 7px 12px; border-radius: 999px; border: 1px solid #1A2326")}>{t}</span>)}
              <button type="button" style={sx("font: 500 13px var(--font-geist), Geist, sans-serif; padding: 7px 12px; border-radius: 999px; border: 1px dashed #263034; background: rgba(0,0,0,0); color: var(--accent); cursor: pointer")}>+ Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ax-savebar desk-only" style={sx("display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 18px; border: 1px solid #1A2326; background: #080C0F")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBA5C" strokeWidth="2" aria-hidden="true" style={{ flex: "none" }}><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17h.01" /></svg>
        <span style={sx("flex: 1; font-size: 14px; color: #AEBBBA")}>Rule changes are written to your vault and need your wallet signature. The agent can&apos;t change them.</span>
        <button type="button" onClick={() => setDirty(false)} className="ax-btn-w" style={sx("height: 42px; padding: 0 22px; border-radius: 999px; border: 0; background: #FFFFFF; color: #04070A; font: 600 14px var(--font-geist), Geist, sans-serif; cursor: pointer; white-space: nowrap")}>Save and sign</button>
      </div>
    </div>
  );
}
