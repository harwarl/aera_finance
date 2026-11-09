"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { shortAddr } from "@/lib/vaultStore";
import { sx } from "../sx";
import { MODE_DEFS, useAppState } from "./AppShell";

const A = "var(--accent)";
const PANEL = "border-radius: 22px; border: 1px solid #1A2326; background: #080C0F;";
const FONT = "var(--font-geist), Geist, sans-serif";
const AVATAR = (
  <span style={sx("width: 30px; height: 30px; flex: none; border-radius: 10px; background: color-mix(in srgb, var(--accent) 14%, transparent); display: flex; align-items: center; justify-content: center")}>
    <span className="aera-mark" aria-hidden="true" style={sx("width: 15px; height: 15px; background: var(--accent)")} />
  </span>
);
const USER_BUBBLE = "align-self: flex-end; max-width: 70%; padding: 12px 16px; border-radius: 18px 18px 4px 18px; background: rgba(255,255,255,0.07); font-size: 14px; line-height: 1.5";
const AGENT_BODY = "display: flex; flex-direction: column; gap: 10px; font-size: 14px; line-height: 1.6; color: #AEBBBA";
const CAN = (ok: boolean, t: string) => (
  <span key={t} style={sx("display: flex; gap: 8px; font-size: 13px; color: #AEBBBA")}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ok ? "#2EE6D6" : "#FF7A88"} strokeWidth="2.4" aria-hidden="true" style={sx("flex: none; margin-top: 3px")}>
      <path d={ok ? "M5 12l4 4 10-10" : "M7 7l10 10M17 7L7 17"} />
    </svg>
    {ok ? t : <>{t}<span className="sr-only"> (not allowed)</span></>}
  </span>
);

