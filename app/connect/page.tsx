import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { ConnectFlow } from "@/components/sections/ConnectFlow";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Connect — Aera Finance",
  description: "Connect and verify your wallet to launch the Aera agent.",
};

export default function ConnectPage() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="w-full max-w-sm text-center">
        <Reveal variant="scale">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-lg font-black tracking-tight text-foreground"
          >
            <Image src="/aera.png" alt="aera" width={70} height={70} />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-foreground-faint">
            <ScrambleText value="Launch Agent · Wallet Required" />
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl">
            Connect and verify to <span className="text-accent">continue</span>.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            Two steps: connect a wallet, then sign a free message to prove you
            own it.
          </p>
        </Reveal>
      </div>

      <Reveal delay={260} className="mt-10 w-full max-w-sm">
        <ConnectFlow />
      </Reveal>

      <Reveal delay={340}>
        <p className="mt-10 max-w-sm text-center font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Non-custodial · Signing never costs gas
        </p>
      </Reveal>
    </section>
  );
}
