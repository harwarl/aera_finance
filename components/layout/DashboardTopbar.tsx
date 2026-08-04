"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const TABS: { label: string; href: string; soon?: boolean }[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Decisions", href: "/dashboard/decisions" },
  { label: "Holdings", href: "/dashboard/holdings" },
  { label: "Rules", href: "/dashboard/rules" },
  { label: "Security", href: "/dashboard/security" },
  { label: "Account", href: "/dashboard/account" },
];

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function DashboardTopbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const isAdmin = useIsAdmin();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border-muted bg-background px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/aera.png" alt="aera" width={28} height={28} />
        <span className="flex flex-col leading-none">
          <span className="font-sans text-sm font-black tracking-tight text-foreground">
            AERA FINANCE
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
            Dashboard
          </span>
        </span>
      </Link>

      <nav className="hidden items-center gap-1 lg:flex">
        {TABS.map((tab) => {
          const active = pathname === tab.href;

          if (tab.soon) {
            return (
              <span
                key={tab.href}
                className="flex cursor-not-allowed items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground-faint/50"
              >
                {tab.label}
                <span className="border border-border-muted px-1 py-0.5 text-[8px] text-foreground-faint">
                  Soon
                </span>
              </span>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                active
                  ? "text-accent"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-faint sm:flex">
          <span className="h-1.5 w-1.5 animate-ticker-blink bg-accent" />
          Agent Active
        </span>
        {isAdmin ? (
          <Link
            href="/admin"
            className="border border-danger px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-danger transition-colors hover:bg-danger hover:text-background"
          >
            Admin
          </Link>
        ) : null}
        {isConnected && address ? (
          <span className="border border-border px-3 py-1.5 font-mono text-xs text-foreground">
            {truncateAddress(address)}
          </span>
        ) : (
          <Link
            href="/connect"
            className="border border-accent px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-accent"
          >
            Connect
          </Link>
        )}
      </div>
    </header>
  );
}
