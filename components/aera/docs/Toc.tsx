"use client";

import { useEffect, useState } from "react";
import { sx } from "../sx";
import { anchor } from "./data";

/** Id of the heading currently nearest the top of the viewport. */
export function useActiveHeading(titles: string[]) {
  const ids = titles.map(anchor);
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const list = key.split("|");
    const els = list.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const first = list.find((id) => seen.get(id));
        if (first) setActive(first);
      },
      { rootMargin: "0px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}

/** Event the docs home search field uses to open the shell's search. */
export const OPEN_SEARCH = "aera:docs-search";

/** Phones: "On this page" as a 46px dropdown showing the current heading. */
export function MobileToc({ toc }: { toc: string[] }) {
  const active = useActiveHeading(toc);
  const current = toc.find((t) => anchor(t) === active) ?? toc[0];
  const [open, setOpen] = useState(false);
  return (
    <div className="mo-only" style={sx("position: relative")}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="dx-mtoc"
        onClick={() => setOpen(!open)}
        style={sx("width: 100%; height: 46px; box-sizing: border-box; padding: 0 14px; border-radius: 14px; border: 1px solid #1A2326; background: #080C0F; color: #E6EEEC; font: 400 14px var(--font-geist), Geist, sans-serif; display: flex; align-items: center; gap: 10px; cursor: pointer; text-align: left")}
      >
        <span style={sx("font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #5B686D; white-space: nowrap")}>On this page</span>
        <span style={sx("flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{current}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#85939A" strokeWidth="2" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div id="dx-mtoc" style={sx("position: absolute; left: 0; right: 0; top: 52px; z-index: 5; padding: 6px; border-radius: 14px; border: 1px solid #1A2326; background: #080C0F; box-shadow: 0 20px 50px rgba(0,0,0,.5); display: flex; flex-direction: column")}>
          {toc.map((t) => {
            const on = anchor(t) === active;
            return (
              <a key={t} href={`#${anchor(t)}`} onClick={() => setOpen(false)} style={sx("height: 44px; display: flex; align-items: center; padding: 0 10px; border-radius: 10px; font-size: 14px; text-decoration: none; color: " + (on ? "#E6EEEC; background: color-mix(in srgb, var(--accent) 10%, transparent)" : "#85939A"))}>{t}</a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Phones: the 48px search field on the docs home. */
export function MobileSearchField() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH))}
      className="mo-only"
      style={sx("width: 100%; height: 48px; box-sizing: border-box; padding: 0 16px; border-radius: 14px; border: 1px solid #1E282C; background: #0A1013; color: #85939A; font: 400 15px var(--font-geist), Geist, sans-serif; display: flex; align-items: center; gap: 10px; cursor: pointer")}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      Search docs
    </button>
  );
}
