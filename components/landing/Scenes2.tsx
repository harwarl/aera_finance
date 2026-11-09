import Link from "next/link";
import { sx } from "@/components/aera/sx";
import { LaunchApp } from "@/components/aera/LaunchApp";

const A = "var(--accent)";
const CAM = "position: relative; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 26px; text-align: center";
const KICKER = "font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #85939A";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ---------------- SCENE 06 · AGENT ---------------- */
const OK_CHIP = "font-size: 12px; padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent)";

export function SceneAgent() {
  return (
    <section id="agent" className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2)")}>
      <div className="cin-frame" style={sx("position: sticky; top: 0; height: var(--f); overflow: hidden; display: flex; align-items: center")}>
        <span aria-hidden="true" className="cin-num cin-par" style={sx("position: absolute; left: 50%; top: 4%; transform: translateX(-50%); margin-left: -0.3em")}>06</span>
        <div aria-hidden="true" style={sx("position: absolute; top: 50%; left: 50%; width: 520px; height: 520px; margin: -300px 0 0 -260px; pointer-events: none")}>
          <div className="cin-bloom" style={sx("width: 100%; height: 100%")}>
            <div style={sx("width: 100%; height: 100%; border-radius: 58% 42% 46% 54% / 52% 60% 40% 48%; background: radial-gradient(circle at 35% 35%, var(--accent), #6FB8FF 45%, #B4A6FF 75%, rgba(0,0,0,0)); opacity: 0.28; animation: ae-orb 18s linear infinite, ae-hue 14s linear infinite")} />
          </div>
        </div>
        <div className="cin-cam" style={sx(CAM)}>
          <span className="cin-t1" style={sx(KICKER)}>06 · Agent</span>
          <h2 className="cin-t2" style={sx("margin: 0; font-size: clamp(38px, 5vw, 64px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
            Ask in<br /><span style={{ color: A }}>plain words.</span>
          </h2>
          <p className="cin-t3" style={sx("margin: 0; max-width: 520px; font-size: 17px; line-height: 1.6; color: #AEBBBA")}>
            Tell the Aera agent what you want. It reads your vault, checks your rules and prepares the rebalance. Your wallet signs.
          </p>
          <div style={sx("width: 100%; max-width: 620px; display: flex; flex-direction: column; gap: 14px; text-align: left")}>
            <div className="ae-glass cin-p1" style={sx("border-radius: 45px; padding: 10px 10px 10px 24px; display: flex; align-items: center; gap: 12px")}>
              <span style={sx("flex: 1; min-width: 0; font-size: 16px; display: flex; align-items: center")}>
                <span className="cin-type" style={sx("display: inline-block; overflow: hidden; white-space: nowrap; max-width: 100%")}>Move 10% from NVDA into USDG yield.</span>
                <span aria-hidden="true" style={sx("width: 2px; height: 18px; margin-left: 2px; background: var(--accent); animation: ae-caret 1s steps(1) infinite")} />
              </span>
              <button type="button" aria-label="Send" style={sx("width: 42px; height: 42px; border: 0; border-radius: 50%; background: var(--accent); color: #04070A; display: inline-flex; align-items: center; justify-content: center")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            <div className="ae-glass cin-reply" style={sx("border-radius: 22px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; margin-right: 48px")}>
              <span style={sx("font-size: 12px; color: #85939A")}>Aera agent</span>
              <span style={sx("font-size: 15px; line-height: 1.55")}>Prepared a rebalance: NVDA 25% → 15%, USDG 20% → 30%, idle USDG routed to yield. Within your rules.</span>
              <div style={sx("display: flex; gap: 8px; flex-wrap: wrap")}>
                <span style={sx(OK_CHIP)}>Trade size OK</span>
                <span style={sx(OK_CHIP)}>Slippage OK</span>
                <span style={sx("font-size: 12px; padding: 5px 10px; border-radius: 999px; background: rgba(255,255,255,0.06); color: #AEBBBA")}>Waiting for your signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMING NEXT · FILM STRIP ---------------- */
const REEL_INNER = "width: 100%; max-width: 1160px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 56px; align-items: center";
const REEL_COPY = "flex: 1 1 380px; display: flex; flex-direction: column; gap: 16px";
const REEL_NUM = "font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D";
const REEL_TITLE = "font-size: clamp(32px, 4vw, 52px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.02";
const REEL_BODY = "max-width: 420px; font-size: 17px; line-height: 1.6; color: #AEBBBA";
const SOON = "align-self: flex-start; font-size: 12px; padding: 6px 14px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); color: var(--accent)";
const SPROCKETS = "position: absolute; left: 0; right: 0; height: 10px; background: repeating-linear-gradient(90deg, #121A1D 0 22px, rgba(0,0,0,0) 22px 40px);";
const PANE = "display: flex; flex-direction: column; gap: 10px";
const BAR = (parts: [string, number][]) => (
  <div style={sx("display: flex; gap: 3px; height: 8px")}>
    {parts.map(([c, f], i) => <span key={i} style={{ flex: f, background: c }} />)}
  </div>
);
const FOLLOW = "font-size: 13px; padding: 7px 14px; border-radius: 999px; background: #FFFFFF; color: #04070A; font-weight: 600";
const STRATS: [string, [string, number][]][] = [
  ["Balanced tech", [[A, 50], ["#6FB8FF", 25], ["#B4A6FF", 25]]],
  ["Stocks + yield", [[A, 60], ["#B4A6FF", 40]]],
  ["ETH-weighted", [[A, 20], ["#6FB8FF", 60], ["#B4A6FF", 20]]],
];

function Reel({ n, title, body, border, children }: { n: string; title: React.ReactNode; body: string; border?: boolean; children: React.ReactNode }) {
  return (
    <div className="cin-fr" style={border ? sx("border-right: 1px solid #1A2326") : undefined}>
      <div style={sx(REEL_INNER)}>
        <div style={sx(REEL_COPY)}>
          <span style={sx(REEL_NUM)}>Reel {n} / 03</span>
          <b style={sx(REEL_TITLE)}>{title}</b>
          <span style={sx(REEL_BODY)}>{body}</span>
          <span style={sx(SOON)}>Soon</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SceneComingNext() {
  return (
    <section className="cin-scene cin-stripwrap" style={sx("position: relative")}>
      <div className="cin-stripframe" style={sx("display: flex; flex-direction: column")}>
        <div style={sx("width: 100%; max-width: 1160px; margin: 0 auto; padding: 104px 24px 0; box-sizing: border-box; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap")}>
          <div style={sx("display: flex; flex-direction: column; gap: 14px")}>
            <span style={sx(KICKER)}>Coming next</span>
            <h2 style={sx("margin: 0; font-size: clamp(34px, 4vw, 52px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
              The vault is <span style={{ color: A }}>the start.</span>
            </h2>
          </div>
          <span style={sx("font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Three more reels</span>
        </div>

        <div className="cin-track">
          <div aria-hidden="true" style={sx(SPROCKETS + "top: 18px")} />
          <div aria-hidden="true" style={sx(SPROCKETS + "bottom: 18px")} />

          <Reel n="01" border title={<>Vault Infrastructure<br />as a Service</>} body="The same per-user vaults and guardrails, offered to other apps that want managed portfolios without building them.">
            <div aria-hidden="true" style={sx("flex: 1 1 420px; height: 340px; position: relative; perspective: 1200px")}>
              <div className="ae-glass" style={sx("position: absolute; left: 0; top: 0; width: 300px; padding: 18px; border-radius: 22px; transform: rotateY(-18deg) translateZ(-120px); opacity: 0.55; " + PANE)}>
                <span style={sx("font-size: 12px; color: #85939A")}>Vault · app A · user 0x1d…9b</span>
                {BAR([[A, 40], ["#6FB8FF", 35], ["#B4A6FF", 25]])}
                <span style={sx("font-size: 12px; color: var(--accent)")}>Guardrails on</span>
              </div>
              <div className="ae-glass" style={sx("position: absolute; left: 70px; top: 90px; width: 300px; padding: 18px; border-radius: 22px; transform: rotateY(-18deg) translateZ(-40px); opacity: 0.8; " + PANE)}>
                <span style={sx("font-size: 12px; color: #85939A")}>Vault · app B · user 0x8e…40</span>
                {BAR([[A, 25], ["#6FB8FF", 50], ["#B4A6FF", 25]])}
                <span style={sx("font-size: 12px; color: var(--accent)")}>Guardrails on</span>
              </div>
              <div className="ae-glass" style={sx("position: absolute; left: 140px; top: 180px; width: 320px; padding: 20px; border-radius: 22px; transform: rotateY(-18deg) translateZ(40px); border-color: color-mix(in srgb, var(--accent) 40%, transparent); box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 18%, transparent); " + PANE)}>
                <span style={sx("font-size: 12px; color: #AEBBBA")}>Vault · your app · user 0x7a…c3</span>
                {BAR([[A, 30], ["color-mix(in srgb, var(--accent) 60%, #04070A)", 25], ["#6FB8FF", 25], ["#B4A6FF", 20]])}
                <span style={sx("font-size: 12px; color: var(--accent)")}>Guardrails on · your brand</span>
              </div>
            </div>
          </Reel>

          <Reel n="02" border title="Market Signal API" body="The drift, risk and decision data the agent uses, available to developers as an API.">
            <div style={sx("flex: 1 1 420px; display: flex; flex-direction: column; gap: 8px")}>
              <div className="ae-glass" style={sx(`border-radius: 22px; padding: 22px 24px; font-family: ${MONO}; font-size: 14px; line-height: 1.75; white-space: pre; overflow-x: auto; color: #AEBBBA`)}>
                <span style={{ color: A }}>GET</span>{" /v1/signals/drift?vault=0x7a…c3\n"}
                <span style={{ color: "#5B686D" }}>────────────────────────────────</span>
                {"\n{\n  \"asset\":      "}<span style={{ color: "#E6EEEC" }}>&quot;TSLA&quot;</span>
                {",\n  \"weight\":     "}<span style={{ color: "#6FB8FF" }}>0.31</span>
                {",\n  \"target\":     "}<span style={{ color: "#6FB8FF" }}>0.25</span>
                {",\n  \"band\":       "}<span style={{ color: "#6FB8FF" }}>0.03</span>
                {",\n  \"signal\":     "}<span style={{ color: A }}>&quot;rebalance&quot;</span>
                {"\n}"}
              </div>
              <span style={sx("font-size: 12px; color: #5B686D")}>Illustrative request, final API may differ</span>
            </div>
          </Reel>

          <Reel n="03" title="Strategy Marketplace" body="Pick a published strategy, keep your own guardrails, and let your vault follow it.">
            <div style={sx("flex: 1 1 420px; display: flex; flex-direction: column; gap: 10px")}>
              {STRATS.map(([name, mix]) => (
                <div key={name} className="ae-glass" style={sx("border-radius: 20px; padding: 16px 18px; display: flex; align-items: center; gap: 16px")}>
                  <div style={sx("flex: 1; display: flex; flex-direction: column; gap: 8px")}>
                    <b style={sx("font-size: 15px; font-weight: 600")}>{name}</b>
                    <div style={sx("display: flex; gap: 3px; height: 6px")}>
                      {mix.map(([c, f], i) => <span key={i} style={{ flex: f, background: c }} />)}
                    </div>
                  </div>
                  <span style={sx(FOLLOW)}>Follow</span>
                </div>
              ))}
              <span style={sx("font-size: 12px; color: #5B686D")}>Sample strategies</span>
            </div>
          </Reel>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECURITY · X-RAY ---------------- */
const G_ITEM = "display: flex; flex-direction: column; gap: 6px";
const G_DESC = "font-size: 13px; line-height: 1.5; color: #85939A";
const ICON = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#2EE6D6", strokeWidth: 1.8, "aria-hidden": true } as const;
const CODE_ROW = "height: 54px; display: flex; align-items: center";
const UI_ROW = "height: 54px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.07)";
const RULES: [string, string][] = [
  ["Max trade size", "10% of vault"],
  ["Allowed assets", "TSLA, NVDA, ETH, USDG"],
  ["Max slippage", "0.5%"],
  ["Cooldown", "2 hours"],
];
const CODE = [
  "require(size <= nav * maxTradeBps / 1e4);",
  "require(allowlist[asset]);",
  "require(slippage <= maxSlippageBps);",
  "require(now >= lastMove + cooldown);",
  "withdraw() → onlyOwner, any time",
];

export function SceneSecurity() {
  return (
    <section id="security" className="cin-scene" style={sx("position: relative; height: calc(var(--f) * 2.2)")}>
      <div className="cin-frame" style={sx("position: sticky; top: 0; height: var(--f); overflow: hidden; display: flex; align-items: center")}>
        <div aria-hidden="true" style={sx("position: absolute; inset: 0; background-image: linear-gradient(rgba(46,230,214,0.035) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(46,230,214,0.035) 1px, rgba(0,0,0,0) 1px); background-size: 48px 48px; pointer-events: none")} />
        <div className="cin-cam" style={sx("position: relative; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 40px")}>
          <div style={sx("display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center")}>
            <span className="cin-t1" style={sx(KICKER)}>Security</span>
            <h2 className="cin-t2" style={sx("margin: 0; font-size: clamp(36px, 4.6vw, 60px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
              Look inside. <span style={{ color: A }}>Every rule is code.</span>
            </h2>
          </div>
          <div style={sx("width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 32px")}>
            <div style={sx("flex: 1 1 200px; max-width: 230px; display: flex; flex-direction: column; gap: 28px")}>
              <div className="cin-p1" style={sx(G_ITEM)}>
                <svg {...ICON}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                <b style={sx("font-size: 15px; font-weight: 600")}>Non-custodial</b>
                <span style={sx(G_DESC)}>Funds stay in a vault only you own.</span>
              </div>
              <div className="cin-p2" style={sx(G_ITEM)}>
                <svg {...ICON}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /></svg>
                <b style={sx("font-size: 15px; font-weight: 600")}>Guardrails on-chain</b>
                <span style={sx(G_DESC)}>Enforced by the contract, not a server.</span>
              </div>
            </div>

            <div style={sx("flex: 2 1 520px; max-width: 640px; position: relative; height: 380px")}>
              {/* x-ray layer */}
              <div className="cin-xr" style={sx(`position: absolute; inset: 0; clip-path: inset(0 0 50% 0); border-radius: 26px; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); background: linear-gradient(rgba(46,230,214,0.06) 1px, rgba(0,0,0,0) 1px) 0 0 / 100% 26px, #021210; box-shadow: inset 0 0 80px color-mix(in srgb, var(--accent) 10%, transparent); padding: 24px 28px; box-sizing: border-box; font-family: ${MONO}; color: var(--accent); text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent)`)}>
                <div style={sx("display: flex; justify-content: space-between; font-size: 12px; opacity: 0.7; height: 36px")}><span>AeraVault.sol · guardrails</span><span>illustrative</span></div>
                <div style={sx("display: flex; flex-direction: column; font-size: 14px")}>
                  {CODE.map((c) => <span key={c} style={sx(CODE_ROW)}>{c}</span>)}
                </div>
              </div>
              {/* friendly UI layer */}
              <div className="ae-glass cin-ui" style={sx("position: absolute; inset: 0; clip-path: inset(50% 0 0 0); border-radius: 26px; padding: 24px 28px; box-sizing: border-box")}>
                <div style={sx("display: flex; justify-content: space-between; font-size: 12px; color: #85939A; height: 36px")}><span>Your vault · rules</span><span style={{ color: A }}>Locked in contract</span></div>
                <div style={sx("display: flex; flex-direction: column; font-size: 15px")}>
                  {RULES.map(([k, v]) => (
                    <div key={k} style={sx(UI_ROW)}><span style={{ color: "#85939A" }}>{k}</span><span>{v}</span></div>
                  ))}
                  <div style={sx("height: 54px; display: flex; align-items: center; justify-content: space-between")}><span style={{ color: "#85939A" }}>Withdraw</span><span style={{ color: A }}>You, any time</span></div>
                </div>
              </div>
              {/* scan bar */}
              <div aria-hidden="true" className="cin-scanbar" style={sx("position: absolute; left: -36px; right: -36px; top: 50%; height: 0; pointer-events: none")}>
                <div style={sx("position: absolute; left: 0; right: 0; top: -1px; height: 2px; background: linear-gradient(90deg, rgba(0,0,0,0), #DFFFFB 20%, #DFFFFB 80%, rgba(0,0,0,0)); box-shadow: 0 0 18px var(--accent), 0 0 48px var(--accent)")} />
                <div style={sx("position: absolute; left: 0; right: 0; top: -60px; height: 60px; background: linear-gradient(180deg, rgba(0,0,0,0), color-mix(in srgb, var(--accent) 14%, transparent))")} />
              </div>
            </div>

            <div style={sx("flex: 1 1 200px; max-width: 230px; display: flex; flex-direction: column; gap: 28px")}>
              <div className="cin-p3" style={sx(G_ITEM)}>
                <svg {...ICON}><path d="M4 7l8-4 8 4-8 4z" /><path d="M4 12l8 4 8-4M4 17l8 4 8-4" /></svg>
                <b style={sx("font-size: 15px; font-weight: 600")}>Robinhood Chain</b>
                <span style={sx(G_DESC)}>Tokenized stocks and crypto on one L2.</span>
              </div>
              <div className="cin-p4" style={sx(G_ITEM)}>
                <svg {...ICON}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 14l2 2 4-4" /></svg>
                <b style={sx("font-size: 15px; font-weight: 600")}>Audit</b>
                <a href="#" style={sx("font-size: 13px; line-height: 1.5; text-decoration: none")}>[AUDIT REPORT LINK] →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMMUNITY · FEED WALL ---------------- */
const EV_TYPES = { r: A, y: "#B4A6FF", h: "#FFBA5C", x: "#FF5A6A", n: "#6FB8FF" } as const;
const EVENTS: [keyof typeof EV_TYPES, string, string][] = [
  ["r", "Vault rebalanced · TSLA 29 → 25", "0x3f…a1 · autopilot"],
  ["y", "Idle USDG routed to yield", "0x9c…02"],
  ["h", "Trade held · cooldown 1h 40m", "0x51…e7"],
  ["n", "New vault opened", "0x2b…f0"],
  ["r", "Rebalance approved · ETH 27 → 30", "0x7a…c3 · approve"],
  ["x", "Rejected · asset not on list", "0xd4…18"],
  ["y", "USDG pulled from yield for rebalance", "0x6e…bb"],
  ["n", "Autonomy set to Autopilot", "0x0c…5d"],
  ["r", "Vault rebalanced · NVDA 31 → 25", "0x88…3a · autopilot"],
  ["h", "Drift flagged · AAPL out of band", "0x41…9e"],
];
const FEED_COLS = [0, 1, 2, 3].map((c) => {
  const items = EVENTS.slice(c * 2).concat(EVENTS.slice(0, c * 2));
  return {
    items: items.concat(items),
    style: "display: flex; flex-direction: column; gap: 12px; padding-top: 12px; animation: " + (c % 2 ? "cin-feedr" : "cin-feed") + " " + (46 + c * 7) + "s linear infinite",
  };
});
const BTN_W = "height: 50px; padding: 0 26px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none; box-shadow: 0 0 40px rgba(255,255,255,0.18)";
const BTN_G = "height: 50px; padding: 0 26px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font-size: 16px; font-weight: 600; text-decoration: none";

export function Community() {
  return (
    <section style={sx("position: relative; height: max(760px, min(100vh, 900px)); overflow: hidden; display: flex; align-items: center; justify-content: center")}>
      <div aria-hidden="true" style={sx("position: absolute; inset: 0; padding: 0 16px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; opacity: 0.55; -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 18%, #000 82%, rgba(0,0,0,0)); mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 18%, #000 82%, rgba(0,0,0,0))")}>
        {FEED_COLS.map((col, c) => (
          <div key={c} style={sx("overflow: hidden; height: 100%")}>
            <div style={sx(col.style)}>
              {col.items.map(([k, t, m], i) => (
                <div key={i} style={sx("border-radius: 16px; border: 1px solid #1A2326; background: rgba(12,18,21,0.8); padding: 14px 16px; display: flex; flex-direction: column; gap: 6px")}>
                  <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 14px; color: #E6EEEC")}>
                    <span style={sx(`width: 7px; height: 7px; border-radius: 50%; flex: none; background: ${EV_TYPES[k]}; box-shadow: 0 0 8px ${EV_TYPES[k]}`)} />
                    {t}
                  </span>
                  <span style={sx("font-size: 12px; color: #5B686D")}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" style={sx("position: absolute; inset: 0; background: radial-gradient(42% 46% at 50% 50%, rgba(4,7,10,0.96), rgba(4,7,10,0.75) 55%, rgba(4,7,10,0.2) 100%)")} />
      <div className="ae-reveal" style={sx("position: relative; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; padding: 0 24px")}>
        <span style={sx(KICKER)}>Community</span>
        <h2 style={sx("margin: 0; font-size: clamp(38px, 5vw, 64px); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02")}>
          Build the vault<br /><span style={{ color: A }}>with us.</span>
        </h2>
        <p style={sx("margin: 0; max-width: 460px; font-size: 17px; line-height: 1.6; color: #AEBBBA")}>Updates, strategy talk and early access to what ships next.</p>
        <div style={sx("display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; padding-top: 4px")}>
          <a href="#" className="ae-btn-w" style={sx(BTN_W)}>Follow on X</a>
          <a href="#" className="ae-btn-g" style={sx(BTN_G)}>Join the Telegram</a>
        </div>
        <span style={sx("font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>Background: sample vault activity</span>
      </div>
    </section>
  );
}

/* ---------------- FOOTER · END CREDITS ---------------- */
const CREDIT_ROW = "display: grid; grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr); align-items: baseline";
const CREDIT_ROLE = "text-align: right; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #5B686D";
const CREDIT_NAMES = "text-align: left; font-size: 16px; display: flex; flex-wrap: wrap; gap: 4px 14px";

function Credit({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div className="ae-reveal" style={sx(CREDIT_ROW)}>
      <span style={sx(CREDIT_ROLE)}>{role}</span>
      <span />
      <span style={sx(CREDIT_NAMES)}>{children}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="cin-end" style={sx("position: relative; overflow: hidden; padding: 180px 24px 140px; background: linear-gradient(180deg, #04070A 0%, #010203 35%, #000000 100%)")}>
      <div aria-hidden="true" style={sx("position: absolute; left: 50%; top: 60px; width: 1000px; height: 420px; margin-left: -500px; background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--accent) 12%, transparent), rgba(0,0,0,0) 70%); pointer-events: none")} />
      <div style={sx("position: relative; max-width: 1160px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 96px; text-align: center")}>
        <div className="ae-reveal" style={sx("display: flex; flex-direction: column; align-items: center; gap: 28px")}>
          <span style={sx("font-size: clamp(42px, 6.4vw, 92px); font-weight: 500; letter-spacing: -0.045em; line-height: 1.0; text-shadow: -0.012em 0 rgba(255,70,90,0.3), 0.012em 0 rgba(70,140,255,0.3)")}>
            Stocks, crypto, yield.<br /><span style={{ color: A }}>One vault.</span>
          </span>
          <LaunchApp className="ae-btn-w" style={sx("height: 52px; padding: 0 30px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 16px; font-weight: 600; text-decoration: none; box-shadow: 0 0 48px rgba(255,255,255,0.2)")}>Launch app</LaunchApp>
        </div>

        <div className="cin-credit" style={sx("width: 100%; max-width: 620px; display: flex; flex-direction: column; gap: 22px")}>
          <Credit role="Product"><LaunchApp>Launch app</LaunchApp><a href="#how">How it works</a><Link href="/docs">Docs</Link></Credit>
          <Credit role="Community"><a href="#">X</a><a href="#">Telegram</a></Credit>
          <Credit role="Network">Robinhood Chain</Credit>
          <Credit role="Audit"><a href="#">[AUDITOR NAME]</a></Credit>
          <Credit role="Legal"><a href="#">Terms</a><a href="#">Privacy</a></Credit>
        </div>

        <div className="ae-reveal" style={sx("display: flex; flex-direction: column; align-items: center; gap: 14px")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 48px; height: 48px; background: var(--accent); filter: drop-shadow(0 0 18px color-mix(in srgb, var(--accent) 50%, transparent))")} />
          <b style={sx("font-size: 18px; font-weight: 600; letter-spacing: -0.01em")}>Aera Finance</b>
          <span style={sx("font-size: 12px; color: #5B686D")}>© 2026 Aera Finance · Agent-managed vaults on Robinhood Chain</span>
        </div>
      </div>
      <div aria-hidden="true" className="cin-close" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 7%; background: #000; transform-origin: top; transform: scaleY(0); pointer-events: none")} />
      <div aria-hidden="true" className="cin-close" style={sx("position: absolute; left: 0; right: 0; bottom: 0; height: 7%; background: #000; transform-origin: bottom; transform: scaleY(0); pointer-events: none")} />
    </footer>
  );
}
