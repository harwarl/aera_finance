"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSwitchChain, type Connector } from "wagmi";
import { robinhoodTestnet } from "@/config/wagmi";
import { saveVault, useVault } from "@/lib/vaultStore";
import { sx } from "./sx";

/* /connect · Layout C "Full-bleed vault ring" (design.md §8, animations.md §15).
   States 1–3 (connect, network) use the real wallet: RainbowKit's modal picks
   and connects it, wagmi reports status and switches the network. States 4–6
   (create, deploy, done) run on the spec's demo timing until a vault factory
   contract exists. TODO: replace runDeploy() with the factory call. */

type State = "pick" | "connecting" | "network" | "vault" | "deploying" | "done";
const TARGET = robinhoodTestnet;
const A = "var(--accent)";
const AMBER = "#FFBA5C";
const FONT = "var(--font-geist), Geist, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

// RainbowKit wallets carry their icon as a URL or a lazy loader; EIP-6963
// injected wallets expose it as connector.icon.
type RkConnector = Connector & { rkDetails?: { iconUrl?: string | (() => Promise<string>); iconBackground?: string } };
function useWalletIcon(c?: Connector) {
  const rk = (c as RkConnector | undefined)?.rkDetails;
  const direct = c?.icon ?? (typeof rk?.iconUrl === "string" ? rk.iconUrl : undefined);
  const [loaded, setLoaded] = useState<{ id: string; url: string } | null>(null);
  useEffect(() => {
    if (direct || !c || typeof rk?.iconUrl !== "function") return;
    let live = true;
    rk.iconUrl().then((url) => live && setLoaded({ id: c.uid, url })).catch(() => {});
    return () => { live = false; };
  }, [c, direct, rk]);
  return { url: direct ?? (loaded && c && loaded.id === c.uid ? loaded.url : undefined), bg: rk?.iconBackground };
}

const short = (a?: string) => (a ? `${a.slice(0, 4)}…${a.slice(-2)}` : "");
const LIT: Record<State, number> = { pick: 0, connecting: 3, network: 4, vault: 8, deploying: 11, done: 12 };
const DEPLOY_STEPS = (w: string) => [`Sign the request in ${w}`, "Deploy your vault contract", "Confirm on Robinhood Chain"];

/* ---------- small pieces ---------- */
function Spinner({ size = 18 }: { size?: number }) {
  return <span aria-hidden="true" style={sx(`width: ${size}px; height: ${size}px; flex: none; box-sizing: border-box; border-radius: 50%; border: 2px solid #1A2326; border-top-color: var(--accent); animation: cx-spin .9s linear infinite`)} />;
}
function Tile({ connector, name, size = 40 }: { connector?: Connector; name: string; size?: number }) {
  const icon = useWalletIcon(connector);
  const r = size * 0.3;
  if (icon.url)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon.url} alt="" aria-hidden="true" width={size} height={size} style={sx(`flex: none; border-radius: ${r}px; background: ${icon.bg ?? "#0A1013"}; border: 1px solid #1A2326; box-sizing: border-box`)} />;
  return (
    <span aria-hidden="true" style={sx(`width: ${size}px; height: ${size}px; flex: none; border-radius: ${r}px; display: flex; align-items: center; justify-content: center; font-size: ${size * 0.4}px; font-weight: 600; color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent)`)}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}
const BTN_W = `height: 50px; padding: 0 26px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 16px ${FONT}; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; white-space: nowrap`;
const BTN_G = `height: 50px; padding: 0 24px; border-radius: 999px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.22); color: #E6EEEC; font: 500 16px ${FONT}; cursor: pointer; display: inline-flex; align-items: center; text-decoration: none; white-space: nowrap`;
const EYEBROW = "font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase";
const BODY = "margin: 0; max-width: 460px; font-size: 17px; line-height: 1.6; color: #AEBBBA";

