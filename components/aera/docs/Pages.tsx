import Link from "next/link";
import { sx } from "../sx";
import { TITLES, TOCS, anchor, href, type DocId } from "./data";
import { MobileSearchField, MobileToc } from "./Toc";

const H2 = "margin: 8px 0 0; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; scroll-margin-top: 24px";
const P = "margin: 0; font-size: 15px; line-height: 1.7; color: #AEBBBA";
const OL = "margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 10px; font-size: 15px; line-height: 1.65; color: #AEBBBA";
const CRUMB = "font-size: 13px; color: #5B686D";
const H1 = "margin: 0; font-size: 40px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.06";
const LEAD = "margin: 0; font-size: 17px; line-height: 1.6; color: #AEBBBA";
const PAGER = "padding: 16px 18px; border-radius: 16px; border: 1px solid #1A2326; text-decoration: none; display: flex; flex-direction: column; gap: 4px";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function H({ children }: { children: string }) {
  return <h2 id={anchor(children)} style={sx(H2)}>{children}</h2>;
}
function Pager({ to, label, title, right }: { to: string; label: string; title: string; right?: boolean }) {
  return (
    <Link href={to} style={sx(PAGER + (right ? "; text-align: right" : ""))}>
      <span style={sx("font-size: 12px; color: #5B686D")}>{label}</span>
      <b style={sx("font-size: 15px; font-weight: 600; color: #E6EEEC")}>{title}</b>
    </Link>
  );
}

/* ---------------- HOME ---------------- */
const TILES: [string, string, string, string, DocId][] = [
  ["01", "Getting started", "Create a vault, deposit and set your first targets.", "Create your vault", "vault"],
  ["02", "Core concepts", "Vaults, drift bands, idle yield, guardrails and autonomy.", "Read guardrails", "guard"],
  ["03", "Agent & MCP", "How the agent proposes trades and how you sign them.", "Talking to the agent", "agent"],
  ["04", "Contracts & security", "The vault contract, rule parameters and audits.", "Vault contract", "contract"],
];
const QUICK: [string, string, string][] = [
  ["01", "Connect a wallet", "Any wallet that works on Robinhood Chain."],
  ["02", "Create your vault", "One transaction deploys a vault that only you own."],
  ["03", "Set targets and rules", "Pick weights, a drift band and your guardrails."],
  ["04", "Choose autonomy", "Suggest, Approve or Autopilot. Change it any time."],
];

const QUICK_TO: DocId[] = ["home", "vault", "targets", "autonomy"];

