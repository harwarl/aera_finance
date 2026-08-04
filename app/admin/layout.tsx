import Image from "next/image";
import Link from "next/link";
import { PageGrid } from "@/components/layout/PageGrid";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <PageGrid />
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border-muted bg-background px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/aera.png" alt="aera" width={28} height={28} />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-sm font-black tracking-tight text-foreground">
              AERA FINANCE
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-danger">
              Admin
            </span>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="font-mono text-xs uppercase tracking-widest text-foreground-faint transition-colors hover:text-foreground"
        >
          Back to Dashboard
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
