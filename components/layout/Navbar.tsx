"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-muted bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
            Agent Status · Active
          </span>
          <Button href="/connect" size="sm">
            Launch App
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground lg:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-out",
                open && "top-1.75 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.75 h-[1.5px] w-5 bg-current transition-opacity duration-200 ease-out",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3.5 h-[1.5px] w-5 bg-current transition-all duration-300 ease-out",
                open && "top-1.75 -rotate-45"
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border-muted bg-background lg:hidden">
          <Container className="flex flex-col gap-6 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button href="/connect" size="sm" className="w-full">
              Launch App
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
