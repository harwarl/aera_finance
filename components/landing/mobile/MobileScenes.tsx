import Link from "next/link";
import { sx } from "@/components/aera/sx";
import { LaunchApp } from "@/components/aera/LaunchApp";

/* Mobile landing scenes (design.md §10, animations.md §17). Fixed-height
   sections; each acts its idea out on a time loop instead of scroll. IDs are
   m-prefixed so they never collide with the hidden desktop composition. */

const A = "var(--accent)";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SECTION = (h: number, extra = "") => sx(`position: relative; height: ${h}px; overflow: hidden; ${extra}`);

export function Cap({ eyebrow, a, b, body, top = 64 }: { eyebrow: string; a: string; b: string; body?: string; top?: number }) {
  return (
    <div style={sx(`position: absolute; left: 20px; right: 20px; top: ${top}px; z-index: 2; display: flex; flex-direction: column; gap: 10px`)}>
      <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>{eyebrow}</span>
      <h2 style={sx("margin: 0; font-size: 36px; font-weight: 600; letter-spacing: -0.045em; line-height: 1")}>{a}<br /><span style={{ color: A }}>{b}</span></h2>
      {body && <p style={sx("margin: 0; font-size: 15px; line-height: 1.6; color: #AEBBBA")}>{body}</p>}
    </div>
  );
}

/* ---------------- 01 · VAULT (720) ---------------- */
const SEG_LEN = 2 * Math.PI * 128; // circumference at r 128
const SEG_DASH = `${((SEG_LEN / 12) * 0.92).toFixed(1)} ${(SEG_LEN - (SEG_LEN / 12) * 0.92).toFixed(1)}`;
const PILL = "position: absolute; left: 0; top: 0; transform: translate(-50%, -50%); padding: 5px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap";
const ANCHOR = "position: absolute; width: 0; height: 0; animation: mo-orbitr 26s linear infinite;";

