"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sx } from "./sx";

/** 404 from reference/Aera-404.dc.html; the bouncing pill shows the real path. */
export function NotFoundPage() {
  const path = usePathname() || "/";
  return (
    <div className="nf-root" style={sx("position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: radial-gradient(45% 60% at 72% 50%, color-mix(in srgb, var(--accent) 8%, transparent), rgba(0,0,0,0) 70%), #04070A; color: #E6EEEC")}>
      <div aria-hidden="true" style={sx("position: absolute; inset: 0; background-image: linear-gradient(rgba(46,230,214,0.03) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(46,230,214,0.03) 1px, rgba(0,0,0,0) 1px); background-size: 48px 48px")} />

      <header className="nf-head" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 76px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; z-index: 3")}>
        <Link href="/" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 24px; height: 24px; background: var(--accent)")} />
          <b style={sx("font-size: 15px; font-weight: 600")}>Aera Finance</b>
        </Link>
        <nav style={sx("display: flex; align-items: center; gap: 24px; font-size: 14px")}>
          <Link href="/docs" style={sx("color: #85939A; text-decoration: none")}>Docs</Link>
          <Link href="/app" style={sx("height: 38px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-weight: 600; text-decoration: none")}>Launch app</Link>
        </nav>
      </header>

      {/* the wall */}
      {/* phones: the wall turns horizontal and the path drops onto it (design.md §10) */}
      <div aria-hidden="true" className="mo-only" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 360px")}>
        <span style={sx("position: absolute; left: 50%; top: 270px; transform: translate(-50%, -54%); font-size: 190px; font-weight: 600; letter-spacing: -0.06em; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.06); white-space: nowrap")}>404</span>
        <div style={sx("position: absolute; left: 0; right: 0; top: 200px; height: 140px; background: repeating-linear-gradient(30deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 18px), repeating-linear-gradient(-30deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 18px); -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0)); mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0))")} />
        <div style={sx("position: absolute; left: 12%; right: 12%; top: 270px; height: 2px; margin-top: -1px; background: linear-gradient(90deg, rgba(0,0,0,0), #DFFFFB 18%, var(--accent) 50%, #DFFFFB 82%, rgba(0,0,0,0)); box-shadow: 0 0 18px var(--accent), 0 0 50px color-mix(in srgb, var(--accent) 40%, transparent); overflow: hidden")}>
          <span style={sx("position: absolute; top: 0; width: 90px; height: 2px; background: linear-gradient(90deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0)); animation: mo-shimx 2.6s linear infinite")} />
        </div>
        <span style={sx("position: absolute; left: 12%; top: 284px; display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent)")}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Allowlist
        </span>
        <span style={sx("position: absolute; left: 20px; right: 20px; top: 120px; text-align: center; font-size: 12px; color: #FF7A88; animation: nf-tag 5s linear .6s infinite both")}>Rejected · page not on the allowlist</span>
        <div style={sx("position: absolute; left: 20px; right: 20px; top: 222px; display: flex; justify-content: center")}>
          <div style={sx("max-width: 100%; animation: mo-hit 5s cubic-bezier(.4,0,.2,1) .6s infinite both")}>
            <span style={sx("display: inline-flex; align-items: center; height: 44px; max-width: 100%; padding: 0 18px; box-sizing: border-box; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); background: linear-gradient(160deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); font-family: ui-monospace, Menlo, monospace; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: nf-col 5s linear .6s infinite both")}>{path}</span>
          </div>
        </div>
        <div style={sx("position: absolute; left: 50%; top: 270px; width: 90px; height: 90px; margin: -45px 0 0 -45px; border-radius: 50%; border: 2px solid #FF5A6A; box-shadow: 0 0 24px #FF5A6A; animation: nf-ripple 5s linear .6s infinite both")} />
      </div>

      <div aria-hidden="true" className="nf-wall desk-only" style={sx("position: absolute; inset: 0")}>
        <span style={sx("position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 420px; font-weight: 600; letter-spacing: -0.06em; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.05); white-space: nowrap; margin-left: 210px")}>404</span>
        <div style={sx("position: absolute; top: 0; bottom: 0; left: calc(72% - 200px); width: 400px; background: repeating-linear-gradient(60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 22px), repeating-linear-gradient(-60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 22px); -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0)); mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0))")} />
        <div style={sx("position: absolute; left: 72%; top: 18%; bottom: 18%; width: 2px; margin-left: -1px; background: linear-gradient(180deg, rgba(0,0,0,0), #DFFFFB 18%, var(--accent) 50%, #DFFFFB 82%, rgba(0,0,0,0)); box-shadow: 0 0 22px var(--accent), 0 0 70px color-mix(in srgb, var(--accent) 40%, transparent); overflow: hidden")}>
          <span style={sx("position: absolute; left: 0; width: 2px; height: 120px; background: linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0)); animation: nf-shimmer 2.6s linear infinite")} />
        </div>
        <span style={sx("position: absolute; left: 72%; top: calc(18% - 30px); transform: translateX(-50%); display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); white-space: nowrap")}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Allowlist
        </span>
        <div style={sx("position: absolute; right: calc(28% + 14px); top: calc(50% - 24px); animation: nf-hit 5s cubic-bezier(.4,0,.2,1) .6s infinite both")}>
          <span style={sx("display: inline-flex; align-items: center; gap: 10px; height: 48px; padding: 0 20px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); background: linear-gradient(160deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); font-family: ui-monospace, Menlo, monospace; font-size: 15px; white-space: nowrap; animation: nf-col 5s linear .6s infinite both")}>{path}</span>
        </div>
        <div style={sx("position: absolute; left: 72%; top: 50%; width: 90px; height: 90px; margin: -45px 0 0 -45px; border-radius: 50%; border: 2px solid #FF5A6A; box-shadow: 0 0 24px #FF5A6A; animation: nf-ripple 5s linear .6s infinite both")} />
        <span style={sx("position: absolute; right: calc(28% + 14px); top: calc(50% + 40px); font-size: 13px; color: #FF7A88; white-space: nowrap; animation: nf-tag 5s linear .6s infinite both")}>Rejected · page not on the allowlist</span>
      </div>

      {/* copy */}
      <div className="nf-copy" style={sx("position: absolute; left: 56px; bottom: 96px; width: 560px; display: flex; flex-direction: column; gap: 22px; z-index: 2; animation: nf-rise .9s cubic-bezier(.22,1,.36,1) .1s both")}>
        <span style={sx("font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>Error 404</span>
        <h1 style={sx("margin: 0; font-size: 64px; font-weight: 500; letter-spacing: -0.045em; line-height: 1")}>
          This page isn&apos;t<br /><span style={{ color: "var(--accent)" }}>on the allowlist.</span>
        </h1>
        <p style={sx("margin: 0; font-size: 17px; line-height: 1.6; color: #AEBBBA; max-width: 460px")}>The link may be old, or the page moved. Nothing in your vault was touched.</p>
        <div className="nf-actions" style={sx("display: flex; gap: 10px; padding-top: 4px; flex-wrap: wrap")}>
          <Link href="/" className="nf-btn" style={sx("height: 50px; padding: 0 26px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none; transition: box-shadow .2s")}>Back to home</Link>
          <Link href="/docs" style={sx("height: 50px; padding: 0 24px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font-size: 16px; text-decoration: none")}>Read the docs</Link>
        </div>
      </div>
    </div>
  );
}
