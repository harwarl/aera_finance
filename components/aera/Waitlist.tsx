"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sx } from "./sx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLES = ["@kemi.eth", "@0xmarlo", "@trade_tunde", "@lena_k", "j***@gmail.com", "@vaultpilled", "@sam_onchain", "a***@proton.me", "@hood_maxi", "@nnamdi.dev", "@priya_r", "@coinsofbola"];
const TIMES = ["just now", "1m", "2m", "4m", "6m", "9m", "12m", "15m", "19m", "24m", "31m", "38m"];
const ONE = HANDLES.map((h, k) => ({ h, t: TIMES[k], n: (1283 - k).toLocaleString("en-US") }));
const QUEUE = ONE.concat(ONE);
const COUNT = "1,283"; // sample, from the design
const REFS_DONE = 1; // sample, from the design

const FIELD = "display: flex; flex-direction: column; gap: 6px; padding: 12px 16px; border-radius: 16px; border: 1px solid #1E282C; background: #080C0F; transition: border-color .2s, box-shadow .2s";
const INPUT = "border: 0; background: rgba(0,0,0,0); color: #E6EEEC; font: 400 16px var(--font-geist), Geist, sans-serif; outline: none; padding: 0";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState<null | { position: number; code: string }>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email so we can reach you.");
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, handle }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Something went wrong. Try again.");
      setJoined({ position: data.position, code: data.code });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const link = joined ? `aerafinance.xyz/w/${joined.code}` : "";
  // "Copied" reverts after 2s (animations.md §14).
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(`https://${link}`);
    } catch {
      /* clipboard unavailable; still show feedback */
    }
    setCopied(true);
  }

  return (
    <div style={sx("position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: radial-gradient(50% 60% at 78% 50%, color-mix(in srgb, var(--accent) 9%, transparent), rgba(0,0,0,0) 70%), #04070A; color: #E6EEEC")}>
      <header className="wl-head" style={sx("position: absolute; left: 0; right: 0; top: 0; height: 76px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; z-index: 3")}>
        <Link href="/" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 24px; height: 24px; background: var(--accent)")} />
          <b style={sx("font-size: 15px; font-weight: 600")}>Aera Finance</b>
        </Link>
        <nav style={sx("display: flex; align-items: center; gap: 24px; font-size: 14px")}>
          <Link href="/docs" style={sx("color: #85939A; text-decoration: none")}>Docs</Link>
          <Link href="/" style={sx("color: #85939A; text-decoration: none")}>Home</Link>
        </nav>
      </header>

      {/* right: the queue */}
      <div aria-hidden="true" className="wl-queue" style={sx("position: absolute; right: 0; top: 0; bottom: 0; width: 44%; -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 20%, #000 80%, rgba(0,0,0,0)); mask-image: linear-gradient(180deg, rgba(0,0,0,0), #000 20%, #000 80%, rgba(0,0,0,0))")}>
        <div style={sx("position: absolute; left: 50%; top: 50%; width: 520px; height: 520px; margin: -260px 0 0 -260px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), rgba(0,0,0,0) 62%); animation: wl-breathe 7s ease-in-out infinite")} />
        <span className="aera-mark" style={sx("position: absolute; left: 50%; top: 50%; width: 380px; height: 380px; margin: -190px 0 0 -190px; background: color-mix(in srgb, var(--accent) 9%, transparent)")} />
        <div style={sx("position: absolute; left: 22%; right: 14%; top: 0; animation: wl-queue 40s linear infinite")}>
          {QUEUE.map((q, i) => (
            <div key={i} style={sx("display: flex; align-items: center; gap: 14px; height: 58px; border-bottom: 1px solid #121A1D")}>
              <span style={sx("width: 64px; font-size: 13px; color: #5B686D; font-variant-numeric: tabular-nums")}>#{q.n}</span>
              <span style={sx("flex: 1; font-size: 15px; color: #AEBBBA")}>{q.h}</span>
              <span style={sx("font-size: 12px; color: #5B686D")}>{q.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* left: form / joined */}
      <div className="wl-left" style={sx("position: absolute; left: 56px; top: 0; bottom: 0; width: 600px; display: flex; flex-direction: column; justify-content: center; gap: 22px; z-index: 2")}>
        {!joined ? (
          <div style={sx("display: flex; flex-direction: column; gap: 22px; animation: wl-rise .9s cubic-bezier(.22,1,.36,1) .1s both")}>
            <div style={sx("display: flex; flex-direction: column; gap: 16px")}>
              <span style={sx("font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #85939A")}>Waitlist</span>
              <h1 className="wl-h1" style={sx("margin: 0; font-size: 72px; font-weight: 500; letter-spacing: -0.045em; line-height: 0.98")}>
                Your vault,<br /><span style={{ color: "var(--accent)" }}>first in line.</span>
              </h1>
              <p style={sx("margin: 0; max-width: 460px; font-size: 17px; line-height: 1.6; color: #AEBBBA")}>
                Aera opens in waves. Join now and we&apos;ll let you in early, starting with the people who bring friends.
              </p>
            </div>
            <form onSubmit={submit} noValidate style={sx("display: flex; flex-direction: column; gap: 12px; max-width: 520px")}>
              <label className="wl-in" style={sx(FIELD)}>
                <span style={sx("font-size: 12px; color: #85939A")}>Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@domain.com"
                  autoComplete="email"
                  aria-invalid={!!error}
                  aria-describedby={error ? "wl-error" : undefined}
                  style={sx(INPUT)}
                />
              </label>
              {error && <span id="wl-error" role="alert" style={sx("font-size: 13px; color: #FF7A88")}>{error}</span>}
              <label className="wl-in" style={sx(FIELD)}>
                <span style={sx("font-size: 12px; color: #85939A")}>
                  X handle <span style={{ color: "#5B686D" }}>· optional, for early-access picks</span>
                </span>
                <span style={sx("display: flex; align-items: center; gap: 2px; font-size: 16px")}>
                  <span style={{ color: "#5B686D" }}>@</span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
                    placeholder="yourhandle"
                    autoComplete="off"
                    style={sx("flex: 1; min-width: 0; " + INPUT)}
                  />
                </span>
              </label>
              <div style={sx("display: flex; align-items: center; gap: 16px; padding-top: 4px; flex-wrap: wrap")}>
                <button type="submit" disabled={busy} className="wl-btn" style={sx("height: 52px; padding: 0 28px; border: 0; border-radius: 999px; background: #FFFFFF; color: #04070A; font: 600 16px var(--font-geist), Geist, sans-serif; cursor: pointer; box-shadow: 0 0 30px rgba(255,255,255,.14); transition: box-shadow .2s")}>
                  Join the waitlist
                </button>
                <span style={sx("font-size: 14px; color: #85939A")}>{COUNT} people ahead of you</span>
              </div>
            </form>
            <span style={sx("font-size: 13px; color: #5B686D; max-width: 460px; line-height: 1.6")}>One email when your spot opens, nothing else. No wallet needed to join.</span>
          </div>
        ) : (
          <div style={sx("display: flex; flex-direction: column; gap: 22px; animation: wl-rise .9s cubic-bezier(.22,1,.36,1) .1s both")}>
            <div style={sx("display: flex; flex-direction: column; gap: 10px")}>
              <span style={sx("font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent)")}>You&apos;re in</span>
              <span style={sx("font-size: 18px; color: #AEBBBA")}>Your spot in line</span>
              <span className="wl-pos" style={sx("font-size: 132px; font-weight: 500; letter-spacing: -0.06em; line-height: 0.9; font-variant-numeric: tabular-nums; animation: wl-pop 1s cubic-bezier(.22,1,.36,1) .2s both")}>
                #{joined.position.toLocaleString("en-US")}
              </span>
              <span style={sx("font-size: 15px; color: #85939A")}>We&apos;ll email {email || "you"} when your wave opens.</span>
            </div>
            <div style={sx("display: flex; flex-direction: column; gap: 12px; max-width: 540px; border-top: 1px solid #121A1D; padding-top: 26px")}>
              <b style={sx("font-size: 18px; font-weight: 500")}>Move up the line</b>
              <span style={sx("font-size: 15px; line-height: 1.6; color: #AEBBBA")}>Every friend who joins with your link moves you up 100 spots.</span>
              <div className="wl-ref" style={sx("display: flex; align-items: center; gap: 10px")}>
                <div className="wl-in" style={sx("flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 16px; border-radius: 16px; border: 1px solid #1E282C; background: #080C0F; transition: border-color .2s, box-shadow .2s")}>
                  <code style={sx("flex: 1; min-width: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 15px; color: #E6EEEC; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{link}</code>
                  <button type="button" onClick={copy} aria-live="polite" style={sx("height: 36px; padding: 0 14px; flex: none; border-radius: 999px; border: 1px solid rgba(255,255,255,.22); background: rgba(0,0,0,0); font: 500 13px var(--font-geist), Geist, sans-serif; cursor: pointer; color: " + (copied ? "var(--accent)" : "#E6EEEC"))}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <a
                  href={`https://x.com/intent/post?text=${encodeURIComponent(`https://${link}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wl-btn"
                  style={sx("height: 52px; padding: 0 22px; flex: none; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 15px; font-weight: 600; text-decoration: none; white-space: nowrap")}
                >
                  Share on X
                </a>
              </div>
              <div style={sx("display: flex; align-items: center; gap: 14px; padding-top: 6px")}>
                <div style={sx("display: flex; gap: 6px")}>
                  {[0, 1, 2].map((k) => (
                    <span key={k} style={sx("width: 34px; height: 6px; border-radius: 3px; background: " + (k < REFS_DONE ? "var(--accent); box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 50%, transparent)" : "#1A2326"))} />
                  ))}
                </div>
                <span style={sx("font-size: 13px; color: #85939A")}>{REFS_DONE} of 3 friends joined · next jump at 2</span>
              </div>
            </div>
            <button type="button" onClick={() => { setJoined(null); setCopied(false); }} style={sx("align-self: flex-start; border: 0; background: rgba(0,0,0,0); padding: 0; color: #5B686D; font: 400 13px var(--font-geist), Geist, sans-serif; cursor: pointer; text-decoration: underline")}>
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