/* ---------- ring ---------- */
function Ring({ state }: { state: State }) {
  const lit = LIT[state];
  const amber = state === "network";
  const col = amber ? AMBER : A;
  const assembled = lit >= 8;
  const spinning = lit < 8;
  return (
    <svg viewBox="0 0 640 640" className="cx-ring" aria-hidden="true" style={sx("position: absolute; left: 66%; top: 50%; width: 640px; height: 640px; transform: translate(-50%, -50%); overflow: visible")}>
      <circle cx="320" cy="320" r="296" fill="none" stroke="#1A2326" strokeDasharray="2 8" />
      <g>
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const len = i % 5 === 0 ? 14 : 7;
          const r1 = 216, r2 = 216 - len;
          return <line key={i} x1={320 + r1 * Math.cos(a)} y1={320 + r1 * Math.sin(a)} x2={320 + r2 * Math.cos(a)} y2={320 + r2 * Math.sin(a)} stroke="#263034" strokeWidth={i % 5 === 0 ? 1.5 : 1} />;
        })}
      </g>
      <g style={sx("transform-origin: 320px 320px; animation: cx-spin 40s linear infinite; animation-play-state: " + (spinning ? "running" : "paused"))}>
        {Array.from({ length: 12 }, (_, i) => {
          const on = i < lit;
          const scale = assembled ? 1 : on ? 1.04 : 1.14;
          return (
            <g key={i} transform={`rotate(${i * 30 - 90} 320 320)`}>
              <circle
                cx="320"
                cy="320"
                r="250"
                fill="none"
                strokeWidth="34"
                strokeDasharray="122 1449"
                style={sx(
                  `transform-origin: 320px 320px; transform: scale(${scale}); stroke: ${on ? col : "#121A1D"}; opacity: ${on ? 1 : 0.7}; filter: ${on ? `drop-shadow(0 0 10px ${col})` : "none"}; ` +
                    `transition: stroke .6s ${i * 60}ms, opacity .6s ${i * 60}ms, filter .6s ${i * 60}ms, transform .9s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
                )}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- mobile ring (260px) ---------- */
const M_C = 2 * Math.PI * 100;
const M_DASH = `${(M_C / 12 - 3).toFixed(1)} ${(M_C - M_C / 12 + 3).toFixed(1)}`;
function MobileRing({ state }: { state: State }) {
  const lit = LIT[state];
  const col = state === "network" ? AMBER : A;
  const assembled = lit >= 8;
  return (
    <svg viewBox="0 0 260 260" width="260" height="260" aria-hidden="true" style={{ overflow: "visible" }}>
      <circle cx="130" cy="130" r="122" fill="none" stroke="#1A2326" strokeDasharray="2 6" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i * 6 * Math.PI) / 180, l = i % 5 === 0 ? 7 : 4;
        return <line key={i} x1={130 + 84 * Math.cos(a)} y1={130 + 84 * Math.sin(a)} x2={130 + (84 - l) * Math.cos(a)} y2={130 + (84 - l) * Math.sin(a)} stroke="#263034" />;
      })}
      <g style={sx("transform-origin: 130px 130px; animation: mo-spin 40s linear infinite; animation-play-state: " + (assembled ? "paused" : "running"))}>
        {Array.from({ length: 12 }, (_, i) => {
          const on = i < lit;
          const scale = assembled ? 1 : on ? 1.04 : 1.14;
          return (
            <g key={i} transform={`rotate(${i * 30 - 90} 130 130)`}>
              <circle
                cx="130" cy="130" r="100" fill="none" strokeWidth="22" strokeDasharray={M_DASH}
                style={sx(
                  `transform-origin: 130px 130px; transform: scale(${scale}); stroke: ${on ? col : "#121A1D"}; opacity: ${on ? 1 : 0.7}; filter: ${on ? `drop-shadow(0 0 8px ${col})` : "none"}; ` +
                    `transition: stroke .6s ${i * 60}ms, opacity .6s ${i * 60}ms, filter .6s ${i * 60}ms, transform .9s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
                )}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- page ---------- */
export function ConnectPage() {
  const { address, isConnected, status, chainId, chain, connector: active } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { switchChainAsync } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  // Where to go when done: only same-site /app paths (no open redirects).
  const nextParam = useSearchParams().get("next");
  const next = nextParam && /^\/app(\/|$)/.test(nextParam) ? nextParam : "/app";
  const vault = useVault(address);

  const [switching, setSwitching] = useState(false);
  const [phase, setPhase] = useState<"none" | "deploying" | "done">("none");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const walletName = active?.name ?? "your wallet";

  const state: State =
    isConnected && phase === "done" ? "done"
    : isConnected && phase === "deploying" ? "deploying"
    : status === "connecting" ? "connecting"
    : !isConnected ? "pick"
    : chainId !== TARGET.id ? "network"
    : "vault";

  // Skip rule (design.md §8): a wallet that already owns a vault goes straight
  // to the app once it is connected on Robinhood Chain.
  const owned = state === "vault" && !!vault;
  useEffect(() => {
    if (owned) router.replace(next);
  }, [owned, next, router]);

  function pick() {
    setError("");
    setPhase("none");
    setStep(0);
    openConnectModal?.();
  }

  // Abandon a pending request (e.g. the wallet popup was closed without an answer).
  function cancel() {
    disconnect();
  }

  async function switchNetwork() {
    setError("");
    setSwitching(true);
    try {
      await switchChainAsync({ chainId: TARGET.id });
    } catch {
      setError("The network switch was declined.");
    } finally {
      setSwitching(false);
    }
  }

  // Demo timing (animations.md §15): steps at 1.1s, +1.5s, +1.5s → done.
  function runDeploy() {
    setPhase("deploying");
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 1100);
    const t2 = setTimeout(() => setStep(2), 2600);
    const owner = address;
    const t3 = setTimeout(() => {
      setStep(3);
      setPhase("done");
      if (owner) saveVault(owner);
    }, 4100);
    timers.current = [t1, t2, t3];
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function leave() {
    timers.current.forEach(clearTimeout);
    setPhase("none");
    disconnect();
  }

  const lit = LIT[state];
  const ringCol = state === "network" ? AMBER : A;
  const glow = state === "done" ? 30 : 16;
  const centre: Record<State, [string, string, string, string?]> = {
    pick: ["Owner", "—", "no wallet"],
    connecting: ["Owner", "Waiting", walletName],
    network: ["Network", chain?.name ?? "Unsupported", short(address), AMBER],
    vault: ["Owner", "You", short(address)],
    deploying: ["Deploying", "Vault", short(address)],
    done: ["Vault", "Live", short(address), A],
  };
  const [cEye, cVal, cLine, cCol] = centre[state];

  return (
    <div className="cx-root" style={sx(`position: relative; width: 100%; min-height: 100vh; overflow: hidden; color: #E6EEEC; transition: background .8s; background: radial-gradient(45% 60% at 66% 50%, color-mix(in srgb, ${ringCol} ${glow > 16 ? 12 : 8}%, transparent), rgba(0,0,0,0) 70%), #04070A`)}>
      <header className="cx-head" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 76px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; z-index: 3")}>
        <Link href="/" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 24px; height: 24px; background: var(--accent)")} />
          <b style={sx("font-size: 15px; font-weight: 600")}>Aera Finance</b>
        </Link>
        <nav className="desk-only" style={sx("display: flex; align-items: center; gap: 24px; font-size: 14px")}>
          <Link href="/docs" style={sx("color: #85939A; text-decoration: none")}>Docs</Link>
          <Link href="/" style={sx("color: #85939A; text-decoration: none")}>Home</Link>
        </nav>
        <Link href="/" aria-label="Close" className="mo-only" style={sx("width: 36px; height: 36px; border-radius: 50%; border: 1px solid #1A2326; color: #AEBBBA; display: inline-flex; align-items: center; justify-content: center")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </Link>
      </header>

      {/* ring */}
      <div className="mo-only cx-mring" aria-hidden="true" style={sx("position: relative; height: 260px; margin-top: 74px; display: flex; justify-content: center")}>
        <div style={sx(`position: absolute; left: 50%; top: 50%; width: 320px; height: 320px; margin: -160px 0 0 -160px; border-radius: 50%; transition: background .8s; background: radial-gradient(circle, color-mix(in srgb, ${ringCol} ${glow}%, transparent), rgba(0,0,0,0) 62%); animation: cx-breathe 6s ease-in-out infinite`)} />
        <MobileRing state={state} />
        <div style={sx("position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center")}>
          <span style={sx("font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>{cEye}</span>
          <span style={sx(`font-size: 26px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; transition: color .6s; color: ${cCol ?? "#E6EEEC"}`)}>{cVal}</span>
          <span style={sx(`font-family: ${MONO}; font-size: 10px; color: #85939A`)}>{cLine}</span>
        </div>
      </div>

      <div className="cx-stage desk-only" aria-hidden="true" style={sx("position: absolute; inset: 0")}>
        <div style={sx(`position: absolute; left: 66%; top: 50%; width: 560px; height: 560px; margin: -280px 0 0 -280px; border-radius: 50%; transition: background .8s; background: radial-gradient(circle, color-mix(in srgb, ${ringCol} ${glow}%, transparent), rgba(0,0,0,0) 62%); animation: cx-breathe 6s ease-in-out infinite`)} />
        <Ring state={state} />
        <div className="cx-centre" style={sx("position: absolute; left: 66%; top: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center")}>
          <span style={sx("font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #5B686D")}>{cEye}</span>
          <span style={sx(`font-size: 40px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; transition: color .6s; color: ${cCol ?? "#E6EEEC"}`)}>{cVal}</span>
          <span style={sx(`font-family: ${MONO}; font-size: 13px; color: #85939A`)}>{cLine}</span>
        </div>
      </div>
      <span className="sr-only">{lit} of 12 vault segments ready</span>

      <div aria-hidden="true" className="desk-only" style={sx("position: absolute; left: 0; right: 0; bottom: 0; height: 50%; background: linear-gradient(180deg, rgba(4,7,10,0), rgba(4,7,10,.8)); pointer-events: none")} />

      {/* panel */}
      <div className="cx-panel" style={sx("position: absolute; left: 56px; bottom: 72px; width: 520px; z-index: 2")}>
        <div key={state} className="cx-block" style={sx("display: flex; flex-direction: column; gap: 22px; animation: cx-in .6s cubic-bezier(.22,1,.36,1) both")}>
          {state === "vault" ? (
            <span style={sx("display: flex; align-items: center; gap: 12px")}>
              <Tile connector={active} name={walletName} size={34} />
              <span style={sx("display: flex; flex-direction: column")}>
                <code style={sx(`font-family: ${MONO}; font-size: 14px; color: #E6EEEC`)}>{short(address)}</code>
                <span style={sx("font-size: 12px; color: #5B686D")}>Robinhood Chain</span>
              </span>
            </span>
          ) : (
            <span style={sx(EYEBROW + "; color: " + (state === "network" ? AMBER : state === "done" ? A : "#85939A"))}>
              {state === "pick" || state === "connecting" ? "Step 1 of 3 · Connect" : state === "network" ? "Step 2 of 3 · Wrong network" : state === "deploying" ? "Step 3 of 3 · Vault" : "Vault live"}
            </span>
          )}

          <h1 aria-live="polite" className="cx-h1" style={sx("margin: 0; font-size: 76px; font-weight: 500; letter-spacing: -0.045em; line-height: 0.98")}>
            {state === "pick" && <>Connect your<br /><span style={{ color: A }}>wallet.</span></>}
            {state === "connecting" && <>Approve in<br /><span style={{ color: A }}>{active ? `${walletName}.` : "your wallet."}</span></>}
            {state === "network" && <>Switch to<br /><span style={{ color: A }}>Robinhood Chain.</span></>}
            {state === "vault" && <>Create your<br /><span style={{ color: A }}>vault.</span></>}
            {state === "deploying" && <>Creating your<br /><span style={{ color: A }}>vault.</span></>}
            {state === "done" && <>Your vault<br /><span style={{ color: A }}>is live.</span></>}
          </h1>

          <p className="cx-body" style={sx(BODY)}>
            {state === "pick" && "Your wallet owns your vault. Aera never holds your keys or your funds."}
            {state === "connecting" && `Open ${active ? walletName : "your wallet"} and approve the connection request. It only shares your address.`}
            {state === "network" && `${walletName} is on ${chain?.name ?? "another network"}. Aera vaults live on Robinhood Chain, so your wallet needs to switch first.`}
            {state === "vault" && "One vault contract, owned by your wallet. Nobody else can withdraw from it. You set the rules next."}
            {state === "deploying" && "Takes a few seconds. You can leave this tab open."}
            {state === "done" && "Next, pick target weights and guardrails. Nothing trades until you do."}
          </p>

          {state === "pick" && (
            <div style={sx("display: flex; flex-direction: column; gap: 14px")}>
              <div className="cx-actions" style={sx("display: flex; align-items: center; gap: 16px; flex-wrap: wrap")}>
                <button type="button" onClick={pick} disabled={!openConnectModal} aria-haspopup="dialog" aria-expanded={connectModalOpen} className="ae-btn-w" style={sx(BTN_W)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h2M3 9h15a3 3 0 0 0-3-3" /></svg>
                  Connect wallet
                </button>
                <span style={sx("font-size: 13px; color: #85939A")}>MetaMask, Rabby, Coinbase Wallet or any WalletConnect wallet.</span>
              </div>
              <span style={sx("font-size: 13px; color: #5B686D")}>By connecting you accept the <a href="#" style={{ textDecoration: "none" }}>Terms</a>. Connecting signs nothing and spends nothing.</span>
            </div>
          )}

          {state === "connecting" && (
            <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
              <span style={sx("position: relative; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center")}>
                <span style={sx("position: absolute; inset: 0")}><Spinner size={72} /></span>
                <Tile connector={active} name={walletName} size={52} />
              </span>
              <div className="cx-actions" style={sx("display: flex; align-items: center; gap: 16px; flex-wrap: wrap")}>
                <button type="button" onClick={cancel} className="ae-btn-g" style={sx(BTN_G)}>Cancel</button>
                <span className="desk-only" style={sx("font-size: 13px; color: #5B686D")}>No popup? Click your wallet&apos;s icon in the browser bar.</span>
                <span className="mo-only" style={sx("font-size: 13px; line-height: 1.5; color: #5B686D")}>On mobile, your wallet opens in its own app. Come back here after approving.</span>
              </div>
            </div>
          )}

          {state === "network" && (
            <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
              <span style={sx("display: flex; align-items: center; gap: 10px; font-size: 13px")}>
                <span style={sx(`padding: 7px 12px; border-radius: 999px; color: ${AMBER}; background: rgba(255,186,92,0.1); border: 1px solid rgba(255,186,92,0.4)`)}>{chain?.name ?? "Unsupported network"}</span>
                <span aria-hidden="true" style={{ color: "#5B686D" }}>→</span>
                <span style={sx("padding: 7px 12px; border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent)")}>Robinhood Chain</span>
              </span>
              <div className="cx-actions" style={sx("display: flex; gap: 10px; flex-wrap: wrap")}>
                <button type="button" onClick={switchNetwork} disabled={switching} className="ae-btn-w" style={sx(BTN_W + (switching ? "; opacity: .85; cursor: default" : ""))}>
                  {switching ? <><Spinner />Approve in {walletName}</> : "Switch network"}
                </button>
                <button type="button" onClick={leave} className="ae-btn-g" style={sx(BTN_G)}>Disconnect</button>
              </div>
            </div>
          )}

          {state === "vault" && (
            <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
              <div style={sx("max-width: 460px; display: flex; flex-direction: column; font-size: 14px")}>
                {([["Owner", `You · ${short(address)}`], ["Network", "Robinhood Chain"], ["Deposit to create", "None"], ["Network fee", "[GAS]"]] as const).map(([k, v], i) => (
                  <div key={k} style={sx("height: 44px; display: flex; align-items: center; justify-content: space-between" + (i < 3 ? "; border-bottom: 1px solid #121A1D" : ""))}>
                    <span style={{ color: "#85939A" }}>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="cx-actions" style={sx("display: flex; gap: 10px; flex-wrap: wrap")}>
                <button type="button" onClick={runDeploy} className="ae-btn-w" style={sx(BTN_W)}>Create vault</button>
                <button type="button" onClick={leave} className="ae-btn-g" style={sx(BTN_G)}>Disconnect</button>
              </div>
            </div>
          )}

          {state === "deploying" && (
            <div style={sx("display: flex; flex-direction: column")}>
              {DEPLOY_STEPS(walletName).map((t, i) => {
                const st = i < step ? "done" : i === step ? "active" : "wait";
                return (
                  <div key={t} style={sx(`height: 48px; display: flex; align-items: center; gap: 14px; font-size: 15px; color: ${st === "done" ? "#AEBBBA" : st === "active" ? "#E6EEEC" : "#5B686D"}`)}>
                    <span style={sx("width: 22px; display: flex; justify-content: center")}>
                      {st === "done" ? (
                        <span style={sx("width: 22px; height: 22px; border-radius: 50%; background: color-mix(in srgb, var(--accent) 14%, transparent); display: flex; align-items: center; justify-content: center")}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2EE6D6" strokeWidth="3" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
                        </span>
                      ) : st === "active" ? <Spinner /> : <span style={sx("width: 20px; height: 20px; box-sizing: border-box; border-radius: 50%; border: 1px solid #263034")} />}
                    </span>
                    {t}
                  </div>
                );
              })}
            </div>
          )}

          {state === "done" && (
            <div style={sx("display: flex; flex-direction: column; gap: 18px")}>
              <span style={sx(`display: flex; gap: 18px; font-family: ${MONO}; font-size: 13px; color: #85939A`)}>
                <span>vault 0x7a…c3</span>
                <a href="#" style={{ textDecoration: "none" }}>tx 0x91…4e ↗</a>
              </span>
              <div className="cx-actions" style={sx("display: flex; gap: 10px; flex-wrap: wrap")}>
                <Link href="/app/rules" className="ae-btn-w" style={sx(BTN_W)}>Set your rules</Link>
                <Link href={next} className="ae-btn-g" style={sx(BTN_G)}>Open app</Link>
              </div>
            </div>
          )}

          {(state === "deploying" || state === "done") && (
            <span style={sx("font-size: 12px; color: #5B686D")}>Sample deploy: vault creation is simulated until the vault factory contract ships.</span>
          )}
          {error && <span role="alert" style={sx("font-size: 13px; color: #FF7A88")}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
