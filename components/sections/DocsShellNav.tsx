"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { docPages } from "@/config/whitepaper";
import type { DocGroup } from "@/types";

const GROUP_ORDER: DocGroup[] = [
  "Overview",
  "Architecture",
  "Product",
  "Assets & Fees",
  "Protocol",
];

export function DocsShellNav() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        label: group,
        items: docPages
          .filter((page) => page.group === group)
          .filter((page) => page.title.toLowerCase().includes(q)),
      })).filter((group) => group.items.length > 0),
    [q]
  );

  return (
    <div>
      <div className="flex items-center gap-2 border border-border bg-background-elevated/40 px-3 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-foreground-faint" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search docs..."
          className="w-full bg-transparent text-xs text-foreground placeholder:text-foreground-faint focus:outline-none"
        />
        <kbd className="hidden shrink-0 border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground-faint sm:block">
          /
        </kbd>
      </div>

      <nav className="mt-6 flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.label}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {group.label}
            </span>
            <div className="mt-2 flex flex-col gap-0.5">
              {group.items.map((page) => {
                const href = `/whitepaper/${page.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={cn(
                      "border-l-2 py-1.5 pl-3 text-sm transition-colors",
                      active
                        ? "border-accent bg-background-elevated/50 text-accent"
                        : "border-transparent text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {page.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 ? (
          <span className="font-mono text-xs text-foreground-faint">
            No matches
          </span>
        ) : null}
      </nav>
    </div>
  );
}
