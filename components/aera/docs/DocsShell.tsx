"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { sx } from "../sx";
import { SEARCH_INDEX, TREE, anchor, href, type DocId, type SearchEntry } from "./data";
import { OPEN_SEARCH, useActiveHeading } from "./Toc";
import { LaunchApp } from "@/components/aera/LaunchApp";

const FONT = "var(--font-geist), Geist, sans-serif";
const SEARCH_ICON = (stroke = "currentColor", size = 16) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

function NavTree({ active, onPick }: { active: DocId; onPick?: () => void }) {
  return (
    <>
      {TREE.map(([title, items]) => (
        <div key={title} style={sx("display: flex; flex-direction: column; gap: 2px")}>
          <span style={sx("padding: 0 10px 6px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>{title}</span>
          {items.map(([id, label]) => {
            const on = id === active;
            return (
              <Link
                key={id}
                href={href(id)}
                onClick={onPick}
                className="dx-nav"
                aria-current={on ? "page" : undefined}
                style={sx("display: flex; align-items: center; gap: 10px; padding: 8px 10px; min-height: 22px; border-radius: 10px; font-size: 14px; text-decoration: none; transition: background .2s, color .2s; color: " + (on ? "#E6EEEC" : "#85939A") + "; background: " + (on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
              >
                <span style={sx("width: 5px; height: 5px; border-radius: 50%; flex: none; background: " + (on ? "var(--accent); box-shadow: 0 0 8px var(--accent)" : "rgba(0,0,0,0)"))} />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}

/** Three-column docs shell (desktop) / top bar + drawer (phones), with ⌘K search. */
export function DocsShell({ active, toc, children }: { active: DocId; toc: string[]; children: React.ReactNode }) {
  const [search, setSearch] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const current = useActiveHeading(toc);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") setDrawer(false);
    };
    const open = () => setSearch(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH, open);
    };
  }, []);

  return (
    <div className="dx-root" style={sx("position: relative; height: 100vh; overflow: hidden; background: radial-gradient(50% 40% at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), rgba(0,0,0,0) 70%), #04070A; color: #E6EEEC; display: flex; flex-direction: column")}>
      {/* desktop top bar */}
      <header className="dx-top desk-only" style={sx("height: 64px; flex: none; box-sizing: border-box; padding: 0 24px; display: flex; align-items: center; gap: 24px; border-bottom: 1px solid #121A1D; background: rgba(4,7,10,0.8)")}>
        <Link href="/docs" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none; width: 236px")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 22px; height: 22px; background: var(--accent)")} />
          <b style={sx("font-size: 15px; font-weight: 600")}>Aera</b>
          <span style={sx("font-size: 15px; color: #85939A")}>Docs</span>
          <span style={sx("font-size: 11px; padding: 3px 8px; border-radius: 999px; border: 1px solid #263034; color: #85939A")}>v0.1</span>
        </Link>
        <button type="button" onClick={() => setSearch(true)} aria-label="Search docs (⌘K)" style={sx(`flex: 0 1 460px; min-width: 0; height: 40px; padding: 0 12px 0 14px; border-radius: 999px; border: 1px solid #1E282C; background: #0A1013; color: #85939A; font: 400 14px ${FONT}; display: flex; align-items: center; gap: 10px; cursor: pointer`)}>
          {SEARCH_ICON()}
          <span style={sx("flex: 1; text-align: left")}>Search docs</span>
          <span style={sx("font-size: 12px; padding: 2px 8px; border-radius: 6px; border: 1px solid #263034")}>⌘K</span>
        </button>
        <div style={sx("margin-left: auto; display: flex; align-items: center; gap: 22px; font-size: 14px")}>
          <Link href="/" style={sx("color: #85939A; text-decoration: none")}>Landing</Link>
          <a href="#" style={sx("color: #85939A; text-decoration: none")}>GitHub</a>
          <LaunchApp style={sx("height: 38px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-weight: 600; text-decoration: none; white-space: nowrap")}>Launch app</LaunchApp>
        </div>
      </header>

      {/* phone top bar (design.md §10 Docs) */}
      <header className="mo-only" style={sx("height: 60px; flex: none; box-sizing: border-box; padding: 0 12px 0 10px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #121A1D; background: rgba(4,7,10,0.92); position: sticky; top: 0; z-index: 20; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)")}>
        <button type="button" aria-label="Open docs menu" aria-expanded={drawer} aria-controls="dx-drawer" onClick={() => setDrawer(true)} style={sx("width: 40px; height: 40px; flex: none; border: 0; border-radius: 12px; background: rgba(0,0,0,0); color: #AEBBBA; display: inline-flex; align-items: center; justify-content: center; cursor: pointer")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <Link href="/docs" style={sx("display: flex; align-items: center; gap: 7px; color: #E6EEEC; text-decoration: none; margin-right: auto; min-width: 0")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 20px; height: 20px; background: var(--accent)")} />
          <b style={sx("font-size: 14px; font-weight: 600; white-space: nowrap")}>Aera Docs</b>
          <span style={sx("font-size: 10px; padding: 2px 6px; border-radius: 999px; border: 1px solid #263034; color: #85939A")}>v0.1</span>
        </Link>
        <button type="button" aria-label="Search docs" onClick={() => setSearch(true)} style={sx("width: 40px; height: 40px; flex: none; border: 0; border-radius: 12px; background: rgba(0,0,0,0); color: #AEBBBA; display: inline-flex; align-items: center; justify-content: center; cursor: pointer")}>
          {SEARCH_ICON("currentColor", 18)}
        </button>
        <LaunchApp style={sx("height: 36px; padding: 0 14px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap")}>Launch app</LaunchApp>
      </header>

      <div className="dx-body" style={sx("flex: 1; min-height: 0; display: flex")}>
        {/* left nav */}
        <nav className="dx-scroll dx-left desk-only" aria-label="Docs" style={sx("width: 260px; flex: none; box-sizing: border-box; padding: 22px 14px 40px; border-right: 1px solid #121A1D; overflow-y: auto; display: flex; flex-direction: column; gap: 22px")}>
          <NavTree active={active} />
        </nav>

        {/* article */}
        <main className="dx-scroll dx-main" style={sx("flex: 1; min-width: 0; overflow-y: auto")}>
          <div className="dx-article" style={sx("max-width: 760px; margin: 0 auto; padding: 44px 48px 80px; display: flex; flex-direction: column; gap: 26px")}>
            {children}
          </div>
        </main>

        {/* right rail */}
        <aside className="dx-right desk-only" style={sx("width: 220px; flex: none; box-sizing: border-box; padding: 44px 20px 0 0; display: flex; flex-direction: column; gap: 12px")}>
          <span style={sx("font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>On this page</span>
          {toc.map((t) => {
            const on = anchor(t) === current;
            return (
              <a key={t} href={`#${anchor(t)}`} aria-current={on ? "location" : undefined} style={sx("font-size: 13px; line-height: 1.4; padding-left: 12px; text-decoration: none; transition: color .2s, border-color .2s; border-left: 2px solid " + (on ? "var(--accent)" : "#1A2326") + "; color: " + (on ? "#E6EEEC" : "#85939A"))}>{t}</a>
            );
          })}
          <div style={sx("margin-top: 18px; padding-top: 16px; border-top: 1px solid #121A1D; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}>
            <a href="#" style={sx("color: #85939A; text-decoration: none")}>Edit this page</a>
            <a href="#" style={sx("color: #85939A; text-decoration: none")}>Ask on Telegram</a>
          </div>
        </aside>
      </div>

      {drawer && (
        <div className="mo-only" style={sx("position: fixed; inset: 0; z-index: 40")}>
          <div onClick={() => setDrawer(false)} style={sx("position: absolute; inset: 0; background: rgba(2,4,7,0.7)")} />
          <nav id="dx-drawer" aria-label="Docs" style={sx("position: absolute; left: 0; top: 0; bottom: 0; width: min(320px, 86vw); box-sizing: border-box; padding: 14px 12px 32px; background: #05090C; border-right: 1px solid #1A2326; box-shadow: 20px 0 60px rgba(0,0,0,0.6); overflow-y: auto; display: flex; flex-direction: column; gap: 20px; animation: mo-rise .4s cubic-bezier(.22,1,.36,1) both")}>
            <div style={sx("display: flex; align-items: center; justify-content: space-between; padding: 0 4px 0 10px")}>
              <span style={sx("display: flex; align-items: center; gap: 8px")}>
                <span className="aera-mark" aria-hidden="true" style={sx("width: 20px; height: 20px; background: var(--accent)")} />
                <b style={sx("font-size: 14px; font-weight: 600")}>Aera Docs</b>
              </span>
              <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} style={sx("width: 40px; height: 40px; border: 0; border-radius: 12px; background: rgba(0,0,0,0); color: #AEBBBA; display: inline-flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <NavTree active={active} onPick={() => setDrawer(false)} />
          </nav>
        </div>
      )}

      {search && <SearchModal onClose={() => setSearch(false)} />}
    </div>
  );
}

function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color: "var(--accent)" }}>{text.slice(i, i + q.length)}</span>
      {text.slice(i + q.length)}
    </>
  );
}

const PAGE_ICON = (on: boolean) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={on ? "#2EE6D6" : "#85939A"} strokeWidth="2" aria-hidden="true">
    <path d="M7 3h7l5 5v13H7z" />
  </svg>
);
const GROUP = "padding: 8px 12px 4px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D";

function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  // Pages and Sections match on their own title; Mentions match only on the
  // place they live (e.g. "Guardrails › Rule parameters").
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const inTitle = (e: SearchEntry) => !term || e.title.toLowerCase().includes(term);
    const pages = SEARCH_INDEX.filter((e) => e.kind === "page" && inTitle(e)).slice(0, term ? 5 : 4);
    const sections = term ? SEARCH_INDEX.filter((e) => e.kind === "section" && inTitle(e)).slice(0, 5) : [];
    const mentions = term ? SEARCH_INDEX.filter((e) => !inTitle(e) && e.context.toLowerCase().includes(term)).slice(0, 4) : [];
    return { pages, sections, mentions, flat: [...pages, ...sections, ...mentions] };
  }, [q]);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const go = (to: string) => {
    onClose();
    router.push(to);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results.flat[sel]) go(results.flat[sel].to);
  };

  const row = (e: SearchEntry, idx: number) => {
    const on = idx === sel;
    return (
      <a
        key={e.kind + e.to + e.title}
        href={e.to}
        role="option"
        aria-selected={on}
        className="dx-srow"
        onMouseEnter={() => setSel(idx)}
        onClick={(ev) => { ev.preventDefault(); go(e.to); }}
        style={sx("display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 14px; text-decoration: none; background: " + (on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
      >
        <span className="dx-sicon" style={sx("width: 32px; height: 32px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #85939A; background: " + (on ? "color-mix(in srgb, var(--accent) 16%, transparent)" : "rgba(255,255,255,0.05)"))}>
          {e.kind === "page" ? PAGE_ICON(on) : "#"}
        </span>
        <span style={sx("flex: 1; min-width: 0; display: flex; flex-direction: column")}>
          <b style={sx("font-size: 15px; font-weight: " + (e.kind === "page" ? 600 : 500) + "; color: #E6EEEC")}><Highlight text={e.title} q={q.trim()} /></b>
          <span style={sx("font-size: 12px; color: #85939A")}><Highlight text={e.context} q={q.trim()} /></span>
        </span>
        {on && <span className="desk-only" style={sx("font-size: 12px; color: #85939A")}>↵</span>}
      </a>
    );
  };

  const group = (label: string, list: SearchEntry[], start: number) => {
    return list.length ? (
      <Fragment key={label}>
        <span style={sx(GROUP)}>{label}</span>
        {list.map((e, i) => row(e, start + i))}
      </Fragment>
    ) : null;
  };

  return (
    <div className="dx-scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()} style={sx("position: absolute; inset: 0; z-index: 50; background: rgba(2,4,7,0.62); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; padding: 110px 16px 0; box-sizing: border-box")}>
      <div className="dx-glass dx-search" role="dialog" aria-modal="true" aria-label="Search docs" onKeyDown={onKey} style={sx("width: 640px; max-width: 100%; height: fit-content; border-radius: 24px; background-color: rgba(8,12,15,0.75); overflow: hidden")}>
        <div className="dx-shead" style={sx("display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.08)")}>
          <div className="dx-sfield" style={sx("flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px")}>
            {SEARCH_ICON("#2EE6D6", 18)}
            <input
              ref={input}
              value={q}
              onChange={(e) => { setQ(e.target.value); setSel(0); }}
              placeholder="Search docs"
              aria-label="Search docs"
              role="combobox"
              aria-expanded="true"
              aria-controls="dx-results"
              style={sx(`flex: 1; min-width: 0; border: 0; outline: none; background: rgba(0,0,0,0); color: #E6EEEC; font: 400 17px ${FONT}; caret-color: var(--accent)`)}
            />
          </div>
          <button type="button" onClick={onClose} className="desk-only" style={sx(`font: 500 12px ${FONT}; padding: 4px 9px; border-radius: 7px; border: 1px solid #263034; background: rgba(0,0,0,0); color: #85939A; cursor: pointer`)}>Esc</button>
          <button type="button" onClick={onClose} className="mo-only" style={sx(`font: 500 15px ${FONT}; padding: 0 4px; border: 0; background: rgba(0,0,0,0); color: var(--accent); cursor: pointer`)}>Cancel</button>
        </div>
        <div id="dx-results" role="listbox" className="dx-results" style={sx("padding: 10px; display: flex; flex-direction: column; gap: 2px")}>
          {results.flat.length === 0 && <span style={sx("padding: 12px; font-size: 14px; color: #85939A")}>No results for “{q}”.</span>}
          {group("Pages", results.pages, 0)}
          {group("Sections", results.sections, results.pages.length)}
          {group("Mentions", results.mentions, results.pages.length + results.sections.length)}
        </div>
        <div className="desk-only" style={sx("display: flex; gap: 18px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #5B686D")}>
          <span>↑↓ to move</span><span>↵ to open</span><span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
