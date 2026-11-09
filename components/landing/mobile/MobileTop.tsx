"use client";

import { useEffect, useState } from "react";
import { sx } from "@/components/aera/sx";
import { BlockNumber } from "../HeroClient";
import { LaunchApp } from "@/components/aera/LaunchApp";

/* ---------------- NAV + MENU (design.md §10 Landing) ---------------- */
const LINKS: [string, string][] = [
  ["How it works", "#m-how"],
  ["Autonomy", "#m-autonomy"],
  ["Agent", "#m-agent"],
  ["Security", "#m-security"],
  ["FAQ", "#m-faq"],
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="ae-glass" style={sx("position: fixed; left: 12px; right: 12px; top: 12px; z-index: 85; height: 54px; box-sizing: border-box; border-radius: 999px; padding: 0 8px 0 16px; display: flex; align-items: center; gap: 8px; background-color: rgba(10,15,18,0.55); animation: mo-rise .9s cubic-bezier(.22,1,.36,1) 2s both")}>
        <a href="#m-top" onClick={() => setOpen(false)} style={sx("display: flex; align-items: center; gap: 9px; color: #E6EEEC; text-decoration: none; margin-right: auto")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 22px; height: 22px; background: var(--accent); filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 45%, transparent))")} />
          <span style={sx("font-size: 15px; font-weight: 600; letter-spacing: -0.01em")}>Aera Finance</span>
        </a>
        <LaunchApp className="ae-btn-w" style={sx("height: 38px; padding: 0 15px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 14px; font-weight: 600; text-decoration: none; white-space: nowrap")}>Launch app</LaunchApp>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="m-menu"
          onClick={() => setOpen(!open)}
          style={sx("width: 38px; height: 38px; flex: none; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18); background: rgba(0,0,0,0.3); color: #E6EEEC; display: inline-flex; align-items: center; justify-content: center; cursor: pointer")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
          </svg>
        </button>
      </header>

      {open && (
        <div id="m-menu" role="dialog" aria-modal="true" aria-label="Menu" style={sx("position: fixed; inset: 0; z-index: 84; background: rgba(4,7,10,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 100px 24px 36px; box-sizing: border-box; display: flex; flex-direction: column; animation: mo-rise .4s cubic-bezier(.22,1,.36,1) both")}>
          <nav aria-label="Main" style={sx("display: flex; flex-direction: column")}>
            {[...LINKS, ["Docs", "/docs"] as [string, string]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="m-menu-link"
                onClick={() => setOpen(false)}
                style={sx("height: 60px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #121A1D; color: #E6EEEC; text-decoration: none; font-size: 26px; font-weight: 500; letter-spacing: -0.03em")}
              >
                {label}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B686D" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </a>
            ))}
          </nav>
          <div style={sx("margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 16px")}>
            <LaunchApp onClick={() => setOpen(false)} className="ae-btn-w" style={sx("width: 100%; height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none")}>Launch app</LaunchApp>
            <span style={sx("font-size: 12px; color: #5B686D")}>
              <a href="#" style={sx("color: #85939A; text-decoration: none")}>X</a> · <a href="#" style={sx("color: #85939A; text-decoration: none")}>Telegram</a>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- HERO (780px) ---------------- */
const S_COL = { s: "var(--accent)", c: "#6FB8FF", u: "#B4A6FF" } as const;
const CHIPS = ([["TSLA", "s"], ["ETH", "c"], ["USDG", "u"], ["NVDA", "s"], ["AAPL", "s"], ["WETH", "c"], ["HOOD", "s"]] as const).map(([t, k], i) => ({
  t,
  c: S_COL[k],
  style:
    "position: absolute; left: 0; top: 0; translate: -50% 0; margin-top: 170px; display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 11px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; " +
    `--x0: ${(i % 2 ? 1 : -1) * (70 + ((37 * i) % 90))}px; --y1: -190px; animation: mo-stream 4.6s cubic-bezier(.4,0,.2,1) ${(1.6 + 0.66 * i).toFixed(2)}s infinite both`,
}));
const LAYER = "position: absolute; left: -140px; top: -140px; width: 280px; height: 280px;";
const WORDS: [string, number, boolean?][] = [["Stocks,", 1.2], ["crypto,", 1.35], ["yield.", 1.5], ["One", 1.7, true], ["vault.", 1.85, true]];

export function MobileHero() {
  return (
    <section id="m-top" style={sx("position: relative; height: 780px; overflow: hidden; background: radial-gradient(70% 50% at 50% 34%, color-mix(in srgb, var(--accent) 16%, transparent), rgba(4,7,10,0) 70%), #04070A")}>
      <div aria-hidden="true" style={sx("position: absolute; left: 50%; top: 36%; width: 0; height: 0; animation: mo-rise 2.2s cubic-bezier(.22,1,.36,1) .2s both")}>
        <div style={sx("position: absolute; left: -190px; top: -190px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), rgba(0,0,0,0) 62%); animation: mo-breathe 6s ease-in-out infinite")} />
        <span className="aera-mark" style={sx(LAYER + "background: var(--accent); filter: blur(26px); opacity: .45")} />
        <span className="aera-mark" style={sx(LAYER + "background: linear-gradient(170deg, rgba(255,255,255,.55) 0%, color-mix(in srgb, var(--accent) 55%, transparent) 38%, rgba(46,230,214,.08) 70%, color-mix(in srgb, var(--accent) 40%, transparent) 100%)")} />
        <span className="aera-mark" style={sx(LAYER + "background: linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.75) 50%, rgba(255,255,255,0) 60%) 0 0 / 250% 100%; mix-blend-mode: screen; animation: mo-sheen 5.5s ease-in-out 2s infinite")} />
        <span className="aera-mark" style={sx("position: absolute; left: -141.5px; top: -140px; width: 280px; height: 280px; background: rgba(255,70,110,.35); mix-blend-mode: screen; opacity: .5")} />
        <span className="aera-mark" style={sx("position: absolute; left: -138.5px; top: -140px; width: 280px; height: 280px; background: rgba(70,150,255,.35); mix-blend-mode: screen; opacity: .5")} />
        {CHIPS.map((c) => (
          <span key={c.t} className="ae-glass" style={sx(c.style)}>
            <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: ${c.c}; box-shadow: 0 0 8px ${c.c}`)} />
            {c.t}
          </span>
        ))}
      </div>
      <div aria-hidden="true" style={sx("position: absolute; left: 0; right: 0; bottom: 0; height: 52%; background: linear-gradient(180deg, rgba(4,7,10,0), rgba(4,7,10,.92) 82%); pointer-events: none")} />
      <div style={sx("position: absolute; left: 20px; right: 20px; bottom: 36px; display: flex; flex-direction: column; gap: 18px")}>
        <div aria-label="Robinhood Chain network status" style={sx("display: flex; flex-direction: column; gap: 6px; font-size: 12px; letter-spacing: 0.04em; color: #85939A; font-variant-numeric: tabular-nums; animation: mo-rise .9s cubic-bezier(.22,1,.36,1) 2.1s both")}>
          <span style={sx("display: flex; align-items: center; gap: 10px; white-space: nowrap")}>
            <span aria-hidden="true" style={sx("width: 24px; height: 1px; background: var(--accent)")} />
            <span style={sx("color: #E6EEEC; font-weight: 500")}>Robinhood Chain</span>
            <span aria-hidden="true" style={{ color: "#263034" }}>/</span>
            <span>Block <BlockNumber /></span>
          </span>
          <span style={{ paddingLeft: 34 }}>Vaults settle on-chain</span>
        </div>
        <h1 style={sx("margin: 0; font-size: 46px; font-weight: 500; letter-spacing: -0.045em; line-height: 0.98; text-shadow: -0.012em 0 rgba(255,70,90,0.3), 0.012em 0 rgba(70,140,255,0.3), 0 2px 40px rgba(4,7,10,0.9)")}>
          {WORDS.map(([w, d, acc], i) => (
            <span key={w}>
              <span style={sx(`display: inline-block; animation: mo-blur 1s cubic-bezier(.22,1,.36,1) ${d}s both` + (acc ? "; color: var(--accent)" : ""))}>{w}</span>
              {i === 2 ? <br /> : i < WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <div style={sx("display: grid; grid-template-columns: 1fr 1fr; gap: 10px; animation: mo-rise .9s cubic-bezier(.22,1,.36,1) 2.3s both")}>
          <LaunchApp className="ae-btn-w" style={sx("height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 15px; font-weight: 600; text-decoration: none; box-shadow: 0 0 40px rgba(255,255,255,0.18)")}>Launch app</LaunchApp>
          <a href="#m-how" className="ae-btn-g" style={sx("height: 50px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font-size: 15px; text-decoration: none")}>How it works</a>
        </div>
      </div>
    </section>
  );
}
