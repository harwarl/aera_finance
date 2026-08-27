"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { IndexNumber } from "@/components/ui/IndexNumber";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Panel = {
  index: string;
  meta: string;
  title: string;
  description: string;
  glow: string;
};

const PANELS: Panel[] = [
  {
    index: "01",
    meta: "DRIFT-TRIGGERED",
    title: "Autonomous Rebalancing",
    description:
      "Continuously compares your live allocation against target and proposes a trade the moment drift crosses your threshold.",
    glow: "radial-gradient(circle at 30% 20%, rgba(0,200,5,0.35), transparent 60%)",
  },
  {
    index: "02",
    meta: "RATE-AWARE",
    title: "Yield Routing",
    description:
      "Rotates idle stablecoin balance into the best available on-chain yield the instant the spread clears your bar.",
    glow: "radial-gradient(circle at 70% 30%, rgba(157,255,92,0.32), transparent 60%)",
  },
  {
    index: "03",
    meta: "ENFORCED ON-CHAIN",
    title: "Hard Guardrails",
    description:
      "Trade size, slippage, and the approved asset list are enforced in the vault contract itself — not a policy document.",
    glow: "radial-gradient(circle at 50% 70%, rgba(0,160,4,0.35), transparent 60%)",
  },
  {
    index: "04",
    meta: "PLAIN LANGUAGE",
    title: "Every Decision Logged",
    description:
      "Every action the agent takes, or declines to take, is recorded with the reasoning behind it — readable, not a transaction hash.",
    glow: "radial-gradient(circle at 25% 65%, rgba(157,255,92,0.3), transparent 60%)",
  },
  {
    index: "05",
    meta: "NEVER POOLED",
    title: "Non-Custodial Vaults",
    description:
      "Funds sit in a smart contract only you can withdraw from — one vault per wallet. Aera the company never takes custody.",
    glow: "radial-gradient(circle at 65% 25%, rgba(0,200,5,0.3), transparent 60%)",
  },
  {
    index: "06",
    meta: "NO WAITING PERIOD",
    title: "Revocable Anytime",
    description:
      "Pause the agent or revoke its vault access instantly — no approval process, no support ticket, no delay.",
    glow: "radial-gradient(circle at 40% 40%, rgba(157,255,92,0.35), transparent 60%)",
  },
];

export function CapabilitiesGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollLength = Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-20 sm:py-28 lg:overflow-hidden lg:py-0"
    >
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <Container>
          <SectionHeader label="Capabilities" meta="Scroll To Explore" />

          <h2 className="mt-10 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            <ScrambleText variant="glitch" value="One agent, six guardrails." />
          </h2>
        </Container>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 will-change-transform sm:px-8 lg:overflow-visible lg:px-12 lg:pb-0"
        >
          {PANELS.map((panel) => (
            <article
              key={panel.index}
              className="gallery-panel relative flex h-[62vh] w-[82vw] shrink-0 snap-start flex-col justify-end overflow-hidden border border-border-muted bg-background-elevated/60 p-8 sm:w-[56vw] sm:p-10 lg:h-[68vh] lg:w-[34vw]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: panel.glow }}
              />
              <IndexNumber className="absolute right-6 top-6 text-4xl text-accent/20 sm:text-6xl">
                {panel.index}
              </IndexNumber>

              <span className="relative font-mono text-[10px] uppercase tracking-widest text-accent">
                {panel.meta}
              </span>
              <h3 className="relative mt-3 text-2xl font-black leading-[1.05] tracking-tight text-foreground sm:text-3xl">
                {panel.title}
              </h3>
              <p className="relative mt-4 max-w-[36ch] text-sm leading-relaxed text-foreground-muted">
                {panel.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
