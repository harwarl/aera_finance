import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { WaitlistForm } from "@/components/sections/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist — Aera Finance",
  description:
    "Join the waitlist for early access to Aera's autonomous on-chain portfolio agent.",
};

export default function WaitlistPage() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <span className="absolute left-[8%] top-[30%] hidden h-px w-32 bg-accent/30 sm:block" />
        <span className="absolute left-[calc(8%+32px)] top-[calc(30%-16px)] hidden h-8 w-px bg-accent/30 sm:block" />
        <span className="absolute right-[10%] top-[62%] hidden h-32 w-px bg-accent/20 sm:block" />
      </div>

      <Reveal variant="scale">
        <div className="relative flex h-16 w-16 items-center justify-center border border-accent font-sans text-xl font-black text-accent">
          A
        </div>
      </Reveal>

      <Reveal delay={80}>
        <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-foreground-faint">
          <ScrambleText value="Aera Finance · Early Access" />
        </span>
      </Reveal>

      <Reveal delay={140}>
        <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Join the waitlist for the <span className="text-accent">Agent</span>.
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
          Be first in line when Aera opens agent access — autonomous
          rebalancing, yield routing, and plain-language decisions for your
          on-chain portfolio.
        </p>
      </Reveal>

      <Reveal delay={260} className="mt-10 w-full max-w-sm">
        <WaitlistForm />
      </Reveal>

      <Reveal delay={340}>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          No spam. One email when access opens.
        </p>
      </Reveal>
    </section>
  );
}
