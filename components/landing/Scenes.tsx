import Link from "next/link";
import { sx } from "@/components/aera/sx";

const A = "var(--accent)";
const EYEBROW = "font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A";
const H2 = "margin: 0; font-size: clamp(34px, 4vw, 52px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02";
const CAPTION_P = "margin: 0; font-size: 15px; line-height: 1.55; color: #AEBBBA";
const CAP_BL = "position: absolute; left: clamp(24px, 5vw, 72px); bottom: clamp(40px, 7vh, 72px); max-width: 420px; display: flex; flex-direction: column; gap: 12px";
const FRAME = "position: sticky; top: 0; height: var(--f); overflow: hidden";

/* ---------------- NAV ---------------- */
export function Nav() {
  const link = sx("color: #85939A; text-decoration: none");
  return (
    <div style={sx("position: sticky; top: 12px; z-index: 60; padding: 0 16px; display: flex; justify-content: center")}>
      <header className="ae-glass" style={sx("width: 100%; max-width: 1080px; height: 56px; box-sizing: border-box; border-radius: 999px; padding: 0 8px 0 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px; background-color: rgba(10,15,18,0.55); animation: ae-rise 1.2s cubic-bezier(.22,1,.36,1) 2.2s both")}>
        <a href="#top" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 24px; height: 24px; background: var(--accent); filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 45%, transparent))")} />
          <span style={sx("font-size: 15px; font-weight: 600; letter-spacing: -0.01em")}>Aera Finance</span>
        </a>
        <nav className="ae-navlinks" style={sx("display: flex; gap: 28px; font-size: 14px; font-weight: 500")}>
          <a href="#how" style={link}>How it works</a>
          <a href="#autonomy" style={link}>Autonomy</a>
          <a href="#agent" style={link}>Agent</a>
          <a href="#security" style={link}>Security</a>
          <a href="#faq" style={link}>FAQ</a>
        </nav>
        <div style={sx("display: flex; align-items: center; gap: 14px")}>
          <Link href="/docs" className="ae-hide-sm" style={sx("font-size: 14px; font-weight: 500; color: #85939A; text-decoration: none")}>Docs</Link>
          <Link href="/app" className="ae-btn-w" style={sx("height: 40px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 14px; font-weight: 600; text-decoration: none")}>Launch app</Link>
        </div>
      </header>
    </div>
  );
}

/* ---------------- SCENE 01 · VAULT ---------------- */
const SEGS = Array.from({ length: 12 }, (_, i) => {
  const a = ((i * 30 + 15) * Math.PI) / 180 - Math.PI / 2;
  const far = 520 + (i % 3) * 140;
  return (
    "position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from " + (i * 30 + 1) +
    "deg, color-mix(in srgb, var(--accent) 75%, transparent) 0deg, rgba(255,255,255,0.14) 14deg, color-mix(in srgb, var(--accent) 35%, transparent) 28deg, rgba(0,0,0,0) 28deg); -webkit-mask-image: radial-gradient(closest-side, rgba(0,0,0,0) 72%, #000 72.5%, #000 98%, rgba(0,0,0,0) 98.5%); mask-image: radial-gradient(closest-side, rgba(0,0,0,0) 72%, #000 72.5%, #000 98%, rgba(0,0,0,0) 98.5%); --dx: " +
    (Math.cos(a) * far).toFixed(0) + "px; --dy: " + (Math.sin(a) * far).toFixed(0) + "px; --rz: " + (i % 2 ? 110 : -140) +
    "deg; animation-range: contain " + (2 + i * 2.6).toFixed(1) + "% contain " + (18 + i * 2.6).toFixed(1) + "%"
  );
});

const ORBIT_PILL = "position: absolute; left: 0; top: 0; transform: translate(-50%, -50%); padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap";
const ORBIT_ANCHOR = "position: absolute; width: 0; height: 0; animation: ae-orbit 26s linear infinite reverse;";

