"use client";

import { useState } from "react";
import { sx } from "@/components/aera/sx";

/* ---------------- SCENE 05 · AUTONOMY ---------------- */
const DEFS = [
  { id: "suggest", label: "Suggest", tag: "Suggest only", desc: "Aera spots the drift and shows you the fix. You make the trade yourself, or ignore it." },
  { id: "approve", label: "Approve", tag: "Needs your OK", desc: "Aera prepares the trade inside your rules and waits. One tap and your wallet signs." },
  { id: "auto", label: "Autopilot", tag: "Autopilot", desc: "Aera rebalances on its own, but only within the guardrails in your vault. You get a receipt for every move." },
] as const;
type ModeId = (typeof DEFS)[number]["id"];
const SEG_BASE = "height: 40px; padding: 0 20px; border-radius: 999px; font: 500 14px var(--font-geist), Geist, sans-serif; cursor: pointer; border: 0;";

export function SceneAutonomy() {
  const [mode, setMode] = useState<ModeId>("approve");
  const current = DEFS.find((d) => d.id === mode)!;

  return (
    <section id="autonomy" className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2)")}>
      <div className="cin-frame" style={sx("position: sticky; top: 0; height: var(--f); overflow: hidden; display: flex; align-items: center")}>
        <span aria-hidden="true" className="cin-num cin-par" style={sx("position: absolute; left: 50%; top: 4%; transform: translateX(-50%); margin-left: -0.3em")}>05</span>
        <div aria-hidden="true" className="cin-bloom" style={sx("position: absolute; left: 50%; top: 30%; width: 760px; height: 560px; margin-left: -380px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), rgba(0,0,0,0) 65%); pointer-events: none")} />
        <div className="cin-cam" style={sx("position: relative; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 26px; text-align: center")}>
          <span className="cin-t1" style={sx("font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A")}>05 · Autonomy</span>
          <h2 className="cin-t2" style={sx("margin: 0; font-size: clamp(38px, 5vw, 64px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
            You choose<br /><span style={{ color: "var(--accent)" }}>how much it decides.</span>
          </h2>
          <p className="cin-t3" style={sx("margin: 0; max-width: 520px; font-size: 17px; line-height: 1.6; color: #AEBBBA")}>
            Start with suggestions only. Move to one-tap approvals. Hand over the wheel when you trust it. Change it any time.
          </p>
          <div className="ae-glass cin-p1" role="tablist" aria-label="Autonomy level" style={sx("display: inline-flex; gap: 4px; padding: 5px; border-radius: 999px")}>
            {DEFS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={d.id === mode}
                onClick={() => setMode(d.id)}
                style={sx(SEG_BASE + (d.id === mode ? " background: #FFFFFF; color: #04070A;" : " background: rgba(0,0,0,0); color: #AEBBBA;"))}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="ae-glass cin-p2" style={sx("width: 100%; max-width: 560px; border-radius: 26px; padding: 24px; display: flex; flex-direction: column; gap: 16px; text-align: left")}>
            <div style={sx("display: flex; justify-content: space-between; align-items: center")}>
              <b style={sx("font-size: 14px; font-weight: 600")}>Rebalance proposal</b>
              <span style={sx("font-size: 12px; padding: 6px 12px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent)")}>{current.tag}</span>
            </div>
            <div style={sx("display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap")}>
              <span style={sx("font-size: 30px; font-weight: 500; letter-spacing: -0.03em")}>TSLA 31% → 25%</span>
              <span style={sx("font-size: 14px; color: #85939A")}>into ETH, USDG</span>
            </div>
            <p style={sx("margin: 0; font-size: 15px; line-height: 1.55; color: #AEBBBA")}>{current.desc}</p>
            {mode === "approve" && (
              <div style={sx("display: flex; gap: 10px")}>
                <button type="button" style={sx("height: 42px; padding: 0 20px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 14px var(--font-geist), Geist, sans-serif")}>Approve and sign</button>
                <button type="button" style={sx("height: 42px; padding: 0 20px; border-radius: 999px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font: 400 14px var(--font-geist), Geist, sans-serif")}>Decline</button>
              </div>
            )}
            {mode === "auto" && (
              <div style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--accent)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
                Executed within your rules · tx 0x91…4e
              </div>
            )}
            {mode === "suggest" && (
              <div style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px; color: #85939A")}>
                <span style={sx("width: 7px; height: 7px; border-radius: 50%; background: #85939A; animation: ae-pulse 2s ease-in-out infinite")} />
                Shown to you. Nothing moves.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const QA: [string, string][] = [
  ["What is Aera Finance?", "A portfolio manager on Robinhood Chain. You get your own vault for tokenized stocks, crypto and cash, set target weights and rules, and an agent keeps it on target."],
  ["Who holds my funds?", "You do. Every user gets their own vault contract. Aera never pools deposits, and there is no central account holding user money."],
  ["What can the agent actually do?", "Only rebalance inside the rules stored in your vault: allowed assets, max trade size, slippage cap and cooldown. Anything outside them is rejected on-chain."],
  ["Which assets are supported?", "Tokenized stocks and crypto on Robinhood Chain, with USDG as the cash leg. The live list is in the app."],
  ["Where does the yield come from?", "Idle USDG is routed to on-chain yield and pulled back when a rebalance needs it. The app shows where it sits and the current rate."],
  ["What are the fees?", "[FEE DETAILS]. Fees accrue on-chain inside your vault, so you can always see them."],
  ["Can I withdraw any time?", "Yes. As the vault owner you can withdraw whenever you want, whatever autonomy level you picked."],
  ["Is it audited?", "[AUDIT STATUS AND LINK]"],
];

export function Faq() {
  const [open, setOpen] = useState(1);
  return (
    <section id="faq" style={sx("position: relative; max-width: 1160px; margin: 0 auto; padding: 140px 24px 160px; display: flex; flex-wrap: wrap; gap: 48px 72px; align-items: flex-start")}>
      <div aria-hidden="true" style={sx("position: absolute; right: -10%; top: 20%; width: 640px; height: 640px; border-radius: 50%; background: radial-gradient(circle, rgba(111,184,255,0.08), rgba(0,0,0,0) 65%); pointer-events: none")} />
      <div className="ae-faqside ae-reveal" style={sx("flex: 1 1 300px; position: sticky; top: 120px; display: flex; flex-direction: column; gap: 18px")}>
        <span style={sx("font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A")}>FAQ</span>
        <h2 style={sx("margin: 0; font-size: clamp(38px, 4.6vw, 60px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
          Your questions,<br /><span style={{ color: "var(--accent)" }}>answered.</span>
        </h2>
        <p style={sx("margin: 0; max-width: 320px; font-size: 16px; line-height: 1.6; color: #AEBBBA")}>
          Still unsure about something? <a href="#" style={{ textDecoration: "none" }}>Ask us on Telegram →</a>
        </p>
      </div>
      <div style={sx("flex: 2 1 520px; display: flex; flex-direction: column; gap: 12px; position: relative")}>
        {QA.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div
              key={q}
              className="ae-glass ae-faq"
              style={sx(
                "border-radius: 22px; transition: border-color .3s, box-shadow .3s;" +
                  (isOpen
                    ? " border-color: color-mix(in srgb, var(--accent) 45%, transparent); box-shadow: 0 24px 60px rgba(0,0,0,.45), 0 0 50px color-mix(in srgb, var(--accent) 16%, transparent), inset 0 1px 0 rgba(255,255,255,.2);"
                    : ""),
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                style={sx("width: 100%; min-height: 64px; padding: 0 24px; border: 0; background: rgba(0,0,0,0); color: #E6EEEC; font: 500 17px var(--font-geist), Geist, sans-serif; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer")}
              >
                <span>{q}</span>
                <span aria-hidden="true" style={sx("font-size: 22px; font-weight: 400; color: " + (isOpen ? "var(--accent)" : "#85939A") + "; transition: transform .25s; transform: rotate(" + (isOpen ? "45deg" : "0deg") + ")")}>+</span>
              </button>
              {isOpen && (
                <p id={`faq-a-${i}`} style={sx("margin: 0; padding: 0 24px 22px; font-size: 15px; line-height: 1.65; color: #AEBBBA")}>{a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
