import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { RulerDivider } from "@/components/layout/RulerDivider";
import { Reveal } from "@/components/shared/Reveal";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { whitepaperMeta, whitepaperSections } from "@/config/site";

export const metadata: Metadata = {
  title: "Whitepaper — Aera Finance",
  description:
    "How Aera's autonomous portfolio agent analyzes, decides, executes, and explains every on-chain trade.",
};

function SectionHeading({
  index,
  id,
  label,
}: {
  index: string;
  id: string;
  label: string;
}) {
  return (
    <h2
      id={id}
      className="flex scroll-mt-28 items-baseline gap-3 text-xl font-black tracking-tight text-foreground sm:text-2xl"
    >
      <span className="font-mono text-sm font-normal text-accent">
        {index}
      </span>
      {label}
    </h2>
  );
}

export default function WhitepaperPage() {
  return (
    <>
      <section className="pb-16 pt-16 sm:pt-24">
        <Container>
          <Reveal className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
            <span className="text-foreground-muted">
              <span className="text-accent">/</span>{" "}
              <ScrambleText value="Technical Overview" />
            </span>
            <span className="text-foreground-faint">
              <ScrambleText
                value={`${whitepaperMeta.version} · ${whitepaperMeta.updated} · ${whitepaperMeta.readingTime}`}
              />
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-6xl">
              How Aera reasons, executes, and{" "}
              <span className="text-accent">explains</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-foreground-muted sm:text-base">
              The technical and risk overview of Aera&apos;s autonomous
              portfolio agent — how it decides, what it&apos;s bounded by,
              and what happens to your assets while it runs.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge>Non-Custodial</Badge>
              <Badge>Audited</Badge>
              <Badge>Open-Source Policy Engine</Badge>
            </div>
          </Reveal>
        </Container>
      </section>

      <RulerDivider />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal variant="left">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                  Contents
                </span>
                <nav className="mt-4 flex flex-col gap-3">
                  {whitepaperSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-accent"
                    >
                      <span className="text-accent">{section.index}</span>
                      {section.label}
                    </a>
                  ))}
                </nav>
              </Reveal>
            </aside>

            <div className="flex flex-col">
              {whitepaperSections.map((section, i) => (
                <Reveal key={section.id} delay={i * 40}>
                  <div className="py-10 first:pt-0">
                    <SectionHeading
                      index={section.index}
                      id={section.id}
                      label={section.label}
                    />
                    <div className="mt-5 flex flex-col gap-4">
                      {section.paragraphs.map((paragraph, pi) => (
                        <p
                          key={pi}
                          className="max-w-[62ch] text-sm leading-relaxed text-foreground-muted sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  {i < whitepaperSections.length - 1 ? (
                    <div className="border-t border-border-muted" />
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <RulerDivider />

      <section className="border-b border-border-muted bg-background-elevated/40 py-20 sm:py-28">
        <Container className="flex flex-col items-start gap-8">
          <Reveal>
            <p className="max-w-2xl text-2xl font-black leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              Read the mechanics. Then let{" "}
              <span className="text-accent">Aera run the loop</span>.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-8">
              <CornerBrackets>
                <Button href="/#solution">Launch Agent</Button>
              </CornerBrackets>
              <Button href="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
