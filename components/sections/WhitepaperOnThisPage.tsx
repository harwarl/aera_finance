"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { whitepaperSections } from "@/config/site";

export function WhitepaperOnThisPage() {
  const [activeId, setActiveId] = useState(whitepaperSections[0].id);

  useEffect(() => {
    const headings = whitepaperSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        On This Page
      </span>

      <nav className="mt-4 flex flex-col gap-2 border-l border-border-muted">
        {whitepaperSections.map((section) => {
          const active = section.id === activeId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "-ml-px border-l-2 py-0.5 pl-3 text-xs transition-colors",
                active
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-foreground-faint hover:text-foreground-muted"
              )}
            >
              {section.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-8 border border-accent/30 bg-accent/5 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Agent Status
        </span>
        <div className="mt-2 flex items-center gap-2 text-xs text-foreground-muted">
          <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
          Active
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Last audit: Q1 2026
        </p>
      </div>
    </div>
  );
}
