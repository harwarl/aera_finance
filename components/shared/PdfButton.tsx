"use client";

import { Download } from "lucide-react";

export function PdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex h-9 items-center gap-2 border border-border px-3 font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Download className="h-3.5 w-3.5" />
      PDF
    </button>
  );
}
