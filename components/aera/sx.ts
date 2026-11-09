import type { CSSProperties } from "react";

/**
 * Converts a CSS declaration string (as written in the reference .dc.html
 * files) into a React style object, so inline styles can be copied verbatim.
 * Handles custom properties and vendor prefixes; semicolons inside
 * parentheses are left alone.
 */
export function sx(css: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of css.split(/;(?![^(]*\))/)) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/^-(webkit|moz|ms)-/, (_, v: string) => v[0].toUpperCase() + v.slice(1) + "-")
          .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = value;
  }
  return out as CSSProperties;
}

export const ACCENT = "var(--accent)";
