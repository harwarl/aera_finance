"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; label: string };

export function DocsOnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const timeout = setTimeout(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-toc-heading]")
      );

      const found = nodes.map((node) => ({
        id: node.id,
        label: node.textContent?.trim() ?? "",
      }));

      setHeadings(found);
      if (found[0]) setActiveId(found[0].id);

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
      );

      nodes.forEach((node) => observer?.observe(node));
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, []);

  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        On This Page
      </span>

      {headings.length > 0 ? (
        <nav className="mt-4 flex flex-col gap-2 border-l border-border-muted">
          {headings.map((heading) => {
            const active = heading.id === activeId;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "-ml-px border-l-2 py-0.5 pl-3 text-xs transition-colors",
                  active
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-foreground-faint hover:text-foreground-muted"
                )}
              >
                {heading.label}
              </a>
            );
          })}
        </nav>
      ) : null}

      <div className="mt-8 border border-accent/30 bg-accent/5 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Build Status
        </span>
        <div className="mt-2 flex items-center gap-2 text-xs text-foreground-muted">
          <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
          Phase 0 · Validation
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          No live funds yet
        </p>
      </div>
    </div>
  );
}
