import type { Metadata } from "next";
import Link from "next/link";
import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 — Atlas",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <PageGrid />

      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <span className="absolute left-[10%] top-[30%] hidden h-px w-24 bg-accent/20 sm:block" />
          <span className="absolute right-[12%] top-[64%] hidden h-24 w-px bg-accent/20 sm:block" />
        </div>

        <Reveal variant="scale">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-lg font-black tracking-tight text-foreground"
          >
            <Image src="/aera.png" alt="aera" width={70} height={70} />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground-faint">
            <span className="h-1.5 w-1.5 animate-ticker-blink bg-danger" />
            <ScrambleText value="Signal Lost · Error 404" />
          </span>
        </Reveal>

        <Reveal delay={140}>
          <ScrambleText
            value="404"
            className="mt-6 block text-8xl font-black leading-none tracking-tighter text-foreground sm:text-9xl"
          />
        </Reveal>

        <Reveal delay={200}>
          <h1 className="mt-6 max-w-md text-2xl font-black leading-[1.15] tracking-tight text-foreground sm:text-3xl">
            This page drifted <span className="text-accent">out of range</span>.
          </h1>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-foreground-muted">
            Whatever you were looking for isn&apos;t at this address — nothing
            here was rebalanced without your say, it just doesn&apos;t exist.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <CornerBrackets>
              <Button href="/">Back to Home</Button>
            </CornerBrackets>
            <Button href="/whitepaper" variant="secondary">
              Read the Whitepaper
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
