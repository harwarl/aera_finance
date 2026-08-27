"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function CopyableAddress({
  address,
  className,
  truncate = true,
}: {
  address: string;
  className?: string;
  truncate?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (unsupported browser, no permission) — no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={address}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated/60 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent",
        className
      )}
    >
      {truncate ? truncateAddress(address) : address}
      {copied ? (
        <Check className="h-3 w-3 shrink-0 text-accent" />
      ) : (
        <Copy className="h-3 w-3 shrink-0 text-foreground-faint transition-colors group-hover:text-accent" />
      )}
      <span className="sr-only">{copied ? "Address copied" : "Copy address"}</span>
    </button>
  );
}