function MobileHome() {
  return (
    <div className="mo-only" style={sx("display: flex; flex-direction: column; gap: 22px")}>
      <div id="start-here" style={sx("display: flex; flex-direction: column; gap: 12px")}>
        <h1 style={sx("margin: 0; font-size: 38px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.04")}>Aera <span style={{ color: "var(--accent)" }}>Docs</span></h1>
        <p style={sx("margin: 0; font-size: 15px; line-height: 1.6; color: #AEBBBA")}>Everything about your vault, the agent that manages it and the rules it can&apos;t break.</p>
      </div>
      <MobileSearchField />
      <div style={sx("display: flex; flex-direction: column")}>
        <h2 id="quick-start" style={sx("margin: 0 0 6px; font-size: 18px; font-weight: 600; letter-spacing: -0.02em")}>Quick start</h2>
        {QUICK.map(([n, t, d], i) => (
          <Link key={n} href={href(QUICK_TO[i])} style={sx("min-height: 64px; display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid #121A1D; text-decoration: none; color: #E6EEEC")}>
            <span style={sx("width: 22px; font-family: ui-monospace, Menlo, monospace; font-size: 12px; color: var(--accent)")}>{n}</span>
            <span style={sx("flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px")}>
              <b style={sx("font-size: 15px; font-weight: 600")}>{t}</b>
              <span style={sx("font-size: 13px; color: #85939A")}>{d}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B686D" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </Link>
        ))}
      </div>
      <div id="sections" style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px")}>
        {TILES.map(([n, title, , cta, page]) => (
          <Link key={n} href={href(page)} className="dx-tile" style={sx("border-radius: 16px; border: 1px solid #1A2326; background: #080C0F; padding: 14px; display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: #E6EEEC")}>
            <span style={sx("width: 30px; height: 30px; border-radius: 9px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600")}>{n}</span>
            <b style={sx("font-size: 14px; font-weight: 600; line-height: 1.25")}>{title}</b>
            <span style={sx("font-size: 12px; color: var(--accent)")}>{cta} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DocsHome() {
  return (
    <>
    <MobileHome />
    <div className="desk-only" style={sx("display: flex; flex-direction: column; gap: 30px")}>
      <div style={sx("display: flex; flex-direction: column; gap: 16px")}>
        <span className="aera-mark" aria-hidden="true" style={sx("width: 48px; height: 48px; background: var(--accent); animation: dx-breathe 4s ease-in-out infinite")} />
        <h1 style={sx("margin: 0; font-size: 46px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.04")}>Aera Docs</h1>
        <p style={sx("margin: 0; font-size: 17px; line-height: 1.6; color: #AEBBBA; max-width: 560px")}>Everything about your vault, the agent that manages it and the rules it can&apos;t break.</p>
      </div>
      <div className="dx-tiles" style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px")}>
        {TILES.map(([n, title, desc, cta, page]) => (
          <Link key={n} href={href(page)} className="dx-tile" style={sx("border-radius: 20px; border: 1px solid #1A2326; background: #080C0F; padding: 20px; display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: #E6EEEC; transition: border-color .2s")}>
            <span style={sx("width: 36px; height: 36px; border-radius: 11px; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600")}>{n}</span>
            <b style={sx("font-size: 17px; font-weight: 600")}>{title}</b>
            <span style={sx("font-size: 14px; line-height: 1.55; color: #85939A")}>{desc}</span>
            <span style={sx("font-size: 13px; color: var(--accent)")}>{cta} →</span>
          </Link>
        ))}
      </div>
      <div style={sx("display: flex; flex-direction: column; gap: 14px")}>
        <h2 style={sx("margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em")}>Quick start</h2>
        <div style={sx("display: flex; flex-direction: column; border-top: 1px solid #121A1D")}>
          {QUICK.map(([n, t, d]) => (
            <div key={n} className="dx-quick" style={sx("display: flex; gap: 16px; align-items: baseline; padding: 16px 0; border-bottom: 1px solid #121A1D")}>
              <span style={sx("width: 24px; font-size: 13px; color: #5B686D")}>{n}</span>
              <b style={sx("width: 180px; font-size: 15px; font-weight: 600")}>{t}</b>
              <span style={sx("flex: 1; font-size: 14px; color: #85939A")}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

/* ---------------- CREATE YOUR VAULT ---------------- */
export function DocsVault() {
  return (
    <div style={sx("display: flex; flex-direction: column; gap: 26px")}>
      <div style={sx("display: flex; flex-direction: column; gap: 12px")}>
        <span style={sx(CRUMB)}>Getting started <span style={{ color: "#263034" }}>/</span> Create your vault</span>
        <h1 className="dx-h1" style={sx(H1)}>Create your vault</h1>
        <p className="dx-lead" style={sx(LEAD)}>Each Aera user gets their own vault contract. Creating it takes one transaction, and from then on only your wallet can withdraw or change its rules.</p>
      </div>
      <MobileToc toc={TOCS.vault} />
      <div style={sx("display: flex; gap: 12px; padding: 16px 18px; border-radius: 16px; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); background: color-mix(in srgb, var(--accent) 6%, transparent)")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EE6D6" strokeWidth="2" aria-hidden="true" style={sx("flex: none; margin-top: 2px")}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /></svg>
        <span style={sx("font-size: 14px; line-height: 1.55; color: #AEBBBA")}><b style={sx("color: #E6EEEC; font-weight: 600")}>Your vault, your keys.</b> Aera never pools deposits. The agent can only call the rebalance function, and only inside the rules you set.</span>
      </div>
      <H>Before you start</H>
      <p style={sx(P)}>You need a wallet on Robinhood Chain and some gas. Deposits start with WETH and USDG; tokenized stocks are bought into the vault once your targets are set.</p>
      <H>Create the vault</H>
      <ol style={sx(OL)}>
        <li>Open the app and select <b style={sx("color: #E6EEEC; font-weight: 600")}>Create vault</b>.</li>
        <li>Pick the assets your vault may hold. This becomes your allowlist.</li>
        <li>Confirm the transaction. The factory deploys a vault owned by your address.</li>
      </ol>
      <div style={sx("border-radius: 16px; border: 1px solid #1A2326; background: #070B0E; overflow: hidden")}>
        <div style={sx("display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #121A1D; font-size: 12px; color: #5B686D")}><span>createVault.ts</span><span>illustrative</span></div>
        <pre style={sx(`margin: 0; padding: 16px 18px; font-family: ${MONO}; font-size: 13px; line-height: 1.75; color: #AEBBBA; overflow-x: auto`)}>
          {"const vault = await factory.createVault({\n  assets:   [TSLA, NVDA, WETH, USDG],\n  targets:  [2500, 2500, 3000, 2000], "}
          <span style={{ color: "#5B686D" }}>{"// basis points"}</span>
          {"\n  band:     300,                      "}
          <span style={{ color: "#5B686D" }}>{"// ±3%"}</span>
          {"\n  autonomy: "}
          <span style={{ color: "#2EE6D6" }}>Autonomy.Approve</span>
          {",\n});"}
        </pre>
      </div>
      <H>Deposit</H>
      <p style={sx(P)}>Send WETH or USDG to the vault. Anything not yet allocated is treated as idle cash and routed to on-chain yield until a rebalance needs it.</p>
      <H>Next steps</H>
      <div style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px")}>
        <Pager to={href("guard")} label="Next" title="Guardrails →" />
        <Pager to={href("home")} label="Back" title="← Docs home" />
      </div>
    </div>
  );
}

/* ---------------- GUARDRAILS ---------------- */
const PARAMS: [string, string, string][] = [
  ["maxTradeBps", "1000", "Largest single trade, as a share of vault value."],
  ["allowlist", "4 assets", "The only assets the vault may buy or hold."],
  ["maxSlippageBps", "50", "Worst price impact accepted on a swap."],
  ["cooldown", "2h", "Minimum time between two rebalances."],
  ["withdraw", "owner", "Only the vault owner can withdraw, at any time."],
];
const GRID = "display: grid; grid-template-columns: 170px 110px minmax(0, 1fr);";

export function DocsGuard() {
  return (
    <div style={sx("display: flex; flex-direction: column; gap: 26px")}>
      <div style={sx("display: flex; flex-direction: column; gap: 12px")}>
        <span style={sx(CRUMB)}>Core concepts <span style={{ color: "#263034" }}>/</span> Guardrails</span>
        <h1 className="dx-h1" style={sx(H1)}>Guardrails</h1>
        <p className="dx-lead" style={sx(LEAD)}>Guardrails are the rules stored in your vault contract. Every action the agent proposes is checked against them on-chain. If a rule fails, the transaction reverts.</p>
      </div>

      <MobileToc toc={TOCS.guard} />
      {/* animated diagram */}
      <div aria-hidden="true" className="dx-diagram" style={sx("position: relative; height: 230px; border-radius: 20px; border: 1px solid #1A2326; background: #070B0E; overflow: hidden")}>
        <div style={sx("position: absolute; left: 58%; top: 16px; bottom: 16px; width: 2px; margin-left: -1px; background: linear-gradient(180deg, rgba(0,0,0,0), #DFFFFB 20%, var(--accent) 50%, #DFFFFB 80%, rgba(0,0,0,0)); box-shadow: 0 0 18px var(--accent); overflow: hidden")}>
          <span style={sx("position: absolute; left: 0; width: 2px; height: 80px; background: linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0)); animation: dx-shimmer 2.4s linear infinite")} />
        </div>
        <span style={sx("position: absolute; left: 58%; top: 8px; transform: translateX(-50%); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: #070B0E; padding: 0 8px")}>Vault rules</span>
        <div style={sx("position: absolute; right: calc(42% + 10px); top: 46px; animation: dx-rej 6s cubic-bezier(.4,0,.2,1) infinite")}>
          <span style={sx("display: inline-flex; height: 36px; align-items: center; padding: 0 14px; border-radius: 999px; font-size: 13px; color: #FF7A88; border: 1px solid rgba(255,122,136,0.5); background: rgba(255,90,106,0.08); white-space: nowrap")}>Sell 40% of vault</span>
        </div>
        <div style={sx("position: absolute; left: 58%; top: 64px; width: 60px; height: 60px; margin: -30px 0 0 -30px; border-radius: 50%; border: 2px solid #FF5A6A; animation: dx-ripple 6s linear infinite")} />
        <div style={sx("position: absolute; right: calc(42% + 10px); top: 130px; animation: dx-pass 6s cubic-bezier(.4,0,.2,1) 3s infinite both")}>
          <span style={sx("display: inline-flex; height: 36px; align-items: center; padding: 0 14px; border-radius: 999px; font-size: 13px; color: var(--accent); border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent); background: color-mix(in srgb, var(--accent) 8%, transparent); white-space: nowrap")}>TSLA 31% → 25%</span>
        </div>
        <div style={sx("position: absolute; left: 58%; top: 148px; width: 60px; height: 60px; margin: -30px 0 0 -30px; border-radius: 50%; border: 2px solid var(--accent); animation: dx-ripple 6s linear 3s infinite both")} />
        <span style={sx("position: absolute; left: 16px; bottom: 12px; font-size: 12px; color: #5B686D")}>Rejected trades revert. Passing trades execute.</span>
      </div>

      <H>How checks work</H>
      <ol style={sx(OL)}>
        <li>The agent builds a rebalance proposal from your targets and current weights.</li>
        <li>In Suggest or Approve mode, you see it first. In Autopilot it is submitted directly.</li>
        <li>The vault checks every rule below inside the same transaction.</li>
        <li>Any failed rule reverts the whole trade. Nothing partial goes through.</li>
      </ol>

      <H>Rule parameters</H>
      <div className="dx-table" style={sx("border-radius: 16px; border: 1px solid #1A2326; overflow: hidden")}>
        <div className="dx-thead" style={sx(GRID + " padding: 12px 16px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #5B686D; background: #070B0E; border-bottom: 1px solid #121A1D")}>
          <span>Parameter</span><span>Example</span><span>What it does</span>
        </div>
        {PARAMS.map(([p, ex, d], i) => (
          <div key={p} className="dx-trow" style={sx(GRID + " padding: 14px 16px; font-size: 14px" + (i < PARAMS.length - 1 ? "; border-bottom: 1px solid #121A1D" : ""))}>
            <code style={sx("font-family: ui-monospace, Menlo, monospace; color: var(--accent)")}>{p}</code>
            <span>{ex}</span>
            <span style={{ color: "#AEBBBA" }}>{d}</span>
          </div>
        ))}
      </div>
      <span style={sx("font-size: 12px; color: #5B686D")}>Parameter names and values are illustrative until the contract docs are published.</span>

      <div style={sx("display: flex; gap: 12px; padding: 16px 18px; border-radius: 16px; border: 1px solid rgba(255,186,92,0.35); background: rgba(255,186,92,0.06)")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBA5C" strokeWidth="2" aria-hidden="true" style={sx("flex: none; margin-top: 2px")}><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17h.01" /></svg>
        <span style={sx("font-size: 14px; line-height: 1.55; color: #AEBBBA")}><b style={sx("color: #E6EEEC; font-weight: 600")}>Tight rules can block rebalances.</b> If your band is narrower than normal price moves, expect more held trades during volatile hours.</span>
      </div>

      <H>Changing rules</H>
      <p style={sx(P)}>Rules change through a transaction signed by the owner wallet. The agent has no permission to edit them, in any autonomy mode.</p>
      <div style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px")}>
        <Pager to={href("vault")} label="Previous" title="← Create your vault" />
        <Pager to={href("autonomy")} label="Next" title="Autonomy levels →" right />
      </div>
    </div>
  );
}

/* ---------------- STUB ---------------- */
export function DocsStub({ id }: { id: DocId }) {
  const [group, title] = TITLES[id];
  return (
    <div id="overview" style={sx("display: flex; flex-direction: column; gap: 14px")}>
      <span style={sx(CRUMB)}>{group} <span style={{ color: "#263034" }}>/</span> {title}</span>
      <h1 className="dx-h1" style={sx(H1)}>{title}</h1>
      <p style={sx("margin: 0; font-size: 16px; line-height: 1.6; color: #85939A")}>[CONTENT FOR THIS PAGE]</p>
    </div>
  );
}

