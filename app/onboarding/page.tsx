import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { IndexNumber } from "@/components/ui/IndexNumber";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { VaultOnboardingFlow } from "@/components/sections/VaultOnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started — Aera Finance",
  description:
    "Create your own isolated Aera vault — one vault per wallet, governed only by the rules you set.",
};

const PRINCIPLES = [
  {
    index: "01",
    title: "Isolated by design",
    description:
      "Your vault is its own on-chain position — no other user's deposits or rules ever touch it.",
  },
  {
    index: "02",
    title: "You set the limits",
    description:
      "Trade size, slippage, and the approved asset list are your rules. The agent operates inside them, never outside.",
  },
  {
    index: "03",
    title: "Revocable anytime",
    description:
      "Pause the agent or revoke its vault access instantly — no approval process, no waiting period.",
  },
];

export default function OnboardingPage() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <Reveal variant="scale">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-lg font-black tracking-tight text-foreground"
          >
            <Image src="/aera.png" alt="aera" width={64} height={64} />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-foreground-faint">
            <ScrambleText value="New to Aera · One Vault Per Wallet" />
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Every wallet gets its <span className="text-accent">own vault</span>.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
            Aera is an AI agent that manages tokenized real-world assets and
            on-chain yield on your behalf — rebalancing, routing yield, and
            explaining every decision in plain language. Each user gets a
            single, isolated vault: your deposits, your rules, and your
            agent permissions, never pooled with anyone else&apos;s.
          </p>
        </Reveal>
      </div>

      <Reveal delay={260} className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {PRINCIPLES.map((principle) => (
          <CornerBrackets key={principle.index} className="h-full">
            <div className="flex h-full flex-col gap-4 bg-background-elevated/50 px-6 py-8">
              <IndexNumber>{principle.index}</IndexNumber>
              <h3 className="text-lg font-bold text-foreground">{principle.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">
                {principle.description}
              </p>
            </div>
          </CornerBrackets>
        ))}
      </Reveal>

      <Reveal delay={340} className="mx-auto mt-16 w-full max-w-sm">
        <VaultOnboardingFlow />
      </Reveal>

      <Reveal delay={420}>
        <p className="mx-auto mt-10 max-w-sm text-center font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          Non-custodial · One vault per wallet · Revoke access anytime
        </p>
      </Reveal>
    </section>
  );
}