export function MVault() {
  return (
    <section id="m-how" style={SECTION(720)}>
      <Cap eyebrow="01 · Your vault" a="Your vault." b="Nobody else's." body="One vault contract per user. No pooled funds." />
      <div aria-hidden="true" style={sx("position: absolute; left: 50%; top: 250px; width: 330px; height: 330px; margin-left: -165px")}>
        <div style={sx("position: absolute; inset: -10%; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), rgba(0,0,0,0) 62%)")} />
        <svg viewBox="0 0 330 330" width="330" height="330" style={sx("position: absolute; inset: 0; overflow: visible")}>
          <circle cx="165" cy="165" r="158" fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray="2 7" />
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i * 6 * Math.PI) / 180, l = i % 5 === 0 ? 9 : 5;
            return <line key={i} x1={165 + 108 * Math.cos(a)} y1={165 + 108 * Math.sin(a)} x2={165 + (108 - l) * Math.cos(a)} y2={165 + (108 - l) * Math.sin(a)} stroke="rgba(255,255,255,0.22)" />;
          })}
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 30 - 90 + 1.2} 165 165)`}>
              <circle
                cx="165" cy="165" r="128" fill="none" strokeWidth="24" strokeDasharray={SEG_DASH}
                style={sx(`stroke: #121A1D; transform-origin: 165px 165px; filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 45%, transparent)); animation: mo-seg 7s cubic-bezier(.22,1,.36,1) ${(i * 0.22).toFixed(2)}s infinite both`)}
              />
            </g>
          ))}
        </svg>
        <div style={sx("position: absolute; left: 67px; top: 67px; width: 196px; height: 196px; animation: mo-orbit 26s linear infinite")}>
          <span style={sx(ANCHOR + "left: 50%; top: 0")}><span className="ae-glass" style={sx(PILL)}>TSLA</span></span>
          <span style={sx(ANCHOR + "left: 100%; top: 50%")}><span className="ae-glass" style={sx(PILL)}>NVDA</span></span>
          <span style={sx(ANCHOR + "left: 50%; top: 100%")}><span className="ae-glass" style={sx(PILL + "; color: #6FB8FF")}>ETH</span></span>
          <span style={sx(ANCHOR + "left: 0; top: 50%")}><span className="ae-glass" style={sx(PILL + "; color: #B4A6FF")}>USDG</span></span>
        </div>
        <div style={sx("position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px")}>
          <span style={sx("font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #85939A")}>Owner</span>
          <span style={sx("font-size: 52px; font-weight: 500; letter-spacing: -0.06em; line-height: 1; text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 40%, transparent)")}>You</span>
          <span style={sx(`font-size: 11px; color: #5B686D; font-family: ${MONO}`)}>vault 0x7a…c3</span>
        </div>
      </div>
      <div style={sx("position: absolute; left: 20px; right: 20px; bottom: 40px; padding-top: 14px; border-top: 1px solid #1A2326; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px")}>
        {([["Pooled with others", "None"], ["Central agent keys", "None"], ["Withdraw", "Anytime"]] as const).map(([k, v]) => (
          <span key={k} style={sx("display: flex; flex-direction: column; gap: 4px")}>
            <span style={sx("font-size: 11px; color: #85939A; line-height: 1.3")}>{k}</span>
            <span style={sx("font-size: 17px; font-weight: 500; color: " + (v === "Anytime" ? A : "#E6EEEC"))}>{v}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 02 · YIELD (640) ---------------- */
const LANES = [250, 300, 350, 400, 450].map((y) => `M -10 ${y} C 120 ${y}, 200 ${(y + 400) / 2}, 282 400`);
const LABEL = "position: absolute; display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12px; white-space: nowrap";

export function MYield() {
  return (
    <section style={SECTION(640)}>
      <Cap eyebrow="02 · Yield" a="Idle cash" b="never sits idle." body="Spare USDG earns on-chain until your vault needs it." />
      <svg viewBox="0 0 390 640" preserveAspectRatio="xMidYMid slice" style={sx("position: absolute; inset: 0; width: 100%; height: 100%")} aria-hidden="true">
        <defs>
          <radialGradient id="m-pool"><stop offset="0%" stopColor="#F4F1FF" stopOpacity="0.95" /><stop offset="30%" stopColor="#B4A6FF" stopOpacity="0.8" /><stop offset="65%" stopColor="#2EE6D6" stopOpacity="0.2" /><stop offset="100%" stopColor="#2EE6D6" stopOpacity="0" /></radialGradient>
          <linearGradient id="m-grow" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#B4A6FF" /><stop offset="60%" stopColor="#2EE6D6" /><stop offset="100%" stopColor="#DFFFFB" /></linearGradient>
        </defs>
        <g fill="none" stroke="#B4A6FF" strokeOpacity="0.22" strokeWidth="1.2">{LANES.map((d) => <path key={d} d={d} />)}</g>
        <g fill="none" stroke="#C9BEFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 58">
          {LANES.map((d, i) => <path key={d} d={d} style={{ animation: `mo-dash ${(1.4 + 0.15 * i).toFixed(2)}s linear infinite` }} />)}
        </g>
        <path d="M 278 432 C 220 500, 120 540, -10 560" fill="none" stroke="#2EE6D6" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="290" cy="400" r="62" fill="url(#m-pool)" style={sx("transform-box: fill-box; transform-origin: center; animation: mo-breathe 4s ease-in-out infinite")} />
        <circle cx="290" cy="400" r="38" fill="none" stroke="#2EE6D6" strokeOpacity="0.6" strokeDasharray="3 7" />
        <path d="M 296 396 C 330 390, 350 330, 410 250" fill="none" stroke="url(#m-grow)" strokeWidth="3" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(46,230,214,0.7))" }} />
      </svg>
      <span className="ae-glass" style={sx(LABEL + "left: 20px; top: 232px; color: #C9BEFF")}><span style={sx("width: 6px; height: 6px; border-radius: 50%; background: #B4A6FF; box-shadow: 0 0 8px #B4A6FF")} />Idle USDG</span>
      <span style={sx("position: absolute; right: 20px; top: 240px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 60%, transparent)")}>Earning</span>
      <span className="ae-glass" style={sx(LABEL + "right: 20px; top: 476px; color: var(--accent)")}>On-chain yield</span>
      <span style={sx("position: absolute; left: 20px; bottom: 40px; font-size: 12px; color: #5B686D")}>Pulled back when a rebalance needs it</span>
    </section>
  );
}

/* ---------------- 03 · DRIFT (680) ---------------- */
const TSLA = "M -10 150 C 40 146, 80 156, 120 148 S 170 140, 196 128 C 214 110, 228 72, 244 66 C 256 64, 268 90, 282 150 C 320 154, 360 148, 400 150";

export function MDrift() {
  const tag = "position: absolute; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 11px; border-radius: 999px; font-size: 12px; white-space: nowrap";
  return (
    <section style={SECTION(680)}>
      <Cap eyebrow="03 · Drift" a="Drift gets caught." b="Then fixed." body="Slip out of your band and Aera pulls it back." />
      <div className="ae-glass" style={sx("position: absolute; right: 20px; top: 232px; width: 132px; height: 62px; box-sizing: border-box; border-radius: 16px; padding: 9px 14px; display: flex; flex-direction: column; justify-content: center; gap: 2px; z-index: 2")}>
        <span style={sx("font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A")}>TSLA weight</span>
        <span style={sx("position: relative; height: 26px; font-size: 26px; font-weight: 500; letter-spacing: -0.04em; line-height: 1")}>
          <span style={sx("position: absolute; left: 0; top: 0; animation: mo-swap0 6s linear infinite")}>25%</span>
          <span style={sx("position: absolute; left: 0; top: 0; color: #FF5A6A; opacity: 0; animation: mo-swapa 6s linear infinite")}>31%</span>
          <span style={sx("position: absolute; left: 0; top: 0; color: var(--accent); opacity: 0; animation: mo-swapb 6s linear infinite")}>25%</span>
        </span>
      </div>
      <div style={sx("position: absolute; left: 0; right: 0; top: 300px; height: 300px")}>
        <svg viewBox="0 0 390 300" preserveAspectRatio="none" style={sx("position: absolute; inset: 0; width: 100%; height: 100%")} aria-hidden="true">
          <defs>
            <linearGradient id="m-drift" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="390" y2="0">
              <stop offset="0" stopColor="#2EE6D6" /><stop offset="0.5" stopColor="#2EE6D6" /><stop offset="0.54" stopColor="#FF5A6A" />
              <stop offset="0.7" stopColor="#FF5A6A" /><stop offset="0.74" stopColor="#2EE6D6" /><stop offset="1" stopColor="#2EE6D6" />
            </linearGradient>
          </defs>
          <rect x="0" y="128" width="390" height="44" fill="#2EE6D6" fillOpacity="0.07" />
          <line x1="0" y1="128" x2="390" y2="128" stroke="#2EE6D6" strokeOpacity="0.18" />
          <line x1="0" y1="172" x2="390" y2="172" stroke="#2EE6D6" strokeOpacity="0.18" />
          <line x1="0" y1="150" x2="390" y2="150" stroke="#2EE6D6" strokeOpacity="0.4" strokeDasharray="4 6" style={{ animation: "ae-flow 1.2s linear infinite" }} />
          <g fill="none" stroke="#85939A" strokeOpacity="0.3" strokeWidth="1.2">
            <path d="M -10 140 C 80 136, 160 146, 240 140 S 340 136, 400 141" />
            <path d="M -10 162 C 90 166, 170 158, 250 163 S 350 166, 400 161" />
            <path d="M -10 154 C 70 150, 150 158, 230 153 S 330 150, 400 155" />
          </g>
          <path d={TSLA} fill="none" stroke="url(#m-drift)" strokeWidth="3" strokeLinecap="round" strokeDasharray="900" style={sx("filter: drop-shadow(0 0 7px rgba(46,230,214,0.5)); animation: mo-draw 6s cubic-bezier(.4,0,.2,1) infinite")} />
        </svg>
        <span style={sx("position: absolute; left: 20px; top: 100px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Target band ±3%</span>
        <span className="ae-glass" style={sx(tag + "; left: 138px; top: 22px; color: #FF7A88; border-color: rgba(255,122,136,0.45); opacity: 0; animation: mo-fadeearly 6s linear infinite")}>Out of band · 31%</span>
        <span className="ae-glass" style={sx(tag + "; right: 20px; top: 190px; color: var(--accent); border-color: color-mix(in srgb, var(--accent) 45%, transparent); opacity: 0; animation: mo-fadein 6s linear infinite")}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>Rebalanced · 25%
        </span>
      </div>
      <span style={sx("position: absolute; left: 20px; bottom: 36px; font-size: 12px; color: #5B686D")}>Sample vault</span>
    </section>
  );
}

/* ---------------- 04 · GUARDRAILS (700) ---------------- */
const GUARD: [string, "rej" | "hold" | "pass", string, string][] = [
  ["Sell 40% of vault", "rej", "Rejected · over the 10% max trade", "#FF7A88"],
  ["Buy an unlisted token", "rej", "Rejected · not on your asset list", "#FF7A88"],
  ["Rebalance again", "hold", "Held · cooldown, 2h left", "#FFBA5C"],
  ["TSLA 31% → 25%", "pass", "Passed · within every rule", "#2EE6D6"],
];
const MOVE = { rej: "mo-rej", hold: "mo-hold", pass: "mo-pass" };
const COL = { rej: "mo-colr", hold: "mo-cola", pass: "mo-colp" };
const WALL = "70.25%"; // x 274 at the 390 reference

export function MGuardrails() {
  return (
    <section style={SECTION(700)}>
      <Cap eyebrow="04 · Guardrails" a="Rules the agent" b="can't break." body="Enforced by your vault contract, not by an app." />
      <div style={sx("position: absolute; left: 0; right: 0; top: 270px; height: 380px")}>
        <div aria-hidden="true" style={sx(`position: absolute; top: -10px; bottom: -10px; left: calc(${WALL} - 90px); width: 180px; background: radial-gradient(50% 60% at 50% 50%, color-mix(in srgb, var(--accent) 12%, transparent), rgba(0,0,0,0) 70%), repeating-linear-gradient(60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 18px), repeating-linear-gradient(-60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 18px); -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0)); mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0))`)} />
        <div aria-hidden="true" style={sx(`position: absolute; left: ${WALL}; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: linear-gradient(180deg, rgba(0,0,0,0), #DFFFFB 14%, var(--accent) 50%, #DFFFFB 86%, rgba(0,0,0,0)); box-shadow: 0 0 18px var(--accent), 0 0 50px color-mix(in srgb, var(--accent) 45%, transparent); overflow: hidden`)}>
          <span style={sx("position: absolute; left: 0; width: 2px; height: 100px; background: linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0)); animation: mo-shimmer 2.6s linear infinite")} />
        </div>
        <span aria-hidden="true" style={sx(`position: absolute; left: ${WALL}; top: -26px; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); white-space: nowrap`)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Your vault&apos;s rules
        </span>
        {GUARD.map(([trade, kind, result, col], i) => {
          const top = 20 + i * 86, delay = `${(i * 0.5).toFixed(1)}s`;
          return (
            <div key={trade} style={{ display: "contents" }}>
              {kind === "rej" && <span aria-hidden="true" style={sx(`position: absolute; left: ${WALL}; top: ${top + 17}px; width: 60px; height: 60px; margin: -30px 0 0 -30px; border-radius: 50%; border: 2px solid #FF5A6A; box-shadow: 0 0 18px #FF5A6A; opacity: 0; animation: mo-ripple 6s linear ${delay} infinite`)} />}
              <div style={sx(`position: absolute; right: calc(100% - ${WALL} + 2px); top: ${top}px; transform-origin: right center; animation: ${MOVE[kind]} 6s cubic-bezier(.4,0,.2,1) ${delay} infinite both`)}>
                <span style={sx(`display: inline-flex; align-items: center; height: 34px; padding: 0 13px; border-radius: 999px; font-size: 12px; font-weight: 500; white-space: nowrap; color: #E6EEEC; background: linear-gradient(160deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); animation: ${COL[kind]} 6s linear ${delay} infinite both`)}>{trade}</span>
              </div>
              <span style={sx(`position: absolute; left: 20px; top: ${top + 44}px; font-size: 11px; letter-spacing: 0.02em; white-space: nowrap; color: ${col}; opacity: 0; animation: mo-tag 6s linear ${delay} infinite both`)}>{result}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- 06 · AGENT (640) ---------------- */
const OK_CHIP = "font-size: 11px; padding: 4px 9px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent)";

export function MAgent() {
  return (
    <section id="m-agent" style={SECTION(640)}>
      <Cap eyebrow="06 · Agent" a="Ask in" b="plain words." body="Tell the Aera agent what you want. It reads your vault, checks your rules and prepares the rebalance. Your wallet signs." />
      <div aria-hidden="true" style={sx("position: absolute; left: 50%; top: 300px; width: 280px; height: 280px; margin-left: -140px; opacity: 0.3; background: radial-gradient(circle at 35% 35%, var(--accent), #6FB8FF 45%, #B4A6FF 75%, rgba(0,0,0,0)); animation: mo-morph 9s ease-in-out infinite")} />
      <div style={sx("position: absolute; left: 20px; right: 20px; top: 330px; display: flex; flex-direction: column; gap: 12px")}>
        <div className="ae-glass" style={sx("height: 56px; box-sizing: border-box; border-radius: 999px; padding: 0 8px 0 18px; display: flex; align-items: center; gap: 10px")}>
          <span style={sx("flex: 1; min-width: 0; font-size: 14px; display: flex; align-items: center")}>
            <span style={sx("display: block; overflow: hidden; white-space: nowrap; animation: mo-type 7s steps(36) infinite")}>Move 10% from NVDA into USDG yield.</span>
            <span aria-hidden="true" style={sx("width: 2px; height: 16px; flex: none; margin-left: 2px; background: var(--accent); animation: ae-caret 1s steps(1) infinite")} />
          </span>
          <span aria-hidden="true" style={sx("width: 40px; height: 40px; flex: none; border-radius: 50%; background: var(--accent); color: #04070A; display: inline-flex; align-items: center; justify-content: center")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
        <div className="ae-glass" style={sx("border-radius: 20px; padding: 14px 16px; display: flex; flex-direction: column; gap: 9px; animation: mo-reply 7s cubic-bezier(.22,1,.36,1) infinite")}>
          <span style={sx("display: flex; align-items: center; gap: 7px; font-size: 11px; color: #85939A")}><span className="aera-mark" aria-hidden="true" style={sx("width: 18px; height: 18px; background: var(--accent)")} />Aera agent</span>
          <span style={sx("font-size: 14px; line-height: 1.5")}>Prepared a rebalance: NVDA 25% → 15%, USDG 20% → 30%, idle USDG routed to yield. Within your rules.</span>
          <div style={sx("display: flex; gap: 6px; flex-wrap: wrap")}>
            <span style={sx(OK_CHIP)}>Trade size OK</span>
            <span style={sx(OK_CHIP)}>Slippage OK</span>
            <span style={sx("font-size: 11px; padding: 4px 9px; border-radius: 999px; background: rgba(255,255,255,0.06); color: #AEBBBA")}>Waiting for your signature</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECURITY (800) ---------------- */
const RULES: [string, string][] = [["Max trade size", "10% of vault"], ["Allowed assets", "TSLA, NVDA, ETH, USDG"], ["Max slippage", "0.5%"], ["Cooldown", "2 hours"], ["Withdraw", "You, any time"]];
const CODE = ["require(size <= nav * maxTradeBps / 1e4);", "require(allowlist[asset]);", "require(slippage <= maxSlippageBps);", "require(now >= lastMove + cooldown);", "withdraw() → onlyOwner, any time"];
const GUARANTEES: [string, string, string | null][] = [
  ["Non-custodial", "Funds stay in a vault only you own.", null],
  ["Guardrails on-chain", "Enforced by the contract, not a server.", null],
  ["Robinhood Chain", "Tokenized stocks and crypto on one L2.", null],
  ["Audit", "[AUDIT REPORT LINK] →", "#"],
];

export function MSecurity() {
  return (
    <section id="m-security" style={SECTION(800, "background-image: linear-gradient(rgba(46,230,214,0.035) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(46,230,214,0.035) 1px, rgba(0,0,0,0) 1px); background-size: 40px 40px")}>
      <Cap eyebrow="Security" a="Look inside." b="Every rule is code." />
      <div style={sx("position: absolute; left: 50%; top: 200px; width: 350px; max-width: calc(100% - 40px); height: 310px; transform: translateX(-50%)")}>
        <div className="ae-glass" style={sx("position: absolute; inset: 0; border-radius: 22px; padding: 16px 18px; box-sizing: border-box")}>
          <div style={sx("display: flex; justify-content: space-between; font-size: 11px; color: #85939A; height: 28px")}><span>Your vault · rules</span><span style={{ color: A }}>Locked in contract</span></div>
          {RULES.map(([k, v], i) => (
            <div key={k} style={sx("height: 50px; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px" + (i < 4 ? "; border-bottom: 1px solid rgba(255,255,255,0.07)" : ""))}>
              <span style={{ color: "#85939A" }}>{k}</span><span style={{ color: i === 4 ? A : "#E6EEEC", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <div aria-hidden="true" style={sx(`position: absolute; inset: 0; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); background: #04090B; box-shadow: inset 0 0 60px color-mix(in srgb, var(--accent) 10%, transparent); padding: 16px 18px; box-sizing: border-box; font-family: ${MONO}; color: var(--accent); text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 55%, transparent); animation: mo-reveal 7s cubic-bezier(.65,0,.35,1) infinite`)}>
          <div style={sx("display: flex; justify-content: space-between; font-size: 10px; opacity: .7; height: 28px")}><span>AeraVault.sol · guardrails</span><span>illustrative</span></div>
          {CODE.map((c) => <div key={c} style={sx("height: 50px; display: flex; align-items: center; font-size: 10.5px; white-space: nowrap")}>{c}</div>)}
        </div>
        <div aria-hidden="true" style={sx("position: absolute; left: -14px; right: -14px; top: 0; height: 0; pointer-events: none; animation: mo-scan 7s cubic-bezier(.65,0,.35,1) infinite")}>
          <div style={sx("position: absolute; left: 0; right: 0; top: -1px; height: 2px; background: linear-gradient(90deg, rgba(0,0,0,0), #DFFFFB 20%, #DFFFFB 80%, rgba(0,0,0,0)); box-shadow: 0 0 14px var(--accent), 0 0 36px var(--accent)")} />
        </div>
      </div>
      <div style={sx("position: absolute; left: 20px; right: 20px; top: 548px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 16px")}>
        {GUARANTEES.map(([t, d, href]) => (
          <div key={t} style={sx("padding-top: 12px; border-top: 1px solid #1A2326; display: flex; flex-direction: column; gap: 5px")}>
            <b style={sx("font-size: 14px; font-weight: 600")}>{t}</b>
            {href ? <a href={href} style={sx("font-size: 12px; line-height: 1.5; text-decoration: none")}>{d}</a> : <span style={sx("font-size: 12px; line-height: 1.5; color: #85939A")}>{d}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- COMMUNITY (640) ---------------- */
const EV: [string, string, string][] = [
  ["var(--accent)", "Vault rebalanced · TSLA 29 → 25", "0x3f…a1 · autopilot"],
  ["#B4A6FF", "Idle USDG routed to yield", "0x9c…02"],
  ["#FFBA5C", "Trade held · cooldown 1h 40m", "0x51…e7"],
  ["#6FB8FF", "New vault opened", "0x2b…f0"],
  ["var(--accent)", "Rebalance approved · ETH 27 → 30", "0x7a…c3 · approve"],
  ["#FF5A6A", "Rejected · asset not on list", "0xd4…18"],
  ["#B4A6FF", "USDG pulled from yield for rebalance", "0x6e…bb"],
  ["#6FB8FF", "Autonomy set to Autopilot", "0x0c…5d"],
];

export function MCommunity() {
  const col = (items: typeof EV, anim: string) => (
    <div style={sx("overflow: hidden; height: 100%")}>
      <div style={sx(`display: flex; flex-direction: column; gap: 10px; animation: ${anim} 30s linear infinite`)}>
        {[...items, ...items].map(([c, t, m], i) => (
          <div key={i} style={sx("height: 64px; box-sizing: border-box; border-radius: 14px; border: 1px solid #1A2326; background: rgba(12,18,21,0.8); padding: 11px 12px; display: flex; flex-direction: column; justify-content: center; gap: 4px")}>
            <span style={sx("display: flex; align-items: center; gap: 7px; font-size: 12px; color: #E6EEEC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis")}><span style={sx(`width: 6px; height: 6px; flex: none; border-radius: 50%; background: ${c}; box-shadow: 0 0 6px ${c}`)} />{t}</span>
            <span style={sx("font-size: 11px; color: #5B686D")}>{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section style={SECTION(640, "display: flex; align-items: center")}>
      <div aria-hidden="true" style={sx("position: absolute; inset: 0; padding: 0 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; opacity: 0.55; -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 16%, #000 84%, rgba(0,0,0,0)); mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 16%, #000 84%, rgba(0,0,0,0))")}>
        {col(EV, "mo-up")}
        {col([...EV.slice(4), ...EV.slice(0, 4)], "mo-down")}
      </div>
      <div aria-hidden="true" style={sx("position: absolute; inset: 0; background: radial-gradient(60% 46% at 50% 50%, rgba(4,7,10,0.96), rgba(4,7,10,0.78) 60%, rgba(4,7,10,0.3) 100%)")} />
      <div style={sx("position: relative; width: 100%; padding: 0 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center")}>
        <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>Community</span>
        <h2 style={sx("margin: 0; font-size: 36px; font-weight: 600; letter-spacing: -0.045em; line-height: 1")}>Build the vault<br /><span style={{ color: A }}>with us.</span></h2>
        <p style={sx("margin: 0; font-size: 15px; line-height: 1.6; color: #AEBBBA")}>Updates, strategy talk and early access to what ships next.</p>
        <a href="#" className="ae-btn-w" style={sx("width: 100%; height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none")}>Follow on X</a>
        <a href="#" className="ae-btn-g" style={sx("width: 100%; height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font-size: 16px; font-weight: 600; text-decoration: none")}>Join the Telegram</a>
        <span style={sx("font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Background: sample vault activity</span>
      </div>
    </section>
  );
}

/* ---------------- FOOTER (720) ---------------- */
function Credit({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div style={sx("display: grid; grid-template-columns: 110px minmax(0, 1fr); align-items: baseline; gap: 10px")}>
      <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>{role}</span>
      <span className="cin-credit" style={sx("font-size: 15px; display: flex; flex-wrap: wrap; gap: 4px 14px")}>{children}</span>
    </div>
  );
}

export function MFooter() {
  return (
    <footer style={SECTION(720, "background: #000; padding: 64px 20px 0; box-sizing: border-box; display: flex; flex-direction: column")}>
      <span style={sx("font-size: 42px; font-weight: 500; letter-spacing: -0.045em; line-height: 1; text-shadow: -0.012em 0 rgba(255,70,90,0.3), 0.012em 0 rgba(70,140,255,0.3)")}>Stocks, crypto, yield.<br /><span style={{ color: A }}>One vault.</span></span>
      <LaunchApp className="ae-btn-w" style={sx("margin-top: 26px; width: 100%; height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none")}>Launch app</LaunchApp>
      <div style={sx("margin-top: 48px; display: flex; flex-direction: column; gap: 18px")}>
        <Credit role="Product"><LaunchApp>Launch app</LaunchApp><a href="#m-how">How it works</a><Link href="/docs">Docs</Link></Credit>
        <Credit role="Community"><a href="#">X</a><a href="#">Telegram</a></Credit>
        <Credit role="Network">Robinhood Chain</Credit>
        <Credit role="Audit"><a href="#">[AUDITOR NAME]</a></Credit>
        <Credit role="Legal"><a href="#">Terms</a><a href="#">Privacy</a></Credit>
      </div>
      <div style={sx("margin-top: auto; padding-bottom: 40px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center")}>
        <span className="aera-mark" aria-hidden="true" style={sx("width: 36px; height: 36px; background: var(--accent); filter: drop-shadow(0 0 14px color-mix(in srgb, var(--accent) 50%, transparent))")} />
        <b style={sx("font-size: 16px; font-weight: 600")}>Aera Finance</b>
        <span style={sx("font-size: 11px; color: #5B686D")}>© 2026 Aera Finance · Agent-managed vaults on Robinhood Chain</span>
      </div>
    </footer>
  );
}