export function SceneVault() {
  const fact = sx("display: flex; justify-content: space-between; gap: 24px; padding-bottom: 10px; border-bottom: 1px solid #1A2326");
  return (
    <section id="how" className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2.4)")}>
      <div className="cin-frame cin-full" style={sx(FRAME)}>
        <div aria-hidden="true" className="cin-bloom" style={sx("position: absolute; left: 50%; top: 48%; width: 900px; height: 900px; margin: -450px 0 0 -450px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), rgba(0,0,0,0) 62%); pointer-events: none")} />
        <div aria-hidden="true" style={sx("position: absolute; left: 50%; top: 47%; width: min(620px, 78vw); aspect-ratio: 1; transform: translate(-50%, -50%)")}>
          <div style={sx("position: absolute; inset: -26%; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05)")} />
          <div style={sx("position: absolute; inset: -12%; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.07); animation: ae-orbit 90s linear infinite")} />
          {SEGS.map((s, i) => (
            <div key={i} className="cin-seg" style={sx(s)} />
          ))}
          <div className="cin-p2" style={sx("position: absolute; inset: 17%; border-radius: 50%; background: repeating-conic-gradient(rgba(255,255,255,0.22) 0deg 0.8deg, rgba(0,0,0,0) 0.8deg 6deg); -webkit-mask-image: radial-gradient(closest-side, rgba(0,0,0,0) 90%, #000 91%, #000 99%, rgba(0,0,0,0) 100%); mask-image: radial-gradient(closest-side, rgba(0,0,0,0) 90%, #000 91%, #000 99%, rgba(0,0,0,0) 100%); animation: ae-orbit 60s linear infinite")} />
          <div className="cin-lock" style={sx("position: absolute; inset: -4%; border-radius: 50%; box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 50%, transparent), 0 0 90px color-mix(in srgb, var(--accent) 35%, transparent), inset 0 0 90px color-mix(in srgb, var(--accent) 22%, transparent)")} />
          <div className="cin-p4" style={sx("position: absolute; inset: 27%; border-radius: 50%; animation: ae-orbit 26s linear infinite")}>
            <span style={sx(ORBIT_ANCHOR + "left: 50%; top: 0")}><span className="ae-glass" style={sx(ORBIT_PILL)}>TSLA</span></span>
            <span style={sx(ORBIT_ANCHOR + "left: 100%; top: 50%")}><span className="ae-glass" style={sx(ORBIT_PILL)}>NVDA</span></span>
            <span style={sx(ORBIT_ANCHOR + "left: 50%; top: 100%")}><span className="ae-glass" style={sx(ORBIT_PILL + "; color: #6FB8FF")}>ETH</span></span>
            <span style={sx(ORBIT_ANCHOR + "left: 0; top: 50%")}><span className="ae-glass" style={sx(ORBIT_PILL + "; color: #B4A6FF")}>USDG</span></span>
          </div>
          <div className="cin-p3" style={sx("position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; text-align: center")}>
            <span style={sx("font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase; color: #85939A")}>Owner</span>
            <span style={sx("font-size: clamp(64px, 9vw, 128px); font-weight: 500; letter-spacing: -0.06em; line-height: 1; text-shadow: 0 0 40px color-mix(in srgb, var(--accent) 40%, transparent)")}>You</span>
            <span style={sx("font-size: 12px; color: #5B686D; font-family: ui-monospace, SFMono-Regular, Menlo, monospace")}>vault 0x7a…c3</span>
          </div>
        </div>

        <div className="cin-t2" style={sx(CAP_BL)}>
          <span style={sx(EYEBROW)}>01 · Your vault</span>
          <h2 style={sx(H2)}>Your vault.<br /><span style={{ color: A }}>Nobody else&apos;s.</span></h2>
          <p style={sx(CAPTION_P)}>One vault contract per user. No pooled funds.</p>
        </div>
        <div className="cin-p4" style={sx("position: absolute; right: clamp(24px, 5vw, 72px); bottom: clamp(40px, 7vh, 72px); display: flex; flex-direction: column; gap: 10px; min-width: 240px; font-size: 13px")}>
          <div style={fact}><span style={{ color: "#85939A" }}>Pooled with others</span><span>None</span></div>
          <div style={fact}><span style={{ color: "#85939A" }}>Central agent keys</span><span>None</span></div>
          <div style={sx("display: flex; justify-content: space-between; gap: 24px")}><span style={{ color: "#85939A" }}>Withdraw</span><span style={{ color: A }}>Anytime</span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCENE 02 · YIELD ---------------- */
const STREAMS = [
  "M -20 120 C 420 120, 720 380, 1060 398",
  "M -20 270 C 440 270, 740 395, 1060 403",
  "M -20 420 C 440 420, 740 412, 1060 408",
  "M -20 570 C 420 570, 720 430, 1060 413",
  "M -20 720 C 400 720, 700 450, 1060 418",
];
const DOT_SPEEDS = ["1.1s", "0.9s", "1.25s", "1s", "1.35s"];
const RETURN = "M 1050 470 C 860 640, 560 760, 160 800";
const LABEL = "position: absolute; display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 14px; border-radius: 999px; font-size: 13px;";

export function SceneYield() {
  return (
    <section className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2.2)")}>
      <div className="cin-frame cin-full" style={sx(FRAME)}>
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" style={sx("position: absolute; inset: 0; width: 100%; height: 100%")} aria-hidden="true">
          <defs>
            <radialGradient id="aera-pool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4F1FF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#B4A6FF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#2EE6D6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2EE6D6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="aera-grow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#B4A6FF" />
              <stop offset="60%" stopColor="#2EE6D6" />
              <stop offset="100%" stopColor="#DFFFFB" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="#B4A6FF" strokeOpacity="0.22" strokeWidth="1.5">
            {STREAMS.map((d) => <path key={d} className="cin-d1" pathLength={1} strokeDasharray="1" d={d} />)}
          </g>
          <g className="cin-dfade" fill="none" stroke="#C9BEFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 26">
            {STREAMS.map((d, i) => <path key={d} d={d} style={{ animation: `cin-dots ${DOT_SPEEDS[i]} linear infinite` }} />)}
          </g>
          <g className="cin-d2-wrap">
            <path className="cin-d2" pathLength={1} strokeDasharray="1" d={RETURN} fill="none" stroke="#2EE6D6" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d={RETURN} fill="none" stroke="#2EE6D6" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 34" style={{ animation: "cin-dots-rev 1.6s linear infinite" }} />
          </g>
          <circle className="cin-pool" cx="1080" cy="410" r="170" fill="url(#aera-pool)" />
          <circle className="cin-pool" cx="1080" cy="410" r="96" fill="none" stroke="#2EE6D6" strokeOpacity="0.45" />
          <circle cx="1080" cy="410" r="96" fill="none" stroke="#2EE6D6" strokeOpacity="0.7" strokeDasharray="4 10" style={sx("transform-box: fill-box; transform-origin: center; animation: ae-orbit 20s linear infinite")} />
          <path className="cin-d3" pathLength={1} strokeDasharray="1" d="M 1080 410 C 1180 404, 1270 300, 1470 50" fill="none" stroke="url(#aera-grow)" strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 8px rgba(46,230,214,0.7))" }} />
        </svg>

        <span className="ae-glass cin-p1" style={sx(LABEL + "left: clamp(24px, 5vw, 72px); top: 15%; color: #C9BEFF")}>
          <span style={sx("width: 7px; height: 7px; border-radius: 50%; background: #B4A6FF; box-shadow: 0 0 8px #B4A6FF")} />
          Idle USDG
        </span>
        <span className="ae-glass cin-p2" style={sx(LABEL + "left: 72%; top: 62%; color: var(--accent)")}>On-chain yield</span>
        <span className="ae-glass cin-p3" style={sx("position: absolute; left: 36%; top: 84%; display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12px; color: #85939A")}>Pulled back when a rebalance needs it</span>
        <span className="cin-p4" style={sx("position: absolute; right: clamp(24px, 5vw, 72px); top: 13%; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); text-shadow: 0 0 14px color-mix(in srgb, var(--accent) 60%, transparent)")}>Earning</span>

        <div aria-hidden="true" style={sx("position: absolute; right: 0; bottom: 0; width: 60%; height: 50%; background: radial-gradient(80% 90% at 100% 100%, rgba(4,7,10,0.9), rgba(4,7,10,0) 70%); pointer-events: none")} />
        <div className="cin-t2" style={sx("position: absolute; right: clamp(24px, 5vw, 72px); bottom: clamp(40px, 7vh, 72px); max-width: 400px; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; text-align: right")}>
          <span style={sx(EYEBROW)}>02 · Yield</span>
          <h2 style={sx(H2)}>Idle cash<br /><span style={{ color: A }}>never sits idle.</span></h2>
          <p style={sx(CAPTION_P)}>Spare USDG earns on-chain until your vault needs it.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCENE 03 · DRIFT ---------------- */
const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
);

