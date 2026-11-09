"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { sx } from "../sx";
import { SEARCH_INDEX, TREE, anchor, href, type DocId } from "./data";

const SEARCH_ICON = (stroke = "currentColor", size = 16) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

/** Three-column docs shell: top bar, left nav, article, right rail, ⌘K search. */
export function DocsShell({ active, toc, children }: { active: DocId; toc: string[]; children: React.ReactNode }) {
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={sx("position: relative; height: 100vh; overflow: hidden; background: radial-gradient(50% 40% at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), rgba(0,0,0,0) 70%), #04070A; color: #E6EEEC; display: flex; flex-direction: column")}>
      {/* top bar */}
      <header className="dx-top" style={sx("height: 64px; flex: none; box-sizing: border-box; padding: 0 24px; display: flex; align-items: center; gap: 24px; border-bottom: 1px solid #121A1D; background: rgba(4,7,10,0.8)")}>
        <Link href="/docs" className="dx-brand" style={sx("display: flex; align-items: center; gap: 10px; color: #E6EEEC; text-decoration: none; width: 236px")}>
          <span className="aera-mark" aria-hidden="true" style={sx("width: 22px; height: 22px; background: var(--accent)")} />
          <b style={sx("font-size: 15px; font-weight: 600")}>Aera</b>
          <span style={sx("font-size: 15px; color: #85939A")}>Docs</span>
          <span style={sx("font-size: 11px; padding: 3px 8px; border-radius: 999px; border: 1px solid #263034; color: #85939A")}>v0.1</span>
        </Link>
        <button type="button" onClick={() => setSearch(true)} aria-label="Search docs (⌘K)" style={sx("flex: 0 1 460px; min-width: 0; height: 40px; padding: 0 12px 0 14px; border-radius: 999px; border: 1px solid #1E282C; background: #0A1013; color: #85939A; font: 400 14px var(--font-geist), Geist, sans-serif; display: flex; align-items: center; gap: 10px; cursor: pointer")}>
          {SEARCH_ICON()}
          <span style={sx("flex: 1; text-align: left")}>Search docs</span>
          <span style={sx("font-size: 12px; padding: 2px 8px; border-radius: 6px; border: 1px solid #263034")}>⌘K</span>
        </button>
        <div style={sx("margin-left: auto; display: flex; align-items: center; gap: 22px; font-size: 14px")}>
          <Link href="/" className="dx-hide-sm" style={sx("color: #85939A; text-decoration: none")}>Landing</Link>
          <a href="#" className="dx-hide-sm" style={sx("color: #85939A; text-decoration: none")}>GitHub</a>
          <Link href="/app" style={sx("height: 38px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 999px; background: #FFFFFF; color: #04070A; font-weight: 600; text-decoration: none; white-space: nowrap")}>Launch app</Link>
        </div>
      </header>

      <div style={sx("flex: 1; min-height: 0; display: flex")}>
        {/* left nav */}
        <nav className="dx-scroll dx-left" aria-label="Docs" style={sx("width: 260px; flex: none; box-sizing: border-box; padding: 22px 14px 40px; border-right: 1px solid #121A1D; overflow-y: auto; display: flex; flex-direction: column; gap: 22px")}>
          {TREE.map(([title, items]) => (
            <div key={title} style={sx("display: flex; flex-direction: column; gap: 2px")}>
              <span style={sx("padding: 0 10px 6px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>{title}</span>
              {items.map(([id, label]) => {
                const on = id === active;
                return (
                  <Link
                    key={id}
                    href={href(id)}
                    className="dx-nav"
                    aria-current={on ? "page" : undefined}
                    style={sx("display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 10px; font-size: 14px; text-decoration: none; transition: background .2s, color .2s; color: " + (on ? "#E6EEEC" : "#85939A") + "; background: " + (on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
                  >
                    <span style={sx("width: 5px; height: 5px; border-radius: 50%; flex: none; background: " + (on ? "var(--accent); box-shadow: 0 0 8px var(--accent)" : "rgba(0,0,0,0)"))} />
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* article */}
        <main className="dx-scroll" style={sx("flex: 1; min-width: 0; overflow-y: auto")}>
          <div className="dx-article" style={sx("max-width: 760px; margin: 0 auto; padding: 44px 48px 80px; display: flex; flex-direction: column; gap: 26px")}>
            {children}
          </div>
        </main>

        {/* right rail */}
        <aside className="dx-right" style={sx("width: 220px; flex: none; box-sizing: border-box; padding: 44px 20px 0 0; display: flex; flex-direction: column; gap: 12px")}>
          <span style={sx("font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>On this page</span>
          {toc.map((t, k) => (
            <a key={t} href={`#${anchor(t)}`} style={sx("font-size: 13px; line-height: 1.4; padding-left: 12px; text-decoration: none; border-left: 2px solid " + (k === 0 ? "var(--accent)" : "#1A2326") + "; color: " + (k === 0 ? "#E6EEEC" : "#85939A"))}>{t}</a>
          ))}
          <div style={sx("margin-top: 18px; padding-top: 16px; border-top: 1px solid #121A1D; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}>
            <a href="#" style={sx("color: #85939A; text-decoration: none")}>Edit this page</a>
            <a href="#" style={sx("color: #85939A; text-decoration: none")}>Ask on Telegram</a>
          </div>
        </aside>
      </div>

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

function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const match = (e: (typeof SEARCH_INDEX)[number]) =>
      !term || e.title.toLowerCase().includes(term) || e.context.toLowerCase().includes(term);
    const pages = SEARCH_INDEX.filter((e) => e.kind === "page" && match(e)).slice(0, term ? 5 : 4);
    const sections = term ? SEARCH_INDEX.filter((e) => e.kind === "section" && match(e)).slice(0, 5) : [];
    return { pages, sections, flat: [...pages, ...sections] };
  }, [q]);

  useEffect(() => input.current?.focus(), []);

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

  const row = (e: (typeof SEARCH_INDEX)[number], idx: number) => {
    const on = idx === sel;
    return (
      <a
        key={e.to + e.title}
        href={e.to}
        role="option"
        aria-selected={on}
        onMouseEnter={() => setSel(idx)}
        onClick={(ev) => { ev.preventDefault(); go(e.to); }}
        style={sx("display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 14px; text-decoration: none; background: " + (on ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "rgba(0,0,0,0)"))}
      >
        <span style={sx("width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #85939A; background: " + (on ? "color-mix(in srgb, var(--accent) 16%, transparent)" : "rgba(255,255,255,0.05)"))}>
          {e.kind === "page" ? PAGE_ICON(on) : "#"}
        </span>
        <span style={sx("flex: 1; display: flex; flex-direction: column")}>
          <b style={sx("font-size: 15px; font-weight: " + (e.kind === "page" ? 600 : 500) + "; color: #E6EEEC")}><Highlight text={e.title} q={q.trim()} /></b>
          <span style={sx("font-size: 12px; color: #85939A")}><Highlight text={e.context} q={q.trim()} /></span>
        </span>
        {on && <span style={sx("font-size: 12px; color: #85939A")}>↵</span>}
      </a>
    );
  };

  return (
    <div onMouseDown={(e) => e.target === e.currentTarget && onClose()} style={sx("position: absolute; inset: 0; z-index: 10; background: rgba(2,4,7,0.62); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; padding: 110px 16px 0; box-sizing: border-box")}>
      <div className="dx-glass" role="dialog" aria-modal="true" aria-label="Search docs" onKeyDown={onKey} style={sx("width: 640px; max-width: 100%; height: fit-content; border-radius: 24px; background-color: rgba(8,12,15,0.75); overflow: hidden")}>
        <div style={sx("display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.08)")}>
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
            style={sx("flex: 1; min-width: 0; border: 0; outline: none; background: rgba(0,0,0,0); color: #E6EEEC; font: 400 17px var(--font-geist), Geist, sans-serif; caret-color: var(--accent)")}
          />
          <button type="button" onClick={onClose} style={sx("font: 500 12px var(--font-geist), Geist, sans-serif; padding: 4px 9px; border-radius: 7px; border: 1px solid #263034; background: rgba(0,0,0,0); color: #85939A; cursor: pointer")}>Esc</button>
        </div>
        <div id="dx-results" role="listbox" style={sx("padding: 10px; display: flex; flex-direction: column; gap: 2px")}>
          {results.flat.length === 0 && <span style={sx("padding: 12px; font-size: 14px; color: #85939A")}>No results for “{q}”.</span>}
          {results.pages.length > 0 && <span style={sx("padding: 8px 12px 4px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>Pages</span>}
          {results.pages.map((e, i) => row(e, i))}
          {results.sections.length > 0 && (
            <Fragment>
              <span style={sx("padding: 12px 12px 4px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5B686D")}>Sections</span>
              {results.sections.map((e, i) => row(e, results.pages.length + i))}
            </Fragment>
          )}
        </div>
        <div style={sx("display: flex; gap: 18px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #5B686D")}>
          <span>↑↓ to move</span><span>↵ to open</span><span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
