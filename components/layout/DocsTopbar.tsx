import Link from "next/link";
import { PdfButton } from "@/components/shared/PdfButton";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function DocsTopbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border-muted bg-background px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/aera.png" alt="aera" width={30} height={30} />
        <span className="flex flex-col leading-none">
          <span className="font-sans text-sm font-black tracking-tight text-foreground">
            AERA FINANCE
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-foreground-faint">
            Docs · v1.0
          </span>
        </span>
      </Link>

      <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest sm:flex">
        <Link
          href="/"
          className="text-foreground-faint transition-colors hover:text-foreground"
        >
          Docs
        </Link>
        <span className="text-foreground-faint">/</span>
        <span className="text-accent">Whitepaper</span>
      </div>

      <div className="flex items-center gap-3">
        <PdfButton />
        <Button href="/connect" size="sm">
          Launch Agent
        </Button>
      </div>
    </header>
  );
}
