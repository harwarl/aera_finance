"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  clean = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Drops the corner-bracket treatment for a plain rounded panel. */
  clean?: boolean;
}) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const panel = (
    <div
      className={cn(
        "border border-border-muted bg-background-elevated p-6",
        clean && "rounded-2xl shadow-[0_24px_48px_-32px_rgba(0,0,0,0.85)]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          {title}
        </span>
        <button type="button" onClick={onClose} aria-label="Close">
          <X className="h-4 w-4 text-foreground-faint transition-colors hover:text-foreground" />
        </button>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      {clean ? (
        <div className="relative w-full max-w-sm">{panel}</div>
      ) : (
        <CornerBrackets className="relative w-full max-w-sm">{panel}</CornerBrackets>
      )}
    </div>
  );
}