/* ---------------- AGENT ---------------- */
export function Agent() {
  const { mode } = useAppState();
  const [label, hint] = MODE_DEFS[mode];
  return (
    <div className="ax-grid2 ax-agent" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; height: calc(100vh - 68px - 56px); min-height: 560px")}>
      <div style={sx(PANEL + "display: flex; flex-direction: column; overflow: hidden")}>
        <div className="ax-scroll" role="log" aria-label="Conversation with the agent" style={sx("flex: 1; min-height: 0; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 18px")}>
          <div style={sx(USER_BUBBLE)}>Why is TSLA out of band?</div>
          <div style={sx("display: flex; gap: 12px; max-width: 82%")}>
            {AVATAR}
            <div style={sx(AGENT_BODY)}>
              <span>TSLA gained more than your other assets this week, so its share grew from 25% to 31%. Your band is ±3%, so anything above 28% triggers a rebalance.</span>
              <div style={sx("position: relative; height: 110px; border-radius: 14px; border: 1px solid #1A2326; background: #05090C; overflow: hidden")}>
                <svg viewBox="0 0 400 110" preserveAspectRatio="none" style={sx("position: absolute; inset: 0; width: 100%; height: 100%")} aria-hidden="true">
                  <rect x="0" y="40" width="400" height="34" fill="#2EE6D6" fillOpacity="0.07" />
                  <line x1="0" y1="57" x2="400" y2="57" stroke="#2EE6D6" strokeOpacity="0.45" strokeDasharray="4 5" style={{ animation: "ax-flow 1.2s linear infinite" }} />
                  <path d="M0 58 C60 54 100 62 160 52 S240 40 290 30 S350 20 400 18" fill="none" stroke="#FF5A6A" strokeWidth="2.5" />
                  <circle cx="400" cy="18" r="4" fill="#FF5A6A" />
                </svg>
                <span style={sx("position: absolute; left: 10px; top: 8px; font-size: 11px; color: #5B686D")}>TSLA weight · 7 days</span>
              </div>
            </div>
          </div>
          <div style={sx(USER_BUBBLE)}>Fix it, and move any spare cash into yield.</div>
          <div style={sx("display: flex; gap: 12px; max-width: 82%")}>
            {AVATAR}
            <div style={sx("flex: 1; " + AGENT_BODY)}>
              <span>Done. I prepared proposal #014. It passes every rule in your vault. Since you&apos;re on Approve, it waits for your signature.</span>
              <div style={sx("border-radius: 16px; border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); background: color-mix(in srgb, var(--accent) 6%, transparent); padding: 14px 16px; display: flex; align-items: center; gap: 14px")}>
                <span style={sx("flex: 1; display: flex; flex-direction: column; gap: 4px")}>
                  <b style={sx("color: #E6EEEC; font-weight: 600")}>#014 · TSLA 31% → 25%</b>
                  <span style={sx("font-size: 12px; color: #85939A")}>4 trades · 4 of 4 rules pass · idle USDG routed after</span>
                </span>
                <Link href="/app/proposals" style={sx("height: 36px; padding: 0 16px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 13px; font-weight: 600; text-decoration: none")}>Review</Link>
              </div>
            </div>
          </div>
          <div style={sx("display: flex; gap: 12px; align-items: center")} aria-label="Agent is typing">
            {AVATAR}
            <span style={sx("display: flex; gap: 4px")}>
              {[0, 0.15, 0.3].map((d) => <span key={d} style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #85939A; animation: ax-dot 1.2s ease-in-out ${d}s infinite`)} />)}
            </span>
          </div>
        </div>
        <div style={sx("padding: 14px 18px 18px; border-top: 1px solid #121A1D; display: flex; flex-direction: column; gap: 10px")}>
          <div style={sx("display: flex; gap: 8px; flex-wrap: wrap")}>
            {["What did you do this week?", "Show my yield", "Tighten my band"].map((s) => (
              <button key={s} type="button" style={sx(`font: 400 12px ${FONT}; padding: 6px 12px; border-radius: 999px; border: 1px solid #1A2326; background: rgba(0,0,0,0); color: #AEBBBA; cursor: pointer`)}>{s}</button>
            ))}
          </div>
          <label style={sx("display: flex; align-items: center; gap: 10px; padding: 6px 6px 6px 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.14); background: #05090C")}>
            <input type="text" placeholder="Ask Aera about your vault" aria-label="Message the agent" style={sx(`flex: 1; min-width: 0; border: 0; background: rgba(0,0,0,0); color: #E6EEEC; font: 400 14px ${FONT}; outline: none`)} />
            <button type="button" aria-label="Send" style={sx("width: 38px; height: 38px; border: 0; border-radius: 50%; background: var(--accent); color: #04070A; display: inline-flex; align-items: center; justify-content: center; cursor: pointer")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </label>
        </div>
      </div>
      <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
        <div style={sx(PANEL + "padding: 20px; display: flex; flex-direction: column; gap: 12px")}>
          <b style={sx("font-size: 14px; font-weight: 600")}>What the agent can do</b>
          {CAN(true, "Read your vault and prices")}
          {CAN(true, "Prepare rebalance proposals")}
          {CAN(true, "Route idle USDG to yield")}
          {CAN(false, "Withdraw or change rules")}
        </div>
        <div style={sx(PANEL + "padding: 20px; display: flex; flex-direction: column; gap: 10px")}>
          <b style={sx("font-size: 14px; font-weight: 600")}>Mode</b>
          <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px")}><span style={sx("width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent)")} />{label}</span>
          <span style={sx("font-size: 12px; line-height: 1.5; color: #5B686D")}>{hint}</span>
          <Link href="/app/rules" style={sx("font-size: 13px; text-decoration: none")}>Change in Rules →</Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ACTIVITY ---------------- */
const IC = {
  r: [A, "M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"],
  y: ["#B4A6FF", "M4 17l6-6 4 4 6-8M14 7h6v6"],
  h: ["#FFBA5C", "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],
  x: ["#FF7A88", "M7 7l10 10M17 7L7 17"],
  d: ["#E6EEEC", "M12 4v12M7 11l5 5 5-5M5 20h14"],
  w: ["#6FB8FF", "M12 20V8M7 13l5-5 5 5M5 4h14"],
} as const;
type Cat = "r" | "y" | "g" | "d";
const LOG: [string, [keyof typeof IC, Cat, string, string, string, string][]][] = [
  ["Today", [["x", "r", "TSLA left its band · 31%", "Drift monitor · 6 min ago", "Flagged", "—"], ["r", "r", "Proposal #014 prepared", "Agent · waiting for you", "4 trades", "—"], ["y", "y", "Idle USDG routed to yield", "Automatic · 09:12", "$412.00", "0x3b…e1"]]],
  ["Yesterday", [["r", "r", "Rebalanced · NVDA 29 → 25", "#013 · approved by you", "$498.20", "0x91…4e"], ["y", "y", "USDG pulled from yield", "For #013 · 14:02", "$180.00", "0x5c…77"], ["h", "g", "Rebalance held · cooldown", "#011 · 1h 40m left at the time", "Held", "—"]]],
  ["Nov 6", [["x", "g", "Rejected · token not on your list", "#010 · reverted on-chain", "Rejected", "0xd4…18"], ["d", "d", "Deposit · 1.2 WETH", "From 0x4f…9a21", "+$3,744.00", "0x22…c0"], ["w", "d", "Withdraw · 200 USDG", "To 0x4f…9a21", "−$200.00", "0x8e…41"]]],
];
const FILTERS: ["all" | Cat, string][] = [["all", "All"], ["r", "Rebalances"], ["y", "Yield"], ["g", "Guardrails"], ["d", "Deposits & withdrawals"]];
const amtColor = (amt: string) => (amt.startsWith("+") ? A : amt === "Rejected" ? "#FF7A88" : amt === "Held" || amt === "Flagged" ? "#FFBA5C" : "#E6EEEC");

function exportCsv() {
  const rows = [["day", "title", "detail", "amount", "tx"], ...LOG.flatMap(([day, items]) => items.map(([, , t, m, amt, tx]) => [day, t, m, amt, tx]))];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "aera-activity-sample.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function Activity() {
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const days = LOG.map(([day, items]) => ({ day, items: items.filter(([, cat]) => filter === "all" || cat === filter) })).filter((d) => d.items.length);
  return (
    <div className="ax-grid2" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; align-items: start")}>
      <div style={sx(PANEL + "padding: 20px 24px; display: flex; flex-direction: column; gap: 14px")}>
        <div role="group" aria-label="Filter activity" style={sx("display: flex; align-items: center; gap: 8px; flex-wrap: wrap")}>
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={id === filter}
              onClick={() => setFilter(id)}
              style={sx(`height: 34px; padding: 0 14px; border-radius: 999px; font: 500 13px ${FONT}; cursor: pointer; border: 1px solid ` + (id === filter ? "transparent; background: #FFFFFF; color: #04070A" : "#1A2326; background: rgba(0,0,0,0); color: #AEBBBA"))}
            >
              {label}
            </button>
          ))}
          <button type="button" onClick={exportCsv} style={sx(`margin-left: auto; height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid #1A2326; background: rgba(0,0,0,0); color: #AEBBBA; font: 500 13px ${FONT}; display: inline-flex; align-items: center; gap: 8px; cursor: pointer`)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>Export CSV
          </button>
        </div>
        {days.map((d) => (
          <div key={d.day} style={sx("display: flex; flex-direction: column")}>
            <span style={sx("padding: 12px 0 6px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #5B686D")}>{d.day}</span>
            {d.items.map(([k, , t, m, amt, tx]) => (
              <div key={t} className="ax-row ax-logrow" style={sx("display: grid; grid-template-columns: 36px minmax(0, 1fr) 140px 110px; gap: 14px; align-items: center; padding: 12px 6px; border-top: 1px solid #121A1D; border-radius: 10px")}>
                <span style={sx(`width: 34px; height: 34px; border-radius: 11px; display: flex; align-items: center; justify-content: center; color: ${IC[k][0]}; background: color-mix(in srgb, ${IC[k][0]} 12%, transparent)`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={IC[k][1]} /></svg>
                </span>
                <span style={sx("display: flex; flex-direction: column; gap: 2px; min-width: 0")}><b style={sx("font-size: 14px; font-weight: 500")}>{t}</b><span style={sx("font-size: 12px; color: #5B686D")}>{m}</span></span>
                <span style={sx(`font-size: 14px; text-align: right; color: ${amtColor(amt)}`)}>{amt}</span>
                <span className="ax-tx" style={sx("font-size: 12px; text-align: right; font-family: ui-monospace, Menlo, monospace; color: #5B686D")}>{tx}</span>
              </div>
            ))}
          </div>
        ))}
        {days.length === 0 && <span style={sx("padding: 30px 0; text-align: center; font-size: 14px; color: #5B686D")}>Nothing of this type yet.</span>}
      </div>
      <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
        <div style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 14px")}>
          <b style={sx("font-size: 14px; font-weight: 600")}>This month</b>
          <div style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px")}>
            {([["6", A, "Rebalances"], ["$41.20", "#B4A6FF", "Yield earned"], ["1", "#FFBA5C", "Held by cooldown"], ["1", "#FF7A88", "Rejected by rules"]] as const).map(([n, c, l]) => (
              <span key={l} style={sx("display: flex; flex-direction: column; gap: 2px")}>
                <span style={sx(`font-size: 26px; font-weight: 500; letter-spacing: -0.03em; color: ${c}`)}>{n}</span>
                <span style={sx("font-size: 12px; color: #85939A")}>{l}</span>
              </span>
            ))}
          </div>
          <span style={sx("font-size: 11px; color: #5B686D")}>Sample figures</span>
        </div>
        <div style={sx(PANEL + "padding: 20px 22px; display: flex; flex-direction: column; gap: 10px")}>
          <b style={sx("font-size: 14px; font-weight: 600")}>Everything is on-chain</b>
          <span style={sx("font-size: 13px; line-height: 1.55; color: #85939A")}>Each row links to its transaction on the Robinhood Chain explorer, so you can check every move yourself.</span>
          <a href="#" style={sx("font-size: 13px; text-decoration: none")}>Open vault on explorer →</a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */
type Sec = "all" | "wallet" | "notif" | "agent" | "display" | "danger";
const SECS: [Sec, string][] = [["all", "All settings"], ["wallet", "Wallet & vault"], ["notif", "Notifications"], ["agent", "Agent access"], ["display", "Display"], ["danger", "Danger zone"]];
const NOTIFS: [string, string, string][] = [
  ["proposal", "Proposal waiting", "When the agent needs your signature"],
  ["drift", "Drift alerts", "When an asset leaves its band"],
  ["reject", "Rejected or held trades", "When a guardrail stops something"],
  ["yield", "Yield moves", "Each time idle cash is routed or pulled"],
  ["weekly", "Weekly summary", "A short recap every Monday"],
];
const S_ROW = "display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 0; border-top: 1px solid #121A1D";
const S_LAST = "display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 0 0; border-top: 1px solid #121A1D";
const SMALL_BTN = `height: 32px; padding: 0 12px; border-radius: 999px; border: 1px solid #1A2326; background: rgba(0,0,0,0); color: #AEBBBA; font: 500 12px ${FONT}; cursor: pointer`;
const DANGER_BTN = `height: 36px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(255,122,136,0.5); background: rgba(255,90,106,0.08); color: #FF7A88; font: 500 13px ${FONT}; cursor: pointer; white-space: nowrap`;
const SOFT = "font-size: 13px; padding: 7px 12px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent)";

function Label({ t, d }: { t: string; d?: string }) {
  return (
    <span style={sx("display: flex; flex-direction: column; gap: 2px")}>
      <b style={sx("font-size: 14px; font-weight: 500")}>{t}</b>
      {d && <span style={sx("font-size: 12px; color: #5B686D")}>{d}</span>}
    </span>
  );
}
function Seg({ opts, label }: { opts: [string, string]; label: string }) {
  const [v, setV] = useState(opts[0]);
  return (
    <span role="group" aria-label={label} style={sx("display: flex; padding: 3px; border-radius: 999px; border: 1px solid #1A2326; font-size: 12px")}>
      {opts.map((o) => (
        <button key={o} type="button" aria-pressed={v === o} onClick={() => setV(o)} style={sx(`padding: 6px 12px; border: 0; border-radius: 999px; font: 400 12px ${FONT}; cursor: pointer; ` + (v === o ? "background: rgba(255,255,255,0.08); color: #E6EEEC" : "background: rgba(0,0,0,0); color: #85939A"))}>{o}</button>
      ))}
    </span>
  );
}

export function Settings() {
  const { mode } = useAppState();
  const [label, hint] = MODE_DEFS[mode];
  const [sec, setSec] = useState<Sec>("all");
  const [notif, setNotif] = useState<Record<string, boolean>>({ proposal: true, drift: true, reject: true, weekly: false, yield: false });
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const show = (s: Sec) => sec === "all" || sec === s;

  return (
    <div className="ax-settings" style={sx("display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 24px; align-items: start")}>
      <nav aria-label="Settings sections" className="ax-setnav" style={sx("display: flex; flex-direction: column; gap: 2px; position: sticky; top: 0")}>
        {SECS.map(([id, l]) => (
          <button
            key={id}
            type="button"
            className="ax-nav"
            aria-pressed={id === sec}
            onClick={() => setSec(id)}
            style={sx(`display: block; text-align: left; border: 0; cursor: pointer; padding: 9px 12px; border-radius: 10px; font: 400 14px ${FONT}; white-space: nowrap; color: ` + (id === sec ? "#E6EEEC" : "#85939A") + "; background: " + (id === sec ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
          >
            {l}
          </button>
        ))}
      </nav>
      <div style={sx("display: flex; flex-direction: column; gap: 18px; min-width: 0")}>
        {show("wallet") && (
          <section style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column")}>
            <h2 style={sx("margin: 0; font-size: 16px; font-weight: 600; padding-bottom: 12px")}>Wallet and vault</h2>
            <div style={sx(S_ROW)}><Label t="Connected wallet" d="Owner of this vault" /><span style={sx("display: flex; align-items: center; gap: 10px")}><code style={sx("font-family: ui-monospace, Menlo, monospace; font-size: 13px; color: #AEBBBA")}>{shortAddr(address)}</code><button type="button" onClick={() => disconnect()} style={sx(SMALL_BTN)}>Disconnect</button></span></div>
            <div style={sx(S_ROW)}><Label t="Vault contract" d="Deployed for you by the Aera factory" /><span style={sx("display: flex; align-items: center; gap: 10px")}><code style={sx("font-family: ui-monospace, Menlo, monospace; font-size: 13px; color: #AEBBBA")}>0x7a91…02c3</code><button type="button" onClick={() => setCopied(true)} style={sx(SMALL_BTN)}>{copied ? "Copied" : "Copy"}</button></span></div>
            <div style={sx(S_LAST)}><Label t="Network" d="Where your vault lives" /><span style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px")}><span style={sx("width: 7px; height: 7px; border-radius: 50%; background: var(--accent)")} />Robinhood Chain</span></div>
          </section>
        )}
        {show("notif") && (
          <section style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column")}>
            <h2 style={sx("margin: 0; font-size: 16px; font-weight: 600; padding-bottom: 12px")}>Notifications</h2>
            {NOTIFS.map(([id, l, d]) => {
              const on = notif[id];
              return (
                <div key={id} style={sx(S_ROW)}>
                  <Label t={l} d={d} />
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={l}
                    onClick={() => setNotif({ ...notif, [id]: !on })}
                    style={sx("position: relative; width: 44px; height: 26px; flex: none; border-radius: 999px; border: 0; cursor: pointer; transition: background .2s; background: " + (on ? "var(--accent); box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 35%, transparent)" : "#1A2326"))}
                  >
                    <span style={sx("position: absolute; top: 3px; left: " + (on ? 21 : 3) + "px; width: 20px; height: 20px; border-radius: 50%; background: " + (on ? "#04070A" : "#85939A") + "; transition: left .2s")} />
                  </button>
                </div>
              );
            })}
            <div style={sx(S_LAST + "; flex-wrap: wrap")}>
              <Label t="Send to" d="Where alerts reach you" />
              <span style={sx("display: flex; gap: 8px; flex-wrap: wrap")}><span style={sx(SOFT)}>Telegram</span><span style={sx(SOFT)}>Email</span><span style={sx("font-size: 13px; padding: 7px 12px; border-radius: 999px; border: 1px solid #1A2326; color: #85939A")}>In-app only</span></span>
            </div>
          </section>
        )}
        {show("agent") && (
          <section style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column")}>
            <h2 style={sx("margin: 0; font-size: 16px; font-weight: 600; padding-bottom: 12px")}>Agent access</h2>
            <div style={sx(S_ROW)}><Label t="Rebalance permission" d="Lets the agent call rebalance inside your rules" /><span style={sx("font-size: 12px; padding: 6px 12px; border-radius: 999px; " + (paused ? "background: rgba(255,186,92,0.12); color: #FFBA5C" : "background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent)"))}>{paused ? "Paused" : "Active"}</span></div>
            <div style={sx(S_ROW)}><Label t="Autonomy" d={hint} /><Link href="/app/rules" style={sx("font-size: 13px; text-decoration: none; white-space: nowrap")}>{label} · change →</Link></div>
            <div style={sx(S_LAST)}><Label t="Pause agent" d="Stops all proposals until you resume. Your vault keeps its rules." /><button type="button" onClick={() => setPaused(!paused)} style={sx(`height: 36px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(255,186,92,0.45); background: rgba(255,186,92,0.08); color: #FFBA5C; font: 500 13px ${FONT}; cursor: pointer`)}>{paused ? "Resume" : "Pause"}</button></div>
          </section>
        )}
        {show("display") && (
          <section style={sx(PANEL + "padding: 22px 24px; display: flex; flex-direction: column")}>
            <h2 style={sx("margin: 0; font-size: 16px; font-weight: 600; padding-bottom: 12px")}>Display</h2>
            <div style={sx(S_ROW)}><b style={sx("font-size: 14px; font-weight: 500")}>Currency</b><Seg label="Currency" opts={["USD", "ETH"]} /></div>
            <div style={sx(S_LAST)}><b style={sx("font-size: 14px; font-weight: 500")}>Weights shown as</b><Seg label="Weights shown as" opts={["Percent", "Value"]} /></div>
          </section>
        )}
        {show("danger") && (
          <section style={sx("border-radius: 22px; border: 1px solid rgba(255,122,136,0.35); background: linear-gradient(160deg, rgba(255,90,106,0.06), rgba(0,0,0,0)), #080C0F; padding: 22px 24px; display: flex; flex-direction: column")}>
            <h2 style={sx("margin: 0; font-size: 16px; font-weight: 600; padding-bottom: 12px; color: #FF7A88")}>Danger zone</h2>
            <div style={sx(S_ROW)}><Label t="Withdraw everything" d="Sells nothing. Sends every asset back to your wallet as-is." /><button type="button" style={sx(DANGER_BTN)}>Withdraw all</button></div>
            <div style={sx(S_LAST)}><Label t="Revoke agent permanently" d="The vault becomes manual only. Needs your signature." /><button type="button" style={sx(DANGER_BTN)}>Revoke</button></div>
          </section>
        )}
      </div>
    </div>
  );
}
