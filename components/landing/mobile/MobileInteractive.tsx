"use client";

import { useRef, useState } from "react";
import { sx } from "@/components/aera/sx";
import { DEFS, QA } from "../Interactive";
import { Cap } from "./MobileScenes";

const A = "var(--accent)";
const FONT = "var(--font-geist), Geist, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ---------------- 05 · AUTONOMY (760) ---------------- */
type ModeId = (typeof DEFS)[number]["id"];

export function MAutonomy() {
  const [mode, setMode] = useState<ModeId>("approve");
  const cur = DEFS.find((d) => d.id === mode)!;
  return (
    <section id="m-autonomy" style={sx("position: relative; height: 760px; overflow: hidden")}>
      <span aria-hidden="true" style={sx("position: absolute; right: -40px; top: 40px; font-size: 220px; font-weight: 600; letter-spacing: -0.06em; line-height: .8; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.07)")}>05</span>
      <Cap eyebrow="05 · Autonomy" a="You choose" b="how much it decides." body="Start with suggestions only. Move to one-tap approvals. Hand over the wheel when you trust it. Change it any time." />
      <div style={sx("position: absolute; left: 20px; right: 20px; top: 330px; display: flex; flex-direction: column; gap: 16px")}>
        <div className="ae-glass" role="tablist" aria-label="Autonomy level" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; padding: 5px; border-radius: 999px")}>
          {DEFS.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={d.id === mode}
              onClick={() => setMode(d.id)}
              style={sx(`height: 42px; border: 0; border-radius: 999px; font: 500 14px ${FONT}; cursor: pointer; transition: background .3s, color .3s; ` + (d.id === mode ? "background: #FFFFFF; color: #04070A" : "background: rgba(0,0,0,0); color: #AEBBBA"))}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="ae-glass" role="tabpanel" style={sx("border-radius: 24px; padding: 22px; display: flex; flex-direction: column; gap: 12px")}>
          <div style={sx("display: flex; justify-content: space-between; align-items: center; gap: 10px")}>
            <b style={sx("font-size: 13px; font-weight: 600")}>Rebalance proposal</b>
            <span style={sx("font-size: 11px; padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); white-space: nowrap")}>{cur.tag}</span>
          </div>
          <span style={sx("font-size: 24px; font-weight: 500; letter-spacing: -0.03em")}>TSLA 31% → 25%</span>
          <span style={sx("font-size: 13px; color: #85939A; margin-top: -6px")}>into ETH, USDG</span>
          <p style={sx("margin: 0; font-size: 14px; line-height: 1.55; color: #AEBBBA")}>{cur.desc}</p>
          {mode === "approve" && (
            <div style={sx("display: grid; grid-template-columns: 1fr 1fr; gap: 8px")}>
              <button type="button" style={sx(`height: 44px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 14px ${FONT}`)}>Approve and sign</button>
              <button type="button" style={sx(`height: 44px; border-radius: 999px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font: 400 14px ${FONT}`)}>Decline</button>
            </div>
          )}
          {mode === "auto" && (
            <div style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--accent)")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
              Executed within your rules · tx 0x91…4e
            </div>
          )}
          {mode === "suggest" && (
            <div style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: #85939A")}>
              <span style={sx("width: 7px; height: 7px; border-radius: 50%; background: #85939A; animation: ae-pulse 2s ease-in-out infinite")} />
              Shown to you. Nothing moves.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMING NEXT · SWIPE REELS (740) ---------------- */
const SPROCKET = "position: absolute; left: 0; right: 0; height: 16px; background: repeating-linear-gradient(90deg, #121A1D 0 14px, rgba(0,0,0,0) 14px 26px); opacity: .9;";
const BAR = (parts: [string, number][], h = 6) => (
  <div style={sx(`display: flex; gap: 2px; height: ${h}px`)}>{parts.map(([c, f], i) => <span key={i} style={{ flex: f, background: c }} />)}</div>
);
const REELS: { n: string; title: string; body: string; caption: string; visual: React.ReactNode }[] = [
  {
    n: "01", title: "Vault Infrastructure as a Service",
    body: "The same per-user vaults and guardrails, offered to other apps that want managed portfolios without building them.",
    caption: "Per-user vaults, your brand",
    visual: (
      <div style={sx("position: relative; height: 170px; perspective: 800px")}>
        {[0, 1, 2].map((k) => (
          <div key={k} className="ae-glass" style={sx(`position: absolute; left: ${k * 22}px; top: ${k * 50}px; width: 200px; padding: 10px 12px; border-radius: 16px; transform: rotateY(-16deg); opacity: ${[0.55, 0.8, 1][k]}; display: flex; flex-direction: column; gap: 7px` + (k === 2 ? "; border-color: color-mix(in srgb, var(--accent) 40%, transparent); box-shadow: 0 0 36px color-mix(in srgb, var(--accent) 18%, transparent)" : ""))}>
            <span style={sx("font-size: 10px; color: #85939A")}>{["Vault · app A", "Vault · app B", "Vault · your app"][k]}</span>
            {BAR([[A, 40 - k * 5], ["#6FB8FF", 35], ["#B4A6FF", 25 + k * 5]])}
            {k === 2 && <span style={sx("font-size: 10px; color: var(--accent)")}>Guardrails on · your brand</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "02", title: "Market Signal API",
    body: "The drift, risk and decision data the agent uses, available to developers as an API.",
    caption: "Illustrative request, final API may differ",
    visual: (
      <div className="ae-glass" style={sx(`height: 170px; box-sizing: border-box; border-radius: 16px; padding: 14px; font-family: ${MONO}; font-size: 11px; line-height: 1.6; white-space: pre; overflow: hidden; color: #AEBBBA`)}>
        <span style={{ color: A }}>GET</span>{" /v1/signals/drift\n{\n  \"asset\":  "}<span style={{ color: "#E6EEEC" }}>&quot;TSLA&quot;</span>
        {",\n  \"weight\": "}<span style={{ color: "#6FB8FF" }}>0.31</span>{",\n  \"target\": "}<span style={{ color: "#6FB8FF" }}>0.25</span>
        {",\n  \"signal\": "}<span style={{ color: A }}>&quot;rebalance&quot;</span>{"\n}"}
      </div>
    ),
  },
  {
    n: "03", title: "Strategy Marketplace",
    body: "Pick a published strategy, keep your own guardrails, and let your vault follow it.",
    caption: "Sample strategies",
    visual: (
      <div style={sx("height: 170px; display: flex; flex-direction: column; gap: 8px")}>
        {([["Balanced tech", [[A, 50], ["#6FB8FF", 25], ["#B4A6FF", 25]]], ["Stocks + yield", [[A, 60], ["#B4A6FF", 40]]], ["ETH-weighted", [[A, 20], ["#6FB8FF", 60], ["#B4A6FF", 20]]]] as [string, [string, number][]][]).map(([name, mix]) => (
          <div key={name} className="ae-glass" style={sx("flex: 1; border-radius: 14px; padding: 0 12px; display: flex; align-items: center; gap: 10px")}>
            <div style={sx("flex: 1; display: flex; flex-direction: column; gap: 6px")}><b style={sx("font-size: 13px; font-weight: 600")}>{name}</b>{BAR(mix, 4)}</div>
            <span style={sx("font-size: 11px; padding: 5px 10px; border-radius: 999px; background: #FFFFFF; color: #04070A; font-weight: 600")}>Follow</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function MComingNext() {
  const [active, setActive] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = row.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / (316 + 12));
    if (i !== active) setActive(Math.max(0, Math.min(2, i)));
  };
  return (
    <section style={sx("position: relative; height: 740px; overflow: hidden")}>
      <div style={sx("position: absolute; left: 20px; right: 20px; top: 64px; display: flex; flex-direction: column; gap: 10px")}>
        <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>Coming next</span>
        <h2 style={sx("margin: 0; font-size: 36px; font-weight: 600; letter-spacing: -0.045em; line-height: 1")}>The vault is <span style={{ color: A }}>the start.</span></h2>
        <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Three more reels · swipe</span>
      </div>
      <div ref={row} onScroll={onScroll} className="m-reels" role="region" aria-label="Coming next reels" style={sx("position: absolute; left: 0; right: 0; top: 214px; display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 37px; box-sizing: border-box; scroll-padding: 0 37px")}>
        {REELS.map((r) => (
          <article key={r.n} style={sx("position: relative; flex: 0 0 316px; height: 470px; box-sizing: border-box; border-radius: 20px; background: #080C0F; border: 1px solid #1A2326; overflow: hidden; scroll-snap-align: center; padding: 34px 18px; display: flex; flex-direction: column; gap: 12px")}>
            <span aria-hidden="true" style={sx(SPROCKET + "top: 8px")} />
            <span aria-hidden="true" style={sx(SPROCKET + "bottom: 8px")} />
            <div style={sx("display: flex; justify-content: space-between; align-items: center")}>
              <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Reel {r.n}/03</span>
              <span style={sx("font-size: 11px; padding: 4px 11px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); color: var(--accent)")}>Soon</span>
            </div>
            <div aria-hidden="true">{r.visual}</div>
            <b style={sx("font-size: 20px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.1")}>{r.title}</b>
            <span style={sx("font-size: 14px; line-height: 1.55; color: #AEBBBA")}>{r.body}</span>
            <span style={sx("margin-top: auto; font-size: 11px; color: #5B686D")}>{r.caption}</span>
          </article>
        ))}
      </div>
      <div aria-hidden="true" style={sx("position: absolute; left: 0; right: 0; top: 704px; display: flex; justify-content: center; gap: 6px")}>
        {REELS.map((r, i) => <span key={r.n} style={sx(`height: 4px; border-radius: 2px; transition: width .3s, background .3s; width: ${i === active ? 22 : 8}px; background: ${i === active ? "var(--accent)" : "#263034"}`)} />)}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function MFaq() {
  const [open, setOpen] = useState(1);
  return (
    <section id="m-faq" style={sx("padding: 64px 20px; min-height: 1000px; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px")}>
      <div style={sx("display: flex; flex-direction: column; gap: 10px")}>
        <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>FAQ</span>
        <h2 style={sx("margin: 0; font-size: 36px; font-weight: 600; letter-spacing: -0.045em; line-height: 1")}>Your questions,<br /><span style={{ color: A }}>answered.</span></h2>
      </div>
      <div style={sx("display: flex; flex-direction: column; gap: 10px")}>
        {QA.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="ae-glass" style={sx("border-radius: 18px; background-color: rgba(10,15,18,.5); transition: border-color .3s, box-shadow .3s" + (isOpen ? "; border-color: color-mix(in srgb, var(--accent) 45%, transparent); box-shadow: 0 16px 40px rgba(0,0,0,.4), 0 0 36px color-mix(in srgb, var(--accent) 16%, transparent)" : ""))}>
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`m-faq-${i}`} style={sx(`width: 100%; min-height: 58px; padding: 0 18px; border: 0; background: rgba(0,0,0,0); color: #E6EEEC; font: 500 15px ${FONT}; display: flex; align-items: center; justify-content: space-between; gap: 12px; text-align: left; cursor: pointer`)}>
                <span>{q}</span>
                <span aria-hidden="true" style={sx("font-size: 20px; color: " + (isOpen ? "var(--accent)" : "#85939A") + "; transition: transform .3s; transform: rotate(" + (isOpen ? 45 : 0) + "deg)")}>+</span>
              </button>
              {isOpen && <p id={`m-faq-${i}`} style={sx("margin: 0; padding: 0 18px 18px; font-size: 14px; line-height: 1.6; color: #AEBBBA")}>{a}</p>}
            </div>
          );
        })}
      </div>
      <p style={sx("margin: 0; font-size: 14px; color: #AEBBBA")}>Still unsure about something? <a href="#" style={{ textDecoration: "none" }}>Ask us on Telegram →</a></p>
    </section>
  );
}