export function SceneDrift() {
  return (
    <section className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2.4)")}>
      <div className="cin-frame cin-full" style={sx(FRAME)}>
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" style={sx("position: absolute; inset: 0; width: 100%; height: 100%")} aria-hidden="true">
          <defs>
            <linearGradient id="aera-drift" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0" stopColor="#2EE6D6" />
              <stop offset="0.565" stopColor="#2EE6D6" />
              <stop offset="0.6" stopColor="#FF5A6A" />
              <stop offset="0.685" stopColor="#FF5A6A" />
              <stop offset="0.7" stopColor="#2EE6D6" />
              <stop offset="1" stopColor="#2EE6D6" />
            </linearGradient>
            <linearGradient id="aera-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2EE6D6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#2EE6D6" stopOpacity="0.09" />
              <stop offset="1" stopColor="#2EE6D6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="#FFFFFF" strokeOpacity="0.04">
            {[160, 400, 640, 880, 1120, 1360].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="800" />)}
          </g>
          <rect x="0" y="330" width="1440" height="140" fill="url(#aera-band)" />
          <line x1="0" y1="345" x2="1440" y2="345" stroke="#2EE6D6" strokeOpacity="0.18" />
          <line x1="0" y1="455" x2="1440" y2="455" stroke="#2EE6D6" strokeOpacity="0.18" />
          <line x1="0" y1="400" x2="1440" y2="400" stroke="#2EE6D6" strokeOpacity="0.4" strokeDasharray="4 8" style={{ animation: "ae-flow 1.2s linear infinite" }} />
          <g fill="none" strokeWidth="1.5" strokeOpacity="0.28">
            <path className="cin-dd0" pathLength={1} strokeDasharray="1" stroke="#6FB8FF" d="M -20 380 C 200 372, 360 392, 560 384 S 900 372, 1100 386 S 1360 380, 1460 382" />
            <path className="cin-dd0" pathLength={1} strokeDasharray="1" stroke="#B4A6FF" d="M -20 425 C 220 432, 420 418, 640 428 S 980 436, 1180 422 S 1380 428, 1460 426" />
            <path className="cin-dd0" pathLength={1} strokeDasharray="1" stroke="#7FF2E8" d="M -20 410 C 180 402, 380 420, 600 412 S 940 404, 1160 414 S 1400 408, 1460 410" />
          </g>
          <path className="cin-dd1" pathLength={1} strokeDasharray="1" d="M -20 400 C 120 390, 220 410, 330 400 S 520 380, 620 405 S 760 440, 840 470 C 900 495, 940 540, 980 560 C 986 520, 992 430, 1004 402 C 1100 394, 1250 406, 1460 400" fill="none" stroke="url(#aera-drift)" strokeWidth="4" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 10px rgba(46,230,214,0.55))" }} />
          <line className="cin-ddr" x1="992" y1="150" x2="992" y2="700" stroke="#E6EEEC" strokeOpacity="0.3" strokeDasharray="3 6" />
          <circle className="cin-ddx" cx="980" cy="560" r="10" fill="#FF5A6A" style={{ filter: "drop-shadow(0 0 12px #FF5A6A)" }} />
          <circle className="cin-ddx" cx="980" cy="560" r="26" fill="none" stroke="#FF5A6A" strokeOpacity="0.6" style={sx("transform-box: fill-box; transform-origin: center; animation: cin-ping 1.6s ease-out infinite")} />
          <circle className="cin-ddok" cx="1004" cy="402" r="10" fill="#2EE6D6" style={{ filter: "drop-shadow(0 0 14px #2EE6D6)" }} />
        </svg>

        <span className="ae-glass cin-ddx" style={sx(LABEL + "left: 62%; top: 74%; color: #FF7A88; border-color: rgba(255,122,136,0.45)")}>Out of band · 31%</span>
        <span className="ae-glass cin-ddok" style={sx(LABEL + "left: 74%; top: 38%; color: var(--accent); border-color: color-mix(in srgb, var(--accent) 45%, transparent)")}>{CHECK}Rebalanced · 25%</span>
        <span style={sx("position: absolute; left: clamp(24px, 5vw, 72px); top: 36%; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Target band ±3%</span>

        <div style={sx("position: absolute; right: clamp(24px, 5vw, 72px); top: 15%; display: flex; flex-direction: column; align-items: flex-end; gap: 4px")}>
          <span style={sx(EYEBROW)}>TSLA weight</span>
          <span style={sx("position: relative; display: block; height: clamp(64px, 8vw, 112px); min-width: 3ch; font-size: clamp(64px, 8vw, 112px); font-weight: 500; letter-spacing: -0.06em; line-height: 1")}>
            <span className="cin-ddnum-bad" style={sx("position: absolute; right: 0; top: 0; color: #FF5A6A; opacity: 0; text-shadow: 0 0 30px rgba(255,90,106,0.5)")}>31%</span>
            <span className="cin-ddnum-ok" style={sx("position: absolute; right: 0; top: 0; color: var(--accent); text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 50%, transparent)")}>25%</span>
          </span>
          <span style={sx("font-size: 12px; color: #5B686D")}>Sample vault</span>
        </div>

        <div className="cin-t2" style={sx(CAP_BL)}>
          <span style={sx(EYEBROW)}>03 · Drift</span>
          <h2 style={sx(H2)}>Drift gets caught.<br /><span style={{ color: A }}>Then fixed.</span></h2>
          <p style={sx(CAPTION_P)}>Slip out of your band and Aera pulls it back.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCENE 04 · GUARDRAILS ---------------- */
const LANE_DEFS = [
  ["Sell 40% of vault", "rej", "Rejected · over the 10% max trade", "#FF7A88", 0.7],
  ["Buy an unlisted token", "rej", "Rejected · not on your asset list", "#FF7A88", 0.7],
  ["Rebalance again", "hold", "Held · cooldown, 2h left", "#FFBA5C", 0.8],
  ["TSLA 31% → 25%", "pass", "Passed · within every rule", "#2EE6D6", 0.55],
] as const;
const tl = (a: number, b: number) =>
  " animation-timing-function: linear; animation-fill-mode: both; animation-timeline: --scene; animation-range: contain " + a.toFixed(1) + "% contain " + b.toFixed(1) + "%;";
const LANES = LANE_DEFS.map(([trade, kind, result, col, imp], i) => {
  const top = 22 + i * 13, a = 4 + i * 14, b = a + 30, hit = a + (b - a) * imp;
  return {
    trade, result,
    mover: "position: absolute; right: calc(45% + 14px); top: " + top + "%; transform-origin: right center; animation-name: cin-mv-" + kind + ";" + tl(a, b),
    pill: "display: inline-flex; align-items: center; height: 48px; padding: 0 20px; border-radius: 999px; font-size: 15px; font-weight: 500; white-space: nowrap; color: #E6EEEC; background: linear-gradient(160deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); animation-name: cin-c-" + kind + ";" + tl(a, b),
    tag: "position: absolute; top: calc(" + top + "% + 56px); " + (kind === "pass" ? "left: calc(55% + 18px);" : "right: calc(45% + 18px);") + " font-size: 12px; letter-spacing: 0.04em; white-space: nowrap; color: " + col + "; animation-name: cin-pop;" + tl(hit, hit + 6),
    ripple: "position: absolute; left: 55%; top: calc(" + top + "% + 24px); width: 90px; height: 90px; margin: -45px 0 0 -45px; border-radius: 50%; border: 2px solid " + col + "; box-shadow: 0 0 24px " + col + "; opacity: 0; pointer-events: none; animation-name: cin-ripple;" + tl(hit - 1, hit + 7),
  };
});

export function SceneGuardrails() {
  return (
    <section id="guardrails" className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2.6)")}>
      <div className="cin-frame cin-full" style={sx(FRAME)}>
        <div aria-hidden="true" style={sx("position: absolute; top: 0; bottom: 0; left: calc(55% - 220px); width: 440px; background: radial-gradient(50% 60% at 50% 50%, color-mix(in srgb, var(--accent) 12%, transparent), rgba(0,0,0,0) 70%), repeating-linear-gradient(60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 22px), repeating-linear-gradient(-60deg, rgba(46,230,214,0.05) 0 1px, rgba(0,0,0,0) 1px 22px); -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0)); mask-image: linear-gradient(90deg, rgba(0,0,0,0), #000 40%, #000 60%, rgba(0,0,0,0)); pointer-events: none")} />
        <div aria-hidden="true" style={sx("position: absolute; left: 55%; top: 8%; bottom: 8%; width: 2px; margin-left: -1px; background: linear-gradient(180deg, rgba(0,0,0,0), #DFFFFB 18%, var(--accent) 50%, #DFFFFB 82%, rgba(0,0,0,0)); box-shadow: 0 0 24px var(--accent), 0 0 80px color-mix(in srgb, var(--accent) 45%, transparent); overflow: hidden")}>
          <span style={sx("position: absolute; left: 0; width: 2px; height: 140px; background: linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0)); animation: cin-shimmer 2.6s linear infinite")} />
        </div>
        <span aria-hidden="true" style={sx("position: absolute; left: 55%; top: calc(8% - 34px); transform: translateX(-50%); display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); white-space: nowrap")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Your vault&apos;s rules
        </span>

        {LANES.map((l) => (
          <div key={l.trade} style={{ display: "contents" }}>
            <div aria-hidden="true" style={sx(l.ripple)} />
            <div style={sx(l.mover)}><span style={sx(l.pill)}>{l.trade}</span></div>
            <span style={sx(l.tag)}>{l.result}</span>
          </div>
        ))}

        <div className="cin-t2" style={sx(CAP_BL)}>
          <span style={sx(EYEBROW)}>04 · Guardrails</span>
          <h2 style={sx(H2)}>Rules the agent<br /><span style={{ color: A }}>can&apos;t break.</span></h2>
          <p style={sx(CAPTION_P)}>Enforced by your vault contract, not by an app.</p>
        </div>
      </div>
    </section>
  );
}
