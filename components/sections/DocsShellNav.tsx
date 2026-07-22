"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type NavGroup = {
  label: string;
  items: { label: string; href: string }[];
};

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Home", href: "/" },
      { label: "Security", href: "/#security" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    label: "Documents",
    items: [
      { label: "Whitepaper", href: "/whitepaper" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    label: "Get Started",
    items: [
      { label: "Waitlist", href: "/waitlist" },
      { label: "Launch Agent", href: "/#solution" },
    ],
  },
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
  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.items.length > 0);

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
        {filteredGroups.map((group) => (
          <div key={group.label}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {group.label}
            </span>
            <div className="mt-2 flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-l-2 py-1.5 pl-3 text-sm transition-colors",
                      active
                        ? "border-accent bg-background-elevated/50 text-accent"
                        : "border-transparent text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {filteredGroups.length === 0 ? (
          <span className="font-mono text-xs text-foreground-faint">
            No matches
          </span>
        ) : null}
      </nav>
    </div>
  );
}
