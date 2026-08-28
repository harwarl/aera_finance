"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import {
  CircleUserRound,
  Coins,
  LayoutDashboard,
  Menu,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { WalletModal } from "@/components/shared/WalletModal";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  danger?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Decisions", href: "/dashboard/decisions", icon: ScrollText },
  { label: "Holdings", href: "/dashboard/holdings", icon: Coins },
  { label: "Rules", href: "/dashboard/rules", icon: SlidersHorizontal },
  { label: "Security", href: "/dashboard/security", icon: ShieldCheck },
  { label: "Account", href: "/dashboard/account", icon: CircleUserRound },
];

const ADMIN_ITEM: NavItem = {
  label: "Admin",
  href: "/admin",
  icon: ShieldAlert,
  danger: true,
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors",
        item.danger
          ? active
            ? "bg-danger/10 text-danger"
            : "text-danger/80 hover:bg-danger/10 hover:text-danger"
          : active
            ? "bg-accent/10 text-accent"
            : "text-foreground-muted hover:bg-background-subtle hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  );
}

function SidebarContent({
  onNavigate,
  onOpenWallet,
}: {
  onNavigate?: () => void;
  onOpenWallet: () => void;
}) {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const isAdmin = useIsAdmin();

  const items = isAdmin ? [...NAV_ITEMS, ADMIN_ITEM] : NAV_ITEMS;

  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <Image src="/aera.png" alt="aera" width={28} height={28} />
        <span className="flex flex-col leading-none">
          <span className="font-sans text-sm font-black tracking-tight text-foreground">
            Atlas
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
            Dashboard
          </span>
        </span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-border-muted pt-4">
        <span className="flex items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          <span className="h-1.5 w-1.5 animate-ticker-blink rounded-full bg-accent" />
          Agent Active
        </span>
        {isConnected && address ? (
          <button
            type="button"
            onClick={onOpenWallet}
            className="rounded-full border border-border px-3 py-1.5 text-center font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {truncateAddress(address)}
          </button>
        ) : (
          <Link
            href="/waitlist"
            className="rounded-full border border-accent px-3 py-1.5 text-center font-mono text-xs uppercase tracking-widest text-accent"
          >
            Join Waitlist
          </Link>
        )}
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border-muted bg-background p-5 lg:flex lg:flex-col">
        <SidebarContent onOpenWallet={() => setWalletModalOpen(true)} />
      </aside>

      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border-muted bg-background px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/aera.png" alt="aera" width={26} height={26} />
          <span className="font-sans text-sm font-black tracking-tight text-foreground">
            Atlas
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border-muted bg-background p-5 lg:hidden">
          <SidebarContent
            onNavigate={() => setOpen(false)}
            onOpenWallet={() => setWalletModalOpen(true)}
          />
        </div>
      ) : null}

      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </>
  );
}
