import { sx } from "@/components/aera/sx";
import { BlockNumber, MonumentTilt } from "./HeroClient";
import { LaunchApp } from "@/components/aera/LaunchApp";

const S_COL = { s: "var(--accent)", c: "#6FB8FF", u: "#B4A6FF" } as const;
const STREAM = (
  [
    ["TSLA", "s"], ["ETH", "c"], ["USDG", "u"], ["NVDA", "s"], ["AAPL", "s"],
    ["WETH", "c"], ["USDG", "u"], ["META", "s"], ["HOOD", "s"], ["ETH", "c"],
  ] as const
).map(([t, k], i) => ({
  t,
  style:
    "position: absolute; left: 0; top: 0; translate: -50% 0; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 999px; font-size: 14px; font-weight: 600; white-space: nowrap; margin-top: 330px; --x0: " +
    (i % 2 ? 1 : -1) * (120 + ((i * 37) % 200)) +
    "px; --y1: -370px; animation: hm-stream " +
    (5.6 + (i % 3) * 0.6).toFixed(1) +
    "s cubic-bezier(.4,0,.2,1) " +
    (2.4 + i * 0.62).toFixed(2) +
    "s infinite both",
  dot: `width: 7px; height: 7px; border-radius: 50%; background: ${S_COL[k]}; box-shadow: 0 0 10px ${S_COL[k]}`,
}));

const MARK_LAYER = "position: absolute; top: -300px; width: 600px; height: 600px;";

export function Hero() {
  return (
    <section id="top" className="cin-hero" style={sx("position: relative; margin-top: -68px; height: calc(var(--f) * 1.8)")}>
      <div style={sx("position: sticky; top: 0; height: var(--f); min-height: 680px; overflow: hidden; perspective: 1400px; background: radial-gradient(60% 70% at 64% 46%, color-mix(in srgb, var(--accent) 14%, transparent), rgba(4,7,10,0) 70%), #04070A")}>
        {/* monument: mouse tilt > scroll push > load rise */}
        <MonumentTilt>
          <div className="cin-monopush" style={sx("position: absolute; inset: 0; transform-origin: 64% 46%")}>
            <div className="hm-anchor" style={sx("position: absolute; left: 64%; top: 46%; width: 0; height: 0; animation: hm-rise 2.6s cubic-bezier(.16,1,.3,1) .3s both")}>
              <div style={sx("position: absolute; left: -380px; top: -380px; width: 760px; height: 760px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), rgba(0,0,0,0) 62%); animation: hm-breathe 6s ease-in-out infinite")} />
              <span className="aera-mark" style={sx(MARK_LAYER + "left: -300px; background: var(--accent); filter: blur(40px); opacity: .45")} />
              <span className="aera-mark" style={sx(MARK_LAYER + "left: -300px; background: linear-gradient(170deg, rgba(255,255,255,.55) 0%, color-mix(in srgb, var(--accent) 55%, transparent) 38%, rgba(46,230,214,.08) 70%, color-mix(in srgb, var(--accent) 40%, transparent) 100%)")} />
              <span className="aera-mark" style={sx(MARK_LAYER + "left: -300px; background: linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.75) 50%, rgba(255,255,255,0) 60%) 0 0 / 250% 100%; mix-blend-mode: screen; animation: hm-sheen 5.5s ease-in-out 2.4s infinite")} />
              <span className="aera-mark" style={sx(MARK_LAYER + "left: -303px; background: rgba(255,70,110,.35); mix-blend-mode: screen; opacity: .5")} />
              <span className="aera-mark" style={sx(MARK_LAYER + "left: -297px; background: rgba(70,150,255,.35); mix-blend-mode: screen; opacity: .5")} />
              {STREAM.map((s, i) => (
                <span key={i} className="ae-glass" style={sx(s.style)}>
                  <span style={sx(s.dot)} />
                  {s.t}
                </span>
              ))}
            </div>
          </div>
        </MonumentTilt>

        <div aria-hidden="true" style={sx("position: absolute; left: 0; right: 0; bottom: 0; height: 52%; background: linear-gradient(180deg, rgba(4,7,10,0), rgba(4,7,10,.92) 82%); pointer-events: none")} />

        {/* title, bottom-left */}
        <div className="cin-titleout" style={sx("position: absolute; left: 0; right: 0; bottom: 0; z-index: 4; padding: 0 clamp(24px, 5vw, 72px) clamp(40px, 7vh, 72px); display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px")}>
          <div className="hero-copy" style={sx("display: flex; flex-direction: column; align-items: flex-start; gap: 18px")}>
            <div className="hero-readout" aria-label="Robinhood Chain network status" style={sx("display: flex; align-items: center; gap: 12px; font-size: 12px; letter-spacing: 0.04em; color: #85939A; font-variant-numeric: tabular-nums; white-space: nowrap; animation: ae-rise 1.2s cubic-bezier(.22,1,.36,1) 2s both")}>
              <span aria-hidden="true" style={sx("width: 28px; height: 1px; background: var(--accent)")} />
              <span style={sx("color: #E6EEEC; font-weight: 500")}>Robinhood Chain</span>
              <span aria-hidden="true" style={sx("color: #263034")}>/</span>
              <span>
                Block <BlockNumber />
              </span>
              <span aria-hidden="true" style={sx("color: #263034")}>/</span>
              <span>Vaults settle on-chain</span>
            </div>
            <h1 style={sx("margin: 0; font-size: clamp(46px, 6.6vw, 100px); font-weight: 500; letter-spacing: -0.045em; line-height: 0.98; text-shadow: -0.012em 0 rgba(255,70,90,0.3), 0.012em 0 rgba(70,140,255,0.3), 0 2px 40px rgba(4,7,10,0.9)")}>
              <span className="ae-w" style={{ animationDelay: "1.4s" }}>Stocks,</span>{" "}
              <span className="ae-w" style={{ animationDelay: "1.55s" }}>crypto,</span>{" "}
              <span className="ae-w" style={{ animationDelay: "1.7s" }}>yield.</span>
              <br />
              <span className="ae-w" style={{ animationDelay: "1.95s", color: "var(--accent)" }}>One</span>{" "}
              <span className="ae-w" style={{ animationDelay: "2.1s", color: "var(--accent)" }}>vault.</span>
            </h1>
          </div>
          <div style={sx("display: flex; gap: 10px; flex-wrap: wrap; animation: ae-rise 1.2s cubic-bezier(.22,1,.36,1) 2.4s both")}>
            <LaunchApp className="ae-btn-w" style={sx("height: 50px; padding: 0 28px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none; box-shadow: 0 0 40px rgba(255,255,255,0.18)")}>
              Launch app
            </LaunchApp>
            <a href="#how" className="ae-btn-g" style={sx("height: 50px; padding: 0 26px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font-size: 16px; text-decoration: none")}>
              How it works
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="cin-black" style={sx("position: absolute; inset: 0; z-index: 5; background: #04070A; opacity: 0; pointer-events: none")} />
        <div aria-hidden="true" style={sx("position: absolute; inset: 0; z-index: 6; background: #000; pointer-events: none; animation: cin-unveil 1.4s ease-out both")} />
        <div aria-hidden="true" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 11%; z-index: 7; background: #000; transform-origin: top; pointer-events: none; animation: cin-bar 3s cubic-bezier(.65,0,.35,1) both")} />
        <div aria-hidden="true" style={sx("position: absolute; left: 0; right: 0; bottom: 0; height: 11%; z-index: 7; background: #000; transform-origin: bottom; pointer-events: none; animation: cin-bar 3s cubic-bezier(.65,0,.35,1) both")} />
      </div>
    </section>
  );
}
